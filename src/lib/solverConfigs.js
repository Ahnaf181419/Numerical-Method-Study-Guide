// The registry of interactive solvers: id -> list of { title, fields, run }.
// Kept in a plain .js file so the content test can check that every module's solver ids exist.
import * as s from './solvers.js';

// Field types: num (positive number), num0 (number ≥ 0), any (any number), nums (comma-separated numbers),
// list (whole numbers), select, matrix (rows separated by ';'), vec (comma-separated), points ('x,y;x,y'),
// bits (0/1 string), bitrows, paths.
// Defaults are the slide/note examples so each solver opens on a known answer.
export const SOLVERS = {
  gauss: [
    {
      title: 'Gauss elimination (naive — no pivoting unless a zero pivot appears)',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,1,1;2,3,1;3,4,5'],
        ['b', 'Constants', 'vec', '6,13,18'],
        ['pivot', 'Pivoting', 'select', 'auto', ['auto', 'on', 'off']],
      ],
      run: (v) => s.gaussEliminate(v),
    },
    {
      title: 'Gauss elimination with partial pivoting (check at every pivot row)',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,2,-3;-9,8,7;4,5,6'],
        ['b', 'Constants', 'vec', '-4,28,32'],
      ],
      run: (v) => s.gaussEliminate({ ...v, pivot: 'on' }),
    },
    {
      title: 'Gauss-Jordan (ends at the identity matrix — no back substitution)',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,1,1;2,3,1;3,4,5'],
        ['b', 'Constants', 'vec', '6,13,18'],
      ],
      run: (v) => s.gaussJordan(v),
    },
  ],
  gaussPivot: [
    {
      title: 'Gauss elimination with partial pivoting',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,2,-3;-9,8,7;4,5,6'],
        ['b', 'Constants', 'vec', '-4,28,32'],
      ],
      run: (v) => s.gaussEliminate({ ...v, pivot: 'on' }),
    },
  ],
  gaussJordan: [
    {
      title: 'Gauss-Jordan elimination',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,1,1;2,3,1;3,4,5'],
        ['b', 'Constants', 'vec', '6,13,18'],
      ],
      run: (v) => s.gaussJordan(v),
    },
  ],
  jacobi: [
    {
      title: "Jacobi's method (checks diagonal dominance first)",
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '5,2,1;1,4,2;1,2,5'],
        ['b', 'Constants', 'vec', '12,15,20'],
        ['x0', 'Starting values (leave blank for zero)', 'vec', '0,0,0'],
        ['tol', 'Tolerance', 'num', '0.000001'],
        ['maxIter', 'Maximum iterations', 'num', '20'],
      ],
      run: (v) => s.jacobi(v),
    },
  ],
  seidel: [
    {
      title: 'Gauss-Seidel method (checks diagonal dominance first)',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '2,1,1;3,5,2;2,1,4'],
        ['b', 'Constants', 'vec', '5,15,8'],
        ['x0', 'Starting values (leave blank for zero)', 'vec', '0,0,0'],
        ['tol', 'Tolerance', 'num', '0.000001'],
        ['maxIter', 'Maximum iterations', 'num', '20'],
      ],
      run: (v) => s.gaussSeidel(v),
    },
  ],
  dominance: [
    {
      title: 'Diagonal dominance check',
      fields: [['A', 'Coefficient matrix — rows separated by ;', 'matrix', '5,2,1;1,4,2;1,2,5']],
      run: (v) => s.diagonalDominance(v),
    },
  ],
  lu: [
    {
      title: 'Do-Little LU factorisation',
      fields: [['A', 'Coefficient matrix — rows separated by ;', 'matrix', '1,2,4;3,8,14;2,6,13']],
      run: (v) => s.luDecompose(v),
    },
  ],
  luSolve: [
    {
      title: 'Solve with Do-Little LU (factorise, then forward and backward substitution)',
      fields: [
        ['A', 'Coefficient matrix — rows separated by ;', 'matrix', '2,1,1;-4,3,2;6,5,7'],
        ['b', 'Constants', 'vec', '9,20,35'],
      ],
      run: (v) => s.luSolve(v),
    },
  ],
  bisection: [
    {
      title: 'Bisection method',
      fields: [
        ['expr', 'f(x) — for example x^3 - 9*x + 1', 'expr', 'x^3 - 9*x + 1'],
        ['a', 'Left end of the bracket', 'num', '2'],
        ['b', 'Right end of the bracket', 'num', '3'],
        ['tol', 'Tolerance', 'num', '0.001'],
      ],
      run: (v) => s.bisection(v),
    },
  ],
  newton: [
    {
      title: 'Newton-Raphson method',
      fields: [
        ['expr', 'f(x) — for example x^3 - 4*x^2 + x + 6', 'expr', 'x^3 - 4*x^2 + x + 6'],
        ['x0', 'Initial guess', 'any', '0'],
        ['tol', 'Tolerance', 'num', '0.001'],
      ],
      run: (v) => s.newtonRaphson(v),
    },
  ],
  secant: [
    {
      title: 'Secant method',
      fields: [
        ['expr', 'f(x) — for example x^3 - 8*x - 4', 'expr', 'x^3 - 8*x - 4'],
        ['x0', 'First starting value', 'any', '3'],
        ['x1', 'Second starting value', 'any', '4'],
        ['tol', 'Tolerance', 'num', '0.001'],
      ],
      run: (v) => s.secant(v),
    },
  ],
  horner: [
    {
      title: "Horner's rule and synthetic division",
      fields: [
        ['coeffs', 'Coefficients, highest power first', 'nums', '1,7,5,-31,-30'],
        ['r', 'The root to divide by', 'any', '-3'],
      ],
      run: (v) => s.horner(v),
    },
  ],
  newtonFwd: [
    {
      title: "Newton's forward (Gregory) interpolation — equal intervals",
      fields: [
        ['xs', 'x values', 'nums', '0,1,2,3'],
        ['ys', 'y values', 'nums', '-1,1,1,-2'],
        ['x', 'Point to evaluate at', 'any', '1.5'],
      ],
      run: (v) => s.newtonForward(v),
    },
  ],
  gaussInterp: [
    {
      title: "Gauss forward / Gauss backward / Stirling — central differences",
      fields: [
        ['xs', 'x values (equally spaced)', 'nums', '21,25,29,33,37'],
        ['ys', 'y values', 'nums', '18.4708,17.8144,17.1070,16.3432,15.5154'],
        ['x', 'Point to evaluate at', 'any', '30'],
        ['formula', 'Formula', 'select', 'forward', ['forward', 'backward', 'stirling']],
      ],
      run: (v) => s.gaussInterp(v),
    },
  ],
  lagrange: [
    {
      title: "Lagrange interpolation — unequal intervals",
      fields: [
        ['xs', 'x values', 'nums', '5,7,11,13,17'],
        ['ys', 'y values', 'nums', '150,392,1452,2366,5202'],
        ['x', 'Point to evaluate at', 'any', '9'],
      ],
      run: (v) => s.lagrange(v),
    },
  ],
  divDiff: [
    {
      title: "Newton's divided difference interpolation — unequal intervals",
      fields: [
        ['xs', 'x values', 'nums', '5,7,11,13,17'],
        ['ys', 'y values', 'nums', '150,392,1452,2366,5202'],
        ['x', 'Point to evaluate at', 'any', '9'],
      ],
      run: (v) => s.dividedDifference(v),
    },
  ],
  diffTable: [
    {
      title: 'Forward difference table (equal intervals)',
      fields: [
        ['xs', 'x values', 'nums', '0,25,50,75,100,125'],
        ['ys', 'y values', 'nums', '0,32,58,78,92,100'],
      ],
      run: (v) => {
        const h = v.xs[1] - v.xs[0];
        const cols = [v.ys];
        let cur = v.ys;
        while (cur.length > 1) {
          cur = cur.slice(1).map((val, i) => val - cur[i]);
          cols.push(cur);
        }
        return {
          result: { cols },
          steps: [
            `h = ${h}`,
            '\\begin{array}{c|' + 'c'.repeat(cols.length) + '} \\hline ' +
              cols.map((_, k) => `\\Delta^{${k}}`).join(' & ') + ' \\\\ \\hline ' +
              cols.map((c) => c.map((val) => String(val)).join(' & ')).join(' \\\\ ') + ' \\end{array}',
          ],
        };
      },
    },
  ],
  central: [
    {
      title: 'Numerical differentiation of a table',
      fields: [
        ['xs', 'x values', 'nums', '0,25,50,75,100,125'],
        ['ys', 'y values', 'nums', '0,32,58,78,92,100'],
        ['x', 'Point to differentiate at', 'any', '50'],
        ['method', 'Formula', 'select', 'central2', ['forward2', 'forward3', 'backward2', 'backward3', 'central2', 'central3', 'secondCentral']],
      ],
      run: (v) => s.differentiate(v),
    },
  ],
  richardson: [
    {
      title: 'Richardson extrapolation from two central differences',
      fields: [
        ['expr', 'f(x) — for example exp(-x^2)', 'expr', 'exp(-x^2)'],
        ['x', 'Point to differentiate at', 'any', '0.5'],
        ['h', 'Step size', 'num', '0.1'],
      ],
      run: (v) => s.richardson(v),
    },
  ],
  trapezoid: [
    {
      title: 'Trapezoidal and composite rules on a table',
      fields: [
        ['xs', 'x values', 'nums', '0,0.2,0.4,0.6,0.8,1'],
        ['ys', 'y values', 'nums', '1,0.961538,0.862069,0.735294,0.609756,0.5'],
        ['method', 'Rule', 'select', 'trapezoid', ['trapezoid', 'simpson13', 'simpson38', 'weddle', 'compositeTrapezoid', 'compositeSimpson13']],
      ],
      run: (v) => s.integrate(v),
    },
  ],
  simpson13: [
    {
      title: "Simpson's 1/3 rule on a table (needs an even number of subintervals)",
      fields: [
        ['xs', 'x values', 'nums', '0,0.5,1,1.5,2'],
        ['ys', 'y values', 'nums', '0,0.75,2,4.25,8'],
      ],
      run: (v) => s.integrate({ ...v, method: 'simpson13' }),
    },
  ],
  simpson38: [
    {
      title: "Simpson's 3/8 rule on a table (needs a multiple of three subintervals)",
      fields: [
        ['xs', 'x values', 'nums', '0,0.5,1,1.5,2,2.5,3'],
        ['ys', 'y values', 'nums', '0,0.25,1,2.25,4,6.25,9'],
      ],
      run: (v) => s.integrate({ ...v, method: 'simpson38' }),
    },
  ],
  weddle: [
    {
      title: "Weddle's rule on a table (needs a multiple of six subintervals)",
      fields: [
        ['xs', 'x values', 'nums', '0,0.333333,0.666667,1,1.333333,1.666667,2'],
        ['ys', 'y values', 'nums', '0,0.555556,0.888889,1,0.888889,0.555556,0'],
      ],
      run: (v) => s.integrate({ ...v, method: 'weddle' }),
    },
  ],
  romberg: [
    {
      title: "Romberg integration",
      fields: [
        ['expr', 'f(x) — for example exp(-x^2)', 'expr', 'exp(-x^2)'],
        ['a', 'Lower limit', 'any', '0'],
        ['b', 'Upper limit', 'any', '1'],
        ['n', 'Subintervals (a power of 2)', 'num', '8'],
      ],
      run: (v) => s.romberg(v),
    },
  ],
  leastSquares: [
    {
      title: 'Least squares straight line y = a + b x',
      fields: [
        ['xs', 'x values', 'nums', '70,75,77,80,82,84,87,90'],
        ['ys', 'y values', 'nums', '2.10,2.12,2.15,2.20,2.22,2.23,2.26,2.30'],
      ],
      run: (v) => s.leastSquares(v),
    },
  ],
  powerLaw: [
    {
      title: 'Power law fit y = a x^b (log-log least squares)',
      fields: [
        ['xs', 'x values', 'nums', '1,2,3,4,5'],
        ['ys', 'y values', 'nums', '0.5,4,13.5,32,62.5'],
      ],
      run: (v) => s.powerLawFit(v),
    },
  ],
  polyReg: [
    {
      title: 'Polynomial regression y = a1 + a2 x + ... (least squares)',
      fields: [
        ['xs', 'x values', 'nums', '1,2,3,4'],
        ['ys', 'y values', 'nums', '6,11,18,27'],
        ['degree', 'Degree of the polynomial', 'num', '2'],
      ],
      run: (v) => s.polyRegression(v),
    },
  ],
  multiReg: [
    {
      title: 'Multiple linear regression y = a1 + a2 x + a3 z',
      fields: [
        ['xs', 'x values', 'nums', '57,59,49,62,51,50,55,48,52,42,61,57'],
        ['zs', 'z values', 'nums', '8,10,6,11,8,7,10,9,10,6,12,9'],
        ['ys', 'y values', 'nums', '64,71,53,67,55,58,77,57,56,51,76,68'],
      ],
      run: (v) => s.multipleRegression(v),
    },
  ],
  gradBatch: [
    {
      title: 'Gradient descent — batch mode',
      fields: [
        ['xs', 'x values', 'nums', '1,2,4,3,5'],
        ['ys', 'y values', 'nums', '1,3,3,2,5'],
        ['degree', 'Degree of the polynomial', 'num', '1'],
        ['alpha', 'Learning rate', 'num', '0.01'],
        ['epochs', 'Number of epochs', 'num', '3'],
        ['theta0', 'Starting parameters (comma separated)', 'nums', '0,0'],
      ],
      run: (v) => s.gradientDescent({ ...v, mode: 'batch' }),
    },
  ],
  gradSingle: [
    {
      title: 'Gradient descent — single mode',
      fields: [
        ['xs', 'x values', 'nums', '1,2,4,3,5'],
        ['ys', 'y values', 'nums', '1,3,3,2,5'],
        ['degree', 'Degree of the polynomial', 'num', '1'],
        ['alpha', 'Learning rate', 'num', '0.01'],
        ['epochs', 'Number of epochs', 'num', '1'],
        ['theta0', 'Starting parameters (comma separated)', 'nums', '0,0'],
      ],
      run: (v) => s.gradientDescent({ ...v, mode: 'single' }),
    },
  ],
  gradPoly2: [
    {
      title: 'Gradient descent — 2nd degree polynomial, batch mode',
      fields: [
        ['xs', 'x values', 'nums', '0,2,3,5,4'],
        ['ys', 'y values', 'nums', '0,5,6,9,7'],
        ['degree', 'Degree of the polynomial', 'num', '2'],
        ['alpha', 'Learning rate', 'num', '0.2'],
        ['epochs', 'Number of epochs', 'num', '1'],
        ['theta0', 'Starting parameters (comma separated)', 'nums', '2,1,3'],
      ],
      run: (v) => s.gradientDescent({ ...v, mode: 'batch' }),
    },
  ],
  pca: [
    {
      title: 'PCA — mean normalisation only',
      fields: [
        ['points', 'Data points as x,y;x,y;…', 'points', '2.5,2.4;0.5,0.7;2.2,2.9;1.9,2.2;3.1,3;2.3,2.7;2,1.6;1,1.1;1.5,1.6;1.1,0.9'],
        ['threshold', 'Percentage of variance to keep', 'num', '95'],
      ],
      run: (v) => s.pca(v),
    },
  ],
  pcaScaled: [
    {
      title: 'PCA — mean normalisation and scaling',
      fields: [
        ['points', 'Data points as x,y;x,y;…', 'points', '2.5,2.4;0.5,0.7;2.2,2.9;1.9,2.2;3.1,3;2.3,2.7;2,1.6;1,1.1;1.5,1.6;1.1,0.9'],
        ['threshold', 'Percentage of variance to keep', 'num', '95'],
      ],
      run: (v) => s.pca({ ...v, scale: true }),
    },
  ],
};
