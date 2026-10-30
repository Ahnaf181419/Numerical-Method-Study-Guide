// Pure calculators for the exam math taught in CSE 2201 (slides + class notes + past papers).
// Each returns { result, steps } where steps are LaTeX strings for the UI.
//
// House rules baked in here (from the teacher's six rules, see docs/EXAM-GUIDELINES.md):
//   * a row operation is always written together with the row it produces;
//   * partial pivoting is checked at EVERY pivot column, not just the first;
//   * Gauss-Jordan ends in reduced row echelon form (identity for a square matrix) — no back substitution;
//   * iterative methods check diagonal dominance before they start.

import { compile } from './expr.js';

const fmt = (x, d = 4) => {
  if (typeof x !== 'number' || !Number.isFinite(x)) return String(x);
  const r = +x.toFixed(d);
  return Object.is(r, -0) ? '0' : String(r);
};
const tex = (rows, digits = 4) =>
  '\\begin{bmatrix} ' + rows.map((r) => r.map((v) => fmt(v, digits)).join(' & ')).join(' \\\\ ') + ' \\end{bmatrix}';
const augTex = (rows, digits = 4) =>
  '\\left[\\begin{array}{' + 'c|'.repeat(rows[0].length - 1) + 'c} ' +
  rows.map((r) => r.map((v) => fmt(v, digits)).join(' & ')).join(' \\\\ ') + ' \\end{array}\\right]';
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
const mv = (A, v) => A.map((r) => r.reduce((s, x, k) => s + x * v[k], 0));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const boxedX = (x) => `\\boxed{${x.map((v, i) => `x_{${i + 1}} = ${fmt(v)}`).join(',\\quad ')}}`;

// The equal-interval rules all take h from the first gap — refuse a table whose gaps differ.
// The tolerance is relative to h, so x values typed to six decimals (0, 0.333333, 0.666667, …)
// are still equally spaced, while a genuinely uneven table is still rejected.
export const spacing = (xs) => {
  if (xs.length < 2) throw new Error('give at least two x values.');
  const h = xs[1] - xs[0];
  const tol = Math.max(Math.abs(h) * 1e-5, 1e-9);
  if (!xs.every((v, i) => i === 0 || Math.abs(v - xs[i - 1] - h) <= tol)) {
    throw new Error('the x values must be equally spaced for this rule.');
  }
  return h;
};

// ---------------------------------------------------------------- linear systems

// Forward elimination + back substitution.
// pivot: 'auto' (naive until a zero pivot appears, then partial pivoting — the default),
//        'on'  (partial pivoting at every column — when the question asks for it),
//        'off' (naive only — errors out if a zero pivot appears).
export function gaussEliminate({ A, b, pivot = 'auto' }) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);
  const steps = [];
  steps.push(`\\text{Augmented matrix: } ${augTex(M)}`);
  let usedPivoting = false;

  for (let k = 0; k < n - 1; k++) {
    // --- pivot decision for this column -------------------------------------
    if (Math.abs(M[k][k]) < 1e-12) {
      if (pivot === 'off') {
        throw new Error(`Zero pivot in column ${k + 1}. Switch on partial pivoting (or use "auto").`);
      }
      // find the largest magnitude below and swap it up
      let r = k;
      for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[r][k])) r = i;
      [M[k], M[r]] = [M[r], M[k]];
      usedPivoting = true;
      steps.push(`\\text{Zero pivot in column ${k + 1} — swap } R_{${k + 1}} \\text{ and } R_{${r + 1}}:`);
      steps.push(`${augTex(M)}`);
    } else if (pivot === 'on') {
      let r = k;
      for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[r][k])) r = i;
      if (r !== k) {
        // quote the live matrix, not A — earlier columns may have swapped or changed these entries
        const pk = Math.abs(M[k][k]), pr = Math.abs(M[r][k]);
        [M[k], M[r]] = [M[r], M[k]];
        usedPivoting = true;
        steps.push(`\\text{Partial pivoting: } |a_{${r + 1}${k + 1}}| = ${fmt(pr)} > |a_{${k + 1}${k + 1}}| = ${fmt(pk)}, \\text{ so swap } R_{${k + 1}} \\text{ and } R_{${r + 1}}:`);
        steps.push(`${augTex(M)}`);
      }
    }

    // --- eliminate -----------------------------------------------------------
    for (let i = k + 1; i < n; i++) {
      const aik = M[i][k];
      const akk = M[k][k];
      const m = aik / akk;
      if (Math.abs(m) < 1e-15) continue;
      const row = M[i].map((v, j) => v - m * M[k][j]);
      M[i] = row;
      const num = Math.abs(aik);
      const den = Math.abs(akk);
      const ratio = -aik / akk; // the teacher's form: R_i + (ratio) R_k
      const op = ratio < 0 ? '-' : '+';
      steps.push(
        `R_{${i + 1}}' = R_{${i + 1}} ${op} \\left(\\frac{${fmt(num)}}{${fmt(den)}}\\right) R_{${k + 1}} = R_{${i + 1}} ${op} ${fmt(Math.abs(ratio))} R_{${k + 1}}`,
      );
      steps.push(`R_{${i + 1}}' = ${augTex([row])}`);
    }
  }

  steps.push(`\\text{Upper triangular form: } ${augTex(M)}`);
  if (usedPivoting) steps.push('\\text{(A row interchange was needed — partial pivoting was applied.)}');

  // --- back substitution -----------------------------------------------------
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
    const terms = [];
    for (let j = i + 1; j < n; j++) {
      const c = M[i][j];
      terms.push(c < 0 ? `+ ${fmt(-c)}\\,x_{${j + 1}}` : `- ${fmt(c)}\\,x_{${j + 1}}`);
    }
    steps.push(
      `x_{${i + 1}} = \\frac{${fmt(M[i][n])}${terms.length ? ' ' + terms.join(' ') : ''}}{${fmt(M[i][i])}} = ${fmt(x[i])}`,
    );
  }
  steps.push(boxedX(x));
  return { result: { x, matrix: M, pivoted: usedPivoting }, steps };
}

// Gauss-Jordan: normalise the pivot row first, then eliminate, until the matrix is
// reduced row echelon (the identity for a square matrix). No back substitution.
export function gaussJordan({ A, b }) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);
  const steps = [`\\text{Start: } ${augTex(M)}`];
  for (let k = 0; k < n; k++) {
    if (Math.abs(M[k][k]) < 1e-12) {
      let r = k;
      for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[r][k])) r = i;
      if (r === k) throw new Error(`Zero pivot in column ${k + 1}; the matrix is singular.`);
      [M[k], M[r]] = [M[r], M[k]];
      steps.push(`\\text{Swap } R_{${k + 1}} \\text{ and } R_{${r + 1}}: ${augTex(M)}`);
    }
    const p = M[k][k];
    if (Math.abs(p - 1) > 1e-12) {
      M[k] = M[k].map((v) => v / p);
      steps.push(`\\text{Normalise the pivot row: } R_{${k + 1}} \\leftarrow \\frac{1}{${fmt(p)}} R_{${k + 1}}`);
      steps.push(`R_{${k + 1}} = ${augTex([M[k]])}`);
    }
    for (let i = 0; i < n; i++) {
      if (i === k || Math.abs(M[i][k]) < 1e-15) continue;
      const m = M[i][k];
      M[i] = M[i].map((v, j) => v - m * M[k][j]);
      steps.push(`R_{${i + 1}} \\leftarrow R_{${i + 1}} ${m < 0 ? '+' : '-'} ${fmt(Math.abs(m))} R_{${k + 1}}`);
      steps.push(`R_{${i + 1}} = ${augTex([M[i]])}`);
    }
  }
  steps.push(`\\text{Reduced row echelon form: } ${augTex(M)}`);
  const x = M.map((r) => r[n]);
  steps.push(boxedX(x));
  return { result: { x, matrix: M }, steps };
}

// ---------------------------------------------------------------- matrix inversion

