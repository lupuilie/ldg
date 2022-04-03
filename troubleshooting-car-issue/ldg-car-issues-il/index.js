class Questions {
  constructor() {
    this._questions = [];
  }

  /**
   * Set questions. Do this first
   * @param {Object[]} - Array of questions
   */
  setQuestions(inputQuestions) {
    const arg = arguments[0];

    if (arguments.length > 1)
      throw new Error("Too many arguments. Only 1 accepted");
    if (!Array.isArray(arg))
      throw new Error(
        `First argument should be an Array. Provided a ${typeof arg}`
      );

    for (const question of inputQuestions) {
      if (this.checkQuestion(question)) this._questions.push(question);
    }
  }

  /**
   * Get {questions} Object
   */
  getQuestions() {
    return this._questions;
  }

  /**
   * Get a question by id
   * @param {number} questionId
   */
  getById(questionId) {
    if (this.getQuestions().length === 0)
      throw new Error("questions is empty. use setQuestions() first");

    if (!questionId === undefined || typeof questionId !== "number") {
      throw new Error("questionId not provided or is not a number");
    }

    const questionFound = this.getQuestions().find(
      (question) => question.id === questionId
    );

    return questionFound || null;
  }

  /**
   * Get next question or text based on answer of {currentQuestion}
   * @param {Object} currentQuestion
   * @param {boolean} answer
   */
  getNextQuestion(currentQuestion, answer) {
    if (!this.checkQuestion(currentQuestion)) return;
    if (answer === undefined) throw new Error("answer {boolean} not provided");

    const nextQuestionId = answer
      ? currentQuestion.yes?.questionId
      : currentQuestion.no?.questionId;

    return this.getById(nextQuestionId) || null;
  }

  /**
   * Check if question have required properties.
   * @param {Object} question
   * @param {number} question.id
   * @param {string} question.text
   * @param {Object} question.yes
   * @param {Object} question.no
   */
  checkQuestion(question) {
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
      !question.yes.hasOwnProperty("text") &&
      !question.yes.hasOwnProperty("questionId")
    )
      throw new Error(
        "question.yes should have a 'text' or 'questionId' property"
      );
    if (
      !question.no.hasOwnProperty("text") &&
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
}

export default Questions;
