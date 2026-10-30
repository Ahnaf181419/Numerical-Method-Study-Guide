// Guards for the readiness audit (docs/AUDIT-2026-10-30-readiness.md):
//   A  — the trapezoidal, 3/8 and Weddle derivations are worked, not one line each;
//   B  — PCA shows the eigenvalues and eigenvectors by hand;
//   F  — the composite 3/8 and Weddle formulas give the shared ordinates weight 2;
//   G1 — the red chapter badge marks only chapters off the printed syllabus;
//   G2 — every chapter card shows how much the past papers ask of it;
//   G3 — the syllabus page lists Credit 1 and every teacher's video sits in its lesson;
//   D1, D2 — no doubled brackets in math spans, no dangling book equation numbers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import modules from '../data/syllabusData.js';
import papers, { examWeight } from '../data/pastPapers.js';
import fullAnswers from '../data/fullAnswers.js';
import * as examPrep from '../data/examPrep.js';
import checks from '../data/checks.js';
import syllabusTopics, { credit1, videosFor } from '../data/syllabusTopics.js';

const mod = (id) => modules.find((m) => m.id === id);
const strings = (x) => (typeof x === 'string' ? [x] : x && typeof x === 'object' ? Object.values(x).flatMap(strings) : []);
const all = strings([modules, papers, fullAnswers, examPrep, checks, syllabusTopics]);
const src = (f) => readFileSync(new URL(`../components/${f}`, import.meta.url), 'utf8');

// ---- D1, D2 -------------------------------------------------------------------
test('no inline math span opens with a doubled bracket', () => {
  const bad = all.flatMap((t) => (t.match(/\$[^$]+\$/g) ?? []).filter((m) => m.startsWith('$((')));
  assert.deepEqual(bad, []);
});

test('no text points at a book equation number the site does not show', () => {
  const bad = all.filter((t) => /\b(form|formula|equation|relation) \(\d+\)/.test(t));
  assert.deepEqual(bad, []);
});

