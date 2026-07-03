/**
 * Config.gs
 *
 * Responsibility:
 * Centralizes project-wide configuration keys and constants for EXPOS.
 *
 * Current scope:
 * Stores shared configuration for the Master Cabang foundation.
 */

var EXPOS_CONFIG = {
  SCRIPT_PROPERTY_SPREADSHEET_ID: 'EXPOS_SPREADSHEET_ID',
  SHEETS: {
    MASTER_CABANG: 'Master Cabang'
  },
  MASTER_CABANG: {
    HEADERS: ['Nama Cabang', 'Kode Cabang', 'Status'],
    STATUS_AKTIF: 'Aktif',
    DEFAULT_ROWS: [
      ['EXP Gaming Cibinong', 'CBN', 'Aktif'],
      ['EXP Gaming Ar Hakim', 'ARH', 'Aktif'],
      ['EXP Gaming Siliwangi', 'SLW', 'Aktif']
    ]
  }
};

/**
 * Returns the Spreadsheet ID configured for EXPOS.
 *
 * The ID is intentionally read from Script Properties so service logic never
 * hardcodes spreadsheet identity. For container-bound scripts, the active
 * spreadsheet is used as a fallback.
 */
function getExposSpreadsheetId() {
  var configuredId = PropertiesService
    .getScriptProperties()
    .getProperty(EXPOS_CONFIG.SCRIPT_PROPERTY_SPREADSHEET_ID);

  if (configuredId) {
    return configuredId;
  }

  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return activeSpreadsheet ? activeSpreadsheet.getId() : '';
}

/**
 * Opens the EXPOS spreadsheet that acts as the One Source of Truth.
 */
function getExposSpreadsheet() {
  var spreadsheetId = getExposSpreadsheetId();

  if (!spreadsheetId) {
    throw new Error('EXPOS Spreadsheet ID is not configured.');
  }

  return SpreadsheetApp.openById(spreadsheetId);
}
