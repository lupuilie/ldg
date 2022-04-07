function getRows(data) {
  return data.split(/\n/g);
}

function getColumns(row) {
  return row.split(",");
}

function getColumnsLength(row) {
  return row.map((column) => column.length);
}

function setBiggerColumns(currentMax, columnsLength) {
  columnsLength.forEach((columnLength, index) => {
    const currentValue = currentMax[index] || 0;
    currentMax[index] = Math.max(currentValue, columnLength);
  });
}

function checkColumnsCount(count, valid, index) {
  if (valid === 0) return;
  if (count !== valid)
    throw new Error(`row ${index} should have ${valid} columns, not ${count}`);
  return true;
}

function formatColumn(column, maxLength) {
  const spaces = maxLength - column.length;
  const EMPTY_SPACE = " ";
  return column + EMPTY_SPACE.repeat(spaces);
}

function formatRow(row, columnsLength) {
  return row.map((column, index) => formatColumn(column, columnsLength[index]));
}

function rowToString(row, { columnSpaces = 1 }) {
  if (!row) return;
  const NEW_LINE = "\n";
  const EMPTY_SPACE = " ";

  return row.join(EMPTY_SPACE.repeat(columnSpaces)) + NEW_LINE;
}

function parseCSV(data) {
  const contentArray = [];
  const formattedRows = [];
  const columnsLengthMax = [];
  let formattedString = "";

  if (!data) throw new Error("no data provided");

  const rows = getRows(data);

  for (const index in rows) {
    const row = rows[index];
    const columns = getColumns(row);
    const columnsLength = getColumnsLength(columns);
    const columnsCount = columns.length;
    const validColumnsCount = columnsLengthMax.length;

    checkColumnsCount(columnsCount, validColumnsCount, index);
    setBiggerColumns(columnsLengthMax, columnsLength);

    contentArray.push(columns);
  }

  for (let index in contentArray) {
    const row = contentArray[index];
    const formattedRow = formatRow(row, columnsLengthMax);
    formattedRows[index] = formattedRow;
    formattedString += rowToString(formattedRow, { columnSpaces: 2 });
  }

  return formattedString;
}

export default parseCSV;
