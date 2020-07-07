import { useState, useEffect } from "react";
import { createStage } from "../game-helpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return ack;
        }

        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      // First flush the stage
      const newStage = prevStage.map(
        (row) => row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)) //kiểm tra xem stage có được xóa hay ko
      );

      // Then draw the tetromino
      // kiểm tra những cell nào trong tetromino đang chiếm giữ để biết đc hình dạng của tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          //value là giá trị của 1 cell trong tetromino
          if (value !== 0) {
            // nếu value khác 0 thì nó đang ở trên 1 cell tạo nên hình dạng của tetromino (định vị được tetromino trên stage)
            newStage[y + player.pos.y][x + player.pos.x] = [
              //cho tọa độ trên stage nên đặt nó thành value
              value,
              `${player.collided ? "merged" : "clear"}`, // đó là tetromino mà ta lặp qua nên chúng ta lấy giá trị của tetromino  sau đó đánh dấu lại
            ];
          }
        });
      });
      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
