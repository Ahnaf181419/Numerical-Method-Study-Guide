// Chapter 6 — Finite Differences.
// Sources: Shanker Rao Ch.3 (Finite Differences), Chapra & Canale Ch.2 (Finite Differences),
// the teacher's typed interpolation notes and the handwritten "13 proofs" board page.

export const checks = {
  "Start here: the problem this chapter solves": {
    q: "What raw material does the finite-difference calculus work on?",
    options: ["Closed-form formulas only", "Equally spaced tables of values", "Random samples with no order", "Matrix coefficients"],
    answer: 1,
    explain: "It is an algebra performed on the table itself; unequal spacing is the divided-difference chapter's job.",
  },
  "Start here: the core idea": {
    q: "For a polynomial table, the differences going constant tells you…",
    options: ["The table has an error", "The degree of the polynomial", "The spacing $h$", "The base row $y_0$"],
    answer: 1,
    explain: "If the $k$-th differences are constant, the underlying polynomial has degree $k$ — constant second differences mean quadratic.",
  },
  "Start here: reading the symbols": {
    q: "The averaging operator $\\mu$ does what to $y_{i+1/2}$ and $y_{i-1/2}$?",
    options: ["Subtracts them", "Takes their mean", "Shifts them up a row", "Differences them twice"],
    answer: 1,
    explain: "$\\mu$ is the mean of the two half-step neighbours — the smoothing half of the $2\\mu\\delta \\equiv \\Delta + \\nabla$ identity.",
  },
  "Start here: your first walk-through": {
    q: "In the $y = x^2$ table, the second differences read…",
    options: ["$1, 3, 5$", "$2, 2$ — constant", "$0, 0$", "$4, 9$"],
    answer: 1,
    explain: "First differences are the odd numbers 1, 3, 5; differencing again gives the constant 2 — the quadratic's fingerprint.",
  },
  'The forward difference operator and the difference table': {
    q: 'In the forward difference table of $y = f(x)$ taken at equal intervals, where does the entry $\\Delta^2 y_1$ sit?',
    options: [
      'On the row of $x_2$, in the second-difference column',
      'On the row of $x_1$, in the second-difference column',
      'On the row of $x_0$, in the first-difference column',
      'On the row of $x_3$, in the third-difference column',
    ],
    answer: 0,
    explain: '$\\Delta^2 y_1 = \\Delta y_2 - \\Delta y_1$ finishes at the row of $x_2$, so in the diagonal (forward) table it is written on the $x_2$ row in the second-difference column.',
  },
  'Backward, central and averaging operators': {
    q: 'What is $\\delta y_1$ for a table with spacing $h$?',
    options: [
      '$y_2 - y_1$',
      '$y_1 - y_0$',
      '$y_{3/2} - y_{1/2}$',
      '$\\tfrac{1}{2}(y_1 + y_0)$',
    ],
    answer: 0,
    explain: 'The central difference operator is $\\delta y_i = y_{i+1/2} - y_{i-1/2}$; at $i=1$ that is $y_{3/2} - y_{1/2} = y_2 - y_1$ when the half indices are resolved.',
  },
  'The shift operator E and the operator relations': {
    q: 'Which relation between the shift and forward difference operators is correct?',
    options: [
      '$\\Delta = E - 1$, i.e. $E = 1 + \\Delta$',
      '$\\Delta = E + 1$, i.e. $E = \\Delta - 1$',
      '$\\Delta = E^{-1} + 1$',
      '$E = \\Delta^2$',
    ],
    answer: 0,
    explain: '$\\Delta f(x) = f(x+h) - f(x) = Ef(x) - f(x) = (E-1)f(x)$, so $\\Delta \\equiv E - 1$ and $E \\equiv 1 + \\Delta$.',
  },
  'Proving the identities the papers ask for': {
    q: 'The papers ask you to prove $\\Delta - \\nabla \\equiv \\delta^2$. Which line is the correct opening?',
    options: [
      '$(\\Delta-\\nabla)f_0 = (f_1-f_0) - (f_0-f_{-1}) = f_1 - 2f_0 + f_{-1}$',
      '$(\\Delta-\\nabla)f_0 = (f_1-f_0) + (f_0-f_{-1}) = f_1 + f_{-1}$',
      '$\\delta^2 f_0 = (f_1-f_0)(f_0-f_{-1})$',
      '$\\Delta - \\nabla = \\delta$, so squaring both sides gives $\\delta^2$',
    ],
    answer: 0,
    explain: 'Both sides must reduce to the same combination of ordinates: $\\delta^2 f_0 = \\delta(f_{1/2}-f_{-1/2}) = (f_1-f_0)-(f_0-f_{-1}) = f_1-2f_0+f_{-1}$.',
  },
  'What a difference table tells you': {
    q: 'The $n$th differences of a tabulated function are constant and the $x$-values are equally spaced. What can you conclude?',
    options: [
      'The function is a polynomial of degree $n$',
      'The function is a polynomial of degree $n+1$',
      'The function is an exponential',
      'Nothing can be concluded without the exact formula',
    ],
    answer: 0,
    explain: 'This is the converse of Shanker Rao Theorem 3.1: constant $n$th differences at equal intervals mean the data comes from a polynomial of degree $n$.',
  },
  'Error propagation and correction in a difference table': {
    q: 'An error $\\varepsilon$ sits in one entry of a difference table. How does it spread?',
    options: [
      'Fan-wise: it enters every column below it, with binomial coefficients $1, -1$ then $1, -2, 1$ and so on',
      'It stays in its own column and is not amplified',
      'It is divided by $h$ at every step',
      'It only affects the highest-difference column',
    ],
    answer: 0,
    explain: 'The error propagates fan-wise with the binomial coefficients of $(1-x)^n$: $1$, $1,-1$, $1,-2,1$, $1,-3,3,-1$ — so high-order differences amplify a small mistake enormously.',
  },
};

