// Chapter 7 — Interpolation.
// Sources: Shanker Rao Ch.4–7 (equal intervals, unequal intervals, central difference
// formulae, inverse interpolation), the teacher's own interpolation notes.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Interpolation answers which question?",
    options: ["What is the trend of noisy data?", "What is the value BETWEEN known data points?", "What is the value far beyond the last data point?", "Which point is an outlier?"],
    answer: 1,
    explain: "A curve is passed exactly through the known points and read in between; beyond the last point is extrapolation, a different (riskier) game.",
  },
  "Start here: the core idea": {
    q: "$n + 1$ points with distinct $x$-values determine…",
    options: ["Exactly one polynomial of degree $n$", "Infinitely many parabolas", "A unique straight line always", "No smooth curve at all"],
    answer: 0,
    explain: "Two points pin a line, three a parabola — in general $n+1$ points pin a unique degree-$n$ polynomial.",
  },
  "Start here: reading the symbols": {
    q: "In Newton's forward formula, $u = 2.5$ means the target is…",
    options: ["2.5 $x$-units above zero", "2.5 steps above the base row", "between rows 0 and 1", "outside the table"],
    answer: 1,
    explain: "$u$ counts position in steps of size $h$ from the base row — fractional steps land between rows.",
  },
  "Start here: your first walk-through": {
    q: "In the walk-through, the four Lagrange weights at $x = 2$ added up to…",
    options: ["0", "1", "4", "19"],
    answer: 1,
    explain: "The weights ($-\\frac{1}{6}, \\frac{2}{3}, \\frac{2}{3}, -\\frac{1}{6}$) always sum to 1 — a free sanity check before substituting.",
  },
  'What interpolation is and why we need it': {
    q: 'Interpolation replaces the unknown function $f(x)$ by',
    options: [
      'a simpler function $\\varphi(x)$ that takes the same values at the tabulated points',
      'a straight line through the first and last point only',
      'a trigonometric series of infinite length',
      'the exact analytic formula, which is assumed known',
    ],
    answer: 0,
    explain: 'The tabulated values usually come from an experiment, so the form of $f$ is unknown. We fit $\\varphi(x)$ through the tabulated points and use $\\varphi$ to read off values in between.',
  },
  'Setting up: the difference table and the choice of formula': {
    q: 'You must interpolate a value that lies near the **end** of a table of equally spaced data. Which formula do you use?',
    options: [
      'Newton–Gregory backward',
      'Newton forward (Gregory)',
      'Lagrange',
      'Gauss forward',
    ],
    answer: 0,
    explain: 'Newton forward is for values near the *beginning* of a table, Newton backward for values near the *end*. Central difference formulae (Gauss, Stirling, Bessel) are for values near the *middle*.',
  },
  'Newton forward (Gregory) interpolation for equal intervals': {
    q: 'In Newton\'s forward formula, the argument $u$ (or $p$) is',
    options: [
      '$u = \\dfrac{x - x_0}{h}$',
      '$u = \\dfrac{x_0 - x}{h}$',
      '$u = \\dfrac{x - x_n}{h}$',
      '$u = x - x_0$',
    ],
    answer: 0,
    explain: '$u = (x-x_0)/h$ is the number of intervals from the origin $x_0$ to the point $x$; it is what turns $(x-x_0)(x-x_1)\\cdots$ into $u(u-1)(u-2)\\cdots$.',
  },
  'Newton–Gregory backward interpolation': {
    q: 'In Newton\'s backward formula the falling factors are',
    options: [
      '$u, (u+1), (u+2), \\dots$',
      '$u, (u-1), (u-2), \\dots$',
      '$(u-1), (u-2), (u-3), \\dots$',
      '$u^2, u^3, u^4, \\dots$',
    ],
    answer: 0,
    explain: 'Working backwards from the last point, $x - x_{n-1} = (u+1)h$ and $x - x_{n-2} = (u+2)h$, so the factors are $u, (u+1), (u+2), \\dots$ and the leading differences are the backward ones $\\nabla y_n$.',
  },
  "Gauss's forward and backward formulae": {
    q: 'Gauss\'s **backward** formula uses which first and third differences?',
    options: [
      '$\\Delta y_{-1}$ and $\\Delta^3 y_{-2}$ — the odd differences on the $y_{-1}$–$y_0$ side of the central line',
      '$\\Delta y_0$ and $\\Delta^3 y_{-1}$ — the odd differences on the $y_0$–$y_1$ side of the central line',
      '$\\Delta y_0$ and $\\Delta^3 y_0$ — the leading forward differences',
      '$\\nabla y_n$ and $\\nabla^3 y_n$ — the backward differences at the end of the table',
    ],
    answer: 0,
    explain: 'Gauss backward is $y_0 + u\\Delta y_{-1} + \\frac{(u+1)u}{2!}\\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-2} + \\cdots$; Gauss forward uses $\\Delta y_0$ and $\\Delta^3 y_{-1}$ instead. Both use the even differences on the line.',
  },
  'Central difference formulae: Gauss, Stirling and Bessel': {
    q: 'For which range of $u$ is Stirling\'s formula the most accurate?',
    options: [
      '$-0.25 \\le u \\le 0.25$',
      '$-1 < u < 0$',
      '$\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$',
      '$0 < u < 1$',
    ],
    answer: 0,
    explain: 'Stirling\'s formula is most accurate for $-0.25 \\le u \\le 0.25$; Bessel\'s for $\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$; Gauss forward for $0 < u < 1$ and Gauss backward for $-1 < u < 0$.',
  },
  'Lagrange interpolation for unequally spaced points': {
    q: 'Why does Lagrange\'s formula need no difference table?',
    options: [
      'Each term is built directly from the ordinates and the arguments, so the spacing may be anything',
      'It always assumes equal spacing',
      'It uses only the first and last ordinates',
      'It requires the function to be known analytically',
    ],
    answer: 0,
    explain: 'Lagrange builds each term from the products $(x-x_j)$ and $(x_i-x_j)$ directly, so it works for equal or unequal spacing. The price is more arithmetic and more sign errors.',
  },
  "Newton's divided difference interpolation": {
    q: 'The first divided difference of $f$ between $x_0$ and $x_1$ is',
    options: [
      '$\\dfrac{f(x_1)-f(x_0)}{x_1-x_0}$',
      '$f(x_1)-f(x_0)$',
      '$\\dfrac{f(x_1)-f(x_0)}{h}$',
      '$f(x_0)-f(x_1)$',
    ],
    answer: 0,
    explain: 'A divided difference is a difference divided by the distance between the two arguments — which is why it survives unequal spacing.',
  },
  'Error in interpolation and inverse interpolation': {
    q: 'The error in the Lagrange/Newton interpolating polynomial at $x$ is',
    options: [
      '$R(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^{n}(x-x_i)$',
      '$R(x) = \\dfrac{f(x)-\\varphi(x)}{n+1}$',
      '$R(x) = \\Delta^{n+1}y_0$',
      '$R(x) = 0$ when the data are exact',
    ],
    answer: 0,
    explain: 'The remainder is $f^{(n+1)}(\\xi)/(n+1)!$ times the product of $(x-x_i)$; for equally spaced data this reduces to the difference form $\\Delta^{n+1}y_0\\,u(u-1)\\cdots(u-n)/(n+1)!$.',
  },
  'Missing values in an interpolation table': {
    q: 'A table of $n+1$ equally spaced values has one entry missing and the data fit a polynomial of degree $n-1$. Which relation finds the missing value?',
    options: [
      '$\\Delta^n y_0 = 0$, i.e. $y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0$',
      '$\\Delta^{n-1} y_0 = 0$',
      '$y_n = y_0$',
      '$\\nabla y_n = \\Delta y_0$',
    ],
    answer: 0,
    explain: 'A degree-$(n-1)$ polynomial has vanishing $n$th differences, and that single equation contains the missing ordinate. This is Newton\'s binomial expansion formula.',
  },
};

