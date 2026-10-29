# CSE 2201 — Numerical Methods study portal

A self-contained study site for the Numerical Methods final: every topic the exam asks for,
taught from the class slides, the class notes, the books and four past papers — with worked
answers written exactly the way the examiner wants them.

Live at **https://ahnaf181419.github.io/neumerical/** (GitHub Pages, deployed on every push to `main`).

## What is in it

- **12 chapters** in study order: Errors & Approximations · Roots of Equations · Elimination
  Methods · Iterative Methods · LU Decomposition · Finite Differences · Interpolation · Numerical
  Differentiation · Numerical Integration · Regression · Gradient Descent Regression · PCA.
- **Exam script answers.** Every worked example is a numbered script in the slides' own notation,
  with the mark weight of each step, a boxed final answer, the trap that costs marks, and a full
  explanation underneath.
- **Four past papers** (Fall 2024, Spring 2024, Fall 2023, Spring 2023) typed with model answers.
- **Exam prep**: the questions that keep coming back, a mock exam, and a traps list built from the
  teacher's own six rules.
- **Interactive solvers**: Gauss elimination with correct partial pivoting, Gauss-Jordan, Jacobi,
  Gauss-Seidel, LU, the root finders, the interpolation formulae, differentiation, the integration
  rules, Romberg, least squares, gradient descent and the full PCA pipeline.
- **Progress tracking**: lessons marked understood, flashcards marked known, quiz scores and a
  mock-exam record, all kept on the device.

## The rules the site encodes

The teacher's six rules from the last class are built into the solvers and listed in the exam-prep
traps:

1. Check for a row exchange at **every** pivot row, not only the first.
2. Gauss-Jordan ends at the identity matrix — no back substitution.
3. Do not pivot when no pivot is zero.
4. But pivot the moment a division by zero appears (partial pivoting).
5. Check diagonal dominance before iterating.
6. Write the resulting row after every row operation.

## Running it

```bash
npm install
npm run dev     # dev server, also on the LAN
npm test        # solvers + content integrity — must pass before every commit
npm run build   # production build
```

## Layout

```
src/data/*.js      one module per chapter; syllabusData.js lists them in study order
src/lib/           solvers.js (the calculators), solverConfigs.js, the test suites
src/components/    the UI
docs/              EXAM-GUIDELINES.md (read this first) and the source transcripts
```

`docs/EXAM-GUIDELINES.md` holds the syllabus, the exam's mark pattern, the source map and the
content rules. The textbook extracts in `docs/books/` stay on the machine and are never published.

Built with React 19, Vite, Tailwind 4 and KaTeX. No trackers, no external requests, works offline
once loaded.
