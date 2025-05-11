export const StatusMessage = ({ winner, player1,squares }) => {
  const isFull = squares.every(cell => cell !== null);
  if (winner) {
    return <div className="status">You Win: {winner}</div>;
  }
  else if (isFull) {
    return <div className="status">It's a Draw!</div>;
  }
  return <div className="status">Your Choice: {player1 ? 'Player 1 (X)' : 'Player 2 (O)'}</div>;
};