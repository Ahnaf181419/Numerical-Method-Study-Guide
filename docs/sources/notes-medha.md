# Numerical_final_Medha — class-note transcription

Source: `ClassNotes/Numerical_final_Medha.pdf` (36 scanned handwritten pages, CSE 2201 Numerical Methods, AUST).
Transcribed page by page. Handwriting is reproduced as written; Bengali lines are transliterated in parentheses.

---

## Medha — page 1

(Sir)

### Chapter-10

### Curve Fitting : Regression

- → approximate fit / best fit
- → not exact fit

[Sketch: scattered points with a straight line fitted through them]

$$\Sigma (\text{error})^2 \qquad \text{minimize}$$

- → minimize **SSE** (Sum of Squared errors)

- **MAE** → Mean of Absolute error — → abs val minimize is tough
- **SAE** → Sum of [illegible] " " " "
- **MSE** → Mean of Squared error
- **SSE** → Sum of [illegible] " " " " → we minimize this [illegible] because its mathematical analysis is easier

**Pg : 10.1, 10.2, 10.4, 10.5**

*Q* Derive the expression for a and b for least square Linear Regression (one descriptive question) (eq-10.8)

### Eg-10.1

Fit a st. line to the following data

$$
\begin{array}{c|ccccc}
x & 1 & 2 & 3 & 4 & 5\\
\hline
y & 2 & 4 & 5 & 6 & 8
\end{array}
$$

for, $y = a + bx$

$$
b = \frac{n\Sigma xy - \Sigma x\,\Sigma y}{n\Sigma x^2 - (\Sigma x)^2}
\qquad\text{and,}\qquad
a = \frac{\Sigma y}{n} - b\frac{\Sigma x}{n}
$$

$$
b = 1.2 \qquad a = 1.6
$$

$$
\therefore\; y = 1.6 + 1.2x
$$

---

## Medha — page 2

Also find the errors / SSE

- for, $x = 1$, $y = 2.8$ not 3 ; Abs error = $|\text{Actual} - |3 - 2.8|| = 0.2$
- for $x = 2$, $y = 4$ ; Abs error = $|4 - 4| = 0$
- for $x = 3$, $y = 5.2$ ; abs error = $|5.2 - 5| = 0.2$
- for $x = 4$, $y = 6.4$ ; " = $|6.4 - 6| = 0.4$
- for $x = 5$, $y = 7.6$ ; " = $|7.6 - 8| = 0.4$

$$
\text{SSE} = (0.2)^2 + 0^2 + (0.2)^2 + (0.4)^2 + (0.4)^2 = 0.4
$$

$$
\text{MAE} = \frac{0.2 + 0 + 0.2 + 0.4 + 0.4}{5} = 0.24
$$

$$
\text{MSE} = \frac{0.4}{5} = 0.08
$$

$$
\text{SAE} = 0.2 + 0 + 0.2 + 0.4 + 0.4 = 1.2
$$

(Ma'am)

### Sensitivity

Sensitivity is measured by condition

- → well condition → sensitivity [less], → errors less in input, also in output
- → ill condition → sensitivity [more],

for $f(x) = x^2$

$$
x = 2,\; f(x) = 4 \qquad
x = 2.01,\; f(x) = 4.04
$$

} → well condition problem

---

## Medha — page 3

for, $f(x) = \dfrac{1}{x - 1}$

$$
x = 1.005 \;;\; f(x) = 200 \qquad
x = 1.01 \;;\; f(x) = 100
$$

} → ill pr. condition problem

this problem is ill conditioned for $x = 1$. not others,

e.g: $\dfrac{1}{5 - 1}$, $\dfrac{1}{5.01 - 1}$ not that change

*Question may come to explain well/ill condition problem with eg.*

**Mid** → (Ma'am) → error (ch-4)
$\qquad\qquad$ synthetic division

**(Sir)** → ch-6: Derivation, Short question, Algorithm, Definition
$\qquad$ 6-8 marks, 30-40%  ⟶  12-14 marks, 60%-70% ; Math

⟶ error case 2 problems, তিনটা marks (three marks)

### Chapter-7

### Naive Gauss Elimination

$$
a_{11}x_1 + a_{12}x_2 + a_{13}x_3 = b_1
$$
$$
a_{21}x_1 + a_{22}x_2 + a_{23}x_3 = b_2
$$
$$
a_{31}x_1 + a_{32}x_2 + a_{33}x_3 = b_3
$$

Augmented matrix form,

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
\begin{bmatrix}
x_1\\ x_2\\ x_3
\end{bmatrix}
=
\begin{bmatrix}
b_1\\ b_2\\ b_3
\end{bmatrix}
$$

---

## Medha — page 4

We have to convert to upper triangular matrix to get results of $x_1, x_2, x_3$.

1) Forward elimination
2) Backward substitution

* Solve using Naive Gauss Elimination,

$$
\begin{aligned}
R_1 :\;& x - 3y + z = 4 && \text{— (i) \quad Pivot row}\\
R_2 :\;& 2x - 8y + 8z = -2 && \text{— (ii) \quad Elimination row}\\
R_3 :\;& -6x + 3y - 15z = 9 && \text{— (iii)}
\end{aligned}
$$

$$
\begin{aligned}
R_2' &= R_2 + \left(\frac{-2}{1}\right)\times R_1\\
     &= R_2 - 2R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
