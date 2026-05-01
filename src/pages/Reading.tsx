import { useState } from 'react';
import { ReadingType } from '../data/tarotDeck';
import { Spread } from '../data/spreads';
import { drawCards, generateReading, type Reading } from '../utils/tarotEngine';
import ReadingSelector from '../components/ReadingSelector';
import ReadingResult from '../components/ReadingResult';

type Phase = 'select' | 'result';

export default function Reading() {
  const [phase, setPhase] = useState<Phase>('select');
  const [reading, setReading] = useState<Reading | null>(null);

  const handleReady = (readingType: ReadingType, spread: Spread, question: string) => {
    const drawnCards = drawCards(spread);
    const newReading = generateReading(drawnCards, readingType, spread, question);
    setReading(newReading);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    setReading(null);
    setPhase('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      {phase === 'select' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="font-cinzel text-3xl sm:text-4xl text-gold mb-3">Your Reading</h1>
            <p className="text-mist font-cormorant italic text-lg">
              Choose your focus, pick your spread, and let the cards speak.
            </p>
          </div>
          <ReadingSelector onReady={handleReady} />
        </div>
      )}

      {phase === 'result' && reading && (
        <ReadingResult reading={reading} onStartOver={handleStartOver} />
      )}
    </div>
  );
}
