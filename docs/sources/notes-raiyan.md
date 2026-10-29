# Handwritten Class Notes — "Numerical Cred-1" and "Numerical Cred-2" (Raiyan)

Faithful transcription of the scanned handwritten class-note PDFs in `ClassNotes/`.
Formulas are written in LaTeX; the author's own row-operation notation is preserved verbatim.
`[illegible]` / `[uncertain: …]` mark content that could not be read confidently.

## Cred-1 — page 1

**Credit-1** (heading, underlined)

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33}
\end{bmatrix}
\qquad \text{upper triangular}
$$

$ax + by =$ (nothing after the sign)

**System of linear equation solve:**

**Naive gauss [crossed-out word] elimination:**

$$
\begin{aligned}
R_1 \quad & x - 3y + z = 4 && \text{— (i)} \quad \text{pivot row} \\
R_2 \quad & 2x - 8y + 8z = -2 && \text{— (ii)} \quad \text{elimination row} \\
R_3 \quad & -6x + 3y - 15z = 9 && \text{— (iii)} \quad \text{elimination row}
\end{aligned}
$$

① **Forward [crossed-out text] elimination:**

Step-1:

$$
\begin{aligned}
R_2' \to R_2 + \text{Pivot} * R_1 \qquad & = R_2 * \left(\frac{-2}{1}\right) * R_1 \\
& = R_2 - 2 R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
2x - 8y + 8z &=& -2 \\
-2x + 6y - 2z &=& -8 \\
\hline
0 - 2y + 6z &=& -10 \quad \text{— (2')}
\end{array}
$$

$$
\begin{aligned}
R_3' \to R_3 + \text{Pivot} * R_1 \qquad & = R_3 * \left(\frac{-6}{1}\right) * R_1 \\
& = R_3 + 6 R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
-6x + 3y - 15z &=& 9 \\
-6x + 18y + 6z &=& 24 \\
\hline
0 - 15y - 9z &=& 33 \quad \text{— (3')}
\end{array}
$$

## Cred-1 — page 2

$$
\begin{aligned}
x - 3y + z &= 4 \\
0 - 2y + 6z &= 10 \qquad \text{(pivot row)} \\
0 - 5y - 3z &= 1 \qquad \text{(elimination row)}
\end{aligned}
$$

$$
\begin{array}{rcl}
-5y - 3z &=& 1 \\
5y + 15z &=& 25 \\
\hline
0 - 18z &=& 26
\end{array}
$$

$$
\begin{aligned}
R_3'' = R_3 + \left(\frac{-5}{-2}\right) R_2' \qquad & = R_3' + \frac{5}{2} R_2'
\end{aligned}
$$

$-z = 2$

$$
\underbrace{\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33}
\end{bmatrix}}_{A}
\underbrace{\begin{bmatrix}
x_1 \\ x_2 \\ x_3
\end{bmatrix}}_{X}
=
\underbrace{\begin{bmatrix}
b_1 \\ b_2 \\ b_3
\end{bmatrix}}_{B}
\tag{iii}
$$

"have to show calculation clearly"

**Partial pivoting**

$$
\begin{aligned}
2x_2 + 3x_3 &= 8 \\
4x_1 + 6x_2 + 7x_3 &= -3 \\
2x_1 - 3x_{[uncertain: 2 \text{ or } 3]} + 6x_3 &= 05
\end{aligned}
$$

Bengali (transliterated): "Swap করতে হবে, না হলে Division by zero." (Swap has to be done, otherwise division by zero.)
"Max $x_1$ এর coeff … এর সবচেয়ে swap, না হলে কারণ হবে value আসবে $\frac{7}{0.999}$ [uncertain: denominator may read 0.799]."

## Cred-1 — page 3

$$
\begin{aligned}
x + 3y + 2z &= 13 \\
2x + y + 4z &= 16 \\
4x + 2y + z &= 11
\end{aligned}
$$

**H.W** (underlined) **Partial elimination** (underlined)

Bengali margin notes (faint):

- "[…] এর coefficient সবচেয়ে বড়" (of […] the largest coefficient)
- "$x$ ← coefficient সবচেয়ে ← $1.01$ · গে"
- "$x$ ← ″ coefficient সবচেয়ে ← $2.01$"
- "$y$ ← ″ coefficient সবচেয়ে ← $[uncertain: 4.01 \text{ or } 2.01]$"
- "$z + 1.0$ ← ″ coefficient সবচেয়ে ← $2.01$"

Bengali (transliterated): "x বা y বা z এর coefficient সবগুলো সমান হলে যে coefficient এর সাথে সমান হবে কোনটা" — [page mainly in Bengali; mathematical content transcribed above]

## Cred-1 — page 4

**Credit-1** (underlined)

**Gauss Jordan method:** (reduced echelon) — underlined

$$
\begin{aligned}
2x_1 + 4x_2 + 6x_3 &= 18 \\
4x_1 + 5x_2 + 6x_3 &= 24 \\
3x_1 + x_2 - 2x_3 &= -4
\end{aligned}
$$

$$
R_1' \to \frac{R_1}{2}
$$

$$
\begin{aligned}
x_1 + 2x_2 + 3x_3 &= 9 \\
4x_1 + 5x_2 + 6x_3 &= 24 \\
3x_1 + [uncertain: 8] x_2 - 2x_3 &= -4
\end{aligned}
$$

$$
R_2' = R_2 - 4R_1
$$

$$
\begin{array}{rcl}
4x_1 + 5x_2 + 6x_3 &=& 24 \\
-4x_1 - 8x_2 - 12x_3 &=& -36 \\
\hline
-3x_2 - 6x_3 &=& -12
\end{array}
$$

**Step-3:**

$$
R_3' = R_3 + \left(\frac{-3}{1}\right) R_1
$$

$$
\begin{array}{rcl}
3x_1 + x_2 - 2x_3 &=& 4 \\
-3x_1 - 6x_2 - 9x_3 &=& -27 \\
\hline
-5x_2 - 11x_3 &=& -23
\end{array}
$$

## Cred-1 — page 5

"-5 এরকমও -5 টা swap হবে" (even if it is -5, the -5 will be swapped)
"sign not a factor"

**Solve the following system of linear equation using Gauss Jordan with partial pivoting -**

$$
\begin{aligned}
2x + y - z &= 3 \\
5x - 3y + 2z &= 9 \\
-x + 4y + 3z &= -9
\end{aligned}
$$

$$
R_2 \leftrightarrow R_1
$$

$$
\begin{aligned}
5x - 3y + 2z &= 9 \\
2x + y - z &= 3 \\
-x + 4y + 3z &= -9
\end{aligned}
$$

$$
\begin{bmatrix}
1 & -\frac{3}{5} & \frac{2}{5} \\
2 & 1 & -1 \\
-1 & 4 & 3
\end{bmatrix}
\begin{bmatrix}
\frac{9}{5} \\ 3 \\ -9
\end{bmatrix}
$$

Right-hand annotations:

$$
\begin{aligned}
R_1' &= \frac{R_1}{5} \\
R_2 &= R_1 \times -2 + R_2 \\
R_3 &= R_1 \times 1 + R_3
\end{aligned}
$$

(Bengali, underlined: "শুধু পাশে" — "only on the side")

$$
\begin{bmatrix}
1 & -\frac{3}{5} & \frac{2}{5} \\
0 & \frac{11}{5} & -\frac{9}{5} \\
0 & \frac{17}{5} & \frac{17}{5}
\end{bmatrix}
\begin{bmatrix}
\frac{9}{5} \\[uncertain: \text{value before } -\tfrac{54}{5} \text{ is overwritten}] \\
-\frac{3}{5} \\
-\frac{54}{5}
\end{bmatrix}
$$

$$
\begin{bmatrix}
1 & -\frac{3}{5} & \frac{2}{5} \\
0 & \frac{17}{5} & \frac{17}{5} \\
0 & \frac{11}{5} & -\frac{3}{5}
\end{bmatrix}
\begin{bmatrix}
\frac{9}{5} \\
\frac{54}{5} \\
-\frac{3}{5}
\end{bmatrix}
$$

## Cred-1 — page 6

$$
\begin{bmatrix}
1 & -\frac{3}{5} & \frac{2}{5} \\
0 & 1 & 1 \\
0 & \frac{11}{5} & -\frac{9}{5}
\end{bmatrix}
\begin{bmatrix}
\frac{9}{5} \\
\frac{54}{17} \\
-\frac{3}{5}
\end{bmatrix}
$$

$$
R_3' = -R_2 \times \frac{11}{5} + R_3
$$

$$
\begin{bmatrix}
1 & -\frac{3}{5} & \frac{2}{5} \\
0 & 1 & 1 \\
0 & 0 & -4
\end{bmatrix}
\begin{bmatrix}
\frac{9}{5} \\
\frac{54}{17} \\[uncertain: \text{value above } -\tfrac{129}{17} \text{ is scribbled out}] \\
-\frac{129}{17}
\end{bmatrix}
$$

$$
\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 1 \\
0 & 0 & -4
\end{bmatrix}
\begin{bmatrix}
\frac{63}{17} \\
\frac{54}{17} \\
-\frac{129}{17}
\end{bmatrix}
$$

$$
\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 1 \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
\frac{63}{17} \\
\frac{54}{17} \\
\frac{129}{68}
\end{bmatrix}
$$

$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1.808 \text{ [crossed out]} \quad \frac{123}{68} \\
1.279 \quad \frac{87}{68} \\
\frac{129}{68} \quad \frac{129}{68}
\end{bmatrix}
$$

## Cred-1 — page 7

**H.W** (double underlined)

$$
\begin{aligned}
2x + y - z &= 3 \\
5x - 3y + 2z &= 9 \\
-x + 4y + 3z &= -9
\end{aligned}
$$

[boxed] একটা + [boxed] সমাধান

$$
R_2 \leftrightarrow R_1
$$

$$
\begin{aligned}
5x - 3y + 2z &= 9 \\
2x + y - z &= 3 \\
-x + 4y + 3z &= -9
\end{aligned}
$$

$$
\begin{aligned}
R_1:\;& 5x - 3y + 2z = 9 && \text{নির্ণেয় (pivot row)} \\
R_2:\;& 2x + y - z = 3 && \text{নির্ণয়কারী (eliminating row)} \\
R_3:\;& -x + 4y + 3z = -9 && \text{যুক্তকারী} \text{ [uncertain: word partly unclear]}
\end{aligned}
$$

Right margin: "H.M" (underlined); faint "them 2-g"; boxed "একটা" + boxed "সমাধান".

[The lower and right portions of this page are mirrored text showing through from the back of the sheet — not part of this page.]

## Cred-1 — page 8

$$
R_1 \to R_1 / 5
$$

$$
\begin{aligned}
R_1:\;& x - \frac{3}{5}y + \frac{2}{5}z = \frac{9}{5} \\
R_2:\;& 2x + y - z = 3 \\
R_3:\;& -x + 4y + 3z = 9
\end{aligned}
$$

$$
\begin{aligned}
R_2' \to R_2 + \frac{-2}{1} R_1 \qquad & = R_2 - 2R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
2x + y - z &=& 3 \\
-2x + \frac{6}{5}y - \frac{4}{5}z &=& -\frac{18}{5} \\
\hline
\frac{11}{5}y - \frac{9}{5}z &=& -\frac{3}{5}
\end{array}
$$

$$
R_2' \Rightarrow 11y - 9z = -3
$$

$$
\begin{aligned}
R_3' \to R_3 + \frac{-(-1)}{1} R_1 \qquad & \Rightarrow R_3 + R_1
\end{aligned}
$$

$$
\begin{array}{rcl}
-x + 4y + 3z &=& 9 \\
x - \frac{3}{5}y + \frac{2}{5}z &=& \frac{9}{5} \\
\hline
\frac{17}{5}y + \frac{17}{5}z &=& \frac{54}{5}
\end{array}
$$

$$
\Rightarrow 17y + 17z = 54
$$

## Cred-1 — page 9

$$
\begin{aligned}
R_1:\;& x - \frac{3}{5}y + \frac{2}{5}z = \frac{9}{5} \\
R_2:\;& 11y - 9z = -3 \\
R_3:\;& 17y + 17z = 54
\end{aligned}
$$

$$
R_2 \leftrightarrow R_3
$$

$$
\begin{aligned}
R_1:\;& x - \frac{3}{5}y + \frac{2}{5}z = \frac{9}{5} \\
R_2:\;& \text{[crossed-out mark]} \; 17y + 17z = 54 \\
R_3:\;& 11y - 9z = -3
\end{aligned}
$$

$$
R_2 / 17 \Rightarrow
$$

$$
\begin{aligned}
R_1:\;& x - \frac{3}{5}y + \frac{2}{5}z = \frac{9}{5} \\
R_2:\;& 1y + 1z \qquad (1-1) = \frac{54}{17} \\
R_3:\;& 11y - 9z = -3
\end{aligned}
$$

$$
\begin{aligned}
R_1' \longrightarrow R_1 + \frac{+3/5}{1} R_2 \qquad & = R_1 + \frac{3}{5} R_2
\end{aligned}
$$

## Cred-1 — page 10

$$
\begin{array}{rcl}
\text{[crossed out]}\quad x - \frac{3}{5}y + \frac{2}{5}z &=& \frac{9}{5} \\
\frac{3}{5}y + \frac{3}{5}z &=& \frac{162}{85} \\
\hline
x &+ 2z &=& \frac{63}{17}
\end{array}
$$

$$
R_3' \to R_3 + \frac{-11}{1} R_2
$$

$$
\begin{array}{rcl}
11y - 9z &=& -3 \\
-11y - 11z &=& \frac{-594}{17} \\
\hline
-20z &=& \frac{-545}{17}
\end{array}
$$

$$
z = \frac{\text{[scribbled digit]}645}{17 \times 20} = \frac{129}{68}
$$

$$
\begin{aligned}
R_1:\;& x &+ z &=& \frac{63}{17} \\
R_2:\;& & y + z &=& \frac{54}{17} \\
R_3:\;& & & z &=& \frac{129}{68}
\end{aligned}
$$

## Cred-1 — page 11

$$
R_1 \to R_1 + \frac{-(+1)}{1} R_3
$$

$$
\begin{array}{rcl}
x + z &=& \frac{63}{17} \\
- z &=& \frac{-129}{68} \\
\hline
x &=& \frac{123}{68}
\end{array}
$$

(or)

$$
R_2 \to R_2 + \frac{-1}{1} R_3
$$

$$
\begin{array}{rcl}
y + z &=& \frac{54}{17} \\
- z &=& \frac{-129}{68} \\
\hline
y &=& \frac{87}{68}
\end{array}
$$

$$
\therefore x = \frac{123}{68}, \qquad y = \frac{87}{68}, \qquad z = \frac{129}{68}
$$

## Cred-1 — page 12

**Iterative** (double underlined)

Bengali (transliterated): "অনেক methods থেকে $O(n^3)$ লাগে" (many methods take $O(n^3)$); "sparse matrix এরকমও + Iterative." (sparse matrix also + Iterative).

Left margin (in English, with a brace pointing at the equations): "maximum element zero"

$$
\begin{aligned}
a_{11}x + a_{12}y + a_{13}z &= b_1 \\
a_{21}x + a_{22}y + a_{23}z &= b_2 \\
a_{31}x + a_{32}y + a_{33}z &= b_3
\end{aligned}
$$

$$
x = \frac{b_1 - a_{12}y - a_{13}z}{a_{11}}
$$

$$
y = \frac{b_2 - a_{21}x - a_{23}z}{a_{22}}
$$

$$
z = \frac{\text{[illegible — written very faintly]}}{\text{[illegible]}}
$$

Right margin: ": id 1235" (underlined) [uncertain]

**Iterative method sufficient condition for converging:** The strictly diagonally dominant

## Cred-1 — page 13

**Hard** (underlined)

$$
\begin{aligned}
|a_{11}| &> |a_{12}| + |a_{13}| \\
|a_{22}| &> |a_{21}| + |a_{23}| \\
|a_{33}| &> |a_{31}| + |a_{32}|
\end{aligned}
$$

Right-hand note (with a brace joining the three inequalities): "all case & three হলে, it will must converge. else it might converge. no guaratee."

"Swap করতে হবে case three করার + my করবে।" (Swap has to be done; in the three-case [one] I will do it.)

**Jacobi:** (underlined)

$$
\begin{aligned}
5x + 2y + z &= 12 \\
x + 4y + 2z &= 15 \\
x + 2y + 5z &= 20
\end{aligned}
$$

$$
\begin{aligned}
x &= \frac{12 - 2y - z}{5} \\
y &= \frac{15 - x - 2z}{4} \\
z &= \frac{20 - x - 2y}{5}
\end{aligned}
$$

**Initial value,** $x^{(0)} = y^{(0)} = z^{(0)} = 0$ (annotation "this number" with an arrow pointing at $x^{(0)}$)

## Cred-1 — page 14

"Iteration stop করতে হবি value সমন্বয়, or tolerable error এর মাপটা may হয়।" (transliterated)

**Iteration-1:**

$$
\begin{aligned}
x^{(1)} &= \frac{12}{5} = 2.4 \\
y^{(1)} &= \frac{15}{4} = 3.75 \\
z^{(1)} &= \text{[crossed-out mark]}\; \frac{20}{5} = 4
\end{aligned}
$$

**Iteration-2:**

$$
x^{(2)} = \frac{12 - 2y^{(1)} - z^{(1)}}{5} = \frac{12 - 2 \times 3.75 - 4}{5} = 0.1
$$

$$
y^{(2)} = 1.15
$$

$$
z^{(2)} = \text{[crossed-out mark]}\; 2.02
$$

$$
x^{(3)} = \frac{12 - 2 \times 1.15 - 2.02}{5} = 1.513
$$

$$
y^{(3)} = \frac{15 - 0.1 - 2 \times 2.02}{4} = 2.715
$$

$$
z^{(3)} = \frac{20 - 0.1 - 2 \times 1.15}{5} = 3.52
$$

Right margin: $\varepsilon_m = |2.4 - 0.1| = 2.3$

## Cred-1 — page 15

"error এর ক্ষেত্রে বললে show করতে হবে না," (transliterated)

**[scribbled-out word] Seidel : faster** (underlined)

$$
x^{(1)} = \frac{12 - 2 \times 0 - 0}{5} = 2.4
$$

$$
y^{(1)} = \frac{15 - x^{(1)} - 2z^{(0)}}{4} = \frac{15 - 2.4 - 2 \times 0}{4} = 3.15
$$

$$
z^{(1)} = \frac{20 - x^{(1)} - 2y^{(1)}}{5} = \frac{20 - 2.4 - 2 \times 3.15}{5} = 2.26
$$

(the $z^{(1)}$ line is struck through)

$$
\begin{aligned}
x^{(2)} &= 0.69 \\
y^{(2)} &= 2.45 \\
z^{(2)} &= 2.88
\end{aligned}
$$

$$
x^{(3)} = \frac{12 - 2 \times 2.45 - 2.88}{5} = 0.844
$$

$$
y^{(3)} = \frac{15 - 0.844 - 2 \times 2.88}{4} = 2.099
$$

$$
z^{(3)} = \frac{20 - 0.844 - 2 \times 2.099}{5} = 2.9916
$$

Right margin: "1 - iteration" (underlined); "2 - iteration"; "1.1 =" [uncertain]

## Cred-1 — page 16

**Credit-1** (underlined)

$$
A = L U
$$

$$
\underbrace{L}_{\text{lower triangle}} \quad \underbrace{U}_{\text{upper triangle}}
$$

$$
An = b
$$

$$
\begin{array}{lcccc}
& b_1 & b_2 & b_3 & b_4 \\
2x + y + z = 30 & 40 & 40 & 40 \\
3x + 2y + 4z = 40 & 40 & 40 & 30 \\
4x + 5y + 6z = 20 & 20 & 15 & 20
\end{array}
$$

Bengali (transliterated): "ওপরের constant term different. $b$ এর term different এর কতো হয় হবে $An = b$ solve করতে হবে gauss elimination দিয়ে।" (The constant terms above are different — how many $b$ terms there are; $An = b$ has to be solved by gauss elimination.)

**LU Decomposition / triangular factorization** দিয়ে একটা $Ax = b$ solve করে যাকি $b$ এর জন্য কতো লাগবে লাগবে না। (transliterated)

## Cred-1 — page 17

$$
[A]\{x\} = \{b\}
$$

$$
\underbrace{[L][U]}_{\downarrow \;\downarrow} \{x\} = \{b\} \qquad
\begin{matrix} \downarrow & \searrow \\ [L]\{d\} = \{b\} \end{matrix}
$$

$$
[U]\{x\} = \{d\}
$$

$$
L = \begin{bmatrix}
1 & 0 & 0 \\
l_{21} & 1 & 0 \\
l_{31} & l_{32} & 1
\end{bmatrix}
\qquad
U = \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33}
\end{bmatrix}
$$

$$
= \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
l_{21}u_{11} & l_{21}u_{12} + u_{22} & l_{21}u_{13} + l_{32}u_{23} + u_{33} \text{ [partly struck through]} \\
l_{31}u_{11} & l_{32}u_{22} + l_{31}u_{12} & l_{31}u_{13} + l_{32}u_{23} + u_{33}
\end{bmatrix}
$$

"Do little method" (with an arrow pointing up at the product matrix)

## Cred-1 — page 18

$$
\begin{aligned}
x_1 + x_2 + x_3 &= 1 \\
4x_1 + 3x_2 - x_3 &= 6 \\
3x_1 + 5x_2 + 3x_3 &= 4
\end{aligned}
$$

**Ans:**

$$
A = \begin{bmatrix}
1 & 1 & 1 \\
4 & 3 & -1 \\
3 & 5 & 3
\end{bmatrix}
$$

$$
\{b\} = \{x\}[U]
$$

$$
l_2 = 4
$$

Two faint matrices side by side (elements only partly legible; faint index labels beside the rows — "21U", "22U", "22J" on the left matrix and "12U", "12J", "13J" on the right matrix):

$$
\begin{bmatrix}
\text{[illegible]} & 1 & 1 \\
\text{[illegible]} & 1 & 0 \\
\text{[illegible]} & 0 & 0
\end{bmatrix}
\qquad
\begin{bmatrix}
0 & 0 & 1 \\
0 & 1 & 1 \\
1 & 0 & 1
\end{bmatrix}
$$

$$
4 \times 1 + U_{22} = 3
$$

$$
U_{22} = \text{[scribbled]} - 1 \quad \text{[uncertain]}
$$

$$
4 \times 1 + U_{23} = -1
$$

$$
U_{23} = -1 - 5
$$

(later, at the bottom of the page)

$$
l_{31} = 3
$$

with the note "bottom 4U + 1" [uncertain]

## Cred-1 — page 19

$$
L = \begin{bmatrix}
1 & 0 & 0 \\
4 & 1 & 0 \\
3 & -2 & 1
\end{bmatrix}
\qquad
U = \begin{bmatrix}
1 & 1 & 1 \\
0 & -1 & -5 \\
0 & 0 & -10
\end{bmatrix}
$$

$$
L \, . \, d = b
$$

$$
\begin{bmatrix}
1 & 0 & 0 \\
4 & 1 & 0 \\
3 & -2 & 1
\end{bmatrix}
\begin{bmatrix}
d_1 \\ d_2 \\ d_3
\end{bmatrix}
=
\begin{bmatrix}
1 \\ 6 \\ 4
\end{bmatrix}
$$

$$
\begin{aligned}
d_1 &= 1 \\
d_2 &= 2 \\
d_3 &= 5
\end{aligned}
$$

## Cred-1 — page 20

$$
[U]\{x\} = \{d\}
$$

$$
\begin{bmatrix}
1 & 1 & 1 \\
0 & -1 & -5 \\
0 & 0 & -10
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ x_3
\end{bmatrix}
=
\begin{bmatrix}
1 \\ 2 \\ 5
\end{bmatrix}
$$

$$
x_3 = -\frac{1}{2}
$$

$$
x_2 = 2
$$

$$
x_1 = \begin{bmatrix} 1 \\ 2 \\ 5 \end{bmatrix}
= \begin{bmatrix} d_1 \\ d_2 \\ d_3 \end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
1 & 0 & 0
\end{bmatrix}
$$

## Cred-1 — page 21

**end-1** (underlined)

**PCA** (underlined)

"attribute" [struck through] (Bengali: অ্যাট্রিবিউট)

$$
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$

"features করতে" — $x_1$ and $x_2$ দুটো আলাদা features

Bengali (transliterated): "মাথার আগে 2 টা reduce করতে পারিনা dimension করে।"

A faint bracketed matrix follows (entries illegible):

$$
\begin{bmatrix}
\text{[illegible]} & \text{[illegible]} \\
\text{[illegible]} & \text{[illegible]}
\end{bmatrix}
$$

"round off error তে একটা fully linear হয় না"

"$x_1$ and $x_2$ এর average বের করতে হবে,"

$$
\begin{aligned}
x_1 \text{ এর } & x_1 \text{ এর average বাদ} \\
x_2 \text{ " } & x_2 \text{ " } \text{ " } \text{ " }
\end{aligned}
$$

$\}$ "Origin বেরবে line"

$$
\frac{1}{m-1} x^T * \begin{bmatrix}
\text{[illegible]} & \text{[illegible]} \\
\text{[illegible]} & \text{[illegible]}
\end{bmatrix} = x
$$

Left margin note pointing at the factor $\frac{1}{m-1}$: "number of data column attributes"

$$
\begin{bmatrix}
\operatorname{var}(x_1) & \operatorname{covar}(x_1, x_2) \\
\operatorname{covar}(x_1, x_2) & \operatorname{var}(x_2)
\end{bmatrix}
$$

- arrow under $\operatorname{covar}(x_1,x_2)$: "$x_1$ and $x_2$ দুটোই strongly এর সাথে correlated"
- arrow under $\operatorname{var}(x_2)$: "mean এর সাথে average দিয়ে কোনোদিকে aligned"

"projection error কমাতে also variation বাড়াতে PC-1"

"PC1 এর orthogonal ও প্রতিটা PC-2"

## Cred-1 — page 22

$$
\det(\Sigma - \lambda I) = 0
$$

("A.P" underlined, at the right)

$$
\Rightarrow \begin{bmatrix}
0.6166 & 0.6154 \\
0.6154 & 0.7166
\end{bmatrix} - \lambda \begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix} = 0
$$

