import { useState } from "react";
import AppHeader from "./components/AppHeader";
import GameTable from "./components/GameTable";
import { Container, Snackbar } from "@mui/material";

import Game, { Player } from "./Game";

export default function App() {
  const [game, setGame] = useState(new Game());
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    game.currentPlayer
  );
  const [winner, setWinner] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function reset() {
    setGame(new Game());
  }

  return (
    <Container maxWidth="sm">
      <AppHeader reset={reset} currentPlayer={currentPlayer} />
      <GameTable
        game={game}
        setWinner={setWinner}
        setOpen={setOpen}
        setCurrentPlayer={setCurrentPlayer}
      />
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message={`Winner is ${winner}`}
      />
    </Container>
  );
}
