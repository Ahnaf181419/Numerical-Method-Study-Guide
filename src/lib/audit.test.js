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
  const sys = { A: [[1, 1, 1], [2, 3, 1], [3, 4, 5]], b: [6, 13, 18] };
  const r = s.gaussEliminate(sys).result.x;
  const t = exampleText('elimination', 'no pivoting');
  ['5.6667', '0.6667', '-0.3333'].forEach((n, i) => has(t, n, 'naive'));
  close(r[0], 17 / 3);
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
  ['2.40', '3.75', '4.00', '1.084', '1.95', '3.164'].forEach((n) => has(t, n, 'jacobi'));
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
  const r = s.luSolve({ A: [[2, 1, 1], [-4, 3, 2], [6, 5, 7]], b: [9, 20, 35] }).result;
  [1, 10, -3].forEach((v, i) => close(r.x[i], v));
  const tf = exampleText('lu', 'Solving a system');
  ['38', '-7.2', '-3'].forEach((n) => has(tf, n, 'LU F24'));
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
  close(s.romberg({ expr: 'exp(-x^2)', a: 0, b: 1, n: 8 }).result.value, 0.7468241, 1e-6);
  const r2 = exampleText('integration', 'from 0 to 1');
  has(r2, '0.746824', 'romberg e^-x^2');
  const T = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75].map((x2) => 3.2 + 12 * x2 - 28 * x2 ** 2 + 32 * x2 ** 3 - 16 * x2 ** 4 + 3 * x2 ** 5);
  const I1 = (0.25 / 3) * (T[0] + 4 * (T[1] + T[3] + T[5]) + 2 * (T[2] + T[4]) + T[6]);
  close(I1, 8.69160, 1e-4);
  has(exampleText('integration', 'aircraft'), '10.83010', 'aircraft');
  has(exampleText('integration', 'Weddle'), '1.3333', 'weddle');
  close(s.integrate({ xs: [0, 1 / 3, 2 / 3, 1, 4 / 3, 5 / 3, 2], ys: [0, 5 / 9, 8 / 9, 1, 8 / 9, 5 / 9, 0], method: 'weddle' }).result.value, 4 / 3, 1e-9);
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
  has(paperText('Fall 2024', 'A2(e)'), '10.83010', 'F24 A2(e) aircraft');
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
  has(paperText('Spring 2023', 'Q2(h)'), '1.0409', 'S23 Q2(h) euler');
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
  const r = s.gaussEliminate({ A: [[1, 1, 1], [2, 3, 1], [3, 4, 5]], b: [6, 13, 18] });
  close(r.result.x[0], 17 / 3, 1e-9);
  close(r.result.x[1], 2 / 3, 1e-9);
  close(r.result.x[2], -1 / 3, 1e-9);
  ['5.6667', '0.6667', '-0.3333', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `elimination missing ${n}`));
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
  const r = s.luSolve({ A: [[2, 1, 1], [-4, 3, 2], [6, 5, 7]], b: [9, 20, 35] });
  [1, 10, -3].forEach((v, i) => close(r.result.x[i], v, 1e-9));
  ['Fall 2024 A2(d)', '38', '-7.2', 'z = -3', 'Asked in:'].forEach((n) => assert.ok(t.includes(n), `lu missing ${n}`));
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
