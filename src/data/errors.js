// CSE 2201 — Errors & Approximations (Chapter 1)
// Source of record: Shanker Rao, "Numerical Analysis", Ch. 1 (ERRORS) — docs/sources/shanker-ch01-errors.md
// Every number below is either taken from that extract or checked against src/lib/solvers.js.
// Balagurusamy Ch 4 (errors) is a scanned PDF with no extracted text yet, so nothing is quoted from it here.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Why does this chapter exist at all?",
    options: ["Computers make arithmetic mistakes that must be corrected", "Every stored number is slightly wrong, so we must measure and control how wrong", "Exact answers are unfashionable in engineering", "Integration has no exact solution"],
    answer: 1,
    explain: "Finite precision means every computed or measured number is a neighbour of the truth, never the truth. The chapter's job is to bound that wrongness.",
  },
  "Start here: the core idea": {
    q: "A measurement misses by exactly 1 cm. When is that most serious?",
    options: ["Always equally serious, whatever the object", "When measuring a football pitch", "When measuring a pencil", "Only when working in metric units"],
    answer: 2,
    explain: "Same absolute error, very different relative error — and relative error is the one that says how much the measurement is worth.",
  },
  "Start here: reading the symbols": {
    q: "Which of the two error measures is a unitless pure fraction?",
    options: ["Absolute error $E_A$", "Relative error $E_R$", "Both", "Neither"],
    answer: 1,
    explain: "$E_R = E_A/|X|$ divides the miss by the size of the true value, so the units cancel.",
  },
  "Start here: your first walk-through": {
    q: "$\\frac{22}{7}$ has $E_R \\approx 4\\times10^{-4}$ against $\\pi$. Roughly how many significant digits agree?",
    options: ["1–2", "3–4", "6–7", "Exactly 7"],
    answer: 1,
    explain: "The rule $E_R \\le \\tfrac{1}{2}10^{-k}$ for $k$ correct digits gives $k \\approx 3$–$4$ here.",
  },
  'Types of error': {
    q: 'Which of these is **not** one of the three types of error in Shanker Rao, Ch. 1?',
    options: ['Inherent error', 'Analytic error', 'Round-off error', 'Subtractive error'],
    answer: 3,
    explain: 'The three are inherent (the data), analytic (cutting a series) and round-off (finite digits). Subtractive cancellation is a consequence of these, not a fourth type.',
  },
  'Chopping and rounding': {
    q: 'If $x$ is the value obtained by **rounding off** to $k$ digits and $X$ is the exact value, then',
    options: ['$|X - x| < 10^{k-1}$', '$|X - x| < \\tfrac{1}{2}10^{k-1}$', '$|X - x| < 10^{k}$', '$|X - x| < \\tfrac{1}{2}10^{k}$'],
    answer: 1,
    explain: 'Rounding off to k digits gives at most half a unit in the k-th place; chopping to k digits gives a full unit, so the round-off error is at most half the chopping error.',
  },
  'Absolute and relative error': {
    q: 'The relative error of the approximate number $x$ for the exact number $X$ is',
    options: ['$E_R = \\dfrac{E_A}{X}$', '$E_R = \\dfrac{E_A}{x}$', '$E_R = E_A \\cdot X$', '$E_R = \\dfrac{X}{E_A}$'],
    answer: 0,
    explain: 'Shanker Rao defines the relative error as the ratio of the absolute error to the exact value, $E_R = \\delta = E_A/X$; the percentage error is $100 E_R$.',
  },
  'Error propagation through a formula': {
    q: 'For $u = f(x, y, z)$ the general error formula is',
    options: [
      '$\\Delta u \\approx \\dfrac{\\partial f}{\\partial x}\\Delta x + \\dfrac{\\partial f}{\\partial y}\\Delta y + \\dfrac{\\partial f}{\\partial z}\\Delta z$',
      '$\\Delta u \\approx \\Delta x + \\Delta y + \\Delta z$',
      '$\\Delta u \\approx u\\left(\\dfrac{\\partial f}{\\partial x}\\Delta x + \\dfrac{\\partial f}{\\partial y}\\Delta y + \\dfrac{\\partial f}{\\partial z}\\Delta z\\right)$',
      '$\\Delta u \\approx \\dfrac{\\partial f}{\\partial x}\\dfrac{\\Delta x}{\\partial f}\\,x$',
    ],
    answer: 0,
    explain: 'It comes from Taylor expansion about (x, y, z) with the squares and higher powers of the small errors neglected.',
  },
  'Significant digits': {
    q: 'The number of significant digits of $0.0005010$ is',
    options: ['4', '3', '5', '7'],
    answer: 1,
    explain: 'The first four zeros only fix the decimal point; the significant digits are 5, 0, 1 — three of them.',
  },
  'Accuracy and precision': {
    q: 'In Balagurusamy\'s definition, the **accuracy** of 57.396 is',
    options: ['five significant digits', '0.001 (three decimal places)', 'the closeness to the true value', 'the number of repeated computations'],
    answer: 0,
    explain: 'Accuracy = the number of significant digits in the value; precision = the number of decimal positions, i.e. the order of magnitude of the last digit, which for 57.396 is $10^{-3}$.',
  },
  'Ill-conditioned problems and the condition number': {
    q: 'The condition number of a function $f(x)$ is',
    options: [
      '$\\dfrac{x f\'(x)}{f(x)}$',
      '$\\dfrac{f(x)}{x f\'(x)}$',
      '$\\dfrac{\\Delta f}{\\Delta x}$',
      '$f(x)\\,x$',
    ],
    answer: 0,
    explain: 'It is the ratio of the relative error in $f(x)$ to the relative error in $x$. A large value means the problem is ill conditioned: small changes in the input are magnified in the output.',
  },
  'Error in a numerical algorithm': {
    q: 'In a numerical algorithm the **truncation error** is',
    options: [
      'the part of the exact answer that was deliberately discarded',
      'the error added by carrying only a finite number of digits',
      'the error in the first decimal place of the answer',
      'the difference between the exact and the approximate root',
    ],
    answer: 0,
    explain: 'Truncation error is what you threw away (the discarded terms of a series); round-off error is what the finite number of carried digits adds back in.',
  },
  'Convergence and divergence': {
    q: 'The iteration $x_{n+1} = \\phi(x_n)$ converges to the root $\\alpha$ when',
    options: ['$|\\phi\'(x)| < 1$ near the root', '$|\\phi\'(x)| > 1$ near the root', '$\\phi(x) = 0$', '$f\'(x) = 0$'],
    answer: 0,
    explain: 'With $\\lambda = \\max|\\phi\'(x)|$, the error obeys $|x_n - \\alpha| \\le \\lambda^n |x_0 - \\alpha|$; for $\\lambda < 1$ that goes to zero, for $\\lambda > 1$ it blows up.',
  },
  Deflation: {
    q: 'If $r$ is a root of $p(x)$, then deflating $p$ at $r$ gives',
    options: [
      'the quotient $q(x)$ with $p(x) = (x - r)q(x)$, whose roots are the remaining roots of $p$',
      'the sum of the roots of $p$',
      'the derivative $p\'(x)$',
      'the value $p(r)$, which is zero',
    ],
    answer: 0,
    explain: 'Deflation removes the factor (x − r); the quotient carries all the other roots. It is done with Horner’s rule, so the quotient inherits the round-off of the division.',
  },
};

