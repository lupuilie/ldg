import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { Container, Paper } from "@mui/material";

const ulStyle: React.CSSProperties = {
  display: "flex",
  gap: "5px",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

export default function Header() {
  return (
    <Paper elevation={15} sx={{ padding: "1rem", marginBottom: "1.5rem" }}>
      <Container>
        <ul style={ulStyle}>
          <li>
            <Link component={RouterLink} to="/" variant="h6">
              Home
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/books" variant="h6">
              Books
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
