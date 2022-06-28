import { Link as RouterLink } from "react-router-dom";
import { Container, Paper, Link } from "@mui/material";

const ulStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

export default function Header() {
  return (
    <Paper elevation={20} sx={{ padding: "1rem", marginBottom: "2rem" }}>
      <Container>
        <ul style={ulStyle}>
          <li>
            <Link component={RouterLink} to="/" variant="h6">
              Books
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/add-book" variant="h6">
              Add Book
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/favorites" variant="h6">
              Favorites
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/users" variant="h6">
              Users
            </Link>
          </li>

          <li>
            <Link component={RouterLink} to="/login" variant="h6">
              Login
            </Link>
          </li>
        </ul>
      </Container>
    </Paper>
  );
}