export default {
  id: 'errors',
  chapter: 1,
  title: 'Errors & Approximations',
  wave: 'error',
  sources: ['Shanker Rao Ch 1', 'Balagurusamy Ch 4'],
  flagged: true,
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Type $4 \\div 3$ into any calculator and it answers $1.3333333$. The true value goes on forever — the calculator did not compute the answer, it stored a **close neighbour** of the answer. Every number a computer touches suffers the same fate." },
        { type: "p", text: "A ruler read to the nearest millimetre, $\\pi$ squeezed into finite memory, a sensor with 2% noise: the true value never survives the journey. So a numerical method can never promise the exact answer. What it **can** promise is an answer whose wrongness is known and bounded." },
        { type: "p", text: "That is this chapter's whole job: define 'how wrong' precisely, track how the wrongness grows when numbers are added, multiplied or pushed through formulas, and say how many digits of a final result you may actually trust." },
        { type: "list", items: [
          "Name the types of error (the papers ask for them by name).",
          "Compute absolute and relative error for any approximation.",
          "Propagate input errors through a formula to bound the output error.",
          "Count trustworthy significant digits.",
          "Spot an ill-conditioned problem, where a tiny input error becomes a huge output error.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Two questions measure wrongness. **How far off is it?** — the absolute error. **How far off is it compared with the size of the thing?** — the relative error. You need both:" },
        { type: "math", tex: "E_A = |X - x|, \\qquad E_R = \\left|\\frac{X - x}{X}\\right|" },
        { type: "p", text: "where $X$ is the true value and $x$ is the approximation you actually have. Arriving 1 minute late to a lecture and 1 minute after a flight's gate closes are the **same absolute error** with wildly different consequences — proportion is what relative error captures." },
        { type: "p", text: "A machine produces a wrong $x$ in two distinct ways: **chopping** simply drops the extra digits ($1.6666\\ldots \\to 1.6666$), while **rounding** moves to the nearest allowed value ($1.6666\\ldots \\to 1.6667$). Rounding keeps the error within half a unit of the last kept digit; chopping can be twice as bad." },
        { type: "note", text: "'Correct to 4 significant digits' is a claim about **relative** error ($E_R \\le 0.5\\times10^{-4}$), not about how many digits happen to be printed." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "p", text: "The same handful of symbols repeats through every section of this chapter. Decode them once here and every later page reads easily." },
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$X$", "the true (exact) value", "capital letter = truth"],
          ["$x$", "the approximation you actually have", "small letter = stored value"],
          ["$E_A = |X - x|$", "absolute error", "distance from the truth; carries units"],
          ["$E_R = E_A/|X|$", "relative error", "fraction of the truth; unitless"],
          ["$\\delta x$", "a small error living in the input $x$", "say 'delta x'"],
          ["$\\partial u/\\partial x$", "how fast the output $u$ changes when $x$ wiggles", "the sensitivity dial"],
          ["$\\Delta u$", "the resulting error in the output", "say 'delta u'"],
        ] },
        { type: "p", text: "Two vocabulary words complete the decoder: **chopping** throws digits away, **rounding** picks the nearest allowed value. The rest of the chapter quantifies exactly what each choice costs." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Shanker Rao, Ex. 1.14** — the same computation pattern the papers reuse: the number $X = 2.536$ is stored to two decimal places. Find the absolute and relative error when it is (a) rounded off, (b) chopped." },
        { type: "p", text: "**(a) Rounded off:** the stored value is $x = 2.54$, so $E_A = |2.536 - 2.54| = 0.004$ and $E_R = \\frac{0.004}{2.536} = 1.5772 \\times 10^{-3}$." },
        { type: "p", text: "**(b) Chopped:** the stored value is $x = 2.53$, so $E_A = |2.536 - 2.53| = 0.006$ and $E_R = \\frac{0.006}{2.536} = 2.3659 \\times 10^{-3}$." },
        { type: "p", text: "Chopping is the worse half of the pair — its error can reach a full unit of the last digit, while rounding stays within half a unit. **Asked in:** this computation is the direct pattern of Fall 2023 Q1(d) and Spring 2023 Q1(d) (relative maximum error of $u = \\frac{5xy^2}{z^3}$); the same vocabulary is examined in Fall 2024 A1(a) (round-off vs chopping) and Spring 2024 Q1(a) (definitions plus the product error rule)." },
        { type: "exam", text: "Write the two definitions first, substitute each stored value in turn, and finish with the comparison sentence — that is exactly how the module's exam-format example earns its 5 marks." },
      ],
    },
    {
      heading: 'Types of error',
      blocks: [
        { type: 'p', text: 'Shanker Rao (Ch. 1, §1.4.1) splits every error into three kinds. Know the names, because the papers ask for them by name.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Inherent errors** — the data of the problem are themselves inexact (they came from a physical measurement).',
            '**Analytic errors** — introduced when the physical or mathematical problem is turned into a computational one by simplifying. Cutting the series $\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots$ down to $\\sin x \\approx x - \\dfrac{x^3}{3!}$ is an analytic error.',
            '**Round-off errors** — only a finite number of digits can be carried, so every one of the operations $+,\\ -, \\times,\\ \\div,\\ \\wedge$ carries a small rounding error.',
          ],
        },
        { type: 'math', tex: 'E = \\Delta = X - x' },
        { type: 'p', text: 'Error = True value − Approximate value. An exact number may be regarded as an approximate number with error zero.' },
        {
          type: 'p',
          text: 'The size of the analytic error is the sum of all the discarded terms. Shanker Rao warns that it "may be large and may even exceed the sum of the terms retained, thus making the calculated result meaningless".',
        },
        {
          type: 'p',
          text: 'The **computational error** is the cumulative effect of the round-off error over a whole computation; it can be made arbitrarily small by carrying the calculations to a sufficiently high degree of precision.',
        },
        {
          type: 'p',
          text: 'Balagurusamy (Ch. 4) draws the same picture as a tree: the **total error** splits into four branches — **modelling errors** (missing information), **inherent errors** (data errors and conversion errors), **numerical errors** (roundoff and truncation) and **blunders** (human imperfection).',
        },
        {
          type: 'exam',
          text: 'For a 3-mark theory question, write the three names in one line each with a one-clause example: inherent = measured data; analytic = truncating a series; round-off = finite digits in the machine. Then add the formula $E = \\Delta = X - x$ and the sentence "error = true value − approximate value".',
        },
      ],
    },
    {
      heading: 'Chopping and rounding',
      blocks: [
        { type: 'p', text: '**Chopping** (truncation) simply drops the digits beyond the place you need. **Rounding off** replaces the number by the nearest one that has the required number of significant figures.' },
        {
          type: 'p',
          text: 'Shanker Rao’s rounding-off rule: to round off to $n$ significant digits, drop everything to the right of the $n$-th significant digit (keeping zeros as place holders). If the discarded part is (i) less than 5 — leave the retained digits unchanged; (ii) greater than 5 — add 1 to the last retained digit; (iii) exactly 5 with non-zero digits among those discarded — add 1 to the last retained digit. If the first discarded digit is exactly 5 and all the other discarded digits are zeros, the **even-digit rule** applies: the last retained digit is left unchanged if it is even and increased by unity if it is odd.',
        },
        {
          type: 'table',
          head: ['Number', '3 figures', '4 figures', '5 figures'],
          rows: [
            ['0.522341', '0.522', '0.5223', '0.52234'],
            ['93.2155', '93.2', '93.22', '93.216'],
            ['0.66666', '0.667', '0.6667', '0.66667'],
          ],
        },
        {
          type: 'p',
          text: 'Shanker Rao gives the two bounds in decimal form (Rules 2 and 3 in §1.5.1): truncating to $k$ digits gives $|X - x| < 10^{k-1}$, while rounding off to $k$ digits gives $|X - x| < \\tfrac{1}{2}10^{k-1}$.',
        },
        {
          type: 'p',
          text: 'Balagurusamy (Ch. 4) gives the machine-level version. Write the number in floating-point form $x = (f_x + g_x 10^{-d})10^{E}$, where $d$ is the number of digits allowed in the mantissa:',
        },
        { type: 'math', tex: '\\text{Chopping: } |E| = g_x\\,10^{E-d},\\quad 0 \\le g_x < 1 \\;\\Longrightarrow\\; |E| \\le 10^{E-d}' },
        { type: 'math', tex: '\\text{Symmetric rounding: } |E| \\le 0.5 \\times 10^{E-d}' },
        {
          type: 'p',
          text: 'Balagurusamy\'s own sentence: "the symmetric rounding error is, at worst, one-half the chopping error". So **the round-off error is at most one half of the chopping error** — same number of digits, and rounding is never the worse of the two.',
        },
        {
          type: 'p',
          text: 'The largest relative error a machine can make is the **machine epsilon**: $\\varepsilon = 10^{-d+1}$ for a decimal machine that chops and $\\varepsilon = \\tfrac{1}{2}10^{-d+1}$ for one that rounds symmetrically, so the absolute error bound for a number $x$ is $|x|\\,\\varepsilon$.',
        },
        {
          type: 'note',
          text: 'Shanker Rao calls the nearest-number rule "rounding off" and Balagurusamy calls the same rule "symmetric rounding"; both use the even-digit tie-break (the last retained digit is unchanged if even, increased by 1 if odd). Say "symmetric rounding" if the question asks which method the machine uses.',
        },
        {
          type: 'exam',
          text: 'When you round 2.375 to two decimal places, write the rule you used, not just the answer: "discarded digit is 5 and all the other discarded digits are 0, so the even-digit rule applies; the last retained digit 7 is odd, so add 1; hence 2.38." Writing only "2.38" earns the number and loses the method mark.',
        },
      ],
    },
    {
      heading: 'Absolute and relative error',
      blocks: [
        { type: 'math', tex: 'E = \\Delta = X - x, \\qquad E_A = |X - x|' },
        {
          type: 'p',
          text: '**Absolute error** $E_A$ is the absolute value of the difference between the exact number $X$ and the approximate number $x$. **Limiting error** $\\Delta x$ is any number not less than the absolute error of $x$, so $x - \\Delta x \\le X \\le x + \\Delta x$, i.e. $X = x \\pm \\Delta x$.',
        },
        { type: 'math', tex: 'E_R = \\delta = \\frac{E_A}{X}, \\qquad E_P = 100\\,E_R' },
        {
          type: 'p',
          text: '**Relative error** $E_R$ (or $\\delta$) is the ratio of the absolute error to the exact value $X \\neq 0$. **Percentage error** $E_P$ is 100 times the relative error.',
        },
        {
          type: 'p',
          text: 'In practice $X \\approx x$, so $E_R \\le \\dfrac{\\Delta x}{x}$ and the limiting absolute error is taken as $\\Delta x = x\\,\\delta x$.',
        },
        {
          type: 'p',
          text: 'Use the **absolute** error when the answer itself has a unit (a length, a mass); use the **relative** error when you are comparing answers of different sizes, or when the answer can be zero-ish.',
        },
        {
          type: 'note',
          text: 'Shanker Rao writes the relative error as $E_R = E_A/X$, but many books write $E_R = \\Delta x / x$. They agree because $X \\approx x$; state which one you are using in the first line of the answer.',
        },
        {
          type: 'exam',
          text: 'Write the definitions in the book’s symbols: $E = \\Delta = X - x$; $E_A = |X - x|$; $E_R = \\delta = E_A/X$; $E_P = 100 E_R$. Then give one numerical line, e.g. for $\\pi \\approx 22/7$ the absolute error is $0.02/7 = 0.002857$.',
        },
      ],
    },
    {
      heading: 'Error propagation through a formula',
      blocks: [
        { type: 'p', text: 'Let $u = f(x_1, x_2, \\dots, x_n)$ with errors $\\Delta x_1, \\dots, \\Delta x_n$. Taylor expansion about $(x_1,\\dots,x_n)$, neglecting the squares and higher powers of the small errors, gives the **general error formula**.' },
        { type: 'math', tex: '\\Delta u \\approx \\sum_{i=1}^{n}\\frac{\\partial f}{\\partial x_i}\\,\\Delta x_i' },
        {
          type: 'p',
          text: 'Dividing by $u$ gives the relative error, which is what the papers usually want:',
        },
        { type: 'math', tex: 'E_R(u) = \\frac{1}{u}\\sum_{i=1}^{n}\\frac{\\partial f}{\\partial x_i}\\,\\Delta x_i' },
        {
          type: 'table',
          head: ['Operation', 'Absolute error', 'Relative error'],
          rows: [
            ['$u = x_1 + x_2 + \\dots$', '$\\Delta u = \\Delta x_1 + \\Delta x_2 + \\dots$', '$\\dfrac{\\Delta x_1 + \\Delta x_2 + \\dots}{u}$'],
            ['$u = x_1 - x_2$', '$\\Delta u = \\Delta x_1 - \\Delta x_2$, maximum $\\Delta x_1 + \\Delta x_2$', '$\\dfrac{\\Delta x_1 + \\Delta x_2}{u}$ (max)'],
            ['$u = x_1 x_2$', '$E_A \\approx x_1\\Delta x_2 + x_2\\Delta x_1$', '$\\dfrac{\\Delta x_1}{x_1} + \\dfrac{\\Delta x_2}{x_2}$'],
            ['$u = \\dfrac{x_1}{x_2}$', '$E_A \\approx \\dfrac{x_1\\Delta x_2 - x_2\\Delta x_1}{x_2^2}$', '$\\dfrac{\\Delta x_1}{x_1} - \\dfrac{\\Delta x_2}{x_2}$'],
          ],
        },
        {
          type: 'p',
          text: 'For $n$ numbers multiplied together the relative error is the sum of the relative errors of the factors: $E_R = \\dfrac{\\Delta x_1}{x_1} + \\dfrac{\\Delta x_2}{x_2} + \\dots + \\dfrac{\\Delta x_n}{x_n}$.',
        },
        {
          type: 'note',
          text: 'Subtraction is the dangerous one: when the two numbers are nearly equal the significant digits on the left "disappear" and the result carries few correct digits — that is the reason Shanker Rao tells you to approximate the numbers more accurately before subtracting.',
        },
        {
          type: 'exam',
          text: 'Write $u = f(x,y,z)$ first, then the three partial derivatives **with the numbers substituted**, then the one line of arithmetic. Never write the formula and jump straight to the answer — the partial derivatives carry most of the marks.',
        },
      ],
    },
    {
      heading: 'Significant digits',
      blocks: [
        {
          type: 'p',
          text: 'The digits used to express a number are its **significant digits**: every non-zero digit, every zero lying between significant digits, and every zero used as a place holder to the right of a non-zero digit (or explicitly indicated to be significant). A zero used only to fix the decimal point is not significant.',
        },
        {
          type: 'table',
          head: ['Number', 'Significant figures', 'Count'],
          rows: [
            ['37.89', '3, 7, 8, 9', '4'],
            ['5090', '5, 0, 9', '3'],
            ['7.00', '7, 0, 0', '3'],
            ['0.00082', '8, 2', '2'],
            ['0.000620', '6, 2, 0', '3'],
            ['$5.2 \\times 10^{4}$', '5, 2', '2'],
            ['$3.506 \\times 10^{8}$', '3, 5, 0, 6', '4'],
            ['$8 \\times 10^{-3}$', '8', '1'],
          ],
        },
        {
          type: 'p',
          text: 'Counting starts from the left-most non-zero digit. In scientific notation every digit written in the mantissa $M$ is significant.',
        },
        {
          type: 'p',
          text: 'The first $n$ significant digits of $x$ are **correct** when the absolute error does not exceed half a unit in the $n$-th place, $|X - x| \\le \\tfrac{1}{2}10^{m-n+1}$ (where $10^m \\le x < 10^{m+1}$). Example: $X = 73.97$, $x = 74.00$ gives $E_A = 0.03 < 0.1$, so 74.00 is correct to three digits.',
        },
        {
          type: 'math',
          tex: 'E_R \\le \\frac{10^{n-1}}{\\alpha_m 10^m}',
        },
        {
          type: 'p',
          text: 'That is the **Theorem** of §1.5: a positive number with $n$ correct digits has relative error not exceeding $10^{n-1}$ divided by the first significant digit $\\alpha_m$ multiplied by its place value $10^m$. It turns "how many digits do I need?" into one inequality.',
        },
        {
          type: 'note',
          text: 'Broad sense versus narrow sense: in the narrow sense the error must be at most half a unit in the $n$-th place; in the broad sense it may be a full unit. Shanker Rao uses the narrow sense for the theorem and the broad sense for the percentage tables in §1.5.2.',
        },
        {
          type: 'exam',
          text: 'For "how many digits must I take so that the error does not exceed $x$%?" write: the first significant digit $\\alpha_m$, the bound $10^{n-1}/(\\alpha_m 10^m) \\le$ the allowed relative error, then solve for $n$ and round **up**. Show the logarithm line.',
        },
      ],
    },
    {
      heading: 'Accuracy and precision',
      blocks: [
        {
          type: 'p',
          text: 'Balagurusamy (Ch. 4, p. 63) ties both words to significant digits:',
        },
        {
          type: 'list',
          items: [
            '**Accuracy** refers to the number of significant digits in a value. The number 57.396 is accurate to five significant digits (sd).',
            '**Precision** refers to the number of decimal positions, i.e. the order of magnitude of the last digit in a value. The number 57.396 has a precision of 0.001, or $10^{-3}$.',
          ],
        },
        {
          type: 'p',
          text: 'So a value with more significant digits is more **accurate**, and a value whose last digit sits further to the right is more **precise**. Balagurusamy\'s Example 4.1: of 4.3201 (precision $10^{-4}$), 4.32 ($10^{-2}$) and 4.320106 ($10^{-6}$), the greatest precision is $10^{-6}$.',
        },
        {
          type: 'table',
          head: ['Number', 'Accuracy'],
          rows: [
            ['95.763', '5 sd'],
            ['0.008472', '4 sd (the leading zeros are only place holders)'],
            ['0.0456000', '6 sd'],
            ['36', '2 sd'],
            ['3600', 'not specified (write $45 \\times 10^{2}$ or $3600.0$)'],
            ['3600.00', '6 sd (the zeros were made significant by writing .00)'],
          ],
        },
        {
          type: 'note',
          text: 'Source warning: this is the slides\' definition and it is **not** the popular textbook meaning of the words (accuracy = closeness to the true value, precision = closeness of repeated computations to each other). Spring 2024 asks for accuracy and precision from this chapter, so answer with Balagurusamy\'s definitions — but know the other pair of words in case the question says "how well do repeated computations agree".',
        },
        {
          type: 'exam',
          text: 'Write the two definitions in Balagurusamy\'s words: "accuracy = the number of significant digits in the value; precision = the number of decimal positions (the order of magnitude of the last digit)". Then one example: 57.396 is accurate to five significant digits and has precision $10^{-3}$.',
        },
      ],
    },
    {
      heading: 'Ill-conditioned problems and the condition number',
      blocks: [
        {
          type: 'p',
          text: 'Conditioning measures the **sensitivity** of a problem to uncertainty. When a small change in $x$ produces a change in $f(x)$, the amplification is measured by the **condition number**:',
        },
        { type: 'math', tex: '\\text{Condition number} = \\frac{\\text{relative error in } f(x)}{\\text{relative error in } x} = \\frac{x f\'(x)}{f(x)}' },
        {
          type: 'p',
          text: 'If the condition number is large, $f(x)$ is **ill conditioned** and its computation is numerically unstable; a small condition number means the problem is well conditioned and the errors in the input stay small in the output.',
        },
        {
          type: 'p',
          text: 'Balagurusamy lists the three situations in which the condition number is large:',
        },
        {
          type: 'list',
          items: [
            '$f(x)$ is small compared with $x$ and $f\'(x)$',
            '$f\'(x)$ is large compared with $x$ and $f(x)$',
            '$x$ is large compared with $f(x)$ and $f\'(x)$',
          ],
        },
        {
          type: 'p',
          text: 'Medha\'s class notes give the two standard examples and mark them as a likely question: $f(x) = x^2$ with $x = 2 \\Rightarrow f = 4$ and $x = 2.01 \\Rightarrow f = 4.04$ is a **well conditioned** problem; $f(x) = \\dfrac{1}{x-1}$ with $x = 1.005 \\Rightarrow f = 200$ and $x = 1.01 \\Rightarrow f = 100$ is **ill conditioned** near $x = 1$ (but not at $x = 5$, where the same function barely changes).',
        },
        {
          type: 'p',
          text: 'With several parameters, estimate the total change with the partial derivatives:',
        },
        { type: 'math', tex: '\\Delta f = \\left|\\frac{\\partial f}{\\partial x}\\right|\\Delta x + \\left|\\frac{\\partial f}{\\partial y}\\right|\\Delta y + \\left|\\frac{\\partial f}{\\partial z}\\right|\\Delta z + \\cdots' },
        {
          type: 'note',
          text: 'Balagurusamy\'s condition number is for a **function**. For a linear system the standard extension is $\\mathrm{cond}(A) = \\|A\\|\\,\\|A^{-1}\\|$ (1 for a perfectly conditioned system); that matrix form is not in the extracted slides, so quote the function form unless the question is about a matrix.',
        },
        {
          type: 'exam',
          text: 'Write the definition (relative error in $f$ over relative error in $x$, i.e. $x f\'(x)/f(x)$), then say "large = ill conditioned", then give one example — Medha\'s $1/(x-1)$ near $x = 1$ is the one the notes mark as likely to come.',
        },
      ],
    },
    {
      heading: 'Error in a numerical algorithm',
      blocks: [
        {
          type: 'p',
          text: 'Every numerical algorithm carries two errors at once. The **truncation error** is the part of the exact answer that was deliberately thrown away — the discarded terms of a series, the neglected higher powers of $h$ in a Taylor expansion. The **round-off error** is what the finite number of carried digits adds back in, once per operation.',
        },
        {
          type: 'p',
          text: 'They pull against each other. Adding terms to a series shrinks the truncation error but adds operations, and every operation adds round-off; making the step $h$ smaller shrinks the truncation error but adds more operations. Good numerical practice is the balance between the two, and the balance point is what makes one algorithm better than another.',
        },
        {
          type: 'note',
          text: 'Balagurusamy Ch. 4 says it in one sentence: "The total numerical error is the summation of these two errors" — and later that the total error is minimised by "judiciously" choosing the step size, since more steps reduce the truncation error but add roundoff error.',
        },
        {
          type: 'exam',
          text: 'For a "total error" question write exactly two bullets: truncation error = the discarded part of the exact answer; round-off error = the error added by finite arithmetic; then the sentence "more terms or a smaller step reduces truncation error but increases round-off error".',
        },
      ],
    },
    {
      heading: 'Convergence and divergence',
      blocks: [
        {
          type: 'p',
          text: 'A sequence $x_0, x_1, x_2, \\dots$ **converges** if it approaches a finite limit $L$; it **diverges** if it does not. For an iteration $x_{n+1} = \\phi(x_n)$ the question is settled by how fast $\\phi$ changes.',
        },
        { type: 'math', tex: '|x_n - \\alpha| \\le \\lambda^{n}|x_0 - \\alpha|, \\qquad \\lambda = \\max_{x \\in I}|\\phi\'(x)|' },
        {
          type: 'p',
          text: 'If $\\lambda < 1$ the right-hand side tends to zero, so the iterates converge to the root $\\alpha$. If $\\lambda > 1$ the error grows without bound and the sequence diverges. The smaller $|\\phi\'(x)|$ is, the faster the convergence.',
        },
        {
          type: 'p',
          text: 'The same idea measures the **order** of convergence. The plain iteration is linear ($\\varepsilon_{n+1} \\approx \\lambda\\varepsilon_n$). Newton–Raphson is quadratic, because $\\varepsilon_{n+1} \\approx \\dfrac{f\'\'(\\alpha)}{2f\'(\\alpha)}\\,\\varepsilon_n^2$.',
        },
        {
          type: 'note',
          text: 'Shanker Rao\'s theorem is in Ch. 2 (the iteration method), not Ch. 1; Balagurusamy Ch. 4 adds the vocabulary — the **order of convergence** $p$ is the power in $e_{n+1} \\propto e_n^{p}$, and the **rate of convergence** is how fast the truncation error goes to zero. It is repeated here because the errors paper asks for convergence versus divergence of a sequence.',
        },
        {
          type: 'exam',
          text: 'State the condition, then the consequence: "$|\\phi\'(x)| < 1$ on the interval containing the root, therefore the sequence of approximations converges to the root $\\alpha$; $|\\phi\'(x)| > 1$ and the sequence diverges."',
        },
      ],
    },
    {
      heading: 'Deflation',
      blocks: [
        {
          type: 'p',
          text: '**Deflation** is the removal of one root from a polynomial. If $r$ is a root of $p(x)$, then $p(x) = (x - r)\\,q(x)$, and the roots of the quotient $q$ are exactly the remaining roots of $p$.',
        },
        {
          type: 'p',
          text: 'The division is done by Horner’s rule (synthetic division) in finite arithmetic, so the quotient coefficients already carry the round-off of the division. The root that was divided out is the most accurate one; the roots read off the quotient are progressively less accurate, because each deflation divides by a factor that is itself in error.',
        },
        {
          type: 'p',
          text: 'That is why the exam wants the whole chain written out, e.g. $x^4 + 7x^3 + 5x^2 - 31x - 30 = (x+3)(x-2)(x+1)(x+5)$.',
        },
        {
          type: 'p',
          text: '**Synthetic division** is the tableau form of the same thing:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Bring the leading coefficient down — that is $b_0 = a_0$.',
            'Multiply $b_0$ by $r$ and add it to the next coefficient: $b_1 = a_1 + r b_0$.',
            'Multiply $b_1$ by $r$ and add it to the next coefficient: $b_2 = a_2 + r b_1$, and so on.',
            'The last entry is the remainder $p(r)$ (zero when $r$ is a root); the entries above it are the quotient coefficients.',
          ],
        },
        {
          type: 'note',
          text: 'Medha\'s notes put "synthetic division" in the error chapter, but neither the extracted Shanker Rao text (which uses synthetic division only to write a polynomial in factorial notation, Ch. 3) nor Balagurusamy develops deflation. Spring 2024 and Fall 2024 ask for it, so it is taught in full in the Roots module.',
        },
        {
          type: 'exam',
          text: 'Write each deflation as a line: "Horner on $1, 7, 5, -31, -30$ with $r = -3$ gives $b = 1, 4, -7, -10$, remainder 0, so $p(x) = (x+3)(x^3 + 4x^2 - 7x - 10)$". Show the $b$ values; they are the marks.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Error', tex: 'E = \\Delta = X - x', where: 'true value minus approximate value' },
    { label: 'Absolute error', tex: 'E_A = |X - x|', where: 'always quote the units of the answer' },
    { label: 'Relative error', tex: 'E_R = \\frac{E_A}{X} \\approx \\frac{\\Delta x}{x}', where: 'used everywhere — the papers ask for this form' },
    { label: 'Percentage error', tex: 'E_P = 100\\,E_R', where: 'when the question asks for a percentage' },
    { label: 'General error formula', tex: '\\Delta u \\approx \\sum_{i=1}^{n}\\frac{\\partial f}{\\partial x_i}\\,\\Delta x_i', where: 'propagation through a formula of several variables' },
    { label: 'Relative error of u', tex: 'E_R(u) = \\frac{1}{u}\\sum_{i=1}^{n}\\frac{\\partial f}{\\partial x_i}\\,\\Delta x_i', where: 'divide the general error formula by u' },
    { label: 'Relative error of a product', tex: 'E_R = \\frac{\\Delta x_1}{x_1} + \\frac{\\Delta x_2}{x_2} + \\cdots', where: 'for n numbers multiplied together' },
    { label: 'Chopping error bound', tex: '|X - x| < 10^{k-1}', where: 'x truncated to k digits' },
    { label: 'Rounding-off error bound', tex: '|X - x| < \\tfrac{1}{2}\\,10^{k-1}', where: 'x rounded to k digits — at most half the chopping error' },
    { label: 'Correct digits', tex: '|X - x| \\le \\tfrac{1}{2}10^{m-n+1}', where: 'the first n significant digits are correct' },
    { label: 'Limiting relative error', tex: '\\delta x = \\frac{10^{n-1}}{\\alpha_m 10^m}', where: 'n correct digits, first significant digit alpha_m at place 10^m' },
    { label: 'Condition number', tex: '\\mathrm{cond}(A) = \\|A\\|\\,\\|A^{-1}\\|', where: 'large cond = ill-conditioned problem' },
    { label: 'Convergence of an iteration', tex: '|x_n - \\alpha| \\le \\lambda^{n}|x_0 - \\alpha|, \\quad \\lambda = \\max|\\phi\'(x)|', where: 'converges if lambda < 1, diverges if lambda > 1' },
  ],
  examples: [
    {
      title: 'Relative maximum error in $u = \\dfrac{5xy^2}{z^3}$ at $x = y = z = 1$',
      type: 'Numerical — Error propagation',
      question: 'Given that $u = \\dfrac{5xy^2}{z^3}$, $x = y = z = 1$ and $\\Delta x = \\Delta y = \\Delta z = 0.001$, find the relative maximum error in $u$.',
      source: 'Shanker Rao Ch 1, Ex. 1.13 (also a past-paper question)',
      marks: 5,
      steps: [
        { t: 'Write $u = f(x,y,z) = 5xy^2 z^{-3}$, and $u = 5$ at $x = y = z = 1$.', m: '1 mark' },
        { t: '$\\dfrac{\\partial u}{\\partial x} = \\dfrac{5y^2}{z^3} = 5$, $\\quad\\dfrac{\\partial u}{\\partial y} = \\dfrac{10xy}{z^3} = 10$, $\\quad\\dfrac{\\partial u}{\\partial z} = \\dfrac{-15xy^2}{z^4} = -15$.', m: '2 marks' },
        { t: '$\\Delta u_{\\max} = |5|(0.001) + |10|(0.001) + |-15|(0.001) = 0.005 + 0.010 + 0.015 = 0.030$.', m: '1 mark' },
        { t: '$E_{R,\\max} = \\dfrac{\\Delta u_{\\max}}{u} = \\dfrac{0.030}{5} = 0.006$.', m: '1 mark' },
      ],
      answer: '$\\boxed{E_{R,\\max} = 0.006}$',
      note: 'Trap: the **maximum** error adds the absolute values of the three contributions. Adding them with their signs gives 0, which is the signed error, not the maximum. The relative error is divided by $u = 5$, not by $x$.',
      explanation: [
        'The general error formula (Shanker Rao §1.6) comes from expanding $f(x+\\Delta x, y+\\Delta y, z+\\Delta z)$ by Taylor’s theorem and dropping the squares and higher powers of the small errors: $\\Delta u \\approx \\dfrac{\\partial u}{\\partial x}\\Delta x + \\dfrac{\\partial u}{\\partial y}\\Delta y + \\dfrac{\\partial u}{\\partial z}\\Delta z$.',
        'For the **maximum possible** error you take the magnitude of each contribution separately, because the signs of $\\Delta x, \\Delta y, \\Delta z$ are not known. Here the three contributions are $+0.005$, $+0.010$ and $-0.015$.',
        'Note on the printed book: the extracted text of Example 1.13 prints the result as $\\Delta u_{\\max} = 0.003$ and $E_R = 0.0006$. That pair is exactly what you get with $\\Delta x = \\Delta y = \\Delta z = 0.0001$ — the scan drops a zero. With the printed $\\Delta = 0.001$ the values are $0.030$ and $0.006$. Always show the substitution so the examiner can see which numbers you used.',
      ],
    },
    {
      title: 'Absolute and relative error when $X = 2.536$ is rounded off and when it is chopped',
      type: 'Numerical — Error computation',
      question: 'If $X = 2.536$, find the absolute error and the relative error when (i) $X$ is rounded off, and (ii) $X$ is truncated, to two decimal digits.',
      source: 'Shanker Rao Ch 1, Ex. 1.14',
      marks: 5,
      steps: [
        { t: 'Rounded off to two decimal places: $x = 2.54$.', m: '1 mark' },
        { t: '$E_A = |2.536 - 2.54| = 0.004$, $\\qquad E_R = \\dfrac{E_A}{X} = \\dfrac{0.004}{2.536} = 1.5772 \\times 10^{-3}$.', m: '2 marks' },
        { t: 'Truncated to two decimal places: $x = 2.53$.', m: '1 mark' },
        { t: '$E_A = |2.536 - 2.53| = 0.006$, $\\qquad E_R = \\dfrac{E_A}{X} = \\dfrac{0.006}{2.536} = 2.3659 \\times 10^{-3}$.', m: '1 mark' },
      ],
      answer: '$\\boxed{E_A = 0.004,\\ E_R = 1.5772\\times10^{-3}\\ (\\text{rounded});\\quad E_A = 0.006,\\ E_R = 2.3659\\times10^{-3}\\ (\\text{chopped})}$',
      note: 'Trap: the rounding error (0.004) is smaller than the chopping error (0.006) for the same two decimal places — that is the "round-off error is at most half the chopping error" rule in a single line. The denominator of the relative error is the **exact** value $X = 2.536$.',
      explanation: [
        'Rounding gives the nearest two-decimal number, $2.54$; chopping gives $2.53$. The absolute errors are therefore $0.004$ and $0.006$, and the rounded value is the better one.',
        'The relative error divides by the exact value $X$, not by the approximate one. Shanker Rao keeps the exact value in the denominator; in practice $X \\approx x$, and the two answers differ only in the fourth significant figure here.',
        'This example is the cleanest demonstration of the two error bounds: chopping to $k = 2$ digits gives $|X - x| < 10^{k-1} = 0.1$, and rounding off gives $|X - x| < \\tfrac{1}{2}10^{k-1} = 0.05$ — and indeed $0.006 < 0.05$ while $0.006 < 0.1$ too, but the rounded error is the smaller of the two.',
      ],
    },
    {
      title: 'Rounding off with the even-digit rule',
      type: 'Numerical — Error computation',
      question: 'Round off 52.275, 2.375, 2.385 and 81.255 each to two decimal places, stating in each case which part of the rounding-off rule you used.',
      source: 'Shanker Rao Ch 1, Ex. 1.1(1) with the rounding-off rule of §1.3',
      marks: 5,
      steps: [
        { t: 'Rule to quote: if the first discarded digit is exactly 5 and all the other discarded digits are 0, the last retained digit is left unchanged if it is **even** and increased by unity if it is **odd** (even-digit rule).', m: '1 mark' },
        { t: '$52.275 \\to 52.28$: discarded digit 5, nothing after it; retained digit 7 is odd, so add 1.', m: '1 mark' },
        { t: '$2.375 \\to 2.38$: retained digit 7 is odd, so add 1.', m: '1 mark' },
        { t: '$2.385 \\to 2.38$: retained digit 8 is even, so leave it unchanged.', m: '1 mark' },
        { t: '$81.255 \\to 81.26$: retained digit 5 is odd, so add 1.', m: '1 mark' },
      ],
      answer: '$\\boxed{52.28,\\quad 2.38,\\quad 2.38,\\quad 81.26}$',
      note: 'Trap: 2.375 and 2.385 go in opposite directions only because of the even-digit rule. A plain "5 rounds up" rule would give 2.39 for the second and lose marks.',
      explanation: [
        'The rounding-off rule in §1.3 has three cases and then one exception: the discarded digit less than 5, greater than 5, and exactly 5 with non-zero digits behind it all mean "add 1 when the discarded part is at least half". The exception is the tie — first discarded digit exactly 5 with only zeros behind it — where the even-digit rule decides.',
        'The tie case is decided by the parity of the last retained digit, so 2.375 (retained 7, odd) goes up to 2.38 while 2.385 (retained 8, even) stays at 2.38. It is not a contradiction: both end in 38.',
        'In the exam, one line of justification per number is what earns the marks. The number alone is worth much less.',
      ],
    },
    {
      title: 'Product $349.1 \\times 863.4$ and how many figures are trustworthy',
      type: 'Numerical — Error propagation',
      question: 'Find the product 349.1 × 863.4 and state how many figures of the result are trustworthy, assuming that each number is correct to the last digit shown.',
      source: 'Shanker Rao Ch 1, Ex. 1.10',
      marks: 6,
      steps: [
        { t: '$x_1 = 349.1$ and $x_2 = 863.4$ are each correct to one decimal, so $|\\Delta x_1| \\le 0.05$ and $|\\Delta x_2| \\le 0.05$.', m: '1 mark' },
        { t: '$u = x_1x_2 = 349.1 \\times 863.4 = 301412.94$.', m: '1 mark' },
        { t: '$E_R = \\dfrac{\\Delta x_1}{x_1} + \\dfrac{\\Delta x_2}{x_2} = \\dfrac{0.05}{349.1} + \\dfrac{0.05}{863.4} = 2.011 \\times 10^{-4}$.', m: '2 marks' },
        { t: '$|\\Delta u| = E_R\\,|u| = 2.011 \\times 10^{-4} \\times 301412.94 = 60.62 \\approx 60.63$.', m: '1 mark' },
        { t: 'So $301412.94 - 60.63 \\le X \\le 301412.94 + 60.63$, i.e. $301352.31 \\le X \\le 301473.57$, i.e. $3014\\times10^{2} \\le X \\le 3015\\times10^{2}$ — only the first three figures (301) of the product are reliable.', m: '1 mark' },
      ],
      answer: '$\\boxed{u = 301412.94,\\quad |\\Delta u| \\le 60.63,\\quad \\text{only the first three figures are reliable}}$',
      note: 'Trap: the error in the product is about 60, so the digits "412.94" of the product are meaningless. The answer $301412.94$ has only three correct digits.',
      explanation: [
        'The relative error of a product is the sum of the relative errors of the factors — this is the multiplication row of the table in §1.7. Multiply it by the size of the result to get the absolute error of the product.',
        'A quick check: $|\\Delta u| \\approx 0.05(x_1 + x_2) = 0.05(349.1 + 863.4) = 60.625$, the same number, which is the shortcut Shanker Rao uses.',
        'Putting the true value in a range is what turns an error into a statement about significant digits: with $X$ somewhere in $[301352.31, 301473.57]$ only $301$ is common to every value in that range, so only three figures can be trusted.',
      ],
    },
    {
      title: 'How many digits to take in computing $\\sqrt{20}$',
      type: 'Numerical — Error computation',
      question: 'How many digits are to be taken in computing $\\sqrt{20}$ so that the error does not exceed 0.1%?',
      source: 'Shanker Rao Ch 1, Ex. 1.4',
      marks: 5,
      steps: [
        { t: '$\\sqrt{20} = 4.4721\\ldots$, so the first significant digit is $\\alpha_m = 4$ with $m = 0$ (the number lies in $[10^0, 10^1)$).', m: '1 mark' },
        { t: 'For $n$ correct digits the limiting relative error is $\\delta x = \\dfrac{10^{n-1}}{\\alpha_m 10^m}$, so $E_R \\le \\dfrac{10^{n-1}}{4}$.', m: '2 marks' },
        { t: 'The allowed error is 0.1% $= 0.001$, so $\\dfrac{10^{n-1}}{4} \\le 10^{-3} \\Rightarrow 10^{n-1} \\le 4\\times10^{-3} = \\dfrac{1}{250}$.', m: '1 mark' },
        { t: '$n - 1 \\le \\log_{10}\\!\\left(\\dfrac{1}{250}\\right) = -2.398$, hence $n \\ge 3.398$, so take $n = 4$ significant digits: $\\sqrt{20} \\approx 4.472$.', m: '1 mark' },
      ],
      answer: '$\\boxed{n = 4 \\text{ significant digits}}$',
      note: 'Trap: the bound is $10^{n-1}/(\\alpha_m 10^m)$, not $10^{-n}$. The first significant digit $\\alpha_m = 4$ is what turns $0.004$ into $250$.',
      explanation: [
        'This is the practical use of the Theorem in §1.5: the relative error of a number known to $n$ correct digits is bounded by $10^{n-1}$ divided by the first significant digit times its place value.',
        'The percentage 0.1% must be converted to a relative error ($0.001$) before it enters the inequality — mixing a percentage with a relative error is the classic slip in this question.',
        'The answer is rounded **up** to the next whole digit: $n \\ge 3.398$ means four digits are needed, because three would not be enough.',
      ],
    },
    {
      title: 'Condition number of $f(x) = \\dfrac{1}{x-1}$',
      type: 'Numerical — Condition number',
      question: 'Using the condition number $\\dfrac{x f\'(x)}{f(x)}$, show that $f(x) = \\dfrac{1}{x-1}$ is ill conditioned near $x = 1$ but well conditioned at $x = 5$.',
      source: 'Medha\'s class notes (marked as a likely question) with Balagurusamy Ch 4',
      marks: 5,
      steps: [
        { t: '$f(x) = \\dfrac{1}{x-1}$, $\\qquad f\'(x) = -\\dfrac{1}{(x-1)^2}$.', m: '1 mark' },
        { t: '$\\mathrm{cond} = \\dfrac{x f\'(x)}{f(x)} = \\dfrac{x\\left(-\\dfrac{1}{(x-1)^2}\\right)}{\\dfrac{1}{x-1}} = -\\dfrac{x}{x-1}$.', m: '2 marks' },
        { t: 'At $x = 1.005$: $\\mathrm{cond} = -\\dfrac{1.005}{0.005} = -201$; at $x = 1.01$: $\\mathrm{cond} = -\\dfrac{1.01}{0.01} = -101$. Both are enormous — the problem is **ill conditioned** near $x = 1$.', m: '1 mark' },
        { t: 'At $x = 5$: $\\mathrm{cond} = -\\dfrac{5}{4} = -1.25$, the same order as the function value itself, so the problem is **well conditioned** there.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\mathrm{cond}(x) = -\\dfrac{x}{x-1};\\quad \\text{ill conditioned near } x = 1,\\ \\text{well conditioned at } x = 5}$',
      note: 'Trap: the factor $x$ in the numerator of $x f\'(x)/f(x)$ is easy to drop, and without it the answer is wrong. Also take the magnitude when you say "ill conditioned".',
      explanation: [
        'Medha\'s class notes give this pair of examples and mark the topic as a likely question: $x = 2 \\Rightarrow f(x^2) = 4$ and $x = 2.01 \\Rightarrow f = 4.04$ is well conditioned, while $f(x) = 1/(x-1)$ with $x = 1.005 \\Rightarrow f = 200$ and $x = 1.01 \\Rightarrow f = 100$ is ill conditioned.',
        'The condition number says how many times the relative error of $x$ is magnified in $f(x)$: at $x = 1.005$ a relative error of $10^{-3}$ in $x$ becomes a relative error of about $200 \\times 10^{-3}$ in $f$ — the answer is useless.',
        'The same formula gives Balagurusamy\'s Example 4.17: for $f(x) = \\sqrt{x-1}$ the condition number is $\\dfrac{x}{2(x-1)}$, which blows up as $x \\to 1$, so the function is numerically unstable close to $x = 1$.',
      ],
    },
    {
      title: 'Relative error in $x + y$',
      type: 'Numerical — Error propagation',
      question: 'If $\\Delta x = 0.005$ and $\\Delta y = 0.001$ are the absolute errors in $x = 2.11$ and $y = 4.15$, find the relative error in the computation of $x + y$.',
      source: 'Shanker Rao Ch 1, Ex. 1.12',
      marks: 3,
      steps: [
        { t: '$x + y = 2.11 + 4.15 = 6.26$.', m: '1 mark' },
        { t: '$\\Delta(x+y) = \\Delta x + \\Delta y = 0.005 + 0.001 = 0.006$.', m: '1 mark' },
        { t: '$E_R = \\dfrac{0.006}{6.26} = 0.000958$.', m: '1 mark' },
      ],
      answer: '$\\boxed{E_R = 0.000958 \\approx 0.001}$',
      note: 'Trap: for $x - y$ the maximum error is $|\\Delta x| + |\\Delta y|$ (the two errors may have opposite signs), not $\\Delta x - \\Delta y$. For $x + y$ it is the same sum.',
      explanation: [
        'The absolute error of an algebraic sum is the sum of the absolute errors of the numbers; dividing by the size of the sum gives the relative error.',
        'Relative error is the right measure here: the absolute error $0.006$ says nothing about how good the answer is until you compare it with the size of the result, which is $6.26$.',
        'The worked answer of Shanker Rao rounds this to $0.001$; keep the full $0.000958$ on the page, then quote the rounded value.',
      ],
    },
  ],
  flashcards: [
    { front: 'Error of an approximate number $x$ for the exact number $X$', back: '$E = \\Delta = X - x$ (true value minus approximate value).' },
    { front: 'Absolute error', back: '$E_A = |X - x|$ — always in the units of the answer.' },
    { front: 'Relative error', back: '$E_R = \\delta = E_A/X \\approx \\Delta x/x$; percentage error $E_P = 100E_R$.' },
    { front: 'The three types of error in Shanker Rao Ch. 1', back: 'Inherent (the data), analytic (cutting a series), round-off (finite digits).' },
    { front: 'Error bound when a number is chopped to $k$ digits', back: '$|X - x| < 10^{k-1}$.' },
    { front: 'Error bound when a number is rounded off to $k$ digits', back: '$|X - x| < \\tfrac{1}{2}10^{k-1}$ — at most half the chopping error.' },
    { front: 'The even-digit rule', back: 'Tie case (discarded digit 5, only zeros behind it): keep the last retained digit if it is even, add 1 if it is odd.' },
    { front: 'General error formula for $u = f(x_1,\\dots,x_n)$', back: '$\\Delta u \\approx \\sum_i \\dfrac{\\partial f}{\\partial x_i}\\Delta x_i$, from Taylor expansion with higher powers neglected.' },
    { front: 'When are the first $n$ significant digits of $x$ correct?', back: 'When $|X - x| \\le \\tfrac{1}{2}10^{m-n+1}$ (narrow sense).' },
    { front: 'Limiting relative error for $n$ correct digits', back: '$\\delta x = \\dfrac{10^{n-1}}{\\alpha_m 10^m}$, where $\\alpha_m$ is the first significant digit.' },
    { front: 'Accuracy and precision (slides\' definition)', back: 'Accuracy = the number of significant digits in the value (57.396 is accurate to five sd); precision = the number of decimal positions, i.e. the order of magnitude of the last digit ($10^{-3}$ for 57.396).' },
    { front: 'Condition number of a function', back: '$\\mathrm{cond} = \\dfrac{\\text{relative error in } f(x)}{\\text{relative error in } x} = \\dfrac{x f\'(x)}{f(x)}$; a large value means the problem is ill conditioned and amplifies every input error.' },
    { front: 'Convergence of $x_{n+1} = \\phi(x_n)$', back: 'Converges if $|\\phi\'(x)| < 1$ near the root (error $\\le \\lambda^n|x_0-\\alpha|$); diverges if $|\\phi\'(x)| > 1$.' },
    { front: 'Deflation', back: 'Removing a found root: $p(x) = (x-r)q(x)$; the roots of $q$ are the remaining roots. Done with Horner’s rule, so the quotient inherits round-off.' },
  ],
  quiz: [
    {
      q: 'The error in an approximate number $x$ of the exact number $X$ is',
      options: ['$X - x$', '$x - X$', '$\\dfrac{X}{x}$', '$|X| - |x|$'],
      answer: 0,
      explain: 'Shanker Rao defines the error as $E = \\Delta = X - x$, the true value minus the approximate value. The absolute error is its magnitude $|X - x|$.',
    },
    {
      q: 'Chopping a number to $k$ digits gives an absolute error of at most',
      options: ['$\\tfrac{1}{2}10^{k-1}$', '$10^{k-1}$', '$10^{k}$', '$\\tfrac{1}{2}10^{k}$'],
      answer: 1,
      explain: 'Rule 2 of the book: truncating to $k$ digits gives $|X - x| < 10^{k-1}$. Rounding off to $k$ digits (Rule 3) gives half of that.',
    },
    {
      q: 'Rounding off 2.385 to two decimal places gives',
      options: ['2.38', '2.39', '2.37', '2.40'],
      answer: 0,
      explain: 'The discarded digit is exactly 5 with only zeros behind it, so the even-digit rule applies: the retained digit 8 is even and stays, giving 2.38.',
    },
    {
      q: 'The relative error of the approximate number $x$ is',
      options: ['$\\dfrac{E_A}{X}$', '$\\dfrac{E_A}{x}$', '$E_A \\cdot X$', '$\\dfrac{X}{E_A}$'],
      answer: 0,
      explain: 'The book defines $E_R = \\delta = E_A/X$ with $X \\neq 0$; since $X \\approx x$ in practice, $\\Delta x = x\\delta x$ is often used instead.',
    },
    {
      q: 'Compared with chopping, rounding off to the same number of digits gives',
      options: [
        'at most half the error',
        'twice the error',
        'exactly the same error',
        'no error at all',
      ],
      answer: 0,
      explain: 'Chopping loses up to a full unit in the last retained place; rounding loses at most half a unit, so the round-off error is at most half the chopping error.',
    },
    {
      q: 'For $u = f(x,y,z)$ the general error formula is',
      options: [
        '$\\Delta u \\approx \\dfrac{\\partial f}{\\partial x}\\Delta x + \\dfrac{\\partial f}{\\partial y}\\Delta y + \\dfrac{\\partial f}{\\partial z}\\Delta z$',
        '$\\Delta u \\approx \\Delta x + \\Delta y + \\Delta z$',
        '$\\Delta u \\approx u\\left(\\dfrac{\\partial f}{\\partial x}\\Delta x + \\dfrac{\\partial f}{\\partial y}\\Delta y\\right)$',
        '$\\Delta u \\approx \\dfrac{\\partial f}{\\partial x}\\dfrac{\\Delta x}{x}$',
      ],
      answer: 0,
      explain: 'It follows from Taylor expansion; the higher powers of the small errors are neglected. Divide by $u$ for the relative error.',
    },
    {
      q: 'The number 0.0005010 has how many significant digits?',
      options: ['3', '4', '5', '7'],
      answer: 0,
      explain: 'The first four zeros only fix the decimal point; the significant digits are 5, 0, 1 — three of them.',
    },
    {
      q: 'Balagurusamy defines the **accuracy** of a number as',
      options: ['the number of significant digits in it', 'the closeness to the true value', 'the number of decimal places', 'the repeatability of the computation'],
      answer: 0,
      explain: 'In the slides accuracy is the number of significant digits in the value and precision is the number of decimal positions. The popular textbook sense (closeness to truth / repeatability) is a different pair of words.',
    },
    {
      q: 'The condition number of a function $f(x)$ is',
      options: [
        '$\\dfrac{x f\'(x)}{f(x)}$',
        '$\\dfrac{f(x)}{x f\'(x)}$',
        '$\\dfrac{\\Delta f}{\\Delta x}$',
        '$f(x)\\,x$',
      ],
      answer: 0,
      explain: 'It is the ratio of the relative error in $f(x)$ to the relative error in $x$. A large value means the problem is ill conditioned and magnifies every error in the input.',
    },
    {
      q: 'The iteration $x_{n+1} = \\phi(x_n)$ converges to the root when',
      options: [
        '$|\\phi\'(x)| < 1$ near the root',
        '$|\\phi\'(x)| > 1$ near the root',
        '$\\phi(x) = 0$ for all $x$',
        '$f\'(x) = 0$ at the root',
      ],
      answer: 0,
      explain: 'With $\\lambda = \\max|\\phi\'(x)|$ the error satisfies $|x_n - \\alpha| \\le \\lambda^n|x_0 - \\alpha|$; it shrinks if $\\lambda < 1$ and grows if $\\lambda > 1$.',
    },
  ],
  solvers: [],
};
