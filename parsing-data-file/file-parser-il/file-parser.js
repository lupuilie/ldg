import * as fs from "fs";

fs.readFile("./testfile.csv", "utf8", (err, data) => {
  if (err) return console.error(err);

  data = data.split(/\n/);
  const readable = readableFormat(data);
  console.log(readable);
});

function readableFormat(data) {
  const options = {
    columns: 3,
    columnsLength: [],
    header: `Last First Salary`,
    separator: `${"-".repeat(25)}`,
  };

  const content = data.map((row) => {
    const column = row.split(",");
    for (let i = 0; i < options.columns; i++) {
      options.columnsLength[i] =
        options.columnsLength[i] > column[i].length
          ? options.columnsLength[i]
          : column[i].length;
    }
    return column;
  });

  const readable = content
    .map((row) => {
      return row
        .map((column, index) =>
          String(
            column +
              " " +
              " ".repeat(options.columnsLength[index] - column.length)
          )
        )
        .join("");
    })
    .join("\n");

  return `${options.header}\n${options.separator}\n${readable}`;
}
