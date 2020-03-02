import React, { useEffect, useState } from 'react';
import { generate } from 'shortid';

import initialise from './initialise';

import './App.scss';

import sprite from './sprite.jpg';
import mario from './mario.png';

const BoardSquare = ({ id, isPlayerPosition, isSpritePosition }) => {
  let imageToShow = '';
  if (isPlayerPosition) imageToShow = mario;
  if (isSpritePosition) imageToShow = sprite;
  return (
    <div className="board-square">
      {imageToShow ? <img src={imageToShow} alt="..." /> : null}
    </div>
  );
};

const Board = ({ squares, width, height, spritePositions, playerPosition }) => (
  <div className="board" style={{ width: `${(width + width / 10) * 30}px` }}>
    {squares.map(square => (
      <BoardSquare
        key={generate()}
        isSpritePosition={spritePositions.includes(square)}
        isPlayerPosition={square === playerPosition}
        id={square}
      />
    ))}
  </div>
);

const App = () => {
  const [boardDimension, setBoardDimension] = useState({ width: 0, height: 0 });
  const [playerPosition, setPlayerPosition] = useState(45);
  const [positions, setPositions] = useState({
    squares: [],
    spritePositions: [],
  });
  const [steps, setSteps] = useState(0);
  const [push, setPush] = useState(true);
  const [keyCode, setKeyCode] = useState(0);
  const [boardShouldBeInitialised, setBoardShouldBeInitialised] = useState(true);
  const { squares, spritePositions } = positions;
  const { width, height } = boardDimension;
  const mazeCanBeDisplayed = width >= 8 && height >= 8;

  const onkeydown = ({ keyCode }) => {
    const pushPlayer = [38, 40, 37, 39].includes(keyCode);
    if (pushPlayer) {
      setKeyCode(keyCode);
      setPush(pushPlayer);
    }
  };

  const initialiseBoard = () => {
    const { width, height, squares, spritePositions, playerPosition } = initialise();
    setBoardDimension({ width, height });
    setPositions({ squares, spritePositions });
    setPlayerPosition(playerPosition);
    setBoardShouldBeInitialised(false);
    document.onkeydown = onkeydown;
  };

  if (boardShouldBeInitialised) initialiseBoard();

  const updateBoard = nextPosition => {
    if (spritePositions.includes(nextPosition))
      setPositions({
        ...positions,
        spritePositions: spritePositions.filter(
          position => position !== nextPosition
        )
      });
    setPlayerPosition(nextPosition);
    setSteps(steps + 1);
    setPush(false);
  };

  useEffect(() => {
    const movePlayer = () => {
      switch (keyCode) {
        case 38:
          {
            const nextPosition = playerPosition - Number(width);
            updateBoard(nextPosition);
          }
          break;
        case 40:
          {
            const nextPosition = playerPosition + Number(width);
            updateBoard(nextPosition);
          }
          break;
        case 37:
          {
            const nextPosition = playerPosition - 1;
            updateBoard(nextPosition);
          }
          break;
        case 39:
          {
            const nextPosition = playerPosition + 1;
            updateBoard(nextPosition);
          }
          break;
        default:
          return;
      }
    };
    const allSpritesKilled = spritePositions.length === 0 && keyCode !== 0;
    if (allSpritesKilled)
      return alert(`Hurray, you killed all enemies in ${steps} step, reload page to play again`);
    if (push) return movePlayer();
  });

  return (
    <div className="game">
      {mazeCanBeDisplayed ? (
        <Board
          width={Number(width)}
          height={Number(height)}
          squares={squares}
          playerPosition={playerPosition}
          spritePositions={spritePositions}
        />
      ) : (
        <p>
          Please reload this page and specify an appropriate height and width
        </p>
      )}
    </div>
  );
};

export default App;
