// Elimination methods — Gauss elimination, partial pivoting, Gauss-Jordan.
// Source: Elimination Methods slides (Raqeebir Rab), Balagurusamy Ch 7-8, the teacher's board notes, past papers.
export const checks = {
  "Start here: the problem this chapter solves": {
    q: "Why replace substitution with elimination for larger systems?",
    options: ["Elimination is mathematically more exact", "Substitution rewrites every later equation and becomes a bookkeeping disaster", "Substitution only works for one equation", "Elimination avoids arithmetic entirely"],
    answer: 1,
    explain: "Row operations act on a fixed grid in a fixed order, so the process scales to any size without the copying errors substitution invites.",
  },
  "Start here: the core idea": {
    q: "Which is NOT a legal row operation?",
    options: ["Swap two rows", "Multiply a row by a nonzero constant", "Subtract a multiple of one row from another", "Multiply a row by zero"],
    answer: 3,
    explain: "Multiplying by zero destroys the equation — its solutions change. The other three preserve the solution set exactly.",
  },
  "Start here: reading the symbols": {
    q: "In $a_{23}$, which entry of the matrix is meant?",
    options: ["Row 3, column 2", "Row 2, column 3", "The 23rd entry", "The diagonal entry"],
    answer: 1,
    explain: "First index = row, second = column: $a_{23}$ sits in row 2, column 3.",
  },
  "Start here: your first walk-through": {
    q: "After $R_2' = R_2 - R_1$ on the walk-through system, row 2 becomes…",
    options: ["$[\\,1 \\;\\; -1 \\,|\\, 1\\,]$", "$[\\,0 \\;\\; -2 \\,|\\, -2\\,]$", "$[\\,0 \\;\\; 2 \\,|\\, 2\\,]$", "$[\\,2 \\;\\; 0 \\,|\\, 4\\,]$"],
    answer: 1,
    explain: "Subtract entrywise: $1-1=0$, $-1-1=-2$, $1-3=-2$ — and writing that resulting row out is the habit the exam rewards.",
  },
  'The system as an augmented matrix': {
    q: 'In Gauss elimination, what is the "pivot row"?',
    options: [
      'The row whose leading coefficient (the pivot) is used to cancel that column in every row below it',
      'The last row of the matrix',
      'The row with the largest entry in the whole matrix',
      'The row that holds the constants',
    ],
    answer: 0,
    explain: 'The pivot row supplies the pivot element; every elimination row has a multiple of it subtracted so that one column becomes zero.',
  },
  'Naive Gauss elimination': {
    q: 'Naive Gauss elimination fails when the pivot element is zero. What is the fix the course allows?',
    options: [
      'Swap in a row from below (partial pivoting) as soon as the division by zero appears',
      'Change the question',
      'Start the iteration again from the beginning',
      'Use Gauss-Jordan instead',
    ],
    answer: 0,
    explain: 'Rule 4 of the teacher: if you hit a zero pivot, apply partial pivoting right away — it is less complex than full pivoting.',
  },
  'Partial pivoting': {
    q: 'When you apply partial pivoting, how often must you check for a row exchange?',
    options: [
      'Every time you pick a new pivot row, not only the first',
      'Only on the first pivot',
      'Only if the matrix is singular',
      'Once, before starting the elimination',
    ],
    answer: 0,
    explain: 'Rule 1: the pivot check happens at EVERY pivot row. A zero pivot can appear in the second or third column just as easily as in the first.',
  },
  'Gauss-Jordan elimination': {
    q: 'After Gauss-Jordan on a square system, what does the matrix look like?',
    options: [
      'The identity matrix, with the unknowns in the last column — no back substitution',
      'An upper triangular matrix, so back substitution is still needed',
      'The original matrix with zeros in the first column',
      'The reduced row echelon form with one free variable',
    ],
    answer: 0,
    explain: 'Rule 2: Gauss-Jordan goes all the way to reduced row echelon form. For a square matrix that is the identity, so you read the answer straight off and never back-substitute.',
  },
  'Matrix inversion by the adjoint method': {
    q: 'In the matrix inversion method, the adjoint of $A$ is',
    options: [
      'the cofactor matrix transposed',
      'the cofactor matrix as it stands',
      'the inverse of the cofactor matrix',
      'the transpose of $A$ divided by $|A|$',
    ],
    answer: 0,
    explain: '$\\operatorname{adj} A = C^T$ — the cofactor matrix transposed — and then $A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A$. Forgetting the transpose is the classic slip.',
  },
  'The four scenarios for the existence of a solution': {
    q: 'A system has $\\det A = 0$ and its two equations are consistent with each other. Then',
    options: [
      'there is no solution',
      'there are infinitely many solutions',
      'there is exactly one solution',
      'the system is ill-conditioned',
    ],
    answer: 1,
    explain: '$\\det A = 0$ with consistent equations means one equation is a multiple of the other — the lines coincide, so every point on the line is a solution. Ill-conditioned means $\\det A \\approx 0$, not exactly zero.',
  },
  'Choosing the method and writing the answer': {
    q: 'The question says only "solve by Gauss elimination" and no pivot is zero. What should you do?',
    options: [
      'Do the elimination without pivoting',
      'Always apply partial pivoting',
      'Switch to Gauss-Jordan',
      'Use the iterative method instead',
    ],
    answer: 0,
    explain: 'Rule 3: pivoting that was not asked for wastes time and can look wrong to the examiner. Apply it only when you actually need it.',
  },
};

