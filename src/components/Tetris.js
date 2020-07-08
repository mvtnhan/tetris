import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { createMainScreen, checkCollision } from "../game-helpers";
import { keyCode } from "../constant";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useScreen } from "../hooks/useScreen";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import MainScreen from "./MainScreen";
import Display from "./Display";
import StartButton from "./Button";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [screen, setScreen, rowsCleared] = useScreen(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  console.log("re-render");

  const movePlayer = (dir) => {
    if (!checkCollision(player, screen, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log("test");
    // Reset everything
    setScreen(createMainScreen());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      console.log(level);
      //also increase speed
      setDropTime(1000 / (level + 1) + 500);
    }

    if (!checkCollision(player, screen, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    console.log("interval off");
    setDropTime(null);
    drop();
  };

  const move = (e) => {
    if (gameOver) {
      return null;
    }
    if (e.keyCode === keyCode.LEFT) {
      movePlayer(-1);
    } else if (e.keyCode === keyCode.RIGHT) {
      movePlayer(1);
    } else if (e.keyCode === keyCode.DOWN) {
      dropPlayer();
    } else if (e.keyCode === keyCode.UP) {
      playerRotate(screen, 1);
    }
  };

  const handkeyup = (e) => {
    if (!gameOver) {
      if (e.keyCode === keyCode.DOWN) {
        console.log("interval on");
        setDropTime(1000 / (level + 1));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", move);
    return () => {
      document.removeEventListener("keypress", move);
    }; // eslint-disable-next-line
  }, []);

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetris
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={handkeyup}
    >
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
