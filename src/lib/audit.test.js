// Locks the printed answers to the engine: the key numbers in the worked examples and the
// past-paper model answers must agree with src/lib/solvers.js. Run by CI before every deploy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as s from './solvers.js';
import modules from '../data/syllabusData.js';
import papers from '../data/pastPapers.js';

const exampleText = (id, titlePart) => {
  const m = modules.find((x) => x.id === id);
  const e = m.examples.find((x) => x.title.includes(titlePart));
  assert.ok(e, `${id}: no example matching "${titlePart}"`);
  return [e.question, ...e.steps.map((st) => (typeof st === 'string' ? st : st.t)), e.answer].join('\n');
};
const paperText = (titlePart, itemId) => {
  const p = papers.find((x) => x.title.includes(titlePart));
  const it = p.sets.flatMap((set) => set.items).find((i) => i.id === itemId);
  assert.ok(it, `${titlePart}: no item ${itemId}`);
  return [it.q, ...it.answer].join('\n');
};
const has = (text, num, label) => assert.ok(text.includes(num), `${label}: expected to find ${num}`);

const close = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

const sectionText = (id, heading) => {
  const m = modules.find((x) => x.id === id);
  const sec = m.sections.find((x) => x.heading === heading);
  assert.ok(sec, `${id}: no section "${heading}"`);
  return sec.blocks.flatMap((b) => [b.text, b.tex, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows ?? []).flat()]).filter(Boolean).join('\n');
};

test('elimination examples match the engine', () => {
  // board notes Example 1: x + y + z = 6, 2x + 3y + z = 13, 3x + 2y + 5z = 18
  const sys = { A: [[1, 1, 1], [2, 3, 1], [3, 2, 5]], b: [6, 13, 18] };
  const r = s.gaussEliminate(sys).result.x;
  const t = exampleText('elimination', 'no pivoting');
  ['3x + 2y + 5z = 18', 'x = 3', 'y = 2', 'z = 1'].forEach((n) => has(t, n, 'naive'));
  [3, 2, 1].forEach((v, i) => close(r[i], v));
  has(exampleText('elimination', 'Gauss-Jordan on the same system'), 'x = 3', 'board Gauss-Jordan');
  const f24 = s.gaussEliminate({ A: [[1, 2, -3], [-9, 8, 7], [4, 5, 6]], b: [-4, 28, 32], pivot: 'on' });
  const tf = exampleText('elimination', 'partial pivoting');
  ['tfrac{26}{9}', 'tfrac{77}{9}', 'tfrac{408}{77}'].forEach((n) => has(tf, n, 'F24 pivoting'));
  close(s.gaussEliminate({ A: [[1, 2, -3], [-9, 8, 7], [4, 5, 6]], b: [-4, 28, 32], pivot: 'on' }).result.x[2], 3, 1e-9);
  f24.result.x.forEach((v) => close(v, [1, 2, 3][f24.result.x.indexOf(v)]));
  const tp = exampleText('elimination', 'second pivot row');
  ['tfrac{38}{17}', '-\\tfrac{7}{17}', 'tfrac{16}{17}'].forEach((n) => has(tp, n, 'second pivot'));
  close(s.gaussEliminate({ A: [[2, 1, 1], [2, 3, 4], [2, -4, 2]], b: [5, 7, 8], pivot: 'on' }).result.x[0], 38 / 17);
});

test('iterative examples match the engine', () => {
  const t = exampleText('iterative', "Jacobi's method");
  ['2.40', '3.75', '4.00', '0.93', '1.92', '2.93'].forEach((n) => has(t, n, 'jacobi'));
  const j8 = s.jacobi({ A: [[5, 2, 1], [1, 4, 2], [1, 2, 5]], b: [12, 15, 20], x0: [0, 0, 0], tol: 1e-12, maxIter: 8 }).result.table[8].x;
  [0.93, 1.92, 2.93].forEach((v, i) => close(j8[i], v, 0.005));
  const j = s.jacobi({ A: [[5, 2, 1], [1, 4, 2], [1, 2, 5]], b: [12, 15, 20], x0: [0, 0, 0] }).result.table[1].x;
  [2.4, 3.75, 4].forEach((v, i) => close(j[i], v));
  const g = exampleText('iterative', 'Gauss-Seidel');
  ['2.50', '1.5', '0.375', '1.5625', '1.9125'].forEach((n) => has(g, n, 'seidel'));
  const d = exampleText('iterative', 'diverges');
  ['-139', '(2, 3, 1)'].forEach((n) => has(d, n, 'divergence'));
});

