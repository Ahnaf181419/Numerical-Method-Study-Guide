// Full exam-script answers for every past-paper item, keyed "<semester> <id>" (e.g. "Fall 2024 A2(b)").
// A string is the title of the lesson example that works this exact question for the same marks;
// an object is a script written for the paper: { steps: [{ t, m }], answer, note, explanation }.
// Step marks add up to the item's marks; the numbers match the model answers in pastPapers.js.
export const paperKey = (paper, item) => `${paper.title.replace(/ semester final$/, '')} ${item.id}`;

// Asked word for word in both Fall 2023 and Spring 2023.
const relativeError = {
  steps: [
    { t: '$u = 5xy^2z^{-3}$, so at $x = y = z = 1$: $u = 5$.', m: '1 mark' },
    { t: 'Partial derivatives at $(1, 1, 1)$: $\\dfrac{\\partial u}{\\partial x} = \\dfrac{5y^2}{z^3} = 5$, $\\dfrac{\\partial u}{\\partial y} = \\dfrac{10xy}{z^3} = 10$, $\\dfrac{\\partial u}{\\partial z} = -\\dfrac{15xy^2}{z^4} = -15$.', m: '1 mark' },
    { t: 'The signs of $\\Delta x, \\Delta y, \\Delta z$ are unknown, so take the maximum error — add the magnitudes: $\\Delta u_{\\max} = \\left|\\dfrac{\\partial u}{\\partial x}\\right|\\Delta x + \\left|\\dfrac{\\partial u}{\\partial y}\\right|\\Delta y + \\left|\\dfrac{\\partial u}{\\partial z}\\right|\\Delta z = 5(1) + 10(1) + 15(1) = 30$.', m: '1 mark' },
    { t: 'Relative error $e_r = \\dfrac{\\Delta u_{\\max}}{u} = \\dfrac{30}{5} = 6$.', m: '1 mark' },
  ],
  answer: '$\\boxed{e_r = 6}$',
  note: 'Adding the contributions with their signs, $5 + 10 - 15 = 0$: that is not the error bound. Shanker Rao Ex. 1.13 uses the absolute values.',
  explanation: [
    'The general error formula is $\\Delta u \\approx \\sum \\left|\\dfrac{\\partial u}{\\partial x_i}\\right|\\Delta x_i$. For a product of powers like $5xy^2/z^3$ the relative error can also be read off the exponents: $e_r = 1\\cdot\\dfrac{\\Delta x}{x} + 2\\dfrac{\\Delta y}{y} + 3\\dfrac{\\Delta z}{z} = 1 + 2 + 3 = 6$ — the same answer.',
  ],
};

// Asked word for word in both Fall 2023 and Spring 2023.
const gaussSeidelProof = {
  steps: [
    { t: 'Solve each equation for its own unknown: $x_1 = F(x_1, x_2) = \\dfrac{b_1 - a_{12}x_2}{a_{11}}$ and $x_2 = G(x_1, x_2) = \\dfrac{b_2 - a_{21}x_1}{a_{22}}$ — a fixed-point iteration in two variables.', m: '1 mark' },
    { t: 'Partial derivatives: $\\dfrac{\\partial F}{\\partial x_1} = 0$, $\\dfrac{\\partial F}{\\partial x_2} = -\\dfrac{a_{12}}{a_{11}}$, $\\dfrac{\\partial G}{\\partial x_1} = -\\dfrac{a_{21}}{a_{22}}$, $\\dfrac{\\partial G}{\\partial x_2} = 0$.', m: '2 marks' },
    { t: 'The fixed-point iteration converges when $\\left|\\dfrac{\\partial F}{\\partial x_1}\\right| + \\left|\\dfrac{\\partial F}{\\partial x_2}\\right| < 1$ and $\\left|\\dfrac{\\partial G}{\\partial x_1}\\right| + \\left|\\dfrac{\\partial G}{\\partial x_2}\\right| < 1$, i.e. $\\dfrac{|a_{12}|}{|a_{11}|} < 1$ and $\\dfrac{|a_{21}|}{|a_{22}|} < 1$.', m: '2 marks' },
    { t: 'Multiplying out: $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$ — each diagonal coefficient outweighs the off-diagonal one in its row (diagonal dominance).', m: '1 mark' },
  ],
  answer: '$\\boxed{|a_{11}| > |a_{12}| \\text{ and } |a_{22}| > |a_{21}| \\ \\Rightarrow\\ \\text{Gauss-Seidel converges}}$',
  note: 'Calling the conditions necessary. They are sufficient: they guarantee convergence, but a system that fails them may still converge.',
  explanation: [
    'Gauss-Seidel is a fixed-point iteration $x = g(x)$ in several variables, and the one-variable condition $|g^{\\prime}(x)| < 1$ becomes “the row sums of the absolute partial derivatives are less than 1”. For a linear system those partial derivatives are just the coefficient ratios, which turns the condition into diagonal dominance.',
  ],
};

