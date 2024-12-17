import React from 'react';
import { Card } from '../utils/gameUtils';

interface DiscardPileProps {
  topCard: Card;
}

const DiscardPile: React.FC<DiscardPileProps> = ({ topCard }) => {
  return (
    <div className={`w-24 h-36 rounded-lg shadow-md ${getBackgroundColor(topCard.color)} flex items-center justify-center border-2 border-gray-300`}>
      <span className="text-white text-2xl font-bold">{topCard.value}</span>
    </div>
  );
};

function getBackgroundColor(color: string): string {
  switch (color) {
    case 'red': return 'bg-red-600';
    case 'blue': return 'bg-blue-600';
    case 'green': return 'bg-green-600';
    case 'yellow': return 'bg-yellow-500';
    default: return 'bg-gray-600';
  }
}

export default DiscardPile;

