import * as fs from "fs/promises";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import parseCSV from "file-parser-il";

function display(parsedCSV) {
  console.log(parsedCSV);
}

function formatFileName(name) {
  return `./${name}.csv`;
}

async function readFile() {
  try {
    const rl = readline.createInterface({ input, output });
    const fileName = await rl.question(
      "Input the name of CSV file you want to parse:"
    );
    const location = formatFileName(fileName);
    rl.close();

    const file = await fs.readFile(location, { encoding: "utf8" });
    return file;
  } catch (err) {
    throw new Error("Could not load file. Try again.");
  }
}

async function main() {
  try {
    const data = await readFile();
    const parsedCSV = parseCSV(data, { headers: ["First", "Last", "Salary"] });

    display(parsedCSV);
  } catch (err) {
    console.log(err.message);
  }
}

main();
