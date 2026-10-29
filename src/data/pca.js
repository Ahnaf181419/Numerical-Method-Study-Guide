// Principal Component Analysis — dimensionality reduction.
// Source: "14 Dimensionality Reduction (PCA)" slides, "(02) PCA Tutorial Step by Step (Math)", Medha's class notes (pp.29-31, 35-36).
export const checks = {
  "Start here: the problem this chapter solves": {
    q: "PCA's compression works because…",
    options: ["it deletes the largest columns", "columns often overlap, so a few new directions carry most of the variation", "dimensions are imaginary", "eigenvalues are always small"],
    answer: 1,
    explain: "Redundant columns vary together; the top eigenvector directions absorb that shared variation, and the rest can be dropped.",
  },
  "Start here: the core idea": {
    q: "The first principal component is the eigenvector of the covariance matrix with…",
    options: ["the smallest eigenvalue", "the largest eigenvalue", "zero eigenvalue", "negative eigenvalue"],
    answer: 1,
    explain: "Largest eigenvalue = most variance explained = the widest direction of the cloud = PC1.",
  },
  "Start here: reading the symbols": {
    q: "Why mean-centre before building $C$?",
    options: ["To make the numbers smaller", "So covariance measures spread around the cloud's centre, not the origin", "Because eigenvalues need integers", "To sort the columns"],
    answer: 1,
    explain: "Covariance is about deviation from the mean; centring moves that reference point to the origin so the matrix sees the cloud's true shape.",
  },
  "Start here: your first walk-through": {
    q: "The second component had $\\lambda_2 = 0.0442 \\ne 0$, yet it was dropped. Why was that acceptable?",
    options: ["It was negative", "Its 3.7% variance share falls below the 95%-threshold cutoff", "PCA only ever keeps one component", "Its eigenvector was zero"],
    answer: 1,
    explain: "The first component already explains 96.3% $\\ge$ 95%, so the remaining 3.7% is sacrificed deliberately — the threshold rule from the tutorial.",
  },
  'Why reduce the dimension': {
    q: 'The PCA slides name two motivations for dimensionality reduction. They are',
    options: [
      'data compression, and making algorithms faster',
      'data compression, and better visualisation',
      'faster algorithms, and removing outliers',
      'better visualisation, and avoiding missing data',
    ],
    answer: 1,
    explain: 'The slides list compression (speeds up algorithms, halves the storage) and visualisation (2D plots of 50-feature data).',
  },
  'The six steps of PCA': {
    q: 'Which of these is NOT one of the steps of the PCA algorithm in your slides?',
    options: [
      'Compute the inverse of the covariance matrix',
      'Mean-normalise the data',
      'Find the eigenvalues of the covariance matrix',
      'Stack the eigenvectors column-wise into the transformation matrix V',
    ],
    answer: 0,
    explain: 'The steps are: preprocess, covariance matrix, eigenvalues, eigenvectors, reduce, reconstruct. The inverse is never needed.',
  },
  'Preprocessing: mean normalisation and scaling': {
    q: 'Mean normalisation subtracts',
    options: ['the mean of each feature from every point', 'the mean of the whole dataset from every point', 'nothing — it only rescales', 'the first principal component'],
    answer: 0,
    explain: 'Each feature is centred on its own mean, so every column of the data has mean zero.',
  },
  'The covariance matrix': {
    q: 'The covariance matrix used in the PCA tutorial is computed as',
    options: [
      '$\\frac{1}{n}\\sum (x^{(i)}-\\bar{x})(x^{(i)}-\\bar{x})^T$',
      '$\\sum (x^{(i)}-\\bar{x})(x^{(i)}-\\bar{x})^T$',
      '$\\frac{1}{n}\\sum x^{(i)}x^{(i)T}$',
      '$\\frac{1}{n}\\sum x^{(i)}$',
    ],
    answer: 0,
    explain: 'It is the average of the outer products of the centred points — the 1/n form, which is what the tutorial uses.',
  },
  'Eigenvalues and eigenvectors': {
    q: 'The eigenvalues of the covariance matrix are',
    options: [
      'the variance of the data along each principal component',
      'the coordinates of the principal components',
      'the mean of each feature',
      'the scale factors of the axes',
    ],
    answer: 0,
    explain: 'Each eigenvalue is the variance of the projected data along the eigenvector with the same index, so the larger the eigenvalue the more information that direction carries.',
  },
  'Choosing how many components to keep': {
    q: 'The percentage of variance carried by principal component k is',
    options: [
      '$\\dfrac{\\lambda_k}{\\sum_j \\lambda_j}\\times 100\\%$',
      '$\\dfrac{1}{\\sum_j \\lambda_j}\\times 100\\%$',
      '$\\lambda_k \\times 100\\%$',
      '$\\dfrac{k}{n}\\times 100\\%$',
    ],
    answer: 0,
    explain: 'Divide the eigenvalue by the total variance (the trace of the covariance matrix) and multiply by 100.',
  },
  'Reconstruction and the error measures': {
    q: 'In the PCA tutorial, the reconstruction of the original points is',
    options: [
      '$X_r = Y V^T$ using the transformed points',
      '$X_r = Y V$ using the transformed points',
      '$X_r = X - V$',
      '$X_r = V Y$',
    ],
    answer: 0,
    explain: 'With the points written as row vectors, the transform is $Y = XV$ and the reconstruction is $X_r = YV^T$.',
  },
};

