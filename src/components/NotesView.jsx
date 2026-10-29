import { BlockMath, InlineMath } from 'react-katex';

// Renders text with $inline math$ and **bold**.
export function Rich({ text }) {
  if (!text) return null;
  return text.split(/(\*\*[^*]+\*\*|\$[^$]+\$|\*[^*\s$][^*$]*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-text"><Rich text={part.slice(2, -2)} /></strong>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.length > 1 && part.startsWith('$') && part.endsWith('$')) return <InlineMath key={i} math={part.slice(1, -1)} />;
    return part;
  });
}

export function MathBlock({ tex }) {
  return (
    <div className="math-block my-4">
      <BlockMath math={tex} />
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse font-sans text-[0.95rem] leading-snug">
        <thead className="bg-raise text-left text-ash">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-3 py-2.5 font-medium">
                <Rich text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2.5 align-top ${j === 0 ? 'text-text' : 'text-text/85'}`}>
                  <Rich text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Block({ b }) {
  switch (b.type) {
    case 'math':
      return <MathBlock tex={b.tex} />;
    case 'list': {
      const L = b.ordered ? 'ol' : 'ul';
      return (
        <L className={`my-4 space-y-2 pl-6 ${b.ordered ? 'list-decimal' : 'list-disc marker:text-gold'}`}>
          {b.items.map((t, i) => (
            <li key={i} className="pl-1">
              <Rich text={t} />
            </li>
          ))}
        </L>
      );
    }
    case 'table':
      return <Table head={b.head} rows={b.rows} />;
    case 'note':
      return (
        <aside className="my-5 rounded-r-xl border-l-2 border-red/70 bg-red/[0.06] px-4 py-3 font-sans text-[0.98rem] leading-relaxed">
          <Rich text={b.text} />
        </aside>
      );
    case 'exam':
      return (
        <aside className="my-5 rounded-r-xl border-l-2 border-gold/70 bg-gold/[0.06] px-4 py-3 font-sans text-[0.98rem] leading-relaxed">
          <p className="mb-1 text-sm font-semibold text-gold">How to write this in the exam</p>
          <Rich text={b.text} />
        </aside>
      );
    default:
      return (
        <p className="my-4">
          <Rich text={b.text} />
        </p>
      );
  }
}

export default function NotesView({ module }) {
  return (
    <article className="prose-read text-text/90">
      {module.sections.map((s) => (
        <section key={s.heading} id={s.heading} className="mb-12">
          <h2 className="display mb-3 text-[1.7rem] font-medium leading-tight text-text">{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} b={b} />
          ))}
        </section>
      ))}
    </article>
  );
}
