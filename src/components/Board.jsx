import React, { useState } from 'react';
import Square from './Square';
import './styles.scss';

const Board = ()=>{
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player1,setplayer1] = useState(true);
  const handleClick = (position) => {
    if(squares[position]){
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
  const renderSquare = (index) => {
    return (
      <Square value={squares[index]} onClick={()=>{handleClick(index)}}/>
    )
  }
  return (
    <div className='board'>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
export default Board;