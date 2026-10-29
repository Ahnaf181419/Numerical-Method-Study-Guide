import { useEffect, useState } from 'react';

// Per-device progress: last module/mode, best quiz scores, cards marked known.
const KEY = 'cse2201-nm-progress';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(load);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      // private mode or blocked storage: progress just won't persist
    }
  }, [progress]);
  const update = (patch) => setProgress((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }));
  return [progress, update];
}

// 0–1 mastery of one chapter: lessons understood (50%), best quiz (30%), cards known (20%).
export function mastery(m, p) {
  const lessons = (p.learned?.[m.id]?.length ?? 0) / m.sections.length;
  const quiz = (p.quizBest?.[m.id] ?? 0) / m.quiz.length;
  const cards = (p.known?.[m.id]?.length ?? 0) / m.flashcards.length;
  return Math.min(1, 0.5 * lessons + 0.3 * quiz + 0.2 * cards);
}
