const questions = [];

/**
 * Set questions. Do this first
 * @param {Object} questionId
 */
export function setQuestions(inputQuestions) {
  const arg = arguments[0];

  if (arguments.length > 1)
    throw new Error("Too many arguments. Only 1 accepted");
  if (!Array.isArray(arg))
    throw new Error(
      `First argument should be an Array. Provided a ${typeof arg}`
    );

  for (const question of inputQuestions) {
    if (checkQuestion(question)) questions.push(question);
  }
}

/**
 * Get a question by id
 * @param {number} questionId
 */
export function getById(questionId) {
  if (questions.length === 0)
    throw new Error("questions is empty. use setQuestions() first");
  if (!questionId || typeof questionId !== "number") {
    throw new Error("questionId not provided or is not a number");
  }
  return questions.find((question) => question.id === questionId) || null;
}

/**
 * Get {questions} Object
 */
export function getQuestions() {
  return questions;
}

/**
 * Get next question or text based on answer of {currentQuestion}
 * @param {Object} currentQuestion
 * @param {boolean} answer
 */
export function getNextQuestion(currentQuestion, answer) {
  if (!checkQuestion(currentQuestion)) return;
  if (answer === undefined) throw new Error("answer {boolean} not provided");

  const nextQuestionId = answer
    ? currentQuestion.yes?.questionId
    : currentQuestion.no?.questionId;

  return getById(nextQuestionId) || null;
}

/**
 * Check if question have required properties.
 * @param {Object} question
 * @param {number} question.id
 * @param {string} question.text
 * @param {Object} question.yes
 * @param {Object} question.no
 */
export function checkQuestion(question) {
  if (!question) throw new Error("question not provided");
  if (!question.hasOwnProperty("id"))
    throw new Error("question should have an id property");
  if (!question.hasOwnProperty("text"))
    throw new Error("question should have a text property");
  if (!question.hasOwnProperty("yes"))
    throw new Error("question should have a yes property");
  if (!question.hasOwnProperty("no"))
    throw new Error("question should have a no property");
  if (
    !question.yes.hasOwnProperty("text") ||
    !question.yes.hasOwnProperty("questionId")
  )
    throw new Error(
      "question.yes should have a 'text' or 'questionId' property"
    );
  if (
    !question.no.hasOwnProperty("text") ||
    !question.no.hasOwnProperty("questionId")
  )
    throw new Error(
      "question.no should have a 'text' or 'questionId' property"
    );
  if (
    question.hasOwnProperty("shouldAskFirst") &&
    typeof question.shouldAskFirst !== "boolean"
  )
    throw new Error("question.shouldAskFirst should be type boolean");

  return true;
}
