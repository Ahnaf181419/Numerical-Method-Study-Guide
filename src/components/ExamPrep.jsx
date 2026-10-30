import { useMemo, useState } from 'react';
import { Rich } from './NotesView.jsx';
import Quiz, { shuffle } from './Quiz.jsx';
import { likely, traps } from '../data/examPrep.js';
import papers from '../data/pastPapers.js';
import fullAnswers, { paperKey } from '../data/fullAnswers.js';
import { Worked } from './Examples.jsx';

function Likely({ q, mod, onOpen, onExample, full, label = 'model answer' }) {
  const [open, setOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className={`flex flex-wrap items-center gap-2 font-medium ${q.id && !q.flagged ? 'text-ash' : 'text-red'}`}>
          {q.id && <span className="display rounded-md bg-red/15 px-2 py-0.5 text-base text-red">{q.id}</span>}
          {q.flag}
        </span>
        <button onClick={() => onOpen(mod.id)} className="press min-h-9 rounded-lg px-2 text-ash underline-offset-4 hover:underline">
          Ch {mod.chapter}: {mod.title}
        </button>
      </div>
      <h3 className="prose-read overflow-x-auto text-[1.18rem] leading-snug text-text">
        <Rich text={q.q} />
      </h3>
      {open && (
        <ol className="prose-read enter mt-4 list-decimal space-y-2 border-l-2 border-gold/50 pl-9 text-text/90">
          {q.answer.map((a, i) => (
            <li key={i} className="overflow-x-auto">
              <Rich text={a} />
            </li>
          ))}
        </ol>
      )}
      {open && q.examples?.length > 0 && (
        <div className="enter mt-4">
          <p className="text-sm text-ash">Full worked answer, written the way you write it in the exam:</p>
          <div className="mt-2 flex flex-col items-start gap-2">
            {q.examples.map((title) => (
              <button key={title} onClick={() => onExample(mod.id, title)} className="press min-h-11 rounded-xl border border-gold/50 px-4 py-2 text-left text-gold">
                <Rich text={title} /> →
              </button>
            ))}
          </div>
        </div>
      )}
      {fullOpen && (
        <div className="enter mt-4 rounded-xl border border-gold/40 bg-ink/40 p-4 sm:p-5">
          <p className="font-sans text-sm font-semibold text-gold">Full answer — {q.marks} marks, written as you would in the exam</p>
          <Worked ex={full} />
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={() => setOpen(!open)} className={`press min-h-11 rounded-xl px-5 font-medium ${open ? 'border border-line text-ash' : 'bg-gold text-ink'}`}>
          {open ? `Hide ${label}` : `Show ${label}`}
        </button>
        {full && (
          <button onClick={() => setFullOpen(!fullOpen)} className={`press min-h-11 rounded-xl px-5 font-medium ${fullOpen ? 'border border-line text-ash' : 'border border-gold/60 text-gold'}`}>
            {fullOpen ? 'Hide full answer' : 'Show full answer'}
          </button>
        )}
      </div>
    </article>
  );
}

// The written mock: one numerical question per chapter. The student writes the
// answer on paper first, then reveals the model exam script to compare against.
function ScriptMock({ modules }) {
  const [open, setOpen] = useState({});
  const items = modules
    .map((m) => ({ m, ex: m.examples.find((e) => (e.type ?? '').startsWith('Numerical')) }))
    .filter((x) => x.ex);
  const done = items.filter((x) => open[`${x.m.id}`]).length;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <p className="text-ash">
        One numerical question per chapter. Write your answer on paper — with the mark
        allocations, the pivot checks, the resulting rows — then reveal the model script and
        compare it line by line. Revealed {done}/{items.length}.
      </p>
      {items.map(({ m, ex }) => (
        <article key={m.id} className="rounded-2xl border border-line bg-panel p-5 sm:p-6">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span className="text-ash">Ch {m.chapter}: {m.title}</span>
            <span className="flex items-center gap-2">
              {ex.marks ? <span className="rounded-md bg-gold/15 px-2 py-0.5 font-medium text-gold">{ex.marks} marks</span> : null}
              <span className="rounded-md border border-line px-2 py-0.5 text-text/80">{ex.type}</span>
            </span>
          </div>
          <h3 className="prose-read overflow-x-auto text-[1.1rem] leading-snug text-text">
            <Rich text={ex.question} />
          </h3>
          {open[m.id] && (
            <div className="enter mt-2">
              <Worked ex={ex} />
            </div>
          )}
          <button
            onClick={() => setOpen({ ...open, [m.id]: !open[m.id] })}
            className={`press mt-4 min-h-11 rounded-xl px-5 font-medium ${open[m.id] ? 'border border-line text-ash' : 'bg-gold text-ink'}`}
          >
            {open[m.id] ? 'Hide the model script' : 'I have written my answer — show the model script'}
          </button>
        </article>
      ))}
    </div>
  );
}

function Mock({ modules, best, onFinish, onOpen }) {
  const [size, setSize] = useState(null);
  const [written, setWritten] = useState(false);
  // Spread questions evenly across chapters, then shuffle.
  const questions = useMemo(() => {
    if (!size) return [];
    const pool = modules.map((m) => shuffle(m.quiz).map((q) => ({ ...q, tag: `Ch ${m.chapter}: ${m.title}`, mid: m.id })));
    const picked = [];
    for (let r = 0; picked.length < size && r < 20; r++) pool.forEach((p) => p[r] && picked.length < size && picked.push(p[r]));
    return shuffle(picked);
  }, [size, modules]);
  if (written) return <ScriptMock modules={modules} />;
  if (!size)
    return (
      <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
        <h3 className="display text-3xl">Mock exam</h3>
        <p className="mt-2 max-w-prose text-ash">Questions are drawn at random from every chapter. At the end you get a chapter-by-chapter breakdown showing where to revise.</p>
        {best != null && <p className="mt-2 text-sm text-gold">Best so far: {best}%</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          {[10, 20, 40].map((n) => (
            <button key={n} onClick={() => setSize(n)} className="press min-h-12 rounded-xl border border-line px-6 font-medium text-text lift">
              {n} questions
            </button>
          ))}
        </div>
        <div className="mt-6 border-t border-line pt-6">
          <p className="text-sm text-ash">Or practise writing full answers the way the exam marks them:</p>
          <button onClick={() => setWritten(true)} className="press mt-3 min-h-12 rounded-xl border border-gold/60 px-6 font-medium text-gold">
            Written script — one question per chapter
          </button>
        </div>
      </div>
    );

  return (
    <Quiz
      key={size}
      questions={questions}
      onFinish={(score, order) => onFinish(Math.round((score / order.length) * 100))}
      renderResult={(order, answers) => {
        const by = {};
        order.forEach((q, i) => {
          by[q.mid] ??= { ok: 0, n: 0, tag: q.tag };
          by[q.mid].n++;
          if (answers[i]) by[q.mid].ok++;
        });
        return (
          <div className="mb-6 grid gap-2 text-left">
            {Object.entries(by).map(([mid, r]) => {
              const pct = r.ok / r.n;
              return (
                <button key={mid} onClick={() => onOpen(mid)} className="press grid gap-1 rounded-xl px-2 py-1.5 text-left">
                  <span className="flex justify-between text-sm">
                    <span className={pct < 0.6 ? 'text-red' : 'text-text'}>{r.tag}</span>
                    <span className="tabular-nums text-ash">
                      {r.ok}/{r.n}
                    </span>
                  </span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-line">
                    <span className={`bar-fill block h-full w-full ${pct < 0.6 ? 'bg-red' : 'bg-gold'}`} style={{ transform: `scaleX(${pct})` }} />
                  </span>
                </button>
              );
            })}
            <p className="mt-1 text-sm text-ash">Red chapters are below 60%. Tap one to revise it.</p>
          </div>
        );
      }}
    />
  );
}

// A full answer is either the lesson example that works this exact question, or a script written for it.
const fullFor = (paper, it, byId) => {
  const f = fullAnswers[paperKey(paper, it)];
  return typeof f === 'string' ? byId[it.module].examples.find((e) => e.title === f) : f;
};

export default function ExamPrep({ modules, progress, onOpen, onExample, onMockFinish }) {
  const [tab, setTab] = useState('paper');
  const [paperIdx, setPaperIdx] = useState(0);
  const byId = Object.fromEntries(modules.map((m) => [m.id, m]));
  const tabs = [
    ['paper', 'Past papers'],
    ['likely', 'Likely questions'],
    ['mock', 'Mock exam'],
    ['traps', 'Traps'],
  ];
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-8 sm:px-8">
      <p className="display text-lg text-red">Exam prep</p>
      <h1 className="display mt-1 text-5xl leading-[1.05] sm:text-6xl">Ace the final</h1>
      <p className="mt-3 max-w-prose text-ash">The questions your notes flag as likely, a mock exam across every chapter, and the mistakes that cost marks.</p>
      <div role="tablist" aria-label="Exam prep sections" className="mt-7 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map(([id, l]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={`relative min-h-12 shrink-0 whitespace-nowrap px-4 font-medium ${tab === id ? 'text-text' : 'text-ash'}`}>
            {l}
            <span className={`tab-ind absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-red ${tab === id ? 'opacity-100' : 'scale-x-50 opacity-0'}`} />
          </button>
        ))}
      </div>
      <div key={tab} className="enter mt-8">
        {tab === 'paper' && (
          <div role="radiogroup" aria-label="Paper" className="mb-6 inline-flex flex-wrap gap-1 rounded-xl border border-line bg-panel p-1">
            {papers.map((p, i) => (
              <button key={p.title} role="radio" aria-checked={paperIdx === i} onClick={() => setPaperIdx(i)} className={`press min-h-10 rounded-lg px-4 text-sm font-medium ${paperIdx === i ? 'bg-red text-ink' : 'text-ash'}`}>
                {p.title.replace(' semester final', '')}
              </button>
            ))}
          </div>
        )}
        {tab === 'paper' &&
          [papers[paperIdx]].map((paper) => (
            <div key={paper.title} className="grid grid-cols-[minmax(0,1fr)] gap-5">
              <div>
                <h2 className="display text-3xl">{paper.title}</h2>
                <p className="mt-1 text-ash">
                  {paper.meta}
                  {paper.sets.some((set) => set.items.some((it) => it.flagged)) && ' Questions marked in red need the textbook method because your slides and notes don’t cover them.'}
                </p>
              </div>
              {paper.sets.map((set) => (
                <section key={set.name} className="grid grid-cols-[minmax(0,1fr)] gap-4">
                  <h3 className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
                    <span className="display text-2xl">{set.name}</span>
                    <span className="text-sm text-ash">{set.rule}</span>
                  </h3>
                  {set.items.map((it) => (
                    <Likely key={it.id} q={{ ...it, flag: `${it.marks} marks · ${it.type}${it.flagged ? ' · not in your slides/notes' : ''}` }} mod={byId[it.module]} onOpen={onOpen} full={fullFor(paper, it, byId)} />
                  ))}
                </section>
              ))}
            </div>
          ))}
        {tab === 'likely' && (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
            {likely.map((q) => (
              <Likely key={q.q} q={q} mod={byId[q.module]} onOpen={onOpen} onExample={onExample} />
            ))}
          </div>
        )}
        {tab === 'mock' && <Mock modules={modules} best={progress.mockBest} onFinish={onMockFinish} onOpen={onOpen} />}
        {tab === 'traps' && (
          <ul className="grid gap-3">
            {traps.map((t) => (
              <li key={t.text} className="flex gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-red" />
                <div>
                  <p className="prose-read leading-relaxed text-text/90">
                    <Rich text={t.text} />
                  </p>
                  <button onClick={() => onOpen(t.module)} className="mt-1 text-sm text-ash underline-offset-4 hover:underline">
                    Ch {byId[t.module].chapter}: {byId[t.module].title}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
