import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";

export function AddBook() {
  return (
    <Container>
      <Paper>
        <Grid container direction="column" sx={{ gap: "8px" }}>
          <Grid item>
            <Typography variant="h3">Add Book</Typography>
          </Grid>
          <Grid item>
            <TextField label="username" size="small" />
          </Grid>

          <Grid item>
            <Button aria-label="login" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
