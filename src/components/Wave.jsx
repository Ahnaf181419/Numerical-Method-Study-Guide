// The module's signal trace: one small curve drawn for each topic.
const SHAPES = {
  // chopping: the true curve replaced by a staircase
  error: (x) => Math.sin(x * 2 * Math.PI * 2) * (0.35 + 0.65 * Math.round(x * 12) / 12),
  // root finding: oscillations shrinking onto the root
  root: (x) => Math.sin(x * 2 * Math.PI * 4) * (1 - x) ** 1.6,
  // Gaussian elimination: the matrix filling in as a staircase
  elim: (x) => (x < 0.34 ? 0 : x < 0.67 ? 0.55 : 0.9) * Math.sin(x * 2 * Math.PI * 1.2),
  // iterative methods: a damped cycle
  iter: (x) => Math.sin(x * 2 * Math.PI * 6) * (1 - x) ** 0.8,
  // LU: two triangles back to back
  lu: (x) => (x < 0.5 ? 2 * x : 2 - 2 * x) * 0.9 - 0.1,
  // finite differences: alternating first differences
  diff: (x) => Math.sin(x * 2 * Math.PI * 8) * 0.9,
  // interpolation: a smooth curve through the nodes
  interp: (x) => Math.sin(x * 2 * Math.PI * 1.5 + 0.6) * 0.85,
  // differentiation: the slope of a curve
  deriv: (x) => (x - 0.5) * 1.6,
  // integration: the accumulated area
  integ: (x) => Math.sin(x * Math.PI) * 0.9,
  // regression: a trend through scattered points
  reg: (x) => x * 1.2 - 0.55,
  // gradient descent: the loss falling towards the optimum
  grad: (x) => Math.exp(-x * 4.5) * Math.cos(x * 6),
  // PCA: the data cloud projected on a rotated axis
  pca: (x) => Math.sin(x * 2 * Math.PI * 1.1 + 0.9) * 0.8,
};

const W = 640, H = 56;

export default function Wave({ type, id }) {
  const f = SHAPES[type] ?? SHAPES.interp;
  let d = '';
  for (let i = 0; i <= 480; i++) {
    const x = i / 480;
    const y = H / 2 - Math.max(-1, Math.min(1, f(x))) * (H / 2 - 4);
    d += `${i ? 'L' : 'M'}${(x * W).toFixed(1)} ${y.toFixed(1)}`;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="var(--color-line)" strokeWidth="1" />
      <path key={id} d={d} pathLength="1" className="trace" fill="none" stroke="var(--color-gold)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}
