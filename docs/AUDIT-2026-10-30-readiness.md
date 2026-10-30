# Readiness audit: can a student start from zero on this site and be ready for the final?

**Date:** 30 October 2026
**Commit audited:** `dcb3ef8` (after the morning audit's 15 fixes)
**Question asked:** If a student opens this site knowing nothing, can they understand and cover every topic the CSE 2201 final needs?
**Method:** the `verify` skill (tests and build); every chapter's section list, worked examples, quiz, flashcards and solvers dumped from the real data modules; the teacher's sheet (`docs/Shuvo-Sir-Topic.pdf`) re-read in full, which the morning audit did not do; the syllabus in `docs/EXAM-GUIDELINES.md` §2 checked line by line against the lesson text; past-paper marks added up per chapter; the home screen, nav, syllabus page and math text renderer read the way a first-time student meets them.

> **RESOLVED — same day.** Every finding below is fixed, each locked by a guard test in `src/lib/readiness.test.js` (test count 117 → 129):
> - **A.** Three new worked derivations in Ch 9: trapezoidal (4 marks), Simpson's 3/8 (4) and Weddle (5), following Shanker Rao §9.3, §9.5 and §9.6. The general-quadrature section now shows the integrals $\int_0^n u\,du$, $\frac{1}{2!}\int_0^n u(u-1)\,du$, … that its coefficients come from.
> - **B.** The PCA lesson and both examples now work the characteristic equation by hand ($\lambda^2 - 1.1998\lambda + 0.0510 = 0$; scaled data $\lambda^2 - 2\lambda + 0.1427 = 0$). The eigenvectors use the class-notes method (Raiyan p. 25): $x_1 = 1$, $x_2 = 1.0845$ and $-0.9221$, then normalise.
> - **F (found while fixing A).** The composite Simpson 3/8 formula was printed as $3(y_1 + \cdots + y_{n-1})$ in five places: the lesson, the check, the formula sheet, a flashcard and a quiz item. That is wrong for six or more subintervals: $y_3, y_6, \dots$ carry weight **2**. The solver and the worked examples were already right. All five now print the book's form. The Weddle lesson also gains the composite form with $2y_6, 2y_{12}, \dots$.
> - **G1.** A new `offSyllabus` field drives the chapter badge, so only Errors and Roots carry it, worded "Not on the printed syllabus, but asked in every past paper" ("past papers" in the nav). `flagged` stays on the data, as the content rules require.
> - **G2.** Each chapter card shows "Asked in n/4 papers · m marks" (or "On the syllabus, not asked in these papers yet"), from a new `examWeight()` in `pastPapers.js`.
> - **G3.** The Syllabus page opens with a Credit 1 (Ms. Tasnuva) block that links to the four chapters. Each of the 12 teacher videos also appears under its own lesson as "Teacher's video". Gradient-descent videos 1–3 are mapped to *The cost function*, *Batch mode* and *Single mode*, following the slide-deck order.
> - **D1, D2.** The 18 doubled brackets are gone, and "the form (8)" now reads "the form above".
> - **Also fixed during the visual check:** the Interpolation table on the Syllabus page had a header one column short, and at 390 px its video column was squeezed so narrow that the table grew about 1,600 px tall. It is now about 730 px.
>
> Visual check: dashboard, Syllabus, PCA examples and the Weddle lesson, rendered in headless Chrome at 820 px and 390 px. No console errors, no horizontal page overflow.

---

## 1. Verdict

**Yes. A student starting from zero can learn every topic on the final from this site, and it is strong preparation.** Every syllabus topic and every past-paper topic has a lesson, a beginner-level "Start here" lead-in, at least one worked exam script, and self-tests. All 69 past-paper questions have full model answers.

There are **two content gaps that cost marks** and **three guidance problems** that could send a beginner the wrong way:

| # | Problem | Why it matters to a from-zero student |
|---|---|---|
| A | Trapezoidal, Simpson 3/8 and Weddle **derivations are one line each** ("put n = 3 …") | The syllabus says *all derivations + math* for integration. Shanker Rao asks for all four as a question. Only Simpson 1/3 is worked. |
| B | PCA **never shows how to get the eigenvalues and eigenvectors by hand** | The lesson and both examples jump from Σ straight to λ = 1.1556, 0.0442. A beginner cannot reproduce Step 3 or Step 4 in the exam. |
| C | **Five chapters wear a red "extra" badge**, three of them on the printed syllabus | Gradient Descent, Regression and Differentiation look optional. They are not. |
| D | **No exam weighting or study plan** | 12 chapters and 141 lessons, all looking equally important. Roots carries 74 marks across the papers and PCA has never been asked, but nothing on screen says so. |
| E | **The Syllabus page shows only Shuvo Sir's half** | Credit 1 (elimination, iterative, LU, PCA: Ms. Tasnuva's 15–17 marks) is missing from the one page that says what's in the exam. |

