// Iterative methods — Jacobi and Gauss-Seidel.
// Source: Iterative Solution of Linear Equations slides (CSE2201), Medha's class notes (pp.18-20), past papers.
export const checks = {
  "Start here: the problem this chapter solves": {
    q: "What do iterative methods trade away compared with elimination?",
    options: ["They only work for 2 unknowns", "The guarantee of reaching the exact answer — convergence must be checked", "They cannot use decimals", "Nothing; they are strictly better"],
    answer: 1,
    explain: "Iteration buys cheap, early, improving answers at the price of a convergence condition (diagonal dominance) that must hold.",
  },
  "Start here: the core idea": {
    q: "The practical difference between Jacobi and Gauss-Seidel is…",
    options: ["Gauss-Seidel uses new values the moment they are available", "Jacobi converges quadratically", "They solve different equations", "Gauss-Seidel needs no starting guess"],
    answer: 0,
    explain: "Jacobi updates everything from last round's values; Gauss-Seidel reuses fresh values immediately, which usually speeds convergence.",
  },
  "Start here: reading the symbols": {
    q: "In $x^{(k)}$, the superscript $(k)$ means…",
    options: ["x raised to the power k", "the k-th derivative", "the guess at iteration k", "the k-th unknown"],
    answer: 2,
    explain: "Round brackets mark an iteration counter — a numbering label, not arithmetic.",
  },
  "Start here: your first walk-through": {
    q: "The walk-through values $1.6667, 0.8333, 1.1111$ for $x$ show…",
    options: ["divergence — the answer is running away", "convergence — oscillation around 1 with shrinking swings", "a wrong dominance check", "exact answers at every step"],
    answer: 1,
    explain: "Swinging either side of the true value 1 with shrinking amplitude is exactly what healthy convergence looks like.",
  },
  'When do you use an iterative method': {
    q: 'Which of these is NOT a reason to prefer an iterative method over a direct one?',
    options: [
      'The system has many equations (n of order 15 or more)',
      'The coefficient matrix is sparse',
      'The matrix is structured so that Ax is cheap to compute',
      'You want the exact answer in one step',
    ],
    answer: 3,
    explain: 'Iterative methods give an approximation that improves with each iteration; the whole point is that many cheap iterations beat one expensive elimination.',
  },
  'Diagonal dominance': {
    q: 'A system is diagonally dominant when, for every row,',
    options: [
      'the diagonal entry is larger than the sum of the absolute values of the other entries',
      'the diagonal entries are all equal',
      'the matrix is symmetric',
      'the diagonal entry is the largest number in the matrix',
    ],
    answer: 0,
    explain: 'The condition is $|a_{ii}| > \\sum_{j \\ne i}|a_{ij}|$ for every row. It is sufficient for convergence but not necessary.',
  },
  "Jacobi's method": {
    q: "In Jacobi's method, the value of $x_1^{(k+1)}$ is computed using",
    options: [
      'only the old values $x_2^{(k)}, x_3^{(k)}, \\dots$',
      'the new values $x_2^{(k+1)}, x_3^{(k+1)}$',
      'the values from the previous iteration of the whole system',
      'the pivot row',
    ],
    answer: 0,
    explain: 'Jacobi uses only the old values — every new value is computed from the previous iteration. Gauss-Seidel is the one that uses the new values.',
  },
  "Gauss-Seidel's method": {
    q: "Gauss-Seidel is faster than Jacobi because",
    options: [
      'it uses the most recent value of a variable as soon as it is available',
      'it needs fewer iterations to start',
      'it does not need diagonal dominance',
      'it uses a bigger starting vector',
    ],
    answer: 0,
    explain: 'In the $(k+1)$th Gauss-Seidel iteration, $x_i^{(k+1)}$ uses the new values $x_1^{(k+1)} \\dots x_{i-1}^{(k+1)}$ and the old values for the rest, so the information travels through the system faster.',
  },
  'The starting vector and the stopping rule': {
    q: 'Which starting vector does the course recommend for Jacobi and Gauss-Seidel?',
    options: [
      'All $x_i = 1$',
      '$x_i = b_i/a_{ii}$',
      '$x_i = 0$ always',
      'Any random values',
    ],
    answer: 1,
    explain: "The slides give two choices: all ones, or the better choice $x_i = b_i/a_{ii}$, which starts each variable at its own value.",
  },
  'Jacobi against Gauss-Seidel': {
    q: 'A student\'s Jacobi iteration is diverging wildly. What should they check first?',
    options: [
      'Whether the system is diagonally dominant, and rearrange the equations if it is not',
      'Whether they used enough decimal places',
      'Whether the starting vector was zero',
      'Whether they wrote the iteration table',
    ],
    answer: 0,
    explain: "Rule 5 from the teacher: always check diagonal dominance before iterating. Divergence is almost always an arrangement problem, and the equations can often be reordered to fix it.",
  },
};

