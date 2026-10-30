// Guards for the matrix-inversion lesson added after the 30 Oct 2026 audit.
// The site teaches the Matrix Inversion method (Spring 2024 Q2(c)) and the four
// scenarios for the existence of a solution (Spring 2024 Q1(d)); both live in
// the elimination chapter.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import fullAnswers from '../data/fullAnswers.js';
import * as s from './solvers.js';

const mod = (id) => modules.find((m) => m.id === id);
const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);

// The Spring 2024 Q2(c) system: 2x+y+z=7, 4x+2y+3z=4, x-y+z=0.
const S24_INV = { A: [[2, 1, 1], [4, 2, 3], [1, -1, 1]], b: [7, 4, 0] };

test('the elimination chapter teaches the matrix inversion method', () => {
  const sec = mod('elimination').sections.find((x) => x.heading.includes('nversion'));
  assert.ok(sec, 'elimination: no section on matrix inversion');
  const text = sec.blocks.flatMap((b) => [b.text, b.tex, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows?.flat() ?? [])]).join('\n');
  for (const t of ['adj', 'cofactor', '\\operatorname{adj}', 'determinant']) {
    assert.ok(text.toLowerCase().includes(t.toLowerCase()), `matrix inversion section is missing "${t}"`);
  }
  assert.ok(checks.elimination[sec.heading], `elimination: no check question for "${sec.heading}"`);
});

test('the elimination chapter teaches the four scenarios for the existence of a solution', () => {
  const sec = mod('elimination').sections.find((x) => x.heading.includes('our scenario'));
  assert.ok(sec, 'elimination: no section on the four solution scenarios');
  const text = sec.blocks.flatMap((b) => [b.text, b.tex, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows?.flat() ?? [])]).join('\n');
  for (const t of ['unique', 'no solution', 'infinitely many', 'ill-conditioned']) {
    assert.ok(text.toLowerCase().includes(t.toLowerCase()), `four scenarios section is missing "${t}"`);
  }
  assert.ok(checks.elimination[sec.heading], `elimination: no check question for "${sec.heading}"`);
});

test('the matrix inversion example reproduces the Spring 2024 Q2(c) answer', () => {
  const ex = mod('elimination').examples.find((e) => e.title.toLowerCase().includes('inversion'));
  assert.ok(ex, 'elimination: no worked example on matrix inversion');
  const text = [ex.question, ...ex.steps.map((s) => s.t), ex.answer].join('\n');
  for (const n of ['9', '-1', '-10', '\\operatorname{adj}']) {
    assert.ok(text.includes(n), `inversion example is missing "${n}"`);
  }
  // The same numbers the engine produces.
  const r = s.matrixInverse(S24_INV);
  [9, -1, -10].forEach((v, i) => close(r.result.x[i], v));
  close(r.result.det, 3);
});

test('matrix inversion refuses a singular matrix', () => {
  assert.throws(
    () => s.matrixInverse({ A: [[1, 2, 3], [2, 4, 6], [1, 1, 1]], b: [1, 2, 3] }),
    /determinant|singular|invert/i,
  );
});

test('the four-scenarios answer agrees with the Spring 2024 Q1(d) full answer', () => {
  const f = fullAnswers['Spring 2024 Q1(d)'];
  assert.ok(f, 'no full answer for Spring 2024 Q1(d)');
  const text = [f.answer, f.note, ...f.steps.map((s) => s.t)].join(' ');
  for (const t of ['unique', 'no solution', 'infinitely many', 'ill-conditioned']) {
    assert.ok(text.toLowerCase().includes(t.toLowerCase()), `Q1(d) answer is missing "${t}"`);
  }
});
