import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Container, Paper } from "@mui/material";
import { Book } from "../components/Book";
import { IBook, IUser } from "../types";

export function Favorites() {
  const [books, setBooks] = useState<IBook[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const lsData = localStorage.getItem("user");
    if (!lsData) return setError("you need to login");

    const loggedUser = JSON.parse(lsData) as IUser;

    async function fetchBooks() {
      try {
        const username = loggedUser.username;
        const url = `http://localhost/api/users/${username}/favorite`;
        const books = await axios.get(url, { withCredentials: true });
        if (books.data) setBooks(books.data);
      } catch (error) {}
    }
    fetchBooks();
  }, []);

  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Favorites</Typography>
        {error && <Typography>{error}</Typography>}
        {books && (
          <Grid container sx={{ gap: "8px" }}>
            {books.map((book) => (
              <Book key={book.id} title={book.name} author={book.author} />
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