// The determinant of a square matrix by cofactor expansion along its first row.
const determinant = (M) => {
  const n = M.length;
  if (n === 1) return M[0][0];
  if (n === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
  let sum = 0;
  for (let j = 0; j < n; j++) {
    const minor = M.slice(1).map((row) => row.filter((_, k) => k !== j));
    sum += (j % 2 ? -1 : 1) * M[0][j] * determinant(minor);
  }
  return sum;
};

// Matrix inversion by the adjoint method (Shanker Rao §11.1):
//   |A| by cofactor expansion  ->  cofactor matrix  ->  adj(A) = transpose of it
//   ->  A^-1 = adj(A)/|A|  ->  X = A^-1 B.
// A zero determinant means there is no inverse, so the method cannot be used.
export function matrixInverse({ A, b }) {
  const n = A.length;
  if (n < 2 || n > 4) throw new Error('the adjoint method is for 2x2, 3x3 or 4x4 matrices.');
  const det = determinant(A);
  const steps = [];
  steps.push(`\\textbf{Step 1: the determinant} \\quad |A| = ${detStep(A)}`);
  if (Math.abs(det) < 1e-12) {
    throw new Error('the determinant is zero, so A has no inverse — the matrix is singular.');
  }
  // Cofactor matrix: C_ij = (-1)^(i+j) times the minor M_ij.
  const cof = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const minor = A.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j));
      return (i + j) % 2 ? -determinant(minor) : determinant(minor);
    }),
  );
  steps.push(`\\textbf{Step 2: the cofactor matrix} \\quad C = ${tex(cof)} \\quad (C_{ij} = (-1)^{i+j} M_{ij})`);
  // The adjoint is the transpose of the cofactor matrix.
  const adj = transpose(cof);
  steps.push(`\\textbf{Step 3: the adjoint} \\quad \\operatorname{adj} A = C^T = ${tex(adj)}`);
  const inv = adj.map((row) => row.map((v) => v / det));
  steps.push(`\\textbf{Step 4: the inverse} \\quad A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A = \\frac{1}{${fmt(det)}} ${tex(adj)} = ${tex(inv)}`);
  const x = b ? mv(inv, b) : null;
  if (b) {
    steps.push(`\\textbf{Step 5: the solution} \\quad X = A^{-1}B = ${tex(inv)} ${tex(b.map((v) => [v]))} = ${tex(x.map((v) => [v]))}`);
    steps.push(`\\boxed{${x.map((v, i) => `${'xyz'[i] ?? `x_{${i + 1}}`} = ${fmt(v)}`).join(', \\quad ')}}`);
  }
  return { result: { det, cof, adj, inv, x }, steps };
}

// The determinant written out as the exam writes it: a11(a22a33-a23a32) - a12(...) + a13(...)
const detStep = (A) => {
  const n = A.length;
  const g = (i, j) => fmt(A[i][j]);
  const p = (i, j, k, l) => `${g(i, j)}\\cdot${g(k, l)}`;
  if (n === 2) return `a_{11}a_{22} - a_{12}a_{21} = ${p(0, 0, 1, 1)} - ${p(0, 1, 1, 0)}`;
  if (n === 3) {
    return [
      `a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})`,
      `= ${g(0, 0)}(${p(1, 1, 2, 2)} - ${p(1, 2, 2, 1)}) - ${g(0, 1)}(${p(1, 0, 2, 2)} - ${p(1, 2, 2, 0)}) + ${g(0, 2)}(${p(1, 0, 2, 1)} - ${p(1, 1, 2, 0)})`,
    ].join(' ');
  }
  return `\\text{cofactor expansion along the first row} = ${fmt(determinant(A))}`;
};

// Do-Little LU factorisation (L has ones on the diagonal), exactly as the LU slides do it.
export function luDecompose({ A }) {
  const n = A.length;
  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  const U = Array.from({ length: n }, () => new Array(n).fill(0));
  const steps = [`A = ${tex(A)} = L\\,U, \\qquad L = ${tex(L)} ,\\; U = ${tex(U)}`];
  for (let i = 0; i < n; i++) L[i][i] = 1;

  for (let j = 0; j < n; j++) {
    U[0][j] = A[0][j];
  }
  steps.push(A[0].map((v, j) => `u_{1${j + 1}} = a_{1${j + 1}} = ${fmt(v)}`).join(', \\quad '));

  for (let i = 1; i < n; i++) {
    L[i][0] = A[i][0] / U[0][0];
    steps.push(`l_{${i + 1}1} = \\frac{a_{${i + 1}1}}{u_{11}} = \\frac{${fmt(A[i][0])}}{${fmt(U[0][0])}} = ${fmt(L[i][0])}`);
  }
  for (let i = 1; i < n; i++) {
    for (let j = i; j < n; j++) {
      let s = A[i][j];
      const parts = [];
      for (let k = 0; k < i; k++) {
        parts.push(`(${fmt(L[i][k])})(${fmt(U[k][j])})`);
        s -= L[i][k] * U[k][j];
      }
      U[i][j] = s;
      const names = [];
      for (let k = 0; k < i; k++) names.push(`l_{${i + 1}${k + 1}}u_{${k + 1}${j + 1}}`);
      steps.push(
        `u_{${i + 1}${j + 1}} = a_{${i + 1}${j + 1}} ${names.length ? '- ' + names.join(' - ') : ''} = ${fmt(A[i][j])} ${parts.length ? '- ' + parts.join(' - ') : ''} = ${fmt(U[i][j])}`,
      );
    }
    if (i < n - 1) {
      for (let j = i; j < n - 1; j++) {
        let s = A[j + 1][i];
        const parts = [];
        for (let k = 0; k < i; k++) {
          parts.push(`(${fmt(L[j + 1][k])})(${fmt(U[k][i])})`);
          s -= L[j + 1][k] * U[k][i];
        }
        L[j + 1][i] = s / U[i][i];
        const names = [];
        for (let k = 0; k < i; k++) names.push(`l_{${j + 2}${k + 1}}u_{${k + 1}${i + 1}}`);
        steps.push(
          `l_{${j + 2}${i + 1}} = \\frac{a_{${j + 2}${i + 1}} ${names.length ? '- ' + names.join(' - ') : ''}}{u_{${i + 1}${i + 1}}} = \\frac{${fmt(A[j + 1][i])} ${parts.length ? '- ' + parts.join(' - ') : ''}}{${fmt(U[i][i])}} = ${fmt(L[j + 1][i])}`,
        );
      }
    }
  }
  steps.push(`L = ${tex(L)}`);
  steps.push(`U = ${tex(U)}`);
  steps.push(`\\text{Check: } L\\,U = ${tex(mul(L, U))}`);
  return { result: { L, U }, steps };
}

// Solve with the LU factors: forward substitution for d, then backward substitution for x.
export function luSolve({ A, b }) {
  const { L, U } = luDecompose({ A }).result;
  const n = A.length;
  const steps = [`[L]\\{d\\} = \\{b\\} \\quad\\text{(forward substitution)}`];
  const d = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = b[i];
    const terms = [];
    for (let k = 0; k < i; k++) {
      const c = L[i][k];
      terms.push(c < 0 ? `+ ${fmt(-c)}d_{${k + 1}}` : `- ${fmt(c)}d_{${k + 1}}`);
      s -= c * d[k];
    }
    d[i] = s / L[i][i];
    steps.push(`d_{${i + 1}} = \\frac{${fmt(b[i])}${terms.length ? ' ' + terms.join(' ') : ''}}{${fmt(L[i][i])}} = ${fmt(d[i])}`);
  }
  steps.push(`[U]\\{x\\} = \\{d\\} \\quad\\text{(backward substitution)}`);
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = d[i];
    const terms = [];
    for (let k = i + 1; k < n; k++) {
      const c = U[i][k];
      terms.push(c < 0 ? `+ ${fmt(-c)}x_{${k + 1}}` : `- ${fmt(c)}x_{${k + 1}}`);
      s -= c * x[k];
    }
    x[i] = s / U[i][i];
    steps.push(`x_{${i + 1}} = \\frac{${fmt(d[i])}${terms.length ? ' ' + terms.join(' ') : ''}}{${fmt(U[i][i])}} = ${fmt(x[i])}`);
  }
  steps.push(boxedX(x));
  return { result: { x, L, U, d }, steps };
}

