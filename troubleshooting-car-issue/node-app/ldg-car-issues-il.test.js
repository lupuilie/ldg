import { readFileSync } from "fs";
import Questions from "ldg-car-issues-il";

const rawData = readFileSync("./questions.json");
const data = JSON.parse(rawData);

describe("given the question <Is the car silent when you turn the key?>", () => {
  describe("answer <yes>", () => {
    test("answer <yes> should return question <Are the battery terminals corroded?>", () => {
      // Arrange
      const questions = new Questions();
      questions.setQuestions(data);
      const firstQuestion = questions.getById(0);

      // Act
      const yes = questions.getNextQuestion(firstQuestion, true);

      // Assert
      expect(yes).toEqual(questions.getById(1));
    });
    describe("given the question <Are the battery terminals corroded?>", () => {
      test("answer <yes> should return text <Clean the terminals and try starting again.>", () => {
        const questions = new Questions();
        questions.setQuestions(data);
        const firstQuestion = questions.getById(0);
        const terminalsCorroded = questions.getNextQuestion(
          firstQuestion,
          true
        );
        const yes = questions.getNextQuestion(terminalsCorroded, true);

        expect(yes.answer).toBe("Clean the terminals and try starting again.");
      });
      xtest("answer <no> should return text <Replace cables and try again.>", () => {
        const question = getById(0);
        const terminalsCorroded = getNextQuestion(question, true);

        const no = terminalsCorroded.no.text;

        expect(no).toBe("Replace cables and try again.");
      });
    });
  });
  describe("answer <no>", () => {
    xtest("answer <no> should return question <Does the car make a clicking noise?>", () => {
      const question = getById(0);
      const clickingNoise = getNextQuestion(question, false);

      expect(clickingNoise).toEqual(getById(2));
    });
    describe("given the question <Does the car make a clicking noise?>", () => {
      xtest("answer <yes> should return text <Replace the battery.>", () => {
        const question = getById(0);
        const clickingNoise = getNextQuestion(question, false);

        const yes = clickingNoise.yes.text;

        expect(yes).toBe("Replace the battery.");
      });
      xtest("answer <no> should return question <Does the car crank up but fail to start?>", () => {
        const question = getById(0);
        const clickingNoise = getNextQuestion(question, false);
        const carCrankUp = getNextQuestion(clickingNoise, false);

        expect(carCrankUp).toEqual(getById(3));
      });
      describe("given the question <Does the car crank up but fail to start?>", () => {
        xtest("answer <yes> should return text <Check spark plug connections.>", () => {
          const question = getById(0);
          const clickingNoise = getNextQuestion(question, false);
          const carCrankUp = getNextQuestion(clickingNoise, false);

          const yes = carCrankUp.yes.text;

          expect(yes).toBe("Check spark plug connections.");
        });
        xtest("answer <no> should return question <Does the engine start and then die?>", () => {
          const question = getById(0);
          const clickingNoise = getNextQuestion(question, false);
          const carCrankUp = getNextQuestion(clickingNoise, false);
          const engineStartThenDie = getNextQuestion(carCrankUp, false);

          expect(engineStartThenDie).toEqual(getById(4));
        });
        describe("given the question <Does the engine start and then die?>", () => {
          xtest("answer <no> should return text <Come back tomorrow, maybe Nea Gica can help you :)>", () => {
            const question = getById(0);
            const clickingNoise = getNextQuestion(question, false);
            const carCrankUp = getNextQuestion(clickingNoise, false);
            const engineStartThenDie = getNextQuestion(carCrankUp, false);

            const no = engineStartThenDie.no.text;

            expect(no).toBe(
              "Come back tomorrow, maybe Nea Gica can help you :)"
            );
          });
          xtest("answer <yes> should return question <Does your car have fuel injection?>", () => {
            const question = getById(0);
            const clickingNoise = getNextQuestion(question, false);
            const carCrankUp = getNextQuestion(clickingNoise, false);
            const engineStartThenDie = getNextQuestion(carCrankUp, false);
            const fuelInjection = getNextQuestion(engineStartThenDie, true);

            expect(fuelInjection).toEqual(getById(5));
          });
        });
        describe("given the question <Does your car have fuel injection?>", () => {
          xtest("answer <yes> should return text <Get it in for service.>", () => {
            const question = getById(0);
            const clickingNoise = getNextQuestion(question, false);
            const carCrankUp = getNextQuestion(clickingNoise, false);
            const engineStartThenDie = getNextQuestion(carCrankUp, false);
            const fuelInjection = getNextQuestion(engineStartThenDie, true);

            const yes = fuelInjection.yes.text;

            expect(yes).toBe("Get it in for service.");
          });
          xtest("answer <no> should return text <Check to ensure the choke is opening and closing.>", () => {
            const question = getById(0);
            const clickingNoise = getNextQuestion(question, false);
            const carCrankUp = getNextQuestion(clickingNoise, false);
            const engineStartThenDie = getNextQuestion(carCrankUp, false);
            const fuelInjection = getNextQuestion(engineStartThenDie, true);

            const no = fuelInjection.no.text;

            expect(no).toBe(
              "Check to ensure the choke is opening and closing."
            );
          });
        });
      });
    });
  });
});
