import { useEffect, useState } from 'react';
import { mastery } from '../lib/useProgress.js';
import { likely } from '../data/examPrep.js';
import papers, { examWeight } from '../data/pastPapers.js';
import Wave from './Wave.jsx';

function Ring({ value, size = 132 }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(id);
  }, [value]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${Math.round(value * 100)}% mastered`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth="7" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        style={{ strokeDashoffset: c * (1 - shown) }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="ring-fill"
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="var(--color-text)" fontSize={size / 4.4} fontFamily="var(--font-serif)">
        {Math.round(value * 100)}%
      </text>
    </svg>
  );
}

export default function Dashboard({ modules, progress, onOpen, onExam, onContinue }) {
  const total = modules.reduce((a, m) => a + mastery(m, progress), 0) / modules.length;
  const last = modules.find((m) => m.id === progress.moduleId);
  const lessons = modules.reduce((a, m) => a + m.sections.length, 0);
  const learned = modules.reduce((a, m) => a + (progress.learned?.[m.id]?.length ?? 0), 0);
  const weight = examWeight();

  return (
    <div className="stagger mx-auto max-w-5xl px-5 pb-20 pt-10 sm:px-8">
      <header style={{ '--i': 0 }} className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="display text-lg text-gold">CSE 2201</p>
          <h1 className="display mt-1 text-5xl leading-[1.02] sm:text-7xl">Numerical Methods</h1>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ash">
            Every topic the exam asks for, taught one step at a time from your slides, notes and past papers — with worked examples written exactly the way the examiner wants them, calculators, flashcards, quizzes and an exam prep hub.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onContinue} className="press min-h-12 rounded-xl bg-gold px-6 font-semibold text-ink">
              {last ? `Continue: Ch ${last.chapter} ${last.title}` : 'Start with Chapter 1'}
            </button>
            <button onClick={onExam} className="press min-h-12 rounded-xl border border-red/50 px-6 font-semibold text-red">
              Exam prep
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5 sm:flex-col sm:gap-2">
          <Ring value={total} />
          <p className="text-sm text-ash">
            {learned} of {lessons} lessons
            <br className="hidden sm:block" /> understood
          </p>
        </div>
      </header>

      <div style={{ '--i': 1 }} className="my-10">
        <Wave type="sine" id="home" />
      </div>

      <h2 style={{ '--i': 2 }} className="display mb-4 text-2xl">
        Chapters, in study order
      </h2>
      <p style={{ '--i': 2 }} className="-mt-2 mb-5 max-w-2xl text-ash">
        Each card shows how often the {papers.length} past finals asked that chapter and for how many marks — short on time, start with the ones asked most.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, k) => {
          const v = mastery(m, progress);
          const best = progress.quizBest?.[m.id];
          return (
            <button key={m.id} style={{ '--i': k + 3 }} onClick={() => onOpen(m.id)} className="press lift group flex flex-col rounded-2xl border border-line bg-panel p-5 text-left">
              <span className="flex items-baseline justify-between">
                <span className="display text-3xl text-gold">{m.chapter}</span>
                <span className="text-sm tabular-nums text-ash">{Math.round(v * 100)}%</span>
              </span>
              <span className="mt-2 text-lg font-semibold leading-snug text-text">{m.title}</span>
              {m.offSyllabus && <span className="mt-1 text-sm font-medium text-red">Not on the printed syllabus, but asked in every past paper</span>}
              <span className="mt-1 text-sm text-ash">
                {m.sections.length} lessons, {m.examples.length ? `${m.examples.length} example${m.examples.length > 1 ? 's' : ''}` : 'theory'}
                {best != null && `, quiz ${best}/${m.quiz.length}`}
              </span>
              <span className="mt-1 text-sm font-medium text-text/80">
                {weight[m.id] ? `Asked in ${weight[m.id].papers}/${papers.length} papers · ${weight[m.id].marks} marks` : 'On the syllabus, not asked in these papers yet'}
              </span>
              <span className="mt-4 h-1 overflow-hidden rounded-full bg-line">
                <span className="bar-fill block h-full w-full bg-gold" style={{ transform: `scaleX(${v})` }} />
              </span>
            </button>
          );
        })}
      </div>

      <button style={{ '--i': modules.length + 3 }} onClick={onExam} className="press lift mt-8 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-red/40 bg-red/[0.06] p-6 text-left">
        <span>
          <span className="display block text-2xl text-text">Exam prep</span>
          <span className="mt-1 block text-ash">
            The Fall 2024, Spring 2024, Fall 2023 and Spring 2023 finals with model answers, {likely.length} likely questions, a mock exam across every chapter, and the traps that cost marks.
          </span>
        </span>
        <span className="rounded-xl bg-red px-5 py-3 font-semibold text-ink">Open</span>
      </button>
    </div>
  );
}
