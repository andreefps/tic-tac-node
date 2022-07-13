export type Game = {
  id: String;
  tiles: String[];
  gameOver: boolean;
  winner: String;
  matchingTiles: number[];
};

export type Move = {
  id: String;
  tile: number;
  player: String;
};
