# Source transcription — Finite Differences, Interpolation Proofs, and Worked Examples

Transcription of three scanned sources. Nothing has been added, corrected, solved or
commented on beyond what is printed on the pages. Every formula is given in LaTeX.

**Source 1** — `slides/Interpolation/(Error in Difference Table) Interpolation.pdf`
(Chapra & Canale, *Numerical Methods for Engineers*). Its transcription now lives in
`docs/books/chapra-ch02-finite-differences.md` (kept locally, not committed).

**Source 2** — `slides/Interpolation/02-supplement-NM Interpolation 13 Proofs Scanned0001.jpg`
(one 1645 × 2322 scan; contains handwritten proofs numbered **9, 10, 11, 12, 13** —
i.e. the last five of the "13 Proofs" handout. Proofs 1–8 are **not present** in this
file and have not been reconstructed.)

**Source 3** — `slides/System of Linear Equations (Examples) .pdf`
(6 pages of the teacher's handwritten Gauss-elimination board notes).

Notation used below for the difference tables: the printed tables are *staggered* — each
difference entry sits halfway between the two function values from which it is obtained.
For readability the entries are listed here **column by column, top to bottom**, which
preserves every printed number and its order.

---

## Part B — "02-supplement-NM Interpolation 13 Proofs Scanned0001.jpg" (handwritten)

> **Note on the source.** The file name says "13 Proofs", but the single scanned page supplied here
> contains only the **last five** of them, numbered **9, 10, 11, 12 and 13**. Proofs 1–8 are
> not present in this file and have **not** been reconstructed here.
>
> The page is a two-column handwritten sheet. The section headings below are the seven vertical
> slices the scan was cut into (top to bottom); proof 12 sits in the left column at the bottom
> and proof 13 in the right column at the bottom.
>
> The handwriting uses $f$ with subscripts (e.g. $f_0$, $f_n$, $f_{\pm 1/2}$) throughout, and
> the operators $\Delta$ (forward), $\nabla$ (backward), $\delta$ (central), $\mu$ (mean),
> $E$ (shift). Boxed numbers in the original are shown as `**[n]**`.

## Interpolation proofs — slice 1 (top of page)

### Proof [9] — proving $(\Delta - \nabla) \equiv \delta^2$

$$
(\Delta - \nabla)f_0 = \Delta f_0 - \nabla f_0 = (f_1 - f_0) - (f_0 - f_{-1}) = \boxed{f_1 - 2f_0 + f_{-1}}
$$

$$
\delta^2 f_0 = \delta[\delta f_0] = \delta\left[f_{\frac{1}{2}} - f_{-\frac{1}{2}}\right]
= \delta f_{\frac{1}{2}} - \delta f_{-\frac{1}{2}}
$$

$$
= (f_1 - f_0) - (f_0 - f_{-1}) = \boxed{f_1 - 2f_0 + f_{-1}}
$$

Arrows (annotated "**By definition:** because: $\delta f_i = f_{i+\frac{1}{2}} - f_{i-\frac{1}{2}}$") connect the
two bracketed results $(f_1 - f_0)$ and $(f_0 - f_{-1})$ on the right-hand side of the two lines.

$$
\text{So, }(\Delta - \nabla) \equiv \delta^2
$$

### Proof [10] — proving $E^{\frac{1}{2}} \equiv \mu + \frac{1}{2}\delta$

$$
E^{\frac{1}{2}}f_0 = \boxed{f_{\frac{1}{2}}}
$$

$$
\left(\mu + \frac{1}{2}\delta\right)f_0 = \mu f_0 + \frac{1}{2}\delta f_0
= \frac{1}{2}\left[f_{\frac{1}{2}} + f_{-\frac{1}{2}}\right] + \frac{1}{2}\left[f_{\frac{1}{2}} - f_{-\frac{1}{2}}\right]
$$

$$
= \frac{1}{2}\left(f_{\frac{1}{2}} + f_{-\frac{1}{2}}\right) = \boxed{f_{\frac{1}{2}}}
$$

(Two arrows are annotated "**By definition**" — one pointing from the bracketed
$\left[f_{\frac{1}{2}} + f_{-\frac{1}{2}}\right]$ term and one from the bracketed
$\left[f_{\frac{1}{2}} - f_{-\frac{1}{2}}\right]$ term.)

$$
\text{So: } E^{\frac{1}{2}} = \mu + \frac{1}{2}\delta
$$

## Interpolation proofs — slice 2 (upper-middle of page)

Continuation of Proof [10]:

$$
\text{So: } E^{\frac{1}{2}} = \mu + \frac{1}{2}\delta
$$

(printed in the left column, together with the tail of Proof [9] in the right column)

### Proof [11] — proving $(1 + \Delta)(1 - \nabla) \equiv 1$

Above this proof, written and struck through: ~~"Better if you"~~ *(the sentence is crossed out and illegible)*.

$$
(1 + \Delta)(1 - \nabla) \equiv 1
$$

$$
\Rightarrow (1+\Delta)(1-\nabla)f_n = f_n + \Delta f_n - \nabla f_n - \Delta[\nabla f_n]
$$

$$
= f_n + \Delta f_n - \nabla f_n - \Delta\left[f_n - f_{n-1}\right]
$$

$$
= f_n + \Delta f_n - \nabla f_n - \Delta f_n + \Delta f_{n-1}
$$

$$
= f_n + \cancel{\Delta f_n} - \nabla f_n + \Delta f_{n-1}
= f_n - (f_n - f_{n-1}) + (f_n - f_{n-1})
$$

$$
= \boxed{f_n}
$$

$$
\text{So: } (1+\Delta)(1-\nabla)f_n = f_n
$$

$$
\therefore (1+\Delta)(1-\nabla) \equiv 1
$$

## Interpolation proofs — slice 3 (middle of page)

Continuation of Proof [11]:

$$
\text{So: } (1+\Delta)(1-\nabla)f_n = f_n
$$

$$
\therefore (1+\Delta)(1-\nabla) \equiv 1
$$

(the final $f_n$ of the previous slice is written inside a box on the right-hand side)

## Interpolation proofs — slice 4 (lower-middle of page, left column)

### Proof [12] — proving $\nabla \equiv E^{-1}\Delta$

$$
\nabla f_n = \boxed{f_n - f_{n-1}}
$$

$$
E^{-1}\Delta f_n = E^{-1}\left[f_{n+1} - f_n\right]
$$

$$
= E^{-1}f_{n+1} - E^{-1}f_n
$$

$$
= \boxed{f_n - f_{n-1}}
$$

$$
\text{So, } \nabla \equiv E^{-1}\Delta
$$

## Interpolation proofs — slice 5 (lower-middle of page, right column)

### Proof [13] — proving $\delta \equiv E^{-\frac{1}{2}}\Delta$

$$
\delta f_n = \boxed{f_{n+\frac{1}{2}} - f_{n-\frac{1}{2}}}
$$

$$
E^{-\frac{1}{2}}\Delta f_n = E^{-\frac{1}{2}}\left(f_{n+1} - f_n\right)
= E^{-\frac{1}{2}}f_{n+1} - E^{-\frac{1}{2}}f_n
$$

$$
= \boxed{f_{n+\frac{1}{2}} - f_{n-\frac{1}{2}}}
$$

$$
\text{So: } \delta \equiv E^{-\frac{1}{2}}\Delta
$$

## Interpolation proofs — slice 6 (bottom of page, left column)

Conclusion of Proof [12]:

$$
\text{So, } \nabla \equiv E^{-1}\Delta
$$

## Interpolation proofs — slice 7 (bottom of page, right column)

Conclusion of Proof [13]:

$$
\text{So: } \delta \equiv E^{-\frac{1}{2}}\Delta
$$

Boxed note at the very bottom of the page:

> **For 9 & 10, Better we use $f_n$ instead of $f_0$**

---

## Part C — "System of Linear Equations (Examples) .pdf" (teacher's handwritten board notes)

> **Transcription convention.** The teacher's notation is reproduced exactly:
> `R_1`, `R_2`, `R_3` for the original rows, `R_2'`, `R_3'`, `R_3''` for the new rows,
> the row-operation form `R_2' = R_2 + (...)R_1`, the labels **"Pivot Row"** and
> **"Elimination Row"**, the step ordering `Step 1 / Step 2 / Step 3`, the equation tags
> `(1)`, `(2)`, `(3)`, `(2')`, `(3')`, `(3'')`, and the arithmetic as written.
> Bengali text visible on the scans is the show-through (bleed-through) of the writing on
> the reverse side of the sheet; it is recorded as **[Bengali note]** where it is legible
> as writing, and otherwise omitted. No attempt has been made to translate it.

## Gauss elimination — teacher notes page 1

**Example 1** — Solve the following system of linear equation using **"Gauss Elimination" Method** —

$$
\begin{aligned}
x + y + z &= 6\\
2x + 3y + z &= 13\\
3x + 2y + 5z &= 18
\end{aligned}
$$

**Elimination**
**Forward Elimination** —

$$
\begin{aligned}
R_1 &: x + y + z = 6 \text{ — (1)}\\
R_2 &: 2x + 3y + z = 13 \text{ — (2)}\\
R_3 &: 3x + 2y + 5z = 18 \text{ — (3)}
\end{aligned}
$$

**Step 1** — Remove $x$ from $R_2$

- Pivot Row : $R_1$
- Elimination Row : $R_2$

$$
R_2' = R_2 + \left(\frac{-2}{1}\right)R_1
$$

$$
= R_2 - 2R_1
$$

*Boxed note on the page:*

$$
\text{Pivot} = \frac{R_2\text{'s coefficient of } x}{R_1\text{'s coefficient of } x}
$$

Arithmetic:

$$
\begin{aligned}
2x + 3y + z &= 13\\
-2x - 2y - 2z &= -12\\
\hline
y - z &= 1 \text{ — (2')}
\end{aligned}
$$

## Gauss elimination — teacher notes page 2

**Step 2** — Eliminate $x$ from $R_3$

- Pivot Row $= R_1$
- Elimination Row $= R_3$

$$
R_3' = R_3 + \left(\frac{-3}{1}\right)R_1
$$

$$
= R_3 - 3R_1
$$

Arithmetic:

$$
\begin{aligned}
3x + 2y + 5z &= 18\\
-3x\ [\text{crossed-out character}]\ -3y - 3z &= -18\\
\hline
-y + 2z &= 0 \text{ — (3')}
\end{aligned}
$$

**Now the system becomes**

$$
\begin{aligned}
R_1 &: x + y + z = 6 \text{ — (1)}\\
R_2' &: y - z = 1 \text{ — (2')}\\
R_3' &: -y + 2z = 0 \text{ — (3')}
\end{aligned}
$$

**Step 3** — Eliminate $y$ from $R_3'$

- Pivot Row $= R_2'$
- Elimination Row $= R_3'$

$$
\therefore R_3'' = R_3' + \left(\frac{-1}{1}\right)R_2'
$$

$$
= R_3' + R_2'
$$

$$
\begin{aligned}
-y + 2z &= 0\\
y - z &= 1\\
\hline
z &= 1 \text{ — (3'')}
\end{aligned}
$$

## Gauss elimination — teacher notes page 3

**Back Substitution** —

Now, the system becomes

$$
\begin{aligned}
x + y + z &= 6 \text{ — (1)}\\
y - z &= 1 \text{ — (2')}\\
z &= 1 \text{ — (3'')}
\end{aligned}
$$

From $3''$

$$
z = 1
$$

From $2'$

$$
\begin{aligned}
y &= 1 + z\\
&= 1 + 1\\
&= 2
\end{aligned}
$$

From 1

$$
\begin{aligned}
x &= 6 - y - z\\
&= 6 - 2 - 1\\
&= 3
\end{aligned}
$$

$$
\therefore x = 3,\ y = 2,\ z = 1
$$

## Gauss elimination — teacher notes page 4

**Example 2** — Solve the following system of linear equations using Gauss Elimination with **Partial Pivoting**

$$
\begin{aligned}
3x + 5y + z &= 0\\
3x + 2y + 5z &= 10\\
6x + 4y + 2z &= 12
\end{aligned}
$$

**Solution:**
**Forward Elimination** —

$$
\begin{aligned}
R_1 &: 3x + 5y + z = 40 \text{ — (1)}\\
R_2 &: 3x + 2y + 5z = 10 \text{ — (2)}\\
R_3 &: 6x + 4y + 2z = 12 \text{ — (3)}
\end{aligned}
$$

> *Row $R_1$ is written as "= 40" where the leading "4" is a small overwritten/scribbled digit; the
> problem statement at the top of the same page reads $3x + 5y + z = 0$.* `[uncertain: "40", the "4" scribbled over]`

**Step 1** — Find the largest coefficient of the 1st column

$$
R_3 \longleftrightarrow R_1
$$

*Boxed note on the page:*

> **Note:** While finding the largest coefficient only consider the magnitude. So, think of it as an absolute value

Now, the system becomes

$$
\begin{aligned}
R_1 &: 6x + 4y + 2z = 12\\
R_2 &: 3x + 2y + 5z = 10\\
R_3 &: 3x + 5y + z = 0
\end{aligned}
$$

**Step 2** — Remove $x$ from $R_2$

$$
R_2' \Rightarrow R_2 + \left(\frac{-3}{6}\right)R_1
$$

$$
= R_2 - \frac{1}{2}R_1
$$

## Gauss elimination — teacher notes page 5

Arithmetic (continuation of Step 2 from the previous page):

$$
\begin{aligned}
3x + 2y + 5z &= 10\\
-3x - 2y - z &= -6\\
\hline
4z &= 4 \text{ — (2')}
\end{aligned}
$$

> *The final digit of "4z = 4" is heavily overwritten (it reads like "46"); the back-substitution
> page prints "4z = 4 ⇒ z = 1".* `[uncertain: the last digit is overwritten]`

**Step 2** — Remove $x$ from $R_3$

$$
R_3' = R_3 + \left(-\frac{1}{2}\right)R_1
$$

$$
= R_3 - \frac{1}{2}R_1
$$

Arithmetic:

$$
\begin{aligned}
3x + 5y + z &= 0\\
-3x - 2y - z &= -6\\
\hline
3y &= -6 \text{ — (3')}
\end{aligned}
$$

Now the system becomes

$$
\begin{aligned}
R_1 &: 6x + 4y + 2z = 12 \text{ — (1)}\\
R_2' &: 0 + 4z = 4 \text{ — (2')}\\
R_3' &: 3y + 0 = -6 \text{ — (3')}
\end{aligned}
$$

**Step 3** — Swapping $R_3'$ with $R_2'$ $(R_3' \longleftrightarrow R_2')$ system becomes

$$
\begin{aligned}
R_1 &: 6x + 4y + 2z = 12 \text{ — (1)}\\
R_2' &: 3y + 0 = -6 \text{ — (2')}\\
R_3' &: 0 + 4z = 4 \text{ — (3')}
\end{aligned}
$$

*Boxed note at the bottom of the page:*

> **Note:** Here if coefficient of $y$ was not already 0 for $R_3'$, we would needed to eliminate it ourselves by considering $R_2'$ as pivot row

## Gauss elimination — teacher notes page 6

**Back Substitution** —

from $3'$ we get,

$$
\begin{aligned}
4z &= 4\\
\Rightarrow z &= 1
\end{aligned}
$$

from $2'$ we get,

$$
\begin{aligned}
3y &= -6\\
\Rightarrow y &= -2
\end{aligned}
$$

from 1 we get —

$$
\begin{aligned}
6x + 4y + 2z &= 12\\
\Rightarrow 6x &= 12 - (4y + 2z)\\
\Rightarrow 6x &= 12 - (-8 + 2)\\
\Rightarrow 6x &= 12 + 6\\
\Rightarrow 6x &= 18\\
\Rightarrow x &= \frac{18}{6} = 3
\end{aligned}
$$

$$
\therefore x = 3,\ y = -2,\ z = 1
$$