$$
\Rightarrow \begin{bmatrix}
0.6166 - \lambda & 0.6154 \\
0.6154 & 0.7166 - \lambda
\end{bmatrix} = 0
$$

$$
\Rightarrow (0.6166 - \lambda)(0.7166 - \lambda) - 0.6154 \times 0.6154 = 0
$$

$$
\Rightarrow 0.4418556 - 0.6166\lambda - 0.7166\lambda + \lambda^2 - 0.3787172 = 0
$$

$$
\Rightarrow \lambda^2 - 1.3332\lambda + 0.0631384 = 0
$$

$$
\lambda = 1.284027858
$$

and

$$
\lambda = 0.04917214187
$$

Right margin: "$\frac{1}{m-1}$" (with an arrow and the note "number of data column attributes"); faint notes "$(1.41)^2$", "$(1.98)^2$", "$(1.98)^2$"

## Cred-1 — page 23

**Cred-1** (underlined)

**Step-1:** (underlined) Mean normalization

[Sketch: a scatter plot with axes and a straight line through the plotted points; one point is labelled "$(1.81, 1.91)$"]

[Second sketch: a set of axes with the origin marked by an asterisk/star, and the points redistributed]

"coordinate changed"

**Step-2:** (underlined)

covariance matrix:

$$
\frac{1}{m-1} x^T * x
$$

