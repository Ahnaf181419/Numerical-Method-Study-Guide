import { useState } from 'react';
import { Choice } from './Learn.jsx';

export const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// Runs a list of MCQs one at a time. Questions may carry a `tag` (chapter) for the breakdown.
export default function Quiz({ questions, best, onFinish, renderResult }) {
  const [round, setRound] = useState(0);
  const [order, setOrder] = useState(() => questions);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const total = order.length;
  const score = answers.filter(Boolean).length;

  if (i === total) {
    const restart = () => (setOrder(shuffle(questions)), setRound(round + 1), setI(0), setAnswers([]));
    const pct = Math.round((score / total) * 100);
    return (
      <div className="enter mx-auto max-w-xl rounded-2xl border border-line bg-panel p-8 text-center">
        <p className="text-ash">Your score</p>
        <p className="display my-2 text-7xl tabular-nums text-gold">
          {score}
          <span className="text-4xl text-ash">/{total}</span>
        </p>
        <p className="mb-6 text-ash">
          {pct >= 80 ? 'Exam-ready on this set.' : pct >= 50 ? 'Getting there. Review the lessons you missed.' : 'Go back through the lessons, then try again.'}
          {best != null && ` Best so far: ${Math.max(best, score)}/${total}.`}
        </p>
        {renderResult?.(order, answers)}
        <button onClick={restart} className="press min-h-12 rounded-xl bg-gold px-6 font-semibold text-ink">
          Retake (shuffled)
        </button>
      </div>
    );
  }

  const answered = answers.length > i;
  const next = () => {
    if (i + 1 === total) onFinish?.(score, order, answers);
    setI(i + 1);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-ash">
        <span className="tabular-nums">
          Question {i + 1} of {total}
        </span>
        <span className="tabular-nums">Score {score}</span>
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-line">
        <div className="bar-fill h-full w-full bg-gold" style={{ transform: `scaleX(${i / total})` }} />
      </div>
      <div key={`${round}-${i}`} className="enter-next">
        {order[i].tag && <p className="mb-2 text-sm text-ash">{order[i].tag}</p>}
        <Choice item={order[i]} onAnswer={(ok) => setAnswers([...answers, ok])} />
      </div>
      {answered && (
        <button onClick={next} className="press enter mt-6 min-h-12 w-full rounded-xl bg-gold px-6 font-semibold text-ink">
          {i + 1 === total ? 'See score' : 'Next question'}
        </button>
      )}
    </div>
  );
}
