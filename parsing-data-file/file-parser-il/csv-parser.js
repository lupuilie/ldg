function getRows(data) {
  return data.split(/\n/g);
}

function getColumns(row) {
  return row.split(",");
}

function getColumnsLength(row) {
  return row.map((column) => column.length);
}

function getSeparator(columnLengths) {
  const DASH = "-";
  return columnLengths.map((count) => DASH.repeat(count));
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

function rowToString(row, { joinChar = " " } = {}) {
  if (!row) return;
  const NEW_LINE = "\n";
  return row.join(joinChar) + NEW_LINE;
}

function parseCSV(data, { headers = null } = {}) {
  const contentArray = [];
  const formattedRows = [];
  const columnsLengthMax = [];
  let formattedString = "";
  const validHeaders = headers && Array.isArray(headers);

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

  if (validHeaders) {
    const columnsLength = getColumnsLength(headers);
    setBiggerColumns(columnsLengthMax, columnsLength);

    const headersRow = formatRow(headers, columnsLengthMax);
    const separatorRow = getSeparator(columnsLengthMax);
    formattedString += rowToString(headersRow);
    formattedString += rowToString(separatorRow, { joinChar: "-" });
  }

  for (let index in contentArray) {
    const row = contentArray[index];
    const formattedRow = formatRow(row, columnsLengthMax);
    formattedRows[index] = formattedRow;
    formattedString += rowToString(formattedRow);
  }

  return formattedString;
}

export default parseCSV;
