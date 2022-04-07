async function main() {
  const fileContent = await readFile("");

  const parsedCSV = parseCSV(fileContent);

  display(parsedCSV);
}

function readFile() {
  // TO DO
}

function display(parsedCSV) {
  console.log(parsedCSV);
}

main();
