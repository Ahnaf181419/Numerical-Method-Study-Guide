// Guards for the audit findings that add teaching material rather than fix a number:
//   finding 10 — the Taylor expansion is used in three chapters but never introduced;
//   finding 12 — the mock exam never asks for a written answer;
//   finding 13 — the teacher's drill examples are not documented anywhere;
//   finding 14 — two chapters have no interactive calculator.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import * as s from './solvers.js';

const mod = (id) => modules.find((m) => m.id === id);
const sectionText = (id, heading) => {
  const sec = mod(id).sections.find((x) => x.heading === heading);
  assert.ok(sec, `${id}: no section "${heading}"`);
  return sec.blocks.flatMap((b) => [b.text, b.tex, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows?.flat() ?? [])]).join('\n');
};

// ---- finding 10: the Taylor expansion is introduced once, then used ------------
test('the Taylor expansion is introduced before the three derivations that use it', () => {
  const intro = mod('errors').sections.find((x) => x.heading.toLowerCase().includes('taylor'));
  assert.ok(intro, 'errors: no section introducing the Taylor expansion');
  const text = sectionText('errors', intro.heading);
  // The first two terms, the tangent-line picture, and the general form.
  assert.ok(/f\(x\s*\+\s*h\)\s*=/.test(text) || /f\(x_0\s*\+\s*h\)/.test(text), 'no Taylor expansion formula');
  assert.ok(text.includes("f'(x)") || text.includes("f'(x_0)"), 'no first-derivative term');
  assert.ok(/f''\(/.test(text), 'no second-derivative term');
  assert.ok(/tangent/i.test(text), 'no tangent-line explanation');
  assert.ok(checks.errors[intro.heading], `errors: no check question for "${intro.heading}"`);
});

test('the three chapters that use the Taylor expansion point at its introduction', () => {
  const introHeading = mod('errors').sections.find((x) => x.heading.toLowerCase().includes('taylor')).heading;
  const at = (id, heading) => {
    const t = sectionText(id, heading);
    assert.ok(t.includes('Taylor'), `${id}: "${heading}" does not mention the Taylor expansion`);
    assert.ok(t.includes(introHeading), `${id}: "${heading}" does not point at the introduction`);
  };
  at('roots', 'Newton-Raphson method');
  at('errors', 'Error propagation through a formula');
  at('differentiation', 'Truncation error: the Taylor proof');
});

// ---- finding 12: a written-answer mock ----------------------------------------
test('the mock exam offers a written-answer mode with a model script per chapter', () => {
  const src = readFileSync(fileURLToPath(new URL('../components/ExamPrep.jsx', import.meta.url)), 'utf8');
  // A distinct written mode that reveals a full exam script, not just the MCQ quiz.
  assert.ok(/Written script/i.test(src), 'ExamPrep: no written-answer mode');
  assert.ok(/<Worked/.test(src), 'ExamPrep: the written mode does not reveal a worked script');
  assert.ok(/on paper/i.test(src), 'ExamPrep: the written mode does not tell the student to write first');
  // Every chapter must be able to supply one.
  for (const m of modules) {
    assert.ok(m.examples.some((e) => (e.type ?? '').startsWith('Numerical') && e.steps?.length), `${m.id}: no numerical worked example to show as a model script`);
  }
});

// ---- finding 13: the teacher's drill examples are documented -------------------
test('the exam guidelines record which site example replaces each drill example', () => {
  const doc = readFileSync(fileURLToPath(new URL('../../docs/EXAM-GUIDELINES.md', import.meta.url)), 'utf8');
  assert.ok(/drill/i.test(doc), 'EXAM-GUIDELINES.md does not mention the drill examples');
  assert.ok(/4\.4/.test(doc) && /9\.1/.test(doc), 'EXAM-GUIDELINES.md does not list the book example numbers');
});

// ---- finding 14: every chapter can be practised on a calculator ----------------
test('every chapter has an interactive calculator', () => {
  for (const m of modules) assert.ok(m.solvers.length, `${m.id}: no solver`);
});

test('chopping and rounding follow the rule the errors chapter teaches', () => {
  // The table in the errors chapter (Shanker Rao's rule, with the even-digit rule).
  const cases = [
    ['0.522341', 3, '0.522', '0.522'],
    ['0.522341', 4, '0.5223', '0.5223'],
    ['0.522341', 5, '0.52234', '0.52234'],
    ['93.2155', 3, '93.2', '93.2'],
    ['93.2155', 4, '93.21', '93.22'],
    ['93.2155', 5, '93.215', '93.216'],
    ['0.666666', 3, '0.666', '0.667'],
    ['0.666666', 4, '0.6666', '0.6667'],
    ['0.666666', 5, '0.66666', '0.66667'],
  ];
  for (const [v, n, chopped, rounded] of cases) {
    const r = s.chopRound({ value: Number(v), digits: n });
    assert.equal(String(r.result.chopped), chopped, `chopping ${v} to ${n} figures`);
    assert.equal(String(r.result.rounded), rounded, `rounding ${v} to ${n} figures`);
  }
});
