import { useEffect, useMemo, useRef, useState } from 'react';
import modules from './data/syllabusData.js';
import { useProgress } from './lib/useProgress.js';
import { ModeTabs, SideNav } from './components/Nav.jsx';
import Dashboard from './components/Dashboard.jsx';
import ExamPrep from './components/ExamPrep.jsx';
import Learn from './components/Learn.jsx';
import Examples from './components/Examples.jsx';
import Flashcards from './components/Flashcards.jsx';
import Quiz from './components/Quiz.jsx';
import Solvers from './components/Solvers.jsx';
import CheatSheet from './components/CheatSheet.jsx';
import Search from './components/Search.jsx';
import Wave from './components/Wave.jsx';

const toggleIn = (list = [], x) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]);

export default function App() {
  const [progress, update] = useProgress();
  const [cheatOpen, setCheatOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const drawer = useRef(null);

  const view = progress.view ?? 'home';
  const mod = useMemo(() => modules.find((m) => m.id === progress.moduleId) ?? modules[0], [progress.moduleId]);
  const mode = progress.mode === 'notes' ? 'learn' : (progress.mode ?? 'learn');
  const lesson = progress.lesson?.[mod.id] ?? 0;

  useEffect(() => {
    const d = drawer.current;
    if (navOpen && !d.open) d.showModal();
    if (!navOpen && d.open) d.close();
  }, [navOpen]);

  const go = (patch) => {
    update(patch);
    setNavOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0 });
  };
  const openModule = (id, lessonIdx) =>
    go((p) => ({ view: 'module', moduleId: id, ...(lessonIdx != null && { mode: 'learn', lesson: { ...p.lesson, [id]: lessonIdx } }) }));
  const pickMode = (m) => go({ mode: m });
  const setLesson = (i) => update((p) => ({ lesson: { ...p.lesson, [mod.id]: i } }));
  const toggleLearned = (i) => update((p) => ({ learned: { ...p.learned, [mod.id]: toggleIn(p.learned?.[mod.id], i) } }));
  const toggleKnown = (i) => update((p) => ({ known: { ...p.known, [mod.id]: toggleIn(p.known?.[mod.id], i) } }));
  const saveQuiz = (score) => update((p) => ({ quizBest: { ...p.quizBest, [mod.id]: Math.max(score, p.quizBest?.[mod.id] ?? 0) } }));
  const saveMock = (pct) => update((p) => ({ mockBest: Math.max(pct, p.mockBest ?? 0) }));

  const nav = (
    <SideNav
      modules={modules}
      view={view}
      currentId={mod.id}
      progress={progress}
      onHome={() => go({ view: 'home' })}
      onPick={(id) => openModule(id)}
      onExam={() => go({ view: 'exam' })}
      onSearch={() => (setNavOpen(false), setSearchOpen(true))}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[19.5rem_1fr]">
      <aside className="sticky top-0 hidden h-dvh overflow-y-auto border-r border-line px-3 py-7 lg:block">
        <button onClick={() => go({ view: 'home' })} className="mb-5 px-3 text-left">
          <span className="display block text-2xl">CSE 2201</span>
          <span className="block text-sm text-ash">Numerical Methods</span>
        </button>
        {nav}
      </aside>

      <dialog ref={drawer} onClose={() => setNavOpen(false)} onClick={(e) => e.target === drawer.current && setNavOpen(false)} aria-label="Course menu" className="drawer m-0 h-dvh max-h-none w-[min(22rem,88vw)] border-r border-line bg-ink p-0 text-text">
        <div className="flex items-center justify-between px-5 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <span className="display text-2xl">CSE 2201</span>
          <button onClick={() => setNavOpen(false)} className="press min-h-11 rounded-xl border border-line px-4 text-ash">
            Close
          </button>
        </div>
        <div className="px-2 pb-10">{nav}</div>
      </dialog>

      <div className={`min-w-0 ${view === 'module' ? 'pb-[calc(9.5rem+env(safe-area-inset-bottom))]' : 'pb-28'} lg:pb-24`}>
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-ink/90 px-4 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] backdrop-blur-md lg:hidden">
          <button onClick={() => setNavOpen(true)} className="press min-h-11 rounded-xl border border-line px-4 text-text">
            Menu
          </button>
          <span className="min-w-0 flex-1 truncate text-sm text-ash">{view === 'module' ? `Ch ${mod.chapter}: ${mod.title}` : view === 'exam' ? 'Exam prep' : 'Overview'}</span>
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="press grid size-11 place-items-center rounded-xl border border-line text-ash">
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {view === 'home' && <Dashboard modules={modules} progress={progress} onOpen={(id) => openModule(id)} onExam={() => go({ view: 'exam' })} onContinue={() => openModule(mod.id)} />}

        {view === 'exam' && <ExamPrep modules={modules} progress={progress} onOpen={(id) => openModule(id)} onMockFinish={saveMock} />}

        {view === 'module' && (
          <>
            <header key={mod.id} className="enter mx-auto max-w-3xl px-5 pt-9 sm:px-8">
              <p className="display text-lg text-gold">Chapter {mod.chapter}</p>
              <h1 className="display mt-1 text-[2.6rem] leading-[1.05] sm:text-6xl">{mod.title}</h1>
              <div className="mt-5">
                <Wave type={mod.wave} id={mod.id} />
              </div>
              <p className="mt-2 text-sm text-ash">From {mod.sources.join(', ')}</p>
            </header>

            <ModeTabs
              mode={mode}
              onMode={pickMode}
              className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-panel/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:sticky lg:top-0 lg:mx-auto lg:mt-6 lg:max-w-3xl lg:border-t-0 lg:border-b lg:bg-ink/90 lg:px-6 lg:pb-0"
            />

            <main key={`${mod.id}-${mode}`} className="enter mx-auto max-w-3xl px-5 pt-8 sm:px-8">
              {mode === 'learn' && (
                <Learn module={mod} index={lesson} learned={progress.learned?.[mod.id] ?? []} onIndex={setLesson} onLearned={toggleLearned} onDone={() => pickMode('cards')} />
              )}
              {mode === 'examples' && <Examples module={mod} />}
              {mode === 'cards' && <Flashcards module={mod} known={progress.known?.[mod.id] ?? []} onToggleKnown={toggleKnown} />}
              {mode === 'quiz' && <Quiz questions={mod.quiz} best={progress.quizBest?.[mod.id]} onFinish={saveQuiz} />}
              {mode === 'solve' && <Solvers module={mod} />}
            </main>
          </>
        )}
      </div>

      <button
        onClick={() => setCheatOpen(true)}
        aria-label="Open formula sheet"
        className={`press fixed right-4 z-30 flex min-h-14 items-center gap-2 rounded-full border border-gold/40 bg-raise/95 px-5 font-semibold text-gold shadow-[0_12px_32px_-8px_rgb(0_0_0/0.7)] backdrop-blur lg:bottom-6 lg:right-6 ${view === 'module' ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(1rem+env(safe-area-inset-bottom))]'}`}
      >
        <span className="font-serif text-xl leading-none">Σ</span> Formulas
      </button>

      <CheatSheet open={cheatOpen} onClose={() => setCheatOpen(false)} modules={modules} currentId={mod.id} />
      <Search open={searchOpen} onClose={() => setSearchOpen(false)} modules={modules} onGo={(id, i) => openModule(id, i)} />
    </div>
  );
}
