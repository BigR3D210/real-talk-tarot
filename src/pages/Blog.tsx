import { Link } from 'react-router-dom';

const articles = [
  {
    slug: 'what-does-it-mean-when-you-pull-the-lovers',
    title: 'What Does It Mean When You Pull The Lovers?',
    excerpt:
      'The Lovers card shows up and suddenly everyone\'s mind goes one place. But this card is about more than romance — it\'s about alignment, choice, and what you actually want.',
    category: 'Card Meanings',
    readTime: '4 min read',
    symbol: '♥',
  },
  {
    slug: 'is-a-tarot-reading-accurate',
    title: 'Is A Tarot Reading Accurate?',
    excerpt:
      'Short answer: it depends on what you\'re asking it to do. Tarot isn\'t a fortune-telling machine — it\'s a mirror. Here\'s what the research and real experience say about how accurate readings actually are.',
    category: 'Tarot Basics',
    readTime: '5 min read',
    symbol: '✦',
  },
  {
    slug: 'best-tarot-spreads-for-love-questions',
    title: 'Best Tarot Spreads For Love Questions',
    excerpt:
      'Not every spread works for every question. If you\'re asking about a relationship, these are the layouts that actually give you useful answers — not just vague cosmic reassurance.',
    category: 'Spreads',
    readTime: '6 min read',
    symbol: '◈',
  },
  {
    slug: 'how-to-ask-better-tarot-questions',
    title: 'How To Ask Better Tarot Questions',
    excerpt:
      '"Will he come back?" is the wrong question. Here\'s how to reframe what you\'re asking so the cards give you something actionable instead of something that makes you spiral.',
    category: 'Technique',
    readTime: '4 min read',
    symbol: '☽',
  },
  {
    slug: 'daily-tarot-reading-how-to-use-one-card-pulls',
    title: 'Daily Tarot Reading: How To Use One Card Pulls',
    excerpt:
      'One card. One minute. Real clarity. The daily pull is the most underrated tarot practice — here\'s how to actually use it so it\'s not just a pretty ritual with no payoff.',
    category: 'Daily Practice',
    readTime: '3 min read',
    symbol: '▲',
  },
];

const categoryColors: Record<string, string> = {
  'Card Meanings': 'text-gold border-gold/30',
  'Tarot Basics': 'text-mist border-mist/30',
  'Spreads': 'text-amethyst border-amethyst/30',
  'Technique': 'text-gold-light border-gold-light/30',
  'Daily Practice': 'text-ivory border-ivory/20',
};

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="font-cinzel text-3xl sm:text-4xl text-gold mb-3">The Real Talk Blog</h1>
        <p className="text-mist font-cormorant italic text-lg max-w-md mx-auto">
          No fluff. No filler. Just honest guides on tarot, spreads, card meanings, and getting
          the most out of your readings.
        </p>
      </div>

      {/* Featured article */}
      <div className="mystic-card p-8 border-gold/30 mb-8 hover:border-gold/50 transition-all duration-300 group">
        <div className="flex items-start gap-5">
          <div className="text-5xl opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
            {articles[0].symbol}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-raleway border rounded-full px-2 py-0.5 ${categoryColors[articles[0].category]}`}
              >
                {articles[0].category}
              </span>
              <span className="text-smoke/40 text-xs font-raleway">{articles[0].readTime}</span>
              <span className="text-xs font-raleway bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5">
                Featured
              </span>
            </div>
            <h2 className="font-cinzel text-xl text-ivory group-hover:text-gold transition-colors leading-snug">
              {articles[0].title}
            </h2>
            <p className="text-mist font-cormorant text-base leading-relaxed">{articles[0].excerpt}</p>
            <button className="text-gold font-raleway text-sm hover:text-gold-light transition-colors">
              Read article (coming soon) →
            </button>
          </div>
        </div>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {articles.slice(1).map((article) => (
          <div
            key={article.slug}
            className="mystic-card p-6 border-gold/15 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs font-raleway border rounded-full px-2 py-0.5 ${categoryColors[article.category]}`}
              >
                {article.category}
              </span>
              <span className="text-2xl opacity-50 group-hover:opacity-80 transition-opacity">
                {article.symbol}
              </span>
            </div>
            <h3 className="font-cinzel text-base text-ivory group-hover:text-gold transition-colors mb-3 leading-snug">
              {article.title}
            </h3>
            <p className="text-smoke font-raleway text-sm leading-relaxed flex-1">{article.excerpt}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10">
              <span className="text-smoke/40 font-raleway text-xs">{article.readTime}</span>
              <button className="text-gold/60 font-raleway text-xs hover:text-gold transition-colors">
                Coming soon →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter / CTA */}
      <div className="mt-12 mystic-card p-8 border-gold/20 bg-gradient-to-br from-abyss to-void text-center">
        <div className="text-3xl mb-4">✦</div>
        <h2 className="font-cinzel text-xl text-gold mb-3">Want a reading instead?</h2>
        <p className="text-mist font-cormorant italic text-base mb-6 max-w-sm mx-auto">
          The blog is for context. The reading is for clarity.
        </p>
        <Link to="/reading" className="btn-gold px-8 py-3 inline-block">
          Start Your Reading
        </Link>
      </div>
    </div>
  );
}
