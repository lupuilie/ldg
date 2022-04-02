import Chat from "./Chat";
import { questions } from "./questions";

function App() {
  return (
    <div className="App">
      <h1>Troubleshot Car Issue</h1>
      <Chat questions={questions} />
    </div>
  );
}

export default App;
