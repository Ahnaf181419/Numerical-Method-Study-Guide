import { useState } from 'react';
import { Block, Rich } from './NotesView.jsx';
import NotesView from './NotesView.jsx';
import checks from '../data/checks.js';

export function Choice({ item, onAnswer }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  const right = picked === item.answer;
  return (
    <div>
      <p className="prose-read mb-4 text-[1.15rem] leading-snug text-text">
        <Rich text={item.q} />
      </p>
      <div className={`grid gap-2.5 ${answered ? (right ? 'pop' : 'shake') : ''}`}>
        {item.options.map((o, k) => {
          const state = !answered ? 'border-line bg-ink' : k === item.answer ? 'border-gold bg-gold/12 text-text' : k === picked ? 'border-red bg-red/12' : 'border-line opacity-50';
          return (
            <button
              key={k}
              disabled={answered}
              onClick={() => (setPicked(k), onAnswer?.(k === item.answer))}
              className={`press flex min-h-13 items-center gap-3 rounded-xl border px-4 py-2.5 text-left ${state}`}
            >
              <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-sm ${answered && k === item.answer ? 'border-gold bg-gold text-ink' : answered && k === picked ? 'border-red bg-red text-ink' : 'border-line text-ash'}`}>
                {answered && k === item.answer ? '✓' : answered && k === picked ? '✕' : 'ABCD'[k]}
              </span>
              <span>
                <Rich text={o} />
              </span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="enter mt-4 text-[1.02rem] leading-relaxed" aria-live="polite">
          <b className={right ? 'text-gold' : 'text-red'}>{right ? 'Correct. ' : 'Not quite. '}</b>
          <span className="text-text/85">
            <Rich text={item.explain} />
          </span>
        </p>
      )}
    </div>
  );
}

export default function Learn({ module, index, learned, onIndex, onLearned, onDone }) {
  const [whole, setWhole] = useState(false);
  const [dir, setDir] = useState('enter');
  const total = module.sections.length;
  const i = Math.min(index, total - 1);
  const s = module.sections[i];
  const check = checks[module.id]?.[s.heading];
  const isLearned = learned.includes(i);
  const go = (to) => {
    setDir(to > i ? 'enter-next' : 'enter-prev');
    onIndex(to);
    window.scrollTo({ top: 0 });
  };
  const next = () => {
    if (!isLearned) onLearned(i);
    if (i + 1 < total) go(i + 1);
    else onDone();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="View" className="inline-flex rounded-xl border border-line bg-panel p-1 text-sm">
          {[
            [false, 'Step by step'],
            [true, 'Whole chapter'],
          ].map(([v, l]) => (
            <button key={l} role="radio" aria-checked={whole === v} onClick={() => setWhole(v)} className={`press min-h-10 rounded-lg px-4 font-medium ${whole === v ? 'bg-raise text-text' : 'text-ash'}`}>
              {l}
            </button>
          ))}
        </div>
        <span className="text-sm text-ash">
          {learned.length} of {total} lessons understood
        </span>
      </div>

      {whole ? (
        <NotesView module={module} />
      ) : (
        <>
          <nav aria-label="Lessons" className="mb-8 flex gap-1.5">
            {module.sections.map((sec, k) => (
              <button
                key={sec.heading}
                onClick={() => go(k)}
                aria-label={`Lesson ${k + 1}: ${sec.heading}${learned.includes(k) ? ' (understood)' : ''}`}
                aria-current={k === i ? 'step' : undefined}
                className="group flex min-h-11 flex-1 items-center"
              >
                <span className={`h-1.5 w-full rounded-full transition-colors duration-300 ${k === i ? 'bg-gold' : learned.includes(k) ? 'bg-gold/45' : 'bg-line'}`} />
              </button>
            ))}
          </nav>

          <article key={`${module.id}-${i}`} className={dir}>
            <p className="font-sans text-sm font-medium text-gold">
              Lesson {i + 1} of {total}
            </p>
            <h2 className="display mb-4 mt-1 text-[2rem] font-medium leading-tight sm:text-[2.3rem]">{s.heading}</h2>
            <div className="prose-read text-text/90">
              {s.blocks.map((b, k) => (
                <Block key={k} b={b} />
              ))}
            </div>

            {check && (
              <section aria-label="Check yourself" className="mt-10 rounded-2xl border border-line bg-panel p-5 sm:p-6">
                <p className="mb-3 font-sans text-sm font-semibold text-gold">
                  Check yourself <span className="ml-1 font-normal text-ash">— a study check for learning, not a Question Bank question</span>
                </p>
                <Choice key={`${module.id}-${i}`} item={check} />
              </section>
            )}
          </article>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => go(i - 1)} disabled={i === 0} className="press min-h-12 rounded-xl border border-line px-5 text-text disabled:opacity-30">
              Previous
            </button>
            <button onClick={() => onLearned(i)} aria-pressed={isLearned} className={`press min-h-12 rounded-xl border px-5 ${isLearned ? 'border-gold/50 text-gold' : 'border-line text-ash'}`}>
              {isLearned ? 'Understood ✓' : 'Mark understood'}
            </button>
            <button onClick={next} className="press ml-auto min-h-12 rounded-xl bg-gold px-6 font-semibold text-ink">
              {i + 1 < total ? 'Understood, next lesson' : 'Finish: practise this chapter'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
