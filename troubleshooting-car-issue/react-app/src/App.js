import Chat from "./Chat";
import Questions from "ldg-car-issues-il";
import data from "./questions.json";

function App() {
  const questions = new Questions();
  questions.setQuestions(data);

  return (
    <div className="App">
      <h1>Troubleshot Car Issue</h1>
      <Chat questions={questions} />
    </div>
  );
}

export default App;
