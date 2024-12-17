import React from 'react';
import { Card, isPlayable } from '../utils/gameUtils';

interface PlayerProps {
  hand: Card[];
  isCurrentPlayer: boolean;
  onPlayCard: (index: number) => void;
  topCard: Card;
  playerNumber: number;
}

const Player: React.FC<PlayerProps> = ({ hand, isCurrentPlayer, onPlayCard, topCard, playerNumber }) => {
  return (
    <div className={`p-4 rounded-lg ${isCurrentPlayer ? 'bg-yellow-300' : 'bg-gray-300'}`}>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        Player {playerNumber}
      </h2>
      <div className="flex flex-wrap gap-2">
        {hand.map((card, index) => (
          <button
            key={index}
            className={`w-16 h-24 rounded-lg ${
              isCurrentPlayer && isPlayable(card, topCard) 
                ? 'bg-white hover:bg-gray-100 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'
            } border-2 border-gray-400 transition-colors`}
            onClick={() => onPlayCard(index)}
            disabled={!isCurrentPlayer || !isPlayable(card, topCard)}
          >
            <div className={`font-bold ${getCardColor(card.color)}`}>{card.value}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

function getCardColor(color: string): string {
  switch (color) {
    case 'red': return 'text-red-700';
    case 'blue': return 'text-blue-700';
    case 'green': return 'text-green-700';
    case 'yellow': return 'text-yellow-700';
    default: return 'text-gray-900';
  }
}

export default Player;

