// LU decomposition — Do-Little and Crout.
// Source: LU Decomposition slides (Tasnuva Binte Rahman), Medha's class notes (p.24), past papers.
export const checks = {
  "Start here: the problem this chapter solves": {
    q: "When is LU decomposition clearly worth it over plain elimination?",
    options: ["When the system has no solution", "When the same matrix must be solved for many right-hand sides", "When the matrix is 2×2", "When only integer answers are allowed"],
    answer: 1,
    explain: "Factor once into $L$ and $U$; every new right-hand side then costs two cheap triangular sweeps instead of full elimination.",
  },
  "Start here: the core idea": {
    q: "Where do the entries of $L$ come from?",
    options: ["They are the multipliers used during elimination", "They are copied from $A$'s diagonal", "They are the right-hand side values", "They are computed by back substitution"],
    answer: 0,
    explain: "Each elimination multiplier is recorded in $L$ at the position of the zero it created — with 1s on the diagonal.",
  },
  "Start here: reading the symbols": {
    q: "In $A\\mathbf{x} = \\mathbf{b}$ with $A = LU$, what is $\\mathbf{y}$?",
    options: ["The final answer", "The intermediate solution of $L\\mathbf{y} = \\mathbf{b}$", "The transpose of $\\mathbf{b}$", "Another name for the pivot"],
    answer: 1,
    explain: "Split the solve: $L\\mathbf{y} = \\mathbf{b}$ forwards, then $U\\mathbf{x} = \\mathbf{y}$ backwards.",
  },
  "Start here: your first walk-through": {
    q: "In the walk-through, which multiplier entered $L$, and where?",
    options: ["3, at position (2,1)", "3, at position (1,2)", "2, at position (2,2)", "-1, at position (2,1)"],
    answer: 0,
    explain: "$R_2' = R_2 - 3R_1$ used multiplier 3 to kill $a_{21}$, so 3 sits in $L$'s (2,1) slot.",
  },
  'Why decompose at all': {
    q: 'The main reason for using LU decomposition is that',
    options: [
      'the coefficient matrix A stays fixed while the right-hand side b changes, so the expensive factorisation is done once',
      'LU decomposition avoids round-off error',
      'LU decomposition works when A is singular',
      'it needs fewer arithmetic operations than Gauss elimination for one system',
    ],
    answer: 0,
    explain: 'For a single system LU costs about the same as elimination. It pays off when the same A is used with many different b vectors.',
  },
  "Do-Little's method": {
    q: "In Do-Little's method, which matrix has ones on its diagonal?",
    options: ['L', 'U', 'Both', 'Neither'],
    answer: 0,
    explain: "Do-Little puts the unit diagonal in L; Crout puts it in U. The course uses Do-Little.",
  },
  "Crout's method": {
    q: "Crout's method differs from Do-Little's in that",
    options: [
      'U has ones on the diagonal instead of L',
      'the matrix is factorised differently',
      'the forward substitution is replaced by backward substitution',
      'it does not need A to be non-singular',
    ],
    answer: 0,
    explain: 'The whole process is the same; only which triangular matrix carries the unit diagonal changes.',
  },
  'Solving with the factors': {
    q: 'After LU factorisation, the system is solved in which order?',
    options: [
      'forward substitution for an intermediate vector d, then backward substitution for x',
      'backward substitution first, then forward substitution',
      'one big back substitution',
      'by inverting L and then U',
    ],
    answer: 0,
    explain: 'From $Ax = b$ and $A = LU$ we get $LUx = b$. Set $Ux = d$, solve $Ld = b$ by forward substitution, then solve $Ux = d$ by backward substitution.',
  },
  'A worked factorisation': {
    q: 'For $A = \\begin{bmatrix} 1 & 2 & 4 \\\\ 3 & 8 & 14 \\\\ 2 & 6 & 13 \\end{bmatrix}$, what is $u_{22}$?',
    options: ['2', '8', '14', '6'],
    answer: 0,
    explain: '$u_{22} = a_{22} - l_{21}u_{12} = 8 - (3)(2) = 2$.',
  },
};

