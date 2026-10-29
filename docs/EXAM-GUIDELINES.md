# CSE 2201 — Numerical Methods: exam guidelines

> The single source of truth for this study site. Read it before adding any content.
> Every rule here came from the syllabus, from Dr. Md Shafiul Alam (Shuvo), from the
> past papers, or from the class slides/notes. Do not contradict it.

## 1. The course

| | |
|---|---|
| Course | CSE 2201 — Numerical Methods |
| University | AUST (Ahsanullah University of Science and Technology), Department of CSE |
| Programme | BSc in Computer Science and Engineering |
| Semester | 2nd |
| Teachers | Dr. Md Shafiul Alam (Shuvo) · Ms. Tasnuva Binte Rahman |

## 2. Final syllabus (as given)

- Elimination methods (Gauss elimination, Gauss-Jordan)
- Iterative methods (Jacobi, Gauss-Seidel)
- LU method (LU decomposition)
- PCA (Principal Component Analysis)
- Regression (statistical and gradient descent)
- Interpolation
- Numerical Differentiation
- Numerical Integration

### Topics the past papers add (in scope — every paper asks for them)

These are **not** on the printed list but appear in the papers; they are taught and must
be covered:

- **Errors & approximations** — chopping vs rounding, absolute/relative error, significant
  digits, accuracy vs precision, condition number, deflation, convergence vs divergence.
- **Root finding** — Bisection, Newton-Raphson, Secant, Horner's rule / synthetic division.
- **Finite-difference operators** — $\Delta, \nabla, \delta, \mu, E$ and the identities
  ($\Delta - \nabla \equiv \delta^2$, $\mu^2 \equiv 1 + \tfrac14\delta^2$, $\mu \equiv \tfrac12(E^{1/2}+E^{-1/2})$,
  $2\mu\delta \equiv \Delta+\nabla$, $\Delta \equiv \nabla E \equiv E\nabla \equiv \delta E^{1/2}$).
  Note: the identity is **$2\mu\delta = \Delta + \nabla$**, *not* $\mu = \tfrac12(\Delta+\nabla)$ — check it
  against $f = x^2$ before you write it down.
- **Matrix inversion method** and the four scenarios for the existence of a solution.

### Explicitly out of scope

- **Regularization is NOT in the syllabus.** Regression is the **statistical/least-squares
  method from Balagurusamy**, and the regression derivation covers **linear regression only**.
  No ridge/lasso, no feature scaling for regularisation, no penalty terms.

## 3. Question pattern (Dr. Md Shafiul Alam — Shuvo)

Approx. **33–35 marks**

| Part | Owner | Marks | Content |
|---|---|---|---|
| Theory | Shuvo | **9–12** | Short questions, derivations, proofs |
| Math | Shuvo | **24–25** | May be 4–5 maths, each worth 5 or 6 marks |
| Math | Ms. Tasnuva | **15–17** | Mostly maths, may be 2 or 3 maths |

Confirmed by the **Fall 2024** paper (50 marks, 2 h 30 min):

```
Part A
  Question 1: Answer any 3 of 5        [3 x 3 = 9]   theory / derivations
  Question 2: Answer any 4 of 6        [6 x 4 = 24]  full maths
Part B
  Question 1: Answer all               [6 + 6 + 5 = 17]  mostly maths
```

So: **be ready for 4–5 full 6-mark maths questions plus 2–3 more, and 3 short theory questions.**

## 4. The six rules from Shuvo (apply these literally)

### 4.1 Pivot at EVERY pivot row, not just the first
When doing Gauss elimination with partial pivoting, the row exchange must be checked
**every time a new pivot row is chosen**, not only on the first column.

> Example: after removing $x$ from the $x$-column the equations are
> ```
> 0 + 2y + 3z = 2      (2')
> 0 - 5y +  z = 3      (3')
> ```
> Here you must interchange $3'$ with $2'$ **first** ($-5$ is the larger magnitude in the
> $y$-column). Some students only swapped on the first pivot.

### 4.2 Gauss-Jordan ends in RREF — no back substitution
The matrix must be in **reduced row echelon form**. For a square matrix the final result is
the **identity matrix**. You should **not** perform back substitution after Gauss-Jordan.
Better: normalise the pivot row first (for a square matrix the pivot is the diagonal element).

