import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSavedReadings, deleteReading, Reading, readingTypeLabels, readingTypeEmojis } from '../utils/tarotEngine';

function ReadingCard({ reading, onDelete }: { reading: Reading; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mystic-card border-gold/20 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-gold/5 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{readingTypeEmojis[reading.readingType]}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-cinzel text-ivory text-sm">{readingTypeLabels[reading.readingType]}</h3>
              <span className="text-smoke/50 font-raleway text-xs">|</span>
              <span className="text-smoke font-raleway text-xs">{reading.spreadName}</span>
            </div>
            <p className="text-smoke/60 font-raleway text-xs mt-1">
              {new Date(reading.date).toLocaleDateString('en-US', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
              })}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {reading.drawnCards.map((d, i) => (
                <span
                  key={i}
                  className="text-xs font-raleway text-mist/70 border border-gold/10 rounded px-1.5 py-0.5"
                >
                  {d.card.name}{d.isReversed ? ' ↓' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className="text-gold/40 text-lg shrink-0 mt-0.5">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-gold/10 pt-4">
          {/* Cards by position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {reading.drawnCards.map((d, i) => (
              <div key={i} className="bg-abyss rounded p-3 border border-gold/10">
                <p className="text-gold/60 font-cinzel text-xs mb-1">{d.position}</p>
                <p className="text-ivory font-cinzel text-sm">
                  {d.card.symbol} {d.card.name}
                  {d.isReversed && <span className="text-smoke/60 text-xs ml-1">(Reversed)</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <p className="text-gold/50 font-cinzel text-xs mb-2">Reading Summary</p>
            <p className="text-mist font-cormorant text-base leading-relaxed">{reading.overallSummary}</p>
          </div>

          {/* Real Talk */}
          <div className="bg-amethyst/5 border border-amethyst/20 rounded p-3">
            <p className="text-xs text-smoke/60 font-raleway mb-1">Real Talk</p>
            <p className="font-cormorant italic text-ivory text-sm">"{reading.realTalkMessage}"</p>
          </div>

          {/* Guidance */}
          <div>
            <p className="text-gold/50 font-cinzel text-xs mb-2">Guidance</p>
            <p className="text-smoke font-raleway text-sm leading-relaxed">{reading.advice}</p>
          </div>

          {/* Delete */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onDelete}
              className="text-xs font-raleway text-smoke/40 hover:text-red-400/70 transition-colors border border-transparent hover:border-red-400/20 rounded px-3 py-1.5"
            >
              Delete Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Saved() {
  const [readings, setReadings] = useState<Reading[]>([]);

  useEffect(() => {
    setReadings(getSavedReadings());
  }, []);

  const handleDelete = (id: string) => {
    deleteReading(id);
    setReadings((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-cinzel text-3xl sm:text-4xl text-gold mb-3">Saved Readings</h1>
        <p className="text-mist font-cormorant italic text-lg">
          {readings.length > 0
            ? `${readings.length} reading${readings.length === 1 ? '' : 's'} saved to this device.`
            : 'Your reading history lives here.'}
        </p>
      </div>

      {readings.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="text-6xl opacity-20">☽</div>
          <p className="text-smoke font-cormorant italic text-xl">No saved readings yet.</p>
          <p className="text-smoke/60 font-raleway text-sm max-w-sm mx-auto">
            After you complete a reading, hit "Save Reading" to keep it here for reference.
          </p>
          <Link to="/reading" className="btn-gold px-8 py-3 inline-block">
            Start a Reading
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {readings
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((reading) => (
              <ReadingCard
                key={reading.id}
                reading={reading}
                onDelete={() => handleDelete(reading.id)}
              />
            ))}

          <p className="text-center text-smoke/40 font-raleway text-xs pt-4">
            Readings are stored locally on this device. Clearing browser data will remove them.
          </p>
        </div>
      )}
    </div>
  );
}