test('LU examples match the engine', () => {
  const t = exampleText('lu', "slide's matrix");
  ['8 - (3)(2) = 2', '13 - (2)(4) - (1)(2) = 3'].forEach((n) => has(t, n, 'LU slide'));
  // Fall 2024 A2(d) as printed: +4x + 3y + 2z = 20
  const r = s.luSolve({ A: [[2, 1, 1], [4, 3, 2], [6, 5, 7]], b: [9, 20, 35] }).result;
  [3, 2, 1].forEach((v, i) => close(r.x[i], v));
  const tf = exampleText('lu', 'Solving a system');
  ['u_{33} = 7 - (3)(1) - (2)(0) = 4', '35 - (3)(9) - (2)(2)', 'z = 1}'].forEach((n) => has(tf, n, 'LU F24'));
});

test('PCA examples match the engine', () => {
  const P = [[2.5, 2.4], [0.5, 0.7], [2.2, 2.9], [1.9, 2.2], [3.1, 3.0], [2.3, 2.7], [2.0, 1.6], [1.0, 1.1], [1.5, 1.6], [1.1, 0.9]];
  const r = s.pca({ points: P, threshold: 95 }).result;
  close(r.eigvals[0], 1.1556249, 1e-6);
  assert.equal(r.keep, 1);
  close(r.proj[0][0], 3.459, 1e-3);
  const t = exampleText('pca', 'keeping 95%');
  ['0.5549', '0.5539', '0.6449', '1.1556', '0.678', '0.735', '96.3', '3.459', '2.35', '2.54'].forEach((n) => has(t, n, 'PCA 95'));
  const ts = exampleText('pca', 'scaling');
  ['0.7449', '0.8031', '0.9259', '1.9259', '96.3'].forEach((n) => has(ts, n, 'PCA scaled'));
});

test('regression examples match the engine', () => {
  const W = [70, 75, 77, 80, 82, 84, 87, 90], A = [2.1, 2.12, 2.15, 2.2, 2.22, 2.23, 2.26, 2.3];
  const r = s.leastSquares({ xs: W, ys: A }).result;
  close(r.b, 0.010479, 1e-6);
  close(r.a, 1.3526, 1e-4);
  const t = exampleText('regression', 'Least-squares line');
  ['52303', '1420.53', '0.010479', '1.3526'].forEach((n) => has(t, n, 'least squares'));
  const p = s.powerLawFit({ xs: W, ys: A }).result;
  close(p.b, 0.3799, 1e-3);
  close(p.a, 0.4149, 1e-3);
  const tp = exampleText('regression', 'Power-law fit');
  ['0.3799', '0.4149'].forEach((n) => has(tp, n, 'power law'));
  const tl = exampleText('regression', 'two regression lines');
  has(tl, 'y = 16 + 1.6x', 'y on x');
  has(tl, 'x = -1 + 0.4y', 'x on y');
});

test('gradient examples match the engine', () => {
  const b = s.gradientDescent({ xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 1, mode: 'batch' }).result.theta;
  close(b[0], 0.028, 1e-9);
  close(b[1], 0.1, 1e-9);
  const t = exampleText('gradient', 'Batch mode');
  ['0.028', '-2.8', '-10', '0.0527', '0.1882'].forEach((n) => has(t, n, 'batch'));
  const g = s.gradientDescent({ xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 1, mode: 'single' }).result.theta;
  close(g[0], 0.1188, 1e-4);
  const ts = exampleText('gradient', 'Single mode');
  ['0.1188', '0.4101'].forEach((n) => has(ts, n, 'single'));
  const q = s.gradientDescent({ xs: [0, 2, 3, 5, 4], ys: [0, 5, 6, 9, 7], degree: 2, theta0: [2, 1, 3], alpha: 0.2, epochs: 1, mode: 'batch' }).result.theta;
  [-4.36, -25.12, -111.2].forEach((v, i) => close(q[i], v, 1e-9));
  const tq = exampleText('gradient', 'Degree-2');
  ['H_\\theta = 82', '31.8', '-4.36', '-25.12', '-111.2'].forEach((n) => has(tq, n, 'degree 2'));
});