export default {
  id: 'pca',
  chapter: 12,
  title: 'Principal Component Analysis',
  wave: 'pca',
  sources: ['Dimensionality Reduction (PCA) slides', 'PCA Tutorial Step by Step (Math)', "Medha's class notes (pp.29-31, 35-36)"],
  sections: [
    {
      heading: "Start here: the problem this chapter solves",
      blocks: [
        { type: "p", text: "A dataset with twenty columns is a cloud of points floating in twenty-dimensional space. Nobody can see twenty dimensions, no plot can show them, and most of those columns are probably saying overlapping things — height in cm and height in inches are two columns carrying one fact." },
        { type: "p", text: "**Principal Component Analysis (PCA)** asks: along which *new* directions does this cloud actually vary? Rotate the axes to those directions, keep the few that carry real spread, drop the rest — and a twenty-column problem becomes a two- or three-column one with almost nothing lost." },
        { type: "p", text: "It is the course's bridge from linear algebra to data: means and covariances build a matrix, eigen-stuff finds the directions, projections rewrite the data in the new coordinates." },
        { type: "list", items: [
          "Mean-centre the data and build the covariance matrix.",
          "Find eigenvalues and eigenvectors (Jacobi's method for bigger sets).",
          "Rank components by explained variance and choose how many to keep.",
          "Project the data onto the kept components.",
        ] },
      ],
    },
    {
      heading: "Start here: the core idea",
      blocks: [
        { type: "p", text: "Think of photographing a cloud of smoke. Some camera angles show a wide, dramatic cloud; others show a thin line. **Variance is visibility**: the direction along which the data spreads most is the direction that carries the most information — and that direction is exactly the eigenvector of the covariance matrix with the **largest eigenvalue**." },
        { type: "p", text: "The recipe: subtract the mean from every point (centre the cloud), build the covariance matrix $C$, compute its eigenpairs, sort by eigenvalue. Each eigenvalue is the variance its eigenvector 'explains'; dividing by the total gives the percentage. Keep components until say 95% is covered, then project the points onto them — the projection **is** the compressed data." },
        { type: "note", text: "PCA rotates and compresses; it does not classify or predict. It answers 'what are the real axes of variation?', handing a cleaner, smaller dataset to whatever comes next." },
      ],
    },
    {
      heading: "Start here: reading the symbols",
      blocks: [
        { type: "table", head: ["Symbol", "Meaning", "In words"], rows: [
          ["$\\bar{x}$", "the mean of each column", "centre of the cloud"],
          ["mean-centring", "subtracting $\\bar{x}$ from every point", "move the cloud onto the origin"],
          ["$C = \\mathrm{cov}(X)$", "the covariance matrix of the centred data", "the spread in every direction pair"],
          ["$\\lambda_i$, $\\mathbf{v}_i$", "eigenvalue and eigenvector pair of $C$", "variance carried, and its direction"],
          ["PC1, PC2", "principal components: eigenvectors ranked by $\\lambda$", "the new axes, best first"],
          ["$\\frac{\\lambda_i}{\\sum \\lambda}$", "explained-variance share of component $i$", "its percentage of the story"],
          ["projection", "dot products of points onto a component", "the rewritten, compressed coordinates"],
        ] },
        { type: "p", text: "Covariance generalises variance to pairs of columns: how two columns rise and fall together. Diagonal entries are plain variances; off-diagonal ones are the pairwise 'togetherness'." },
      ],
    },
    {
      heading: "Start here: your first walk-through",
      blocks: [
        { type: "p", text: "From the **PCA Tutorial (Math), Q1**: ten two-dimensional points beginning $(2.5, 2.4), (0.5, 0.7), (2.2, 2.9), \\ldots$ Reduce the data to one dimension while keeping at least 95% of the variance." },
        { type: "p", text: "Mean-centre, build the covariance matrix, eigen-decompose (the tutorial's own steps): the eigenvalues come out $1.1556$ and $0.0442$, so the first component explains $\\frac{1.1556}{1.1998} = 96.3\\% \\ge 95\\%$ — **keep one component**, exactly the tutorial's threshold rule." },
        { type: "p", text: "Project onto that first eigenvector: the opening scores are $3.459,\\ 0.854,\\ 3.623, \\ldots$ — ten pairs have become ten numbers with 96.3% of the story intact. **Asked in:** none of the four available papers has set a PCA question yet — the teacher's tutorial worksheets are the source, and the exam-prep tab flags PCA as expected." },
        { type: "exam", text: "The stations in order: centred data and covariance matrix, eigenvalues with percentages, the keep-decision against the threshold, the projected scores." },
      ],
    },
    {
      heading: 'Why reduce the dimension',
      blocks: [
        {
          type: 'p',
          text: 'You have collected **many features** — often more than you need. Dimensionality reduction replaces a set of features with a smaller set that keeps the important structure, in two ways.',
        },
        {
          type: 'list',
          items: [
            '**Data compression.** Redundant data wastes space — for example the same attribute recorded in different units, or two features that are highly correlated (pilots\' skill and pilots\' enjoyment can be merged into one attribute, "aptitude"). Reducing 2D to 1D halves the storage and gives a lossy but acceptable compression.',
            '**Visualisation.** It is hard to plot 50-dimensional data. Reducing 50 features to two summary values gives a 2D plot, and the two axes often mean something: one may be overall country size or economic activity, the other per-person well-being.',
          ],
        },
        {
          type: 'p',
          text: 'The slide is blunt about the pay-off: **speeds up algorithms** — that is the major motivation — and reduces the space used by the data.',
        },
        {
          type: 'p',
          text: 'The problem formulation: find a single line onto which to project the data so that the distance from each point to its projection — the **projection error** — is as small as possible. PCA finds a lower-dimensional surface so that the sum of squares of those errors is minimised.',
        },
        {
          type: 'exam',
          text: 'A "motivation" question wants the two reasons with their benefit: compression (storage and speed) and visualisation (making high-dimensional data readable). Add that the projection error must be minimised and you have the whole idea.',
        },
      ],
    },
    {
      heading: 'The six steps of PCA',
      blocks: [
        {
          type: 'p',
          text: 'The tutorial turns the idea into a fixed recipe. Learn these six steps — the exam question gives them to you.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '**Preprocess** the data (mean normalisation, and scaling if the features have different units).',
            '**Find the covariance matrix** of the pre-processed points.',
            '**Find the eigenvalues** of the covariance matrix.',
            '**Find the eigenvector for each eigenvalue**, then form the transformation matrix $V$ by stacking the eigenvectors column-wise.',
            '**Reduce the dimensionality**: transform the points using the principal components matrix $V$.',
            '**Reconstruct** the original points from the reduced representation and compute the errors (MAE, SSE, RMSE).',
          ],
        },
        {
          type: 'note',
          text: 'The eigenvectors come from the characteristic equation $(\\Sigma - \\lambda I)v = 0$: find the eigenvalues from $\\det(\\Sigma - \\lambda I) = 0$, then solve for the vector $v$ and normalise it to unit length.',
        },
        {
          type: 'exam',
          text: 'Number your steps 1 to 6 and label each one. If a question asks for "the steps of the PCA algorithm", this list, with a line of explanation for each, is the answer.',
        },
      ],
    },
    {
      heading: 'Preprocessing: mean normalisation and scaling',
      blocks: [
        {
          type: 'p',
          text: '**Mean normalisation** centres each feature on its own mean, so every column has mean zero:',
        },
        {
          type: 'math',
          tex: 'x_j^{(i)} \\leftarrow x_j^{(i)} - \\bar{x}_j, \\qquad \\bar{x}_j = \\frac{1}{n}\\sum_{i=1}^{n} x_j^{(i)}',
        },
        {
          type: 'p',
          text: '**Feature scaling** then divides each column by its standard deviation, so that features measured in different units (metres and kilograms) do not let the larger-scaled feature dominate the covariance.',
        },
        {
          type: 'math',
          tex: 'x_j^{(i)} \\leftarrow \\frac{x_j^{(i)} - \\bar{x}_j}{s_j}, \\qquad s_j = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}\\left(x_j^{(i)} - \\bar{x}_j\\right)^2}',
        },
        {
          type: 'note',
          text: 'The tutorial\'s Q1 uses mean normalisation **without** scaling, and its Q3 repeats the whole thing with mean normalisation **and** scaling, so the covariance matrix must be rebuilt from the scaled points.',
        },
        {
          type: 'note',
          text: 'Careful — the tutorial projects the **original** points onto the principal axis (it writes $2.5 \\times 0.678 + 2.4 \\times 0.735 = 3.459$), not the mean-normalised ones. If you project the normalised points instead, you must add the mean back before comparing the errors. Write down which version you are using; the examiner is following the tutorial.',
        },
        {
          type: 'exam',
          text: 'Show the mean of each feature, then the normalised points, then (if scaling is asked for) the standard deviation of each feature and the scaled points. Do not skip to the covariance matrix.',
        },
      ],
    },
    {
      heading: 'The covariance matrix',
      blocks: [
        {
          type: 'p',
          text: 'The covariance matrix measures how the features vary together. With the centred points $z^{(i)} = x^{(i)} - \\bar{x}$,',
        },
        { type: 'math', tex: '\\Sigma = \\frac{1}{n}\\sum_{i=1}^{n} z^{(i)} z^{(i)T}' },
        {
          type: 'p',
          text: 'For the tutorial\'s data the mean is $(1.81, 1.91)$ and the covariance matrix comes out as',
        },
        { type: 'math', tex: '\\Sigma = \\begin{bmatrix} 0.5549 & 0.5539 \\\\ 0.5539 & 0.6449 \\end{bmatrix}' },
        {
          type: 'p',
          text: 'The diagonal entries are the variance of each feature; the off-diagonal entries are the covariance between the two features. Here they are almost equal, which is why the two features are so highly correlated and the data lies close to a straight line.',
        },
        {
          type: 'exam',
          text: 'Give the covariance matrix in the form $\\frac{1}{n}\\sum z^{(i)}z^{(i)T}$ and then the numbers. One mark for the formula, one for the matrix.',
        },
        {
          type: 'note',
          text: 'Sources differ on the divisor. The tutorial’s numbers ($\\lambda_1 = 1.1556$) divide by $n = 10$; in class both sets of notes (Raiyan p. 22, Medha p. 30) divide by $m - 1 = 9$: $\\Sigma = \\frac{1}{m-1}X^TX = \\begin{bmatrix} 0.6166 & 0.6154 \\\\ 0.6154 & 0.7166 \\end{bmatrix}$, giving $\\lambda^2 - 1.3332\\lambda + 0.0631 = 0$, $\\lambda_1 = 1.2840$, $\\lambda_2 = 0.0492$. Every entry and eigenvalue is just scaled by $\\frac{10}{9}$, so the eigenvectors, the variance percentages ($96.3\\%$ / $3.7\\%$), the projections and the errors are identical. State the divisor you use in the first line.',
        },
      ],
    },
    {
      heading: 'Eigenvalues and eigenvectors',
      blocks: [
        {
          type: 'p',
          text: 'Solve the characteristic equation $\\det(\\Sigma - \\lambda I) = 0$ for the eigenvalues, then solve $(\\Sigma - \\lambda I)v = 0$ for the eigenvector of each, and normalise it.',
        },
        {
          type: 'math',
          tex: '\\lambda_1 = 1.1556, \\qquad \\lambda_2 = 0.0442',
        },
        {
          type: 'math',
          tex: 'v_1 = \\begin{bmatrix} 0.678 \\\\ 0.735 \\end{bmatrix}, \\qquad v_2 = \\begin{bmatrix} 0.735 \\\\ -0.678 \\end{bmatrix}',
        },
        {
          type: 'p',
          text: 'The transformation matrix is built by **stacking the eigenvectors column-wise**:',
        },
        { type: 'math', tex: 'V = \\begin{bmatrix} 0.678 & 0.735 \\\\ 0.735 & -0.678 \\end{bmatrix}' },
        {
          type: 'note',
          text: 'An eigenvector can be multiplied by $-1$ and it is still the same direction. The tutorial writes $v_2 = (0.735, -0.678)$; if you get the opposite sign, your answer is still correct — but write the sign you used consistently in the reconstruction.',
        },
        {
          type: 'exam',
          text: 'Order the eigenvalues from largest to smallest — the first principal component must be the one with the largest eigenvalue. Then write $V$ with the eigenvectors as columns.',
        },
      ],
    },
    {
      heading: 'Choosing how many components to keep',
      blocks: [
        {
          type: 'p',
          text: 'The variance carried by principal component $k$ is its eigenvalue, and the percentage of the total variance is',
        },
        { type: 'math', tex: '\\%\\text{variance on PC } k = \\frac{\\lambda_k}{\\lambda_1 + \\lambda_2 + \\cdots + \\lambda_n} \\times 100\\%' },
        {
          type: 'p',
          text: 'For the tutorial\'s data: $\\lambda_1$ carries $96.3\\%$ and $\\lambda_2$ carries $3.7\\%$.',
        },
        {
          type: 'list',
          items: [
            '**95% of the variance** — one component is enough ($\\lambda_1 = 96.3\\% \\ge 95\\%$). The feature vector goes from $2 \\times 2$ to $2 \\times 1$.',
            '**98% of the variance** — $\\lambda_2$ cannot be discarded, so the dimensionality is not reduced at all; the transformed data stays $10 \\times 2$.',
          ],
        },
        {
          type: 'note',
          text: 'This is the heart of the question: *keep at least 95% of the variance* is a decision rule, and the answer to "can we reduce?" is decided by adding up the variance percentages until you cross the threshold.',
        },
        {
          type: 'exam',
          text: 'State the percentage of each principal component, then say how many you keep and what the new size of the data is ($10 \\times 1$ or $10 \\times 2$).',
        },
      ],
    },
    {
      heading: 'Reconstruction and the error measures',
      blocks: [
        {
          type: 'p',
          text: 'Transform the points with $Y = XV$ (points as row vectors), then rebuild the original points from the reduced ones:',
        },
        { type: 'math', tex: 'X_r = Y V^T \\qquad (10 \\times 1)(1 \\times 2) = 10 \\times 2' },
        {
          type: 'p',
          text: 'The error of each point is $E = X - X_r$, and the three measures the tutorial asks for are:',
        },
        {
          type: 'math',
          tex: '\\text{MAE} = \\frac{1}{n}\\sum_{i=1}^{n}|E_i|, \\qquad \\text{SSE} = \\sum_{i=1}^{n} E_i^2, \\qquad \\text{RMSE} = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n} E_i^2}',
        },
        {
          type: 'p',
          text: 'For the tutorial\'s data with one component kept: the reconstructed first point is $(2.35, 2.54)$ against the original $(2.5, 2.4)$, giving errors $(0.15, -0.14)$; overall $\\text{MAE} = (0.13, 0.12)$ and $\\text{SSE} = (0.25, 0.21)$.',
        },
        {
          type: 'exam',
          text: 'Show the reconstruction as a matrix product with the dimensions written down — $(10 \\times 1)(1 \\times 2) = 10 \\times 2$ — then a table of the errors, then the MAE, SSE and RMSE. The table is where the marks are.',
        },
      ],
    },
  ],
  formulas: [
    { label: 'Mean normalisation', tex: 'z_j^{(i)} = x_j^{(i)} - \\bar{x}_j', where: 'step 1' },
    { label: 'Feature scaling', tex: 'z_j^{(i)} \\leftarrow \\frac{z_j^{(i)}}{s_j}', where: 'step 1, when the units differ' },
    { label: 'Covariance matrix', tex: '\\Sigma = \\frac{1}{n}\\sum_{i=1}^{n} z^{(i)} z^{(i)T}', where: 'step 2' },
    { label: 'Characteristic equation', tex: '\\det(\\Sigma - \\lambda I) = 0', where: 'step 3' },
    { label: 'Eigenvector equation', tex: '(\\Sigma - \\lambda I)v = 0', where: 'step 4' },
    { label: 'Transformation matrix', tex: 'V = \\begin{bmatrix} v_1 & v_2 \\end{bmatrix}', where: 'eigenvectors stacked column-wise' },
    { label: 'Variance percentage', tex: '\\%_k = \\frac{\\lambda_k}{\\sum_j \\lambda_j}\\times 100\\%', where: 'decides how many components to keep' },
    { label: 'Transform and reconstruct', tex: 'Y = XV, \\qquad X_r = YV^T', where: 'steps 5 and 6' },
    { label: 'Error measures', tex: '\\text{MAE} = \\frac{1}{n}\\sum|E_i|,\\quad \\text{SSE} = \\sum E_i^2,\\quad \\text{RMSE} = \\sqrt{\\frac{1}{n}\\sum E_i^2}', where: 'step 6' },
  ],
  examples: [
    {
      title: 'Full PCA on the tutorial dataset, keeping 95% of the variance',
      type: 'Numerical — PCA',
      question: 'Perform Principal Component Analysis on the data set $\\{(2.5, 2.4), $$((0.5, 0.7), $$((2.2, 2.9), $$((1.9, 2.2), $$((3.1, 3.0), $$((2.3, 2.7), $$((2.0, 1.6), $$((1.0, 1.1), $$((1.5, 1.6), $$((1.1, 0.9\\}$ using (i) mean normalisation with no scaling, (ii) the principal components and the data variances along them, (iii) reduce the dimensionality keeping at least 95% of the variance, (iv) recast the data points along the principal component, (v) reconstruct the original points and find the MAE, SSE and RMSE.',
      source: 'PCA Tutorial Step by Step (Math) — Q1',
      marks: 8,
      steps: [
        { t: '**Step 1 — preprocessing.** $\\bar{x} = 1.81$, $\\bar{y} = 1.91$. Mean-normalised points: $(0.69, 0.49), $$((-1.31, -1.21), $$((0.39, 0.99), $$((0.09, 0.29), $$((1.29, 1.09), $$((0.49, 0.79), $$((0.19, -0.31), $$((-0.81, -0.81), $$((-0.31, -0.31), $$((-0.71, -1.01$.', m: '1 mark' },
        { t: '**Step 2 — covariance matrix.** $\\Sigma = \\frac{1}{10}\\sum z^{(i)}z^{(i)T} = \\begin{bmatrix} 0.5549 & 0.5539 \\\\ 0.5539 & 0.6449 \\end{bmatrix}$.', m: '1 mark' },
        { t: '**Step 3 — eigenvalues.** $\\det(\\Sigma - \\lambda I) = 0$ gives $\\lambda_1 = 1.1556$ and $\\lambda_2 = 0.0442$.', m: '1 mark' },
        { t: '**Step 4 — eigenvectors and V.** $v_1 = (0.678, 0.735)$, $v_2 = (0.735, -0.678)$, so $V = \\begin{bmatrix} 0.678 & 0.735 \\\\ 0.735 & -0.678 \\end{bmatrix}$.', m: '1 mark' },
        { t: '**Step 5 — reduce.** The variance percentages are $\\frac{1.1556}{1.1998}\\times 100 = 96.3\\%$ and $3.7\\%$. Since $96.3\\% \\ge 95\\%$, keep **one** component. Transform: $Y = XV$, giving $Y = (3.459, 0.854, 3.623, 2.905, 4.307,$ $3.544, 2.532, 1.487, 2.193, 1.407)$.', m: '2 marks' },
        { t: '**Step 6 — reconstruct.** $X_r = YV^T$, a $(10 \\times 1)(1 \\times 2) = 10 \\times 2$ product. The first point comes back as $3.459 \\times (0.678, 0.735) = (2.35, 2.54)$ against the original $(2.5, 2.4)$, so the errors are $(0.15, -0.14)$.', m: '1 mark' },
        { t: 'Over all ten points: $\\text{MAE} = (0.13, 0.12)$, $\\text{SSE} = (0.25, 0.21)$, $\\text{RMSE} = (0.157, 0.145)$.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\lambda_1 = 96.3\\% \\text{ (kept)},}$ $\\lambda_2 = 3.7\\% \\text{ (discarded)};$ $\\text{MAE} = (0.13, 0.12),\\; \\text{SSE} = (0.25, 0.21)$',
      note: 'Trap: using the mean-normalised points for the projection and then comparing them with the original points. The tutorial projects the **original** points — write down which version you used.',
      explanation: [
        'The eigenvalues of the covariance matrix are the variances of the data along the principal component directions, so the percentage of variance carried by each component is its eigenvalue divided by the total variance (the trace of $\\Sigma$). Adding those percentages until you cross 95% tells you how many components to keep — here, one.',
        'The projection of a point onto the first principal axis is the scalar $Y_i = x_i \\cdot v_1$, and the reconstruction is that scalar times the same vector again — a projection back onto the line. The error is therefore the component of the point perpendicular to that line, which is exactly the projection error the slides minimise.',
        'Keeping both components (the 98% case) reproduces the data exactly: the error is zero, because $V$ is then a full-rank basis of the plane. That is the point of the comparison — reduction buys storage and speed at the price of a small, quantifiable error.',
      ],
    },
    {
      title: 'The same data with mean normalisation and scaling',
      type: 'Numerical — PCA',
      question: 'Repeat the analysis after preprocessing the data using both mean normalisation and feature/data scaling. How do the covariance matrix and the variance percentages change?',
      source: 'PCA Tutorial Step by Step (Math) — Q3',
      marks: 6,
      steps: [
        { t: '**Step 1 — mean normalisation and scaling.** After centring, the standard deviations are $s_x = 0.7449$ and $s_y = 0.8031$. Dividing each centred column by its standard deviation gives the scaled points.', m: '1 mark' },
        { t: '**Step 2 — covariance matrix of the scaled points.** $\\Sigma_{scaled} = \\frac{1}{10}\\sum z^{(i)}z^{(i)T} = \\begin{bmatrix} 1 & 0.9259 \\\\ 0.9259 & 1 \\end{bmatrix}$ — the diagonal is 1 and the off-diagonal entry is the correlation of the two features.', m: '2 marks' },
        { t: '**Step 3 — eigenvalues.** $\\lambda_1 = 1.9259$, $\\lambda_2 = 0.0741$.', m: '1 mark' },
        { t: '**Step 4 — variance percentages.** $\\dfrac{1.9259}{2}\\times 100 = 96.3\\%$ and $3.7\\%$ — the same split as without scaling.', m: '1 mark' },
        { t: '**Steps 5-6.** With 95% the first component is still kept alone; the reconstruction and the errors are then computed from the **scaled** points, so the errors are in scaled units and must be compared with the scaled data, not the original.', m: '1 mark' },
      ],
      answer: '$\\boxed{\\Sigma_{scaled} = \\begin{bmatrix} 1 & 0.9259 \\\\ 0.9259 & 1 \\end{bmatrix}}$ $\\lambda_1 = 96.3\\%,\\; \\lambda_2 = 3.7\\%$ — the same one-component reduction',
      note: 'Trap: reporting the errors of the scaled reconstruction as if they were errors on the original data. Either work in scaled units throughout, or undo the scaling on the reconstruction before comparing.',
      explanation: [
        'Scaling divides each column by its standard deviation, so the diagonal of the covariance matrix becomes 1 and the off-diagonal entries become the correlation coefficients. The covariance matrix then depends only on the shape of the data cloud, not on the units.',
        'When the two features are correlated, scaling does not change the *split* of the variance much — the first component still carries about 96% — but it does change the actual eigenvectors, so the directions of the principal axes are different.',
        'This is the whole point of doing both: the question asks for the mean-normalised case without scaling, then the mean-normalised and scaled case, so that you can compare the covariance matrices and see how much the scaling mattered.',
      ],
    },
  ],
  flashcards: [
    { front: 'What are the two motivations for dimensionality reduction?', back: 'Data compression (speeds up algorithms and halves the storage) and visualisation (making high-dimensional data readable).' },
    { front: 'What is the projection error?', back: 'The distance from each data point to its projection on the new lower-dimensional surface. PCA minimises the sum of their squares.' },
    { front: 'What is the first step of PCA?', back: 'Preprocess the data: mean normalisation, and scaling if the features have different units.' },
    { front: 'What does mean normalisation do?', back: 'Subtracts the mean of each feature from every point, so every column has mean zero.' },
    { front: 'What does feature scaling do?', back: 'Divides each centred column by its standard deviation.' },
    { front: 'How is the covariance matrix computed?', back: '$\\frac{1}{n}\\sum z^{(i)}z^{(i)T}$ from the centred (or scaled) points.' },
    { front: 'How are the eigenvalues found?', back: 'From the characteristic equation $\\det(\\Sigma - \\lambda I) = 0$.' },
    { front: 'How is the eigenvector found?', back: 'Solve $(\\Sigma - \\lambda I)v = 0$ for $v$ and normalise it to unit length.' },
    { front: 'How is the transformation matrix V built?', back: 'By stacking the eigenvectors column-wise.' },
    { front: 'What does an eigenvalue represent in PCA?', back: 'The variance of the data along the principal component with the same index.' },
    { front: 'How do you decide how many components to keep?', back: 'Add the variance percentages until you reach the threshold (95% or 98%).' },
    { front: 'How are the points transformed?', back: '$Y = XV$ — the projection of each point onto the component axes.' },
    { front: 'How are the points reconstructed?', back: '$X_r = YV^T$.' },
    { front: 'What are the three error measures?', back: 'MAE (mean absolute error), SSE (sum of squared errors) and RMSE (root mean squared error).' },
    { front: 'Is the eigenvector sign unique?', back: 'No — $v$ and $-v$ are the same direction. Fix one sign and use it consistently.' },
  ],
  quiz: [
    {
      q: 'PCA finds the direction that',
      options: [
        'minimises the sum of the squares of the projection errors',
        'maximises the variance of each feature',
        'makes the data linearly separable',
        'removes all outliers',
      ],
      answer: 0,
      explain: 'The projection error must be as low as possible; PCA minimises its sum of squares.',
    },
    {
      q: 'The covariance matrix of the centred data is',
      options: [
        '$\\frac{1}{n}\\sum z^{(i)}z^{(i)T}$',
        '$\\sum z^{(i)}$',
        '$\\frac{1}{n}\\sum x^{(i)}x^{(i)T}$ without centring',
        '$\\sum z^{(i)}z^{(i)}$ element by element',
      ],
      answer: 0,
      explain: 'It is the average of the outer products of the centred points.',
    },
    {
      q: 'The variance percentages of the tutorial data are',
      options: ['96.3% and 3.7%', '50% and 50%', '99.9% and 0.1%', '75% and 25%'],
      answer: 0,
      explain: '$\\lambda_1 = 1.1556$ out of a total variance of 1.1998 gives 96.3%.',
    },
    {
      q: 'At the 95% threshold for the tutorial data you keep',
      options: ['one principal component', 'two principal components', 'no components', 'three components'],
      answer: 0,
      explain: 'The first component alone carries 96.3%, which is already above 95%.',
    },
    {
      q: 'At the 98% threshold for the tutorial data you keep',
      options: ['two components', 'one component', 'no components', 'four components'],
      answer: 0,
      explain: 'You need both: 96.3% alone is below 98%, so the dimensionality is not reduced.',
    },
    {
      q: 'The reconstruction formula is',
      options: ['$X_r = YV^T$', '$X_r = YV$', '$X_r = VY$', '$X_r = XV$'],
      answer: 0,
      explain: 'With points as rows, $Y = XV$ and the reconstruction is $X_r = YV^T$.',
    },
    {
      q: 'Mean normalisation is needed because',
      options: [
        'features with large means would otherwise dominate the covariance',
        'the eigenvalues must be integers',
        'the eigenvectors must be unit vectors',
        'it removes the need for the covariance matrix',
      ],
      answer: 0,
      explain: 'Centring makes the covariance measure spread rather than offset.',
    },
    {
      q: 'Scaling the features before PCA is useful when',
      options: [
        'the features are measured in very different units',
        'the data has missing values',
        'the matrix is singular',
        'there are more points than features',
      ],
      answer: 0,
      explain: 'Otherwise the feature with the larger numerical scale dominates the principal axes.',
    },
    {
      q: 'What is the RMSE?',
      options: [
        'the square root of the mean of the squared errors',
        'the mean of the absolute errors',
        'the sum of the squared errors',
        'the largest error',
      ],
      answer: 0,
      explain: 'The tutorial defines it exactly that way.',
    },
    {
      q: 'The eigenvalues of the covariance matrix are found from',
      options: [
        '$\\det(\\Sigma - \\lambda I) = 0$',
        '$\\Sigma v = \\lambda v$ only',
        'the inverse of $\\Sigma$',
        'the diagonal entries of $\\Sigma$',
      ],
      answer: 0,
      explain: 'The characteristic equation gives the eigenvalues; the eigenvector equation then gives the directions.',
    },
  ],
  solvers: ['pca', 'pcaScaled'],
};
