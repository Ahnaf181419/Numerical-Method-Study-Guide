// CSE 2201 — Roots of Equations (Chapter 2)
// Source of record: Shanker Rao, "Numerical Analysis", Ch. 2 (Solution of Algebraic and
// Transcendental Equations) — slides/Interpolation/(TextBook) Shanker Rao (Numerical Analysis) (v2).md
// Every number below is taken from that extract or verified with src/lib/solvers.js.
// Horner's rule, the plain secant method and the spherical-tank problem are NOT in the
// extracted text — they are taught here with the standard textbook method and flagged.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Why do numerical root-finding methods exist?",
    options: ["Because algebra is always faster", "Because many equations have no formula that isolates the unknown", "Because graphs cannot be drawn", "Because calculators are inaccurate"],
    answer: 1,
    explain: "Equations like the tank cubic cannot be solved by rearranging, so the root must be hunted numerically.",
  },
  "Start here: the core idea": {
    q: "For continuous $f$, what does $f(a) f(b) < 0$ guarantee?",
    options: ["Both $f(a)$ and $f(b)$ are negative", "A root lies between $a$ and $b$", "The function is a straight line", "There are exactly two roots"],
    answer: 1,
    explain: "Opposite signs mean the graph crossed zero inside the interval — the intermediate value theorem.",
  },
  "Start here: reading the symbols": {
    q: "In bisection, what is $c$?",
    options: ["The previous guess", "The midpoint $\\\\frac{a+b}{2}$", "The tolerance", "The derivative"],
    answer: 1,
    explain: "Each iteration tests the midpoint of the current bracket and keeps the half with the sign change.",
  },
  "Start here: your first walk-through": {
    q: "After each bisection iteration, the interval trapping the root…",
    options: ["doubles in width", "halves in width", "stays the same", "moves to the origin"],
    answer: 1,
    explain: "You keep one half of the bracket, so the uncertainty halves every iteration — guaranteed, linear convergence.",
  },
  'What a root is and why we approximate it': {
    q: 'By Theorem 2.1, if $f$ is continuous on $(a,b)$ and $f(a)f(b) < 0$, then',
    options: [
      'there is at least one root of $f(x) = 0$ in $(a,b)$',
      'there is exactly one root in $(a,b)$',
      'there is no root in $(a,b)$',
      'the root is $x = (a+b)/2$',
    ],
    answer: 0,
    explain: 'A sign change guarantees at least one root; it does not guarantee only one. For exactly one root you also need f to keep the same sign of derivative on the interval.',
  },
  'Fixed-point iteration': {
    q: 'The iteration $x_{n+1} = \\phi(x_n)$ converges to the root $\\alpha$ provided that',
    options: [
      '$|\\phi\'(x)| < 1$ on an interval containing $\\alpha$ and $x_0$ in that interval',
      '$|\\phi\'(x)| > 1$ near $\\alpha$',
      '$\\phi(x) = 0$ has two roots',
      '$f(x)$ is a polynomial of degree 2',
    ],
    answer: 0,
    explain: 'Theorem 2.2: if $|\\phi\'(x)| < 1$ throughout the interval I and $x_0 \\in I$, the sequence converges to the root. If $|\\phi\'(x)| > 1$ it diverges.',
  },
  'Bisection method': {
    q: 'Starting from the interval $(a,b)$, the width of the bisection interval after $n$ steps is',
    options: ['$\\dfrac{b-a}{2^{n}}$', '$\\dfrac{b-a}{n}$', '$\\dfrac{b-a}{2}$', '$(b-a)^{n}$'],
    answer: 0,
    explain: 'Each step halves the interval, so the width is $(b-a)/2^n$ and the error of the midpoint is at most $(b-a)/2^{n+1}$.',
  },
  'Newton-Raphson method': {
    q: 'The Newton-Raphson iteration is',
    options: [
      '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$',
      '$x_{n+1} = x_n - f(x_n)\\cdot f\'(x_n)$',
      '$x_{n+1} = \\dfrac{a+b}{2}$',
      '$x_{n+1} = x_n + \\dfrac{f(x_n)}{f\'(x_n)}$',
    ],
    answer: 0,
    explain: 'It is the tangent-line formula: the next point is where the tangent at $x_n$ meets the x-axis.',
  },
  'Secant method': {
    q: 'The secant method replaces $f\'(x)$ by',
    options: [
      'the difference quotient $\\dfrac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$ (a chord)',
      'the exact symbolic derivative',
      'the second derivative $f\'\'(x)$',
      'the midpoint of the starting interval',
    ],
    answer: 0,
    explain: 'No derivative is needed: the secant through the last two approximations plays the part of the tangent, which is why the method needs two starting values.',
  },
  "Horner's rule and synthetic division": {
    q: 'In Horner’s scheme for $p(x) = a_0x^n + a_1x^{n-1} + \\dots + a_n$ evaluated at $x = r$, the value $p(r)$ is',
    options: [
      'the last $b$ in $b_0 = a_0$, $b_i = a_i + r\\,b_{i-1}$',
      'the first coefficient $a_0$',
      'the sum of all the $b_i$',
      'the product of all the $b_i$',
    ],
    answer: 0,
    explain: 'Horner’s recursion evaluates the polynomial in n multiplications; the final $b_n$ equals $p(r)$ and $b_0 \\dots b_{n-1}$ are the coefficients of the quotient.',
  },
  'Finding all roots by repeated deflation': {
    q: 'After deflating $p(x)$ at a root $r$, the quotient $q(x)$ has',
    options: [
      'exactly the remaining roots of $p$',
      'no roots at all',
      'the root $r$ repeated',
      'the roots of $p\'(x)$',
    ],
    answer: 0,
    explain: 'Since $p(x) = (x-r)q(x)$, every root of $q$ is a root of $p$, and the only root of $p$ that is not a root of $q$ is $r$.',
  },
  'Choosing the right method': {
    q: 'Which method is guaranteed to converge once $f(a)f(b) < 0$, but only linearly?',
    options: ['Bisection', 'Newton-Raphson', 'Secant', 'Fixed-point iteration with $|\\phi\'| < 1$'],
    answer: 0,
    explain: 'Bisection always converges because it keeps a sign-change bracket, but it needs many iterations. Newton and the secant method are faster but need a good starting value.',
  },
};