// Is the system diagonally dominant? (rule 5: check this before iterating)
export function diagonalDominance({ A }) {
  const n = A.length;
  const rows = A.map((row, i) => {
    const diag = Math.abs(row[i]);
    const off = row.reduce((s, v, j) => s + (j === i ? 0 : Math.abs(v)), 0);
    return { row: i + 1, diag, off, dominant: diag > off };
  });
  const dominant = rows.every((r) => r.dominant);
  const steps = rows.map(
    (r) => `\\text{Row } ${r.row}: \\;|a_{${r.row}${r.row}}| = ${fmt(r.diag)} ${r.dominant ? '>' : '\\le'} \\sum_{j \\ne ${r.row}} |a_{${r.row}j}| = ${fmt(r.off)}`,
  );
  steps.push(
    dominant
      ? '\\text{The system is diagonally dominant — the iteration will converge.}'
      : '\\text{The system is NOT diagonally dominant as written. Rearrange the equations before iterating, or the iterates will diverge.}',
  );
  return { result: { rows, dominant }, steps };
}

// Jacobi and Gauss-Seidel: iteration tables.
function iterate({ A, b, x0, tol, maxIter, mode }) {
  const n = A.length;
  const dom = diagonalDominance({ A });
  const steps = [];
  steps.push('\\textbf{Step 1: check diagonal dominance}');
  steps.push(...dom.steps);
  if (!dom.result.dominant) {
    steps.push('\\text{Warning: the iteration below may diverge on this arrangement of the equations.}');
  }
  const names = ['x', 'y', 'z'];
  const isolated = A.map((row, i) => {
    const parts = [];
    for (let j = 0; j < n; j++) if (j !== i) parts.push(`${fmt(row[j])}${names[j]}`);
    return `\\frac{${fmt(b[i])}${parts.length ? ' - ' + parts.join(' - ') : ''}}{${fmt(row[i])}}`;
  });
  steps.push('\\textbf{Step 2: rewrite each equation with its own variable isolated}');
  steps.push(isolated.map((s, i) => `${names[i]}^{(k+1)} = ${s}`).join(' \\\\ '));
  steps.push('\\textbf{Step 3: iterate}');

  let x = x0 ? [...x0] : A.map((row, i) => b[i] / row[i]);
  steps.push(`\\text{Starting vector: } ${x.map((v, i) => `${names[i]}^{(0)} = ${fmt(v)}`).join(', ')}`);
  const table = [{ k: 0, x: [...x] }];
  const lines = [];
  for (let it = 1; it <= maxIter; it++) {
    const prev = [...x];
    const next = [...x];
    for (let i = 0; i < n; i++) {
      let s = b[i];
      if (mode === 'jacobi') {
        for (let j = 0; j < n; j++) if (j !== i) s -= A[i][j] * prev[j];
      } else {
        for (let j = 0; j < n; j++) if (j !== i) s -= A[i][j] * next[j];
      }
      next[i] = s / A[i][i];
    }
    x = next;
    table.push({ k: it, x: [...x] });
    lines.push(
      `${names.map((nm, i) => `${nm}^{(${it})} = ${fmt(x[i])}`).join(', \\quad ')}`,
    );
    if (Math.max(...x.map((v, i) => Math.abs(v - prev[i]))) < tol) {
      steps.push(`\\text{Change} < ${tol} \\Rightarrow \\text{stop.} `);
      break;
    }
  }
  steps.push(...lines.map((l, i) => `\\text{Iteration } ${i + 1}: ${l}`));
  steps.push(`\\boxed{${names.map((nm, i) => `${nm} = ${fmt(x[i])}`).join(', \\quad ')}}`);
  return { result: { x, table, dominant: dom.result.dominant }, steps };
}

export function jacobi({ A, b, x0, tol = 1e-6, maxIter = 20 }) {
  return iterate({ A, b, x0, tol, maxIter, mode: 'jacobi' });
}

export function gaussSeidel({ A, b, x0, tol = 1e-6, maxIter = 20 }) {
  return iterate({ A, b, x0, tol, maxIter, mode: 'seidel' });
}

// ---------------------------------------------------------------- roots of equations

export function bisection({ expr, a, b, tol = 0.001, maxIter = 50 }) {
  const f = compile(expr);
  const steps = [`f(x) = ${expr}, \\qquad f(${fmt(a)}) = ${fmt(f(a))}, \\quad f(${fmt(b)}) = ${fmt(f(b))}`];
  let lo = a, hi = b;
  let flo = f(lo), fhi = f(hi);
  if (flo * fhi > 0) throw new Error('f(a) and f(b) have the same sign — there is no root between them.');
  steps.push('\\textbf{Iteration table}');
  let mid = lo;
  for (let it = 1; it <= maxIter; it++) {
    mid = (lo + hi) / 2;
    const fm = f(mid);
    steps.push(`\\text{It } ${it}: \\; c = \\frac{${fmt(lo)} + ${fmt(hi)}}{2} = ${fmt(mid)}, \\; f(c) = ${fmt(fm)}`);
    if (flo * fm < 0) { hi = mid; fhi = fm; } else { lo = mid; flo = fm; }
    if (Math.abs(hi - lo) < tol) { steps.push(`\\text{Interval width} < ${tol} \\Rightarrow \\text{stop.}`); break; }
  }
  mid = (lo + hi) / 2;
  steps.push(`\\boxed{x \\approx ${fmt(mid)}}`);
  return { result: { root: mid, a: lo, b: hi }, steps };
}

export function newtonRaphson({ expr, x0, tol = 0.001, maxIter = 50 }) {
  const f = compile(expr);
  const h = 1e-7;
  const df = (x) => (f(x + h) - f(x - h)) / (2 * h);
  const steps = [`f(x) = ${expr}, \\qquad f'(x) \\approx \\frac{f(x + h) - f(x - h)}{2h}, \\; h = 10^{-7}`];
  let x = x0;
  steps.push(`\\textbf{Iteration table} (x_0 = ${fmt(x)})`);
  for (let it = 1; it <= maxIter; it++) {
    const fx = f(x);
    const dfx = df(x);
    const next = x - fx / dfx;
    steps.push(`\\text{It } ${it}: \\; x_{${it}} = ${fmt(x)} - \\frac{${fmt(fx)}}{${fmt(dfx)}} = ${fmt(next)}`);
    if (Math.abs(next - x) < tol) { x = next; steps.push(`|\\Delta x| < ${tol} \\Rightarrow \\text{stop.}`); break; }
    x = next;
  }
  steps.push(`\\boxed{x \\approx ${fmt(x)}}`);
  return { result: { root: x }, steps };
}

export function secant({ expr, x0, x1, tol = 0.001, maxIter = 50 }) {
  const f = compile(expr);
  const steps = [`f(x) = ${expr}`];
  let a = x0, b = x1;
  steps.push(`\\textbf{Iteration table} (x_0 = ${fmt(a)}, x_1 = ${fmt(b)})`);
  for (let it = 2; it <= maxIter; it++) {
    const fa = f(a), fb = f(b);
    if (Math.abs(fb - fa) < 1e-14) throw new Error('The two starting points give the same function value.');
    const c = (a * fb - b * fa) / (fb - fa);
    steps.push(`\\text{It } ${it}: \\; x_{${it}} = \\frac{${fmt(a)}(${fmt(fb)}) - ${fmt(b)}(${fmt(fa)})}{${fmt(fb)} - ${fmt(fa)}} = ${fmt(c)}`);
    a = b; b = c;
    if (Math.abs(c - a) < tol) { steps.push(`|\\Delta x| < ${tol} \\Rightarrow \\text{stop.}`); break; }
  }
  steps.push(`\\boxed{x \\approx ${fmt(b)}}`);
  return { result: { root: b }, steps };
}