$m$ = no. of samples
$n$ = no. of features

$$
\frac{1}{10-1} \times 2 \times 10 * 10 \times 2
$$

$$
= 2 \times 2 \qquad \rightarrow\; \text{2 টা feature এর জন্য}
$$

$3 \times 3$ → 3 টা feature এর জন্য

## Cred-1 — page 24

$$
\begin{bmatrix}
\operatorname{var}(x_1) & \operatorname{covar}(x_1, x_2) \\
\operatorname{covar}(x_1, x_2) & \operatorname{var}(x_2)
\end{bmatrix}
$$

Notations noted beside it: $\Sigma$, $\bar\Sigma$; "coefficient" (struck through); "1.25000 = $\bar{x}$"; "$\bar{x}_1\; 00 = \bar{x}$"

$\operatorname{var}(x_1) = x_1$, Avg থেকে $x_1$ এর data স্কেল করতে (উপরে দেওয়া মান ব্যবহার করে)

$\operatorname{var}(x_2) = x_2$, Avg থেকে $x_2$ এর data স্কেল করতে

$\operatorname{covar}(x_1, x_2) = x_1, x_2$ দুটোই co related. (এর ধারণা ব্যাখ্যা করতে হবে।)

"covan করতে হবে পরিমাপ PCA করতে।"

