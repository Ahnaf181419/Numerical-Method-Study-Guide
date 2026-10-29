// Gradient Descent Regression — CSE 2201.
//
// Source: the Gradient Descent slides (Equations sheet, Batch sheet, Single sheet).
// The worked tables on the slides are reproduced exactly; every number agrees with
// src/lib/solvers.js:
//   gradientDescent({ xs, ys, degree, theta0, alpha, epochs, mode }) -> { theta }

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "What does gradient descent offer that solving the normal equations directly does not?",
    options: ["Exact answers always", "Incremental improvement that scales to many features and much data", "It needs no data", "It skips the cost function"],
    answer: 1,
    explain: "Descent improves the model step by step from any starting point, handles large feature counts, and can pause at 'good enough'.",
  },
  "Start here: the core idea": {
    q: "In the update $\\theta_j := \\theta_j - \\alpha \\frac{\\partial J}{\\partial \\theta_j}$, why the minus sign?",
    options: ["To keep $\\theta$ positive", "The gradient points uphill on the cost, so stepping opposite goes downhill", "It cancels the learning rate", "Convention without meaning"],
    answer: 1,
    explain: "Gradient ascent would climb the error; the minus walks the cost $J$ downhill toward its minimum.",
  },
  "Start here: reading the symbols": {
    q: "An 'epoch' is…",
    options: ["One parameter update per training example", "One complete pass over the training set", "The learning rate", "A diverged run"],
    answer: 1,
    explain: "In batch mode one epoch = one update, computed from all examples; in single mode one epoch = one update per example.",
  },
  "Start here: your first walk-through": {
    q: "After one epoch the parameters rose from 0 to 0.028 and 0.1. What made them increase?",
    options: ["The learning rate was negative", "The errors were negative, so subtracting $\\alpha \\times$ (negative) adds", "Gradient descent always increases $\\theta$", "The data were sorted first"],
    answer: 1,
    explain: "Every prediction was 0 against positive targets, so both derivatives came out negative ($-2.8$ and $-10$) and $\\theta := \\theta - \\alpha(\\text{negative})$ moves $\\theta$ up.",
  },
  'What gradient descent does': {
    q: 'What is the basic idea of gradient descent?',
    options: [
      'Start from a guess for the parameters, then move them repeatedly against the gradient of the cost, shrinking each step by the learning rate $\\alpha$.',
      'Solve the normal equations by Cramer\'s rule instead of Gaussian elimination.',
      'Choose the parameters that make the correlation coefficient largest.',
      'Interpolate the data points exactly with a polynomial of high degree.',
    ],
    answer: 0,
    explain:
      'Gradient descent replaces the closed-form solution of the normal equations by a search: at each step the parameters move in the direction that reduces the cost $J(\\theta)$, and the size of the move is $\\alpha$ times the partial derivative.',
  },
  'The cost function and its derivatives': {
    q: 'What is the cost function used in the slides?',
    options: [
      '$J(\\theta) = \\dfrac{1}{2m}\\sum_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)^2$',
      '$J(\\theta) = \\sum_{i=1}^{m}\\left|H_\\theta(x^{(i)}) - y^{(i)}\\right|$',
      '$J(\\theta) = \\dfrac{1}{m}\\sum_{i=1}^{m}\\left(x^{(i)} - y^{(i)}\\right)^2$',
      '$J(\\theta) = \\prod_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)$',
    ],
    answer: 0,
    explain:
      'The cost is the mean of the squared errors, with the factor $\\tfrac{1}{2m}$ kept so that the derivative comes out clean.',
  },
  'Batch mode': {
    q: 'In batch mode, when are the parameters updated?',
    options: [
      'Once per epoch, after the whole training table has been used; the derivative is the **average** error and the **average** of error $\\times x$.',
      'After every single row of the table.',
      'After every epoch, using the sum of the errors without dividing by $m$.',
      'Only when the cost reaches exactly zero.',
    ],
    answer: 0,
    explain:
      'The slides: "For Batch Mode, the THETAs are Updated only ONCE for the whole Table (Training Set)". The two partial derivatives are the average of the error column and the average of the error $\\times x$ column.',
  },
  'Single mode': {
    q: 'In single mode the update rule is obtained from the batch rule by',
    options: [
      'dropping the $\\sum$ symbol and updating after every row, using the parameters already updated by the previous rows.',
      'doubling the learning rate.',
      'using the sum of the errors instead of the average.',
      'updating $\\theta_0$ only.',
    ],
    answer: 0,
    explain:
      'The slides: "For Single Mode, Following Equations are Used, DROP the SUM symbol." The error used at row $i$ is computed with the parameters as they stand at that row.',
  },
  'Why the update must be simultaneous': {
    q: 'Why must all the $\\theta_j$ be updated simultaneously in batch mode?',
    options: [
      'Because every $\\partial J/\\partial\\theta_j$ depends on $H_\\theta$, which depends on all the $\\theta_k$; the gradient is one vector and must be evaluated at a single point $\\theta$.',
      'Because the parameters must stay positive.',
      'Because the learning rate must be the same for all rows.',
      'Because $J$ is only differentiable when the updates are done together.',
    ],
    answer: 0,
    explain:
      'Updating $\\theta_0$ first and then using the new $\\theta_0$ inside $\\partial J/\\partial\\theta_1$ steps along a stale direction: it is a Gauss-Seidel-style sweep, not gradient descent, and the cost is no longer guaranteed to fall.',
  },
  'Choosing the learning rate': {
    q: 'What happens if the learning rate $\\alpha$ is too large?',
    options: [
      'The steps overshoot the minimum, so the cost oscillates or diverges instead of settling down.',
      'The cost becomes negative.',
      'The partial derivatives vanish.',
      'The updates become simultaneous automatically.',
    ],
    answer: 0,
    explain:
      '$\\alpha$ scales every step of the descent. Too small and the descent crawls; too large and it jumps past the minimum and the cost can even grow without bound.',
  },
  'Polynomial regression: degree 4 and degree 2': {
    q: 'For a degree-$n$ polynomial hypothesis, what is $\\partial J/\\partial\\theta_j$?',
    options: [
      '$\\dfrac{1}{m}\\sum_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)\\left(x^{(i)}\\right)^j$ for $j = 0, 1, \\dots, n$.',
      '$\\dfrac{1}{m}\\sum_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)$ for every $j$.',
      '$\\left(x^{(i)}\\right)^j$ alone, with no error factor.',
      '$\\sum_{i=1}^{m}\\left(x^{(i)}\\right)^j$ divided by $m^2$.',
    ],
    answer: 0,
    explain:
      'Each parameter $\\theta_j$ multiplies $\\left(x^{(i)}\\right)^j$ inside the hypothesis, so the chain rule gives the error times that power of $x$, averaged over the rows.',
  },
};

