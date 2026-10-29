// Chapter 9 — Numerical Integration (Shanker Rao Ch. 9).
// Every number in `examples` was checked against src/lib/solvers.js.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Why does numerical integration exist at all?",
    options: ["Integration by parts is forbidden", "Many important integrals, like $\\int e^{-x^2}dx$, have no elementary antiderivative", "Computers cannot differentiate", "Areas are always infinite"],
    answer: 1,
    explain: "No formula exists for many real integrands, but the area can still be measured with strips — quadrature never needs an antiderivative.",
  },
  "Start here: the core idea": {
    q: "Simpson's one-third rule needs the number of strips to be…",
    options: ["odd", "even", "divisible by three", "exactly six"],
    answer: 1,
    explain: "Parabolas span strips in pairs, so the one-third rule needs an even strip count; triples go to the three-eighths rule, sixes to Weddle.",
  },
  "Start here: reading the symbols": {
    q: "'Seven ordinates' means how many strips?",
    options: ["Seven", "Six", "Eight", "Three"],
    answer: 1,
    explain: "Strips = ordinates minus one: seven ordinates span six strips — exactly Weddle's requirement.",
  },
  "Start here: your first walk-through": {
    q: "In the walk-through, Simpson's one-third rule weighted $y_1$, $y_3$ and $y_5$ by…",
    options: ["1", "2", "4", "6"],
    answer: 2,
    explain: "The pattern is $1, 4, 2, 4, 2, 4, 1$ — odd-indexed ordinates get 4, even interior ones get 2, the ends get 1.",
  },
  'Why we integrate numerically': {
    q: 'Numerical integration is used because …',
    options: [
      'the integrand is always too slow to evaluate',
      'the definite integral has no elementary antiderivative, or the integrand is known only as a table of values',
      'the interval is always infinite',
      'the integrand is always discontinuous',
    ],
    answer: 1,
    explain:
      'Shanker Rao Ch. 9: numerical integration gives approximate answers for definite integrals that cannot be solved analytically — either because the antiderivative does not exist in closed form, or because the function is given only as a set of tabulated values. The technique of fitting an interpolation polynomial and integrating it is called **quadrature**.',
  },

  'The general quadrature formula for equidistant ordinates': {
    q: 'Simpson’s one-third rule is obtained from the general quadrature formula by …',
    options: [
      'setting $n = 1$ and keeping the first differences',
      'setting $n = 2$ and neglecting the third and higher order differences',
      'setting $n = 3$ and neglecting the fifth and higher order differences',
      'setting $n = 6$ and keeping the sixth differences',
    ],
    answer: 1,
    explain:
      'Put $n = 2$ in the general Gauss–Legendre quadrature formula and drop $\\Delta^3 y_0$ and above; the result simplifies to $\\frac{h}{3}(y_0 + 4y_1 + y_2)$. $n = 1$ gives the trapezoidal rule, $n = 3$ gives Simpson’s 3/8 rule and $n = 6$ gives Weddle’s rule.',
  },

  'The trapezoidal rule': {
    q: 'The truncation error of the trapezoidal rule is …',
    options: [
      "$-\\frac{(b-a)h^2}{12}f''(\\xi)$",
      "$-\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$",
      "$-\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$",
      "$-\\frac{h^7}{140}f^{(6)}(\\xi)$",
    ],
    answer: 0,
    explain:
      'The trapezoidal rule replaces the curve by straight lines, so the error is controlled by the **second** derivative: $E \\approx -\\frac{(b-a)h^2}{12}f\'\'(\\xi)$. It is the only one of the four rules that works with any number of subintervals, odd or even, but it is the least accurate of them.',
  },

  "Simpson's one-third rule": {
    q: 'Simpson’s one-third rule requires …',
    options: [
      'a multiple of three subintervals',
      'an even number of subintervals',
      'a multiple of six subintervals',
      'no particular number of subintervals',
    ],
    answer: 1,
    explain:
      'Simpson’s 1/3 rule fits a parabola over **two** subintervals at a time, so it can only be applied when the interval is divided into an **even** number of subintervals. A multiple of three is needed for Simpson’s 3/8 rule and a multiple of six for Weddle’s rule.',
  },

  "Simpson's three-eighths rule": {
    q: 'In Simpson’s three-eighths rule the end ordinates $y_0$ and $y_n$ carry the weight …',
    options: ['3', '1', '4', '6'],
    answer: 1,
    explain:
      'Simpson’s 3/8 rule is $I \\approx \\frac{3h}{8}\\left[y_0 + 3(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]$ — the end ordinates have weight **1** and only the interior ones have weight 3. Weighting the ends by 3 is a classic mistake.',
  },

  "Weddle's rule": {
    q: 'Weddle’s rule …',
    options: [
      'needs an even number of subintervals and is exact for polynomials of degree up to 5',
      'needs a multiple of six subintervals and is exact for polynomials of degree up to 5',
      'needs a multiple of three subintervals and is exact for polynomials of degree up to 3',
      'needs a multiple of six subintervals and is exact for polynomials of degree up to 3',
    ],
    answer: 1,
    explain:
      'Weddle’s rule is obtained from the general quadrature formula with $n = 6$ and needs **seven consecutive equispaced ordinates** (a multiple of six subintervals). Shanker Rao notes that it is more accurate than the trapezoidal and Simpson rules and that it gives an exact result for any polynomial of degree 5 or lower.',
  },

  'Romberg integration': {
    q: 'Romberg integration …',
    options: [
      'is Newton’s method applied to integration',
      'starts from the trapezoidal rule and improves it by Richardson extrapolation at each level',
      'is Simpson’s rule applied repeatedly',
      'is a Gaussian quadrature with unequal weights',
    ],
    answer: 1,
    explain:
      'Romberg starts with the trapezoidal rule (error $\\propto h^2$) at $h, h/2, h/4, \\dots$ and combines neighbouring values by Richardson extrapolation, $\\frac{4I_{\\text{fine}} - I_{\\text{coarse}}}{3}$, level after level (Shanker Rao §9.10).',
  },

  'Choosing a rule and estimating the error': {
    q: 'With 5 subintervals available, the best plan is …',
    options: [
      'apply Simpson’s one-third rule directly',
      'apply Simpson’s three-eighths rule directly',
      'apply Simpson’s one-third rule to an even number of the subintervals and handle the remaining one with the trapezoidal rule',
      'apply Weddle’s rule',
    ],
    answer: 2,
    explain:
      'Simpson’s 1/3 needs an even count and 3/8 a multiple of three, so neither takes 5 subintervals as they stand. The standard fix is to use Simpson’s 1/3 on four of them and the trapezoidal rule on the fifth (or Simpson’s 3/8 on three and Simpson’s 1/3 on the remaining two).',
  },
};