test('roots examples match the engine', () => {
  close(s.bisection({ expr: 'x^2 - 4*x - 10', a: 5, b: 6, tol: 1e-6 }).result.root, 5.741657, 1e-5);
  has(exampleText('roots', '4x - 10'), '5.7417', 'bisection');
  close(s.newtonRaphson({ expr: 'x^3 - 4*x^2 + x + 6', x0: 0, tol: 1e-8 }).result.root, -1, 1e-4);
  close(s.secant({ expr: 'x^3 - 8*x - 4', x0: 3, x1: 4, tol: 1e-8 }).result.root, 3.051374, 1e-5);
  has(exampleText('roots', 'Secant'), '3.051', 'secant');
  const h = s.horner({ coeffs: [1, 0, 3, -2, 0], r: 3 }).result;
  close(h.value, 102, 1e-9);
  has(exampleText('roots', '3x^2 - 2x'), '102', 'horner');
  // the spherical tank must reproduce the Fall 2023 numbers: R = 3, V = 30 -> h = 2.027
  close(s.newtonRaphson({ expr: 'x^3 - 9*x^2 + 90/pi', x0: 1, tol: 1e-8 }).result.root, 2.0269, 1e-3);
  has(exampleText('roots', 'spherical tank'), '2.027', 'tank');
});

test('interpolation examples match the engine', () => {
  close(s.newtonForward({ xs: [0, 1, 2, 3], ys: [-1, 1, 1, -2], x: 1.5 }).result.y, 1.3125, 1e-9);
  close(s.dividedDifference({ xs: [5, 7, 11, 13, 17], ys: [150, 392, 1452, 2366, 5202], x: 9 }).result.y, 810, 1e-6);
  close(s.lagrange({ xs: [0, 1, 3, 4], ys: [5, 6, 50, 105], x: 2 }).result.y, 19, 1e-9);
  const t = exampleText('interpolation', 'cubic through');
  has(t, '1.3125', 'newton forward');
  has(exampleText('interpolation', 'f(9)'), '810', 'divided difference');
  const tm = exampleText('interpolation', 'Missing values');
  has(tm, 'b = 4(5) + 6 = 26', 'missing values');
  has(exampleText('interpolation', 'f(7.5)'), '421.875', 'backward');
  has(exampleText('interpolation', 'Bessel'), '3250.875', 'bessel');
  has(exampleText('interpolation', 'Stirling'), '47691.8256', 'stirling');
  has(exampleText('interpolation', 'y(30)'), '16.9216', 'gauss forward');
  has(exampleText('interpolation', '1966'), '32.625', 'gauss backward');
  has(exampleText('regression', 'Second-order polynomial'), 'y = 3 + 2x + x^2', 'polynomial regression');
  const mr = exampleText('regression', 'Regression plane');
  ['3.6512', '0.8546', '1.5063', '63.356'].forEach((n) => has(mr, n, 'multiple regression'));
});

