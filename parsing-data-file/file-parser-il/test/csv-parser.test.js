import * as fs from "fs/promises";
import parseCSV from "../csv-parser";

describe("given file testfile.csv, should return the content in a readable format", () => {
  test("readableFormat", async () => {
    try {
      const fileLocation = "./test/testfile.csv";
      const data = await fs.readFile(fileLocation, { encoding: "utf8" });
      const parsed = parseCSV(data, { headers: ["First", "Last", "Salary"] });
      console.log(parsed);
    } catch (e) {
      console.error(e);
    }
  });
});
