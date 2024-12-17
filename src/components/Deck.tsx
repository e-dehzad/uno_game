import React from 'react';

interface DeckProps {
  onDraw: () => void;
}

const Deck: React.FC<DeckProps> = ({ onDraw }) => {
  return (
    <button
      className="w-24 h-36 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 font-bold transition-colors"
      onClick={onDraw}
    >
      Draw
    </button>
  );
};

export default Deck;

