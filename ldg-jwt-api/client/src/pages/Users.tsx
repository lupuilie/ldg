import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Paper, Container, Typography, Grid } from "@mui/material";
import User from "../components/User";
import { IUser } from "../types";

export function Users(): JSX.Element {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get("http://localhost/api/users", {
          withCredentials: true,
        });
        const data = req.data.users;
        setUsers(data);
        setError("");
      } catch (error) {
        let message = "Cannot get any data";
        if (error instanceof AxiosError) {
          if (error.response?.data?.message) {
            message = error.response.data.message;
          }
        }
        setError(message);
      }
    }
    fetchData();
  }, [setUsers]);

  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Typography variant="h5">Users</Typography>
        {error && <Typography>{error}</Typography>}
        <Grid container spacing={2}>
          {users.map((user) => (
            <User {...user} />
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
