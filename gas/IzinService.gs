/**
 * IzinService.gs
 *
 * Responsibility:
 * Owns permission or leave request business logic for EXPOS.
 *
 * Current scope:
 * Implements Izin sheet setup, validation, date calculation, ID generation, and submit flow.
 */

/**
 * Creates the Izin sheet when missing and ensures the header row exists.
 */
function initializeIzinSheet() {
  var sheet = getOrCreateSheet(EXPOS_CONFIG.SHEETS.IZIN);
  ensureSheetHeaders(sheet, EXPOS_CONFIG.IZIN.HEADERS);
  return sheet;
}

/**
 * Ensures Izin sheet exists and is ready for use.
 */
function setupIzin() {
  setupMasterCabang();
  setupMasterKaryawan();
  initializeIzinSheet();

  return {
    sheetName: EXPOS_CONFIG.SHEETS.IZIN,
    status: 'ready'
  };
}

/**
 * Submits one Izin record to the Izin sheet.
 */
function submitIzin(data) {
  validateIzinPayload(data);

  var employee = findActiveKaryawanForIzin(data.idKaryawan, data.cabang);
  var jumlahHari = calculateIzinDays(data.tanggalMulai, data.tanggalSelesai);
  var idIzin = generateIzinId(data.cabang);
  var timestamp = getExposTimestamp();

  appendSheetRows(initializeIzinSheet(), [[
    idIzin,
    timestamp,
    data.cabang,
    employee['ID Karyawan'],
    employee['Nama Karyawan'],
    data.tanggalMulai,
    data.tanggalSelesai,
    jumlahHari
  ]]);

  return {
    idIzin: idIzin,
    timestamp: timestamp,
    jumlahHari: jumlahHari,
    status: 'saved'
  };
}

/**
 * Reads all Izin records.
 */
function getIzinRecords() {
  var sheet = initializeIzinSheet();
  return readSheetObjects(sheet);
}

/**
 * Validates the Izin payload before writing to the database.
 */
function validateIzinPayload(data) {
  if (!data) {
    throw new Error('Data izin wajib diisi.');
  }

  if (!data.cabang) {
    throw new Error('Cabang wajib diisi.');
  }

  if (!data.idKaryawan) {
    throw new Error('ID Karyawan wajib diisi.');
  }

  if (!data.tanggalMulai) {
    throw new Error('Tanggal mulai wajib diisi.');
  }

  if (!data.tanggalSelesai) {
    throw new Error('Tanggal selesai wajib diisi.');
  }

  calculateIzinDays(data.tanggalMulai, data.tanggalSelesai);
}

/**
 * Finds one active employee by ID and branch for Izin.
 */
function findActiveKaryawanForIzin(idKaryawan, cabang) {
  var employees = getActiveKaryawanByCabang(cabang);

  for (var i = 0; i < employees.length; i++) {
    if (employees[i]['ID Karyawan'] === idKaryawan) {
      return employees[i];
    }
  }

  throw new Error('Karyawan aktif tidak ditemukan untuk cabang tersebut.');
}

/**
 * Calculates inclusive day count between start and end date.
 */
function calculateIzinDays(tanggalMulai, tanggalSelesai) {
  var start = new Date(tanggalMulai);
  var end = new Date(tanggalSelesai);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Format tanggal tidak valid.');
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  var diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays < 1) {
    throw new Error('Tanggal selesai tidak boleh sebelum tanggal mulai.');
  }

  return diffDays;
}

/**
 * Generates an Izin ID using prefix, cabang, date, and daily branch sequence.
 */
function generateIzinId(cabang) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMdd');
  var baseId = EXPOS_CONFIG.IZIN.ID_PREFIX + '-' + cabang + '-' + dateCode + '-';
  var records = getIzinRecords();
  var sequence = records.filter(function(record) {
    return String(record['ID Izin'] || '').indexOf(baseId) === 0;
  }).length + 1;

  return baseId + String(sequence).padStart(3, '0');
}
