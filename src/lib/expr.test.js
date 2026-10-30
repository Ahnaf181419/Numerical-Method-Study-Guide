import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compile } from './expr.js';

test('compiles the paper style: implicit products and powers', () => {
  const f = compile('2x^2 + x');
  assert.ok(Math.abs(f(3) - 21) < 1e-12);
  const g = compile('e^x - 3x');
  assert.ok(Math.abs(g(0) - 1) < 1e-12);
});

test('a number with two dots is rejected, not silently truncated', () => {
  assert.throws(() => compile('1.2.3 + x'), /1\.2\.3/);
});
