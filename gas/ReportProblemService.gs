/**
 * ReportProblemService.gs
 *
 * Responsibility:
 * Owns operational issue reporting business logic for EXPOS.
 */

function initializeReportProblemSheet() {
  var sheet = getOrCreateSheet(EXPOS_REPORT_PROBLEM_CONFIG.SHEET_NAME);
  ensureSheetHeaders(sheet, EXPOS_REPORT_PROBLEM_CONFIG.HEADERS);
  return sheet;
}

function setupReportProblem() {
  setupMasterCabang();
  setupMasterKaryawan();
  initializeReportProblemSheet();

  return {
    sheetName: EXPOS_REPORT_PROBLEM_CONFIG.SHEET_NAME,
    status: 'ready'
  };
}

function submitReportProblem(data) {
  validateReportProblemPayload(data);

  var reporter = findActiveKaryawanForReportProblem(data.idPelapor, data.cabang);
  var idProblem = generateReportProblemId(data.cabang);
  var timestamp = getExposTimestamp();

  appendSheetRows(initializeReportProblemSheet(), [[
    idProblem,
    timestamp,
    data.cabang,
    reporter['ID Karyawan'],
    reporter['Nama Karyawan'],
    data.judulProblem,
    data.deskripsiProblem,
    data.fotoUrl,
    data.namaFileFoto || '',
    EXPOS_REPORT_PROBLEM_CONFIG.STATUS_OPEN
  ]]);

  return {
    idProblem: idProblem,
    timestamp: timestamp,
    status: EXPOS_REPORT_PROBLEM_CONFIG.STATUS_OPEN
  };
}

function getReportProblemRecords() {
  var sheet = initializeReportProblemSheet();
  return readSheetObjects(sheet);
}

function validateReportProblemPayload(data) {
  if (!data) {
    throw new Error('Data report problem wajib diisi.');
  }
  if (!data.cabang) {
    throw new Error('Cabang wajib diisi.');
  }
  if (!data.idPelapor) {
    throw new Error('ID Pelapor wajib diisi.');
  }
  if (!data.judulProblem) {
    throw new Error('Judul problem wajib diisi.');
  }
  if (!data.deskripsiProblem) {
    throw new Error('Deskripsi problem wajib diisi.');
  }
  if (!data.fotoUrl) {
    throw new Error('Foto wajib diunggah.');
  }
}

function findActiveKaryawanForReportProblem(idPelapor, cabang) {
  var employees = getActiveKaryawanByCabang(cabang);

  for (var i = 0; i < employees.length; i++) {
    if (employees[i]['ID Karyawan'] === idPelapor) {
      return employees[i];
    }
  }

  throw new Error('Pelapor aktif tidak ditemukan untuk cabang tersebut.');
}

function generateReportProblemId(cabang) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMdd');
  var baseId = EXPOS_REPORT_PROBLEM_CONFIG.ID_PREFIX + '-' + cabang + '-' + dateCode + '-';
  var records = getReportProblemRecords();
  var sequence = records.filter(function(record) {
    return String(record['ID Problem'] || '').indexOf(baseId) === 0;
  }).length + 1;

  return baseId + String(sequence).padStart(3, '0');
}
