/**
 * Repository.gs
 *
 * Responsibility:
 * Owns data access boundaries for Google Sheets, the One Source of Truth.
 *
 * Current scope:
 * Provides reusable sheet helpers for Master Cabang data access.
 */

/**
 * Gets a sheet by name from the EXPOS spreadsheet.
 */
function getSheetByName(sheetName) {
  return getExposSpreadsheet().getSheetByName(sheetName);
}

/**
 * Gets a sheet by name or creates it when missing.
 */
function getOrCreateSheet(sheetName) {
  var spreadsheet = getExposSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

/**
 * Ensures the first row contains the expected headers.
 */
function ensureSheetHeaders(sheet, headers) {
  if (!headers || headers.length === 0) {
    return;
  }

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  var currentHeaders = headerRange.getValues()[0];
  var shouldWriteHeaders = currentHeaders.join('') === '';

  if (!shouldWriteHeaders) {
    shouldWriteHeaders = headers.some(function(header, index) {
      return currentHeaders[index] !== header;
    });
  }

  if (shouldWriteHeaders) {
    headerRange.setValues([headers]);
  }
}

/**
 * Returns true when the sheet has no data rows below the header.
 */
function isSheetDataEmpty(sheet) {
  return sheet.getLastRow() < 2;
}

/**
 * Appends rows below the existing sheet content.
 */
function appendSheetRows(sheet, rows) {
  if (!rows || rows.length === 0) {
    return;
  }

  sheet
    .getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length)
    .setValues(rows);
}

/**
 * Reads sheet rows as objects using the first row as headers.
 */
function readSheetObjects(sheet) {
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  if (lastRow < 2 || lastColumn === 0) {
    return [];
  }

  var values = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  var headers = values[0];

  return values.slice(1).map(function(row) {
    var record = {};

    headers.forEach(function(header, index) {
      record[header] = row[index];
    });

    return record;
  });
}