export default {
  id: 'lu',
  chapter: 5,
  title: 'LU Decomposition',
  wave: 'lu',
  sources: ['LU Decomposition slides (Tasnuva)', "Medha's class notes (p.24)", 'Past papers'],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "An engineer designs a bridge and computes the forces by solving $A\\mathbf{x} = \\mathbf{b}$. Then the load changes — same bridge, same stiffness matrix $A$, new right-hand side $\\mathbf{b}$. And again, for a hundred different loads." },
        { type: "p", text: "Plain elimination redoes **all** the work for every new $\\mathbf{b}$, even though $A$ never changed. That waste is the problem LU decomposition exists to kill." },
        { type: "p", text: "The fix: do elimination on $A$ **once**, store the result as two triangular matrices $L$ and $U$, and afterwards solve each new load with two quick triangular sweeps instead of a full re-elimination." },
        { type: "list", items: [
          "Factor a matrix into $A = LU$ by elimination.",
          "Read off $L$ (the multipliers) and $U$ (the resulting triangle).",
          "Solve $L\\mathbf{y} = \\mathbf{b}$ forwards, then $U\\mathbf{x} = \\mathbf{y}$ backwards.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Every elimination step is 'subtract a multiple of a row from a later row'. The multiplier used at each step is cheap to record — and those recorded multipliers, laid out in a lower triangle, **are** the $L$ factor. The upper triangle the elimination produces **is** $U$. Nothing new is computed; the work is just being saved instead of thrown away." },
        { type: "math", tex: "A = LU, \\qquad A\\mathbf{x} = \\mathbf{b} \\;\\Longleftrightarrow\\; L\\,\\mathbf{y} = \\mathbf{b} \\;\\;\\text{then}\\;\\; U\\,\\mathbf{x} = \\mathbf{y}" },
        { type: "p", text: "Why that helps: triangular systems are the easy ones. $L\\mathbf{y} = \\mathbf{b}$ is solved top-down (each row hands you the next unknown), $U\\mathbf{x} = \\mathbf{y}$ bottom-up — no elimination left to do. Same $A$, new $\\mathbf{b}$: two sweeps, done." },
        { type: "note", text: "Decomposing stores elimination's by-products; solving reuses them. If you re-eliminate for each right-hand side, you are paying full price a hundred times for work already done once." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$L$", "lower triangular factor — the stored multipliers, 1s on its diagonal", "'L' for lower"],
          ["$U$", "upper triangular factor — elimination's staircase result", "'U' for upper"],
          ["$\\mathbf{y}$", "intermediate unknown: $A\\mathbf{x} = L U \\mathbf{x} = L\\mathbf{y} = \\mathbf{b}$", "the halfway answer"],
          ["forward substitution", "solving $L\\mathbf{y} = \\mathbf{b}$ top-down", "walk down the stairs"],
          ["back substitution", "solving $U\\mathbf{x} = \\mathbf{y}$ bottom-up", "walk back up"],
        ] },
        { type: "p", text: "The multipliers in $L$ sit where the zeros were created: eliminating $a_{21}$ with multiplier $m$ puts $m$ into $L$'s $(2,1)$ slot." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From **Fall 2024 A2(d)** (the past-paper system the module solves in full): factor $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 4 & 3 & 2 \\\\ 6 & 5 & 7 \\end{bmatrix}$ by Do-Little and solve $A\\mathbf{x} = [\\,9,\\ 20,\\ 35\\,]^T$." },
        { type: "p", text: "Eliminate once, recording the multipliers: $m_{21} = 2$, $m_{31} = 3$, $m_{32} = 2$. The resulting rows: $R_2' = R_2 - 2R_1 = [\\,0 \\;\\; 1 \\;\\; 0\\,]$, $R_3' = R_3 - 3R_1 = [\\,0 \\;\\; 2 \\;\\; 4\\,]$, $R_3'' = R_3' - 2R_2' = [\\,0 \\;\\; 0 \\;\\; 4\\,]$. $L$ collects the multipliers, $U$ is the staircase." },
        { type: "p", text: "Forward substitution $L\\mathbf{y} = \\mathbf{b}$: $\\mathbf{y} = [\\,9,\\ 2,\\ 4\\,]$. Back substitution $U\\mathbf{x} = \\mathbf{y}$: $z = 1$, then $y = 2$, then $x = 3$ — and the check $A[\\,3, 2, 1\\,]^T = [\\,9, 20, 35\\,]^T$ ✓. **Asked in:** factorisation into L and U is Fall 2023 Q2(f); solving by Do-Little is Fall 2024 A2(d)." },
        { type: "exam", text: "Three labelled blocks: the elimination producing $U$ (resulting rows shown), the $L$ read off from the multipliers, then the two substitutions — each block carries its own marks." },
      ],
    },
    {
      heading: 'Why decompose at all',
      blocks: [
        {
          type: 'p',
          text: 'A system of linear equations can be written $Ax = b$. $A$ can be factorised into two triangular matrices $L$ and $U$ such that $A = LU$.',
        },
        {
          type: 'math',
          tex: 'A = \\underbrace{\\begin{bmatrix} l_{11} & 0 & 0 \\\\ l_{21} & l_{22} & 0 \\\\ l_{31} & l_{32} & l_{33} \\end{bmatrix}}_{L\\ \\text{(lower triangular)}} \\underbrace{\\begin{bmatrix} u_{11} & u_{12} & u_{13} \\\\ 0 & u_{22} & u_{23} \\\\ 0 & 0 & u_{33} \\end{bmatrix}}_{U\\ \\text{(upper triangular)}}',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '$L$ is lower triangular — the entries above the diagonal are zero.',
            '$U$ is upper triangular — the entries below the diagonal are zero.',
            'For a non-singular square matrix, $\\det A \\ne 0$, and such a factorisation exists.',
          ],
        },
        {
          type: 'p',
          text: '**The reason to do it:** when the solution vector $\\{b\\}$ changes but the coefficient matrix $[A]$ stays fixed, it is costly to repeat the elimination every time. With the LU form, $A$ is decomposed **once** and then each new $b$ only needs a forward and a backward substitution, while $L$ and $U$ remain fixed. It is also very useful for calculating the inverse matrix.',
        },
        {
          type: 'exam',
          text: 'A "why LU" answer wants three points: $A = LU$; the cost is paid once and only the substitutions are repeated; and the triangular structure makes each substitution cheap.',
        },
      ],
    },
    {
      heading: "Do-Little's method",
      blocks: [
        {
          type: 'p',
          text: 'A unique LU decomposition needs a convention: one of the two triangular matrices is given a unit diagonal. In **Do-Little\'s** method it is $L$ that has ones on the diagonal; in **Crout\'s** method it is $U$. The course uses Do-Little.',
        },
        {
          type: 'math',
          tex: '\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ l_{21} & 1 & 0 \\\\ l_{31} & l_{32} & 1 \\end{bmatrix} \\begin{bmatrix} u_{11} & u_{12} & u_{13} \\\\ 0 & u_{22} & u_{23} \\\\ 0 & 0 & u_{33} \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'Multiplying $L$ and $U$ out and equating the coefficients of $A$ with those of $LU$ gives the formulas:',
        },
        {
          type: 'math',
          tex: 'u_{11} = a_{11}, \\quad u_{12} = a_{12}, \\quad u_{13} = a_{13} \\\\ l_{21} = \\frac{a_{21}}{u_{11}}, \\quad l_{31} = \\frac{a_{31}}{u_{11}} \\\\ u_{22} = a_{22} - l_{21}u_{12}, \\quad u_{23} = a_{23} - l_{21}u_{13} \\\\ l_{32} = \\frac{a_{32} - l_{31}u_{12}}{u_{22}} \\\\ u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23}',
        },
        {
          type: 'note',
          text: 'The slide\'s own hint: *[just check which one is your unknown, keep it on the left and put the rest on the RHS]*. Each formula is solved for one unknown, so read the slide\'s list as a recipe: the first row of $U$ comes straight from the first row of $A$, then the first column of $L$ comes from dividing by $u_{11}$, then the rest of $U$, then the rest of $L$.',
        },
        {
          type: 'exam',
          text: 'Write $L$ and $U$ with their diagonals marked, then one formula per line with the numbers substituted: $u_{22} = 8 - (3)(2) = 2$. Finish by writing $L$ and $U$ out in full and checking that $LU = A$.',
        },
      ],
    },
    {
      heading: "Crout's method",
      blocks: [
        {
          type: 'p',
          text: "Crout's method is the same process with the unit diagonal on $U$ instead:",
        },
        {
          type: 'math',
          tex: 'A = \\begin{bmatrix} l_{11} & 0 & 0 \\\\ l_{21} & l_{22} & 0 \\\\ l_{31} & l_{32} & l_{33} \\end{bmatrix} \\begin{bmatrix} 1 & u_{12} & u_{13} \\\\ 0 & 1 & u_{23} \\\\ 0 & 0 & 1 \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'The slide puts it plainly: *the whole process is the same except that $U$ has 1s on the diagonal*.',
        },
        {
          type: 'note',
          text: 'If a question does not say which convention to use, say so in your answer: "using the Do-Little convention (unit diagonal in $L$)". That one line removes any doubt about your factors.',
        },
      ],
    },
    {
      heading: 'Solving with the factors',
      blocks: [
        {
          type: 'p',
          text: 'Starting from $[A]\\{x\\} = \\{b\\}$ and $A = LU$:',
        },
        {
          type: 'math',
          tex: '[L][U]\\{x\\} = \\{b\\} \\quad\\Rightarrow\\quad [L]\\{d\\} = \\{b\\} \\;\\text{ with } [U]\\{x\\} = \\{d\\}',
        },
        {
          type: 'p',
          text: 'So the system is solved in two stages: **forward substitution** on the lower triangular system $[L]\\{d\\} = \\{b\\}$ to get the intermediate vector $d$, then **backward substitution** on the upper triangular system $[U]\\{x\\} = \\{d\\}$ to get $x$.',
        },
        {
          type: 'math',
          tex: 'd_1 = \\frac{b_1}{l_{11}}, \\quad d_2 = \\frac{b_2 - l_{21}d_1}{l_{22}}, \\quad d_3 = \\frac{b_3 - l_{31}d_1 - l_{32}d_2}{l_{33}}',
        },
        {
          type: 'math',
          tex: 'x_3 = \\frac{d_3}{u_{33}}, \\quad x_2 = \\frac{d_2 - u_{23}x_3}{u_{22}}, \\quad x_1 = \\frac{d_1 - u_{12}x_2 - u_{13}x_3}{u_{11}}',
        },
        {
          type: 'note',
          text: 'Note that the forward substitution uses the **lower** matrix and the backward substitution the **upper** one — the opposite of the naming you might guess. Write the two systems down before you substitute.',
        },
        {
          type: 'exam',
          text: 'Three stages, three blocks of working: (1) factorise $A = LU$; (2) forward substitution for $d$; (3) backward substitution for $x$. Then the boxed answer.',
        },
      ],
    },
    {
      heading: 'A worked factorisation',
      blocks: [
        {
          type: 'p',
          text: 'The slide\'s own example, worked through with the formulas above:',
        },
        {
          type: 'math',
          tex: 'A = \\begin{bmatrix} 1 & 2 & 4 \\\\ 3 & 8 & 14 \\\\ 2 & 6 & 13 \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'First row of $U$ comes straight from the first row of $A$: $u_{11} = 1$, $u_{12} = 2$, $u_{13} = 4$. Then the first column of $L$: $l_{21} = 3/1 = 3$, $l_{31} = 2/1 = 2$.',
        },
        {
          type: 'math',
          tex: 'u_{22} = 8 - (3)(2) = 2, \\quad u_{23} = 14 - (3)(4) = 2, \\quad l_{32} = \\frac{6 - (2)(2)}{2} = 1, \\quad u_{33} = 13 - (2)(4) - (1)(2) = 3',
        },
        {
          type: 'p',
          text: 'So $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 2 & 1 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 1 & 2 & 4 \\\\ 0 & 2 & 2 \\\\ 0 & 0 & 3 \\end{bmatrix}$, and the check $LU = A$ closes the answer.',
        },
        {
          type: 'exam',
          text: 'Always end the factorisation with the check $LU = A$ — it takes one line and it proves your factors are right before you start substituting.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Do-Little: first row of U', tex: 'u_{11} = a_{11},\\quad u_{12} = a_{12},\\quad u_{13} = a_{13}', where: 'straight from A' },
    { label: 'Do-Little: first column of L', tex: 'l_{21} = \\frac{a_{21}}{u_{11}},\\quad l_{31} = \\frac{a_{31}}{u_{11}}', where: 'divide by the pivot' },
    { label: 'Do-Little: rest of U', tex: 'u_{22} = a_{22} - l_{21}u_{12},\\quad u_{23} = a_{23} - l_{21}u_{13}', where: 'row 2 of A minus the known products' },
    { label: 'Do-Little: rest of L', tex: 'l_{32} = \\frac{a_{32} - l_{31}u_{12}}{u_{22}}', where: 'divide by the new pivot' },
    { label: 'Do-Little: last pivot', tex: 'u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23}', where: 'and the matrix is done' },
    { label: 'Forward substitution', tex: 'd_i = \\frac{b_i - \\sum_{k<i} l_{ik}d_k}{l_{ii}}', where: 'solves $Ld = b$' },
    { label: 'Backward substitution', tex: 'x_i = \\frac{d_i - \\sum_{k>i} u_{ik}x_k}{u_{ii}}', where: 'solves $Ux = d$' },
  ],
  examples: [
    {
      title: 'Do-Little factorisation of the slide\'s matrix',
      type: 'Numerical — Doolittle LU',
      question: 'Find the LU factorisation of $A = \\begin{bmatrix} 1 & 2 & 4 \\\\ 3 & 8 & 14 \\\\ 2 & 6 & 13 \\end{bmatrix}$ using the Do-Little method.',
      source: 'LU Decomposition slides',
      marks: 6,
      steps: [
        { t: 'Write the shape of the factors: $A = LU$ with $L$ lower triangular with ones on the diagonal and $U$ upper triangular.', m: '1 mark' },
        { t: '$u_{11} = a_{11} = 1$, $u_{12} = a_{12} = 2$, $u_{13} = a_{13} = 4$.', m: '1 mark' },
        { t: '$l_{21} = \\dfrac{a_{21}}{u_{11}} = \\dfrac{3}{1} = 3$, $l_{31} = \\dfrac{a_{31}}{u_{11}} = \\dfrac{2}{1} = 2$.', m: '1 mark' },
        { t: '$u_{22} = a_{22} - l_{21}u_{12} = 8 - (3)(2) = 2$, $u_{23} = a_{23} - l_{21}u_{13} = 14 - (3)(4) = 2$.', m: '1 mark' },
        { t: '$l_{32} = \\dfrac{a_{32} - l_{31}u_{12}}{u_{22}} = \\dfrac{6 - (2)(2)}{2} = 1$.', m: '1 mark' },
        { t: '$u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23} = 13 - (2)(4) - (1)(2) = 3$. Check: $LU = \\begin{bmatrix} 1 & 2 & 4 \\\\ 3 & 8 & 14 \\\\ 2 & 6 & 13 \\end{bmatrix} = A$.', m: '1 mark' },
      ],
      answer: '$\\boxed{L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 2 & 1 & 1 \\end{bmatrix},\\quad U = \\begin{bmatrix} 1 & 2 & 4 \\\\ 0 & 2 & 2 \\\\ 0 & 0 & 3 \\end{bmatrix}}$',
      note: 'Trap: forgetting the unit diagonal on $L$ in Do-Little, or accidentally putting the unit diagonal on $U$ — that is Crout\'s method and the examiner will see it as a different answer.',
      explanation: [
        'The factorisation is just elimination with the multipliers kept instead of thrown away. In Gauss elimination the number $a_{21}/a_{11}$ is the multiplier you subtract from row 2; in LU it is stored as $l_{21}$, and the row that results is stored in $U$.',
        'Because $L$ is lower triangular, the forward substitution for $d$ can be done row by row from the top: each $d_i$ needs only the $d_k$ already found. Because $U$ is upper triangular, the backward substitution runs from the bottom up. That is why LU is no more expensive than elimination for one system — the value is in repeating it.',
        'The check $LU = A$ is worth one line: it catches almost every possible error in the factorisation, and it is the fastest way to convince the examiner that your factors are right.',
      ],
    },
    {
      title: 'Solving a system with Do-Little LU',
      type: 'Numerical — Doolittle LU',
      question: 'Solve the following system of linear equation using Do-Little LU Decomposition Method (show all necessary steps of the computation): $2x + y + z = 9$, $4x + 3y + 2z = 20$, $6x + 5y + 7z = 35$.',
      source: 'Fall 2024 A2(d)',
      marks: 6,
      steps: [
        { t: 'Factorise $A$: $u_{11} = 2$, $u_{12} = 1$, $u_{13} = 1$; $l_{21} = 4/2 = 2$, $l_{31} = 6/2 = 3$; $u_{22} = 3 - (2)(1) = 1$, $u_{23} = 2 - (2)(1) = 0$; $l_{32} = \\dfrac{5 - (3)(1)}{1} = 2$; $u_{33} = 7 - (3)(1) - (2)(0) = 4$.', m: '2 marks' },
        { t: 'So $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 3 & 2 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 4 \\end{bmatrix}$.', m: '1 mark' },
        { t: 'Forward substitution $[L]\\{d\\} = \\{b\\}$: $d_1 = 9$, $d_2 = \\dfrac{20 - (2)(9)}{1} = 2$, $d_3 = \\dfrac{35 - (3)(9) - (2)(2)}{1} = 4$.', m: '1 mark' },
        { t: 'Backward substitution $[U]\\{x\\} = \\{d\\}$: $x_3 = \\dfrac{4}{4} = 1$, $x_2 = \\dfrac{2 - 0(1)}{1} = 2$, $x_1 = \\dfrac{9 - 2 - 1}{2} = 3$.', m: '1 mark' },
        { t: 'Check in the original equations: $2(3) + 2 + 1 = 9$ ✓, $4(3) + 3(2) + 2(1) = 20$ ✓, $6(3) + 5(2) + 7(1) = 35$ ✓.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 3,\\; y = 2,\\; z = 1}$',
      note: 'Trap: solving $LUx = b$ in one step instead of introducing the intermediate vector $d$. Without $d$ the two substitutions cannot be separated.',
      explanation: [
        'The factorisation turns one hard problem into two easy ones. $LUx = b$ is a single system with a full matrix; introducing $d$ with $Ux = d$ splits it into two triangular systems, and triangular systems are solved by simple substitution.',
        'Note that in the forward substitution the diagonal of $L$ is 1 (Do-Little), so the division is trivial — a small convenience of the convention.',
        'Because $A$ is fixed and only $b$ changes from problem to problem, the factors $L$ and $U$ are computed once and reused. That is the entire economic argument for LU decomposition, and it is the answer to "why do we need LU decomposition".',
      ],
    },
  ],
  flashcards: [
    { front: 'What is LU decomposition?', back: 'Writing $A = LU$ with $L$ lower triangular and $U$ upper triangular.' },
    { front: 'Why do we need LU decomposition?', back: 'When $A$ is fixed and only $b$ changes: factorise once, then only substitute for each new $b$.' },
    { front: "Which convention does Do-Little's method use?", back: 'The unit diagonal is on $L$. Crout puts it on $U$.' },
    { front: 'What is the first step of the Do-Little factorisation?', back: '$u_{11} = a_{11}$, $u_{12} = a_{12}$, $u_{13} = a_{13}$ — the first row of $U$ is the first row of $A$.' },
    { front: 'How is $l_{21}$ found?', back: '$l_{21} = a_{21}/u_{11}$ — the entry divided by the pivot.' },
    { front: 'How is $u_{22}$ found?', back: '$u_{22} = a_{22} - l_{21}u_{12}$.' },
    { front: 'How is $l_{32}$ found?', back: '$l_{32} = (a_{32} - l_{31}u_{12})/u_{22}$.' },
    { front: 'How is $u_{33}$ found?', back: '$u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23}$.' },
    { front: 'What is the intermediate vector $d$?', back: 'The solution of $Ld = b$; then $Ux = d$ gives $x$.' },
    { front: 'Which substitution comes first?', back: 'Forward substitution on the lower triangular system $Ld = b$.' },
    { front: 'Does a non-singular $A$ always have an LU factorisation?', back: 'Yes — for a non-singular square matrix $\\det A \\ne 0$ and the factorisation exists.' },
    { front: 'What quick check confirms the factorisation?', back: 'Multiply $L$ and $U$ and confirm you get $A$ back.' },
    { front: 'Is LU decomposition also useful for anything else?', back: 'Yes — for calculating the inverse matrix.' },
    { front: 'What is the difference between the multiplier in Gauss elimination and $l_{ij}$ in LU?', back: 'None — $l_{ij}$ is exactly the multiplier, kept instead of discarded.' },
  ],
  quiz: [
    {
      q: 'In Do-Little\'s method, the matrix with ones on the diagonal is',
      options: ['L', 'U', 'both', 'neither'],
      answer: 0,
      explain: 'Do-Little puts the unit diagonal on L; Crout puts it on U.',
    },
    {
      q: 'The formula for $u_{23}$ in Do-Little is',
      options: [
        '$a_{23} - l_{21}u_{13}$',
        '$a_{23} - l_{21}u_{12}$',
        '$a_{23}/u_{11}$',
        '$a_{23} - l_{31}u_{13}$',
      ],
      answer: 0,
      explain: 'Subtract the known product $l_{21}u_{13}$ from $a_{23}$.',
    },
    {
      q: 'After the factorisation, the system $LUx = b$ is solved by',
      options: [
        'forward substitution for $d$ in $Ld = b$, then backward substitution in $Ux = d$',
        'backward substitution first',
        'one substitution using the product $LU$',
        'inverting $L$ and $U$',
      ],
      answer: 0,
      explain: 'The intermediate vector $d$ splits the system into two triangular ones.',
    },
    {
      q: 'The main practical advantage of LU decomposition is that',
      options: [
        'for a fixed $A$ and changing $b$, the factorisation is done only once',
        'it never suffers from round-off error',
        'it works for singular matrices',
        'it needs fewer operations than elimination for one system',
      ],
      answer: 0,
      explain: 'For a single system LU costs about the same as elimination; the win comes from repeating it.',
    },
    {
      q: 'In Do-Little, $l_{32}$ is found as',
      options: [
        '$\\dfrac{a_{32} - l_{31}u_{12}}{u_{22}}$',
        '$\\dfrac{a_{32}}{u_{11}}$',
        '$a_{32} - l_{21}u_{12}$',
        '$\\dfrac{a_{32} - l_{31}u_{13}}{u_{33}}$',
      ],
      answer: 0,
      explain: 'Subtract the known product, then divide by the second pivot.',
    },
    {
      q: 'What does the check $LU = A$ prove?',
      options: [
        'that the factorisation is correct',
        'that the system has a unique solution',
        'that $A$ is diagonally dominant',
        'that the system is ill-conditioned',
      ],
      answer: 0,
      explain: 'It is a one-line verification that the factors reproduce $A$.',
    },
    {
      q: 'For a non-singular square matrix $A$,',
      options: [
        '$\\det A \\ne 0$ and an LU factorisation exists',
        '$\\det A = 0$',
        '$A$ must be symmetric',
        '$L$ and $U$ are the same matrix',
      ],
      answer: 0,
      explain: 'Non-singularity is the condition the slide gives for the factorisation to exist.',
    },
    {
      q: 'Which matrix is used in the forward substitution?',
      options: ['L', 'U', 'LU', 'A⁻¹'],
      answer: 0,
      explain: '$Ld = b$ uses the lower triangular matrix $L$; $Ux = d$ then uses $U$.',
    },
    {
      q: 'Crout\'s method differs from Do-Little\'s only in that',
      options: ['U carries the unit diagonal', 'L must be symmetric', 'A must be symmetric', 'the forward substitution is dropped'],
      answer: 0,
      explain: 'The slide says the whole process is the same except for which matrix has the ones on the diagonal.',
    },
    {
      q: 'LU decomposition is also useful for',
      options: ['calculating the inverse matrix', 'proving a matrix is singular', 'checking diagonal dominance', 'finding the eigenvalues'],
      answer: 0,
      explain: 'The slide lists the inverse matrix as the other main use.',
    },
  ],
  solvers: ['lu', 'luSolve'],
};
