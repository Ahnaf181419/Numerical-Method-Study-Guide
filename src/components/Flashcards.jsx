import { useRef, useState } from 'react';
import { Rich } from './NotesView.jsx';

export default function Flashcards({ module, known, onToggleKnown }) {
  const [hideKnown, setHideKnown] = useState(false);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const startX = useRef(null);

  const deck = module.flashcards.map((c, idx) => ({ ...c, idx })).filter((c) => !hideKnown || !known.includes(c.idx));
  const card = deck[Math.min(i, deck.length - 1)];
  const go = (step) => {
    setFlipped(false);
    setI((n) => (Math.min(n, deck.length - 1) + step + deck.length) % deck.length);
  };

  const onPointerDown = (e) => (startX.current = e.clientX);
  const onPointerUp = (e) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    else setFlipped((f) => !f);
  };

  const header = (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ash">
      <span>
        {known.length} of {module.flashcards.length} marked known
      </span>
      <label className="flex min-h-11 items-center gap-2">
        <input type="checkbox" className="size-5 accent-gold" checked={hideKnown} onChange={(e) => (setHideKnown(e.target.checked), setI(0), setFlipped(false))} />
        Hide known cards
      </label>
    </div>
  );

  if (!card)
    return (
      <div>
        {header}
        <p className="rounded-xl border border-line bg-panel p-8 text-center text-ash">You have marked every card in this module as known. Untick “Hide known cards” to review them again.</p>
      </div>
    );

  const isKnown = known.includes(card.idx);
  return (
    <div className="mx-auto max-w-2xl">
      {header}
      <div className="[perspective:1400px]">
        <div
          role="button"
          tabIndex={0}
          aria-label={flipped ? 'Answer. Tap to show the question' : 'Question. Tap to show the answer'}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') (e.preventDefault(), setFlipped((f) => !f));
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
          }}
          className={`card-3d relative grid min-h-72 touch-pan-y select-none ${flipped ? 'flipped' : ''}`}
        >
          <div className="face col-start-1 row-start-1 flex flex-col justify-between rounded-2xl border border-line bg-panel p-6 sm:p-8">
            <span className="text-sm text-ash">Question</span>
            <p className="prose-read my-6 text-center text-2xl leading-snug">
              <Rich text={card.front} />
            </p>
            <span className="text-center text-sm text-ash">Tap to flip, swipe for next</span>
          </div>
          <div className="face face-back col-start-1 row-start-1 flex flex-col justify-between rounded-2xl border border-gold/40 bg-raise p-6 sm:p-8">
            <span className="text-sm text-gold">Answer</span>
            <p className="prose-read my-6 text-center text-xl leading-relaxed">
              <Rich text={card.back} />
            </p>
            <span />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button onClick={() => go(-1)} className="min-h-12 rounded-xl border border-line px-5 text-text active:bg-raise">
          Previous
        </button>
        <span className="text-sm tabular-nums text-ash">
          {Math.min(i, deck.length - 1) + 1} / {deck.length}
        </span>
        <button onClick={() => go(1)} className="min-h-12 rounded-xl border border-line px-5 text-text active:bg-raise">
          Next
        </button>
      </div>
      <button
        onClick={() => onToggleKnown(card.idx)}
        aria-pressed={isKnown}
        className={`mt-3 min-h-12 w-full rounded-xl border px-5 font-medium ${isKnown ? 'border-gold/50 bg-gold/10 text-gold' : 'border-line text-ash active:bg-raise'}`}
      >
        {isKnown ? 'Known ✓ (tap to unmark)' : 'I know this card'}
      </button>
    </div>
  );
}
