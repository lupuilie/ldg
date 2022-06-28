import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Container, Typography, Paper } from "@mui/material";
import { Book } from "../components/Book";

type Book = {
  id: string;
  _id: string;
  name: string;
  author: string;
};

export function Books(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get("http://localhost/api/books");
        const data = req.data;
        setBooks(data);
      } catch (error) {
        setError("Could not load books");
      }
    }
    fetchData();
  }, [setBooks]);
  return (
    <Container>
      <Paper elevation={20} sx={{ padding: "1rem" }}>
        <Typography variant="h4">Books</Typography>
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