**Step-3:** (underlined)

**eigen vector:** direction (যে দিকে direction ও max variation)

**eigen value:** max spread

$$
Av = \lambda v
$$

$$
\begin{matrix}
\frac{1}{2} & \frac{2}{4} \\
2 & \begin{bmatrix} 1 \\ 2 \end{bmatrix}
\end{matrix}
$$

## Cred-1 — page 25

"covariance matrix" (with an arrow pointing to $\Sigma$)

$$
\Sigma v = \lambda v
$$

$$
\det(\Sigma - \lambda I) = 0
$$

$$
\begin{aligned}
\lambda_1 &= 1.28402 \quad (\text{maximum variation}) \\
\lambda_2 &= 0.04917
\end{aligned}
$$

**Step-4:** (underlined)

প্রথম solve equations:-

$$
\begin{bmatrix}
1 \\
1.0845
\end{bmatrix}
$$

$$
x_1 = 1, \qquad x_2 = 1.0845
$$

normalizing it with unit vector

$$
\frac{1}{\sqrt{1^2 + (1.0845)^2}}, \qquad \frac{1.0845}{\sqrt{1^2 + (1.0845)^2}}
$$

$$
\begin{bmatrix}
0.678 \\
0.735
\end{bmatrix}
$$

"maximum variation is capture করতে।" → so PC1