export default {
  // Fall 2024
  'Fall 2024 A1(b)': 'Deriving the Richardson extrapolation formula',
  'Fall 2024 A2(b)': 'Gauss elimination with partial pivoting',
  'Fall 2024 A2(c)': 'Velocity and acceleration of the rocket at t = 0 s and t = 50 s',
  'Fall 2024 A2(d)': 'Solving a system with Do-Little LU',
  'Fall 2024 A2(e)': 'Velocity gained by an aircraft during take-off',
  'Fall 2024 A2(f)': 'Romberg integration of (2x² + x)e⁻ˣ from 1 to 3',
  'Fall 2024 B1(b)': 'Newton forward interpolation of the cubic through $(0,-1), (1,1), (2,1), (3,-2)$ at $x = 1.5$',
  'Fall 2024 A1(a)': {
    steps: [
      { t: 'Write the true number in normalised floating-point form with $d$ mantissa digits (Balagurusamy Ch. 4): $x = f_x \\times 10^{E} + g_x \\times 10^{E-d}$, where $f_x$ holds the $d$ digits that are kept and $0 \\le g_x < 1$ is the part that does not fit.', m: '1 mark' },
      { t: '**Chopping** simply drops $g_x$: $x_c = f_x \\times 10^{E}$, so $|E_c| = |x - x_c| = g_x \\times 10^{E-d}$. Since $0 \\le g_x < 1$, the worst case is $|E_c| < 10^{E-d}$.', m: '1 mark' },
      { t: '**Symmetric rounding**: if $g_x < 0.5$ the last digit is kept and $|E_r| = g_x \\times 10^{E-d} < 0.5 \\times 10^{E-d}$; if $g_x \\ge 0.5$ the last digit is raised by one, $x_r = (f_x + 10^{-d}) \\times 10^{E}$, and $|E_r| = (1 - g_x) \\times 10^{E-d} \\le 0.5 \\times 10^{E-d}$. In both cases $|E_r| \\le 0.5 \\times 10^{E-d}$ — half the chopping bound $10^{E-d}$.', m: '1 mark' },
    ],
    answer: '$\\boxed{|E_r|_{\\max} = 0.5 \\times 10^{E-d} = \\tfrac{1}{2}|E_c|_{\\max}}$',
    note: 'Showing one number rounded and chopped instead of the bounds. The question is about the worst case, so both rounding cases ($g_x < 0.5$ and $g_x \\ge 0.5$) must be covered.',
    explanation: [
      'Chopping always errs in the same direction and can lose almost one whole unit of the last kept digit. Rounding picks the nearer of the two neighbours, so it can never be more than half a unit away. That is the whole proof: the worst rounding error is half the worst chopping error.',
    ],
  },
  'Fall 2024 A1(c)': {
    steps: [
      { t: 'Replace $y = f(x)$ by the Newton–Gregory forward series $y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\cdots$ with $u = \\frac{x - x_0}{h}$, so $dx = h\\,du$ and $u$ runs from $0$ to $n$. Integrating term by term gives the general quadrature formula $I = h\\left[n y_0 + \\frac{n^2}{2}\\Delta y_0 + \\frac{1}{2}\\left(\\frac{n^3}{3} - \\frac{n^2}{2}\\right)\\Delta^2 y_0 + \\cdots\\right]$.', m: '1 mark' },
      { t: 'Put $n = 2$ and neglect the third and higher differences: $I = h\\left[2y_0 + 2\\Delta y_0 + \\frac{1}{3}\\Delta^2 y_0\\right]$.', m: '1 mark' },
      { t: 'Substitute $\\Delta y_0 = y_1 - y_0$ and $\\Delta^2 y_0 = y_2 - 2y_1 + y_0$: $I = \\frac{h}{3}\\left[6y_0 + 6(y_1 - y_0) + (y_2 - 2y_1 + y_0)\\right] = \\frac{h}{3}(y_0 + 4y_1 + y_2)$. Over successive pairs of strips this is the composite rule $\\frac{h}{3}[y_0 + 4(y_1 + y_3 + \\cdots) + 2(y_2 + y_4 + \\cdots) + y_n]$, which needs an **even** number of subintervals.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\int_{x_0}^{x_2} y\\,dx \\approx \\frac{h}{3}(y_0 + 4y_1 + y_2)}$',
    note: 'Putting $n = 3$ (that gives the 3/8 rule), or forgetting that the composite form needs an even number of subintervals.',
    explanation: [
      'Every Newton–Cotes rule comes out of the one general quadrature formula: choose $n$, keep the differences up to order $n$, and simplify. $n = 1$ gives the trapezoidal rule, $n = 2$ Simpson’s one-third rule, $n = 3$ the three-eighths rule and $n = 6$ Weddle’s rule.',
    ],
  },
  'Fall 2024 A1(d)': {
    steps: [
      { t: '**Condition number**: a measure of how much the output of a function changes when its input changes. For $u = f(x)$ the relative condition number is $\\left|\\dfrac{x f^{\\prime}(x)}{f(x)}\\right|$; a large value means the problem is ill-conditioned and the relative error of the data is amplified in the answer.', m: '1 mark' },
      { t: '**Deflation**: removing a known root from a polynomial. Dividing $p(x)$ by $(x - r)$ (synthetic division) leaves a polynomial one degree lower whose roots are the remaining roots, so the process can be repeated.', m: '1 mark' },
      { t: '**Accuracy** (Balagurusamy Ch. 4): the number of significant digits in a value — $57.396$ is accurate to five significant digits. (Contrast precision, the number of decimal positions: $57.396$ has precision $10^{-3}$.)', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{condition number} = \\left|\\tfrac{x f^{\\prime}(x)}{f(x)}\\right|,\\ \\text{deflation} = p(x) \\div (x - r),\\ \\text{accuracy} = \\text{no. of significant digits}}$',
    note: 'Mixing up accuracy and precision. Accuracy counts significant digits; precision is the place value of the last digit.',
    explanation: [
      'Each term is one mark, so give a one-line definition plus a formula or example for each. The condition number is a property of the problem, not of the method; deflation is what lets Newton’s method find every root of a polynomial one after another.',
    ],
  },
  'Fall 2024 A1(e)': {
    steps: [
      { t: 'Necessity: the function is often known only at discrete points (a table of measurements), or its derivative has no convenient closed form, so the derivative must be approximated from the data values themselves.', m: '1 mark' },
      { t: "Central difference $f'(x) \\approx \\dfrac{f(x+h) - f(x-h)}{2h}$. Expand about $x$: $f(x+h) = f + hf' + \\dfrac{h^2}{2}f'' + \\dfrac{h^3}{6}f''' + \\cdots$ and $f(x-h) = f - hf' + \\dfrac{h^2}{2}f'' - \\dfrac{h^3}{6}f''' + \\cdots$.", m: '1 mark' },
      { t: "Subtract (the even powers cancel) and divide by $2h$: $\\dfrac{f(x+h) - f(x-h)}{2h} = f'(x) + \\dfrac{h^2}{6}f'''(x) + O(h^4)$, so the truncation error is $\\dfrac{h^2}{6}f'''(x)$, proportional to $h^2$.", m: '1 mark' },
    ],
    answer: '$\\boxed{E_t = \\tfrac{h^2}{6}f^{\\prime\\prime\\prime}(x) = O(h^2)}$',
    note: 'Stopping at the $h^2 f^{\\prime\\prime}$ terms: they cancel on subtraction, and the error comes from the $h^3$ terms divided by $2h$.',
    explanation: [
      'The central formula uses one point on each side, so the odd-order error terms cancel by symmetry. That is why it is second-order accurate while the two-point forward difference is only first-order.',
    ],
  },
  'Fall 2024 A2(a)': {
    steps: [
      { t: 'Coefficients of $x^4 - 5x^3 + 5x^2 + 5x - 6$: $1, -5, 5, 5, -6$; divide synthetically by $(x + 1)$, i.e. $r = -1$.', m: '1 mark' },
      { t: 'Synthetic division: bring down $1$; $-5 + (-1)(1) = -6$; $5 + (-1)(-6) = 11$; $5 + (-1)(11) = -6$; $-6 + (-1)(-6) = 0$. Row: $[\\ 1 \\quad -6 \\quad 11 \\quad -6 \\mid 0\\ ]$.', m: '2 marks' },
      { t: 'The remainder is $0$, confirming $x = -1$ is a root; the deflated polynomial is $q_1(x) = x^3 - 6x^2 + 11x - 6$.', m: '1 mark' },
      { t: 'The coefficients of $q_1$ add to $1 - 6 + 11 - 6 = 0$, so $x = 1$ is a root. Divide by $(x - 1)$: bring down $1$; $-6 + 1 = -5$; $11 + (-5) = 6$; $-6 + 6 = 0$. Row: $[\\ 1 \\quad -5 \\quad 6 \\mid 0\\ ]$, so $q_2(x) = x^2 - 5x + 6$.', m: '1 mark' },
      { t: '$x^2 - 5x + 6 = (x - 2)(x - 3)$, so the remaining roots are $2$ and $3$. Check: $p(2) = 16 - 40 + 20 + 10 - 6 = 0$ ✓, $p(3) = 81 - 135 + 45 + 15 - 6 = 0$ ✓.', m: '1 mark' },
    ],
    answer: '$\\boxed{x = -1,\\ 1,\\ 2,\\ 3}$',
    note: 'Dividing by $(x - 1)$ instead of $(x + 1)$ for the given root $-1$: the number written in the synthetic-division box is the root itself, $r = -1$.',
    explanation: [
      'Deflation turns one hard quartic into a cubic and then a quadratic. Each synthetic division costs only a row of multiply-and-add, and a zero remainder is the check that the root was right. Once the polynomial is quadratic, factorise it (or use the formula) instead of dividing again.',
    ],
  },
  'Fall 2024 B1(a)': {
    steps: [
      { t: 'Definitions: $\\Delta f(x) = f(x+h) - f(x)$, $\\nabla f(x) = f(x) - f(x-h)$, $\\delta f(x) = f(x + \\tfrac{h}{2}) - f(x - \\tfrac{h}{2})$. Then $(\\Delta - \\nabla)f(x) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$.', m: '1 mark' },
      { t: '$\\delta^2 f(x) = \\delta f(x + \\tfrac{h}{2}) - \\delta f(x - \\tfrac{h}{2}) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$.', m: '1 mark' },
      { t: 'The two results are the same for every $f$, so $\\Delta - \\nabla \\equiv \\delta^2$.', m: '1 mark' },
      { t: 'Lagrange: for $n+1$ points $(x_i, y_i)$ assume $f(x) = a_0(x - x_1)(x - x_2)\\cdots(x - x_n) + a_1(x - x_0)(x - x_2)\\cdots(x - x_n) + \\cdots + a_n(x - x_0)\\cdots(x - x_{n-1})$.', m: '1 mark' },
      { t: 'Put $x = x_0$: every term but the first vanishes, so $y_0 = a_0(x_0 - x_1)\\cdots(x_0 - x_n)$ and $a_0 = \\dfrac{y_0}{(x_0 - x_1)\\cdots(x_0 - x_n)}$; in the same way $a_i = \\dfrac{y_i}{\\prod_{j \\ne i}(x_i - x_j)}$.', m: '1 mark' },
      { t: 'Substituting the $a_i$: $f(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$ — Lagrange’s formula; no equal spacing was assumed.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\Delta - \\nabla \\equiv \\delta^2, \\qquad f(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\ne i}\\frac{x - x_j}{x_i - x_j}}$',
    note: 'Proving the identity on numbers instead of on a general $f(x)$, and in the Lagrange part, dividing by $(x - x_i)$ for the term’s own point.',
    explanation: [
      'Operator identities are proved by applying both sides to an arbitrary $f(x)$ and showing the results agree. For Lagrange, each term is built to vanish at every tabulated point except its own, which is why substituting $x = x_i$ picks out $a_i$ directly.',
    ],
  },
  'Fall 2024 B1(c)': {
    steps: [
      { t: 'First divided differences: $\\dfrac{392 - 150}{7 - 5} = 121$, $\\dfrac{1452 - 392}{11 - 7} = 265$, $\\dfrac{2366 - 1452}{13 - 11} = 457$, $\\dfrac{5202 - 2366}{17 - 13} = 709$.', m: '2 marks' },
      { t: 'Second: $\\dfrac{265 - 121}{11 - 5} = 24$, $\\dfrac{457 - 265}{13 - 7} = 32$, $\\dfrac{709 - 457}{17 - 11} = 42$. Third: $\\dfrac{32 - 24}{13 - 5} = 1$, $\\dfrac{42 - 32}{17 - 7} = 1$. Fourth: $\\dfrac{1 - 1}{17 - 5} = 0$.', m: '1 mark' },
      { t: 'Newton’s divided difference formula with the leading entries: $f(x) = 150 + 121(x - 5) + 24(x - 5)(x - 7) + 1(x - 5)(x - 7)(x - 11) + 0$.', m: '1 mark' },
      { t: '$f(9) = 150 + 121(4) + 24(4)(2) + 1(4)(2)(-2) = 150 + 484 + 192 - 16 = 810$.', m: '1 mark' },
    ],
    answer: '$\\boxed{f(9) = 810}$',
    note: 'Dividing by $h$ as if the points were equally spaced: the gaps are $2, 4, 2, 4$, and each divided difference uses the distance between its own outermost arguments.',
    explanation: [
      'The fourth divided difference is $0$, so the data come from a cubic and the formula stops after the third-order term. Only the top entry of each column enters the formula.',
    ],
  },

  // Spring 2024
  'Spring 2024 Q1(f)': 'Deriving Simpson’s one-third rule from the general quadrature formula',
  'Spring 2024 Q2(d)': 'Missing values in an interpolation table',
  'Spring 2024 Q2(g)': 'Velocity and acceleration of a vehicle at t = 5 s and t = 13 s',
  'Spring 2024 Q2(h)': "Weddle's rule for $\\int_0^3 (2x - x^2)\\,dx$",
  'Spring 2024 Q1(a)': {
    steps: [
      { t: '**Significant digits**: the digits of a number that carry meaning — every non-zero digit, zeros between significant digits, and trailing zeros that are stated to be significant. Leading zeros only fix the decimal point: $0.008472$ has 4 significant digits.', m: '1 mark' },
      { t: '**Accuracy** (Balagurusamy Ch. 4) is the number of significant digits in a value: $57.396$ is accurate to 5 significant digits. **Precision** is the number of decimal positions, the order of magnitude of the last digit: $57.396$ has precision $10^{-3}$.', m: '1 mark' },
      { t: 'Let $x = x_a + e_x$, $y = y_a + e_y$. Then $\\dfrac{x}{y} = \\dfrac{x_a + e_x}{y_a}\\left(1 + \\dfrac{e_y}{y_a}\\right)^{-1} \\approx \\dfrac{x_a + e_x}{y_a}\\left(1 - \\dfrac{e_y}{y_a}\\right) \\approx \\dfrac{x_a}{y_a} + \\dfrac{e_x}{y_a} - \\dfrac{x_a e_y}{y_a^2}$, dropping squares and products of the small errors. So $e_{x/y} = \\dfrac{x_a}{y_a}\\left(\\dfrac{e_x}{x_a} - \\dfrac{e_y}{y_a}\\right)$.', m: '1 mark' },
      { t: 'Divide by $\\dfrac{x_a}{y_a}$: $e_{r,x/y} = \\dfrac{e_x}{x_a} - \\dfrac{e_y}{y_a} = e_{r,x} - e_{r,y}$. The signs of the errors are unknown, so the worst case adds the magnitudes: $e_{r,x/y} = |e_{r,x}| + |e_{r,y}|$.', m: '1 mark' },
    ],
    answer: '$\\boxed{e_{r,x/y} = |e_{r,x}| + |e_{r,y}|}$',
    note: 'Leaving the answer as $e_{r,x} - e_{r,y}$: the two errors can have opposite signs, so the bound adds their magnitudes.',
    explanation: [
      'Relative errors add for both products and quotients; absolute errors add for sums and differences. The key step is the binomial expansion $(1 + e_y/y_a)^{-1} \\approx 1 - e_y/y_a$, valid because the error is small compared with the value.',
    ],
  },
  'Spring 2024 Q1(b)': {
    steps: [
      { t: 'Take two starting points $x_0, x_1$ and draw the chord (secant) through $(x_0, f(x_0))$ and $(x_1, f(x_1))$; the next estimate $x_2$ is where the chord meets the $x$-axis.', m: '1 mark' },
      { t: 'The chord has slope $\\dfrac{f(x_1) - f(x_0)}{x_1 - x_0}$. Setting $y = 0$ in $y - f(x_1) = \\dfrac{f(x_1) - f(x_0)}{x_1 - x_0}(x - x_1)$ gives $x_2 = x_1 - f(x_1)\\dfrac{x_1 - x_0}{f(x_1) - f(x_0)}$.', m: '1 mark' },
      { t: 'In general $x_{i+1} = x_i - f(x_i)\\dfrac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}$ — Newton’s method with the derivative replaced by the chord slope, so $f^{\\prime}$ is never needed.', m: '1 mark' },
      { t: 'Stopping criteria: (1) absolute error $|x_{i+1} - x_i| \\le \\varepsilon$; (2) relative error $\\left|\\dfrac{x_{i+1} - x_i}{x_{i+1}}\\right| \\le \\varepsilon$; (3) $|f(x_{i+1})| \\le \\varepsilon$; (4) a maximum number of iterations is reached.', m: '1 mark' },
    ],
    answer: '$\\boxed{x_{i+1} = x_i - f(x_i)\\dfrac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}}$',
    note: 'Confusing the secant method with false position: the secant method always uses the two latest points and does not keep the root bracketed.',
    explanation: [
      'The secant method trades the derivative of Newton’s method for a second starting point. It converges faster than bisection, a little slower than Newton, and costs only one new function value per iteration.',
    ],
  },
  'Spring 2024 Q1(c)': {
    steps: [
      { t: '**Synthetic division** is Horner’s nested scheme written as a table: bring down the leading coefficient, multiply by $r$, add to the next coefficient, and repeat. The last entry is $p(r)$; the others are the coefficients of the quotient $q(x)$ in $p(x) = (x - r)q(x) + p(r)$.', m: '1 mark' },
      { t: '**Deflation** is dividing $p(x)$ by $(x - r)$ once a root $r$ is known, leaving a polynomial one degree lower that holds the remaining roots.', m: '1 mark' },
      { t: 'Algorithm: (1) choose $x_0$ and iterate $x_{i+1} = x_i - p(x_i)/p^{\\prime}(x_i)$ until $|x_{i+1} - x_i| \\le \\varepsilon$ — root $r_1$; (2) deflate: $p_1(x) = p(x)/(x - r_1)$ by synthetic division; (3) apply Newton’s method to $p_1$ for $r_2$; (4) deflate again; (5) repeat until the remaining polynomial is linear or quadratic, then solve it directly.', m: '2 marks' },
    ],
    answer: '$\\boxed{\\text{Newton root} \\to \\text{deflate by } (x - r) \\to \\text{repeat on the quotient until degree} \\le 2}$',
    note: 'Applying Newton’s method again to the original $p(x)$: it would just find the same root. Each new root is sought in the deflated polynomial.',
    explanation: [
      'A polynomial of degree $n$ has $n$ roots. Deflation removes each root as soon as it is found, so Newton’s method cannot converge back to it, and the work shrinks with every step. Horner’s scheme gives $p(x_i)$ cheaply inside each Newton step as well.',
    ],
  },
  'Spring 2024 Q1(d)': {
    steps: [
      { t: 'For two equations in two unknowns, each equation is a line (Balagurusamy): (i) **unique solution** — the lines cross at one point, $\\det A \\ne 0$; (ii) **no solution** — the lines are parallel, the equations are inconsistent, $\\det A = 0$.', m: '1 mark' },
      { t: '(iii) **Infinitely many solutions** — the lines coincide, one equation is a multiple of the other, $\\det A = 0$; (iv) **ill-conditioned** — the lines are nearly parallel, $\\det A \\approx 0$: a solution exists, but small changes in the coefficients move it a long way.', m: '1 mark' },
      { t: 'Jacobi converges if the coefficient matrix is **diagonally dominant**: $|a_{ii}| > \\sum_{j \\ne i}|a_{ij}|$ in every row.', m: '1 mark' },
      { t: 'Strength: the condition is **sufficient but not necessary** — it guarantees convergence, but some systems converge without it, so failing the test does not prove divergence. Rearranging the equations often makes a system dominant.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{unique, none, infinitely many, ill-conditioned};\\ \\text{Jacobi: } |a_{ii}| > \\textstyle\\sum_{j \\ne i}|a_{ij}| \\text{ (sufficient, not necessary)}}$',
    note: 'Calling diagonal dominance necessary. It is only sufficient: a system that fails the test may still converge.',
    explanation: [
      'The first three cases depend only on whether $\\det A$ is zero; the fourth is about how close to zero it is, which decides how sensitive the answer is to rounding in the data. The dominance condition is the same one the teacher’s rule asks you to check before every Jacobi or Gauss-Seidel question.',
    ],
  },
  'Spring 2024 Q1(e)': {
    steps: [
      { t: 'Let $y = f(x)$ take the values $y_0, y_1, \\dots, y_n$ at the unequally spaced points $x_0, x_1, \\dots, x_n$. Assume $f(x) = a_0(x - x_1)(x - x_2)\\cdots(x - x_n) + a_1(x - x_0)(x - x_2)\\cdots(x - x_n) + \\cdots + a_n(x - x_0)(x - x_1)\\cdots(x - x_{n-1})$.', m: '1 mark' },
      { t: 'Put $x = x_0$: all terms except the first vanish, so $y_0 = a_0(x_0 - x_1)(x_0 - x_2)\\cdots(x_0 - x_n)$ and $a_0 = \\dfrac{y_0}{(x_0 - x_1)(x_0 - x_2)\\cdots(x_0 - x_n)}$.', m: '1 mark' },
      { t: 'Similarly, $x = x_1$ gives $a_1 = \\dfrac{y_1}{(x_1 - x_0)(x_1 - x_2)\\cdots(x_1 - x_n)}$, and so on up to $a_n = \\dfrac{y_n}{(x_n - x_0)(x_n - x_1)\\cdots(x_n - x_{n-1})}$.', m: '1 mark' },
      { t: 'Substituting: $f(x) = \\dfrac{(x - x_1)\\cdots(x - x_n)}{(x_0 - x_1)\\cdots(x_0 - x_n)}y_0 + \\dfrac{(x - x_0)(x - x_2)\\cdots(x - x_n)}{(x_1 - x_0)(x_1 - x_2)\\cdots(x_1 - x_n)}y_1 + \\cdots + \\dfrac{(x - x_0)\\cdots(x - x_{n-1})}{(x_n - x_0)\\cdots(x_n - x_{n-1})}y_n$.', m: '1 mark' },
    ],
    answer: '$\\boxed{f(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\ne i}\\frac{x - x_j}{x_i - x_j}}$',
    note: 'Including the factor $(x - x_i)$ in the $i$-th term: each term leaves out its own point, so that it does not vanish there.',
    explanation: [
      'Each term is a polynomial of degree $n$ that is zero at every tabulated point except one, where it equals that point’s $y$-value. Their sum therefore passes through all $n+1$ points, with no assumption about the spacing.',
    ],
  },
  'Spring 2024 Q1(g)': {
    steps: [
      { t: 'Interpolation finds a curve that passes through **every** data point exactly; regression finds the curve that fits the data best in the least-squares sense — it need not pass through any point, and uses more points than parameters.', m: '1 mark' },
      { t: '(i) $\\mu f(x) = \\tfrac{1}{2}[f(x + \\tfrac{h}{2}) + f(x - \\tfrac{h}{2})]$, so $\\mu^2 f(x) = \\tfrac{1}{2}[\\mu f(x + \\tfrac{h}{2}) + \\mu f(x - \\tfrac{h}{2})] = \\tfrac{1}{4}[f(x+h) + 2f(x) + f(x-h)]$.', m: '1 mark' },
      { t: 'Since $\\delta^2 f(x) = f(x+h) - 2f(x) + f(x-h)$: $\\tfrac{1}{4}[f(x+h) + 2f(x) + f(x-h)] = \\tfrac{1}{4}[\\delta^2 f(x) + 4f(x)] = f(x) + \\tfrac{1}{4}\\delta^2 f(x)$, so $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$.', m: '1 mark' },
      { t: '(ii) With $\\mu = \\tfrac{1}{2}(E^{1/2} + E^{-1/2})$ and $\\delta = E^{1/2} - E^{-1/2}$: $\\mu + \\tfrac{1}{2}\\delta = \\tfrac{1}{2}(E^{1/2} + E^{-1/2}) + \\tfrac{1}{2}(E^{1/2} - E^{-1/2}) = E^{1/2}$.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2, \\qquad E^{1/2} = \\mu + \\tfrac{1}{2}\\delta}$',
    note: 'Squaring $\\mu$ as $\\tfrac{1}{4}[f(x + \\tfrac{h}{2}) + f(x - \\tfrac{h}{2})]^2$ — $\\mu^2$ means applying $\\mu$ twice, not squaring the value.',
    explanation: [
      'Write every operator in terms of $E$ (or apply it to a general $f(x)$) and the identities become ordinary algebra. $\\mu$ averages the two half-step values and $\\delta$ takes their difference, so adding $\\mu$ and half of $\\delta$ leaves exactly the forward half-step $E^{1/2}$.',
    ],
  },
  'Spring 2024 Q2(a)': {
    steps: [
      { t: 'For $a_nx^n + a_{n-1}x^{n-1} + \\cdots + a_0 = 0$, here $a_2 = 1$, $a_1 = -4$, $a_0 = -10$. Search bracket (Balagurusamy): $|x^*_{\\max}| = \\sqrt{\\left(\\dfrac{a_{n-1}}{a_n}\\right)^2 - 2\\dfrac{a_{n-2}}{a_n}} = \\sqrt{(-4)^2 - 2(-10)} = \\sqrt{36} = 6$, so every real root lies in $[-6, 6]$.', m: '1 mark' },
      { t: 'Estimate of the largest root: $x^* = -\\dfrac{a_{n-1}}{a_n} = 4$. Initial guesses $x_1 = 4$, $x_2 = 6$: $f(4) = -10 < 0$ and $f(6) = 2 > 0$, so the largest root lies in $[4, 6]$.', m: '1 mark' },
      { t: 'Iteration 1: $x_0 = \\dfrac{4 + 6}{2} = 5$, $f(5) = 25 - 20 - 10 = -5 < 0$, same sign as $f(4)$ — the root is in $[5, 6]$.', m: '1 mark' },
      { t: 'Iteration 2: $x_0 = \\dfrac{5 + 6}{2} = 5.5$, $f(5.5) = 30.25 - 22 - 10 = -1.75 < 0$ — the root is in $[5.5, 6]$.', m: '1 mark' },
      { t: 'Iteration 3: $x_0 = \\dfrac{5.5 + 6}{2} = 5.75$, $f(5.75) = 33.0625 - 23 - 10 = 0.0625 > 0$ — the root is in $[5.5, 5.75]$.', m: '1 mark' },
      { t: 'After three iterations the estimate is $x \\approx 5.75$ (the exact root is $2 + \\sqrt{14} = 5.7417$).', m: '1 mark' },
    ],
    answer: '$\\boxed{x \\approx 5.75, \\text{ root in } [5.5, 5.75]}$',
    note: 'Starting from an arbitrary bracket: the question asks for the search-bracket formula, so show $|x^*_{\\max}| = 6$ and $x^* = 4$ before the first bisection.',
    explanation: [
      'Not in your slides or notes: the search-bracket formulas are the standard ones from Balagurusamy’s chapter on roots. $|x^*_{\\max}|$ bounds every real root, and $-a_{n-1}/a_n$ (the sum of the roots) estimates the largest one, which gives a bracket with a sign change.',
      'Each bisection halves the bracket, so after three iterations its width is $2/2^3 = 0.25$.',
    ],
  },
  'Spring 2024 Q2(b)': {
    steps: [
      { t: 'Horner for $x^4 + 0x^3 + 3x^2 - 2x + 0$ at $x = 3$ (missing powers written as zeros): $b_0 = 1$, $b_1 = 0 + 3(1) = 3$, $b_2 = 3 + 3(3) = 12$, $b_3 = -2 + 3(12) = 34$, $b_4 = 0 + 3(34) = 102$.', m: '2 marks' },
      { t: 'So $f(3) = b_4 = 102$. Check: $81 + 27 - 6 = 102$ ✓.', m: '1 mark' },
      { t: 'Synthetic division of $x^4 + 7x^3 + 5x^2 - 31x - 30$ by $(x + 3)$, $r = -3$: $b_0 = 1$, $b_1 = 7 + (-3)(1) = 4$, $b_2 = 5 + (-3)(4) = -7$, $b_3 = -31 + (-3)(-7) = -10$, $b_4 = -30 + (-3)(-10) = 0$.', m: '2 marks' },
      { t: 'The remainder $b_4 = 0$ confirms $x_0 = -3$ is a root, and the quotient is $q(x) = x^3 + 4x^2 - 7x - 10$, so $p(x) = (x + 3)(x^3 + 4x^2 - 7x - 10)$.', m: '1 mark' },
    ],
    answer: '$\\boxed{f(3) = 102, \\qquad q(x) = x^3 + 4x^2 - 7x - 10}$',
    note: 'Leaving out the zero coefficients of the missing $x^3$ and constant terms in $x^4 + 3x^2 - 2x$ — every power must have a place in the scheme.',
    explanation: [
      'Horner’s rule and synthetic division are the same table: the last entry is the value $p(r)$, the earlier entries are the quotient. A zero last entry means $r$ is a root and the quotient is the deflated polynomial.',
    ],
  },
  'Spring 2024 Q2(c)': {
    steps: [
      { t: 'Write the system as $AX = B$: $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 4 & 2 & 3 \\\\ 1 & -1 & 1 \\end{bmatrix}$, $B = \\begin{bmatrix} 7 \\\\ 4 \\\\ 0 \\end{bmatrix}$. If $|A| \\ne 0$, $X = A^{-1}B$ with $A^{-1} = \\dfrac{\\operatorname{adj} A}{|A|}$ (Shanker Rao §11.1).', m: '1 mark' },
      { t: '$|A| = 2(2 \\cdot 1 - 3 \\cdot (-1)) - 1(4 \\cdot 1 - 3 \\cdot 1) + 1(4 \\cdot (-1) - 2 \\cdot 1) = 2(5) - 1(1) + 1(-6) = 3 \\ne 0$.', m: '1 mark' },
      { t: 'Cofactors: $C_{11} = 5$, $C_{12} = -1$, $C_{13} = -6$; $C_{21} = -(1 + 1) = -2$, $C_{22} = 2 - 1 = 1$, $C_{23} = -(-2 - 1) = 3$; $C_{31} = 3 - 2 = 1$, $C_{32} = -(6 - 4) = -2$, $C_{33} = 4 - 4 = 0$. Transpose: $\\operatorname{adj} A = \\begin{bmatrix} 5 & -2 & 1 \\\\ -1 & 1 & -2 \\\\ -6 & 3 & 0 \\end{bmatrix}$, $A^{-1} = \\dfrac{1}{3}\\operatorname{adj} A$.', m: '2 marks' },
      { t: '$X = A^{-1}B = \\dfrac{1}{3}\\begin{bmatrix} 5(7) - 2(4) + 1(0) \\\\ -1(7) + 1(4) - 2(0) \\\\ -6(7) + 3(4) + 0(0) \\end{bmatrix} = \\dfrac{1}{3}\\begin{bmatrix} 27 \\\\ -3 \\\\ -30 \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ -1 \\\\ -10 \\end{bmatrix}$.', m: '1 mark' },
      { t: 'Check: $2(9) + (-1) + (-10) = 7$ ✓, $4(9) + 2(-1) + 3(-10) = 4$ ✓, $9 - (-1) + (-10) = 0$ ✓.', m: '1 mark' },
    ],
    answer: '$\\boxed{x = 9,\\ y = -1,\\ z = -10}$',
    note: 'Forgetting to transpose the cofactor matrix: the adjoint is the transpose of the cofactors, and the sign pattern $+,-,+$ must be applied first.',
    explanation: [
      'Matrix inversion solves $AX = B$ in one multiplication once $A^{-1}$ is known, which is worth it when the same $A$ is used with several right-hand sides. For a single system Gauss elimination is cheaper, which is why the paper allows another method for partial marks.',
    ],
  },
  'Spring 2024 Q2(e)': {
    steps: [
      { t: 'Linearise: $y = ax^b \\Rightarrow \\ln y = \\ln a + b\\ln x$. With $X = \\ln x$, $Y = \\ln y$ this is a straight line $Y = A + bX$, $A = \\ln a$.', m: '1 mark' },
      { t: 'Table ($X, Y, X^2, XY$): $x = 1$: $0,\\ -0.6931,\\ 0,\\ 0$; $x = 2$: $0.6931,\\ 1.3863,\\ 0.4805,\\ 0.9609$; $x = 3$: $1.0986,\\ 2.6027,\\ 1.2069,\\ 2.8593$; $x = 4$: $1.3863,\\ 3.4657,\\ 1.9218,\\ 4.8045$; $x = 5$: $1.6094,\\ 4.1352,\\ 2.5903,\\ 6.6553$.', m: '2 marks' },
      { t: 'Totals ($n = 5$): $\\sum X = 4.7875$, $\\sum Y = 10.8967$, $\\sum X^2 = 6.1995$, $\\sum XY = 15.2801$.', m: '1 mark' },
      { t: '$b = \\dfrac{n\\sum XY - \\sum X\\sum Y}{n\\sum X^2 - (\\sum X)^2} = \\dfrac{5(15.2801) - (4.7875)(10.8967)}{5(6.1995) - (4.7875)^2} = \\dfrac{24.2325}{8.0773} = 3.0$.', m: '1 mark' },
      { t: '$A = \\bar{Y} - b\\bar{X} = 2.1793 - 3(0.9575) = -0.6932$, so $a = e^{-0.6932} = 0.5$. The model $y = 0.5x^3$ reproduces the data exactly: $0.5,\\ 4,\\ 13.5,\\ 32,\\ 62.5$.', m: '1 mark' },
    ],
    answer: '$\\boxed{y = 0.5\\,x^{3}}$',
    note: 'Fitting $a$ directly as $\\bar{Y} - b\\bar{X}$ and forgetting to take $e^{A}$: the line gives $\\ln a$, not $a$.',
    explanation: [
      'A power law is a straight line in log–log coordinates, so the ordinary least-squares formulas apply to $(\\ln x, \\ln y)$. Here the data are exactly $x^3/2$, so the fit is perfect; with real data the same steps give the best power law in the log sense.',
    ],
  },
  'Spring 2024 Q2(f)': {
    steps: [
      { t: 'Difference table: $y = -1, 1, 1, -2$; $\\Delta y = 2, 0, -3$; $\\Delta^2 y = -2, -3$; $\\Delta^3 y = -1$. Leading differences $\\Delta y_0 = 2$, $\\Delta^2 y_0 = -2$, $\\Delta^3 y_0 = -1$.', m: '2 marks' },
      { t: 'With $x_0 = 0$, $h = 1$: $u = x$, and $y = y_0 + u\\Delta y_0 + \\dfrac{u(u-1)}{2!}\\Delta^2 y_0 + \\dfrac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 = -1 + 2x + \\dfrac{x(x-1)}{2}(-2) + \\dfrac{x(x-1)(x-2)}{6}(-1)$.', m: '1 mark' },
      { t: 'Expand: $-1 + 2x - (x^2 - x) - \\frac{1}{6}(x^3 - 3x^2 + 2x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3$.', m: '2 marks' },
      { t: 'At $x = 1$: $y(1) = -1 + \\frac{8}{3} - \\frac{1}{2} - \\frac{1}{6} = 1$ — as it must be, since the cubic passes through $(1, 1)$.', m: '1 mark' },
    ],
    answer: '$\\boxed{y(x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3, \\quad y(1) = 1}$',
    note: 'Writing $2$ for $3!$ in the cubic term. The value at a tabulated point is a free check: $y(1)$ must equal the table’s $1$.',
    explanation: [
      'Newton’s forward formula needs only the top diagonal of the difference table. With $h = 1$ and $x_0 = 0$ the variable $u$ is just $x$, so the formula expands directly into the polynomial.',
    ],
  },
  'Spring 2024 Q3(a)': {
    steps: [
      { t: 'Hypothesis $H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2 + \\theta_3 x^3 + \\theta_4 x^4$; cost $J(\\theta) = \\dfrac{1}{2m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]^2$.', m: '1 mark' },
      { t: 'Chain rule: $\\dfrac{\\partial J}{\\partial \\theta_j} = \\dfrac{1}{m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]\\dfrac{\\partial H_\\theta}{\\partial \\theta_j} = \\dfrac{1}{m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]\\left(x^{(i)}\\right)^j$.', m: '2 marks' },
      { t: 'So with $e_i = H_\\theta(x^{(i)}) - y^{(i)}$: $\\dfrac{\\partial J}{\\partial \\theta_0} = \\dfrac{1}{m}\\sum e_i$, $\\dfrac{\\partial J}{\\partial \\theta_1} = \\dfrac{1}{m}\\sum e_i x^{(i)}$, $\\dfrac{\\partial J}{\\partial \\theta_2} = \\dfrac{1}{m}\\sum e_i (x^{(i)})^2$, $\\dfrac{\\partial J}{\\partial \\theta_3} = \\dfrac{1}{m}\\sum e_i (x^{(i)})^3$, $\\dfrac{\\partial J}{\\partial \\theta_4} = \\dfrac{1}{m}\\sum e_i (x^{(i)})^4$.', m: '1 mark' },
      { t: 'Update, repeated until convergence: $\\theta_j \\leftarrow \\theta_j - \\alpha\\dfrac{\\partial J}{\\partial \\theta_j}$ for $j = 0, 1, 2, 3, 4$.', m: '1 mark' },
      { t: 'Simultaneous update is necessary because all five partial derivatives must be evaluated at the **same** point $\\theta$: if $\\theta_0$ were overwritten first, the gradient for $\\theta_1$ would be computed at a different point — a different (and wrong) algorithm.', m: '1 mark' },
      { t: 'Implementation: compute all five derivatives from the current $\\theta$ into temporaries, $\\text{temp}_j = \\theta_j - \\alpha\\dfrac{\\partial J}{\\partial \\theta_j}$, and only then assign $\\theta_j = \\text{temp}_j$ for every $j$.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\theta_j \\leftarrow \\theta_j - \\frac{\\alpha}{m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]\\left(x^{(i)}\\right)^j,\\ j = 0, \\dots, 4 \\text{ (simultaneously)}}$',
    note: 'Using an updated $\\theta_0$ inside the same epoch’s gradient for $\\theta_1$ — that is the sequential update the question warns against.',
    explanation: [
      'Each parameter’s gradient is the average error weighted by the feature that parameter multiplies: $1, x, x^2, x^3, x^4$. Polynomial regression is linear in $\\theta$, so it is the same algorithm as linear regression with extra features.',
    ],
  },
  'Spring 2024 Q3(b)': {
    steps: [
      { t: '$H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2$ with $(\\theta_0, \\theta_1, \\theta_2) = (2, 1, 3)$, $m = 5$, $\\alpha = 0.2$; batch mode updates once per epoch, after all five rows.', m: '1 mark' },
      { t: 'Predictions $H = 2 + x + 3x^2$ at $x = 0, 2, 3, 5, 4$: $2,\\ 16,\\ 32,\\ 82,\\ 54$. Errors $e = H - y$: $2 - 0 = 2$, $16 - 5 = 11$, $32 - 6 = 26$, $82 - 9 = 73$, $54 - 7 = 47$.', m: '2 marks' },
      { t: '$\\dfrac{\\partial J}{\\partial \\theta_0} = \\frac{1}{5}(2 + 11 + 26 + 73 + 47) = \\frac{159}{5} = 31.8$; $\\dfrac{\\partial J}{\\partial \\theta_1} = \\frac{1}{5}(0 + 22 + 78 + 365 + 188) = \\frac{653}{5} = 130.6$.', m: '1 mark' },
      { t: '$\\dfrac{\\partial J}{\\partial \\theta_2} = \\frac{1}{5}\\left[2(0) + 11(4) + 26(9) + 73(25) + 47(16)\\right] = \\frac{1}{5}(0 + 44 + 234 + 1825 + 752) = \\frac{2855}{5} = 571$.', m: '1 mark' },
      { t: 'Simultaneous update: $\\theta_0 = 2 - 0.2(31.8) = -4.36$, $\\theta_1 = 1 - 0.2(130.6) = -25.12$, $\\theta_2 = 3 - 0.2(571) = -111.2$.', m: '1 mark' },
      { t: 'After one epoch $H_\\theta(x) = -4.36 - 25.12x - 111.2x^2$. These are the parameters the next epoch starts from.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\theta_0 = -4.36,\\ \\theta_1 = -25.12,\\ \\theta_2 = -111.2}$',
    note: 'Using $y - H$ as the error with the update $\\theta - \\alpha\\,\\partial J$: the sign flips. With $e = H - y$ the update subtracts $\\alpha$ times the average.',
    explanation: [
      '“Without variable conversion” means keeping $x$ and $x^2$ as they are instead of renaming $x^2$ as a new feature $x_2$; the arithmetic is the same. Batch mode uses the old $\\theta$ for all five rows and updates once at the end of the epoch.',
    ],
  },

  // Fall 2023
  'Fall 2023 Q1(e)': 'Deriving the three-point forward difference formula',
  'Fall 2023 Q2(c)': 'Newton-Raphson: $x^3 - 4x^2 + x + 6 = 0$',
  'Fall 2023 Q2(d)': 'Composite trapezoidal and Simpson’s one-third rule for ∫₀¹ dx/(1+x²)',
  'Fall 2023 Q2(e)': 'Second derivative of f(x) = 1/(1 + x²) at x = 0.5',
  'Fall 2023 Q3(a)': 'Why Richardson extrapolation beats the three-point forward difference',
  'Fall 2023 Q3(b)': 'Newton-Raphson: depth of water in a spherical tank',
  'Fall 2023 Q3(c)': 'Least-squares line through the surface-area table',
  'Fall 2023 Q1(a)': {
    steps: [
      { t: 'Fixed-point iteration rewrites $f(x) = 0$ as $x = g(x)$ and iterates $x_{i+1} = g(x_i)$; it converges when $|g^{\\prime}(x)| < 1$ near the root (and throughout the interval used).', m: '1 mark' },
      { t: 'It fails to converge when $|g^{\\prime}(x)| > 1$ near the root: each step multiplies the error by more than one, so the iterates move away from the root (monotonically if $g^{\\prime} > 1$, oscillating if $g^{\\prime} < -1$).', m: '1 mark' },
      { t: 'It also fails when $|g^{\\prime}(x)| = 1$ (no reduction of the error), when the starting value lies outside the interval in which $|g^{\\prime}| < 1$, or when an iterate leaves that interval.', m: '1 mark' },
      { t: 'The rearrangement matters: the same equation written as different $x = g(x)$ can converge for one form and diverge for another, so check $|g^{\\prime}(x_0)| < 1$ before iterating.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{diverges when } |g^{\\prime}(x)| \\ge 1 \\text{ near the root, or when } x_0 \\text{ (or an iterate) is outside the region where } |g^{\\prime}| < 1}$',
    note: 'Blaming the equation: divergence comes from the chosen $g(x)$, so the fix is a different rearrangement, not a different equation.',
    explanation: [
      'Near the root $r$, $x_{i+1} - r = g(x_i) - g(r) \\approx g^{\\prime}(r)(x_i - r)$, so the error is multiplied by $g^{\\prime}(r)$ at every step. That one line explains every case: it shrinks only when $|g^{\\prime}(r)| < 1$.',
    ],
  },
  'Fall 2023 Q1(b)': {
    steps: [
      { t: '**Lagrange — pros**: symmetric in the data points, easy to write down directly, no table needed, works for unequal spacing.', m: '1 mark' },
      { t: '**Lagrange — cons**: every new $x$ repeats all $n+1$ products, and adding one more data point means recomputing every term.', m: '1 mark' },
      { t: '**Newton divided difference — pros**: the table is built once and reused for every $x$; a new data point adds one diagonal, and the existing terms stay; the last column shows whether a lower-degree polynomial is enough.', m: '1 mark' },
      { t: '**Newton divided difference — cons**: the table must be built first (more set-up), and the nodes enter in a fixed order. Both give the same unique polynomial of degree $\\le n$ through the $n+1$ points.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{Lagrange: direct but recomputed per point;\\ Newton DD: table once, cheap to extend and reuse}}$',
    note: 'Saying the two methods give different polynomials: the interpolating polynomial is unique, so they always agree — only the work differs.',
    explanation: [
      'Use Lagrange for a single value from a few points; use divided differences when several values are needed or more data may arrive.',
    ],
  },
  'Fall 2023 Q1(c)': {
    steps: [
      { t: 'Horner’s rule evaluates $p(x) = a_nx^n + a_{n-1}x^{n-1} + \\cdots + a_0$ in nested form: $p(x) = (\\cdots((a_nx + a_{n-1})x + a_{n-2})x + \\cdots + a_1)x + a_0$, i.e. $b_n = a_n$, $b_k = a_k + x\\,b_{k+1}$, $p(x) = b_0$.', m: '1 mark' },
      { t: 'It needs only $n$ multiplications and $n$ additions, against about $n(n+1)/2$ multiplications when each power $x^k$ is formed separately.', m: '1 mark' },
      { t: 'Every arithmetic operation can add a round-off error, so fewer operations mean less accumulated round-off — the nested form is both faster and more accurate.', m: '1 mark' },
      { t: 'Bonus: the intermediate $b_k$ are the coefficients of the quotient $q(x)$ in $p(x) = (x - r)q(x) + p(r)$, so the same pass gives synthetic division for deflation.', m: '1 mark' },
    ],
    answer: '$\\boxed{n \\text{ multiplications instead of } \\approx n(n+1)/2 \\ \\Rightarrow\\ \\text{less round-off}}$',
    note: 'Saying Horner gives a different value: in exact arithmetic it is the same polynomial; the gain is fewer rounding steps.',
    explanation: [
      'For $n = 4$, term-by-term evaluation needs $1 + 2 + 3 + 4 = 10$ multiplications; Horner needs $4$. The saving grows with the degree, and so does the reduction in round-off.',
    ],
  },
  'Fall 2023 Q1(d)': relativeError,
  'Fall 2023 Q1(f)': {
    steps: [
      { t: '(i) $(\\Delta - \\nabla)f(x) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$.', m: '1 mark' },
      { t: '$\\delta^2 f(x) = \\delta f(x + \\tfrac{h}{2}) - \\delta f(x - \\tfrac{h}{2}) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$; the two agree, so $\\Delta - \\nabla \\equiv \\delta^2$.', m: '1 mark' },
      { t: '(ii) $\\mu f(x) = \\tfrac{1}{2}[f(x + \\tfrac{h}{2}) + f(x - \\tfrac{h}{2})]$, so $\\mu^2 f(x) = \\tfrac{1}{4}[f(x+h) + 2f(x) + f(x-h)]$.', m: '1 mark' },
      { t: 'Using (i), $f(x+h) + 2f(x) + f(x-h) = \\delta^2 f(x) + 4f(x)$, so $\\mu^2 f(x) = f(x) + \\tfrac{1}{4}\\delta^2 f(x)$, i.e. $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\Delta - \\nabla \\equiv \\delta^2, \\qquad \\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2}$',
    note: 'Treating $\\mu^2$ as the square of a value: it means applying the averaging operator twice.',
    explanation: [
      'Both identities are proved the same way: apply each side to a general $f(x)$, expand to function values, and show the results are identical. Part (ii) reuses the expression $f(x+h) - 2f(x) + f(x-h)$ from part (i).',
    ],
  },
  'Fall 2023 Q2(a)': {
    steps: [
      { t: '$f(x) = x^3 - 9x + 1$: $f(2) = 8 - 18 + 1 = -9 < 0$ and $f(3) = 27 - 27 + 1 = 1 > 0$, so a root lies in $[2, 3]$.', m: '1 mark' },
      { t: 'Iteration 1: $c = 2.5$, $f(2.5) = -5.875 < 0$ — the root is in $[2.5, 3]$. Iteration 2: $c = 2.75$, $f(2.75) = -2.9531 < 0$ — the root is in $[2.75, 3]$.', m: '1 mark' },
      { t: 'Iteration 3: $c = 2.875$, $f(2.875) = -1.1113 < 0$ — the root is in $[2.875, 3]$.', m: '1 mark' },
      { t: 'Iteration 4: $c = 2.9375$, $f(2.9375) = -0.0901 < 0$ — the root is in $[2.9375, 3]$.', m: '1 mark' },
      { t: 'Iteration 5: $c = 2.96875 \\approx 2.9688$, $f(2.9688) = 0.4463 > 0$ — the root is in $[2.9375, 2.9688]$, width $0.031 < 0.1$.', m: '1 mark' },
      { t: 'Both ends of the bracket round to $2.9$, so to 2 significant digits the root is $x \\approx 2.9$ (the exact root is $2.9428$).', m: '1 mark' },
    ],
    answer: '$\\boxed{x \\approx 2.9 \\ (2 \\text{ significant digits})}$',
    note: 'Stopping as soon as one midpoint looks right: stop when both ends of the bracket agree to the required 2 significant digits.',
    explanation: [
      'Two significant digits here means the first decimal place, so the bracket must be narrower than $0.1$ and lie inside one rounding interval. After five halvings the bracket is $1/2^5 = 0.031$ wide, and both ends give $2.9$.',
    ],
  },
  'Fall 2023 Q2(b)': {
    steps: [
      { t: 'Dominance check: row 1 $|2| > |-1|$ ✓; row 2 $|2| = |-1| + |-1|$ — equal, so the strict test fails; row 3 $|2| > |-1|$ ✓. The system cannot be rearranged to do better, and the condition is only sufficient, so iterate.', m: '1 mark' },
      { t: 'Isolate: $x = \\tfrac{1}{2}(1 + y)$, $y = \\tfrac{1}{2}(x + z)$, $z = \\tfrac{1}{2}(1 + y)$. Jacobi uses only the previous iterate on the right.', m: '1 mark' },
      { t: 'Iteration 1 from $(0, 0, 0)$: $x^{(1)} = \\tfrac{1}{2}(1 + 0) = 0.5$, $y^{(1)} = \\tfrac{1}{2}(0 + 0) = 0$, $z^{(1)} = \\tfrac{1}{2}(1 + 0) = 0.5$.', m: '1 mark' },
      { t: 'Iteration 2: $x^{(2)} = \\tfrac{1}{2}(1 + 0) = 0.5$, $y^{(2)} = \\tfrac{1}{2}(0.5 + 0.5) = 0.5$, $z^{(2)} = \\tfrac{1}{2}(1 + 0) = 0.5$.', m: '1 mark' },
      { t: 'Iteration 3: $x^{(3)} = \\tfrac{1}{2}(1 + 0.5) = 0.75$, $y^{(3)} = \\tfrac{1}{2}(0.5 + 0.5) = 0.5$, $z^{(3)} = \\tfrac{1}{2}(1 + 0.5) = 0.75$.', m: '1 mark' },
      { t: 'Iteration 4: $x^{(4)} = \\tfrac{1}{2}(1 + 0.5) = 0.75$, $y^{(4)} = \\tfrac{1}{2}(0.75 + 0.75) = 0.75$, $z^{(4)} = \\tfrac{1}{2}(1 + 0.5) = 0.75$.', m: '1 mark' },
    ],
    answer: '$\\boxed{x^{(4)} = 0.75,\\ y^{(4)} = 0.75,\\ z^{(4)} = 0.75}$ (exact solution $x = y = z = 1$)',
    note: 'Using the new $x^{(k)}$ inside the same iteration’s $y$ — that is Gauss-Seidel. Jacobi uses only the values from the previous iteration.',
    explanation: [
      'The iterates creep towards $(1, 1, 1)$ slowly because row 2 is only weakly dominant. Check the exact answer: $2(1) - 1 = 1$, $-1 + 2 - 1 = 0$, $-1 + 2 = 1$ ✓.',
    ],
  },
  'Fall 2023 Q2(f)': {
    steps: [
      { t: 'Augmented matrix $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 3 \\\\ 2 & 3 & 4 & 11 \\\\ 4 & 9 & 16 & 41 \\end{array}\\right]$; the first pivot $a_{11} = 1 \\ne 0$, so no pivoting is needed.', m: '1 mark' },
      { t: '$R_2^{\\prime} = R_2 - 2R_1 = [\\ 0 \\quad 1 \\quad 2 \\mid 5\\ ]$ (multiplier $l_{21} = 2$); $R_3^{\\prime} = R_3 - 4R_1 = [\\ 0 \\quad 5 \\quad 12 \\mid 29\\ ]$ (multiplier $l_{31} = 4$).', m: '2 marks' },
      { t: '$R_3^{\\prime\\prime} = R_3^{\\prime} - 5R_2^{\\prime} = [\\ 0 \\quad 0 \\quad 2 \\mid 4\\ ]$ (multiplier $l_{32} = 5$) — upper triangular.', m: '1 mark' },
      { t: 'The multipliers fill $L$ and the final rows are $U$: $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 4 & 5 & 1 \\end{bmatrix}$, $U = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 2 \\end{bmatrix}$.', m: '1 mark' },
      { t: 'Check: $LU = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 2 + 1 & 2 + 2 \\\\ 4 & 4 + 5 & 4 + 10 + 2 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 4 \\\\ 4 & 9 & 16 \\end{bmatrix} = A$ ✓.', m: '1 mark' },
    ],
    answer: '$\\boxed{L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 4 & 5 & 1 \\end{bmatrix},\\quad U = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 2 \\end{bmatrix}}$',
    note: 'Putting the negatives of the multipliers in $L$: $R_2 - 2R_1$ stores $+2$ in $L$, because $R_2 = 2R_1 + R_2^{\\prime}$.',
    explanation: [
      'Gauss elimination is LU decomposition in disguise: $U$ is the triangular matrix it ends with and $L$ records the multipliers it used. With $L$ and $U$ the system is finished by forward substitution $Ld = b$ ($d = 3, 5, 4$) and back substitution $Ux = d$, giving $z = 2$, $y = 1$, $x = 0$.',
    ],
  },
  'Fall 2023 Q2(g)': {
    steps: [
      { t: 'The years are equally spaced: $h = 2$, $x_0 = 1985$. Forward difference table — $y$: $40, 43, 48, 52, 57$; $\\Delta y$: $3, 5, 4, 5$; $\\Delta^2 y$: $2, -1, 1$; $\\Delta^3 y$: $-3, 2$; $\\Delta^4 y$: $5$.', m: '2 marks' },
      { t: 'For 1986: $p = \\dfrac{x - x_0}{h} = \\dfrac{1986 - 1985}{2} = 0.5$.', m: '1 mark' },
      { t: 'Second-degree Newton-Gregory forward polynomial: $y = y_0 + p\\Delta y_0 + \\dfrac{p(p-1)}{2!}\\Delta^2 y_0$.', m: '1 mark' },
      { t: 'Substitute: $y(1986) = 40 + 0.5(3) + \\dfrac{0.5(0.5 - 1)}{2}(2) = 40 + 1.5 - 0.25$.', m: '1 mark' },
      { t: '$y(1986) = 41.25$ thousand.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{sales in 1986} \\approx 41.25 \\text{ thousand}}$',
    note: 'Taking $p = 1986 - 1985 = 1$: the step is $h = 2$ years, so $p = 0.5$.',
    explanation: [
      'The paper asks for a second-degree polynomial, so only $\\Delta y_0$ and $\\Delta^2 y_0$ are used even though the full table goes to $\\Delta^4$. The table is still required for the marks.',
    ],
  },
  'Fall 2023 Q2(h)': {
    steps: [
      { t: 'Coefficients of $x^3 - 6x^2 + 11x - 6$: $1, -6, 11, -6$; evaluate at $x = 2$.', m: '1 mark' },
      { t: 'Horner: $b_0 = 1$, $b_1 = -6 + 2(1) = -4$, $b_2 = 11 + 2(-4) = 3$, $b_3 = -6 + 2(3) = 0$. Row: $[\\ 1 \\quad -4 \\quad 3 \\mid 0\\ ]$.', m: '2 marks' },
      { t: '$p(2) = b_3 = 0$, so $x = 2$ is a root.', m: '1 mark' },
      { t: 'The quotient coefficients are $b_0, b_1, b_2$: $q(x) = x^2 - 4x + 3$, and $p(x) = (x - 2)(x^2 - 4x + 3)$.', m: '1 mark' },
      { t: '$x^2 - 4x + 3 = (x - 1)(x - 3)$, so $p(x) = (x - 1)(x - 2)(x - 3)$ and the other roots are $1$ and $3$.', m: '1 mark' },
    ],
    answer: '$\\boxed{p(2) = 0, \\qquad q(x) = x^2 - 4x + 3}$',
    note: 'Taking the last entry into $q(x)$: it is the remainder $p(2)$, not a coefficient.',
    explanation: [
      'One Horner pass gives both the value $p(2)$ and the deflated polynomial $q(x)$. Because the remainder is $0$, $q(x)$ holds the other two roots.',
    ],
  },
  'Fall 2023 Q3(d)': {
    steps: [
      { t: 'Example: $5x + 2y + z = 12$, $x + 4y + 2z = 15$, $x + 2y + 5z = 20$ — diagonally dominant ($5 > 3$, $4 > 3$, $5 > 3$), so both methods converge; exact solution $(1, 2, 3)$.', m: '1 mark' },
      { t: 'Jacobi from $(0, 0, 0)$, using only the previous iterate: $(2.40, 3.75, 4.00)$, $(0.10, 1.15, 2.02)$, $(1.54, 2.72, 3.52)$, $(0.61, 1.61, 2.61)$, … — it oscillates about $(1, 2, 3)$ and needs **17** iterations before successive values agree within $0.005$.', m: '2 marks' },
      { t: 'Gauss-Seidel from $(0, 0, 0)$, using each new value at once: $x^{(1)} = 2.4$, $y^{(1)} = \\tfrac{1}{4}(15 - 2.4) = 3.15$, $z^{(1)} = \\tfrac{1}{5}(20 - 2.4 - 6.3) = 2.26$; then $(0.688, 2.448, 2.8832)$, $(0.8442, 2.0974, 2.9922)$, … — the same tolerance in **7** iterations.', m: '2 marks' },
      { t: 'Reason: Gauss-Seidel uses the latest $x$ (and $y$) inside the same sweep, so every equation already sees the improved values; Jacobi waits for the whole sweep. Both share the same sufficient condition — only the rate differs.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{Gauss-Seidel: 7 iterations,\\ Jacobi: 17 iterations (tolerance 0.005)}}$',
    note: 'Claiming Gauss-Seidel converges where Jacobi does not, as a rule: the usual statement is only about speed for systems where both converge.',
    explanation: [
      'In matrix form $B_J = -D^{-1}(L + U)$ and $B_{GS} = -(D + L)^{-1}U$; the method whose iteration matrix has the smaller spectral radius converges faster, and for this system that is Gauss-Seidel.',
    ],
  },
  'Fall 2023 Q3(e)': gaussSeidelProof,

  // Spring 2023
  'Spring 2023 Q1(e)': 'Deriving the three-point forward difference formula',
  'Spring 2023 Q2(d)': 'Romberg integration of e⁻ˣ² from 0 to 1',
  'Spring 2023 Q3(a)': 'Why Richardson extrapolation beats the three-point forward difference',
  'Spring 2023 Q3(c)': 'Power-law fit $A = aW^b$ for the surface-area table',
  'Spring 2023 Q1(a)': {
    steps: [
      { t: '**Convergence is not guaranteed**: $x_{i+1} = g(x_i)$ converges only if $|g^{\\prime}(x)| < 1$ near the root; otherwise it diverges.', m: '1 mark' },
      { t: '**It depends on the rearrangement**: the same $f(x) = 0$ can be written as many different $x = g(x)$, some convergent and some not, and finding a good one takes trial.', m: '1 mark' },
      { t: '**Slow convergence**: the convergence is only linear, and when $|g^{\\prime}(x)|$ is close to $1$ it is very slow.', m: '1 mark' },
      { t: '**Starting value**: $x_0$ must lie in the interval where $|g^{\\prime}| < 1$, the iterates may leave it, and each run finds at most one root.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{needs } |g^{\\prime}(x)| < 1,\\ \\text{depends on the rearrangement, linear (often slow), sensitive to } x_0}$',
    note: 'Listing advantages instead of limitations — the question asks only for the weaknesses.',
    explanation: [
      'All four limitations come from the error relation $e_{i+1} \\approx g^{\\prime}(r)e_i$: the error shrinks only if $|g^{\\prime}(r)| < 1$, and only by that factor each step.',
    ],
  },
  'Spring 2023 Q1(b)': {
    steps: [
      { t: 'Synthetic division of $p(x)$ by $(x - r)$ gives, in one row, the value $p(r)$ and the quotient: $p(x) = (x - r)q(x) + p(r)$.', m: '1 mark' },
      { t: 'If the remainder $p(r) = 0$, then $r$ is a root and $q(x)$, one degree lower, holds all the remaining roots.', m: '1 mark' },
      { t: 'Divide $q(x)$ by $(x - r)$ again: if the remainder is again $0$, then $(x - r)^2$ divides $p(x)$ and $r$ is a repeated (multiple) root; keep dividing until the remainder is non-zero — the number of zero remainders is the multiplicity.', m: '1 mark' },
      { t: 'Repeating this deflation with each root found strips the roots off one after another until the quotient is linear or quadratic and can be solved directly.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{a root } r \\text{ of multiplicity } k \\text{ gives zero remainder in } k \\text{ successive synthetic divisions}}$',
    note: 'Stopping after the first zero remainder: a repeated root only shows up if you divide the quotient by the same $(x - r)$ again.',
    explanation: [
      'Example: $p(x) = x^3 - 3x + 2 = (x - 1)^2(x + 2)$. Dividing by $(x - 1)$ gives remainder $0$ and $q_1 = x^2 + x - 2$; dividing $q_1$ by $(x - 1)$ gives remainder $0$ again and $q_2 = x + 2$. Two zero remainders, so $x = 1$ is a double root.',
    ],
  },
  'Spring 2023 Q1(c)': {
    steps: [
      { t: 'The condition number measures how sensitive a problem’s output is to small changes in its input. For $u = f(x)$ the relative condition number is $\\left|\\dfrac{x f^{\\prime}(x)}{f(x)}\\right|$ — the ratio of the relative change in $f$ to the relative change in $x$.', m: '1 mark' },
      { t: 'A condition number near $1$ (or smaller) means a **well-conditioned** problem: the relative error of the answer is about the same as that of the data.', m: '1 mark' },
      { t: 'A large condition number means an **ill-conditioned** problem: small input errors (measurement or round-off) are amplified, so even an exact algorithm gives an inaccurate answer.', m: '1 mark' },
      { t: 'Significance: it is a property of the **problem**, not of the algorithm, so it tells you whether an inaccurate result is the method’s fault or unavoidable. Example: $f(x) = \\dfrac{1}{x - 1}$ has condition number $\\left|\\dfrac{x}{x - 1}\\right|$, which is huge near $x = 1$.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\text{condition number} = \\left|\\tfrac{x f^{\\prime}(x)}{f(x)}\\right|:\\ \\text{large} \\Rightarrow \\text{ill-conditioned, errors amplified}}$',
    note: 'Treating a large condition number as a fault of the method — no algorithm can cure an ill-conditioned problem.',
    explanation: [
      'Relative error out $\\approx$ condition number $\\times$ relative error in. That single relation is the reason the condition number matters: it predicts how many correct digits can possibly survive the calculation.',
    ],
  },
  'Spring 2023 Q1(d)': relativeError,
  'Spring 2023 Q1(f)': {
    steps: [
      { t: '(i) $(\\Delta - \\nabla)f(x) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$, and $\\delta^2 f(x) = \\delta f(x + \\tfrac{h}{2}) - \\delta f(x - \\tfrac{h}{2}) = f(x+h) - 2f(x) + f(x-h)$.', m: '1 mark' },
      { t: 'The two expressions are identical for every $f$, so $\\Delta - \\nabla \\equiv \\delta^2$.', m: '1 mark' },
      { t: '(ii) With $Ef(x) = f(x+h)$: $\\Delta = E - 1$ and $\\nabla = 1 - E^{-1}$. Then $\\nabla E = (1 - E^{-1})E = E - 1 = \\Delta$ and $E\\nabla = E(1 - E^{-1}) = E - 1 = \\Delta$.', m: '1 mark' },
      { t: 'With $\\delta = E^{1/2} - E^{-1/2}$: $\\delta E^{1/2} = (E^{1/2} - E^{-1/2})E^{1/2} = E - 1 = \\Delta$. Hence $\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}$.', m: '1 mark' },
    ],
    answer: '$\\boxed{\\Delta - \\nabla \\equiv \\delta^2, \\qquad \\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}}$',
    note: 'Writing $\\nabla = E^{-1} - 1$: the backward difference is $f(x) - f(x-h)$, so $\\nabla = 1 - E^{-1}$.',
    explanation: [
      'Expressing every operator through the shift $E$ turns the identities into ordinary algebra with powers of $E$; the operators commute, which is why $\\nabla E$ and $E\\nabla$ agree.',
    ],
  },
  'Spring 2023 Q2(a)': {
    steps: [
      { t: '$f(x) = e^x - 3x$: $f(1.5) = 4.4817 - 4.5 = -0.0183 < 0$ and $f(1.6) = 4.9530 - 4.8 = 0.1530 > 0$, so a root lies in $[1.5, 1.6]$.', m: '1 mark' },
      { t: 'Iteration 1: $c = 1.55$, $f(1.55) = 4.7115 - 4.65 = 0.0615 > 0$ — the root is in $[1.5, 1.55]$.', m: '1 mark' },
      { t: 'Iteration 2: $c = 1.525$, $f(1.525) = 4.5951 - 4.575 = 0.0201 > 0$ — the root is in $[1.5, 1.525]$.', m: '1 mark' },
      { t: 'Iteration 3: $c = 1.5125$, $f(1.5125) = 4.5381 - 4.5375 = 0.0006 > 0$ — the root is in $[1.5, 1.5125]$.', m: '1 mark' },
      { t: 'Iteration 4: $c = 1.50625 \\approx 1.5063$, $f(1.5063) = 4.5098 - 4.5188 = -0.0090 < 0$ — the root is in $[1.5063, 1.5125]$, width $0.0063 < 0.01$.', m: '1 mark' },
      { t: 'Both ends of the bracket round to $1.51$, so to 2 decimal places the root is $x \\approx 1.51$ (further iterations close in on $1.5121$).', m: '1 mark' },
    ],
    answer: '$\\boxed{x \\approx 1.51}$',
    note: 'Keeping the wrong half: compare the sign of $f(c)$ with $f(a)$ — here $f(1.5) < 0$, so a positive $f(c)$ moves the right end down.',
    explanation: [
      'For 2 decimal places the bracket must be narrower than $0.01$ and both ends must round the same way. Starting from a width of $0.1$, four halvings give $0.1/2^4 = 0.00625$.',
    ],
  },
  'Spring 2023 Q2(b)': {
    steps: [
      { t: 'Dominance check: $|10| > |1| + |1|$, $|10| > |2| + |1|$, $|10| > |2| + |2|$ — diagonally dominant, so Gauss-Seidel converges.', m: '1 mark' },
      { t: 'Isolate: $x = \\tfrac{1}{10}(12 - y - z)$, $y = \\tfrac{1}{10}(13 - 2x - z)$, $z = \\tfrac{1}{10}(14 - 2x - 2y)$; each new value is used at once.', m: '1 mark' },
      { t: 'Iteration 1 from $(0, 0, 0)$: $x^{(1)} = \\tfrac{1}{10}(12) = 1.2$, $y^{(1)} = \\tfrac{1}{10}(13 - 2.4 - 0) = 1.06$, $z^{(1)} = \\tfrac{1}{10}(14 - 2.4 - 2.12) = 0.948$.', m: '1 mark' },
      { t: 'Iteration 2: $x^{(2)} = \\tfrac{1}{10}(12 - 1.06 - 0.948) = 0.9992$, $y^{(2)} = \\tfrac{1}{10}(13 - 1.9984 - 0.948) = 1.0054$, $z^{(2)} = \\tfrac{1}{10}(14 - 1.9984 - 2.0107) = 0.9991$.', m: '1 mark' },
      { t: 'Iteration 3: $x^{(3)} = \\tfrac{1}{10}(12 - 1.0054 - 0.9991) = 0.9996$, $y^{(3)} = \\tfrac{1}{10}(13 - 1.9991 - 0.9991) = 1.0002$, $z^{(3)} = \\tfrac{1}{10}(14 - 1.9991 - 2.0004) = 1.0001$.', m: '1 mark' },
      { t: 'Iteration 4: $x^{(4)} = 1.0000$, $y^{(4)} = 1.0000$, $z^{(4)} = 1.0000$ — iterations 3 and 4 agree to two decimal places, giving $x = y = z = 1.00$.', m: '1 mark' },
    ],
    answer: '$\\boxed{x = 1.00,\\ y = 1.00,\\ z = 1.00}$',
    note: 'Using the old $x$ when computing $y$ in the same iteration — that is Jacobi. Gauss-Seidel uses $x^{(k)}$ as soon as it is found.',
    explanation: [
      'Strong diagonal dominance (each diagonal is more than twice the rest of its row) is why the iteration settles in three or four sweeps. Check: $10 + 1 + 1 = 12$, $2 + 10 + 1 = 13$, $2 + 2 + 10 = 14$ ✓.',
    ],
  },
  'Spring 2023 Q2(c)': {
    steps: [
      { t: '$f(x) = x^3 - 8x - 4$: $f(3) = 27 - 24 - 4 = -1$, $f(4) = 64 - 32 - 4 = 28$, so a root lies in $[3, 4]$. Take $x_0 = 3$, $x_1 = 4$ and $x_{i+1} = x_i - f(x_i)\\dfrac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}$.', m: '1 mark' },
      { t: '$x_2 = 4 - 28\\dfrac{4 - 3}{28 - (-1)} = \\dfrac{3(28) - 4(-1)}{28 - (-1)} = \\dfrac{88}{29} = 3.0345$; $f(3.0345) = -0.3341$. $E_a = |3.0345 - 4| = 0.9655$.', m: '1 mark' },
      { t: '$x_3 = 3.0345 - (-0.3341)\\dfrac{3.0345 - 4}{-0.3341 - 28} = \\dfrac{4(-0.3341) - 3.0345(28)}{-0.3341 - 28} = 3.0459$; $f(3.0459) = -0.1095$. $E_a = 0.0114 > 0.01$.', m: '1 mark' },
      { t: '$x_4 = \\dfrac{3.0345(-0.1095) - 3.0459(-0.3341)}{-0.1095 - (-0.3341)} = 3.0514$; $f(3.0514) \\approx 0$.', m: '1 mark' },
      { t: '$E_a = |x_4 - x_3| = |3.0514 - 3.0459| = 0.0055 \\le 0.01$ — stop.', m: '1 mark' },
      { t: 'The root is $x \\approx 3.0514$.', m: '1 mark' },
    ],
    answer: '$\\boxed{x \\approx 3.0514}$',
    note: 'Stopping at $x_3$: $|x_3 - x_2| = 0.0114$ is still above $0.01$, so one more iteration is needed.',
    explanation: [
      'The secant method needs no derivative: each step replaces the tangent of Newton’s method with the chord through the last two points. Write $E_a$ after every iteration so the examiner sees why you stopped.',
    ],
  },
  'Spring 2023 Q2(e)': {
    steps: [
      { t: 'A 2nd-order Lagrange polynomial needs three points; take the three nearest $y = 55000$: $y_0 = 30000$, $y_1 = 60000$, $y_2 = 90000$ with $g = 9.7487, 9.6879, 9.6278$.', m: '1 mark' },
      { t: '$L_0 = \\dfrac{(55000 - 60000)(55000 - 90000)}{(30000 - 60000)(30000 - 90000)} = \\dfrac{(-5000)(-35000)}{(-30000)(-60000)} = 0.09722$.', m: '1 mark' },
      { t: '$L_1 = \\dfrac{(55000 - 30000)(55000 - 90000)}{(60000 - 30000)(60000 - 90000)} = \\dfrac{(25000)(-35000)}{(30000)(-30000)} = 0.97222$.', m: '1 mark' },
      { t: '$L_2 = \\dfrac{(55000 - 30000)(55000 - 60000)}{(90000 - 30000)(90000 - 60000)} = \\dfrac{(25000)(-5000)}{(60000)(30000)} = -0.06944$. (Check: $L_0 + L_1 + L_2 = 1$.)', m: '1 mark' },
      { t: '$g = 9.7487(0.09722) + 9.6879(0.97222) + 9.6278(-0.06944) = 0.9478 + 9.4188 - 0.6686 = 9.6980$.', m: '1 mark' },
      { t: 'So $g(55000) \\approx 9.70$ m/s².', m: '1 mark' },
    ],
    answer: '$\\boxed{g(55000) \\approx 9.6980 \\approx 9.70 \\text{ m/s}^2}$',
    note: 'Using all five points (that is a 4th-order polynomial) or three points that do not surround $55000$. The question fixes the order at 2.',
    explanation: [
      'The weights $L_i$ always add up to $1$, which is a quick check before multiplying by the $g$-values. Choosing the three points around the target keeps the interpolation error small.',
    ],
  },
  'Spring 2023 Q2(f)': {
    steps: [
      { t: 'Total paid = sum of fare $\\times$ distance: $18x + 7y + 9z = 165$, $8x + 17y + 7z = 170$, $10x + 9y + 20z = 180$. Augmented matrix $\\left[\\begin{array}{ccc|c} 18 & 7 & 9 & 165 \\\\ 8 & 17 & 7 & 170 \\\\ 10 & 9 & 20 & 180 \\end{array}\\right]$.', m: '1 mark' },
      { t: '$R_2^{\\prime} = R_2 - \\frac{8}{18}R_1 = [\\ 0 \\quad \\tfrac{125}{9} \\quad 3 \\mid \\tfrac{870}{9}\\ ] = [\\ 0 \\quad 13.8889 \\quad 3 \\mid 96.6667\\ ]$.', m: '1 mark' },
      { t: '$R_3^{\\prime} = R_3 - \\frac{10}{18}R_1 = [\\ 0 \\quad \\tfrac{46}{9} \\quad 15 \\mid \\tfrac{795}{9}\\ ] = [\\ 0 \\quad 5.1111 \\quad 15 \\mid 88.3333\\ ]$.', m: '1 mark' },
      { t: '$R_3^{\\prime\\prime} = R_3^{\\prime} - \\tfrac{46}{125}R_2^{\\prime} = [\\ 0 \\quad 0 \\quad 13.896 \\mid 52.76\\ ]$ — upper triangular (no zero pivot, so no pivoting).', m: '1 mark' },
      { t: 'Back substitution: $z = \\dfrac{52.76}{13.896} = 3.7968$; $y = \\dfrac{96.6667 - 3z}{13.8889} = 6.1399$; $x = \\dfrac{165 - 7y - 9z}{18} = 4.8805$.', m: '1 mark' },
      { t: 'Check in equation 2: $8(4.8805) + 17(6.1399) + 7(3.7968) = 39.044 + 104.378 + 26.578 = 170.0$ ✓. So $x \\approx 4.88$, $y \\approx 6.14$, $z \\approx 3.80$.', m: '1 mark' },
    ],
    answer: '$\\boxed{x \\approx 4.88,\\ y \\approx 6.14,\\ z \\approx 3.80}$',
    note: 'Writing only “$R_2 \\to R_2 - \\tfrac{8}{18}R_1$” without the resulting row costs marks (the teacher’s rule): write the row it produces every time.',
    explanation: [
      'Each tourist gives one equation: what they paid per unit distance times the distances, summed. The teacher’s rule applies — no zero pivot appears, so plain Gauss elimination without pivoting is the expected method.',
    ],
  },
  'Spring 2023 Q2(g)': {
    steps: [
      { t: 'The times are **not equally spaced** ($0.88$ s before $t = 3.25$, $0.58$ s after), so the $h$-based difference formulas do not apply. Fit Newton’s divided-difference quadratic through $(2.37, 261)$, $(3.25, 271)$, $(3.83, 273)$ and differentiate it.', m: '1 mark' },
      { t: '$p_2(t) = a_0 + a_1(t - t_0) + a_2(t - t_0)(t - t_1)$, so $p_2^{\\prime}(t) = a_1 + a_2[(t - t_0) + (t - t_1)]$ and $p_2^{\\prime\\prime}(t) = 2a_2$.', m: '1 mark' },
      { t: '$a_1 = f[t_0, t_1] = \\dfrac{271 - 261}{3.25 - 2.37} = 11.3636$, $f[t_1, t_2] = \\dfrac{273 - 271}{3.83 - 3.25} = 3.4483$, $a_2 = f[t_0, t_1, t_2] = \\dfrac{3.4483 - 11.3636}{3.83 - 2.37} = -5.4215$.', m: '2 marks' },
      { t: 'Velocity at $t = t_1 = 3.25$: $v = a_1 + a_2(t_1 - t_0) = 11.3636 + (-5.4215)(0.88) = 6.593$ m/s.', m: '1 mark' },
      { t: 'Acceleration: $a = 2a_2 = 2(-5.4215) = -10.843$ m/s².', m: '1 mark' },
    ],
    answer: '$\\boxed{v(3.25) \\approx 6.593 \\text{ m/s},\\ a(3.25) \\approx -10.843 \\text{ m/s}^2}$',
    note: 'Dividing $273 - 261$ by $1.46$ or using $\\frac{x_{i+1} - 2x_i + x_{i-1}}{h^2}$ with a made-up $h$ treats the table as evenly spaced — it is not.',
    explanation: [
      'For unequal spacing, differentiate an interpolating polynomial instead of using a fixed-$h$ formula. At $t = t_1$ the term $(t - t_1)$ vanishes, which is why the velocity is just $a_1 + a_2(t_1 - t_0)$.',
    ],
  },
  'Spring 2023 Q2(h)': {
    steps: [
      { t: 'Euler’s method: $y_{n+1} = y_n + h\\,f(x_n, y_n)$ with $f(x, y) = x^3 + y$, $h = 0.01$, $x_0 = 0$, $y_0 = 1$.', m: '1 mark' },
      { t: '$y_1 = 1 + 0.01(0^3 + 1) = 1.01$ at $x_1 = 0.01$.', m: '1 mark' },
      { t: '$y_2 = 1.01 + 0.01(0.01^3 + 1.01) = 1.0201$ at $x_2 = 0.02$.', m: '1 mark' },
      { t: '$y_3 = 1.0201 + 0.01(0.02^3 + 1.0201) = 1.0303$ at $x_3 = 0.03$.', m: '1 mark' },
      { t: '$y_4 = 1.0303 + 0.01(0.03^3 + 1.0303) = 1.0406$ at $x_4 = 0.04$.', m: '1 mark' },
      { t: 'So $y(0.04) \\approx 1.0406$ after four steps of size $0.01$.', m: '1 mark' },
    ],
    answer: '$\\boxed{y(0.04) \\approx 1.0406}$',
    note: 'Taking one step of $h = 0.04$: the question fixes $h = 0.01$, so four steps are needed to reach $x = 0.04$.',
    explanation: [
      'Not in your slides or notes: Euler’s method is taught here with the standard textbook formula. Each step follows the slope at the start of the step, so the method is first-order accurate.',
    ],
  },
  'Spring 2023 Q3(b)': {
    steps: [
      { t: 'The seven readings $(l_0, F_0), \\dots, (l_6, F_6)$ divide the height into six strips of width $h$. The total force is $I = \\int_{l_0}^{l_6} F\\,dl$.', m: '1 mark' },
      { t: 'Single trapezoidal rule on one strip: $\\int_{l_i}^{l_{i+1}} F\\,dl \\approx \\dfrac{h}{2}(F_i + F_{i+1})$.', m: '1 mark' },
      { t: 'Add the six strips: $I \\approx \\dfrac{h}{2}[(F_0 + F_1) + (F_1 + F_2) + (F_2 + F_3) + (F_3 + F_4) + (F_4 + F_5) + (F_5 + F_6)]$.', m: '1 mark' },
      { t: 'Each interior ordinate $F_1, \\dots, F_5$ belongs to two strips and appears twice: $I \\approx \\dfrac{h}{2}[F_0 + 2F_1 + 2F_2 + 2F_3 + 2F_4 + 2F_5 + F_6]$.', m: '1 mark' },
      { t: 'So $I = \\dfrac{h}{2}\\left(F_0 + 2\\sum_{i=1}^{5} F_i + F_6\\right)$.', m: '1 mark' },
      { t: 'The paper prints the sum from $i = 2$: that is a misprint — $F_1$ is shared by $[l_0, l_1]$ and $[l_1, l_2]$ and must be doubled like the others. Say so in one line.', m: '1 mark' },
    ],
    answer: '$\\boxed{I = \\frac{h}{2}\\left(F_0 + 2\\sum_{i=1}^{5}F_i + F_6\\right)}$',
    note: 'Copying the paper’s $\\sum_{i=2}^{5}$ — it leaves out one doubled ordinate. Point out the misprint rather than force the proof to match it.',
    explanation: [
      'The composite rule is just the single trapezoid repeated: the end ordinates belong to one strip each and the interior ordinates to two. With $n$ strips the general form is $\\frac{h}{2}[F_0 + 2(F_1 + \\cdots + F_{n-1}) + F_n]$.',
    ],
  },
  'Spring 2023 Q3(d)': {
    steps: [
      { t: 'Euler’s method uses only the slope at the start of the interval: $y_{n+1} = y_n + h f(x_n, y_n)$. When the slope changes across the step this misses the curve; its global error is $O(h)$.', m: '1 mark' },
      { t: 'Heun’s method first takes an Euler **predictor** step: $y^{*}_{n+1} = y_n + h f(x_n, y_n)$.', m: '1 mark' },
      { t: 'It then **corrects** using the average of the slopes at the two ends: $y_{n+1} = y_n + \\dfrac{h}{2}\\left[f(x_n, y_n) + f(x_{n+1}, y^{*}_{n+1})\\right]$.', m: '1 mark' },
      { t: 'Principle: $y_{n+1} = y_n + \\int_{x_n}^{x_{n+1}} f\\,dx$, and averaging the end slopes is the trapezoidal rule for this integral. The trapezoidal rule alone would be implicit ($y_{n+1}$ on both sides); the Euler predictor makes Heun explicit.', m: '2 marks' },
      { t: 'Accuracy: the local error drops from $O(h^2)$ to $O(h^3)$, so the global error is $O(h^2)$ instead of Euler’s $O(h)$ — halving $h$ quarters the error. It is also called the improved Euler or predictor-corrector method.', m: '1 mark' },
    ],
    answer: '$\\boxed{y_{n+1} = y_n + \\frac{h}{2}\\left[f(x_n, y_n) + f(x_{n+1}, y_n + h f(x_n, y_n))\\right],\\ \\text{global error } O(h^2)}$',
    note: 'Using the predicted value $y^{*}$ as the answer: it is only used to estimate the end slope; the corrected $y_{n+1}$ is the result.',
    explanation: [
      'Not in your slides or notes: Heun’s method is taught here from the standard textbook account. The idea to remember is “average slope beats starting slope” — the same reason the trapezoidal rule beats the rectangle rule.',
    ],
  },
  'Spring 2023 Q3(e)': gaussSeidelProof,
};
