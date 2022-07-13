/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Game } from "../../types";
import { Board } from "./components/Board";

function App() {
  const [board, setBoard] = useState<Game>();
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [matchingTiles, setMatchingTiles] = useState<Number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (board && board.gameOver) {
      setMatchingTiles(board.matchingTiles);
    }
  }, [board]);

  async function fetchGame(id?: String) {
    if (!id) {
      const { data } = await axios.post("http://localhost:3001/game");
      return setBoard(data);
    }
    const { data } = await axios.post(
      `http://localhost:3001/game/${board?.id}`
    );
    return setBoard(data);
  }

  async function handlePlay(tileIndex: Number) {
    if (board && !board.gameOver) {
      const { data } = await axios.post(
        `http://localhost:3001/play${board.id}&${tileIndex}&${
          isPlayerOneTurn ? "X" : "O"
        }`
      );
      setBoard(data);
      if (!data.gameOver) {
        setIsPlayerOneTurn(!isPlayerOneTurn);
      }
    }
  }

  function handleNewGame() {
    fetchGame();
    setMatchingTiles([]);
    setGameStarted(true);
  }

  return (
    <div className="App">
      <div className="container">
        <a className="newGameButton" onClick={() => handleNewGame()}>
          New game
        </a>
        {gameStarted && (
          <Board
            board={board}
            handlePlay={handlePlay}
            isPlayerOneTurn={isPlayerOneTurn}
            matchingTiles={matchingTiles}
          />
        )}
        {board?.gameOver && (
          <strong className={"winMessage"}>
            {board.matchingTiles.length < 3
              ? "Game Over"
              : `Player ${isPlayerOneTurn ? "1" : "2"} won !`}
          </strong>
        )}
      </div>
    </div>
  );
}

export default App;