// Horner's rule: value of a polynomial and its quotient after dividing by (x - r).
export function horner({ coeffs, r }) {
  const c = coeffs.map(Number);
  const steps = [];
  const bs = [c[0]];
  steps.push(`b_0 = a_0 = ${fmt(bs[0])}`);
  for (let i = 1; i < c.length; i++) {
    const next = c[i] + r * bs[i - 1];
    bs.push(next);
    steps.push(`b_${i} = a_${i} + r\\,b_{${i - 1}} = ${fmt(c[i])} + ${fmt(r)}(${fmt(bs[i - 1])}) = ${fmt(next)}`);
  }
  const q = bs.slice(0, -1);
  steps.push(`\\text{Quotient coefficients: } ${q.map((v, i) => `b_${i} = ${fmt(v)}`).join(', ')}`);
  steps.push(`p(${fmt(r)}) = b_${c.length - 1} = ${fmt(bs[c.length - 1])}`);
  const deg = q.length - 1;
  const qTex = q.map((v, i) => `${fmt(v)}x^{${deg - i}}`).join(' + ');
  steps.push(`\\boxed{p(x) = (x - ${fmt(r)})\\left[${qTex}\\right] + ${fmt(bs[c.length - 1])}}`);
  return { result: { value: bs[c.length - 1], quotient: q }, steps };
}

// ---------------------------------------------------------------- interpolation

export const diffTable = (ys) => {
  const cols = [ys];
  let cur = ys;
  while (cur.length > 1) {
    cur = cur.slice(1).map((v, i) => v - cur[i]);
    cols.push(cur);
  }
  return cols;
};

// Newton's forward (Gregory) formula for equally spaced points.
export function newtonForward({ xs, ys, x }) {
  const h = spacing(xs);
  const cols = diffTable(ys);
  const u = (x - xs[0]) / h;
  const steps = [`\\textbf{Difference table}`];
  const head = cols.map((_, k) => `\\Delta^{${k}}`);
  steps.push(
    '\\begin{array}{c|' + 'c'.repeat(cols.length) + '} \\hline ' +
    head.join(' & ') + ' \\\\ \\hline ' +
    cols.map((c) => c.map((v) => fmt(v)).join(' & ')).join(' \\\\ ') + ' \\end{array}',
  );
  const terms = [];
  let sum = 0;
  for (let k = 0; k < cols.length; k++) {
    const c = cols[k][0];
    let t = c;
    for (let j = 1; j <= k; j++) t *= (u - (j - 1)) / j;
    sum += t;
    terms.push(`\\frac{${fmt(c)}}{${k}!}(${fmt(u)})^{\\underline{${k}}}`);
  }
  steps.push(`u = \\frac{x - x_0}{h} = \\frac{${fmt(x)} - ${fmt(xs[0])}}{${fmt(h)}} = ${fmt(u)}`);
  steps.push(`y(x) = ${terms.join(' + ')}`);
  steps.push(`\\boxed{y(${fmt(x)}) = ${fmt(sum)}}`);
  return { result: { y: sum, table: cols, u }, steps };
}

// Lagrange's formula for unequal intervals.
export function lagrange({ xs, ys, x }) {
  const n = xs.length;
  const parts = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let num = 1, den = 1;
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      num *= x - xs[j];
      den *= xs[i] - xs[j];
    }
    const v = (ys[i] * num) / den;
    sum += v;
    const numT = Array.from({ length: n }, (_, j) => j === i ? '' : `(x - ${fmt(xs[j])})`).filter(Boolean).join('');
    const denT = Array.from({ length: n }, (_, j) => j === i ? '' : `(${fmt(xs[i])} - ${fmt(xs[j])})`).filter(Boolean).join('');
    parts.push(`${fmt(ys[i])}\\frac{${numT}}{${denT}}`);
  }
  const steps = [`y(x) = \\sum_{i=0}^{${n - 1}} y_i \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j}`];
  steps.push(parts.join(' + '));
  steps.push(`\\boxed{y(${fmt(x)}) = ${fmt(sum)}}`);
  return { result: { y: sum }, steps };
}

// Newton's divided-difference formula (unequal intervals).
export function dividedDifference({ xs, ys, x }) {
  const n = xs.length;
  const cols = [ys];
  for (let k = 1; k < n; k++) {
    const prev = cols[k - 1];
    const cur = [];
    for (let i = 0; i < prev.length - 1; i++) {
      cur.push((prev[i + 1] - prev[i]) / (xs[i + k] - xs[i]));
    }
    cols.push(cur);
  }
  const steps = ['\\textbf{Divided-difference table}'];
  steps.push(
    '\\begin{array}{c|' + 'c'.repeat(n) + '} \\hline ' +
    cols.map((_, k) => `f[${k}]`).join(' & ') + ' \\\\ \\hline ' +
    cols.map((c) => c.map((v) => fmt(v)).join(' & ')).join(' \\\\ ') + ' \\end{array}',
  );
  const terms = [];
  let sum = ys[0];
  terms.push(`${fmt(ys[0])}`);
  for (let k = 1; k < n; k++) {
    let t = cols[k][0];
    for (let j = 0; j < k; j++) t *= x - xs[j];
    sum += t;
    terms.push(`${fmt(cols[k][0])}${Array.from({ length: k }, (_, j) => `(x - ${fmt(xs[j])})`).join('')}`);
  }
  steps.push(`f(x) = ${terms.join(' + ')}`);
  steps.push(`\\boxed{f(${fmt(x)}) = ${fmt(sum)}}`);
  return { result: { y: sum, table: cols }, steps };
}

// Central difference formulae (Shanker Rao Ch 6), formula: 'forward' | 'backward' | 'stirling'.
// Term k of Gauss forward is C(u + ⌊(k-1)/2⌋, k) Δ^k y_{-⌊k/2⌋}; of Gauss backward
// C(u + ⌊k/2⌋, k) Δ^k y_{-⌈k/2⌉}; Stirling is their mean. The series stops at the first
// difference the table does not have.
export function gaussInterp({ xs, ys, x, formula = 'forward' }) {
  const h = spacing(xs);
  const cols = diffTable(ys);
  const p = (x - xs[0]) / h;
  // origin: 0 < u < 1 for forward, -1 < u < 0 for backward, nearest point for Stirling
  const o = formula === 'forward' ? Math.floor(p) : formula === 'backward' ? Math.ceil(p) : Math.round(p);
  const u = p - o;
  const binom = (t, k) => { let c = 1; for (let j = 0; j < k; j++) c *= (t - j) / (j + 1); return c; };
  const fwd = (k) => ({ c: binom(u + Math.floor((k - 1) / 2), k), j: -Math.floor(k / 2) });
  const bwd = (k) => ({ c: binom(u + Math.floor(k / 2), k), j: -Math.ceil(k / 2) });
  const diff = (k, j) => cols[k]?.[o + j];
  const has = (t, k) => diff(k, t.j) !== undefined;
  const sub = (j) => (j === 0 ? '0' : String(j));
  const steps = ['\\textbf{Difference table}'];
  steps.push(
    '\\begin{array}{c|' + 'c'.repeat(cols.length) + '} \\hline ' +
    cols.map((_, k) => `\\Delta^{${k}}`).join(' & ') + ' \\\\ \\hline ' +
    cols.map((c) => c.map((v) => fmt(v)).join(' & ')).join(' \\\\ ') + ' \\end{array}',
  );
  steps.push(`x_0 = ${fmt(xs[o])}, \\quad u = \\frac{x - x_0}{h} = \\frac{${fmt(x)} - ${fmt(xs[o])}}{${fmt(h)}} = ${fmt(u)}`);
  let sum = ys[o];
  const terms = [`y_0 = ${fmt(ys[o])}`];
  for (let k = 1; k < cols.length; k++) {
    const f = fwd(k), b = bwd(k);
    if (formula === 'forward' ? !has(f, k) : formula === 'backward' ? !has(b, k) : !(has(f, k) && has(b, k))) break;
    let t;
    if (formula === 'stirling') {
      t = (f.c * diff(k, f.j) + b.c * diff(k, b.j)) / 2;
      terms.push(`\\tfrac{1}{2}\\left[${fmt(f.c)}(${fmt(diff(k, f.j))}) + ${fmt(b.c)}(${fmt(diff(k, b.j))})\\right]`);
    } else {
      const s = formula === 'forward' ? f : b;
      t = s.c * diff(k, s.j);
      terms.push(`${fmt(s.c)}\\,\\Delta^{${k}}y_{${sub(s.j)}} = ${fmt(s.c)}(${fmt(diff(k, s.j))})`);
    }
    sum += t;
  }
  const name = { forward: "Gauss's forward", backward: "Gauss's backward", stirling: "Stirling's" }[formula];
  steps.push(`\\text{${name} formula: } y = ${terms.join(' + ')}`);
  steps.push(`\\boxed{y(${fmt(x)}) = ${fmt(sum)}}`);
  return { result: { y: sum, u, x0: xs[o], table: cols }, steps };
}

