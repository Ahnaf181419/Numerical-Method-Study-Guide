import { useEffect, useRef, useState } from 'react';
import { Rich } from './NotesView.jsx';

const stepText = (s) => (typeof s === 'string' ? s : s.t);
const stepMarks = (s) => (typeof s === 'string' ? null : s.m);

// The exam script itself: the first `shown` steps, then (once every step is shown) the answer, trap and explanation.
export function Worked({ ex, shown = Infinity }) {
  const done = shown > ex.steps.length;
  const explain = ex.explanation == null ? [] : Array.isArray(ex.explanation) ? ex.explanation : [ex.explanation];
  return (
    <>
      {shown > 0 && (
        <ol className="prose-read mt-4 space-y-2 border-l-2 border-gold/50 pl-5 sm:pl-9">
          {ex.steps.slice(0, shown).map((s, i) => (
            <li key={i} className="overflow-x-auto pl-1">
              <span className="prose-read">
                <Rich text={stepText(s)} />
              </span>
              {stepMarks(s) && <span className="ml-2 whitespace-nowrap rounded-md bg-line/60 px-1.5 py-0.5 font-sans text-xs text-ash">{stepMarks(s)}</span>}
            </li>
          ))}
        </ol>
      )}
      {done && (
        <>
          <p className="mt-4 overflow-x-auto rounded-lg bg-gold/10 px-4 py-3 text-[1.05rem]">
            <span className="font-semibold text-gold">Answer: </span>
            <Rich text={ex.answer} />
          </p>
          {ex.note && (
            <p className="mt-3 overflow-x-auto rounded-r-xl border-l-2 border-red/70 bg-red/[0.06] px-4 py-3 text-sm leading-relaxed">
              <span className="font-semibold text-red">Trap: </span>
              <Rich text={ex.note.replace(/^Trap:\s*/i, '')} />
            </p>
          )}
          {explain.length > 0 && (
            <details className="mt-4 rounded-xl border border-line bg-ink/60 p-4">
              <summary className="min-h-11 cursor-pointer py-1 font-sans text-sm font-semibold text-gold">Why this works — full explanation</summary>
              <div className="prose-read mt-2 overflow-x-auto text-text/90">
                {explain.map((p, i) => (
                  <p key={i} className="my-2">
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            </details>
          )}
        </>
      )}
    </>
  );
}

function Example({ ex, focus }) {
  const [shown, setShown] = useState(focus ? ex.steps.length + 1 : 0);
  const ref = useRef(null);
  useEffect(() => {
    if (focus) ref.current.scrollIntoView({ block: 'start' });
  }, [focus]);
  const done = shown > ex.steps.length;
  return (
    <section ref={ref} className={`scroll-mt-20 rounded-2xl border bg-panel p-5 sm:p-6 ${focus ? 'border-gold/60' : 'border-line'}`}>
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">
          <Rich text={ex.title} />
        </h3>
        <span className="flex flex-wrap items-center gap-2 text-sm text-ash">
          {ex.type ? <span className="rounded-md border border-line px-2 py-0.5 font-medium text-text/80">{ex.type}</span> : null}
          {ex.marks ? <span className="rounded-md bg-gold/15 px-2 py-0.5 font-medium text-gold">{ex.marks} marks</span> : null}
          {ex.source}
        </span>
      </header>
      <p className="prose-read overflow-x-auto text-text/90">
        <Rich text={ex.question} />
      </p>
      <Worked ex={ex} shown={shown} />
      <div className="mt-4 flex flex-wrap gap-3">
        {!done && (
          <button onClick={() => setShown(shown + 1)} className="press min-h-12 rounded-xl bg-gold px-5 font-semibold text-ink">
            {shown === 0 ? 'Show first step' : shown === ex.steps.length ? 'Show answer' : 'Next step'}
          </button>
        )}
        {!done && (
          <button onClick={() => setShown(ex.steps.length + 1)} className="press min-h-12 rounded-xl border border-line px-5 text-ash">
            Show all
          </button>
        )}
        {shown > 0 && (
          <button onClick={() => setShown(0)} className="press min-h-12 rounded-xl border border-line px-5 text-ash">
            Hide steps
          </button>
        )}
      </div>
    </section>
  );
}

export default function Examples({ module, focus }) {
  if (!module.examples.length)
    return <p className="rounded-xl border border-line bg-panel p-8 text-center text-ash">The slides and notes have no worked examples for this chapter. Use Flashcards or Quiz to practise it.</p>;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <p className="text-ash">Work each one yourself first, then reveal the script one step at a time. The marks show where the examiner gives credit.</p>
      {module.examples.map((ex) => (
        <Example key={ex.title} ex={ex} focus={ex.title === focus} />
      ))}
    </div>
  );
}
