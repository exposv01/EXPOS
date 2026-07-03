/**
 * MasterDataService.gs
 *
 * Responsibility:
 * Manages access to shared master data stored in Google Sheets.
 *
 * Current scope:
 * Implements Master Cabang initialization and read-only retrieval helpers.
 */

/**
 * Creates the Master Cabang sheet when missing and ensures the header row exists.
 */
function initializeMasterCabangSheet() {
  var sheet = getOrCreateSheet(EXPOS_CONFIG.SHEETS.MASTER_CABANG);
  ensureSheetHeaders(sheet, EXPOS_CONFIG.MASTER_CABANG.HEADERS);
  return sheet;
}

/**
 * Writes the default Master Cabang rows only when the sheet has no data rows.
 */
function seedDefaultMasterCabangIfEmpty() {
  var sheet = initializeMasterCabangSheet();

  if (isSheetDataEmpty(sheet)) {
    appendSheetRows(sheet, EXPOS_CONFIG.MASTER_CABANG.DEFAULT_ROWS);
  }

  return sheet;
}

/**
 * Ensures Master Cabang exists and contains the initial default data.
 */
function setupMasterCabang() {
  seedDefaultMasterCabangIfEmpty();

  return {
    sheetName: EXPOS_CONFIG.SHEETS.MASTER_CABANG,
    status: 'ready'
  };
}

/**
 * Reads all active branches from Master Cabang.
 */
function getActiveCabangList() {
  var sheet = initializeMasterCabangSheet();
  var records = readSheetObjects(sheet);

  return records.filter(function(record) {
    return record['Status'] === EXPOS_CONFIG.MASTER_CABANG.STATUS_AKTIF;
  });
}

/**
 * Returns active branches in a compact format suitable for dropdown controls.
 */
function getCabangDropdownOptions() {
  return getActiveCabangList().map(function(record) {
    return {
      label: record['Nama Cabang'],
      value: record['Kode Cabang']
    };
  });
}
