import React from 'react';
import { Card } from '../utils/gameUtils'; // Importing the Card type from game utilities

// Props for the DiscardPile component, with an optional topCard
interface DiscardPileProps {
  topCard?: Card; // Represents the top card on the discard pile
}

// DiscardPile component to display the top card or show an empty state
const DiscardPile: React.FC<DiscardPileProps> = ({ topCard }) => {
  // If no card is present, render an empty discard pile
  if (!topCard) {
    return (
      <div className="w-24 h-36 rounded-lg shadow-md bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-2xl font-bold">Empty</span>
      </div>
    );
  }

  // Render the discard pile with the top card's color and value
  return (
    <div
      className={`w-24 h-36 rounded-lg shadow-md bg-${topCard.color}-500 flex items-center justify-center`}
    >
      <span className="text-white text-2xl font-bold">{topCard.value}</span>
    </div>
  );
};

export default DiscardPile;
