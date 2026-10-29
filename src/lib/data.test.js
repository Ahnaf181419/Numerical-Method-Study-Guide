// Guards the content payload: every module is complete, quiz keys are valid, and all math compiles.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import { likely, traps } from '../data/examPrep.js';
import papers from '../data/pastPapers.js';
import fullAnswers, { paperKey } from '../data/fullAnswers.js';
import syllabusTopics from '../data/syllabusTopics.js';
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
    for (const title of q.examples) assert.ok(modules.find((m) => m.id === q.module).examples.some((e) => e.title === title), `${q.id}: no example "${title}"`);
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

test('every worked example carries a Theory/Numerical type', () => {
  for (const m of modules)
    for (const e of m.examples)
      assert.ok(typeof e.type === 'string' && /^(Theory|Numerical) — /.test(e.type), `${m.id}: ${e.title} needs a type`);
});

test('titles and headings compile as inline math', () => {
  for (const m of modules) {
    inline(m.title);
    m.sections.forEach((x) => inline(x.heading));
    m.examples.forEach((e) => inline(e.title));
    m.formulas.forEach((f) => inline(f.label) + inline(f.where));
  }
});

test('flat point lists are split into wrappable math spans', () => {
  // A single $...$ span is one unbreakable box; a flat list of coordinate pairs
  // inside it overflows the card. Split such lists into several spans.
  const all = [];
  const walk = (x, where) => {
    if (typeof x === 'string') all.push([where, x]);
    else if (Array.isArray(x)) x.forEach((v) => walk(v, where));
    else if (x && typeof x === 'object') Object.entries(x).forEach(([k, v]) => walk(v, `${where}.${k}`));
  };
  modules.forEach((m) => walk(m, m.id));
  walk(papers, 'papers');
  walk(fullAnswers, 'fullAnswers');
  walk(likely, 'likely');
  walk(traps, 'traps');
  for (const [where, text] of all)
    for (const m of text.match(/\$[^$]+\$/g) ?? []) {
      const pairs = (m.match(/\),\s*\(/g) ?? []).length;
      assert.ok(pairs <= 3, `${where}: split the ${pairs}-pair list into smaller $...$ spans so it can wrap on a phone`);
    }
});

test('syllabus page reproduces Shuvo Sir topic pdf in order', () => {
  assert.deepEqual(syllabusTopics.sections.map((x) => x.title), [
    'Interpolation',
    'Numerical Integrations',
    'Numerical Differentiations',
    'Regression Normal',
    'Regression by Gradient Descent',
  ]);
  const urls = JSON.stringify(syllabusTopics).match(/https:[^"']+/g) ?? [];
  assert.equal(urls.length, 12); // 9 youtube + 3 drive links
  urls.forEach((u) => assert.ok(!u.includes(' '), u));
});

const marksOf = (steps) => steps.reduce((sum, st) => sum + (parseInt(st.m, 10) || 0), 0);

test('every example\'s step marks add up to its marks', () => {
  for (const m of modules) for (const e of m.examples) if (e.marks) assert.equal(marksOf(e.steps), e.marks, `${m.id}: ${e.title}`);
});

test('every past-paper item has a full exam-script answer', () => {
  const keys = new Set();
  for (const p of papers)
    for (const set of p.sets)
      for (const it of set.items) {
        const key = paperKey(p, it);
        keys.add(key);
        const f = fullAnswers[key];
        assert.ok(f, `${key}: no full answer`);
        const full = typeof f === 'string' ? modules.find((m) => m.id === it.module).examples.find((e) => e.title === f) : f;
        assert.ok(full, `${key}: no ${it.module} example "${f}"`);
        assert.equal(marksOf(full.steps), it.marks, `${key}: step marks must add up to the paper's ${it.marks}`);
        assert.ok(full.steps.every((st) => st.t && st.m), `${key}: every step needs text and marks`);
        assert.match(full.answer, /\\boxed/, `${key}: box the final answer`);
        assert.ok(full.note && full.explanation?.length, `${key}: needs a Trap note and an explanation`);
        [full.answer, full.note, ...full.explanation, ...full.steps.map((st) => st.t)].forEach(inline);
        // A script written for the paper must carry every number its (solver-audited) model answer prints.
        // Linked lesson examples are audited against the solvers on their own (audit.test.js).
        if (typeof f === 'string') continue;
        const text = [full.answer, full.note, ...full.steps.map((st) => st.t)].join(' ');
        for (const n of it.answer.join(' ').replace(/(§|Ex\.\s?|Example\s|Ch\.\s?)\d+(\.\d+)*/g, '').match(/(?<![\d.])\d+\.\d{2,}/g) ?? []) assert.ok(text.includes(n), `${key}: full answer is missing ${n}`);
      }
  for (const k of Object.keys(fullAnswers)) assert.ok(keys.has(k), `${k}: no such past-paper item`);
});

