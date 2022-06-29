import { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Container, Typography, Grid } from "@mui/material";
import User from "../components/User";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  favorite: string[];
  role: string;
};

export function Users(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("http://localhost/api/users");
      const data = req.data.users;
      setUsers(data);
    }
    fetchData();
  }, [setUsers]);

  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Users</Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <User {...user} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
