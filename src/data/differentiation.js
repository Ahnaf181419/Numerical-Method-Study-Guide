// Chapter 8 — Numerical Differentiation (Shanker Rao Ch. 8 + Balagurusamy Ch. 11).
// Every number in `examples` was checked against src/lib/solvers.js.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Numerical differentiation exists because…",
    options: ["derivatives are too hard to compute exactly", "data often arrives as tables, so no formula exists to differentiate", "tables are always more accurate", "the chain rule fails for polynomials"],
    answer: 1,
    explain: "Rules like the power rule need a formula; a position-time table has none, so slopes must be built from the data itself.",
  },
  "Start here: the core idea": {
    q: "Why is the central difference preferred in a table's interior?",
    options: ["It uses fewer data points", "Its leading error cancels, giving $O(h^2)$ accuracy instead of $O(h)$", "It works without knowing $h$", "It never overestimates"],
    answer: 1,
    explain: "Balancing the slope on both sides cancels the curve-bend error's leading term — same data, better league of accuracy.",
  },
  "Start here: reading the symbols": {
    q: "An $O(h^2)$ formula's error when $h$ is halved becomes…",
    options: ["half as large", "a quarter as large", "twice as large", "unchanged"],
    answer: 1,
    explain: "Error scales with $h^2$: halving $h$ multiplies the error by $(1/2)^2 = 1/4$.",
  },
  "Start here: your first walk-through": {
    q: "$t = 0$ is the first row of the rocket table. Which formulas did the walk-through use there, and why?",
    options: ["Central — most accurate", "Forward — no data exists above the first row", "Backward — the table ends there", "Richardson — always required"],
    answer: 1,
    explain: "Central and backward formulas need rows that do not exist at the top edge, so the forward three- and four-point formulas are the only legal choice — and saying so earns the justification mark.",
  },
  'Why numerical differentiation': {
    q: 'Numerical differentiation is needed when …',
    options: [
      'the function is known in closed form and is easy to differentiate',
      'only a table of function values is known, or the function is too complicated to differentiate analytically',
      'the antiderivative of the function cannot be found',
      'the arguments are equally spaced',
    ],
    answer: 1,
    explain:
      'Shanker Rao Ch. 8 and Balagurusamy Ch. 11 both give the same two situations: the function values are known at a discrete set of points but the function itself is unknown (a *tabulated function*), or the function is known but so complicated that analytic differentiation is difficult or impossible. Equally spaced arguments only decide *which* finite-difference formula you use — they are not the reason for numerical differentiation.',
  },

  'Two-point forward and backward differences': {
    q: 'The two-point forward difference quotient $f\'(x) \\approx \\frac{f(x+h)-f(x)}{h}$ has truncation error …',
    options: [
      '$E_t = -\\frac{h}{2}f\'\'(\\theta)$, so it is $O(h)$',
      '$E_t = -\\frac{h^2}{6}f\'\'\'(\\theta)$, so it is $O(h^2)$',
      '$E_t = -\\frac{h^2}{12}f^{(4)}(\\theta)$, so it is $O(h^2)$',
      '$E_t = +\\frac{h^4}{30}f^{(5)}(\\theta)$, so it is $O(h^4)$',
    ],
    answer: 0,
    explain:
      'Taylor\'s theorem with one extra term, $f(x+h) = f(x) + h f\'(x) + \\frac{h^2}{2}f\'\'(\\theta)$, gives $f\'(x) = \\frac{f(x+h)-f(x)}{h} - \\frac{h}{2}f\'\'(\\theta)$. The error is linear in $h$, so the two-point formula is **first order** only. The backward version carries $+\\frac{h}{2}f\'\'(\\theta)$.',
  },

  'Three-point forward and backward differences': {
    q: 'The three-point forward difference formula is …',
    options: [
      '$f\'(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}$',
      '$f\'(x) \\approx \\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$',
      '$f\'(x) \\approx \\frac{f(x+2h)-2f(x+h)+f(x)}{h^2}$',
      '$f\'(x) \\approx \\frac{3f(x)-4f(x-h)+f(x-2h)}{2h}$',
    ],
    answer: 1,
    explain:
      'Fitting a **quadratic** through $x,\\ x+h,\\ x+2h$ and differentiating gives $\\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$ — the three-point forward difference, truncation error $+\\frac{h^2}{3}f\'\'\'(\\theta)$, i.e. $O(h^2)$. Option 1 is the three-point **central** difference, option 3 is the second-derivative formula, option 4 is the three-point **backward** difference.',
  },

  'Central difference formulas': {
    q: 'The five-point central difference formula $\\frac{-f(x+2h)+8f(x+h)-8f(x-h)+f(x-2h)}{12h}$ is accurate to …',
    options: ['$O(h)$', '$O(h^2)$', '$O(h^3)$', '$O(h^4)$'],
    answer: 3,
    explain:
      'Adding one more row on each side of $x$ gives the five-point central difference (Balagurusamy Eq. 11.10). Its truncation error is $+\\frac{h^4}{30}f^{(5)}(\\theta)$, so it is **fourth order** — exact for polynomials of degree up to four. The three-point central difference $\\frac{f(x+h)-f(x-h)}{2h}$ is only $O(h^2)$.',
  },

  'Second and higher derivatives': {
    q: 'The three-point central difference for the second derivative is …',
    options: [
      '$f\'\'(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}$',
      '$f\'\'(x) \\approx \\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$',
      '$f\'\'(x) \\approx \\frac{f(x+2h)-2f(x)+f(x-2h)}{2h^2}$',
      '$f\'\'(x) \\approx \\frac{f(x+h)-f(x-h)}{h^2}$',
    ],
    answer: 1,
    explain:
      'Add the two Taylor expansions of $f(x+h)$ and $f(x-h)$: the odd powers cancel and $f(x+h)+f(x-h) = 2f(x) + h^2 f\'\'(x) + \\frac{h^4}{12}f^{(4)}(x) + \\cdots$. Solving for $f\'\'$ gives $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$ with truncation error $-\\frac{h^2}{12}f^{(4)}(\\theta)$, i.e. $O(h^2)$.',
  },

  'Truncation error: the Taylor proof': {
    q: 'Subtracting the Taylor expansions of $f(x+h)$ and $f(x-h)$ leaves only …',
    options: [
      'even powers of $h$, giving an $O(h^2)$ error in $f\'$',
      'odd powers of $h$, giving an $O(h^2)$ error in $f\'$',
      'even powers of $h$, giving an $O(h^4)$ error in $f\'$',
      'no remainder term at all',
    ],
    answer: 1,
    explain:
      '$f(x+h)-f(x-h) = 2h f\'(x) + \\frac{h^3}{3}f\'\'\'(x) + O(h^5)$ — the even powers cancel. Dividing by $2h$ leaves an error term $\\frac{h^2}{6}f\'\'\'(x)$, so the second-order central difference has truncation error $O(h^2)$. (Adding the two expansions instead leaves the even powers and gives the $O(h^2)$ error of the second-derivative formula.)',
  },

  'Richardson extrapolation': {
    q: 'Richardson extrapolation applied to a central difference $D(h) = f\'(x) + ch^2 + O(h^4)$ gives …',
    options: [
      '$R = \\frac{2D(h/2)-D(h)}{1}$, still $O(h^2)$',
      '$R = \\frac{4D(h/2)-D(h)}{3} = f\'(x) + O(h^4)$',
      '$R = \\frac{D(h/2)-D(h)}{2} = f\'(x) + O(h^2)$',
      '$R = \\frac{4D(h)-D(h/2)}{3} = f\'(x) + O(h^4)$',
    ],
    answer: 1,
    explain:
      '$D(h/2) = f\'(x) + \\frac{ch^2}{4} + O(h^4)$, so $4D(h/2)-D(h) = 3f\'(x) + O(h^4)$ — the $ch^2$ term is eliminated exactly and the error jumps from $O(h^2)$ to $O(h^4)$.',
  },

  'Choosing a formula at each point of a table': {
    q: 'At the **last** row of a table of equally spaced ordinates you must use …',
    options: [
      'the three-point forward difference, because it is the most accurate',
      'the three-point central difference, because the last row is a middle row',
      'the three-point backward difference, because there is no data ahead of the last row',
      'the two-point forward difference, because it needs the fewest ordinates',
    ],
    answer: 2,
    explain:
      'A forward formula reads rows *ahead* of the point, so at the last row there is nothing ahead to read — the difference must be taken **backwards**. The three-point backward difference $\\frac{3f_n-4f_{n-1}+f_{n-2}}{2h}$ is $O(h^2)$; the two-point backward difference would only be $O(h)$.',
  },

  "Heun's method for ordinary differential equations": {
    q: "Heun's method improves on Euler's method because …",
    options: [
      'it uses a smaller step size for the same accuracy',
      'it corrects the slope at the end of the step, so the increment is the area of a trapezoid and the global error becomes $O(h^2)$',
      'it eliminates the need to evaluate $f$ at every step',
      'it starts from a better initial guess',
    ],
    answer: 1,
    explain:
      "Euler takes the slope only at the left end of the step (the rectangle rule), so its global error is $O(h)$. Heun predicts with Euler and then corrects using the average of the start and end slopes — the trapezoid rule for the increment — which removes the $O(h^2)$ local error and leaves a global error of $O(h^2)$, at the cost of two function evaluations per step.",
  },
};

