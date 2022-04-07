import * as fs from "fs/promises";
import parseCSV from "file-parser-il";

async function readFile() {
  const fileLocation = "./testfile.csv";
  return await fs.readFile(fileLocation, { encoding: "utf8" });
}

function display(parsedCSV) {
  console.log(parsedCSV);
}

async function main() {
  const data = await readFile();
  const parsedCSV = parseCSV(data, { headers: ["First", "Last", "Salary"] });

  display(parsedCSV);
}

main();
