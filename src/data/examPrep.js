// Exam prep: the questions that keep coming back across the four papers, and the traps that cost marks.
// The traps are the teacher's own six rules, turned into the mistakes students actually make.
export const likely = [
  {
    id: 'LP-1', module: 'elimination', flag: 'Asked in 3 of 4 papers',
    q: 'Solve a system of linear equations by Gauss elimination, with partial pivoting where a zero pivot appears.',
    answer: [
      'Write the augmented matrix and name the pivot row.',
      'At **every** pivot column, compare the magnitudes below the pivot row and swap in the largest one.',
      'For each elimination write the operation *and* the resulting row: $R_2\' = R_2 - \\left(\\frac{a_{21}}{a_{11}}\\right)R_1$ and then $R_2\' = [\\;0\\;\\;\\dots\\;|\\;\\dots\\;]$.',
      'Finish with the upper triangular matrix and the back substitution, one line per unknown.',
    ],
  },
  {
    id: 'LP-2', module: 'interpolation', flag: 'Asked in every paper',
    q: 'Derive and apply an interpolation formula — Lagrange for unequal intervals, or Newton forward for equal intervals.',
    answer: [
      'State the formula with its notation before using it.',
      'For Lagrange, write $P(x) = \\sum y_i L_i(x)$ and explain why $L_i(x_j) = \\delta_{ij}$; then substitute the numbers.',
      'For Newton forward, build the difference table first and then write $p = (x-x_0)/h$.',
      'End with the boxed value and, if asked, the polynomial in expanded form.',
    ],
  },
  {
    id: 'LP-3', module: 'differences', flag: 'Asked in 3 of 4 papers — prove it',
    q: 'Prove $\\Delta - \\nabla = \\delta^2$ and $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$.',
    answer: [
      'Write the operators out on a test function: $\\Delta f(x) = f(x+h)-f(x)$, $\\nabla f(x) = f(x)-f(x-h)$, $\\delta f(x) = f(x+h/2)-f(x-h/2)$.',
      'Show $(\\Delta-\\nabla)f(x) = f(x+h) - 2f(x) + f(x-h)$.',
      'Show $\\delta^2 f(x) = [f(x+h)-f(x)] - [f(x)-f(x-h)] = f(x+h)-2f(x)+f(x-h)$ — the same expression, so $\\Delta-\\nabla \\equiv \\delta^2$.',
      'For the second, use $\\mu f = \\tfrac{1}{2}[f(x+h/2)+f(x-h/2)]$ to get $\\mu^2 f = \\tfrac{1}{4}[f(x+h)+2f(x)+f(x-h)] = f + \\tfrac{1}{4}\\delta^2 f$.',
    ],
  },
  {
    id: 'LP-4', module: 'integration', flag: 'Asked in every paper',
    q: 'Apply a numerical integration rule — trapezoidal, Simpson\'s 1/3, Simpson\'s 3/8, Weddle\'s or Romberg — and compare with the true value.',
    answer: [
      'State $h$, the number of subintervals, and the values of the integrand at each node.',
      'Check the rule fits the data: Simpson\'s 1/3 needs an **even** number of subintervals, Simpson\'s 3/8 a multiple of three, Weddle\'s a multiple of six.',
      'Write the rule with the numbers substituted before the arithmetic.',
      'Give the error term and the comparison with the exact value.',
    ],
  },
  {
    id: 'LP-5', module: 'errors', flag: 'Asked in every paper',
    q: 'Define the error terms — chopping, rounding, relative error, significant digits, condition number, deflation — and compute a relative error.',
    answer: [
      'Give the definitions in one line each.',
      'For the computation, write the partial derivatives, then $e_r = \\frac{1}{u}\\sum \\frac{\\partial u}{\\partial x_i}\\Delta x_i$.',
      'Watch the sign: a negative derivative contributes negatively and can cancel another error.',
    ],
  },
  {
    id: 'LP-6', module: 'roots', flag: 'Asked in every paper',
    q: 'Find a root by Bisection, Newton-Raphson or Secant, and find all the roots of a polynomial by synthetic division and deflation.',
    answer: [
      'State the bracketing and the stopping criterion, then run the iterations in a table.',
      'For Newton-Raphson, show the iteration $x_{i+1} = x_i - f(x_i)/f\'(x_i)$ with the numbers.',
      'For deflation, use Horner\'s synthetic division table: bring down, multiply by the root, add, repeat — the remainder proves the root and the last row is the quotient.',
    ],
  },
  {
    id: 'LP-7', module: 'iterative', flag: 'Asked in 3 of 4 papers',
    q: 'Solve a system by Jacobi or Gauss-Seidel iteration, and state the convergence condition.',
    answer: [
      '**First**: the diagonal dominance check, one line per row.',
      'Then the isolated form of each equation, then the iteration table.',
      'State the starting vector and the stopping rule.',
      'For a comparison question, say which method is faster and why: Gauss-Seidel uses the most recent value as soon as it is available.',
    ],
  },
  {
    id: 'LP-8', module: 'differentiation', flag: 'Asked in 3 of 4 papers',
    q: 'Estimate a derivative from tabular data, or prove the truncation error of a difference formula.',
    answer: [
      'Choose the formula from the **position in the table**: forward at the first point, central in the middle, backward at the last point.',
      'For the proof, expand in Taylor series, show the cancellation of the lower terms and identify the surviving term as the error.',
      'State the order of accuracy: $O(h)$ for two-point, $O(h^2)$ for three-point central and forward.',
    ],
  },
  {
    id: 'LP-9', module: 'regression', flag: 'Asked in 3 of 4 papers',
    q: 'Fit a straight line or a power law to a table by least squares, and justify the model.',
    answer: [
      'Justify with a statement about the shape of the data (points near a line; or log-log points near a line).',
      'Write the normal equations $\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$, then the closed-form formulas.',
      'For a power law, take logs first: $\\ln y = \\ln a + b\\ln x$, fit the straight line, then undo the logarithm.',
    ],
  },
  {
    id: 'LP-10', module: 'lu', flag: 'Asked in 2 of 4 papers',
    q: 'Solve a system using Do-Little LU decomposition.',
    answer: [
      'Factorise: $u_{1j} = a_{1j}$, $l_{i1} = a_{i1}/u_{11}$, then fill in the rest of $U$ and $L$ with the slide\'s formulas.',
      'Forward substitution $[L]\\{d\\} = \\{b\\}$, then backward substitution $[U]\\{x\\} = \\{d\\}$.',
      'Close with the check $LU = A$.',
    ],
  },
  {
    id: 'LP-11', module: 'gradient', flag: 'Asked in the latest paper (7 + 7 marks)',
    q: 'Perform polynomial regression by gradient descent, in batch mode or single mode.',
    answer: [
      'Write the hypothesis $H_\\theta(x) = \\theta_0 + \\theta_1x + \\theta_2x^2 + \\cdots$ and the cost $J = \\frac{1}{2m}\\sum (H_\\theta - y)^2$.',
      'Give the partial derivative $\\partial J/\\partial\\theta_j = \\frac{1}{m}\\sum (H_\\theta(x^{(i)}) - y^{(i)})x^{(i)}_j$ — in **single** mode drop the $\\sum$.',
      'Update: $\\theta_j \\leftarrow \\theta_j - \\alpha\\,\\partial J/\\partial\\theta_j$, and say that all the $\\theta_j$ are updated **simultaneously**.',
    ],
  },
  {
    id: 'LP-12', module: 'pca', flag: 'Syllabus topic — no past paper yet',
    q: 'Perform PCA on a data set, reduce the dimension keeping a stated percentage of variance, and reconstruct.',
    answer: [
      'Six steps: preprocess, covariance matrix, eigenvalues, eigenvectors and $V$, reduce, reconstruct and errors.',
      'Show the mean-normalised (and, if asked, scaled) points.',
      'Report the variance percentage of each component and how many you keep.',
      'Give MAE, SSE and RMSE from the reconstruction.',
    ],
  },
];

