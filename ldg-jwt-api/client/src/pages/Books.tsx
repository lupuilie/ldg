import { Grid, Container, Typography, Paper } from "@mui/material";
import { Book } from "../components/Book";

export function Books(): JSX.Element {
  return (
    <Container>
      <Paper elevation={10} sx={{ padding: "1rem" }}>
        <Typography variant="h4">Books</Typography>
        <Grid container spacing={2}>
          <Book title="titlu" description="descriere" />
        </Grid>
      </Paper>
    </Container>
  );
}
