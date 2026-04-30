export interface SpreadPosition {
  name: string;
  description: string;
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export const spreads: Spread[] = [
  {
    id: 'single',
    name: 'Single Card',
    description: 'One card. Direct answer. No noise.',
    cardCount: 1,
    positions: [
      { name: 'The Message', description: 'What the universe wants you to hear right now.' },
    ],
  },
  {
    id: 'past-present-future',
    name: 'Past / Present / Future',
    description: 'Where you\'ve been, where you are, where you\'re headed.',
    cardCount: 3,
    positions: [
      { name: 'Past', description: 'What shaped this situation or brought you here.' },
      { name: 'Present', description: 'The energy and truth of right now.' },
      { name: 'Future', description: 'Where this is heading if you continue on this path.' },
    ],
  },
  {
    id: 'situation-obstacle-advice',
    name: 'Situation / Obstacle / Advice',
    description: 'The full picture: what\'s happening, what\'s in your way, and what to do.',
    cardCount: 3,
    positions: [
      { name: 'Situation', description: 'The current energy and circumstances.' },
      { name: 'Obstacle', description: 'What is blocking or complicating things.' },
      { name: 'Advice', description: 'What the cards recommend you do.' },
    ],
  },
  {
    id: 'deep-dive',
    name: '5-Card Deep Dive',
    description: 'Full-spectrum reading across past, present, future, self, and external forces.',
    cardCount: 5,
    positions: [
      { name: 'Past Foundation', description: 'What brought you to this moment.' },
      { name: 'Present Energy', description: 'The current reality and your position in it.' },
      { name: 'Hidden Influence', description: 'What\'s operating beneath the surface.' },
      { name: 'Advice', description: 'What to embrace or release.' },
      { name: 'Outcome', description: 'The most likely result if you follow this guidance.' },
    ],
  },
];

export const getSpreadById = (id: string): Spread | undefined =>
  spreads.find(s => s.id === id);