test('differentiation and integration examples match the engine', () => {
  const xs = [0, 25, 50, 75, 100, 125], ys = [0, 32, 58, 78, 92, 100];
  close(s.differentiate({ xs, ys, x: 0, method: 'forward3' }).result.derivative, 1.4, 1e-9);
  close(s.differentiate({ xs, ys, x: 50, method: 'central2' }).result.derivative, 0.92, 1e-9);
  const t = exampleText('differentiation', 'rocket');
  ['1.4', '0.92', '-0.0096'].forEach((n) => has(t, n, 'rocket'));
  const v = exampleText('differentiation', 'vehicle');
  ['1.25', '0.75', '10.25', '1.0'].forEach((n) => has(v, n, 'vehicle'));
  close(s.differentiate({ xs: [0.49, 0.5, 0.51], ys: [1 / 1.2401, 0.8, 1 / 1.2601], x: 0.5, method: 'secondCentral' }).result.derivative, -0.256078, 1e-5);
  has(exampleText('differentiation', '1/(1 + x'), '-0.256078', 'second derivative');
  close(s.romberg({ expr: 'exp(-x^2)', a: 0, b: 1, n: 8 }).result.value, 0.746816, 1e-6);
  const r2 = exampleText('integration', 'from 0 to 1');
  has(r2, '0.746816', 'romberg e^-x^2');
  const r3 = exampleText('integration', '1/(1 + x) from 0 to 1.2');
  ['0.8113', '0.7943', '0.7899', '0.7886', '0.7884', '0.7883'].forEach((n) => has(r3, n, 'Shanker Ex 9.14'));
  const T = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75].map((x2) => 3.2 + 12 * x2 - 28 * x2 ** 2 + 32 * x2 ** 3 - 16 * x2 ** 4 + 3 * x2 ** 5);
  // Fall 2024 A2(e): Simpson 1/3 on 4 strips + Simpson 3/8 on 3 strips
  const I1 = s.integrate({ xs: [0, 0.25, 0.5, 0.75, 1], ys: T.slice(0, 5), method: 'simpson13' }).result.value;
  const I2 = s.integrate({ xs: [1, 1.25, 1.5, 1.75], ys: T.slice(4), method: 'simpson38' }).result.value;
  close(I1, 5.16224, 1e-5);
  close(I2, 5.66239, 1e-5);
  close(I1 + I2, 10.82463, 1e-5);
  ['5.16224', '5.66239', '10.82463', '10.8246'].forEach((n) => has(exampleText('integration', 'aircraft'), n, 'aircraft'));
  // S24 Q2(h): the paper integrates over [0, 3]
  const wx = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  close(s.integrate({ xs: wx, ys: wx.map((x) => 2 * x - x * x), method: 'weddle' }).result.value, 0, 1e-12);
  ['-1.25', '0.15(0) = 0'].forEach((n) => has(exampleText('integration', 'Weddle'), n, 'weddle'));
  ['\\int_0^3', '0.15(0) = 0'].forEach((n) => has(paperText('Spring 2024', 'Q2(h)'), n, 'S24 Q2(h)'));
  has(exampleText('integration', '0.6'), '0.82212', 'simpson e^x');
});

test('errors and differences examples match the hand-verified numbers', () => {
  const e = exampleText('errors', '5xy^2');
  ['0.030', '0.006'].forEach((n) => has(e, n, 'relative error'));
  has(exampleText('errors', '349.1'), '301412.94', 'product');
  const d = exampleText('differences', 'x^4');
  has(d, '24,\\ 24,\\ 24', 'x^4 table');
  has(exampleText('differences', 'sixth term'), '58', 'series');
  has(exampleText('differences', 'u_5 = 8'), '755', 'delta^5');
  has(exampleText('differences', 'error in a table'), '522', 'error correction');
  const mu = exampleText('differences', 'mu^2');
  has(mu, 'E + E^{-1} = \\delta^2 + 2', 'mu^2 proof must use delta^2 + 2');
});

