import { useMemo, useState } from 'react';
import { Rich } from './NotesView.jsx';
import Quiz, { shuffle } from './Quiz.jsx';
import { likely, traps } from '../data/examPrep.js';
import papers from '../data/pastPapers.js';

function Likely({ q, mod, onOpen }) {
  const [open, setOpen] = useState(false);
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
      <h3 className="prose-read text-[1.18rem] leading-snug text-text">
        <Rich text={q.q} />
      </h3>
      {open && (
        <ol className="prose-read enter mt-4 list-decimal space-y-2 border-l-2 border-gold/50 pl-9 text-text/90">
          {q.answer.map((a, i) => (
            <li key={i}>
              <Rich text={a} />
            </li>
          ))}
        </ol>
      )}
      <button onClick={() => setOpen(!open)} className={`press mt-4 min-h-11 rounded-xl px-5 font-medium ${open ? 'border border-line text-ash' : 'bg-gold text-ink'}`}>
        {open ? 'Hide model answer' : 'Show model answer'}
      </button>
    </article>
  );
}

function Mock({ modules, best, onFinish, onOpen }) {
  const [size, setSize] = useState(null);
  // Spread questions evenly across chapters, then shuffle.
  const questions = useMemo(() => {
    if (!size) return [];
    const pool = modules.map((m) => shuffle(m.quiz).map((q) => ({ ...q, tag: `Ch ${m.chapter}: ${m.title}`, mid: m.id })));
    const picked = [];
    for (let r = 0; picked.length < size && r < 20; r++) pool.forEach((p) => p[r] && picked.length < size && picked.push(p[r]));
    return shuffle(picked);
  }, [size, modules]);
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

export default function ExamPrep({ modules, progress, onOpen, onMockFinish }) {
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
                    <Likely key={it.id} q={{ ...it, flag: `${it.marks} marks${it.flagged ? ', not in your slides/notes' : ''}` }} mod={byId[it.module]} onOpen={onOpen} />
                  ))}
                </section>
              ))}
            </div>
          ))}
        {tab === 'likely' && (
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
            {likely.map((q) => (
              <Likely key={q.q} q={q} mod={byId[q.module]} onOpen={onOpen} />
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
