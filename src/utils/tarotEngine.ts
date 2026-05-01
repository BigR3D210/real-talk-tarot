import { TarotCard, ReadingType, tarotDeck } from '../data/tarotDeck';
import { Spread } from '../data/spreads';

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position: string;
  positionDescription: string;
}

export interface Reading {
  id: string;
  date: string;
  readingType: ReadingType;
  spreadId: string;
  spreadName: string;
  question: string;
  drawnCards: DrawnCard[];
  overallSummary: string;
  realTalkMessage: string;
  advice: string;
}

// Fisher-Yates shuffle
const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const isReversed = (): boolean => Math.random() < 0.3; // 30% chance reversed

export const drawCards = (spread: Spread): DrawnCard[] => {
  const shuffled = shuffleDeck(tarotDeck);
  const drawn = shuffled.slice(0, spread.cardCount);
  return drawn.map((card, i) => ({
    card,
    isReversed: isReversed(),
    position: spread.positions[i].name,
    positionDescription: spread.positions[i].description,
  }));
};

const getCardMeaning = (drawnCard: DrawnCard, readingType: ReadingType): string => {
  const { card, isReversed: reversed } = drawnCard;
  switch (readingType) {
    case 'love':
      return reversed ? card.loveReversed : card.loveUpright;
    case 'money':
      return reversed ? card.moneyReversed : card.moneyUpright;
    case 'career':
      return reversed ? card.careerReversed : card.careerUpright;
    case 'selfGrowth':
      return reversed ? card.selfGrowthReversed : card.selfGrowthUpright;
    case 'yesNo':
      return reversed
        ? `${card.yesNoReversed} — ${card.generalReversed}`
        : `${card.yesNoUpright} — ${card.generalUpright}`;
    case 'daily':
    default:
      return reversed ? card.generalReversed : card.generalUpright;
  }
};

const summaryTemplates = {
  love: [
    'The energy in your love life right now is asking for {tone}. Your cards reveal a story about {theme}, and the overall direction points toward {direction}.',
    'When it comes to love, these cards speak clearly: {tone}. The pattern here is {theme}. What this means in practice: {direction}.',
    'Your heart is navigating something real right now. The cards see {tone} energy at the center of it. The thread running through this reading is {theme}, and it\'s pointing you toward {direction}.',
  ],
  money: [
    'Your financial picture right now is telling a story about {tone}. At the core: {theme}. The cards are pointing toward {direction}.',
    'Money energy right now: {tone}. The deeper pattern here is {theme}. Your best move is to focus on {direction}.',
    'These cards see the following around your finances: {tone} is the dominant energy. The real issue is {theme}. Movement comes through {direction}.',
  ],
  career: [
    'Your career is in a moment of {tone}. The cards reveal that {theme} is central to where you are. The path forward involves {direction}.',
    'Professional energy right now: {tone}. What\'s really going on is {theme}. What moves things: {direction}.',
    'The cards see {tone} at the heart of your career story. The challenge and opportunity both live in {theme}. Forward motion means {direction}.',
  ],
  selfGrowth: [
    'Your growth edge right now is about {tone}. The cards see {theme} as the central work. The way through: {direction}.',
    'This reading points to {tone} as the core energy in your self-growth journey. What\'s being asked of you: {theme}. The next chapter opens through {direction}.',
    'The cards are reflecting {tone} back at you. The pattern that keeps showing up: {theme}. Real transformation happens through {direction}.',
  ],
  yesNo: [
    'The cards have spoken on your question. The dominant energy is {tone}, and the overall answer leans toward {direction}. Keep in mind: {theme}.',
    'Your question has a clear directional answer in these cards: {direction}. The energy around it is {tone}, with {theme} as an important factor.',
    'Yes or no questions always have context. The energy here is {tone}. The cards lean {direction}, with one important caveat: {theme}.',
  ],
  daily: [
    'Today\'s energy is {tone}. The cards see {theme} as the central theme to navigate. Lean into {direction}.',
    'Your day is shaped by {tone} energy. Pay attention to {theme} as things unfold. Your best move: {direction}.',
    'The invitation for today is {tone}. Especially notice {theme} in your interactions and decisions. Open yourself to {direction}.',
  ],
};

const tones: Record<string, string[]> = {
  positive: ['clarity', 'momentum', 'growth', 'strength', 'opportunity', 'transformation', 'joy', 'abundance'],
  challenging: ['tension', 'resistance', 'difficulty', 'complexity', 'pressure', 'uncertainty'],
  neutral: ['change', 'transition', 'reflection', 'awareness', 'recalibration', 'honesty'],
};

const themes: string[] = [
  'the need for honest self-assessment',
  'a transition between who you were and who you\'re becoming',
  'the tension between what you want and what you\'re doing',
  'the importance of boundaries and clarity',
  'the power of consistent, focused action',
  'the courage it takes to let something go',
  'the value of asking for help',
  'the relationship between effort and trust',
  'your deep capacity for resilience',
  'the role of intuition in this situation',
  'alignment between your values and your choices',
  'what you\'re carrying that needs to be put down',
  'the connection between patience and power',
  'what it means to truly show up for yourself',
  'the difference between fear and wisdom',
];