test('past-paper model answers match the engine', () => {
  has(paperText('Fall 2024', 'A2(b)'), '\\frac{77}{9}', 'F24 A2(b) second-column pivot');
  ['5.16224', '5.66239', '10.82463'].forEach((n) => has(paperText('Fall 2024', 'A2(e)'), n, 'F24 A2(e) aircraft'));
  has(paperText('Fall 2024', 'A2(e)'), '9.12676', 'F24 A2(e) ordinates');
  has(paperText('Fall 2023', 'Q2(a)'), '-5.875', 'F23 Q2(a) f(2.5)');
  has(paperText('Fall 2023', 'Q2(a)'), '-1.1113', 'F23 Q2(a) f(2.875)');
  has(paperText('Fall 2023', 'Q2(c)'), '-1.4422', 'F23 Q2(c) newton');
  has(paperText('Fall 2023', 'Q2(c)'), '-1.0821', 'F23 Q2(c) newton');
  has(paperText('Fall 2023', 'Q2(d)'), '0.785392', 'F23 Q2(d) simpson');
  has(paperText('Fall 2023', 'Q2(e)'), '-0.256078', 'F23 Q2(e)');
  has(paperText('Fall 2023', 'Q3(b)'), '2.027', 'F23 Q3(b) tank');
  has(paperText('Spring 2024', 'Q2(a)'), '-1.75', 'S24 Q2(a) f(5.5)');
  has(paperText('Spring 2024', 'Q2(b)'), '102', 'S24 Q2(b) horner');
  has(paperText('Spring 2024', 'Q2(c)'), 'z = -10', 'S24 Q2(c) solution');
  has(paperText('Spring 2024', 'Q2(d)'), '26', 'S24 Q2(d) missing value');
  has(paperText('Spring 2024', 'Q2(e)'), '0.5\\,x^3', 'S24 Q2(e) power law');
  has(paperText('Spring 2024', 'Q3(b)'), '-4.36', 'S24 Q3(b) theta0');
  has(paperText('Spring 2024', 'Q3(b)'), '31.8', 'S24 Q3(b) PD');
  has(paperText('Spring 2023', 'Q2(b)'), '1.0054', 'S23 Q2(b) seidel');
  has(paperText('Spring 2023', 'Q2(c)'), '3.0459', 'S23 Q2(c) secant');
  has(paperText('Spring 2023', 'Q2(c)'), '-0.3341', 'S23 Q2(c) secant f');
  has(paperText('Spring 2023', 'Q2(e)'), '9.6980', 'S23 Q2(e) lagrange');
  has(paperText('Spring 2023', 'Q2(f)'), '6.1399', 'S23 Q2(f) tourist');
  has(paperText('Spring 2023', 'Q2(f)'), '3.7968', 'S23 Q2(f) tourist');
  let y = 1;
  for (let k = 0; k < 4; k++) y += 0.01 * ((0.01 * k) ** 3 + y);
  close(y, 1.040604, 1e-6);
  has(paperText('Spring 2023', 'Q2(h)'), 'y(0.04) \\approx 1.0406', 'S23 Q2(h) euler');
});

test('LU slides: both solve examples match the engine', () => {
  const a = s.luSolve({ A: [[1, 1, 1], [4, 3, -1], [3, 5, 3]], b: [1, 6, 4] }).result;
  [1, 0.5, -0.5].forEach((v, i) => close(a.x[i], v, 1e-12));
  [1, 2, 5].forEach((v, i) => close(a.d[i], v, 1e-12));
  ['u_{33} = 3 - (3)(1) - (-2)(-5) = -10', 'd_3 = 4 - 3 + 4 = 5'].forEach((n) => has(exampleText('lu', 'Example 1 from the slides'), n, 'LU slide Ex 1'));
  const b = s.luSolve({ A: [[3, 2, 1], [2, 3, 2], [1, 2, 3]], b: [10, 14, 14] }).result;
  [1, 2, 3].forEach((v, i) => close(b.x[i], v, 1e-9));
  [10, 22 / 3, 24 / 5].forEach((v, i) => close(b.d[i], v, 1e-9));
  ['\\frac{24}{5}', 'x_3 = 3}'].forEach((n) => has(exampleText('lu', 'using Gauss elimination'), n, 'LU slide Gauss'));
});

test('elimination slides: pivoting and Gauss-Jordan examples match the engine', () => {
  const e2 = s.gaussEliminate({ A: [[3, 5, 1], [3, 2, 5], [6, 4, 2]], b: [0, 10, 12], pivot: 'on' }).result;
  [3, -2, 1].forEach((v, i) => close(e2.x[i], v, 1e-12));
  ['[\\ 0 \\quad 0 \\quad 4 \\mid 4\\ ]', 'y = -2'].forEach((n) => has(exampleText('elimination', 'Board Example 2'), n, 'board Ex 2'));
  const p = s.gaussEliminate({ A: [[2, 1, 1], [4, -6, 0], [-2, 7, 2]], b: [5, -2, 9], pivot: 'on' }).result;
  [1, 1, 2].forEach((v, i) => close(p.x[i], v, 1e-12));
  ['[\\ 0 \\quad 4 \\quad 1 \\mid 6\\ ]', 'x_3 = 2}'].forEach((n) => has(exampleText('elimination', 'Partial pivoting on the slides'), n, 'slide pivoting'));
  const g = s.gaussJordan({ A: [[2, 4, 6], [4, 5, 6], [3, 1, -2]], b: [18, 24, 4] }).result;
  [4, -2, 3].forEach((v, i) => close(g.x[i], v, 1e-12));
  ['-12', '-23', 'x_2 = -2'].forEach((n) => has(exampleText('elimination', 'Gauss-Jordan on the slides'), n, 'slide Gauss-Jordan'));
});

