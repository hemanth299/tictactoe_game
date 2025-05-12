import React, { useState, useRef, useEffect } from 'react';
import Board from './components/Board';
import './components/styles.scss';
import { Winner } from './components/Winner';
import { StatusMessage } from './components/statusMessage';
import { History } from './components/History';

const newGame = () => ({
  history: [Array(9).fill(null)],
  currentMove: 0,
});

function App() {
  const [gameState, setGameState] = useState(newGame());
  const { history, currentMove } = gameState;
  const currentSquares = history[currentMove];
  const player1 = currentMove % 2 === 0;
  const { winner, line: winningLine } = Winner(currentSquares);

  const audioRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.log('Autoplay blocked:', error);
        });
      }
    };

    // User interaction to allow autoplay
    window.addEventListener('click', playMusic, { once: true });

    return () => {
      window.removeEventListener('click', playMusic);
    };
  }, []);

  const handleClick = (position) => {
    if (!gameStarted || currentSquares[position] || winner) return;

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
    setGameStarted(true); // Start the game
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.log('Error playing music:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div>
      <div className="music-button-container">
        <button className="music-btn" onClick={toggleMusic}>
          {audioRef.current?.paused ? '🎵' : '🎵'}
        </button>
      </div>
      <h1 className="title">Tic Tac Toe</h1>
      {!gameStarted && (
            <div className="start-button-container">
              <button className="start-btn" onClick={resetGame}>
                Start New Game
              </button>
            </div>
          )}

      <div className={`game-container ${!gameStarted ? 'blurred' : ''}`}>
        <StatusMessage winner={winner} player1={player1} squares={currentSquares} />
        <div className="board-wrapper">
          <Board squares={currentSquares} handleClick={handleClick} winningLine={winningLine} />
          {gameStarted && (
            <button className="reset-btn" onClick={resetGame}>
              🔄 Start New Game
            </button>
          )}
        </div>
        <History history={history} jumpToMove={jumpToMove} />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/music/bgmusic.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;