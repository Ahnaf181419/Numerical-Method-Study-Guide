// A tiny math-expression compiler, so solvers can take a function straight from the question
// ("e^x - 3x", "2x^2 + x") instead of hard-coding polynomials.
//
// Grammar: expr := term (('+'|'-') term)* ; term := factor (('*'|'/') factor)* ;
// factor := unary ('^' factor)? ; unary := ('+'|'-')? primary ;
// primary := number | call | name | '(' expr ')'

const FUNCS = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  exp: Math.exp, log: Math.log, ln: Math.log, log10: Math.log10,
  sqrt: Math.sqrt, abs: Math.abs, sign: Math.sign,
};
const CONSTS = { pi: Math.PI, e: Math.E };

const tokenize = (src) => {
  const t = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      t.push({ t: 'num', v: parseFloat(src.slice(i, j)) });
      i = j;
      continue;
    }
    if (/[a-zA-Z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_]/.test(src[j])) j++;
      t.push({ t: 'name', v: src.slice(i, j) });
      i = j;
      continue;
    }
    if ('+-*/^(),'.includes(c)) { t.push({ t: c }); i++; continue; }
    if (c === '{' || c === '}') { t.push({ t: c === '{' ? '(' : ')' }); i++; continue; }
    throw new Error(`Cannot read "${c}" in the expression.`);
  }
  return t;
};

// Compile an expression string into f(x).
export function compile(src) {
  const text = String(src ?? '').replace(/\^/g, '**').replace(/\s+/g, '');
  if (!text) throw new Error('Enter an expression, for example 2*x^2 + x.');
  const toks = tokenize(text.replace(/\*\*/g, '^'));
  let p = 0;
  const peek = () => toks[p];
  const eat = (t) => {
    if (toks[p]?.t !== t) throw new Error(`Expected "${t}" in the expression.`);
    return toks[p++].v;
  };

  const parseExpr = () => {
    let left = parseTerm();
    while (peek() && (peek().t === '+' || peek().t === '-')) {
      const op = toks[p++].t;
      const right = parseTerm();
      const fn = op === '+' ? (a, b) => a + b : (a, b) => a - b;
      const l = left, r = right;
      left = (x) => fn(l(x), r(x));
    }
    return left;
  };
  const parseTerm = () => {
    let left = parseFactor();
    for (;;) {
      const t = peek();
      if (t && (t.t === '*' || t.t === '/')) {
        const op = toks[p++].t;
        const right = parseFactor();
        const l = left, r = right;
        left = op === '*' ? (x) => l(x) * r(x) : (x) => l(x) / r(x);
      } else if (t && (t.t === 'num' || t.t === 'name' || t.t === '(')) {
        // implicit multiplication, the way the papers write it: 2x, 3(x+1), 5xy^2
        const right = parseFactor();
        const l = left, r = right;
        left = (x) => l(x) * r(x);
      } else break;
    }
    return left;
  };
  // The exponent binds tighter than the sign: -x^2 means -(x^2).
  const parseFactor = () => {
    let base;
    if (peek()?.t === '-') { p++; const v = parseFactor(); base = (x) => -v(x); }
    else if (peek()?.t === '+') { p++; base = parseFactor(); }
    else base = parsePrimary();
    if (peek()?.t === '^') {
      p++;
      const e = parseFactor();
      const b = base, ex = e;
      return (x) => Math.pow(b(x), ex(x));
    }
    return base;
  };
  const parsePrimary = () => {
    const tk = peek();
    if (!tk) throw new Error('The expression ends too early.');
    if (tk.t === 'num') { p++; const v = tk.v; return () => v; }
    if (tk.t === '(') {
      p++;
      const v = parseExpr();
      eat(')');
      return v;
    }
    if (tk.t === 'name') {
      p++;
      const name = tk.v.toLowerCase();
      if (peek()?.t === '(') {
        p++;
        const args = [];
        if (peek()?.t !== ')') {
          args.push(parseExpr());
          while (peek()?.t === ',') { p++; args.push(parseExpr()); }
        }
        eat(')');
        const f = FUNCS[name];
        if (!f) throw new Error(`Unknown function "${name}".`);
        return (x) => f(...args.map((a) => a(x)));
      }
      if (name in CONSTS) { const v = CONSTS[name]; return () => v; }
      if (name === 'x') return (x) => x;
      throw new Error(`Unknown name "${name}". Use x for the variable.`);
    }
    throw new Error(`Cannot read "${tk.t}" in the expression.`);
  };

  const fn = parseExpr();
  if (p !== toks.length) throw new Error('The expression has extra characters at the end.');
  return fn;
}

// y = a0 + a1*x + a2*x^2 + ... from a polynomial written high power first.
export const poly = (coeffs) => {
  const c = coeffs.map(Number);
  return (x) => c.reduce((acc, k) => acc * x + k, 0);
};
