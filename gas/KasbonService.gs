/**
 * KasbonService.gs
 *
 * Responsibility:
 * Owns cash advance business logic for EXPOS.
 *
 * Current scope:
 * Implements Kasbon sheet setup, validation, ID generation, and submit flow.
 */

/**
 * Creates the Kasbon sheet when missing and ensures the header row exists.
 */
function initializeKasbonSheet() {
  var sheet = getOrCreateSheet(EXPOS_CONFIG.SHEETS.KASBON);
  ensureSheetHeaders(sheet, EXPOS_CONFIG.KASBON.HEADERS);
  return sheet;
}

/**
 * Ensures Kasbon sheet exists and is ready for use.
 */
function setupKasbon() {
  setupMasterCabang();
  setupMasterKaryawan();
  initializeKasbonSheet();

  return {
    sheetName: EXPOS_CONFIG.SHEETS.KASBON,
    status: 'ready'
  };
}

/**
 * Submits one Kasbon record to the Kasbon sheet.
 */
function submitKasbon(data) {
  validateKasbonPayload(data);

  var employee = findActiveKaryawanForKasbon(data.idKaryawan, data.cabang);
  var nominal = normalizeKasbonNominal(data.nominal);
  var idKasbon = generateKasbonId(data.cabang);
  var timestamp = getExposTimestamp();

  appendSheetRows(initializeKasbonSheet(), [[
    idKasbon,
    timestamp,
    data.cabang,
    employee['ID Karyawan'],
    employee['Nama Karyawan'],
    nominal,
    data.keterangan || ''
  ]]);

  return {
    idKasbon: idKasbon,
    timestamp: timestamp,
    nominal: nominal,
    status: 'saved'
  };
}

/**
 * Reads all Kasbon records.
 */
function getKasbonRecords() {
  var sheet = initializeKasbonSheet();
  return readSheetObjects(sheet);
}

/**
 * Validates the Kasbon payload before writing to the database.
 */
function validateKasbonPayload(data) {
  if (!data) {
    throw new Error('Data kasbon wajib diisi.');
  }

  if (!data.cabang) {
    throw new Error('Cabang wajib diisi.');
  }

  if (!data.idKaryawan) {
    throw new Error('ID Karyawan wajib diisi.');
  }

  normalizeKasbonNominal(data.nominal);
}

/**
 * Finds one active employee by ID and branch for Kasbon.
 */
function findActiveKaryawanForKasbon(idKaryawan, cabang) {
  var employees = getActiveKaryawanByCabang(cabang);

  for (var i = 0; i < employees.length; i++) {
    if (employees[i]['ID Karyawan'] === idKaryawan) {
      return employees[i];
    }
  }

  throw new Error('Karyawan aktif tidak ditemukan untuk cabang tersebut.');
}

/**
 * Normalizes and validates nominal kasbon.
 */
function normalizeKasbonNominal(nominal) {
  var parsedNominal = Number(nominal);

  if (!isFinite(parsedNominal) || parsedNominal <= 0) {
    throw new Error('Nominal kasbon wajib lebih dari 0.');
  }

  return parsedNominal;
}

/**
 * Generates a Kasbon ID using prefix, cabang, date, and daily branch sequence.
 */
function generateKasbonId(cabang) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMdd');
  var baseId = EXPOS_CONFIG.KASBON.ID_PREFIX + '-' + cabang + '-' + dateCode + '-';
  var records = getKasbonRecords();
  var sequence = records.filter(function(record) {
    return String(record['ID Kasbon'] || '').indexOf(baseId) === 0;
  }).length + 1;

  return baseId + String(sequence).padStart(3, '0');
}