const directions: string[] = [
  'taking clear, grounded action on what you already know',
  'trusting the process while staying present to what needs your attention',
  'releasing what no longer serves the version of you that\'s emerging',
  'leading with both your head and your heart',
  'doing the uncomfortable work that creates real change',
  'staying in integrity even when it\'s inconvenient',
  'choosing quality of attention over quantity of action',
  'honoring your intuition as a legitimate source of wisdom',
  'making the decision you\'ve been postponing',
  'investing in what has long-term value, not just immediate relief',
  'reclaiming your agency in a situation where you\'ve been passive',
  'communicating clearly what you need',
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateSummary = (drawnCards: DrawnCard[], readingType: ReadingType): string => {
  const allReversed = drawnCards.every(dc => dc.isReversed);
  const allUpright = drawnCards.every(dc => !dc.isReversed);
  const tonePool = allReversed
    ? [...tones.challenging, ...tones.neutral]
    : allUpright
    ? [...tones.positive, ...tones.neutral]
    : [...tones.positive, ...tones.challenging, ...tones.neutral];

  const templates = summaryTemplates[readingType] || summaryTemplates.daily;
  const template = pick(templates);
  return template
    .replace('{tone}', pick(tonePool))
    .replace('{theme}', pick(themes))
    .replace('{direction}', pick(directions));
};

const generateRealTalk = (drawnCards: DrawnCard[]): string => {
  const messages = drawnCards.map(dc =>
    dc.isReversed ? dc.card.realTalkReversed : dc.card.realTalkUpright
  );
  // Combine 1-2 real talk messages into a cohesive message
  if (messages.length === 1) return messages[0];
  const selected = [messages[0], messages[Math.floor(messages.length / 2)]].filter(Boolean);
  return selected.join(' And then also: ');
};

const adviceTemplates: string[] = [
  'The most powerful thing you can do right now is to stop asking whether you\'re ready and start acting from where you are.',
  'Give this situation the gift of your honest attention -- not the story you\'ve been telling yourself, but the truth as it actually is.',
  'One small, clear, aligned action taken today is worth more than twenty perfectly planned ones that never happen.',
  'The situation calls for presence over performance. Show up as you actually are, not as you think you should be.',
  'What this reading is ultimately saying: trust yourself more than you have been. Your instincts are sound. Act on them.',
  'The path forward isn\'t complicated, even if it feels that way. Simplify, focus, and take the next obvious step.',
  'You have more agency in this situation than you\'re using. Start using it.',
  'Lead with clarity and kindness -- toward yourself and toward others. Everything else follows from that.',
  'Whatever needs to end, let it end cleanly. Whatever needs to begin, begin it honestly. That\'s the whole instruction.',
  'The reading is showing you something you already know at some level. The question is whether you\'re going to act on it.',
];

const generateAdvice = (drawnCards: DrawnCard[], readingType: ReadingType): string => {
  // Generate advice based on last card in spread (outcome/advice position) or random
  const adviceCard = drawnCards[drawnCards.length - 1];
  let baseAdvice = getCardMeaning(adviceCard, readingType);
  const extraAdvice = pick(adviceTemplates);
  return `${baseAdvice} ${extraAdvice}`;
};

export const generateReading = (
  drawnCards: DrawnCard[],
  readingType: ReadingType,
  spread: Spread,
  question: string = ''
): Reading => {
  return {
    id: `reading-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readingType,
    spreadId: spread.id,
    spreadName: spread.name,
    question,
    drawnCards,
    overallSummary: generateSummary(drawnCards, readingType),
    realTalkMessage: generateRealTalk(drawnCards),
    advice: generateAdvice(drawnCards, readingType),
  };
};

export const getCardMeaningForReading = getCardMeaning;

// LocalStorage helpers
const STORAGE_KEY = 'rtt-saved-readings';

export const saveReading = (reading: Reading): void => {
  const existing = getSavedReadings();
  const updated = [reading, ...existing].slice(0, 20); // max 20 saved
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getSavedReadings = (): Reading[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const deleteReading = (id: string): void => {
  const existing = getSavedReadings();
  const updated = existing.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const readingTypeLabels: Record<ReadingType, string> = {
  love: 'Love Reading',
  money: 'Money Reading',
  career: 'Career Reading',
  selfGrowth: 'Self-Growth Reading',
  yesNo: 'Yes or No',
  daily: 'Daily Card',
};

export const readingTypeEmojis: Record<ReadingType, string> = {
  love: '♥',
  money: '◈',
  career: '▲',
  selfGrowth: '✦',
  yesNo: '?',
  daily: '☽',
};
