import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import { Home, Books, Users, NotFound, Login } from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
