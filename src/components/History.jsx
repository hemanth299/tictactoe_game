import './styles.scss';

export const History = ({ history, jumpToMove }) => {
  return (
    <div className='history'>
      <h2>History</h2>
      <ul>
        {history.map((_, move) => (
          <li key={move}>
            <button onClick={() => jumpToMove(move)}>
              {move === 0 ? 'Go to Start' : `Go to move #${move}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