$\lambda_2 = 0.04917$ এর জন্য same process করে PC2

$$
\begin{bmatrix}
0.735 \\
-0.678
\end{bmatrix}
$$

## Cred-1 — page 26

$$
\begin{array}{cc}
\text{PC}_1 & \text{PC}_2 \\
\begin{bmatrix}
0.678 & 0.735 \\
0.735 & -0.678
\end{bmatrix}
\end{array}
$$

(arrows to the right with the Bengali notes "প্রথম বৈশিষ্ট্য" and "হয়তো বৈশিষ্ট্য" [uncertain])

**Step-5:** (underlined) find variance

কোনটা কতটুকু variance captures,

$$
\frac{1.284}{\lambda_1 + \lambda_2}
$$

$$
\frac{1.284}{1.284 + 0.0492} = 96.3\%
$$

$$
\frac{0.0492}{1.284 + 0.0492} = 3.7
$$

"95% variance নাহলে question ও বলা প্রয়োজন"

"$PC_1 = 96.3\%$ হলে so 1st PC1 দিয়েই করতে পারবো।"

$$
Y = X * V_1
$$

$$
\begin{matrix}
10 \times 2 \\
2 \times 1 \\
= 10 \times 1 \;(1D)
\end{matrix}
$$

**Step-6:** (underlined)

