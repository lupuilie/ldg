import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Grid, Container, Typography, Paper } from "@mui/material";
import { Book } from "../components/Book";
import { IBook } from "../types";

export function Books(): JSX.Element {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get("http://localhost/api/books", {
          withCredentials: true,
        });
        const data = req.data.books;
        if (!data) return setError("could not load books");
        setBooks(data);
        setError("");
      } catch (error) {
        let message = "Could not load books";
        if (error instanceof AxiosError) {
          if (error.response?.data?.message) {
            message = error.response.data.message;
          }
        }
        setError(message);
      }
    }
    fetchData();
  }, [setBooks]);
  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Books</Typography>
        {error && <Typography>{error}</Typography>}
        <Grid container spacing={2}>
          {books.map(({ id, name, author }) => (
            <Book key={id} title={name} author={author} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
