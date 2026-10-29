import { mastery } from '../lib/useProgress.js';

export const MODES = [
  { id: 'learn', label: 'Learn' },
  { id: 'examples', label: 'Examples' },
  { id: 'cards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'solve', label: 'Solve' },
];

const item = (active) => `press flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left ${active ? 'bg-raise text-text' : 'text-ash active:bg-raise'}`;

export function SideNav({ modules, view, currentId, progress, onHome, onPick, onExam, onSearch }) {
  return (
    <nav aria-label="Course" className="grid gap-1">
      <button onClick={onSearch} className="press mb-3 flex min-h-12 items-center gap-3 rounded-xl border border-line bg-ink px-3 text-left text-ash">
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Search lessons
      </button>
      <button onClick={onHome} aria-current={view === 'home' ? 'page' : undefined} className={item(view === 'home')}>
        <span className="w-10 text-center font-serif text-lg text-gold">⌂</span> Overview
      </button>
      <p className="mb-1 mt-4 px-3 text-sm text-ash/80">Chapters</p>
      {modules.map((m) => {
        const active = view === 'module' && m.id === currentId;
        const v = mastery(m, progress);
        return (
          <button key={m.id} onClick={() => onPick(m.id)} aria-current={active ? 'page' : undefined} className={item(active)}>
            <span className={`w-10 shrink-0 text-center font-serif text-lg tabular-nums ${active ? 'text-gold' : 'text-ash'}`}>{m.chapter}</span>
            <span className="min-w-0 flex-1 py-2">
              <span className={`block leading-tight ${active ? 'text-text' : 'text-text/85'}`}>
                {m.title}
                {m.flagged && <span className="ml-1.5 align-middle text-xs text-red">extra</span>}
              </span>
              <span className="mt-1.5 block h-0.5 overflow-hidden rounded-full bg-line">
                <span className="bar-fill block h-full w-full bg-gold" style={{ transform: `scaleX(${v})` }} />
              </span>
            </span>
          </button>
        );
      })}
      <button onClick={onExam} aria-current={view === 'exam' ? 'page' : undefined} className={`${item(view === 'exam')} mt-4 border border-red/30`}>
        <span className="w-10 text-center text-red">★</span>
        <span className={view === 'exam' ? 'text-red' : 'text-text/85'}>Exam prep</span>
      </button>
    </nav>
  );
}

export function ModeTabs({ mode, onMode, className = '' }) {
  return (
    <div role="tablist" aria-label="Study mode" className={className}>
      {MODES.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={mode === m.id}
          onClick={() => onMode(m.id)}
          className={`relative min-h-13 flex-1 px-1 text-[0.95rem] transition-colors duration-200 ${mode === m.id ? 'font-semibold text-gold' : 'text-ash active:text-text'}`}
        >
          {m.label}
          <span className={`tab-ind absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-gold ${mode === m.id ? 'opacity-100' : 'scale-x-50 opacity-0'}`} />
        </button>
      ))}
    </div>
  );
}