projection point বের করার

transformed point = projection point

## Cred-1 — page 27

$$
\begin{cases}
\text{mean} \\
\text{root}
\end{cases}
\left\{
\begin{array}{l}
SSE \\
MSE \\
RMSE
\end{array}
\right.
$$

"reconstructing to original point"

"from transformed point"

**Q. Mean normalization**

mean scaling করতে হবে

| Age | Salary |
|---|---|
| 20 | 20 000 |
| 30 | 30 000 |
| 40 | 40 000 |
| — | — |
| 30 | 30 000 |
| — | — |
| $-10, 0, 10$ | $-10000, 0, 10000$ |

$$
X = Y
$$

"standard deviation নিয়ে হবে।" / "standard deviation নিচে হবে।"

"Page-2 (0.93) - 1.77)"

"mean normalization" (underlined) — "standard deviation"

## Cred-1 — page 28

**a)** (circled)

| Product | Price | weight |
|---|---|---|
| 1 | 40 | 70 |
| 2 | 53 | 65 |
| 3 | 32 | 10 |

"Derive the feature vector by applying PCA"

**Ans:**

"Step-4 অর্ধেক করা আসবে।" (right margin: "Q এর ২ বললে")

**Step-1:** Mean normalization + scaling

**Step-2:** Co-variance matrix $\Sigma = \frac{1}{m-1} x^T x$

