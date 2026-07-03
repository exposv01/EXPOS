/**
 * MasterDataService.gs
 *
 * Responsibility:
 * Manages access to shared master data stored in Google Sheets.
 *
 * Current scope:
 * Implements Master Cabang and Master Karyawan initialization and retrieval helpers.
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

/**
 * Creates the Master Karyawan sheet when missing and ensures the header row exists.
 */
function initializeMasterKaryawanSheet() {
  var sheet = getOrCreateSheet(EXPOS_CONFIG.SHEETS.MASTER_KARYAWAN);
  ensureSheetHeaders(sheet, EXPOS_CONFIG.MASTER_KARYAWAN.HEADERS);
  return sheet;
}

/**
 * Writes the default Master Karyawan rows only when the sheet has no data rows.
 */
function seedDefaultMasterKaryawanIfEmpty() {
  var sheet = initializeMasterKaryawanSheet();

  if (isSheetDataEmpty(sheet)) {
    appendSheetRows(sheet, EXPOS_CONFIG.MASTER_KARYAWAN.DEFAULT_ROWS);
  }

  return sheet;
}

/**
 * Ensures Master Karyawan exists and contains the initial default data.
 */
function setupMasterKaryawan() {
  setupMasterCabang();
  seedDefaultMasterKaryawanIfEmpty();

  return {
    sheetName: EXPOS_CONFIG.SHEETS.MASTER_KARYAWAN,
    status: 'ready'
  };
}

/**
 * Reads all employees from Master Karyawan.
 */
function getMasterKaryawanList() {
  var sheet = initializeMasterKaryawanSheet();
  return readSheetObjects(sheet);
}

/**
 * Reads active employees only.
 */
function getActiveKaryawanList() {
  return getMasterKaryawanList().filter(function(record) {
    return record['Status'] === EXPOS_CONFIG.MASTER_KARYAWAN.STATUS_AKTIF;
  });
}

/**
 * Reads active employees filtered by cabang code.
 */
function getActiveKaryawanByCabang(cabang) {
  if (!cabang) {
    throw new Error('Cabang wajib diisi.');
  }

  return getActiveKaryawanList().filter(function(record) {
    return record['Cabang'] === cabang;
  });
}

/**
 * Returns active employees by cabang in a compact format suitable for dropdown controls.
 */
function getKaryawanDropdownOptionsByCabang(cabang) {
  return getActiveKaryawanByCabang(cabang).map(function(record) {
    return {
      label: record['Nama Karyawan'],
      value: record['ID Karyawan'],
      cabang: record['Cabang'],
      jabatan: record['Jabatan']
    };
  });
}
