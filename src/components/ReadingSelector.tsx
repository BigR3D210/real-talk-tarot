import { useState } from 'react';
import { ReadingType } from '../data/tarotDeck';
import { spreads, Spread } from '../data/spreads';
import { readingTypeLabels, readingTypeEmojis } from '../utils/tarotEngine';

interface ReadingSelectorProps {
  onReady: (readingType: ReadingType, spread: Spread) => void;
}

const readingTypes: ReadingType[] = ['love', 'money', 'career', 'selfGrowth', 'yesNo', 'daily'];

const readingDescriptions: Record<ReadingType, string> = {
  love: 'Relationships, attraction, connection, and the heart.',
  money: 'Finances, abundance, flow, and what blocks it.',
  career: 'Work, ambition, purpose, and next moves.',
  selfGrowth: 'Inner work, growth edges, and who you are becoming.',
  yesNo: 'A direct answer to a specific question.',
  daily: 'Energy and guidance for today.',
};

export default function ReadingSelector({ onReady }: ReadingSelectorProps) {
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [shuffling, setShuffling] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const handleShuffle = () => {
    if (!selectedType || !selectedSpread) return;
    setShuffling(true);
    setTimeout(() => {
      setShuffling(false);
      setShuffled(true);
    }, 1800);
  };

  const handleReveal = () => {
    if (selectedType && selectedSpread) {
      onReady(selectedType, selectedSpread);
    }
  };

  return (
    <div className="space-y-10">
      {/* Reading Type */}
      <div>
        <h2 className="font-cinzel text-xl text-gold mb-2">Choose Your Reading</h2>
        <p className="text-smoke text-sm mb-5 font-raleway">What area of life needs clarity right now?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {readingTypes.map((type) => (
            <button
              key={type}
              onClick={() => { setSelectedType(type); setShuffled(false); }}
              className={`mystic-card p-4 text-left transition-all duration-300 hover:border-gold/60 ${
                selectedType === type
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                  : 'border-gold/20'
              }`}
            >
              <div className="text-2xl mb-2">{readingTypeEmojis[type]}</div>
              <div className="font-cinzel text-sm text-ivory mb-1">{readingTypeLabels[type]}</div>
              <div className="text-xs text-smoke font-raleway leading-relaxed">
                {readingDescriptions[type]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Spread Selection */}
      {selectedType && (
        <div className="animate-fade-up">
          <h2 className="font-cinzel text-xl text-gold mb-2">Choose Your Spread</h2>
          <p className="text-smoke text-sm mb-5 font-raleway">How deep do you want to go?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spreads.map((spread) => (
              <button
                key={spread.id}
                onClick={() => { setSelectedSpread(spread); setShuffled(false); }}
                className={`mystic-card p-4 text-left transition-all duration-300 hover:border-gold/60 ${
                  selectedSpread?.id === spread.id
                    ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                    : 'border-gold/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinzel text-sm text-ivory">{spread.name}</span>
                  <span className="text-xs text-gold font-raleway border border-gold/30 rounded-full px-2 py-0.5">
                    {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
                  </span>
                </div>
                <p className="text-xs text-smoke font-raleway leading-relaxed">{spread.description}</p>
                {selectedSpread?.id === spread.id && (
                  <div className="mt-3 space-y-1">
                    {spread.positions.map((pos, i) => (
                      <div key={i} className="text-xs text-mist font-raleway flex gap-2">
                        <span className="text-gold/60">{i + 1}.</span>
                        <span>{pos.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shuffle + Reveal */}
      {selectedType && selectedSpread && (
        <div className="animate-fade-up text-center space-y-4">
          {!shuffled ? (
            <>
              <p className="text-smoke font-cormorant text-lg italic">
                Take a breath. Hold your question in mind.
              </p>
              <button
                onClick={handleShuffle}
                disabled={shuffling}
                className="btn-gold text-base px-8 py-3 relative overflow-hidden"
              >
                {shuffling ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block">✦</span>
                    Shuffling the deck...
                  </span>
                ) : (
                  'Shuffle the Deck'
                )}
              </button>
              {shuffling && (
                <div className="flex justify-center gap-2 mt-2">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-9 rounded bg-abyss border border-gold/30 animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="mystic-card p-4 border-gold/40 bg-gold/5 inline-block mx-auto">
                <p className="text-gold font-cinzel text-sm">✦ The deck is ready ✦</p>
                <p className="text-mist font-cormorant text-sm italic mt-1">
                  Your {selectedSpread.cardCount === 1 ? 'card is' : `${selectedSpread.cardCount} cards are`} waiting.
                </p>
              </div>
              <button onClick={handleReveal} className="btn-gold text-base px-8 py-3 glow-gold">
                Reveal My Cards
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
