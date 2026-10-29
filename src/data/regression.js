// Regression (statistical / least squares) — CSE 2201.
//
// Sources: Balagurusamy Ch 10 (Regression), Shanker Rao Ch 14 (Regression Analysis),
// Shanker Rao Ch 12 (Curve Fitting — the least-squares derivation and the power-law fit).
//
// Every number here is reproducible with src/lib/solvers.js:
//   leastSquares({ xs, ys })              -> { a, b, r2 }
//   powerLawFit({ xs, ys })               -> { a, b }
//   polyRegression({ xs, ys, degree })    -> { a: [a1..am] }
//   multipleRegression({ xs, zs, ys })    -> { a: [a1, a2, a3] }
// Least squares only — no penalty terms, no regularisation (not in the syllabus).

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Why can't a regression line pass through every data point?",
    options: ["Because lines are straight", "Because real data is noisy, so the points form a cloud, not a line", "Because there are always too few points", "Because least squares forbids it"],
    answer: 1,
    explain: "Measurement wobble and natural variation scatter the points; 'best fit' therefore needs a definition — least squares supplies one.",
  },
  "Start here: the core idea": {
    q: "Why square the residuals before adding them?",
    options: ["Tradition only", "To stop positive and negative misses cancelling and to punish large misses harder", "To keep the numbers small", "Because residuals can be negative and squares cannot be lost"],
    answer: 1,
    explain: "Squaring makes every miss count positively and weights big misses heavily — and it yields clean closed-form normal equations.",
  },
  "Start here: reading the symbols": {
    q: "In $\\hat{y} = a + bx$, what does the hat on $\\hat{y}$ mark?",
    options: ["An estimate error", "A value predicted by the fitted line", "The biggest data value", "A truncated number"],
    answer: 1,
    explain: "'Y-hat' is the model's prediction, as distinct from the measured $y_i$; their difference is the residual.",
  },
  "Start here: your first walk-through": {
    q: "In the walk-through fit, the slope $b$ came from $\\frac{9}{6}$. The $9$ in the numerator is…",
    options: ["$\\sum y - \\sum x$", "$n\\sum xy - \\sum x \\sum y = 69 - 60$", "The residual sum", "$\\sum x^2 - (\\sum x)^2$"],
    answer: 1,
    explain: "With $n\\sum xy = 3(23) = 69$ and $\\sum x\\sum y = 60$, the numerator is their difference, 9; the denominator $42 - 36 = 6$.",
  },
  'Interpolation vs regression': {
    q: 'What is the essential difference between interpolation and regression?',
    options: [
      'Interpolation passes through every tabulated point; regression finds a best-fit curve that minimises the sum of the squared deviations and needs more points than the curve has parameters.',
      'Interpolation is exact and regression is approximate, otherwise they are the same method.',
      'Regression is used when the data are equally spaced; interpolation is used when they are not.',
      'Interpolation needs more points than parameters; regression needs exactly as many points as parameters.',
    ],
    answer: 0,
    explain:
      'Interpolation reproduces the given data exactly: a degree-$n$ polynomial through $n+1$ points is unique. Regression does not go through the points; it chooses the curve for which $\\sum (y_i - \\hat{y}_i)^2$ is smallest, so it needs **more** observations than parameters.',
  },
  'The least-squares criterion': {
    q: 'In the method of least squares, what quantity is made a minimum?',
    options: [
      'The sum of the squares of the vertical distances $e_r = y_r - (a + b x_r)$ of the points from the fitted line.',
      'The sum of the vertical distances themselves.',
      'The largest single deviation between a point and the fitted line.',
      'The horizontal distance between each point and the line.',
    ],
    answer: 0,
    explain:
      'Shanker Rao Ch 12: the best fitting line is the one for which "the sum of the squares of the vertical distances of the points $(x_r, y_r)$ from the line is minimum". Squaring makes the positive and negative deviations add instead of cancelling.',
  },
  'Deriving the normal equations': {
    q: 'How are the normal equations obtained from the least-squares criterion?',
    options: [
      'Differentiate $q = \\sum [y_r - (a + b x_r)]^2$ partially with respect to $a$ and $b$ and equate both to zero.',
      'Differentiate $q$ with respect to $x$ and set the result equal to zero.',
      'Set each residual $e_r$ equal to zero and solve the resulting equations.',
      'Take the average of the data points and draw a line through it.',
    ],
    answer: 0,
    explain:
      'At the minimum of $q$ both partial derivatives vanish: $\\partial q/\\partial a = \\sum -2(y_r - (a + b x_r)) = 0$ and $\\partial q/\\partial b = \\sum -2x_r(y_r - (a + b x_r)) = 0$. Expanding gives $\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$.',
  },
  'Solving the normal equations': {
    q: 'Which pair of formulas gives the slope and the intercept of the least-squares line?',
    options: [
      '$b = \\dfrac{n\\sum xy - (\\sum x)(\\sum y)}{n\\sum x^2 - (\\sum x)^2}$ and $a = \\bar{y} - b\\bar{x}$.',
      '$b = \\dfrac{\\sum xy}{n\\sum x^2}$ and $a = \\bar{y} - \\bar{x}$.',
      '$a = \\dfrac{\\sum y - b\\sum x}{n-1}$ and $b = \\dfrac{\\sum xy}{\\sum x}$.',
      '$a = \\dfrac{\\sum x}{n}$ and $b = \\dfrac{\\sum y}{n}$.',
    ],
    answer: 0,
    explain:
      'Multiplying the first normal equation by $\\sum x$ and the second by $n$, then subtracting, eliminates $a$ and gives the slope; the intercept then follows from $a = \\bar{y} - b\\bar{x}$ (Shanker Rao Ch 12, eqs. 7 and 8).',
  },
  'Least-squares line for the surface-area table': {
    q: 'For the surface-area data ($n = 8$, $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$) the least-squares line is:',
    options: [
      '$A = 1.3526 + 0.010479\\,W$.',
      '$A = 2.1975 + 0.010479\\,W$.',
      '$A = 1.3526 + 0.010479\\,W^2$.',
      '$A = 0.4149 + 0.3799\\,W$.',
    ],
    answer: 0,
    explain:
      '$b = [8(1420.53) - (645)(17.58)]/[8(52303) - 645^2] = 25.14/2399 = 0.010479$, then $a = \\bar{A} - b\\bar{W} = 2.1975 - 0.010479(80.625) = 1.3526$.',
  },
  'Power-law fit by taking logarithms': {
    q: 'To fit $y = a x^b$ by the method of least squares you should:',
    options: [
      'Take logarithms, so $\\ln y = \\ln a + b\\ln x$, and fit a straight line to the points $(\\ln x, \\ln y)$.',
      'Fit a straight line to $(x, y)$ and then raise it to a power.',
      'Differentiate $a x^b$ twice with respect to $x$ and set the result to zero.',
      'Fit the parabola $y = a + bx + cx^2$ to the data.',
    ],
    answer: 0,
    explain:
      'Taking logarithms turns the power law into a straight line in log-log space, so the normal equations apply directly to $(\\ln x, \\ln y)$; the slope of that line is $b$ and $a = e^{\\text{intercept}}$.',
  },
  'Polynomial regression': {
    q: 'Fitting a second-degree polynomial $y = a_1 + a_2x + a_3x^2$ by least squares needs which sums?',
    options: [
      '$n, \\sum x, \\sum x^2, \\sum x^3, \\sum x^4$ and $\\sum y, \\sum yx, \\sum yx^2$',
      '$n, \\sum x, \\sum x^2$ and $\\sum y, \\sum yx$ only',
      '$\\sum \\ln x, \\sum \\ln y$ and $\\sum (\\ln x)^2$',
      '$\\sum x^2$ and $\\sum y^2$ only',
    ],
    answer: 0,
    explain:
      'Three unknowns give three normal equations; the coefficient matrix is $C(j,k) = \\sum x^{j+k-2}$, so powers up to $x^{2m-2} = x^4$ appear, and the right-hand side is $\\sum yx^{j-1}$ for $j = 1, 2, 3$ (Balagurusamy Eq. 10.19).',
  },
  'Multiple linear regression': {
    q: 'For $y = a_1 + a_2x + a_3z$, the third normal equation (from $\\partial Q/\\partial a_3 = 0$) is:',
    options: [
      '$(\\sum z)a_1 + (\\sum xz)a_2 + (\\sum z^2)a_3 = \\sum yz$',
      '$(\\sum z)a_1 + (\\sum x^2)a_2 + (\\sum z^2)a_3 = \\sum yz$',
      '$na_1 + (\\sum x)a_2 + (\\sum z)a_3 = \\sum y$',
      '$(\\sum x)a_1 + (\\sum xz)a_2 + (\\sum z^2)a_3 = \\sum yx$',
    ],
    answer: 0,
    explain:
      'Differentiating $Q = \\sum (y_i - a_1 - a_2x_i - a_3z_i)^2$ with respect to $a_3$ brings down a factor $z_i$, so every term of the first equation is multiplied by $z$ (Balagurusamy Eq. 10.21).',
  },
  'Regression of y on x and of x on y': {
    q: 'When the roles of $x$ and $y$ are swapped to obtain the regression of $x$ on $y$, the normal equations become:',
    options: [
      '$na\' + b\'\\sum y = \\sum x$ and $a\'\\sum y + b\'\\sum y^2 = \\sum xy$.',
      '$na\' + b\'\\sum x = \\sum y$ and $a\'\\sum x + b\'\\sum x^2 = \\sum xy$.',
      '$na\' + b\'\\sum y = \\sum y$ and $a\'\\sum y + b\'\\sum y^2 = \\sum y^2$.',
      '$na\' + b\'\\sum y = \\sum xy$ and $a\'\\sum y + b\'\\sum y^2 = \\sum x$.',
    ],
    answer: 0,
    explain:
      'The two variables simply exchange places in the least-squares set-up (Shanker Rao Ch 14, eqs. (i) and (ii)): the dependent variable goes on the left of the normal equations, the independent one on the right.',
  },
};

