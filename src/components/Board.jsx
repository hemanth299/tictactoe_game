import Square from './Square';
import './styles.scss';

const Board = ({ squares, handleClick, winningLine = [] }) => {
  // Determine the strike class based on the winning line
  const getStrikeClass = () => {
    if (!winningLine.length) return '';

    const [a, b, c] = winningLine;
    if (a === 0 && b === 1 && c === 2) return 'strike-row-0'; // First row
    if (a === 3 && b === 4 && c === 5) return 'strike-row-1'; // Second row
    if (a === 6 && b === 7 && c === 8) return 'strike-row-2'; // Third row
    if (a === 0 && b === 3 && c === 6) return 'strike-col-0'; // First column
    if (a === 1 && b === 4 && c === 7) return 'strike-col-1'; // Second column
    if (a === 2 && b === 5 && c === 8) return 'strike-col-2'; // Third column
    if (a === 0 && b === 4 && c === 8) return 'strike-diag-0'; // Diagonal top-left to bottom-right
    if (a === 2 && b === 4 && c === 6) return 'strike-diag-1'; // Diagonal top-right to bottom-left
    return '';
  };

  const strikeClass = getStrikeClass();

  const renderSquare = (index) => {
    const isWinning = winningLine.includes(index); // Check if the square is part of the winning line
    const value = squares[index];
    const valueClass = value === 'X' ? 'x' : value === 'O' ? 'o' : '';
    const winningClass = isWinning ? 'winning' : '';

    return (
      <Square
        key={index}
        value={value}
        onClick={() => handleClick(index)}
        className={`square ${valueClass} ${winningClass}`}
      />
    );
  };

  return (
    <div className={`board ${strikeClass}`}>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;