// ---------------------------------------------------------------- differentiation

// method: 'forward2' | 'forward3' | 'backward2' | 'backward3' | 'central2' | 'central3'
export function differentiate({ xs, ys, x, method = 'central2' }) {
  const i = xs.indexOf(x);
  if (i === -1) throw new Error(`x = ${x} is not one of the table's x values.`);
  const h = spacing(xs);
  const at = (k) => (k >= 0 && k < xs.length ? ys[k] : NaN);
  const steps = [];
  let f = null, order = '';
  if (method === 'forward2') {
    order = 'O(h)';
    f = (at(i + 1) - at(i)) / h;
    steps.push(`f'(${fmt(x)}) = \\frac{f(x + h) - f(x)}{h} = \\frac{${fmt(at(i + 1))} - ${fmt(at(i))}}{${fmt(h)}} = ${fmt(f)}`);
  } else if (method === 'forward3') {
    order = 'O(h^2)';
    f = (-3 * at(i) + 4 * at(i + 1) - at(i + 2)) / (2 * h);
    steps.push(`f'(${fmt(x)}) = \\frac{-3f(x) + 4f(x + h) - f(x + 2h)}{2h} = \\frac{${fmt(-3 * at(i))} + ${fmt(4 * at(i + 1))} - ${fmt(at(i + 2))}}{${fmt(2 * h)}} = ${fmt(f)}`);
  } else if (method === 'backward2') {
    order = 'O(h)';
    f = (at(i) - at(i - 1)) / h;
    steps.push(`f'(${fmt(x)}) = \\frac{f(x) - f(x - h)}{h} = ${fmt(f)}`);
  } else if (method === 'backward3') {
    order = 'O(h^2)';
    f = (3 * at(i) - 4 * at(i - 1) + at(i - 2)) / (2 * h);
    steps.push(`f'(${fmt(x)}) = \\frac{3f(x) - 4f(x - h) + f(x - 2h)}{2h} = ${fmt(f)}`);
  } else if (method === 'central2') {
    order = 'O(h^2)';
    f = (at(i + 1) - at(i - 1)) / (2 * h);
    steps.push(`f'(${fmt(x)}) = \\frac{f(x + h) - f(x - h)}{2h} = \\frac{${fmt(at(i + 1))} - ${fmt(at(i - 1))}}{${fmt(2 * h)}} = ${fmt(f)}`);
  } else if (method === 'central3') {
    order = 'O(h^4)';
    f = (-at(i + 2) + 8 * at(i + 1) - 8 * at(i - 1) + at(i - 2)) / (12 * h);
    steps.push(`f'(${fmt(x)}) = \\frac{-f(x + 2h) + 8f(x + h) - 8f(x - h) + f(x - 2h)}{12h} = ${fmt(f)}`);
  } else if (method === 'secondCentral') {
    order = 'O(h^2)';
    f = (at(i + 1) - 2 * at(i) + at(i - 1)) / (h * h);
    steps.push(`f''(${fmt(x)}) = \\frac{f(x + h) - 2f(x) + f(x - h)}{h^2} = ${fmt(f)}`);
  }
  steps.push(`\\text{Error order: } ${order}`);
  return { result: { derivative: f, order }, steps };
}

// Richardson extrapolation from two step sizes h and h/2 (central differences).
export function richardson({ expr, x, h }) {
  const f = compile(expr);
  const steps = [];
  const d = (hh) => (f(x + hh) - f(x - hh)) / (2 * hh);
  const d1 = d(h), d2 = d(h / 2);
  const R = (4 * d2 - d1) / 3;
  steps.push(`D(h) = \\frac{f(x + h) - f(x - h)}{2h} = ${fmt(d1)} \\quad (O(h^2))`);
  steps.push(`D(h/2) = ${fmt(d2)} \\quad (O(h^2))`);
  steps.push(`R = \\frac{4D(h/2) - D(h)}{3} = \\frac{4(${fmt(d2)}) - (${fmt(d1)})}{3} = ${fmt(R)} \\quad (O(h^4))`);
  steps.push(`\\boxed{f'(${fmt(x)}) \\approx ${fmt(R)}}`);
  return { result: { coarse: d1, fine: d2, richardson: R }, steps };
}

// ---------------------------------------------------------------- chopping and rounding

// Chopping and rounding to n significant digits, following the rule the errors
// chapter teaches (Shanker Rao): keep the first n significant digits, then
//   * discarded part less than 5        -> leave the retained digits unchanged
//   * discarded part greater than 5     -> add 1 to the last retained digit
//   * discarded part exactly 5 with other non-zero digits -> add 1
//   * discarded part exactly 5 with all zeros -> even-digit rule: leave the last
//     retained digit if it is even, add 1 if it is odd.
export function chopRound({ value, digits }) {
  const n = Math.max(1, Math.floor(digits));
  const neg = value < 0;
  // Work on the decimal string so the digits are exactly the ones written.
  const [ip, fp = ''] = Math.abs(value).toString().split('.');
  const all = ip + fp;
  const dp = ip.length; // digits before the point
  let first = 0;
  while (first < all.length && all[first] === '0') first++;
  if (first === all.length) {
    return { result: { chopped: 0, rounded: 0 }, steps: ['\\boxed{0}'] };
  }
  const sig = all.slice(first); // the significant digits, in order
  // A digit string R of n digits sits at 10^(dp - first - n).
  const place = (R) => {
    const num = Number(R) * Math.pow(10, dp - first - n);
    return Number((neg ? -num : num).toPrecision(12));
  };
  const keep = sig.slice(0, n);
  const dropped = sig.slice(n);
  // Chopping: keep the digits, drop the rest.
  const chopped = place(keep);
  // Rounding: the first dropped digit decides, unless it is exactly 5.
  let roundDigits = keep;
  const bump = () => {
    const d = keep.split('');
    let i = d.length - 1;
    while (i >= 0 && d[i] === '9') { d[i] = '0'; i--; }
    if (i < 0) return '1' + d.join('');
    d[i] = String(Number(d[i]) + 1);
    return d.join('');
  };
  if (dropped.length) {
    const d0 = Number(dropped[0]);
    const restNonZero = dropped.slice(1).split('').some((c) => c !== '0');
    if (d0 > 5 || (d0 === 5 && restNonZero)) roundDigits = bump();
    else if (d0 === 5 && !restNonZero && Number(keep[keep.length - 1]) % 2 === 1) roundDigits = bump(); // even-digit rule
  }
  const rounded = place(roundDigits);
  const steps = [];
  steps.push(`\\textbf{Number: } ${value} \\quad (${sig.length} significant digit(s))`);
  steps.push(`\\textbf{Chopping to ${n} figure(s): } keep ${keep} -> ${fmt(chopped)}`);
  steps.push(`\\textbf{Rounding to ${n} figure(s): } keep ${keep} -> ${fmt(rounded)}`);
  steps.push(`\\boxed{\\text{chopped } ${fmt(chopped)}, \\quad \\text{rounded } ${fmt(rounded)}}`);
  return { result: { chopped, rounded }, steps };
}

