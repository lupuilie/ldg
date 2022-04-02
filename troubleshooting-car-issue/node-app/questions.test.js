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
      describe("given the question <Does the car crank up but fail to start?>", () => {
        test("answer <yes> should return text <Check spark plug connections.>", () => {
          const question = getById(0);
          const noToQuestion = question.no.questionId;
          const clickingNoise = getById(noToQuestion);
          const failToStart = getById(clickingNoise.no.questionId);

          const yesFailToStart = failToStart.yes.text;

          expect(yesFailToStart).toBe("Check spark plug connections.");
        });
        test("answer <no> should return question <Does the engine start and then die?>", () => {
          const question = getById(0);
          const noToQuestion = question.no.questionId;
          const clickingNoise = getById(noToQuestion);
          const failToStart = getById(clickingNoise.no.questionId);
          const noToFailToStart = getById(failToStart.no.questionId);

          const engineDie = getById(4);

          expect(noToFailToStart).toEqual(engineDie);
        });
        describe("given the question <Does the engine start and then die?>", () => {
          test("answer <no> should return text <Come back tomorrow, maybe Nea Gica can help you :)>", () => {
            const question = getById(0);
            const clickingNoise = getById(question.no.questionId);
            const crankNoStart = getById(clickingNoise.no.questionId);
            const engineStartAndDie = getById(crankNoStart.no.questionId);

            const noToEngineStartAndDie = engineStartAndDie.no.text;

            expect(noToEngineStartAndDie).toBe(
              "Come back tomorrow, maybe Nea Gica can help you :)"
            );
          });
          test("answer <yes> should return question <Does your car have fuel injection?>", () => {
            const question = getById(0);
            const clickingNoise = getById(question.no.questionId);
            const crankNoStart = getById(clickingNoise.no.questionId);
            const engineStartAndDie = getById(crankNoStart.no.questionId);

            const yesToEngineStartAndDie = getById(
              engineStartAndDie.yes.questionId
            );
            const fuelInjection = getById(5);

            expect(yesToEngineStartAndDie).toEqual(fuelInjection);
          });
        });
        describe("given the question <Does your car have fuel injection?>", () => {
          test("answer <yes> should return text <Get it in for service.>", () => {
            const question = getById(0);
            const clickingNoise = getById(question.no.questionId);
            const crankNoStart = getById(clickingNoise.no.questionId);
            const engineStartAndDie = getById(crankNoStart.no.questionId);

            const fuelInjection = getById(engineStartAndDie.yes.questionId);
            const yesToFuelInjection = fuelInjection.yes.text;

            expect(yesToFuelInjection).toBe("Get it in for service.");
          });
          test("answer <no> should return text <Check to ensure the choke is opening and closing.>", () => {
            const question = getById(0);
            const clickingNoise = getById(question.no.questionId);
            const crankNoStart = getById(clickingNoise.no.questionId);
            const engineStartAndDie = getById(crankNoStart.no.questionId);

            const fuelInjection = getById(engineStartAndDie.yes.questionId);
            const noToFuelInjection = fuelInjection.no.text;

            expect(noToFuelInjection).toBe(
              "Check to ensure the choke is opening and closing."
            );
          });
        });
      });
    });
  });
});
