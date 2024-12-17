'use client'

import React, { useState, useEffect } from 'react';
import { Card, createDeck, isPlayable, isSpecialCard } from '../utils/gameUtils';
import Player from './Player';
import Deck from './Deck';
import DiscardPile from './DiscardPile';

const Game: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [players, setPlayers] = useState<Card[][]>([[], [], [], []]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [direction, setDirection] = useState(1);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newDeck = createDeck();
    let initialCard: Card;

    do {
      initialCard = newDeck.pop()!;
    } while (isSpecialCard(initialCard));

    setDeck(newDeck);
    setPlayers([
      newDeck.splice(0, 7),
      newDeck.splice(0, 7),
      newDeck.splice(0, 7),
      newDeck.splice(0, 7),
    ]);
    setDiscardPile([initialCard]);
    setCurrentPlayer(0);
    setDirection(1);
    setWinner(null);
  };

  const drawCard = () => {
    if (deck.length === 0) {
      if (discardPile.length > 1) {
        const topCard = discardPile.pop()!;
        setDeck(shuffleDeck([...discardPile]));
        setDiscardPile([topCard]);
      } else {
        // Game ends in a draw if no cards are left
        return;
      }
    }

    const newCard = deck[deck.length - 1];
    setPlayers(players.map((hand, i) => i === currentPlayer ? [...hand, newCard] : hand));
    setDeck(deck.slice(0, -1));

    if (!canPlay(players[currentPlayer], discardPile[discardPile.length - 1])) {
      nextTurn();
    }
  };

  const canPlay = (hand: Card[], topCard: Card): boolean => {
    return hand.some(card => isPlayable(card, topCard));
  };

  const playCard = (cardIndex: number) => {
    const card = players[currentPlayer][cardIndex];
    if (isPlayable(card, discardPile[discardPile.length - 1])) {
      const newHand = [...players[currentPlayer]];
      newHand.splice(cardIndex, 1);
      setPlayers(players.map((hand, i) => i === currentPlayer ? newHand : hand));
      setDiscardPile([...discardPile, card]);

      if (newHand.length === 0) {
        setWinner(currentPlayer);
        return;
      }

      if (card.value === 'skip') {
        nextTurn();
      } else if (card.value === 'reverse') {
        setDirection(-direction);
      } else if (card.value === 'draw2') {
        const nextPlayerIndex = (currentPlayer + direction + 4) % 4;
        setPlayers(players.map((hand, i) => i === nextPlayerIndex ? [...hand, ...deck.slice(-2)] : hand));
        setDeck(deck.slice(0, -2));
        nextTurn();
      }

      nextTurn();
    }
  };

  const nextTurn = () => {
    setCurrentPlayer((currentPlayer + direction + 4) % 4);
  };

  const shuffleDeck = (deck: Card[]): Card[] => {
    return [...deck].sort(() => Math.random() - 0.5);
  };

  if (winner !== null) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen pt-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Uno Game</h1>
        <h2 className="text-2xl font-bold">Player {winner + 1} wins!</h2>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={initializeGame}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Uno Game</h1>
      <div className="mb-4">
        {discardPile.length > 0 && <DiscardPile topCard={discardPile[discardPile.length - 1]} />}
      </div>
      <div className="mb-4">
        <Deck onDraw={drawCard} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {players.map((hand, index) => (
          <Player
            key={index}
            hand={hand}
            isCurrentPlayer={index === currentPlayer}
            onPlayCard={playCard}
            topCard={discardPile[discardPile.length - 1]}
            playerNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;