export const traps = [
  {
    module: 'elimination',
    text: '**The pivot check is repeated at every pivot row.** Swapping only on the first column is the mistake the teacher called out by name: after the first elimination the second pivot can be zero, and you must interchange the rows then.',
  },
  {
    module: 'elimination',
    text: '**Write the resulting row.** $R_2\' = R_2 - 2R_1$ with no row after it loses marks every single time. Write the operation and the row it produces.',
  },
  {
    module: 'elimination',
    text: '**Gauss-Jordan ends at the identity matrix — no back substitution.** If you back-substitute after a Gauss-Jordan, you did not finish the method. Normalise the pivot row first, then clear its column.',
  },
  {
    module: 'elimination',
    text: '**Do not pivot when no pivot is zero.** If the question says only "Gauss elimination" and nothing goes wrong, pivoting that was not asked for wastes time and looks wrong.',
  },
  {
    module: 'elimination',
    text: '**But pivot the moment you hit a division by zero.** Partial pivoting is the version to use — it is less complex than full pivoting.',
  },
  {
    module: 'iterative',
    text: '**Check diagonal dominance before you iterate.** Diverging values almost always mean the equations were arranged badly. Check it row by row, and if it fails, try to rearrange the equations (or rename the unknowns) so that it holds.',
  },
  {
    module: 'interpolation',
    text: '**Keep full precision in the difference table.** The slides round intermediate values, which makes their later numbers differ slightly from the exact arithmetic. Write down which you used.',
  },
  {
    module: 'integration',
    text: '**Match the rule to the number of subintervals.** Simpson\'s 1/3 needs an even number, Simpson\'s 3/8 a multiple of three, Weddle\'s a multiple of six. With an odd number of subintervals, split the range and use two rules.',
  },
  {
    module: 'differentiation',
    text: '**Use the formula that fits the position in the table.** A central difference at the first point does not exist — use a forward difference there and a backward one at the last point.',
  },
  {
    module: 'errors',
    text: '**Round-off error is at most half of chopping error.** Chopping can lose a whole unit in the last place; rounding loses at most half. Say which one your calculator does not matter — the bound is what is asked.',
  },
  {
    module: 'gradient',
    text: '**Batch and single mode are different algorithms.** In batch mode the parameters are updated once per epoch from the averages over the whole table; in single mode they are updated after every row, and the $\\sum$ disappears. Check which one the question wants before you compute.',
  },
  {
    module: 'pca',
    text: '**Say which points you project.** The PCA tutorial projects the original points onto the principal axis. If you project the mean-normalised points, add the mean back before you compute the errors.',
  },
];