### 4.3 Do not pivot when there is no division by zero
If the question only says "use Gauss elimination / Gauss-Jordan" and no division by zero
comes up, **do not apply pivoting**. Adding unrequested pivoting wastes time and can look
wrong to the examiner.

### 4.4 But do pivot the moment you hit a division by zero
If the question does not mention pivoting and you hit a zero pivot, you **must** apply
partial pivoting. Partial pivoting is less complex than full pivoting — prefer it.

### 4.5 Check diagonal dominance before iterating
For Jacobi / Gauss-Seidel, **always check whether the system is diagonally dominant first**.
Diverging iterates are usually caused by skipping this check. If the system is not
diagonally dominant as written, **rearrange the equations** so that it is.

### 4.6 Show the detailed calculation
If you only write `R_2' -> R_2 - pivot * R_1` without writing the **resulting row**, marks
are deducted. Every row operation must be written with the row it produces.

## 5. How answers on this site are written

Every worked answer is an **exam script**, not prose:

1. **Step-by-step**, numbered, in the notation the slides and the teacher use
   (`R_2' = R_2 - 2R_1`, `R_i \to R_i - m R_j`).
2. Each row operation shows **both** the operation and the row it produces (rule 4.6).
3. Each step carries its **mark weight** (e.g. `2 marks`), so the total adds up to the
   question's marks.
4. The **final answer is boxed** with the units/rounding the examiner expects.
5. A **Trap** line: the mistake that costs marks in this exact question type.
6. A **full explanation** panel underneath: why the method works, and when to choose it.

## 6. Source material (the only permitted sources of content)

| Path | What it is | Status |
|---|---|---|
| `slides/Elimination Methods.pdf` | Gauss elimination slides (Raqeebir Rab) | text extracted |
| `slides/Iterative Solution of Linear Equations.pdf` | Jacobi / Gauss-Seidel slides | text extracted |
| `slides/LU Decomposition.pdf` | LU (Do-Little) slides (Tasnuva) | text extracted |
| `slides/(01) 14 Dimensionality Reduction (PCA) v2...pdf` | PCA slides | text extracted |
| `slides/(02)-PCA Tutorial Step by Step (Math).docx.pdf` | PCA worked tutorial + errors | text extracted |
| `slides/01 Equations - Gradient Descent.pdf`, `02 ... (Batch).pdf`, `03 ... (Single).pdf` | Gradient descent equations + worked epochs | text extracted |
| `slides/Interpolation/01-Interpolation Final.doc` | The teacher's own interpolation notes (Shafiul Alam) | text extracted |
| `slides/Interpolation/(TextBook) Shanker Rao (v2).md` / `.pdf` | Shanker Rao, *Numerical Analysis* — the reference for errors, finite differences, interpolation, differentiation, integration, eigen, regression | text extracted to `docs/books/` (both folders hold the same book) |
| `slides/Balagurusamy Ch 04/07-08/10/11*.pdf` | Balagurusamy — errors, direct solution of linear equations, **regression**, numerical differentiation | scanned |
| `slides/Interpolation/(Error in Difference Table) Interpolation.pdf` | Chapra & Canale Ch. 2, Finite Differences | scanned |
| `slides/System of Linear Equations (Examples) .pdf` | Teacher's handwritten board notes on Gauss elimination | scanned |
| `slides/Interpolation/02-supplement-NM Interpolation 13 Proofs Scanned0001.jpg` | 13 interpolation proofs | scanned image |
| `ClassNotes/Numerical Cred-1 & Cred-2 for final-Raiyan.pdf` | Raiyan's class notes | scanned (handwritten) |
| `ClassNotes/Numerical_final_Medha.pdf` | Medha's class notes | scanned (handwritten) |
| `Question Bank/*.pdf` | Past papers: Fall 2023, Spring 2023, Spring 2024, Fall 2024 | scanned |

Extracted text lives in `docs/sources/` (the slides and the class notes — committed) and in
`docs/books/` (the textbook extracts — kept locally, **not** committed, see `docs/books/README.md`).

## 7. Past papers on record