// ---------------------------------------------------------------- integration

export function integrate({ xs, ys, method = 'trapezoid' }) {
  const n = xs.length;
  const N = n - 1; // number of subintervals
  const h = spacing(xs);
  const steps = [`h = x_1 - x_0 = ${fmt(h)}, \\quad n = ${N} \\text{ subintervals}`];
  let value = 0;
  if (method === 'trapezoid') {
    let s = (ys[0] + ys[n - 1]) / 2 + ys.slice(1, n - 1).reduce((a, b) => a + b, 0);
    value = h * s;
    steps.push(`\\textbf{Trapezoidal rule: } I \\approx \\frac{h}{2}\\left[y_0 + 2(y_1 + \\cdots + y_{n-1}) + y_n\\right]`);
    steps.push(`I \\approx ${fmt(h)}(${fmt(ys[0])} + 2(${ys.slice(1, n - 1).map((v) => fmt(v)).join(' + ')}) + ${fmt(ys[n - 1])}) = ${fmt(value)}`);
    steps.push('\\text{Error: } -\\frac{(b - a)h^2}{12}f\'\'(\\xi)');
  } else if (method === 'simpson13') {
    if (N % 2 !== 0) throw new Error('Simpson\'s 1/3 rule needs an even number of subintervals.');
    let s = ys[0] + ys[n - 1];
    for (let i = 1; i < n - 1; i++) s += (i % 2 ? 4 : 2) * ys[i];
    value = (h / 3) * s;
    steps.push('\\textbf{Simpson\'s 1/3 rule: } I \\approx \\frac{h}{3}\\left[y_0 + 4(y_1 + y_3 + \\cdots) + 2(y_2 + y_4 + \\cdots) + y_n\\right]');
    steps.push(`I \\approx \\frac{${fmt(h)}}{3}\\left[${fmt(ys[0])} + 4(${oddOrEven(ys, n, true)}) + 2(${oddOrEven(ys, n, false)}) + ${fmt(ys[n - 1])}\\right] = ${fmt(value)}`);
    steps.push('\\text{Error: } -\\frac{(b - a)h^4}{180}f^{(4)}(\\xi)');
  } else if (method === 'simpson38') {
    if (N % 3 !== 0) throw new Error('Simpson\'s 3/8 rule needs a multiple of three subintervals.');
    // composite form: weight 2 on the ordinates shared by two panels (every third), 3 on the rest
    let s = ys[0] + ys[n - 1];
    for (let i = 1; i < n - 1; i++) s += (i % 3 ? 3 : 2) * ys[i];
    value = (3 * h / 8) * s;
    const inner = (keep) => ys.slice(1, n - 1).filter((_, j) => ((j + 1) % 3 !== 0) === keep).map((v) => fmt(v)).join(' + ');
    steps.push('\\textbf{Simpson\'s 3/8 rule: } I \\approx \\frac{3h}{8}\\left[y_0 + 3(y_1 + y_2 + y_4 + y_5 + \\cdots) + 2(y_3 + y_6 + \\cdots) + y_n\\right]');
    steps.push(`I \\approx \\frac{3(${fmt(h)})}{8}\\left[${fmt(ys[0])} + 3(${inner(true)})${N > 3 ? ` + 2(${inner(false)})` : ''} + ${fmt(ys[n - 1])}\\right] = ${fmt(value)}`);
    steps.push('\\text{Error: } -\\frac{3(b - a)h^4}{80}f^{(4)}(\\xi)');
  } else if (method === 'weddle') {
    if (N % 6 !== 0) throw new Error("Weddle's rule needs a multiple of six subintervals.");
    const pattern = [1, 5, 1, 6, 1, 5];
    // an ordinate shared by two six-strip panels (every sixth, interior) carries weight 1 + 1
    const weight = (i) => pattern[i % 6] + (i % 6 === 0 && i > 0 && i < n - 1 ? 1 : 0);
    let s = 0;
    for (let i = 0; i < n; i++) s += weight(i) * ys[i];
    value = (3 * h / 10) * s;
    steps.push("\\textbf{Weddle's rule: } I \\approx \\frac{3h}{10}\\left[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6 + \\cdots + y_n\\right]");
    steps.push(`I \\approx \\frac{3(${fmt(h)})}{10}\\left[${ys.map((v, i) => `${weight(i) === 1 ? '' : weight(i)}(${fmt(v)})`).join(' + ')}\\right] = ${fmt(value)}`);
    steps.push('\\text{Error: } -\\frac{h^7}{140}f^{(6)}(\\xi)');
  } else if (method === 'compositeTrapezoid') {
    value = h * ((ys[0] + ys[n - 1]) / 2 + ys.slice(1, n - 1).reduce((a, b) => a + b, 0));
    steps.push('\\textbf{Composite trapezoidal rule} (the single trapezoidal rule applied to each pair):');
    steps.push(`I \\approx ${fmt(value)}`);
  } else if (method === 'compositeSimpson13') {
    if (N % 2 !== 0) throw new Error('Composite Simpson\'s 1/3 rule needs an even number of subintervals.');
    let s = ys[0] + ys[n - 1];
    for (let i = 1; i < n - 1; i++) s += (i % 2 ? 4 : 2) * ys[i];
    value = (h / 3) * s;
    steps.push('\\textbf{Composite Simpson\'s 1/3 rule}:');
    steps.push(`I \\approx ${fmt(value)}`);
  }
  steps.push(`\\boxed{I \\approx ${fmt(value)}}`);
  return { result: { value }, steps };
}

const oddOrEven = (ys, n, odd) =>
  ys.slice(1, n - 1).filter((_, i) => (i + 1) % 2 === (odd ? 1 : 0)).map((v) => fmt(v)).join(' + ');

// Romberg integration: trapezoidal rule refined, then Richardson on each column.
// rule 'shanker' (Shanker Rao §9.10, as taught in class): trapezoid with 2, 4, … n strips, and
// I = (4·I_fine − I_coarse)/3 at every level. rule 'standard' (Chapra): 1, 2, … n strips and
// R_kj = R_k,j-1 + (R_k,j-1 − R_k-1,j-1)/(4^j − 1).
export function romberg({ expr, a, b, n = 8, rule = 'shanker' }) {
  if (n < 2 || !Number.isInteger(Math.log2(n))) throw new Error('n must be a power of 2 (2, 4, 8, …).');
  const f = compile(expr);
  const steps = [];
  const table = [];
  for (let m = rule === 'shanker' ? 2 : 1; m <= n; m *= 2) {
    const h = (b - a) / m;
    let s = (f(a) + f(b)) / 2;
    for (let i = 1; i < m; i++) s += f(a + i * h);
    const row = [h * s];
    const k = table.length;
    for (let j = 1; j <= k; j++) {
      const prev = table[k - 1][j - 1];
      const cur = row[j - 1];
      row[j] = cur + (cur - prev) / (rule === 'shanker' ? 3 : 4 ** j - 1);
    }
    table.push(row);
  }
  steps.push(rule === 'shanker'
    ? '\\textbf{Romberg table}\\text{ (trapezoid with } h, \\tfrac{h}{2}, \\tfrac{h}{4}, \\dots\\text{; every later entry } = \\tfrac{4I_{\\text{fine}} - I_{\\text{coarse}}}{3}\\text{)}'
    : '\\textbf{Romberg table}\\text{ (trapezoid with 1, 2, 4, \\dots\\ strips; column } j \\text{ divides by } 4^j - 1\\text{)}');
  steps.push(
    '\\begin{array}{c|' + 'c'.repeat(table.length) + '} \\hline ' +
    table.map((_, k) => `R_{${k}}`).join(' & ') + ' \\\\ \\hline ' +
    table.map((r) => r.map((v) => fmt(v)).join(' & ')).join(' \\\\ ') + ' \\end{array}',
  );
  const last = table[table.length - 1];
  steps.push(`\\boxed{I \\approx R_{${table.length - 1},${table.length - 1}} = ${fmt(last[last.length - 1])}}`);
  return { result: { value: last[last.length - 1], table }, steps };
}

