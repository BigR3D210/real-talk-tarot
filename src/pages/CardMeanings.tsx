import { useState, useMemo } from 'react';
import { tarotDeck, TarotCard, ReadingType } from '../data/tarotDeck';

const meaningTabs: { id: ReadingType | 'general'; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'love', label: 'Love' },
  { id: 'money', label: 'Money' },
  { id: 'career', label: 'Career' },
  { id: 'selfGrowth', label: 'Growth' },
  { id: 'yesNo', label: 'Yes/No' },
];

function getMeaning(card: TarotCard, tab: ReadingType | 'general', reversed: boolean): string {
  switch (tab) {
    case 'general': return reversed ? card.generalReversed : card.generalUpright;
    case 'love': return reversed ? card.loveReversed : card.loveUpright;
    case 'money': return reversed ? card.moneyReversed : card.moneyUpright;
    case 'career': return reversed ? card.careerReversed : card.careerUpright;
    case 'selfGrowth': return reversed ? card.selfGrowthReversed : card.selfGrowthUpright;
    case 'yesNo': return reversed
      ? `${card.yesNoReversed} — ${card.realTalkReversed}`
      : `${card.yesNoUpright} — ${card.realTalkUpright}`;
    default: return '';
  }
}

function CardModal({ card, onClose }: { card: TarotCard; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<ReadingType | 'general'>('general');
  const [reversed, setReversed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mystic-card max-w-lg w-full p-6 border-gold/40 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-4xl mb-2">{card.symbol}</div>
            <h2 className="font-cinzel text-xl text-gold">{card.name}</h2>
            <p className="text-smoke font-raleway text-xs mt-1">
              {card.arcana === 'major' ? 'Major Arcana' : `Minor Arcana — ${card.suit}`}
              {card.number !== undefined ? ` | ${card.number}` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-smoke hover:text-gold transition-colors font-cinzel text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <p className="text-xs text-smoke/60 font-raleway mb-2">
            {reversed ? 'Reversed Keywords' : 'Upright Keywords'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(reversed ? card.keywordsReversed : card.keywordsUpright).map((kw) => (
              <span key={kw} className="text-xs font-raleway px-2 py-0.5 border border-gold/20 text-mist rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Orientation Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setReversed(false)}
            className={`flex-1 py-1.5 text-xs font-raleway rounded border transition-colors ${
              !reversed ? 'bg-gold/10 border-gold/50 text-gold' : 'border-gold/20 text-smoke hover:border-gold/30'
            }`}
          >
            Upright
          </button>
          <button
            onClick={() => setReversed(true)}
            className={`flex-1 py-1.5 text-xs font-raleway rounded border transition-colors ${
              reversed ? 'bg-gold/10 border-gold/50 text-gold' : 'border-gold/20 text-smoke hover:border-gold/30'
            }`}
          >
            Reversed
          </button>
        </div>

        {/* Meaning Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {meaningTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-xs font-raleway rounded border transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold/10 border-gold/50 text-gold'
                  : 'border-gold/20 text-smoke hover:border-gold/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Meaning Text */}
        <div className="mystic-card p-4 border-gold/20 bg-void/50">
          <p className="font-cormorant text-mist text-base leading-relaxed">
            {getMeaning(card, activeTab, reversed)}
          </p>
        </div>

        {/* Real Talk */}
        <div className="mt-4 mystic-card p-4 border-amethyst/30 bg-amethyst/5">
          <p className="text-xs text-smoke/60 font-raleway mb-1">Real Talk</p>
          <p className="font-cormorant italic text-ivory text-sm leading-relaxed">
            "{reversed ? card.realTalkReversed : card.realTalkUpright}"
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CardMeanings() {
  const [search, setSearch] = useState('');
  const [filterArcana, setFilterArcana] = useState<'all' | 'major' | 'minor'>('all');
  const [filterSuit, setFilterSuit] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const filtered = useMemo(() => {
    return tarotDeck.filter((card) => {
      const matchesSearch =
        search === '' ||
        card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.keywordsUpright.some((k) => k.toLowerCase().includes(search.toLowerCase()));
      const matchesArcana = filterArcana === 'all' || card.arcana === filterArcana;
      const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;
      return matchesSearch && matchesArcana && matchesSuit;
    });
  }, [search, filterArcana, filterSuit]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-cinzel text-3xl sm:text-4xl text-gold mb-3">Card Meanings</h1>
        <p className="text-mist font-cormorant italic text-lg max-w-md mx-auto">
          All 78 cards. Upright and reversed. Click any card to explore its meanings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-abyss border border-gold/20 rounded px-4 py-2.5 text-ivory font-raleway text-sm focus:outline-none focus:border-gold/50 placeholder:text-smoke/50"
        />
        <div className="flex gap-2">
          {(['all', 'major', 'minor'] as const).map((a) => (
            <button
              key={a}
              onClick={() => { setFilterArcana(a); setFilterSuit('all'); }}
              className={`px-3 py-2.5 text-xs font-raleway border rounded capitalize transition-colors ${
                filterArcana === a
                  ? 'border-gold/50 bg-gold/10 text-gold'
                  : 'border-gold/20 text-smoke hover:border-gold/30'
              }`}
            >
              {a === 'all' ? 'All' : `${a} Arcana`}
            </button>
          ))}
        </div>
        {filterArcana === 'minor' && (
          <div className="flex gap-2 flex-wrap">
            {['all', 'wands', 'cups', 'swords', 'pentacles'].map((suit) => (
              <button
                key={suit}
                onClick={() => setFilterSuit(suit)}
                className={`px-3 py-2 text-xs font-raleway border rounded capitalize transition-colors ${
                  filterSuit === suit
                    ? 'border-gold/50 bg-gold/10 text-gold'
                    : 'border-gold/20 text-smoke hover:border-gold/30'
                }`}
              >
                {suit === 'all' ? 'All Suits' : suit}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card count */}
      <p className="text-smoke font-raleway text-xs mb-5">
        Showing {filtered.length} of 78 cards
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {filtered.map((card) => (
          <button
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className="mystic-card p-3 text-center border-gold/15 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{card.symbol}</div>
            <p className="font-cinzel text-xs text-ivory leading-tight">{card.name}</p>
            {card.suit && (
              <p className="text-smoke/50 font-raleway text-xs capitalize mt-0.5">{card.suit}</p>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-smoke font-cormorant italic text-lg">No cards match your search.</p>
          <button
            onClick={() => { setSearch(''); setFilterArcana('all'); setFilterSuit('all'); }}
            className="btn-outline text-sm px-6 py-2 mt-4"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
}
