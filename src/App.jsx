import React, { useState } from 'react';
import Board from './components/Board';
import './components/styles.scss';
import { Winner } from './components/Winner';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player1,setplayer1] = useState(true);
  const player = player1?'Player 1 (X)':'Player 2 (O)';
  const winner = Winner(squares)==='X'?'Player 1 (X)':Winner(squares)==='O'?'Player 2 (O)':null;
  const status = winner ? `You Win: ${winner}` : `Your Choice : ${player}`;
    const handleClick = (position) => {
    if(squares[position] || winner){
      return;
    }
    setSquares((current)=>{
      return current.map((squareValue, pos)=>{
        if(pos===position){
          return player1?'X':'O';
        }
        else{
          return squareValue;
        }
      })
    })
    setplayer1((current)=> !current);
    }
  return (
    <>
      <div>
        <h1 className='title'>Tic Tac Toe</h1>
        <h2 className='status'>{status} </h2>
        <Board squares={squares} handleClick={handleClick}/>
      </div>
    </>
  )
}

export default App;
