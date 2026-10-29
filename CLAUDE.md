# CSE 2201 Numerical Methods — study portal

A self-contained React study site for one student's final exam, used mostly on an iPad.
Live at https://ahnaf181419.github.io/Numerical-Method-Study-Guide/ (GitHub Pages, deployed on every push to `main`).

**Read `docs/EXAM-GUIDELINES.md` first** — it holds the syllabus, the exam's question
pattern, the teacher's six rules, the source map and the content rules. Everything below
assumes you have.

## Commands

- `npm run dev` — dev server (also on the LAN, `--host`)
- `npm test` — node:test suites in `src/lib/*.test.js` (solvers + content integrity). Must pass before every commit.
- `npm run build` — production build. CI sets `GITHUB_ACTIONS`, which switches Vite `base` to `/Numerical-Method-Study-Guide/`.

## Content rules (most important)

1. **Content comes only from the student's material**: the lecture slides, Raiyan's and Medha's
   class notes, the books (Shanker Rao, Balagurusamy, Chapra) and the past papers. The slides'
   text and the class-note transcripts are in `docs/sources/`; the textbook extracts are in
   `docs/books/` (kept locally, never committed); the past papers are typed in
   `src/data/pastPapers.js`. Check every fact
   and formula against these before adding it. Never invent topics, formulas or numbers.
2. If a past paper asks something the material does not cover, it may be taught with the standard
   textbook method, but it must be **flagged**: a `note` block, and `flagged: true` on the module
   or past-paper item.
3. Where sources disagree, follow the slides and record the difference in a `note` block.
4. Every worked numeric answer should be reproducible by a solver in `src/lib/solvers.js` with a
   test asserting the answer printed in the source.

## The answer format

Worked answers are **exam scripts**, not prose: numbered steps in the slides' own notation,
every row operation written **with the row it produces**, a mark weight per step, a boxed final
answer, a `Trap` line, and a full explanation panel. See §5 of the guidelines.

The teacher's six rules (pivot at every pivot row; Gauss-Jordan ends in RREF; no pivoting
without a zero pivot; pivot as soon as you hit one; check diagonal dominance before iterating;
show the resulting row) are enforced in `src/lib/solvers.js` and listed in the Exam-prep Traps
tab.

## Layout

- `src/data/*.js` — one module per topic; `syllabusData.js` lists them in study order.
  Module shape: `{ id, chapter, title, wave, sources, sections: [{ heading, blocks }], formulas, examples,
  flashcards, quiz, solvers }`. Block types: `p` (default), `list`, `math`, `table`, `note` (red),
  `exam` (gold). Text uses `$inline math$` and `**bold**`.
- `src/data/checks.js` — one "check yourself" question per lesson, keyed by module id + exact
  section heading. Every section needs one (a test enforces it).
- `src/data/examPrep.js` (likely questions, traps), `src/data/pastPapers.js` (past finals with
  model answers), `src/data/fullAnswers.js` (a full exam-script answer for every past-paper item:
  either the title of the lesson example that works it for the same marks, or a script; a test
  checks the marks add up and the model answer's numbers appear).
- `src/lib/solvers.js` — pure calculators returning `{ result, steps }` (steps are LaTeX). UI
  configs in `components/Solvers.jsx`.
- `src/lib/data.test.js` — every LaTeX string compiles with KaTeX, quiz answer indices are valid,
  checks exist. Add new ids to its `known` list.

## Design

- Dark only. Tokens in `src/index.css` `@theme`: `ink`, `panel`, `raise`, `line`, `ash` (secondary text),
  `text` (warm white), `gold` (active/progress/correct), `red` (exam-critical/errors). Fonts: Newsreader
  (`display`, `prose-read`) and Manrope, bundled via @fontsource — no external font or CDN requests.
- iPad first: touch targets ≥ 44px (`min-h-11`+), no hover-only UI, `press` class for tap feedback,
  safe-area padding, no horizontal page scroll down to 390px wide.
- Motion: CSS only, using the `--ease-*` tokens and classes in `index.css` (`enter`, `stagger`, `pop`, `shake`…);
  every animation has a `prefers-reduced-motion` fallback. Don't add an animation library.

## Git

- Commit as the student: `user.name` Ahnaf181419, `user.email` muhammad.ahnaf.sarker@gmail.com.
- **Never commit** the source PDFs or scans (`ClassNotes/`, `Question Bank/`, `slides/`), the
  textbook extracts (`docs/books/`), `node_modules/` or `dist/`. Check `git status` before every commit.
- Never force-push or rewrite history without the student's explicit go-ahead.