export default {
  id: 'integration',
  chapter: 9,
  title: 'Numerical Integration',
  wave: 'integ',
  sources: ['Shanker Rao Ch 9', 'Past papers'],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Ask a mathematician for $\\int e^{-x^2}\\,dx$ — the curve behind the bell shape, statistics, heat flow — and the honest answer is: **no formula exists**. The area under that curve can never be written with elementary functions. Yet engineers need it constantly." },
        { type: "p", text: "An integral is an **area**, and areas can be measured without any antiderivative: chop the region into thin vertical strips, approximate each strip's area with a shape you can compute, and add them up. That is numerical integration (quadrature) — the most reliably accurate tool in the whole course." },
        { type: "p", text: "The exam's versions differ only in what tops the strips: flat tops (rectangle sums), straight tops (trapezoidal rule), parabolic tops (Simpson's rules), and the six-strip Weddle pattern." },
        { type: "list", items: [
          "Turn an integral into ordinates $y_0, y_1, \\ldots, y_n$ spaced $h$ apart.",
          "Apply the trapezoidal and Simpson rules with their weight patterns.",
          "Know which rule needs how many strips (even, triple, six).",
          "State the error behaviour and compare with the exact value when it exists.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Sample the integrand at equally spaced points — the **ordinates** — and replace the true curve between them with something simple. Straight lines give the **trapezoidal rule**; parabolas through each pair of strips give **Simpson's one-third rule**, whose weights alternate $1, 4, 2, 4, \\ldots, 4, 1$:" },
        { type: "math", tex: "T = \\frac{h}{2}\\left[y_0 + 2(y_1 + \\cdots + y_{n-1}) + y_n\\right], \\qquad S_{1/3} = \\frac{h}{3}\\left[y_0 + 4y_1 + 2y_2 + 4y_3 + \\cdots + y_n\\right]" },
        { type: "p", text: "Both are 'multiply each ordinate by its weight and add'. The art is remembering the weights — and the rule's strip requirement: Simpson's one-third needs an **even** number of strips, the three-eighths rule handles triples, Weddle wants six." },
        { type: "note", text: "Accuracy ladder: trapezoid error is $O(h^2)$, Simpson's is $O(h^4)$ — halve the strip width and Simpson's error drops sixteen-fold. Simpson is exact for cubics despite fitting parabolas: the odd-order error terms cancel." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$y_0, y_1, \\ldots, y_n$", "the ordinates: integrand values at equally spaced $x$'s", "the sampled heights"],
          ["$h$", "strip width $= \\frac{b - a}{n}$", "step size"],
          ["$n$", "number of strips (one less than the number of ordinates)", "strips, not points"],
          ["$1, 4, 2, 4, \\ldots, 1$", "Simpson's one-third weights", "ends 1, odd 4, even 2"],
          ["$\\frac{3h}{8}[\\ldots]$", "Simpson's three-eighths rule", "for strip counts divisible by 3"],
          ["$O(h^4)$", "Simpson's error order", "halve $h$, error $\\times \\frac{1}{16}$"],
        ] },
        { type: "p", text: "Classic trap: $n$ strips means $n+1$ ordinates — 'seven ordinates' is **six** strips, exactly what Weddle's rule wants." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Shanker Rao, Ex. 9.4**: evaluate $\\int_0^{0.6} e^x\\,dx$ by Simpson's one-third rule with six strips — $h = 0.1$, seven ordinates." },
        { type: "p", text: "Ordinates: $1,\\ 1.1052,\\ 1.2214,\\ 1.3499,\\ 1.4918,\\ 1.6487,\\ 1.8221$. Simpson's weights run $1, 4, 2, 4, 2, 4, 1$:" },
        { type: "math", tex: "I = \\tfrac{0.1}{3}\\left[\\,1 + 4(1.1052 + 1.3499 + 1.6487) + 2(1.2214 + 1.4918) + 1.8221\\right] = 0.82212" },
        { type: "p", text: "The exact value is $e^{0.6} - 1 = 0.8221$ — five-figure agreement from seven numbers. **Asked in:** composite Trapezoid + Simpson is Fall 2023 Q2(d); Romberg is Fall 2024 A2(f) and Spring 2023 Q2(d); Weddle is Spring 2024 Q2(h); the derivation of the rule is Fall 2024 A1(c) and Spring 2024 Q1(f)." },
        { type: "exam", text: "Ordinates table with $h$ stated, the weight pattern shown substituted, the total — and a comparison line against the exact value when it exists." },
      ],
    },
    {
      heading: 'Why we integrate numerically',
      blocks: [
        {
          type: 'p',
          text: '**Numerical integration** obtains approximate answers for definite integrals that cannot be solved analytically (Shanker Rao, Ch. 9). We use it when the antiderivative of $f(x)$ does not exist in closed form, or when $f(x)$ is not known explicitly and we are given only a set of values $f(x_i)$.',
        },
        {
          type: 'p',
          text: 'The method is always the same: fit an interpolation polynomial $\\varphi(x)$ to the given ordinates and integrate **that** polynomial over the limits. The difference $\\int_a^b f(x)dx - \\int_a^b \\varphi(x)dx$ is the **error of approximation**. Integrating a polynomial is called **quadrature**.',
        },
        {
          type: 'p',
          text: 'Every rule in this chapter is obtained by choosing a low-degree interpolant for one panel and integrating it exactly:',
        },
        {
          type: 'table',
          head: ['Rule', 'Interpolant on one panel', 'Exact for polynomials of degree'],
          rows: [
            ['Trapezoidal', 'straight line (2 points)', '1'],
            ["Simpson's one-third", 'parabola (3 points)', '3'],
            ["Simpson's three-eighths", 'cubic (4 points)', '3'],
            ["Weddle's", 'degree 6 (7 points)', '5'],
          ],
        },
        {
          type: 'p',
          text: 'That is why these rules are so accurate for smooth functions: a rule that is exact for every cubic will have an error of only the size of the $h^4$ term on a smooth integrand.',
        },
        {
          type: 'exam',
          text: 'A good short answer for "why numerical integration" has three beats: **(1)** the definite integral may have no elementary antiderivative, or the function may be known only as a table of values; **(2)** so we replace $f(x)$ by an interpolation polynomial $\\varphi(x)$ and integrate that instead; **(3)** the difference between the two integrals is the error of approximation, and because the rules are exact for polynomials of low degree the error is very small for smooth integrands. Mention the word **quadrature** — the examiner uses it.',
        },
      ],
    },

    {
      heading: 'The general quadrature formula for equidistant ordinates',
      blocks: [
        {
          type: 'p',
          text: "Shanker Rao's master result is the **general Gauss–Legendre quadrature formula for equidistant ordinates**. Start from Newton's forward interpolation formula and integrate it term by term over $u = 0$ to $u = n$ (that is, $x_0$ to $x_0 + nh$), remembering that $x = x_0 + uh$ so $dx = h\\,du$:",
        },
        {
          type: 'math',
          tex: "y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 + \\cdots",
        },
        {
          type: 'math',
          tex: "I = h\\left[n y_0 + \\frac{n^2}{2}\\Delta y_0 + \\frac{1}{2}\\left(\\frac{n^3}{3}-\\frac{n^2}{2}\\right)\\Delta^2 y_0 + \\frac{1}{6}\\left(\\frac{n^4}{4}-n^3+n^2\\right)\\Delta^3 y_0 + \\cdots\\right]",
        },
        {
          type: 'p',
          text: 'Every numerical integration formula for equidistant ordinates comes out of this one box by putting in a suitable positive integer $n$ and neglecting the higher differences:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '$n = 1$ → the **trapezoidal rule**',
            '$n = 2$ → **Simpson’s one-third rule**',
            '$n = 3$ → **Simpson’s three-eighths rule**',
            '$n = 6$ → **Weddle’s rule**',
          ],
        },
        {
          type: 'p',
          text: 'Notice one beautiful fact: at $n = 2$ the coefficient of $\\Delta^3 y_0$ is $\\frac{n^2(n-2)^2}{24} = 0$. That is exactly why Simpson’s one-third rule is **exact for cubics** — the interpolant reproduces them exactly.',
        },
        {
          type: 'exam',
          text: 'Fall 2024 Q1(c) and Spring 2024 Q1(f) ask you to "derive Simpson’s one-third rule from the general quadrature formula for numerical integration with equidistant ordinates". Write: **(1)** Newton–Gregory forward series and $u = (x-x_0)/h$, $dx = h\\,du$; **(2)** the general quadrature formula; **(3)** put $n = 2$ and neglect the third and higher differences; **(4)** substitute $\\Delta y_0 = y_1-y_0$ and $\\Delta^2 y_0 = y_2-2y_1+y_0$ and simplify to the boxed rule.',
        },
      ],
    },

    {
      heading: 'The trapezoidal rule',
      blocks: [
        {
          type: 'p',
          text: 'Putting $n = 1$ in the general quadrature formula (or simply replacing the curve by straight lines) gives the **trapezoidal rule**:',
        },
        {
          type: 'math',
          tex: "I = \\int_{a}^{b} f(x)dx \\approx \\frac{h}{2}\\left[y_0 + 2(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]",
        },
        {
          type: 'p',
          text: 'Each pair of ordinates contributes the area of a trapezium, so the formula is the sum of the areas of $n$ trapeziums — this is why it is also called the **composite trapezoidal rule**. The truncation error is',
        },
        {
          type: 'math',
          tex: "E \\approx -\\frac{(b-a)h^2}{12}f''(\\xi), \\qquad a < \\xi < b",
        },
        {
          type: 'note',
          text: 'Shanker Rao’s note: the trapezoidal rule can be applied to **any** number of subintervals, odd or even. That is its one practical advantage over every other rule here — it is never blocked by a parity requirement.',
        },
        {
          type: 'p',
          text: 'It is the least accurate of the four (error $\\propto h^2$), but it is also the most robust, and it is the first column of every Romberg table. Spring 2023 Q2(c) uses it directly: the wind force on a skyscraper is to be summed as $I = \\frac{h}{2}\\left(F_0 + 2\\sum_{i=1}^{5}F_i + F_6\\right)$.',
        },
        {
          type: 'exam',
          text: 'Write $h = \\frac{b-a}{n}$, list the ordinates $y_0,\\dots,y_n$, then substitute: $I \\approx \\frac{h}{2}\\left[y_0 + 2(y_1+\\cdots+y_{n-1}) + y_n\\right]$. Show the grouping of the odd and even ordinates inside the bracket — that grouping is where the marks are. Box the value.',
        },
      ],
    },

    {
      heading: "Simpson's one-third rule",
      blocks: [
        {
          type: 'p',
          text: "Putting $n = 2$ in the general quadrature formula and neglecting the third and higher order differences gives **Simpson's one-third rule** — the rule that appears in every paper on this syllabus:",
        },
        {
          type: 'math',
          tex: "I = \\int_{a}^{b} f(x)dx \\approx \\frac{h}{3}\\left[y_0 + 4(y_1 + y_3 + y_5 + \\cdots) + 2(y_2 + y_4 + y_6 + \\cdots) + y_n\\right]",
        },
        {
          type: 'p',
          text: 'The **odd** ordinates carry the weight 4, the **even** interior ordinates the weight 2, and the two end ordinates the weight 1. The truncation error is',
        },
        {
          type: 'math',
          tex: "E \\approx -\\frac{(b-a)h^4}{180}f^{(4)}(\\xi), \\qquad a < \\xi < b",
        },
        {
          type: 'note',
          text: "Simpson's one-third rule can be applied **only** when the interval $[a,b]$ is divided into an **even** number of subintervals — the rule works on pairs of subintervals. This is the single most common way to lose marks.",
        },
        {
          type: 'p',
          text: 'The **composite** version simply applies the rule to each pair of subintervals in turn; the result is the same boxed formula, and it is exact for any polynomial of degree up to three.',
        },
        {
          type: 'exam',
          text: 'Write $h = \\frac{b-a}{n}$ and check first that $n$ is even. Then collect the ordinates into three groups and substitute: $I \\approx \\frac{h}{3}\\left[y_0 + 4\\sum_{\\text{odd}} y_i + 2\\sum_{\\text{even}} y_i + y_n\\right]$. Show the sums numerically, e.g. $4(0.17609 + 0.39794 + 0.54407 + \\cdots)$. Box the answer.',
        },
      ],
    },

    {
      heading: "Simpson's three-eighths rule",
      blocks: [
        {
          type: 'p',
          text: "Putting $n = 3$ in the general quadrature formula (i.e. assuming that within any three consecutive subintervals the interpolating polynomial is of degree 3) gives **Simpson's three-eighths rule**:",
        },
        {
          type: 'math',
          tex: "I = \\int_{a}^{b} f(x)dx \\approx \\frac{3h}{8}\\left[y_0 + 3(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]",
        },
        {
          type: 'p',
          text: 'The truncation error is slightly larger than for the one-third rule:',
        },
        {
          type: 'math',
          tex: "E \\approx -\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi), \\qquad a < \\xi < b",
        },
        {
          type: 'note',
          text: "Shanker Rao’s note: Simpson's three-eighths rule can be applied when the range $[a,b]$ is divided into a number of subintervals that must be a **multiple of three**. And in the formula the end ordinates carry the weight **1**, not 3 — only the interior ones carry the 3.",
        },
        {
          type: 'p',
          text: 'So when the number of subintervals is odd, or a multiple of three but not even, the 3/8 rule is the rule to reach for; when it is even, the one-third rule is more accurate.',
        },
        {
          type: 'exam',
          text: 'Write $h = \\frac{b-a}{n}$ and check that $n$ is a multiple of 3, then substitute into $\\frac{3h}{8}\\left[y_0 + 3\\sum_{i=1}^{n-1} y_i + y_n\\right]$. Remember the factor $\\frac{3h}{8}$, not $\\frac{h}{3}$.',
        },
      ],
    },

    {
      heading: "Weddle's rule",
      blocks: [
        {
          type: 'p',
          text: "Putting $n = 6$ in the general quadrature formula — i.e. assuming a degree-6 interpolant over six consecutive subintervals — gives **Weddle's rule**:",
        },
        {
          type: 'math',
          tex: "I = \\int_{a}^{b} f(x)dx \\approx \\frac{3h}{10}\\left[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6 + \\cdots + y_n\\right]",
        },
        {
          type: 'p',
          text: "The weights repeat with the pattern $1, 5, 1, 6, 1, 5$. The last coefficient that the general quadrature formula produces for this case is $\\frac{41}{140} = \\frac{3}{10} - \\frac{1}{140}$; Shanker Rao takes $\\frac{3}{10}$ instead, so the difference $\\frac{1}{140}$ lands in the error term — and that difference vanishes for every polynomial of degree 5 or lower.",
        },
        {
          type: 'math',
          tex: "E \\approx -\\frac{h^7}{140}f^{(6)}(\\xi)",
        },
        {
          type: 'note',
          text: "Shanker Rao's notes on Weddle's rule: it requires at least **seven consecutive equispaced ordinates**; it is **more accurate** than the trapezoidal and Simpson rules; and if $f(x)$ is a polynomial of degree 5 or lower it gives an **exact** result.",
        },
        {
          type: 'p',
          text: 'The six-subinterval requirement is the price of that accuracy: with a multiple of six subintervals Weddle’s rule is the most accurate of the four, but it cannot be used on an arbitrary table.',
        },
        {
          type: 'exam',
          text: 'Write $h = \\frac{b-a}{6}$, list the seven ordinates, then substitute into $\\frac{3h}{10}\\left[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6\\right]$. Show each weighted term before adding — the pattern of the weights is what the examiner is checking.',
        },
      ],
    },

    {
      heading: 'Romberg integration',
      blocks: [
        {
          type: 'p',
          text: 'The trapezoidal rule has an error nearly proportional to $h^2$, so refining the step divides the error by 4. That is the raw material for a much better answer: evaluate the trapezoidal rule at $h$ and at $h/2$, and use the two values to **extrapolate** the error away (Richardson’s method).',
        },
        {
          type: 'math',
          tex: "I_1 = I + ch_1^2, \\qquad I_2 = I + ch_2^2 \\quad\\Longrightarrow\\quad I = I_2 + \\frac{I_2 - I_1}{3} = \\frac{4I_2 - I_1}{3} \\quad (h_2 = h_1/2)",
        },
        {
          type: 'p',
          text: 'Applying this formula again and again — each time to the two latest results — is **Romberg integration** (Shanker Rao §9.10, and the way it was worked in class). Take the trapezoidal rule at $h$, $h/2$, $h/4$ (start with at least two strips), call the results $I(h)$, $I(h/2)$, $I(h/4)$, and combine neighbours:',
        },
        {
          type: 'math',
          tex: "I\\left(h, \\tfrac{h}{2}\\right) = \\frac{4I\\left(\\frac{h}{2}\\right) - I(h)}{3}, \\qquad I\\left(\\tfrac{h}{2}, \\tfrac{h}{4}\\right) = \\frac{4I\\left(\\frac{h}{4}\\right) - I\\left(\\frac{h}{2}\\right)}{3}, \\qquad I\\left(h, \\tfrac{h}{2}, \\tfrac{h}{4}\\right) = \\frac{4I\\left(\\frac{h}{2}, \\frac{h}{4}\\right) - I\\left(h, \\frac{h}{2}\\right)}{3}",
        },
        {
          type: 'p',
          text: 'The values are laid out in a triangle — each new entry sits between the two it came from:',
        },
        {
          type: 'math',
          tex: "\\begin{array}{ccc} I(h) & & \\\\ & I(h, h/2) & \\\\ I(h/2) & & I(h, h/2, h/4) \\\\ & I(h/2, h/4) & \\\\ I(h/4) & & \\end{array}",
        },
        {
          type: 'p',
          text: 'Shanker Rao’s Example 9.14, $\\int_0^{1.2}\\frac{dx}{1+x}$ correct to 4 decimal places with $h = 0.6, 0.3, 0.15$:',
        },
        {
          type: 'table',
          head: ['$h$', 'trapezoid $I(h)$', 'first level', 'second level'],
          rows: [
            ['0.6', '0.8113', '—', '—'],
            ['0.3', '0.7943', '$\\frac{4(0.7943) - 0.8113}{3} = 0.7886$', '—'],
            ['0.15', '0.7899', '$\\frac{4(0.7899) - 0.7943}{3} = 0.7884$', '$\\frac{4(0.7884) - 0.7886}{3} = 0.7883$'],
          ],
        },
        {
          type: 'p',
          text: 'The computation is stopped when two successive values are very close to each other — here $0.7884$ and $0.7883$, so $I = 0.7883$ (the exact value is $\\ln 2.2 = 0.78846$).',
        },
        {
          type: 'note',
          text: 'Two forms of Romberg exist. Shanker Rao and the class notes use $\\frac{4I_{\\text{fine}} - I_{\\text{coarse}}}{3}$ at **every** level. The standard form (Chapra and most other books) divides the $j$-th column by $4^j - 1$: $R_{k,j} = R_{k,j-1} + \\frac{R_{k,j-1} - R_{k-1,j-1}}{4^j - 1}$ — 3 for the first column, exactly as above, then 15, 63, …, because each column removes one more power of $h^2$. Beyond the first column the standard form is a little more accurate (Example 9.14 gives $0.7884$ instead of $0.7883$). Write the class form in the exam; the first extrapolated column is identical in both.',
        },
        {
          type: 'exam',
          text: 'Write the trapezoidal values for $h$, $h/2$, $h/4$ (add $h/8$ if the required accuracy is not reached) down the first column, then every later entry as $\\frac{4 \\times \\text{lower} - \\text{upper}}{3}$. Show each substitution, e.g. $I(0.6, 0.3) = \\frac{4 \\times 0.7943 - 0.8113}{3} = 0.7886$, and box the last entry.',
        },
      ],
    },

    {
      heading: 'Choosing a rule and estimating the error',
      blocks: [
        {
          type: 'p',
          text: 'Before you compute anything, read the question for the number of subintervals (or ordinates) and the accuracy asked for:',
        },
        {
          type: 'table',
          head: ['Rule', 'Subintervals required', 'Error', 'Exact for degree'],
          rows: [
            ['Trapezoidal', 'any number', '$-\\frac{(b-a)h^2}{12}f\'\'(\\xi)$', '1'],
            ["Simpson's one-third", '**even** number', "$-\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$", '3'],
            ["Simpson's three-eighths", '**multiple of 3**', "$-\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$", '3'],
            ["Weddle's", '**multiple of 6**', "$-\\frac{h^7}{140}f^{(6)}(\\xi)$", '5'],
          ],
        },
        {
          type: 'p',
          text: 'If the required count does not fit a rule, split the range: use Simpson’s one-third rule on the largest even block and the trapezoidal rule on the leftover piece (or Simpson’s 3/8 on three subintervals and 1/3 on the remaining two).',
        },
        {
          type: 'p',
          text: 'To quote an error you need the appropriate derivative. If the integrand is given as a formula, differentiate it; if it is given as a table of values, estimate the derivative from the table.',
        },
        {
          type: 'note',
          text: 'Traps that cost marks: using Simpson’s one-third rule with an **odd** number of subintervals; forgetting the factor $\\frac{3h}{8}$ in the 3/8 rule; weighting the end ordinates by 3 in the 3/8 rule; and forgetting the factor $\\frac{3h}{10}$ in Weddle’s rule. Also: when the question says "correct to $k$ decimal places", give the answer to $k$ places **and** compare with the true value if one is supplied.',
        },
        {
          type: 'exam',
          text: 'Before substituting anything, write one line: "$h = \\frac{b-a}{n} = \\ldots$, $n = \\ldots$ is a multiple of $\\ldots$, so I use the $\\ldots$ rule." Then the ordinates, then the weighted sum, then the boxed answer with the units.',
        },
      ],
    },
  ],

  formulas: [
    {
      label: 'General quadrature formula (equidistant ordinates)',
      tex: "I = h\\left[n y_0 + \\frac{n^2}{2}\\Delta y_0 + \\frac{1}{2}\\left(\\frac{n^3}{3}-\\frac{n^2}{2}\\right)\\Delta^2 y_0 + \\frac{1}{6}\\left(\\frac{n^4}{4}-n^3+n^2\\right)\\Delta^3 y_0 + \\cdots\\right]",
      where: 'n = 1 trapezoidal, n = 2 Simpson 1/3, n = 3 Simpson 3/8, n = 6 Weddle',
    },
    {
      label: 'Trapezoidal rule (composite)',
      tex: "I \\approx \\frac{h}{2}\\left[y_0 + 2(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]",
      where: 'Error $E \\approx -\\frac{(b-a)h^2}{12}f\'\'(\\xi)$ — any number of subintervals',
    },
    {
      label: "Simpson's one-third rule",
      tex: "I \\approx \\frac{h}{3}\\left[y_0 + 4(y_1 + y_3 + \\cdots) + 2(y_2 + y_4 + \\cdots) + y_n\\right]",
      where: 'Error $E \\approx -\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$ — needs an even number of subintervals',
    },
    {
      label: "Simpson's three-eighths rule",
      tex: "I \\approx \\frac{3h}{8}\\left[y_0 + 3(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]",
      where: 'Error $E \\approx -\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$ — needs a multiple of three subintervals',
    },
    {
      label: "Weddle's rule",
      tex: "I \\approx \\frac{3h}{10}\\left[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6\\right]",
      where: 'Error $E \\approx -\\frac{h^7}{140}f^{(6)}(\\xi)$ — needs a multiple of six subintervals',
    },
    {
      label: 'Richardson extrapolation (integration)',
      tex: "I = I_2 + \\frac{I_2 - I_1}{3} = \\frac{4I_2 - I_1}{3}",
      where: 'Removes the $O(h^2)$ error of the trapezoidal rule',
    },
    {
      label: 'Romberg (Shanker Rao)',
      tex: "I\\left(h, \\tfrac{h}{2}\\right) = \\frac{4I\\left(\\frac{h}{2}\\right) - I(h)}{3}, \\quad I\\left(h, \\tfrac{h}{2}, \\tfrac{h}{4}\\right) = \\frac{4I\\left(\\frac{h}{2}, \\frac{h}{4}\\right) - I\\left(h, \\frac{h}{2}\\right)}{3}",
      where: 'first column = trapezoidal rule at $h, h/2, h/4, \\dots$; the same $(4 \\cdot \\text{fine} - \\text{coarse})/3$ at every level',
    },
  ],

  examples: [
    {
      title: 'Deriving Simpson’s one-third rule from the general quadrature formula',
      type: 'Theory — Derive',
      question:
        'Derive Simpson’s one-third rule from the general quadrature formula for numerical integration with equidistant ordinates.',
      source: 'Fall 2024 Q1(c) · Spring 2024 Q1(f)',
      marks: 4,
      steps: [
        {
          t: "Newton–Gregory forward series: $y = y_0 + u\\Delta y_0 + \\frac{u(u-1)}{2!}\\Delta^2 y_0 + \\frac{u(u-1)(u-2)}{3!}\\Delta^3 y_0 + \\cdots$ with $u = \\frac{x-x_0}{h}$, so $x = x_0+uh$ and $dx = h\\,du$; $x = x_0 \\Rightarrow u = 0$ and $x = x_0+nh \\Rightarrow u = n$.",
          m: '1 mark',
        },
        {
          t: 'Integrating term by term gives the general quadrature formula $I = h\\left[n y_0 + \\frac{n^2}{2}\\Delta y_0 + \\frac{1}{2}\\left(\\frac{n^3}{3}-\\frac{n^2}{2}\\right)\\Delta^2 y_0 + \\frac{1}{6}\\left(\\frac{n^4}{4}-n^3+n^2\\right)\\Delta^3 y_0 + \\cdots\\right]$.',
          m: '1 mark',
        },
        {
          t: 'Put $n = 2$ and neglect the third and higher order differences: $I = h\\left[2y_0 + 2\\Delta y_0 + \\frac{1}{3}\\Delta^2 y_0\\right]$.',
          m: '1 mark',
        },
        {
          t: 'With $\\Delta y_0 = y_1 - y_0$ and $\\Delta^2 y_0 = y_2 - 2y_1 + y_0$: $I = \\frac{h}{3}\\left[6y_0 + 6(y_1-y_0) + (y_2-2y_1+y_0)\\right] = \\boxed{\\frac{h}{3}(y_0 + 4y_1 + y_2)}$ — Simpson’s one-third rule, exact for cubics because the $\\Delta^3 y_0$ coefficient vanishes when $n = 2$.',
          m: '1 mark',
        },
      ],      answer:
        '$\\boxed{I \\approx \\frac{h}{3}(y_0 + 4y_1 + y_2)}$ — Simpson’s one-third rule; the composite form is $\\frac{h}{3}[y_0 + 4\\sum_{\\text{odd}} y_i + 2\\sum_{\\text{even}} y_i + y_n]$.',
      note: 'Trap: the question asks for the **single-panel** rule $\\frac{h}{3}(y_0+4y_1+y_2)$ first. The composite form is what you use for a table, but the derivation stops at the three-ordinate result.',
      explanation: [
        'The whole derivation rests on one idea: the Newton forward series is a polynomial in $u$, so integrating it is just integrating powers of $u$. The coefficients $\\frac{n^2}{2}$, $\\frac{1}{2}\\left(\\frac{n^3}{3}-\\frac{n^2}{2}\\right)$ and so on are nothing but the integrals $\\int_0^n u\\,du$, $\\frac{1}{2!}\\int_0^n u(u-1)du$, $\\frac{1}{3!}\\int_0^n u(u-1)(u-2)du$.',
        'Once you have the general formula, all four rules are one line each: choose $n$, keep the differences that are allowed, and simplify. The final simplification from differences back to ordinates is the step students lose marks on — write it out in full, as above.',
      ],
    },

    {
      title: 'Velocity gained by an aircraft during take-off',
      type: 'Numerical — Simpson & Trapezoid',
      question:
        'During take-off, an aircraft’s acceleration is $a(t) = 3.2 + 12t - 28t^2 + 32t^3 - 16t^4 + 3t^5$ m/s$^2$. Determine the velocity gained from $t = 0$ to $t = 1.75$ seconds during the take-off roll. Use 7 intervals and choose the most appropriate numerical integration technique(s).',
      source: 'Fall 2024 Q2(e)',
      marks: 6,
      steps: [
        {
          t: 'Velocity gained $= \\int_0^{1.75} a(t)\\,dt$. With 7 subintervals, $h = \\frac{1.75}{7} = 0.25$ s. 7 is odd, so Simpson’s one-third rule cannot cover the whole range, and it is not a multiple of 3 either. The most accurate split uses only Simpson rules: 7 = 4 + 3 — the one-third rule on the first 4 subintervals ($t = 0 \\to 1$) and the three-eighths rule on the last 3 ($t = 1 \\to 1.75$).',
          m: '1 mark',
        },
        {
          t: 'Ordinates $a(t)$: $3.20000,\\ 4.89043,\\ 5.29375,\\ 5.59941,\\ 6.20000,\\ 7.04277,\\ 7.98125,\\ 9.12676$ at $t = 0, 0.25, \\dots, 1.75$.',
          m: '1 mark',
        },
        {
          t: "Simpson’s one-third rule on $t = 0 \\to 1$ (4 subintervals): $I_1 = \\frac{0.25}{3}\\left[3.2 + 4(4.89043 + 5.59941) + 2(5.29375) + 6.2\\right] = \\frac{0.25}{3}(61.94686) = 5.16224$.",
          m: '2 marks',
        },
        {
          t: 'Simpson’s three-eighths rule on $t = 1 \\to 1.75$ (3 subintervals): $I_2 = \\frac{3(0.25)}{8}\\left[6.2 + 3(7.04277 + 7.98125) + 9.12676\\right] = 0.09375(60.39882) = 5.66239$. Total velocity gained $= I_1 + I_2 = 10.82463$ m/s.',
          m: '1 mark',
        },
        {
          t: 'Check by integrating the polynomial exactly: $\\int_0^{1.75} a(t)dt = \\left[3.2t + 6t^2 - \\frac{28}{3}t^3 + 8t^4 - \\frac{16}{5}t^5 + \\frac{1}{2}t^6\\right]_0^{1.75} = 10.82499$ m/s, so the numerical error is only about $-0.00036$ m/s. $\\boxed{v(1.75) - v(0) \\approx 10.8246 \\text{ m/s}}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{v(1.75) - v(0) \\approx 10.8246 \\text{ m/s}}$ (exact $10.8250$ m/s)',
      note: 'Trap: "7 intervals" is an odd number of subintervals, so Simpson’s one-third rule cannot be used over the whole range. Split 7 = 4 + 3 and say which piece gets the one-third rule and which the three-eighths rule. Patching the odd strip with the trapezoidal rule ($8.69160 + 2.13850 = 10.83010$) also earns method marks but is about 14 times less accurate (error $+0.0051$).',
      explanation: [
        'The integrand is a polynomial in $t$, so the ordinates are exact and the only error is the quadrature error. With 7 subintervals ($h = 0.25$) no single rule fits: the one-third rule needs an even count, the 3/8 rule needs a multiple of three, Weddle’s needs a multiple of six.',
        'Both Simpson rules are exact for cubics, while the trapezoidal rule is exact only for straight lines — one trapezoidal strip would dominate the error, which is why 4 + 3 is the "most appropriate" choice the question asks for. If the examiner meant **7 ordinates** (6 subintervals, $h = 1.75/6$), then Simpson’s one-third rule applies over the whole range and gives $10.8201$ m/s — and Weddle’s rule, which is exact for polynomials of degree 5, would give the exact $10.8250$ m/s.',
      ],
    },

    {
      title: 'Romberg integration of (2x² + x)e⁻ˣ from 1 to 3',
      type: 'Numerical — Romberg',
      question:
        'Use Romberg’s integration to calculate $\\int_1^3 (2x^2 + x)e^{-x}dx$ correct up to 4 decimal places. Compare the result with the true value 2.5226.',
      source: 'Fall 2024 Q2(f)',
      marks: 6,
      steps: [
        {
          t: '$f(x) = (2x^2+x)e^{-x}$; take $h = 1, 0.5, 0.25$. Ordinates: $f(1) = 1.103638$, $f(1.5) = 1.338781$, $f(2) = 1.353353$, $f(2.5) = 1.231275$, $f(3) = 1.045529$ (and the quarter points for $h = 0.25$).',
          m: '1 mark',
        },
        {
          t: 'Trapezoidal rule: $I(1) = \\frac{1}{2}[1.103638 + 2(1.353353) + 1.045529] = 2.427936$; $I(0.5) = \\frac{0.5}{2}[1.103638 + 2(1.338781 + 1.353353 + 1.231275) + 1.045529] = 2.498996$; $I(0.25) = 2.516737$.',
          m: '2 marks',
        },
        {
          t: 'First level: $I(1, 0.5) = \\frac{4(2.498996) - 2.427936}{3} = 2.522683$; $I(0.5, 0.25) = \\frac{4(2.516737) - 2.498996}{3} = 2.522650$.',
          m: '1 mark',
        },
        {
          t: 'Second level: $I(1, 0.5, 0.25) = \\frac{4(2.522650) - 2.522683}{3} = 2.522639$. The last two values agree to 4 decimal places.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{I \\approx 2.5226}$; against the true value $2.5226$ the error is $|2.522639 - 2.5226| \\approx 0.00004$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I \\approx 2.5226 \\text{ (Romberg gives } 2.522639;\\ \\text{true value } 2.5226)}$',
      note: 'Trap: the trapezoidal values alone ($2.4279$, $2.4990$, $2.5167$) are NOT the answer — the answer is the last entry, after the extrapolation. The standard $4^j - 1$ form (see the lesson note) gives $2.522645$ here; both round to $2.5226$.',
      explanation: [
        'Romberg is the trapezoidal rule plus Richardson extrapolation at every level. The trapezoidal error is proportional to $h^2$, so halving $h$ cuts it by four, and $\\frac{4I(h/2) - I(h)}{3}$ cancels it.',
        'This is Shanker Rao’s layout (Example 9.14): three trapezoidal values at $h, h/2, h/4$, two first-level values, one second-level value. Show every substitution so the examiner sees the formula being used.',
      ],
    },

    {
      title: 'Romberg integration of e⁻ˣ² from 0 to 1',
      type: 'Numerical — Romberg',
      question:
        'Find the value of $\\int_0^1 e^{-x^2}dx$ correct up to 4 decimal places using Romberg integration method.',
      source: 'Spring 2023 Q2(d)',
      marks: 6,
      steps: [
        {
          t: '$f(x) = e^{-x^2}$; take $h = 0.5, 0.25, 0.125$. $f(0) = 1$, $f(0.25) = 0.939413$, $f(0.5) = 0.778801$, $f(0.75) = 0.569783$, $f(1) = 0.367879$ (and the eighth points for $h = 0.125$).',
          m: '1 mark',
        },
        {
          t: 'Trapezoidal rule: $I(0.5) = \\frac{0.5}{2}[1 + 2(0.778801) + 0.367879] = 0.731370$; $I(0.25) = \\frac{0.25}{2}[1 + 2(0.939413 + 0.778801 + 0.569783) + 0.367879] = 0.742984$; $I(0.125) = 0.745866$.',
          m: '2 marks',
        },
        {
          t: 'First level: $I(0.5, 0.25) = \\frac{4(0.742984) - 0.731370}{3} = 0.746855$; $I(0.25, 0.125) = \\frac{4(0.745866) - 0.742984}{3} = 0.746826$.',
          m: '1 mark',
        },
        {
          t: 'Second level: $I(0.5, 0.25, 0.125) = \\frac{4(0.746826) - 0.746855}{3} = 0.746816$; the last two values agree to 4 decimal places.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{I \\approx 0.7468}$ (the exact value is $0.7468241$).',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I \\approx 0.7468 \\text{ (Romberg gives } 0.746816;\\ \\text{exact } 0.7468241)}$',
      note: 'Trap: the trapezoidal column alone would give only $0.7459$ to 4 decimal places — the extrapolation is what earns the accuracy.',
      explanation: [
        'The integrand has no elementary antiderivative ($\\int e^{-x^2}dx$ is the error function), which is exactly why the question asks for a numerical method.',
        'Note how the values converge: $0.7314 \\to 0.7430 \\to 0.7459$ in the trapezoidal column, but $0.7469$, $0.7468$, $0.7468$ once Richardson extrapolation is applied. Stop when two successive values agree to the required number of decimal places.',
      ],
    },

    {
      title: 'Romberg integration of 1/(1 + x) from 0 to 1.2',
      type: 'Numerical — Romberg',
      question: 'Using Romberg’s method compute $I = \\int_0^{1.2} \\dfrac{dx}{1 + x}$ correct to 4 decimal places.',
      source: 'Shanker Rao Ch 9, Ex. 9.14 (worked in class)',
      marks: 6,
      steps: [
        {
          t: 'Take $h = 0.6, 0.3, 0.15$. $f(x) = \\frac{1}{1+x}$ at $x = 0, 0.15, \\dots, 1.2$: $1,\\ 0.8696,\\ 0.7692,\\ 0.6897,\\ 0.6250,\\ 0.5714,\\ 0.5263,\\ 0.4878,\\ 0.4545$.',
          m: '1 mark',
        },
        {
          t: 'Trapezoidal rule: $I(0.6) = \\frac{0.6}{2}[1 + 0.4545 + 2(0.6250)] = 0.8113$; $I(0.3) = \\frac{0.3}{2}[1 + 0.4545 + 2(0.7692 + 0.6250 + 0.5263)] = 0.7943$; $I(0.15) = \\frac{0.15}{2}[1 + 0.4545 + 2(0.8696 + 0.7692 + 0.6897 + 0.6250 + 0.5714 + 0.5263 + 0.4878)] = 0.7899$.',
          m: '2 marks',
        },
        {
          t: 'First level: $I(0.6, 0.3) = \\frac{4(0.7943) - 0.8113}{3} = 0.7886$; $I(0.3, 0.15) = \\frac{4(0.7899) - 0.7943}{3} = 0.7884$.',
          m: '1 mark',
        },
        {
          t: 'Second level: $I(0.6, 0.3, 0.15) = \\frac{4(0.7884) - 0.7886}{3} = 0.7883$.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{I \\approx 0.7883}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I = \\int_0^{1.2}\\frac{dx}{1+x} \\approx 0.7883}$ (exact $\\ln 2.2 = 0.78846$)',
      note: 'Trap: the book’s printed table shows $0.7948$ for $I(0.3)$ — a misprint; its own working gives $0.7943$, and that is the value the rest of the table uses.',
      explanation: [
        'Each trapezoidal value reuses the previous ordinates and adds the new midpoints, so halving $h$ is cheap.',
        'The class worked this exact example (Medha’s notes, page 33–34) with the same layout: $I(h)$, $I(h/2)$, $I(h/4)$, then $I(h, h/2)$, $I(h/2, h/4)$, then $I(h, h/2, h/4)$.',
      ],
    },

    {
      title: 'Composite trapezoidal and Simpson’s one-third rule for ∫₀¹ dx/(1+x²)',
      type: 'Numerical — Trapezoid & Simpson',
      question:
        'Implement composite trapezoidal and Simpson’s 1/3 rule to find the value of $\\int_0^1 \\frac{1}{1+x^2}dx$ by taking five subintervals.',
      source: 'Fall 2023 Q2(d)',
      marks: 6,
      steps: [
        {
          t: '$h = \\frac{1-0}{5} = 0.2$; ordinates $y_i = \\frac{1}{1+x_i^2}$: $1.00000,\\ 0.96154,\\ 0.86207,\\ 0.73529,\\ 0.60976,\\ 0.50000$.',
          m: '1 mark',
        },
        {
          t: 'Composite trapezoidal: $I_T = \\frac{h}{2}\\left[y_0 + 2(y_1+y_2+y_3+y_4) + y_5\\right] = 0.1\\left[1.00000 + 2(3.16866) + 0.50000\\right] = 0.1(7.83732) = 0.78373$.',
          m: '1 mark',
        },
        {
          t: "Simpson's one-third rule needs an **even** number of subintervals, so take 4 of them ($h = 0.25$): ordinates $1.000000,\\ 0.941176,\\ 0.800000,\\ 0.640000,\\ 0.500000$. $I_S = \\frac{0.25}{3}\\left[1 + 4(0.941176 + 0.640000) + 2(0.800000) + 0.500000\\right] = \\frac{0.25}{3}(9.42471) = 0.78539$.",
          m: '2 marks',
        },
        {
          t: 'To use all five subintervals in one go, apply Simpson’s 3/8 rule to the first three and Simpson’s 1/3 to the last two: $\\frac{3h}{8}(y_0+3y_1+3y_2+y_3) + \\frac{h}{3}(y_3+4y_4+y_5) = 0.540459 + 0.244955 = 0.78541$.',
          m: '1 mark',
        },
        {
          t: 'Exact value $\\frac{\\pi}{4} = 0.78540$; the trapezoidal rule is off by $0.00167$ while Simpson’s rule is off by about $6 \\times 10^{-6}$. $\\boxed{I_T = 0.78373,\\qquad I_S = 0.78539 \\; (\\text{exact } 0.78540)}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I_T = 0.78373,\\qquad I_S = 0.78539 \\; (\\text{exact } \\frac{\\pi}{4} = 0.78540)}$',
      note: 'Trap: Simpson’s one-third rule cannot take five subintervals. Write "Simpson’s 1/3 needs an even count, so I use four subintervals" — do not silently use five.',
      explanation: [
        'This integrand is the classic one whose exact value is known, $\\arctan 1 = \\frac{\\pi}{4}$, which is why the paper can ask you to compare. The trapezoidal rule loses about three digits relative to Simpson’s rule, because its error falls like $h^2$ while Simpson’s falls like $h^4$.',
        'If the question insists on five subintervals for Simpson, the 3/8 + 1/3 split shown in the script is the accepted answer, and it is still more accurate than the trapezoidal rule.',
      ],
    },

    {
      title: "Weddle's rule for $\\int_0^3 (2x - x^2)\\,dx$",
      type: 'Numerical — Weddle',
      question: "Evaluate $\\int_0^3 (2x - x^2)\\,dx$ by using Weddle's rule, taking seven ordinates. Also, compare the result with the exact value and determine the error.",
      source: 'Spring 2024 Q2(h)',
      marks: 6,
      steps: [
        { t: "Seven ordinates means six subintervals: $h = \\frac{3-0}{6} = 0.5$. Ordinates $y_i = 2x_i - x_i^2$ at $x = 0, 0.5, 1, 1.5, 2, 2.5, 3$: $y_0 = 0,\\ y_1 = 0.75,\\ y_2 = 1,\\ y_3 = 0.75,\\ y_4 = 0,\\ y_5 = -1.25,\\ y_6 = -3$.", m: '2 marks' },
        { t: "Weddle's rule: $I = \\frac{3h}{10}\\left[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6\\right]$.", m: '1 mark' },
        { t: "$I = \\frac{3(0.5)}{10}\\left[0 + 5(0.75) + 1 + 6(0.75) + 0 + 5(-1.25) + (-3)\\right] = 0.15\\left[0 + 3.75 + 1 + 4.5 + 0 - 6.25 - 3\\right] = 0.15(0) = 0$.", m: '1 mark' },
        { t: "Exact value: $\\left[x^2 - \\frac{x^3}{3}\\right]_0^3 = 9 - \\frac{27}{3} = 0$.", m: '1 mark' },
        { t: 'Error $= 0 - 0 = 0$: the rule is **exact**, because Weddle\'s rule is exact for every polynomial of degree five or lower and $2x - x^2$ is only a quadratic.', m: '1 mark' },
      ],
      answer: "$\\boxed{I = 0 \\ (\\text{exact value } 0,\\ \\text{error } 0)}$",
      note: 'Trap: the ordinates go **negative** after $x = 2$ (the integrand $2x-x^2$ changes sign there), and the weighted sum cancels exactly. Do not “correct” a negative ordinate — and do not read the limit as 2: the paper integrates from 0 to 3.',
      explanation: [
        'The weighted sum $\\left[0 + 3.75 + 1 + 4.5 + 0 - 6.25 - 3\\right]$ is exactly zero, and so is the integral of $2x - x^2$ over $[0,3]$: the area above the axis on $[0, 2]$ ($\\tfrac{4}{3}$) cancels the area below it on $[2, 3]$ ($-\\tfrac{4}{3}$). That is not luck: Weddle’s rule reproduces any polynomial of degree 5 or lower exactly, and $2x - x^2$ is a polynomial of degree 2.',
        'The rule needs a multiple of six subintervals, and seven ordinates is exactly six subintervals — which is why the paper says seven ordinates.',
        'The paper asks for the error precisely so that you can see this: quoting "error = 0" with the reason (exactness for low-degree polynomials) earns the mark; a numerical value alone does not.',
      ],
    },

    {
      title: "Simpson's three-eighths rule for ∫₀¹ dx/(1+x²)",
      type: 'Numerical — Simpson 3/8',
      question:
        'Evaluate $\\int_0^1 \\frac{dx}{1+x^2}$ by Simpson’s three-eighths rule, taking seven ordinates, and compare with the exact value.',
      source: 'Shanker Rao Ch 9, Ex 9.7',
      marks: 6,
      steps: [
        {
          t: 'Seven ordinates means six subintervals: $h = \\frac{1}{6}$. Ordinates: $1.0000000,\\ 0.9729730,\\ 0.9000000,\\ 0.8000000,\\ 0.6923077,\\ 0.5901639,\\ 0.5000000$.',
          m: '1 mark',
        },
        {
          t: "Simpson’s three-eighths rule over the six subintervals: $I = \\frac{3h}{8}\\left[y_0 + 3(y_1+y_2+y_4+y_5) + 2y_3 + y_6\\right]$.",
          m: '1 mark',
        },
        {
          t: '$I = \\frac{3}{48}\\left[1 + 3(0.9729730 + 0.9000000 + 0.6923077 + 0.5901639) + 2(0.8000000) + 0.5000000\\right]$ $= 0.0625(12.5663338) = 0.7853959$.',
          m: '2 marks',
        },
        {
          t: 'Exact value $\\frac{\\pi}{4} = 0.7853982$, so the error is $0.7853959 - 0.7853982 = -0.0000023$.',
          m: '1 mark',
        },
        {
          t: 'The 3/8 rule is exact for cubics; $\\frac{1}{1+x^2}$ is nearly a cubic on $[0,1]$, which is why the error is only about $2 \\times 10^{-6}$.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{I \\approx 0.7853959 \\; (\\text{exact } 0.7853982)}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I \\approx 0.7853959 \\; (\\text{exact } \\frac{\\pi}{4} = 0.7853982,\\; \\text{error } -2.3 \\times 10^{-6})}$',
      note: 'Trap: the end ordinates $y_0$ and $y_n$ have weight **1** and only $y_3$ has weight 2 (it is shared by two panels). Weighting $y_0$ or $y_n$ by 3 gives a wrong answer.',
      explanation: [
        'Over six subintervals the 3/8 rule works as two panels of three subintervals each, and the middle ordinate $y_3$ therefore appears with weight 2, not 3. Written out, the weights are $1, 3, 3, 2, 3, 3, 1$.',
        'The site’s calculator for this rule returns the value above when the ordinates are entered as a table; note that the coefficient of the end ordinates must be 1.',
      ],
    },

    {
      title: "Simpson's one-third rule for ∫₀^0.6 eˣ dx",
      type: 'Numerical — Simpson 1/3',
      question:
        'Find the value of $\\int_0^{0.6} e^x dx$, taking $n = 6$, correct to five significant figures by Simpson’s one-third rule.',
      source: 'Shanker Rao Ch 9, Ex 9.4',
      marks: 6,
      steps: [
        {
          t: '$a = 0$, $b = 0.6$, $n = 6$ (even, so Simpson’s one-third rule applies), $h = \\frac{0.6}{6} = 0.1$.',
          m: '1 mark',
        },
        {
          t: 'Ordinates $y = e^x$: $1.00000,\\ 1.10517,\\ 1.22140,\\ 1.34986,\\ 1.49182,\\ 1.64872,\\ 1.82212$.',
          m: '1 mark',
        },
        {
          t: "Simpson’s one-third rule: $I = \\frac{h}{3}\\left[y_0 + 4(y_1+y_3+y_5) + 2(y_2+y_4) + y_6\\right]$.",
          m: '1 mark',
        },
        {
          t: '$I = \\frac{0.1}{3}\\left[1.00000 + 4(1.10517 + 1.34986 + 1.64872) + 2(1.22140 + 1.49182) + 1.82212\\right] = \\frac{0.1}{3}(24.66356) = 0.8221187$.',
          m: '2 marks',
        },
        {
          t: 'Exact value $e^{0.6} - 1 = 0.8221188$, so the rule is accurate to about seven decimal places — as expected from an $O(h^4)$ formula with $h = 0.1$.',
          m: '1 mark',
        },
        {
          t: '$\\boxed{I \\approx 0.82212}$',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{I \\approx 0.82212}$',
      note: 'Trap: the exact answer is $e^{0.6}-1$, **not** $e^{0.6}$. The lower limit of integration must be subtracted.',
      explanation: [
        'Simpson’s one-third rule is exact for cubics and its error falls like $h^4$; with $h = 0.1$ that is $10^{-4}$ times a constant, which is why the answer agrees with the exact value to seven decimal places for the smooth integrand $e^x$.',
        'The table above is rounded to five digits, as in the book. If you evaluate the ordinates to full precision the calculator returns $0.8221193$ — the $2 \\times 10^{-7}$ difference is the rounding of the table, not the rule.',
      ],
    },
  ],

  flashcards: [
    {
      front: 'What is quadrature?',
      back: 'Fitting an interpolation polynomial to tabulated values of $f(x)$ and integrating that polynomial instead of $f(x)$. The difference between the two integrals is the **error of approximation**.',
    },
    {
      front: 'General quadrature formula — what n gives which rule?',
      back: 'n = 1 → trapezoidal rule; n = 2 → Simpson’s one-third rule; n = 3 → Simpson’s three-eighths rule; n = 6 → Weddle’s rule.',
    },
    {
      front: 'Trapezoidal rule and its error',
      back: "$I \\approx \\frac{h}{2}[y_0 + 2(y_1+\\cdots+y_{n-1}) + y_n]$, error $E \\approx -\\frac{(b-a)h^2}{12}f''(\\xi)$. It works with **any** number of subintervals.",
    },
    {
      front: "Simpson's one-third rule and its error",
      back: "$I \\approx \\frac{h}{3}[y_0 + 4\\sum_{\\text{odd}} y_i + 2\\sum_{\\text{even}} y_i + y_n]$, error $E \\approx -\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$. It needs an **even** number of subintervals.",
    },
    {
      front: "Simpson's three-eighths rule and its error",
      back: "$I \\approx \\frac{3h}{8}[y_0 + 3(y_1+\\cdots+y_{n-1}) + y_n]$, error $E \\approx -\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$. It needs a **multiple of three** subintervals; the end ordinates have weight 1.",
    },
    {
      front: "Weddle's rule and its error",
      back: "$I \\approx \\frac{3h}{10}[y_0 + 5y_1 + y_2 + 6y_3 + y_4 + 5y_5 + y_6]$, error $E \\approx -\\frac{h^7}{140}f^{(6)}(\\xi)$. It needs a **multiple of six** subintervals and is exact for polynomials of degree ≤ 5.",
    },
    {
      front: 'Which rules are exact for polynomials of degree 3?',
      back: 'Simpson’s one-third rule and Simpson’s three-eighths rule (both fit a cubic over one panel). Weddle’s rule is exact up to degree 5.',
    },
    {
      front: 'What is the Romberg recurrence?',
      back: "Shanker Rao / class form: $I(h, h/2) = \\frac{4I(h/2) - I(h)}{3}$, and the same $(4 \\cdot \\text{fine} - \\text{coarse})/3$ at every later level. The standard (Chapra) form divides column $j$ by $4^j - 1$: 3, then 15, 63, …",
    },
    {
      front: 'Richardson extrapolation for the trapezoidal rule',
      back: '$I = I_2 + \\frac{I_2-I_1}{3} = \\frac{4I_2 - I_1}{3}$ where $I_1$ uses step $h$ and $I_2$ uses $h/2$. It cancels the $O(h^2)$ error term.',
    },
    {
      front: 'What if the number of subintervals does not fit the rule?',
      back: 'Split the range: use Simpson’s one-third rule on the largest even block and the trapezoidal rule on the leftover piece, or Simpson’s 3/8 on three subintervals and 1/3 on the remaining two.',
    },
    {
      front: 'Trapezoidal rule error vs Simpson’s one-third rule error',
      back: 'Trapezoidal: $O(h^2)$ with $-\\frac{(b-a)h^2}{12}f\'\'(\\xi)$. Simpson 1/3: $O(h^4)$ with $-\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$. Simpson 3/8: $O(h^4)$ with $-\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$.',
    },
    {
      front: 'Why is the trapezoidal rule used for the first column of Romberg?',
      back: 'Because its error is exactly proportional to $h^2$ (up to a constant), which is the form Richardson extrapolation needs in order to cancel it. The trapezoidal rule needs only one function value per new point, so refining it is cheap.',
    },
    {
      front: 'How do you compute the ordinates for a quadrature rule?',
      back: 'Evaluate $f$ at the equally spaced points $x_i = a + ih$; for a table of values, read them off. Then collect the odd and even ordinates into the weighted sums before substituting.',
    },
  ],

  quiz: [
    {
      q: 'Simpson’s one-third rule can be applied when the number of subintervals is …',
      options: ['odd', 'even', 'a multiple of three', 'a multiple of six'],
      answer: 1,
      explain:
        'It works on pairs of subintervals (a quadratic on each pair), so the total must be even.',
    },
    {
      q: 'The truncation error of Simpson’s one-third rule is …',
      options: [
        "$-\\frac{(b-a)h^2}{12}f''(\\xi)$",
        "$-\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$",
        "$-\\frac{3(b-a)h^4}{80}f^{(4)}(\\xi)$",
        "$-\\frac{h^7}{140}f^{(6)}(\\xi)$",
      ],
      answer: 1,
      explain:
        "The one-third rule fits a quadratic per panel, so its error is controlled by the fourth derivative: $E \\approx -\\frac{(b-a)h^4}{180}f^{(4)}(\\xi)$.",
    },
    {
      q: 'Weddle’s rule requires …',
      options: [
        'an even number of subintervals',
        'a multiple of three subintervals',
        'a multiple of six subintervals',
        'seven ordinates at arbitrary spacing',
      ],
      answer: 2,
      explain:
        'Weddle’s rule needs seven consecutive equispaced ordinates, i.e. a multiple of six subintervals, and is exact for polynomials of degree 5 or lower.',
    },
    {
      q: 'In Simpson’s three-eighths rule the coefficient of the end ordinates is …',
      options: ['1', '2', '3', '4'],
      answer: 0,
      explain:
        '$I \\approx \\frac{3h}{8}[y_0 + 3(y_1+\\cdots+y_{n-1}) + y_n]$ — the ends have weight 1; only the interior ordinates carry the 3.',
    },
    {
      q: 'Putting $n = 3$ in the general quadrature formula gives …',
      options: [
        'the trapezoidal rule',
        "Simpson's one-third rule",
        "Simpson's three-eighths rule",
        "Weddle's rule",
      ],
      answer: 2,
      explain:
        'n = 1 gives the trapezoidal rule, n = 2 Simpson’s 1/3, n = 3 Simpson’s 3/8 and n = 6 Weddle’s.',
    },
    {
      q: 'The first column of a Romberg table contains …',
      options: [
        'Simpson’s one-third rule values',
        'the trapezoidal rule values for $h, h/2, h/4, \\dots$',
        'Newton–Cotes weights',
        'the values of the integrand only',
      ],
      answer: 1,
      explain:
        'Romberg starts from the trapezoidal rule and improves it by Richardson extrapolation in each successive column.',
    },
    {
      q: 'In Shanker Rao’s Romberg method, $I(h, h/2, h/4)$ is …',
      options: [
        "$\\frac{4I(h/2, h/4) - I(h, h/2)}{3}$",
        "$\\frac{I(h/2, h/4) + I(h, h/2)}{2}$",
        "$\\frac{4I(h, h/2) - I(h/2, h/4)}{3}$",
        "$\\frac{4I(h/4) - I(h)}{3}$",
      ],
      answer: 0,
      explain:
        'Every level uses the same weights: four times the finer value minus the coarser one, divided by 3 (Shanker Rao §9.10, Example 9.14). The standard textbook form would divide this level by 15 instead.',
    },
    {
      q: 'Which rule is exact for a polynomial of degree 5?',
      options: [
        'the trapezoidal rule',
        "Simpson's one-third rule",
        "Simpson's three-eighths rule",
        "Weddle's rule",
      ],
      answer: 3,
      explain:
        "Weddle's rule fits a degree-6 interpolant over six subintervals and is exact for any polynomial of degree 5 or lower.",
    },
    {
      q: 'For $\\int_0^1 \\frac{dx}{1+x^2}$ with five subintervals, the best plan is …',
      options: [
        'apply Simpson’s one-third rule directly',
        'apply Simpson’s three-eighths rule directly',
        'use Simpson’s one-third rule on four subintervals and the trapezoidal rule on the fifth',
        'apply the trapezoidal rule with h = 0.2 only',
      ],
      answer: 2,
      explain:
        'Five is neither even nor a multiple of three, so the range must be split — Simpson’s 1/3 on four and the trapezoid on the last one.',
    },
    {
      q: 'Weddle’s rule applied to $\\int_0^3 (2x-x^2)dx$ with seven ordinates gives …',
      options: ['0', '9', '2.25', '−1.5'],
      answer: 0,
      explain:
        'The weighted sum $0 + 3.75 + 1 + 4.5 + 0 - 6.25 - 3$ is exactly 0, and the exact integral $[x^2 - x^3/3]_0^3$ is also 0 — Weddle’s rule is exact for quadratics.',
    },
  ],

  solvers: ['trapezoid', 'simpson13', 'simpson38', 'weddle', 'romberg'],
};
