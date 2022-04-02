export const questions = [
  {
    id: 0,
    shouldAskFirst: true,
    text: "Is the car silent when you turn the key?",
    yes: {
      questionId: 1,
    },
    no: {
      questionId: 2,
    },
  },
  {
    id: 1,
    text: "Are the battery terminals corroded?",
    yes: {
      text: "Clean the terminals and try starting again.",
    },
    no: {
      text: "Replace cables and try again.",
    },
  },
  {
    id: 2,
    text: "Does the car make a clicking noise?",
    yes: {
      text: "Replace the battery.",
    },
    no: {
      questionId: 3,
    },
  },
  {
    id: 3,
    text: "Does the car crank up but fail to start?",
    yes: {
      text: "Check spark plug connections.",
    },
    no: {
      questionId: 4,
    },
  },
  {
    id: 4,
    text: "Does the engine start and then die?",
    yes: {
      questionId: 5,
    },
    no: {
      text: "Come back tomorrow, maybe Nea Gica can help you :)",
    },
  },
  {
    id: 5,
    text: "Does your car have fuel injection?",
    yes: {
      text: "Get it in for service.",
    },
    no: {
      text: "Check to ensure the choke is opening and closing.",
    },
  },
  {
    id: 6,
    text: "Your car have a rough idle?",
    shouldAskFirst: true,
    yes: {
      text: "Get it in for service.",
    },
    no: {
      text: "Your car is in good condition. You have nothing to do here.",
    },
  },
];

export function getNextQuestion(currentQuestion, answer) {
  const nextQuestionId = answer
    ? currentQuestion.yes?.questionId
    : currentQuestion.no?.questionId;

  return getById(nextQuestionId) || null;
}

export function getById(questionId) {
  return questions.find((question) => question.id === questionId) || null;
}
