import { useState } from 'react';
import { type Reading, saveReading, readingTypeLabels, getCardMeaningForReading } from '../utils/tarotEngine';
import { CardFront } from './CardReveal';
import ShareImage from './ShareImage';

interface ReadingResultProps {
  reading: Reading;
  onStartOver: () => void;
}

export default function ReadingResult({ reading, onStartOver }: ReadingResultProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [allRevealed, setAllRevealed] = useState(false);
  const [showShareImage, setShowShareImage] = useState(false);

  const handleRevealCard = (index: number) => {
    const next = new Set(revealedCards);
    next.add(index);
    setRevealedCards(next);
    if (next.size === reading.drawnCards.length) {
      setTimeout(() => setAllRevealed(true), 600);
    }
  };

  const handleRevealAll = () => {
    const all = new Set(reading.drawnCards.map((_, i) => i));
    setRevealedCards(all);
    setTimeout(() => setAllRevealed(true), 600);
  };

  const handleSave = () => {
    saveReading(reading);
    setSaved(true);
  };

  const handleCopy = () => {
    const text = buildShareText(reading);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-10">
      {/* Reading header */}
      <div className="text-center">
        <p className="text-smoke font-raleway text-sm mb-1">{readingTypeLabels[reading.readingType]}</p>
        <h2 className="font-cinzel text-2xl text-gold mb-1">{reading.spreadName}</h2>
        <p className="text-mist font-cormorant italic text-base">
          {new Date(reading.date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
        {reading.question && (
          <div className="mt-4 inline-block mystic-card px-5 py-3 border-gold/20 bg-gold/5 max-w-lg">
            <p className="text-smoke/60 font-raleway text-xs mb-1">Your Question</p>
            <p className="text-ivory font-cormorant italic text-base">"{reading.question}"</p>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className={`grid gap-4 ${
        reading.drawnCards.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
        reading.drawnCards.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
      }`}>
        {reading.drawnCards.map((drawn, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
            {revealedCards.has(i) ? (
              <CardFront
                  drawnCard={drawn}
                  index={i}
                  positionLabel={drawn.position}
                  meaning={getCardMeaningForReading(drawn, reading.readingType)}
                />
            ) : (
              <button
                onClick={() => handleRevealCard(i)}
                className="w-full mystic-card p-6 text-center border-gold/30 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✦</div>
                <p className="font-cinzel text-xs text-gold/70 mb-1">{drawn.position}</p>
                <p className="text-smoke font-raleway text-xs">Tap to reveal</p>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Reveal all shortcut */}
      {revealedCards.size < reading.drawnCards.length && (
        <div className="text-center">
          <button onClick={handleRevealAll} className="btn-outline text-sm px-6 py-2">
            Reveal All Cards
          </button>
        </div>
      )}

      {/* Full reading content - shows after all revealed */}
      {allRevealed && (
        <div className="space-y-6 animate-fade-up">
          {/* Overall Summary */}
          <div className="mystic-card p-6 border-gold/30">
            <h3 className="font-cinzel text-gold text-lg mb-3 flex items-center gap-2">
              <span>✦</span> Overall Reading
            </h3>
            <p className="text-mist font-cormorant text-lg leading-relaxed">
              {reading.overallSummary}
            </p>
          </div>

          {/* Real Talk */}
          <div className="mystic-card p-6 border-amethyst/50 bg-amethyst/5">
            <h3 className="font-cinzel text-base mb-3 flex items-center gap-2" style={{ color: '#c084fc' }}>
              <span>⚡</span> Real Talk
            </h3>
            <p className="font-cormorant text-lg text-ivory leading-relaxed italic">
              "{reading.realTalkMessage}"
            </p>
          </div>

          {/* Advice */}
          <div className="mystic-card p-6 border-gold/20 bg-void/60">
            <h3 className="font-cinzel text-gold-light text-base mb-3 flex items-center gap-2">
              <span>◈</span> Guidance
            </h3>
            <p className="text-mist font-raleway text-sm leading-relaxed">
              {reading.advice}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 flex-wrap">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`btn-gold px-6 py-2.5 text-sm ${saved ? 'opacity-60 cursor-default' : ''}`}
            >
              {saved ? '✓ Reading Saved' : 'Save Reading'}
            </button>
            <button onClick={() => setShowShareImage(true)} className="btn-gold px-6 py-2.5 text-sm">
              Share as Image
            </button>
            <button onClick={handleCopy} className="btn-outline px-6 py-2.5 text-sm">
              {copied ? '✓ Copied!' : 'Copy Text'}
            </button>
            <button
              onClick={onStartOver}
              className="font-raleway text-sm text-smoke hover:text-gold transition-colors px-6 py-2.5 border border-transparent hover:border-gold/20 rounded"
            >
              Start Another Reading
            </button>
          </div>

          {/* Share Image Modal */}
          {showShareImage && (
            <ShareImage reading={reading} onClose={() => setShowShareImage(false)} />
          )}

          {/* Disclaimer */}
          <p className="text-center text-xs text-smoke/60 font-raleway pt-2 max-w-xl mx-auto leading-relaxed">
            Tarot readings are for reflection, entertainment, and personal insight. They should not replace
            professional financial, medical, legal, or mental health advice.
          </p>
        </div>
      )}
    </div>
  );
}

function buildShareText(reading: Reading): string {
  const date = new Date(reading.date).toLocaleDateString();
  const cards = reading.drawnCards
    .map(d => `${d.position}: ${d.card.name}${d.isReversed ? ' (Reversed)' : ''}`)
    .join('\n');
  const questionLine = reading.question ? `\nQuestion: "${reading.question}"\n` : '';
  return `Real Talk Tarot Reading - ${date}
${readingTypeLabels[reading.readingType]} | ${reading.spreadName}
${questionLine}
Cards:
${cards}

Summary:
${reading.overallSummary}

Real Talk:
"${reading.realTalkMessage}"

Guidance:
${reading.advice}

realtalktarot.com`;
}
