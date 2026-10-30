import syllabus, { credit1 } from '../data/syllabusTopics.js';

const link = (url) => (
  <a href={url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-gold underline decoration-gold/40 underline-offset-2 [overflow-wrap:anywhere] hover:decoration-gold">
    {url.replace('https://', '')}
  </a>
);

const cell = 'px-3 py-2.5 align-top';

function TopicTable({ groups }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse font-sans text-[0.95rem] leading-snug">
        <thead className="bg-raise text-left text-ash">
          <tr>
            {groups.some((g) => g.label) && <th className={cell} />}
            <th className={`${cell} font-medium`}>Topic</th>
            <th className={`${cell} font-medium`}>Book Examples</th>
            <th className={`${cell} font-medium`}>Video Link</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) =>
            g.rows.map((r, i) => (
              <tr key={`${g.label}-${r.topic}`} className="border-t border-line">
                {i === 0 && g.label && (
                  <td rowSpan={g.rows.length} className={`${cell} w-24 border-r border-line/70 font-medium text-text/80`}>
                {g.label}
              </td>
                )}
                <td className={`${cell} text-text ${r.sub ? 'pl-8 text-text/80' : ''}`}>
                  {r.sub ? '▪ ' : ''}
                  {r.topic}
                </td>
                <td className={`${cell} whitespace-nowrap text-text/85 tabular-nums`}>{r.examples}</td>
                <td className={`${cell} min-w-40 text-sm`}>{r.video ? link(r.video) : ''}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}

function VideoTable({ videos }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse font-sans text-[0.95rem] leading-snug">
        <thead className="bg-raise text-left text-ash">
          <tr>
            <th className={`${cell} font-medium`}>Video</th>
            <th className={`${cell} font-medium`}>Link</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((v) => (
            <tr key={v.name} className="border-t border-line">
              <td className={`${cell} whitespace-nowrap text-text`}>{v.name}</td>
              <td className={`${cell} text-sm`}>{link(v.url)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChapterList({ rows, onOpen }) {
  return (
    <div className="my-5 grid gap-2">
      {rows.map((r) => (
        <button key={r.module} onClick={() => onOpen(r.module)} className="press flex min-h-12 items-center justify-between gap-3 rounded-lg border border-line bg-panel px-4 py-2.5 text-left text-text">
          {r.topic}
          <span className="shrink-0 text-sm text-gold">Open chapter →</span>
        </button>
      ))}
    </div>
  );
}

export default function Syllabus({ onOpen }) {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-9 sm:px-8">
      <p className="display text-lg text-gold">CSE 2201 final</p>
      <h1 className="display mt-1 text-[2.6rem] leading-[1.05] sm:text-6xl">Syllabus</h1>
      <p className="mt-3 text-sm text-ash">The Credit 1 topics, then Shuvo Sir’s topic-wise list with book examples and lecture videos, exactly as handed out.</p>

      <section className="mt-12">
        <h2 className="display text-2xl text-text">{credit1.title}</h2>
        <p className="mt-1 text-sm text-ash">{credit1.book}</p>
        <ChapterList rows={credit1.rows} onOpen={onOpen} />
      </section>

      <p className="display mt-14 text-lg text-gold">{syllabus.source}</p>
      {syllabus.sections.map((s) => (
        <section key={s.title} className="mt-12">
          <h2 className="display text-2xl text-text">{s.title}</h2>
          {s.book && <p className="mt-1 text-sm text-ash">{s.book}</p>}
          {s.groups && <TopicTable groups={s.groups} />}
          {s.rows && <TopicTable groups={[{ label: '', rows: s.rows }]} />}
          {s.note && <p className="mt-3 text-sm italic text-ash">{s.note}</p>}
          {s.examples && <p className="prose-read mt-4 text-[1.05rem] text-text/90">Book examples: {s.examples}</p>}
          {s.videos && <VideoTable videos={s.videos} />}
        </section>
      ))}
    </main>
  );
}
