// Types for Uno card colors, values, and cards
export type CardColor = 'red' | 'blue' | 'green' | 'yellow';
export type CardValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'skip' | 'reverse' | 'draw2';
export type Card = { color: CardColor; value: CardValue };

// Function to create and shuffle a new Uno deck
export function createDeck(): Card[] {
  const colors: CardColor[] = ['red', 'blue', 'green', 'yellow'];
  const values: CardValue[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];
  const deck: Card[] = [];

  for (const color of colors) {
    // Add one '0' card for each color
    deck.push({ color, value: '0' });
    
    // Add two of each for other numbers and action cards
    for (const value of values.slice(1)) {
      deck.push({ color, value });
      deck.push({ color, value });
    }
  }

  // Shuffle the deck before returning
  return shuffleDeck(deck);
}

// Function to shuffle an array of cards
export function shuffleDeck(deck: Card[]): Card[] {
  return [...deck].sort(() => Math.random() - 0.5);
}

// Function to check if a card can be played on top of another card
export function isPlayable(card: Card, topCard?: Card): boolean {
  if (!topCard) return true; // If there's no top card, any card can be played
  return card.color === topCard.color || card.value === topCard.value;
}