export default {
  id: 'roots',
  chapter: 2,
  title: 'Roots of Equations',
  wave: 'root',
  sources: ['Shanker Rao Ch 2', 'Past papers'],
  flagged: true,
  offSyllabus: true,
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Some equations cannot be undone. $x^2 - 10 = 0$ has the tidy answer $\\sqrt{10}$, but a cubic like the tank-depth problem in the past papers has **no formula at all** — no amount of algebra will isolate $h$. When algebra is a dead end, you need a machine-friendly way to corner the answer." },
        { type: "p", text: "That is root finding: the equation $f(x) = 0$ is re-read as the question 'where does the graph of $f$ cross the $x$-axis?', and the crossing point is hunted by a sequence of improving guesses." },
        { type: "p", text: "This chapter builds the four workhorses the exam chooses among — **bisection**, **fixed-point iteration**, **Newton-Raphson** and the **secant method** — plus the vocabulary (bracket, iteration, tolerance, convergence) every question is written in." },
        { type: "list", items: [
          "Decide which method a question is asking for.",
          "Run a bisection table without losing track of the bracket.",
          "Turn any equation into a fixed-point iteration $x = \\phi(x)$.",
          "Apply Newton-Raphson and know why it is fast.",
          "Talk about convergence and error the way the papers do.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Every method in this chapter is a different way of asking **'where does $f$ change sign?'** If $f$ is continuous and $f(a)$ and $f(b)$ have opposite signs, the graph must cross zero somewhere between $a$ and $b$ — the root is trapped." },
        { type: "math", tex: "f(a)\\, f(b) < 0 \\quad \\Longrightarrow \\quad \\text{a root lies in } (a, b)" },
        { type: "p", text: "**Bisection** plays the classic guessing game: test the midpoint, keep the half where the sign change lives, repeat. Each step halves the trap, so the root cannot escape. **Newton-Raphson** is smarter: stand at your guess, follow the tangent line down to where it crosses the axis, and move there — usually arriving in far fewer steps." },
        { type: "note", text: "Trade-off worth knowing for the 'which method is best' theory question: bisection is slow but **unconditionally convergent**; Newton-Raphson is fast (quadratic) but a bad starting guess can throw it off the track." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "p", text: "Root-finding questions are short once the symbols are familiar. This table covers every letter used in the chapter." },
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$f(x)$", "the function whose root is sought", "solve $f(x) = 0$"],
          ["$a,\\\\ b$", "the ends of a bracket", "the root is between them"],
          ["$c = \\\\frac{a+b}{2}$", "the bisection midpoint", "the next guess"],
          ["$x_0$", "the starting guess", "'x nought'"],
          ["$x_{n+1}$", "the next, improved guess", "produced from $x_n$"],
          ["$\\\\phi(x)$", "the rearranged form in $x = \\\\phi(x)$", "say 'phi of x'"],
          ["$\\\\varepsilon$", "tolerance: how close is close enough", "stop when the change is this small"],
        ] },
        { type: "p", text: "'Iteration' is one round of guess-and-improve. 'Convergence' means the guesses settle down; 'divergence' means they run away instead." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Spring 2024 Q2(a)**: find the largest root of $x^2 - 4x - 10 = 0$ using the bisection method. The exact answer is $2 + \\sqrt{14} = 5.7417$, so every step can be graded." },
        { type: "p", text: "$f(5) = -5$ and $f(6) = +2$: the sign changes, so the root is trapped in $(5, 6)$." },
        { type: "table", head: ["It", "$c$ (midpoint)", "$f(c)$", "Keep the half with the sign change"], rows: [
          ["1", "$5.5$", "$-1.75$", "$(5.5,\\ 6)$"],
          ["2", "$5.75$", "$+0.0625$", "$(5.5,\\ 5.75)$"],
          ["3", "$5.625$", "$-0.859$", "$(5.625,\\ 5.75)$"],
        ] },
        { type: "p", text: "Each row halves the trap — $1 \\to 0.5 \\to 0.25 \\to 0.125$ — and the exact root $5.7417$ never escapes it. **Asked in:** bisection to a stated accuracy is Fall 2023 Q2(a) ($x^3 - 9x + 1$, 2 significant digits) and Spring 2023 Q2(a) ($e^x - 3x$, 2 decimals); the relatives appear as Spring 2024 Q1(b) (derive the secant formula) and the Fall 2023 Q3(b) tank problem." },
        { type: "note", text: "The paper itself says to make the initial guesses with the **search-bracket formula**, which is not in your slides: $|x^*_{\\max}| = \\sqrt{(a_{n-1}/a_n)^2 - 2a_{n-2}/a_n} = 6$ and $x^* = -a_{n-1}/a_n = 4$, so the paper's start is $(4, 6)$. Its three iterations are $5 \\to 5.5 \\to 5.75$, ending in $(5.5,\\ 5.75)$ — see the full model answer under Exam prep → Past papers. The walk-through above starts from $(5, 6)$ to keep the first example short." },
        { type: "exam", text: "One line verifying the sign change, the iteration table with $c$ and $f(c)$ columns, then name the final bracket and the root it pins down." },
      ],
    },
    {
      heading: 'What a root is and why we approximate it',
      blocks: [
        {
          type: 'p',
          text: 'An equation $f(x) = 0$ is **algebraic** if $f(x)$ is purely a polynomial in $x$ (e.g. $x^3 - 7x + 8 = 0$) and **transcendental** if it contains other functions (e.g. $x - 2\\sin x = 0$, $e^x = 4x$).',
        },
        {
          type: 'p',
          text: 'The real number $\\alpha$ is a **root** (a zero of $f$) of $f(x) = 0$ if and only if $f(\\alpha) = 0$; geometrically it is the abscissa of the point where the graph of $y = f(x)$ meets the $x$-axis.',
        },
        { type: 'math', tex: 'f(\\alpha) = 0' },
        {
          type: 'p',
          text: 'Finding the roots is done in two stages: **isolating** them — finding the smallest possible interval $(a,b)$ that contains one and only one root — and then **improving** the values of the approximate roots to the specified degree of accuracy.',
        },
        {
          type: 'math',
          tex: 'f(a)\\,f(b) < 0 \\;\\Longrightarrow\\; \\text{at least one root in } (a,b)',
        },
        {
          type: 'p',
          text: 'That is **Theorem 2.1**. It is the only reason bisection works. Two assumptions run through the whole chapter: $f(x)$ is continuous and continuously differentiable as many times as needed, and $f(x) = 0$ has no multiple root, so $f\'(x)$ keeps one sign in $(a,b)$.',
        },
        {
          type: 'note',
          text: 'A sign change guarantees **at least** one root, not exactly one. If you need "exactly one", you must also use the monotonicity condition $f\'(x) \\neq 0$ on the interval.',
        },
        {
          type: 'exam',
          text: 'Start every root question the same way: write $f(x)$, evaluate $f(a)$ and $f(b)$, state the product $f(a)f(b) < 0$, and name the interval you are working in. That single line is worth a mark and it tells the examiner which root you mean.',
        },
      ],
    },
    {
      heading: 'Fixed-point iteration',
      blocks: [
        {
          type: 'p',
          text: 'Rewrite the equation in the form $x = \\phi(x)$. Then $x_1 = \\phi(x_0)$, $x_2 = \\phi(x_1)$, $x_3 = \\phi(x_2)$, and so on: the successive approximations are $x_n = \\phi(x_{n-1})$.',
        },
        {
          type: 'math',
          tex: 'x_{n+1} = \\phi(x_n)',
        },
        {
          type: 'p',
          text: '**Theorem 2.2.** Let $x = \\alpha$ be a root of $f(x) = 0$, equivalent to $x = \\phi(x)$, and let $I$ be an interval containing $\\alpha$. If $|\\phi\'(x)| < 1$ for all $x \\in I$, then the sequence $x_0, x_1, \\dots, x_n$ converges to the root $\\alpha$, provided the initial approximation $x_0$ is chosen in $I$.',
        },
        {
          type: 'p',
          text: 'The proof is the mean value theorem: $\\phi(x_{n-1}) - \\phi(\\alpha) = \\phi\'(\\beta)(x_{n-1} - \\alpha)$ for some $\\beta$ between $x_{n-1}$ and $\\alpha$, so with $\\lambda = \\max_{x\\in I}|\\phi\'(x)|$ the errors obey',
        },
        { type: 'math', tex: '|x_n - \\alpha| \\le \\lambda^{n}|x_0 - \\alpha|' },
        {
          type: 'p',
          text: 'For $\\lambda < 1$ the right-hand side goes to zero, so the iteration converges; for $\\lambda > 1$ the error grows indefinitely and the sequence **diverges**. The smaller $|\\phi\'(x)|$ is, the faster the convergence, and the error at each stage being proportional to the previous error is why the iteration method has **linear convergence**.',
        },
        {
          type: 'note',
          text: 'The same equation can be written in several ways, and the choice decides whether the iteration converges. Shanker Rao’s own note on $x^3 + x - 1 = 0$ gives two forms — pick the one whose derivative is smaller in magnitude near the root.',
        },
        {
          type: 'exam',
          text: 'Before iterating, write $\\phi(x)$ and compute $\\phi\'(x)$; then state $|\\phi\'(x)| < 1$ on the interval. That check is a mark on its own, and skipping it is why fixed-point questions go wrong.',
        },
      ],
    },
    {
      heading: 'Bisection method',
      blocks: [
        {
          type: 'p',
          text: 'Take $f(x)$ continuous on $(a_0, b_0)$ with $f(a_0)f(b_0) < 0$. Divide the interval in half, $x_1 = \\dfrac{a_0 + b_0}{2}$, and evaluate $f(x_1)$. If $f(a_0)f(x_1) < 0$ the root lies in $(a_0, x_1)$, otherwise in $(x_1, b_0)$. Rename that interval $(a_1, b_1)$ and repeat.',
        },
        { type: 'math', tex: 'x_{n+1} = \\frac{a_n + b_n}{2}, \\qquad b_n - a_n = \\frac{b_0 - a_0}{2^{n}}' },
        {
          type: 'p',
          text: 'The left end points $a_n$ form a monotonic non-decreasing bounded sequence and the right end points $b_n$ a monotonic non-increasing bounded sequence, so both have a common limit $c$ with $f(c) = 0$. The method is therefore certain to converge — it is **simple but slowly convergent**, and it is well suited to a computer.',
        },
        {
          type: 'p',
          text: '**Error bound.** After $n$ steps the interval has width $(b_0-a_0)/2^n$, so the root is within $\\dfrac{b_0-a_0}{2^{n+1}}$ of the midpoint you report. To get $p$ decimal places take $n$ so that $(b_0-a_0)/2^{n+1} < 0.5\\times10^{-p}$.',
        },
        {
          type: 'table',
          head: ['n', 'aₙ', 'bₙ', 'xₙ₊₁', 'f(xₙ₊₁)'],
          rows: [
            ['0', '2', '3', '2.5', '−5.875'],
            ['1', '2.5', '3', '2.75', '−2.9531'],
            ['2', '2.75', '3', '2.875', '−1.1113'],
            ['3', '2.875', '3', '2.9375', '−0.0901'],
            ['4', '2.9375', '3', '2.9688', '+0.4463'],
            ['5', '2.9375', '2.9688', '2.9531', '+0.1759'],
            ['6', '2.9375', '2.9531', '2.9453', '+0.0424'],
            ['7', '2.9375', '2.9453', '2.9414', '−0.0240'],
            ['8', '2.9414', '2.9453', '2.9434', '+0.0092'],
            ['9', '2.9414', '2.9434', '2.9424', '−0.0074'],
          ],
        },
        {
          type: 'p',
          text: 'That is the iteration table for $f(x) = x^3 - 9x + 1$ on $(2,3)$, which is the past-paper question. Note the sign test: $f$ is negative at $2.9375$ and positive at $2.9688$, so the root lies between them and the next midpoint is $2.9531$.',
        },
        {
          type: 'note',
          text: 'Shanker Rao prints this table with the midpoints $a_n$, $b_n$ rounded to three significant figures (his $x_4 = 2.94$, not $2.9375$) and he evaluates $f$ at those rounded numbers, which is why his $f$ values differ in the third decimal — his $-0.05$ is $f(2.94)$, while the unrounded midpoint $2.9375$ gives $-0.0901$. Write the table with full precision; the final answer 2.94 is the same.',
        },
        {
          type: 'exam',
          text: 'Give the table in the book’s columns — $n$, $a_n$, $b_n$, $x_{n+1}$, $f(x_{n+1})$ — and keep every row. Then write the sign test for the row you are on, and finish with the boxed root and the number of significant figures it is correct to.',
        },
      ],
    },
    {
      heading: 'Newton-Raphson method',
      blocks: [
        {
          type: 'p',
          text: 'Let $x = x_0$ be an approximate value of one root and let the exact root be $x_1 = x_0 + h$. Since $f(x_1) = 0$, expanding by Taylor’s theorem — see **The Taylor expansion in one page** in Chapter 1 — gives',
        },
        { type: 'math', tex: 'f(x_0) + f\'(x_0)h + \\frac{f\'\'(x_0)}{2!}h^2 + \\cdots = 0' },
        {
          type: 'p',
          text: 'Neglecting all powers of $h$ above the first (because $h$ is small), $f(x_0) + f\'(x_0)h = 0$ approximately, so $h = -f(x_0)/f\'(x_0)$ and therefore',
        },
        { type: 'math', tex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}' },
        {
          type: 'p',
          text: 'Geometrically, Newton replaces a small arc of the curve $y = f(x)$ by the **tangent** at $(x_n, f(x_n))$; the abscissa where that tangent meets the $x$-axis is the next approximation.',
        },
        {
          type: 'p',
          text: '**Order of convergence.** With $\\varepsilon_n = x_n - \\alpha$ the error obeys $\\varepsilon_{n+1} \\approx \\dfrac{f\'\'(\\alpha)}{2f\'(\\alpha)}\\,\\varepsilon_n^2$, so the error at each stage is proportional to the **square** of the previous error: Newton–Raphson has **quadratic convergence**, and the number of correct digits roughly doubles at every step.',
        },
        {
          type: 'p',
          text: '**Choice of the starting value.** Take $x_0$ at the end of the interval where $f(x)f\'\'(x) > 0$; that keeps every iterate inside the interval. **Stopping criterion.** Terminate when $|x_{n+1} - x_n| \\le \\varepsilon$, the tolerable error. Shanker Rao adds that if $f(x_i)/f\'(x_i)$ has $n$ zeros after the decimal point, the result is correct to $2n$ decimal places.',
        },
        {
          type: 'math',
          tex: 'x_{n+1} = x_n - p\\,\\frac{f(x_n)}{f\'(x_n)} \\quad (\\text{root repeated } p \\text{ times})',
        },
        {
          type: 'p',
          text: 'The last line is the **generalised Newton formula** for a multiple root (Shanker Rao §2.6); it reduces to the ordinary formula when $p = 1$.',
        },
        {
          type: 'note',
          text: 'Newton is fast but not safe: with a bad $x_0$ the iterates can run away, and the method needs $f\'(x)$ in closed or computable form. Where a derivative is awkward, the secant method replaces it.',
        },
        {
          type: 'exam',
          text: 'Write the derivative before the table. Then one row per iteration in the form $x_{n+1} = x_n - f(x_n)/f\'(x_n) = \\ldots$, with the numbers substituted. Finish with the stopping test $|x_{n+1}-x_n| \\le \\varepsilon$ and the boxed root to the accuracy asked for.',
        },
      ],
    },
    {
      heading: 'Secant method',
      blocks: [
        {
          type: 'p',
          text: 'Newton needs $f\'$. The **secant method** removes the derivative: instead of the tangent at $x_n$, draw the **chord** through the two most recent approximations $(x_{n-1}, f(x_{n-1}))$ and $(x_n, f(x_n))$ and take where it meets the $x$-axis.',
        },
        { type: 'math', tex: 'x_{n+1} = x_n - f(x_n)\\,\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} = \\frac{x_{n-1}f(x_n) - x_n f(x_{n-1})}{f(x_n) - f(x_{n-1})}' },
        {
          type: 'p',
          text: 'Two starting values $x_0, x_1$ are needed, and the pair slides: after computing $x_2$ the new pair is $(x_1, x_2)$, then $(x_2, x_3)$, and so on. No bracket is kept, so the method can walk away from the root — but it converges faster than bisection and needs no derivative.',
        },
        {
          type: 'p',
          text: 'Shanker Rao teaches the **Regula–Falsi** (false position) method, which is the same chord idea but keeps the sign-change interval: $x_0 = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$, and if $f(a)$ and $f(x_0)$ have opposite signs the next step uses $(a, x_0)$, otherwise $(x_0, b)$. Regula–Falsi is guaranteed to converge; the plain secant method is the faster variant that drops the bracket.',
        },
        {
          type: 'note',
          text: 'The plain secant method is **not** in the extracted Shanker Rao text (only Regula–Falsi, §2.7). Spring 2023 and Spring 2024 ask for the secant method, so learn the chord formula and say in one line that it replaces $f\'$ by the difference quotient.',
        },
        {
          type: 'exam',
          text: 'Write the two starting values, then the formula with the numbers substituted. Use the symmetric form $\\dfrac{x_{n-1}f(x_n) - x_n f(x_{n-1})}{f(x_n) - f(x_{n-1})}$ — it is easier to mark and easier to check. State the pair you use at each row so the slide of the pair is visible.',
        },
      ],
    },
    {
      heading: "Horner's rule and synthetic division",
      blocks: [
        {
          type: 'p',
          text: '**Horner’s rule** evaluates a polynomial and, in the same sweep, divides it by $(x - r)$. For $p(x) = a_0x^n + a_1x^{n-1} + \\dots + a_n$ and a given $r$, set',
        },
        { type: 'math', tex: 'b_0 = a_0, \\qquad b_i = a_i + r\\,b_{i-1} \\ (i = 1,\\dots,n)' },
        {
          type: 'p',
          text: 'Then $p(r) = b_n$, and the quotient of $p(x)$ divided by $(x - r)$ is $q(x) = b_0x^{n-1} + b_1x^{n-2} + \\dots + b_{n-1}$, with $p(x) = (x-r)q(x) + b_n$.',
        },
        {
          type: 'math',
          tex: 'p(x) = (x - r)\\left[b_0x^{n-1} + b_1x^{n-2} + \\cdots + b_{n-1}\\right] + b_n' },
        {
          type: 'p',
          text: 'The same recursion written as a tableau is **synthetic division**: bring the leading coefficient down, multiply by $r$, add it to the next coefficient, and repeat; the last entry is the remainder $p(r)$ and the entries above it are the quotient coefficients.',
        },
        {
          type: 'table',
          head: ['Row', '1', '7', '5', '−31', '−30'],
          rows: [
            ['coefficients $a_i$', '1', '7', '5', '−31', '−30'],
            ['$b_i$ with $r = -3$', '1', '4', '−7', '−10', '0'],
          ],
        },
        {
          type: 'p',
          text: 'Reading the row: $b_0 = 1$, $b_1 = 7 - 3(1) = 4$, $b_2 = 5 - 3(4) = -7$, $b_3 = -31 - 3(-7) = -10$, $b_4 = -30 - 3(-10) = 0$. So $p(-3) = 0$ and $p(x) = (x+3)(x^3 + 4x^2 - 7x - 10)$.',
        },
        {
          type: 'note',
          text: 'Horner’s rule is **not** in the extracted Shanker Rao text — the book uses "synthetic division" only to write a polynomial in factorial notation (Ch. 3). Fall 2023, Spring 2024 and Fall 2024 all ask for Horner / synthetic division, so it is taught here in full.',
        },
        {
          type: 'exam',
          text: 'Write the coefficients in descending order (a missing power of $x$ is entered as 0), write $r$, then the chain $b_0, b_1, \\dots, b_n$ with the substitution in each. The remainder $b_n$ is the value of the polynomial and the previous entries are the quotient.',
        },
      ],
    },
    {
      heading: 'Finding all roots by repeated deflation',
      blocks: [
        {
          type: 'p',
          text: 'A polynomial of degree $n$ has $n$ roots, but Newton and bisection find them one at a time. **Deflation** removes them one by one: find a root $r_1$, divide $p(x)$ by $(x - r_1)$ to get the quotient $q_1(x)$, find a root $r_2$ of $q_1$, divide $q_1$ by $(x - r_2)$, and continue.',
        },
        {
          type: 'math',
          tex: 'p(x) = (x - r_1)(x - r_2)(x - r_3)(x - r_4)',
        },
        {
          type: 'p',
          text: 'Horner’s rule does the division and the evaluation in one sweep, so the whole chain is: one Horner table for the root, another for the quotient, and so on. For $p(x) = x^4 + 7x^3 + 5x^2 - 31x - 30$ with $r_1 = -3$ the chain is',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '$p(x) = x^4 + 7x^3 + 5x^2 - 31x - 30$; Horner with $r = -3$ gives $b = 1,\\ 4,\\ -7,\\ -10$ and remainder $0$, so $p(x) = (x+3)(x^3 + 4x^2 - 7x - 10)$.',
            '$q_1(x) = x^3 + 4x^2 - 7x - 10$; Horner with $r = 2$ gives $b = 1,\\ 6,\\ 5$ and remainder $0$, so $q_1(x) = (x-2)(x^2 + 6x + 5)$.',
            '$x^2 + 6x + 5 = (x+1)(x+5)$, so the remaining roots are $-1$ and $-5$.',
            'All four roots: $-3,\\ 2,\\ -1,\\ -5$.',
          ],
        },
        {
          type: 'p',
          text: 'Each deflation divides by a factor that is already in error, so the later roots are less accurate than the first one. Deflate with as few digits as possible and check the result by substituting back.',
        },
        {
          type: 'note',
          text: 'Deflation is the reason the polynomial evaluation and the root finding are taught together: Horner’s rule gives you the quotient for free. A root found by deflation should be verified by substituting it back into the original polynomial.',
        },
        {
          type: 'exam',
          text: 'Write each deflation as its own numbered line with the $b$ values: "Horner on $(1, 7, 5, -31, -30)$ with $r = -3$: $b = 1, 4, -7, -10$, remainder 0; so $p(x) = (x+3)(x^3+4x^2-7x-10)$". Then the factorised polynomial as the final answer.',
        },
      ],
    },
    {
      heading: 'Choosing the right method',
      blocks: [
        {
          type: 'table',
          head: ['Method', 'Needs', 'Convergence', 'Use it when'],
          rows: [
            ['Bisection', 'a sign change $f(a)f(b) < 0$', 'linear, always converges', 'you only know a bracket, or you need a guaranteed answer'],
            ['Fixed point', 'a rewriting $x = \\phi(x)$ with $|\\phi\'| < 1$', 'linear', '$\\phi$ is simple, e.g. a transcendental equation'],
            ['Newton-Raphson', '$f\'(x)$ in closed form', 'quadratic', 'the derivative is easy and $x_0$ can be chosen well'],
            ['Secant', 'two starting values', 'super-linear — faster than bisection', 'no derivative is available'],
            ['Horner + deflation', 'the coefficients of a polynomial', 'one root per sweep', 'the equation is a polynomial and you need all its roots'],
          ],
        },
        {
          type: 'p',
          text: 'For a polynomial, the standard exam route is: isolate the roots by a sign change (or by the graph), find one root by Newton or bisection, then use Horner’s rule and deflation for the rest.',
        },
        {
          type: 'exam',
          text: 'If the question says "use the bisection method", do not write Newton even though it is faster. If it says "by Newton-Raphson", you must show $f\'(x)$ and the iteration table. Name the method you are using in the first line.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Sign-change test', tex: 'f(a)\\,f(b) < 0 \\Rightarrow \\text{a root in } (a,b)', where: 'Theorem 2.1 — the basis of bisection' },
    { label: 'Fixed-point iteration', tex: 'x_{n+1} = \\phi(x_n)', where: 'converges if |phi\'(x)| < 1' },
    { label: 'Convergence bound', tex: '|x_n - \\alpha| \\le \\lambda^{n}|x_0 - \\alpha|,\\quad \\lambda = \\max|\\phi\'(x)|', where: 'diverges when lambda > 1' },
    { label: 'Bisection step', tex: 'x_{n+1} = \\frac{a_n + b_n}{2}', where: 'keep the half where the sign changes' },
    { label: 'Bisection error bound', tex: 'b_n - a_n = \\frac{b_0 - a_0}{2^{n}}', where: 'n steps to a given accuracy' },
    { label: 'Newton-Raphson iteration', tex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}', where: 'needs the derivative; quadratic convergence' },
    { label: 'Newton error relation', tex: '\\varepsilon_{n+1} \\approx \\frac{f\'\'(\\alpha)}{2f\'(\\alpha)}\\,\\varepsilon_n^{2}', where: 'why Newton is quadratic' },
    { label: 'Generalised Newton (multiple root)', tex: 'x_{n+1} = x_n - p\\,\\frac{f(x_n)}{f\'(x_n)}', where: 'root repeated p times' },
    { label: 'Secant method', tex: 'x_{n+1} = \\frac{x_{n-1}f(x_n) - x_n f(x_{n-1})}{f(x_n) - f(x_{n-1})}', where: 'chord instead of tangent; no derivative needed' },
    { label: 'Regula-Falsi', tex: 'x_0 = \\frac{a f(b) - b f(a)}{f(b) - f(a)}', where: 'the chord method that keeps the bracket' },
    { label: 'Horner recursion', tex: 'b_0 = a_0,\\quad b_i = a_i + r\\,b_{i-1}', where: 'b_n = p(r) and b_0..b_(n-1) are the quotient coefficients' },
    { label: 'Horner / division identity', tex: 'p(x) = (x - r)\\left[b_0x^{n-1} + \\cdots + b_{n-1}\\right] + b_n', where: 'the quotient and the remainder in one sweep' },
    { label: 'Deflation', tex: 'p(x) = (x - r_1)(x - r_2)\\cdots(x - r_n)', where: 'each root is removed by one Horner sweep' },
  ],
  examples: [
    {
      title: 'Bisection: the root of $x^3 - 9x + 1$ between 2 and 3',
      type: 'Numerical — Bisection',
      question: 'Solve $x^3 - 9x + 1 = 0$ for the root lying between 2 and 3, correct to three significant figures, using the bisection method.',
      source: 'Shanker Rao Ch 2, Ex. 2.2 (also a past-paper question)',
      marks: 6,
      steps: [
        { t: '$f(x) = x^3 - 9x + 1$; $f(2) = -9$, $f(3) = 1$, so $f(2)f(3) < 0$ — a root lies in $(2,3)$.', m: '1 mark' },
        { t: '$x_1 = \\dfrac{a_0+b_0}{2} = \\dfrac{2+3}{2} = 2.5$, $f(2.5) = -5.875 < 0$, so the root lies in $(2.5, 3)$.', m: '2 marks' },
        { t: '$x_2 = 2.75$ ($f = -2.9531$), $x_3 = 2.875$ ($f = -1.1113$), $x_4 = 2.9375$ ($f = -0.0901$), $x_5 = 2.96875$ ($f = +0.4463$) → the root lies in $(2.9375, 2.96875)$.', m: '1 mark' },
        { t: 'Continuing: $x_6 = 2.9531$, $x_7 = 2.9453$, $x_8 = 2.9414$, $x_9 = 2.9434$, $x_{10} = 2.9424$.', m: '1 mark' },
        { t: '$a_{10}$ and $b_{10}$ now agree to three significant figures, so the root is $2.94$ to three significant figures.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 2.9428 \\approx 2.94\\ (\\text{3 significant figures})}$',
      note: 'Trap: the sign test decides which half to keep — if $f(a_n)f(x_{n+1}) < 0$ keep $(a_n, x_{n+1})$, otherwise keep $(x_{n+1}, b_n)$. Forgetting this is the only way to lose marks here.',
      explanation: [
        'Bisection needs nothing but a sign change and a calculator. The root is guaranteed to stay inside the interval because a continuous function that changes sign must vanish somewhere inside it, so the interval keeps shrinking towards the root.',
        'The error after $n$ steps is at most $(b_0-a_0)/2^{n+1} = 1/2^{n+1}$ here; at $n = 10$ that is $0.00049$, so the value $2.9424$ reported at the tenth step is already correct to three significant figures.',
        'The method is slow — ten halvings for three significant figures — but it never fails and it never needs a derivative. That is why the exam asks for it as a comparison against Newton.',
      ],
    },
    {
      title: 'Bisection: the root of $x^2 - 4x - 10$',
      type: 'Numerical — Bisection',
      question: 'Find the positive root of $x^2 - 4x - 10 = 0$ by the bisection method, correct to four decimal places.',
      source: 'Past-paper question (bisection)',
      marks: 5,
      steps: [
        { t: '$f(x) = x^2 - 4x - 10$; $f(5) = -5$, $f(6) = 2$, so $f(5)f(6) < 0$ and a root lies in $(5,6)$. (The other root lies in $(-2,-1)$.)', m: '1 mark' },
        { t: '$x_1 = \\dfrac{5+6}{2} = 5.5$, $f(5.5) = -1.75$; $x_2 = 5.75$, $f(5.75) = +0.0625$ → the root lies in $(5.5, 5.75)$.', m: '2 marks' },
        { t: '$x_3 = 5.625$ ($f = -0.8594$), $x_4 = 5.6875$ ($f = -0.4023$), $x_5 = 5.71875$ ($f = -0.1709$), $x_6 = 5.7344$ ($f = -0.0544$), $x_7 = 5.7422$ ($f = +0.0040$) → the root lies in $(5.7344, 5.7422)$.', m: '1 mark' },
        { t: 'The exact root is $\\dfrac{4+\\sqrt{56}}{2} = 2 + \\sqrt{14} = 5.741657\\ldots$, so the answer to four decimal places is $5.7417$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 5.7417}$',
      note: 'Trap: a quadratic has two roots and bisection only finds the one inside the interval you started from. State the interval in your first line so the examiner knows which root you mean.',
      explanation: [
        'The table is the same shape as before; the only difference is that $f$ is quadratic here, so the sign change at $5.75$ is very small ($+0.0625$) and the root is bracketed tightly.',
        'Bisection is a pure sign-chasing method: it never uses the shape of the curve, only the values at the two ends of the interval.',
        'Once the bracket is narrower than $10^{-4}$ the midpoint is correct to four decimal places, which is what the question asked for.',
      ],
    },
    {
      title: 'Fixed-point iteration: $\\cos x = 3x - 1$',
      type: 'Numerical — Fixed-point iteration',
      question: 'Find a real root of $\\cos x = 3x - 1$ correct to three decimal places using the iteration method.',
      source: 'Shanker Rao Ch 2, Ex. 2.6 (also a past-paper question)',
      marks: 4,
      steps: [
        { t: '$f(x) = \\cos x - 3x + 1$; $f(0) = 2 > 0$ and $f\\left(\\dfrac{\\pi}{2}\\right) = -1 < 0$, so a root lies in $\\left(0, \\dfrac{\\pi}{2}\\right)$. Write the equation as $x = \\phi(x) = \\dfrac{1 + \\cos x}{3}$.', m: '1 mark' },
        { t: '$\\phi\'(x) = -\\dfrac{\\sin x}{3}$, so $|\\phi\'(x)| < 1$ on $\\left(0, \\dfrac{\\pi}{2}\\right)$ — the iteration converges.', m: '1 mark' },
        { t: 'With $x_0 = 0$: $x_1 = \\dfrac{1+\\cos 0}{3} = 0.66667$, $x_2 = 0.59530$, $x_3 = 0.60933$, $x_4 = 0.60668$, $x_5 = 0.60718$, $x_6 = 0.60709$.', m: '1 mark' },
        { t: '$x_7 = 0.60710$ and $x_8 = 0.60710$, so the root is $0.607$ to three decimal places.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 0.607}$',
      note: 'Trap: check $|\\phi\'(x)| < 1$ **before** you start iterating. If it is not satisfied the iterates run away and you lose the whole question; the check is worth a mark on its own.',
      explanation: [
        'The method is the same every time: isolate $x$ on one side, differentiate, and check the derivative. Here $|\\phi\'(x)| = |\\sin x|/3 \\le 1/3 < 1$ over the whole interval, so the convergence is guaranteed and, being small, fairly quick.',
        'The iterates alternate around the root and the alternation shrinks — that is the linear convergence of the method: the error is multiplied by roughly $|\\phi\'| \\approx 0.19$ at every step.',
        'Compare with Newton on the same equation: Newton would need $f\'(x) = -\\sin x - 3$ and would reach the answer in two or three steps, but it needs a good starting value while this iteration only needs $|\\phi\'| < 1$.',
      ],
    },
    {
      title: 'Newton-Raphson: $x^3 - 4x^2 + x + 6 = 0$',
      type: 'Numerical — Newton-Raphson',
      question: 'Find the root of $x^3 - 4x^2 + x + 6 = 0$ that lies between $-2$ and $0$, by the Newton-Raphson method, correct to four decimal places.',
      source: 'Past-paper question (Newton-Raphson)',
      marks: 6,
      steps: [
        { t: '$f(x) = x^3 - 4x^2 + x + 6$, $f\'(x) = 3x^2 - 8x + 1$. $f(-2) = -20$ and $f(0) = 6$, so a root lies in $(-2, 0)$. Take $x_0 = 0$.', m: '1 mark' },
        { t: '$x_1 = x_0 - \\dfrac{f(x_0)}{f\'(x_0)} = 0 - \\dfrac{6}{1} = -6$.', m: '2 marks' },
        { t: '$x_2 = -6 - \\dfrac{-360}{157} = -3.707$, $\\quad x_3 = -3.707 - \\dfrac{-103.6159}{71.8817} = -2.2655$.', m: '1 mark' },
        { t: '$x_4 = -2.2655 - \\dfrac{-28.4241}{34.5221} = -1.4422$, $\\quad x_5 = -1.0821$, $\\quad x_6 = -1.0037$, $\\quad x_7 = -1.0000$.', m: '1 mark' },
        { t: '$|x_7 - x_6| = 0.0037 < 0.01$, so the root is $x = -1.0000$. (Check: $-1 - 4 - 1 + 6 = 0$, so the root is exactly $-1$.)', m: '1 mark' },
      ],
      answer: '$\\boxed{x = -1.0000}$',
      note: 'Trap: this cubic has three roots, $-1$, $2$ and $3$. Newton converges to the one nearest the starting value, so write down which root you are computing — otherwise the examiner cannot tell which one you found.',
      explanation: [
        'The iteration is the tangent-line formula; the table is the whole answer. Notice how the error falls from $6$ to $2.3$ to $0.9$ to $0.44$ to $0.08$ to $0.004$ — the error is roughly squared at each step, which is the quadratic convergence.',
        'Notice too that the first step overshoots badly ($x_1 = -6$, outside the interval). Newton is not guaranteed to stay inside the bracket, which is exactly why the bisection method exists.',
        'The stopping test $|x_{n+1} - x_n| \\le \\varepsilon$ with the tolerable error is the book’s criterion; writing it down earns the last mark.',
      ],
    },
    {
      title: 'Newton-Raphson: depth of water in a spherical tank',
      type: 'Numerical — Newton-Raphson',
      question: "You are designing a spherical tank to hold water for a small village. The volume is computed as $V = \\frac{\\pi h^2(3R - h)}{3}$, where $h$ is the depth of the water and $R$ the tank radius. If $R = 3$ m, to what depth must the tank be filled so that it holds 30 m$^3$? Use the Newton-Raphson method.",
      source: "Fall 2023 Q3(b) — not in the slides/notes, the standard textbook version",
      marks: 6,
      steps: [
        { t: 'Substitute $R = 3$ and $V = 30$: $30 = \\frac{\\pi h^2(9 - h)}{3}$, so $h^2(9 - h) = \\frac{90}{\\pi} = 28.6479$ and $f(h) = h^3 - 9h^2 + 28.6479 = 0$.', m: '2 marks' },
        { t: "$f'(h) = 3h^2 - 18h$, so the iteration is $h_{i+1} = h_i - \\dfrac{h_i^3 - 9h_i^2 + 28.6479}{3h_i^2 - 18h_i}$.", m: '1 mark' },
        { t: 'The physical root is in $0 < h < 9$. Start from $h_0 = 1$: $f(1) = 20.6479$, $f\'(1) = -15$, so $h_1 = 1 - \\frac{20.6479}{-15} = 2.3765$.', m: '1 mark' },
        { t: '$h_2 = 2.3765 - \\frac{-8.7607}{-25.8338} = 2.0374$, then $h_3 = 2.0374 - \\frac{-0.2541}{-24.2203} = 2.0269$, and $h_4 = 2.0269$.', m: '1 mark' },
        { t: 'Check: $\\frac{\\pi(2.0269)^2(9 - 2.0269)}{3} = 30.0$ m$^3$ \\checkmark. Newton-Raphson is the best choice here because its convergence is quadratic, and the paper notes that an initial guess of $h$ will always converge.', m: '1 mark' },
      ],
      answer: '$\\boxed{h = 2.027\\ \\text{m}\\ (\\text{to 3 decimal places})}$',
      note: 'Trap: the cap volume is $\\pi h^2\\left(R - \\dfrac{h}{3}\\right)$ — not $\\pi h^2 R$, and not the volume of the whole sphere. Getting the geometry wrong changes the equation, and then every Newton row is wrong.',
      explanation: [
        'The tank problem turns a geometry formula into a root-finding problem: the volume equation is a cubic in $h$, and the physical root is the one between 0 and $2R$.',
        'Newton-Raphson is preferred over bisection here because the error is roughly squared at each step (quadratic convergence), so three or four iterations reach three decimal places, and the paper states that the initial guess will always converge.',
        'This is the standard textbook form of the spherical-tank question; it is not in the class slides or the extracted notes, so treat it as a worked template. If your paper uses a different radius or a different fraction of the tank, only the numbers change — the equation comes from $\\pi h^2(R-h/3) = \\text{(fraction of the sphere)}$ and the Newton steps are exactly as above.',
        'The workflow is always: geometry gives one equation, simplify it into $f(h) = 0$, bracket the root with two values of $h$, then run Newton.',
        'Always check the answer by substituting it back into the volume formula. Here $R = 3$ and $h = 2.027$, and $\\frac{\\pi (2.027)^2(9 - 2.027)}{3} = 30.0$ m$^3$ — exactly the 30 m$^3$ the question asks for, so the answer is right.',
      ],
    },
    {
      title: 'Secant method: $x^3 - 8x - 4 = 0$',
      type: 'Numerical — Secant',
      question: 'Find the root of $x^3 - 8x - 4 = 0$ which lies between 3 and 4, by the secant method, correct to four decimal places.',
      source: 'Shanker Rao Ch 2, Ex. 2.4(4) — also a past-paper question',
      marks: 5,
      steps: [
        { t: '$f(x) = x^3 - 8x - 4$; $f(3) = -1$, $f(4) = 28$, so a root lies in $(3,4)$. Take $x_0 = 3$, $x_1 = 4$.', m: '1 mark' },
        { t: '$x_2 = x_1 - f(x_1)\\dfrac{x_1 - x_0}{f(x_1) - f(x_0)} = 4 - 28\\,\\dfrac{4-3}{28 - (-1)} = 4 - \\dfrac{28}{29} = 3.0345$.', m: '2 marks' },
        { t: '$x_3 = x_2 - f(x_2)\\dfrac{x_2 - x_1}{f(x_2) - f(x_1)} = 3.0459$, $\\quad x_4 = 3.0514$, $\\quad x_5 = 3.0514$.', m: '1 mark' },
        { t: '$|x_5 - x_4| < 10^{-4}$, so the root is $x = 3.0514$ to four decimal places.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 3.0514}$',
      note: 'Trap: the pair slides — after $x_2$ the two values used are $x_1$ and $x_2$, never the same point twice, and $f(x_n) - f(x_{n-1})$ must not be zero.',
      explanation: [
        'The secant method is Newton with the derivative replaced by the difference quotient through the last two points, so no differentiation is needed — that is its whole advantage over Newton.',
        'The first step is already accurate to two decimals ($3.0345$ against the true root $3.0514$), and the convergence is super-linear: the error is multiplied by roughly $0.618$ at every step.',
        'Because no bracket is kept, the method can jump away from the root; if that happens, restart with a better pair of starting values. The Regula-Falsi variant of the same chord keeps the bracket and is therefore safer.',
      ],
    },
    {
      title: "Horner's rule: $x^4 + 7x^3 + 5x^2 - 31x - 30$ with the root $-3$",
      type: 'Numerical — Horner',
      question: 'Using Horner’s method (synthetic division), divide $x^4 + 7x^3 + 5x^2 - 31x - 30$ by $(x + 3)$ and show that $-3$ is a root.',
      source: 'Past-paper question (Horner + quotient polynomial)',
      marks: 5,
      steps: [
        { t: 'Write the coefficients in descending order: $a_0 = 1,\\ a_1 = 7,\\ a_2 = 5,\\ a_3 = -31,\\ a_4 = -30$, with $r = -3$.', m: '1 mark' },
        { t: '$b_0 = a_0 = 1$; $\\quad b_1 = a_1 + r b_0 = 7 - 3(1) = 4$; $\\quad b_2 = a_2 + r b_1 = 5 - 3(4) = -7$.', m: '2 marks' },
        { t: '$b_3 = a_3 + r b_2 = -31 - 3(-7) = -10$; $\\quad b_4 = a_4 + r b_3 = -30 - 3(-10) = 0$.', m: '1 mark' },
        { t: '$p(-3) = b_4 = 0$, so $-3$ is a root, and the quotient coefficients are $b_0, b_1, b_2, b_3 = 1, 4, -7, -10$.', m: '1 mark' },
      ],
      answer: '$\\boxed{p(-3) = 0,\\qquad p(x) = (x+3)\\left(x^3 + 4x^2 - 7x - 10\\right)}$',
      note: 'Trap: keep the sign of $r$ consistent — with $r = -3$ every product is $-3b$. And the quotient is $b_0x^3 + b_1x^2 + b_2x + b_3$, in that order, not reversed.',
      explanation: [
        'Horner’s rule evaluates the polynomial and performs the division in the same $n$ multiplications: each $b_i$ is the value of the truncated polynomial at $x = r$.',
        'The remainder $b_4 = 0$ is the whole test for "is $r$ a root", and the entries above it are the coefficients of the quotient — which is why the same sweep gives you the deflated polynomial for the next root.',
        'The check is immediate: $(x+3)(x^3+4x^2-7x-10) = x^4+7x^3+5x^2-31x-30$, and substituting $x = -3$ gives $-9 + 63 + 45 + 93 - 30 = 0$.',
      ],
    },
    {
      title: "Horner's rule: evaluate $x^4 + 3x^2 - 2x$ at $x = 3$",
      type: 'Numerical — Horner',
      question: 'Evaluate $p(x) = x^4 + 3x^2 - 2x$ at $x = 3$ using Horner’s method.',
      source: 'Past-paper question (Horner’s rule)',
      marks: 3,
      steps: [
        { t: 'Coefficients in descending order: $a_0 = 1,\\ a_1 = 0,\\ a_2 = 3,\\ a_3 = -2,\\ a_4 = 0$ (the missing $x^3$ term is entered as 0), with $r = 3$.', m: '1 mark' },
        { t: '$b_0 = 1$; $\\quad b_1 = 0 + 3(1) = 3$; $\\quad b_2 = 3 + 3(3) = 12$; $\\quad b_3 = -2 + 3(12) = 34$; $\\quad b_4 = 0 + 3(34) = 102$.', m: '1 mark' },
        { t: '$p(3) = b_4 = 102$, and $p(x) = (x-3)(x^3 + 3x^2 + 12x + 34) + 102$.', m: '1 mark' },
      ],
      answer: '$\\boxed{p(3) = 102}$',
      note: 'Trap: a missing power of $x$ must be entered as 0 in the coefficient list. Omit it and every $b$ after it is wrong, and the answer looks plausible.',
      explanation: [
        'Horner’s rule replaces the powers of $x$ by repeated multiplication, so the polynomial is evaluated with $n$ multiplications instead of the far more work of forming $3^4$, $3^2$ and $3$ separately.',
        'The last line also shows the division identity: $p(x) = (x-3)q(x) + 102$, so dividing $p(x)$ by $(x-3)$ leaves the remainder $102$ — consistent with $p(3) = 102$.',
        'The same coefficients are reused for deflation: when $r$ is a root, $b_n = 0$ and the $b$’s above it are the quotient.',
      ],
    },
    {
      title: 'Finding all the roots of $x^4 + 7x^3 + 5x^2 - 31x - 30$ by deflation',
      type: 'Numerical — Deflation',
      question: 'Show that $-3$ is a root of $x^4 + 7x^3 + 5x^2 - 31x - 30$ and find all four roots using synthetic division.',
      source: 'Past-paper question (deflation + synthetic division)',
      marks: 6,
      steps: [
        { t: '$p(x) = x^4 + 7x^3 + 5x^2 - 31x - 30$; Horner with $r = -3$ gives $b = 1,\\ 4,\\ -7,\\ -10$ and remainder $0$, so $-3$ is a root and $p(x) = (x+3)(x^3 + 4x^2 - 7x - 10)$.', m: '2 marks' },
        { t: '$q_1(x) = x^3 + 4x^2 - 7x - 10$; Horner with $r = 2$ gives $b_0 = 1,\\ b_1 = 4 + 2(1) = 6,\\ b_2 = -7 + 2(6) = 5,\\ b_3 = -10 + 2(5) = 0$, so $2$ is a root and $q_1(x) = (x-2)(x^2 + 6x + 5)$.', m: '2 marks' },
        { t: '$x^2 + 6x + 5 = (x+1)(x+5)$, so the two remaining roots are $x = -1$ and $x = -5$.', m: '1 mark' },
        { t: 'Therefore $x^4 + 7x^3 + 5x^2 - 31x - 30 = (x+3)(x-2)(x+1)(x+5)$, and the four roots are $-3,\\ 2,\\ -1,\\ -5$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = -3,\\quad 2,\\quad -1,\\quad -5}$',
      note: 'Trap: deflate the **quotient**, not the original polynomial each time, and keep the $b$ values on the page — they are the marks. Also check the answer: $2 \\cdot 3 \\cdot 1 \\cdot 5 = 30$, which must equal $-a_4 = 30$.',
      explanation: [
        'Deflation is the systematic way of peeling roots off a polynomial: each division by $(x - r)$ removes one root and leaves a polynomial of degree one less whose roots are the remaining ones.',
        'Horner’s rule does the division and the evaluation in a single sweep, so no separate long-division working is needed.',
        'The accuracy of the roots degrades slightly at each deflation because the quotient inherits the round-off of the division — the reason to check the answer by substitution rather than trusting it blindly.',
      ],
    },
  ],
  flashcards: [
    { front: 'Theorem 2.1 (sign change)', back: 'If f is continuous on (a,b) and f(a)f(b) < 0, then f(x) = 0 has at least one root in (a,b).' },
    { front: 'The two stages of finding a root', back: 'Isolate the root (smallest interval containing exactly one root), then improve it to the required accuracy.' },
    { front: 'Fixed-point iteration and its convergence test', back: 'x_{n+1} = phi(x_n) converges to alpha if |phi\'(x)| < 1 on an interval containing alpha and x_0; it diverges if |phi\'(x)| > 1.' },
    { front: 'Error bound for the fixed-point iteration', back: '|x_n - alpha| <= lambda^n |x_0 - alpha| with lambda = max|phi\'(x)| — this is what makes the iteration linear.' },
    { front: 'Bisection step and error bound', back: 'x_{n+1} = (a_n + b_n)/2, and b_n - a_n = (b_0 - a_0)/2^n, so the error is at most (b_0-a_0)/2^{n+1}.' },
    { front: 'Why bisection always works', back: 'It keeps a sign-change bracket, so a continuous function must vanish inside it; the interval shrinks to the root.' },
    { front: 'Newton-Raphson iteration', back: 'x_{n+1} = x_n - f(x_n)/f\'(x_n) — the tangent at x_n meets the x-axis at x_{n+1}.' },
    { front: 'Order of convergence of Newton-Raphson', back: 'Quadratic: e_{n+1} ~ [f\'\'(alpha)/(2 f\'(alpha))] e_n^2, so the correct digits roughly double each step.' },
    { front: 'Good starting value for Newton', back: 'Choose x_0 at the end of the interval where f(x_0) f\'\'(x_0) > 0, which keeps the iterates inside the interval.' },
    { front: 'When to stop an iteration', back: 'When |x_{n+1} - x_n| <= eps (tolerable error); for linearly convergent methods stop when |f(x_n)| <= eps.' },
    { front: 'Secant method formula', back: 'x_{n+1} = (x_{n-1} f(x_n) - x_n f(x_{n-1})) / (f(x_n) - f(x_{n-1})) — the chord replaces the tangent, so no derivative is needed.' },
    { front: 'Regula-Falsi versus secant', back: 'Both use the chord; Regula-Falsi keeps the sign-change bracket and is therefore guaranteed to converge, the secant drops the bracket and is faster.' },
    { front: 'Horner recursion', back: 'b_0 = a_0, b_i = a_i + r b_{i-1}; the last b is p(r) and the others are the quotient coefficients for the division by (x - r).' },
    { front: 'Deflation', back: 'p(x) = (x - r) q(x): the quotient holds all the remaining roots. Each deflation is one Horner sweep, and the later roots are slightly less accurate.' },
  ],
  quiz: [
    {
      q: 'By Theorem 2.1, if $f$ is continuous on $(a,b)$ and $f(a)f(b) < 0$, then',
      options: [
        'there is at least one root of $f(x) = 0$ in $(a,b)$',
        'there is exactly one root in $(a,b)$',
        'there is no root in $(a,b)$',
        'the root is $x = (a+b)/2$',
      ],
      answer: 0,
      explain: 'A sign change guarantees at least one root by continuity. Exactly one needs the extra condition that $f\'(x)$ keeps one sign on the interval.',
    },
    {
      q: 'The fixed-point iteration $x_{n+1} = \\phi(x_n)$ converges to the root $\\alpha$ when',
      options: [
        '$|\\phi\'(x)| < 1$ on an interval containing $\\alpha$',
        '$|\\phi\'(x)| > 1$ near $\\alpha$',
        '$\\phi$ is linear',
        '$f(x)$ is a quadratic',
      ],
      answer: 0,
      explain: 'Theorem 2.2. If $|\\phi\'(x)| > 1$ the error grows and the sequence diverges — which is why the check comes before the iteration.',
    },
    {
      q: 'After $n$ bisections of the interval $(a,b)$, the width of the interval is',
      options: ['$\\dfrac{b-a}{2^{n}}$', '$\\dfrac{b-a}{n}$', '$\\dfrac{b-a}{2}$', '$(b-a)^{n}$'],
      answer: 0,
      explain: 'Each step halves the interval, so the width is $(b-a)/2^n$ and the midpoint is within $(b-a)/2^{n+1}$ of the root.',
    },
    {
      q: 'The Newton-Raphson iteration is',
      options: [
        '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$',
        '$x_{n+1} = x_n - f(x_n)\\,f\'(x_n)$',
        '$x_{n+1} = \\dfrac{a+b}{2}$',
        '$x_{n+1} = x_n + \\dfrac{f(x_n)}{f\'(x_n)}$',
      ],
      answer: 0,
      explain: 'The tangent at $(x_n, f(x_n))$ meets the x-axis at $x_{n+1} = x_n - f(x_n)/f\'(x_n)$. The sign is minus; plus sends the iterates the wrong way.',
    },
    {
      q: 'Newton-Raphson converges to the root',
      options: [
        'quadratically — the error is roughly squared at every step',
        'linearly — the error is multiplied by a constant',
        'only if $f$ is linear',
        'in a fixed number of steps whatever the function',
      ],
      answer: 0,
      explain: 'The error satisfies e_{n+1} ~ [f\'\'(alpha)/(2f\'(alpha))] e_n^2, so the number of correct digits roughly doubles each iteration.',
    },
    {
      q: 'A good first approximation $x_0$ for Newton satisfies',
      options: [
        '$f(x_0)\\,f\'\'(x_0) > 0$',
        '$f(x_0)\\,f\'\'(x_0) < 0$',
        '$f(x_0) = 0$',
        '$|x_0| < 1$',
      ],
      answer: 0,
      explain: 'Taking x_0 at the end of the interval where f(x)f\'\'(x) > 0 keeps every iterate inside the interval and the convergence monotone.',
    },
    {
      q: 'The secant method replaces $f\'(x)$ by',
      options: [
        'the difference quotient through the last two approximations',
        'the exact symbolic derivative',
        'the second derivative $f\'\'(x)$',
        'the midpoint of the starting interval',
      ],
      answer: 0,
      explain: 'The secant (chord) through $(x_{n-1}, f(x_{n-1}))$ and $(x_n, f(x_n))$ replaces the tangent — so the method needs two starting values but no derivative.',
    },
    {
      q: 'In Horner’s scheme, the value $p(r)$ is',
      options: [
        'the last $b$ in $b_0 = a_0$, $b_i = a_i + r\\,b_{i-1}$',
        'the first coefficient $a_0$',
        'the sum of the $b_i$',
        'the product of the $b_i$',
      ],
      answer: 0,
      explain: 'Horner’s recursion evaluates the polynomial in n multiplications; b_n = p(r) and b_0 ... b_{n-1} are the coefficients of the quotient on division by (x - r).',
    },
    {
      q: 'After deflating $p(x)$ at a root $r$, the quotient $q(x)$ has',
      options: [
        'exactly the remaining roots of $p$',
        'no roots',
        'the root $r$ once more',
        'the roots of $p\'(x)$',
      ],
      answer: 0,
      explain: 'Since $p(x) = (x-r)q(x)$, the roots of $q$ are all the roots of $p$ except $r$.',
    },
    {
      q: 'Which method is guaranteed to converge whenever $f(a)f(b) < 0$, although only linearly?',
      options: ['Bisection', 'Newton-Raphson', 'Secant', 'Fixed-point iteration with $|\\phi\'| < 1$'],
      answer: 0,
      explain: 'Bisection keeps a sign-change bracket, so it cannot fail — but each iteration only halves the interval. Newton and the secant method are faster but need a good starting value.',
    },
  ],
  solvers: ['bisection', 'newton', 'secant', 'horner'],
};
