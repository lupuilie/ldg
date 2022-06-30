import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Grid, Typography, Container, Paper } from "@mui/material";
import { Book } from "../components/Book";
import { IBook, IUser } from "../types";
import UserService from "../services/UserService";

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
        const books = await axios.get(url, UserService.getAuthHeader());
        if (books.data) setBooks(books.data);
      } catch (error) {
        let message = "Could not load favorite books";
        if (error instanceof AxiosError) {
          if (error.response?.data?.message) {
            message = error.response.data.message;
          }
          setError(message);
        }
      }
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