export default {
  id: 'iterative',
  chapter: 4,
  title: 'Iterative Methods',
  wave: 'iter',
  sources: ['Iterative Solution of Linear Equations slides', "Medha's class notes (pp.18-20)", 'Past papers'],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "A power grid, a national economy, a building's frame — real systems have thousands of unknowns. Gaussian elimination still works, but its cost grows with the **cube** of the size, and it marches straight to the exact answer even when 'close enough, quickly' would do." },
        { type: "p", text: "Iterative methods take the opposite bet: start from a crude guess and **refine it repeatedly**, letting the answer emerge step by step. Each round is cheap, you can stop as soon as the answer is good enough, and a halfway answer is available at any moment." },
        { type: "p", text: "The catch: refinement is not guaranteed to converge. Knowing **when** an iteration can be trusted (diagonal dominance) is as much a part of this chapter as running the iteration itself — and it is the teacher's favourite theory question." },
        { type: "list", items: [
          "Rearrange a system into updating formulas.",
          "Run Jacobi (update all at once) and Gauss-Seidel (update immediately).",
          "State and check the convergence condition before iterating.",
          "Recognise a diverging iteration from its numbers.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Take each equation and solve it for **its own** diagonal unknown. That turns the system into a set of update formulas: feed in a guess for all variables, read out improved values, feed those back in, repeat." },
        { type: "math", tex: "x_1 = \\frac{1}{a_{11}}\\left(b_1 - a_{12}x_2 - a_{13}x_3\\right), \\quad \\ldots \\quad \\text{(one formula per unknown)}" },
        { type: "p", text: "Two timing strategies give the chapter's two methods. **Jacobi** is the weekly report: every variable updates from last round's values only. **Gauss-Seidel** is the group chat: the moment a new value appears, everyone after it uses it — which usually converges faster." },
        { type: "note", text: "Refinement converges only when each equation is dominated by its own diagonal term: $|a_{ii}| > \\sum_{j \\ne i} |a_{ij}|$ for every row (**diagonal dominance**). The teacher's rule: check this **before** writing a single iteration — and if a system is not dominant, rearrange the equations so it becomes dominant." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "p", text: "The one symbol that trips beginners is the superscript in $x^{(k)}$: it counts **iterations**, it is not a power." },
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$x^{(k)}$", "the guess after $k$ iterations", "'x at iteration k' — not x to the power k"],
          ["$x^{(0)}$", "the starting guess (often all zeros)", "x nought"],
          ["$|x^{(k+1)} - x^{(k)}| < \\varepsilon$", "stopping rule: changes are tiny", "converged, stop iterating"],
          ["$|a_{ii}| > \\sum_{j \\ne i} |a_{ij}|$", "diagonal dominance of row $i$", "the convergence ticket"],
        ] },
        { type: "p", text: "An iteration whose values blow up or oscillate ever wider is **diverging** — a sign the dominance check was skipped." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "Refine the solution of $3x + y = 5$, $x + 2y = 5$ by Jacobi iteration from the flat start $(0, 0)$. (The exact answer is $(1, 1)$ — watching the iteration homes in on it is the whole point.)" },
        { type: "p", text: "**Dominance check first:** $|3| > |1|$ ✓ and $|2| > |1|$ ✓ — both rows are diagonally dominant, so the iteration may be trusted. Rearranged: $x = \\frac{5 - y}{3}$ and $y = \\frac{5 - x}{2}$." },
        { type: "table", head: ["$k$", "$x^{(k)}$", "$y^{(k)}$"], rows: [
          ["1", "1.6667", "2.5"],
          ["2", "0.8333", "1.6667"],
          ["3", "1.1111", "2.0833"],
        ] },
        { type: "p", text: "Read the table like an iterationist: the values swing either side of $(1, 1)$ but the swings shrink — $1.6667 \\to 0.8333 \\to 1.1111$ brackets $1$ ever more tightly. That shrinking oscillation **is** convergence; keep iterating until $|x^{(k+1)} - x^{(k)}|$ falls below the tolerance, then stop." },
        { type: "exam", text: "Exam shape: state the dominance check (one line), show the rearranged formulas, then a column table of iterations — the papers award the method marks to the table, not to the final decimals." },
      ],
    },
    {
      heading: 'When do you use an iterative method',
      blocks: [
        {
          type: 'p',
          text: 'An iterative method finds an **approximation** to the solution of $Ax = b$ by repeating a simple step until the numbers stop changing. It is the right choice when:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'The number of equations $n$ is large — of order 15 or more.',
            'The matrix $A$ is **sparse**, with very few non-zero coefficients.',
            'The matrix is **structured**, so that the product $Ax$ can be computed cheaply.',
          ],
        },
        {
          type: 'p',
          text: 'The main idea is to avoid computing $A^{-1}$ and to perform only a **cheap operation** $Ax$ at each step. Direct methods need a prohibitively large number of floating-point operations, which is not only slow but also makes the accuracy worse because of round-off error.',
        },
        {
          type: 'note',
          text: 'The slides are careful about the claim: iterative approaches also solve ill-conditioned structures without making the round-off error worse — the error stays controlled because each step is small and local.',
        },
        {
          type: 'exam',
          text: 'If a question asks *why* you would use an iterative method, give the three conditions (n large, A sparse, A structured) and then the pay-off: each iteration is cheap, so the total work is much smaller than a full elimination.',
        },
      ],
    },
    {
      heading: 'Diagonal dominance',
      blocks: [
        {
          type: 'p',
          text: 'A system is **diagonally dominant** if, in every row, the absolute value of the diagonal entry is greater than the sum of the absolute values of the other entries in that row:',
        },
        { type: 'math', tex: '|a_{ii}| > \\sum_{j \\ne i} |a_{ij}|, \\qquad \\text{for every } i' },
        {
          type: 'p',
          text: 'The slide proves the condition for two equations by writing $x_1 = F(x_1, x_2)$ and $x_2 = G(x_1, x_2)$, taking the partial derivatives, and applying the fixed-point condition $|G\'(x)| < 1$:',
        },
        {
          type: 'math',
          tex: '\\left|\\frac{\\partial F}{\\partial x_1}\\right| = 0, \\quad \\left|\\frac{\\partial F}{\\partial x_2}\\right| = \\frac{|a_{12}|}{|a_{11}|}, \\quad \\left|\\frac{\\partial G}{\\partial x_1}\\right| = \\frac{|a_{21}|}{|a_{22}|}, \\quad \\left|\\frac{\\partial G}{\\partial x_2}\\right| = 0',
        },
        {
          type: 'p',
          text: 'Both conditions give $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$ — which is exactly diagonal dominance, row by row.',
        },
        {
          type: 'note',
          text: 'The slide says it plainly: this condition is **sufficient but not necessary**. Some systems converge even when it is not satisfied. But it is the condition that *guarantees* convergence, so it is the first thing to check.',
        },
        {
          type: 'exam',
          text: 'Always open an iterative-methods answer with the dominance check — one line per row, $|a_{ii}|$ against the sum of the others, and then a sentence saying whether the iteration is guaranteed to converge.',
        },
        {
          type: 'note',
          text: 'Rule 5 from the teacher: *always check whether the system is diagonally dominant. Some of you may have noticed that your values diverged significantly during the iterations. Properly rearranging the equations to make the system diagonally dominant could have prevented this divergence.*',
        },
      ],
    },
    {
      heading: "Jacobi's method",
      blocks: [
        {
          type: 'p',
          text: 'Jacobi is the fixed-point iteration applied to a whole system. It is a **direct substitution** method: the unknowns are improved by substituting the previous values.',
        },
        {
          type: 'p',
          text: 'Step 1 — rewrite the system with each variable isolated:',
        },
        {
          type: 'math',
          tex: 'x_1^{(k+1)} = \\frac{1}{a_{11}}\\left(b_1 - a_{12}x_2^{(k)} - a_{13}x_3^{(k)} - \\cdots - a_{1n}x_n^{(k)}\\right)',
        },
        {
          type: 'math',
          tex: 'x_2^{(k+1)} = \\frac{1}{a_{22}}\\left(b_2 - a_{21}x_1^{(k)} - a_{23}x_3^{(k)} - \\cdots - a_{2n}x_n^{(k)}\\right) \\quad\\dots\\quad x_n^{(k+1)} = \\frac{1}{a_{nn}}\\left(b_n - a_{n1}x_1^{(k)} - \\cdots - a_{n,n-1}x_{n-1}^{(k)}\\right)',
        },
        {
          type: 'p',
          text: 'Step 2 — compute the first approximation from the starting vector. Step 3 — repeat: the second approximation uses the first, the third uses the second, and so on.',
        },
        {
          type: 'note',
          text: 'Note the superscript on the right-hand side: it is $k$, never $k+1$. If you use a new value on the right you have stopped doing Jacobi and started doing Gauss-Seidel.',
        },
        {
          type: 'exam',
          text: 'Write the isolated form of each equation first, then the iteration table with a row per iteration and a column per unknown. Keep full precision in the table — round only the final answer.',
        },
      ],
    },
    {
      heading: "Gauss-Seidel's method",
      blocks: [
        {
          type: 'p',
          text: "Gauss-Seidel is an improved version of Jacobi. In Jacobi we begin with the initial values and obtain the next approximation only after the whole set has been computed. In Gauss-Seidel we use **the most recent value of a variable as soon as it becomes available**.",
        },
        {
          type: 'math',
          tex: 'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - a_{i1}x_1^{(k+1)} - \\cdots - a_{i,i-1}x_{i-1}^{(k+1)} - a_{i,i+1}x_{i+1}^{(k)} - \\cdots - a_{in}x_n^{(k)}\\right)',
        },
        {
          type: 'p',
          text: 'The variables **before** $x_i$ use the new values $x^{(k+1)}$; the variables **after** $x_i$ still use the old values $x^{(k)}$. That is the whole difference.',
        },
        {
          type: 'p',
          text: 'The slide\'s algorithm: obtain $n$, $a_{ij}$ and $b_i$; set $x_i^{(0)} = b_i/a_{ii}$; then for each iteration set the sum to $b_i$, subtract $a_{ij}x_j$ for every $j \\ne i$, and set $x_i = \\text{sum}/a_{ii}$; if any value changed by more than the allowed error, repeat.',
        },
        {
          type: 'exam',
          text: 'Show each iteration **row by row** in the order $x$, then $y$, then $z$, so the reader can see that $y^{(1)}$ used the new $x^{(1)}$. Writing only the end-of-iteration triple hides the whole point of the method.',
        },
      ],
    },
    {
      heading: 'The starting vector and the stopping rule',
      blocks: [
        {
          type: 'p',
          text: '**Choosing the starting vector.** The slides give two choices:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'All $x_i = 1$.',
            'The better choice $x_i = b_i/a_{ii}$ — each variable starts at its own value in the equation.',
          ],
        },
        {
          type: 'p',
          text: '**Stopping criteria.**',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'The maximum number of iterations has been reached.',
            'The tolerance level has been reached — usually $|x_i^{(k+1)} - x_i^{(k)}| < \\varepsilon$ for every $i$.',
          ],
        },
        {
          type: 'p',
          text: 'In the slide\'s worked example the iteration starts from $x = y = z = 0$, which is why the first approximation is simply $b_i/a_{ii}$.',
        },
        {
          type: 'exam',
          text: 'Write the starting vector you used. Then write the iteration table, then state the stopping rule you applied and the number of iterations. The table is where the marks are.',
        },
      ],
    },
    {
      heading: 'Jacobi against Gauss-Seidel',
      blocks: [
        {
          type: 'p',
          text: 'The convergence condition is the same for both methods, but **the convergence in Gauss-Seidel is more rapid than in Jacobi**.',
        },
        {
          type: 'p',
          text: 'The reason is visible in the formulas: after one sweep, Gauss-Seidel has already used the fresh information from $x_1$ when it computes $x_2$, and from $x_1, x_2$ when it computes $x_3$. Jacobi throws that information away and starts every row from the previous iteration.',
        },
        {
          type: 'note',
          text: 'A paper asks you to interpret this with an example. Say which method converges faster, then explain why in terms of the values used — the "most recent value as soon as it becomes available" line from the slide is the answer.',
        },
        {
          type: 'exam',
          text: 'A good comparison answer has three parts: the shared condition (diagonal dominance), the speed difference (Gauss-Seidel faster), and the reason (new values are used immediately instead of waiting for the whole sweep).',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Jacobi iteration', tex: 'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j \\ne i} a_{ij}x_j^{(k)}\\right)', where: 'old values only' },
    { label: 'Gauss-Seidel iteration', tex: 'x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j < i} a_{ij}x_j^{(k+1)} - \\sum_{j > i} a_{ij}x_j^{(k)}\\right)', where: 'new values before $i$, old after' },
    { label: 'Diagonal dominance', tex: '|a_{ii}| > \\sum_{j \\ne i}|a_{ij}| \\quad \\text{for every row } i', where: 'sufficient for convergence' },
    { label: 'Starting vector', tex: 'x_i^{(0)} = \\frac{b_i}{a_{ii}}', where: 'the better of the two choices' },
    { label: 'Stopping rule', tex: '\\max_i |x_i^{(k+1)} - x_i^{(k)}| < \\varepsilon', where: 'or a maximum number of iterations' },
  ],
  examples: [
    {
      title: "Jacobi's method on the slide's system",
      question: "Solve the following system of linear equations by Jacobi's method: $5x + 2y + z = 12$, $x + 4y + 2z = 15$, $x + 2y + 5z = 20$.",
      source: 'Iterative Solution slides — worked example',
      marks: 6,
      steps: [
        { t: 'Check diagonal dominance: $|a_{11}| = 5 > 2 + 1 = 3$; $|a_{22}| = 4 > 1 + 2 = 3$; $|a_{33}| = 5 > 1 + 2 = 3$. The system is diagonally dominant, so the iteration converges.', m: '1 mark' },
        { t: 'Isolate each variable: $x = \\tfrac{1}{5}[12 - 2y - z]$, $y = \\tfrac{1}{4}[15 - x - 2z]$, $z = \\tfrac{1}{5}[20 - x - 2y]$.', m: '1 mark' },
        { t: 'Start from $x = y = z = 0$. Iteration 1: $x^{(1)} = \\tfrac{1}{5}[12 - 0 - 0] = 2.40$, $y^{(1)} = \\tfrac{1}{4}[15 - 0 - 0] = 3.75$, $z^{(1)} = \\tfrac{1}{5}[20 - 0 - 0] = 4.00$.', m: '2 marks' },
        { t: 'Iteration 2: $x^{(2)} = \\tfrac{1}{5}[12 - 2(3.75) - 4.00] = 0.10$, $y^{(2)} = \\tfrac{1}{4}[15 - 2.40 - 2(4.00)] = 1.15$, $z^{(2)} = \\tfrac{1}{5}[20 - 2.40 - 2(3.75)] = 2.02$.', m: '1 mark' },
        { t: 'Continue the table: $x^{(3)} = 1.54$, $y^{(3)} = 2.72$, $z^{(3)} = 3.52$; $x^{(4)} = 0.61$, $y^{(4)} = 1.61$, $z^{(4)} = 2.61$; … and the values settle at $x = 1.084$, $y = 1.95$, $z = 3.164$ after the 8th iteration, converging to the exact solution $(1, 2, 3)$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x \\approx 1.084,\\; y \\approx 1.95,\\; z \\approx 3.164}$ after 8 iterations (the exact solution is $x = 1,\; y = 2,\; z = 3$)',
      note: 'Trap: rounding inside the table. If you round $z^{(1)}$ to 4 instead of 4.00 the whole table drifts and the final answer is wrong.',
      explanation: [
        'Jacobi is the fixed-point iteration $x = g(x)$ applied to a system. Each unknown is written as a function of the others, and the function is evaluated repeatedly. The scheme converges exactly when the iteration matrix $B = -D^{-1}(L + U)$ has spectral radius below 1, and diagonal dominance is a simple sufficient condition for that.',
        'The oscillation you see in the table ($x$ goes up, then down, then up) is normal for Jacobi: the errors alternate in sign and shrink by a factor given by the spectral radius. Because the system here is strongly dominant, the factor is small and eight iterations are already close to the answer.',
        'The exact solution is $(1, 2, 3)$ — you can confirm it by substitution. A good answer states the approximation from the iteration *and* the exact value when the numbers are close enough.',
      ],
    },
    {
      title: "Gauss-Seidel on the slide's system",
      question: "Obtain the solution of the following system using the Gauss-Seidel iteration method: $2x + y + z = 5$, $3x + 5y + 2z = 15$, $2x + y + 4z = 8$.",
      source: 'Iterative Solution slides — worked example',
      marks: 6,
      steps: [
        { t: 'Dominance check: $|a_{11}| = 2$ against $1 + 1 = 2$ and $|a_{22}| = 5$ against $3 + 2 = 5$ are equal, so the strict test is **not** satisfied for rows 1 and 2 — but the condition is sufficient, not necessary, and this system does converge.', m: '1 mark' },
        { t: 'Isolate: $x = [5 - y - z]/2$, $y = [15 - 3x - 2z]/5$, $z = [8 - 2x - y]/4$.', m: '1 mark' },
        { t: 'Start from $x = y = z = 0$. Iteration 1: $x^{(1)} = [5 - 0 - 0]/2 = 2.50$; $y^{(1)} = [15 - 3(2.5) - 0]/5 = 1.5$; $z^{(1)} = [8 - 2(2.5) - 1.5]/4 = 0.375$.', m: '2 marks' },
        { t: 'Iteration 2: $x^{(2)} = [5 - 1.5 - 0.375]/2 = 1.5625$; $y^{(2)} = [15 - 3(1.5625) - 2(0.375)]/5 = 1.9125$; $z^{(2)} = [8 - 2(1.5625) - 1.9125]/4 = 0.7406$.', m: '1 mark' },
        { t: 'Iteration 3: $x^{(3)} = 1.1734$, $y^{(3)} = 1.9997$, $z^{(3)} = 0.9134$; iteration 4: $x^{(4)} = 1.0435$, $y^{(4)} = 2.0086$, $z^{(4)} = 0.9761$ — converging to $(1, 2, 1)$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 1,\\; y = 2,\\; z = 1}$ (the exact solution; the iteration approaches it)',
      note: 'The slide rounds $z^{(1)}$ to 0.4; the exact value is 0.375, and the later iterations then differ slightly from the slide. Keep full precision in your table.',
      explanation: [
        'Look at iteration 1: $y^{(1)}$ was computed with the **new** $x^{(1)} = 2.5$, and $z^{(1)}$ with the new $x^{(1)}$ and the new $y^{(1)}$. In Jacobi all three would have used zeros. That single difference is the whole improvement.',
        'Because each new value is used immediately, the error information travels through the whole system in a single sweep, so Gauss-Seidel needs noticeably fewer iterations than Jacobi for the same tolerance.',
        'This system is a good illustration of "sufficient but not necessary": the strict dominance test fails on rows 1 and 2, yet the iteration still converges. The test tells you when you are *safe*, not when you will *fail*.',
      ],
    },
    {
      title: 'When the iteration diverges, and how to fix it',
      question: 'Solve by Jacobi iteration: $x + 6y + 2z = 19$, $2x + y + 6z = 22$, $6x + 2y + z = 13$. The first iterations are $19, 22, 13$ then $-139, -94, -145$ — the values are exploding. What is wrong and what do you do?',
      source: "Teacher's rule 5 (rearrange to make the system diagonally dominant)",
      marks: 6,
      steps: [
        { t: 'Dominance check on the system as written: row 1 $|a_{11}| = 1$ against $6 + 2 = 8$ fails; row 2 $|a_{22}| = 1$ against $2 + 6 = 8$ fails; row 3 $|a_{33}| = 1$ against $6 + 2 = 8$ fails. **Not diagonally dominant.**', m: '2 marks' },
        { t: 'Iteration 1: $x^{(1)} = 19$, $y^{(1)} = 22$, $z^{(1)} = 13$. Iteration 2: $x^{(2)} = 19 - 6(22) - 2(13) = -139$ — the numbers grow, so the iteration is diverging.', m: '1 mark' },
        { t: 'Rearrange: put each equation\'s largest coefficient on the diagonal by renaming the unknowns $u = y$, $v = z$, $w = x$. The system becomes $6u + 2v + w = 19$, $u + 6v + 2w = 22$, $2u + v + 6w = 13$.', m: '2 marks' },
        { t: 'Now every row is dominant ($6 > 3$ in each row), so the iteration converges: $u^{(1)} = 3.1667$, $v^{(1)} = 3.6667$, $w^{(1)} = 2.1667$; $u^{(2)} = 1.5833$, $v^{(2)} = 2.4167$, $w^{(2)} = 0.5$; … settling at $(u, v, w) = (2, 3, 1)$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 1,\\; y = 2,\\; z = 3}$ — the divergence was caused by the arrangement of the equations, not by the method',
      note: 'Trap: iterating anyway and reporting the exploding numbers. Check dominance first, and if the system is not dominant, look for a rearrangement before you start.',
      explanation: [
        'Diagonal dominance is about the *arrangement* of the equations, not about the solution. The same three equations can be written so that each row has a large diagonal entry, and then the iteration matrix has a spectral radius below 1 and the iterates converge.',
        'The fix is not always a reordering of the equations alone — sometimes the unknowns have to be renamed so that each equation\'s largest coefficient lands on the diagonal. Swapping two unknowns is just a relabelling: the solution is unchanged, you only change which variable is called what.',
        'This is the single most common cause of "my values diverged significantly during the iterations", and it is why the teacher insists on the dominance check before any iteration is started.',
      ],
    },
  ],
  flashcards: [
    { front: 'When is an iterative method preferred over a direct method?', back: 'When n is large (order 15+), A is sparse, or A is structured so that Ax is cheap to compute.' },
    { front: 'What is the main idea behind iterative methods?', back: 'Avoid computing A⁻¹ and perform only a cheap operation Ax each step.' },
    { front: 'What is diagonal dominance?', back: '$|a_{ii}| > \\sum_{j \\ne i}|a_{ij}|$ for every row of the matrix.' },
    { front: 'Is diagonal dominance necessary for convergence?', back: 'No — it is sufficient but not necessary. Some systems converge without it.' },
    { front: 'How does Jacobi differ from Gauss-Seidel?', back: "Jacobi uses only the old values $x_j^{(k)}$; Gauss-Seidel uses the new values $x_j^{(k+1)}$ for the variables before $x_i$." },
    { front: "What is Jacobi's iteration formula?", back: '$x_i^{(k+1)} = \\frac{1}{a_{ii}}(b_i - \\sum_{j \\ne i} a_{ij}x_j^{(k)})$' },
    { front: "What is Gauss-Seidel's iteration formula?", back: '$x_i^{(k+1)} = \\frac{1}{a_{ii}}(b_i - \\sum_{j<i} a_{ij}x_j^{(k+1)} - \\sum_{j>i} a_{ij}x_j^{(k)})$' },
    { front: 'Which method converges faster?', back: 'Gauss-Seidel — it uses the most recent value of a variable as soon as it is available.' },
    { front: 'What are the two choices of starting vector in the slides?', back: 'All $x_i = 1$, or the better choice $x_i = b_i/a_{ii}$.' },
    { front: 'What are the two stopping criteria?', back: 'The maximum number of iterations is reached, or the tolerance level is reached.' },
    { front: 'What is the first thing to do before starting an iteration?', back: 'Check whether the system is diagonally dominant, and rearrange the equations if it is not.' },
    { front: 'Why does diagonal dominance guarantee convergence?', back: 'The fixed-point condition $|G\'(x)| < 1$ reduces to $|a_{ii}| > |a_{ij}|$ row by row.' },
    { front: 'What happens if the pivot is small in Gauss elimination?', back: 'The multipliers become large and the round-off error grows — that is why partial pivoting exists.' },
    { front: 'Does Gauss-Seidel need a different convergence condition from Jacobi?', back: 'No — the condition is the same, only the rate of convergence is better.' },
  ],
  quiz: [
    {
      q: 'The condition for a system to be diagonally dominant is',
      options: [
        '$|a_{ii}| > \\sum_{j \\ne i}|a_{ij}|$ for every row',
        '$|a_{ii}| > |a_{jj}|$ for every pair',
        'the diagonal entries are all equal',
        '$a_{ii} > 0$ for every row',
      ],
      answer: 0,
      explain: 'In each row the diagonal entry must beat the sum of the absolute values of the other entries.',
    },
    {
      q: 'Is diagonal dominance a necessary condition for convergence?',
      options: [
        'No, it is sufficient but not necessary',
        'Yes, it is both',
        'It is necessary for Jacobi but not for Gauss-Seidel',
        'It is necessary only for sparse systems',
      ],
      answer: 0,
      explain: 'The slide states it directly: the condition is sufficient, but not necessary, for convergence.',
    },
    {
      q: "In Jacobi's method, $x_2^{(k+1)}$ is computed from",
      options: [
        'the old values $x_1^{(k)}, x_3^{(k)}, \\dots$',
        'the new value $x_1^{(k+1)}$ and the old $x_3^{(k)}$',
        'the original coefficients only',
        'the previous value of $x_2$ alone',
      ],
      answer: 0,
      explain: 'Jacobi always uses the previous iteration for every variable.',
    },
    {
      q: 'The main reason Gauss-Seidel converges faster than Jacobi is that it',
      options: [
        'uses the most recent value of each variable as soon as it is available',
        'needs no starting vector',
        'uses a bigger tolerance',
        'avoids round-off error entirely',
      ],
      answer: 0,
      explain: 'The new values are fed straight into the next row of the same sweep.',
    },
    {
      q: 'Which starting vector do the slides recommend?',
      options: ['All $x_i = 1$', '$x_i = b_i/a_{ii}$', 'All $x_i = 0$', '$x_i = i$'],
      answer: 1,
      explain: 'Both are listed, but $x_i = b_i/a_{ii}$ is called the better choice.',
    },
    {
      q: 'A Jacobi iteration is diverging. The first thing to check is',
      options: [
        'whether the system is diagonally dominant as written',
        'whether you used the correct name for the unknowns',
        'whether the iteration table is full',
        'whether you stopped at the tolerance',
      ],
      answer: 0,
      explain: "Rule 5: check diagonal dominance first; a rearrangement often fixes it.",
    },
    {
      q: 'The stopping criteria for an iterative method are',
      options: [
        'a maximum number of iterations, or reaching the tolerance level',
        'only reaching the tolerance level',
        'the diagonal entries becoming equal',
        'the iteration matrix becoming singular',
      ],
      answer: 0,
      explain: 'Both are listed on the algorithm slide.',
    },
    {
      q: 'Direct methods become impractical when',
      options: [
        'n is large, A is sparse, or A is structured',
        'n is small and A is dense',
        'the system has a unique solution',
        'the coefficients are integers',
      ],
      answer: 0,
      explain: 'Those three conditions are exactly what the slide lists as the reasons for using an iterative approach.',
    },
    {
      q: 'Which statement about diagonal dominance is false?',
      options: [
        'It guarantees convergence',
        'It is necessary for convergence',
        'It is checked row by row',
        'It can be obtained by rearranging the equations',
      ],
      answer: 1,
      explain: 'It is sufficient but NOT necessary — so the claim that it is necessary is the false one.',
    },
    {
      q: 'In the Gauss-Seidel formula, the terms with $j < i$ use',
      options: ['the new values $x_j^{(k+1)}$', 'the old values $x_j^{(k)}$', 'the exact solution', 'nothing'],
      answer: 0,
      explain: 'That is precisely what makes Gauss-Seidel faster than Jacobi.',
    },
  ],
  solvers: ['jacobi', 'seidel', 'dominance'],
};
