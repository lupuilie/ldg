import React, { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Snackbar,
  ButtonBase,
} from "@mui/material";

export function AddBook() {
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const onChangeBookName = (name: string) => {
    setBookName(name);
  };
  const onChangeBookAuthor = (name: string) => setBookAuthor(name);
  const handleClose = () => setOpen(false);
  const onClick = async () => {
    const book = { name: bookName, author: bookAuthor };
    try {
      const req = await axios.post("http://localhost/api/books", book);
      setMessage("Book Added");
      setOpen(true);
      setBookName("");
      setBookAuthor("");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        setMessage(message);
        setOpen(true);
      }
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Add New Book</Typography>
        <Grid
          container
          direction="column"
          sx={{ gap: "8px", marginTop: "1rem" }}
        >
          <Grid item>
            <TextField
              label="Name"
              size="small"
              value={bookName}
              onChange={(e) => onChangeBookName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Author"
              size="small"
              value={bookAuthor}
              onChange={(e) => onChangeBookAuthor(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button
              aria-label="login"
              variant="contained"
              color="primary"
              onClick={onClick}
              disabled={disabledSubmit}
            >
              Add Book
            </Button>
          </Grid>
          <Grid>
            <Snackbar
              open={open}
              message={message}
              autoHideDuration={2000}
              onClose={handleClose}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
