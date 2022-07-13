import React from "react";
import { Game } from "../../../types";

type BoardProps = {
  board: Game | undefined;
  isPlayerOneTurn: boolean;
  handlePlay: Function;
  matchingTiles: Number[];
};
export const Board = ({
  board,
  isPlayerOneTurn,
  matchingTiles,
  handlePlay,
}: BoardProps) => {
  return (
    <div>
      <div className="game-board">
        {board &&
          board.tiles.map((tile, index) => (
            <div
              onClick={() => handlePlay(index)}
              className={
                matchingTiles.includes(index) ? "matchingTile box" : "box"
              }
            >
              {tile}
            </div>
          ))}
      </div>
      {board && board.gameOver && (
        <strong className={"winMessage"}>
          Player {isPlayerOneTurn ? "1" : "2"} won !
        </strong>
      )}
    </div>
  );
};
