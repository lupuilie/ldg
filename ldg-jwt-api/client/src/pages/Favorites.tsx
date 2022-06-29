import React, { useState } from "react";
import { Grid, Typography, Container, Paper } from "@mui/material";
import { Book } from "../components/Book";

export function Favorites() {
  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Favorites</Typography>
        <Grid container sx={{ gap: "8px" }}>
          <Book title="book1" author="author1" />
          <Book title="book2" author="author2" />
        </Grid>
      </Paper>
    </Container>
  );
}