2x - 8y + 8z &=& -2\\
-2x + 6y - 2z &=& -8\\ \hline
0 - 2y + 6z &=& -10\\
-y + 3z &=& -5
\end{array}
\quad \text{— (ii')}
$$

$$
\begin{aligned}
R_3' &= R_3 + \left(\frac{-(-6)}{1}\right)R_1\\
     &= R_3 + 6R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
-6x + 3y - 15z &=& 9\\
6x - 18y + 6z &=& 24\\ \hline
0 - 15y - 9z &=& 33\\
0 - 5y - 3z &=& 11
\end{array}
\quad \text{— (iii')}
$$

$$
\begin{aligned}
R_1' :\;& x - 3y + z = 4\\
R_2' :\;& -2y + 6z = -5 && ;\ \text{Pivot row}\\
R_3' :\;& -5y - 3z = 11 && ;\ \text{Elimination row}
\end{aligned}
$$

$$
\begin{aligned}
R_3'' &= R_3' + \left(\frac{-5}{-1}\right)R_2'\\
      &= R_3' - 5R_2'
\end{aligned}
$$

$$
\begin{array}{rcl}
-5y - 3z &=& 11\\
-5y - 15z &=& 25\\ \hline
-18z &=& 36\\
-z &=& -2 \quad \text{— (iii'')}
\end{array}
$$

---

## Medha — page 5

$$
\begin{aligned}
(1'') :\;& x - 3y + z = 4\\
(2'') :\;& -y + 3z = -5\\
(3'') :\;& -0z = 2
\end{aligned}
$$

from $(3'')$, $-z = 2$
$$\quad z = -2$$

from $(2'')$ $-y + 3(-2) = -5$
$$y = -1$$

from $(1'')$ $x - 3(-1) + (-2) = 4$
$$x = 3$$

* $x + 3y + 2z = 13$ — (1) ⟶ pivot row
* $2x + y + 4z = 16$ — (2)
* $4x + 2y + z = 11$ — (3)

$$
\begin{aligned}
R_2' &= R_2 + \left(\frac{-2}{1}\right)R_1\\
     &= R_2 - 2R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
2x + y + 4z &=& 16\\
-2x - 6y - 4z &=& -26\\ \hline
-5y &=& -10\\
y &=& 2 \quad \text{— (2')}
\end{array}
$$

$$
\begin{aligned}
R_3' &= R_3 + \left(\frac{-4}{4}\right)R_1\\
     &= R_3 - 4R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
4x + 2y + z &=& 11\\
-4x - 12y - 8z &=& -52\\ \hline
-10y - 7z &=& -41\\
4x_2 + 2x_3 &=& 8
\end{array}
\quad \text{— (3')}
$$

---

## Medha — page 6

$$
\begin{aligned}
x + 3y + 2z &=& 13 \quad \text{— (4)}\\
y &=& 2 \quad \text{— (2') \ ; pivot row}\\
-10y - 7z &=& -41 \quad \text{— (3')}
\end{aligned}
$$

$$
\begin{aligned}
R_3'' &= R_3' + \left(\frac{-(-10)}{1}\right)R_2'\\
      &= R_3' + 10R_2'
\end{aligned}
$$

$$
\begin{array}{rcl}
-10y - 7z &=& -41\\
10y &=& 20\\ \hline
-7z &=& -21\\
z &=& 3 \quad \text{— (3'')}
\end{array}
$$

$$
\therefore
\begin{aligned}
x + 3y + 2z &= 13 \quad \text{— (4)}\\
y &= 2 \quad \text{— (2')}\\
z &= 3 \quad \text{— (3'')}
\end{aligned}
$$

from $(3'')$,
$$z = 3$$

from $(2')$,
$$y = 2$$

from $(4)$,
$$
x + 3y + 2z = 13
$$
$$
\Rightarrow\; x + 3.2 + 2.3 = 13
$$
$$
\Rightarrow\; x = 13 - 6 - 6
$$
$$
x = 1
$$

$$
\therefore\; (x, y, z) = (1, 2, 3)
$$

---

## Medha — page 7

(Sir) — 20-07-26

$$
y = a + bx
$$

↓ minimize of **SSE**, $S = \displaystyle\sum_{i=1}^{n} e_i^2 = \sum_{i=1}^{n}\bigl(y_i - f(x_i)\bigr)^2$

### Example 10.2 (power function regression)

fit a power function model of the form

$$
y = ax^b
$$

$x \to$
$y \to$

* $b = \dfrac{n\Sigma \ln x_i \ln y_i - \Sigma \ln x_i \, \Sigma \ln y_i}{n\Sigma (\ln x_i)^2 - (\Sigma \ln x_i)^2}$
* $\ln a = R = \dfrac{1}{n}\Bigl(\Sigma \ln y_i - b\, \Sigma \ln x_i\Bigr)$
* $a = e^R$

$$
y = ax^b \;\Rightarrow\; \ln y = \ln a + b\ln x
$$
$$
\therefore\; Y = A + bX
$$
with $a = e^A$

### Example 10.4 (Polynomial regression)

Fit a second order polynomial to the data.

$$
y = a_1 + a_2x + a_3x^2
$$

(দ্বিতীয় মাত্রা বিশিষ্ট, দ্বিঘাত ঢালও করতে হবে — "second degree, must also be done")

---

## Medha — page 8

* $a_1 n + a_2 \Sigma x_i + a_3 \Sigma x_i^2 = \Sigma y_i$
* $a_1 \Sigma x_i + a_2 \Sigma x_i^2 + a_3 \Sigma x_i^3 = \Sigma y_i x_i$
* $a_1 \Sigma x_i^2 + a_2 \Sigma x_i^3 + a_3 \Sigma x_i^4 = \Sigma y_i x_i^2$

### Example - 10.5 (multiple linear regression)

$$
y = a_1 + a_2x + a_3 z
$$

* $na_1 + (\Sigma x_i)a_2 + (\Sigma z_i)a_3 = \Sigma y_i$
* $(\Sigma x_i)a_1 + (\Sigma x_i^2)a_2 + (\Sigma x_i z_i)a_3 = \Sigma y_i x_i$
* $(\Sigma z_i)a_1 + (\Sigma x_i z_i)a_2 + (\Sigma z_i^2)a_3 = \Sigma y_i z_i$

26-07-26

### Curve fitting : Interpolation

(Shanker Rao)

**Rej. Regression** — Approximate fit (Not necessarily, Exact fit), error low, polynomial degree given.

**Interpolation** : Exact fit

[Sketch: curve through points; labelled "Interpolating Polynomial", "Regression line", "progression"]

Interpolation, error = 0, polynomial degree $\le (n-1)$ where $n$ : no of points.

---

## Medha — page 9

- 2 points, degree $-(2-1) = 1$
- 3 points degree $(3-1) = 2$
- 6 points, still, degree 1 $\therefore (6-1) = 5 \gg 1$

**what is the difference between interpolation & regression.**

### Gauss Elimination by Partial pivoting

(Ma'am)

$$
\begin{aligned}
9x_1 + 2x_2 + 3x_3 &= 8 && \text{— (i)}\\
4x_1 + 6x_2 + 7x_3 &= -3 && \text{— (ii)}\\
2x_1 - 3x_2 + 6x_3 &= 5 && \text{— (iii)}
\end{aligned}
$$

by naive gauss, $-\dfrac{4}{0}$ ; this occurs, so, we need to exchange rows to solve this.

And we need to swap with the biggest co-efficient; here co-efficient of $x_1$ in pivot row is 0. So, we swap with the row, for whose $x_1$ coefficient is large. here $4 > 2$ so, we swap with (ii). — we does not matter. from $-8, 4$, we swap with $-8x_1$ row.

Again when co-efficient of $x_1$ of pivot row is very large, then very small value will come. So, we swap.

---

## Medha — page 10

* using Gauss elimination by Partial pivoting.

$$
\begin{aligned}
R_1 :\;& 2x_1 + x_2 + x_3 = 5 && \text{— (i)}\\
R_2 :\;& 4x_1 - 6x_2 = -2 && \text{— (ii)}\\
R_3 :\;& -2x_1 + 7x_2 + 2x_3 = 9 && \text{— (iii)}
\end{aligned}
$$

### Step-1

$$
\begin{aligned}
R_1 :\;& 4x_1 - 6x_2 = -2 && \text{pivot row}\\
R_2 :\;& 2x_1 + x_2 + x_3 = 5 && \text{eli. row}\\
R_3 :\;& -2x_1 + 7x_2 + 2x_3 = 9 && \text{eli row}
\end{aligned}
$$

### Step-2

$$
\text{pivot} = -\frac{2}{4} = -\frac{1}{2}
$$

$$
R_3' = R_3 + \left(-\frac{1}{2}\right)R_1
$$

$$
\begin{array}{rcl}
2x_1 + x_2 + x_3 &=& 5\\
-2x_1 + 3x_2 &=& 6\\ \hline
4x_2 + x_3 &=& 6
\end{array}
\quad \text{— (2')}
$$

### Step-3

$$
\begin{aligned}
R_3' &= R_3 + \left(\frac{-(-2)}{4}\right)R_1\\
     &= R_3 + \frac{1}{2}R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
-2x_1 + 7x_2 + 2x_3 &=& 9\\
2x_1 - 3x_2 + 0 &=& -1\\ \hline
4x_2 + 2x_3 &=& 8
\end{array}
\quad \text{— (3')}
$$

$$
\begin{aligned}
\therefore\; R_1' :\;& 4x_1 - 6x_2 = -2\\
R_2' :\;& 4x_1 + 4x_2 + x_3 = 6\\
R_3' :\;& 4x_2 + 2x_3 = 8
\end{aligned}
$$

(largest co-all [all] বড় হবে তার — "the largest one will be taken")

### Step-4

$$
\begin{aligned}
R_3'' &= R_3' + \left(\frac{-4}{4}\right)R_2'\\
      &= R_3' - R_2'
\end{aligned}
$$

$$
\begin{array}{rcl}
4x_2 + 2x_3 &=& 8\\
-4x_2 - x_3 &=& -6\\ \hline
x_3 &=& 2
\end{array}
\quad \text{— (3'')}
$$

---

## Medha — page 11

### Backward substitution,

from $(3'')$, $x_3 = 2$

from $(2')$, $4x_2 + x_3 = 6$
$$
\begin{aligned}
4x_2 + 2 &= 6\\
4x_2 &= 4\\
x_3 &= 1
\end{aligned}
$$

$$
\therefore\; (x_1, x_2, x_3) = (0.1, 1, 2)
$$

from $(1)$, $4x_1 - 6x_2 = -2$
$$
\begin{aligned}
4x_1 - 6 &= -2\\
4x_1 &= 4 \;\Rightarrow\; x_1 = 0.1
\end{aligned}
$$

### Gauss-Jordan method

প্রথমে diagonal matrix বানাতে (first make the diagonal matrix), $\begin{bmatrix} x_1 & 0 & 0\\ 0 & x_2 & 0\\ 0 & 0 & x_3\end{bmatrix}$

upper triangular, lower triangular, all 0.

And co-efficient of diagonal elements should be 1.

$$
\begin{aligned}
R_1 :\;& 2x_1 + 4x_2 + 6x_3 = 18\\
R_2 :\;& 4x_1 + 5x_2 + 6x_3 = 24\\
R_3 :\;& 3x_1 + x_2 - 2x_3 = 4
\end{aligned}
$$

### Step-1 :

$R_3' \to \dfrac{R_3}{2}$

$$
\begin{aligned}
R_1' :\;& x_1 + 4x_2 + 6x_3 = 18 && \text{pivot row}\\
R_2 :\;& 4x_1 + 5x_2 + 6x_3 = 24 && \text{eli row}\\
R_3' :\;& 3x_1 + x_2 - 2x_3 = 4 && \text{eli row}
\end{aligned}
$$

---

## Medha — page 12

### Step-2

$$
\begin{aligned}
R_2' &= R_2 + \left(-\frac{4}{1}\right)R_1'\\
     &= R_2 - 4R_1'
\end{aligned}
$$

$$
\begin{array}{rcl}
4x_1 + 5x_2 + 6x_3 &=& 24\\
-4x_1 - 8x_2 - 12x_3 &=& -36\\ \hline
-3x_2 - 6x_3 &=& -12\\
x_2 + 2x_3 &=& 4
\end{array}
\quad \text{— (2')}
$$

### Step-3

$$
\begin{aligned}
R_3' &= R_3 + \left(-\frac{3}{1}\right)R_1'\\
     &= R_3 - 3R_1'
\end{aligned}
$$

$$
\begin{array}{rcl}
3x_1 + x_2 - 2x_3 &=& 4\\
-3x_1 - 6x_2 - 9x_3 &=& -27\\ \hline
-5x_2 - 11x_3 &=& -23
\end{array}
\quad \text{— (3')}
$$

$$
\begin{aligned}
R_1' :\;& x_1 + 2x_2 + 3x_3 = 9 && \text{eli row}\\
R_2' :\;& x_2 + 2x_3 = 4 && \text{Pivot row}\\
R_3' :\;& -5x_2 - 11x_3 = -23 && \text{eli row}
\end{aligned}
$$

### Step-4

$$
\begin{aligned}
R_1'' &= R_1' + \left(-\frac{2}{3}\right)R_2'\\
      &= R_1' - 2R_2'
\end{aligned}
$$

$$
\begin{aligned}
R_1'' :\;& x_1 + 0 - x_3 = 0.1\\
R_2'' :\;& x_1 + 2x_3 = 4\\
R_3'' :\;& -x_3 = -3
\end{aligned}
$$

### Step-5

$$
\begin{aligned}
R_3'' &= R_3' + \left(-\frac{5}{1}\right)R_2'\\
      &= R_3' + 5R_2'
\end{aligned}
$$

$$
\begin{aligned}
R_1'' :\;& x_1 + 0 + 0 = 4\\
R_2'' :\;& x_2 + 0 = -2\\
R_3'' :\;& -x_3 = -3
\end{aligned}
$$

### Step-6

$$
\begin{aligned}
R_1''' &= R_1'' + \left(\frac{-1}{3}\right)R_3'''\\
       &= R_1'' - R_3'''
\end{aligned}
$$

### Step-7

$$
\begin{aligned}
R_2''' &= R_2'' + \left(\frac{-2}{-1}\right)R_3'''\\
       &= R_2'' + 2R_3'''
\end{aligned}
$$

$$
\therefore\; x_1 = 4,\quad x_2 = -2,\quad x_3 = 3
$$

---

## Medha — page 13

(Sir) — 27-07-26

- → ch 10 (Balagurusamy)

**Regression**

- → Regression Analysis by gradient Descent / Machine learning approach. (self study) — *for final*
  - → linear. Regression (1 var / 2 var / 3 var)
  - → polynomial Regression (degree = 2, 3)
  - → logistic Regression ✗ (not in syllabus)

### Interpolation

### Lagrange Interpolation (ch-5)

$$
\begin{aligned}
y = f(x) =& \frac{(x-x_1)(x-x_2)\cdots(x-x_n)}{(x_0-x_1)(x_0-x_2)\cdots(x_0-x_n)}\,f(x_0)
\\ &+ \frac{(x-x_0)(x-x_2)\cdots(x-x_n)}{(x_1-x_0)(x_1-x_2)\cdots(x_1-x_n)}\,f(x_1)
\\ &+ \cdots
\\ &+ \frac{(x-x_0)(x-x_1)\cdots(x-x_{n-1})}{(x_n-x_0)(x_n-x_1)\cdots(x_n-x_{n-1})}\,f(x_n)
\end{aligned}
$$

for 4 values, $x_0\; x_1\; x_2\; x_3$ ; $y_0\; y_1\; y_2\; y_3$

$$
\begin{aligned}
f(x) =&\ \frac{(x-x_1)(x-x_2)(x-x_3)}{(x_0-x_1)(x_0-x_2)(x_0-x_3)}\,f(x_0)
\\ &+ \frac{(x-x_0)(x-x_2)(x-x_3)}{(x_1-x_0)(x_1-x_2)(x_1-x_3)}\,f(x_1)
\\ &+ \frac{(x-x_0)(x-x_1)(x-x_3)}{(x_2-x_0)(x_2-x_1)(x_2-x_3)}\,f(x_2)
\\ &+ \frac{(x-x_0)(x-x_1)(x-x_2)}{(x_3-x_0)(x_3-x_1)(x_3-x_2)}\,f(x_3)
\end{aligned}
$$

---

## Medha — page 14

→ Lagrange
[Shanker Rao, ex- 5.5, 5.6]
[Inverse Interpolation — 5.7, 5.8, 5.9, 5.10] → ch-5 (5.4)

### 5.6

$$
\begin{array}{c|cccc}
x_0 & x_1 & x_2 & x_3\\
\hline
x_0 = 0 & 1 & 3 & 4\\
y_0 = -12 & 6 & 6 & 12
\end{array}
$$

4 points, degree-3,

$$
\begin{aligned}
f(x) =&\ \frac{(x-1)(x-3)(x-4)}{(0-1)(0-3)(0-4)}\,(-12)
\\ &+ \frac{(x-0)(x-3)(x-4)}{(1-0)(1-3)(1-4)}\,0
\\ &+ \frac{(x-0)(x-1)(x-4)}{(3-0)(3-1)(3-4)}\,6
\\ &+ \frac{(x-0)(x-1)(x-3)}{(4-0)(4-1)(4-3)}\,(12)
\end{aligned}
$$

$$
= \vdots
$$
$$
= x^3 - 7x^2 + 18x - 12
$$

*Q* Derive the expression for Lagrange interpolation for interpolation with unequal interval.

**Inverse** :

$$
\begin{aligned}
x =&\ \frac{(y-y_1)(y-y_2)(y-y_3)}{(y_0-y_1)(y_0-y_2)(y_0-y_3)}\,x_0
\\ &+ \frac{(y-y_0)(y-y_2)(y-y_3)}{(y_1-y_0)(y_1-y_2)(y_1-y_3)}\,x_1
\\ &+ \frac{(y-y_0)(y-y_1)(y-y_3)}{(y_2-y_0)(y_2-y_1)(y_2-y_3)}\,x_2
\\ &+ \frac{(y-y_0)(y-y_1)(y-y_2)}{(y_3-y_0)(y_3-y_1)(y_3-y_2)}\,x_3
\end{aligned}
$$

y যেখানে আছে, x বের করব (y is given, find x)

---

## Medha — page 15

(Sir) — 16-08-26

### Interpolation - Shanker Rao

ch-3-7
Interpolation_final.docx (24 topic from book)

### Interpolation Theory

- → Difference Operators
  - → $\Delta$ forward difference operator → Newtons forward diff interpolation formula
  - → $\nabla$ backward " " " → Newtons Backward " " "
  - → $\delta$ central " "
    - → Gauss Forward " " "
    - → Gauss Backward " " "
    - → Stirling interpolation
    - → Newtons Divided diff " " "
  - → $\Delta$ divided " "
- → E shift operator
- → $\mu$ Averaging operator

Derivation লাগবে, 13 derivations

### Forward difference Table :

$$
\begin{array}{c|ccccc}
x & 0 & 1 & 2 & 3 & 4\\
\hline
y & 7 & 9 & 43 & 169 & 471
\end{array}
$$

Interpolate the value of $y$ at $x = 0.8$

*1. thing to do is creating difference table. (নির্দিষ্ট নিয়মে — "by a definite rule")

$$
\begin{array}{c|c|c|c|c|c}
x & y & \Delta & \Delta^2 & \Delta^3 & \Delta^4\\
\hline
0 & 7 & & & &\\
  & & 2 & & &\\
1 & 9 & & 32 & &\\
  & & 34 & & 60 &\\
2 & 43 & & 92 & & 24\\
  & & 126 & & 84 &\\
3 & 169 & & 176 & &\\
  & & 302 & & &\\
4 & 471 & & & &
\end{array}
$$

$$
9 - 7 = 2 \qquad 43 - 9 = 34
$$
$$
84 - 60 = 24
$$

---

## Medha — page 16

Define $\Delta$.

Operation that finds the difference of the current value of current $y$ and the current $y$.

$$
\Delta y_0 = y_1 - y_0
$$

$$
\boxed{\Delta y_i = y_{i+1} - y_i}
$$

$$
\Delta^2:\quad \Delta^2 y_0 = \Delta y_1 - \Delta y_0 \;\Rightarrow\; \Delta^2 y_0 = (y_2 - y_1) - (y_1 - y_0) = y_2 - 2y_1 + y_0
$$

$$
\boxed{\Delta^2 y_i = \Delta y_{i+1} - \Delta y_i}
$$

define করলে — (if we define) $x_0\; x_1\; x_2\; x_3\;\dots$ ; $y_0\; y_1\; y_2\; y_3\;\dots$

$$
\Delta^3:\quad \Delta^3 y_0 = \Delta^2 y_1 - \Delta^2 y_0
$$

$$
\boxed{\Delta^3 y_i = \Delta^2 y_{i+1} - \Delta^2 y_i}
$$

$$
\Delta^n:\quad \boxed{\Delta^n y_i = \Delta^{n-1} y_{i+1} - \Delta^{n-1} y_i}
$$

For these values $\Delta$ is $\Delta y_i = y_{i+1} - y_i$

লিখলেই হবে (just write it and it is enough)

---

## Medha — page 17

(Ma'am)

### Gauss Jordan with partial pivoting

$$
\begin{aligned}
7x + 2y + 3z &= 5\\
9x + 5y + 2z &= 3\\
x + 2y + 3z &= 4
\end{aligned}
\qquad \left\{ R_1 \leftrightarrow R_2 \right.
$$

then, let,

$$
\begin{aligned}
7x + 12y + 3z &= 5\\
-4y + 2z &= 4\\
-8y + 3z &= 1
\end{aligned}
\qquad \left\{ R_3 \leftrightarrow R_3 \right.
$$

[Swap করে নিচের নতুন অংশে যাবে (swap and go to the new part below)]

then, let,

$$
\begin{aligned}
7x + 12y + 3z &= 5\\
-8y + 3z &= 1\\
0 + 2z &= 4
\end{aligned}
$$

✓ পরিষ্কার আসবে (clear will come)

### Step-3 টি

pivot row (
elimination row (
$\qquad R_m$ (
)
)
)

$$
\begin{bmatrix}
\lambda_1 & &\\
& \lambda_2 & \\
& & \lambda_3
\end{bmatrix}
$$

O(n³) — T.C.

Note 1000 = m,
$O(1000^3)$

For this case, rather than this → may be need to follow iterative approach.
(gauss eli. / gauss jordan)

For sparse Matrix —

$$
\begin{bmatrix}
a_{11} & 0 & 0\\
0 & a_{22} & a_{23}\\
0 & 0 & a_{33}
\end{bmatrix}
$$

Maximum eigenvalues are 0. after reducing, 0 values are made non zero. So, for this also iterative approaches are good.

---

## Medha — page 18

A system.

$$
\begin{aligned}
a_{11}x + a_{12}y + a_{13}z &= b_1\\
a_{21}x + a_{22}y + a_{23}z &= b_2\\
a_{31}x + a_{32}y + a_{33}z &= b_3
\end{aligned}
$$

sufficient condition for this system to converge
↓
- Strictly diagonally dominant (If yes, surely converge; if no, might converge)

$$
|a_{11}| > |a_{12}| + a_{13}|
$$
$$
|a_{22}| > |a_{21}| + a_{23}|
$$
$$
|a_{33}| > |a_{31}| + |a_{32}|
$$

* Q. (Ques.) might be asked to check if diagonally dominant.
* Also, we must ensure, the system is diagonally dominant → system converges.
  At first, we see if diagonally dominant.
  If apply fixed point iteration, for this system,

then,

$$
x = \frac{b_1 - a_{12}y - a_{13}z}{a_{11}}
$$
$$
y = \frac{b_2 - a_{21}x - a_{23}z}{a_{22}}
$$
$$
z = \frac{b_3 - a_{31}x - a_{32}y}{a_{33}}
$$

then we do **Jacobi Method** or **Seidel Method**

$$
\begin{aligned}
5x + 3y + z &= 12 && |5| > |2| + |1|\\
x + 4y + 2z &= 15 && |4| > |1| + |2|\\
x + 2y + 5z &= 20 && |5| > |1| + |2|
\end{aligned}
$$

$$
x = \frac{12 - 3y - z}{5}
$$
$$
y = \frac{15 - x - 2z}{4}
$$
$$
z = \frac{20 - x - 2y}{5}
$$

∴ Strictly diagonally dominant.

---

## Medha — page 19

[Jacobi]

Initak (Initial):

$$
x^{(0)} = 0 \qquad y^{(0)} = 0 \qquad z^{(0)} = 0
$$

( ) → Iter.

### Iter 1 :

$$
x^{(1)} = \frac{12 - 2y^{(0)} - z^{(0)}}{5} = \frac{12}{5} = 2.4
$$
$$
y^{(1)} = \frac{15}{4} = 3.75
$$
$$
z^{(1)} = \frac{20}{5} = 4
$$

$$
x\ \text{error} = |x^{(1)} - x^{(0)}| = |2.4 - 0| = 2.4
$$
$$
y\ \text{err} = 3.79
$$
$$
z\ \text{err} = 4
$$

### Iter 2 :

$$
\begin{aligned}
x^{(2)} &= \frac{12 - 2y^{(1)} - z^{(1)}}{5}\\
        &= \frac{12 - 2\times 3.75 - 4}{5}\\
        &= 0.1
\end{aligned}
$$

$$
\begin{aligned}
y^{(2)} &= \frac{15 - x^{(1)} - 2z^{(1)}}{4}\\
        &= \frac{15 - 2.4 - 8}{4}\\
        &= 1.15
\end{aligned}
$$

$$
\begin{aligned}
z^{(2)} &= \frac{20 - x^{(1)} - 2y^{(1)}}{5}
\end{aligned}
$$

(2 written at left margin)

এবং check করতে হবে (and must check) — tolerable error যেতে হবে না (must not exceed) / কমলে থামবে (stop when it decreases)

---

## Medha — page 20

[Seidel]

### Iter 1 :

$$
\begin{aligned}
x^{(1)} &= \frac{12 - 2y^{(0)} - z^{(0)}}{5}\\
        &= 2.4
\end{aligned}
$$

$$
\begin{aligned}
y^{(1)} &= \frac{15 - x^{(1)} - 2z^{(0)}}{4}\\
        &= 3.15
\end{aligned}
$$

$$
\begin{aligned}
z^{(1)} &= \frac{20 - x^{(1)} - 2y^{(1)}}{5}\\
        &= \frac{20 - 2.4 - 2\times 3.15}{5}
\end{aligned}
$$

Convergence of Seidel is faster than Jacobi Method.

---

## Medha — page 21

(Sir) — 17-08-26

ch-4 : equal intervals — Shanker Rao

4.4 Newtons forward interpolation formula  eg- 4.4, 4.8
4.5 " Backward " "  eg- 4.9, 4.10

- Gauss Forward
- Gauss Backward
- Stirling
  → central difference interpolation

- Newtons Divided difference interpolation
- Lagrange interpolation

⟶ unequal intervals → derivation

Interpolation with equal intervals

All derivations 1/2 in exam

### Newtons forward interpolation formula

$$
\begin{aligned}
y = \varphi(x) = y_0 &+ u\frac{\Delta y_0}{1!}
+ \frac{u(u-1)}{2!}\Delta^2 y_0
+ \frac{u(u-1)(u-2)}{3!}\Delta^3 y_0
+ \frac{u(u-1)(u-2)(u-3)}{4!}\Delta^4 y_0
\\ &+ \cdots + \frac{u(u-1)\cdots(u-n+1)}{n!}\Delta^n y_0
\end{aligned}
$$

where, $u = \dfrac{x - x_0}{h}$

$h = x_1 - x_0$ or $x_2 - x_1$ or $x_3 - x_2$

$x$ = যেখানে খুঁজবে (where to find)

$x_0$ = table →

---

## Medha — page 22

### Newtons backward interpolation formula

$$
\begin{aligned}
f(x) = \varphi(x) = y_n &+ \frac{u\,\nabla y_n}{1!}
+ \frac{u(u+1)}{2!}\nabla^2 y_n
+ \frac{u(u+1)(u+2)}{3!}\nabla^3 y_n + \cdots
\\ &+ \frac{u(u+1)(u+2)\cdots(u+n-1)}{n!}\nabla^n y_n
\end{aligned}
$$

where,

$$
u = \frac{x - x_n}{h}
$$

$x$ = যেখানে খুঁজবে

$h = x_1 - x_0$ or $x_n - x_{n-1}$

$\nabla$ definition $\to \nabla y_1 = y_1 - y_0$

### Central difference Operation

28-08-26

$$
\delta y_i = y_{i+\frac{1}{2}} - y_{i-\frac{1}{2}}
$$

$$
\delta y_1 = y_{1.5} - y_{0.5} \qquad \sim \text{Not defined}
$$

$$
\delta y_{\frac{1}{2}} = y_1 - y_0 = \Delta y_0 \qquad \to \text{Forward diff operator}
$$

Central difference operator

central difference formula

- Gauss Forward (6.2 set)
- Gauss Backward (6.3)
- Stirling $=\tfrac{1}{2}$ (Gauss Fwd + Gauss Backward) (6.5) → derive

---

## Medha — page 23

### Gauss Forward —

$$
\begin{aligned}
y = f(x) = y_0 &+ u\,\Delta y_0
+ \frac{u(u-1)}{2!}\Delta^2 y_{-1}
+ \frac{(u+1)u(u-1)}{3!}\Delta^3 y_{-1}
+ \frac{(u+1)u(u-1)(u-2)}{4!}\Delta^4 y_{-2}
\\ &+ \frac{(u+2)(u+1)u(u-1)(u-2)}{5!}\Delta^5 y_{-2} + \cdots
\end{aligned}
$$

Math → 6.1 to 6.10

### Gauss Backward —

$$
\begin{aligned}
y = f(x) = y_0 &+ \frac{u}{1!}\Delta y_{-1}
+ \frac{u(u+1)}{2!}\Delta^2 y_{-1}
+ \frac{(u+1)u(u-1)}{3!}\Delta^3 y_{-2}
\\ &+ \frac{(u+2)(u+1)u(u-1)}{4!}\Delta^4 y_{-2}
+ \frac{(u+2)(u+1)u(u-1)(u-2)}{5!}\Delta^5 y_{-3} + \cdots
\end{aligned}
$$

(Ma'am)

### LU Decomposition / Factorization

Form: $Ax = b$

To factorize — 1st condition — co-efficient matrix should be non singular. Then,

$$
A = LU
$$

L — lower Triangular Matrix; U — upper Triangular Matrix

⟶ সমস্যা নেই (no problem)

Then,

$$
[A]\{x\} = \{b\}
$$
$$
\Downarrow
$$
$$
[L][U]\{x\} = \{b\}
$$
$$
[L]\{d\} = \{b\}
$$

Here, $[U]\{x\} = \{d\}$

---

## Medha — page 24

### Do Little Method

#### Step-1 : LU factorization

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13}\\
a_{21} & a_{22} & a_{23}\\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0\\
l_{21} & 1 & 0\\
l_{31} & l_{32} & 1
\end{bmatrix}
\begin{bmatrix}
u_{11} & u_{12} & u_{13}\\
0 & u_{22} & u_{23}\\
0 & 0 & u_{33}
\end{bmatrix}
$$

(lower) (upper)

$$
u_{11} = 1,\quad u_{12} = 2,\quad u_{13} = 4
$$

$$
l_{21}u_{11} = 3 \;\Rightarrow\; l_{21} = 3
$$

$$
l_{21}u_{12} + u_{22} = 8 \;\Rightarrow\; u_{22} = 2
$$

$$
l_{21}u_{13} + u_{23} = 14 \;\Rightarrow\; 3\times 4 + u_{23} = 14 \;\Rightarrow\; u_{23} = 2
$$

$$
l_{31}u_{11} = 2 \;\Rightarrow\; l_{31} = 2
$$

$$
u_{33} = 3 \qquad l_{32} = 1
$$

$$
\begin{bmatrix}
1 & 0 & 0\\
3 & 1 & 0\\
2 & 1 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 4\\
0 & 2 & 2\\
0 & 0 & 3
\end{bmatrix}
$$

Gauss elim করতে হবে, L ও U A করতে পারি (Gauss elimination must be done, L and U can be found)

⟹ Do little টা ক্রাফট করতে লাগবে Do little ই করতে হবে (Do little has to be crafted, Do little itself must be done)

#### eg-1

$$
u_{11} = 1,\quad u_{12} = 1,\quad u_{13} = 1
$$

$$
l_{21}u_{11} = 4,\qquad l_{21}u_{12} + u_{22} = 3
$$
$$
l_{31} = 4,\qquad u_{22} = -1
$$

$$
\underbrace{\begin{bmatrix}
1 & 0 & 0\\
4 & 1 & 0\\
3 & -2 & 1
\end{bmatrix}}_{L}
\underbrace{\begin{bmatrix}
d_1\\ d_2\\ d_3
\end{bmatrix}}_{\textstyle b}
=
\begin{bmatrix}
\vdots
\end{bmatrix}
$$

[In this way, inverse is also easier]

---

## Medha — page 25

(Sir) — 24-08-26

### Interpolation

- Equal interval
- Unequal Interval
  - → Newton divided difference table — 5.2 ** Math ; 5.3, 5.4, 5.2
  - → Lagrange — 5.3 derive ** ** — 5.5, 5.6 → math

### Newton divided difference formula

$$
\begin{array}{c|c|c|c|c|c}
x & y & \Delta & \Delta^2 & \Delta^3 & \Delta^4\\
\hline
1 & 0 & & & &\\
3 & 18 & \dfrac{0-18}{1-3} = -9 & & &\\
4 & 58 & \dfrac{18-58}{3-4} = 40 & 10.33 & &\\
6 & 190 & \dfrac{58-190}{4-6} = 61 & 7 & 0.6660 &\\
10 & 920 & & 10.25 & 0.4643 &\\
\end{array}
$$

$$
\therefore\; 7 = \frac{40 - 61}{3 - 6}
$$

$x \leftarrow y$ (arrow pointing from the box in the table)

[Table with an empty boxed cell, arrowed, annotated in Bengali: "যে y তো মেলে, তার corresponding x" — "the y that matches, its corresponding x"]

$$
\Delta = f(x, x_0) \qquad \Delta^2 = f(x, x_0, x_1)
$$

(→ top value of this column)

eqn:

$$
\begin{aligned}
f(x) =&\ f(x_0) + (x-x_0)\,f(x_0, x_1)
\\ &+ (x-x_0)(x-x_1)\,f(x_0, x_1, x_2)
\\ &+ (x-x_0)(x-x_1)(x-x_2)\,f(x_0, x_1, x_2, x_3)
\end{aligned}
$$

---

## Medha — page 26

### eg- 5.3

$$
\begin{aligned}
f(x) = f(6) &= 150 + (6-5)\,121 - (6-5)(6-7)\,24 + (6+5)(6-7)(6-11)\,1 + 0\\
          &= 252
\end{aligned}
$$

30-08-26

* Finding missing value in the table (ch-4, eg-4.4, 4.3)
* Finding error in the table
* 13 proofs

#### 4.1

$$
\begin{array}{c|cccccc}
x & 0 & 1 & 2 & 3 & 4 & \boxed{\phantom{?}}\\
\hline
y & 1 & 3 & 9 & & & 81
\end{array}
$$

equivalent
$$
\Delta \equiv E - 1
$$

↓ fwd diff op ; ↓ Shift operator

$$
\begin{aligned}
Ey_i &= y_{i+1}\\
Ey_0 &= y_1 \qquad E^2 y_0 = y_2\\
Ey_1 &= y_2 \qquad E^n y_0 = y_n
\end{aligned}
$$

$$
\frac{d^4}{dx^4}(5x^3) = 0
$$
$$
\Delta^4 y_0 = 0
$$

here, we know 4 points

4 points → passing polynomial has degree = 3

$$
\therefore\; \Delta^4 y_0 = 0
$$
$$
\Rightarrow\; (E-1)^4 y_0 = 0
$$

---

## Medha — page 27

$$
\Rightarrow\; (E^4 - 4E^3 + 6E^2 - 4E + 1)\,y_0 = 0
$$

$$
\Rightarrow\; E^4y_0 - 4E^3y_0 + 6E^2y_0 - 4Ey_0 + y_0 = 0
$$

$$
\Rightarrow\; y_4 - 4y_3 + 6y_2 - 4y_1 + y_0 = 0
$$

$$
\Rightarrow\; 81 - 4y_3 + 6\times 9 - 4\times 3 + 1 = 0
$$

$$
\Rightarrow\; 81 - 4y_3 + 54 - 12 + 1 = 0
$$

$$
\Rightarrow\; y_3 = 31
$$

4.3 → এচন্দ অ্যাজেন্ট [uncertain: Bengali; appears to read "Echond agent"]

#### 3.24 (eg-8.3)

$$
\begin{aligned}
220 + 10E &= 20 - 10E\\
20E &= -200\\
E &= -10
\end{aligned}
$$

31-08-26

* proofs — Interpolation_final.docx

**Quiz-8** Interpolation

---

## Medha — page 28

(Sir) — 18-09-26

### Numerical Differentiation

(Balagurusamy ch-11)

$$
f(x) \xrightarrow[\text{given}]{\phantom{.}} \text{find } f'(x)
$$

f(x) → Tabular function

* **first order forward difference formula** — error $O(h)$

$$
f'(x) = \frac{f(x+h) - f(x)}{h}
$$

* **first order backward difference formula** — $h \to -h$

$$
f'(x) = \frac{f(x) - f(x-h)}{h}
$$

* **Second order central difference formula** — 3 point formula

$$
f'(x) = \frac{f(x+h) - f(x-h)}{2h}
$$

→ error ↓↓↓ , $O(h^2)$

If nothing mentioned, apply central diff formula

* Ex-11.1, 11.2, 11.3, 11.4

Second derivative, $f''(x) = \dfrac{f(x+h) - 2f(x) + f(x-h)}{h^2}$

* Tabular function → Ex- 11.5, 11.6

---

## Medha — page 29

For tabular function,

- three point forward difference formula, $f'(x) = \dfrac{-3f(x) + 4f(x+h) - f(x+2h)}{2h}$
- " " " backward difference formula, $f'(x) = \dfrac{3f(x) - 4f(x-h) + f(x-2h)}{2h}$
- " " " central difference formula, $f'(x) = \dfrac{f(x+h) - f(x-h)}{2h}$

also for double prime, $f''(x)$, $f'''(x)$, $f''''(x)$

(Ma'am)

### PCA

### Principal Component analysis

Overall operation decreases due to decrease of dimension.

- → samples & attributes will be given. ($6\times 2$ or $4\times 2$)
- → $x_1\;\; x_2$ — find average

$$
\text{avg}\{\vdots\}_{\text{avg}} \quad \text{avg} = \frac{(\text{cov}) + (\text{cov}) + \cdots}{\text{n}}
$$

- → Subtract avg from all values, so, that, origin becomes the avg.

[Sketch: two coordinate axes $x_1$, $x_2$ with $(x_{avg1}, x_{avg2})$ marked; arrow to a new pair of axes; on the right a table with columns $x_1\;\; x_2\;\; x_{avg1}$ / $x_{avg2}$ and rows of dashes]

---

## Medha — page 30

### Finding covariance matrix.

- $n$ — samples (column)
- $m$ — attributes (row)

⟹ in case of $2\times 2$:

$$
x = \underset{(\text{rows})}{m\times n} = 10\times 2
$$
$$
x^T = \underset{(\text{column})}{n\times m} = 2\times 10
$$

$n$ = column, attributes ; $m$ = row, samples ⟹ $x$ column

$$
\frac{1}{(m-1)}\,x^T x = \frac{1}{10-1}(2\times 10)\times(10\times 2)
$$
$$
= \frac{1}{9}(2\times 2) = 2\times 2 \quad \text{Covariance matrix } \Sigma
$$

Covariance matrix (attribute × attribute)

$$
\begin{bmatrix}
\text{var}(x_1) & \text{covar}(x_1, x_2)\\
\text{covar}(x_1, x_2) & \text{var}(x_2)
\end{bmatrix}
\;\Rightarrow\;
\begin{bmatrix}
\dfrac{\Sigma x_1^2}{m-1} & \dfrac{\Sigma x_1 x_2}{m-1}\\[6pt]
\dfrac{\Sigma x_1 x_2}{m-1} & \dfrac{\Sigma x_2^2}{m-1}
\end{bmatrix}
$$

$$
\Sigma = (1/m)\,x^T x =
\begin{bmatrix}
0.6166 & 0.6154\\
0.6154 & 0.7166
\end{bmatrix}
$$

calculate lambda

$$
\to\; \det(\Sigma - \lambda I) = 0
$$

$$
\to\; \left|
\begin{bmatrix}
0.6166 & 0.6154\\
0.6154 & 0.7166
\end{bmatrix}
-
\begin{bmatrix}
\lambda & 0\\
0 & \lambda
\end{bmatrix}
\right| = 0
$$

$$
\to\; \left|
\begin{matrix}
0.6166 - \lambda & 0.6154\\
0.6154 & 0.7166 - \lambda
\end{matrix}
\right| = 0
$$

$$
\to\; (0.6166 - \lambda)(0.7166 - \lambda) - 0.37871 = 0
$$

$$
\to\; 0.44185 - 0.6166\lambda - 0.7166\lambda + \lambda^2 - 0.37871 = 0
$$

$$
\to\; \lambda^2 - 1.3332\lambda + 0.06314 = 0
$$

---

## Medha — page 31

$$
\lambda = 1.284,\quad 0.0491
$$

↓
More variance can be captured.

$$
\begin{bmatrix} \ \\ \end{bmatrix}
\begin{bmatrix}
x_1\\ x_2
\end{bmatrix}
= 0
$$

— ①

— ②

find $x_1$, $x_2$, and unit vector — A normalization করতে হবে, বাস্তবে direction important, magnitude না (need to normalize A, in reality direction is important, not magnitude), Now we get direction only. Now we see if dimensionality reduction possible/not.

$\lambda$ এর বড় value গেলে PC1, ছোট value গেলে PC2 (the bigger value of λ gives PC1, the smaller gives PC2)

↓ কম বিশ্বাসে maximum variance capture করতে হবে PC2 (the least — PC2 must capture maximum variance)

$$
\therefore\; PC_1 = \begin{bmatrix} 0.678\\ 0.735\end{bmatrix}
\qquad
PC_2 = \begin{bmatrix} 0.735\\ -0.678\end{bmatrix}
$$

$\lambda_1$, $\lambda_2$ এর variation percentage:

$$
\eta_1 = \frac{1.284}{1.284 + 0.0491} = 0.963 = 96.3\%
$$
$$
\eta_2 = \frac{0.0491}{1.284 + 0.0491} = 0.037 = 3.7\%
$$

$$
\frac{\lambda}{\lambda_1 + \lambda_2}\times 100\%
$$

⟹ Variance capture — শতাংশ (percentage)

---

## Medha — page 32

(Sir) — 14-09-26

Shanker Rao, ch-9

### Numerical Integration

Derivation + math + imp

* Derive General Quadrature formula.
  - → Trapezoidal rule ($n = 1$)
  - → Simpson's $\frac{1}{3}$rd rule ($n = 2$)
  - → Simpson's $\frac{3}{8}$th rule ($n = 3$)
  - → Weddle's Rule ($n = 6$)

derivation \* → ডেরাইভ general quadrature, then উপরের থেকে প্রত্যেকটা বের করতে হবে (from these derive each one)

*\* Romberg integration (improved accuracy)

**Trape** → [Sketch: shaded region under a curve with a trapezium] — to integrate, find area

সব জায়না derive it from general quadrature formula, তবে general quadrature লাগে না (derive all from the general quadrature formula, but the general quadrature is not needed)

$$
\text{Trapezoidal rule} - I = \frac{h}{2}\Big[(y_0 + y_n) + 2(y_1 + y_2 + y_3 + \cdots + y_{n-1})\Big]
$$

$$
\text{Simpson's } \tfrac{1}{3}\text{rd rule} - I = \frac{h}{6}\Big[(y_0 + y_n) + 4\times(y_1 + y_3 + y_5 + \cdots) + 2\times(y_2 + y_4 + \cdots)\Big]
$$

$$
\text{Simpson's } \tfrac{3}{8}\text{-th rule} - I = \frac{3h}{8}\Big[(y_0 + y_n) + 3\times(y_1 + y_2 + y_4 + y_5 + y_7) + 2(y_3 + y_6 + \cdots)\Big]
$$

**Weddle's** → $0, n$
- even (but not 6n)
- odd (but not 3n)
- odd (3n)
- even (6n)

Maths — ex- 9.1 to 9.10

---

## Medha — page 33

(Sir)

### Romberg Integration

9.10
Ex- 9.14

Solve using any method taking intervals

$$
h,\ \frac{h}{2},\ \frac{h}{4}
$$

$$
\begin{array}{ccc}
& I(h)\\
& \searrow\\
I(h/2) &\nearrow & I(h, h/2)\\
\searrow & \nearrow & \text{higher accuracy}\\
I(h/4) &\nearrow & I(h/2, h/4)\\
& \searrow & I(h, h/2, h/4)\ \longrightarrow\ \text{higher accuracy}
\end{array}
$$

$$
I\left(h, \frac{h}{2}\right) = \frac{4I\left(\frac{h}{2}\right) - I(h)}{3}
$$

$$
I\left(\frac{h}{2}, \frac{h}{4}\right) = \frac{4I\left(\frac{h}{4}\right) - I\left(\frac{h}{2}\right)}{3}
$$

$$
I\left(h, \frac{h}{2}, \frac{h}{4}\right) = \frac{4I\left(\frac{h}{2}, \frac{h}{4}\right) - I\left(h, \frac{h}{2}\right)}{3}
$$

#### 9.14

0 - 1.2 ⟹ A -

at least 2 intervals, $h \Rightarrow \frac{h}{2} = 0.3$

4 intervals, $h/2 = 0.3$

8 intervals, $h/4 = 0.15$

---

## Medha — page 34

$$
I(0.6) = 0.8113
$$
$$
I(0.3) = 0.7943
$$
$$
I(0.15) = 0.7899
$$

$$
I\left(h, \frac{h}{2}\right) = I(0.6, 0.3) = \frac{4\times 0.7943 - 0.8113}{3} = 0.7886
$$

$$
I\left(\frac{h}{2}, \frac{h}{4}\right) = I(0.3, 0.15) = \frac{4\times 0.7899 - 0.7943}{3} = 0.7884
$$

$$
I\left(h, \frac{h}{2}, \frac{h}{4}\right) = I(0.6, 0.3, 0.15) = \frac{4\times 0.7884 - 0.7886}{3} = 0.7883
$$

(Ma'am)

[Sketch: axes with vectors $PC_1$, $PC_2$, $PC_3$; vertical axis labelled "height in cm", horizontal axis "height in cm"; angle marked "orthogonally"]

### Step-1 : Mean normalization. (mean টা centre A বিয়ে আসতে হবে)

### Step-2 : Covariance Matrix

- $\text{var}(x_1) \to x_1$ এর avg করে $x_1$ এর data গুলা বিস্তারে প্রসারিত হবে (spread হবে) (the average of $x_1$ is subtracted from $x_1$'s data, so the data spreads out)
- $\text{covar}(x_1, x_2) \to$ দুটো value দিয়ে dependent, relation কেমন? (using the two values, how dependent / what is the relation?)

here, $0.6154 \to$ co-relation high, so highly dependent.

---

## Medha — page 35

### Step-3 :

eigen value & vector বের করতে হবে (have to find the eigenvalue & vector)

eigen vector → যেই value এর সাথে direction same

### Step 4 :

find the eigen vector corresponding to the eigen value. $(\Sigma - \lambda I)\begin{bmatrix} x \end{bmatrix} = 0$

then find $x_1$, $x_2$, and find unit vector.

### Step-5 :

Reduce dimensionality (Variance Calculation) (check if reduction is possible)

**1st case,**

92% variance is enough to capture,

$$
\lambda_1 = 96.3\%,\qquad \lambda_2 = 3.7\%
$$

so, for this, only $\lambda_1$ can be considered.

So, feature vector was $2\times 2$, Now, it becomes $2\times 1$.

$$
\therefore\; 10\times 1 \;\to\; 2.5\times 0.678 + 2.4\times 0.735 = 3.459 \;\to\; \text{projection point}
$$

**2nd case,**

98% variance needed, so, we cannot discard $\lambda_2$

$2\times 2$ stays.

$\therefore\; 10\times 2$ stays. For this percentage we cannot reduce the dimensionality.

projection points

$$
\begin{cases}
2.5\times 0.678 + 2.4\times 0.735\\[4pt]
2.5\times 0.7 + 2.4\times 0.8
\end{cases}
$$

### Step 6 : Projection point

---

## Medha — page 36

### Step-7 : Reconstruct 2D from 1D

[Sketch: $Y$ axis with $3.459$ marked; $10\times 1$]

$$
V = \boxed{0.678\;\;0.735}
$$

$$
\begin{array}{c}
1\times 2\\ \hline
\end{array}
$$

$$
\therefore\; 10\times 1,\; 1\times 2
$$
$$
= 10\times 2
$$

$$
3.459 \times 0.678 \qquad 3.459 \times 0.735
$$

Error comes as, we discard the $\lambda_2$. We can also have to find MSE, SSE, RMSE — etc.

### Age | Salary

**Step-1 : Mean normalization + Scaling** (do)

↓ after mean normalization → find standard deviation,

- $-10, 0, 10$ ; $-1000, 0, 1000$ (scaling ব্যবহার করতে হবে — scaling must be used)
- or, এমন করে scaling করতে হবে (scaling must be done like this)
- এর, 2nd can feel like huge variance. (the 2nd one can feel like huge variance)

### Q. feature-2, sample-4/6

If said to find feature vector, do upto step-4
If said only $PC_1$, only eigen vector for large $\lambda$ needed
If said dimensionality reduce possible? — variance দিয়ে বুঝতে হবে possible/not
If " " " " and find $Y$? — find upto $Y$ (after reduction)
If " " " reconstruct? do all.

or covar matrix might be given, then do upto end.