export default {
  id: 'regression',
  chapter: 10,
  title: 'Regression (Statistical)',
  wave: 'reg',
  sources: ['Balagurusamy Ch 10', 'Shanker Rao Ch 14'],
  flagged: true,
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Plot the height and weight of twenty people and the picture is a **cloud**, not a line. Real data is noisy — measurement wobble, person-to-person variation — so no straight line passes through all of it. Yet the trend is unmistakably there, and the question 'what is the trend line?' refuses to go away." },
        { type: "p", text: "Regression answers it by first answering a sneakier question: **what does 'best-fitting line' even mean when no line fits?** The choice made here — least squares — defines best as 'smallest total squared miss', and that definition turns a vague wish into two solvable equations." },
        { type: "p", text: "The same machinery, one logarithm later, fits power laws $y = a x^b$ — the past papers' surface-area-versus-weight question is exactly this." },
        { type: "list", items: [
          "Set up the totals table ($\\sum x, \\sum y, \\sum xy, \\sum x^2$).",
          "Solve the two normal equations for slope and intercept.",
          "Judge the fit with residuals.",
          "Linearise $y = ax^b$ with logarithms and fit it the same way.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "For any candidate line, each point misses vertically by a **residual** $e_i = y_i - \\hat{y}_i$. Squaring every residual does two jobs at once: it stops misses above and below the line from cancelling, and it punishes big misses far more than small ones. **Least squares** picks the line whose squared residuals add up least:" },
        { type: "math", tex: "J = \\sum_{i=1}^{n} e_i^2 = \\sum (y_i - a - b x_i)^2 \\;\\longrightarrow\\; \\text{minimise over } a, b" },
        { type: "p", text: "Minimising (the chapter's derivation does it with $\\partial J/\\partial a = 0$ and $\\partial J/\\partial b = 0$) collapses into the two **normal equations**, two straight-line equations in $a$ and $b$ — after which fitting any data set is just arithmetic." },
        { type: "math", tex: "na + b\\sum x = \\sum y, \\qquad a\\sum x + b\\sum x^2 = \\sum xy" },
        { type: "note", text: "Why squares and not plain distances? Absolute misses can cancel (+3 and $-3$ look 'perfect') and are mathematically awkward; squares are always positive, smooth, and give closed-form normal equations." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$x_i, y_i$", "the $i$-th data point", "what was measured"],
          ["$\\hat{y} = a + bx$", "the fitted (predicted) line", "'y-hat' — the model's guess"],
          ["$a$", "intercept of the fitted line", "where the line meets $x = 0$"],
          ["$b$", "slope of the fitted line", "change in $\\hat{y}$ per unit $x$"],
          ["$e_i = y_i - \\hat{y}_i$", "residual: the $i$-th point's miss", "the part the line can't explain"],
          ["$\\sum x, \\sum y, \\sum xy, \\sum x^2$", "the four column totals", "the normal equations' raw material"],
          ["$R^2$", "fraction of variation the line explains", "1 = perfect, 0 = no trend"],
        ] },
        { type: "p", text: "Everything in a least-squares answer flows from the four column totals $\\sum x$, $\\sum y$, $\\sum xy$, $\\sum x^2$ (plus the count $n$). Build them first, and the rest is substitution." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Fall 2023 Q3(c)**: the surface area $A$ of eight people against their weights $W$ ($W = 70, 75, 77, 80, 82, 84, 87, 90$; $A = 2.1, 2.12, 2.15, 2.2, 2.22, 2.23, 2.26, 2.3$ m²). Fit the least-squares straight line." },
        { type: "p", text: "Column totals: $n = 8$, $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$. The normal equations: $8a + 645b = 17.58$ and $645a + 52303b = 1420.53$." },
        { type: "math", tex: "b = \\frac{8(1420.53) - (645)(17.58)}{8(52303) - (645)^2} = \\frac{25.14}{2399} = 0.010479, \\qquad a = 2.1975 - 0.010479(80.625) = 1.3526" },
        { type: "p", text: "The fitted line is $A = 1.3526 + 0.010479\\,W$ — every later regression question is this loop with different columns. **Asked in:** the power-law fit of this very table is Spring 2023 Q3(c); a different power-law fit is Spring 2024 Q2(e); the interpolation-vs-regression discussion is Spring 2024 Q1(g)." },
        { type: "exam", text: "Totals table (with $WA$ and $W^2$ columns), both normal equations written out, then $b$ and $a$ by the named formulas, and the line boxed." },
      ],
    },
    {
      heading: 'Interpolation vs regression',
      blocks: [
        {
          type: 'p',
          text: 'Both fit a curve to tabulated $(x, y)$ data, but they answer different questions. **Interpolation** answers "what is the function between these known points?". **Regression** answers "what is the average relationship, and what value of $y$ should I expect for a new $x$?".',
        },
        {
          type: 'table',
          head: ['', 'Interpolation', 'Regression'],
          rows: [
            ['The curve', 'Passes through **every** tabulated point', 'Passes near the points; it does **not** have to go through them'],
            ['Criterion', 'None — the data fix the curve exactly', 'Least squares: $\\sum (y_i - \\hat{y}_i)^2$ is a minimum'],
            ['Data needed', 'Exactly as many points as the curve has parameters', '**More** points than parameters; the surplus decides the best fit'],
            ['Typical use', 'Tabulate $f(x)$ from a known formula, then read off $f$ between the tabulated values', 'Estimate or forecast $y$ for a given $x$'],
          ],
        },
        {
          type: 'p',
          text: 'Shanker Rao Ch 14 calls the fitted curve a **prediction equation** (or estimating equation): "Regression is the measure of the average relationship between two or more variables in terms of the original units of data." The two regression lines of a pair of variables always meet at the point $(\\bar{x}, \\bar{y})$.',
        },
        {
          type: 'p',
          text: 'Because regression does not have to satisfy every observation, it needs **more points than the number of parameters**: a straight line has two parameters $a, b$, so at least three points are needed before a best-fit line is even determined, and more points make the fit meaningful (they also let you check the fit with $R^2$).',
        },
        {
          type: 'note',
          text: '**Regularisation is not in this syllabus.** No ridge, lasso or elastic net, no $L_1/L_2$ penalty, no feature scaling for a penalty. The course covers the **statistical / least-squares method of Balagurusamy Ch 10** (linear, power-function, polynomial and multiple linear regression). If a question ever asks for a penalty term, it is off-syllabus.',
        },
        {
          type: 'exam',
          text: 'Write the difference as two bullets with the count of points: "**Interpolation** — a curve through every given point; a degree-$n$ polynomial needs $n+1$ points. **Regression** — a curve that minimises $\\sum (y_i - \\hat{y}_i)^2$; it needs *more* points than the number of parameters (a straight line has 2, so at least 3)." Then add one sentence: regression is used to **estimate** $y$ for a given $x$, interpolation to read $f(x)$ between known values.',
        },
      ],
    },
    {
      heading: 'The least-squares criterion',
      blocks: [
        {
          type: 'p',
          text: 'Shanker Rao Ch 12 (12.3.2): the method of least squares — suggested by Legendre — assumes "that the best fitting line is the line for which the sum of the squares of the vertical distances of the points $(x_r, y_r)$ from the line is minimum". It is "more accurate than the graphical method".',
        },
        {
          type: 'math',
          tex: 'e_r = y_r - (a + b x_r)',
        },
        {
          type: 'p',
          text: 'The vertical distance $e_r$ is the difference between the actual ordinate $y_r$ of a point and its theoretical ordinate $a + b x_r$ on the fitted line. The quantity to be minimised is',
        },
        {
          type: 'math',
          tex: 'q = \\sum_{r=1}^{n} e_r^2 = \\sum_{r=1}^{n} \\left[\\, y_r - (a + b x_r) \\right]^2',
        },
        {
          type: 'p',
          text: 'Squaring is what makes the method work: without it the positive and negative deviations would cancel and every line through the centroid would look equally good.',
        },
        {
          type: 'note',
          text: 'The distances are **vertical** (in $y$), because the model is $y = a + b x$ with $y$ dependent. Fitting $x$ on $y$ instead would minimise $\\sum (x_r - a\' - b\' y_r)^2$ — a different problem with a different answer.',
        },
      ],
    },
    {
      heading: 'Deriving the normal equations',
      blocks: [
        {
          type: 'p',
          text: 'The minimum of $q$ is found by differentiating $q$ partially with respect to $a$ and $b$ and equating both to zero (Shanker Rao Ch 12, 12.3.2).',
        },
        {
          type: 'math',
          tex: '\\frac{\\partial q}{\\partial a} = \\sum_{r=1}^{n} -2\\left[\\, y_r - (a + b x_r) \\right] = 0',
        },
        {
          type: 'math',
          tex: '\\frac{\\partial q}{\\partial b} = \\sum_{r=1}^{n} -2x_r\\left[\\, y_r - (a + b x_r) \\right] = 0',
        },
        {
          type: 'p',
          text: 'Divide the first equation by $-2$ and expand the sums: $\\sum y_r - na - b\\sum x_r = 0$. Divide the second by $-2$ and expand: $\\sum x_r y_r - a\\sum x_r - b\\sum x_r^2 = 0$. These two linear equations in the unknowns $a$ and $b$ are the **normal equations**:',
        },
        {
          type: 'math',
          tex: '\\sum y = na + b\\sum x, \\qquad \\sum xy = a\\sum x + b\\sum x^2',
        },
        {
          type: 'p',
          text: 'Since $q$ is a sum of squares it can never be negative, and the normal equations are the stationary conditions that pick out the minimizing line (the minimum is unique whenever the $x_r$ are not all equal). Shanker Rao Ch 14 writes the same two equations as $na + b\\sum x_i = \\sum y_i$ and $a\\sum x + b\\sum x^2 = \\sum x_i y_i$.',
        },
        {
          type: 'exam',
          text: 'Derivation script: write $q = \\sum [y_r - (a+bx_r)]^2$ (1 mark) $\\to$ $\\partial q/\\partial a = \\sum -2[y_r - (a+bx_r)] = 0$ and $\\partial q/\\partial b = \\sum -2x_r[y_r - (a+bx_r)] = 0$ (2 marks) $\\to$ expand and divide by $-2$ (1 mark) $\\to$ box the normal equations $\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$ (2 marks). Write every sum index explicitly — the marker wants to see the $r = 1$ to $n$ range at least once.',
        },
      ],
    },
    {
      heading: 'Solving the normal equations',
      blocks: [
        {
          type: 'p',
          text: 'Multiply the first normal equation by $\\sum x$ and the second by $n$, then subtract. The $a$ terms cancel and',
        },
        {
          type: 'math',
          tex: 'b\\left[\\, n\\sum x^2 - (\\sum x)^2 \\right] = n\\sum xy - (\\sum x)(\\sum y)',
        },
        {
          type: 'math',
          tex: 'b = \\frac{n\\sum xy - (\\sum x)(\\sum y)}{n\\sum x^2 - (\\sum x)^2}',
        },
        {
          type: 'p',
          text: 'Divide the first normal equation by $n$ to get $\\bar{y} = a + b\\bar{x}$, so',
        },
        {
          type: 'math',
          tex: 'a = \\bar{y} - b\\bar{x} = \\frac{\\sum y}{n} - b\\frac{\\sum x}{n}',
        },
        {
          type: 'p',
          text: 'Subtracting that from $y = a + bx$ gives the **deviation form** of Shanker Rao Ch 14 (eq. 7): $y - \\bar{y} = b_{yx}(x - \\bar{x})$. Shifting the origin to the mean makes $\\sum x\' = \\sum y\' = 0$, and the formulas collapse to the "actual means" form $a = \\bar{y}$ and $b = \\dfrac{\\sum x\' y\'}{\\sum x\'^2}$.',
        },
        {
          type: 'p',
          text: 'Shanker Rao Ch 14 also gives the regression coefficient in terms of the correlation coefficient $r$ and the standard deviations: $b_{yx} = r\\dfrac{\\sigma_y}{\\sigma_x}$ and $b_{xy} = r\\dfrac{\\sigma_x}{\\sigma_y}$, so $b_{yx} b_{xy} = r^2$.',
        },
        {
          type: 'math',
          tex: 'r = \\frac{n\\sum xy - (\\sum x)(\\sum y)}{\\sqrt{\\left[\\, n\\sum x^2 - (\\sum x)^2 \\right]\\left[\\, n\\sum y^2 - (\\sum y)^2 \\right]}}',
        },
        {
          type: 'note',
          text: 'The $R^2$ reported by the site\'s solver is the coefficient of determination $R^2 = 1 - \\dfrac{SSE}{SST}$ of the least-squares fit. For a straight line with an intercept it equals $r^2$, so a large $R^2$ is the same statement as "the points are strongly correlated".',
        },
      ],
    },
    {
      heading: 'Least-squares line for the surface-area table',
      blocks: [
        {
          type: 'p',
          text: 'The surface area $A$ of human beings is related to their weight $W$ and height $H$. For individuals of height 180 cm the measurements are:',
        },
        {
          type: 'table',
          head: ['$W$ (kg)', '70', '75', '77', '80', '82', '84', '87', '90'],
          rows: [
            ['$A$ (m$^2$)', '2.10', '2.12', '2.15', '2.20', '2.22', '2.23', '2.26', '2.30'],
          ],
        },
        {
          type: 'p',
          text: 'With $n = 8$ the totals are $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$, so the normal equations are $8a + 645b = 17.58$ and $645a + 52303b = 1420.53$.',
        },
        {
          type: 'math',
          tex: 'b = \\frac{8(1420.53) - (645)(17.58)}{8(52303) - (645)^2} = \\frac{25.14}{2399} = 0.010479',
        },
        {
          type: 'math',
          tex: 'a = \\bar{A} - b\\bar{W} = 2.1975 - (0.010479)(80.625) = 1.3526',
        },
        {
          type: 'p',
          text: 'The fitted line is $A = 1.3526 + 0.010479\\,W$. The largest residual is $0.019$ m$^2$ and $R^2 = 0.9757$, so the straight line really is a reasonable fit to these eight measurements.',
        },
        {
          type: 'note',
          text: 'This table is the Fall 2023 paper\'s data; it is not one of the worked examples in the scanned pages of Balagurusamy Ch 10. The *method* is Balagurusamy §10.2 (Eq. 10.8) and Shanker Rao Ch 12 and Ch 14.',
        },
        {
          type: 'exam',
          text: 'Always print the four totals ($n$, $\\sum W$, $\\sum A$, $\\sum W^2$, $\\sum WA$) before anything else — that is where the marks are. Then write the two normal equations, substitute into the formula for $b$, then get $a$ from $\\bar{A} - b\\bar{W}$, and finish with a sentence of justification ("the points lie close to the line, so a straight line is a reasonable fit"). Never divide $a$ out of a normal equation when the data are large; use $a = \\bar{y} - b\\bar{x}$.',
        },
      ],
    },
    {
      heading: 'Power-law fit by taking logarithms',
      blocks: [
        {
          type: 'p',
          text: 'A power law $y = a x^b$ is fitted by the same least-squares machinery, once the logarithms are taken: $\\ln y = \\ln a + b\\ln x$. In the $(X, Y) = (\\ln x, \\ln y)$ plane this is a **straight line**, so the normal equations of the previous sections apply to the log-log table. This is the trick Shanker Rao Ch 12 uses for $y = ae^{bx}$ (12.5) and for $y = ab^x$ (Example 12.7).',
        },
        {
          type: 'math',
          tex: '\\ln y = \\ln a + b \\ln x \\qquad\\Longleftrightarrow\\qquad Y = a\' + bX,\\quad X = \\ln x,\\; Y = \\ln y,\\; a\' = \\ln a',
        },
        {
          type: 'p',
          text: 'The slope $b$ of the log-log line is the same $b$ (the base of the logarithm does not change a slope), and the intercept gives $a$ back by exponentiating.',
        },
        {
          type: 'table',
          head: ['$W$', '70', '75', '77', '80', '82', '84', '87', '90'],
          rows: [
            ['$A$', '2.10', '2.12', '2.15', '2.20', '2.22', '2.23', '2.26', '2.30'],
            ['$X = \\ln W$', '4.24850', '4.31749', '4.34381', '4.38203', '4.40672', '4.43082', '4.46591', '4.49981'],
            ['$Y = \\ln A$', '0.74194', '0.75142', '0.76547', '0.78846', '0.79751', '0.80200', '0.81536', '0.83291'],
            ['$X^2$', '18.04975', '18.64072', '18.86869', '19.20219', '19.41918', '19.63217', '19.94435', '20.24829'],
            ['$XY$', '3.15213', '3.24425', '3.32506', '3.45506', '3.51440', '3.55352', '3.64132', '3.74794'],
            ['**Total**', '**35.09509**', '**6.29507**', '**154.00533**', '**27.63367**', '', '', '', ''],
          ],
        },
        {
          type: 'math',
          tex: 'b = \\frac{8(27.63367) - (35.09509)(6.29507)}{8(154.00533) - (35.09509)^2} = \\frac{0.14334}{0.37733} = 0.3799',
        },
        {
          type: 'math',
          tex: '\\ln a = \\bar{Y} - b\\bar{X} = 0.78688 - (0.3799)(4.38688) = -0.8797 \\quad\\Longrightarrow\\quad a = e^{-0.8797} = 0.4149',
        },
        {
          type: 'p',
          text: 'So $A = 0.4149\\,W^{0.3799}$. **This is the justification the exam wants:** in log-log coordinates the eight points lie on a straight line (the log-log fit has $R^2 = 0.971$), and the fitted values $2.084, 2.139, 2.161, 2.192, 2.213, 2.234, 2.263, 2.293$ reproduce the measurements to within $0.02$ m$^2$ — so a power law is a reasonable model for surface area against weight.',
        },
        {
          type: 'note',
          text: 'Carry the log table to **five decimals**. The subtraction $n\\sum XY - (\\sum X)(\\sum Y)$ is a near-cancellation ($0.1433$ out of $27.6$), so four-decimal logs give $b \\approx 0.381$ instead of $0.3799$ and the mark is lost.',
        },
      ],
    },
    {
      heading: 'Polynomial regression',
      blocks: [
        {
          type: 'p',
          text: 'When the data do not look linear, Balagurusamy §10.4 fits a polynomial by the same least-squares technique. A polynomial of degree $m-1$ has $m$ coefficients:',
        },
        { type: 'math', tex: 'y = a_1 + a_2x + a_3x^2 + \\cdots + a_mx^{m-1} = f(x), \\qquad Q = \\sum_{i=1}^{n}\\left[\\, y_i - f(x_i) \\right]^2' },
        {
          type: 'p',
          text: 'Set $\\partial Q/\\partial a_j = 0$ for $j = 1, \\dots, m$. Since $\\partial f(x_i)/\\partial a_j = x_i^{j-1}$, each condition is $\\sum [y_i - f(x_i)]\\,x_i^{j-1} = 0$, i.e. $\\sum x_i^{j-1}(a_1 + a_2x_i + \\cdots + a_mx_i^{m-1}) = \\sum y_ix_i^{j-1}$. Written out, these are the $m$ **normal equations** (Eq. 10.19):',
        },
        {
          type: 'math',
          tex: '\\begin{aligned} a_1n + a_2\\sum x_i + \\cdots + a_m\\sum x_i^{m-1} &= \\sum y_i \\\\ a_1\\sum x_i + a_2\\sum x_i^2 + \\cdots + a_m\\sum x_i^{m} &= \\sum y_ix_i \\\\ &\\;\\;\\vdots \\\\ a_1\\sum x_i^{m-1} + a_2\\sum x_i^{m} + \\cdots + a_m\\sum x_i^{2m-2} &= \\sum y_ix_i^{m-1} \\end{aligned}',
        },
        {
          type: 'p',
          text: 'In matrix form $\\mathbf{CA} = \\mathbf{B}$ with $C(j,k) = \\sum x_i^{j+k-2}$ and $B(j) = \\sum y_ix_i^{j-1}$, solved by the elimination methods of Chapter 3. For the **second-order** polynomial ($m = 3$) the three equations are',
        },
        {
          type: 'math',
          tex: '\\begin{aligned} a_1n + a_2\\sum x + a_3\\sum x^2 &= \\sum y \\\\ a_1\\sum x + a_2\\sum x^2 + a_3\\sum x^3 &= \\sum yx \\\\ a_1\\sum x^2 + a_2\\sum x^3 + a_3\\sum x^4 &= \\sum yx^2 \\end{aligned}',
        },
        {
          type: 'note',
          text: 'Balagurusamy\'s Algorithm 10.2: if $n \\le$ the order of the polynomial, "regression is not possible". And §10.6: the sums of high powers grow very fast, so for a large degree the normal equations become **ill-conditioned** — pivoting and higher precision help.',
        },
        {
          type: 'exam',
          text: 'Script: the sums table with columns $x, y, x^2, x^3, x^4, yx, yx^2$ and a $\\Sigma$ row (2 marks) $\\to$ the three normal equations with the numbers substituted (1 mark) $\\to$ solve them by Gauss elimination, showing each row operation with the row it produces (2 marks) $\\to$ box $y = a_1 + a_2x + a_3x^2$ (1 mark).',
        },
      ],
    },
    {
      heading: 'Multiple linear regression',
      blocks: [
        {
          type: 'p',
          text: 'When $y$ depends on two or more variables — Balagurusamy\'s example is a salesperson\'s salary $y = 500 + 5x_1 + 8x_2$, with $x_1, x_2$ the units sold of two products — fit a linear function of all of them. For two independent variables (Balagurusamy §10.5):',
        },
        { type: 'math', tex: 'y = a_1 + a_2x + a_3z, \\qquad Q = \\sum_{i=1}^{n}(y_i - a_1 - a_2x_i - a_3z_i)^2' },
        {
          type: 'math',
          tex: '\\frac{\\partial Q}{\\partial a_1} = -2\\sum(y_i - a_1 - a_2x_i - a_3z_i), \\quad \\frac{\\partial Q}{\\partial a_2} = -2\\sum(y_i - a_1 - a_2x_i - a_3z_i)\\,x_i, \\quad \\frac{\\partial Q}{\\partial a_3} = -2\\sum(y_i - a_1 - a_2x_i - a_3z_i)\\,z_i',
        },
        { type: 'p', text: 'Setting the three derivatives to zero gives the normal equations (Eq. 10.21):' },
        {
          type: 'math',
          tex: '\\begin{bmatrix} n & \\sum x_i & \\sum z_i \\\\ \\sum x_i & \\sum x_i^2 & \\sum x_iz_i \\\\ \\sum z_i & \\sum x_iz_i & \\sum z_i^2 \\end{bmatrix}\\begin{bmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{bmatrix} = \\begin{bmatrix} \\sum y_i \\\\ \\sum y_ix_i \\\\ \\sum y_iz_i \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'This is a two-dimensional case, so the result is a regression **plane** rather than a line. It extends directly to $y = a_1 + a_2x_1 + a_3x_2 + \\cdots + a_{m+1}x_m$; Shanker Rao §14.13 writes the same equations as $y = a_0 + a_1x_1 + a_2x_2$.',
        },
        {
          type: 'note',
          text: '**Source errors.** In Balagurusamy\'s text $\\partial Q/\\partial a_3$ is printed with a factor $y_i$; it must be $z_i$. His Example 10.5 ($x = 1,2,3,4$, $z = 0,1,2,3$) also prints the normal equations with typos (the first should read $4a_1 + 10a_2 + 6a_3 = 84$), and its data have $z = x - 1$, so the three equations are **dependent** (determinant $0$): $y = 10 + 2x + 4z$ is one of infinitely many planes through the points ($y = 6 + 6x$ fits just as well). Review Exercise 14 has the same defect ($x_2 = 5 - x_1$). The worked example below therefore uses Shanker Rao\'s.',
        },
        {
          type: 'exam',
          text: 'Script: sums table with columns $x, z, y, x^2, z^2, xz, yx, yz$ and a $\\Sigma$ row (2 marks) $\\to$ the matrix or the three normal equations with numbers (1 mark) $\\to$ solve by elimination (2 marks) $\\to$ box the regression plane and, if asked, substitute the given $x, z$ (1 mark). Before solving, glance at the data: if one variable is a linear function of the other, say so — no unique plane exists.',
        },
      ],
    },
    {
      heading: 'Regression of y on x and of x on y',
      blocks: [
        {
          type: 'p',
          text: 'Shanker Rao Ch 14 fits **two** lines to the same data: the regression of $y$ on $x$ (predict $y$ from $x$) and the regression of $x$ on $y$ (predict $x$ from $y$). The second is the same least-squares set-up with the variables swapped:',
        },
        {
          type: 'math',
          tex: 'na\' + b\'\\sum y = \\sum x, \\qquad a\'\\sum y + b\'\\sum y^2 = \\sum xy',
        },
        {
          type: 'p',
          text: 'The two regression lines are different curves; they always pass through $(\\bar{x}, \\bar{y})$, they coincide only when $b_{yx}b_{xy} = 1$ (i.e. $r = \\pm 1$, perfect correlation) and they are perpendicular when $r = 0$.',
        },
        {
          type: 'p',
          text: 'The same machinery extends to a polynomial (three normal equations for a quadratic) and to several independent variables — see **Polynomial regression** and **Multiple linear regression** above.',
        },
        {
          type: 'note',
          text: 'Correlation and regression are not the same thing: $r$ measures *how strongly* the variables move together, the regression line says *how much* $y$ changes per unit of $x$. $r$ alone cannot predict a value of $y$; the regression equation can.',
        },
      ],
    },
  ],
  formulas: [
    {
      label: 'Least-squares criterion',
      tex: 'q = \\sum_{r=1}^{n}\\left[\\, y_r - (a + b x_r) \\right]^2',
      where: 'least squares',
    },
    {
      label: 'Normal equations',
      tex: '\\sum y = na + b\\sum x,\\qquad \\sum xy = a\\sum x + b\\sum x^2',
      where: 'least squares',
    },
    {
      label: 'Slope of the least-squares line',
      tex: 'b = \\frac{n\\sum xy - (\\sum x)(\\sum y)}{n\\sum x^2 - (\\sum x)^2}',
      where: 'least squares',
    },
    {
      label: 'Intercept of the least-squares line',
      tex: 'a = \\bar{y} - b\\bar{x}',
      where: 'least squares',
    },
    {
      label: 'Deviation form of the regression line',
      tex: 'y - \\bar{y} = b_{yx}\\left(x - \\bar{x}\\right)',
      where: 'least squares',
    },
    {
      label: 'Regression of x on y (normal equations)',
      tex: 'na\' + b\'\\sum y = \\sum x,\\qquad a\'\\sum y + b\'\\sum y^2 = \\sum xy',
      where: 'Shanker Rao Ch 14',
    },
    {
      label: 'Power law in log-log space',
      tex: '\\ln y = \\ln a + b\\ln x',
      where: 'power law fit',
    },
    {
      label: 'Polynomial regression (normal equations)',
      tex: '\\sum_{k=1}^{m} a_k\\sum x_i^{j+k-2} = \\sum y_ix_i^{j-1}, \\quad j = 1, \\dots, m',
      where: 'Balagurusamy Eq. 10.19',
    },
    {
      label: 'Multiple linear regression (normal equations)',
      tex: '\\begin{bmatrix} n & \\sum x & \\sum z \\\\ \\sum x & \\sum x^2 & \\sum xz \\\\ \\sum z & \\sum xz & \\sum z^2 \\end{bmatrix}\\begin{bmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{bmatrix} = \\begin{bmatrix} \\sum y \\\\ \\sum yx \\\\ \\sum yz \\end{bmatrix}',
      where: 'Balagurusamy Eq. 10.21',
    },
    {
      label: 'Coefficient of correlation',
      tex: 'r = \\frac{n\\sum xy - (\\sum x)(\\sum y)}{\\sqrt{\\left[\\, n\\sum x^2 - (\\sum x)^2 \\right]\\left[\\, n\\sum y^2 - (\\sum y)^2 \\right]}}',
      where: 'Shanker Rao Ch 14',
    },
    {
      label: 'Coefficient of determination',
      tex: 'R^2 = 1 - \\frac{SSE}{SST} = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}',
      where: 'checking a fit',
    },
  ],
  examples: [
    {
      title: 'Least-squares line through the surface-area table',
      type: 'Numerical — Least squares',
      question:
        'The surface area $A$ of human beings is related to weight $W$ and height $H$. Measurements on individuals of height 180 cm give $W = 70, 75, 77, 80, 82, 84, 87, 90$ kg and $A = 2.10, 2.12, 2.15, 2.20, 2.22, 2.23, 2.26, 2.30$ m$^2$. Justify that $A = a + bW$ fits the data and evaluate $a$ and $b$.',
      source: 'Fall 2023 Q3(c)',
      marks: 6,
      steps: [
        { t: '$n = 8$, $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$.', m: '1 mark' },
        { t: 'Normal equations: $8a + 645b = 17.58$ and $645a + 52303b = 1420.53$.', m: '1 mark' },
        {
          t: '$b = \\dfrac{n\\sum WA - \\sum W\\sum A}{n\\sum W^2 - (\\sum W)^2} = \\dfrac{8(1420.53) - (645)(17.58)}{8(52303) - (645)^2} = \\dfrac{11364.24 - 11339.10}{418424 - 416025} = \\dfrac{25.14}{2399} = 0.010479$.',
          m: '2 marks',
        },
        { t: '$a = \\bar{A} - b\\bar{W} = 2.1975 - (0.010479)(80.625) = 1.3526$.', m: '1 mark' },
        {
          t: 'The fitted line is $A = 1.3526 + 0.010479\\,W$; the largest residual is $0.019$ m$^2$ and $R^2 = 0.9757$, so the straight line is a reasonable fit.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{A = 1.3526 + 0.010479\\,W}$',
      note: 'Trap: writing the two normal equations the wrong way round. The first is $\\sum A = na + b\\sum W$; the $b\\sum W$ belongs there, and $\\sum W^2$ belongs with $b$ in the second equation only.',
      explanation: [
        'Regression does not require the curve to pass through the data, so the fitting criterion has to be stated explicitly: minimise the sum of the squares of the vertical deviations. Differentiating that sum with respect to $a$ and $b$ produces two linear equations (the normal equations) that can be solved for $a$ and $b$ in closed form — no iteration, no starting guess.',
        'The arithmetic is set up by the four totals $\\sum W$, $\\sum A$, $\\sum W^2$, $\\sum WA$. With $n = 8$ the normal equations are $8a + 645b = 17.58$ and $645a + 52303b = 1420.53$. Eliminating $a$ by multiplying the first by $645$ and the second by $8$ and subtracting leaves a tiny residual ($25.14$), so it is worth keeping the totals exact and showing the subtraction.',
        'The intercept is not found by dividing $a$ out of a normal equation when the data are this large; $a = \\bar{A} - b\\bar{W}$ is both quicker and safer. A large $R^2$ with small residuals is the justification the question asks for: the eight points hug the straight line, so the model is reasonable over this range of weights.',
      ],
    },
    {
      title: 'Power-law fit $A = aW^b$ for the surface-area table',
      type: 'Numerical — Power-law fit',
      question:
        'For the same surface-area data ($W = 70, 75, 77, 80, 82, 84, 87, 90$ kg, $A = 2.10, 2.12, 2.15, 2.20, 2.22, 2.23, 2.26, 2.30$ m$^2$) justify that $A = aW^b$ is a suitable relation, and evaluate $a$ and $b$.',
      source: 'Fall 2023 / Spring 2023 power-law fit',
      marks: 6,
      steps: [
        {
          t: 'Take logarithms: $A = aW^b \\Rightarrow \\ln A = \\ln a + b\\ln W$. With $X = \\ln W$, $Y = \\ln A$ this is the straight line $Y = a\' + bX$, so the least-squares (normal equations) method applies.',
          m: '1 mark',
        },
        {
          t: 'Log table (five decimals) and totals: $\\sum X = 35.09509$, $\\sum Y = 6.29507$, $\\sum X^2 = 154.00533$, $\\sum XY = 27.63367$, $n = 8$.',
          m: '2 marks',
        },
        {
          t: '$b = \\dfrac{n\\sum XY - (\\sum X)(\\sum Y)}{n\\sum X^2 - (\\sum X)^2} = \\dfrac{8(27.63367) - (35.09509)(6.29507)}{8(154.00533) - (35.09509)^2} = \\dfrac{0.14334}{0.37733} = 0.3799$.',
          m: '1 mark',
        },
        {
          t: '$\\ln a = \\bar{Y} - b\\bar{X} = 0.78688 - (0.3799)(4.38688) = -0.8797 \\Rightarrow a = e^{-0.8797} = 0.4149$.',
          m: '1 mark',
        },
        {
          t: 'Justification: in log-log coordinates the eight points lie on a straight line ($R^2 = 0.971$ in log space), and the fitted values $2.084, 2.139, 2.161, 2.192, 2.213, 2.234, 2.263, 2.293$ match the data to within $0.02$ m$^2$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{A = 0.4149\\,W^{0.3799}}$',
      note: 'Trap: rounding the log table to four decimals. The numerator $n\\sum XY - (\\sum X)(\\sum Y)$ is a near-cancellation ($0.1433$ from terms of size $27.6$), so four-decimal logs give $b = 0.381$ and lose the mark.',
      explanation: [
        'A power law is a straight line in log-log coordinates: plotting $\\ln A$ against $\\ln W$ straightens the curve, which is exactly why curve-fitting books fit such models by taking logarithms. The exponent $b$ is then simply the slope of the least-squares line through the log-log points, and the constant $a$ comes from the intercept by exponentiating.',
        'Only the arithmetic changes, not the method — the same normal equations and the same two formulas $b = \\frac{n\\sum XY - (\\sum X)(\\sum Y)}{n\\sum X^2 - (\\sum X)^2}$ and $\\ln a = \\bar{Y} - b\\bar{X}$ are used, with $X = \\ln W$ and $Y = \\ln A$ in place of $W$ and $A$.',
        'Note that $b$ is independent of the base of the logarithm (only $a$ changes, because $a$ must be exponentiated back), so $\\log_{10}$ gives the same answer — Shanker Rao Ch 12 Example 12.6 works in base 10 for the same reason.',
      ],
    },
    {
      title: 'Second-order polynomial fit by least squares',
      type: 'Numerical — Polynomial regression',
      question: 'Fit a second order polynomial to the data $x = 1.0, 2.0, 3.0, 4.0$; $y = 6.0, 11.0, 18.0, 27.0$.',
      source: 'Balagurusamy Ch 10, Example 10.4',
      marks: 6,
      steps: [
        { t: 'The order is 2, so $y = a_1 + a_2x + a_3x^2$ and there are 3 normal equations: $a_1n + a_2\\sum x + a_3\\sum x^2 = \\sum y$, $a_1\\sum x + a_2\\sum x^2 + a_3\\sum x^3 = \\sum yx$, $a_1\\sum x^2 + a_2\\sum x^3 + a_3\\sum x^4 = \\sum yx^2$.', m: '1 mark' },
        { t: 'Sums: $n = 4$, $\\sum x = 10$, $\\sum y = 62$, $\\sum x^2 = 30$, $\\sum x^3 = 100$, $\\sum x^4 = 354$, $\\sum yx = 190$, $\\sum yx^2 = 644$.', m: '2 marks' },
        { t: 'Normal equations: $4a_1 + 10a_2 + 30a_3 = 62$, $10a_1 + 30a_2 + 100a_3 = 190$, $30a_1 + 100a_2 + 354a_3 = 644$.', m: '1 mark' },
        { t: '$R_2\' = R_2 - 2.5R_1 = [\\,0 \\;\\; 5 \\;\\; 25 \\mid 35\\,]$; $R_3\' = R_3 - 7.5R_1 = [\\,0 \\;\\; 25 \\;\\; 129 \\mid 179\\,]$; $R_3\'\' = R_3\' - 5R_2\' = [\\,0 \\;\\; 0 \\;\\; 4 \\mid 4\\,]$.', m: '1 mark' },
        { t: 'Back substitution: $a_3 = 4/4 = 1$; $5a_2 + 25(1) = 35 \\Rightarrow a_2 = 2$; $4a_1 + 10(2) + 30(1) = 62 \\Rightarrow a_1 = 3$.', m: '1 mark' },
      ],
      answer: '$\\boxed{y = 3 + 2x + x^2}$',
      note: 'Trap: stopping the sums at $\\sum x^2$. A quadratic needs powers up to $\\sum x^4$ on the left and $\\sum yx^2$ on the right — write all seven columns before you start.',
      explanation: [
        'The polynomial is still **linear in its coefficients** $a_1, a_2, a_3$, which is why least squares gives a set of linear normal equations, one per coefficient. The $j$-th equation comes from $\\partial Q/\\partial a_j = 0$ and is just the first equation multiplied term by term by $x^{j-1}$.',
        'So the coefficient matrix is built from the power sums $\\sum x^0 = n$ up to $\\sum x^4$, each anti-diagonal holding the same sum, and the right-hand side from $\\sum y$, $\\sum yx$, $\\sum yx^2$.',
        'Check: $3 + 2x + x^2$ gives $6, 11, 18, 27$ at $x = 1, 2, 3, 4$ — the data lie exactly on this parabola, so every residual is zero ("verify using table data", as the book says).',
      ],
    },
    {
      title: 'Regression plane for two independent variables',
      type: 'Numerical — Multiple regression',
      question: 'From the table find the least-squares regression equation of $x_0$ on $x_1$ and $x_2$, and find $x_0$ when $x_1 = 54$ and $x_2 = 9$: $x_0 = 64, 71, 53, 67, 55, 58, 77, 57, 56, 51, 76, 68$; $x_1 = 57, 59, 49, 62, 51, 50, 55, 48, 52, 42, 61, 57$; $x_2 = 8, 10, 6, 11, 8, 7, 10, 9, 10, 6, 12, 9$.',
      source: 'Shanker Rao Ch 14 §14.13, Example 1',
      marks: 6,
      steps: [
        { t: 'Model $x_0 = a_0 + a_1x_1 + a_2x_2$ with normal equations $na_0 + a_1\\sum x_1 + a_2\\sum x_2 = \\sum x_0$, $a_0\\sum x_1 + a_1\\sum x_1^2 + a_2\\sum x_1x_2 = \\sum x_0x_1$, $a_0\\sum x_2 + a_1\\sum x_1x_2 + a_2\\sum x_2^2 = \\sum x_0x_2$.', m: '1 mark' },
        { t: 'Sums: $n = 12$, $\\sum x_0 = 753$, $\\sum x_1 = 643$, $\\sum x_2 = 106$, $\\sum x_1^2 = 34843$, $\\sum x_2^2 = 976$, $\\sum x_1x_2 = 5779$, $\\sum x_0x_1 = 40830$, $\\sum x_0x_2 = 6796$.', m: '2 marks' },
        { t: 'Normal equations: $12a_0 + 643a_1 + 106a_2 = 753$, $643a_0 + 34843a_1 + 5779a_2 = 40830$, $106a_0 + 5779a_1 + 976a_2 = 6796$.', m: '1 mark' },
        { t: '$R_2\' = R_2 - 53.5833R_1 = [\\,0 \\;\\; 388.9167 \\;\\; 99.1667 \\mid 481.75\\,]$; $R_3\' = R_3 - 8.8333R_1 = [\\,0 \\;\\; 99.1667 \\;\\; 39.6667 \\mid 144.5\\,]$; $R_3\'\' = R_3\' - 0.255R_2\' = [\\,0 \\;\\; 0 \\;\\; 14.381 \\mid 21.6625\\,]$. Back substitution: $a_2 = 1.5063$, $a_1 = 0.8546$, $a_0 = 3.6512$.', m: '1 mark' },
        { t: '$x_0 = 3.6512 + 0.8546(54) + 1.5063(9) = 63.356$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x_0 = 3.6512 + 0.8546\\,x_1 + 1.5063\\,x_2, \\qquad x_0(54, 9) = 63.356}$',
      note: 'Trap: Shanker Rao\'s question table prints the ninth $x_2$ as $6$, but his working (and $\\sum x_2 = 106$) uses $10$; with $10$ the printed answer is reproduced exactly. His normal equations also misprint $5779$ as $577$ and $6796$ as $6.796$.',
      explanation: [
        'With two independent variables the fitted surface is a plane, and least squares again gives one normal equation per coefficient: the first is $\\sum$ of the model, the second is that equation multiplied by $x_1$, the third multiplied by $x_2$.',
        'Every coefficient in the matrix is a sum you read off the table, so the table of products ($x_1^2, x_2^2, x_1x_2, x_0x_1, x_0x_2$) is where the marks are. The matrix is symmetric — $\\sum x_1x_2$ appears twice — which is a quick check on the arithmetic.',
        'The three equations are solved by ordinary Gauss elimination; no pivoting is needed because no zero pivot appears. Substituting $x_1 = 54$, $x_2 = 9$ into the plane gives the estimate.',
      ],
    },
    {
      title: 'The two regression lines for a table of paired observations',
      type: 'Numerical — Least squares',
      question:
        'For the data $x = 5, 10, 15, 20, 25$ and $y = 20, 40, 30, 60, 50$, find the regression of $y$ on $x$ and the regression of $x$ on $y$ by the method of least squares.',
      source: 'Shanker Rao Ch 14, Example 14.1',
      marks: 6,
      steps: [
        { t: 'Totals: $n = 5$, $\\sum x = 75$, $\\sum y = 200$, $\\sum x^2 = 1375$, $\\sum xy = 3400$.', m: '2 marks' },
        { t: 'Normal equations for $y$ on $x$: $5a + 75b = 200$ and $75a + 1375b = 3400$.', m: '2 marks' },
        { t: 'Multiply the first by $15$ and subtract from the second: $250b = 400 \\Rightarrow b = 1.6$, and $a = \\dfrac{200 - 75(1.6)}{5} = 16$.', m: '1 mark' },
        {
          t: 'Swap the roles for $x$ on $y$: $5a\' + 200b\' = 75$ and $200a\' + 9000b\' = 3400$. Multiply the first by $40$ and subtract: $1000b\' = 400 \\Rightarrow b\' = 0.4$, and $a\' = \\dfrac{75 - 200(0.4)}{5} = -1$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{y = 16 + 1.6x \\qquad\\text{and}\\qquad x = -1 + 0.4y}$',
      note: 'Trap: swapping $x$ and $y$ in the data table instead of in the normal equations, and forgetting that the sum of squares changes too ($\\sum y^2 = 9000$ appears in the second pair, not $\\sum x^2$).',
      explanation: [
        'Two regression lines can be drawn through the same scatter of points because they answer two different questions: $y$ on $x$ predicts $y$ from $x$, $x$ on $y$ predicts $x$ from $y$. Both come from the same least-squares principle applied to the same data with the roles of the variables exchanged.',
        'Notice the two lines are not the same line and are not reflections of each other: $y = 16 + 1.6x$ has slope $1.6$, while $x = -1 + 0.4y$ has slope $1/0.4 = 2.5$ in the $xy$-plane. They intersect at the point of means $(\\bar{x}, \\bar{y}) = (15, 40)$, which is where both lines pass.',
        'The two slopes are the regression coefficients $b_{yx} = 1.6$ and $b_{xy} = 0.4$, and their product is $r^2$, so the correlation coefficient for this data is $|r| = \\sqrt{1.6 \\times 0.4} = 0.8$.',
      ],
    },
    {
      title: 'Difference between interpolation and regression (short question)',
      type: 'Theory — Explain',
      question:
        'What is the difference between interpolation and regression? State how many data points each one needs.',
      source: 'Spring 2024 short question',
      marks: 3,
      steps: [
        {
          t: '**Interpolation** builds a curve that passes through **every** given point $(x_i, y_i)$; a degree-$n$ polynomial through $n+1$ points is unique, so the data determine the curve exactly.',
          m: '1 mark',
        },
        {
          t: '**Regression** does not pass through the points. It picks the curve for which the sum of the squares of the vertical deviations $\\sum (y_i - \\hat{y}_i)^2$ is a minimum — the normal equations of the least-squares method.',
          m: '1 mark',
        },
        {
          t: 'So regression needs **more** points than the curve has parameters (a straight line has two parameters $a, b$, so at least three points), while interpolation needs exactly as many points as parameters.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\text{Interpolation: through every point.}}$ $\\boxed{\\text{Regression: least-squares best fit, needs more points than parameters.}}$',
      note: 'Trap: saying "interpolation is exact, regression is approximate" and stopping. The mark is in **why** — the number of points each method needs and what criterion regression minimises.',
      explanation: [
        'Interpolation and regression differ in what they are allowed to do with the data. An interpolant is required to reproduce the data exactly, which fixes the number of degrees of freedom: a degree-$n$ polynomial needs exactly $n+1$ points and no more (a $(n+1)$-th point would over-determine it).',
        'A regression curve is deliberately allowed to miss the points, because the data are noisy measurements and the object of interest is the underlying relationship. It therefore needs surplus data, and the surplus is not wasted — it is what makes the least-squares fit a genuine fit rather than an exact interpolation.',
        'Consequences for the exam: an interpolation question (Lagrange, Newton) always gives exactly as many points as the degree of the polynomial; a regression question gives a table that is longer than the number of unknowns, and the answers are the normal equations.',
      ],
    },
  ],
  flashcards: [
    {
      front: 'Interpolation vs regression — the one-line difference?',
      back: 'Interpolation passes through every tabulated point; regression passes near them, minimising $\\sum (y_i - \\hat{y}_i)^2$.',
    },
    {
      front: 'How many points does each need?',
      back: 'Interpolation: exactly one per parameter ($n+1$ points for a degree-$n$ polynomial). Regression: **more** points than parameters.',
    },
    {
      front: 'State the least-squares criterion.',
      back: '$q = \\sum_{r=1}^{n}\\left[\\, y_r - (a + b x_r) \\right]^2$ is a minimum — the sum of the squares of the **vertical** deviations.',
    },
    {
      front: 'How do you get the normal equations?',
      back: 'Differentiate $q$ partially with respect to $a$ and $b$ and set both to zero: $\\partial q/\\partial a = \\sum -2[y_r - (a+bx_r)] = 0$, $\\partial q/\\partial b = \\sum -2x_r[y_r - (a+bx_r)] = 0$.',
    },
    {
      front: 'Write the normal equations.',
      back: '$\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$.',
    },
    {
      front: 'Formula for the slope $b$ of the least-squares line.',
      back: '$b = \\dfrac{n\\sum xy - (\\sum x)(\\sum y)}{n\\sum x^2 - (\\sum x)^2}$.',
    },
    {
      front: 'Formula for the intercept $a$.',
      back: '$a = \\bar{y} - b\\bar{x} = \\dfrac{\\sum y}{n} - b\\dfrac{\\sum x}{n}$.',
    },
    {
      front: 'Deviation form of the regression line.',
      back: '$y - \\bar{y} = b_{yx}(x - \\bar{x})$ (Shanker Rao Ch 14, eq. 7).',
    },
    {
      front: 'Normal equations for the regression of $x$ on $y$.',
      back: '$na\' + b\'\\sum y = \\sum x$ and $a\'\\sum y + b\'\\sum y^2 = \\sum xy$.',
    },
    {
      front: 'How do you fit a power law $y = a x^b$ by least squares?',
      back: 'Take logs: $\\ln y = \\ln a + b\\ln x$; fit a straight line to $(\\ln x, \\ln y)$; $b$ is its slope and $a = e^{\\text{intercept}}$.',
    },
    {
      front: 'Surface-area data: the least-squares line.',
      back: '$A = 1.3526 + 0.010479\\,W$ with $R^2 = 0.9757$ ($n = 8$, $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$).',
    },
    {
      front: 'Surface-area data: the power-law fit.',
      back: '$A = 0.4149\\,W^{0.3799}$ ($b = 0.3799$ from the log-log table, $\\ln a = -0.8797$).',
    },
    {
      front: 'Normal equations for $y = a_1 + a_2x + a_3x^2$.',
      back: '$a_1n + a_2\\sum x + a_3\\sum x^2 = \\sum y$; $a_1\\sum x + a_2\\sum x^2 + a_3\\sum x^3 = \\sum yx$; $a_1\\sum x^2 + a_2\\sum x^3 + a_3\\sum x^4 = \\sum yx^2$.',
    },
    {
      front: 'Normal equations for the plane $y = a_1 + a_2x + a_3z$.',
      back: '$na_1 + a_2\\sum x + a_3\\sum z = \\sum y$; $a_1\\sum x + a_2\\sum x^2 + a_3\\sum xz = \\sum yx$; $a_1\\sum z + a_2\\sum xz + a_3\\sum z^2 = \\sum yz$.',
    },
    {
      front: 'Balagurusamy Example 10.4: the least-squares quadratic.',
      back: '$y = 3 + 2x + x^2$ for $x = 1..4$, $y = 6, 11, 18, 27$ (normal equations $4a_1 + 10a_2 + 30a_3 = 62$, …).',
    },
    {
      front: 'Relation between the regression coefficients and $r$.',
      back: '$b_{yx} = r\\dfrac{\\sigma_y}{\\sigma_x}$, $b_{xy} = r\\dfrac{\\sigma_x}{\\sigma_y}$, hence $b_{yx}b_{xy} = r^2$.',
    },
    {
      front: 'What is regularisation, and is it in this syllabus?',
      back: 'Adding a penalty (ridge / lasso / $L_1$, $L_2$) to the cost. **Not in the syllabus** — this course does linear least squares only.',
    },
  ],
  quiz: [
    {
      q: 'Regression finds the curve that ...',
      options: [
        'minimises the sum of the squares of the deviations of the points from the curve',
        'passes through the largest possible number of the given points',
        'is closest to every point in turn, point by point',
        'has the largest coefficient of correlation with $x$',
      ],
      answer: 0,
      explain: 'The least-squares criterion minimises $q = \\sum [y_r - (a + b x_r)]^2$ over all $a, b$ simultaneously.',
    },
    {
      q: 'A straight line is fitted to $n$ observations. How many parameters does the fit have, and how many observations are needed?',
      options: ['2 parameters, at least 3 observations', '2 parameters, at least 2 observations', '1 parameter, at least 2 observations', '3 parameters, at least 3 observations'],
      answer: 0,
      explain: '$y = a + bx$ has two parameters, so regression needs at least 3 points; more points make the fit meaningful.',
    },
    {
      q: 'The normal equations are',
      options: [
        '$\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$',
        '$\\sum y = a\\sum x + bn$ and $\\sum xy = a\\sum x^2 + b\\sum x$',
        '$\\sum y = na - b\\sum x$ and $\\sum xy = a\\sum x - b\\sum x^2$',
        '$\\sum y^2 = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$',
      ],
      answer: 0,
      explain: 'They come from $\\partial q/\\partial a = 0$ and $\\partial q/\\partial b = 0$ after dividing by $-2$.',
    },
    {
      q: 'The intercept of the least-squares line is best found from',
      options: [
        '$a = \\bar{y} - b\\bar{x}$',
        '$a = \\dfrac{\\sum y - b\\sum x}{n - 1}$',
        '$a = \\dfrac{\\sum y}{n} - \\dfrac{b\\sum x}{n - 1}$',
        '$a = \\bar{x} - b\\bar{y}$',
      ],
      answer: 0,
      explain: 'Dividing the first normal equation by $n$ gives $\\bar{y} = a + b\\bar{x}$, hence $a = \\bar{y} - b\\bar{x}$.',
    },
    {
      q: 'For $x = 5,10,15,20,25$ and $y = 20,40,30,60,50$, the regression of $y$ on $x$ is',
      options: ['$y = 16 + 1.6x$', '$y = -1 + 0.4x$', '$y = 20 + 1.6x$', '$y = 0.4 + 16x$'],
      answer: 0,
      explain: 'Normal equations $5a + 75b = 200$, $75a + 1375b = 3400$ give $a = 16$, $b = 1.6$.',
    },
    {
      q: 'To fit $y = a x^b$ by the method of least squares you',
      options: [
        'take logarithms and fit a straight line to $(\\ln x, \\ln y)$',
        'take logarithms and fit a parabola to $(\\ln x, \\ln y)$',
        'fit a straight line to $(x, y)$ and square the slope',
        'differentiate $a x^b$ and set the derivative to zero at every point',
      ],
      answer: 0,
      explain: '$\\ln y = \\ln a + b\\ln x$ is a straight line in log-log space, so the normal equations apply there.',
    },
    {
      q: 'The regression coefficients satisfy',
      options: [
        '$b_{yx}b_{xy} = r^2$',
        '$b_{yx}b_{xy} = r$',
        '$b_{yx} + b_{xy} = r$',
        '$b_{yx} - b_{xy} = r^2$',
      ],
      answer: 0,
      explain: 'Because $b_{yx} = r\\sigma_y/\\sigma_x$ and $b_{xy} = r\\sigma_x/\\sigma_y$, their product is $r^2$.',
    },
    {
      q: 'The two regression lines of a pair of variables always intersect at',
      options: ['the point of means $(\\bar{x}, \\bar{y})$', 'the origin', 'the centroid of the scatter', 'the point $(x_{\\max}, y_{\\max})$'],
      answer: 0,
      explain: 'Both deviation-form lines pass through $(\\bar{x}, \\bar{y})$.',
    },
    {
      q: 'How many normal equations does least-squares fitting of a polynomial of degree $3$ give?',
      options: ['4', '3', '6', '2'],
      answer: 0,
      explain: 'Degree $m-1 = 3$ means $m = 4$ coefficients $a_1..a_4$, one normal equation for each.',
    },
    {
      q: 'Multiple linear regression $y = a_1 + a_2x + a_3z$ fits ...',
      options: ['a plane', 'a parabola', 'two separate straight lines', 'a power curve'],
      answer: 0,
      explain: 'With two independent variables the fitted function is linear in both, so it is a regression plane (Balagurusamy §10.5).',
    },
    {
      q: 'Which of these is **not** part of this course\'s regression syllabus?',
      options: [
        'ridge / lasso regularisation with a penalty term',
        'the least-squares criterion and the normal equations',
        'the power-law fit by taking logarithms',
        'the two regression lines $y$ on $x$ and $x$ on $y$',
      ],
      answer: 0,
      explain: 'Regularisation is explicitly out of scope: the course is linear least squares only.',
    },
  ],
  solvers: ['leastSquares', 'powerLaw', 'polyReg', 'multiReg'],
};
