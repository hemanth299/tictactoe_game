import React, { useState } from 'react';
import Board from './components/Board';
import './components/styles.scss';
import { Winner } from './components/Winner';
import { StatusMessage } from './components/statusMessage';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player1,setplayer1] = useState(true);
  const winner = Winner(squares)==='X'?'Player 1 (X)':Winner(squares)==='O'?'Player 2 (O)':null;
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
        <StatusMessage winner={winner} player1={player1} squares={squares}/>
        <Board squares={squares} handleClick={handleClick}/>
      </div>
    </>
  )
}

export default App;
