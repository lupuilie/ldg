import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import base64 from "base-64";

export function Login() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (value = "") => setInputUsername(value);
  const onChangePassword = (value = "") => setInputPassword(value);
  const onLoginClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const headers = {
        authorization:
          "Basic " + base64.encode(inputUsername + ":" + inputPassword),
      };
      const req = await axios.post(
        "http://localhost/api/users/login",
        {},
        { headers, withCredentials: true }
      );
      const data = await req.data;
      // navigate("/books");
      setLoginError("");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        setLoginError(message);
      }
    }
  };

  return (
    <Container>
      <Paper sx={{ padding: "1rem" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          sx={{ gap: "8px" }}
        >
          <Grid item>
            <Typography variant="h3">
              Welcome
              <span role="img" aria-label="books">
                📚
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              value={inputUsername}
              label="username"
              onChange={(e) => onChangeUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              value={inputPassword}
              label="password"
              type="password"
              onChange={(e) => onChangePassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              aria-label="login"
              variant="contained"
              size="large"
              color="primary"
              onClick={onLoginClick}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="error">
              {loginError}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
