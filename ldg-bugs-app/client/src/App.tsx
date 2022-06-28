import { Container } from "@mui/material";
import React from "react";
import ButtonAppBar from "./components/AppBar";
import BugData from "./components/BugData";

function App() {
  return (
    <div>
      <ButtonAppBar />
      <Container maxWidth={"lg"}>
        <BugData />
      </Container>
    </div>
  );
}

export default App;
