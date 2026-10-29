// Verifies the solvers against numbers printed in the slides, the class notes and the past papers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as s from './solvers.js';

const close = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

// ---- elimination (Fall 2024 Q2b) -----------------------------------------
const F24_SYSTEM = {
  A: [[1, 2, -3], [-9, 8, 7], [4, 5, 6]],
  b: [-4, 28, 32],
};

test('gauss elimination solves the Fall 2024 system', () => {
  const { result } = s.gaussEliminate({ ...F24_SYSTEM });
  close(result.x[0], 1, 1e-9);
  close(result.x[1], 2, 1e-9);
  close(result.x[2], 3, 1e-9);
});

test('partial pivoting swaps the rows it is told to (Fall 2024 Q2b asks for pivoting)', () => {
  const { result, steps } = s.gaussEliminate({ ...F24_SYSTEM, pivot: 'on' });
  assert.equal(result.pivoted, true);
  assert.match(steps.join('\n'), /Partial pivoting/);
  close(result.x[0], 1, 1e-9);
});

test('every row operation is written with the row it produces', () => {
  const { steps } = s.gaussEliminate({ ...F24_SYSTEM, pivot: 'on' });
  const text = steps.join('\n');
  // each elimination line is followed by the resulting row
  assert.match(text, /R_\{2\}' = R_\{2\} [-+] .*R_\{1\}/);
  assert.match(text, /R_\{2\}' = \\left\[/);
});

test('gauss-jordan ends in the identity and needs no back substitution', () => {
  const { result, steps } = s.gaussJordan({ ...F24_SYSTEM });
  const m = result.matrix;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) close(m[i][j], i === j ? 1 : 0, 1e-9);
  close(result.x[0], 1, 1e-9);
  close(result.x[1], 2, 1e-9);
  close(result.x[2], 3, 1e-9);
  assert.doesNotMatch(steps.join('\n'), /back substitution/i);
});

// ---- LU (LU slides example + Fall 2024 Q2d) -------------------------------
test('Do-Little factorisation matches the LU slide example', () => {
  const { result } = s.luDecompose({ A: [[1, 2, 4], [3, 8, 14], [2, 6, 13]] });
  const L = [[1, 0, 0], [3, 1, 0], [2, 1, 1]];
  const U = [[1, 2, 4], [0, 2, 2], [0, 0, 3]];
  result.L.forEach((row, i) => row.forEach((v, j) => close(v, L[i][j])));
  result.U.forEach((row, i) => row.forEach((v, j) => close(v, U[i][j])));
});

test('LU forward and backward substitution solve the Fall 2024 system', () => {
  const { result } = s.luSolve({ ...F24_SYSTEM });
  close(result.x[0], 1, 1e-9);
  close(result.x[1], 2, 1e-9);
  close(result.x[2], 3, 1e-9);
});

// ---- iterative methods (Iterative Solution slides) ------------------------
const ITER_SYSTEM = { A: [[5, 2, 1], [1, 4, 2], [1, 2, 5]], b: [12, 15, 20] };

test('the slide system is diagonally dominant', () => {
  assert.equal(s.diagonalDominance(ITER_SYSTEM).result.dominant, true);
});

test('jacobi reproduces the slide iteration table', () => {
  const { result } = s.jacobi({ ...ITER_SYSTEM, x0: [0, 0, 0], maxIter: 200, tol: 1e-12 });
  const first = result.table[1].x;
  close(first[0], 2.4, 1e-9); // slide: x(1) = 2.40
  close(first[1], 3.75, 1e-9); // slide: y(1) = 3.75
  close(first[2], 4.0, 1e-9); // slide: z(1) = 4.00
  close(result.x[0], 1, 1e-6);
  close(result.x[1], 2, 1e-6);
  close(result.x[2], 3, 1e-6);
});

test('gauss-seidel converges on the slide system', () => {
  const { result } = s.gaussSeidel({ ...ITER_SYSTEM, x0: [0, 0, 0], maxIter: 50 });
  close(result.x[0], 1, 1e-4);
  close(result.x[1], 2, 1e-4);
  close(result.x[2], 3, 1e-4);
});

test('a non-dominant system is reported as such', () => {
  const { result } = s.diagonalDominance({ A: [[1, 5], [3, 1]] });
  assert.equal(result.dominant, false);
});

// ---- roots (past papers) --------------------------------------------------
test('bisection finds the root of x^3 - 9x + 1 (Fall 2023 Q2a)', () => {
  const { result } = s.bisection({ expr: 'x^3 - 9*x + 1', a: 2, b: 3, tol: 1e-6 });
  close(result.root, 2.9428201, 1e-6);
});

test('newton-raphson finds the root of x^3 - 4x^2 + x + 6 (Fall 2023 Q2c)', () => {
  const { result } = s.newtonRaphson({ expr: 'x^3 - 4*x^2 + x + 6', x0: 0, tol: 1e-8 });
  close(result.root, -1, 1e-4);
});

test('secant finds the root of x^3 - 8x - 4 (Spring 2023 Q2c)', () => {
  const { result } = s.secant({ expr: 'x^3 - 8*x - 4', x0: 3, x1: 4, tol: 1e-8 });
  close(result.root, 3.0513742, 1e-6);
});

test('horner evaluates p(x) and gives the quotient (Spring 2024 Q2b)', () => {
  const { result } = s.horner({ coeffs: [1, 7, 5, -31, -30], r: -3 });
  close(result.value, 0, 1e-9);
  // p(x) = (x + 3)(x^3 + 4x^2 - 7x - 10)
  close(result.quotient[0], 1, 1e-9);
  close(result.quotient[1], 4, 1e-9);
  close(result.quotient[2], -7, 1e-9);
  close(result.quotient[3], -10, 1e-9);
});

// ---- interpolation (Fall 2024 Part B) ------------------------------------
test('newton divided difference evaluates f(9) (Fall 2024 Part B c)', () => {
  const { result } = s.dividedDifference({ xs: [5, 7, 11, 13, 17], ys: [150, 392, 1452, 2366, 5202], x: 9 });
  close(result.y, 810, 1e-6);
});

test('newton forward interpolates the cubic through (0,-1),(1,1),(2,1),(3,-2) (Fall 2024 Part B b)', () => {
  const { result } = s.newtonForward({ xs: [0, 1, 2, 3], ys: [-1, 1, 1, -2], x: 1.5 });
  close(result.y, 1.3125, 1e-9);
});

test('lagrange matches newton forward on the same points', () => {
  const a = s.newtonForward({ xs: [0, 1, 2, 3], ys: [-1, 1, 1, -2], x: 1.5 }).result.y;
  const b = s.lagrange({ xs: [0, 1, 2, 3], ys: [-1, 1, 1, -2], x: 1.5 }).result.y;
  close(a, b, 1e-9);
});

// ---- differentiation ------------------------------------------------------
test('central difference estimates the derivative (Fall 2023 Q2e)', () => {
  const { result } = s.differentiate({ xs: [0.49, 0.5, 0.51], ys: [1 / 1.49 ** 2, 1 / 1.5 ** 2, 1 / 1.51 ** 2], x: 0.5, method: 'central2' });
  const exact = -2 / 1.5 ** 3;
  close(result.derivative, exact, 1e-4);
});

test('second central difference of the rocket table', () => {
  const xs = [0, 25, 50, 75, 100, 125];
  const ys = [0, 32, 58, 78, 92, 100];
  const { result } = s.differentiate({ xs, ys, x: 0, method: 'forward3' });
  close(result.derivative, 1.4, 1e-9); // (4*32 - 58) / 50
});

// ---- integration (past papers) --------------------------------------------
test('composite trapezoid on 1/(1+x^2) with five subintervals (Fall 2023 Q2d)', () => {
  const xs = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const ys = xs.map((x) => 1 / (1 + x * x));
  const { result } = s.integrate({ xs, ys, method: 'trapezoid' });
  close(result.value, 0.7837315, 1e-6);
});

test('romberg integrates e^(-x^2) from 0 to 1 (Spring 2023 Q2d), standard 4^j - 1 form', () => {
  const { result } = s.romberg({ expr: 'exp(-x^2)', a: 0, b: 1, n: 8, rule: 'standard' });
  close(result.value, 0.74682413, 1e-6);
});

test('romberg, Shanker Rao form, reproduces Example 9.14 (h = 0.6, 0.3, 0.15)', () => {
  const { table } = s.romberg({ expr: '1/(1+x)', a: 0, b: 1.2, n: 8 }).result;
  // the book works with 4-decimal ordinates, so its trapezoid values are good to about 1e-4
  [0.8113, 0.7943, 0.7899].forEach((v, k) => close(table[k][0], v, 1e-4));
  // the book carries 4 decimals: (4 x 0.7884 - 0.7886)/3 = 0.7883
  close((4 * 0.7884 - 0.7886) / 3, 0.7883, 5e-5);
  close(table[2][2], 0.78841, 5e-5);
});

test('simpson 1/3 on a parabola is exact', () => {
  const xs = [0, 0.5, 1, 1.5, 2];
  const ys = xs.map((x) => x * x);
  const { result } = s.integrate({ xs, ys, method: 'simpson13' });
  close(result.value, 8 / 3, 1e-9);
});

test('simpson 3/8 is exact for a cubic, single and composite', () => {
  close(s.integrate({ xs: [0, 1, 2, 3], ys: [0, 1, 8, 27], method: 'simpson38' }).result.value, 81 / 4, 1e-9);
  const xs = [0, 1, 2, 3, 4, 5, 6];
  close(s.integrate({ xs, ys: xs.map((x) => x ** 3), method: 'simpson38' }).result.value, 324, 1e-9);
});

test('weddle rule needs six subintervals', () => {
  assert.throws(() => s.integrate({ xs: [0, 1, 2], ys: [0, 1, 4], method: 'weddle' }), /six/);
});

// ---- regression (Fall 2023 Q3c) -------------------------------------------
test('least squares fits the surface-area table', () => {
  const { result } = s.leastSquares({ xs: [70, 75, 77, 80, 82, 84, 87, 90], ys: [2.1, 2.12, 2.15, 2.2, 2.22, 2.23, 2.26, 2.3] });
  assert.ok(result.b > 0);
  close(result.a + result.b * 80, 2.2, 0.01);
  assert.ok(result.r2 > 0.95);
});

test('power law fit of y = 0.5 x^2 recovers a and b', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = xs.map((x) => 0.5 * x * x);
  const { result } = s.powerLawFit({ xs, ys });
  close(result.a, 0.5, 1e-6);
  close(result.b, 2, 1e-6);
});