There are also two small text defects: doubled brackets in PCA and a dangling "(8)".

Health: **117/117 tests pass, and the production build is clean.**

---

## 2. Health (verify skill)

| Check | Command | Result |
|---|---|---|
| Unit + content tests | `npm test` | **pass**: 117 tests, 0 fail |
| Production build | `npm run build` | **pass**: built in 0.4 s; one warning that the JS chunk is 1.26 MB (371 kB gzip) |
| CI parity | `.github/workflows/deploy.yml` runs `npm ci`, `npm test`, `npm run build` | same commands, both green |

No lint or typecheck is configured in the project, so neither was run. Verdict: **verified**.

---

## 3. Coverage: syllabus vs. site, line by line

### Credit 1 (Ms. Tasnuva, about 15–17 marks)

| Syllabus line | Chapter | Taught | Worked examples | Learnable from zero? |
|---|---|---|---|---|
| Gauss elimination, Gauss-Jordan | 3 | yes, plus partial pivoting, matrix inversion and the four scenarios | 8 | **Yes.** All six of the teacher's rules are in the scripts. |
| Jacobi, Gauss-Seidel | 4 | yes, plus diagonal dominance, the stopping rule and the diverge-then-rearrange loop | 3 | **Yes.** Only 3 examples for a topic worth 30 marks across two papers, but the 5 past-paper scripts add practice. |
| LU decomposition | 5 | Do-Little, LU by Gauss, solving with the factors; Crout in brief | 4 | **Yes** |
| PCA | 12 | six steps, scaling, covariance, eigen, choosing k, reconstruction | 2 | **Partly. See gap B.** |

### Credit 2 (Shuvo Sir)

| Syllabus line | Depth required | Site | Learnable from zero? |
|---|---|---|---|
| Gradient descent, batch and single | slides | Ch 11: batch, single, simultaneous update, learning rate, degree 2 and 4; 4 examples | **Yes** |
| Linear regression | derivation + math | Ch 10: least-squares criterion, normal equations derived, worked line fit | **Yes** |
| Power, polynomial, multiple regression | math | Ch 10: one worked example each | **Yes** |
| Newton forward / backward | derivation + math | Ch 7: both derived; backward is short but complete | **Yes** |
| Gauss forward / backward, Stirling | derivation + math | Ch 7: full derivations with the coefficient algebra; Bessel too | **Yes** |
| Lagrange, Newton divided difference | derivation + math | Ch 7: both derived; divided difference is short | **Yes** (one dangling reference, D2) |
| Inverse Lagrange, error, missing values, difference table | math | Ch 7 and Ch 6, each with a worked example | **Yes** |
| Difference-operator formulae | derivation | Ch 6: all five identities plus the teacher's proofs 10–13 | **Yes** |
| Numerical differentiation f′, f″ | math only | Ch 8: forward, backward and central differences, 2- and 3-point; 4 table examples | **Yes** |
| General quadrature, trapezoidal, Simpson 1/3 | derivation + math | Ch 9: general formula stated; Simpson 1/3 fully derived (worked example) | **Yes** |
| Simpson 3/8, Weddle, trapezoidal derivations | derivation + math | Ch 9: "putting n = 3 gives…" only | **No. See gap A.** |
| Romberg | derivation + math | Ch 9: Richardson step derived, triangle, 3 examples, both forms noted | **Yes** |

### Past-paper topics outside the printed list

Errors, root finding, Richardson extrapolation, fixed-point iteration, Euler and Heun: all taught. The three questions the slides and notes don't cover are flagged in red with the textbook method (Spring 2024 Q2(a), Spring 2023 Q2(h) and Q3(d)).

### The teacher's sheet (re-read today)

- Every topic on the sheet is taught.
- The sheet's integration tip, *"Parle actual value and error ber kore practice kora better"* (if you can, also work out the actual value and the error), is followed: **all 8 numeric integration examples** give the exact value, and 7 of them also give the error.
- The book drill examples (4.4–4.8, 6.1–6.9, 9.1–9.10, …) are replaced by past-paper examples of the same method. `EXAM-GUIDELINES.md` §8.1 maps each one. The student still needs the book to drill those exact numbers.
- **The teacher's videos appear only on the Syllabus page** (8 links). They are not linked from the chapter that teaches each topic. See G3.

### Where the marks are vs. where the site puts its examples

Marks across the four past papers (69 questions, 362 marks typed):

