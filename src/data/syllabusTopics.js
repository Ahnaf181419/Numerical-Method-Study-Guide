// Shuvo Sir's topic list (docs/Shuvo-Sir-Topic.pdf), reproduced in the PDF's own
// order and format: sections, grouped topic tables, book examples and video links.
export default {
  source: 'Shuvo Sir Part',
  sections: [
    {
      title: 'Interpolation',
      book: 'Book: Shanker Rao',
      groups: [
        {
          label: 'Equal interval',
          rows: [
            { topic: 'Newton Forward Interpolation', examples: '4.4, 4.5, 4.6, 4.7, 4.8', video: 'https://youtu.be/Aw6LvaPtESE' },
            { topic: 'Newton Backward Interpolation', examples: '4.9, 4.10' },
            { topic: 'Central Difference Interpolation', examples: '6.5', video: 'https://youtu.be/-Lf0VZzKRw0' },
            { topic: 'Gauss Forward', examples: '6.1, 6.3', sub: true },
            { topic: 'Gauss Backward', examples: '6.2, 6.4', sub: true },
            { topic: 'Stirling Interpolation', examples: '6.8, 6.9', sub: true },
          ],
        },
        {
          label: 'Unequal Interval',
          rows: [
            { topic: 'Newton Divided Difference', examples: '5.1 – 5.4', video: 'https://youtu.be/OVfTwFbevwE' },
            { topic: 'Lagrange Interpolation', examples: '5.5 – 5.6 · Exercise 5.1 (page 126–127)', video: 'https://youtu.be/zdyUwzOm1zw' },
            { topic: 'Inverse Interpolation', examples: '7.1 – 7.3', video: 'https://youtu.be/PcOYx7Uxkl8' },
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
        { topic: 'Trapezoidal Rule', examples: '9.1, 9.2, 9.3', video: 'https://youtu.be/1kYrYNgv17Y' },
        { topic: 'Simpson 1/3 Rule', examples: '9.4, 9.5, 9.6', video: 'https://youtu.be/aRG7-BPpIac' },
        { topic: 'Simpson 3/8 Rule', examples: '9.7, 9.8', video: 'https://youtu.be/UjwJFUAmUqw' },
        { topic: 'Weddle’s Rule', examples: '9.9, 9.10', video: 'https://youtu.be/-22T_FQKPqo' },
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
        { name: 'Video - 1', url: 'https://drive.google.com/file/d/1xHRAqK1yPQHrRHypyCLr_z_fX9GnCD8k/view?usp=sharing' },
        { name: 'Video – 2', url: 'https://drive.google.com/file/d/1UtbHhErzpr3pLXIygMZusOJZGaIHAnQc/view?usp=sharing' },
        { name: 'Video – 3', url: 'https://drive.google.com/file/d/1cWsfUrTL0V0AUtoR_767S2SJf4qC8aS6/view?usp=sharing' },
      ],
    },
  ],
};
