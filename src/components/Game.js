import {useState} from 'react';
import { Board } from "./Board";

export const Game = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move)=>{
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  });
  let status;

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i) {
    const tempHistory = history.slice(0, stepNumber + 1);
    const tempCurrent = tempHistory[tempHistory.length - 1];
    const tempSquares = tempCurrent.squares.slice();
    // 勝敗がついた　or　値が埋まっている場合は何もしない
    if (calculateWinner(tempSquares) || tempSquares[i]) {
      return;
    }
    tempSquares[i] = xIsNext ? 'X':'O';

    setHistory(tempHistory.concat({squares: tempSquares})); // push() メソッドの方に慣れているかもしれませんが、それと違って concat() は元の配列をミューテートしないため、こちらを利用します。
    setStepNumber(tempHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }
  
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );

}