**Step-3:** Find eigen value

$$
\det(\Sigma - \lambda I) = 0
$$

$\rightarrow$ এর value সাব সব সমে কোন সাই vector বের করতে হবি সদি only PC1 রান

**Step-4:** এ Find eigen vector

$$
(\Sigma - \lambda I)x = 0
$$

unit vector normalization

## Cred-1 — page 29

"(15 - 20 minute)"

**Step_5:** variance

**Step 6:** Projection point

**Step-7:** Reconstruct into original points and find error.

**Q. PCA-1 calculate only.**

only largest value এর জন্য

vector বের করতে হবে।

variance এর $\lambda$ থেকে সবচেয়ে বড় value আসবে।

Question এর যেকোনো কোন variance এখানে বলেছে যে 2d to 1D একটা পারবে, না

**Q.** ① step-1 to step-5

**Q.** step-3 to [illegible]

## Cred-1 — page 30

$3 \times 2$

**Q. Ans:**

| Price | weight |
|---|---|
| 4 [uncertain: may be 40] | 70 |
| 53 | 65 |
| 32 | 10 |
| — | — |
| 85 [uncertain: overwritten — may read 85 / 89 / 90] | 145 |

$$
(-85, -36, -57) \qquad (-75, -80, -135)
$$

**co-variance matrix:**