| Chapter | Past-paper items | Marks | Papers that ask it | Site examples |
|---|---|---|---|---|
| 2 Roots | 14 | **74** | 4/4 | 9 |
| 8 Differentiation | 12 | **62** | 4/4 | 9 |
| 7 Interpolation | 9 | **49** | 4/4 | 12 |
| 9 Integration | 8 | **43** | 4/4 | 9 |
| 4 Iterative | 5 | 30 | 2/4 | 3 |
| 1 Errors | 7 | 26 | 4/4 | 7 |
| 3 Elimination | 4 | 22 | 3/4 | 8 |
| 10 Regression | 4 | 22 | 3/4 | 6 |
| 11 Gradient | 2 | 14 | 1/4 | 4 |
| 5 LU | 2 | 12 | 2/4 | 4 |
| 6 Differences | 2 | 8 | 2/4 | 7 |
| 12 PCA | 0 | 0 | 0/4 | 2 |

Example depth roughly follows exam weight. Two exceptions: **Iterative** has the fewest examples for its weight, and **PCA** is on the syllabus but has never been asked, so it could appear new this year. It is also the thinnest chapter (gap B).

---

## 4. Findings

### Gaps that cost marks

**A. Trapezoidal, Simpson 3/8 and Weddle derivations are not worked** (`src/data/integration.js`, sections *The trapezoidal rule*, *Simpson's three-eighths rule*, *Weddle's rule*)
- **What the site has:** the general quadrature formula, then "Putting $n = 3$ … gives Simpson's three-eighths rule" and the result. The steps in between aren't shown: substituting n, writing the coefficients, adding the panels to get the composite form. Only Simpson 1/3 is worked, as an example with a 4-mark script.
- **Why it matters:** the syllabus (§2) says integration is *"all derivations + math"*. Shanker Rao (`docs/books/shanker-ch09-numerical-integration.md:178`) asks the four derivations together as one question: *"(a) Trapezoidal rule (b) Simpson's one-third rule (c) Simpson's three-eighths rule and (d) Weddle's rule from the general quadrature formula"*. A student asked to derive the 3/8 rule has no script to copy.
- **Fix:** three worked examples on the same pattern as *Deriving Simpson's one-third rule from the general quadrature formula*. Each needs: put n, neglect the higher differences, rewrite the differences in terms of y, sum over the panels, box the result. Add a check question each. The general-formula section could also show the four integrals $\int_0^n u\,du$, $\int_0^n u(u-1)\,du$, … so a beginner can see where its coefficients come from.

**B. PCA skips the hand computation of eigenvalues and eigenvectors** (`src/data/pca.js`, section *Eigenvalues and eigenvectors*; both examples, Steps 3–4)
- **What the site has:** "Solve $\det(\Sigma - \lambda I) = 0$", then straight to $\lambda_1 = 1.1556$, $\lambda_2 = 0.0442$ and $v_1 = (0.678, 0.735)$. The lesson itself says "the two-by-two case is the one the exam asks for, and the characteristic equation settles it by hand", but it never shows that working.
- **Why it matters:** a student who has never met eigenvalues (nothing earlier on the site teaches them) cannot do Steps 3–4. Those are the core of a full PCA question, and the example is worth 8 marks.
- **Fix:** in the section and in Step 3, write out the quadratic $\lambda^2 - (\operatorname{tr}\Sigma)\lambda + \det\Sigma = 0$ with the numbers: $\lambda^2 - 1.1998\lambda + 0.0511 = 0$. Then solve it with the quadratic formula. In Step 4, solve $(\Sigma - \lambda_1 I)v = 0$ for the ratio $v_2/v_1$ and normalise. Check these figures against the PCA tutorial source before publishing.

### Guidance problems (the student could study the wrong things)

**G1. The red "extra" badge sits on core syllabus chapters** (`src/components/Nav.jsx:39`, `src/components/Dashboard.jsx:88`; `flagged: true` in `errors.js`, `roots.js`, `differentiation.js`, `regression.js`, `gradient.js`)
- **Problem:** the flag works per chapter. A chapter gets it if *one item* inside it is not in the slides: Heun in Differentiation, the degree-4 extension in Gradient Descent. So Gradient Descent (three slide decks of its own), Regression (Balagurusamy Ch 10 on the printed syllabus) and Differentiation (Balagurusamy Ch 11 on the printed syllabus) carry the label "Covers a paper topic that is not in your slides/notes" and "extra" in the side nav.
- **Risk:** a beginner short on time reads "extra" as "optional" and skips three syllabus chapters.
- **Fix:** keep the red flag on the *item* (section or example), where it already exists. Give the chapter badge only to chapters that are off the printed syllabus (Errors, Roots), and word it "Not on the printed syllabus, but asked in every past paper".

