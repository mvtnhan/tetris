import { useState, useEffect } from "react";

import { createMainScreen } from "../game-helpers";

export const useScreen = (player, resetPlayer) => {
  const [screen, setScreen] = useState(createMainScreen());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newScreen) =>
      newScreen.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newScreen[0].length).fill([0, "clear"]));
          return ack;
        }

        ack.push(row);
        return ack;
      }, []);

    const updateScreen = (prevScreen) => {
      // First flush the screen
      const newScreen = prevScreen.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newScreen[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newScreen);
      }

      return newScreen;
    };

    setScreen((prev) => updateScreen(prev));
  }, [player, resetPlayer]);

  return [screen, setScreen, rowsCleared];
};