// ---- polynomial / multiple regression (Balagurusamy §10.4-10.5, Shanker Rao §14.13) ----
test('polynomial regression reproduces Balagurusamy Example 10.4 (y = 3 + 2x + x^2)', () => {
  const { result } = s.polyRegression({ xs: [1, 2, 3, 4], ys: [6, 11, 18, 27], degree: 2 });
  [3, 2, 1].forEach((v, i) => close(result.a[i], v, 1e-9));
  assert.throws(() => s.polyRegression({ xs: [1, 2], ys: [1, 2], degree: 2 }), /not possible/);
});

test('multiple regression reproduces Shanker Rao §14.13 Example 1', () => {
  const { result } = s.multipleRegression({
    xs: [57, 59, 49, 62, 51, 50, 55, 48, 52, 42, 61, 57],
    zs: [8, 10, 6, 11, 8, 7, 10, 9, 10, 6, 12, 9],
    ys: [64, 71, 53, 67, 55, 58, 77, 57, 56, 51, 76, 68],
  });
  [3.6512, 0.8546, 1.5063].forEach((v, i) => close(result.a[i], v, 5e-5));
});

test('multiple regression refuses collinear data (Balagurusamy Example 10.5 has z = x - 1)', () => {
  assert.throws(() => s.multipleRegression({ xs: [1, 2, 3, 4], zs: [0, 1, 2, 3], ys: [12, 18, 24, 30] }), /dependent/);
});

