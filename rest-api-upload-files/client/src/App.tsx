import { useState } from "react";
import UploadForm from "./components/UploadForm";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Upload Single File</h1>
      <UploadForm />
    </div>
  );
}

export default App;