test('gradient-descent slides: later epochs match the engine', () => {
  const xs = [1, 2, 4, 3, 5], ys = [1, 3, 3, 2, 5];
  const run = (mode, epochs) => s.gradientDescent({ xs, ys, theta0: [0, 0], alpha: 0.01, epochs, mode }).result.theta;
  [0.1109, 0.3948].forEach((v, i) => close(run('batch', 5)[i], v, 5e-5));
  [0.2309, 0.7904].forEach((v, i) => close(run('single', 4)[i], v, 5e-5));
  const expl = (t) => modules.find((x) => x.id === 'gradient').examples.find((e) => e.title.includes(t)).explanation.join('\n');
  has(expl('Batch mode'), '(0.1109, 0.3948)', 'batch epochs');
  ['0.2309', '0.7904'].forEach((n) => has(expl('Single mode'), n, 'single epochs'));
});

test('corrected past-paper answers are reproduced by the engine', () => {
  // F23 / S23 Q1(d): maximum relative error of u = 5xy^2/z^3 with all deltas 1
  close((5 + 10 + 15) / 5, 6);
  ['Fall 2023', 'Spring 2023'].forEach((p) => has(paperText(p, 'Q1(d)'), 'e_r = 6', `${p} Q1(d)`));
  // F24 A2(f) and S23 Q2(d): Romberg tables
  const rf = s.romberg({ expr: '(2*x^2+x)*exp(-x)', a: 1, b: 3, n: 8 }).result.table;
  close(rf[0][0], 2.427936, 1e-6);
  close(rf[1][1], 2.522683, 1e-6);
  close(rf[2][2], 2.522639, 1e-6);
  ['2.427936', '2.522683', '2.522650', '2.522639'].forEach((n) => has(paperText('Fall 2024', 'A2(f)'), n, 'F24 A2(f)'));
  ['2.522683', '2.522639'].forEach((n) => has(exampleText('integration', 'from 1 to 3'), n, 'F24 Romberg example'));
  const rs = s.romberg({ expr: 'exp(-x^2)', a: 0, b: 1, n: 8 }).result.table;
  close(rs[1][1], 0.746855, 1e-6);
  close(rs[2][2], 0.746816, 1e-6);
  ['0.746855', '0.746826', '0.746816', 'I = 0.7468}'].forEach((n) => has(paperText('Spring 2023', 'Q2(d)'), n, 'S23 Q2(d)'));
  // F23 Q3(d): Jacobi 17 iterations, Gauss-Seidel 7, to 0.005
  const A = [[5, 2, 1], [1, 4, 2], [1, 2, 5]], b = [12, 15, 20], x0 = [0, 0, 0];
  assert.equal(s.jacobi({ A, b, x0, tol: 0.005, maxIter: 50 }).result.table.length - 1, 17);
  assert.equal(s.gaussSeidel({ A, b, x0, tol: 0.005, maxIter: 50 }).result.table.length - 1, 7);
  has(paperText('Fall 2023', 'Q3(d)'), '**17**', 'F23 Q3(d) jacobi count');
  // S23 Q2(g): divided-difference quadratic through (2.37, 261), (3.25, 271), (3.83, 273)
  const a1 = 10 / 0.88, a2 = (2 / 0.58 - a1) / 1.46;
  close(a1 + a2 * 0.88, 6.593, 1e-3);
  close(2 * a2, -10.843, 1e-3);
  ['6.593', '-10.843'].forEach((n) => has(paperText('Spring 2023', 'Q2(g)'), n, 'S23 Q2(g)'));
});