// ---- central differences (Shanker Rao Ch 6) --------------------------------
test('Gauss forward, Gauss backward and Stirling reproduce Shanker Rao Examples 6.1, 6.2, 6.8', () => {
  const f = s.gaussInterp({ xs: [21, 25, 29, 33, 37], ys: [18.4708, 17.8144, 17.107, 16.3432, 15.5154], x: 30, formula: 'forward' }).result;
  close(f.u, 0.25); close(f.y, 16.9216, 5e-5);
  const b = s.gaussInterp({ xs: [1931, 1941, 1951, 1961, 1971, 1981], ys: [12, 15, 20, 27, 39, 52], x: 1966, formula: 'backward' }).result;
  close(b.u, -0.5); close(b.y, 32.625, 1e-9);
  close(s.gaussInterp({ xs: [20, 25, 30, 35, 40], ys: [49225, 48316, 47236, 45926, 44306], x: 28, formula: 'stirling' }).result.y, 47691.8256, 1e-6);
});

// ---- gradient descent (Gradient Descent slides) ---------------------------
test('batch gradient descent reproduces the slide epochs', () => {
  const { result } = s.gradientDescent({
    xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 1, mode: 'batch',
  });
  close(result.theta[0], 0.028, 1e-9); // slide: temp0 = 0.028
  close(result.theta[1], 0.1, 1e-9); // slide: temp1 = 0.1
  const { result: r2 } = s.gradientDescent({
    xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 2, mode: 'batch',
  });
  close(r2.theta[0], 0.05272, 1e-9); // slide epoch 2
  close(r2.theta[1], 0.18816, 1e-9);
});

