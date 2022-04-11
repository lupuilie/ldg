import * as fs from "fs/promises";
import parseCSV from "../csv-parser";

describe("parseCSV", () => {
  test("given file testfile.csv, parseCSV() should return the content in a readable format", async () => {
    const fileLocation = "./test/testfile.csv";
    const data = await fs.readFile(fileLocation, { encoding: "utf8" });
    const parsed = parseCSV(data, { headers: ["First", "Last", "Salary"] });
    const expected = `First    Last     Salary
------------------------
Ling     Mai      55900 
Johnson  Jim      56500 
Jones    Aaron    46000 
Jones    Chris    34500 
Swift    Geoffrey 14200 
Xiong    Fong     65000 
Zarnecki Sabrina  51500 
`;

    expect(parsed).toBe(expected);
  });
  test("calling parseCSV without data should throw error <no data provided>", () => {
    expect(() => parseCSV()).toThrowError(/no data provided/);
  });
});