export default {
  id: 'differences',
  chapter: 6,
  title: 'Finite Differences',
  wave: 'diff',
  sources: ['Shanker Rao Ch 3', 'Chapra Ch 2'],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "A census every year, a temperature reading every hour, a rocket's altitude sampled every 25 seconds — the world hands over **tables of numbers, not formulas**. Yet the questions are the same as ever: what is the underlying pattern? What is the value between two rows? How fast is it changing?" },
        { type: "p", text: "Calculus answers such questions for formulas. For tables, the finite-difference calculus is the replacement toolkit: an algebra performed **on the table itself** — subtract neighbours, average neighbours, shift the frame — that reveals the degree of the pattern and powers every interpolation formula in the next chapter." },
        { type: "p", text: "This chapter also carries the course's favourite proof questions: operator identities like $\\Delta - \\nabla \\equiv \\delta^2$ and $2\\mu\\delta \\equiv \\Delta + \\nabla$, proved by expanding both sides on plain ordinates $y_{-1}, y_0, y_1$." },
        { type: "list", items: [
          "Build a forward-difference table for any data.",
          "Read the degree of the underlying polynomial off the table.",
          "Speak the operator language: $\\Delta$, $\\nabla$, $\\delta$, $\\mu$, $E$.",
          "Prove operator identities by expansion on ordinates.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "One move starts everything: **subtract each number from its next-door neighbour.** For data at equal spacing $h$, the first differences $\\Delta y_i = y_{i+1} - y_i$ expose the trend; differencing again exposes the trend of the trend; and for a polynomial, some depth of differencing goes **constant** — that depth is the degree." },
        { type: "math", tex: "\\Delta y_i = y_{i+1} - y_i, \\qquad \\Delta^2 y_i = \\Delta y_{i+1} - \\Delta y_i, \\qquad \\ldots" },
        { type: "p", text: "The five operators are five points of view on the same table: $\\Delta$ looks **forward**, $\\nabla$ looks **backward**, $\\delta$ straddles the middle, $\\mu$ **averages** two neighbours, and $E$ just **shifts** the index. Identities among them are proved by one honest method: expand both sides into combinations of ordinates and compare." },
        { type: "note", text: "Everything assumes **equal spacing** $h$. If the $x$-values are uneven, this whole toolkit is off and the divided-difference (Lagrange) world of the next chapter takes over." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "p", text: "Operator notation looks like a new language; it is really five one-line definitions plus a subscript convention." },
        { type: "table", head: ["Symbol", "Definition", "In words"], rows: [
          ["$y_0$", "the chosen starting row", "any row can be the base — the subscripts are relative"],
          ["$h$", "the equal spacing between $x$-values", "step size"],
          ["$\\Delta y_i = y_{i+1} - y_i$", "forward difference", "next minus me"],
          ["$\\nabla y_i = y_i - y_{i-1}$", "backward difference", "me minus previous"],
          ["$\\delta y_{i+1/2} = y_{i+1} - y_i$", "central difference", "straddles the gap"],
          ["$\\mu y_i = \\tfrac{1}{2}(y_{i+1/2} + y_{i-1/2})$", "averaging operator", "the mean of neighbours"],
          ["$E y_i = y_{i+1}$", "shift operator", "move one row down"],
        ] },
        { type: "p", text: "A subscript counts rows from the base: $y_4$ is four steps from $y_0$, whatever $x$-value that happens to be." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "Take the humblest interesting table — $y = x^2$ at $x = 0, 1, 2, 3$ — and difference it by hand." },
        { type: "table", head: ["$x$", "$y$", "$\\Delta y$", "$\\Delta^2 y$"], rows: [
          ["0", "0", "1", "2"],
          ["1", "1", "3", "2"],
          ["2", "4", "5", ""],
          ["3", "9", "", ""],
        ] },
        { type: "p", text: "First differences: $1, 3, 5$ — the odd numbers, growing by 2 each step. Second differences: $2, 2$ — **constant**. That flat row is the fingerprint: a polynomial whose $k$-th differences are constant has degree $k$, and here the second differences flattening at 2 say 'quadratic' without any guessing." },
        { type: "p", text: "Same table, backward view: $\\nabla y_2 = 4 - 1 = 3$, $\\nabla y_1 = 1 - 0 = 1$ — the same numbers as $\\Delta$, one row lower. Forward and backward are the same ladder seen from opposite sides, which is exactly why identities like $\\Delta - \\nabla \\equiv \\delta^2$ hold." },
        { type: "exam", text: "Layout habit: the diagonal difference table above is the expected format — top-left to bottom-right diagonals, one column per difference order, blanks below the staircase. The proof identities then just manipulate these columns." },
      ],
    },
    {
      heading: 'The forward difference operator and the difference table',
      blocks: [
        {
          type: 'p',
          text: 'Let $y = f(x)$ be known at the equidistant points $x_0, x_1, \\dots, x_n$ with $x_r = x_0 + rh$. The **first forward differences** are $y_1 - y_0,\\ y_2 - y_1,\\dots$ and the operator that produces them is $\\Delta$: $\\Delta f(x) = f(x+h) - f(x)$, where $h$ is the **interval of differencing**. Differencing again gives the second differences, and so on: $\\Delta^r f(x) = \\Delta^{r-1}\\Delta f(x)$.',
        },
        { type: 'math', tex: '\\Delta y_0 = y_1 - y_0,\\qquad \\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0 = y_2 - 2y_1 + y_0' },
        {
          type: 'p',
          text: '**How the table is built, column by column.** Write $x_0,\\dots,x_n$ in the first column and $y_0,\\dots,y_n$ in the second. Each entry of the next column is the entry of the column before it minus the entry above it, and it is written on the lower of the two rows it comes from. Each column has one entry fewer than the column before it.',
        },
        {
          type: 'table',
          head: ['$x$', '$f(x) = x^4$', '1st', '2nd', '3rd', '4th', '5th'],
          rows: [
            ['$-2$', '16', '', '', '', '', ''],
            ['$-1$', '1', '$-15$', '', '', '', ''],
            ['$0$', '0', '$-1$', '$14$', '', '', ''],
            ['$1$', '1', '$1$', '$2$', '$-12$', '', ''],
            ['$2$', '16', '$15$', '$14$', '$12$', '$24$', ''],
            ['$3$', '81', '$65$', '$110$', '$36$', '$24$', '$0$'],
            ['$4$', '256', '$175$', '', '$60$', '$24$', '$0$'],
          ],
        },
        {
          type: 'p',
          text: 'This is Chapra & Canale\'s Example 1: the difference table of $f(x) = x^4$ for $x = -2$ to $4$ at $h = 1$. The first entry $y_0$ is the **leading term**; $\\Delta y_0, \\Delta^2 y_0, \\dots$ are the **leading differences**. Differences with the same subscript run down a diagonal (Chapra calls the forward table a *diagonal* table; the backward table has an upward-sloping diagonal).',
        },
        {
          type: 'note',
          text: '**Check your arithmetic with the column-sum rule** (Shanker Rao §3.2.1 and Chapra problem 7(c)): the sum of the entries of any column equals the difference between the last and the first entry of the preceding column. For the table above, $\\Delta y$ sums to $-15-1+1+15+65+175 = 240 = 256 - 16$.',
        },
        {
          type: 'p',
          text: '**What the table buys you** (Chapra §2.1): it (i) shows how a function behaves, in particular its derivatives; (ii) exposes errors in the data, because the error also spreads into the differences; (iii) fills missing values; and (iv) extends the list of values.',
        },
        {
          type: 'exam',
          text: 'If the question says "construct the difference table", write $x$, then $y$, then each difference column in full, one entry per row, with the sign. Then read the leading differences off the table: they are the numbers you plug into Newton\'s forward formula. Never leave a column half-finished — the marks are for the whole table.',
        },
      ],
    },
    {
      heading: 'Backward, central and averaging operators',
      blocks: [
        {
          type: 'p',
          text: 'The **backward difference operator** $\\nabla$ looks the other way: $\\nabla f(x) = f(x) - f(x-h)$, so $\\nabla y_1 = y_1 - y_0$, $\\nabla y_2 = y_2 - y_1$. In operator form, $\\nabla \\equiv 1 - E^{-1} = E^{-1}\\Delta$.',
        },
        {
          type: 'p',
          text: 'The **central difference operator** $\\delta$ straddles the point: $\\delta f(x) = f(x+h/2) - f(x-h/2)$, i.e. $\\delta y_{1/2} = y_1 - y_0$, $\\delta y_{3/2} = y_2 - y_1$. Higher orders: $\\delta^2 y_1 = \\delta y_{3/2} - \\delta y_{1/2}$. The **averaging (mean) operator** $\\mu$ averages the two neighbours: $\\mu f(x) = \\tfrac{1}{2}\\left[f(x+h/2) + f(x-h/2)\\right]$.',
        },
        { type: 'math', tex: '\\delta \\equiv E^{1/2} - E^{-1/2},\\qquad \\mu \\equiv \\tfrac{1}{2}\\left(E^{1/2} + E^{-1/2}\\right),\\qquad \\nabla \\equiv 1 - E^{-1}' },
        {
          type: 'p',
          text: 'In the same numerical case the same number appears in the same position whether you read it forward, backward or centrally — the forward, backward and central tables are three layouts of one set of numbers. That is why an error shows up identically in all three.',
        },
        {
          type: 'table',
          head: ['$x$', '$y$', '$\\Delta y$', '$\\Delta^2 y$', '$\\nabla y$', '$\\delta y_{1/2}$'],
          rows: [
            ['$0$', '1', '', '', '', ''],
            ['$1$', '3', '$2$', '', '$2$', '$2$'],
            ['$2$', '7', '$4$', '$2$', '$4$', '$4$'],
            ['$3$', '13', '$6$', '$2$', '$6$', '$6$'],
            ['$4$', '21', '$8$', '$2$', '$8$', '$8$'],
          ],
        },
        {
          type: 'p',
          text: 'Read across: the forward column $2,4,6,8$, the backward column $2,4,6,8$ and the central column $2,4,6,8$ hold the same numbers; only the layout differs.',
        },
        {
          type: 'note',
          text: '**Sign trap.** $\\nabla$ subtracts the value *below* from the value *above* ($y_i - y_{i-1}$), so it is positive when the function increases. The central difference $\\delta$ is written with half-indices ($\\delta y_{1/2}$, $\\delta^2 y_1$) — the subscript tells you where the difference is centred.',
        },
      ],
    },
    {
      heading: 'The shift operator E and the operator relations',
      blocks: [
        {
          type: 'p',
          text: 'The **shift (displacement) operator** $E$ moves you one step along the table: $Ef(x) = f(x+h)$, so $Ey_0 = y_1$, $E^2y_0 = y_2$, $E^{-1}y_0 = y_{-1}$. It is a symbol, not an algebraic sum.',
        },
        {
          type: 'p',
          text: 'Because $\\Delta f(x) = Ef(x) - f(x)$, the two operators are tied together, and the rest of the relations follow:',
        },
        { type: 'math', tex: '\\Delta \\equiv E - 1,\\qquad E \\equiv 1 + \\Delta,\\qquad \\nabla \\equiv 1 - E^{-1} = E^{-1}\\Delta,\\qquad \\delta \\equiv E^{1/2} - E^{-1/2} = E^{-1/2}\\Delta' },
        {
          type: 'p',
          text: 'All of $\\Delta, \\nabla, \\delta, E, \\mu$ commute with one another, so the order in which you write a product does not matter — that is what makes the "method of separation of symbols" work. Shanker Rao also links the operators to the derivative operator $D$ through Taylor\'s series: $E \\equiv e^{hD}$, hence $hD = \\log E = \\log(1+\\Delta) = \\Delta - \\tfrac{\\Delta^2}{2} + \\tfrac{\\Delta^3}{3} - \\cdots$.',
        },
        {
          type: 'table',
          head: ['Relation', 'Meaning'],
          rows: [
            ['$\\Delta = E - 1$', 'forward difference = shift minus identity'],
            ['$\\nabla = 1 - E^{-1}$', 'backward difference = identity minus inverse shift'],
            ['$\\nabla E = \\Delta = E\\nabla$', 'the backward difference of the shifted row is the forward difference'],
            ['$\\delta = E^{1/2} - E^{-1/2}$', 'central difference = half shift forward minus half shift back'],
            ['$\\mu = \\tfrac{1}{2}(E^{1/2}+E^{-1/2})$', 'mean of the two half-shifted values'],
            ['$E^{1/2} = \\mu + \\tfrac{1}{2}\\delta$', 'half shift = mean plus half the central difference'],
            ['$E^{-1/2} = \\mu - \\tfrac{1}{2}\\delta$', 'inverse half shift = mean minus half the central difference'],
            ['$(1+\\Delta)(1-\\nabla) = 1$', 'forward and backward operators are inverses of each other'],
          ],
        },
        {
          type: 'note',
          text: 'The last three rows are proofs 10, 11 and 13 on the teacher\'s handwritten "13 proofs" board page; they are the quickest way to get $\\Delta$ and $\\nabla$ into a form where a question can be answered.',
        },
        {
          type: 'exam',
          text: 'When a question says "prove that $\\Delta - \\nabla = \\delta^2$", do **not** expand everything to first principles if you can avoid it — write the operator forms on one line, substitute, and only then go back to the definitions for the final check. Keep the teacher\'s notation ($\\Delta$, $\\nabla$, $\\delta$, $\\mu$, $E$, $f_0$, $f_{1/2}$).',
        },
      ],
    },
    {
      heading: 'Proving the identities the papers ask for',
      blocks: [
        {
          type: 'p',
          text: 'Three identities come up repeatedly in the papers (Fall 2023, Spring 2023): $\\Delta - \\nabla \\equiv \\delta^2$, $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$, and $\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}$. Chapra\'s problem list (Ch.2, Q9) and the teacher\'s handwritten proofs give exactly these; learn the proofs, not just the results.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**$\\Delta - \\nabla \\equiv \\delta^2$** — go back to the definitions: both sides equal $f_1 - 2f_0 + f_{-1}$.',
            '**$\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$** — square $\\mu = \\tfrac{1}{2}(E^{1/2}+E^{-1/2})$ and use $E + E^{-1} = 2 + \\delta^2$.',
            '**$\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}$** — every one of the four is $E - 1$.',
            '**$2\\mu\\delta \\equiv \\Delta + \\nabla$** — the mean-times-central-difference identity (Chapra Q9(h)).',
          ],
        },
        {
          type: 'note',
          text: '**Source discrepancy — write the pair the way Chapra does it.** The course summary lists "$\\mu = \\tfrac{1}{2}(\\Delta + \\nabla)$". Chapra Ch.2 Q9(h),(i) and the operator algebra both give **$2\\mu\\delta \\equiv \\Delta + \\nabla$**, i.e. $\\mu\\delta = \\tfrac{1}{2}(\\Delta+\\nabla)$ — the factor $\\delta$ is missing from the summary line. Check it yourself with $f(x) = x^2$, $h = 1$: $\\tfrac{1}{2}(\\Delta+\\nabla)f = 2x$, but $\\mu f = x^2 + \\tfrac{1}{4}$. The paper-ready statements are the three boxed identities above.',
        },
        {
          type: 'p',
          text: '**Why they matter.** $\\delta^2 = \\Delta - \\nabla$ says the second central difference is the forward difference minus the backward one; $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$ turns the mean operator into a function of $\\delta$ alone, which is what makes Stirling\'s and Bessel\'s formulae work; and $\\Delta = \\delta E^{1/2}$ is the bridge from the difference-table view of a table to the central-difference view used in Chapter 7.',
        },
        {
          type: 'exam',
          text: 'Proofs are 5–6 mark questions. Write the target identity on the first line, then three or four lines of algebra, then the conclusion on its own line with a box. The teacher\'s own note on the board page: "for $f_n$, proofs 9 & 10 — better use $f_n$ instead of $f_0$". Either index is accepted; be consistent.',
        },
      ],
    },
    {
      heading: 'What a difference table tells you',
      blocks: [
        {
          type: 'p',
          text: '**The shape of the function.** Shanker Rao Theorem 3.1: the $n$th differences of a polynomial of degree $n$ are constant when the values of the independent variable are at equal intervals; and the $(n+1)$st differences of that polynomial are zero. The converse also holds: if the $n$th differences of a tabulated function are constant and the $x$-values are equally spaced, then the function is a polynomial of degree $n$.',
        },
        {
          type: 'p',
          text: '**The $n$th difference of a polynomial.** Differencing $f(x) = a_0x^n + a_1x^{n-1} + \\dots$ reduces the degree by one each time, so $\\Delta^n f(x) = a_0\\, n!\\, h^n$, a constant. The higher differences of a degree-$n$ polynomial are all zero.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Constant column → polynomial.** Constant $n$th differences mean a degree-$n$ polynomial (Chapra: "the $n$th differences of an exact polynomial of degree $n$ are constant", and "the $(n+1)$st differences of that polynomial are zero").',
            '**Rounded data.** When the tabulated values are rounded to $d$ decimals, each carries an error up to $\\pm\\tfrac{1}{2}\\times 10^{-d}$; in the worst case the error in the $n$th difference is $\\pm 2^{\,n-1}\\times 10^{-d}$ (Chapra §2.1).',
            '**Missing values.** If one entry is missing, assume the lowest degree that fits the data and use the vanishing of the highest difference (see the Newton binomial formula in Chapter 7).',
            '**Next term of a series.** If the second differences of a series are constant, the series is quadratic and the next term follows immediately (Example 4 below).',
          ],
        },
        {
          type: 'note',
          text: 'Constant differences are a property of **equally spaced** data. For unequal spacing the constant-difference test does not apply — that is exactly why Lagrange\'s formula and divided differences exist.',
        },
      ],
    },
    {
      heading: 'Error propagation and correction in a difference table',
      blocks: [
        {
          type: 'p',
          text: 'When the data are rounded, or when one entry is copied wrongly, the error spreads through the table **fan-wise** (triangularly): the error appears in every difference below it, with the binomial coefficients of $(1-x)^n$ as multipliers — $1$ in the first column, then $1, -1$, then $1, -2, 1$, then $1, -3, 3, -1$, and so on. This is why the high-order columns are so sensitive: a mistake of $0.001$ in one value shows up as $0.006$ in the third differences.',
        },
        {
          type: 'table',
          head: ['Column', 'Multipliers of $\\varepsilon$', 'Binomial row'],
          rows: [
            ['1st', '$1$', '$(1-x)^1$'],
            ['2nd', '$1,\\ -1$', '$(1-x)^2$'],
            ['3rd', '$1,\\ -3,\\ 3,\\ -1$', '$(1-x)^3$'],
            ['4th', '$1,\\ -4,\\ 6,\\ -4,\\ 1$', '$(1-x)^4$'],
            ['5th', '$1,\\ -5,\\ 10,\\ -10,\\ 5,\\ -1$', '$(1-x)^5$'],
          ],
        },
        {
          type: 'p',
          text: '**Locating the error.** Difference the table and look for a column whose pattern is broken. If the data should come from a polynomial of degree $n$, the $n$th differences must be constant; the multipliers of the error in that column tell you the size of the mistake. Chapra\'s rule of thumb:',
        },
        { type: 'math', tex: '\\text{Error} = \\frac{\\text{largest value in the offending column}}{\\text{corresponding coefficient of } \\varepsilon \\text{ in that column}}' },
        {
          type: 'p',
          text: '**Correcting it.** Fix the suspect value, re-difference, and check that the table is now clean (constant $n$th differences, zero $(n+1)$st differences). If the function is known analytically, recomputing the value at the offending $x$ is better than estimating it.',
        },
        {
          type: 'note',
          text: 'Chapra is careful about the limits of this: with rounded data the error is only an **estimate**, and with two or more errors the fan pattern overlaps and is much harder to read. Shanker Rao\'s Example 3.24 does the same job for a degree-5 polynomial (the printed value $f(3) = 254$ is corrected to $244$).',
        },
        {
          type: 'exam',
          text: 'For "locate and correct the error", the examiner wants: (1) the full difference table; (2) the broken pattern identified; (3) the size of the error; (4) the corrected value; (5) a check by re-differencing. Skip (5) and you lose the last mark.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Forward difference operator', tex: '\\Delta f(x) = f(x+h) - f(x)', where: 'equally spaced data, $h$ = interval of differencing' },
    { label: 'Backward difference operator', tex: '\\nabla f(x) = f(x) - f(x-h) = \\left(1 - E^{-1}\\right)f(x)', where: 'equally spaced data' },
    { label: 'Central difference operator', tex: '\\delta f(x) = f(x+h/2) - f(x-h/2) = \\left(E^{1/2} - E^{-1/2}\\right)f(x)', where: 'central differences' },
    { label: 'Averaging (mean) operator', tex: '\\mu f(x) = \\tfrac{1}{2}\\left[f(x+h/2) + f(x-h/2)\\right]', where: 'mean of the two half-shifted values' },
    { label: 'Shift operator', tex: 'Ef(x) = f(x+h) = (1+\\Delta)f(x)', where: 'displacement operator' },
    { label: 'Δ − ∇ = δ²', tex: '\\Delta - \\nabla \\equiv \\delta^2', where: 'Fall 2023 and Spring 2023 papers' },
    { label: 'μ² = 1 + ¼δ²', tex: '\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2', where: 'Fall 2023 paper' },
    { label: 'Δ = ∇E = E∇ = δE^{1/2}', tex: '\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}', where: 'Spring 2023 paper' },
    { label: '2μδ = Δ + ∇', tex: '2\\mu\\delta \\equiv \\Delta + \\nabla', where: 'Chapra operator list, Ch.2 Q9(h)' },
    { label: 'E^{1/2} = μ + ½δ', tex: 'E^{1/2} \\equiv \\mu + \\tfrac{1}{2}\\delta', where: "teacher's proof 10" },
    { label: '(1 + Δ)(1 − ∇) = 1', tex: '(1+\\Delta)(1-\\nabla) \\equiv 1', where: "teacher's proof 11" },
    { label: 'Error in a difference table', tex: '\\text{Error} = \\dfrac{\\text{largest value in the column}}{\\text{coefficient of } \\varepsilon \\text{ in that column}}', where: 'Chapra §2.2' },
  ],
  examples: [
    {
      title: 'Construct the forward difference table of $f(x) = x^4$ for $x = -2$ to $4$',
      question: 'Construct the forward difference table for the function $f(x) = x^4$ for $x = -2$ to $x = 4$ at an interval of $1$, and state what the table tells you about the function.',
      source: 'Chapra & Canale Ch.2, Example 1',
      marks: 6,
      steps: [
        { t: 'Write the ordinates: $f(-2)=16,\\ f(-1)=1,\\ f(0)=0,\\ f(1)=1,\\ f(2)=16,\\ f(3)=81,\\ f(4)=256$.', m: '1 mark' },
        { t: 'First column: $\\Delta y = -15,\\ -1,\\ 1,\\ 15,\\ 65,\\ 175$.', m: '2 marks' },
        { t: 'Second column: $\\Delta^2 y = 14,\\ 2,\\ 14,\\ 50,\\ 110$.', m: '1 mark' },
        { t: 'Third column: $\\Delta^3 y = -12,\\ 12,\\ 36,\\ 60$.', m: '1 mark' },
        { t: 'Fourth column: $\\Delta^4 y = 24,\\ 24,\\ 24$; fifth column: $\\Delta^5 y = 0,\\ 0$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\Delta^4 y = 24,\\ 24,\\ 24 \\text{ (constant)},\\quad \\Delta^5 y = 0,\\ 0}$ — the fourth differences are constant and the fifth are zero, exactly as for a degree-4 polynomial at equal intervals.',
      note: 'Trap: writing the difference in the wrong row (it belongs to the *lower* of the two rows) or dropping the minus sign in a decreasing column.',
      explanation: [
        'Differencing a polynomial lowers its degree by one and multiplies the leading coefficient by the degree and by $h$: $\\Delta^n f(x) = a_0\\,n!\\,h^n$. So a degree-4 polynomial has constant fourth differences ($a_0 4! h^4 = 1\\cdot 24\\cdot 1 = 24$) and zero fifth differences.',
        'That is the whole point of the table: it is a cheap test of the *shape* of the data. Constant $n$th differences at equal intervals mean the data came from a degree-$n$ polynomial, and the next term of the series can be read off without any further theory.',
      ],
    },
    {
      title: 'Prove that $\\Delta - \\nabla \\equiv \\delta^2$',
      question: 'Prove that the forward difference operator minus the backward difference operator is identically equal to the square of the central difference operator, $\\Delta - \\nabla \\equiv \\delta^2$.',
      source: 'Fall 2023 & Spring 2023 papers; teacher\'s proof 9',
      marks: 6,
      steps: [
        { t: 'Start from the definitions: $\\Delta f_0 = f_1 - f_0$ and $\\nabla f_0 = f_0 - f_{-1}$.', m: '1 mark' },
        { t: '$(\\Delta - \\nabla)f_0 = \\Delta f_0 - \\nabla f_0 = (f_1 - f_0) - (f_0 - f_{-1}) = f_1 - 2f_0 + f_{-1}$.', m: '2 marks' },
        { t: 'Now the central difference: $\\delta f_{1/2} = f_1 - f_0$ and $\\delta f_{-1/2} = f_0 - f_{-1}$, so $\\delta^2 f_0 = \\delta f_{1/2} - \\delta f_{-1/2}$.', m: '1 mark' },
        { t: '$\\delta^2 f_0 = (f_1 - f_0) - (f_0 - f_{-1}) = f_1 - 2f_0 + f_{-1}$.', m: '1 mark' },
        { t: 'Both sides are the same combination of ordinates, so $\\Delta - \\nabla \\equiv \\delta^2$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\Delta - \\nabla \\equiv \\delta^2}$',
      note: 'Trap: writing $\\nabla f_0 = f_0 - f_1$. The backward operator subtracts the value *below* the current one: $\\nabla f_0 = f_0 - f_{-1}$.',
      explanation: [
        'This is proof 9 on the teacher\'s handwritten board page, and Chapra lists the same identity as Ch.2 Q9(c): $\\delta^2 = \\Delta - \\nabla = \\Delta\\nabla = \\nabla\\Delta$.',
        'The operator-algebra version is even shorter: $\\Delta - \\nabla = (E-1) - (1-E^{-1}) = E - 2 + E^{-1} = (E^{1/2} - E^{-1/2})^2 = \\delta^2$. Use whichever your examiner has seen before — but do not mix the two styles halfway through.',
        'The teacher\'s tip from the board: for this proof and proof 10 it is cleaner to write the argument at a general $f_n$ rather than at $f_0$.',
      ],
    },
    {
      title: 'Prove that $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$',
      question: 'Prove that the square of the averaging operator equals one plus one quarter of the square of the central difference operator: $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$.',
      source: 'Fall 2023 paper; teacher\'s proof 8',
      marks: 6,
      steps: [
        { t: 'By definition $\\mu \\equiv \\tfrac{1}{2}\\left(E^{1/2} + E^{-1/2}\\right)$, so $\\mu^2 = \\tfrac{1}{4}\\left(E^{1/2} + E^{-1/2}\\right)^2$.', m: '2 marks' },
        { t: 'Expand: $\\mu^2 = \\tfrac{1}{4}\\left(E + 2 + E^{-1}\\right)$.', m: '1 mark' },
        { t: 'Since $\\delta = E^{1/2} - E^{-1/2}$, we have $\\delta^2 = E - 2 + E^{-1}$, i.e. $E + E^{-1} = \\delta^2 + 2$.', m: '2 marks' },
        { t: 'Substitute: $\\mu^2 = \\tfrac{1}{4}\\left[(\\delta^2 + 2) + 2\\right] = \\tfrac{1}{4}\\left(\\delta^2 + 4\\right) = 1 + \\tfrac{1}{4}\\delta^2$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2}$',
      note: 'Trap: forgetting that $E \\cdot E^{-1} = 1$, so $\\left(E^{1/2}+E^{-1/2}\\right)^2 = E + 2 + E^{-1}$ and not $E + E^{-1}$.',
      explanation: [
        'Chapra writes the same result as $\\mu = \\sqrt{1 + \\tfrac{1}{4}\\delta^2}$ in the operator table on p.37, and as Q9(e). It is the identity that makes Stirling\'s and Bessel\'s formulae possible, because it expresses the mean operator purely in terms of the central difference.',
        'A quick sanity check with $f(x) = x^2$, $h = 1$: $\\delta f(0) = f(0.5)-f(-0.5) = 0$, so $\\mu^2 f(0)$ should equal $f(0) = 0$. Indeed $\\mu f(0) = \\tfrac{1}{2}(0.25+0.25) = 0.25$, and $\\left(\\tfrac{1}{4}\\delta^2 + 1\\right)f(0) = f(0) = 0$ — consistent.',
      ],
    },
    {
      title: 'Prove that $\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}$',
      question: 'Show that the forward difference operator satisfies $\\Delta = \\nabla E = E\\nabla = \\delta E^{1/2}$.',
      source: 'Spring 2023 paper',
      marks: 6,
      steps: [
        { t: '$\\nabla E f(x) = (1-E^{-1})E f(x) = Ef(x) - f(x) = f(x+h) - f(x) = \\Delta f(x)$, so $\\nabla E \\equiv \\Delta$.', m: '2 marks' },
        { t: '$E\\nabla f(x) = E\\left[f(x) - f(x-h)\\right] = f(x+h) - f(x) = \\Delta f(x)$, so $E\\nabla \\equiv \\Delta$.', m: '1 mark' },
        { t: '$\\delta E^{1/2} f(x) = \\left(E^{1/2}-E^{-1/2}\\right)E^{1/2}f(x) = Ef(x) - f(x) = \\Delta f(x)$, so $\\delta E^{1/2} \\equiv \\Delta$.', m: '2 marks' },
        { t: 'All four operators are therefore $E - 1$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}}$',
      note: 'Trap: writing $\\nabla E = E^{-1}\\Delta E$ and then cancelling wrongly — $\\nabla E = E^{-1}\\Delta E = \\Delta$ because $\\Delta$ commutes with $E$.',
      explanation: [
        'This is the Spring 2023 identity. Chapra splits it into Q9(a) $\\Delta = \\sqrt{E}\\,\\delta$ and Q9(b) $\\Delta = E\\nabla$, with Q9(g) $\\nabla = E^{-1}\\Delta$ closing the loop.',
        'It matters because the central-difference formulae of Chapter 7 (Gauss, Stirling, Bessel) are written with $\\delta$ and $E^{1/2}$, while Newton\'s forward and backward formulae are written with $\\Delta$ and $\\nabla$. This identity lets you move between the two languages.',
      ],
    },
    {
      title: 'Find the sixth term of the series 8, 12, 19, 29, 42',
      question: 'By constructing a difference table and taking the second order differences as constant, find the sixth term of the series 8, 12, 19, 29, 42.',
      source: 'Shanker Rao Ch.3, Example 3.4',
      marks: 4,
      steps: [
        { t: 'First differences: $12-8=4,\\ 19-12=7,\\ 29-19=10,\\ 42-29=13$.', m: '1 mark' },
        { t: 'Second differences: $7-4=3,\\ 10-7=3,\\ 13-10=3$ — constant.', m: '1 mark' },
        { t: 'The next first difference is $13+3 = 16$, so the sixth term is $42+16 = 58$.', m: '2 marks' },
      ],
      answer: '$\\boxed{K = 58}$',
      note: 'Trap: adding the second difference directly to the last term ($42+3$) instead of first continuing the first-difference row.',
      explanation: [
        'Constant second differences mean the series is quadratic, so the difference table alone gives the next term — no formula needed.',
        'The same idea is Shanker Rao Example 3.14: given $f(2)=8, f(3)=3, f(4)=0, f(5)=-1, f(6)=0$ and told that $\\Delta^3 f = \\Delta^4 f = 0$, the missing first term is found from $f(1) = E^{-1}f_2 = (1-\\Delta+\\Delta^2)f_2 = 8 - (-5) + 2 = 15$.',
      ],
    },
    {
      title: 'Find $\\Delta^5 u_0$ for $u_0 = 3, u_1 = 12, u_2 = 81, u_3 = 200, u_4 = 100, u_5 = 8$',
      question: 'Given $u_0 = 3,\\ u_1 = 12,\\ u_2 = 81,\\ u_3 = 200,\\ u_4 = 100$ and $u_5 = 8$, find $\\Delta^5 u_0$.',
      source: 'Shanker Rao Ch.3, Example 3.13',
      marks: 5,
      steps: [
        { t: '$\\Delta u_0 = (E-1)u_0$, so $\\Delta^5 u_0 = (E-1)^5 u_0 = (E^5 - 5E^4 + 10E^3 - 10E^2 + 5E - 1)u_0$.', m: '2 marks' },
        { t: '$= u_5 - 5u_4 + 10u_3 - 10u_2 + 5u_1 - u_0$.', m: '1 mark' },
        { t: '$= 8 - 5(100) + 10(200) - 10(81) + 5(12) - 3$.', m: '1 mark' },
        { t: '$= 8 - 500 + 2000 - 810 + 60 - 3 = 755$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\Delta^5 u_0 = 755}$',
      note: 'Trap: the binomial signs alternate $-,+,-$; and the coefficients are the binomial coefficients $1,5,10,10,5,1$, not $1,4,6,4,1$.',
      explanation: [
        'The difference table route gives the same number: the first column of differences is $9, 69, 119, -100, -92$, the second $60, 50, -219, 8$, the third $-10, -269, 227$, the fourth $-259, 496$, and the fifth $755$.',
        'The operator route is shorter and is what the book uses: $\\Delta = E - 1$, so any $n$th difference is $(E-1)^n$ expanded by the binomial theorem — the coefficients are the binomial coefficients with alternating signs.',
      ],
    },
    {
      title: 'Locate and correct the error in a table of values',
      question: 'The following table contains an incorrect value of $f(x)$. Locate the error, suggest a possible cause and give a suitable correction: $x = 1,2,\\dots,10$, $f(x) = 37, 74, 135, 226, 353, 531, 739, 1010, 1341, 1738$.',
      source: 'Chapra & Canale Ch.2, Example 3',
      marks: 6,
      steps: [
        { t: 'Difference the table: the first differences are $37, 61, 91, 127, 178, 208, 271, 331, 397$; the second $24, 30, 36, 51, 30, 63, 60, 66$; the third $6, 6, 15, -21, 33, -3, 6$; the fourth $0, 9, -36, 54, -36, 9$.', m: '2 marks' },
        { t: 'The data should be a polynomial, so the fourth differences must be zero. They are not: the broken pattern is $1(9), -4(9), 6(9), -4(9), 1(9)$.', m: '2 marks' },
        { t: 'The multipliers are the binomial coefficients $1, -4, 6, -4, 1$, so the error is $9$.', m: '1 mark' },
        { t: 'Only $f(6)$ can produce that pattern: change $531$ to $531 - 9 = 522$.', m: '1 mark' },
      ],
      answer: '$\\boxed{f(6) = 522 \\text{ (the printed } 531 \\text{ was wrong)}}$',
      note: 'Trap: correcting the entry that is *starred* in the table. The error shows up in the fourth differences, not in the value you were given.',
      explanation: [
        'Check by re-differencing with the correction: the first differences become $37, 61, 91, 127, 169, 217, 271, 331, 397$, the second $24, 30, 36, 42, 48, 54, 60, 66$, the third all $6$ and the fourth all $0$ — a clean cubic.',
        'The likely cause is a mis-copied digit. Chapra adds the important caution: with *rounded* data the correction is only an estimate, and if there are two or more errors the fan patterns overlap and are much harder to read.',
      ],
    },
  ],
  flashcards: [
    { front: 'Define the forward difference operator $\\Delta$.', back: '$\\Delta f(x) = f(x+h) - f(x)$, where $h$ is the interval of differencing. $\\Delta y_0 = y_1 - y_0$, $\\Delta^2 y_0 = y_2 - 2y_1 + y_0$.' },
    { front: 'Define the backward difference operator $\\nabla$.', back: '$\\nabla f(x) = f(x) - f(x-h)$; $\\nabla y_1 = y_1 - y_0$, $\\nabla y_2 = y_2 - y_1$. In operator form $\\nabla \\equiv 1 - E^{-1} = E^{-1}\\Delta$.' },
    { front: 'Define the central difference operator $\\delta$ and the mean operator $\\mu$.', back: '$\\delta f(x) = f(x+h/2) - f(x-h/2)$, so $\\delta y_{1/2} = y_1 - y_0$. $\\mu f(x) = \\tfrac{1}{2}[f(x+h/2)+f(x-h/2)]$.' },
    { front: 'What is the shift operator $E$ and how does it relate to $\\Delta$?', back: '$Ef(x) = f(x+h)$ (shift/displacement operator). $\\Delta f(x) = Ef(x)-f(x)$, so $\\Delta \\equiv E - 1$ and $E \\equiv 1 + \\Delta$.' },
    { front: 'Prove $\\Delta - \\nabla \\equiv \\delta^2$.', back: 'Both sides equal $f_1 - 2f_0 + f_{-1}$: $(\\Delta-\\nabla)f_0 = (f_1-f_0)-(f_0-f_{-1})$ and $\\delta^2f_0 = \\delta f_{1/2}-\\delta f_{-1/2} = (f_1-f_0)-(f_0-f_{-1})$. Asked in Fall 2023 and Spring 2023.' },
    { front: 'Prove $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$.', back: '$\\mu = \\tfrac{1}{2}(E^{1/2}+E^{-1/2}) \\Rightarrow \\mu^2 = \\tfrac{1}{4}(E+2+E^{-1}) = \\tfrac{1}{4}(\\delta^2+4+2) = 1+\\tfrac{1}{4}\\delta^2$, using $\\delta^2 = E-2+E^{-1}$. Fall 2023 paper.' },
    { front: 'Show $\\Delta \\equiv \\nabla E \\equiv E\\nabla \\equiv \\delta E^{1/2}$.', back: 'All four are $E-1$: $\\nabla E = (1-E^{-1})E = E-1$; $E\\nabla = E(1-E^{-1}) = E-1$; $\\delta E^{1/2} = (E^{1/2}-E^{-1/2})E^{1/2} = E-1$. Spring 2023 paper.' },
    { front: 'Chapra Q9(h),(i): what connects $\\mu$, $\\delta$, $\\Delta$ and $\\nabla$?', back: '$2\\mu\\delta \\equiv \\Delta + \\nabla$, i.e. $\\mu\\delta = \\tfrac{1}{2}(\\Delta+\\nabla)$. (The course summary drops the $\\delta$ — check with $f=x^2$: $\\tfrac{1}{2}(\\Delta+\\nabla)f = 2x$ but $\\mu f = x^2+\\tfrac{1}{4}$.)' },
    { front: 'Theorem 3.1 (Shanker Rao): what do constant $n$th differences tell you?', back: 'If the $n$th differences of a tabulated function are constant and the $x$-values are equally spaced, the function is a polynomial of degree $n$; its $(n+1)$st differences are zero.' },
    { front: 'What are the four uses of a difference table?', back: 'Chapra §2.1: (i) examine how the function behaves, especially its derivatives; (ii) detect and correct errors in the data; (iii) fill missing values; (iv) extend the list of values.' },
    { front: 'How does an error spread through a difference table?', back: 'Fan-wise, with binomial coefficients: $1$; $1,-1$; $1,-2,1$; $1,-3,3,-1$; $1,-4,6,-4,1$ — the coefficients of $(1-x)^n$. A mistake of $\\varepsilon$ becomes $n\\varepsilon$ in the $n$th column.' },
    { front: 'Chapra\'s rule for the size of an error in a difference table.', back: '$\\text{Error} = \\dfrac{\\text{largest value in the offending column}}{\\text{coefficient of } \\varepsilon \\text{ in that column}}$. In Chapra Ex.3 the fourth differences read $0, 9, -36, 54, -36, 9$, i.e. $9 \\times (1,-4,6,-4,1)$, so the error is $9$ and $f(6) = 531-9 = 522$.' },
    { front: 'Rounded data: how big is the error in the $n$th difference?', back: 'Each rounded value carries up to $\\pm\\tfrac{1}{2}10^{-d}$; in the worst case the $n$th difference carries $\\pm 2^{\\,n-1}10^{-d}$ (Chapra §2.1).' },
    { front: 'Which operators commute, and what does that buy you?', back: '$\\Delta, \\nabla, \\delta, E, \\mu$ all commute with one another, so products may be reordered — this is the "method of separation of symbols", which lets one operator be written in terms of another.' },
  ],
  quiz: [
    {
      q: '$\\Delta^2 y_0$ for $y_0 = 1,\\ y_1 = 3,\\ y_2 = 7$ is',
      options: ['$2$', '$4$', '$6$', '$0$'],
      answer: 0,
      explain: '$\\Delta^2 y_0 = \\Delta y_1 - \\Delta y_0 = 4 - 2 = 2$.',
    },
    {
      q: 'The operator relation between $E$ and $\\Delta$ is',
      options: ['$E = 1 + \\Delta$', '$E = 1 - \\Delta$', '$E = \\Delta^2$', '$E = 1/\\Delta$'],
      answer: 0,
      explain: '$\\Delta f(x) = f(x+h)-f(x) = (E-1)f(x)$, so $E = 1+\\Delta$.',
    },
    {
      q: '$\\nabla E$ equals',
      options: ['$\\Delta$', '$E$', '$1-\\Delta$', '$\\delta$'],
      answer: 0,
      explain: '$\\nabla E = (1-E^{-1})E = E-1 = \\Delta$.',
    },
    {
      q: 'If the third differences of a tabulated function are constant and the $x$-values are equally spaced, the function is a polynomial of degree',
      options: ['$3$', '$2$', '$4$', 'unknown without more data'],
      answer: 0,
      explain: 'The converse of Theorem 3.1: constant $n$th differences at equal intervals mean a degree-$n$ polynomial.',
    },
    {
      q: 'An error $\\varepsilon$ in one entry appears in the third-difference column with multipliers',
      options: ['$1, -3, 3, -1$', '$1, -1$', '$1, -2, 1$', '$1, -4, 6, -4, 1$'],
      answer: 0,
      explain: 'The multipliers are the binomial coefficients of $(1-x)^n$: $1$; $1,-1$; $1,-2,1$; $1,-3,3,-1$ for the third column.',
    },
    {
      q: 'The identity $\\mu^2 \\equiv 1 + \\tfrac{1}{4}\\delta^2$ follows from',
      options: [
        '$\\mu = \\tfrac{1}{2}(E^{1/2}+E^{-1/2})$ and $\\delta = E^{1/2}-E^{-1/2}$',
        '$\\mu = E$ and $\\delta = E^{1/2}$',
        '$\\Delta = E - 1$ only',
        '$\\nabla = 1 - E^{-1}$ only',
      ],
      answer: 0,
      explain: 'Squaring $\\mu$ gives $\\tfrac{1}{4}(E+2+E^{-1})$, and $E+E^{-1} = \\delta^2+4$, so $\\mu^2 = 1+\\tfrac{1}{4}\\delta^2$.',
    },
    {
      q: 'In the forward difference table, the entry $\\Delta^2 y_1$ is written',
      options: [
        'on the row of $x_2$, in the second-difference column',
        'on the row of $x_1$, in the second-difference column',
        'on the row of $x_3$, in the third-difference column',
        'on the row of $x_2$, in the first-difference column',
      ],
      answer: 0,
      explain: '$\\Delta^2 y_1 = \\Delta y_2 - \\Delta y_1$ ends at $x_2$, so it sits on the $x_2$ row of the second-difference column.',
    },
    {
      q: '$\\Delta^5 u_0$ for $u_0 = 3,\\ u_1 = 12,\\ u_2 = 81,\\ u_3 = 200,\\ u_4 = 100,\\ u_5 = 8$ is',
      options: ['$755$', '$0$', '$-755$', '$1050$'],
      answer: 0,
      explain: '$u_5 - 5u_4 + 10u_3 - 10u_2 + 5u_1 - u_0 = 8 - 500 + 2000 - 810 + 60 - 3 = 755$.',
    },
    {
      q: 'Chapra: a table of $f(x)$ at $x = 1\\dots,10$ has fourth differences $0, 9, -36, 54, -36, 9$ while the data should be a polynomial. The error in the data is',
      options: ['$9$', '$3$', '$6$', '$36$'],
      answer: 0,
      explain: 'The pattern is $9(1,-4,6,-4,1)$, so the error is $9$; correcting $f(6) = 531$ to $522$ makes all fourth differences zero.',
    },
    {
      q: 'Which pair of operators is used for central differences in the middle of a table?',
      options: ['$\\delta$ and $\\mu$', '$\\Delta$ and $\\nabla$', '$E$ and $D$', '$\\mu$ and $D$'],
      answer: 0,
      explain: '$\\delta$ gives the central difference and $\\mu$ the mean; together they give Gauss, Stirling and Bessel formulae.',
    },
  ],
  solvers: [],
};
