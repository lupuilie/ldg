import { readFileSync } from "fs";
import Questions from "ldg-car-issues-il";

const rawData = readFileSync("./test/questions.json");
const data = JSON.parse(rawData);

describe("given the question <Is the car silent when you turn the key?>", () => {
  describe("answer <yes>", () => {
    test("answer <yes> should return question <Are the battery terminals corroded?>", () => {
      // Arrange
      const questions = new Questions(data);
      const firstQuestion = questions.getById(0);

      // Act
      const yes = questions.getNextQuestion(firstQuestion, true);

      // Assert
      expect(yes).toEqual(questions.getById(1));
    });
    describe("given the question <Are the battery terminals corroded?>", () => {
      test("answer <yes> should return text <Clean the terminals and try starting again.>", () => {
        const questions = new Questions(data);
        const firstQuestion = questions.getById(0);
        const terminalsCorroded = questions.getNextQuestion(
          firstQuestion,
          true
        );

        const yes = questions.getNextQuestion(terminalsCorroded, true);

        expect(yes.answer).toBe("Clean the terminals and try starting again.");
      });
      test("answer <no> should return text <Replace cables and try again.>", () => {
        const questions = new Questions(data);
        const firstQuestion = questions.getById(0);
        const terminalsCorroded = questions.getNextQuestion(
          firstQuestion,
          true
        );

        const no = questions.getNextQuestion(terminalsCorroded, false);
        expect(no.answer).toBe("Replace cables and try again.");
      });
    });
  });
  describe("answer <no>", () => {
    test("answer <no> should return question <Does the car make a clicking noise?>", () => {
      const questions = new Questions(data);
      const firstQuestion = questions.getById(0);
      const clickingNoise = questions.getNextQuestion(firstQuestion, false);

      expect(clickingNoise).toEqual(questions.getById(2));
    });
    describe("given the question <Does the car make a clicking noise?>", () => {
      test("answer <yes> should return text <Replace the battery.>", () => {
        const questions = new Questions(data);
        const firstQuestion = questions.getById(0);
        const clickingNoise = questions.getNextQuestion(firstQuestion, false);

        const yes = questions.getNextQuestion(clickingNoise, true);

        expect(yes.answer).toBe("Replace the battery.");
      });
      test("answer <no> should return question <Does the car crank up but fail to start?>", () => {
        const questions = new Questions(data);
        const firstQuestion = questions.getById(0);
        const clickingNoise = questions.getNextQuestion(firstQuestion, false);
        const carCrankUp = questions.getNextQuestion(clickingNoise, false);

        expect(carCrankUp).toEqual(questions.getById(3));
      });
      describe("given the question <Does the car crank up but fail to start?>", () => {
        test("answer <yes> should return text <Check spark plug connections.>", () => {
          const questions = new Questions(data);
          const firstQuestion = questions.getById(0);
          const clickingNoise = questions.getNextQuestion(firstQuestion, false);
          const carCrankUp = questions.getNextQuestion(clickingNoise, false);

          const yes = questions.getNextQuestion(carCrankUp, true);

          expect(yes.answer).toBe("Check spark plug connections.");
        });
        test("answer <no> should return question <Does the engine start and then die?>", () => {
          const questions = new Questions(data);
          const firstQuestion = questions.getById(0);
          const clickingNoise = questions.getNextQuestion(firstQuestion, false);
          const carCrankUp = questions.getNextQuestion(clickingNoise, false);
          const engineStartThenDie = questions.getNextQuestion(
            carCrankUp,
            false
          );

          expect(engineStartThenDie).toEqual(questions.getById(4));
        });
        describe("given the question <Does the engine start and then die?>", () => {
          test("answer <no> should return text <Come back tomorrow, maybe Nea Gica can help you :)>", () => {
            const questions = new Questions(data);
            const firstQuestion = questions.getById(0);
            const clickingNoise = questions.getNextQuestion(
              firstQuestion,
              false
            );
            const carCrankUp = questions.getNextQuestion(clickingNoise, false);
            const engineStartThenDie = questions.getNextQuestion(
              carCrankUp,
              false
            );

            const no = questions.getNextQuestion(engineStartThenDie, false);
            expect(no.answer).toBe(
              "Come back tomorrow, maybe Nea Gica can help you :)"
            );
          });
          test("answer <yes> should return question <Does your car have fuel injection?>", () => {
            const questions = new Questions(data);
            const firstQuestion = questions.getById(0);
            const clickingNoise = questions.getNextQuestion(
              firstQuestion,
              false
            );
            const carCrankUp = questions.getNextQuestion(clickingNoise, false);
            const engineStartThenDie = questions.getNextQuestion(
              carCrankUp,
              false
            );
            const fuelInjection = questions.getNextQuestion(
              engineStartThenDie,
              true
            );

            expect(fuelInjection).toEqual(questions.getById(5));
          });
        });
        describe("given the question <Does your car have fuel injection?>", () => {
          test("answer <yes> should return text <Get it in for service.>", () => {
            const questions = new Questions(data);
            const firstQuestion = questions.getById(0);
            const clickingNoise = questions.getNextQuestion(
              firstQuestion,
              false
            );
            const carCrankUp = questions.getNextQuestion(clickingNoise, false);
            const engineStartThenDie = questions.getNextQuestion(
              carCrankUp,
              false
            );
            const fuelInjection = questions.getNextQuestion(
              engineStartThenDie,
              true
            );

            const yes = questions.getNextQuestion(fuelInjection, true);

            expect(yes.answer).toBe("Get it in for service.");
          });
          test("answer <no> should return text <Check to ensure the choke is opening and closing.>", () => {
            const questions = new Questions(data);
            const firstQuestion = questions.getById(0);
            const clickingNoise = questions.getNextQuestion(
              firstQuestion,
              false
            );
            const carCrankUp = questions.getNextQuestion(clickingNoise, false);
            const engineStartThenDie = questions.getNextQuestion(
              carCrankUp,
              false
            );
            const fuelInjection = questions.getNextQuestion(
              engineStartThenDie,
              true
            );

            const no = questions.getNextQuestion(fuelInjection, false);

            expect(no.answer).toBe(
              "Check to ensure the choke is opening and closing."
            );
          });
        });
      });
    });
  });
});