export default {
  id: 'interpolation',
  chapter: 7,
  title: 'Interpolation',
  wave: 'interp',
  sources: ['Shanker Rao Ch 4-7', "Teacher's interpolation notes"],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "The census ran in 2021; the report needs the population for 2023. The thermocouple logs every whole second; the controller needs the reading at 2.37 s. **Data never lands exactly where you need it.**" },
        { type: "p", text: "Interpolation is the honest fix: pass one smooth curve **exactly through** every known data point, then read the curve wherever you like between them. (Guessing beyond the last point is **extrapolation** — same machinery, far more risk, because the data has run out.)" },
        { type: "p", text: "The mathematical workhorse is the polynomial: through any $n+1$ points with distinct $x$-values there passes exactly **one** polynomial of degree $n$. The chapter's formulas are just efficient ways to build it — Newton's forms for equally spaced data, Lagrange's and the divided-difference table for anything else." },
        { type: "list", items: [
          "Choose the right formula family (equal vs unequal spacing).",
          "Interpolate with Newton's forward and backward forms.",
          "Handle unequal spacing with Lagrange and divided differences.",
          "Estimate a missing row inside a table — a past-paper favourite.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Two points pin a line, three pin a parabola, $n+1$ pin a degree-$n$ polynomial — 'connect the dots', but with a polynomial that must pass through **every** dot exactly. Once that curve exists, any in-between value is just a lookup." },
        { type: "p", text: "The previous chapter's difference tables do the building when the $x$-values are **equally spaced**: Newton's forward formula is the base value $y_0$ plus a stack of corrections, one per difference column, weighted by how far (in steps) the target sits from the base row." },
        { type: "math", tex: "y(x) = y_0 + u\\,\\Delta y_0 + \\frac{u(u-1)}{2!}\\,\\Delta^2 y_0 + \\cdots, \\qquad u = \\frac{x - x_0}{h}" },
        { type: "note", text: "The key decoder ring: $u$ measures position **in steps, not in $x$-units** — halfway between rows 0 and 1 is $u = 0.5$, whatever $h$ is. Unequal spacing kills the step idea, and Lagrange's formula takes over." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$y_0$", "the base row of the table", "where you stand to interpolate"],
          ["$h$", "equal spacing between $x$-values", "step size"],
          ["$u = \\frac{x - x_0}{h}$", "target position measured in steps from the base", "the fractional step"],
          ["$\\Delta^k y_0$", "$k$-th forward difference at the base row", "from the difference table"],
          ["$f[x_0, x_1] = \\frac{y_1 - y_0}{x_1 - x_0}$", "divided difference", "slope allowing unequal spacing"],
          ["$\\ell_i(x)$", "Lagrange's building block: 1 at $x_i$, 0 at every other node", "the influence of point $i$"],
        ] },
        { type: "p", text: "Subscript positions are relative: $y_0$ is whichever row you chose as base, and $u$ counts steps from that row." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Shanker Rao §5.3, Exercise 5.1**: given $f(0) = 5$, $f(1) = 6$, $f(3) = 50$, $f(4) = 105$, find $f(2)$ by Lagrange's formula — the spacing is unequal, so the difference-table toolkit does not apply." },
        { type: "p", text: "Each known point gets a weight that equals 1 at itself and 0 at every other node; at $x = 2$ the four weights are $-\\tfrac{1}{6},\\ \\tfrac{2}{3},\\ \\tfrac{2}{3},\\ -\\tfrac{1}{6}$ — and they sum to 1, a free sanity check." },
        { type: "math", tex: "f(2) = 5\\left(-\\tfrac{1}{6}\\right) + 6\\left(\\tfrac{2}{3}\\right) + 50\\left(\\tfrac{2}{3}\\right) + 105\\left(-\\tfrac{1}{6}\\right) = -\\tfrac{5}{6} + 4 + \\tfrac{100}{3} - \\tfrac{35}{2} = 19" },
        { type: "p", text: "**Asked in:** Lagrange with unequal intervals is Spring 2023 Q2(e) (gravity at altitude); the sales estimate is Fall 2023 Q2(g); the derivation of the formula is Spring 2024 Q1(e)." },
        { type: "exam", text: "State the formula, list the weights (showing they sum to 1), substitute, box the value — the sites of the marks in the module's worked example." },
      ],
    },
    {
      heading: 'What interpolation is and why we need it',
      blocks: [
        {
          type: 'p',
          text: '**Interpolation is the technique of estimating the value of the dependent variable $y = f(x)$ for a given value of $x$ from a set of tabulated values of $y$.** Thiele called it "the art of reading between the lines of a table"; Harper: "reading a value which lies between two extreme points".',
        },
        {
          type: 'p',
          text: 'In practice the exact form of $f(x)$ is unknown — the data come from experiments, surveys or tabulated physical properties. So $f(x)$ is replaced by a simpler function $\\varphi(x)$ that takes the **same values at the tabulated points**; $\\varphi$ is the **interpolating function** (or interpolating polynomial). At other points $f(x) = \\varphi(x) + R(x)$, where $R(x)$ is the error term.',
        },
        {
          type: 'list',
          items: [
            '**Analysing experimental data** — turning a table of measurements into a usable formula.',
            '**Drawing smooth curves** through the data points.',
            '**Deriving further formulae** — the difference table itself is built from interpolated values.',
            '**Filling in gaps** in tables (see the last section).',
          ],
        },
        {
          type: 'p',
          text: 'Two standing assumptions run through the whole chapter: there are **no sudden jumps** in the data, and the **rate of change from one period to the next is uniform**. Weierstrass\'s theorem is the licence for the method: every continuous function on an interval can be approximated arbitrarily closely by a polynomial.',
        },
        {
          type: 'note',
          text: '**Interpolation vs extrapolation.** Reading a value *between* the tabulated points is interpolation; reading one *outside* the range is extrapolation. For a polynomial the two agree exactly; for a general function, extrapolation far outside the table is dangerous while interpolation stays accurate (teacher\'s notes, after Sastry).',
        },
      ],
    },
    {
      heading: 'Setting up: the difference table and the choice of formula',
      blocks: [
        {
          type: 'p',
          text: 'Before any formula, build the difference table: $x$ in the first column, $y$ in the second, then each difference column in turn. The **leading differences** ($\\Delta y_0, \\Delta^2 y_0, \\dots$) are the numbers the interpolation formulae consume.',
        },
        {
          type: 'table',
          head: ['$x$', '$y$', '$\\Delta y$', '$\\Delta^2 y$', '$\\Delta^3 y$'],
          rows: [
            ['$0$', '$1$', '', '', ''],
            ['$1$', '$3$', '$2$', '', ''],
            ['$2$', '$6$', '$3$', '$1$', ''],
            ['$3$', '$10$', '$4$', '$1$', '$0$'],
            ['$4$', '$15$', '$5$', '$1$', '$0$'],
          ],
        },
        {
          type: 'p',
          text: '**Which formula?** Look at where the required $x$ sits and at how the $x$-values are spaced.',
        },
        {
          type: 'table',
          head: ['Situation', 'Formula'],
          rows: [
            ['Equal spacing, $x$ near the **beginning** of the table', 'Newton forward (Gregory)'],
            ['Equal spacing, $x$ near the **end** of the table', 'Newton–Gregory backward'],
            ['Equal spacing, $x$ near the **middle** of the table', 'Gauss forward / backward, Stirling, Bessel'],
            ['**Unequal** spacing', "Lagrange, or Newton's divided differences"],
            ['$x$ for a given $y$', 'inverse interpolation'],
          ],
        },
        {
          type: 'note',
          text: '**The $3!$ trap.** In every Newton/Lagrange term the denominator is the **factorial of the order** ($1!, 2!, 3!, \\dots$), not a power of 2 and not a running product. Most lost marks in this chapter come from writing $\\frac{p(p-1)}{2}$ instead of $\\frac{p(p-1)}{2!}$.',
        },
        {
          type: 'exam',
          text: 'Always show the difference table first (the examiner gives a mark for it), then $u = (x-x_0)/h$ with the numbers substituted, then the formula with the leading differences inserted, then the final answer boxed.',
        },
      ],
    },
    {
      heading: 'Newton forward (Gregory) interpolation for equal intervals',
      blocks: [
        {
          type: 'p',
          text: 'Let $y = f(x)$ be known at $x_0, x_1, \\dots, x_n$ with $x_r = x_0 + rh$. Assume $\\varphi(x)$ is a polynomial of degree $n$ through the tabulated points and write it in the **Newton form**',
        },
        { type: 'math', tex: '\\varphi(x) = a_0 + a_1(x-x_0) + a_2(x-x_0)(x-x_1) + \\cdots + a_n(x-x_0)(x-x_1)\\cdots(x-x_{n-1})' },
        {
          type: 'p',
          text: 'Putting $x = x_0$ gives $a_0 = y_0$; putting $x = x_1$ gives $a_1 = \\dfrac{\\Delta y_0}{h}$; putting $x = x_2$ gives $a_2 = \\dfrac{\\Delta^2 y_0}{2!\\,h^2}$; and in general $a_k = \\dfrac{\\Delta^k y_0}{k!\\,h^k}$. Now put $u = \\dfrac{x-x_0}{h}$, so that $x - x_1 = (u-1)h$, $x-x_2 = (u-2)h$ and so on. Everything collapses into',
        },
        { type: 'math', tex: 'y \\approx \\varphi(x) = y_0 + u\\,\\Delta y_0 + \\frac{u(u-1)}{2!}\\,\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\,\\Delta^3 y_0 + \\cdots' },
        {
          type: 'p',
          text: 'The factors $u, u(u-1), u(u-1)(u-2), \\dots$ are the **falling factorials** $u^{\\underline{k}} = \\dfrac{u!}{(u-k)!}$, so the compact form is $\\displaystyle y = \\sum_{k=0}^{n} \\frac{\\Delta^k y_0}{k!}\\,u^{\\underline{k}}$.',
        },
        {
          type: 'note',
          text: '**Two rules the examiner will check.** (1) Newton forward is used for values near the **beginning** of a table; $y_0$ may be any row, but then the formula only uses the values *after* $y_0$. (2) It gives the polynomial of the **least degree** that fits the data — higher-degree polynomials also fit, but the least-degree one is the answer.',
        },
        {
          type: 'exam',
          text: 'Write: difference table → $u = (x-x_0)/h$ → formula with the leading differences → substitution → boxed answer. If the question also asks for "the polynomial", state $\\varphi(x)$ in the form $y_0 + u\\Delta y_0 + \\cdots$ and then expand it in powers of $x$.',
        },
      ],
    },
    {
      heading: 'Newton–Gregory backward interpolation',
      blocks: [
        {
          type: 'p',
          text: 'Newton forward cannot reach the **end** of a table (it needs rows that are not there). So work backwards from the last row: write $\\varphi(x)$ in terms of $(x-x_n)$, $(x-x_{n-1})$, \\dots and use the **backward** differences $\\nabla y_n, \\nabla^2 y_n, \\dots$. With $u = \\dfrac{x-x_n}{h}$ (which is negative for a point inside the table) we get $x - x_{n-1} = (u+1)h$, $x-x_{n-2} = (u+2)h$ and',
        },
        { type: 'math', tex: 'y \\approx \\varphi(x) = y_n + u\\,\\nabla y_n + \\frac{u(u+1)}{2!}\\,\\nabla^2 y_n + \\frac{u(u+1)(u+2)}{3!}\\,\\nabla^3 y_n + \\cdots' },
        {
          type: 'p',
          text: 'Note the **sign switch**: the factors are $u, (u+1), (u+2), \\dots$ instead of $u, (u-1), (u-2), \\dots$, and the leading differences are the backward ones. The error term changes shape too: $\\displaystyle R(x) = \\frac{\\nabla^{n+1}y_n}{(n+1)!}\\,u(u+1)\\cdots(u+n)$.',
        },
        {
          type: 'note',
          text: '**The $u$ trap.** For a point near the end of the table, $u = (x-x_n)/h$ is **negative** (for example $u = -0.6$ for $x = 84$ in a table ending at $x_n = 90$ with $h=10$). Forgetting the minus sign changes every single term.',
        },
      ],
    },
    {
      heading: "Gauss's forward and backward formulae",
      blocks: [
        {
          type: 'p',
          text: 'For a value near the **middle** of a table, Shanker Rao (Ch 6) takes the origin $x_0$ at a central ordinate, so the table runs $\\dots, y_{-2}, y_{-1}, y_0, y_1, y_2, \\dots$ and $u = (x - x_0)/h$. Both Gauss formulae come from Newton\'s forward formula by rewriting its leading differences $\\Delta^k y_0$ in terms of differences that sit on or next to the central line through $y_0$. The tool is the definition of $\\Delta$ applied to the $k$-th difference column:',
        },
        { type: 'math', tex: '\\Delta^k y_{j+1} = \\Delta^k y_j + \\Delta^{k+1} y_j \\quad\\Longrightarrow\\quad \\Delta^2 y_0 = \\Delta^2 y_{-1} + \\Delta^3 y_{-1},\\;\\; \\Delta^3 y_0 = \\Delta^3 y_{-1} + \\Delta^4 y_{-1},\\;\\; \\Delta^3 y_{-1} = \\Delta^3 y_{-2} + \\Delta^4 y_{-2},\\; \\dots' },
        {
          type: 'p',
          text: '**Gauss forward (derivation).** Start from Newton forward, $y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 + \\frac{u(u-1)(u-2)(u-3)}{4!}\\Delta^4 y_0 + \\cdots$, and substitute $\\Delta^2 y_0$, $\\Delta^3 y_0$, $\\Delta^4 y_0$ from the relations above:',
        },
        { type: 'math', tex: 'y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\left(\\Delta^2 y_{-1} + \\Delta^3 y_{-1}\\right) + \\frac{u(u-1)(u-2)}{3!}\\left(\\Delta^3 y_{-1} + \\Delta^4 y_{-1}\\right) + \\frac{u(u-1)(u-2)(u-3)}{4!}\\left(\\Delta^4 y_{-1} + \\Delta^5 y_{-1}\\right) + \\cdots' },
        {
          type: 'p',
          text: 'Collect the $\\Delta^3 y_{-1}$ terms: $\\frac{u(u-1)}{2} + \\frac{u(u-1)(u-2)}{6} = \\frac{u(u-1)\\left[3 + (u-2)\\right]}{6} = \\frac{(u+1)u(u-1)}{3!}$. In the same way the $\\Delta^4 y_{-1}$ terms combine to $\\frac{(u+1)u(u-1)(u-2)}{4!}$, and writing $\\Delta^4 y_{-1} = \\Delta^4 y_{-2} + \\Delta^5 y_{-2}$ moves it to the central line. The result is **Gauss\'s forward interpolation formula**:',
        },
        { type: 'math', tex: 'y = y_0 + u\\,\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-1} + \\frac{(u+1)u(u-1)(u-2)}{4!}\\Delta^4 y_{-2} + \\cdots' },
        {
          type: 'p',
          text: '**Gauss backward (derivation).** This time also substitute $\\Delta y_0 = \\Delta y_{-1} + \\Delta^2 y_{-1}$, together with $\\Delta^2 y_0 = \\Delta^2 y_{-1} + \\Delta^3 y_{-1}$, $\\Delta^3 y_0 = \\Delta^3 y_{-1} + \\Delta^4 y_{-1}$ and then $\\Delta^3 y_{-1} = \\Delta^3 y_{-2} + \\Delta^4 y_{-2}$, $\\Delta^4 y_{-1} = \\Delta^4 y_{-2} + \\Delta^5 y_{-2}$. The $\\Delta^2 y_{-1}$ terms collect to $u + \\frac{u(u-1)}{2} = \\frac{(u+1)u}{2!}$, the $\\Delta^3 y_{-2}$ terms to $\\frac{(u+1)u(u-1)}{3!}$ and the $\\Delta^4 y_{-2}$ terms to $\\frac{(u+2)(u+1)u(u-1)}{4!}$, giving **Gauss\'s backward interpolation formula**:',
        },
        { type: 'math', tex: 'y = y_0 + u\\,\\Delta y_{-1} + \\frac{(u+1)u}{2!}\\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-2} + \\frac{(u+2)(u+1)u(u-1)}{4!}\\Delta^4 y_{-2} + \\cdots' },
        {
          type: 'note',
          text: '**Which differences each one uses.** Both take the even differences **on** the central line through $y_0$ ($\\Delta^2 y_{-1}, \\Delta^4 y_{-2}$). For the odd ones, Gauss forward takes the differences on the $y_0$–$y_1$ side of the line ($\\Delta y_0, \\Delta^3 y_{-1}, \\dots$) and Gauss backward those on the $y_{-1}$–$y_0$ side ($\\Delta y_{-1}, \\Delta^3 y_{-2}, \\dots$). Use Gauss forward for $0 < u < 1$ and Gauss backward for $-1 < u < 0$ (Shanker Rao §6.3). Shanker\'s note calls these sides "above" and "below" the line the other way round from how his table is drawn, so learn the subscripts, not the words.',
        },
        {
          type: 'exam',
          text: 'Derivation script (3 marks): (1) write Newton forward; (2) write the relations $\\Delta^k y_0 = \\Delta^k y_{-1} + \\Delta^{k+1} y_{-1}$ you will substitute; (3) substitute, collect the $\\Delta^3$ coefficient explicitly as shown, say "similarly" for $\\Delta^4$, and box the formula. For a numerical: pick $x_0$ so that $u$ is in the formula\'s range, draw the difference table with $x_0$ in the middle, and **circle** the differences the formula uses.',
        },
      ],
    },
    {
      heading: 'Central difference formulae: Gauss, Stirling and Bessel',
      blocks: [
        {
          type: 'p',
          text: 'For a value near the **middle** of a table the central difference formulae are preferable. Shanker Rao builds them by rewriting the leading forward differences of Newton\'s formula in terms of the central differences of the central difference table ($\\delta y_0, \\delta^2 y_1, \\dots$), which are obtained from $\\delta = E^{-1/2}\\Delta$. Gauss forward and Gauss backward are derived in the previous lesson; Stirling and Bessel are averages of them.',
        },
        {
          type: 'p',
          text: '**Stirling (derivation).** Take the mean of Gauss forward and Gauss backward (same origin). The first differences average to $u\\,\\frac{\\Delta y_0 + \\Delta y_{-1}}{2}$; the $\\Delta^2 y_{-1}$ coefficients average to $\\frac{1}{2}\\left[\\frac{u(u-1)}{2} + \\frac{(u+1)u}{2}\\right] = \\frac{u^2}{2}$; the third differences share the coefficient $\\frac{(u+1)u(u-1)}{3!} = \\frac{u(u^2-1)}{3!}$, so they average to $\\frac{u(u^2-1)}{3!}\\cdot\\frac{\\Delta^3 y_{-1} + \\Delta^3 y_{-2}}{2}$; and the $\\Delta^4 y_{-2}$ coefficients average to $\\frac{(u+1)u(u-1)\\left[(u-2)+(u+2)\\right]}{2\\cdot 4!} = \\frac{u^2(u^2-1)}{4!}$.',
        },
        {
          type: 'p',
          text: '**Stirling\'s formula** is therefore the mean of Gauss forward and Gauss backward; **Bessel\'s formula** is the mean of Gauss forward and Gauss backward with the origin shifted by one. In the teacher\'s notation ($u$ measured from the central ordinate):',
        },
        { type: 'math', tex: '\\text{Stirling: } y = y_0 + \\frac{u(\\Delta y_0 + \\Delta y_{-1})}{2} + \\frac{u^2\\Delta^2 y_{-1}}{2} + \\frac{u(u^2-1)(\\Delta^3 y_{-1}+\\Delta^3 y_{-2})}{2\\cdot 3!} + \\frac{u^2(u^2-1)\\Delta^4 y_{-2}}{4!} + \\cdots' },
        { type: 'math', tex: '\\text{Bessel: } y = \\frac{y_0+y_1}{2} + \\left(u-\\tfrac{1}{2}\\right)\\Delta y_0 + \\frac{u(u-1)}{2!}\\cdot\\frac{\\Delta^2 y_{-1}+\\Delta^2 y_0}{2} + \\frac{(u-\\tfrac{1}{2})u(u-1)}{3!}\\Delta^3 y_{-1} + \\cdots' },
        {
          type: 'table',
          head: ['Formula', 'Use it when'],
          rows: [
            ['Gauss forward', '$0 < u < 1$'],
            ['Gauss backward', '$-1 < u < 0$'],
            ['Stirling', '$-0.25 \\le u \\le 0.25$ (most accurate)'],
            ['Bessel', '$\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$'],
          ],
        },
        {
          type: 'note',
          text: 'Bessel\'s formula uses the **odd differences below the central line** and the **means of the even differences** on and below the line; the brackets in the difference table mean "take the average of the two values". Laplace–Everett\'s formula is the variant with the odd differences eliminated altogether.',
        },
      ],
    },
    {
      heading: 'Lagrange interpolation for unequally spaced points',
      blocks: [
        {
          type: 'p',
          text: 'Newton forward, Newton backward and the central difference formulae all need **equally spaced** arguments. When the $x$-values are not equally spaced, use Lagrange\'s formula or Newton\'s divided differences.',
        },
        {
          type: 'p',
          text: '**Derivation.** Since $(n+1)$ values of the function are given, represent $f(x)$ by a polynomial of degree $n$ written so that each term vanishes at all but one tabulated point:',
        },
        { type: 'math', tex: 'f(x) = a_0(x-x_1)(x-x_2)\\cdots(x-x_n) + a_1(x-x_0)(x-x_2)\\cdots(x-x_n) + \\cdots + a_n(x-x_0)(x-x_1)\\cdots(x-x_{n-1})' },
        {
          type: 'p',
          text: 'Put $x = x_0$: every term vanishes except the first, so $f(x_0) = a_0(x_0-x_1)(x_0-x_2)\\cdots(x_0-x_n)$ and therefore $a_0 = \\dfrac{f(x_0)}{(x_0-x_1)(x_0-x_2)\\cdots(x_0-x_n)}$. Similarly for $a_1, \\dots, a_n$. Substituting back gives **Lagrange\'s interpolation formula**:',
        },
        { type: 'math', tex: 'y = f(x) = \\sum_{i=0}^{n} f(x_i)\\prod_{j \\ne i}\\frac{x - x_j}{x_i - x_j}' },
        {
          type: 'p',
          text: 'The formula is simple and memorable, and it also works for equal intervals — but the arithmetic is heavier than in Newton\'s divided difference formula and there is always a risk of sign slips in the numerator and denominator of each term.',
        },
        {
          type: 'note',
          text: '**Sign discipline.** Keep the denominator in the order $(x_i - x_j)$ exactly as printed above; then every denominator with $i > j$ is negative. If you prefer $(x_j - x_i)$ you must also change the order of the $j$\'s — mixing the two conventions is the classic Lagrange error.',
        },
        {
          type: 'exam',
          text: 'A paper that asks "derive Lagrange\'s formula for unequal intervals" wants the four-line derivation: assume the form (8), put $x = x_0$ to get $a_0$, put $x = x_1$ to get $a_1$, write "similarly for $a_2 \\dots a_n$", substitute, and box the result.',
        },
      ],
    },
    {
      heading: "Newton's divided difference interpolation",
      blocks: [
        {
          type: 'p',
          text: 'The **first divided difference** between $x_0$ and $x_1$ is the difference of the ordinates divided by the distance between the arguments: $f[x_0,x_1] = \\dfrac{f(x_0)-f(x_1)}{x_0-x_1}$. The second order is $f[x_0,x_1,x_2] = \\dfrac{f[x_0,x_1]-f[x_1,x_2]}{x_0-x_2}$, and in general',
        },
        { type: 'math', tex: 'f[x_0,x_1,\\dots,x_{k+1}] = \\frac{f[x_0,x_1,\\dots,x_k] - f[x_1,x_2,\\dots,x_{k+1}]}{x_0 - x_{k+1}}' },
        {
          type: 'p',
          text: 'Divided differences are **symmetric** in their arguments ($f[x_0,x_1] = f[x_1,x_0]$), they are linear, and the $n$th divided difference of a polynomial of degree $n$ is a constant (the $(n+1)$st is zero). They are tabulated in the same diagonal layout as the difference table, but each entry divides by the gap between the two arguments.',
        },
        {
          type: 'p',
          text: '**Newton\'s general divided difference formula** is obtained by rearranging the definition $f[x,x_0] = \\dfrac{f(x)-f(x_0)}{x-x_0}$ and substituting repeatedly:',
        },
        { type: 'math', tex: 'f(x) = f(x_0) + (x-x_0)\\,f[x_0,x_1] + (x-x_0)(x-x_1)\\,f[x_0,x_1,x_2] + \\cdots + (x-x_0)\\cdots(x-x_{n-1})\\,f[x_0,x_1,\\dots,x_n]' },
        {
          type: 'note',
          text: '**When the data are equally spaced** the divided differences collapse back to the difference table: $f[x_0,x_1] = \\Delta y_0/h$, $f[x_0,x_1,x_2] = \\Delta^2 y_0/(2!h^2)$, and Newton\'s divided difference formula becomes Newton\'s forward formula. Use the divided difference table whenever the spacing is unequal.',
        },
        {
          type: 'exam',
          text: 'Show the divided difference table with the arguments in the first column, then quote the leading divided differences $f[x_0]$, $f[x_0,x_1]$, $f[x_0,x_1,x_2]$, \\dots, then substitute $x$. The table is worth most of the marks.',
        },
      ],
    },
    {
      heading: 'Error in interpolation and inverse interpolation',
      blocks: [
        {
          type: 'p',
          text: '**The error of the interpolating polynomial.** Build the auxiliary function $F(t) = f(t) - \\varphi(t) - \\dfrac{f(x)-\\varphi(x)}{(x-x_0)(x-x_1)\\cdots(x-x_n)}\\left(t-x_0\\right)\\cdots\\left(t-x_n\\right)$. It vanishes at $x_0, x_1, \\dots, x_n$ and at $x$, so Rolle\'s theorem gives a point $\\xi$ with $x_0 < \\xi < x_n$ at which $F^{(n+1)}(\\xi) = 0$. Differentiating $n+1$ times gives the remainder',
        },
        { type: 'math', tex: 'R(x) = f(x) - \\varphi(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\,(x-x_0)(x-x_1)\\cdots(x-x_n)' },
        {
          type: 'p',
          text: 'For equally spaced data this becomes the form you can evaluate from the table: $\\displaystyle R(x) = \\frac{\\Delta^{n+1}y_0}{(n+1)!}\\,u(u-1)\\cdots(u-n)$ for the forward formula, and $\\displaystyle R(x) = \\frac{\\nabla^{n+1}y_n}{(n+1)!}\\,u(u+1)\\cdots(u+n)$ for the backward formula.',
        },
        {
          type: 'note',
          text: '**The error is not the last difference.** A common wrong answer is "the error is $\\Delta^{n+1}y_0$". The last difference is only the *coefficient* — the error is that number multiplied by $u(u-1)\\cdots(u-n)/(n+1)!$.',
        },
        {
          type: 'p',
          text: '**Inverse interpolation** answers the reversed question: given a set of $(x,y)$ values for $y = f(x)$, find the value of **$x$** corresponding to a given value of **$y$**. The standard method is Lagrange\'s formula with $x$ and $y$ interchanged:',
        },
        { type: 'math', tex: 'x = \\sum_{i=0}^{n} x_i \\prod_{j \\ne i}\\frac{y - y_j}{y_i - y_j}' },
        {
          type: 'p',
          text: 'Shanker Rao Ch.7 gives two further methods for equally spaced tables: the **method of successive approximations** (write $y - y_0 = u\\Delta y_0 + \\cdots$, divide by $\\Delta y_0$, and solve for $u$ by iteration, taking $u_0 = \\dfrac{y-y_0}{\\Delta y_0}$) and the **reversion of series** (invert the Newton forward series).',
        },
        {
          type: 'exam',
          text: 'For inverse interpolation, state that the roles of $x$ and $y$ are interchanged, write the formula, then substitute the given $y$ and the three or four ordinates. Box the resulting $x$.',
        },
      ],
    },
    {
      heading: 'Missing values in an interpolation table',
      blocks: [
        {
          type: 'p',
          text: 'When one or more entries of an equally spaced table are missing, use the relation between the operators $E$ and $\\Delta$. If $y$ is a polynomial of degree $n-1$ through $n+1$ points, then $\\Delta^n y_0 = 0$, i.e.',
        },
        { type: 'math', tex: '(E-1)^n y_0 = 0 \\;\\Rightarrow\\; E^n y_0 - nE^{n-1}y_0 + \\binom{n}{2}E^{n-2}y_0 - \\cdots + (-1)^n y_0 = 0' },
        {
          type: 'p',
          text: 'i.e. $y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0$, the **Newton binomial expansion formula**. It finds the missing value *without constructing the difference table*; each missing value needs its own equation, and two missing values need two overlapping equations.',
        },
        {
          type: 'p',
          text: 'The alternative is the **difference-table method**: build the table with the unknowns written in, then require the highest differences to vanish (or to be constant) and solve the resulting equations — for one missing value the missing entry appears in one equation only.',
        },
        {
          type: 'note',
          text: '**Choose the degree carefully.** With $m$ known values and $k$ missing ones you need $k$ independent equations, so assume the lowest degree that the data allow. Assuming degree $n-1$ in a table of $n+1$ points gives exactly one equation (one missing value); assuming degree $n-2$ gives two.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Newton forward (Gregory) formula', tex: 'y = y_0 + p\\,\\Delta y_0 + \\frac{p(p-1)}{2!}\\Delta^2 y_0 + \\frac{p(p-1)(p-2)}{3!}\\Delta^3 y_0 + \\cdots', where: 'equally spaced data, $p = (x-x_0)/h$' },
    { label: 'Falling factorial', tex: 'p^{\\underline{k}} = p(p-1)(p-2)\\cdots(p-k+1)', where: 'the product in the Newton forward formula' },
    { label: 'Newton backward (Gregory) formula', tex: 'y = y_n + p\\,\\nabla y_n + \\frac{p(p+1)}{2!}\\nabla^2 y_n + \\frac{p(p+1)(p+2)}{3!}\\nabla^3 y_n + \\cdots', where: 'equally spaced data, $p = (x-x_n)/h < 0$' },
    { label: 'Gauss forward formula', tex: 'y = y_0 + p\\,\\Delta y_0 + \\frac{p(p-1)}{2!}\\Delta^2 y_{-1} + \\frac{(p+1)p(p-1)}{3!}\\Delta^3 y_{-1} + \\frac{(p+1)p(p-1)(p-2)}{4!}\\Delta^4 y_{-2} + \\cdots', where: 'equal spacing, $0 < p < 1$' },
    { label: 'Gauss backward formula', tex: 'y = y_0 + p\\,\\Delta y_{-1} + \\frac{(p+1)p}{2!}\\Delta^2 y_{-1} + \\frac{(p+1)p(p-1)}{3!}\\Delta^3 y_{-2} + \\frac{(p+2)(p+1)p(p-1)}{4!}\\Delta^4 y_{-2} + \\cdots', where: 'equal spacing, $-1 < p < 0$' },
    { label: 'Stirling\'s formula', tex: 'y = y_0 + \\frac{p(\\Delta y_0 + \\Delta y_{-1})}{2} + \\frac{p^2\\Delta^2 y_{-1}}{2} + \\frac{p(p^2-1)(\\Delta^3 y_{-1}+\\Delta^3 y_{-2})}{2\\cdot 3!} + \\frac{p^2(p^2-1)\\Delta^4 y_{-2}}{4!}', where: 'equal spacing, $-0.25 \\le p \\le 0.25$' },
    { label: 'Bessel\'s formula', tex: 'y = \\frac{y_0+y_1}{2} + \\left(p-\\tfrac{1}{2}\\right)\\Delta y_0 + \\frac{p(p-1)}{2!}\\cdot\\frac{\\Delta^2 y_{-1}+\\Delta^2 y_0}{2} + \\frac{(p-\\tfrac{1}{2})p(p-1)}{3!}\\Delta^3 y_{-1}', where: 'equal spacing, $\\tfrac{1}{4} \\le p \\le \\tfrac{3}{4}$' },
    { label: 'Lagrange interpolation formula', tex: 'y = \\sum_{i=0}^{n} f(x_i)\\prod_{j \\ne i}\\frac{x - x_j}{x_i - x_j}', where: 'unequally spaced points' },
    { label: 'Newton divided difference formula', tex: 'f(x) = f(x_0) + (x-x_0)f[x_0,x_1] + (x-x_0)(x-x_1)f[x_0,x_1,x_2] + \\cdots', where: 'unequally spaced points' },
    { label: 'First divided difference', tex: 'f[x_0,x_1] = \\frac{f(x_0)-f(x_1)}{x_0-x_1}', where: 'the difference table for unequal intervals' },
    { label: 'Error in interpolation', tex: 'R(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)(x-x_1)\\cdots(x-x_n)', where: '$x_0 < \\xi < x_n$' },
    { label: 'Error in the forward formula', tex: 'R(x) = \\frac{\\Delta^{n+1}y_0}{(n+1)!}\\,p(p-1)(p-2)\\cdots(p-n)', where: 'equally spaced data' },
    { label: 'Error in the backward formula', tex: 'R(x) = \\frac{\\nabla^{n+1}y_n}{(n+1)!}\\,p(p+1)(p+2)\\cdots(p+n)', where: 'equally spaced data' },
    { label: 'Inverse Lagrange interpolation', tex: 'x = \\sum_{i=0}^{n} x_i\\prod_{j \\ne i}\\frac{y - y_j}{y_i - y_j}', where: 'given $y$, find $x$' },
    { label: 'Newton binomial expansion formula', tex: 'y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0', where: 'one missing value in a table of $n+1$ points' },
  ],
  examples: [
    {
      title: 'Newton forward interpolation of the cubic through $(0,-1), (1,1), (2,1), (3,-2)$ at $x = 1.5$',
      type: 'Numerical — Newton forward',
      question: 'A third-degree polynomial passes through the points $(0,-1)$, $(1,1)$, $(2,1)$ and $(3,-2)$. Find the polynomial by Newton\'s forward interpolation formula and its value at $x = 1.5$.',
      source: 'Fall 2024 B1(b)',
      marks: 6,
      steps: [
        { t: 'Difference table: $\\Delta y_0 = 2$, $\\Delta^2 y_0 = -2$, $\\Delta^3 y_0 = -1$.', m: '2 marks' },
        { t: 'With $x_0 = 0$, $h = 1$: $u = \\dfrac{x - x_0}{h} = x$, and Newton\'s forward formula $y = y_0 + u\\Delta y_0 + \\dfrac{u(u-1)}{2!}\\Delta^2 y_0 + \\dfrac{u(u-1)(u-2)}{3!}\\Delta^3 y_0$ gives $y(x) = -1 + 2x + \\dfrac{x(x-1)}{2}(-2) + \\dfrac{x(x-1)(x-2)}{6}(-1)$.', m: '1 mark' },
        { t: 'Expand: $-1 + 2x - (x^2 - x) - \\frac{1}{6}(x^3 - 3x^2 + 2x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3$.', m: '2 marks' },
        { t: 'At $x = 1.5$ ($u = 1.5$): $y = -1 + 1.5(2) + \\dfrac{1.5(0.5)}{2}(-2) + \\dfrac{1.5(0.5)(-0.5)}{6}(-1) = -1 + 3 - 0.75 + 0.0625 = 1.3125$.', m: '1 mark' },
      ],
      answer: '$\\boxed{y(x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3, \\quad y(1.5) = 1.3125}$',
      note: 'Trap: dropping the 3! in the third term (writing 6 for 3!), or dividing the last term by $2$ instead of $3!$.',
      explanation: [
        'The difference table is $y = -1, 1, 1, -2$; $\\Delta y = 2, 0, -3$; $\\Delta^2 y = -2, -3$; $\\Delta^3 y = -1$. The leading differences $2, -2, -1$ are all the formula needs.',
        'The polynomial comes out of the same formula: $-1 + 2x - x(x-1) + \\frac{1}{6}x(x-1)(x-2)$ expands to $-1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3$.',
        'Newton forward versus Lagrange: Newton needs only the leading differences of the table (cheap to build, and it extends by adding a column); Lagrange needs no table but repeats a long product for every tabulated point. Both give the same interpolating polynomial, so they always agree on the value.',
      ],
    },
    {
      title: "Newton's divided difference interpolation for $f(9)$",
      type: 'Numerical — Divided differences',
      question: 'Using Newton\'s divided difference formula, evaluate $f(9)$ from the table $x = 5, 7, 11, 13, 17$ with $f(x) = 150, 392, 1452, 2366, 5202$.',
      source: 'Fall 2024 B1(c)',
      marks: 6,
      steps: [
        { t: 'First divided differences: $\\dfrac{392-150}{7-5} = 121$, $\\dfrac{1452-392}{11-7} = 265$, $\\dfrac{2366-1452}{13-11} = 457$, $\\dfrac{5202-2366}{17-13} = 709$.', m: '2 marks' },
        { t: 'Second: $\\dfrac{265-121}{11-5} = 24$, $\\dfrac{457-265}{13-7} = 32$, $\\dfrac{709-457}{17-11} = 42$.', m: '1 mark' },
        { t: 'Third: $\\dfrac{32-24}{13-5} = 1$, $\\dfrac{42-32}{17-7} = 1$. Fourth: $\\dfrac{1-1}{17-5} = 0$.', m: '1 mark' },
        { t: '$f(9) = 150 + (9-5)(121) + (9-5)(9-7)(24) + (9-5)(9-7)(9-11)(1) + 0$.', m: '1 mark' },
        { t: '$f(9) = 150 + 484 + 192 - 16 = 810$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f(9) = 810}$',
      note: 'Trap: dividing by $h$ as if the points were equally spaced — here the gaps are $2, 4, 2, 4$, and each divided difference must use its own gap.',
      explanation: [
        'The divided difference table is the same diagonal layout as the difference table, but the rule is "subtract the two entries above and divide by the distance between the two arguments". The fourth divided difference is $0$, so the data fit a cubic and the last term drops out.',
        'Because the leading divided differences are $f[x_0]=150$, $f[x_0,x_1]=121$, $f[x_0,x_1,x_2]=24$, $f[x_0,x_1,x_2,x_3]=1$, the formula reads $f(x) = 150 + (x-5)\\,121 + (x-5)(x-7)\\,24 + (x-5)(x-7)(x-11)\\,1$.',
        'Newton divided differences versus Lagrange: both handle unequal spacing, but the divided difference table is built once and reused for any number of new points; Lagrange repeats a long product for every point.',
      ],
    },
    {
      title: 'Divided difference table for $x = 1, 3, 4, 6, 10$',
      type: 'Numerical — Divided differences',
      question: 'Prepare the divided difference table for the data $x = 1, 3, 4, 6, 10$ with $f(x) = 0, 18, 58, 190, 920$.',
      source: 'Shanker Rao Ch.5, Example 5.2 (marked "** Math" in class)',
      marks: 5,
      steps: [
        { t: 'First divided differences: $\\dfrac{18-0}{3-1} = 9$, $\\dfrac{58-18}{4-3} = 40$, $\\dfrac{190-58}{6-4} = 66$, $\\dfrac{920-190}{10-6} = 182.5$.', m: '2 marks' },
        { t: 'Second: $\\dfrac{40-9}{4-1} = 10.3333$, $\\dfrac{66-40}{6-3} = 8.6667$, $\\dfrac{182.5-66}{10-4} = 19.4167$.', m: '1 mark' },
        { t: 'Third: $\\dfrac{8.6667-10.3333}{6-1} = -0.3333$, $\\dfrac{19.4167-8.6667}{10-3} = 1.5357$.', m: '1 mark' },
        { t: 'Fourth: $\\dfrac{1.5357-(-0.3333)}{10-1} = 0.2077$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f[x_0,x_1] = 9,\\ f[x_0,x_1,x_2] = 10.3333,\\ f[x_0,\\dots,x_3] = -0.3333,\\ f[x_0,\\dots,x_4] = 0.2077}$',
      note: 'Trap: each divided difference divides by the gap between the two outermost arguments it spans, not by the gap of its neighbours: the third difference uses $6 - 1$, the fourth $10 - 1$.',
      explanation: [
        'Source discrepancy: the book (and Medha’s copy of it, p.25) prints the third first difference as $\\frac{58-190}{4-6} = 61$; it is $66$. That one slip carries through the rest of the printed table ($7$, $10.25$, $0.6660$, $0.4643$, $0.1248$). The table above is recomputed from the data; check any table you copy by redoing one entry per column.',
        'The leading divided differences (the top of each column) are what Newton’s divided difference formula uses: $f(x) = 0 + (x-1)\\,9 + (x-1)(x-3)\\,10.3333 + (x-1)(x-3)(x-4)(-0.3333) + (x-1)(x-3)(x-4)(x-6)\\,0.2077$.',
      ],
    },
    {
      title: "Lagrange's interpolation formula for unequal intervals, and $f(2)$",
      type: 'Numerical — Lagrange',
      question: 'Derive Lagrange\'s interpolation formula for unequally spaced points $x_0, x_1, \\dots, x_n$, and use it to find $f(2)$ from $x = 0, 1, 3, 4$ with $f(x) = 5, 6, 50, 105$.',
      source: 'Shanker Rao Ch.5, §5.3 and Exercise 5.1',
      marks: 6,
      steps: [
        { t: 'Assume $f(x) = a_0(x-x_1)\\cdots(x-x_n) + a_1(x-x_0)\\cdots(x-x_n) + \\cdots + a_n(x-x_0)\\cdots(x-x_{n-1})$.', m: '1 mark' },
        { t: 'Put $x = x_0$: $f(x_0) = a_0(x_0-x_1)(x_0-x_2)(x_0-x_3)$, so $a_0 = \\dfrac{f(x_0)}{(x_0-x_1)(x_0-x_2)(x_0-x_3)}$.', m: '2 marks' },
        { t: 'Similarly $a_1 = \\dfrac{f(x_1)}{(x_1-x_0)(x_1-x_2)(x_1-x_3)}$, and so on for $a_2, a_3$; substituting gives the formula.', m: '1 mark' },
        { t: '$f(2) = 5\\dfrac{(2-1)(2-3)(2-4)}{(0-1)(0-3)(0-4)} + 6\\dfrac{(2-0)(2-3)(2-4)}{(1-0)(1-3)(1-4)} + 50\\dfrac{(2-0)(2-1)(2-4)}{(3-0)(3-1)(3-4)} + 105\\dfrac{(2-0)(2-1)(2-3)}{(4-0)(4-1)(4-3)}$.', m: '1 mark' },
        { t: '$f(2) = 5\\left(\\frac{2}{-12}\\right) + 6\\left(\\frac{4}{6}\\right) + 50\\left(\\frac{-4}{-6}\\right) + 105\\left(\\frac{-2}{12}\\right) = -\\frac{5}{6} + 4 + \\frac{100}{3} - \\frac{35}{2} = 19$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f(x) = \\sum_{i=0}^{n} f(x_i)\\prod_{j\\ne i}\\frac{x-x_j}{x_i-x_j},\\qquad f(2) = 19}$',
      note: 'Trap: mixing the sign conventions in the numerator and the denominator, and dropping the sign of the $(x_j - x_i)$ factors.',
      explanation: [
        'The derivation is four lines and is exactly what the paper asks for: assume the symmetric form, evaluate at each tabulated point to isolate the coefficient, substitute back.',
        'Lagrange works for equally spaced data too, but the arithmetic is longer than Newton\'s: each term is a product of $n$ factors in both numerator and denominator, so a sign slip is easy and every point must be recomputed from scratch.',
        'Newton\'s divided difference formula is the practical choice for repeated use: build the table once, then read off the value of any new point.',
      ],
    },
    {
      title: 'Missing values in an interpolation table',
      type: 'Numerical — Difference table',
      question: 'Find the missing entries in the table $x = 0, 2, 4, 6, 8, 10$ with $f(x) = 2, \\cdot, 10, 17, \\cdot, 37$.',
      source: 'Spring 2024 (missing values in an interpolation table)',
      marks: 6,
      steps: [
        { t: 'There are six equally spaced points ($h = 2$) and two missing values, so we need two equations: assume the data come from a polynomial of degree 3, so the fourth differences vanish.', m: '1 mark' },
        { t: '$\\Delta^4 y_0 = y_4 - 4y_3 + 6y_2 - 4y_1 + y_0 = 0$ gives $b - 4(17) + 6(10) - 4a + 2 = 0$, i.e. $b - 4a = 6$.', m: '2 marks' },
        { t: '$\\Delta^4 y_1 = y_5 - 4y_4 + 6y_3 - 4y_2 + y_1 = 0$ gives $37 - 4b + 6(17) - 4(10) + a = 0$, i.e. $a - 4b = -99$.', m: '2 marks' },
        { t: 'Solve: from the first, $b = 4a + 6$; substituting, $a - 4(4a + 6) = -99 \\Rightarrow -15a = -75 \\Rightarrow a = 5$, and $b = 4(5) + 6 = 26$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f(2) = 5, \\qquad f(8) = 26}$',
      note: 'Trap: assuming a degree-4 polynomial, which gives only one equation for two unknowns. The number of equations must equal the number of missing values.',
      explanation: [
        'With the values in, the table is $2, 5, 10, 17, 26, 37$: the first differences are $3, 5, 7, 9, 11$, the second differences are all $2$, and the third differences are zero — so the data are actually quadratic, $f(x) = \\frac{x^2}{4} + x + 2$, and the assumed cubic is more than enough.',
        'The same result comes from Newton\'s binomial expansion formula, which is the method the book uses for a single missing value: with $n+1$ points and a degree-$(n-1)$ polynomial, $\\Delta^n y_0 = 0$ gives $y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0$ directly in the ordinates.',
        'Always check the answer: re-difference the completed table and confirm that the highest differences vanish or are constant.',
      ],
    },
    {
      title: "Newton's backward interpolation: $f(7.5)$ from $f(x) = x^3$",
      type: 'Numerical — Newton backward',
      question: 'Calculate $f(7.5)$ for the table $x = 1, 2, 3, 4, 5, 6, 7, 8$ with $f(x) = 1, 8, 27, 64, 125, 216, 343, 512$.',
      source: 'Shanker Rao Ch.4, Example 4.10',
      marks: 6,
      steps: [
        { t: 'The point is near the **end** of the table, so use Newton\'s backward formula with $x_n = 8$, $h = 1$.', m: '1 mark' },
        { t: '$u = \\dfrac{x-x_n}{h} = \\dfrac{7.5-8}{1} = -0.5$.', m: '1 mark' },
        { t: 'Backward differences at the end of the table: $\\nabla y_8 = 169$, $\\nabla^2 y_8 = 42$, $\\nabla^3 y_8 = 6$, and $\\nabla^4 y_8 = \\nabla^5 y_8 = 0$.', m: '2 marks' },
        { t: '$f(7.5) = 512 + (-0.5)(169) + \\dfrac{(-0.5)(0.5)}{2!}(42) + \\dfrac{(-0.5)(0.5)(1.5)}{3!}(6)$.', m: '1 mark' },
        { t: '$f(7.5) = 512 - 84.5 - 5.25 - 0.375 = 421.875$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f(7.5) = 421.875}$',
      note: 'Trap: writing $u = +0.5$ instead of $-0.5$. The backward formula counts steps *backwards* from the end of the table, so $u$ is negative.',
      explanation: [
        'The backward differences are read off the same table in the reverse direction: $\\nabla y_8 = 512-343 = 169$, $\\nabla^2 y_8 = 42$, $\\nabla^3 y_8 = 6$.',
        'Because the data here are an exact cubic, every method gives the same answer: $7.5^3 = 421.875$. That is the check — if Newton backward and Lagrange disagree, the arithmetic (or the formula) is wrong.',
        'On real data the two methods differ slightly, because the forward and backward formulas use different truncations of the same series of differences. That is why the book\'s alloy example quotes $286.96$ from the backward formula while the full polynomial through all six points gives $286.87$.',
      ],
    },
    {
      title: "Gauss's forward formula: $y(30)$ from five equally spaced values",
      type: 'Numerical — Gauss forward',
      question: 'Use Gauss forward formula to find $y$ for $x = 30$ given $x = 21, 25, 29, 33, 37$ and $y = 18.4708, 17.8144, 17.1070, 16.3432, 15.5154$.',
      source: 'Shanker Rao Ch.6, Example 6.1',
      marks: 6,
      steps: [
        { t: 'Take $x_0 = 29$ (the central ordinate), $h = 4$: $u = \\dfrac{30-29}{4} = 0.25$, which lies between $0$ and $1$, so Gauss\'s forward formula is suitable.', m: '1 mark' },
        { t: 'Difference table: $\\Delta y = -0.6564, -0.7074, -0.7638, -0.8278$; $\\Delta^2 y = -0.0510, -0.0564, -0.0640$; $\\Delta^3 y = -0.0054, -0.0076$; $\\Delta^4 y = -0.0022$. So $\\Delta y_0 = -0.7638$, $\\Delta^2 y_{-1} = -0.0564$, $\\Delta^3 y_{-1} = -0.0076$, $\\Delta^4 y_{-2} = -0.0022$.', m: '2 marks' },
        { t: '$y = y_0 + u\\Delta y_0 + \\dfrac{u(u-1)}{2!}\\Delta^2 y_{-1} + \\dfrac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-1} + \\dfrac{(u+1)u(u-1)(u-2)}{4!}\\Delta^4 y_{-2}$.', m: '1 mark' },
        { t: '$y = 17.1070 + 0.25(-0.7638) + \\dfrac{(0.25)(-0.75)}{2}(-0.0564) + \\dfrac{(1.25)(0.25)(-0.75)}{6}(-0.0076) + \\dfrac{(1.25)(0.25)(-0.75)(-1.75)}{24}(-0.0022)$.', m: '1 mark' },
        { t: '$y = 17.1070 - 0.19095 + 0.0052875 + 0.0002969 - 0.0000376 = 16.9216$.', m: '1 mark' },
      ],
      answer: '$\\boxed{y(30) = 16.9216}$',
      note: 'Trap: taking $\\Delta^2 y_0$ instead of $\\Delta^2 y_{-1}$. Gauss forward zig-zags: odd differences on the $y_0$–$y_1$ side of the central line ($\\Delta y_0$, $\\Delta^3 y_{-1}$), even differences **on** it ($\\Delta^2 y_{-1}$, $\\Delta^4 y_{-2}$).',
      explanation: [
        'The origin is chosen at the tabulated point just **below** $x = 30$, so that $0 < u < 1$ — that is the range Gauss forward is built for. With $x_0 = 29$ the point $30$ sits a quarter of a step to the right.',
        'In the difference table, draw the horizontal line through $y_0 = 17.1070$. The formula takes the first difference between $y_0$ and $y_1$ ($\\Delta y_0$), the second difference on the line ($\\Delta^2 y_{-1}$), the third on the same $y_0$–$y_1$ side ($\\Delta^3 y_{-1}$) and the fourth on the line ($\\Delta^4 y_{-2}$).',
        'The terms shrink fast ($-0.19$, $0.005$, $0.0003$, $-0.00004$), which is the sign that the differences have converged and the answer is good to four decimals.',
      ],
    },
    {
      title: "Gauss's backward formula: the sales for 1966",
      type: 'Numerical — Gauss backward',
      question: 'Use Gauss\'s backward formula and find the sales for the year 1966, given the sales (in lakhs) $12, 15, 20, 27, 39, 52$ for the years $1931, 1941, 1951, 1961, 1971, 1981$.',
      source: 'Shanker Rao Ch.6, Example 6.2',
      marks: 6,
      steps: [
        { t: '$h = 10$. Take 1971 as the origin: $u = \\dfrac{1966-1971}{10} = -0.5$, which lies between $-1$ and $0$, so Gauss\'s backward formula is suitable.', m: '1 mark' },
        { t: 'Difference table: $\\Delta y = 3, 5, 7, 12, 13$; $\\Delta^2 y = 2, 2, 5, 1$; $\\Delta^3 y = 0, 3, -4$; $\\Delta^4 y = 3, -7$; $\\Delta^5 y = -10$. With $y_0 = 39$: $\\Delta y_{-1} = 12$, $\\Delta^2 y_{-1} = 1$, $\\Delta^3 y_{-2} = -4$.', m: '2 marks' },
        { t: '$y = y_0 + u\\Delta y_{-1} + \\dfrac{(u+1)u}{2!}\\Delta^2 y_{-1} + \\dfrac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-2} + \\cdots$', m: '1 mark' },
        { t: '$y = 39 + (-0.5)(12) + \\dfrac{(0.5)(-0.5)}{2}(1) + \\dfrac{(0.5)(-0.5)(-1.5)}{6}(-4)$.', m: '1 mark' },
        { t: '$y = 39 - 6 - 0.125 - 0.25 = 32.625$.', m: '1 mark' },
      ],
      answer: '$\\boxed{y_{1966} = 32.625 \\text{ lakh}}$',
      note: 'Trap: using $u = +0.5$ from 1961. That makes $0 < u < 1$, which is Gauss **forward** territory; for the backward formula the origin is the year **after** 1966, so $u$ is negative.',
      explanation: [
        'Gauss backward needs $-1 < u < 0$, so the origin is the tabulated year just after the required one: 1971, giving $u = -0.5$.',
        'It takes the odd differences on the $y_{-1}$–$y_0$ side of the line (the gap between 1961 and 1971 is $\\Delta y_{-1} = 12$; then $\\Delta^3 y_{-2} = -4$) and the even differences on the line through $y_0$ ($\\Delta^2 y_{-1} = 1$).',
        'The book stops at the third difference: the next even difference on the central line, $\\Delta^4 y_{-2}$, would need a row below 1981 that the table does not have.',
      ],
    },
    {
      title: "Bessel's formula: $Y(25)$ from four equally spaced values",
      type: 'Numerical — Bessel',
      question: 'Apply Bessel\'s formula to obtain $Y_{25}$ given $Y_{20} = 2854$, $Y_{24} = 3162$, $Y_{28} = 3544$ and $Y_{32} = 3992$.',
      source: 'Shanker Rao Ch.6, Example 6.6',
      marks: 6,
      steps: [
        { t: 'Take $X = 24$ as the origin and $h = 4$, so $u = \\dfrac{25-24}{4} = 0.25$.', m: '1 mark' },
        { t: 'Difference table: $\\Delta Y_0 = 382$, $\\Delta Y_1 = 448$; $\\Delta^2 Y_{-1} = 74$, $\\Delta^2 Y_0 = 66$; $\\Delta^3 Y_{-1} = -8$.', m: '2 marks' },
        { t: "$Y_0 = 3162$, $Y_1 = 3544$.", m: '1 mark' },
        { t: "$Y_{25} = \\dfrac{3162+3544}{2} + \\left(0.25-\\dfrac{1}{2}\\right)(382) + \\dfrac{0.25(0.25-1)}{2!}\\cdot\\dfrac{74+66}{2} + \\dfrac{\\left(0.25-\\frac{1}{2}\\right)(0.25)(0.25-1)}{3!}(-8)$.", m: '1 mark' },
        { t: '$Y_{25} = 3353 - 95.5 - 6.5625 - 0.0625 = 3250.875$.', m: '1 mark' },
      ],
      answer: '$\\boxed{Y_{25} = 3250.875}$',
      note: 'Trap: forgetting the $\\tfrac{1}{2}$ in front of $(\\Delta^2 y_{-1}+\\Delta^2 y_0)$ — Bessel\'s formula uses the *mean* of the even differences.',
      explanation: [
        'Bessel\'s formula is the mean of Gauss forward and Gauss backward with the origin moved to $x_1$; it uses the odd differences below the central line and the means of the even differences on and below it.',
        'The value of $u$ decides the formula: $u = 0.25$ lies in $\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$, which is exactly the range where Bessel is most efficient. (Stirling would be used for $-0.25 \\le u \\le 0.25$.)',
        'Cross-check: interpolating the same four points with Lagrange\'s formula or Newton forward gives $3250.875$ as well — the four points fix a cubic, and every formula reproduces it.',
      ],
    },
    {
      title: "Stirling's formula: $Y(28)$ from five equally spaced values",
      type: 'Numerical — Stirling',
      question: 'Use Stirling\'s formula to find $Y_{28}$, given $Y_{20} = 49225$, $Y_{25} = 48316$, $Y_{30} = 47236$, $Y_{35} = 45926$, $Y_{40} = 44306$.',
      source: 'Shanker Rao Ch.6, Example 6.8',
      marks: 6,
      steps: [
        { t: 'Take $X = 30$ as the origin and $h = 5$, so $u = \\dfrac{28-30}{5} = -0.4$.', m: '1 mark' },
        { t: 'Difference table (origin $X=30$): $\\Delta Y_0 = -1310$, $\\Delta Y_{-1} = -1080$; $\\Delta^2 Y_{-1} = -230$, $\\Delta^2 Y_{-2} = -171$; $\\Delta^3 Y_{-1} = -80$, $\\Delta^3 Y_{-2} = -59$; $\\Delta^4 Y_{-2} = -21$.', m: '2 marks' },
        { t: '$Y_{28} = 47236 + \\dfrac{(-0.4)(-1310-1080)}{2} + \\dfrac{(-0.4)^2(-230)}{2} + \\dfrac{(-0.4)((-0.4)^2-1)(-80-59)}{2\\cdot 3!} + \\dfrac{(-0.4)^2(((-0.4)^2-1))(-21)}{4!}$.', m: '1 mark' },
        { t: '$Y_{28} = 47236 + 478 - 18.4 - 3.892 + 0.1176$.', m: '1 mark' },
        { t: '$Y_{28} = 47691.8256 \\approx 47692$.', m: '1 mark' },
      ],
      answer: '$\\boxed{Y_{28} \\approx 47692}$',
      note: 'Trap: using $u = +0.4$. The origin is $X = 30$ and the required value is to its left, so $u$ is negative — and $u^2$ terms are positive while $u(u^2-1)$ is negative.',
      explanation: [
        'Stirling\'s formula is the mean of Gauss forward and Gauss backward, so the first difference enters as the average $\\tfrac{1}{2}(\\Delta y_0 + \\Delta y_{-1})$, the second as $\\Delta^2 y_{-1}$, and the third as the mean $\\tfrac{1}{2}(\\Delta^3 y_{-1}+\\Delta^3 y_{-2})$.',
        'The range check: $|u| = 0.4$ lies just outside Stirling\'s best range $-0.25 \\le u \\le 0.25$ and just outside Bessel\'s $\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$ as well, so the book uses Stirling because the origin $X=30$ is the central ordinate of the table.',
        'Interpolating the same five points with Lagrange\'s formula gives $47691.8256$ — identical, which is the check that the Stirling arithmetic is right.',
      ],
    },
    {
      title: 'Error in the forward interpolation formula',
      type: 'Numerical — Interpolation error',
      question: 'Use Newton\'s forward interpolation formula to find $\\sin 52^\\circ$ from the table $x = 45^\\circ, 50^\\circ, 55^\\circ, 60^\\circ$ with $y = \\sin x = 0.7071, 0.7660, 0.8192, 0.8660$, and estimate the error.',
      source: 'Shanker Rao Ch.4, Example 4.11',
      marks: 6,
      steps: [
        { t: 'Difference table: $\\Delta y_0 = 0.0589$, $\\Delta^2 y_0 = -0.0057$, $\\Delta^3 y_0 = -0.0007$.', m: '2 marks' },
        { t: '$u = \\dfrac{52-45}{5} = 1.4$.', m: '1 mark' },
        { t: '$f(52) = 0.7071 + 1.4(0.0589) + \\dfrac{1.4(0.4)}{2!}(-0.0057) + \\dfrac{1.4(0.4)(-0.6)}{3!}(-0.0007)$.', m: '1 mark' },
        { t: '$f(52) = 0.7071 + 0.08246 - 0.001596 + 0.0000392 = 0.7880032$.', m: '1 mark' },
        { t: 'Error $= \\dfrac{\\Delta^3 y_0}{3!}u(u-1)(u-2) = \\dfrac{-0.0007}{6}(1.4)(0.4)(-0.6) = 0.0000392$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\sin 52^\\circ \\approx 0.7880032,\\quad \\text{error} \\approx 0.0000392}$',
      note: 'Trap: reporting the error as $\\Delta^3 y_0 = -0.0007$. The error is that number multiplied by $\\dfrac{u(u-1)(u-2)}{3!}$.',
      explanation: [
        'The error term of the forward formula is $R(x) = \\dfrac{\\Delta^{n+1}y_0}{(n+1)!}u(u-1)\\cdots(u-n)$, obtained from the general remainder $R(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod(x-x_i)$ by writing each $x-x_i = (u-i)h$.',
        'The true value is $\\sin 52^\\circ = 0.7880107$, so the interpolation is accurate to about $8\\times 10^{-6}$ — the estimate $0.0000392$ is the right order of magnitude.',
        'The error grows quickly as you move away from the origin, which is the practical reason for choosing the formula whose origin is nearest to the required point.',
      ],
    },
    {
      title: 'Inverse interpolation: find $x$ for a given $y$',
      type: 'Numerical — Inverse interpolation',
      question: 'The values of the probability integral $y = \\int_0^x e^{-t^2/2}\\,dt$ are tabulated below. For what value of $x$ is this integral equal to $0.5$? $x = 0.46, 0.47, 0.48, 0.49$ with $y = 0.484655, 0.4937452, 0.5027498, 0.5116683$.',
      source: 'Shanker Rao Ch.5, Example 5.9',
      marks: 6,
      steps: [
        { t: 'Inverse interpolation: interchange $x$ and $y$ in Lagrange\'s formula and use the ordinates as the new arguments.', m: '1 mark' },
        { t: '$x = 0.46\\dfrac{(0.5-0.4937452)(0.5-0.5027498)(0.5-0.5116683)}{(0.484655-0.4937452)(0.484655-0.5027498)(0.484655-0.5116683)} + \\dots$ (four such terms).', m: '2 marks' },
        { t: 'Evaluating the four terms: $-0.0207787 + 0.157737 + 0.369928 - 0.0299495$.', m: '2 marks' },
        { t: '$x = 0.476937 \\approx 0.47694$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x \\approx 0.47694}$',
      note: 'Trap: interpolating $y$ as a function of $x$ and then inverting by eye — you must swap the roles of $x$ and $y$ inside the formula itself.',
      explanation: [
        'Inverse interpolation is simply Lagrange\'s formula with $x$ and $y$ interchanged: $x = \\sum x_i\\prod_{j\\ne i}\\dfrac{y-y_j}{y_i-y_j}$. For equally spaced data Shanker Rao Ch.7 also gives the method of successive approximations and the reversion of series.',
        'It is worth checking the direction of the function: here $y$ increases with $x$, so the required $x$ must lie between $0.47$ and $0.48$ — and $0.47694$ does, which is a cheap sanity check before you write the answer down.',
        'The book prints $0.476937$ for this example; the last digit differs only because of rounding in the book\'s arithmetic.',
      ],
    },
  ],
  flashcards: [
    { front: 'What is interpolation?', back: 'Estimating $f(x)$ for a given $x$ from tabulated values of $f$, by replacing $f$ with a simpler function $\\varphi(x)$ that agrees with it at the tabulated points. Thiele: "the art of reading between the lines of a table".' },
    { front: "State Newton's forward (Gregory) formula.", back: '$y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 + \\cdots$ with $u = (x-x_0)/h$. Use it near the **beginning** of an equally spaced table.' },
    { front: 'What is the falling factorial in Newton\'s forward formula?', back: '$u^{\\underline{k}} = u(u-1)(u-2)\\cdots(u-k+1)$, so $y = \\sum_{k=0}^{n}\\frac{\\Delta^k y_0}{k!}u^{\\underline{k}}$.' },
    { front: "State Newton's backward formula and say when to use it.", back: '$y = y_n + u\\nabla y_n + \\frac{u(u+1)}{2!}\\nabla^2 y_n + \\frac{u(u+1)(u+2)}{3!}\\nabla^3 y_n + \\cdots$ with $u = (x-x_n)/h$ (negative). Use it near the **end** of the table.' },
    { front: 'Which formula for a value near the middle of a table?', back: 'Central difference formulae: Gauss forward ($0<u<1$), Gauss backward ($-1<u<0$), Stirling ($-0.25 \\le u \\le 0.25$, most accurate) and Bessel ($\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$).' },
    { front: 'State Gauss\'s forward and backward formulae.', back: 'Forward: $y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-1} + \\cdots$ ($0<u<1$). Backward: $y = y_0 + u\\Delta y_{-1} + \\frac{(u+1)u}{2!}\\Delta^2 y_{-1} + \\frac{(u+1)u(u-1)}{3!}\\Delta^3 y_{-2} + \\cdots$ ($-1<u<0$).' },
    { front: 'How are the Gauss formulae derived?', back: 'From Newton forward: substitute $\\Delta^k y_0 = \\Delta^k y_{-1} + \\Delta^{k+1} y_{-1}$ (and $\\Delta^3 y_{-1} = \\Delta^3 y_{-2} + \\Delta^4 y_{-2}$, …) and collect, e.g. $\\frac{u(u-1)}{2} + \\frac{u(u-1)(u-2)}{6} = \\frac{(u+1)u(u-1)}{3!}$.' },
    { front: 'State Stirling\'s formula.', back: '$y = y_0 + \\frac{u(\\Delta y_0+\\Delta y_{-1})}{2} + \\frac{u^2\\Delta^2 y_{-1}}{2} + \\frac{u(u^2-1)(\\Delta^3 y_{-1}+\\Delta^3 y_{-2})}{2\\cdot3!} + \\frac{u^2(u^2-1)\\Delta^4 y_{-2}}{4!}+\\cdots$ — the mean of Gauss forward and Gauss backward.' },
    { front: 'State Bessel\'s formula.', back: '$y = \\frac{y_0+y_1}{2} + \\left(u-\\frac{1}{2}\\right)\\Delta y_0 + \\frac{u(u-1)}{2!}\\cdot\\frac{\\Delta^2 y_{-1}+\\Delta^2 y_0}{2} + \\frac{(u-\\frac{1}{2})u(u-1)}{3!}\\Delta^3 y_{-1}+\\cdots$ — Gauss forward averaged with Gauss backward about $x_1$.' },
    { front: 'State Lagrange\'s interpolation formula and its derivation idea.', back: '$y = \\sum_{i=0}^{n}f(x_i)\\prod_{j\\ne i}\\frac{x-x_j}{x_i-x_j}$. Assume $f(x) = \\sum a_i\\prod_{j\\ne i}(x-x_j)$, put $x = x_i$ to get $a_i = f(x_i)/\\prod_{j\\ne i}(x_i-x_j)$, substitute back.' },
    { front: 'What is a divided difference?', back: '$f[x_0,x_1] = \\frac{f(x_0)-f(x_1)}{x_0-x_1}$, and $f[x_0,\\dots,x_{k+1}] = \\frac{f[x_0,\\dots,x_k]-f[x_1,\\dots,x_{k+1}]}{x_0-x_{k+1}}$. Symmetric in its arguments, and the $n$th one is constant for a degree-$n$ polynomial.' },
    { front: "State Newton's divided difference formula.", back: '$f(x) = f(x_0) + (x-x_0)f[x_0,x_1] + (x-x_0)(x-x_1)f[x_0,x_1,x_2] + \\cdots$ — the practical formula for unequal spacing, built from the divided difference table.' },
    { front: 'What is the error in an interpolation formula?', back: '$R(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)\\cdots(x-x_n)$; for equally spaced data $R(x) = \\frac{\\Delta^{n+1}y_0}{(n+1)!}u(u-1)\\cdots(u-n)$ (forward) or $\\frac{\\nabla^{n+1}y_n}{(n+1)!}u(u+1)\\cdots(u+n)$ (backward).' },
    { front: 'What is inverse interpolation?', back: 'Finding the value of $x$ for a given $y$. Do it by interchanging $x$ and $y$ in Lagrange\'s formula: $x = \\sum x_i\\prod_{j\\ne i}\\frac{y-y_j}{y_i-y_j}$. Shanker Rao Ch.7 also gives successive approximations and reversion of series.' },
    { front: 'How do you find a missing value in an interpolation table?', back: "Newton's binomial expansion formula: for a degree-$(n-1)$ polynomial through $n+1$ equally spaced points, $\\Delta^n y_0 = 0$, i.e. $y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0$. One equation per missing value." },
    { front: 'Newton forward or Lagrange for equally spaced data?', back: 'Newton: build the difference table once, read the leading differences, cheap and reusable. Lagrange: no table needed, but every term is a long product, so it is slower and easier to get wrong.' },
  ],
  quiz: [
    {
      q: 'The argument $u$ in Newton\'s forward formula is',
      options: ['$u = (x-x_0)/h$', '$u = (x_0-x)/h$', '$u = (x-x_n)/h$', '$u = x-x_0$'],
      answer: 0,
      explain: '$u = (x-x_0)/h$ is the number of intervals from the origin to the required point.',
    },
    {
      q: 'The third term of Newton\'s forward formula is',
      options: [
        '$\\dfrac{u(u-1)(u-2)}{3!}\\Delta^3 y_0$',
        '$\\dfrac{u(u-1)}{2}\\Delta^2 y_0$',
        '$u^3\\Delta^3 y_0$',
        '$\\dfrac{u(u-1)(u-2)}{6}\\Delta^3 y_0$',
      ],
      answer: 0,
      explain: 'The denominator is the factorial of the order: $1!, 2!, 3!$.',
    },
    {
      q: 'For a value near the end of a table you use',
      options: ["Newton's backward formula", "Newton's forward formula", 'Lagrange', 'Stirling'],
      answer: 0,
      explain: 'Backward differences $\\nabla y_n$ and $u = (x-x_n)/h < 0$ reach the end of the table.',
    },
    {
      q: 'Lagrange\'s interpolation formula needs',
      options: [
        'no assumption on the spacing of the $x$-values',
        'equally spaced $x$-values',
        'a difference table',
        'a known derivative of $f$',
      ],
      answer: 0,
      explain: 'Each term is built from the arguments directly, so unequal spacing is fine.',
    },
    {
      q: 'The first divided difference $f[x_0,x_1]$ is',
      options: [
        '$\\dfrac{f(x_0)-f(x_1)}{x_0-x_1}$',
        '$f(x_1)-f(x_0)$',
        '$\\dfrac{f(x_1)-f(x_0)}{h}$',
        '$\\dfrac{\\Delta^2 y_0}{2!h^2}$',
      ],
      answer: 0,
      explain: 'A divided difference divides by the distance between the two arguments.',
    },
    {
      q: 'The error in the forward interpolation formula is',
      options: [
        '$\\dfrac{\\Delta^{n+1}y_0}{(n+1)!}u(u-1)\\cdots(u-n)$',
        '$\\Delta^{n+1}y_0$',
        '$\\dfrac{f^{(n+1)}(x)}{(n+1)!}$',
        '$\\dfrac{\\Delta^n y_0}{n!}$',
      ],
      answer: 0,
      explain: 'The last difference is only the coefficient; the error multiplies it by $u(u-1)\\cdots(u-n)/(n+1)!$.',
    },
    {
      q: 'Stirling\'s formula is most accurate when',
      options: [
        '$-0.25 \\le u \\le 0.25$',
        '$0 < u < 1$',
        '$-1 < u < 0$',
        '$\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$',
      ],
      answer: 0,
      explain: 'Bessel is the one for $\\tfrac{1}{4} \\le u \\le \\tfrac{3}{4}$; Gauss forward for $0<u<1$ and Gauss backward for $-1<u<0$.',
    },
    {
      q: 'Inverse interpolation finds',
      options: [
        'the value of $x$ corresponding to a given $y$',
        'the value of $y$ corresponding to a given $x$',
        'the error of the interpolating polynomial',
        'the next term of a series',
      ],
      answer: 0,
      explain: 'It reverses the problem: $x$ becomes the dependent variable and $y$ the argument.',
    },
    {
      q: 'Newton\'s binomial expansion formula is used to',
      options: [
        'find a missing entry in a table of equally spaced values',
        'find the error of the interpolating polynomial',
        'invert a series',
        'differentiate a tabulated function',
      ],
      answer: 0,
      explain: 'It writes $\\Delta^n y_0 = 0$ directly in the ordinates: $y_n - n y_{n-1} + \\binom{n}{2}y_{n-2} - \\cdots + (-1)^n y_0 = 0$.',
    },
    {
      q: 'Newton forward interpolation of the cubic through $(0,-1),(1,1),(2,1),(3,-2)$ at $x = 1.5$ gives',
      options: ['$1.3125$', '$1.375$', '$1.25$', '$1.5$'],
      answer: 0,
      explain: '$-1 + 1.5(2) + \\frac{1.5(0.5)}{2!}(-2) + \\frac{1.5(0.5)(-0.5)}{3!}(-1) = -1 + 3 - 0.75 + 0.0625 = 1.3125$.',
    },
  ],
  solvers: ['newtonFwd', 'gaussInterp', 'lagrange', 'divDiff'],
};
