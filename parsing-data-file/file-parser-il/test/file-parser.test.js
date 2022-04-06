import FileParser from "../file-parser";

describe("given file testfile.csv, should return the content in a readable format", () => {
  test("readableFormat", () => {
    async function readableFormat() {
      const file = "./test/testfile.csv";
      const parser = new FileParser(file);
      const formatted = await parser.readableFormat({
        headers: ["First", "Last", "Salary"],
      });
      return formatted;
    }

    return readableFormat().then((data) => {
      console.log(data);
    });
  });
});