test('single mode updates after every row', () => {
  const { result } = s.gradientDescent({
    xs: [1, 2, 4, 3, 5], ys: [1, 3, 3, 2, 5], degree: 1, theta0: [0, 0], alpha: 0.01, epochs: 1, mode: 'single',
  });
  assert.notDeepEqual(result.theta, [0, 0]);
});

// ---- PCA (PCA Tutorial Step by Step) --------------------------------------
const PCA_DATA = [[2.5, 2.4], [0.5, 0.7], [2.2, 2.9], [1.9, 2.2], [3.1, 3.0], [2.3, 2.7], [2.0, 1.6], [1.0, 1.1], [1.5, 1.6], [1.1, 0.9]];

test('PCA reproduces the tutorial eigenvalues and eigenvectors', () => {
  const { result } = s.pca({ points: PCA_DATA, threshold: 95 });
  close(result.mean[0], 1.81, 1e-9);
  close(result.mean[1], 1.91, 1e-9);
  close(result.eigvals[0], 1.1556249, 1e-6);
  close(result.eigvals[1], 0.0441751, 1e-6);
  close(result.eigvecs[0][0], 0.678, 2e-3);
  close(result.eigvecs[0][1], 0.735, 2e-3);
  close(result.eigvecs[1][0], 0.735, 2e-3);
  close(result.eigvecs[1][1], -0.678, 2e-3);
});

test('PCA keeps one component at 95% and reproduces the tutorial projections', () => {
  const { result } = s.pca({ points: PCA_DATA, threshold: 95 });
  assert.equal(result.keep, 1);
  close(result.proj[0][0], 3.459, 1e-3); // tutorial: Y = 3.459
  close(result.proj[1][0], 0.854, 1e-3); // tutorial: Y = 0.854
  close(result.proj[9][0], 1.407, 1e-3); // tutorial: Y = 1.407
});

test('PCA reconstruction errors match the tutorial table', () => {
  const { result } = s.pca({ points: PCA_DATA, threshold: 95 });
  close(result.recon[0][0], 2.35, 1e-2); // tutorial: Xr = 2.35 2.54
  close(result.recon[0][1], 2.54, 1e-2);
  close(result.mae[0], 0.13, 5e-3); // tutorial: MAE 0.13
  close(result.mae[1], 0.12, 5e-3); // tutorial: MAE 0.12
  close(result.sse[0], 0.25, 5e-3); // tutorial: SSE 0.25
  close(result.sse[1], 0.21, 5e-3); // tutorial: SSE 0.21
});

test('PCA keeps two components at 98%', () => {
  const { result } = s.pca({ points: PCA_DATA, threshold: 98 });
  assert.equal(result.keep, 2);
});
