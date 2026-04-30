import { Link } from 'react-router-dom';
import { readingTypeLabels, readingTypeEmojis } from '../utils/tarotEngine';
import { ReadingType } from '../data/tarotDeck';

const readingTypes: ReadingType[] = ['love', 'money', 'career', 'selfGrowth', 'yesNo', 'daily'];

const steps = [
  {
    icon: '✦',
    title: 'Choose Your Focus',
    body: 'Pick the area of life you want clarity on: love, money, career, or a direct yes/no answer.',
  },
  {
    icon: '◈',
    title: 'Select a Spread',
    body: 'One card for a quick hit, three cards for context, or five for the full picture.',
  },
  {
    icon: '☽',
    title: 'Shuffle and Draw',
    body: 'Hold your question in mind. The deck is shuffled, the cards are drawn, and the message is yours.',
  },
  {
    icon: '⚡',
    title: 'Get the Real Talk',
    body: 'No fluff. Your reading gives you meaning, context, and straight-up guidance on what the cards are saying.',
  },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-96 h-96 rounded-full bg-gold blur-3xl" />
        </div>
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <div className="flex justify-center gap-3 mb-4">
            {['✦', '☽', '✦'].map((s, i) => (
              <span key={i} className="text-gold/50 text-lg animate-pulse" style={{ animationDelay: `${i * 0.4}s` }}>
                {s}
              </span>
            ))}
          </div>
          <h1 className="font-cinzel text-5xl sm:text-7xl font-bold shimmer-text leading-tight">
            Real Talk<br />Tarot
          </h1>
          <p className="font-cormorant text-xl sm:text-2xl text-mist italic leading-relaxed">
            No mystical nonsense. No vague cosmic platitudes.<br />
            Just cards, clarity, and the truth you already know.
          </p>
          <div className="pt-4">
            <Link to="/reading" className="btn-gold text-base px-10 py-4 inline-block glow-gold">
              Start Your Reading
            </Link>
          </div>
          <p className="text-smoke font-raleway text-sm pt-2">
            Free. Instant. No sign-up required.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-8 bg-gold/30 mx-auto" />
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-cinzel text-3xl text-gold mb-3">How It Works</h2>
          <p className="text-smoke font-raleway text-sm max-w-md mx-auto">
            Four steps. A few seconds. Real insight.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="mystic-card p-6 border-gold/20 hover:border-gold/40 transition-all duration-300 group">
              <div className="text-3xl text-gold mb-3 group-hover:scale-110 transition-transform inline-block">
                {step.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gold/40 font-cinzel text-xs">0{i + 1}</span>
                <h3 className="font-cinzel text-ivory text-base">{step.title}</h3>
              </div>
              <p className="text-smoke font-raleway text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Types */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-cinzel text-3xl text-gold mb-3">What Do You Need?</h2>
          <p className="text-smoke font-raleway text-sm max-w-md mx-auto">
            Pick a reading type and let the cards do the rest.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {readingTypes.map((type) => (
            <Link
              key={type}
              to="/reading"
              className="mystic-card p-5 text-center border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{readingTypeEmojis[type]}</div>
              <h3 className="font-cinzel text-sm text-ivory">{readingTypeLabels[type]}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/reading" className="btn-gold px-8 py-3 inline-block">
            Start a Reading
          </Link>
        </div>
      </section>

      {/* Card Meanings Teaser */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="mystic-card p-8 border-gold/20 bg-gradient-to-br from-abyss to-void text-center">
          <div className="text-4xl mb-4">✦</div>
          <h2 className="font-cinzel text-2xl text-gold mb-3">Explore the Full Deck</h2>
          <p className="text-mist font-cormorant text-lg italic mb-6 max-w-md mx-auto leading-relaxed">
            All 78 tarot cards. Upright and reversed. Love, money, career,
            self-growth, and yes/no meanings for each.
          </p>
          <Link to="/cards" className="btn-outline px-8 py-3 inline-block">
            Browse Card Meanings
          </Link>
        </div>
      </section>

      {/* Trust / Disclaimer */}
      <section className="max-w-2xl mx-auto px-4 text-center">
        <div className="space-y-3">
          <div className="flex justify-center gap-4 text-gold/30 text-sm font-cinzel">
            <span>78 Cards</span>
            <span>|</span>
            <span>6 Reading Types</span>
            <span>|</span>
            <span>4 Spreads</span>
          </div>
          <p className="text-smoke/60 font-raleway text-xs leading-relaxed max-w-lg mx-auto">
            Tarot readings are for reflection, entertainment, and personal insight.
            They should not replace professional financial, medical, legal, or mental health advice.
            Real Talk Tarot is a tool for self-reflection, not prediction.
          </p>
        </div>
      </section>
    </div>
  );
}
