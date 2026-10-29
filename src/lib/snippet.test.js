// mathSnippet must never split a $...$ math span when cutting a search-preview window.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import mathSnippet from './snippet.js';

test('keeps a math span whole when the window cuts through it', () => {
  const text = 'x'.repeat(200) + ' result $\\frac{a}{b}$ and the value appears next ' + 'y'.repeat(200);
  const out = mathSnippet(text, 'appears');
  assert.ok(out.includes('$\\frac{a}{b}$'), 'math span must survive uncut');
  assert.ok(!/\$[^$]*$/.test(out.replace(/\$[^$]+\$/g, '')), 'no dangling unclosed math');
  assert.ok(out.startsWith('\u2026') && out.endsWith('\u2026'), 'window is marked on both sides');
  assert.ok(out.includes('appears'), 'the hit term is visible');
});

test('no leading ellipsis when the window starts at the beginning', () => {
  const out = mathSnippet('Simpson and $\\frac{h}{3}$ weights follow', 'simpson');
  assert.ok(!out.startsWith('\u2026'));
  assert.ok(out.includes('$\\frac{h}{3}$'));
});

test('plain text behaves like a normal snippet', () => {
  const out = mathSnippet('a'.repeat(200) + ' needle ' + 'b'.repeat(200), 'needle');
  assert.ok(out.includes('needle') && out.startsWith('\u2026'));
});

test('missing term falls back to a plain window', () => {
  const out = mathSnippet('nothing to see here $z$ at all', 'absent');
  assert.ok(out.length > 0 && out.includes('$z$'));
});
