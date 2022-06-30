import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import { Books, Users, NotFound, Login, AddBook, Favorites } from "./pages";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
