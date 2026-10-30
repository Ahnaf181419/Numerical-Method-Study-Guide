import { useState } from 'react';
import { BlockMath } from 'react-katex';
import { SOLVERS } from '../lib/solverConfigs.js';
import { mathError } from './NotesView.jsx';

const numbers = (text, label) => {
  const nums = text.split(/[\s,;]+/).filter(Boolean).map(Number);
  if (!nums.length || nums.some((x) => !Number.isFinite(x))) throw new Error(`${label}: enter numbers separated by commas.`);
  return nums;
};

function parse([key, label, type], raw) {
  const t = String(raw).trim();
  if (type === 'select') return t;
  if (type === 'expr') {
    if (!t) throw new Error(`${label}: type the function.`);
    return t;
  }
  if (type === 'matrix') {
    const rows = t.split(';').map((r) => r.trim()).filter(Boolean);
    if (rows.length < 2) throw new Error(`${label}: give at least two rows, separated by ";".`);
    const m = rows.map((r) => numbers(r, label));
    if (!m.every((r) => r.length === m[0].length)) throw new Error(`${label}: every row must have the same number of entries.`);
    return m;
  }
  if (type === 'vec') {
    if (!t) return [];
    return numbers(t, label);
  }
  if (type === 'points') {
    const rows = t.split(';').map((r) => r.trim()).filter(Boolean);
    if (rows.length < 2) throw new Error(`${label}: give at least two points as x,y.`);
    return rows.map((r) => numbers(r, label));
  }
  if (type === 'nums') return numbers(t, label);
  if (type === 'bits') {
    if (!/^[01]+$/.test(t)) throw new Error(`${label}: use only 0 and 1.`);
    return t;
  }
  if (type === 'bitrows') {
    const rows = t.split(/\s+/);
    if (!rows.every((r) => /^[01]+$/.test(r) && r.length === rows[0].length)) throw new Error(`${label}: rows must be 0/1 and the same length.`);
    return rows;
  }
  if (type === 'paths') {
    const rows = t.split(/[\s,]+/).filter(Boolean);
    if (!rows.length || rows.some((p) => !/^[1-9]+$/.test(p))) throw new Error(`${label}: write each path as numbers, e.g. 135.`);
    return rows.map((p) => [...p].map(Number));
  }
  if (type === 'any') {
    if (t === '' || !Number.isFinite(Number(t))) throw new Error(`${label}: enter a number.`);
    return Number(t);
  }
  if (type === 'list') {
    const nums = numbers(t, label);
    if (nums.some((x) => !Number.isInteger(x) || x < 0)) throw new Error(`${label}: enter whole numbers separated by commas.`);
    return nums;
  }
  const x = Number(t);
  if (!Number.isFinite(x) || x < 0 || (type === 'num' && x === 0)) throw new Error(`${label}: enter a ${type === 'num' ? 'positive' : 'non-negative'} number.`);
  return x;
}

function Solver({ cfg }) {
  const [vals, setVals] = useState(() => Object.fromEntries(cfg.fields.map((f) => [f[0], String(f[3])])));
  let out, error;
  try {
    out = cfg.run(Object.fromEntries(cfg.fields.map((f) => [f[0], parse(f, vals[f[0]])])));
  } catch (e) {
    error = e.message;
  }
  return (
    <section className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold">{cfg.title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {cfg.fields.map(([key, label, type, , options]) => (
          <label key={key} className="grid gap-1 text-sm text-ash">
            {label}
            {type === 'select' ? (
              <select value={vals[key]} onChange={(e) => setVals({ ...vals, [key]: e.target.value })} className="min-h-12 rounded-lg border border-line bg-ink px-3 text-base text-text">
                {options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                value={vals[key]}
                onChange={(e) => setVals({ ...vals, [key]: e.target.value })}
                // 'any' takes negatives, and the iPhone decimal keypad has no minus key
                inputMode={type === 'num' || type === 'num0' ? 'decimal' : type === 'bits' ? 'numeric' : 'text'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-h-12 rounded-lg border border-line bg-ink px-3 font-mono text-base text-text"
              />
            )}
          </label>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto" aria-live="polite">
        {error ? (
          <p className="text-red">{error}</p>
        ) : (
          <div className="math-block">
            {out.steps.map((t, i) => (
              <BlockMath key={i} math={t} renderError={mathError} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Solvers({ module }) {
  const cfgs = module.solvers.flatMap((id) => SOLVERS[id] ?? []);
  if (!cfgs.length) return <p className="rounded-xl border border-line bg-panel p-8 text-center text-ash">This chapter is all theory, with no calculations to solve. Use Flashcards or Quiz to practise it.</p>;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <p className="text-ash">Each solver opens on an example from the slides or notes. Change the numbers to check your own working.</p>
      {cfgs.map((c) => (
        <Solver key={c.title} cfg={c} />
      ))}
    </div>
  );
}
