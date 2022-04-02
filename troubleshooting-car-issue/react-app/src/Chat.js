import { useState } from "react";
import { getNextQuestion } from "./questions";

function QuestionsContainer(props) {
  const { questions, setCurrentQuestion, setMessages, setVisibleButtons } =
    props;
  if (!questions) return;
  const questionsList = questions.filter((q) => q.shouldAskFirst);

  function questionClickHandler(question) {
    setCurrentQuestion(question);
    setMessages([question.text]);
    setVisibleButtons(true);
  }

  return (
    <ul>
      {questionsList.map((question, idx) => (
        <li
          key={idx}
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => questionClickHandler(question)}
        >
          {question.text}
        </li>
      ))}
    </ul>
  );
}

function MessagesContainer(props) {
  const { messages } = props;
  const isAnyMessage = messages.length > 0;
  return (
    <ul>
      {isAnyMessage &&
        messages.map((message, idx) => <li key={idx}>{message}</li>)}
    </ul>
  );
}

function ButtonsContainer(props) {
  const {
    currentQuestion,
    setCurrentQuestion,
    messages,
    setMessages,
    visibleButtons,
    setVisibleButtons,
  } = props;

  function handleClickYes() {
    const nextQuestion = getNextQuestion(currentQuestion, true);
    const hasMoreQuestions = nextQuestion?.yes;
    const noMoreQuestions = !hasMoreQuestions;
    const textAnswer = currentQuestion.yes?.text || null;

    const updatedMessages = [
      ...messages,
      "ME: yes",
      hasMoreQuestions ? nextQuestion.text : textAnswer,
    ];
    setMessages(updatedMessages);
    if (hasMoreQuestions) setCurrentQuestion(nextQuestion);
    if (noMoreQuestions) setVisibleButtons(false);
  }

  function handleClickNo() {
    const nextQuestion = getNextQuestion(currentQuestion, false);
    const hasMoreQuestions = nextQuestion?.no;
    const noMoreQuestions = !hasMoreQuestions;
    const textAnswer = currentQuestion.no?.text || null;

    const updatedMessages = [
      ...messages,
      "ME: no",
      hasMoreQuestions ? nextQuestion.text : textAnswer,
    ];
    setMessages(updatedMessages);
    if (hasMoreQuestions) setCurrentQuestion(nextQuestion);
    if (noMoreQuestions) setVisibleButtons(false);
  }

  return (
    <>
      {visibleButtons && (
        <div style={{ marginLeft: "2.5rem" }}>
          <button onClick={handleClickYes}>Yes</button>
          <button onClick={handleClickNo}>No</button>
        </div>
      )}
    </>
  );
}

function Chat({ questions }) {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [visibleButtons, setVisibleButtons] = useState(false);

  return (
    <div>
      <h2>Chat</h2>
      <p>Choose from quick questions bellow:</p>

      <QuestionsContainer
        questions={questions}
        setCurrentQuestion={setCurrentQuestion}
        setMessages={setMessages}
        setVisibleButtons={setVisibleButtons}
      />

      {currentQuestion && <hr />}

      <MessagesContainer messages={messages} />
      <ButtonsContainer
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        messages={messages}
        setMessages={setMessages}
        visibleButtons={visibleButtons}
        setVisibleButtons={setVisibleButtons}
      />
    </div>
  );
}

export default Chat;
