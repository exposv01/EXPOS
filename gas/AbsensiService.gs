/**
 * AbsensiService.gs
 *
 * Responsibility:
 * Owns attendance-related business logic for EXPOS.
 *
 * Current scope:
 * Implements Absensi sheet setup, validation, ID generation, and submit flow.
 */

/**
 * Creates the Absensi sheet when missing and ensures the header row exists.
 */
function initializeAbsensiSheet() {
  var sheet = getOrCreateSheet(EXPOS_CONFIG.SHEETS.ABSENSI);
  ensureSheetHeaders(sheet, EXPOS_CONFIG.ABSENSI.HEADERS);
  return sheet;
}

/**
 * Ensures Absensi sheet exists and is ready for use.
 */
function setupAbsensi() {
  setupMasterCabang();
  setupMasterKaryawan();
  initializeAbsensiSheet();

  return {
    sheetName: EXPOS_CONFIG.SHEETS.ABSENSI,
    status: 'ready'
  };
}

/**
 * Submits one attendance record to the Absensi sheet.
 */
function submitAbsensi(data) {
  validateAbsensiPayload(data);

  var employee = findActiveKaryawanForAbsensi(data.idKaryawan, data.cabang);
  var idAbsensi = generateAbsensiId(data.cabang);
  var timestamp = getExposTimestamp();

  appendSheetRows(initializeAbsensiSheet(), [[
    idAbsensi,
    timestamp,
    data.cabang,
    employee['ID Karyawan'],
    employee['Nama Karyawan'],
    data.jenisAbsensi
  ]]);

  return {
    idAbsensi: idAbsensi,
    timestamp: timestamp,
    status: 'saved'
  };
}

/**
 * Reads all Absensi records.
 */
function getAbsensiRecords() {
  var sheet = initializeAbsensiSheet();
  return readSheetObjects(sheet);
}

/**
 * Validates the Absensi payload before writing to the database.
 */
function validateAbsensiPayload(data) {
  if (!data) {
    throw new Error('Data absensi wajib diisi.');
  }

  if (!data.cabang) {
    throw new Error('Cabang wajib diisi.');
  }

  if (!data.idKaryawan) {
    throw new Error('ID Karyawan wajib diisi.');
  }

  if (!data.jenisAbsensi) {
    throw new Error('Jenis Absensi wajib diisi.');
  }

  if (EXPOS_CONFIG.ABSENSI.JENIS_ABSENSI.indexOf(data.jenisAbsensi) === -1) {
    throw new Error('Jenis Absensi tidak valid.');
  }
}

/**
 * Finds one active employee by ID and branch for Absensi.
 */
function findActiveKaryawanForAbsensi(idKaryawan, cabang) {
  var employees = getActiveKaryawanByCabang(cabang);

  for (var i = 0; i < employees.length; i++) {
    if (employees[i]['ID Karyawan'] === idKaryawan) {
      return employees[i];
    }
  }

  throw new Error('Karyawan aktif tidak ditemukan untuk cabang tersebut.');
}

/**
 * Generates an Absensi ID using prefix, cabang, date, and daily branch sequence.
 */
function generateAbsensiId(cabang) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMdd');
  var baseId = EXPOS_CONFIG.ABSENSI.ID_PREFIX + '-' + cabang + '-' + dateCode + '-';
  var records = getAbsensiRecords();
  var sequence = records.filter(function(record) {
    return String(record['ID Absensi'] || '').indexOf(baseId) === 0;
  }).length + 1;

  return baseId + String(sequence).padStart(3, '0');
}

/**
 * Returns current timestamp in EXPOS timezone.
 */
function getExposTimestamp() {
  return Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}