export default {
  id: 'gradient',
  chapter: 11,
  title: 'Gradient Descent Regression',
  wave: 'grad',
  sources: ['Gradient Descent slides'],
  flagged: true,
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Predict a house's price from its size, rooms, age and postcode and you have a **many-feature** regression. The normal equations still 'work' — but they swell into a large matrix problem that is expensive to solve outright, and they must be re-solved from scratch whenever new data arrives." },
        { type: "p", text: "Machine learning needs the opposite: a method that **improves a model incrementally**, survives huge data sets, and can stop whenever it is good enough. Gradient descent is that method — and the past papers ask you to run its very first steps by hand." },
        { type: "p", text: "The idea is physical before it is mathematical: the model's total error is a landscape, and training is **walking downhill** on it." },
        { type: "list", items: [
          "Compute predictions $H_\\theta(x)$ and their errors.",
          "Compute the partial derivatives (the downhill directions).",
          "Update the parameters with the learning rate $\\alpha$.",
          "Distinguish batch mode from single-example mode.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Choose parameters $\\theta$; every choice produces some total error $J(\\theta)$ (the average squared miss over the training set). Picture $J$ as a height over the space of $\\theta$'s: for linear regression the shape is a **bowl** with one lowest point." },
        { type: "p", text: "Standing anywhere on the bowl, the gradient $\\nabla J$ points straight **uphill**; so the update rule steps the other way, proportionally to a step size $\\alpha$ — the **learning rate**:" },
        { type: "math", tex: "\\theta_j := \\theta_j - \\alpha \\frac{\\partial J}{\\partial \\theta_j}" },
        { type: "p", text: "**Batch mode** computes the derivatives from the whole training set before stepping once. **Single (stochastic) mode** steps after every individual example — wobblier steps, same destination. One full pass over the data is an **epoch**." },
        { type: "note", text: "$\\alpha$ is the dial that breaks the algorithm: too large and the steps overshoot the valley, bouncing out to infinity; too small and training crawls. The papers' values ($0.01$, $0.1$, $0.2$) sit in the safe middle." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$\\theta_0, \\theta_1$", "the parameters being learned (intercept, slope)", "'theta'"],
          ["$H_\\theta(x) = \\theta_0 + \\theta_1 x$", "the hypothesis: the model's prediction", "H of x"],
          ["$e^{(i)} = H_\\theta(x^{(i)}) - y^{(i)}$", "the error on training example $i$", "prediction minus actual"],
          ["$J(\\theta)$", "cost: the average squared error over the training set", "the height of the landscape"],
          ["$\\alpha$", "learning rate: the step size", "how boldly you walk downhill"],
          ["epoch", "one complete pass over the training set", "batch mode steps once per epoch"],
        ] },
        { type: "p", text: "Superscripts $(i)$ number training examples; they are labels, not powers — same convention as the iteration counter in Jacobi." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From the **Gradient Descent slides (batch mode)**: training set $(1,1), (2,3), (4,3), (3,2), (5,5)$ with $\\theta_0 = \\theta_1 = 0$ and $\\alpha = 0.01$. Run one epoch." },
        { type: "p", text: "With both parameters zero every prediction $H_\\theta(x)$ is 0, so the error column is $-1, -3, -3, -2, -5$ and the error$\\times x$ column is $-1, -6, -12, -6, -25$." },
        { type: "math", tex: "\\text{PD}_{\\theta_0} = \\tfrac{-14}{5} = -2.8, \\qquad \\text{PD}_{\\theta_1} = \\tfrac{-50}{5} = -10" },
        { type: "p", text: "Update: $\\theta_0 = 0 - 0.01(-2.8) = 0.028$ and $\\theta_1 = 0 - 0.01(-10) = 0.1$ after one epoch. **Asked in:** the parameter-update derivation is Spring 2024 Q3(a) and the degree-2 demonstration is Spring 2024 Q3(b) — the same table method with one more column ($x^2$)." },
        { type: "exam", text: "Columns for $H_\\theta$, error and error$\\times x$, the two averaged derivatives, the two updates with $\\alpha$ substituted — finish by stating the parameter values after the epoch." },
      ],
    },
    {
      heading: 'What gradient descent does',
      blocks: [
        {
          type: 'p',
          text: 'Least squares answers the problem of Ch. 10 by solving the normal equations in closed form. Gradient descent answers it by **search**: treat the parameters of the line (the $\\theta$s) as unknowns, start somewhere, and walk downhill until the cost stops falling.',
        },
        {
          type: 'list',
          items: [
            'Start with a guess for the parameters (the slides start from $\\theta_0 = \\theta_1 = 0$).',
            'Predict $H_\\theta(x^{(i)})$ for every row and form the error $H_\\theta(x^{(i)}) - y^{(i)}$.',
            'Differentiate the cost with respect to each parameter and move **against** the gradient, since the gradient points uphill.',
            'Repeat; the cost $J(\\theta)$ should fall at every step.',
          ],
          ordered: true,
        },
        {
          type: 'math',
          tex: '\\theta_j \\leftarrow \\theta_j - \\alpha\\, \\frac{\\partial J}{\\partial \\theta_j}, \\qquad j = 0, 1',
        },
        {
          type: 'p',
          text: '$\\alpha$ is the **learning rate** — the size of one step. The minus sign is what makes the method descend: $\\partial J/\\partial\\theta_j$ measures how the cost grows when $\\theta_j$ grows, so subtracting it moves the parameter in the direction that lowers the cost.',
        },
        {
          type: 'note',
          text: 'The slides work with the straight-line hypothesis $H_\\theta(x) = \\theta_0 + \\theta_1 x$. Every other part of the algorithm — predict, error, update — is unchanged for a polynomial hypothesis with more $\\theta$s; only the number of error columns grows.',
        },
      ],
    },
    {
      heading: 'The cost function and its derivatives',
      blocks: [
        {
          type: 'p',
          text: 'The slides measure how wrong the current hypothesis is over the whole training set with the cost function',
        },
        {
          type: 'math',
          tex: 'J(\\theta) = \\frac{1}{2m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right]^2',
        },
        {
          type: 'p',
          text: 'where $m$ is the number of rows (patterns) and $H_\\theta(x) = \\theta_0 + \\theta_1 x$ for a straight line. This is the same "sum of the squares of the deviations" idea as least squares, but now it is used as a function to be minimised by search instead of by solving equations.',
        },
        {
          type: 'p',
          text: 'Differentiating gives the two partial derivatives that drive the algorithm:',
        },
        {
          type: 'math',
          tex: '\\frac{\\partial J}{\\partial \\theta_0} = \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right]\\cdot 1, \\qquad \\frac{\\partial J}{\\partial \\theta_1} = \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right] x^{(i)}',
        },
        {
          type: 'p',
          text: 'These are exactly the two columns the slides ask you to build:',
        },
        {
          type: 'list',
          items: [
            '**P.D. = Average Error** — the derivative with respect to $\\theta_0$ is the average of the error column.',
            '**P.D. = Average over Error i * x i** — the derivative with respect to $\\theta_1$ is the average of the error $\\times x$ column.',
            'the update itself: $\\theta_0 \\leftarrow \\theta_0 - \\alpha(\\text{PD}_{\\theta_0})$ and $\\theta_1 \\leftarrow \\theta_1 - \\alpha(\\text{PD}_{\\theta_1})$.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'So the whole of batch mode is one table with three working columns: the prediction $H_\\theta(x^{(i)})$, the error $H_\\theta(x^{(i)}) - y^{(i)}$, and the error $\\times x$.',
        },
      ],
    },
    {
      heading: 'Batch mode',
      blocks: [
        {
          type: 'p',
          text: 'The Equations sheet: "For Batch Mode, the THETAs are Updated only ONCE for the whole Table (Training Set)." The parameters are held fixed for the whole pass over the table; the averages of the two error columns are then used once, at the end of the epoch.',
        },
        {
          type: 'math',
          tex: '\\theta_0 \\leftarrow \\theta_0 - \\alpha\\, \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right] , \\qquad \\theta_1 \\leftarrow \\theta_1 - \\alpha\\, \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right] x^{(i)}',
        },
        {
          type: 'p',
          text: 'The procedure the slides use, row by row:',
        },
        {
          type: 'list',
          items: [
            'Write the epoch\'s $\\theta_0, \\theta_1$ at the top of the table.',
            'For every row compute $H_\\theta(x^{(i)}) = \\theta_0 + \\theta_1 x^{(i)}$, the error $e_i = H_\\theta(x^{(i)}) - y^{(i)}$, and $e_i x^{(i)}$.',
            'Average the error column → $\\text{PD}_{\\theta_0}$; average the error $\\times x$ column → $\\text{PD}_{\\theta_1}$.',
            'New $\\theta_0 = \\theta_0 - \\alpha\\,\\text{PD}_{\\theta_0}$, new $\\theta_1 = \\theta_1 - \\alpha\\,\\text{PD}_{\\theta_1}$.',
            'Start the next epoch with the new $\\theta$s.',
          ],
          ordered: true,
        },
        {
          type: 'exam',
          text: 'Never mix the two modes. In **batch** mode every row of the epoch is evaluated with the **same** $\\theta$s (the ones at the top of the epoch) and there is exactly **one** update at the end of the epoch. In **single** mode there are $m$ updates per epoch. The slide\'s first epoch on its own data ends at $\\theta_0 = 0.028$, $\\theta_1 = 0.1$ — those two numbers are the fingerprint of batch mode; single mode on the same data ends at $\\theta_0 = 0.1188$, $\\theta_1 = 0.4101$.',
        },
      ],
    },
    {
      heading: 'Single mode',
      blocks: [
        {
          type: 'p',
          text: 'The Equations sheet: "For Single Mode, Adjust the THETAs for each Pattern (Each Row of the Training Set), instead of just ONCE for Entire Table like Batch Mode. For Single Mode, Following Equations are Used, **DROP the SUM symbol**."',
        },
        {
          type: 'math',
          tex: '\\theta_0 \\leftarrow \\theta_0 - \\alpha\\, e_i , \\qquad \\theta_1 \\leftarrow \\theta_1 - \\alpha\\, e_i x_i , \\qquad e_i = H_\\theta(x^{(i)}) - y^{(i)}',
        },
        {
          type: 'p',
          text: 'The error used at row $i$ is the one computed with the parameters **as they stand at that row** — that is, already changed by the update made for row $i-1$. This is the detail that trips people up: the prediction in the table must be made with the current $\\theta$s, then the update is applied immediately.',
        },
        {
          type: 'p',
          text: 'One epoch of single mode performs $m$ updates instead of one, so it travels much further for the same $\\alpha$: on the slides\' own data, one batch epoch gives $(\\theta_0, \\theta_1) = (0.028, 0.1)$ while one single-mode epoch gives $(0.1188, 0.4101)$.',
        },
        {
          type: 'exam',
          text: 'Write the table with a row for **every** pattern and show the $\\theta$s that were used on that row: prediction $H_\\theta = \\theta_0 + \\theta_1 x$, error $= H_\\theta - y$, error $\\times x$, then the new $\\theta_0 = \\theta_0 - \\alpha\\,e$ and new $\\theta_1 = \\theta_1 - \\alpha\\,e x$. Do not average anything in single mode — there is no $\\sum$ and no $1/m$.',
        },
      ],
    },
    {
      heading: 'Why the update must be simultaneous',
      blocks: [
        {
          type: 'p',
          text: 'Every partial derivative contains $H_\\theta(x^{(i)})$, and $H_\\theta$ contains **all** the parameters. So the gradient is a single vector $\\nabla J(\\theta)$ that belongs to one particular point $\\theta$ of the parameter space; the whole vector must be evaluated there and then used at once.',
        },
        {
          type: 'math',
          tex: '\\begin{pmatrix} \\theta_0 \\\\ \\theta_1 \\\\ \\vdots \\\\ \\theta_n \\end{pmatrix}_{\\text{new}} = \\begin{pmatrix} \\theta_0 \\\\ \\theta_1 \\\\ \\vdots \\\\ \\theta_n \\end{pmatrix}_{\\text{old}} - \\alpha\\, \\nabla J\\!\\left(\\theta_{\\text{old}}\\right)',
        },
        {
          type: 'p',
          text: 'What goes wrong if you update one parameter and immediately reuse it:',
        },
        {
          type: 'list',
          items: [
            'The second component no longer uses the gradient of $J$ at $\\theta_{\\text{old}}$ but at a different point, so the step is not along $\\nabla J(\\theta_{\\text{old}})$.',
            'The direction taken is no longer a descent direction, so the cost $J$ is no longer guaranteed to fall at every step.',
            'In batch mode it also destroys the definition: the epoch is supposed to end with **one** update computed from the whole table.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'Updating the components one after another is a Gauss-Seidel-style sweep — a different algorithm with different convergence behaviour, not gradient descent.',
        },
        {
          type: 'exam',
          text: 'When the question asks you to "write the parameter-update expression and justify why the update is simultaneous", write the update as a single vector equation, then give the one-line justification: each $\\partial J/\\partial\\theta_j$ depends on every $\\theta_k$ through $H_\\theta$, so the gradient must be evaluated at a single parameter vector and applied to all components at once.',
        },
      ],
    },
    {
      heading: 'Choosing the learning rate',
      blocks: [
        {
          type: 'p',
          text: '$\\alpha$ scales every step of the descent, so it decides how fast the algorithm converges and whether it converges at all.',
        },
        {
          type: 'list',
          items: [
            '**Too small** — the cost falls, but so slowly that many epochs are needed (the slides use $\\alpha = 0.01$ and still need several epochs).',
            '**Too large** — the steps overshoot the minimum; the cost oscillates or even grows without bound.',
            '**Just right** — the cost falls steadily and the parameters settle near the least-squares solution.',
          ],
          ordered: false,
        },
        {
          type: 'p',
          text: 'The slides use $\\alpha = 0.01$ for their straight-line data; the Spring 2024 paper fixes $\\alpha = 0.2$ for its quadratic question.',
        },
        {
          type: 'note',
          text: 'When the question fixes $\\alpha$ you must use it even if it is a bad choice. With $\\alpha = 0.2$ and a degree-2 model on the Spring 2024 data, one batch epoch takes $J$ from $833.9$ to about $1.35 \\times 10^6$ — the step is far too big, and the "answer" is simply the parameter vector after that one epoch, not a good fit.',
        },
      ],
    },
    {
      heading: 'Polynomial regression: degree 4 and degree 2',
      blocks: [
        {
          type: 'p',
          text: 'For a polynomial hypothesis the cost function is unchanged; only the hypothesis and the number of parameters grow:',
        },
        {
          type: 'math',
          tex: 'H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2 + \\cdots + \\theta_n x^n, \\qquad \\frac{\\partial J}{\\partial \\theta_j} = \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right]\\left(x^{(i)}\\right)^j',
        },
        {
          type: 'p',
          text: 'A degree-$n$ model has $n+1$ parameters, so it needs at least $n+1$ rows of data before it is even determined — and more, for the fit to mean anything. Every extra power of $x$ simply adds one more error column ($\\text{error}\\times x$, $\\text{error}\\times x^2$, …) to the batch table.',
        },
        {
          type: 'p',
          text: 'The Spring 2024 data for the quadratic case is $(x, y) = (0,0), (2,5), (3,6), (5,9), (4,7)$ with $\\theta_0 = 2$, $\\theta_1 = 1$, $\\theta_2 = 3$ and $\\alpha = 0.2$. With $H_\\theta(x) = 2 + x + 3x^2$ the epoch works out as',
        },
        {
          type: 'table',
          head: ['$x$', '$y$', '$H_\\theta = 2 + x + 3x^2$', '$e = H_\\theta - y$', '$e\\,x$', '$e\\,x^2$'],
          rows: [
            ['0', '0', '2', '2', '0', '0'],
            ['2', '5', '16', '11', '22', '44'],
            ['3', '6', '32', '26', '78', '234'],
            ['5', '9', '82', '73', '365', '1825'],
            ['4', '7', '54', '47', '188', '752'],
            ['**Average**', '', '', '**31.8**', '**130.6**', '**571**'],
          ],
        },
        {
          type: 'math',
          tex: '\\theta_0 = 2 - (0.2)(31.8) = -4.36, \\qquad \\theta_1 = 1 - (0.2)(130.6) = -25.12, \\qquad \\theta_2 = 3 - (0.2)(571) = -111.2',
        },
        {
          type: 'note',
          text: 'The slides only cover the **straight-line** case; the degree-4 update expression and the Spring 2024 quadratic dataset are not in them. The extension is mechanical — one more error column per extra power of $x$ — but it is outside the transcribed notes, so this module is flagged as a past-paper item.',
        },
        {
          type: 'exam',
          text: 'For a degree-$n$ polynomial, write the hypothesis, then the general derivative $\\partial J/\\partial\\theta_j = \\frac{1}{m}\\sum e_i (x^{(i)})^j$, then the $n+1$ update equations **one below the other**, and only then the justification of simultaneity. Every average must be shown as a division by $m$.',
        },
      ],
    },
  ],
  formulas: [
    {
      label: 'Hypothesis (straight line)',
      tex: 'H_\\theta(x) = \\theta_0 + \\theta_1 x',
      where: 'gradient descent',
    },
    {
      label: 'Cost function',
      tex: 'J(\\theta) = \\frac{1}{2m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right]^2',
      where: 'gradient descent',
    },
    {
      label: 'Update rule',
      tex: '\\theta_j \\leftarrow \\theta_j - \\alpha\\, \\frac{\\partial J}{\\partial \\theta_j}',
      where: 'gradient descent',
    },
    {
      label: 'Partial derivatives (batch)',
      tex: '\\frac{\\partial J}{\\partial \\theta_0} = \\frac{1}{m}\\sum e_i, \\qquad \\frac{\\partial J}{\\partial \\theta_1} = \\frac{1}{m}\\sum e_i x^{(i)}',
      where: 'batch mode',
    },
    {
      label: 'Update rule (single mode)',
      tex: '\\theta_0 \\leftarrow \\theta_0 - \\alpha\\, e_i, \\qquad \\theta_1 \\leftarrow \\theta_1 - \\alpha\\, e_i x^{(i)}',
      where: 'single mode',
    },
    {
      label: 'Simultaneous update (vector form)',
      tex: '\\boldsymbol{\\theta}_{\\text{new}} = \\boldsymbol{\\theta}_{\\text{old}} - \\alpha\\, \\nabla J\\!\\left(\\boldsymbol{\\theta}_{\\text{old}}\\right)',
      where: 'why the update is simultaneous',
    },
    {
      label: 'Polynomial hypothesis and its derivative',
      tex: 'H_\\theta(x) = \\sum_{j=0}^{n}\\theta_j x^j, \\qquad \\frac{\\partial J}{\\partial \\theta_j} = \\frac{1}{m}\\sum_{i=1}^{m}\\left[\\, H_\\theta(x^{(i)}) - y^{(i)} \\right]\\left(x^{(i)}\\right)^j',
      where: 'degree-4 regression',
    },
  ],
  examples: [
    {
      title: 'Batch mode: the first epoch on the slides\' training set',
      type: 'Numerical — Gradient descent (batch)',
      question:
        'The training set is $(x, y) = (1,1), (2,3), (4,3), (3,2), (5,5)$, so $m = 5$. Starting from $\\theta_0 = \\theta_1 = 0$ with learning rate $\\alpha = 0.01$, carry out one epoch of gradient descent in **batch** mode and update the parameters.',
      source: 'Gradient Descent slides (Batch)',
      marks: 6,
      steps: [
        {
          t: 'With $\\theta_0 = \\theta_1 = 0$ the hypothesis is $H_\\theta(x) = 0$ for every row, so the error column is $-y^{(i)}$.',
          m: '1 mark',
        },
        {
          t: 'Error column: $-1, -3, -3, -2, -5$. Error $\\times x$ column: $-1, -6, -12, -6, -25$.',
          m: '2 marks',
        },
        {
          t: '$\\text{PD}_{\\theta_0} = \\text{average error} = \\dfrac{-1-3-3-2-5}{5} = -2.8$ and $\\text{PD}_{\\theta_1} = \\text{average of error}\\times x = \\dfrac{-1-6-12-6-25}{5} = -10$.',
          m: '1 mark',
        },
        {
          t: '$\\theta_0 = 0 - (0.01)(-2.8) = 0.028$ and $\\theta_1 = 0 - (0.01)(-10) = 0.1$.',
          m: '1 mark',
        },
        {
          t: 'Second epoch (with $\\theta_0 = 0.028$, $\\theta_1 = 0.1$): $H_\\theta = 0.128, 0.228, 0.428, 0.328, 0.528$; averages $-2.472$ and $-8.816$; hence $\\theta_0 = 0.0527$, $\\theta_1 = 0.1882$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\theta_0 = 0.028, \\qquad \\theta_1 = 0.1 \\quad\\text{(after one epoch)}}$',
      note: 'Trap: updating after every row instead of once per epoch. That is single mode, and on the same data it ends at $\\theta_0 = 0.1188$, $\\theta_1 = 0.4101$.',
      explanation: [
        'Batch mode is the least-squares method run by search instead of by algebra. The two columns of the table are exactly the two partial derivatives of the cost: because $H_\\theta$ contains $\\theta_0$ as a constant and $\\theta_1$ multiplied by $x$, differentiating gives the average error and the average of error $\\times x$.',
        'The update is simultaneous: both new parameters are computed from the **same** old parameters and the same averages, so $\\theta_0$ and $\\theta_1$ are both "one epoch old" at the moment they are written down.',
        'Each epoch the cost falls: the average error goes from $-2.8$ to $-2.472$ and keeps shrinking, and the parameters creep towards the least-squares solution of the same data. That is the whole point of the algorithm — it converges to the answer Ch. 10 gets in one line of algebra.',
      ],
    },
    {
      title: 'Single mode: the first epoch on the same training set',
      type: 'Numerical — Gradient descent (single)',
      question:
        'Using the same training set $(x, y) = (1,1), (2,3), (4,3), (3,2), (5,5)$, $\\theta_0 = \\theta_1 = 0$ and $\\alpha = 0.01$, carry out one epoch of gradient descent in **single** mode.',
      source: 'Gradient Descent slides (Single)',
      marks: 6,
      steps: [
        {
          t: 'Row 1, $(x, y) = (1,1)$: $H_\\theta = 0 + 0(1) = 0$, $e = 0 - 1 = -1$, $e x = -1$; new $\\theta_0 = 0 - (0.01)(-1) = 0.01$, new $\\theta_1 = 0 - (0.01)(-1) = 0.01$.',
          m: '2 marks',
        },
        {
          t: 'Row 2, $(2,3)$: $H_\\theta = 0.01 + 0.01(2) = 0.03$, $e = 0.03 - 3 = -2.97$, $ex = -5.94$; new $\\theta_0 = 0.01 + 0.0297 = 0.0397$, new $\\theta_1 = 0.01 + 0.0594 = 0.0694$.',
          m: '2 marks',
        },
        {
          t: 'Row 3, $(4,3)$: $H_\\theta = 0.0397 + 0.0694(4) = 0.3173$, $e = -2.6827$, $ex = -10.7308$; new $\\theta_0 = 0.0397 + (0.01)(2.6827) = 0.0665$, new $\\theta_1 = 0.0694 + (0.01)(10.7308) = 0.1767$.',
          m: '1 mark',
        },
        {
          t: 'Row 4, $(3,2)$: $H_\\theta = 0.06653 + 0.17671(3) = 0.5967$, $e = -1.4033$, $ex = -4.2100$; new $\\theta_0 = 0.06653 + (0.01)(1.4033) = 0.0806$, new $\\theta_1 = 0.17671 + (0.01)(4.2100) = 0.2188$.',
          m: '1 mark',
        },
        {
          t: 'Row 5, $(5,5)$: $H_\\theta = 0.08056 + 0.21881(5) = 1.1746$, $e = -3.8254$, $ex = -19.1270$; new $\\theta_0 = 0.08056 + (0.01)(3.8254) = 0.1188$, new $\\theta_1 = 0.21881 + (0.01)(19.1270) = 0.4101$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\theta_0 = 0.1188, \\qquad \\theta_1 = 0.4101 \\quad\\text{(after one epoch)}}$',
      note: 'Trap: reusing the $\\theta$s from the top of the epoch on every row. In single mode the prediction for row $i$ must use the $\\theta$s already updated by rows $1 \\dots i-1$.',
      explanation: [
        'Single mode drops the $\\sum$ and the $1/m$: the derivative is the error of the single row in front of you. Each row therefore produces its own update, and five rows produce five updates in one epoch.',
        'The error used at each row is computed with the parameters as they stand at that row. That is why the predictions in the table (0, 0.03, 0.3173, 0.5966, 1.1746) keep growing: the hypothesis is being corrected as it goes.',
        'Because five updates happen per epoch, single mode moves much further than batch mode for the same $\\alpha$ — after one epoch it has reached $\\theta_0 = 0.1188$, $\\theta_1 = 0.4101$, where batch mode has only reached $0.028$ and $0.1$.',
      ],
    },
    {
      title: 'Degree-2 polynomial regression: one batch epoch',
      type: 'Numerical — Gradient descent (batch)',
      question:
        'Fit a second-degree polynomial $H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2$ to the data $(x, y) = (0,0), (2,5), (3,6), (5,9), (4,7)$ by gradient descent in batch mode. Take $\\theta_0 = 2$, $\\theta_1 = 1$, $\\theta_2 = 3$ and learning rate $\\alpha = 0.2$, and carry out one epoch.',
      source: 'Spring 2024',
      marks: 6,
      steps: [
        {
          t: '$m = 5$. With $\\theta_0 = 2$, $\\theta_1 = 1$, $\\theta_2 = 3$ the hypothesis is $H_\\theta(x) = 2 + x + 3x^2$; the epoch table is:',
          m: '1 mark',
        },
        {
          t: '$x = 0$: $H_\\theta = 2$, $e = 2$, $ex = 0$, $ex^2 = 0$. $x = 2$: $H_\\theta = 16$, $e = 11$, $ex = 22$, $ex^2 = 44$. $x = 3$: $H_\\theta = 32$, $e = 26$, $ex = 78$, $ex^2 = 234$.',
          m: '2 marks',
        },
        {
          t: '$x = 5$: $H_\\theta = 82$, $e = 73$, $ex = 365$, $ex^2 = 1825$. $x = 4$: $H_\\theta = 54$, $e = 47$, $ex = 188$, $ex^2 = 752$.',
          m: '1 mark',
        },
        {
          t: 'Averages: $\\text{PD}_{\\theta_0} = \\dfrac{2+11+26+73+47}{5} = 31.8$, $\\text{PD}_{\\theta_1} = \\dfrac{0+22+78+365+188}{5} = 130.6$, $\\text{PD}_{\\theta_2} = \\dfrac{0+44+234+1825+752}{5} = 571$.',
          m: '1 mark',
        },
        {
          t: 'Simultaneous update: $\\theta_0 = 2 - (0.2)(31.8) = -4.36$, $\\theta_1 = 1 - (0.2)(130.6) = -25.12$, $\\theta_2 = 3 - (0.2)(571) = -111.2$.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\theta_0 = -4.36, \\qquad \\theta_1 = -25.12, \\qquad \\theta_2 = -111.2}$',
      note: 'Trap: writing the three updates one under the other and then using the **new** $\\theta_0$ in the update for $\\theta_1$. All three must use the old parameters.',
      explanation: [
        'A degree-2 hypothesis has three parameters, so the batch table gains one column: the error multiplied by $x^2$. Everything else is identical to the straight-line case — predict, form the error, average the three columns, then take one simultaneous step.',
        'Note how large this step is. The starting point $(2, 1, 3)$ already gives $J = 833.9$, and after a single epoch with $\\alpha = 0.2$ the parameters are at $(-4.36, -25.12, -111.2)$ with $J \\approx 1.35 \\times 10^6$: the step has overshot badly. The question asks for the parameter vector after one epoch, so that is the answer — but it is not a good fit, and it shows why $\\alpha$ has to be chosen carefully.',
        'Five rows are the bare minimum for a degree-2 model (three parameters), and they leave no data over to check the fit — which is why polynomial regression of this kind is risky and why the course keeps the least-squares route of Ch. 10 in view as the exact alternative.',
      ],
    },
    {
      title: 'Degree-4 polynomial: the update expression, and why it is simultaneous',
      type: 'Theory — Derive',
      question:
        'Write the parameter-update expression for a polynomial regression of degree 4 carried out by gradient descent, and justify why the update of all five parameters must be simultaneous.',
      source: 'Spring 2024',
      marks: 6,
      steps: [
        {
          t: 'Hypothesis: $H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2 + \\theta_3 x^3 + \\theta_4 x^4$; cost $J(\\theta) = \\dfrac{1}{2m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]^2$.',
          m: '2 marks',
        },
        {
          t: '$\\dfrac{\\partial J}{\\partial \\theta_j} = \\dfrac{1}{m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]\\left(x^{(i)}\\right)^j$, $j = 0,1,2,3,4$, so $\\theta_0$ multiplies the plain average error, $\\theta_1$ the average of error $\\times x$, and so on up to error $\\times x^4$.',
          m: '2 marks',
        },
        {
          t: 'The five updates, all from the same old parameters: $\\theta_0 \\leftarrow \\theta_0 - \\alpha\\,\\text{avg}(e)$, $\\theta_1 \\leftarrow \\theta_1 - \\alpha\\,\\text{avg}(ex)$, $\\theta_2 \\leftarrow \\theta_2 - \\alpha\\,\\text{avg}(ex^2)$, $\\theta_3 \\leftarrow \\theta_3 - \\alpha\\,\\text{avg}(ex^3)$, $\\theta_4 \\leftarrow \\theta_4 - \\alpha\\,\\text{avg}(ex^4)$.',
          m: '1 mark',
        },
        {
          t: 'Justification: every $\\partial J/\\partial\\theta_j$ contains $H_\\theta$, which contains all five parameters, so the gradient is one vector belonging to one point $\\theta$; it must be evaluated there and applied to all five components at once, otherwise the step is not along $\\nabla J(\\theta_{\\text{old}})$ and the cost is not guaranteed to decrease.',
          m: '1 mark',
        },
      ],
      answer: '$\\boxed{\\theta_j \\leftarrow \\theta_j - \\alpha\\, \\frac{1}{m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]\\left(x^{(i)}\\right)^j,\\quad j = 0,1,2,3,4}$',
      note: 'Trap: writing the update for $\\theta_1$ with the **new** $\\theta_0$ already substituted. That sweep is Gauss-Seidel, not gradient descent, and it is not what "simultaneous" means.',
      explanation: [
        'The degree-4 case adds no new idea — it adds columns. Where the straight-line table has "error" and "error $\\times x$", the degree-4 table has "error", "error $\\times x$", "error $\\times x^2$", "error $\\times x^3$" and "error $\\times x^4$", and each average drives one update.',
        'The justification for simultaneity is a point of logic, not a convention: the partial derivatives are not independent, because $H_\\theta$ mixes all the parameters. The gradient of $J$ at $\\theta_{\\text{old}}$ is a single direction in the five-dimensional parameter space; using part of it with a mixture of old and new components produces a step that is not a descent step.',
        'A degree-4 model has five parameters, so it needs at least five rows of data and realistically more; with $m$ rows the algorithm is exactly the same with five columns instead of two.',
      ],
    },
  ],
  flashcards: [
    {
      front: 'One sentence: what does gradient descent do?',
      back: 'It starts from a guess for the parameters and moves them repeatedly against the gradient of the cost, each step scaled by the learning rate $\\alpha$.',
    },
    {
      front: 'Cost function used in the slides.',
      back: '$J(\\theta) = \\frac{1}{2m}\\sum_{i=1}^{m}\\left[H_\\theta(x^{(i)}) - y^{(i)}\\right]^2$.',
    },
    {
      front: 'The update rule.',
      back: '$\\theta_j \\leftarrow \\theta_j - \\alpha\\,\\frac{\\partial J}{\\partial\\theta_j}$.',
    },
    {
      front: 'What are the two partial derivatives, in words?',
      back: 'PD wrt $\\theta_0$ = **average error**; PD wrt $\\theta_1$ = **average of error $\\times x$**.',
    },
    {
      front: 'Batch mode: when are the parameters updated?',
      back: 'Once per epoch, after the whole table; the derivatives are the two averages above.',
    },
    {
      front: 'Single mode: what changes?',
      back: 'The $\\sum$ (and the $1/m$) is dropped and the update is made after **every** row, with the error computed from the parameters already updated.',
    },
    {
      front: 'Slides\' data, one batch epoch: the answer.',
      back: '$\\theta_0 = 0.028$, $\\theta_1 = 0.1$ (from $m = 5$, $\\alpha = 0.01$, $\\theta_0 = \\theta_1 = 0$).',
    },
    {
      front: 'Slides\' data, one single-mode epoch: the answer.',
      back: '$\\theta_0 = 0.1188$, $\\theta_1 = 0.4101$.',
    },
    {
      front: 'Why must the update be simultaneous?',
      back: 'Every $\\partial J/\\partial\\theta_j$ depends on all the $\\theta_k$ through $H_\\theta$, so the gradient is one vector at one point $\\theta$ and must be applied to all components at once.',
    },
    {
      front: 'What does a too-large $\\alpha$ do?',
      back: 'The steps overshoot the minimum: the cost oscillates or diverges instead of settling.',
    },
    {
      front: 'Spring 2024 quadratic: the one-epoch answer.',
      back: '$\\theta_0 = -4.36$, $\\theta_1 = -25.12$, $\\theta_2 = -111.2$ (from $\\theta = (2,1,3)$, $\\alpha = 0.2$, averages $31.8$, $130.6$, $571$).',
    },
    {
      front: 'Degree-$n$ polynomial: the derivative of the cost.',
      back: '$\\frac{\\partial J}{\\partial\\theta_j} = \\frac{1}{m}\\sum e_i\\left(x^{(i)}\\right)^j$, $j = 0 \\dots n$ — one more error column per power of $x$.',
    },
  ],
  quiz: [
    {
      q: 'The learning rate $\\alpha$ does what?',
      options: [
        'scales every step of the descent',
        'sets the number of epochs',
        'normalises the data',
        'decides whether the update is simultaneous',
      ],
      answer: 0,
      explain: '$\\theta_j \\leftarrow \\theta_j - \\alpha\\,\\partial J/\\partial\\theta_j$ — $\\alpha$ is the size of one step.',
    },
    {
      q: 'In the slides, the partial derivative with respect to $\\theta_0$ is',
      options: [
        'the average of the error column',
        'the average of the error $\\times x$ column',
        'the sum of the predictions',
        'the largest error in the epoch',
      ],
      answer: 0,
      explain: 'The sheet labels it "P.D. = Average Error"; the other column is "P.D. = Average over Error i * x i".',
    },
    {
      q: 'Batch mode updates the parameters',
      options: [
        'once per epoch, after the whole table',
        'after every row',
        'once per row but only for $\\theta_0$',
        'only when the cost reaches zero',
      ],
      answer: 0,
      explain: '"For Batch Mode, the THETAs are Updated only ONCE for the whole Table (Training Set)."',
    },
    {
      q: 'In single mode the error used for the update at row $i$ is',
      options: [
        'computed with the parameters already updated by the previous rows of the same epoch',
        'computed with the parameters from the start of the epoch',
        'the average of all the errors so far',
        'always positive',
      ],
      answer: 0,
      explain: 'Single mode adjusts the $\\theta$s for each pattern, so the prediction for row $i$ already includes the corrections made for rows $1 \\dots i-1$.',
    },
    {
      q: 'On the slides\' data, one epoch of batch mode with $\\alpha = 0.01$ gives',
      options: [
        '$\\theta_0 = 0.028$, $\\theta_1 = 0.1$',
        '$\\theta_0 = 0.1$, $\\theta_1 = 0.028$',
        '$\\theta_0 = 0.1188$, $\\theta_1 = 0.4101$',
        '$\\theta_0 = -2.8$, $\\theta_1 = -10$',
      ],
      answer: 0,
      explain: 'The averages are $-2.8$ and $-10$, so the updates give $0.028$ and $0.1$.',
    },
    {
      q: 'Why is the update simultaneous?',
      options: [
        'because each $\\partial J/\\partial\\theta_j$ depends on all the parameters through $H_\\theta$, so the gradient must be taken at one point $\\theta$',
        'because the cost function must stay symmetric',
        'because $\\alpha$ cannot change during the run',
        'because the parameters must stay integers',
      ],
      answer: 0,
      explain: 'Updating one component and reusing it makes the step stale — a Gauss-Seidel sweep rather than gradient descent.',
    },
    {
      q: 'For a degree-4 polynomial, how many error columns does the batch table have?',
      options: ['5 ($e$, $ex$, $ex^2$, $ex^3$, $ex^4$)', '4', '2', '6'],
      answer: 0,
      explain: 'One column per parameter: $e\\cdot x^j$ for $j = 0,1,2,3,4$.',
    },
    {
      q: 'The Spring 2024 quadratic question (one batch epoch, $\\alpha = 0.2$, $\\theta = (2,1,3)$) gives',
      options: [
        '$\\theta = (-4.36, -25.12, -111.2)$',
        '$\\theta = (0.028, 0.1)$',
        '$\\theta = (31.8, 130.6, 571)$',
        '$\\theta = (2, 1, 3)$',
      ],
      answer: 0,
      explain: 'The averages of the error, $ex$ and $ex^2$ columns are $31.8$, $130.6$ and $571$; subtracting $0.2$ times each gives the answer.',
    },
    {
      q: 'A learning rate that is too small will',
      options: [
        'make the descent converge very slowly',
        'make the cost go negative',
        'make the update simultaneous',
        'remove the $\\sum$ from the update',
      ],
      answer: 0,
      explain: 'The slides use $\\alpha = 0.01$ and still need several epochs; too large is worse, because the cost can diverge.',
    },
  ],
  solvers: ['gradBatch', 'gradSingle', 'gradPoly2'],
};
