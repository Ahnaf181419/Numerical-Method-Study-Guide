// Guards added after the 30 Oct 2026 audit (docs/AUDIT-2026-10-30.md).
// Each test locks a defect the audit found, so it cannot come back.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseAst } from 'vite';
import modules from '../data/syllabusData.js';
import checks from '../data/checks.js';
import { SOLVERS } from './solverConfigs.js';
import * as s from './solvers.js';

const close = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);
const mod = (id) => modules.find((m) => m.id === id);
const num = (c) => {
  const t = String(c).replace(/[$\s]/g, '');
  return t === '' ? null : Number(t);
};
const section = (id, heading) => {
  const sec = mod(id).sections.find((s) => s.heading === heading);
  assert.ok(sec, `${id}: no section "${heading}"`);
  return sec;
};
const cell = (s) => String(s).replace(/[$\s]/g, '');

// ---- finding 1: the Weddle solver's own default must run ---------------------
test('every solver runs on the default values it ships with', () => {
  for (const [id, cfgs] of Object.entries(SOLVERS)) {
    for (const cfg of cfgs) {
      const v = Object.fromEntries(cfg.fields.map(([k, , type, def]) => {
        if (type === 'matrix' || type === 'points') return [k, def.split(';').map((r) => r.split(',').map(Number))];
        if (type === 'vec' || type === 'nums' || type === 'list') return [k, def.split(',').map(Number)];
        if (type === 'expr' || type === 'select') return [k, def];
        return [k, Number(def)];
      }));
      assert.doesNotThrow(() => cfg.run(v), `${id} / ${cfg.title} throws on its own defaults`);
    }
  }
});

// ---- finding 2: the elimination solvers open on the board example -------------
test('the elimination solvers open on the board example and solve to (3, 2, 1)', () => {
  for (const id of ['gauss', 'gaussJordan']) {
    for (const cfg of SOLVERS[id]) {
      const A = cfg.fields.find((f) => f[0] === 'A')?.[3];
      if (!A || !A.startsWith('1,1,1')) continue; // the partial-pivoting one uses the paper system
      const M = A.split(';').map((r) => r.split(',').map(Number));
      const b = cfg.fields.find((f) => f[0] === 'b')[3].split(',').map(Number);
      const x = s.gaussEliminate({ A: M, b }).result.x;
      [3, 2, 1].forEach((v, i) => close(x[i], v, 1e-9));
    }
  }
});

// ---- finding 3: the Chapter 6 difference table recomputes ---------------------
test('the Chapter 6 x^4 difference table recomputes from its own y-values', () => {
  const tbl = section('differences', 'The forward difference operator and the difference table').blocks.find((b) => b.type === 'table');
  const ys = tbl.rows.map((r) => Number(cell(r[1])));
  assert.deepEqual(ys, [16, 1, 0, 1, 16, 81, 256]);
  // The table is Chapra's *diagonal* layout: entry (row r, column c) is the
  // c-th difference that starts at row r.
  const cols = [ys];
  for (let c = 1; c <= 5; c++) {
    const prev = cols[c - 1];
    cols.push(prev.slice(1).map((v, i) => v - prev[i]));
  }
  tbl.rows.forEach((row, r) => {
    for (let c = 1; c <= 5; c++) {
      const got = num(row[1 + c]);
      const want = r >= c ? cols[c][r - c] : null;
      assert.equal(got, want, `differences table row ${r} column ${c}: ${got} != ${want}`);
    }
  });
});

// ---- finding 4: significant digits of 0.0005010 -----------------------------
test('the significant-digits answers follow the counting rule in the lesson', () => {
  // 0.0005010 = 5.010 x 10^-4 : the leading zeros are placeholders only, the
  // trailing zero after a non-zero digit is significant. So four, not three.
  const c = checks.errors['Significant digits'];
  assert.equal(c.options[c.answer], '4');
  const q = mod('errors').quiz.find((x) => x.q.includes('0.0005010'));
  assert.ok(q, 'errors quiz: no 0.0005010 question');
  assert.equal(q.options[q.answer], '4');
});

// ---- finding 5: no duplicate object keys in the data files --------------------
test('no data file repeats an object key (the second silently wins)', () => {
  const dir = fileURLToPath(new URL('../data/', import.meta.url));
  const files = readdirSync(dir).filter((f) => f.endsWith('.js'));
  assert.ok(files.length >= 15, 'expected the data files to be found');
  for (const f of files) {
    const ast = parseAst(readFileSync(dir + f, 'utf8'), { lang: 'js' });
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) return node.forEach(walk);
      if (node.type === 'ObjectExpression') {
        const seen = new Set();
        for (const p of node.properties) {
          if (p.type !== 'Property' || p.computed) continue;
          const key = p.key.name ?? p.key.value;
          assert.ok(!seen.has(key), `${f}: duplicate key "${key}" — the first one is silently dropped`);
          seen.add(key);
        }
      }
      for (const v of Object.values(node)) walk(v);
    };
    walk(ast);
  }
});

// ---- finding 15: PCA prints every eigenvalue it finds ------------------------
test('PCA prints every eigenvalue and eigenvector, not just two', () => {
  const three = [[1, 2, 3], [4, 5, 6], [7, 8, 10], [2, 3, 1], [5, 6, 4]];
  const { steps, result } = s.pca({ points: three, threshold: 95 });
  assert.equal(result.eigvals.length, 3);
  for (let i = 1; i <= result.eigvals.length; i++) {
    assert.ok(steps.some((t) => t.includes(`\\lambda_${i} =`)), `no lambda_${i} in the PCA steps`);
    assert.ok(steps.some((t) => t.includes(`v_${i} =`)), `no v_${i} in the PCA steps`);
  }
});
