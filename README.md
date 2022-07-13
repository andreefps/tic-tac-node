# Tic-Tac-Node

React Front-end base calling a NodeJS backend to execute moves and save the game board status
and all necessary logic.

## Run Locally

After cloning the project you'll have to install the dependencies in the client and server

```bash
  cd client && npm i
  cd ../server && npm i
```

After that you should be good to go.
open the server folder and start the server

```bash
  npm start
```

On a different terminal do the same for the client folder

```bash
  npm start
```

## How the App works

A simple "New Game" button is rendered when the App runs.

when clicked it calls the server requesting for a new game to be created.
The server then responds with an object representing the board and useful information.

When a slot is clicked, the app calls the server passing the slot number,
the server checks if the move is valid and if the move results in a win and then responds accordingly.