| Paper | Marks | Pattern | Topics |
|---|---|---|---|
| **Fall 2024** (04/11/2025) | 50 | Part A 9 + 24, Part B 17 | errors, Richardson, Simpson's 1/3 derivation, condition number/deflation/accuracy, central-difference truncation error, synthetic division, Gauss elimination with partial pivoting, tabular differentiation, Do-Little LU, aircraft velocity by numerical integration, Romberg, $\Delta-\nabla=\delta^2$, Lagrange (unequal), Newton forward, Newton divided difference |
| **Spring 2024** | 70 | Q1 20 (5x4), Q2 36 (6x6), Q3 14 (7+7) | significant digits/accuracy/precision, Secant, deflation + synthetic division + Newton's method algorithm, four scenarios of a linear system's solutions, Jacobi convergence, Lagrange (unequal), Simpson's 1/3, interpolation vs regression, bisection, Horner + quotient polynomial, matrix inversion, missing values in an interpolation table, power-law fit, Newton forward polynomial, tabular differentiation, Weddle's rule, **polynomial regression by gradient descent (degree 4), 2nd-degree gradient descent with batch update** |
| **Fall 2023** | 70 | Q1 16 (4x4), Q2 36 (6x6), Q3 18 (3x6) | fixed-point iteration convergence, Newton divided difference vs Lagrange, Horner's rule, relative error, 3-point forward difference, $\Delta-\nabla=\delta^2$ and $\mu^2 = 1+\tfrac14\delta^2$, bisection, Jacobi, Newton-Raphson, composite trapezoid + Simpson's 1/3, 3-point central difference for $f''$, LU via Gauss elimination, Newton Gregory forward, Horner, Richardson vs 3-point forward, spherical tank, least-squares line fit, Gauss-Seidel vs Jacobi convergence, sufficient conditions for Gauss-Seidel |
| **Spring 2023** | 70 | Q1 16 (4x4), Q2 36 (6x6), Q3 18 (3x6) | fixed-point limitations, synthetic division for multiple roots, condition number, relative error, 3-point forward difference, $\Delta-\nabla=\delta^2$, $\Delta=\nabla E = E\nabla = \delta E^{1/2}$, bisection, Gauss-Seidel, Secant, Romberg, 2nd-order Lagrange, Gauss elimination (tourist problem), tabular differentiation, Euler's method, Richardson, composite trapezoid, power-law fit, Heun's method, Gauss-Seidel sufficient conditions |

## 8. Content rules

- Every chapter opens with four `Start here` sections (problem -> idea -> symbols -> walk-through); keep them beginner-level, notation-accurate, and lock walk-through numbers to the engine in `src/lib/audit.test.js`.

1. **Content comes only from the student's material** — the slides, the notes, the books above
   and the past papers. Check every formula and number against `docs/sources/`.
2. If a past paper asks something the material does not cover, it may be taught with the
   standard textbook method, but it **must be flagged** with a `note` block and
   `flagged: true` on the module or past-paper item.
3. Where sources disagree, follow the slides and record the difference in a `note` block.
4. Every worked numeric answer must be reproducible by a solver in `src/lib/solvers.js`,
   with a test asserting the printed answer.

## 9. Repo layout

```
src/data/*.js      one module per topic; syllabusData.js lists them in study order
src/lib/solvers.js pure calculators returning { result, steps } (steps are LaTeX)
src/lib/*.test.js  node:test suites — solvers + content integrity. Must pass before every commit.
docs/sources/      extracted source text (the evidence behind every module)
```

Module shape:
`{ id, chapter, title, wave, sources, sections: [{ heading, blocks }], formulas, examples, flashcards, quiz, solvers }`
Block types: `p` (default), `list`, `math`, `table`, `note` (red), `exam` (gold, "how to write this in the exam").
Text uses `$inline math$` and `**bold**`.

## 10. Build & deploy

- `npm run dev` — dev server (LAN exposed)
- `npm test` — node:test suites (solvers + content integrity). Must pass before every commit.
- `npm run build` — production build; CI sets `GITHUB_ACTIONS`, switching Vite `base` to `/Numerical-Method-Study-Guide/`.
- GitHub Pages: push to `main` → `.github/workflows/deploy.yml` deploys.
- **Never commit** `ClassNotes/`, `Question Bank/`, `slides/`, `docs/books/`, `node_modules/`, `dist/`.
