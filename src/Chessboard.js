import React, { useState } from 'react';
import './Chessboard.css';

const Chessboard = () => {
  const [board, setBoard] = useState(generateInitialBoard());

  function generateInitialBoard() {
    const initialBoard = [];

    for (let row = 0; row < 8; row++) {
      const boardRow = [];
      for (let col = 0; col < 8; col++) {
        const randomColor = generateRandomRGBColor();
        boardRow.push({ row, col, color: randomColor });
      }
      initialBoard.push(boardRow);
    }

    return initialBoard;
  }

  function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleDragStart(e, row, col) {
    console.log('Start:'+row+'/'+col)
    e.dataTransfer.setData('sourceRow', row);
    e.dataTransfer.setData('sourceCol', col);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, targetRow, targetCol) {
    const sourceRow = parseInt(e.dataTransfer.getData('sourceRow'));
    const sourceCol = parseInt(e.dataTransfer.getData('sourceCol'));
  
    // Check if the source and target cells are the same
    if (sourceRow === targetRow && sourceCol === targetCol) {
      return;
    }
  
    const updatedBoard = board.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === sourceRow && colIndex === sourceCol) {
          return { ...board[targetRow][targetCol], row: sourceRow, col: sourceCol };
        }
        if (rowIndex === targetRow && colIndex === targetCol) {
          return { ...board[sourceRow][sourceCol], row: targetRow, col: targetCol };
        }
        return cell;
      });
    });
  
    console.log(sourceRow + '/' + sourceCol + '->' + targetRow + '/' + targetCol);
  
    setBoard(updatedBoard);
  
    // Reset the data transfer value
    e.dataTransfer.clearData();
  }
  
  
  

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: cell.color }}
              draggable
              onDragStart={(e) => handleDragStart(e, cell.row, cell.col)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, cell.row, cell.col)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
