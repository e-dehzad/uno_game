'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, createDeck, isPlayable } from '../utils/gameUtils'; // Importing utility functions and types
import Player from './Player'; // Player component
import Deck from './Deck'; // Deck component
import DiscardPile from './DiscardPile'; // Discard pile component
import Instructions from './Instructions'; // Instructions component

const Game: React.FC = () => {
  // State variables for game logic
  const [deck, setDeck] = useState<Card[]>([]); // Cards remaining in the draw pile
  const [players, setPlayers] = useState<Card[][]>([[], [], [], []]); // Hands of the players
  const [currentPlayer, setCurrentPlayer] = useState(0); // Index of the current player
  const [discardPile, setDiscardPile] = useState<Card[]>([]); // Cards in the discard pile
  const [direction, setDirection] = useState(1); // Direction of play (1 for clockwise, -1 for counterclockwise)
  const [winner, setWinner] = useState<number | null>(null); // Index of the winner, if any
  const [justDrawnCard, setJustDrawnCard] = useState<Card | null>(null); // Card recently drawn by the current player

  // Function to initialize or reset the game
  const initializeGame = useCallback(() => {
    const newDeck = createDeck(); // Create a shuffled deck
    const initialHands = [
      newDeck.slice(0, 7), // First player's hand
      newDeck.slice(7, 14), // Second player's hand
      newDeck.slice(14, 21), // Third player's hand
      newDeck.slice(21, 28), // Fourth player's hand
    ];
    const initialDiscardPile = [newDeck[28]]; // Top card starts the discard pile
    
    setDeck(newDeck.slice(29)); // Set the remaining deck
    setPlayers(initialHands); // Initialize players' hands
    setDiscardPile(initialDiscardPile); // Set initial discard pile
    setCurrentPlayer(0); // Set first player as the current player
    setDirection(1); // Reset direction to clockwise
    setWinner(null); // Clear winner
    setJustDrawnCard(null); // Clear drawn card
  }, []);

  // Automatically initialize the game on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Function to handle a player drawing a card
  const drawCard = useCallback(() => {
    if (deck.length === 0) {
      // If deck is empty, reshuffle discard pile or skip turn
      if (discardPile.length > 1) {
        const newDeck = shuffleDeck([...discardPile.slice(0, -1)]);
        setDeck(newDeck);
        setDiscardPile([discardPile[discardPile.length - 1]]);
      } else {
        setCurrentPlayer((prevPlayer) => (prevPlayer + direction + 4) % 4); // Skip turn
        return;
      }
    }

    const drawnCard = deck[0]; // Draw the top card

    setPlayers((prevPlayers) => {
      // Add the drawn card to the current player's hand
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayer] = [...newPlayers[currentPlayer], drawnCard];
      return newPlayers;
    });

    setDeck((prevDeck) => prevDeck.slice(1)); // Remove the drawn card from the deck
    setJustDrawnCard(drawnCard); // Update the drawn card state
  }, [deck, discardPile, currentPlayer, direction]);

  // Function to handle a player playing a card
  const playCard = useCallback((cardIndex: number) => {
    const card = players[currentPlayer][cardIndex]; // Selected card
    const topCard = discardPile[discardPile.length - 1]; // Current top card of discard pile

    if (isPlayable(card, topCard)) {
      setPlayers((prevPlayers) => {
        // Remove played card from player's hand
        const newPlayers = [...prevPlayers];
        newPlayers[currentPlayer] = [
          ...newPlayers[currentPlayer].slice(0, cardIndex),
          ...newPlayers[currentPlayer].slice(cardIndex + 1),
        ];

        if (newPlayers[currentPlayer].length === 0) {
          setWinner(currentPlayer); // Declare winner if player has no cards left
        }

        return newPlayers;
      });

      setDiscardPile((prevPile) => [...prevPile, card]); // Add played card to discard pile

      if (players[currentPlayer].length > 1) {
        // Determine the next player and handle special cards
        let nextPlayer = (currentPlayer + direction + 4) % 4;

        if (card.value === 'skip') {
          nextPlayer = (nextPlayer + direction + 4) % 4;
        } else if (card.value === 'reverse') {
          setDirection((prevDirection) => -prevDirection);
          nextPlayer = (currentPlayer - direction + 4) % 4;
        } else if (card.value === 'draw2') {
          setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            newPlayers[nextPlayer] = [...newPlayers[nextPlayer], ...deck.slice(0, 2)];
            return newPlayers;
          });
          setDeck((prevDeck) => prevDeck.slice(2)); // Remove two cards from the deck
          nextPlayer = (nextPlayer + direction + 4) % 4;
        }

        setCurrentPlayer(nextPlayer); // Update current player
      }

      setJustDrawnCard(null); // Clear drawn card state
    }
  }, [players, currentPlayer, discardPile, direction, deck]);

  // Function to end the current player's turn
  const endTurn = useCallback(() => {
    setCurrentPlayer((prevPlayer) => (prevPlayer + direction + 4) % 4); // Move to next player
    setJustDrawnCard(null); // Clear drawn card
  }, [direction]);

  // Render the game UI
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-8">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-black">Uno Game</h1>
      {winner !== null ? (
        <div className="text-2xl font-bold mb-4 text-black dark:text-black">Player {winner + 1} wins!</div>
      ) : (
        <>
          {/* Discard pile */}
          <div className="mb-4">
            <DiscardPile topCard={discardPile[discardPile.length - 1]} />
          </div>
          {/* Draw pile */}
          <div className="mb-4">
            <Deck onDraw={drawCard} />
          </div>
          {/* Player hands */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {players.map((hand, index) => (
              <Player
                key={index}
                hand={hand}
                isCurrentPlayer={index === currentPlayer}
                onPlayCard={playCard}
                topCard={discardPile[discardPile.length - 1]}
                playerNumber={index + 1}
                justDrawnCard={index === currentPlayer ? justDrawnCard : null}
              />
            ))}
          </div>
          {justDrawnCard && (
            <div className="mb-4">
              <button 
                onClick={endTurn}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                End Turn
              </button>
            </div>
          )}
        </>
      )}
      {/* Reset game and show instructions */}
      <div className="flex space-x-4">
        <button 
          onClick={initializeGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reset Game
        </button>
        <Instructions onClose={() => {}} />
      </div>
    </div>
  );
};

export default Game;

// Helper function to shuffle an array of cards
const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]; // Swap cards
  }
  return newDeck; // Return shuffled deck
};
