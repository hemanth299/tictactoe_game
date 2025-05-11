import React, { useState } from 'react';
import Board from './components/Board';
import './components/styles.scss';
import { Winner } from './components/Winner';
import { StatusMessage } from './components/statusMessage';
import { History } from './components/History';

// Helper to initialize a new game
const newGame = () => ({
  history: [Array(9).fill(null)],
  currentMove: 0,
});

function App() {
  const [gameState, setGameState] = useState(newGame());
  const { history, currentMove } = gameState;

  const currentSquares = history[currentMove];
  const player1 = currentMove % 2 === 0;
  const winner = Winner(currentSquares);

  const handleClick = (position) => {
    if (currentSquares[position] || winner) return;

    const newSquares = currentSquares.map((val, idx) =>
      idx === position ? (player1 ? 'X' : 'O') : val
    );

    const newHistory = [...history.slice(0, currentMove + 1), newSquares];

    setGameState({
      history: newHistory,
      currentMove: newHistory.length - 1,
    });
  };

  const jumpToMove = (move) => {
    setGameState((prev) => ({
      ...prev,
      currentMove: move,
    }));
  };

  const resetGame = () => {
    setGameState(newGame());
  };

  return (
    <div>
      <h1 className='title'>Tic Tac Toe</h1>
      <StatusMessage winner={winner} player1={player1} squares={currentSquares} />
      
      <div className='game-container'>
  <div className='board-wrapper'>
    <Board squares={currentSquares} handleClick={handleClick} />
   <button className="reset-btn" onClick={resetGame}>
  🔄 Start New Game
</button>

  </div>
  <History history={history} jumpToMove={jumpToMove} />

      </div>
    </div>
  );
}

export default App;
