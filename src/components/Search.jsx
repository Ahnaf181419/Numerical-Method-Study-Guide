import { useEffect, useMemo, useRef, useState } from 'react';
import { InlineMath } from 'react-katex';
import { Rich } from './NotesView.jsx';
import mathSnippet from '../lib/snippet.js';

const plain = (t = '') => t.replace(/\$[^$]+\$/g, '…').replace(/\*/g, '');

function buildIndex(modules) {
  const out = [];
  for (const m of modules) {
    m.sections.forEach((s, i) => {
      const text = s.blocks.flatMap((b) => [b.text, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows?.flat() ?? [])]).filter(Boolean).map(plain).join(' ');
      out.push({ kind: 'Lesson', m, i, title: s.heading, text });
    });
    m.formulas.forEach((f) => out.push({ kind: 'Formula', m, i: 0, title: f.label, text: f.where, tex: f.tex }));
  }
  return out;
}

export default function Search({ open, onClose, modules, onGo }) {
  const ref = useRef(null);
  const input = useRef(null);
  const [q, setQ] = useState('');
  const index = useMemo(() => buildIndex(modules), [modules]);

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) {
      d.showModal();
      setQ('');
      input.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = terms.length
    ? index
        .map((e) => {
          const hay = `${e.title} ${e.text} ${e.m.title}`.toLowerCase();
          if (!terms.every((t) => hay.includes(t))) return null;
          const score = terms.reduce((a, t) => a + (e.title.toLowerCase().includes(t) ? 3 : 1), 0);
          return { ...e, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 30)
    : [];

  const snippet = (text) => mathSnippet(text, terms[0]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Search"
      className="m-auto mt-[max(1rem,env(safe-area-inset-top))] max-h-[85dvh] w-[min(94vw,720px)] max-w-none rounded-2xl border border-line bg-ink p-0 text-text sm:mt-[10dvh]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search lessons and formulas, e.g. Hamming, guard band, Nyquist"
          aria-label="Search lessons and formulas"
          className="min-h-14 flex-1 bg-transparent text-base text-text outline-none placeholder:text-ash/70"
        />
        <button onClick={onClose} className="press min-h-10 rounded-lg px-3 text-sm text-ash">
          Close
        </button>
      </div>
      <div className="max-h-[70dvh] overflow-y-auto p-2">
        {terms.length > 0 && !hits.length && <p className="p-6 text-center text-ash">No lessons or formulas mention “{q}”. Try a shorter word.</p>}
        {!terms.length && <p className="p-6 text-center text-ash">Type a topic to jump straight to its lesson.</p>}
        {hits.map((h, k) => (
          <button key={k} onClick={() => onGo(h.m.id, h.i)} className="press block w-full rounded-xl px-4 py-3 text-left hover:bg-panel">
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-semibold text-text">
                <Rich text={h.title} />
              </span>
              <span className="shrink-0 text-xs text-ash">
                {h.kind}, Ch {h.m.chapter}
              </span>
            </span>
            {h.tex ? (
              <span className="mt-1 block overflow-x-auto text-gold">
                <InlineMath math={h.tex} />
              </span>
            ) : (
              <span className="mt-1 block text-sm leading-relaxed text-ash">
                <Rich text={snippet(h.text)} />
              </span>
            )}
          </button>
        ))}
      </div>
    </dialog>
  );
}
