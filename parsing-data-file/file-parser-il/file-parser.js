import * as fs from "fs/promises";
class FileParser {
  constructor(fileLocation) {
    this.location = fileLocation;
    this.fileContent = this.readFile;
    this.columnsLength = [];
    this.columnsSpace = 1;
  }

  async readFile() {
    try {
      const promise = await fs.readFile(this.location, { encoding: "utf8" });
      return promise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getRows() {
    try {
      const file = await this.fileContent();
      const rows = file.split(/\n/);
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }

  makeRow(row) {
    const isFirstRow = this.columnsLength.length === 0;
    const columns = Array.isArray(row) ? row : row.split(",");
    const columnLengths = columns.map((column) => column.length);

    if (isFirstRow) {
      this.columnsLength = [...columnLengths];
      return columns;
    }

    if (columns.length !== this.columnsLength.length)
      throw `row ${index} should have ${this.columnsLength.length} columns, not ${columns.length}`;

    columnLengths.forEach((columnLength, idx) => {
      const current = this.columnsLength[idx];
      if (columnLength === 0) throw "column should not be empty";
      this.columnsLength[idx] = Math.max(current, columnLength);
    });

    return columns;
  }

  async makeArray() {
    const contentAsArray = [];
    try {
      const rows = await this.getRows();
      rows.forEach((row, i) => contentAsArray.push(this.makeRow(row, i)));
      return contentAsArray;
    } catch (err) {
      throw new Error(err);
    }
  }

  async readableFormat({ headers = null }) {
    const formatRow = (row) =>
      row.map((column, idx) =>
        column.concat(" ".repeat(this.columnsLength[idx] - column.length))
      );

    let formatted = "";

    const array = await this.makeArray();
    if (headers && Array.isArray(headers)) {
      // I need to find another way to do that...
      const separator = this.columnsLength.map((spaces) => "-".repeat(spaces));
      array.unshift(this.makeRow(separator.join()));
      array.unshift(this.makeRow(headers.join()));
    }

    array.forEach((row) => {
      const formattedRow = formatRow(row);
      formatted += formattedRow.join(" ".repeat(this.columnsSpace || 1)) + "\n";
    });

    return formatted;
  }
}

export default FileParser;
