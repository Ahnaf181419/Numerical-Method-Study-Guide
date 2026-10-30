// Content payload: built from the CSE 2201 slides, the class notes, the books and the past papers.
// Modules are listed in study order. A module flagged `true` covers a past-paper topic that the
// slides and notes do not cover — it is taught with the standard textbook method and says so.
// `offSyllabus` marks a chapter that is not on the printed final syllabus but is asked in every past paper;
// that, not `flagged`, is what the red chapter badge shows.
import errors from './errors.js';
import roots from './roots.js';
import elimination from './elimination.js';
import iterative from './iterative.js';
import lu from './lu.js';
import differences from './differences.js';
import interpolation from './interpolation.js';
import differentiation from './differentiation.js';
import integration from './integration.js';
import regression from './regression.js';
import gradient from './gradient.js';
import pca from './pca.js';

export default [
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
];