**G2. No exam weighting or study plan** (`src/components/Dashboard.jsx`)
- **Problem:** the home page lists 12 chapters "in study order" with lesson counts. It never says where the marks are. The data to do it is already there (`pastPapers.js` carries `module` and `marks` on every item; the table in §3 took one script).
- **Risk:** a from-zero student spends as long on Finite Differences (8 marks) as on Roots (74 marks), and starts with Chapter 1 *Errors*, which is not on the printed syllabus.
- **Fix:** add one line to each chapter card: "Asked in 4/4 papers · 74 marks". Optionally add a short "If you have 3 days" order on the home page. Interpolation, integration, differentiation, elimination, iterative and LU come first, because those are the printed-syllabus topics with the most marks.

**G3. The Syllabus page shows only Shuvo Sir's half, and the videos are stranded there** (`src/data/syllabusTopics.js`, `src/components/Syllabus.jsx`)
- **Problem:** the page faithfully reproduces Shuvo Sir's sheet. Credit 1 (elimination, iterative, LU, PCA) is nowhere on it, although it is §2 of the guidelines and worth 15–17 marks. The teacher's 8 video links appear only here, so a student inside Ch 7 *Newton forward* never sees the teacher's Newton forward video.
- **Fix:** add a "Credit 1 (Ms. Tasnuva)" block listing the four topics with links to their chapters. Show each video link in the lesson section it belongs to.

### Small defects

**D1. Doubled brackets in the PCA dataset** (`src/data/pca.js:377` question, `:381` Step 1)
- The long point lists are split into separate math spans with `, $$(` so they can wrap on narrow screens. In PCA the split doubled the bracket, `$$((`, so 9 of the 10 points render as **((0.5, 0.7)**, **((-1.31, -1.21)** and so on. Confirmed by running the renderer's own splitter (`NotesView.jsx:9`). The same pattern in `gradient.js` and `pastPapers.js` is correct.
- **Fix:** replace `$$((` with `$$(` (18 occurrences, all in `pca.js`). A one-line test could reject `((` inside math spans.

**D2. Dangling equation number in the Lagrange exam tip** (`src/data/interpolation.js:407`)
- "assume the form (8)". The site has no numbered equations; "(8)" is the book's equation number. Replace it with "assume the form above".

### Known limits (not fixable from the material)

- **Teacher's proofs 1–8 are not in the sources.** The scan `02-supplement-NM Interpolation 13 Proofs` holds only proofs 9–13 (`docs/sources/finite-differences-proofs-examples.md:11`). The site teaches 9–13 and Chapra's identity set. Get a photo of proofs 1–8 from a classmate; until then, any of them that differs from the identities on the site is uncovered.
- **Book drill numbers:** every method is taught, but with past-paper numbers (see §3). Practise the sheet's exact book examples from Shanker Rao and Balagurusamy.

---

## 5. What already works well for a beginner

- **Every chapter opens with four "Start here" lessons** (the problem, the idea, reading the symbols, a first walk-through). A test enforces the pattern.
- **Prerequisites are bridged:** a one-page Taylor expansion in Ch 1 is pointed to from Roots and Differentiation; Ch 6 builds the difference table before Ch 7 uses it; Ch 9 starts from the Ch 7 Newton formula.
- **Answers are written as exam scripts:** numbered steps with marks per step, the resulting row after every row operation, a boxed answer, a trap and an explanation, across 80 worked examples.
- **Self-testing at every level:** one check question per lesson, 9–12 quiz items and 12–19 flashcards per chapter, a mixed mock exam with a written-script mode, and 69 past-paper questions with full answers whose step marks add up.
- **Calculators** in all 12 chapters, defaulting to the lesson's own example, so a student can check their own working.
- **Honesty about sources:** off-material questions are flagged in red rather than passed off as taught, and source disagreements are noted (PCA divisor n vs. m−1, two forms of Romberg, $2\mu\delta = \Delta + \nabla$).

---

## 6. Suggested order of work

1. **D1** (PCA brackets) and **D2** (the "(8)"): five minutes, visible on screen.
2. **G1** (the "extra" badge on syllabus chapters): a small change that stops a beginner skipping three chapters.
3. **B** (PCA eigen by hand): one section paragraph and two example steps; the most likely "new" question.
4. **A** (three integration derivations): three worked examples on the Simpson 1/3 pattern.
5. **G2** (exam weight on chapter cards) and **G3** (Credit 1 on the Syllabus page, videos inside lessons).

---

## 7. Not checked

- **No visual sweep on an iPad or at 390 px today.** The renderer bug in D1 was confirmed by running the text splitter, not by a screenshot.
- The scans themselves (class notes, slides, Question Bank) were not re-read; the transcriptions in `docs/sources/` and the typed papers were used.
- The 247 word-answer quiz and check items were not re-verified one by one (the morning audit checked the 11 numeric ones).
