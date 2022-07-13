import Express from "express";
import cors from "cors";
import path from "path";
import { Game, Move } from "../types";

const PORT = process.env.PORT || 3001;
const games: Game[] = [];
const app = Express();

app.use(cors({ origin: "*" }));
app.use(Express.static(path.resolve(__dirname, "../client/build")));

app.get("/game/:id", (req: Express.Request<Game>, res: Express.Response) => {
  res.json({ game: games.find((game) => game.id === req.params.id) });
});

app.post("/game", (req, res) => {
  let newGame: Game = {
    id: Math.random().toString(),
    tiles: ["", "", "", "", "", "", "", "", ""],
    gameOver: false,
    winner: "",
    matchingTiles: [],
  };
  games.push(newGame);
  res.json(newGame);
});

app.post(
  "/play:id&:tile&:player",
  (req: Express.Request<Move>, res: Express.Response<Game>) => {
    let currentgame = games.find((games) => games.id === req.params.id);
    if (
      currentgame &&
      !currentgame.gameOver &&
      currentgame.tiles[req.params.tile].length === 0
    ) {
      currentgame.tiles[req.params.tile] = req.params.player;
      currentgame = isWinningMove(currentgame, req.params.player);
    }
    if (currentgame?.tiles.filter((tile) => tile.length > 0).length === 9) {
      currentgame.gameOver = true;
    }
    res.json(currentgame);
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

function isWinningMove(currentGame: Game, player: String) {
  const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningPossibilities.forEach((possibility, index) => {
    var a = possibility[0],
      b = possibility[1],
      c = possibility[2];
    if (
      currentGame &&
      currentGame.tiles[a] !== "" &&
      currentGame.tiles[a] === currentGame.tiles[b] &&
      currentGame.tiles[b] === currentGame.tiles[c]
    ) {
      currentGame.matchingTiles = winningPossibilities[index];
      currentGame.winner = player;
      currentGame.gameOver = true;
      return currentGame;
    }
  });
  return currentGame;
}
