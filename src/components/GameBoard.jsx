import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import Modal from "./Modal";

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍑"];

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    startGame();
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isRunning || isPaused) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const startGame = () => {
    const numPairs = getNumberOfPairs();
    const selectedSymbols = symbols.slice(0, numPairs);
    const shuffledCards = shuffle(
      [...selectedSymbols, ...selectedSymbols].map((symbol, id) => ({
        id,
        symbol,
      }))
    );

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoveCount(0);
    setMatchesCount(0);
    setTimer(0);
    setIsRunning(true);
    setIsPaused(false);
    setGameOver(false);
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const flipCard = (card) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(card) &&
      !matchedCards.includes(card) &&
      !isPaused
    ) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1.symbol === card2.symbol) {
        setMatchedCards((prev) => [...prev, card1, card2]);
        setMatchesCount((count) => count + 1);
      }
      setMoveCount((prev) => prev + 1);
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (Number(moveCount) === Number(getNumberOfPairs())) {
      setGameOver(true);
      setIsRunning(false);
    }
  }, [moveCount, difficulty]);

  const getNumberOfPairs = useCallback(() => {
    if (difficulty === "hard") return 16;
    if (difficulty === "medium") return 18;
    return 32;
  }, [difficulty]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) {
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 m-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Memory Game</h2>
      <div className="md:flex justify-center items-center gap-8">
        <button
          onClick={startGame}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
        >
          Restart Game
        </button>
        <button
          onClick={togglePause}
          className={`bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 ${
            isPaused ? "hover:bg-yellow-600" : "hover:bg-yellow-400"
          }`}
        >
          {isPaused ? "Resume Game" : "Pause Game"}
        </button>
      </div>
      <div className="flex md:justify-between md:gap-12 items-center md:flex-row flex-col justify-center mb-4">
        <p className="mt-4 text-2xl font-semibold mb-4">
          Matches Found: {matchesCount}
        </p>
        <p className="mt-4 text-2xl font-semibold mb-4">Moves: {moveCount}</p>
        <p className="mt-4 text-2xl font-semibold mb-4">Time: {timer}s</p>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy </option>
            <option value="medium">Medium </option>
            <option value="hard">Hard </option>
          </select>
        </label>
      </div>

      <div className={`grid md:grid-cols-4 grid-cols-4 gap-4`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleClick={() => flipCard(card)}
            flipped={flippedCards.includes(card) || matchedCards.includes(card)}
          />
        ))}
      </div>

      {gameOver && (
        <Modal onRestart={startGame} message="Well played! Congratulations!" />
      )}
    </div>
  );
};

export default GameBoard;