(the first attempt at the covariance matrix is crossed out with a long stroke; only fragments of the entries are legible — a first bracket containing $[$, $8$, (scribbled), $328$ ; $58$, $680$, $50$ and a second bracket containing $70$, $65$, $32$, $10$, with several entries struck through)

$$
= \frac{1}{2} \begin{bmatrix}
3849 & 4045 \\
4045 & 9225
\end{bmatrix} \times \frac{1}{3-1} \begin{bmatrix}
-85 & -36 & -57 \\
-75 & -80 & -135
\end{bmatrix}
$$

Beside it, a column vector written separately:

$$
\begin{bmatrix}
-85 \\
-36 \\
-57
\end{bmatrix}
$$

$$
= \begin{bmatrix}
1924.5 & 2022.5 \\
2022.5 & 4612.5
\end{bmatrix}
$$

$$
= \begin{bmatrix}
604.33 & -128.33 \\
-128.33 & 1108.33
\end{bmatrix}
$$

## Cred-1 — page 31

"LU only **do little** must" ("do little" underlined)

$$
\Sigma v = \lambda v
$$

$$
\det(\Sigma - \lambda I) = 0
$$

$$
\Rightarrow \begin{bmatrix}
604.33 & -128.33 \\
-128.33 & 1108.295
\end{bmatrix} - \begin{bmatrix}
\lambda & 0 \\
0 & \lambda
\end{bmatrix} = 0
$$

$$
= \begin{bmatrix}
604.33 - \lambda & -128.33 \\
-128.33 & 1108.295 - \lambda
\end{bmatrix} = 0
$$

$$
(604.33 - \lambda)(1108.295 - \lambda) - (-128.33)(-128.33) = 0
$$

$$
= (66975917.4 - 604.33\lambda - 1108295\lambda + \lambda^2) - 164468.588 = 0
$$

$$
\Rightarrow 66975949.88 - 1108299.33\lambda + \lambda^2 = 0
$$

$$
\lambda_1 = 1139.13
$$

$$
\lambda_2 = 573.54
$$

"এখনে শুধু $\lambda_1$ এর vector বের করতে"

"PCA তে কাজ"
