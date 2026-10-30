// Guards for the mobile sweep (headless Chrome over every view at 320, 390, 820 and 1180 px):
// no page overflow or clipped content was found; these lock the touch-target and keyboard fixes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const dir = new URL('../components/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.jsx'));
const src = (f) => readFileSync(new URL(f, dir), 'utf8');

test('no control is given a minimum height under 44px', () => {
  const bad = files.flatMap((f) => (src(f).match(/\bmin-h-(?:[1-9]|10)\b/g) ?? []).map((m) => `${f}: ${m}`));
  assert.deepEqual(bad, []);
});

test('text-styled buttons and links still get a 44px tap area', () => {
  // A button or link styled as bare text (no padding, no min-h) collapses to the line height.
  const bad = files.flatMap((f) =>
    [...src(f).matchAll(/<(button|a)\b[^>]*className=["{`]+([^"`]*)["`}]/g)]
      .filter(([, , cls]) => /underline/.test(cls) && !/min-h-1[1-9]/.test(cls))
      .map(([tag]) => `${f}: ${tag.slice(0, 80)}`),
  );
  assert.deepEqual(bad, []);
});

test('lessons are picked from a native select, not from slivers of the progress bar', () => {
  const learn = src('Learn.jsx');
  assert.ok(/<select[^>]*aria-label="Jump to lesson"/.test(learn), 'no lesson picker');
  assert.ok(!/<button[^>]*\n?[^>]*aria-label=\{`Lesson \$\{k \+ 1\}/.test(learn), 'progress segments are still buttons');
});

test('fields that take negative numbers do not open the minus-less decimal keypad', () => {
  const solvers = src('Solvers.jsx');
  const mode = solvers.match(/inputMode=\{([^}]*)\}/)?.[1] ?? '';
  assert.ok(!/'any'[^?]*\?\s*'decimal'/.test(mode) && !/type === 'any'/.test(mode.split("'decimal'")[0]), `inputMode still maps 'any' to decimal: ${mode}`);
});
