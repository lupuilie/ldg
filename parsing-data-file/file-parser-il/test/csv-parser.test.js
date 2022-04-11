import * as fs from "fs/promises";
import parseCSV from "../csv-parser";

describe("parseCSV", () => {
  test("given file testfile.csv, parseCSV() should return the content in a readable format", async () => {
    const fileLocation = "./test/testfile.csv";
    const data = await fs.readFile(fileLocation, { encoding: "utf8" });
    const parsed = parseCSV(data, { headers: ["First", "Last", "Salary"] });
    const expected =
      "First    Last     Salary\n-------- -------- ------\nLing     Mai      55900 \nJohnson  Jim      56500 \nJones    Aaron    46000 \nJones    Chris    34500 \nSwift    Geoffrey 14200 \nXiong    Fong     65000 \nZarnecki Sabrina  51500 \n";

    expect(parsed).toBe(expected);
  });
});