export default {
  id: 'differentiation',
  chapter: 8,
  title: 'Numerical Differentiation',
  wave: 'deriv',
  sources: ['Balagurusamy Ch 11', 'Shanker Rao Ch 8'],
  flagged: true,
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Velocity is the derivative of position. Acceleration is the derivative of velocity. But a flight recorder hands you **positions sampled every few seconds** — no formula $s(t)$ anywhere — and the exam still asks: how fast was it going at $t = 50$ s? How hard was it accelerating?" },
        { type: "p", text: "Differentiation by rules needs a formula. When only a table exists, the derivative is estimated from the data's **slopes**: that is numerical differentiation, and it is the bridge between any position-time table and the velocity-acceleration questions built on it." },
        { type: "p", text: "The whole chapter is three slope formulas (forward, backward, central — each knowing its place), their second-derivative partners, and the Richardson trick that squeezes two rough estimates into a much better one." },
        { type: "list", items: [
          "Pick the correct formula for a row's position in the table (edge vs interior).",
          "Estimate first and second derivatives from tabulated data.",
          "Know why central differences beat one-sided ones.",
          "Use Richardson extrapolation to sharpen an estimate.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "A derivative is a slope, and the slope most visible in a table is the **rise over run between neighbouring rows**: $\\frac{y_{i+1} - y_i}{h}$. With equal spacing $h$, that single fraction is the atom the whole chapter is built from." },
        { type: "p", text: "At the **top edge** of a table only the row below exists — use the forward slope. At the **bottom edge** only the row above exists — use the backward slope. In the **interior**, average the two into the central difference:" },
        { type: "math", tex: "f'(x_i) \\approx \\frac{y_{i+1} - y_i}{h} \\;(\\text{forward}), \\qquad \\frac{y_i - y_{i-1}}{h} \\;(\\text{backward}), \\qquad \\frac{y_{i+1} - y_{i-1}}{2h} \\;(\\text{central})" },
        { type: "note", text: "Why prefer central when you can: the one-sided slopes lean on the curve's bend on one side only, giving $O(h)$ error; the central slope balances the two sides and the leading error cancels, leaving $O(h^2)$. Same data, dramatically better answer." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$h$", "equal spacing between table rows", "step size"],
          ["$y_i$", "the table value at row $i$", "the ordinate"],
          ["$\\frac{y_{i+1} - y_i}{h}$", "forward-difference slope", "looks down the table"],
          ["$\\frac{y_i - y_{i-1}}{h}$", "backward-difference slope", "looks up the table"],
          ["$\\frac{y_{i+1} - y_{i-1}}{2h}$", "central-difference slope", "straddles the row"],
          ["$\\frac{y_{i+1} - 2y_i + y_{i-1}}{h^2}$", "central second derivative", "slope of the slope"],
          ["$O(h)$, $O(h^2)$", "how the error shrinks as $h$ shrinks", "the accuracy league table"],
        ] },
        { type: "p", text: "Smaller $h$ means closer rows — and (up to rounding noise) smaller error; the $O(\\cdot)$ tag tells you how much smaller per halving: $O(h)$ halves the error, $O(h^2)$ quarters it." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Fall 2024 Q2(c)**: a rocket's distance is tabulated every 25 s — $t = 0, 25, \\ldots, 125$ against $s = 0, 32, 58, 78, 92, 100$ km. Estimate the velocity and acceleration at $t = 0$ s and $t = 50$ s." },
        { type: "p", text: "**$t = 0$ is the first row** — no data above it, so forward formulas: $v(0) = \\frac{-3s(0) + 4s(25) - s(50)}{2h} = \\frac{0 + 128 - 58}{50} = 1.4$ km/s, and the four-point forward second derivative gives $a(0) = \\frac{2(0) - 5(32) + 4(58) - 78}{625} = -0.0096$ km/s²." },
        { type: "p", text: "**$t = 50$ is an interior row** — central formulas: $v(50) = \\frac{s(75) - s(25)}{2h} = \\frac{78 - 32}{50} = 0.92$ km/s. Position by position the table dictates the formula, and saying so earns the justification marks. **Asked in:** the same table question returns as Spring 2024 Q2(g) (vehicle) and Spring 2023 Q2(g) (jet fighter); the formula derivations are Fall 2023 Q1(e) and Spring 2023 Q1(e)." },
        { type: "exam", text: "For each requested instant, name the row's position in the table and therefore the formula chosen — then substitute with $h$ shown." },
      ],
    },
    {
      heading: 'Why numerical differentiation',
      blocks: [
        {
          type: 'p',
          text: '**Numerical differentiation** means computing the value of $\\frac{dy}{dx}$ at a given $x$ **from data**, when the actual form of the function $y = f(x)$ is not known (Shanker Rao, Ch. 8).',
        },
        {
          type: 'p',
          text: 'Balagurusamy (Ch. 11) gives exactly **two** situations in which we are forced to differentiate numerically:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'The **values** of the function are known at a discrete set of points, but the function itself is unknown. Such a function is called a **tabulated function**.',
            'The function **is** known, but it is so complicated that an analytic differentiation is difficult (or impossible).',
          ],
        },
        {
          type: 'p',
          text: 'The classic example is a table of distance $s$ against time $t$. The calculus answer would be $v = \\frac{ds}{dt}$, but with only a table of readings we must estimate the slope and the curvature of the curve **numerically** — and that is exactly what the past papers ask for.',
        },
        {
          type: 'p',
          text: "Shanker Rao's route is: fit an interpolation polynomial to the tabulated values and differentiate **that** polynomial. Which polynomial you use depends on where the point you want sits in the table:",
        },
        {
          type: 'list',
          items: [
            'near the **beginning** of the table → the Newton–Gregory **forward** interpolation formula,',
            'near the **end** of the table → the Newton\'s **backward** interpolation formula,',
            'in the **middle** of the table → a suitable **central difference** formula,',
            'unequally spaced $x$ → the Newton\'s **divided difference** formula.',
          ],
        },
        {
          type: 'exam',
          text: 'Fall 2024 Q1(e) asks: "Explain the necessity of numerical differentiation." Write three short paragraphs: **(1)** the derivative is needed to find the rate of change of measured data — velocity from a distance–time table, gradient from an elevation table, acceleration from a second difference; **(2)** the function is not available in closed form — only a table of values exists, or the function is too complicated to differentiate analytically; **(3)** so we replace $f(x)$ by an interpolation polynomial and differentiate that, which is precisely the finite-difference formulas below. Keep it to the definition, the two situations, and one line on interpolation + differentiation replacing calculus.',
        },
      ],
    },

    {
      heading: 'Two-point forward and backward differences',
      blocks: [
        {
          type: 'p',
          text: "Start from Taylor's theorem with one extra term. For a small increment $h$,",
        },
        {
          type: 'math',
          tex: "f(x + h) = f(x) + h f'(x) + \\frac{h^2}{2}f''(\\theta), \\qquad x \\le \\theta \\le x + h",
        },
        {
          type: 'p',
          text: 'Rearranging gives the **two-point forward difference quotient** (Balagurusamy calls it the first-order forward difference quotient, also known as the two-point formula):',
        },
        {
          type: 'math',
          tex: "f'(x) = \\frac{f(x + h) - f(x)}{h} - \\frac{h}{2}f''(\\theta) \\quad\\Longrightarrow\\quad f'(x) \\approx \\frac{f(x + h) - f(x)}{h}",
        },
        {
          type: 'p',
          text: "Its truncation error is $E_t(h) = -\\frac{h}{2}f''(\\theta)$, so it is only **first order** accurate, $O(h)$.",
        },
        {
          type: 'p',
          text: 'The mirror image at the other end of the table is the **two-point backward difference quotient**:',
        },
        {
          type: 'math',
          tex: "f'(x) = \\frac{f(x) - f(x - h)}{h} + \\frac{h}{2}f''(\\theta) \\quad\\Longrightarrow\\quad f'(x) \\approx \\frac{f(x) - f(x - h)}{h}",
        },
        {
          type: 'p',
          text: "Its truncation error is $E_t(h) = +\\frac{h}{2}f''(\\theta)$ — also $O(h)$.",
        },
        {
          type: 'note',
          text: 'Both two-point formulas need only **two** ordinates, but they are merely $O(h)$ accurate: halving $h$ only halves the error. They are also very sensitive to round-off, because the table is usually given to only four or five digits.',
        },
        {
          type: 'p',
          text: '**Numerical differentiation is very sensitive to round-off.** If each ordinate carries a round-off error of size $e$, the two-point formula adds the term $\\frac{e_1 - e_0}{h}$, so the round-off part of the error grows like $\\frac{2e}{h}$ as $h \\to 0$. Total error:',
        },
        {
          type: 'math',
          tex: "|E(h)| \\le \\frac{M_2 h}{2} + \\frac{2e}{h}, \\qquad M_2 = \\max_{x \\le \\theta \\le x+h} |f''(\\theta)|",
        },
        {
          type: 'math',
          tex: "h_{opt} = 2\\sqrt{\\frac{e}{M_2}}, \\qquad E(h_{opt}) = 2\\sqrt{eM_2}",
        },
        {
          type: 'p',
          text: 'Truncation error falls as $h$ shrinks; round-off error rises. The total error therefore has a **minimum** at $h_{opt}$ — that is the answer if the question asks for the best step size.',
        },
        {
          type: 'table',
          head: ['Formula', 'Ordinates needed', 'Truncation error', 'Order'],
          rows: [
            ['Two-point forward $\\frac{f(x+h)-f(x)}{h}$', '$x,\\ x+h$', "$-\\frac{h}{2}f''(\\theta)$", '$O(h)$'],
            ['Two-point backward $\\frac{f(x)-f(x-h)}{h}$', '$x-h,\\ x$', "$+\\frac{h}{2}f''(\\theta)$", '$O(h)$'],
            ['Three-point forward $\\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$', '$x,\\ x+h,\\ x+2h$', "$+\\frac{h^2}{3}f'''(\\theta)$", '$O(h^2)$'],
            ['Three-point central $\\frac{f(x+h)-f(x-h)}{2h}$', '$x-h,\\ x+h$', "$-\\frac{h^2}{6}f'''(\\theta)$", '$O(h^2)$'],
            ['Five-point central $\\frac{-f(x+2h)+8f(x+h)-8f(x-h)+f(x-2h)}{12h}$', '$x-2h,\\dots,x+2h$', "$+\\frac{h^4}{30}f^{(5)}(\\theta)$", '$O(h^4)$'],
          ],
        },
        {
          type: 'exam',
          text: 'When the question says "estimate the velocity at $t = 0$ from the table", write the **formula first**, then substitute: $v(0) = \\frac{s(25) - s(0)}{25}$. Always state $h$, state which formula you picked and **why** (first row / middle / last row), then substitute and box the answer with its units. Use the three-point version at an end row unless the question explicitly asks for the simplest formula.',
        },
      ],
    },

    {
      heading: 'Three-point forward and backward differences',
      blocks: [
        {
          type: 'p',
          text: 'To get a **second-order** formula we fit a **quadratic** through three ordinates instead of a straight line. Let $x_0 = x$, $x_1 = x + h$, $x_2 = x + 2h$ and write the interpolant as',
        },
        {
          type: 'math',
          tex: "p_2(x) = a_0 + a_1(x - x_0) + a_2(x - x_0)(x - x_1)",
        },
        {
          type: 'p',
          text: "Differentiating, $p_2'(x) = a_1 + a_2\\left[(x-x_0) + (x-x_1)\\right]$, so $f'(x) \\approx a_1 + a_2\\left[(x-x_0)+(x-x_1)\\right]$, where",
        },
        {
          type: 'math',
          tex: "a_1 = \\frac{f(x+h)-f(x)}{h}, \\qquad a_2 = f[x_0,x_1,x_2] = \\frac{f(x+2h) - 2f(x+h) + f(x)}{2h^2}",
        },
        {
          type: 'p',
          text: 'Substituting $x_0 = x$, $x_1 = x+h$ (so that $(x-x_0)+(x-x_1) = -h$) and simplifying gives the **three-point forward difference formula**:',
        },
        {
          type: 'math',
          tex: "f'(x) \\approx \\frac{-3f(x) + 4f(x+h) - f(x+2h)}{2h}",
        },
        {
          type: 'p',
          text: 'Replace $h$ by $-h$ to get the **three-point backward difference formula**:',
        },
        {
          type: 'math',
          tex: "f'(x) \\approx \\frac{3f(x) - 4f(x-h) + f(x-2h)}{2h}",
        },
        {
          type: 'p',
          text: "Both carry a truncation error $E_t(h) = +\\frac{h^2}{3}f'''(\\theta)$, so they are **second order**, $O(h^2)$ — twice as accurate as the two-point formulas for the same $h$.",
        },
        {
          type: 'p',
          text: "Balagurusamy's summary table (Table 11.1) lists the higher forward formulas too; their coefficients come straight from the forward-difference operator $\\Delta$:",
        },
        {
          type: 'math',
          tex: "\\frac{-11f_0 + 18f_1 - 9f_2 + 2f_3}{6h} \\; (O(h^3)), \\qquad \\frac{-25f_0 + 48f_1 - 36f_2 + 16f_3 - 3f_4}{12h} \\; (O(h^4))",
        },
        {
          type: 'note',
          text: 'The three-point forward difference needs **two rows ahead** of $x$. It can never be used at the last row of a table — there you must use the backward formula.',
        },
        {
          type: 'exam',
          text: 'Fall 2023 Q1(e) asks: "Derive the three-point forward difference formula for tabulated function in the context of numerical differentiation." Write: **(1)** the quadratic interpolant $p_2(x)$; **(2)** $p_2\'(x) = a_1 + a_2[(x-x_0)+(x-x_1)]$; **(3)** the values of $a_1$ and $a_2$ from the divided differences; **(4)** the substitution that gives the boxed formula; **(5)** one line on the truncation error $O(h^2)$.',
        },
      ],
    },

    {
      heading: 'Central difference formulas',
      blocks: [
        {
          type: 'p',
          text: 'The **three-point central difference** is simply the average of the forward and backward two-point formulas (Shanker Rao calls it the second-order central difference quotient):',
        },
        {
          type: 'math',
          tex: "f'(x) \\approx \\frac{f(x+h) - f(x-h)}{2h}, \\qquad E_t(h) = -\\frac{h^2}{6}f'''(\\theta) = O(h^2)",
        },
        {
          type: 'p',
          text: 'It reads the rows on **both sides** of $x$, it is $O(h^2)$ accurate, and — for the same $h$ — its error is only **half** the size of the three-point forward difference error, because $\\frac{h^2}{6} < \\frac{h^2}{3}$.',
        },
        {
          type: 'p',
          text: 'Adding one more row on each side gives the **five-point central difference formula** (Balagurusamy Eq. 11.10):',
        },
        {
          type: 'math',
          tex: "f'(x) \\approx \\frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}, \\qquad E_t(h) = +\\frac{h^4}{30}f^{(5)}(\\theta) = O(h^4)",
        },
        {
          type: 'p',
          text: 'The five-point formula is exact for polynomials of degree up to four and its error falls as $h^4$ — but it needs five ordinates, so it is usable only well inside a table.',
        },
        {
          type: 'table',
          head: ['Derivative', 'Central formula', 'Truncation error'],
          rows: [
            ["$f'(x_0)$", "$\\frac{-f_{-1}+f_1}{2h}$", "$-\\frac{h^2}{6}f'''(\\theta)$"],
            ["$f'(x_0)$", "$\\frac{f_{-2}-8f_{-1}+8f_1-f_2}{12h}$", "$+\\frac{h^4}{30}f^{(5)}(\\theta)$"],
            ["$f''(x_0)$", "$\\frac{f_{-1}-2f_0+f_1}{h^2}$", "$-\\frac{h^2}{12}f^{(4)}(\\theta)$"],
            ["$f'''(x_0)$", "$\\frac{-2f_{-2}+16f_{-1}-30f_0+16f_1-f_2}{h^2}$", "$+\\frac{h^4}{90}f^{(6)}(\\theta)$"],
          ],
        },
        {
          type: 'note',
          text: 'Do not confuse the **three-point central difference for $f\'$**, $\\frac{f(x+h)-f(x-h)}{2h}$, with the **three-point central difference for $f\'\'$**, $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$. The papers ask for both. Write the formula before substituting, so the examiner can see which one you used.',
        },
        {
          type: 'exam',
          text: 'To choose: at an **interior** row use the three-point central difference $\\frac{f(x+h)-f(x-h)}{2h}$; if the table has two rows on each side of $x$ and the question wants the best accuracy, use the five-point central difference; at the **first** row use the three-point forward formula; at the **last** row the three-point backward formula.',
        },
      ],
    },

    {
      heading: 'Second and higher derivatives',
      blocks: [
        {
          type: 'p',
          text: 'The same Taylor trick gives the **second derivative**. Write the expansions of $f(x+h)$ and $f(x-h)$ and **add** them:',
        },
        {
          type: 'math',
          tex: "f(x+h) + f(x-h) = 2f(x) + h^2 f''(x) + \\frac{h^4}{12}f^{(4)}(x) + \\cdots",
        },
        {
          type: 'p',
          text: 'so the **three-point central difference for the second derivative** is',
        },
        {
          type: 'math',
          tex: "f''(x) \\approx \\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}, \\qquad E_t(h) = -\\frac{h^2}{12}f^{(4)}(\\theta) = O(h^2)",
        },
        {
          type: 'p',
          text: 'At the **first row** of a table use the forward second-derivative formula (Balagurusamy Eq. 11.21) and at the **last row** the backward one (Eq. 11.22):',
        },
        {
          type: 'math',
          tex: "f''(x) \\approx \\frac{2f(x) - 5f(x+h) + 4f(x+2h) - f(x+3h)}{h^2}, \\qquad E_t = +\\frac{11h^2}{12}f^{(4)}(\\theta)",
        },
        {
          type: 'math',
          tex: "f''(x) \\approx \\frac{2f(x) - 5f(x-h) + 4f(x-2h) - f(x-3h)}{h^2}, \\qquad E_t = +\\frac{11h^2}{12}f^{(4)}(\\theta)",
        },
        {
          type: 'p',
          text: 'Higher derivatives follow by continuing the Taylor expansion; Balagurusamy\'s Table 11.2 lists, for example,',
        },
        {
          type: 'math',
          tex: "f'''(x) \\approx \\frac{-2f(x-2h) + 16f(x-h) - 30f(x) + 16f(x+h) - f(x+2h)}{h^2}, \\qquad O(h^4)",
        },
        {
          type: 'exam',
          text: 'Fall 2023 Q2(e) asks for the **second** derivative at $x = 0.5$ with $h = 0.01$ of $f(x) = \\frac{1}{1+x^2}$. Write the three-point central second-derivative formula, tabulate $f(0.49)$, $f(0.50)$ and $f(0.51)$, substitute, and then compute the true value from $f\'\'(x) = \\frac{6x^2 - 2}{(1+x^2)^3} = -0.256$ so that you can quote the error. Box both the estimate and the error.',
        },
      ],
    },

    {
      heading: 'Truncation error: the Taylor proof',
      blocks: [
        {
          type: 'p',
          text: 'A paper asks you to **prove** that the truncation error of the second-order central difference is $O(h^2)$. The proof is four lines of Taylor expansion — learn it once and it also gives you the five-point formula and the second-derivative formula.',
        },
        {
          type: 'math',
          tex: "f(x+h) = f(x) + h f'(x) + \\frac{h^2}{2}f''(x) + \\frac{h^3}{6}f'''(x) + O(h^4)",
        },
        {
          type: 'math',
          tex: "f(x-h) = f(x) - h f'(x) + \\frac{h^2}{2}f''(x) - \\frac{h^3}{6}f'''(x) + O(h^4)",
        },
        {
          type: 'p',
          text: '**Subtract** the two expansions. The even powers of $h$ cancel:',
        },
        {
          type: 'math',
          tex: "f(x+h) - f(x-h) = 2h f'(x) + \\frac{h^3}{3}f'''(x) + O(h^5)",
        },
        {
          type: 'p',
          text: 'Divide by $2h$ and rearrange:',
        },
        {
          type: 'math',
          tex: "\\frac{f(x+h)-f(x-h)}{2h} = f'(x) + \\frac{h^2}{6}f'''(x) + O(h^4)",
        },
        {
          type: 'p',
          text: "Hence the truncation error is $E_t(h) = -\\frac{h^2}{6}f'''(\\xi)$ for some $\\xi$ between $x-h$ and $x+h$. It is proportional to $h^2$, so the second-order central difference is **$O(h^2)$**.",
        },
        {
          type: 'note',
          text: 'Read the same proof backwards for the other formulas: **adding** instead of subtracting leaves only the even powers of $h$, and that is where the $O(h^2)$ error of the second-derivative formula comes from. Keeping one more term in each expansion gives the five-point central difference and its $O(h^4)$ error.',
        },
        {
          type: 'p',
          text: 'The **total** error is truncation error plus round-off error:',
        },
        {
          type: 'math',
          tex: "E(h) = E_r(h) + E_t(h), \\qquad |E(h)| \\le \\frac{M_2 h}{2} + \\frac{2e}{h} \\;\\text{(two-point forward)}, \\qquad E(h_{opt}) = 2\\sqrt{eM_2}",
        },
        {
          type: 'exam',
          text: 'Write the two Taylor expansions on consecutive lines, subtract them, divide by $2h$, and end with "$\\therefore$ the truncation error is proportional to $h^2$, so the formula is second order, $O(h^2)$." Do not skip the line where the even powers cancel — that is where the $O(h^2)$ comes from.',
        },
      ],
    },

    {
      heading: 'Richardson extrapolation',
      blocks: [
        {
          type: 'p',
          text: 'Every finite-difference formula carries an error of the form $ch^2 + \\cdots$. If we evaluate the **same** formula with two step sizes $h$ and $h/2$, the unknown $ch^2$ term can be eliminated exactly. That is **Richardson extrapolation**.',
        },
        {
          type: 'math',
          tex: "D(h) = f'(x) + c h^2 + O(h^4), \\qquad D(h/2) = f'(x) + \\frac{c h^2}{4} + O(h^4)",
        },
        {
          type: 'p',
          text: 'Take four times the fine value and subtract the coarse one; the $ch^2$ terms cancel:',
        },
        {
          type: 'math',
          tex: "4D(h/2) - D(h) = 3f'(x) + O(h^4)",
        },
        {
          type: 'math',
          tex: "R(h) = \\frac{4D(h/2) - D(h)}{3} = f'(x) + O(h^4)",
        },
        {
          type: 'p',
          text: 'So Richardson turns an $O(h^2)$ formula into an $O(h^4)$ formula — the accuracy of a five-point central difference — while still using only the central difference.',
        },
        {
          type: 'math',
          tex: "f'(x) \\approx \\frac{4D(h/2) - D(h)}{3}, \\qquad D(h) = \\frac{f(x+h)-f(x-h)}{2h}",
        },
        {
          type: 'note',
          text: 'Richardson extrapolation **for differentiation** is not in the Ch. 8 slides or the class notes. It appears in Ch. 9 as the engine of Romberg integration, and it is asked in Fall 2024 Q1(b) and Fall 2023 Q3(a). It is taught here with the standard textbook method.',
        },
        {
          type: 'exam',
          text: 'Fall 2024 Q1(b) asks you to "derive the Richardson extrapolation formula using the three-point central difference formula". Write: **(1)** $D(h) = f\'(x) + ch^2 + O(h^4)$; **(2)** $D(h/2) = f\'(x) + \\frac{ch^2}{4} + O(h^4)$; **(3)** $4D(h/2) - D(h) = 3f\'(x) + O(h^4)$; **(4)** the boxed formula $R = \\frac{4D(h/2)-D(h)}{3}$ with the statement that the error is now $O(h^4)$ instead of $O(h^2)$.',
        },
      ],
    },

    {
      heading: 'Choosing a formula at each point of a table',
      blocks: [
        {
          type: 'p',
          text: 'A table of $n+1$ equally spaced ordinates gives you a different formula at each row. Work down the table like this:',
        },
        {
          type: 'table',
          head: ['Row', "Formula to use for $f'$", 'Order'],
          rows: [
            ['1st (first)', 'Three-point forward $\\frac{-3f_0+4f_1-f_2}{2h}$', '$O(h^2)$'],
            ['2nd', 'Three-point central $\\frac{f_2-f_0}{2h}$', '$O(h^2)$'],
            ['Middle', 'Three-point central, or five-point central if there is room either side', '$O(h^2)$ / $O(h^4)$'],
            ['2nd from last', 'Three-point central $\\frac{f_n-f_{n-2}}{2h}$', '$O(h^2)$'],
            ['Last', 'Three-point backward $\\frac{3f_n-4f_{n-1}+f_{n-2}}{2h}$', '$O(h^2)$'],
          ],
        },
        {
          type: 'p',
          text: 'The same logic applies to the **second** derivative: the three-point central formula $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$ at interior rows, the forward formula at the first row and the backward formula at the last row.',
        },
        {
          type: 'p',
          text: 'At an interior row you also have the choice of a one-sided formula (forward or backward, two-point or three-point) — but the central formula is at least as accurate and uses the same data, so take the central one.',
        },
        {
          type: 'note',
          text: 'The classic trap: at the **last** row there is no data ahead, so a forward difference is impossible; at the **first** row there is no data behind. Say which row you are at and why you chose that formula — the marks are often for the choice, not the arithmetic.',
        },
        {
          type: 'exam',
          text: 'Write the row, then the formula, then the substitution. Example: "$t = 50$ s is an interior row (the third of six), so use the three-point central difference: $v(50) = \\frac{s(75)-s(25)}{2h}$." Never write a formula that reads a row outside the table.',
        },
      ],
    },

    {
      heading: "Heun's method for ordinary differential equations",
      blocks: [
        {
          type: 'p',
          text: 'Some papers ask for a numerical solution of an ordinary differential equation rather than a derivative of a table. The simplest is **Euler\'s method**:',
        },
        {
          type: 'math',
          tex: "y_{n+1} = y_n + h f(x_n, y_n), \\qquad x_{n+1} = x_n + h",
        },
        {
          type: 'p',
          text: 'Euler takes the slope at the **start** of the step only — geometrically the rectangle rule — so the local truncation error is $O(h^2)$ and the global error is only $O(h)$.',
        },
        {
          type: 'p',
          text: '**Heun\'s method** (the improved Euler method, or the predictor–corrector method) fixes this by taking the slope at the **end** of the step as well:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Predict** with Euler: $y^* = y_n + h f(x_n, y_n)$.',
            '**Correct** with the average of the two slopes: $y_{n+1} = y_n + \\frac{h}{2}\\left[f(x_n,y_n) + f(x_n+h,\\,y^*)\\right]$.',
          ],
        },
        {
          type: 'p',
          text: 'The increment is now the area of a **trapezoid** instead of a rectangle, so the $O(h^2)$ local error of the two slopes cancels and the global error becomes $O(h^2)$ — the same order as Simpson\'s rule — at the cost of two function evaluations per step.',
        },
        {
          type: 'note',
          text: "Heun's method is **not** in the slides or the class notes. It was asked in Spring 2023 Q2(d) (\"Analyze the underlying principle of Heun's Method in order to improve the accuracy of the solution for Ordinary Differential equations\") and again in Spring 2023 Q2(h) as the companion of Euler's method. It is taught here with the standard textbook method.",
        },
        {
          type: 'exam',
          text: 'To earn the marks: **(1)** write Euler\'s formula and say the slope is taken only at the left end of the step (rectangle rule, global error $O(h)$); **(2)** write the predictor and the corrector of Heun\'s method; **(3)** say the corrector averages the start and end slopes — it is the trapezoid rule for the increment — which removes the $O(h^2)$ local error and leaves a global error of $O(h^2)$; **(4)** show one full step of arithmetic on the given ODE.',
        },
      ],
    },
  ],

  formulas: [
    {
      label: 'Two-point forward difference',
      tex: "f'(x) \\approx \\frac{f(x+h) - f(x)}{h}",
      where: 'Truncation error $-\\frac{h}{2}f\'\'(\\theta)$ — order $O(h)$',
    },
    {
      label: 'Two-point backward difference',
      tex: "f'(x) \\approx \\frac{f(x) - f(x-h)}{h}",
      where: 'Truncation error $+\\frac{h}{2}f\'\'(\\theta)$ — order $O(h)$',
    },
    {
      label: 'Three-point forward difference',
      tex: "f'(x_0) = \\frac{-3f(x_0) + 4f(x_0 + h) - f(x_0 + 2h)}{2h}",
      where: 'Truncation error $+\\frac{h^2}{3}f\'\'\'(\\theta)$ — order $O(h^2)$',
    },
    {
      label: 'Three-point backward difference',
      tex: "f'(x_0) = \\frac{3f(x_0) - 4f(x_0 - h) + f(x_0 - 2h)}{2h}",
      where: 'Truncation error $+\\frac{h^2}{3}f\'\'\'(\\theta)$ — order $O(h^2)$',
    },
    {
      label: 'Three-point central difference',
      tex: "f'(x) = \\frac{f(x + h) - f(x - h)}{2h}",
      where: 'Truncation error $-\\frac{h^2}{6}f\'\'\'(\\theta)$ — order $O(h^2)$',
    },
    {
      label: 'Five-point central difference',
      tex: "f'(x) = \\frac{-f(x + 2h) + 8f(x + h) - 8f(x - h) + f(x - 2h)}{12h}",
      where: 'Truncation error $+\\frac{h^4}{30}f^{(5)}(\\theta)$ — order $O(h^4)$',
    },
    {
      label: 'Three-point central difference for the second derivative',
      tex: "f''(x) = \\frac{f(x + h) - 2f(x) + f(x - h)}{h^2}",
      where: 'Truncation error $-\\frac{h^2}{12}f^{(4)}(\\theta)$ — order $O(h^2)$',
    },
    {
      label: 'Forward second derivative (first row of a table)',
      tex: "f''(x) = \\frac{2f(x) - 5f(x+h) + 4f(x+2h) - f(x+3h)}{h^2}",
      where: 'Truncation error $+\\frac{11h^2}{12}f^{(4)}(\\theta)$ — order $O(h^2)$',
    },
    {
      label: 'Richardson extrapolation',
      tex: "R = \\frac{4D(h/2) - D(h)}{3}, \\qquad D(h) = \\frac{f(x+h)-f(x-h)}{2h}",
      where: 'Cancels the $O(h^2)$ term and leaves an error of order $O(h^4)$',
    },
    {
      label: "Heun's method (improved Euler)",
      tex: "y_{n+1} = y_n + \\frac{h}{2}\\left[f(x_n,y_n) + f(x_n+h,\\,y_n + h f(x_n,y_n))\\right]",
      where: 'Predictor–corrector; global error of order $O(h^2)$',
    },
  ],

  examples: [
    {
      title: 'Velocity and acceleration of the rocket at t = 0 s and t = 50 s',
      type: 'Numerical — Differentiation (tabulated)',
      question:
        'The following table provides the distance travelled by a rocket at various time intervals: $t$ (s) $= 0,\\ 25,\\ 50,\\ 75,\\ 100,\\ 125$ and $s$ (km) $= 0,\\ 32,\\ 58,\\ 78,\\ 92,\\ 100$. Use appropriate numerical differentiation methods for tabular functions to estimate both velocity and acceleration at $t = 0$ s and $t = 50$ s.',
      source: 'Fall 2024 Q2(c)',
      marks: 6,
      steps: [
        { t: '$h = 25$ s. Velocity is $v = \\frac{ds}{dt}$ and acceleration is $a = \\frac{d^2s}{dt^2}$.', m: '1 mark' },
        {
          t: "$t = 0$ s is the **first** row, so no backward data exists — use the three-point forward difference: $v(0) = \\frac{-3s(0) + 4s(25) - s(50)}{2h} = \\frac{0 + 128 - 58}{50} = 1.4$ km/s.",
          m: '1 mark',
        },
        {
          t: "$t = 50$ s is an **interior** row, so use the three-point central difference: $v(50) = \\frac{s(75) - s(25)}{2h} = \\frac{78 - 32}{50} = 0.92$ km/s.",
          m: '1 mark',
        },
        {
          t: "$a(0)$: use the forward second-derivative formula, $a(0) = \\frac{2s(0) - 5s(25) + 4s(50) - s(75)}{h^2} = \\frac{0 - 160 + 232 - 78}{625} = -0.0096$ km/s$^2$.",
          m: '1 mark',
        },
        {
          t: "$a(50)$: use the three-point central difference for the second derivative, $a(50) = \\frac{s(75) - 2s(50) + s(25)}{h^2} = \\frac{78 - 116 + 32}{625} = -0.0096$ km/s$^2$.",
          m: '1 mark',
        },
        {
          t: '$\\boxed{v(0) = 1.4 \\text{ km/s},\\; a(0) = -0.0096 \\text{ km/s}^2,\\; v(50) = 0.92 \\text{ km/s},\\; a(50) = -0.0096 \\text{ km/s}^2}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{v(0) = 1.4 \\text{ km/s},\\; a(0) = -0.0096 \\text{ km/s}^2,\\; v(50) = 0.92 \\text{ km/s},\\; a(50) = -0.0096 \\text{ km/s}^2}$',
      note: 'Trap: at the first row only forward differences exist and at the last row only backward differences exist. Never write a central difference at an end row — it reads a row outside the table.',
      explanation: [
        'Each row of the table is an equally spaced reading with $h = 25$ s. The choice of formula is decided **only** by the position of the row: the first row has data ahead of it, the last row has data behind it, and every other row has data on both sides.',
        'Notice that the data are exactly quadratic — the first differences $32, 26, 20, 14, 8$ have constant second difference $-6$ — so the acceleration is constant at $-6/625 = -0.0096$ km/s$^2$ everywhere, and the five-point central difference at $t = 50$ gives the same $0.92$ km/s as the three-point one. Write down the differences only if the question asks for them; the marks here are for the formula choice and the arithmetic.',
      ],
    },

    {
      title: 'Velocity and acceleration of a vehicle at t = 5 s and t = 13 s',
      type: 'Numerical — Differentiation (tabulated)',
      question:
        'The following table provides the distance travelled by a vehicle at various time intervals: $t$ (s) $= 3,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13$ and $s$ (km) $= 7,\\ 8,\\ 12,\\ 19,\\ 32,\\ 50$. Estimate both velocity and acceleration at $t = 5$ s and $t = 13$ s.',
      source: 'Spring 2024 Q2(g)',
      marks: 6,
      steps: [
        { t: '$h = 2$ s. $v = \\frac{ds}{dt}$, $a = \\frac{d^2s}{dt^2}$.', m: '1 mark' },
        {
          t: "$t = 5$ s is the **second** row — an interior row — so use the three-point central difference: $v(5) = \\frac{s(7) - s(3)}{2h} = \\frac{12 - 7}{4} = 1.25$ km/s.",
          m: '1 mark',
        },
        {
          t: "$a(5) = \\frac{s(7) - 2s(5) + s(3)}{h^2} = \\frac{12 - 16 + 7}{4} = 0.75$ km/s$^2$.",
          m: '1 mark',
        },
        {
          t: "$t = 13$ s is the **last** row, so use the three-point backward difference: $v(13) = \\frac{3s(13) - 4s(11) + s(9)}{2h} = \\frac{150 - 128 + 19}{4} = 10.25$ km/s.",
          m: '1 mark',
        },
        {
          t: "$a(13) = \\frac{2s(13) - 5s(11) + 4s(9) - s(7)}{h^2} = \\frac{100 - 160 + 76 - 12}{4} = 1.0$ km/s$^2$.",
          m: '1 mark',
        },
        {
          t: '$\\boxed{v(5) = 1.25 \\text{ km/s},\\; a(5) = 0.75 \\text{ km/s}^2,\\; v(13) = 10.25 \\text{ km/s},\\; a(13) = 1.0 \\text{ km/s}^2}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{v(5) = 1.25 \\text{ km/s},\\; a(5) = 0.75 \\text{ km/s}^2,\\; v(13) = 10.25 \\text{ km/s},\\; a(13) = 1.0 \\text{ km/s}^2}$',
      note: 'Trap: $t = 13$ s is the last row. A forward difference there would read a row that does not exist; the backward difference is the only option.',
      explanation: [
        'The row of the table decides the formula, nothing else. At $t = 5$ s the two neighbouring readings $s(3)$ and $s(7)$ are both available, so the three-point central difference is the natural choice; at $t = 13$ s only the readings behind it exist, so the backward difference is forced.',
        'The three-point central difference is $O(h^2)$ accurate, whereas the two-point differences are only $O(h)$. If the table had been shorter, or if the question had said "using the first-order formula", the two-point version would be used instead — always say which order you are using.',
      ],
    },

    {
      title: 'Velocity and acceleration of a car at t = 5 s, 7 s and 9 s',
      type: 'Numerical — Differentiation (tabulated)',
      question:
        'The table gives the distance travelled by a car at various time intervals: $t$ (s) $= 5,\\ 6,\\ 7,\\ 8,\\ 9$ and $s$ (km) $= 10.0,\\ 14.5,\\ 19.5,\\ 25.5,\\ 32.0$. Estimate the velocity at $t = 5$, $t = 7$ and $t = 9$, and the acceleration at $t = 7$.',
      source: 'Balagurusamy Ch 11, Ex 11.5–11.6',
      marks: 6,
      steps: [
        { t: '$h = 1$ s.', m: '1 mark' },
        {
          t: "$t = 5$ s (first row): $v(5) = \\frac{-3s(5) + 4s(6) - s(7)}{2h} = \\frac{-30 + 58 - 19.5}{2} = 4.25$ km/s.",
          m: '1 mark',
        },
        {
          t: "$t = 7$ s (middle row): $v(7) = \\frac{s(8) - s(6)}{2h} = \\frac{25.5 - 14.5}{2} = 5.5$ km/s.",
          m: '1 mark',
        },
        {
          t: "$t = 9$ s (last row): $v(9) = \\frac{3s(9) - 4s(8) + s(7)}{2h} = \\frac{96 - 102 + 19.5}{2} = 6.75$ km/s.",
          m: '1 mark',
        },
        {
          t: "$a(7) = \\frac{s(8) - 2s(7) + s(6)}{h^2} = \\frac{25.5 - 39 + 14.5}{1} = 1.0$ km/s$^2$.",
          m: '1 mark',
        },
        {
          t: '$\\boxed{v(5) = 4.25,\\; v(7) = 5.5,\\; v(9) = 6.75 \\text{ km/s};\\quad a(7) = 1.0 \\text{ km/s}^2}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{v(5) = 4.25,\\; v(7) = 5.5,\\; v(9) = 6.75 \\text{ km/s};\\quad a(7) = 1.0 \\text{ km/s}^2}$',
      note: 'Trap: the five-point central difference would be "better", but this table only has three rows on each side of the middle row, so it cannot be used here.',
      explanation: [
        'This is the worked example in the Balagurusamy slides (Ch. 11) and it is the model answer for every "tabular differentiation" question: one line per row, each line naming the formula and the reason for the choice.',
        'The three formulas used are the three-point forward, the three-point central and the three-point backward difference, all $O(h^2)$ accurate — twice as good as the two-point versions for the same $h$. The acceleration uses the three-point central difference for the second derivative, which needs the readings on both sides of $t = 7$.',
      ],
    },

    {
      title: 'Second derivative of f(x) = 1/(1 + x²) at x = 0.5',
      type: 'Numerical — Differentiation (central)',
      question:
        'Use the three-point central difference formula to estimate the second derivative of $f(x) = \\frac{1}{1+x^2}$ at $x = 0.5$, with step size $h = 0.01$. Compare the result with the true value.',
      source: 'Fall 2023 Q2(e)',
      marks: 6,
      steps: [
        {
          t: '$f(0.49) = \\frac{1}{1 + 0.49^2} = 0.806387$, $f(0.50) = \\frac{1}{1.25} = 0.800000$, $f(0.51) = \\frac{1}{1 + 0.51^2} = 0.793588$.',
          m: '1 mark',
        },
        { t: '$f\'\'(x) \\approx \\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$.', m: '1 mark' },
        {
          t: "$f\'\'(0.5) \\approx \\frac{0.793588 - 2(0.800000) + 0.806387}{0.01^2} = \\frac{-0.0000256}{0.0001} = -0.256078$.",
          m: '1 mark',
        },
        {
          t: "True value: $f\'\'(x) = \\frac{6x^2 - 2}{(1+x^2)^3}$, so $f\'\'(0.5) = \\frac{1.5 - 2}{1.25^3} = -0.256000$.",
          m: '1 mark',
        },
        {
          t: 'Error $= -0.256078 - (-0.256000) = -0.000078$, i.e. about $7.8 \\times 10^{-5}$ — consistent with an $O(h^2)$ formula with $h = 0.01$.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{f\'\'(0.5) \\approx -0.2561 \\; (\\text{true value } -0.2560,\\; \\text{error } -7.8 \\times 10^{-5})}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{f\'\'(0.5) \\approx -0.2561 \\; (\\text{true value } -0.2560,\\; \\text{error } -7.8 \\times 10^{-5})}$',
      note: 'Trap: the three-point central formula for the **second** derivative is $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$, not $\\frac{f(x+h)-f(x-h)}{2h}$. Write the formula out first.',
      explanation: [
        'The three-point central difference for the second derivative is obtained by **adding** the Taylor expansions of $f(x+h)$ and $f(x-h)$, so the odd powers of $h$ cancel and the error term is $O(h^2)$.',
        'With $h = 0.01$ the error is about $8 \\times 10^{-5}$, which is roughly $h^2 = 10^{-4}$ times a constant — exactly what an $O(h^2)$ formula should give. Halving $h$ would reduce the error by about a factor of four, which is the quickest way to check the order.',
      ],
    },

    {
      title: 'Deriving the three-point forward difference formula',
      type: 'Theory — Derive',
      question:
        'Derive the three-point forward difference formula for a tabulated function in the context of numerical differentiation.',
      source: 'Fall 2023 Q1(e)',
      marks: 4,
      steps: [
        {
          t: 'Fit a **quadratic** through the three ordinates $x_0 = x$, $x_1 = x+h$, $x_2 = x+2h$: $p_2(x) = a_0 + a_1(x-x_0) + a_2(x-x_0)(x-x_1)$.',
          m: '1 mark',
        },
        {
          t: "Differentiate: $p_2'(x) = a_1 + a_2\\left[(x-x_0) + (x-x_1)\\right]$, so $f'(x) \\approx a_1 + a_2\\left[(x-x_0)+(x-x_1)\\right]$.",
          m: '1 mark',
        },
        {
          t: "$a_1 = \\frac{f(x+h)-f(x)}{h}$ and $a_2 = f[x_0,x_1,x_2] = \\frac{f(x+2h)-2f(x+h)+f(x)}{2h^2}$.",
          m: '1 mark',
        },
        {
          t: "With $x_0 = x$, $x_1 = x+h$ we have $(x-x_0)+(x-x_1) = -h$, so $f'(x) \\approx \\frac{f(x+h)-f(x)}{h} - \\frac{h}{2h^2}\\left[f(x+2h)-2f(x+h)+f(x)\\right] = \\boxed{\\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}}$, with truncation error $E_t = +\\frac{h^2}{3}f\'\'\'(\\theta)$, i.e. $O(h^2)$.",
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{f\'(x) \\approx \\frac{-3f(x) + 4f(x+h) - f(x+2h)}{2h}}, \\quad E_t = +\\frac{h^2}{3}f\'\'\'(\\theta) = O(h^2)$',
      note: 'Trap: the three-point **central** difference $\\frac{f(x+h)-f(x-h)}{2h}$ uses $x-h$ and $x+h$ — it is not the forward formula.',
      explanation: [
        'The derivation is nothing more than "interpolate, then differentiate". Differentiating the Lagrange or Newton interpolating polynomial reproduces the finite-difference coefficients exactly, which is why the interpolant route and the Taylor route give the same answer.',
        'Because the quadratic interpolant reproduces every polynomial of degree $\\le 2$ exactly, the formula is exact for quadratics and its error is $O(h^2)$ — the same order as the three-point central difference, but it needs two rows *ahead* of $x$ instead of one row on each side.',
      ],
    },

    {
      title: 'Proving the truncation error of the second-order central difference is O(h²)',
      type: 'Theory — Prove',
      question:
        'Prove that the truncation error of the second-order central difference formula is $O(h^2)$.',
      source: 'Fall 2024 Q1(e)',
      marks: 3,
      steps: [
        {
          t: "$f(x+h) = f(x) + h f\'(x) + \\frac{h^2}{2}f\'\'(x) + \\frac{h^3}{6}f\'\'\'(x) + O(h^4)$ and $f(x-h) = f(x) - h f\'(x) + \\frac{h^2}{2}f\'\'(x) - \\frac{h^3}{6}f\'\'\'(x) + O(h^4)$.",
          m: '1 mark',
        },
        {
          t: 'Subtract: the even powers cancel, $f(x+h) - f(x-h) = 2h f\'(x) + \\frac{h^3}{3}f\'\'\'(x) + O(h^5)$.',
          m: '1 mark',
        },
        {
          t: "Divide by $2h$: $\\frac{f(x+h)-f(x-h)}{2h} = f\'(x) + \\frac{h^2}{6}f\'\'\'(x) + O(h^4)$, so $E_t = -\\frac{h^2}{6}f\'\'\'(\\xi) \\propto h^2$ — $\\therefore$ the second-order central difference is a **second-order** formula, $O(h^2)$.",
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\frac{f(x+h)-f(x-h)}{2h} = f\'(x) + \\frac{h^2}{6}f\'\'\'(x) + O(h^4) \\;\\Rightarrow\\; E_t = O(h^2)}$',
      note: 'Trap: writing only the final order and skipping the Taylor expansions. The examiner wants to see *why* the even powers cancel.',
      explanation: [
        'The whole proof rests on one observation: subtracting the two expansions removes every even power of $h$, so the first surviving error term is the cubic one, $h^3 f\'\'\'/3$.',
        'Dividing by $2h$ turns that into $h^2 f\'\'\'/6$, which is why the formula is called *second order*. If instead you **add** the expansions, only the even powers survive and you get the $O(h^2)$ error of the second-derivative formula $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$.',
      ],
    },

    {
      title: 'Deriving the Richardson extrapolation formula',
      type: 'Theory — Derive',
      question:
        'Derive the Richardson extrapolation formula using the three-point central difference formula for numerical differentiation.',
      source: 'Fall 2024 Q1(b)',
      marks: 3,
      steps: [
        {
          t: 'Let $D(h) = \\frac{f(x+h)-f(x-h)}{2h}$. From the Taylor expansion, $D(h) = f\'(x) + c h^2 + O(h^4)$ with $c = -\\frac{1}{6}f\'\'\'(x)$.',
          m: '1 mark',
        },
        {
          t: 'Halving the step size quarters the error term: $D(h/2) = f\'(x) + \\frac{c h^2}{4} + O(h^4)$, so $4D(h/2) - D(h) = 4f\'(x) + ch^2 - f\'(x) - ch^2 + O(h^4) = 3f\'(x) + O(h^4)$ — the $ch^2$ term cancels exactly.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{f\'(x) \\approx R = \\frac{4D(h/2) - D(h)}{3} = f\'(x) + O(h^4)}$ — the error order improves from $O(h^2)$ to $O(h^4)$. Check: for $f(x) = \\sin x$ at $x = 1$ with $h = 0.1$, $D(0.1) = 0.5394$, $D(0.05) = 0.5401$, $R = \\frac{4(0.5401) - 0.5394}{3} = 0.5403$ (exact $f\'(1) = \\cos 1 = 0.5403$).',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{R = \\frac{4D(h/2)-D(h)}{3}, \\quad D(h) = \\frac{f(x+h)-f(x-h)}{2h} \\;\\Rightarrow\\; f\'(x) \\approx R \\text{ with error } O(h^4)}$',
      note: 'Trap: the weights are **4 and −1, divided by 3** — $4D(h/2) - D(h)$, not $4D(h) - D(h/2)$. The fine value must be multiplied by four.',
      explanation: [
        'Richardson extrapolation is a general idea, not a special formula: whenever the error is known to be $c h^p$, evaluating with $h$ and $h/2$ lets you cancel that term exactly and gain one power of $h$. Here $p = 2$, so $2^2 = 4$ appears in the weights and the result is $O(h^4)$.',
        'In the exam you do not need the value of $c$ — the proof only needs that the *same* constant $c$ multiplies $h^2$ at both step sizes. Writing $c = -\\frac{1}{6}f\'\'\'(x)$ is a nice touch but it is not the point of the question.',
      ],
    },

    {
      title: 'Why Richardson extrapolation beats the three-point forward difference',
      type: 'Theory — Justify',
      question:
        'Justify why the Richardson extrapolation method outperforms the three-point forward difference formula in generating accurate estimates of derivatives.',
      source: 'Fall 2023 Q3(a) · Spring 2023 Q3(a)',
      marks: 6,
      steps: [
        {
          t: "Three-point forward difference: $D_F = \\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h} = f\'(x) + \\frac{h^2}{3}f\'\'\'(x) + O(h^3)$ — error $O(h^2)$, and it needs two rows **ahead** of $x$. Three-point central difference: $D_C = \\frac{f(x+h)-f(x-h)}{2h} = f\'(x) - \\frac{h^2}{6}f\'\'\'(x) + O(h^4)$ — also $O(h^2)$, but the error is **half** as large and it reads one row on each side.",
          m: '2 marks',
        },
        {
          t: "Richardson: $D(h) = f\'(x) + ch^2 + O(h^4)$ and $D(h/2) = f\'(x) + \\frac{ch^2}{4} + O(h^4)$, so $R = \\frac{4D(h/2)-D(h)}{3} = f\'(x) + O(h^4)$ — the $h^2$ term is eliminated exactly.",
          m: '2 marks',
        },
        {
          t: 'Numbers for $f(x) = \\sin x$ at $x = 1$, $h = 0.1$: $D_F = 0.5419$, $D_C = 0.5394$, $R = 0.5403$; exact $f\'(1) = \\cos 1 = 0.5403$.',
          m: '1 mark',
        },
        {
          t: 'Errors: forward $1.6 \\times 10^{-3}$, central $-9.0 \\times 10^{-4}$, Richardson $-1.1 \\times 10^{-7}$ — Richardson is about **four orders of magnitude** better than either raw difference. $\\boxed{R = \\frac{4D(h/2)-D(h)}{3} \\text{ has error } O(h^4), \\text{ while the three-point forward difference has error } O(h^2)}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{R = \\frac{4D(h/2)-D(h)}{3} = f\'(x) + O(h^4) \\quad\\text{vs}\\quad D_F = f\'(x) + \\frac{h^2}{3}f\'\'\'(x): \\text{ Richardson is } O(h^4), \\text{ the forward difference only } O(h^2)}$',
      note: 'Trap: Richardson extrapolation needs the **central** difference, not the forward one — the forward formula has no symmetric $h$ and $h/2$ pair that cancels the $h^2$ term in this way.',
      explanation: [
        'Two reasons make Richardson better. First, order: the raw three-point formulas are only second order, while Richardson cancels the $h^2$ term and delivers a fourth-order estimate — the accuracy of a five-point central difference — using only the central difference evaluations.',
        'Second, practicality: the three-point forward difference reads two rows ahead of the point, so it simply cannot be used at the last row of a table; the central difference that Richardson is built from can be used at any interior row.',
      ],
    },

    {
      title: "Heun's method for dy/dx = x³ + y",
      type: 'Numerical — Heun',
      question:
        'Analyze the underlying principle of Heun\'s method in order to improve the accuracy of the solution for ordinary differential equations. Illustrate with $dy/dx = x^3 + y$, $x = 0$, $y = 1$, step size $h = 0.01$, up to $x = 0.04$.',
      source: 'Spring 2023 Q2(d) · Spring 2023 Q2(h)',
      marks: 6,
      steps: [
        {
          t: "Euler's method: $y_{n+1} = y_n + h f(x_n, y_n)$ uses the slope at the **left** end of the step only (rectangle rule), so the global error is only $O(h)$.",
          m: '1 mark',
        },
        {
          t: "Heun's method: **predict** $y^* = y_n + h f(x_n, y_n)$, then **correct** $y_{n+1} = y_n + \\frac{h}{2}\\left[f(x_n,y_n) + f(x_n+h,y^*)\\right]$ — the increment is the area of a trapezoid, so the $O(h^2)$ local error cancels and the global error becomes $O(h^2)$.",
          m: '2 marks',
        },
        {
          t: 'Step 1: $f(0,1) = 1$, $y^* = 1 + 0.01(1) = 1.01$, $f(0.01, 1.01) = 0.000001 + 1.01 = 1.010001$, so $y_1 = 1 + 0.005(1 + 1.010001) = 1.010050$.',
          m: '1 mark',
        },
        {
          t: 'Continuing: $y_2 = 1.020201$ at $x = 0.02$, $y_3 = 1.030454$ at $x = 0.03$, $y_4 = 1.040811$ at $x = 0.04$ (Euler would give $1.010000,\\ 1.020100,\\ 1.030301,\\ 1.040604$).',
          m: '1 mark',
        },
        {
          t: 'Exact solution $y = 7e^x - x^3 - 3x^2 - 6x - 6$, so $y(0.04) = 1.0408114$. Heun\'s error is about $6.5 \\times 10^{-7}$ against Euler\'s $2.1 \\times 10^{-4}$ — roughly 300 times better with the same step size. $\\boxed{y(0.04) \\approx 1.040811 \\text{ (Heun)},\\; 1.040604 \\text{ (Euler)}}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{y(0.04) \\approx 1.040811 \\text{ by Heun\'s method} \\; (\\text{Euler gives } 1.040604;\\; \\text{exact } 1.0408114)}$',
      note: 'Trap: in the corrector the second slope is evaluated at the **predicted** value $y^*$ at the **end** of the step, $f(x_n+h, y^*)$ — not at $y_n$, and not at $y_{n+1}$.',
      explanation: [
        'Euler\'s method is the rectangle rule applied to $\\frac{dy}{dx} = f(x,y)$, which is why it is only first order. Heun replaces the rectangle by a **trapezoid**: the slope at the start of the step and the slope at the end of the step are averaged, so the $O(h^2)$ local truncation error of Euler is removed and the global error improves from $O(h)$ to $O(h^2)$.',
        'The price is one extra evaluation of $f$ per step, and the method is only **second order** — a higher-order Runge–Kutta method would do better, but Heun is what the paper asks for. Always finish with a table of the iterations so the examiner can see the method being used.',
      ],
    },
  ],

  flashcards: [
    {
      front: 'When is numerical differentiation necessary?',
      back: 'When the function values are known at a discrete set of points but the function itself is unknown (a **tabulated function**), or when the function is known but too complicated to differentiate analytically.',
    },
    {
      front: 'Two-point forward difference formula and its order',
      back: "$f'(x) \\approx \\frac{f(x+h)-f(x)}{h}$, truncation error $-\\frac{h}{2}f''(\\theta)$ — **first order**, $O(h)$.",
    },
    {
      front: 'Three-point forward difference formula and its order',
      back: "$f'(x) \\approx \\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$, truncation error $+\\frac{h^2}{3}f'''(\\theta)$ — **second order**, $O(h^2)$.",
    },
    {
      front: 'Three-point central difference formula and its order',
      back: "$f'(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}$, truncation error $-\\frac{h^2}{6}f'''(\\theta)$ — **second order**, $O(h^2)$; it is the average of the forward and backward formulas.",
    },
    {
      front: 'Five-point central difference formula and its order',
      back: "$f'(x) \\approx \\frac{-f(x+2h)+8f(x+h)-8f(x-h)+f(x-2h)}{12h}$ — **fourth order**, $O(h^4)$; exact for polynomials up to degree four.",
    },
    {
      front: 'Three-point central difference for the SECOND derivative',
      back: "$f''(x) \\approx \\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$, truncation error $-\\frac{h^2}{12}f^{(4)}(\\theta)$ — $O(h^2)$. It comes from **adding** the two Taylor expansions.",
    },
    {
      front: 'Why is numerical differentiation sensitive to round-off?',
      back: 'The ordinates are subtracted, so a round-off error $e$ in the data is amplified like $\\frac{2e}{h}$ as $h$ shrinks, while the truncation error falls like $h$. Total error $|E(h)| \\le \\frac{M_2 h}{2} + \\frac{2e}{h}$, minimised at $h_{opt} = 2\\sqrt{e/M_2}$.',
    },
    {
      front: 'Which difference formula do you use at the first row of a table?',
      back: 'The three-point **forward** difference $\\frac{-3f_0+4f_1-f_2}{2h}$ (or the forward second-derivative formula) — there is no data behind the first row.',
    },
    {
      front: 'Which difference formula do you use at the last row of a table?',
      back: 'The three-point **backward** difference $\\frac{3f_n-4f_{n-1}+f_{n-2}}{2h}$ (or the backward second-derivative formula) — there is no data ahead of the last row.',
    },
    {
      front: 'Richardson extrapolation formula',
      back: "$R = \\frac{4D(h/2)-D(h)}{3}$ with $D(h) = \\frac{f(x+h)-f(x-h)}{2h}$. It cancels the $O(h^2)$ term exactly, so the result is $O(h^4)$.",
    },
    {
      front: 'How do you prove the truncation error of the central difference is O(h²)?',
      back: 'Expand $f(x+h)$ and $f(x-h)$ in Taylor series, subtract (even powers cancel), divide by $2h$: $\\frac{f(x+h)-f(x-h)}{2h} = f\'(x) + \\frac{h^2}{6}f\'\'\'(x) + O(h^4)$.',
    },
    {
      front: "Heun's method (improved Euler)",
      back: "Predict $y^* = y_n + h f(x_n,y_n)$, then correct $y_{n+1} = y_n + \\frac{h}{2}[f(x_n,y_n) + f(x_n+h,y^*)]$. The increment is a trapezoid, so the global error improves from $O(h)$ to $O(h^2)$.",
    },
    {
      front: 'Which interpolation formula does Shanker Rao use for derivatives near each end of a table?',
      back: "Newton–Gregory **forward** near the beginning, Newton's **backward** near the end, a **central difference** formula in the middle, and Newton's **divided difference** for unequally spaced arguments.",
    },
  ],

  quiz: [
    {
      q: 'The three-point forward difference formula is …',
      options: [
        "$f'(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}$",
        "$f'(x) \\approx \\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$",
        "$f'(x) \\approx \\frac{3f(x)-4f(x-h)+f(x-2h)}{2h}$",
        "$f'(x) \\approx \\frac{f(x+h)-f(x)}{h}$",
      ],
      answer: 1,
      explain:
        'The three-point forward difference is $\\frac{-3f(x)+4f(x+h)-f(x+2h)}{2h}$, $O(h^2)$. Option 1 is the central difference, option 3 the backward three-point, option 4 the two-point forward difference.',
    },
    {
      q: 'The truncation error of the two-point forward difference formula is …',
      options: [
        "$-\\frac{h}{2}f''(\\theta)$, order $O(h)$",
        "$-\\frac{h^2}{6}f'''(\\theta)$, order $O(h^2)$",
        "$-\\frac{h^2}{12}f^{(4)}(\\theta)$, order $O(h^2)$",
        "$+\\frac{h^4}{30}f^{(5)}(\\theta)$, order $O(h^4)$",
      ],
      answer: 0,
      explain:
        "One Taylor term gives $f'(x) = \\frac{f(x+h)-f(x)}{h} - \\frac{h}{2}f''(\\theta)$, so the formula is first order only.",
    },
    {
      q: 'Which formula gives the second derivative at an interior row of a table?',
      options: [
        "$f''(x) \\approx \\frac{f(x+h)-f(x-h)}{2h}$",
        "$f''(x) \\approx \\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$",
        "$f''(x) \\approx \\frac{2f(x)-5f(x+h)+4f(x+2h)-f(x+3h)}{h^2}$",
        "$f''(x) \\approx \\frac{f(x+2h)-2f(x+h)+f(x)}{h^2}$",
      ],
      answer: 1,
      explain:
        'The three-point central second derivative is $\\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$. Option 3 is the forward version, used at the first row.',
    },
    {
      q: 'Richardson extrapolation applied to $D(h) = f\'(x) + ch^2 + O(h^4)$ produces …',
      options: [
        "$f'(x) + O(h^2)$",
        "$f'(x) + O(h^3)$",
        "$f'(x) + O(h^4)$",
        "$f'(x) + O(h^6)$",
      ],
      answer: 2,
      explain:
        '$\\frac{4D(h/2)-D(h)}{3}$ eliminates the $ch^2$ term exactly, leaving an $O(h^4)$ result.',
    },
    {
      q: 'At the last row of a table of equally spaced ordinates the appropriate formula is …',
      options: [
        'the three-point forward difference',
        'the three-point central difference',
        'the three-point backward difference',
        'the five-point central difference',
      ],
      answer: 2,
      explain:
        'There is no data ahead of the last row, so the difference must be taken backwards.',
    },
    {
      q: 'Why is the five-point central difference preferred over the three-point central difference when both are available?',
      options: [
        'it needs fewer function evaluations',
        'it is $O(h^4)$ accurate instead of $O(h^2)$',
        'it has no truncation error',
        'it avoids round-off error',
      ],
      answer: 1,
      explain:
        'It is exact for polynomials up to degree four and its truncation error is $+\\frac{h^4}{30}f^{(5)}(\\theta)$, an order higher than the three-point formula.',
    },
    {
      q: 'Numerical differentiation is "very sensitive to round-off" because …',
      options: [
        'the ordinates are added, so errors grow like $2e$',
        'the ordinates are subtracted and then divided by a small $h$, so the error grows like $\\frac{2e}{h}$',
        'the interpolation polynomial always has large coefficients',
        'the function values are usually quoted to only two digits',
      ],
      answer: 1,
      explain:
        'A round-off error $e$ in the data contributes $\\frac{e_1-e_0}{h}$, so it blows up as $h \\to 0$ while the truncation error falls. The total error is minimised at $h_{opt} = 2\\sqrt{e/M_2}$.',
    },
    {
      q: "Heun's method improves Euler's method because …",
      options: [
        'it uses a predictor and a corrector, i.e. the trapezoid rule for the increment, giving a global error of $O(h^2)$',
        'it evaluates $f$ only once per step',
        'it starts from a better initial value',
        'it always converges for stiff equations',
      ],
      answer: 0,
      explain:
        "Averaging the slope at the start and the end of the step removes the $O(h^2)$ local error, so the global error improves from $O(h)$ to $O(h^2)$.",
    },
    {
      q: 'Subtracting the Taylor expansions of $f(x+h)$ and $f(x-h)$ leaves …',
      options: [
        'only even powers of $h$',
        'only odd powers of $h$, so the first derivative formula has error $O(h^2)$',
        'no remainder term',
        'only even powers of $h$, so the first derivative formula has error $O(h^4)$',
      ],
      answer: 1,
      explain:
        'The even powers cancel on subtraction, leaving $\\frac{h^3}{3}f\'\'\'(x)$; after dividing by $2h$ the error is $O(h^2)$.',
    },
    {
      q: 'Given $t = 0, 25, 50$ s and $s = 0, 32, 58$ km, the velocity at $t = 0$ from the three-point forward difference is …',
      options: ['$1.4$ km/s', '$0.92$ km/s', '$1.28$ km/s', '$0.5$ km/s'],
      answer: 0,
      explain:
        '$v(0) = \\frac{-3(0) + 4(32) - 58}{2(25)} = \\frac{70}{50} = 1.4$ km/s.',
    },
  ],

  solvers: ['diffTable', 'central', 'richardson'],
};
