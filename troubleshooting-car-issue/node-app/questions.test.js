import { getById } from "./questions.js";

describe("given the question <Is the car silent when you turn the key?>", () => {
  describe("answer <yes>", () => {
    test("answer <yes> should return question <Are the battery terminals corroded?>", () => {
      // Arrange
      const question = getById(0);

      // Act
      const yesResponse = getById(question.yes.questionId);
      const question1 = getById(1);

      // Assert
      expect(yesResponse).toEqual(question1);
    });
    describe("given the question <Are the battery terminals corroded?>", () => {
      test("answer <yes> should return text <Clean the terminals and try starting again.>", () => {
        const question = getById(0);
        const terminalsCorroded = getById(question.yes.questionId);
        const yesResponse = terminalsCorroded.yes.text;

        expect(yesResponse).toBe("Clean the terminals and try starting again.");
      });
      test("answer <no> should return text <Replace cables and try again.>", () => {
        const question = getById(0);
        const terminalsCorroded = getById(question.yes.questionId);
        const yesResponse = terminalsCorroded.no.text;

        expect(yesResponse).toBe("Replace cables and try again.");
      });
    });
  });
  describe("answer <no>", () => {
    test("answer <no> should return question <Does the car make a clicking noise?>", () => {
      const question = getById(0);
      const answerIsNo = getById(question.no.questionId);
      const clickingNoise = getById(2);

      expect(answerIsNo).toEqual(clickingNoise);
    });
    describe("given the question <Does the car make a clicking noise?>", () => {
      test("answer <yes> should return text <Replace the battery.>", () => {
        const question = getById(0);
        const answerIsNo = getById(question.no.questionId);
        const yesClickingNoise = answerIsNo.yes.text;

        expect(yesClickingNoise).toBe("Replace the battery.");
      });
      test("answer <no> should return question <Does the car crank up but fail to start?>", () => {
        const question = getById(0);
        const noToQuestion = question.no.questionId;
        const clickingNoise = getById(noToQuestion);
        const noToClickingNoise = getById(clickingNoise.no.questionId);

        const carFailStart = getById(3);

        expect(noToClickingNoise).toEqual(carFailStart);
      });
    });
  });
});
