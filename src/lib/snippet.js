// Search-preview window that never cuts a $...$ math span in half.
// The window is computed in plain-text coordinates, then its edges are snapped
// outward past any math span they land inside — so math survives whole.
export default function mathSnippet(text, term, len = 150, pad = 50) {
  const spans = text.split(/(\$[^$]+\$)/g).filter(Boolean);
  const isMath = (sp) => sp.length > 1 && sp.startsWith('$') && sp.endsWith('$');
  const lower = term.toLowerCase();

  // absolute [start, end) of each span, plus cumulative plain length before it
  const at = [];
  let abs = 0, plain = 0, hitAbs = -1;
  for (const sp of spans) {
    at.push({ abs, end: abs + sp.length, plainBefore: plain, math: isMath(sp) });
    if (hitAbs === -1 && !isMath(sp)) {
      const k = sp.toLowerCase().indexOf(lower);
      if (k !== -1) hitAbs = abs + k;
    }
    abs += sp.length;
    plain += sp.length;
  }
  if (hitAbs === -1) return text.slice(0, len); // term outside plain text

  // plain-text offsets of the hit's window start/end
  const plainOf = (a) => { const s = at.find((x) => a >= x.abs && a < x.end); return s ? s.plainBefore + (a - s.abs) : plain; };
  let L = Math.max(0, plainOf(hitAbs) - pad);
  let R = Math.min(plain, plainOf(hitAbs) + len);

  // snap edges outward past math spans
  const toAbs = (p, side) => {
    for (const s of at) {
      if (s.math) continue;
      const sp = s.end - s.abs;
      if (p <= s.plainBefore + sp) {
        const a = s.abs + (p - s.plainBefore);
        // a may sit inside the PRECEDING math span if p is at a span seam — nothing to snap here
        return a;
      }
    }
    return text.length;
  };
  let aL = toAbs(L), aR = toAbs(R);
  for (const s of at) if (s.math && aL > s.abs && aL < s.end) aL = s.abs;      // window starts mid-math: include it whole
  for (const s of at) if (s.math && aR > s.abs && aR < s.end) aR = s.end;      // window ends mid-math: keep it whole
  return (aL > 0 ? '\u2026' : '') + text.slice(aL, aR) + (aR < text.length ? '\u2026' : '');
}