test('the S24 missing-values answer is the quadratic one', () => {
  const ys = [2, 5, 10, 17, 26, 37];
  const d2 = ys.slice(0, -2).map((_, i) => ys[i + 2] - 2 * ys[i + 1] + ys[i]);
  assert.ok(d2.every((v) => Math.abs(v - 2) < 1e-9), 'second differences must be constant at 2');
});

test('errors walk-through uses the sourced Shanker Rao Ex 1.14 numbers', () => {
  const t = sectionText('errors', 'Start here: your first walk-through');
  ['0.004', '1.5772', '0.006', '2.3659', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `errors missing ${n}`));
});

test('roots walk-through uses the sourced S24 Q2(a) numbers', () => {
  const t = sectionText('roots', 'Start here: your first walk-through');
  const r = s.bisection({ expr: 'x^2 - 4*x - 10', a: 5, b: 6, tol: 1e-6 });
  close(r.result.root, 5.741657, 1e-5);
  ['5.5', '5.75', '5.625', '5.7417', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `roots missing ${n}`));
});

test('elimination walk-through uses the sourced board-notes system', () => {
  const t = sectionText('elimination', 'Start here: your first walk-through');
  const r = s.gaussEliminate({ A: [[1, 1, 1], [2, 3, 1], [3, 2, 5]], b: [6, 13, 18] });
  [3, 2, 1].forEach((v, i) => close(r.result.x[i], v, 1e-9));
  ['3x + 2y + 5z = 18', 'y = 1 + z = 2', 'x = 6 - y - z = 3', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `elimination missing ${n}`));
});

test('iterative walk-through uses the sourced slides system', () => {
  const t = sectionText('iterative', 'Start here: your first walk-through');
  const r = s.jacobi({ A: [[5, 2, 1], [1, 4, 2], [1, 2, 5]], b: [12, 15, 20], x0: [0, 0, 0], maxIter: 60, tol: 1e-6 });
  close(r.result.table[1].x[0], 2.4, 1e-9);
  close(r.result.table[1].x[1], 3.75, 1e-9);
  close(r.result.x[0], 1, 1e-6);
  close(r.result.x[1], 2, 1e-6);
  close(r.result.x[2], 3, 1e-6); // exact solution of the slides' system: (1, 2, 3)
  ['2.40', '3.75', '4.00', '(1,\\ 2,\\ 3)', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `iterative missing ${n}`));
});

test('lu walk-through uses the sourced Fall 2024 A2(d) system', () => {
  const t = sectionText('lu', 'Start here: your first walk-through');
  const r = s.luSolve({ A: [[2, 1, 1], [4, 3, 2], [6, 5, 7]], b: [9, 20, 35] });
  [3, 2, 1].forEach((v, i) => close(r.result.x[i], v, 1e-9));
  ['Fall 2024 A2(d)', 'R_2 - 2R_1', 'z = 1', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `lu missing ${n}`));
});

test('differences walk-through uses the sourced Chapra x^4 table', () => {
  const t = sectionText('differences', 'Start here: your first walk-through');
  const ys = [16, 1, 0, 1, 16, 81, 256]; // f(x) = x^4 at x = -2..4
  const d = (a) => a.slice(0, -1).map((_, i) => a[i + 1] - a[i]);
  const d4 = d(d(d(d(ys))));
  assert.ok(d4.every((v) => v === 24));
  assert.ok(t.includes('24, 24, 24'), 'constant fourth differences');
  assert.ok(t.includes('Asked in:'), 'Asked-in line');
});

test('interpolation walk-through uses the sourced Rao Lagrange example', () => {
  const t = sectionText('interpolation', 'Start here: your first walk-through');
  const r = s.lagrange({ xs: [0, 1, 3, 4], ys: [5, 6, 50, 105], x: 2 });
  close(r.result.y, 19, 1e-9);
  ['19', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `interpolation missing ${n}`));
});

