import React from 'react';
import { Card, isPlayable } from '../utils/gameUtils';

interface PlayerProps {
  hand: Card[]; // The player's hand of cards
  isCurrentPlayer: boolean; // Whether this player is the current player
  onPlayCard: (index: number) => void; // Function to handle playing a card
  topCard?: Card; // The top card on the discard pile
  playerNumber: number; // The player's number
  justDrawnCard: Card | null; // The card the player just drew, if any
}

const Player: React.FC<PlayerProps> = ({
  hand,
  isCurrentPlayer,
  onPlayCard,
  topCard,
  playerNumber,
  justDrawnCard,
}) => {
  // Get styles for each card based on its properties
  const getCardStyle = (card: Card, isCardPlayable: boolean) => {
    const baseColor = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
    }[card.color] || 'bg-gray-500'; // Default to gray if color is undefined
    
    const textColor = isCardPlayable ? 'text-black' : 'text-white';
    const opacity = isCardPlayable ? 'opacity-100' : 'opacity-50';
    const glow = isCardPlayable ? 'shadow-lg shadow-white/50' : '';
    const cursor = isCardPlayable ? 'cursor-pointer' : 'cursor-not-allowed';

    return `${baseColor} ${textColor} ${opacity} ${glow} ${cursor}`;
  };

  // Render card content (special handling for action cards)
  const renderCardContent = (card: Card) => {
    switch (card.value) {
      case 'reverse':
      case 'skip':
      case 'draw2':
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-sm font-bold transform -rotate-90">
              {card.value === 'draw2' ? 'DRAW 2' : card.value.toUpperCase()}
            </span>
          </div>
        );
      default:
        return <div className="text-xl font-bold">{card.value}</div>;
    }
  };

  return (
    <div className={`p-4 rounded-lg ${isCurrentPlayer ? 'bg-yellow-200' : 'bg-gray-300'}`}>
      {/* Player label */}
      <h2 className="text-xl font-semibold mb-2 text-black dark:text-black">
        Player {playerNumber}
      </h2>
      {/* Render cards in the player's hand */}
      <div className="flex flex-wrap gap-2">
        {isCurrentPlayer
          ? hand.map((card, index) => {
              const isCardPlayable = !topCard || isPlayable(card, topCard);
              return (
                <button
                  key={index}
                  className={`w-16 h-24 rounded-lg ${getCardStyle(card, isCardPlayable)}
                    transition-all duration-200 ease-in-out
                    ${justDrawnCard && card === justDrawnCard ? 'ring-2 ring-white' : ''}
                    ${isCardPlayable ? 'hover:scale-105' : ''}`}
                  onClick={() => onPlayCard(index)}
                  disabled={!isCardPlayable}
                  aria-label={`${card.color} ${card.value} ${isCardPlayable ? 'playable' : 'not playable'}`}
                >
                  {renderCardContent(card)}
                </button>
              );
            })
          : // Hide cards of other players
            hand.map((_, index) => (
              <div key={index} className="w-16 h-24 bg-gray-400 rounded-lg" aria-hidden="true"></div>
            ))}
      </div>
    </div>
  );
};

export default Player;
