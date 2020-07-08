import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { checkCollision, createMainScreen } from "../game-helpers";
import { keyCode } from "../constant";
import { useGameStatus } from "../hooks/useGameStatus";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useScreen } from "../hooks/useScreen";
import StartButton from "./Button";
import Display from "./Display";

// Components
import MainScreen from "./MainScreen";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [screen, setScreen, rowsCleared] = useScreen(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const movePlayer = useCallback(
    (direction) => {
      if (!checkCollision(player, screen, { x: direction, y: 0 })) {
        updatePlayerPosition({ x: direction, y: 0 });
      }
    },
    [player, screen, updatePlayerPosition]
  );

  const startGame = () => {
    // Reset everything
    setScreen(createMainScreen());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = useCallback(() => {
    //Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      //also increase speed
      setDropTime(1000 / (level + 1) + 50);
    }

    if (!checkCollision(player, screen, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.position.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  }, [level, setLevel, rows, screen, player, updatePlayerPosition]);

  const move = useCallback(
    (e) => {
      if (!gameOver) {
        if (e.keyCode === keyCode.LEFT) {
          movePlayer(-1);
        } else if (e.keyCode === keyCode.RIGHT) {
          movePlayer(1);
        } else if (e.keyCode === keyCode.DOWN) {
          drop();
        } else if (e.keyCode === keyCode.UP) {
          playerRotate(screen, 1);
        }
      }
    },
    [movePlayer, drop, playerRotate, screen, gameOver]
  );

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetris role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      {gameOver ? (
        <MainScreen screen={screen} gameOver={gameOver} />
      ) : (
        <MainScreen screen={screen} />
      )}
      <aside>
        <Display text={`Score: ${score}`} />
        <Display text={`Rows: ${rows}`} />
        <Display text={`Level: ${level}`} />

        <StartButton onclick={startGame} children="Start Game" />
      </aside>
    </StyledTetris>
  );
};
export default Tetris;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;
  border: none;

  :focus {
    outline: 0;
  }

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
