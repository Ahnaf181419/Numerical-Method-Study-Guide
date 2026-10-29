// One "check yourself" question per lesson, keyed by module id + exact section heading.
// Each module file exports its own checks; this file only gathers them.
import { checks as errors } from './errors.js';
import { checks as roots } from './roots.js';
import { checks as elimination } from './elimination.js';
import { checks as iterative } from './iterative.js';
import { checks as lu } from './lu.js';
import { checks as differences } from './differences.js';
import { checks as interpolation } from './interpolation.js';
import { checks as differentiation } from './differentiation.js';
import { checks as integration } from './integration.js';
import { checks as regression } from './regression.js';
import { checks as gradient } from './gradient.js';
import { checks as pca } from './pca.js';

export default {
  errors,
  roots,
  elimination,
  iterative,
  lu,
  differences,
  interpolation,
  differentiation,
  integration,
  regression,
  gradient,
  pca,
};
