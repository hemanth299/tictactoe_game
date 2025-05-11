import React, { useState } from 'react';
import Board from './components/Board';
import './components/styles.scss';
import { Winner } from './components/Winner';
import { StatusMessage } from './components/statusMessage';
import { History } from './components/History';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [player1, setPlayer1] = useState(true);

  const currentSquares = history[currentMove];
  const winnerRaw = Winner(currentSquares);
  const winner = winnerRaw === 'X' ? 'Player 1 (X)' : winnerRaw === 'O' ? 'Player 2 (O)' : null;

  const handleClick = (position) => {
    if (currentSquares[position] || winner) return;

    const newSquares = currentSquares.map((val, idx) =>
      idx === position ? (player1 ? 'X' : 'O') : val
    );

    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setPlayer1((prev) => !prev);
  };

  const jumpToMove = (move) => {
    setCurrentMove(move);
    setPlayer1(move % 2 === 0);
  };

  return (
    <div>
      <h1 className='title'>Tic Tac Toe</h1>
      <StatusMessage winner={winner} player1={player1} squares={currentSquares} />
      <div className='game-container'>
      <Board squares={currentSquares} handleClick={handleClick} />
      <History history={history} jumpToMove={jumpToMove} />
    </div>
    </div>
  );
}

export default App;
