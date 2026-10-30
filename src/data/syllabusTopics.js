// Shuvo Sir's topic list (docs/Shuvo-Sir-Topic.pdf), reproduced in the PDF's own
// order and format: sections, grouped topic tables, book examples and video links.
// `lesson` names the [module id, section heading] where each video is shown inside the course.
const syllabus = {
  source: 'Shuvo Sir Part',
  sections: [
    {
      title: 'Interpolation',
      book: 'Book: Shanker Rao',
      groups: [
        {
          label: 'Equal interval',
          rows: [
            { topic: 'Newton Forward Interpolation', examples: '4.4, 4.5, 4.6, 4.7, 4.8', video: 'https://youtu.be/Aw6LvaPtESE', lesson: ['interpolation', 'Newton forward (Gregory) interpolation for equal intervals'] },
            { topic: 'Newton Backward Interpolation', examples: '4.9, 4.10' },
            { topic: 'Central Difference Interpolation', examples: '6.5', video: 'https://youtu.be/-Lf0VZzKRw0', lesson: ['interpolation', 'Central difference formulae: Gauss, Stirling and Bessel'] },
            { topic: 'Gauss Forward', examples: '6.1, 6.3', sub: true },
            { topic: 'Gauss Backward', examples: '6.2, 6.4', sub: true },
            { topic: 'Stirling Interpolation', examples: '6.8, 6.9', sub: true },
          ],
        },
        {
          label: 'Unequal Interval',
          rows: [
            { topic: 'Newton Divided Difference', examples: '5.1 – 5.4', video: 'https://youtu.be/OVfTwFbevwE', lesson: ['interpolation', "Newton's divided difference interpolation"] },
            { topic: 'Lagrange Interpolation', examples: '5.5 – 5.6 · Exercise 5.1 (page 126–127)', video: 'https://youtu.be/zdyUwzOm1zw', lesson: ['interpolation', 'Lagrange interpolation for unequally spaced points'] },
            { topic: 'Inverse Interpolation', examples: '7.1 – 7.3', video: 'https://youtu.be/PcOYx7Uxkl8', lesson: ['interpolation', 'Error in interpolation and inverse interpolation'] },
            { topic: 'Finding Error in Data', examples: '3.24' },
          ],
        },
      ],
    },
    {
      title: 'Numerical Integrations',
      book: 'Book: Shanker Rao',
      note: 'Parle actual value and error ber kore practice kora better.',
      rows: [
        { topic: 'Trapezoidal Rule', examples: '9.1, 9.2, 9.3', video: 'https://youtu.be/1kYrYNgv17Y', lesson: ['integration', 'The trapezoidal rule'] },
        { topic: 'Simpson 1/3 Rule', examples: '9.4, 9.5, 9.6', video: 'https://youtu.be/aRG7-BPpIac', lesson: ['integration', "Simpson's one-third rule"] },
        { topic: 'Simpson 3/8 Rule', examples: '9.7, 9.8', video: 'https://youtu.be/UjwJFUAmUqw', lesson: ['integration', "Simpson's three-eighths rule"] },
        { topic: 'Weddle’s Rule', examples: '9.9, 9.10', video: 'https://youtu.be/-22T_FQKPqo', lesson: ['integration', "Weddle's rule"] },
      ],
    },
    {
      title: 'Numerical Differentiations',
      book: 'Book: Balagurusamy, Chapter 11',
      examples: '11.1 – 11.6',
    },
    {
      title: 'Regression Normal',
      book: 'Book: Balagurusamy, Chapter 10',
      examples: '10.1, 10.2, 10.4, 10.5',
    },
    {
      title: 'Regression by Gradient Descent',
      videos: [
        { name: 'Video - 1', url: 'https://drive.google.com/file/d/1xHRAqK1yPQHrRHypyCLr_z_fX9GnCD8k/view?usp=sharing', lesson: ['gradient', 'The cost function and its derivatives'] },
        { name: 'Video – 2', url: 'https://drive.google.com/file/d/1UtbHhErzpr3pLXIygMZusOJZGaIHAnQc/view?usp=sharing', lesson: ['gradient', 'Batch mode'] },
        { name: 'Video – 3', url: 'https://drive.google.com/file/d/1cWsfUrTL0V0AUtoR_767S2SJf4qC8aS6/view?usp=sharing', lesson: ['gradient', 'Single mode'] },
      ],
    },
  ],
};

export default syllabus;

// The Credit 1 topics, which Shuvo Sir's sheet does not list (docs/EXAM-GUIDELINES.md §2).
export const credit1 = {
  title: 'Credit 1 (Ms. Tasnuva)',
  book: 'From the final syllabus; not on Shuvo Sir’s sheet. About 15–17 marks.',
  rows: [
    { topic: 'Elimination methods (Gauss elimination, Gauss-Jordan)', module: 'elimination' },
    { topic: 'Iterative methods (Jacobi, Gauss-Seidel)', module: 'iterative' },
    { topic: 'LU method (LU decomposition)', module: 'lu' },
    { topic: 'PCA (Principal Component Analysis)', module: 'pca' },
  ],
};

// The teacher's videos for one lesson, as { name, url }.
export const videosFor = (moduleId, heading) =>
  syllabus.sections
    .flatMap((s) => [...(s.groups?.flatMap((g) => g.rows) ?? []), ...(s.rows ?? []), ...(s.videos ?? [])])
    .filter((r) => r.lesson?.[0] === moduleId && r.lesson[1] === heading)
    .map((r) => ({ name: r.topic ? `${r.topic} (Shuvo Sir)` : `Gradient descent ${r.name} (Shuvo Sir)`, url: r.video ?? r.url }));