// ---- F: composite 3/8 and Weddle ---------------------------------------------------
test('every composite 3/8 formula weights y_3, y_6, ... by 2', () => {
  const composite = strings(mod('integration')).filter((t) => t.includes('\\frac{3h}{8}') && /y_\{n-1\}|\\sum/.test(t));
  assert.ok(composite.length >= 5, `only ${composite.length} composite 3/8 statements found`);
  for (const t of composite) assert.ok(/2\s*\(\s*y_3/.test(t), `3/8 statement without the weight-2 group: ${t.slice(0, 120)}`);
  assert.ok(!strings(mod('integration')).some((t) => /only the interior (ones|ordinates) (have weight|carry the) 3/.test(t)), 'still says every interior ordinate carries 3');
});

test("Weddle's lesson says the ordinate shared by two panels carries weight 2", () => {
  const sec = mod('integration').sections.find((s) => s.heading === "Weddle's rule");
  const text = strings(sec).join('\n');
  assert.ok(/2y_6/.test(text), 'no composite Weddle formula with 2y_6');
});

// ---- A: derivations ------------------------------------------------------------------
test('the trapezoidal, 3/8 and Weddle rules each have a worked derivation', () => {
  const titles = mod('integration').examples.map((e) => e.title);
  for (const rule of [/trapezoidal rule from the general/i, /three-eighths rule from the general/i, /Weddle.s rule from the general/i]) {
    const ex = mod('integration').examples.find((e) => rule.test(e.title));
    assert.ok(ex, `no derivation example matching ${rule} among ${titles.join(' | ')}`);
    const sum = ex.steps.reduce((a, st) => a + parseInt(st.m, 10), 0);
    assert.equal(sum, ex.marks, `${ex.title}: step marks ${sum} ≠ ${ex.marks}`);
  }
});

test('the general quadrature section shows the integrals its coefficients come from', () => {
  const text = strings(mod('integration').sections.find((s) => s.heading.startsWith('The general quadrature'))).join('\n');
  assert.ok(text.includes('\\int_0^n u\\,du'), 'no \\int_0^n u du');
  assert.ok(text.includes('\\int_0^n u(u-1)\\,du'), 'no \\int_0^n u(u-1) du');
});

// ---- B: PCA by hand ------------------------------------------------------------------
const eig2 = ([[a, b], [, d]]) => {
  const tr = a + d, det = a * d - b * b, r = Math.sqrt(tr * tr - 4 * det);
  return { tr, det, l: [(tr + r) / 2, (tr - r) / 2], ratio: (l) => (l - a) / b };
};

test('PCA works the characteristic equation and the eigenvectors by hand', () => {
  const { tr, det, l, ratio } = eig2([[0.5549, 0.5539], [0.5539, 0.6449]]);
  const quad = `\\lambda^2 - ${tr.toFixed(4)}\\lambda + ${det.toFixed(4)} = 0`;
  const sec = strings(mod('pca').sections.find((s) => s.heading === 'Eigenvalues and eigenvectors')).join('\n');
  const ex = mod('pca').examples[0];
  for (const [where, text] of [['lesson', sec], ['example', strings(ex.steps).join('\n')]]) {
    assert.ok(text.includes(quad), `${where}: no "${quad}"`);
    assert.ok(text.includes(ratio(l[0]).toFixed(4)), `${where}: no eigenvector ratio ${ratio(l[0]).toFixed(4)}`);
    assert.ok(text.includes(ratio(l[1]).toFixed(4)), `${where}: no eigenvector ratio ${ratio(l[1]).toFixed(4)}`);
  }
  assert.equal(l[0].toFixed(4), '1.1556');
  assert.equal(l[1].toFixed(4), '0.0442');
});

test('the scaled PCA example shows its characteristic equation too', () => {
  const { tr, det } = eig2([[1, 0.9259], [0.9259, 1]]);
  const text = strings(mod('pca').examples[1].steps).join('\n');
  assert.ok(text.includes(`\\lambda^2 - ${tr}\\lambda + ${det.toFixed(4)} = 0`), 'no characteristic equation in the scaled example');
  assert.ok(text.includes('0.7071'), 'no normalised eigenvector (0.7071, 0.7071)');
});

// ---- G1: the chapter badge -------------------------------------------------------------
test('only the chapters off the printed syllabus carry the chapter badge', () => {
  assert.deepEqual(modules.filter((m) => m.offSyllabus).map((m) => m.id), ['errors', 'roots']);
  for (const f of ['Nav.jsx', 'Dashboard.jsx']) assert.ok(!/m\.flagged &&/.test(src(f)), `${f} still badges chapters on m.flagged`);
});

// ---- G2: exam weight ---------------------------------------------------------------------
test('examWeight counts the papers and marks behind every chapter', () => {
  const w = examWeight();
  assert.deepEqual(w.roots, { papers: 4, marks: 74, items: 14 });
  assert.deepEqual(w.interpolation, { papers: 4, marks: 49, items: 9 });
  assert.equal(w.pca, undefined);
  const total = Object.values(w).reduce((a, x) => a + x.marks, 0);
  assert.equal(total, papers.flatMap((p) => p.sets.flatMap((s) => s.items)).reduce((a, it) => a + it.marks, 0));
  assert.ok(/examWeight\(/.test(src('Dashboard.jsx')), 'the dashboard does not show the exam weight');
});

// ---- G3: the syllabus page and the videos --------------------------------------------------
test('the syllabus page lists Credit 1 with links to its chapters', () => {
  assert.match(credit1.title, /Credit 1/);
  assert.deepEqual(credit1.rows.map((r) => r.module), ['elimination', 'iterative', 'lu', 'pca']);
  assert.ok(/<ChapterList rows=\{credit1\.rows\} onOpen=\{onOpen\}/.test(src('Syllabus.jsx')), 'the Syllabus page does not list Credit 1 as chapter links');
});

test('every teacher video names a lesson that exists, and the lesson shows it', () => {
  const vids = syllabusTopics.sections.flatMap((s) => [...(s.groups?.flatMap((g) => g.rows) ?? []), ...(s.rows ?? []), ...(s.videos ?? [])]).filter((r) => r.video || r.url);
  assert.equal(vids.length, 12);
  for (const v of vids) {
    assert.ok(v.lesson, `${v.topic ?? v.name}: no lesson`);
    const [id, heading] = v.lesson;
    assert.ok(mod(id)?.sections.some((s) => s.heading === heading), `${v.topic ?? v.name}: no section "${heading}" in ${id}`);
  }
  assert.equal(videosFor('interpolation', 'Newton forward (Gregory) interpolation for equal intervals')[0].url, 'https://youtu.be/Aw6LvaPtESE');
  assert.ok(/videosFor\(/.test(src('Learn.jsx')), 'Learn does not show the lesson videos');
});
