// CSE 2201 (AUST) semester finals: Fall 2024, Spring 2024, Fall 2023, Spring 2023. Typed from the question papers.
// Model answers follow the class slides/notes and the exam rules in docs/EXAM-GUIDELINES.md.
// `module` links each item to the chapter that teaches it.
export default [
  {
    title: 'Fall 2024 semester final',
    meta: 'CSE 2201, AUST. 2 hours 30 minutes, 50 marks. Part A: 2 questions (answer any 3 of 5, then any 4 of 6). Part B: 1 question, answer all.',
    sets: [
      {
        name: 'Part A — Question 1',
        rule: 'Answer any 3 (3 × 3 = 9)',
        items: [
          {
            id: 'A1(a)', marks: 3, module: 'errors',
            q: 'Prove that the symmetric round-off error is one-half the chopping error at worst case.',
            answer: [
              'Chopping: the extra digits are simply discarded, so the error is always in one direction and at most one unit in the last place retained: $e_c = \\pm q$, $|e_c| \\le q$.',
              'Rounding: the discarded part is kept when it is at least half of $q$, so $|e_r| \\le q/2$.',
              'Rounding is therefore at most half the chopping error: $|e_r| \\le \\tfrac{1}{2}|e_c|$ in the worst case.',
              'The same number is produced whether the machine chops or rounds — which is why the **symmetric** round-off error is called symmetric: it lies in $[-q/2, q/2]$ about the true value.',
            ],
          },
          {
            id: 'A1(b)', marks: 3, module: 'differentiation',
            q: 'Derive the Richardson extrapolation formula using the three-point central difference formula for numerical differentiation.',
            answer: [
              'Three-point central difference: $D(h) = \\dfrac{f(x+h) - f(x-h)}{2h} = f\'(x) + \\dfrac{h^2}{6}f\'\'\'(x) + O(h^4)$.',
              'Halve the step: $D(h/2) = f\'(x) + \\dfrac{h^2}{24}f\'\'\'(x) + O(h^4)$.',
              'Eliminate the $h^2$ term: $R = \\dfrac{4D(h/2) - D(h)}{3} = f\'(x) + O(h^4)$.',
              'So $R$ is fourth-order accurate — the error term has gone from $O(h^2)$ to $O(h^4)$.',
            ],
          },
          {
            id: 'A1(c)', marks: 3, module: 'integration',
            q: "Derive Simpson's one-third rule from the general quadrature formula for numerical integration with equidistant ordinates.",
            answer: [
              'General quadrature with $n$ ordinates at spacing $h$: $\\int_a^b f(x)\\,dx \\approx \\sum_{i=0}^{n-1} w_i f(x_i)$, where the weights $w_i$ come from the Lagrange form of the interpolating polynomial.',
              'For three consecutive ordinates at $x_0, x_1 = x_0 + h, x_2 = x_0 + 2h$, the Lagrange weights are $w_0 = h/3$, $w_1 = 4h/3$, $w_2 = h/3$.',
              'Hence over one pair of intervals: $\\int_{x_0}^{x_2} f(x)\\,dx \\approx \\dfrac{h}{3}\\left[f(x_0) + 4f(x_1) + f(x_2)\\right]$ — Simpson\'s one-third rule.',
              'The error term is $-\\dfrac{(b-a)h^4}{180}f^{(4)}(\\xi)$, and the rule needs an **even** number of subintervals.',
            ],
          },
          {
            id: 'A1(d)', marks: 3, module: 'errors',
            q: 'Describe the following terms: (i) Condition Number (ii) Deflation (iii) Accuracy.',
            answer: [
              '**Condition number**: a measure of how much the output of a function changes when the input changes. For $u = f(x)$, the relative condition number is $\\left|\\dfrac{x f\'(x)}{f(x)}\\right|$; a large value means the problem is ill-conditioned and the relative error in the answer is amplified.',
              '**Deflation**: the removal of a known root from a polynomial. Dividing $p(x)$ by $(x - r)$ leaves a polynomial of one degree less, so the remaining roots can be found by repeating the process.',
              '**Accuracy**: how close a computed value is to the true value — the concern of **truncation** error (the model itself is inexact). It is the opposite of **precision**, which is how close repeated computations are to each other (the concern of round-off error).',
            ],
          },
          {
            id: 'A1(e)', marks: 3, module: 'differentiation',
            q: 'Explain the necessity of numerical differentiation. Prove that the truncation error of the second order central difference formula is $O(h^2)$.',
            answer: [
              'Necessity: the function is often only known at discrete points (from a table or measurement), and the derivative of that data has no closed form; so the derivative must be approximated from the data itself.',
              'Central difference: $f\'(x) \\approx \\dfrac{f(x+h) - f(x-h)}{2h}$.',
              'Expanding about $x$: $f(x+h) = f + hf\' + \\dfrac{h^2}{2}f\'\' + \\dfrac{h^3}{6}f\'\'\' + \\dots$ and $f(x-h) = f - hf\' + \\dfrac{h^2}{2}f\'\' - \\dfrac{h^3}{6}f\'\'\' + \\dots$.',
              'Subtracting and dividing by $2h$: $\\dfrac{f(x+h)-f(x-h)}{2h} = f\'(x) + \\dfrac{h^2}{6}f\'\'\'(x) + O(h^4)$.',
              'The truncation error is the term left over, $\\dfrac{h^2}{6}f\'\'\'(x)$, which is $O(h^2)$.',
            ],
          },
        ],
      },
      {
        name: 'Part A — Question 2',
        rule: 'Answer any 4 (6 × 4 = 24)',
        items: [
          {
            id: 'A2(a)', marks: 6, module: 'roots',
            q: 'The polynomial equation $x^4 - 5x^3 + 5x^2 + 5x - 6 = 0$ has a root at $x = -1$. Use synthetic division to find all remaining roots.',
            answer: [
              'Write the coefficients $1, -5, 5, 5, -6$ and bring down the leading 1.',
              '$b_1 = -5 + (-1)(1) = -6$; $b_2 = 5 + (-1)(-6) = 11$; $b_3 = 5 + (-1)(11) = -6$; $b_4 = -6 + (-1)(-6) = 0$.',
              'The remainder is 0, confirming $x = -1$ is a root, and the quotient is $x^3 - 6x^2 + 11x - 6$.',
              'Divide again: the quotient has $x = 1$ as a root, giving $x^2 - 5x + 6$; and that factors as $(x - 2)(x - 3)$.',
              'So the roots are $x = -1,\\; 1,\\; 2,\\; 3$.',
            ],
          },
          {
            id: 'A2(b)', marks: 6, module: 'elimination',
            q: 'Solve the following system of linear equation using Gauss Elimination with Partial Pivoting (show all necessary steps of the computation): $x + 2y - 3z = -4$, $-9x + 8y + 7z = 28$, $4x + 5y + 6z = 32$.',
            answer: [
              'Augmented matrix $\\left[\\begin{array}{ccc|c} 1 & 2 & -3 & -4 \\\\ -9 & 8 & 7 & 28 \\\\ 4 & 5 & 6 & 32 \\end{array}\\right]$.',
              'First pivot column: $|a_{21}| = 9 > |a_{11}| = 1$, so interchange $R_1$ and $R_2$.',
              '$R_2\' = R_2 + \\left(\\frac{1}{9}\\right)R_1 = [\\;0\\;\\;\\frac{26}{9}\\;\\;\\;-\\frac{20}{9}\\;|\\;-\\frac{8}{9}\\;]$, $R_3\' = R_3 + \\left(\\frac{4}{9}\\right)R_1 = [\\;0\\;\\;\\frac{77}{9}\\;\\;\\;\\frac{82}{9}\\;|\\;\\frac{400}{9}\\;]$.',
              'Second pivot column: $|a_{32}| = \\frac{77}{9} > |a_{22}| = \\frac{26}{9}$ — **the check is repeated at every pivot row** — so interchange $R_2$ and $R_3$.',
              '$R_3\'\' = R_3\' - \\frac{26}{77}R_2\' = [\\;0\\;\\;0\\;\\;-\\frac{408}{77}\\;|\\;-\\frac{1224}{77}\\;]$.',
              'Back substitution: $z = 3$, $y = 2$, $x = 1$.',
            ],
          },
          {
            id: 'A2(c)', marks: 6, module: 'differentiation',
            q: 'The following table provides the distance travelled by a rocket at various time intervals: $t = 0, 25, 50, 75, 100, 125$ s and $s = 0, 32, 58, 78, 92, 100$ km. Use appropriate numerical differentiation methods for tabular functions to estimate both velocity and acceleration at $t = 0$ s and $t = 50$ s.',
            answer: [
              '$h = 25$ s. The first and last points admit only **forward/backward** differences; the middle points admit central differences.',
              'At $t = 0$ (forward, three-point): $v(0) = \\dfrac{-3s(0) + 4s(25) - s(50)}{2h} = \\dfrac{0 + 128 - 58}{50} = 1.4$ km/s.',
              'At $t = 0$ (forward second-derivative formula, four points): $a(0) = \\dfrac{2s(0) - 5s(25) + 4s(50) - s(75)}{h^2} = \\dfrac{0 - 160 + 232 - 78}{625} = -0.0096$ km/s².',
              'At $t = 50$ (central): $v(50) = \\dfrac{s(75) - s(25)}{2h} = \\dfrac{78 - 32}{50} = 0.92$ km/s.',
              'At $t = 50$: $a(50) = \\dfrac{s(75) - 2s(50) + s(25)}{h^2} = \\dfrac{78 - 116 + 32}{625} = -0.0096$ km/s².',
            ],
          },
          {
            id: 'A2(d)', marks: 6, module: 'lu',
            q: 'Solve the following system of linear equation using Do-Little LU Decomposition Method (show all necessary steps of the computation): $2x + y + z = 9$, $-4x + 3y + 2z = 20$, $6x + 5y + 7z = 35$.',
            answer: [
              'Factorise: $u_{11} = 2$, $u_{12} = 1$, $u_{13} = 1$; $l_{21} = -2$, $l_{31} = 3$; $u_{22} = 3 - (-2)(1) = 5$, $u_{23} = 2 - (-2)(1) = 4$; $l_{32} = \\frac{5 - (3)(1)}{5} = 0.4$; $u_{33} = 7 - (3)(1) - (0.4)(4) = 2.4$.',
              '$L = \\begin{bmatrix} 1 & 0 & 0 \\\\ -2 & 1 & 0 \\\\ 3 & 0.4 & 1 \\end{bmatrix}$, $U = \\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 5 & 4 \\\\ 0 & 0 & 2.4 \\end{bmatrix}$.',
              'Forward substitution $[L]\\{d\\} = \\{b\\}$: $d_1 = 9$, $d_2 = 20 - (-2)(9) = 38$, $d_3 = 35 - (3)(9) - (0.4)(38) = -7.2$.',
              'Backward substitution $[U]\\{x\\} = \\{d\\}$: $x_3 = -7.2/2.4 = -3$, $x_2 = (38 - 4(-3))/5 = 10$, $x_1 = (9 - 10 + 3)/2 = 1$.',
              'Check in the original equations: all three are satisfied.',
            ],
          },
          {
            id: 'A2(e)', marks: 6, module: 'integration',
            q: "During takeoff, an aircraft's acceleration is denoted by $a(t) = 3.2 + 12t - 28t^2 + 32t^3 - 16t^4 + 3t^5$ m/s². Determine the velocity gained from $t = 0$ to $t = 1.75$ seconds during the takeoff roll. Use 7 intervals and choose the most appropriate numerical integration technique(s).",
            answer: [
              'The velocity gained is $v(1.75) - v(0) = \\int_0^{1.75} a(t)\\,dt$.',
              'With 7 intervals $h = 1.75/7 = 0.25$; 7 is odd, so **Simpson\'s 1/3 rule cannot be used over the whole range** — use Simpson\'s 3/8 rule on the first 6 intervals (composite) and the trapezoidal rule on the last one, or composite Simpson\'s 1/3 on the first 6 intervals.',
              'Evaluate $a(t)$ at $t = 0, 0.25, \\dots, 1.75$: $3.20000,\\ 4.89043,\\ 5.29375,\\ 5.59941,\\ 6.20000,\\ 7.04277,\\ 7.98125,\\ 9.12676$.',
              'Simpson\'s 1/3 on the first six subintervals ($t = 0$ to $1.5$): $I_1 = \\frac{0.25}{3}\\left[3.2 + 4(4.89043 + 5.59941 + 7.04277) + 2(5.29375 + 6.2) + 7.98125\\right] = \\frac{0.25}{3}(104.29922) = 8.69160$.',
              'Trapezoidal on the last subinterval: $I_2 = \\frac{0.25}{2}(7.98125 + 9.12676) = 2.13850$.',
              'Velocity gained $= I_1 + I_2 = 10.83010$ m/s; integrating the polynomial exactly gives $10.82499$ m/s, so the numerical error is about $+0.0051$ m/s.',
            ],
          },
          {
            id: 'A2(f)', marks: 6, module: 'integration',
            q: "Use Romberg's Integration to calculate $\\int_1^3 (2x^2 + x)e^{-x}\\,dx$ correct up to 4 decimal places. Compare the result with the true value 2.5226.",
            answer: [
              'Build the Romberg table: the first column is the trapezoidal rule with 1, 2, 4, 8 intervals; each later column is the Richardson extrapolation of the two to its left.',
              '$R_{00} = \\dfrac{3-1}{2}\\left[f(1) + f(3)\\right]$ with $f(x) = (2x^2 + x)e^{-x}$.',
              'Extrapolate: $R_{k,j} = R_{k,j-1} + \\dfrac{R_{k,j-1} - R_{k-1,j-1}}{4^j - 1}$.',
              'The bottom-right entry of the Romberg table is the answer.',
              'Compare with the true value 2.5226 and state the absolute error.',
            ],
          },
        ],
      },
      {
        name: 'Part B — Question 1',
        rule: 'Answer all (6 + 6 + 5 = 17)',
        items: [
          {
            id: 'B1(a)', marks: 6, module: 'interpolation',
            q: 'Prove that $\\Delta - \\nabla = \\delta^2$, where the symbols have their usual meaning. Also, derive Lagrange\'s interpolation formula for interpolation with unequal intervals.',
            answer: [
              'With $\\Delta f(x) = f(x+h) - f(x)$, $\\nabla f(x) = f(x) - f(x-h)$ and $\\delta f(x) = f(x + h/2) - f(x - h/2)$:',
              '$\\Delta f(x) = f(x+h) - f(x)$ and $\\nabla f(x+h) = f(x+h) - f(x)$, so $\\Delta f(x) = \\nabla f(x+h)$.',
              'Also $\\delta f(x) = f(x+h/2) - f(x-h/2)$ and $\\delta f(x+h/2) = f(x+h) - f(x)$, so $\\delta^2 f(x) = \\delta f(x+h/2) - \\delta f(x) = f(x+h) - 2f(x) + f(x-h)$.',
              'And $\\Delta f(x) - \\nabla f(x) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$, which is the same. Hence $\\Delta - \\nabla = \\delta^2$.',
              'For Lagrange\'s formula with unequal intervals: write the interpolating polynomial through $n+1$ points as $P(x) = \\sum_{i=0}^{n} y_i L_i(x)$, where $L_i(x) = \\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$; $L_i(x_j) = \\delta_{ij}$ so $P(x_j) = y_j$.',
              'Hence $y(x) = \\sum_{i=0}^{n} y_i \\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$.',
            ],
          },
          {
            id: 'B1(b)', marks: 6, module: 'interpolation',
            q: "A third-degree polynomial passes through the points $(0, -1)$, $(1, 1)$, $(2, 1)$ and $(3, -2)$. Find the polynomial by Newton's forward interpolation formula. Also, find the polynomial's value at $x = 1.5$.",
            answer: [
              'Difference table: $\\Delta y_0 = 2$, $\\Delta^2 y_0 = -2$, $\\Delta^3 y_0 = -1$; $p = \\frac{x - x_0}{h} = \\frac{x}{1}$.',
              'Newton forward: $y = y_0 + p\\,\\Delta y_0 + \\frac{p(p-1)}{2!}\\Delta^2 y_0 + \\frac{p(p-1)(p-2)}{3!}\\Delta^3 y_0$.',
              'So $y(x) = -1 + 2x - x(x-1) - \\frac{x(x-1)(x-2)}{6}$.',
              'Expanding: $y(x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3$.',
              'At $x = 1.5$: $y = -1 + 3 - 0.75 + 0.0625 = 1.3125$.',
            ],
          },
          {
            id: 'B1(c)', marks: 5, module: 'interpolation',
            q: "Evaluate $f(9)$ by using Newton's divided difference interpolation formula from the data points: $x = 5, 7, 11, 13, 17$ and $f(x) = 150, 392, 1452, 2366, 5202$.",
            answer: [
              'First differences: $121,\\ 265,\\ 457,\\ 709$; second: $24,\\ 32,\\ 42$; third: $1,\\ 1$; fourth: $0$.',
              'Newton\'s divided difference formula: $f(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\dots$',
              '$f(x) = 150 + 121(x-5) + 24(x-5)(x-7) + 1(x-5)(x-7)(x-11) + 0$.',
              'At $x = 9$: $150 + 121(4) + 24(4)(2) + 1(4)(2)(-2) = 150 + 484 + 192 - 16 = 810$.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Spring 2024 semester final',
    meta: 'CSE 2201, AUST. 3 hours, 70 marks. Question 1: any 5 of 7. Question 2: any 6 of 6. Question 3: answer all.',
    sets: [
      {
        name: 'Question 1',
        rule: 'Answer any 5 (4 × 5 = 20)',
        items: [
          {
            id: 'Q1(a)', marks: 4, module: 'errors',
            q: 'Define significant digit, accuracy, and precision. Also, prove that $e_{r;xy} = |e_{r;x}| + |e_{r;y}|$, where the symbols have their usual meaning.',
            answer: [
              'A **significant digit** is any digit that is meaningful (not a leading or trailing placeholder zero).',
              '**Accuracy** is how close a computed value is to the true value; **precision** is how closely repeated computations agree with each other.',
              'For a product $z = xy$, the relative error is $e_{r;z} = \\dfrac{x\\,e_{r;x} + y\\,e_{r;y}}{xy} = e_{r;x} + e_{r;y}$.',
              'Taking absolute values: $|e_{r;xy}| \\le |e_{r;x}| + |e_{r;y}|$, which is the usual statement for a quotient (the errors add instead of cancelling).',
            ],
          },
          {
            id: 'Q1(b)', marks: 4, module: 'roots',
            q: 'Derive the Secant iterative formula for finding the roots of a non-linear equation. Also, mention different stopping criteria for any iterative algorithm to find the roots of non-linear equations.',
            answer: [
              'Take two points $x_0, x_1$ and write the chord through $(x_0, f(x_0))$ and $(x_1, f(x_1))$; its intersection with the axis gives the next point.',
              'The slope is $\\dfrac{f(x_1) - f(x_0)}{x_1 - x_0}$, so $x_2 = x_1 - f(x_1)\\dfrac{x_1 - x_0}{f(x_1) - f(x_0)}$.',
              'In general: $x_{i+1} = x_i - f(x_i)\\dfrac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}$ — the chord replaces the tangent, so $f\'$ is never evaluated.',
              'Stopping criteria: the absolute error $|x_{i+1} - x_i|$ falls below a tolerance; the relative error falls below a tolerance; a maximum number of iterations is reached; or the function value becomes negligible.',
            ],
          },
          {
            id: 'Q1(c)', marks: 4, module: 'errors',
            q: 'What do you understand by deflation and synthetic division? Write the algorithm to find all possible roots of a non-linear equation by using Newton\'s method.',
            answer: [
              '**Synthetic division** is Horner\'s scheme written as a table: bring down the leading coefficient, multiply by the root, add, repeat — the last entry is $p(r)$.',
              '**Deflation** is dividing $p(x)$ by $(x - r)$ once a root $r$ is known, leaving a polynomial of one degree less whose roots are the remaining ones.',
              'Algorithm for all roots: (1) find a root $r_1$ by Newton\'s method; (2) deflate $p(x)$ by $(x - r_1)$ to get $p_1(x)$; (3) find a root $r_2$ of $p_1$ by Newton\'s method; (4) deflate again; (5) repeat until the polynomial is constant.',
              'The number of real roots is checked against the degree, and complex roots follow from the remaining factor.',
            ],
          },
          {
            id: 'Q1(d)', marks: 4, module: 'elimination',
            q: 'Describe the four possible scenarios about the existence of solution(s) of a system of linear equations. Also, mention the condition for convergence of Jacobi iteration method and make comments on the strength of this condition.',
            answer: [
              'With $A$ the coefficient matrix and $b$ the constant vector: (i) $\\det A \\ne 0$ — a **unique** solution; (ii) $\\det A = 0$ and $b \\notin C(A)$ — **no** solution (inconsistent); (iii) $\\det A = 0$ and $b \\in C(A)$ — **infinitely many** solutions; (iv) $\\det A = 0$ with $A = 0$ and $b \\ne 0$ — still no solution.',
              'Jacobi converges if the system is **diagonally dominant**: $|a_{ii}| > \\sum_{j\\ne i}|a_{ij}|$ for every row.',
              'Strength: the condition is **sufficient but not necessary** — it guarantees convergence, but some systems converge without it, so failing the test does not prove divergence.',
            ],
          },
          {
            id: 'Q1(e)', marks: 4, module: 'interpolation',
            q: "Derive Lagrange's interpolation formula for interpolation with unequal intervals.",
            answer: [
              'Let $P(x)$ be the polynomial of degree $\\le n$ through the $n+1$ points $(x_i, y_i)$.',
              'Write $P(x) = \\sum_{i=0}^{n} y_i L_i(x)$ with $L_i(x) = \\prod_{j\\ne i}\\dfrac{x - x_j}{x_i - x_j}$; since $L_i(x_j) = \\delta_{ij}$, $P(x_j) = y_j$.',
              'So $y(x) = \\sum_{i=0}^{n} y_i\\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$, which is Lagrange\'s formula.',
              'It needs no equal spacing — that is why it is used for unequal intervals, and it is symmetric in the data points.',
            ],
          },
          {
            id: 'Q1(f)', marks: 4, module: 'integration',
            q: "Derive Simpson's one-third rule from the general quadrature formula for numerical integration with equidistant ordinates.",
            answer: [
              'General quadrature: $\\int_a^b f(x)\\,dx \\approx \\sum w_i f(x_i)$, the weights coming from the Lagrange form of the interpolating polynomial.',
              'For three ordinates at spacing $h$ the Lagrange weights are $h/3,\\ 4h/3,\\ h/3$.',
              'Hence $\\int_{x_0}^{x_2} f(x)\\,dx \\approx \\dfrac{h}{3}\\left[f(x_0) + 4f(x_1) + f(x_2)\\right]$.',
              'Error $-\\dfrac{(b-a)h^4}{180}f^{(4)}(\\xi)$; an even number of subintervals is required.',
            ],
          },
          {
            id: 'Q1(g)', marks: 4, module: 'regression',
            q: 'What is the difference between interpolation and regression? Prove that: (i) $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$, and (ii) $E^{1/2} = \\mu + \\tfrac{1}{2}\\delta$, where the symbols have their usual meaning.',
            answer: [
              'Interpolation passes through **every** data point; regression finds the curve that best fits the data in the least-squares sense and needs more points than parameters.',
              'For (i): $\\mu f(x) = \\tfrac{1}{2}\\left[f(x + h/2) + f(x - h/2)\\right]$ and $\\delta f(x) = f(x+h/2) - f(x-h/2)$, so $\\mu^2 f = \\tfrac{1}{4}[f(x+h) + 2f(x) + f(x-h)]$.',
              'Since $\\delta^2 f(x) = f(x+h) - 2f(x) + f(x-h)$, we get $\\mu^2 f = f + \\tfrac{1}{4}\\delta^2 f$, i.e. $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$.',
              'For (ii): with $\\mu \\equiv \\tfrac{1}{2}(E^{1/2} + E^{-1/2})$ and $\\delta \\equiv E^{1/2} - E^{-1/2}$,',
              '$\\mu + \\tfrac{1}{2}\\delta = \\tfrac{1}{2}(E^{1/2} + E^{-1/2}) + \\tfrac{1}{2}(E^{1/2} - E^{-1/2}) = E^{1/2}$.',
              'Hence $E^{1/2} = \\mu + \\tfrac{1}{2}\\delta$, as required.',
            ],
          },
        ],
      },
      {
        name: 'Question 2',
        rule: 'Answer any 6 (6 × 6 = 36)',
        items: [
          {
            id: 'Q2(a)', marks: 6, module: 'roots',
            q: 'Find the largest root of the equation $x^2 - 4x - 10 = 0$ using the Bisection method. Use the formula for the search bracket to make the initial guesses and continue the bisection method for three iterations only.',
            answer: [
              'Search bracket: for $x^2 - 4x - 10 = 0$ the roots are $\\dfrac{4 \\pm \\sqrt{16 + 40}}{2}$, so the largest root lies between 5 and 6 ($f(5) = -5$, $f(6) = 2$).',
              'Iteration 1: $c = (5 + 6)/2 = 5.5$, $f(5.5) = 30.25 - 22 - 10 = -1.75$; the root is between 5.5 and 6.',
              'Iteration 2: $c = (5.5 + 6)/2 = 5.75$, $f(5.75) = 33.0625 - 23 - 10 = 0.0625$; the root is between 5.5 and 5.75.',
              'Iteration 3: $c = (5.5 + 5.75)/2 = 5.625$, $f(5.625) = 31.640625 - 22.5 - 10 = -0.859375$; the root is between 5.625 and 5.75.',
              'After three iterations the largest root is bracketed by $[5.625, 5.75]$; the exact root is $2 + \\sqrt{14} = 5.7417$.',
            ],
          },
          {
            id: 'Q2(b)', marks: 6, module: 'roots',
            q: 'Evaluate the polynomial $f(x) = x^4 + 3x^2 - 2x$ by using Horner\'s rule at $x = 3$. Also, find the Quotient polynomial $q(x)$ such that $p(x) = (x - x_0)q(x)$, where $p(x)$ is $x^4 + 7x^3 + 5x^2 - 31x - 30 = 0$ and it has a root at $x_0 = -3$.',
            answer: [
              'Horner for $x^4 + 3x^2 - 2x$ at $x = 3$, writing the missing coefficients as zeros: $b_0 = 1$, $b_1 = 0 + 3(1) = 3$, $b_2 = 3 + 3(3) = 12$, $b_3 = -2 + 3(12) = 34$, $b_4 = 0 + 3(34) = 102$.',
              'So $f(3) = 102$ (check: $81 + 27 - 6 = 102$).',
              'For the quotient: $b_0 = 1$, $b_1 = 7 + (-3)(1) = 4$, $b_2 = 5 + (-3)(4) = -7$, $b_3 = -31 + (-3)(-7) = -10$, $b_4 = -30 + (-3)(-10) = 0$ — the remainder is 0, confirming $-3$ is a root.',
              'So $q(x) = x^3 + 4x^2 - 7x - 10$ and $p(x) = (x + 3)q(x)$.',
            ],
          },
          {
            id: 'Q2(c)', marks: 6, module: 'elimination',
            q: 'Solve the following system of linear equations by using the Matrix Inversion method. Note: if you use any other method, you may still receive partial marks: $2x + y + z = 7$, $4x + 2y + 3z = 4$, $x - y + z = 0$.',
            answer: [
              'Form $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 4 & 2 & 3 \\\\ 1 & -1 & 1 \\end{bmatrix}$ and $b = \\begin{bmatrix} 7 \\\\ 4 \\\\ 0 \\end{bmatrix}$, and find $A^{-1}$ by Gauss-Jordan (augment $A$ with $I$).',
              'Reduce $A$ to the identity, keeping the right half as $A^{-1}$.',
              'Then $x = A^{-1}b$.',
              'Back-substituting gives $x = 9$, $y = -1$, $z = -10$; check: $2(9) + (-1) + (-10) = 7$, $4(9) + 2(-1) + 3(-10) = 4$, $9 - (-1) + (-10) = 0$.',
            ],
          },
          {
            id: 'Q2(d)', marks: 6, module: 'interpolation',
            q: 'Find the missing values in the following interpolation table: $x = 0, 2, 4, 6, 8, 10$ and $f(x) = 2, \\cdot, 10, 17, \\cdot, 37$.',
            answer: [
              'Build the difference table with the unknown entries $A$ (at $x = 2$) and $B$ (at $x = 8$), with $h = 2$.',
              'Assume the data come from a polynomial of degree 3, so the fourth differences vanish: $\\Delta^4 y_0 = y_4 - 4y_3 + 6y_2 - 4y_1 + y_0 = 0$ gives $B - 4(17) + 6(10) - 4A + 2 = 0$, i.e. $B - 4A = 6$; $\\Delta^4 y_1 = 37 - 4B + 6(17) - 4(10) + A = 0$ gives $A - 4B = -99$.',
              'Solving: from the first, $B = 4A + 6$; substituting, $A - 4(4A + 6) = -99 \\Rightarrow -15A = -75 \\Rightarrow A = 5$, and $B = 26$.',
              'The completed table is $f(x) = 2, 5, 10, 17, 26, 37$; the differences are $3, 5, 7, 9, 11$ and the second differences $2, 2, 2, 2$ — constant, so the data are exactly a quadratic and the values are consistent.',
            ],
          },
          {
            id: 'Q2(e)', marks: 6, module: 'regression',
            q: 'Fit a power function model of the form $y = ax^b$ with the data $x = 1, 2, 3, 4, 5$ and $y = 0.5, 4, 13.5, 32, 62.5$.',
            answer: [
              'Take logarithms: $\\ln y = \\ln a + b\\ln x$, so fit a straight line to $(\\ln x, \\ln y)$.',
              '$\\sum \\ln x = 4.7875$, $\\sum \\ln y = 10.8967$, $\\sum (\\ln x)^2 = 6.4457$, $\\sum (\\ln x)(\\ln y) = 14.7255$.',
              '$b = \\dfrac{n\\sum (\\ln x)(\\ln y) - \\sum \\ln x \\sum \\ln y}{n\\sum (\\ln x)^2 - (\\sum \\ln x)^2} = \\dfrac{5(14.7255) - (4.7875)(10.8967)}{5(6.4457) - (4.7875)^2} = \\dfrac{25.0840}{8.6229} = 3.0$.',
              '$\\ln a = \\bar{\\ln y} - b\\bar{\\ln x} = 2.1793 - 3(0.9575) = -0.6932$, so $a = e^{-0.6932} = 0.5$.',
              'The fitted model is $y = 0.5\\,x^3$, and the data are exactly $x^3/2$ ($0.5,\\ 4,\\ 13.5,\\ 32,\\ 62.5$), so the fit is exact.',
            ],
          },
          {
            id: 'Q2(f)', marks: 6, module: 'interpolation',
            q: "A third-degree polynomial passes through the points $(0, -1)$, $(1, 1)$, $(2, 1)$ and $(3, -2)$. Find the polynomial by Newton's forward interpolation formula. Also, determine the polynomial's value at $x = 1$.",
            answer: [
              'Difference table: $\\Delta y_0 = 2$, $\\Delta^2 y_0 = -2$, $\\Delta^3 y_0 = -1$; $p = x$.',
              '$y(x) = -1 + 2x + \\frac{x(x-1)}{2}(-2) + \\frac{x(x-1)(x-2)}{6}(-1)$.',
              'Expanding: $y(x) = -1 + \\frac{8}{3}x - \\frac{1}{2}x^2 - \\frac{1}{6}x^3$.',
              'At $x = 1$: $y(1) = -1 + \\frac{8}{3} - \\frac{1}{2} - \\frac{1}{6} = 1$ — as it must be, since the polynomial passes through $(1, 1)$.',
            ],
          },
          {
            id: 'Q2(g)', marks: 6, module: 'differentiation',
            q: 'The following table provides the distance travelled by a vehicle at various time intervals. Estimate both velocity and acceleration at $t = 5$ sec and $t = 13$ sec: $t = 3, 5, 7, 9, 11, 13$ s and $s = 7, 8, 12, 19, 32, 50$ km.',
            answer: [
              '$h = 2$ s. At $t = 5$ only forward differences exist, so use the three-point forward formula: $v(5) = \\dfrac{-3s(5) + 4s(7) - s(9)}{2h} = \\dfrac{-24 + 48 - 19}{4} = 1.25$ km/s.',
              'Acceleration at $t = 5$: $a(5) = \\dfrac{s(5) - 2s(7) + s(9)}{h^2} = \\dfrac{8 - 24 + 19}{4} = 0.75$ km/s².',
              'At $t = 13$ (the last point) use the backward three-point formula: $v(13) = \\dfrac{3s(13) - 4s(11) + s(9)}{2h} = \\dfrac{150 - 128 + 19}{4} = 10.25$ km/s.',
              'Acceleration at $t = 13$ (backward second-derivative formula, four points): $a(13) = \\dfrac{2s(13) - 5s(11) + 4s(9) - s(7)}{h^2} = \\dfrac{100 - 160 + 76 - 12}{4} = 1.0$ km/s².',
            ],
          },
          {
            id: 'Q2(h)', marks: 6, module: 'integration',
            q: "Evaluate $\\int_0^2 (2x - x^2)\\,dx$ by using Weddle's rule, taking seven ordinates. Also, compare the result with the exact value and determine the error.",
            answer: [
              'Seven ordinates over $[0, 2]$ give $h = 2/6 = 1/3$.',
              "$f(x) = 2x - x^2$ at $x = 0, \\frac13, \\frac23, 1, \\frac43, \\frac53, 2$ gives $0,\\ \\frac{5}{9},\\ \\frac89,\\ 1,\\ \\frac89,\\ \\frac59,\\ 0$.",
              "Weddle's rule: $\\int_0^2 f\\,dx \\approx \\frac{3h}{10}\\left[f_0 + 5f_1 + f_2 + 6f_3 + f_4 + 5f_5 + f_6\\right]$.",
              'Substituting: $\\frac{3(1/3)}{10}\\left[0 + 5\\cdot\\frac{5}{9} + \\frac{8}{9} + 6(1) + \\frac{8}{9} + 5\\cdot\\frac{5}{9} + 0\\right]$.',
              'The exact value is $\\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = \\frac{4}{3}$; state the absolute error of your Weddle result against it.',
            ],
          },
        ],
      },
      {
        name: 'Question 3',
        rule: 'Answer all (7 + 7 = 14)',
        items: [
          {
            id: 'Q3(a)', marks: 7, module: 'gradient',
            q: 'Derive the expression of parameter update for polynomial regression (with degree = 4) using gradient descent algorithm. Also, explain why simultaneous update is necessary and how it is implemented in this case.',
            answer: [
              'With $H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2 + \\theta_3 x^3 + \\theta_4 x^4$ and cost $J(\\theta) = \\frac{1}{2m}\\sum (H_\\theta(x^{(i)}) - y^{(i)})^2$:',
              '$\\dfrac{\\partial J}{\\partial \\theta_j} = \\dfrac{1}{m}\\sum_{i=1}^{m}\\left(H_\\theta(x^{(i)}) - y^{(i)}\\right)x^{(i)}_j$, where $x^{(i)}_j = (x^{(i)})^j$.',
              'So $\\dfrac{\\partial J}{\\partial \\theta_0} = \\frac{1}{m}\\sum e_i$, $\\dfrac{\\partial J}{\\partial \\theta_1} = \\frac{1}{m}\\sum e_i x^{(i)}$, $\\dfrac{\\partial J}{\\partial \\theta_2} = \\frac{1}{m}\\sum e_i (x^{(i)})^2$, and so on up to $(x^{(i)})^4$.',
              'The update is $\\theta_j \\leftarrow \\theta_j - \\alpha\\dfrac{\\partial J}{\\partial \\theta_j}$ for $j = 0, 1, 2, 3, 4$.',
              '**Simultaneous update is necessary** because all five partial derivatives depend on the *same* set of parameters: updating $\\theta_0$ first and then using it in the gradient for $\\theta_1$ would mean the five components were computed at different points — that is a different (and wrong) algorithm.',
              'It is implemented by computing all five partial derivatives from the current $\\theta$, storing them, and only then writing all five new values.',
            ],
          },
          {
            id: 'Q3(b)', marks: 7, module: 'gradient',
            q: 'Demonstrate 2nd degree polynomial regression analysis (without variable conversion) by using gradient descent algorithm on the data $(x,y) = (0,0), (2,5), (3,6), (5,9), (4,7)$. Use batch update mode with the initial parameters $\\theta_0 = 2$, $\\theta_1 = 1$, $\\theta_2 = 3$, learning rate $\\alpha = 0.2$. Continue the process for one epoch only.',
            answer: [
              '$H_\\theta(x) = \\theta_0 + \\theta_1 x + \\theta_2 x^2$ with $(2, 1, 3)$; $m = 5$, $\\alpha = 0.2$.',
              'With the initial parameters $H_\\theta(x) = 2 + x + 3x^2$ the predictions are $2,\\ 16,\\ 32,\\ 82,\\ 54$ and the errors (prediction $-$ actual) are $2,\\ 11,\\ 26,\\ 73,\\ 47$.',
              '$\\dfrac{\\partial J}{\\partial \\theta_0} = \\frac{1}{5}(2 + 11 + 26 + 73 + 47) = 31.8$; $\\dfrac{\\partial J}{\\partial \\theta_1} = \\frac{1}{5}(0 + 22 + 78 + 365 + 188) = 130.6$; $\\dfrac{\\partial J}{\\partial \\theta_2} = \\frac{1}{5}(0 + 44 + 234 + 1825 + 752) = 571$.',
              'Update: $\\theta_0 = 2 - 0.2(31.8) = -4.36$, $\\theta_1 = 1 - 0.2(130.6) = -25.12$, $\\theta_2 = 3 - 0.2(571) = -111.2$.',
              'So after one epoch the parameters are $\\theta_0 = -4.36$, $\\theta_1 = -25.12$, $\\theta_2 = -111.2$.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Fall 2023 semester final',
    meta: 'CSE 2201, AUST. 3 hours, 70 marks. Question 1: any 4 of 6. Question 2: any 6 of 8. Question 3: any 3 of 3.',
    sets: [
      {
        name: 'Question 1',
        rule: 'Answer any 4 (4 × 4 = 16)',
        items: [
          {
            id: 'Q1(a)', marks: 4, module: 'roots',
            q: 'Discuss the situations where the fixed-point iteration process may not converge to a solution.',
            answer: [
              'Fixed-point iteration $x = g(x)$ converges when $|g\'(x)| < 1$ at the root (and stays below 1 in the interval).',
              'It fails when $|g\'(x)| > 1$ — the iterations are pushed away from the root and diverge.',
              'It also fails when $g\'(x) = 1$ (the iteration stalls or drifts), and when the rearrangement $x = g(x)$ has no root in the interval, or the iteration leaves the interval of convergence.',
              'A good rearrangement matters: the same equation written differently can converge or diverge.',
            ],
          },
          {
            id: 'Q1(b)', marks: 4, module: 'interpolation',
            q: 'Compare the pros and cons of the Newton divided difference and Lagrange interpolation techniques.',
            answer: [
              '**Lagrange**: symmetric in the data points and easy to write down, but every evaluation redoes all $n+1$ products, so it is slow for repeated use.',
              '**Newton divided difference**: the divided differences are computed once and the polynomial is then evaluated in nested (Horner) form, so repeated evaluations are cheap — but the nodes must be in a fixed order.',
              'Lagrange\'s formula has no recursive build-up; Newton\'s does, and the table can be extended as more points arrive.',
              'Both are exact for a polynomial of degree $\\le n$ through $n+1$ points.',
            ],
          },
          {
            id: 'Q1(c)', marks: 4, module: 'roots',
            q: "How does Horner's Rule improve the accuracy for evaluating a polynomial.",
            answer: [
              'Horner\'s rule evaluates $p(x) = a_0 + a_1x + \\dots + a_nx^n$ as $p(x) = (\\dots((a_0 + a_1x)x + a_2)x \\dots)x + a_n$.',
              'It needs $n$ multiplications and $n$ additions instead of the $n^2$ operations of the naive form, so there are fewer rounding steps.',
              'Fewer operations means less accumulated round-off error, so the result is more accurate.',
              'The same nested form gives the quotient polynomial when a root is known (synthetic division).',
            ],
          },
          {
            id: 'Q1(d)', marks: 4, module: 'errors',
            q: 'Find the relative error for calculating $u = 5xy^2/z^3$, where $\\Delta x = \\Delta y = \\Delta z = 1$ and $x = y = z = 1$.',
            answer: [
              '$u = 5xy^2z^{-3}$, so $u = 5$ at $x = y = z = 1$.',
              '$\\dfrac{\\partial u}{\\partial x} = \\dfrac{5y^2}{z^3} = 5$, $\\dfrac{\\partial u}{\\partial y} = \\dfrac{10xy}{z^3} = 10$, $\\dfrac{\\partial u}{\\partial z} = -\\dfrac{15xy^2}{z^4} = -15$.',
              '$e_r = \\dfrac{1}{u}\\left(\\dfrac{\\partial u}{\\partial x}\\Delta x + \\dfrac{\\partial u}{\\partial y}\\Delta y + \\dfrac{\\partial u}{\\partial z}\\Delta z\\right) = \\dfrac{1}{5}(5 + 10 - 15) = 0$.',
              'So the relative error is zero — the errors in $y$ and $z$ cancel.',
            ],
          },
          {
            id: 'Q1(e)', marks: 4, module: 'differentiation',
            q: 'Derive the three-point forward difference formula for tabular function in the context of numerical differentiation.',
            answer: [
              'Expand about $x_0$: $f(x_0+h) = f + hf\' + \\dfrac{h^2}{2}f\'\' + \\dfrac{h^3}{6}f\'\'\' + \\dots$ and $f(x_0+2h) = f + 2hf\' + 2h^2f\'\' + \\dfrac{4}{3}h^3f\'\'\' + \\dots$.',
              'Form $-3f(x_0) + 4f(x_0+h) - f(x_0+2h)$: the $f$ terms cancel, the $hf\'$ terms give $4h - 2h = 2h$, the $h^2f\'\'$ terms cancel, and the $h^3f\'\'\'$ terms give $\\dfrac{2}{3}h^3f\'\'\'$.',
              'Divide by $2h$: $f\'(x_0) = \\dfrac{-3f(x_0) + 4f(x_0+h) - f(x_0+2h)}{2h} - \\dfrac{1}{3}h^2f\'\'\'(x_0) + O(h^3)$.',
              'So $f\'(x_0) \\approx \\dfrac{-3f(x_0) + 4f(x_0+h) - f(x_0+2h)}{2h}$, with truncation error $O(h^2)$.',
            ],
          },
          {
            id: 'Q1(f)', marks: 4, module: 'differences',
            q: 'Prove that (i) $\\Delta - \\nabla = \\delta^2$, (ii) $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$, where the symbols have their usual meaning.',
            answer: [
              '(i) $\\Delta f(x) = f(x+h) - f(x)$ and $\\nabla f(x) = f(x) - f(x-h)$, so $(\\Delta - \\nabla)f(x) = f(x+h) - 2f(x) + f(x-h)$.',
              'Also $\\delta^2 f(x) = \\delta f(x + h/2) - \\delta f(x) = [f(x+h) - f(x)] - [f(x) - f(x-h)] = f(x+h) - 2f(x) + f(x-h)$. The two agree, so $\\Delta - \\nabla = \\delta^2$.',
              '(ii) $\\mu f(x) = \\tfrac{1}{2}[f(x+h/2) + f(x-h/2)]$, so $\\mu^2 f(x) = \\tfrac{1}{4}[f(x+h) + 2f(x) + f(x-h)]$.',
              'Using (i), $f(x+h) - 2f(x) + f(x-h) = \\delta^2 f(x)$, so $\\mu^2 f = f + \\tfrac{1}{4}\\delta^2 f$, i.e. $\\mu^2 = 1 + \\tfrac{1}{4}\\delta^2$.',
            ],
          },
        ],
      },
      {
        name: 'Question 2',
        rule: 'Answer any 6 (6 × 6 = 36)',
        items: [
          {
            id: 'Q2(a)', marks: 6, module: 'roots',
            q: 'Estimate the root of the equation $f(x) = x^3 - 9x + 1 = 0$ using Bisection method correct upto 2 significant digits where $x \\in [2, 3]$.',
            answer: [
              '$f(2) = -9$ and $f(3) = 1$, so a root lies in $[2, 3]$.',
              'Iteration 1: $c = 2.5$, $f(2.5) = -5.875$ — the root is in $[2.5, 3]$.',
              'Iteration 2: $c = 2.75$, $f(2.75) = -2.953$ — the root is in $[2.75, 3]$.',
              'Iteration 3: $c = 2.875$, $f(2.875) = -1.1113$ — the root is in $[2.875, 3]$.',
              'Iteration 4: $c = 2.9375$, $f(2.9375) = -0.0901$ — the root is in $[2.9375, 3]$. Iteration 5: $c = 2.9688$, $f(c) = 0.4463$ — the root is in $[2.9375, 2.9688]$, width $0.031 < 0.1$.',
              'To 2 significant digits the root is $x \\approx 2.9$ (the exact value is $2.9428$).',
            ],
          },
          {
            id: 'Q2(b)', marks: 6, module: 'iterative',
            q: 'Solve the following System of Linear Equations by iterating four times the Jacobi Method. Consider $x_0 = y_0 = z_0 = 0$: $2x - y = 1$, $-x + 2y - z = 0$, $-y + 2z = 1$.',
            answer: [
              'Isolate: $x = \\tfrac{1}{2}(1 + y)$, $y = \\tfrac{1}{2}(x + z)$, $z = \\tfrac{1}{2}(1 + y)$.',
              'Check dominance: row 1 $|2| > |1|$, row 2 $|2| > |1|+|1|$ fails, row 3 $|2| > |1|$ — so the strict test fails on row 2; the iteration still converges (the condition is sufficient, not necessary).',
              'Iteration 1: $x^{(1)} = 0.5$, $y^{(1)} = 0$, $z^{(1)} = 0.5$.',
              'Iteration 2: $x^{(2)} = 0.5$, $y^{(2)} = 0.5$, $z^{(2)} = 0.5$.',
              'Iteration 3: $x^{(3)} = 0.75$, $y^{(3)} = 0.5$, $z^{(3)} = 0.75$.',
              'Iteration 4: $x^{(4)} = 0.75$, $y^{(4)} = 0.75$, $z^{(4)} = 0.75$. The exact solution is $x = z = 1,\\ y = 1$.',
            ],
          },
          {
            id: 'Q2(c)', marks: 6, module: 'roots',
            q: 'Apply Newton Raphson method to find the root of the given non linear equation $x^3 - 4x^2 + x + 6 = 0$, using an initial estimation of 0, and iterate the method until the absolute error $E_a \\le 0.01$.',
            answer: [
              '$f(x) = x^3 - 4x^2 + x + 6$, $f\'(x) = 3x^2 - 8x + 1$, so $x_{i+1} = x_i - \\dfrac{f(x_i)}{f\'(x_i)}$.',
              'Iteration 1 ($x_0 = 0$): $f(0) = 6$, $f\'(0) = 1$, so $x_1 = 0 - 6/1 = -6$.',
              'Iteration 2: $f(-6) = -216 - 144 - 6 + 6 = -360$, $f\'(-6) = 108 + 48 + 1 = 157$, so $x_2 = -6 + 360/157 = -3.7070$.',
              'Iteration 3: $f(-3.7070) = -50.94 - 54.97 - 3.71 + 6 = -103.62$, $f\'(-3.7070) = 41.23 + 29.66 + 1 = 71.89$, so $x_3 = -3.7070 + 103.62/71.89 = -2.2654$.',
              'Iteration 4: $f(-2.2655) = -11.6278 - 20.5300 - 2.2655 + 6 = -28.4241$, $f\'(-2.2655) = 15.3975 + 18.124 + 1 = 34.5221$, so $x_4 = -2.2655 + 28.4241/34.5221 = -1.4422$.',
              'Iteration 5: $x_5 = -1.4422 - \\frac{-6.7611}{18.7769} = -1.0821$; iteration 6: $x_6 = -1.0821 - \\frac{-1.0329}{13.1696} = -1.0037$; iteration 7: $x_7 = -1.0037 - \\frac{-0.0441}{12.0514} = -1.0000$.',
            ],
          },
          {
            id: 'Q2(d)', marks: 6, module: 'integration',
            q: 'Implement composite Trapezoidal and Simpson\'s 1/3 Rule to find the integral $\\int_0^1 \\dfrac{1}{1+x^2}\\,dx$ by taking five subintervals.',
            answer: [
              '$h = 0.2$; $f(x_i) = \\frac{1}{1+x_i^2}$ gives $1,\\ 0.961538,\\ 0.862069,\\ 0.735294,\\ 0.609756,\\ 0.5$.',
              'Composite trapezoidal: $I \\approx \\dfrac{h}{2}\\left[f_0 + 2(f_1 + f_2 + f_3 + f_4) + f_5\\right]$.',
              'Substituting: $\\dfrac{0.2}{2}\\left[1 + 2(0.961538 + 0.862069 + 0.735294 + 0.609756) + 0.5\\right] = 0.7837315$.',
              'Five subintervals is an odd number, so Simpson\'s 1/3 rule cannot be used with $h = 0.2$. Take four subintervals instead: $h = 0.25$, ordinates $1.000000, 0.941176, 0.800000, 0.640000, 0.500000$.',
              '$I_S = \\dfrac{0.25}{3}\\left[1 + 4(0.941176 + 0.640000) + 2(0.800000) + 0.500000\\right] = \\dfrac{0.25}{3}(9.424704) = 0.785392$.',
              'To use all five subintervals in one go, combine the 3/8 rule on the first three with the 1/3 rule on the last two: $0.540459 + 0.244955 = 0.785414$.',
              'Exact value $\\arctan(1) = \\pi/4 = 0.785398$: the trapezoidal answer is off by $0.00167$, Simpson by about $6 \\times 10^{-6}$.',
            ],
          },
          {
            id: 'Q2(e)', marks: 6, module: 'differentiation',
            q: 'Use three points central difference formula to estimate the 2nd order derivative of $f(x) = \\dfrac{1}{1+x^2}$ at $x = 0.5$, with step size $h = 0.01$. Compare the result with the true value.',
            answer: [
              'Three-point central difference for the second derivative: $f\'\'(x) \\approx \\dfrac{f(x+h) - 2f(x) + f(x-h)}{h^2}$.',
              '$f(0.49) = 0.806387$, $f(0.50) = 0.800000$, $f(0.51) = 0.793588$.',
              '$f\'\'(0.5) \\approx \\dfrac{0.793588 - 2(0.800000) + 0.806387}{(0.01)^2} = \\dfrac{-0.0000256}{0.0001} = -0.256078$.',
              'The true value is $f\'\'(x) = \\dfrac{6x^2 - 2}{(1+x^2)^3}$, so $f\'\'(0.5) = \\dfrac{1.5 - 2}{1.25^3} = -0.256000$.',
              'Error $= -0.256078 - (-0.256000) = -7.8 \\times 10^{-5}$, consistent with an $O(h^2)$ formula with $h = 0.01$.',
            ],
          },
          {
            id: 'Q2(f)', marks: 6, module: 'lu',
            q: 'Factorize the following system of linear equations in Lower Triangular (L) matrix and Upper Triangular (U) matrix using Gauss Elimination method: $x + y + z = 3$, $2x + 3y + 4z = 11$, $4x + 9y + 16z = 41$.',
            answer: [
              'Augmented matrix $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 3 \\\\ 2 & 3 & 4 & 11 \\\\ 4 & 9 & 16 & 41 \\end{array}\\right]$.',
              '$R_2\' = R_2 - 2R_1 = [\\;0\\;\\;1\\;\\;2\\;|\\;5\\;]$, $R_3\' = R_3 - 4R_1 = [\\;0\\;\\;5\\;\\;12\\;|\\;29\\;]$.',
              '$R_3\'\' = R_3\' - 5R_2\' = [\\;0\\;\\;0\\;\\;2\\;|\\;4\\;]$.',
              'The multipliers are $2$ and $4$ (first column) and $5$ (second column), so $L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 4 & 5 & 1 \\end{bmatrix}$ and $U = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 2 \\end{bmatrix}$.',
              'Check: $LU = \\left[\\begin{array}{ccc} 1 & 1 & 1 \\\\ 2 & 3 & 4 \\\\ 4 & 9 & 16 \\end{array}\\right] = A$.',
            ],
          },
          {
            id: 'Q2(g)', marks: 6, module: 'interpolation',
            q: 'The following table gives the sales of Tex company for the five years. Estimate the sales for the year 1986 using 2nd degree Newton Gregory forward interpolating polynomial. [Your answer must include Forward Difference table.] Year: 1985, 1987, 1989, 1991, 1993; Sales (thousands): 40, 43, 48, 52, 57.',
            answer: [
              'The years are not equally spaced (spacing 2 years) but the sales are given at two-year steps, so take $x = $ year index with $h = 2$.',
              'Forward differences: $\\Delta y = 3, 5, 4, 5$; $\\Delta^2 y = 2, -1, 1$; $\\Delta^3 y = -3, 2$; $\\Delta^4 y = 5$.',
              'For 1986, $p = \\frac{x - x_0}{h} = \\frac{1986 - 1985}{2} = 0.5$.',
              'Newton-Gregory forward (second degree): $y = y_0 + p\\Delta y_0 + \\frac{p(p-1)}{2!}\\Delta^2 y_0 = 40 + 0.5(3) + \\frac{0.5(-0.5)}{2}(2)$.',
              'So the estimated sales for 1986 are $40 + 1.5 - 0.25 = 41.25$ thousand.',
            ],
          },
          {
            id: 'Q2(h)', marks: 6, module: 'roots',
            q: "Evaluate the polynomial $p(x) = x^3 - 6x^2 + 11x - 6 = 0$ using Horner's rule at $x = 2$ and find the quotient polynomial $q(x)$ of $p(x)$ such that $p(x) = (x - 2)q(x)$, where $p(x)$ has a root at $x = 2$.",
            answer: [
              'Horner: $b_0 = 1$, $b_1 = -6 + 2(1) = -4$, $b_2 = 11 + 2(-4) = 3$, $b_3 = -6 + 2(3) = 0$.',
              'So $p(2) = 0$ and $x = 2$ is a root.',
              'The quotient coefficients are $b_0, b_1, b_2$: $q(x) = x^2 - 4x + 3$.',
              'So $p(x) = (x - 2)(x^2 - 4x + 3) = (x - 2)(x - 1)(x - 3)$, and the remaining roots are $1$ and $3$.',
            ],
          },
        ],
      },
      {
        name: 'Question 3',
        rule: 'Answer any 3 (6 × 3 = 18)',
        items: [
          {
            id: 'Q3(a)', marks: 6, module: 'differentiation',
            q: 'Justify why the Richardson extrapolation method outperforms the three-point forward difference formula in generating accurate estimates of derivatives.',
            answer: [
              'Three-point forward difference: $D(h) = f\'(x) + \\dfrac{h^2}{3}f\'\'\'(x) + O(h^3)$ — the error is $O(h^2)$.',
              'Halving the step: $D(h/2) = f\'(x) + \\dfrac{h^2}{12}f\'\'\'(x) + O(h^3)$.',
              'A suitable combination cancels the $h^2$ term: $R = \\dfrac{4D(h/2) - D(h)}{3} = f\'(x) + O(h^3)$.',
              'So Richardson extrapolation turns an $O(h^2)$ estimate into an $O(h^3)$ one using the same function values — it is strictly more accurate for the same cost.',
            ],
          },
          {
            id: 'Q3(b)', marks: 6, module: 'roots',
            q: 'You are designing a spherical tank to hold water for a small village in a developing country. The volume of liquid it can hold can be computed as $V = (\\pi h^2(3R - h))/3$, where $V$ is volume [m³], $h$ is the depth of the water in the tank [m], and $R$ is the tank radius [m]. If $R = 3$ m, to what depth must the tank be filled so that it holds 30 m³? Based on the above-mentioned problem, which method will be the best choice to find the optimal depth of the tank. Analyze your answer based on error convergence rate of numerical methods for System of Non-linear equation. Note that an initial guess of $h$ will always converge.',
            answer: [
              'Substituting $V = 30$ and $R = 3$: $30 = \\dfrac{\\pi h^2(9 - h)}{3}$, i.e. $h^3 - 9h^2 + \\dfrac{90}{\\pi} = 0$.',
              'The equation is $f(h) = h^3 - 9h^2 + 28.6479 = 0$ with $f\'(h) = 3h^2 - 18h$; the physical root is in $0 < h < 9$.',
              'Newton-Raphson from $h_0 = 1$: $h_1 = 1 - \\frac{20.6479}{-15} = 2.3765$, then $h_2 = 2.0374$, $h_3 = 2.0269$ — so $h = 2.027$ m (check: $\\frac{\\pi(2.0269)^2(9 - 2.0269)}{3} = 30.0$ m$^3$).',
              'Newton-Raphson is the best choice because its convergence is quadratic — the error is roughly squared at every step, much faster than bisection\'s linear halving — and the paper notes that an initial guess of $h$ will always converge.',
              'Bisection would need many more iterations for the same accuracy, and Regula-Falsi converges only linearly.',
            ],
          },
          {
            id: 'Q3(c)', marks: 6, module: 'regression',
            q: 'On average, the surface area $A$ of human beings is related to weight $W$ and height $H$. Measurements on a number of individuals of height 180 cm and different weights (kg) gives values of $A$ (m²): $W = 70, 75, 77, 80, 82, 84, 87, 90$ and $A = 2.10, 2.12, 2.15, 2.20, 2.22, 2.23, 2.26, 2.30$. (i) Justify that $A = a + bW$ fits the above data reasonably well. (ii) Evaluate the constants $a$ and $b$.',
            answer: [
              'A straight line is a reasonable fit because the points lie close to a line (the correlation between $W$ and $A$ is near 1).',
              'Least squares: $\\sum y = na + b\\sum x$ and $\\sum xy = a\\sum x + b\\sum x^2$, with $n = 8$, $\\sum W = 645$, $\\sum A = 17.58$, $\\sum W^2 = 52303$, $\\sum WA = 1420.53$.',
              '$b = \\dfrac{8(1420.53) - (645)(17.58)}{8(52303) - (645)^2} = \\dfrac{11364.24 - 11339.1}{418424 - 416025} = \\dfrac{25.14}{2399} = 0.010480$.',
              '$a = \\bar{A} - b\\bar{W} = 2.1975 - (0.010480)(80.625) = 1.352545$.',
              'So $A = 1.3525 + 0.010480\\,W$ (with $R^2 = 0.976$).',
            ],
          },
          {
            id: 'Q3(d)', marks: 6, module: 'iterative',
            q: 'Interpret with an example; convergence rate of Gauss-Seidel is more rapid than Jacobi\'s method for solving linear system.',
            answer: [
              'Example: $5x + 2y + z = 12$, $x + 4y + 2z = 15$, $x + 2y + 5z = 20$ — diagonally dominant, so both converge.',
              'Jacobi needs about 8 iterations to reach the solution $x = 1,\\ y = 2,\\ z = 3$; Gauss-Seidel reaches it in fewer sweeps because each new value is used immediately.',
              'Reason: Gauss-Seidel\'s iteration matrix is $B_{GS} = (D + L)^{-1}U$ while Jacobi\'s is $B_J = -D^{-1}(L + U)$; the spectral radius of $B_{GS}$ is smaller, so it converges faster.',
              'Both need the same convergence condition (diagonal dominance), but the rate differs — Gauss-Seidel is typically about twice as fast.',
            ],
          },
          {
            id: 'Q3(e)', marks: 6, module: 'iterative',
            q: 'Consider a two equation system $a_{11}x_1 + a_{12}x_2 = b_1$, $a_{21}x_1 + a_{22}x_2 = b_2$. Show that sufficient conditions for convergence of Gauss Seidel method are $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$.',
            answer: [
              'Write $x_1 = F(x_1, x_2) = \\dfrac{b_1 - a_{12}x_2}{a_{11}}$ and $x_2 = G(x_1, x_2) = \\dfrac{b_2 - a_{21}x_1}{a_{22}}$.',
              'The partial derivatives are $\\left|\\dfrac{\\partial F}{\\partial x_1}\\right| = 0$, $\\left|\\dfrac{\\partial F}{\\partial x_2}\\right| = \\dfrac{|a_{12}|}{|a_{11}|}$, $\\left|\\dfrac{\\partial G}{\\partial x_1}\\right| = \\dfrac{|a_{21}|}{|a_{22}|}$, $\\left|\\dfrac{\\partial G}{\\partial x_2}\\right| = 0$.',
              'The fixed-point condition $|G\'(x)| < 1$ therefore requires $\\dfrac{|a_{12}|}{|a_{11}|} < 1$ and $\\dfrac{|a_{21}|}{|a_{22}|} < 1$.',
              'These give $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$ — the diagonal dominance conditions.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Spring 2023 semester final',
    meta: 'CSE 2201, AUST. 3 hours, 70 marks. Question 1: any 4 of 6. Question 2: any 6 of 8. Question 3: any 3 of 3.',
    sets: [
      {
        name: 'Question 1',
        rule: 'Answer any 4 (4 × 4 = 16)',
        items: [
          {
            id: 'Q1(a)', marks: 4, module: 'roots',
            q: 'Describe the limitations of the fixed point iteration method for solving nonlinear equations.',
            answer: [
              'Convergence is not guaranteed — it needs $|g\'(x)| < 1$ near the root, and the equation can always be rearranged badly.',
              'The rate depends on the rearrangement: $|g\'(x)|$ close to 1 gives very slow convergence.',
              'The starting guess must lie in the interval of convergence, and the iteration may leave it.',
              'It can only find one root per starting point, and each root needs its own bracketing or guess.',
            ],
          },
          {
            id: 'Q1(b)', marks: 4, module: 'roots',
            q: 'How is synthetic division used to determine the multiple roots of a polynomial?',
            answer: [
              'Synthetic division evaluates $p(x)$ at a number $r$ and simultaneously produces the quotient $q(x)$ with $p(x) = (x - r)q(x) + p(r)$.',
              'If $p(r) = 0$ then $r$ is a root and $q(x)$ contains the remaining roots.',
              'Repeated deflation — divide by $(x - r)$ again and again — strips off one root each time, so all the roots are found one after another.',
              'A repeated root shows up as a zero remainder twice in a row.',
            ],
          },
          {
            id: 'Q1(c)', marks: 4, module: 'errors',
            q: 'Explain the significance of condition number in numerical computing.',
            answer: [
              'The condition number measures how much the output changes when the input changes: for $u = f(x)$, the relative condition number is $\\left|\\dfrac{x f\'(x)}{f(x)}\\right|$.',
              'A small condition number means a well-conditioned problem: the relative error in the answer is about the same size as the relative error in the data.',
              'A large condition number means an ill-conditioned problem: small input errors are amplified, so no algorithm can give an accurate answer.',
              'It tells you whether the data or the method is the problem — and it is a property of the problem, not of the algorithm.',
            ],
          },
          {
            id: 'Q1(d)', marks: 4, module: 'errors',
            q: 'Find the relative error for calculating $u = 5xy^2/z^3$, where $\\Delta x = \\Delta y = \\Delta z = 1$ and $x = y = z = 1$.',
            answer: [
              '$u = 5xy^2z^{-3} = 5$.',
              '$\\dfrac{\\partial u}{\\partial x} = \\dfrac{5y^2}{z^3} = 5$, $\\dfrac{\\partial u}{\\partial y} = \\dfrac{10xy}{z^3} = 10$, $\\dfrac{\\partial u}{\\partial z} = -\\dfrac{15xy^2}{z^4} = -15$.',
              '$e_r = \\dfrac{1}{u}\\left(5(1) + 10(1) - 15(1)\\right) = \\dfrac{0}{5} = 0$.',
              'So the relative error is zero — the contributions cancel exactly.',
            ],
          },
          {
            id: 'Q1(e)', marks: 4, module: 'differentiation',
            q: 'Derive the three point forward difference formula for tabular function in the context of numerical differentiation.',
            answer: [
              'Expand $f(x_0+h)$ and $f(x_0+2h)$ about $x_0$ in Taylor series and combine $-3f(x_0) + 4f(x_0+h) - f(x_0+2h)$.',
              'The $f$ and $f\'\'$ terms cancel and the $f\'\'\'$ term survives: the combination equals $2h f\'(x_0) + \\frac{2}{3}h^3 f\'\'\'(x_0) + O(h^4)$.',
              'Divide by $2h$: $f\'(x_0) = \\dfrac{-3f(x_0) + 4f(x_0+h) - f(x_0+2h)}{2h} - \\dfrac{1}{3}h^2 f\'\'\'(x_0) + O(h^3)$.',
              'So the three-point forward difference is second-order accurate.',
            ],
          },
          {
            id: 'Q1(f)', marks: 4, module: 'differences',
            q: 'Prove that (i) $\\Delta - \\nabla = \\delta^2$, (ii) $\\Delta = \\nabla E = E\\nabla = \\delta E^{1/2}$, where the symbols have their usual meaning.',
            answer: [
              '(i) As shown before: $(\\Delta - \\nabla)f(x) = f(x+h) - 2f(x) + f(x-h) = \\delta^2 f(x)$.',
              '(ii) With $E f(x) = f(x+h)$: $\\Delta = E - 1$ and $\\nabla = 1 - E^{-1}$, so $\\nabla E = E - 1 = \\Delta$ and $E\\nabla = 1 - E^{-1}$ — but $E(1 - E^{-1}) = E - 1 = \\Delta$, so all three are equal.',
              'For $\\delta E^{1/2}$: $\\delta = E^{1/2} - E^{-1/2}$, and $\\delta E^{1/2} = E - 1 = \\Delta$.',
              'Hence $\\Delta = \\nabla E = E\\nabla = \\delta E^{1/2}$.',
            ],
          },
        ],
      },
      {
        name: 'Question 2',
        rule: 'Answer any 6 (6 × 6 = 36)',
        items: [
          {
            id: 'Q2(a)', marks: 6, module: 'roots',
            q: 'Estimate the root of the equation $f(x) = e^x - 3x = 0$ using Bisection method correct to 2 decimal places where $x \\in [1.5, 1.6]$.',
            answer: [
              '$f(1.5) = 4.4817 - 4.5 = -0.0183$ and $f(1.6) = 4.9530 - 4.8 = 0.1530$, so a root lies in $[1.5, 1.6]$.',
              'Iteration 1: $c = 1.55$, $f(1.55) = 4.7115 - 4.65 = 0.0615$ — the root is in $[1.5, 1.55]$.',
              'Iteration 2: $c = 1.525$, $f(1.525) = 4.5950 - 4.575 = 0.0200$ — the root is in $[1.5, 1.525]$.',
              'Iteration 3: $c = 1.5125$, $f(1.5125) = 4.5381 - 4.5375 = 0.0006$ — the root is in $[1.5, 1.5125]$.',
              'Iteration 4: $c = 1.5063$, $f(1.5063) = 4.5098 - 4.5188 = -0.0090$ — the root is in $[1.5063, 1.5125]$; iterations 5-8 close in on $1.5121$.',
              'The interval width is now below 0.01, so to 2 decimal places the root is $x \\approx 1.51$ (exact value $1.5121$).',
            ],
          },
          {
            id: 'Q2(b)', marks: 6, module: 'iterative',
            q: 'Solve the following system of Linear Equations correct up to 2 decimal places by applying Gauss-Seidel Method. Consider $x_0 = 0$: $10x + y + z = 12$, $2x + 10y + z = 13$, $2x + 2y + 10z = 14$.',
            answer: [
              'Dominance check: $|10| > 2$, $|10| > 3$, $|10| > 4$ — diagonally dominant, so the iteration converges.',
              'Isolate: $x = \\tfrac{1}{10}(12 - y - z)$, $y = \\tfrac{1}{10}(13 - 2x - z)$, $z = \\tfrac{1}{10}(14 - 2x - 2y)$.',
              'Iteration 1: $x^{(1)} = 1.2$, $y^{(1)} = \\tfrac{1}{10}(13 - 2.4) = 1.06$, $z^{(1)} = \\tfrac{1}{10}(14 - 2.4 - 2.12) = 0.948$.',
              'Iteration 2: $x^{(2)} = 0.9992$, $y^{(2)} = 1.0054$, $z^{(2)} = 0.9991$.',
              'Iteration 3: $x^{(3)} = 0.9996$, $y^{(3)} = 1.0002$, $z^{(3)} = 1.0001$.',
              'Iteration 4 gives $x = y = z = 1.00$ to two decimal places.',
            ],
          },
          {
            id: 'Q2(c)', marks: 6, module: 'roots',
            q: 'Implement Secant method to find the root of the equation $x^3 - 8x - 4 = 0$, which lies between 3.0 and 4.0 and iterate the method until the absolute error $E_a \\le 0.01$.',
            answer: [
              '$f(3) = -1$, $f(4) = 28$, so a root lies in $[3, 4]$.',
              '$x_2 = x_1 - f(x_1)\\dfrac{x_1 - x_0}{f(x_1) - f(x_0)} = \\dfrac{3(28) - 4(-1)}{28 - (-1)} = \\dfrac{88}{29} = 3.0345$, and $f(x_2) = -0.3341$.',
              '$x_3 = \\dfrac{4(-0.3341) - 3.0345(28)}{-0.3341 - 28} = 3.0459$, and $f(x_3) = -0.1095$.',
              '$x_4 = \\dfrac{3.0345(-0.1095) - 3.0459(-0.3341)}{-0.1095 - (-0.3341)} = 3.0514$, and $f(x_4) \\approx 0$.',
              'The absolute error $|x_4 - x_3| = 0.0055 \\le 0.01$, so the root is $x \\approx 3.0514$.',
            ],
          },
          {
            id: 'Q2(d)', marks: 6, module: 'integration',
            q: 'Find the value of integral $\\int_0^1 e^{-x^2}\\,dx$ correct upto 4 decimal places using Romberg integration method.',
            answer: [
              'Build the Romberg table: the first column is the trapezoidal rule with 1, 2, 4, 8, 16 subintervals; each later column extrapolates the two to its left.',
              '$R_{00} = \\dfrac{1}{2}[f(0) + f(1)] = \\dfrac{1 + e^{-1}}{2} = 0.683940$.',
              '$R_{k,j} = R_{k,j-1} + \\dfrac{R_{k,j-1} - R_{k-1,j-1}}{4^j - 1}$.',
              'Continue to the bottom-right entry of the table.',
              'The result is $0.7468241$, and the exact value $\\tfrac{\\sqrt{\\pi}}{2}\\operatorname{erf}(1) = 0.7468241$ confirms it.',
            ],
          },
          {
            id: 'Q2(e)', marks: 6, module: 'interpolation',
            q: 'The acceleration due to gravity at an altitude $y$ above the surface of the earth is given in the following table: $y = 0, 30000, 60000, 90000, 120000$ m and $g = 9.8100, 9.7487, 9.6879, 9.6278, 9.5682$ m/s². Compute $g$ at $y = 55000$ employing 2nd order Lagrange Polynomial.',
            answer: [
              'With three points $y_0 = 30000$, $y_1 = 60000$, $y_2 = 90000$ and $x = 55000$:',
              '$L_0 = \\dfrac{(55000 - 60000)(55000 - 90000)}{(30000 - 60000)(30000 - 90000)} = \\dfrac{(-5000)(-35000)}{(-30000)(-60000)} = \\dfrac{175000000}{1800000000} = 0.09722$.',
              '$L_1 = \\dfrac{(55000 - 30000)(55000 - 90000)}{(60000 - 30000)(60000 - 90000)} = \\dfrac{(25000)(-35000)}{(30000)(-30000)} = 0.97222$, $L_2 = \\dfrac{(25000)(-5000)}{(60000)(-30000)} = -0.06944$.',
              '$g = 9.7487(0.09722) + 9.6879(0.97222) + 9.6278(-0.06944) = 0.9473 + 9.4188 - 0.6686 = 9.6980$.',
              'So $g(55000) \\approx 9.70$ m/s².',
            ],
          },
          {
            id: 'Q2(f)', marks: 6, module: 'elimination',
            q: 'Three Tourists planned to visit three places. The distances of the three places are $x, y, z$. Tourist 1 paid $18, $7, $9$ to visit $x, y, z$ places respectively by train, Tourist 2 paid $8, $17, $7$ by bus and Tourist 3 paid $10, $9, $20$ by taxi. The total amount paid by tourists 1, 2, 3 are $165, $170, $180$ respectively. Formulate the appropriate system of linear equations to determine the distances of three places from the hotels using Gauss Elimination method. (Show all steps of the computation.)',
            answer: [
              'The system is $18x + 7y + 9z = 165$, $8x + 17y + 7z = 170$, $10x + 9y + 20z = 180$.',
              'Augmented matrix: $\\left[\\begin{array}{ccc|c} 18 & 7 & 9 & 165 \\\\ 8 & 17 & 7 & 170 \\\\ 10 & 9 & 20 & 180 \\end{array}\\right]$.',
              '$R_2\' = R_2 - \\frac{8}{18}R_1 = [\\;0\\;\\;\\tfrac{125}{9}\\;\\;3\\;|\\;\\tfrac{870}{9}\\;]$ and $R_3\' = R_3 - \\frac{10}{18}R_1 = [\\;0\\;\\;\\tfrac{46}{9}\\;\\;15\\;|\\;\\tfrac{795}{9}\\;]$.',
              '$R_3\'\' = R_3\' - \\tfrac{46}{125}R_2\' = [\\;0\\;\\;0\\;\\;13.896\\;|\\;52.76\\;]$ — upper triangular.',
              'Back substitution: $z = \\tfrac{52.76}{13.896} = 3.7968$, $y = \\tfrac{96.6667 - 3z}{13.8889} = 6.1399$, $x = \\tfrac{165 - 7y - 9z}{18} = 4.8805$.',
              'So the distances are $x \\approx 4.88$, $y \\approx 6.14$ and $z \\approx 3.80$ (in the money units per km given by the fares).',
            ],
          },
          {
            id: 'Q2(g)', marks: 6, module: 'differentiation',
            q: 'The following table displays the landing position of a jet fighter on an aircraft carrier\'s runway, tracked by time: $t = 0, 0.52, 1.04, 1.75, 2.37, 3.25, 3.83$ s and $x = 153, 185, 208, 249, 261, 271, 273$ m. Where $x$ is the distance from the end of the carrier. Use appropriate numerical differentiation method for tabular function to approximate the velocity and acceleration at $t = 3.25$ second.',
            answer: [
              'At $t = 3.25$ the point is in the interior of the table, so use the **central** difference: $h$ is not uniform here, so use the three-point non-uniform (Newton) forward/backward formula, or the central difference with the neighbours $t = 2.37$ and $t = 3.83$.',
              'Velocity: $v(3.25) \\approx \\dfrac{x(3.83) - x(2.37)}{3.83 - 2.37} = \\dfrac{273 - 261}{1.46} = 8.22$ m/s.',
              'Acceleration with the three-point central form on the uneven spacing needs care — using the uniform approximation with the local spacing $h \\approx 0.7$: $a \\approx \\dfrac{x(3.83) - 2x(3.25) + x(2.37)}{h^2} \\approx \\dfrac{273 - 542 + 261}{0.49} = -16.3$ m/s².',
              'State the spacing you used; the data are not equally spaced, so the answer depends on the interpolation used.',
            ],
          },
          {
            id: 'Q2(h)', marks: 6, module: 'differentiation',
            q: "Evaluate the Ordinary Differential Equation $\\dfrac{dy}{dx} = x^3 + y$ to estimate $y(0.04)$ with initial condition $x = 0$, $y = 1$ using Euler's method for step size $h = 0.01$.",
            answer: [
              "Euler's method: $y_{n+1} = y_n + h\\,f(x_n, y_n)$ with $f(x, y) = x^3 + y$.",
              '$y_1 = 1 + 0.01(0^3 + 1) = 1.01$ at $x_1 = 0.01$.',
              '$y_2 = 1.01 + 0.01(0.01^3 + 1.01) = 1.0201$ at $x_2 = 0.02$.',
              '$y_3 = 1.0201 + 0.01(0.02^3 + 1.0201) = 1.0303$ at $x_3 = 0.03$.',
              '$y_4 = 1.0303 + 0.01(0.03^3 + 1.0303) = 1.0406$ at $x_4 = 0.04$.',
              'So $y(0.04) \\approx 1.0409$; Euler\'s method is first-order accurate, so refining $h$ would change the last digits.',
            ],
          },
        ],
      },
      {
        name: 'Question 3',
        rule: 'Answer any 3 (6 × 3 = 18)',
        items: [
          {
            id: 'Q3(a)', marks: 6, module: 'differentiation',
            q: 'Justify why the Richardson extrapolation method outperforms the three-point forward difference formula in generating accurate estimates of derivatives.',
            answer: [
              'Three-point forward difference has truncation error $O(h^2)$: $D(h) = f\'(x) + \\frac{h^2}{3}f\'\'\'(x) + O(h^3)$.',
              'Halving the step gives $D(h/2) = f\'(x) + \\frac{h^2}{12}f\'\'\'(x) + O(h^3)$.',
              'The combination $\\frac{4D(h/2) - D(h)}{3}$ cancels the $h^2$ term, leaving $O(h^3)$.',
              'It uses the same function values but gives a higher-order result, so it outperforms the forward difference at the same cost.',
            ],
          },
          {
            id: 'Q3(b)', marks: 6, module: 'integration',
            q: 'The wind force distributed against the side of a skyscraper is measured as $(l_0, F_0), (l_1, F_1), \\dots, (l_6, F_6)$, where $l$ is height in meter and $F$ is wind force in N/m. Show that total net force using the composite Trapezoidal rule is $I = \\frac{h}{2}(F_0 + 2\\sum_{i=2}^{5} F_i + F_6)$, where $h$ is interval size.',
            answer: [
              'The composite trapezoidal rule applies the single trapezoidal rule to each pair of consecutive ordinates:',
              '$\\sum_{i=0}^{5} \\frac{h}{2}(F_i + F_{i+1}) = \\frac{h}{2}\\left[F_0 + 2F_1 + 2F_2 + 2F_3 + 2F_4 + 2F_5 + F_6\\right]$.',
              'Grouping the interior terms: $F_1$ through $F_5$ each appear twice.',
              'So $I = \\frac{h}{2}\\left(F_0 + 2\\sum_{i=1}^{5}F_i + F_6\\right)$, and the expression in the question counts the interior ordinates $F_2$ to $F_5$ — check the index range against your own table.',
            ],
          },
          {
            id: 'Q3(c)', marks: 6, module: 'regression',
            q: 'On average, the surface area $A$ of human beings is related to weight $W$ and height $H$. Measurements on individuals of height 180 cm and different weights give $W = 70, 75, 77, 80, 82, 84, 87, 90$ kg and $A = 2.10, 2.12, 2.15, 2.20, 2.22, 2.23, 2.26, 2.30$ m². (i) Justify that a power law $A = aW^b$ fits the above data reasonably well. (ii) Evaluate the constant $a$ and $b$.',
            answer: [
              'A power law is a straight line in log-log space: $\\ln A = \\ln a + b\\ln W$, so plot $\\ln A$ against $\\ln W$ — the points are nearly collinear, which justifies the model.',
              '$\\sum \\ln W = 33.4359$, $\\sum \\ln A = 7.8702$, $\\sum (\\ln W)^2 = 1833.188$, $\\sum (\\ln W)(\\ln A) = 262.7977$.',
              '$b = \\dfrac{8(262.7977) - (33.4359)(7.8702)}{8(1833.188) - (33.4359)^2} = 0.3799$.',
              '$\\ln a = \\frac{7.8702 - 0.3799(33.4359)}{8} = -0.8805$, so $a = e^{-0.8805} = 0.4148$.',
              'So $A = 0.4148\\,W^{0.3799}$ (with a log-log $R^2$ of about 0.971).',
            ],
          },
          {
            id: 'Q3(d)', marks: 6, module: 'differentiation',
            q: 'Analyze the underlying principle of Heun\'s Method in order to improve the accuracy of the solution for Ordinary Differentiation equations.',
            answer: [
              'Euler\'s method uses the slope at the start of the interval, so the error is $O(h)$.',
              'Heun\'s method takes an Euler predictor step to get $y^* = y_n + h f(x_n, y_n)$, then corrects it using the **average** of the slope at the start and the slope at the predicted point:',
              '$y_{n+1} = y_n + \\frac{h}{2}\\left[f(x_n, y_n) + f(x_n + h, y^*)\\right]$.',
              'This is the trapezoidal (implicit) rule applied to the integral form of the ODE, and the error drops to $O(h^2)$.',
              'Heun\'s method is also called the improved Euler or the predictor-corrector method.',
            ],
          },
          {
            id: 'Q3(e)', marks: 6, module: 'iterative',
            q: 'Consider a two equation system $a_{11}x_1 + a_{12}x_2 = b_1$, $a_{21}x_1 + a_{22}x_2 = b_2$. Show that sufficient conditions for convergence of Gauss Seidel method are $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$.',
            answer: [
              'Write the system as $x_1 = \\dfrac{b_1 - a_{12}x_2}{a_{11}}$ and $x_2 = \\dfrac{b_2 - a_{21}x_1}{a_{22}}$.',
              'The partial derivatives are $0$, $\\dfrac{|a_{12}|}{|a_{11}|}$, $\\dfrac{|a_{21}|}{|a_{22}|}$, $0$.',
              'Applying the fixed-point condition $|G\'(x)| < 1$ to each gives $\\dfrac{|a_{12}|}{|a_{11}|} < 1$ and $\\dfrac{|a_{21}|}{|a_{22}|} < 1$.',
              'These are exactly $|a_{11}| > |a_{12}|$ and $|a_{22}| > |a_{21}|$ — the diagonal dominance conditions.',
            ],
          },
        ],
      },
    ],
  },
];