// ---------------------------------------------------------------- regression

// Least squares straight line y = a + b x, from the normal equations.
export function leastSquares({ xs, ys }) {
  const n = xs.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  xs.forEach((x, i) => { sx += x; sy += ys[i]; sxx += x * x; sxy += x * ys[i]; });
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const a = (sy - b * sx) / n;
  const ybar = sy / n;
  const sst = ys.reduce((s, y) => s + (y - ybar) ** 2, 0);
  const sse = ys.reduce((s, y, i) => s + (y - (a + b * xs[i])) ** 2, 0);
  const r2 = 1 - sse / sst;
  const steps = [
    '\\textbf{Normal equations} \\; \\sum y = na + b\\sum x, \\quad \\sum xy = a\\sum x + b\\sum x^2',
    `\\sum x = ${fmt(sx)}, \\; \\sum y = ${fmt(sy)}, \\; \\sum x^2 = ${fmt(sxx)}, \\; \\sum xy = ${fmt(sxy)}, \\; n = ${n}`,
    `b = \\frac{n\\sum xy - \\sum x \\sum y}{n\\sum x^2 - (\\sum x)^2} = \\frac{${n}(${fmt(sxy)}) - (${fmt(sx)})(${fmt(sy)})}{${n}(${fmt(sxx)}) - (${fmt(sx)})^2} = ${fmt(b)}`,
    `a = \\bar{y} - b\\bar{x} = ${fmt(ybar)} - (${fmt(b)})(${fmt(sx / n)}) = ${fmt(a)}`,
    `\\boxed{y = ${fmt(a)} ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}x}`,
    `\\text{Coefficient of determination: } R^2 = 1 - \\frac{SSE}{SST} = ${fmt(r2)}`,
  ];
  return { result: { a, b, r2 }, steps };
}

// Power law fit y = a x^b via log-log linear regression.
export function powerLawFit({ xs, ys }) {
  const lx = xs.map((x) => Math.log(x));
  const ly = ys.map((y) => Math.log(y));
  const { a: la, b: lb } = leastSquares({ xs: lx, ys: ly }).result;
  const a = Math.exp(la);
  const steps = [
    'Take logs: \\; \\ln y = \\ln a + b\\ln x, \\text{ so fit a straight line to } (\\ln x, \\ln y).',
    `b = ${fmt(lb)}, \\quad \\ln a = ${fmt(la)} \\Rightarrow a = e^{${fmt(la)}} = ${fmt(a)}`,
    `\\boxed{y = ${fmt(a)}\\,x^{${fmt(lb)}}}`,
  ];
  return { result: { a, b: lb }, steps };
}

// Solve normal equations C a = B with the course's own elimination, returning a_1..a_m.
const solveNormal = (C, B) => {
  const x = gaussEliminate({ A: C, b: B }).result.x;
  if (!x.every(Number.isFinite)) throw new Error('the normal equations are dependent (one variable is a linear function of another): no unique fit');
  return x;
};

// Least-squares polynomial y = a_1 + a_2 x + ... + a_m x^{m-1} (Balagurusamy §10.4, Eq. 10.19):
// C(j,k) = Σ x^{j+k-2}, B(j) = Σ y x^{j-1}.
export function polyRegression({ xs, ys, degree = 2 }) {
  const m = degree + 1;
  if (xs.length <= degree) throw new Error('regression is not possible: need more points than the degree');
  const S = (p) => xs.reduce((s, x) => s + x ** p, 0);
  const T = (p) => xs.reduce((s, x, i) => s + ys[i] * x ** p, 0);
  const C = Array.from({ length: m }, (_, j) => Array.from({ length: m }, (_, k) => S(j + k)));
  const B = Array.from({ length: m }, (_, j) => T(j));
  const a = solveNormal(C, B);
  const term = (v, j) => `${fmt(v)}a_{${j + 1}}`;
  const steps = [
    `\\textbf{Sums} \\; ${Array.from({ length: 2 * m - 1 }, (_, p) => p === 0 ? `n = ${xs.length}` : `\\sum x^{${p}} = ${fmt(S(p))}`).join(', \\; ')}`,
    `${B.map((v, j) => `\\sum y x^{${j}} = ${fmt(v)}`).join(', \\; ')}`,
    `\\textbf{Normal equations} \\; ${C.map((r, j) => r.map(term).join(' + ') + ` = ${fmt(B[j])}`).join(', \\quad ')}`,
    `${a.map((v, j) => `a_{${j + 1}} = ${fmt(v)}`).join(', \\; ')}`,
    `\\boxed{y = ${a.map((v, j) => (j === 0 ? fmt(v) : `${v < 0 ? '-' : '+'} ${fmt(Math.abs(v)) === '1' ? '' : fmt(Math.abs(v))}x${j > 1 ? `^{${j}}` : ''}`)).join(' ')}}`,
  ];
  return { result: { a }, steps };
}

// Multiple linear regression y = a_1 + a_2 x + a_3 z (Balagurusamy §10.5, Eq. 10.21).
export function multipleRegression({ xs, zs, ys }) {
  const n = xs.length;
  const sum = (f) => xs.reduce((s, _, i) => s + f(i), 0);
  const sx = sum((i) => xs[i]), sz = sum((i) => zs[i]), sy = sum((i) => ys[i]);
  const sxx = sum((i) => xs[i] ** 2), szz = sum((i) => zs[i] ** 2), sxz = sum((i) => xs[i] * zs[i]);
  const syx = sum((i) => ys[i] * xs[i]), syz = sum((i) => ys[i] * zs[i]);
  const C = [[n, sx, sz], [sx, sxx, sxz], [sz, sxz, szz]];
  const B = [sy, syx, syz];
  const a = solveNormal(C, B);
  const steps = [
    `\\textbf{Sums} \\; n = ${n}, \\sum x = ${fmt(sx)}, \\sum z = ${fmt(sz)}, \\sum y = ${fmt(sy)}, \\sum x^2 = ${fmt(sxx)}, \\sum z^2 = ${fmt(szz)}, \\sum xz = ${fmt(sxz)}, \\sum yx = ${fmt(syx)}, \\sum yz = ${fmt(syz)}`,
    `\\textbf{Normal equations} \\; ${C.map((r, j) => r.map((v, k) => `${fmt(v)}a_{${k + 1}}`).join(' + ') + ` = ${fmt(B[j])}`).join(', \\quad ')}`,
    `a_1 = ${fmt(a[0])}, \\; a_2 = ${fmt(a[1])}, \\; a_3 = ${fmt(a[2])}`,
    `\\boxed{y = ${fmt(a[0])} ${a[1] < 0 ? '-' : '+'} ${fmt(Math.abs(a[1]))}x ${a[2] < 0 ? '-' : '+'} ${fmt(Math.abs(a[2]))}z}`,
  ];
  return { result: { a }, steps };
}

