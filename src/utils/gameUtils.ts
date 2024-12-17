export type CardColor = 'red' | 'blue' | 'green' | 'yellow';
export type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'skip' | 'reverse' | 'draw2';
export type Card = { color: CardColor; value: CardValue };

export function createDeck(): Card[] {
  const colors: CardColor[] = ['red', 'blue', 'green', 'yellow'];
  const values: CardValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];
  const deck: Card[] = [];

  for (const color of colors) {
    for (const value of values) {
      deck.push({ color, value });
      if (value !== '0') {
        deck.push({ color, value });
      }
    }
  }

  return shuffleDeck(deck);
}

export function shuffleDeck(deck: Card[]): Card[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function isPlayable(card: Card, topCard: Card): boolean {
  return card.color === topCard.color || card.value === topCard.value;
}

export function isSpecialCard(card: Card): boolean {
  return ['skip', 'reverse', 'draw2'].includes(card.value);
}