export default {
  id: 'elimination',
  chapter: 3,
  title: 'Elimination Methods',
  wave: 'elim',
  sources: ['Elimination Methods slides (Raqeebir Rab)', 'Balagurusamy Ch 7-8', 'Past papers'],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "Three friends share a bill. One pays for two teas and one cake, another for one tea and two cakes, and their totals differ. How much is a tea, how much a cake? That is a **system of linear equations**: several straight-line conditions that must all hold at once." },
        { type: "p", text: "School substitution solves two unknowns fine. But a 4-unknown system (or a 40-unknown circuit) makes substitution a bookkeeping disaster: every substitution rewrites every later equation, and one slip corrupts everything below it." },
        { type: "p", text: "Gaussian elimination is the systematic replacement: a fixed sequence of row operations that converts any system into a triangle, from which the answers fall out one at a time. It is the workhorse this whole half of the course leans on." },
        { type: "list", items: [
          "Write any system as an augmented matrix.",
          "Eliminate below the pivots to reach triangular form.",
          "Back-substitute to read off the solution.",
          "Handle the two dangers: a zero pivot and round-off (partial pivoting).",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "You may do three things to an equation without changing its solutions: **swap it with another, multiply it by a nonzero constant, subtract a multiple of another equation from it.** Elimination is just these moves, aimed at one target: make zeros spread below the diagonal." },
        { type: "p", text: "Kill the first variable everywhere below row 1, then the second variable everywhere below row 2, and so on. What remains is an **upper triangle** — the last equation already contains only the last unknown, so it hands you its value immediately, and each row above hands you the next one on the way back up (**back-substitution**)." },
        { type: "note", text: "The teacher's non-negotiable habits live here: **check the pivot at every pivot row** (is it zero? then swap — otherwise do not touch the order), and **always write the resulting row after every row operation**, never just the operation." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "p", text: "Elimination is written entirely in matrix shorthand. The dictionary:" },
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$a_{ij}$", "the coefficient in row $i$, column $j$", "'a i j' — row first, column second"],
          ["$[\\,A \\mid b\\,]$", "the augmented matrix: coefficients with the right-hand side bolted on", "the system, as a grid"],
          ["$R_2' = R_2 - 2R_1$", "replace row 2 by row 2 minus twice row 1", "a row operation"],
          ["pivot", "the entry currently used to create zeros beneath it", "the working number"],
          ["upper triangular", "all zeros below the main diagonal", "the staircase shape"],
        ] },
        { type: "p", text: "If the pivot is zero the elimination stalls — the fix is swapping in a row with a nonzero entry (partial pivoting, covered later in the chapter)." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From the **class board notes (Elimination Methods)**: solve $x + y + z = 6$, $2x + 3y + z = 13$, $3x + 2y + 5z = 18$ — the teacher's Example 1, chosen because no pivot ever turns zero." },
        { type: "p", text: "**Pivot check:** $a_{11} = 1 \\ne 0$, so no swap. $R_2' = R_2 - 2R_1$ gives the resulting row $[\\,0 \\;\\; 1 \\;\\; -1 \\,|\\, 1\\,]$; $R_3' = R_3 - 3R_1$ gives $[\\,0 \\;\\; -1 \\;\\; 2 \\,|\\, 0\\,]$ — write both new rows out." },
        { type: "p", text: "**Pivot check:** $a_{22}' = 1 \\ne 0$. One more step: $R_3'' = R_3' + R_2' = [\\,0 \\;\\; 0 \\;\\; 1 \\,|\\, 1\\,]$ — upper triangular, done." },
        { type: "p", text: "Back-substitute: $z = 1$, then row 2 says $y - z = 1$, so $y = 1 + z = 2$, and $x = 6 - y - z = 3$. Check row 3: $3(3) + 2(2) + 5(1) = 18$ ✓. **Asked in:** Gauss elimination returns as Fall 2024 A2(b) (with partial pivoting), Spring 2023 Q2(f) (the tourist system, all steps shown) and Spring 2024 Q2(c) (matrix inversion)." },
        { type: "exam", text: "The marks ride on the shown steps: every resulting row printed, every pivot checked before use — the two habits this walk-through just demonstrated." },
      ],
    },
    {
      heading: 'The system as an augmented matrix',
      blocks: [
        {
          type: 'p',
          text: 'A system of $n$ linear equations in $n$ unknowns is written $AX = b$, where $A$ is the coefficient matrix, $X$ the vector of unknowns and $b$ the vector of constants.',
        },
        { type: 'math', tex: 'a_{11}x_1 + a_{12}x_2 + a_{13}x_3 = b_1 \\quad \\begin{matrix} \\dots \\end{matrix} \\quad a_{n1}x_1 + \\dots + a_{nn}x_n = b_n' },
        {
          type: 'math',
          tex: 'A = \\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{bmatrix}, \\quad X = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix}, \\quad b = \\begin{bmatrix} b_1 \\\\ b_2 \\\\ b_3 \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'The whole method works on the **augmented matrix** $[A\\mid b]$: the coefficients on the left of the bar, the constants on the right. Every row of it stands for one equation, so a row operation is an equation operation — and a row exchange is simply taking one equation and putting it in a different position.',
        },
        {
          type: 'math',
          tex: '\\left[\\begin{array}{ccc|c} a_{11} & a_{12} & a_{13} & b_1 \\\\ a_{21} & a_{22} & a_{23} & b_2 \\\\ a_{31} & a_{32} & a_{33} & b_3 \\end{array}\\right]',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Pivot row** — the row you are using this round; its leading coefficient is the **pivot element**.',
            '**Elimination row** — any row below the pivot row that you are about to change.',
            '**Multiplier** — the number you subtract from the elimination row, $m = \\dfrac{a_{ik}}{a_{kk}}$.',
          ],
        },
        {
          type: 'note',
          text: 'Row 1 is only the pivot row *until* a zero pivot forces you to choose another one. Write down which row is the pivot row each time you move down the matrix — the examiner wants to see that you knew what you were doing.',
        },
      ],
    },
    {
      heading: 'Naive Gauss elimination',
      blocks: [
        {
          type: 'p',
          text: '**Naive** means we do not consider division by zero to be possible. It has two stages: **forward elimination**, which turns the coefficient matrix into an upper triangular matrix, and **backward substitution**, which recovers the unknowns.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Reduce the coefficient matrix $[A]$ to an upper triangular system.',
            'Eliminate $x_1$ from the 2nd to the $n$th equations.',
            'Eliminate $x_2$ from the 3rd to the $n$th equations.',
            'Continue until the $n$th equation has a single non-zero coefficient.',
          ],
        },
        {
          type: 'p',
          text: 'To eliminate $x_1$ from the second equation we multiply the first equation by $-\\dfrac{a_{21}}{a_{11}}$ and add it to the second. In row notation that is $R_2\' = R_2 - \\dfrac{a_{21}}{a_{11}} R_1$.',
        },
        {
          type: 'math',
          tex: '\\begin{array}{r} a_{21}x_1 + a_{22}x_2 + a_{23}x_3 = b_2 \\\\ a_{11}\\left(-\\frac{a_{21}}{a_{11}}\\right)x_1 + a_{12}\\left(-\\frac{a_{21}}{a_{11}}\\right)x_2 + a_{13}\\left(-\\frac{a_{21}}{a_{11}}\\right)x_3 = b_1\\left(-\\frac{a_{21}}{a_{11}}\\right) \\\\ \\hline 0 + \\left(a_{22} - a_{12}\\frac{a_{21}}{a_{11}}\\right)x_2 + \\left(a_{23} - a_{13}\\frac{a_{21}}{a_{11}}\\right)x_3 = b_2 - b_1\\frac{a_{21}}{a_{11}} \\end{array}',
        },
        {
          type: 'p',
          text: 'The new row $R_2\'$ is written $a\'_{22}x_2 + a\'_{23}x_3 = b\'_2$, and equation 2 is replaced by equation 2$\'$. Repeat the same move on row 3 to get $R_3\'$, then use $R_2\'$ to clear the $x_2$ column of $R_3\'$:',
        },
        {
          type: 'math',
          tex: "\\begin{array}{r} a'_{22}x_2 + a'_{23}x_3 = b'_2 \\quad (2') \\\\ a'_{32}x_2 + a'_{33}x_3 = b'_3 \\quad (3') \\\\ R_3'' = R_3' - \\frac{a'_{32}}{a'_{22}} R_2' \\;\\Rightarrow\\; a''_{33}x_3 = b''_3 \\end{array}",
        },
        {
          type: 'p',
          text: 'Now the system is upper triangular and we read it from the bottom up:',
        },
        {
          type: 'math',
          tex: 'x_3 = \\frac{b_3\'\'}{a\'\'_{33}}, \\qquad x_2 = \\frac{b_2\' - a\'_{23}x_3}{a\'_{22}}, \\qquad x_1 = \\frac{b_1 - a_{12}x_2 - a_{13}x_3}{a_{11}}',
        },
        {
          type: 'exam',
          text: 'Write the augmented matrix, label the pivot row and the elimination row, then for every step write **both** the operation and the row it produces: `R₂′ = R₂ − 2R₁` followed by `R₂′ = [0  1  −1 | 1]`. A row operation with no resulting row loses marks.',
        },
      ],
    },
    {
      heading: 'Partial pivoting',
      blocks: [
        {
          type: 'p',
          text: 'Partial pivoting chooses, for each column, the row **below** the pivot row that has the largest coefficient in that column, and exchanges it with the pivot row. The point is to avoid dividing by a small number and to keep the round-off error down.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'At column 1, compare $|a_{11}|, |a_{21}|, \\dots, |a_{n1}|$ and move the largest to the top.',
            'Eliminate that column as usual.',
            '**Repeat the check at column 2, then at column 3, and so on** — a zero pivot can turn up in any column, not only the first.',
            'Continue until the matrix is upper triangular.',
          ],
        },
        {
          type: 'note',
          text: 'Rule 1 from the teacher: *you need to exchange the rows every time you pick a new pivot row, not just the first time*. A student who only checked the first column would divide by zero in the second column in exactly the example below.',
        },
        {
          type: 'exam',
          text: 'When you exchange rows, write what you compared and why: `|a₃₂| = 5 > |a₂₂| = 2, so interchange R₂ and R₃`, then show the matrix after the exchange. A silent swap looks like an arithmetic slip.',
        },
        {
          type: 'note',
          text: 'Rule 3 and Rule 4: do **not** pivot when the question only says "Gauss elimination" and no zero pivot appears — but the moment a division by zero turns up, pivoting is compulsory. Partial pivoting is preferred over full pivoting because it is less complex.',
        },
      ],
    },
    {
      heading: 'Gauss-Jordan elimination',
      blocks: [
        {
          type: 'p',
          text: 'Gauss-Jordan takes the elimination all the way: instead of stopping at an upper triangular matrix, every pivot is used to clear its column in **all** the other rows. The result is the **reduced row echelon form**.',
        },
        {
          type: 'p',
          text: 'For a square matrix the reduced row echelon form is the **identity matrix**, so the unknowns are read straight off the last column — there is nothing to back-substitute.',
        },
        {
          type: 'math',
          tex: '\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & x_1 \\\\ 0 & 1 & 0 & x_2 \\\\ 0 & 0 & 1 & x_3 \\end{array}\\right]',
        },
        {
          type: 'p',
          text: 'The order that keeps the arithmetic clean is to **normalise the pivot row first** (divide the row by its pivot — for a square matrix the pivot is the diagonal element), and only then use it to clear the column:',
        },
        {
          type: 'math',
          tex: 'R_k \\leftarrow \\frac{1}{a_{kk}} R_k \\quad\\text{then}\\quad R_i \\leftarrow R_i - a_{ik} R_k \\;\\; (i \\ne k)',
        },
        {
          type: 'note',
          text: 'Rule 2 from the teacher: after Gauss-Jordan your matrix must be in reduced row echelon form, and you should **not** perform back substitution. Writing a back substitution after Gauss-Jordan is a sign you did not finish the method.',
        },
        {
          type: 'exam',
          text: 'Normalise each pivot row as soon as you pick it, then clear the column, and write every resulting row. Finish by writing the identity matrix with the answers in the last column — that matrix **is** your answer.',
        },
      ],
    },
    {
      heading: 'Matrix inversion by the adjoint method',
      blocks: [
        {
          type: 'p',
          text: 'Gauss elimination is not the only way to solve $AX = B$. The **matrix inversion method** finds $A^{-1}$ first and then multiplies: $X = A^{-1}B$. It costs more arithmetic for one system, but once $A^{-1}$ is known every further right-hand side is a single multiplication — which is why the papers ask for it by name.',
        },
        {
          type: 'math',
          tex: 'A^{-1} = \\frac{1}{|A|}\\operatorname{adj} A, \\qquad X = A^{-1}B',
        },
        {
          type: 'table',
          head: ['Symbol', 'Meaning', 'In words'],
          rows: [
            ['$|A|$', 'the **determinant** of $A$', 'the size of the matrix, up to a sign'],
            ['$M_{ij}$', 'the **minor**: the determinant of $A$ with row $i$ and column $j$ deleted', 'the small determinant left over'],
            ['$C_{ij} = (-1)^{i+j} M_{ij}$', 'the **cofactor** of the entry $a_{ij}$', 'the minor with its sign'],
            ['$\\operatorname{adj} A$', 'the **adjoint**: the transpose of the cofactor matrix', 'the cofactors, flipped across the diagonal'],
          ],
        },
        {
          type: 'p',
          text: 'The method is four steps, and the sign pattern is what students get wrong:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**The determinant** $|A|$, by cofactor expansion along the first row: $a_{11}(a_{22}a_{33}-a_{23}a_{32}) - a_{12}(a_{21}a_{33}-a_{23}a_{31}) + a_{13}(a_{21}a_{32}-a_{22}a_{31})$ for a $3\\times3$ matrix.',
            '**The cofactor matrix** $C$, one cofactor per entry, with the checkerboard sign pattern $+, -, +$, $-, +, -$, $+, -, +$ down the rows.',
            '**The adjoint** $\\operatorname{adj} A = C^T$ — the cofactor matrix transposed. Then $A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A$.',
            '**The solution** $X = A^{-1}B$.',
          ],
        },
        {
          type: 'note',
          text: 'Trap: the adjoint is the **transpose** of the cofactor matrix, so the off-diagonal cofactors swap places. Forgetting that transpose is the single most common error here, and it is the one the exam marks.',
        },
        {
          type: 'exam',
          text: 'Write $|A|$ first — if it is zero, stop and say the matrix has no inverse. Then the cofactor matrix, then the adjoint, then $A^{-1}$, then the final multiplication $A^{-1}B$ with the numbers substituted, and box the three unknowns.',
        },
      ],
    },
    {
      heading: 'The four scenarios for the existence of a solution',
      blocks: [
        {
          type: 'p',
          text: 'A system of linear equations does not always have an answer, and when it does the answer may not be unique. Seen as lines (two equations, two unknowns), there are exactly four possibilities, and the **determinant** tells you which one you are in.',
        },
        {
          type: 'table',
          head: ['Scenario', 'What the lines look like', 'The test'],
          rows: [
            ['**Unique solution**', 'the lines cross at one point', '$\\det A \\ne 0$'],
            ['**No solution**', 'the lines are parallel and inconsistent', '$\\det A = 0$, and the equations contradict each other'],
            ['**Infinitely many solutions**', 'the lines coincide — one equation is a multiple of the other', '$\\det A = 0$, and the equations are consistent'],
            ['**Ill-conditioned**', 'the lines are nearly parallel', '$\\det A \\approx 0$: a solution exists, but small changes in the coefficients move it a long way'],
          ],
        },
        {
          type: 'p',
          text: 'So the determinant does double duty: $\\det A \\ne 0$ is exactly the condition for $A^{-1}$ to exist, which is why the matrix inversion method cannot be used on a singular system at all.',
        },
        {
          type: 'note',
          text: 'The same paper question also asks for the **convergence condition of the Jacobi iteration** and how strong it is. That condition is **diagonal dominance** — $|a_{ii}| > \\sum_{j \\ne i}|a_{ij}|$ in every row — which is Chapter 4\'s material. Its strength is that it is **sufficient but not necessary**: it guarantees convergence, but a system that fails the test may still converge, so failing it is not a proof of divergence. Rearranging the equations often makes a system dominant.',
        },
        {
          type: 'exam',
          text: 'For a four-mark theory question: name the four scenarios, give the determinant condition for each, then state the dominance condition and that it is sufficient but not necessary. One clear line each.',
        },
      ],
    },
    {
      heading: 'Choosing the method and writing the answer',
      blocks: [
        {
          type: 'p',
          text: 'The exam asks for one method at a time, so follow the instruction exactly:',
        },
        {
          type: 'table',
          head: ['The question says', 'You do'],
          rows: [
            ['"Gauss elimination", no zero pivot anywhere', 'Naive elimination, no pivoting'],
            ['"Gauss elimination" and a zero pivot appears', 'Stop, apply partial pivoting from that column on, and say so'],
            ['"Gauss elimination with partial pivoting"', 'Check for a row exchange at every pivot row, even when the pivot is not zero'],
            ['"Gauss-Jordan elimination"', 'Normalise the pivot row, clear the column, end at the identity matrix, no back substitution'],
            ['"Matrix inversion method"', 'Invert $A$ and multiply by $b$ — partial marks are available for any correct method'],
          ],
        },
        {
          type: 'exam',
          text: 'Marks are lost on presentation more often than on arithmetic. In order: augmented matrix → pivot row named → each operation with its resulting row → upper triangular matrix → back substitution → boxed final answer with the rounding you used.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Multiplier', tex: 'm_{ik} = \\frac{a_{ik}}{a_{kk}}', where: 'the number subtracted from the elimination row' },
    { label: 'Row operation', tex: "R_i' = R_i - m_{ik} R_k", where: 'write this AND the row it produces' },
    { label: 'Upper triangular form', tex: '\\begin{bmatrix} a_{11} & a_{12} & a_{13} \\\\ 0 & a\'_{22} & a\'_{23} \\\\ 0 & 0 & a\'\'_{33} \\end{bmatrix}', where: 'after forward elimination' },
    { label: 'Back substitution', tex: 'x_n = \\frac{b_n}{a_{nn}}, \\quad x_i = \\frac{b_i - \\sum_{j=i+1}^{n} a_{ij}x_j}{a_{ii}}', where: 'Gauss elimination only' },
    { label: 'Pivot check', tex: '\\left|a_{rk}\\right| > \\left|a_{kk}\\right| \\Rightarrow R_k \\leftrightarrow R_r', where: 'partial pivoting, at every pivot row' },
    { label: 'Gauss-Jordan step', tex: 'R_k \\leftarrow \\frac{1}{a_{kk}} R_k, \\quad R_i \\leftarrow R_i - a_{ik}R_k', where: 'ends at the identity matrix' },
  ],
  examples: [
    {
      title: 'Gauss elimination with no pivoting needed',
      type: 'Numerical — Gauss elimination',
      question: 'Solve the system of linear equations using Gauss elimination: $x + y + z = 6$, $2x + 3y + z = 13$, $3x + 2y + 5z = 18$.',
      source: 'Class board notes — Elimination Methods',
      marks: 6,
      steps: [
        { t: 'Augmented matrix, with row 1 the pivot row and rows 2 and 3 the elimination rows:', m: '1 mark' },
        { t: '$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & 3 & 1 & 13 \\\\ 3 & 2 & 5 & 18 \\end{array}\\right]$', m: '1 mark' },
        { t: 'Eliminate $x$ from row 2: $R_2\' = R_2 - 2R_1$ gives $R_2\' = [\\;0\\;\\;1\\;\\;-1\\;|\\;1\\;]$.', m: '1 mark' },
        { t: 'Eliminate $x$ from row 3: $R_3\' = R_3 - 3R_1$ gives $R_3\' = [\\;0\\;\\;-1\\;\\;2\\;|\\;0\\;]$.', m: '1 mark' },
        { t: 'Eliminate $y$ from row 3: $R_3\'\' = R_3\' + R_2\'$ gives $R_3\'\' = [\\;0\\;\\;0\\;\\;1\\;|\\;1\\;]$.', m: '1 mark' },
        { t: 'Upper triangular: $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & -1 & 1 \\\\ 0 & 0 & 1 & 1 \\end{array}\\right]$, then back substitution gives $x_3 = 1$, $x_2 = 1 + x_3 = 2$, $x_1 = 6 - x_2 - x_3 = 3$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 3,\\ y = 2,\\ z = 1}$',
      note: 'Trap: writing only `R₂ = R₂ − 2R₁` with no resulting row. The teacher marks that down every single time.',
      explanation: [
        'Every elimination step takes one multiple of the pivot row away from an elimination row. The multiplier is always the ratio of the entry to be killed over the pivot, $\\frac{a_{ik}}{a_{kk}}$, and it changes at every step because the pivot changes.',
        'Because the pivot here is 1, the multipliers are simply the first column entries (2 and 3); at the second pivot row the board writes $R_3\'\' = R_3\' + \\left(\\frac{-1}{1}\\right)R_2\'$, which is $R_3\' + R_2\'$ because the entry to remove is $-1$. Once the matrix is upper triangular, the unknowns come out in reverse order from the last row upward — that is what "backward substitution" means, and it is why Gauss elimination is called a direct method: the answer is produced exactly (up to round-off), not approximated.',
      ],
    },
    {
      title: 'Gauss elimination with partial pivoting',
      type: 'Numerical — Gauss elimination (partial pivoting)',
      question: 'Solve the following system of linear equation using Gauss Elimination with Partial Pivoting (show all necessary steps of the computation): $x + 2y - 3z = -4$, $-9x + 8y + 7z = 28$, $4x + 5y + 6z = 32$.',
      source: 'Fall 2024 A2(b)',
      marks: 6,
      steps: [
        { t: '$\\left[\\begin{array}{ccc|c} 1 & 2 & -3 & -4 \\\\ -9 & 8 & 7 & 28 \\\\ 4 & 5 & 6 & 32 \\end{array}\\right]$ — first pivot column: $|a_{21}| = 9 > |a_{11}| = 1$, so interchange $R_1$ and $R_2$.', m: '1 mark' },
        { t: '$\\left[\\begin{array}{ccc|c} -9 & 8 & 7 & 28 \\\\ 1 & 2 & -3 & -4 \\\\ 4 & 5 & 6 & 32 \\end{array}\\right]$', m: '1 mark' },
        { t: '$R_2\' = R_2 + \\frac{1}{9}R_1 = [\\;0\\;\\;\\tfrac{26}{9}\\;\\;\\;-\\tfrac{20}{9}\\;|\\;-\\tfrac{8}{9}\\;]$, $R_3\' = R_3 + \\frac{4}{9}R_1 = [\\;0\\;\\;\\tfrac{77}{9}\\;\\;\\;\\tfrac{82}{9}\\;|\\;\\tfrac{400}{9}\\;]$.', m: '1 mark' },
        { t: 'Second pivot column: $|a_{32}| = \\tfrac{77}{9} > |a_{22}| = \\tfrac{26}{9}$, so interchange $R_2$ and $R_3$ — **the check is repeated at every pivot row**.', m: '1 mark' },
        { t: '$R_3\'\' = R_3\' - \\frac{26}{77}R_2\' = [\\;0\\;\\;0\\;\\;-\\tfrac{408}{77}\\;|\\;-\\tfrac{1224}{77}\\;]$ — upper triangular.', m: '1 mark' },
        { t: 'Back substitution: $x_3 = \\dfrac{-1224/77}{-408/77} = 3$, $x_2 = \\dfrac{400/9 - (82/9)(3)}{77/9} = 2$, $x_1 = \\dfrac{28 - 8(2) - 7(3)}{-9} = 1$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 1,\\; y = 2,\\; z = 3}$',
      note: 'Trap: stopping the pivot check after the first column. This paper marks a partial pivoting question, so the second-column exchange is exactly what is being tested.',
      explanation: [
        'Partial pivoting swaps in the row with the largest magnitude in the pivot column, which keeps the multipliers small (all less than 1) and therefore keeps the round-off error small. The swap is legal because the equations are just being reordered — the solution set does not change.',
        'Notice the pattern: the check is repeated at each new pivot row, because a zero pivot can appear in any column. Only the rows *below* the current pivot row are candidates; rows above are already finished.',
        'Partial pivoting on this system gives the exact solution $(1, 2, 3)$, which you can confirm by substituting back into the three original equations.',
      ],
    },
    {
      title: 'Partial pivoting on the slides\' system',
      type: 'Numerical — Gauss elimination (partial pivoting)',
      question: 'Solve the following system using Gauss Elimination With Partial Pivoting: $2x_1 + x_2 + x_3 = 5$, $4x_1 - 6x_2 = -2$, $-2x_1 + 7x_2 + 2x_3 = 9$.',
      source: 'Elimination Methods slides — Gauss elimination with partial pivoting',
      marks: 6,
      steps: [
        { t: '$\\left[\\begin{array}{ccc|c} 2 & 1 & 1 & 5 \\\\ 4 & -6 & 0 & -2 \\\\ -2 & 7 & 2 & 9 \\end{array}\\right]$ — first pivot column: $|4| > |2| = |-2|$, so interchange $R_1$ and $R_2$.', m: '1 mark' },
        { t: '$\\left[\\begin{array}{ccc|c} 4 & -6 & 0 & -2 \\\\ 2 & 1 & 1 & 5 \\\\ -2 & 7 & 2 & 9 \\end{array}\\right]$ — $R_1$ is the pivot row.', m: '1 mark' },
        { t: '$R_2\' = R_2 - \\frac{1}{2}R_1 = [\\ 0 \\quad 4 \\quad 1 \\mid 6\\ ]$ and $R_3\' = R_3 + \\frac{1}{2}R_1 = [\\ 0 \\quad 4 \\quad 2 \\mid 8\\ ]$.', m: '1 mark' },
        { t: 'Second pivot column: $|a_{32}| = 4$ is not larger than $|a_{22}| = 4$, so no interchange. $R_3\'\' = R_3\' - R_2\' = [\\ 0 \\quad 0 \\quad 1 \\mid 2\\ ]$ — upper triangular: $\\left[\\begin{array}{ccc|c} 4 & -6 & 0 & -2 \\\\ 0 & 4 & 1 & 6 \\\\ 0 & 0 & 1 & 2 \\end{array}\\right]$.', m: '1 mark' },
        { t: 'Back substitution: $x_3 = 2$; $4x_2 + 2 = 6 \\Rightarrow x_2 = 1$; $4x_1 - 6(1) = -2 \\Rightarrow x_1 = 1$.', m: '1 mark' },
        { t: 'Check: $2 + 1 + 2 = 5$ ✓, $4 - 6 = -2$ ✓, $-2 + 7 + 4 = 9$ ✓.', m: '1 mark' },
      ],
      answer: '$\\boxed{x_1 = 1,\\ x_2 = 1,\\ x_3 = 2}$',
      note: 'Trap: the pivot check must be done again at the second pivot row, even though here it ends in "no swap" — write the comparison $|4|$ vs $|4|$ so the examiner sees it.',
      explanation: [
        'This is the slides’ own pivoting example (pages 17–22). The slides write the multipliers as additions, $R_2 = R_2 + (-\\tfrac{1}{2})R_1$ and $R_3 = R_3 + \\tfrac{1}{2}R_1$ — the same operations as above.',
        'Swapping the row with the largest $|a_{i1}|$ to the top keeps every multiplier at most 1 in size, which is what keeps the round-off error small.',
      ],
    },
    {
      title: 'Gauss-Jordan on the slides\' system',
      type: 'Numerical — Gauss-Jordan',
      question: 'Solve the following system of linear equations using Gauss-Jordan method: $2x_1 + 4x_2 + 6x_3 = 18$, $4x_1 + 5x_2 + 6x_3 = 24$, $3x_1 + x_2 - 2x_3 = 4$.',
      source: 'Elimination Methods slides — Gauss-Jordan method',
      marks: 6,
      steps: [
        { t: '$\\left[\\begin{array}{ccc|c} 2 & 4 & 6 & 18 \\\\ 4 & 5 & 6 & 24 \\\\ 3 & 1 & -2 & 4 \\end{array}\\right]$ — $a_{11} = 2 \\ne 0$, no pivoting needed. Normalise: $R_1 \\to \\frac{1}{2}R_1 = [\\ 1 \\quad 2 \\quad 3 \\mid 9\\ ]$.', m: '1 mark' },
        { t: 'Eliminate $x_1$: $R_2 \\to R_2 - 4R_1 = [\\ 0 \\quad -3 \\quad -6 \\mid -12\\ ]$, $R_3 \\to R_3 - 3R_1 = [\\ 0 \\quad -5 \\quad -11 \\mid -23\\ ]$.', m: '1 mark' },
        { t: 'Normalise $R_2 \\to -\\frac{1}{3}R_2 = [\\ 0 \\quad 1 \\quad 2 \\mid 4\\ ]$; eliminate $x_2$ above and below: $R_1 \\to R_1 - 2R_2 = [\\ 1 \\quad 0 \\quad -1 \\mid 1\\ ]$, $R_3 \\to R_3 + 5R_2 = [\\ 0 \\quad 0 \\quad -1 \\mid -3\\ ]$.', m: '2 marks' },
        { t: 'Normalise $R_3 \\to -R_3 = [\\ 0 \\quad 0 \\quad 1 \\mid 3\\ ]$; eliminate $x_3$: $R_1 \\to R_1 + R_3 = [\\ 1 \\quad 0 \\quad 0 \\mid 4\\ ]$, $R_2 \\to R_2 - 2R_3 = [\\ 0 \\quad 1 \\quad 0 \\mid -2\\ ]$.', m: '1 mark' },
        { t: 'RREF reached: $\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 4 \\\\ 0 & 1 & 0 & -2 \\\\ 0 & 0 & 1 & 3 \\end{array}\\right]$. Check: $8 - 8 + 18 = 18$ ✓, $16 - 10 + 18 = 24$ ✓, $12 - 2 - 6 = 4$ ✓.', m: '1 mark' },
      ],
      answer: '$\\boxed{x_1 = 4,\\ x_2 = -2,\\ x_3 = 3}$',
      note: 'The slide’s last table stops at $-x_3 = -3$ with $-1$ on the diagonal. By the teacher’s rule Gauss-Jordan must end in RREF, so normalise $R_3$ (divide by $-1$) and finish with the identity matrix, as above.',
      explanation: [
        'Gauss-Jordan normalises each pivot row and clears its column both above and below, so the unknowns are read straight from the last column with no back substitution.',
        'The slides note the cost: about 50% more arithmetic than Gauss elimination ($\\tfrac{1}{2}n^3$ multiplications against $\\tfrac{1}{3}n^3$), which is why it is rarely used for solving a single system.',
      ],
    },
    {
      title: 'Board Example 2: a zero pivot after the first elimination',
      type: 'Numerical — Gauss elimination (partial pivoting)',
      question: 'Solve the following system of linear equations using Gauss Elimination with Partial Pivoting: $3x + 5y + z = 0$, $3x + 2y + 5z = 10$, $6x + 4y + 2z = 12$.',
      source: 'Class board notes — Example 2',
      marks: 6,
      steps: [
        { t: 'Step 1 — largest coefficient (by magnitude) in the first column is $6$ in $R_3$, so $R_3 \\leftrightarrow R_1$: $\\left[\\begin{array}{ccc|c} 6 & 4 & 2 & 12 \\\\ 3 & 2 & 5 & 10 \\\\ 3 & 5 & 1 & 0 \\end{array}\\right]$.', m: '1 mark' },
        { t: 'Step 2 — remove $x$: $R_2\' = R_2 + \\left(\\frac{-3}{6}\\right)R_1 = R_2 - \\frac{1}{2}R_1 = [\\ 0 \\quad 0 \\quad 4 \\mid 4\\ ]$ and $R_3\' = R_3 - \\frac{1}{2}R_1 = [\\ 0 \\quad 3 \\quad 0 \\mid -6\\ ]$.', m: '2 marks' },
        { t: 'Step 3 — the second pivot $a_{22}\' = 0$: pivot immediately, $R_3\' \\leftrightarrow R_2\'$: $\\left[\\begin{array}{ccc|c} 6 & 4 & 2 & 12 \\\\ 0 & 3 & 0 & -6 \\\\ 0 & 0 & 4 & 4 \\end{array}\\right]$. The $y$-entry below the new pivot is already $0$, so the matrix is upper triangular.', m: '1 mark' },
        { t: 'Back substitution: $4z = 4 \\Rightarrow z = 1$; $3y = -6 \\Rightarrow y = -2$; $6x = 12 - (4y + 2z) = 12 - (-8 + 2) = 18 \\Rightarrow x = 3$.', m: '1 mark' },
        { t: 'Check: $9 - 10 + 1 = 0$ ✓, $9 - 4 + 5 = 10$ ✓, $18 - 8 + 2 = 12$ ✓.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 3,\\ y = -2,\\ z = 1}$',
      note: 'Trap: dividing by the zero pivot in Step 3. The board’s note: “if the coefficient of $y$ were not already 0 in $R_3\'$, we would need to eliminate it ourselves” — the swap comes first, then elimination continues as usual.',
      explanation: [
        'This is the teacher’s own Example 2 (board pages 4–6). It shows both pivoting moments in one question: the largest-magnitude swap at the first pivot row (“only consider the magnitude”), and the forced swap when a zero turns up at the second pivot row.',
      ],
    },
    {
      title: 'The pivot exchange that happens at the second pivot row',
      type: 'Numerical — Gauss elimination (pivot exchange)',
      question: 'Solve $2x + y + z = 5$, $2x + 3y + 4z = 7$, $2x - 4y + 2z = 8$ by Gauss elimination. After removing $0$ from the $x$-column the equations are $0 + 2y + 3z = 2$ and $0 - 5y + z = 3$.',
      source: 'Teacher\'s rule 1 (the pivot check at every pivot row)',
      marks: 6,
      steps: [
        { t: 'First pivot column: all three coefficients are 2, so $|a_{31}| = |a_{21}| = |a_{11}|$ and no exchange is needed.', m: '1 mark' },
        { t: '$R_2\' = R_2 - R_1 = [\\;0\\;\\;2\\;\\;3\\;|\\;2\\;]$, $R_3\' = R_3 - R_1 = [\\;0\\;\\;-5\\;\\;1\\;|\\;3\\;]$.', m: '1 mark' },
        { t: 'Second pivot column: $|a_{32}| = 5 > |a_{22}| = 2$, so **interchange $R_3\'$ and $R_2\'$** before going any further.', m: '1 mark' },
        { t: '$\\left[\\begin{array}{ccc|c} 2 & 1 & 1 & 5 \\\\ 0 & -5 & 1 & 3 \\\\ 0 & 2 & 3 & 2 \\end{array}\\right]$', m: '1 mark' },
        { t: '$R_3\'\' = R_3\' + \\tfrac{2}{5}R_2\' = [\\;0\\;\\;0\\;\\;\\tfrac{17}{5}\\;|\\;\\tfrac{16}{5}\\;]$.', m: '1 mark' },
        { t: 'Back substitution: $z = \\tfrac{16}{17}$, $y = \\dfrac{3 - z}{-5} = -\\tfrac{7}{17}$, $x = \\dfrac{5 - y - z}{2} = \\tfrac{38}{17}$.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = \\tfrac{38}{17} = 2.2353,\\; y = -\\tfrac{7}{17} = -0.4118,\\; z = \\tfrac{16}{17} = 0.9412}$',
      note: 'Trap: this is the mistake the teacher called out — checking the pivot only on the first column. Had you not swapped, you would have divided by 2 instead of 5 and lost accuracy for no reason.',
      explanation: [
        'A row exchange is a reordering of the equations, so the solution is unchanged — that is why pivoting is always legal and never changes the answer, only the arithmetic.',
        'The rule generalises: before every elimination step, look down the pivot column among the rows you have not yet used, and if the largest magnitude is not already in the pivot row, swap them. Doing this from the first column is what keeps every multiplier below 1.',
        'Partial pivoting (swap rows) is the version the course expects. Full pivoting (swap rows and columns) exists, but it changes the order of the unknowns and is more complicated — the teacher asks for partial pivoting.',
      ],
    },
    {
      title: 'Gauss-Jordan on the same system',
      type: 'Numerical — Gauss-Jordan',
      question: 'Solve $x + y + z = 6$, $2x + 3y + z = 13$, $3x + 2y + 5z = 18$ by Gauss-Jordan elimination.',
      source: 'Class board notes',
      marks: 6,
      steps: [
        { t: '$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & 3 & 1 & 13 \\\\ 3 & 2 & 5 & 18 \\end{array}\\right]$ — pivot row $R_1$ is already normalised (the pivot is 1).', m: '1 mark' },
        { t: '$R_2 \\leftarrow R_2 - 2R_1 = [\\;0\\;\\;1\\;\\;-1\\;|\\;1\\;]$, $R_3 \\leftarrow R_3 - 3R_1 = [\\;0\\;\\;-1\\;\\;2\\;|\\;0\\;]$.', m: '1 mark' },
        { t: 'Use $R_2$ to clear the $y$-column everywhere: $R_1 \\leftarrow R_1 - R_2 = [\\;1\\;\\;0\\;\\;2\\;|\\;5\\;]$, $R_3 \\leftarrow R_3 + R_2 = [\\;0\\;\\;0\\;\\;1\\;|\\;1\\;]$.', m: '2 marks' },
        { t: 'Last pivot row: $a_{33} = 1$, so $R_3 = [\\;0\\;\\;0\\;\\;1\\;|\\;1\\;]$ is already normalised.', m: '1 mark' },
        { t: 'Clear the $z$-column: $R_1 \\leftarrow R_1 - 2R_3 = [\\;1\\;\\;0\\;\\;0\\;|\\;3\\;]$, $R_2 \\leftarrow R_2 + R_3 = [\\;0\\;\\;1\\;\\;0\\;|\\;2\\;]$.', m: '1 mark' },
      ],
      answer: '$\\left[\\begin{array}{ccc|c} 1 & 0 & 0 & 3 \\\\ 0 & 1 & 0 & 2 \\\\ 0 & 0 & 1 & 1 \\end{array}\\right]$, so $\\boxed{x = 3,\\ y = 2,\\ z = 1}$',
      note: 'Trap: ending Gauss-Jordan at an upper triangular matrix and then doing back substitution. That is Gauss elimination, not Gauss-Jordan.',
      explanation: [
        'Gauss-Jordan differs from Gauss elimination in one thing: the pivot row is used to clear its column in every other row, not only in the rows below. So the elimination never stops half way and there is never a back-substitution stage.',
        'Normalising the pivot row before you use it keeps the multipliers at 1 (or at the pivot value), which is where the numerical stability comes from. For a square matrix the pivot of row $k$ is the diagonal element $a_{kk}$.',
        'The final identity matrix is the whole answer: the constants in the last column are the unknowns. If your matrix is not the identity at the end, you have not finished the method.',
      ],
    },
    {
      title: 'Matrix inversion method: solving a system by the adjoint',
      type: 'Numerical — Matrix inversion',
      question: 'Solve the following system of linear equations by using the Matrix Inversion method: $2x + y + z = 7$, $4x + 2y + 3z = 4$, $x - y + z = 0$.',
      source: 'Spring 2024 Q2(c)',
      marks: 6,
      steps: [
        { t: 'Write the system as $AX = B$ with $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 4 & 2 & 3 \\\\ 1 & -1 & 1 \\end{bmatrix}$, $B = \\begin{bmatrix} 7 \\\\ 4 \\\\ 0 \\end{bmatrix}$. If $|A| \\ne 0$ then $X = A^{-1}B$ with $A^{-1} = \\dfrac{\\operatorname{adj} A}{|A|}$ (Shanker Rao §11.1).', m: '1 mark' },
        { t: '$|A| = 2(2 \\cdot 1 - 3 \\cdot (-1)) - 1(4 \\cdot 1 - 3 \\cdot 1) + 1(4 \\cdot (-1) - 2 \\cdot 1) = 2(5) - 1(1) + 1(-6) = 10 - 1 - 6 = 3 \\ne 0$, so the inverse exists.', m: '1 mark' },
        { t: 'Cofactors: $C_{11} = 5$, $C_{12} = -1$, $C_{13} = -6$; $C_{21} = -(1 + 1) = -2$, $C_{22} = 2 - 1 = 1$, $C_{23} = -(-2 - 1) = 3$; $C_{31} = 3 - 2 = 1$, $C_{32} = -(6 - 4) = -2$, $C_{33} = 4 - 4 = 0$. Transpose: $\\operatorname{adj} A = \\begin{bmatrix} 5 & -2 & 1 \\\\ -1 & 1 & -2 \\\\ -6 & 3 & 0 \\end{bmatrix}$, $A^{-1} = \\dfrac{1}{3}\\operatorname{adj} A$.', m: '2 marks' },
        { t: '$X = A^{-1}B = \\dfrac{1}{3}\\begin{bmatrix} 5 & -2 & 1 \\\\ -1 & 1 & -2 \\\\ -6 & 3 & 0 \\end{bmatrix}\\begin{bmatrix} 7 \\\\ 4 \\\\ 0 \\end{bmatrix} = \\dfrac{1}{3}\\begin{bmatrix} 35 - 8 \\\\ -7 + 4 \\\\ -42 + 12 \\end{bmatrix} = \\dfrac{1}{3}\\begin{bmatrix} 27 \\\\ -3 \\\\ -30 \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ -1 \\\\ -10 \\end{bmatrix}$.', m: '1 mark' },
        { t: 'Check: $2(9) + (-1) + (-10) = 7$ ✓, $4(9) + 2(-1) + 3(-10) = 4$ ✓, $9 - (-1) + (-10) = 0$ ✓.', m: '1 mark' },
      ],
      answer: '$\\boxed{x = 9,\\ y = -1,\\ z = -10}$',
      note: 'Trap: forgetting to transpose the cofactor matrix. The adjoint is the **transpose** of the cofactors, so the off-diagonal cofactors swap places — and the sign pattern $+,-,+$ must be applied to the cofactors first, before the transpose.',
      explanation: [
        'Matrix inversion solves $AX = B$ in one multiplication once $A^{-1}$ is known, which is worth it when the same $A$ is used with several right-hand sides. For a single system Gauss elimination is cheaper, which is why the paper allows another method for partial marks.',
        'The determinant does two jobs at once: it is the divisor that turns the adjoint into the inverse, and $\\det A \\ne 0$ is exactly the condition for a unique solution. A zero determinant means the matrix has no inverse at all, so the method cannot even be started.',
      ],
    },
  ],
  flashcards: [
    { front: 'What is a pivot element?', back: 'The leading non-zero coefficient of the pivot row — it is the number you divide by to get the multiplier.' },
    { front: 'How is the multiplier for an elimination row computed?', back: '$m = a_{ik}/a_{kk}$ — the entry to be killed divided by the pivot.' },
    { front: 'What is the forward elimination stage of Gauss elimination?', back: 'Reducing $A$ to an upper triangular matrix by clearing one column at a time, from the left.' },
    { front: 'What is backward substitution?', back: 'Solving the upper triangular system from the last row upward: $x_n$, then $x_{n-1}$, and so on.' },
    { front: 'Why is it called *naive* Gauss elimination?', back: 'Because it ignores the possibility of a division by zero.' },
    { front: 'What does partial pivoting do?', back: 'At each pivot column it swaps the pivot row with the row below that has the largest coefficient in that column.' },
    { front: 'When must the pivot check be repeated?', back: 'At EVERY new pivot row — not just the first column.' },
    { front: 'What does Gauss-Jordan produce?', back: 'The reduced row echelon form; for a square matrix, the identity matrix with the answers in the last column.' },
    { front: 'Do you back-substitute after Gauss-Jordan?', back: 'No. The matrix is already reduced — back substitution is only for Gauss elimination.' },
    { front: 'When should you pivot if the question does not ask for it?', back: 'Only when you actually hit a division by zero.' },
    { front: 'Why pivot at all?', back: 'To keep the multipliers small (below 1) and so keep the round-off error small.' },
    { front: 'What does a row interchange change?', back: 'Nothing about the solution — it only reorders the equations.' },
    { front: 'Why must you write the resulting row after each operation?', back: 'Because the marks are for the calculation, not for the intention. Writing only the operation loses marks.' },
    { front: 'What is the diagonal of the result of Gauss-Jordan on a square system?', back: 'All ones — it is the identity matrix.' },
    { front: 'What is the adjoint of a matrix?', back: 'The transpose of its cofactor matrix: $\\operatorname{adj} A = C^T$.' },
    { front: 'How do you get the inverse of a matrix?', back: '$A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A$ — the adjoint divided by the determinant.' },
    { front: 'What does a zero determinant tell you?', back: 'That $A$ has no inverse — so the matrix inversion method cannot be used, and the system has no unique solution.' },
    { front: 'What are the four scenarios for the existence of a solution?', back: 'Unique solution ($\\det A \\ne 0$), no solution, infinitely many solutions (both $\\det A = 0$), and ill-conditioned ($\\det A \\approx 0$).' },
    { front: 'Is the diagonal dominance condition for Jacobi necessary?', back: 'No — it is sufficient but not necessary. Failing it does not prove divergence.' },
  ],
  quiz: [
    {
      q: 'In Gauss elimination, the multiplier used to eliminate $a_{ik}$ is',
      options: ['$a_{kk}/a_{ik}$', '$a_{ik}/a_{kk}$', '$a_{ik} \\cdot a_{kk}$', '$a_{ii}/a_{kk}$'],
      answer: 1,
      explain: 'The multiplier is the entry to be killed divided by the pivot: $m_{ik} = a_{ik}/a_{kk}$.',
    },
    {
      q: 'Gauss elimination on a square system ends with',
      options: ['the identity matrix', 'an upper triangular matrix', 'a row of zeros', 'the reduced row echelon form'],
      answer: 1,
      explain: 'Gauss elimination stops at an upper triangular matrix and needs back substitution. Gauss-Jordan is the one that ends at the identity.',
    },
    {
      q: 'Gauss-Jordan on a $3 \\times 3$ system ends with',
      options: ['an upper triangular matrix', 'the identity matrix', 'one free variable', 'the augmented matrix unchanged'],
      answer: 1,
      explain: 'Gauss-Jordan goes to reduced row echelon form, which for a square matrix is the identity, with the answers in the last column.',
    },
    {
      q: 'Partial pivoting is applied',
      options: [
        'once, before the first elimination',
        'at every pivot row',
        'only when the determinant is zero',
        'only in the last column',
      ],
      answer: 1,
      explain: 'The check is repeated at each new pivot row — a zero pivot can appear in any column.',
    },
    {
      q: 'You are told to use Gauss elimination and the first pivot is 0. You should',
      options: [
        'carry on and divide by 0',
        'apply partial pivoting immediately',
        'switch to Gauss-Jordan without being asked',
        'use the iterative method',
      ],
      answer: 1,
      explain: 'Rule 4: the moment a division by zero appears, partial pivoting becomes compulsory.',
    },
    {
      q: 'Which of these is NOT part of Gauss elimination?',
      options: ['Forward elimination', 'Backward substitution', 'Normalising every pivot row', 'Choosing a pivot row'],
      answer: 2,
      explain: 'Normalising each pivot row is part of Gauss-Jordan; Gauss elimination leaves the diagonal as it is and back-substitutes.',
    },
    {
      q: 'What does a row operation on the augmented matrix correspond to?',
      options: [
        'A row operation on the equations, which leaves the solution unchanged',
        'Changing the solution',
        'Changing the number of unknowns',
        'Multiplying the unknowns',
      ],
      answer: 0,
      explain: 'Each row of the augmented matrix is an equation, so row operations are equation operations and preserve the solution set.',
    },
    {
      q: 'Why is the pivot row chosen as the row with the largest coefficient in the column?',
      options: [
        'To keep the multipliers small and the round-off error small',
        'To make the matrix symmetric',
        'To reduce the number of rows',
        'To avoid back substitution',
      ],
      answer: 0,
      explain: 'Large pivots mean small multipliers, and small multipliers mean small round-off errors.',
    },
    {
      q: 'How many marks does a complete Gauss elimination answer usually carry, and how are they split?',
      options: [
        '5 marks — mostly for the final numbers',
        '6 marks — for the matrix, the row operations with their results, the triangular matrix, and the back substitution',
        '3 marks — one per equation',
        '4 marks — one per row operation',
      ],
      answer: 1,
      explain: 'The 6-mark maths questions are split roughly: 1 for the matrix, 2 for the elimination steps, 1 for the triangular matrix, 2 for the back substitution and answer.',
    },
    {
      q: 'A question says "solve by Gauss-Jordan". Your final matrix should be',
      options: [
        'upper triangular, and then you back-substitute',
        'the identity matrix, and you read the answer off',
        'the same matrix you started with',
        'a matrix with one row of zeros',
      ],
      answer: 1,
      explain: 'Reduced row echelon form for a square system is the identity; the last column holds the answers.',
    },
    {
      q: 'In the matrix inversion method, $A^{-1}$ is obtained as',
      options: [
        '$\\operatorname{adj} A$ divided by $|A|$',
        'the cofactor matrix $C$ as it stands',
        'the transpose of $A$',
        'the inverse of the cofactor matrix',
      ],
      answer: 0,
      explain: '$A^{-1} = \\dfrac{1}{|A|}\\operatorname{adj} A$, where $\\operatorname{adj} A = C^T$ — the cofactor matrix transposed.',
    },
    {
      q: 'A system of linear equations has $\\det A = 0$ and the equations are consistent with each other. Then',
      options: [
        'there is no solution',
        'there are infinitely many solutions',
        'there is exactly one solution',
        'the system is ill-conditioned',
      ],
      answer: 1,
      explain: 'A zero determinant with consistent equations means one equation is a multiple of the other, so every point on the line is a solution. Ill-conditioned means $\\det A \\approx 0$, not exactly zero.',
    },
  ],
  solvers: ['gauss', 'gaussPivot', 'gaussJordan', 'matrixInverse'],
};