// Gradient descent on a polynomial regression: mode 'batch' or 'single'.
export function gradientDescent({ xs, ys, degree = 1, theta0 = [0, 0], alpha = 0.01, epochs = 5, mode = 'batch' }) {
  const d = degree + 1;
  if (theta0.length !== d) throw new Error(`the starting parameters need ${d} values (degree ${degree} + 1).`);
  let theta = [...theta0];
  const names = ['\\theta_0', '\\theta_1', '\\theta_2'];
  const basis = (x) => Array.from({ length: d }, (_, k) => x ** k);
  const predict = (x, t) => basis(x).reduce((s, b, k) => s + b * t[k], 0);
  const steps = [];
  steps.push(
    mode === 'batch'
      ? '\\textbf{Batch mode}: the parameters are updated once per epoch, after the whole table has been used.'
      : '\\textbf{Single mode}: the parameters are updated after every row; drop the \\sum symbol.',
  );
  steps.push(
    `\\text{Cost: } J(\\theta) = \\frac{1}{2m}\\sum_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)^2`,
  );
  steps.push(
    `\\text{Update: } \\theta_j \\leftarrow \\theta_j - \\alpha\\frac{\\partial J}{\\partial \\theta_j}, \\qquad \\alpha = ${fmt(alpha)}`,
  );
  steps.push(
    `\\frac{\\partial J}{\\partial \\theta_j} = ${mode === 'batch' ? '\\frac{1}{m}\\sum' : ''}(H_\\theta(x^{(i)}) - y^{(i)})\\,x^{(i)}_j`,
  );
  const m = xs.length;
  const rows = [];
  for (let e = 1; e <= epochs; e++) {
    const grad = new Array(d).fill(0);
    const line = [];
    for (let i = 0; i < m; i++) {
      const err = predict(xs[i], theta) - ys[i];
      const b = basis(xs[i]);
      if (mode === 'batch') {
        for (let j = 0; j < d; j++) grad[j] += err * b[j];
      } else {
        for (let j = 0; j < d; j++) grad[j] = err * b[j];
        for (let j = 0; j < d; j++) theta[j] -= alpha * grad[j];
        line.push(`  (x=${fmt(xs[i])}, y=${fmt(ys[i])}) \\; H_\\theta = ${fmt(predict(xs[i], theta))}, \\; e = ${fmt(err)}, \\; \\Delta\\theta = ${theta.map((t, j) => `${names[j]} = ${fmt(t)}`).join(', ')}`);
      }
    }
    if (mode === 'batch') {
      for (let j = 0; j < d; j++) grad[j] /= m;
      const before = [...theta];
      for (let j = 0; j < d; j++) theta[j] -= alpha * grad[j];
      line.push(`  epoch ${e}: \\; \\partial J/\\partial\\theta_j = ${grad.map((g) => fmt(g)).join(', ')}, \\; \\theta: ${before.map((t, j) => fmt(t)).join(', ')} \\to ${theta.map((t) => fmt(t)).join(', ')}`);
    }
    rows.push(line.join('\n'));
  }
  steps.push('\\textbf{Iteration table}');
  steps.push(rows.join('\n'));
  steps.push(`\\boxed{\\theta_0 = ${fmt(theta[0])}, \\quad \\theta_1 = ${fmt(theta[1])}${degree > 1 ? `, \\quad \\theta_2 = ${fmt(theta[2])}` : ''}}`);
  return { result: { theta }, steps };
}

// ---------------------------------------------------------------- PCA

// Jacobi eigenvalue algorithm for a symmetric matrix.
function jacobiEigen(A0) {
  const n = A0.length;
  let A = A0.map((r) => [...r]);
  let V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-22) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-15) continue;
        const tau = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = Math.sign(tau || 1) / (Math.abs(tau) + Math.sqrt(tau * tau + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = A[k][p], akq = A[k][q];
          A[k][p] = c * akp - s * akq;
          A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = A[p][k], aqk = A[q][k];
          A[p][k] = c * apk - s * aqk;
          A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = V[k][p], vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
        A[p][q] = 0; A[q][p] = 0;
      }
    }
  }
  const vals = A.map((r, i) => r[i]);
  const order = vals.map((v, i) => i).sort((a, b) => vals[b] - vals[a]);
  const eigvals = order.map((i) => vals[i]);
  const eigvecs = order.map((i) => {
    const v = V.map((r) => r[i]);
    const biggest = v.reduce((best, c, k) => (Math.abs(c) > Math.abs(v[best]) ? k : best), 0);
    return v[biggest] < 0 ? v.map((c) => -c) : v;
  });
  return { eigvals, eigvecs };
}

export function pca({ points, threshold = 95, scale = false }) {
  const m = points.length;
  const n = points[0].length;
  const mean = Array.from({ length: n }, (_, j) => points.reduce((s, p) => s + p[j], 0) / m);
  const steps = [];
  steps.push(`\\textbf{Step 1: preprocessing} \\quad \\bar{x} = (${mean.map((v) => fmt(v)).join(', ')})`);
  const centred = points.map((p) => p.map((v, j) => v - mean[j]));
  steps.push(`\\text{Mean-normalised points: } ${points.map((p, i) => `(${centred[i].map((v) => fmt(v)).join(', ')})`).join(', ')}`);
  const sd = Array.from({ length: n }, (_, j) => Math.sqrt(centred.reduce((s, p) => s + p[j] ** 2, 0) / m));
  let work = centred;
  if (scale) {
    work = centred.map((p) => p.map((v, j) => v / sd[j]));
    steps.push(`\\text{Scaled points (divide each column by its standard deviation): } ${sd.map((v) => fmt(v)).join(', ')}`);
    steps.push(`\\text{Scaled points: } ${work.map((p) => p.map((v) => fmt(v)).join(', ')).join('; ')}`);
  }
  const cov = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => work.reduce((s, p) => s + p[i] * p[j], 0) / m),
  );
  steps.push(`\\textbf{Step 2: covariance matrix} \\quad \\Sigma = \\frac{1}{${m}}\\sum (x^{(i)}-\\bar{x})(x^{(i)}-\\bar{x})^T = ${tex(cov)}`);

  const { eigvals, eigvecs } = jacobiEigen(cov);
  steps.push(`\\textbf{Step 3: eigenvalues} \\quad ${eigvals.map((v, k) => `\\lambda_${k + 1} = ${fmt(v)}`).join(', \\; ')}`);
  steps.push(`\\textbf{Step 4: eigenvectors} \\quad ${eigvecs.map((v, k) => `v_${k + 1} = ${v.map((c) => fmt(c)).join(', ')}`).join(', \\; ')}`);
  const V = transpose(eigvecs);
  steps.push(`\\text{Transformation matrix } V = ${tex(V)} \\text{ (eigenvectors stacked column-wise)}`);

  const total = eigvals.reduce((a, b) => a + b, 0);
  const pct = eigvals.map((v) => (100 * v) / total);
  steps.push(`\\text{Variance along each PC: } ${pct.map((p, k) => `${fmt(p)}\\% (PC ${k + 1})`).join(', ')}`);
  let keep = 1;
  let acc = pct[0];
  while (keep < n && acc < threshold) { keep++; acc += pct[keep - 1]; }
  steps.push(`\\text{Keep } ${keep} \\text{ component(s): } ${fmt(acc)}\\% \\ge ${threshold}\\%`);

  const proj = points.map((p) => p.map((_, j) => eigvecs[j].reduce((s, v, k) => s + v * p[k], 0)));
  steps.push(`\\textbf{Step 5: transform the points} \\quad Y = X\\,V = ${proj.map((r) => `(${r.map((v) => fmt(v)).join(', ')})`).join(', ')}`);
  const recon = proj.map((r) => r.slice(0, keep).reduce((acc, v, k) => {
    const out = new Array(n).fill(0);
    eigvecs[k].forEach((c, j) => { out[j] += v * c; });
    return out.map((o, j) => acc[j] + o);
  }, new Array(n).fill(0)));
  steps.push(`\\textbf{Step 6: reconstruct} \\quad X_r = Y\\,V^T = ${recon.map((r) => `(${r.map((v) => fmt(v)).join(', ')})`).join(', ')}`);
  const errs = points.map((p, i) => p.map((v, j) => v - recon[i][j]));
  const mae = Array.from({ length: n }, (_, j) => errs.reduce((s, e) => s + Math.abs(e[j]), 0) / m);
  const sse = Array.from({ length: n }, (_, j) => errs.reduce((s, e) => s + e[j] ** 2, 0));
  const rmse = Array.from({ length: n }, (_, j) => Math.sqrt(sse[j] / m));
  steps.push(`\\text{MAE} = (${mae.map((v) => fmt(v)).join(', ')}), \\quad \\text{SSE} = (${sse.map((v) => fmt(v)).join(', ')}), \\quad \\text{RMSE} = (${rmse.map((v) => fmt(v)).join(', ')})`);
  return { result: { mean, sd, cov, eigvals, eigvecs, V, pct, keep, proj, recon, mae, sse, rmse, errs }, steps };
}
