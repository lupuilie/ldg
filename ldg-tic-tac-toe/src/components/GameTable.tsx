import React, { useEffect, useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import { v4 as uuid } from "uuid";

import Game, { IGameBox } from "../Game";

type GameTableProps = {
  game: Game;
  setWinner: Function;
  setOpen: Function;
  setCurrentPlayer: Function;
};

function GameTable({
  game,
  setWinner,
  setOpen,
  setCurrentPlayer,
}: GameTableProps) {
  const [table, setTable] = useState<IGameBox[]>(game.table);
  const [step, setStep] = useState(0);

  const clickHandler = (clickedBtnIndex: number) => {
    game.onPlayerSelection(clickedBtnIndex);
    setCurrentPlayer(game.currentPlayer);
    const winner = game.checkWinner();

    if (winner) {
      setWinner(winner);
      setOpen(true);
    }

    setTable(game.table);
    setStep(step + 1);
  };

  useEffect(() => {
    setTable(game.table);
  }, [game]);

  return (
    <Grid container columns={3} spacing={1}>
      {table.map((box) => (
        <Grid item xs={1} key={uuid()}>
          <Button
            variant="outlined"
            sx={{ width: "100%", minHeight: "150px", fontSize: "4rem" }}
            onClick={() => clickHandler(box.index)}
            size="large"
          >
            {box.selected}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default GameTable;
