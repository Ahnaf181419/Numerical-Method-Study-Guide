// Guards the content payload: every module is complete, quiz keys are valid, and all math compiles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import { likely, traps } from '../data/examPrep.js';
import papers from '../data/pastPapers.js';
import { SOLVERS } from './solverConfigs.js';

const tex = (s) => katex.renderToString(s, { throwOnError: true });
const inline = (text = '') => (text.match(/\$[^$]+\$/g) ?? []).forEach((m) => tex(m.slice(1, -1)));

test('modules are complete and unique', () => {
  assert.equal(new Set(modules.map((m) => m.id)).size, modules.length);
  for (const m of modules) {
    for (const k of ['id', 'title', 'chapter', 'wave', 'sources', 'sections', 'formulas', 'examples', 'flashcards', 'quiz', 'solvers'])
      assert.ok(m[k] !== undefined, `${m.id}.${k}`);
    assert.ok(m.sections.length, `${m.id} has sections`);
    assert.ok(m.flashcards.length && m.quiz.length, `${m.id} has cards and quiz`);
  }
});

test('chapters are numbered in study order without gaps', () => {
  const chapters = modules.map((m) => m.chapter);
  assert.deepEqual(chapters, [...chapters].sort((a, b) => a - b));
  assert.equal(new Set(chapters).size, chapters.length);
  chapters.forEach((c, i) => assert.equal(c, i + 1, `chapter ${c} is out of order`));
});

test('quiz answers point at a real option', () => {
  for (const m of modules) for (const q of m.quiz) assert.ok(q.answer >= 0 && q.answer < q.options.length, `${m.id}: ${q.q}`);
});

test('all LaTeX compiles', () => {
  for (const m of modules) {
    for (const s of m.sections)
      for (const b of s.blocks) {
        if (b.type === 'math') tex(b.tex);
        inline(b.text);
        b.items?.forEach(inline);
        b.head?.forEach(inline);
        b.rows?.flat().forEach(inline);
      }
    m.formulas.forEach((f) => tex(f.tex));
    m.examples.forEach((e) => [e.question, e.answer, e.note, ...(e.explanation ?? [])].forEach(inline));
    m.examples.forEach((e) => e.steps.forEach((st) => inline(typeof st === 'string' ? st : st.t)));
    m.flashcards.forEach((c) => [c.front, c.back].forEach(inline));
    m.quiz.forEach((q) => [q.q, q.explain, ...q.options].forEach(inline));
  }
});

test('every lesson has a valid check question', () => {
  for (const m of modules)
    for (const s of m.sections) {
      const c = checks[m.id]?.[s.heading];
      assert.ok(c, `missing check: ${m.id} / ${s.heading}`);
      assert.ok(c.answer >= 0 && c.answer < c.options.length, `${m.id}: ${c.q}`);
      [c.q, c.explain, ...c.options].forEach(inline);
    }
  const headings = new Set(modules.flatMap((m) => m.sections.map((s) => `${m.id}/${s.heading}`)));
  for (const [id, byHeading] of Object.entries(checks)) for (const h of Object.keys(byHeading)) assert.ok(headings.has(`${id}/${h}`), `orphan check: ${id} / ${h}`);
});

test('every solver id used by a module exists', () => {
  for (const m of modules) for (const id of m.solvers) assert.ok(SOLVERS[id], `${m.id}: unknown solver "${id}"`);
});

test('exam prep points at real chapters and its math compiles', () => {
  const ids = new Set(modules.map((m) => m.id));
  for (const q of likely) {
    assert.ok(ids.has(q.module), q.q);
    [q.q, ...q.answer].forEach(inline);
  }
  for (const t of traps) {
    assert.ok(ids.has(t.module), t.text);
    inline(t.text);
  }
});

test('past paper items point at real chapters and their math compiles', () => {
  const ids = new Set(modules.map((m) => m.id));
  for (const p of papers)
    for (const set of p.sets)
      for (const it of set.items) {
        assert.ok(ids.has(it.module), it.id);
        [it.q, ...it.answer].forEach(inline);
      }
});

test('every example carries a mark allocation that adds up', () => {
  for (const m of modules)
    for (const e of m.examples) {
      assert.ok(e.marks > 0, `${m.id}: ${e.title} has no marks`);
      assert.ok(e.steps.length, `${m.id}: ${e.title} has no steps`);
      assert.ok(e.question && e.answer, `${m.id}: ${e.title} is missing the question or the answer`);
    }
});

test('every past-paper question carries a Theory/Numerical type', () => {
  for (const p of papers)
    for (const set of p.sets)
      for (const it of set.items)
        assert.ok(typeof it.type === 'string' && /^(Theory|Numerical) — /.test(it.type), `${p.title} ${it.id}: missing type`);
});
