import { useEffect, useMemo, useRef, useState } from 'react';
import { BlockMath } from 'react-katex';
import { mathError } from './NotesView.jsx';

export default function CheatSheet({ open, onClose, modules, currentId }) {
  const ref = useRef(null);
  const [filter, setFilter] = useState('all');
  const withFormulas = useMemo(() => modules.filter((m) => m.formulas.length), [modules]);
  const shown = filter === 'all' ? withFormulas : withFormulas.filter((m) => m.id === filter);

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) {
      d.showModal();
      if (withFormulas.some((m) => m.id === currentId)) setFilter(currentId);
    }
    if (!open && d.open) d.close();
  }, [open, currentId, withFormulas]);

  const chip = (id, label) => (
    <button
      key={id}
      onClick={() => setFilter(id)}
      aria-pressed={filter === id}
      className={`min-h-10 shrink-0 rounded-full border px-4 text-sm ${filter === id ? 'border-gold bg-gold text-ink' : 'border-line text-ash active:bg-raise'}`}
    >
      {label}
    </button>
  );

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Formula cheat sheet"
      className="m-auto h-[100dvh] max-h-none w-full max-w-none bg-ink p-0 text-text sm:h-[min(90dvh,900px)] sm:w-[min(92vw,880px)] sm:rounded-2xl sm:border sm:border-line"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <h2 className="font-serif text-2xl">Formula sheet</h2>
          <button onClick={onClose} className="min-h-11 rounded-xl border border-line px-4 text-ash active:bg-raise">
            Close
          </button>
        </header>
        <nav aria-label="Filter by chapter" className="flex gap-2 overflow-x-auto border-b border-line px-5 py-3">
          {chip('all', 'All chapters')}
          {withFormulas.map((m) => chip(m.id, `Ch ${m.chapter}`))}
        </nav>
        <div className="flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {shown.map((m) => (
            <section key={m.id} className="py-5">
              <h3 className="mb-3 text-ash">
                <span className="mr-2 font-serif text-gold">{m.chapter}</span>
                {m.title}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {m.formulas.map((f) => (
                  <div key={f.label} className="rounded-xl border border-line bg-panel px-4 py-3">
                    <p className="text-sm font-medium">{f.label}</p>
                    <div className="overflow-x-auto">
                      <BlockMath math={f.tex} renderError={mathError} />
                    </div>
                    {f.where && <p className="text-sm text-ash">{f.where}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </dialog>
  );
}