test('differentiation walk-through uses the sourced F24 Q2(c) rocket table', () => {
  const t = sectionText('differentiation', 'Start here: your first walk-through');
  const xs = [0, 25, 50, 75, 100, 125], ys = [0, 32, 58, 78, 92, 100];
  close(s.differentiate({ xs, ys, x: 0, method: 'forward3' }).result.derivative, 1.4, 1e-9);
  close(s.differentiate({ xs, ys, x: 50, method: 'central2' }).result.derivative, 0.92, 1e-9);
  ['1.4', '0.92', '-0.0096', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `differentiation missing ${n}`));
});

test('integration walk-through uses the sourced Rao Ex 9.4 Simpson example', () => {
  const t = sectionText('integration', 'Start here: your first walk-through');
  const xs = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((x) => +x.toFixed(1));
  const ys = xs.map((x) => Math.exp(x));
  const r = s.integrate({ xs, ys, method: 'simpson13' });
  close(r.result.value, 0.82212, 1e-5);
  ['0.82212', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `integration missing ${n}`));
});

test('regression walk-through uses the sourced F23 Q3(c) surface-area fit', () => {
  const t = sectionText('regression', 'Start here: your first walk-through');
  const W = [70, 75, 77, 80, 82, 84, 87, 90], A = [2.1, 2.12, 2.15, 2.2, 2.22, 2.23, 2.26, 2.3];
  const r = s.leastSquares({ xs: W, ys: A });
  close(r.result.b, 0.010479, 1e-6);
  close(r.result.a, 1.3526, 1e-4);
  ['0.010479', '1.3526', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `regression missing ${n}`));
});

test('gradient walk-through uses the sourced slides batch epoch', () => {
  const t = sectionText('gradient', 'Start here: your first walk-through');
  const r = s.gradientDescent({ xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 1, mode: 'batch' });
  close(r.result.theta[0], 0.028, 1e-9);
  close(r.result.theta[1], 0.1, 1e-9);
  ['0.028', '-2.8', '-10', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `gradient missing ${n}`));
});

test('pca walk-through uses the sourced PCA tutorial dataset', () => {
  const t = sectionText('pca', 'Start here: your first walk-through');
  const P = [[2.5, 2.4], [0.5, 0.7], [2.2, 2.9], [1.9, 2.2], [3.1, 3.0], [2.3, 2.7], [2.0, 1.6], [1.0, 1.1], [1.5, 1.6], [1.1, 0.9]];
  const r = s.pca({ points: P, threshold: 95 });
  close(r.result.eigvals[0], 1.1556249, 1e-6);
  close(r.result.eigvals[1], 0.0442, 1e-3); // lambda2 = 0.0442 (NOT 0.0492): trace = 1.1998
  assert.equal(r.result.keep, 1);
  ['1.1556', '0.0442', '96.3', '3.459', '0.854', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `pca missing ${n}`));
});

test('every module opens with the four Start-here sections', () => {
  const H = ['Start here: the problem this chapter solves', 'Start here: the core idea',
             'Start here: reading the symbols', 'Start here: your first walk-through'];
  for (const m of modules) {
    assert.deepEqual(m.sections.slice(0, 4).map((x) => x.heading), H, m.id);
    const heads = m.sections.map((x) => x.heading);
    assert.equal(new Set(heads).size, heads.length, `${m.id}: duplicate headings`);
    const wt = sectionText(m.id, 'Start here: your first walk-through');
    assert.ok(wt.includes('Asked in:'), `${m.id}: walk-through must list the Question Bank refs`);
  }
});

test('Shanker Ex 5.2 divided difference table: recomputed values match the engine', () => {
  const tb = s.dividedDifference({ xs: [1, 3, 4, 6, 10], ys: [0, 18, 58, 190, 920], x: 2 }).result.table;
  [[1, 0, 9], [1, 2, 66], [2, 0, 10.3333], [3, 0, -0.3333], [3, 1, 1.5357], [4, 0, 0.2077]].forEach(([i, j, v]) => close(tb[i][j], v, 1e-4));
  const text = exampleText('interpolation', 'x = 1, 3, 4, 6, 10');
  ['= 66', '= 182.5', '= 0.2077'].forEach((n) => has(text, n, 'Ex 5.2'));
});
