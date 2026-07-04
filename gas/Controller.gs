/**
 * Controller.gs
 *
 * Responsibility:
 * Coordinates UI requests and routes them to the appropriate services.
 *
 * Bible EXPOS:
 * - UI is presentation layer only.
 * - Controller bridges UI payloads to service contracts.
 * - Business workflow belongs in Service layer.
 * - Persistence belongs in Repository/Helper layer.
 */

/**
 * Initializes Master Cabang from a manual Apps Script run or future admin flow.
 */
function initializeMasterCabang() {
  return setupMasterCabang();
}

/**
 * Returns active Master Cabang options for UI dropdowns.
 */
function getMasterCabangDropdown() {
  return getCabangDropdownOptions();
}

/**
 * Initializes Master Karyawan from a manual Apps Script run or future admin flow.
 */
function initializeMasterKaryawan() {
  return setupMasterKaryawan();
}

/**
 * Returns all Master Karyawan records.
 */
function getMasterKaryawan() {
  return getMasterKaryawanList();
}

/**
 * Returns active Master Karyawan records.
 */
function getActiveMasterKaryawan() {
  return getActiveKaryawanList();
}

/**
 * Returns active Master Karyawan dropdown options filtered by cabang code.
 */
function getMasterKaryawanDropdownByCabang(cabang) {
  return getKaryawanDropdownOptionsByCabang(cabang);
}

/**
 * Initializes Absensi from a manual Apps Script run or future admin flow.
 */
function initializeAbsensi() {
  return setupAbsensi();
}

/**
 * Submits an Absensi record from manual Apps Script test or legacy UI usage.
 */
function createAbsensi(data) {
  return submitAbsensi(data);
}

/**
 * UI-009 bridge. Accepts UI payload and converts it into AbsensiService contract.
 */
function submitAttendance(data) {
  var request = buildAbsensiServicePayloadFromUi_(data);
  return submitAbsensi(request);
}

/**
 * Returns all Absensi records.
 */
function getRekapAbsensi() {
  return getAbsensiRecords();
}

/**
 * Initializes Izin from a manual Apps Script run or future admin flow.
 */
function initializeIzin() {
  return setupIzin();
}

/**
 * Submits an Izin record from manual Apps Script test or legacy UI usage.
 */
function createIzin(data) {
  return submitIzin(data);
}

/**
 * UI-011 bridge. Kept separate from submitIzin() to protect existing service contract.
 */
function submitIzinFromUi(data) {
  var request = buildIzinServicePayloadFromUi_(data);
  return submitIzin(request);
}

/**
 * Returns all Izin records.
 */
function getRekapIzin() {
  return getIzinRecords();
}

/**
 * Initializes Kasbon from a manual Apps Script run or future admin flow.
 */
function initializeKasbon() {
  return setupKasbon();
}

/**
 * Submits a Kasbon record from manual Apps Script test or legacy UI usage.
 */
function createKasbon(data) {
  return submitKasbon(data);
}

/**
 * UI-010 bridge. Kept separate from submitKasbon() to protect existing service contract.
 */
function submitKasbonFromUi(data) {
  var request = buildKasbonServicePayloadFromUi_(data);
  return submitKasbon(request);
}

/**
 * Returns all Kasbon records.
 */
function getRekapKasbon() {
  return getKasbonRecords();
}

/**
 * Initializes Report Problem from a manual Apps Script run or future admin flow.
 */
function initializeReportProblem() {
  return setupReportProblem();
}

/**
 * UI-008 bridge. Kept separate from submitReportProblem() to protect existing service contract.
 */
function submitReportProblemFromUi(data) {
  var request = buildReportProblemServicePayloadFromUi_(data);
  return submitReportProblem(request);
}

/**
 * Returns all Report Problem records.
 */
function getRekapReportProblem() {
  return getReportProblemRecords();
}

/**
 * UI-007 home summary. Sprint 5 initial version reads existing records safely.
 */
function getHomeDashboardSummary() {
  var summary = {
    hadir: { CBN: 0, ARH: 0, SLW: 0 },
    izin: { CBN: 0, ARH: 0, SLW: 0 },
    kasbon: { CBN: 0, ARH: 0, SLW: 0 },
    problemOpen: { CBN: 0, ARH: 0, SLW: 0 }
  };

  countByCabang_(summary.hadir, safeReadRecords_(getAbsensiRecords));
  countByCabang_(summary.izin, safeReadRecords_(getIzinRecords));
  countByCabang_(summary.kasbon, safeReadRecords_(getKasbonRecords));
  countByCabang_(summary.problemOpen, safeReadRecords_(getReportProblemRecords));

  return summary;
}

/**
 * UI-012 read-only recap endpoint.
 */
function getAttendanceRecap(filter) {
  var request = normalizeAttendanceRecapFilter_(filter);
  var records = safeReadRecords_(getAbsensiRecords);
  var filtered = records.filter(function(record) {
    var cabang = String(record['Cabang'] || record.cabang || '').trim();
    var timestamp = String(record['Timestamp'] || record.timestamp || '').trim();
    var matchCabang = request.branch === 'ALL' || cabang === request.branch;
    var matchPeriod = !request.period || timestamp.indexOf(request.period) === 0;
    return matchCabang && matchPeriod;
  });

  return {
    summary: {
      hadir: filtered.length,
      izin: safeReadRecords_(getIzinRecords).length,
      telatAlpha: 0
    },
    items: filtered.map(function(record) {
      return {
        employeeName: record['Nama Karyawan'] || '',
        branch: record['Cabang'] || '',
        date: String(record['Timestamp'] || '').slice(0, 10),
        shift: record['Shift'] || '-',
        checkIn: record['Jenis Absensi'] === 'CHECK_IN' ? String(record['Timestamp'] || '').slice(11, 16) : '-',
        checkOut: record['Jenis Absensi'] === 'CHECK_OUT' ? String(record['Timestamp'] || '').slice(11, 16) : '-',
        status: 'Hadir'
      };
    })
  };
}

/**
 * Navigation bridge for UI. Apps Script cannot client-navigate directly from server;
 * this returns route metadata for future client router improvements.
 */
function openExposModule(moduleName) {
  var route = normalizeExposRoute_(moduleName);
  return {
    ok: true,
    route: route,
    title: getExposModuleTitle_(route)
  };
}

function buildAbsensiServicePayloadFromUi_(data) {
  assertPayload_(data, 'Data absensi');
  return {
    cabang: requireUiText_(data.branch, 'Cabang'),
    idKaryawan: resolveUiEmployeeId_(data.employeeName, data.branch),
    jenisAbsensi: normalizeAttendanceType_(data.attendanceType)
  };
}

function buildIzinServicePayloadFromUi_(data) {
  assertPayload_(data, 'Data izin');
  return {
    cabang: requireUiText_(data.branch, 'Cabang'),
    idKaryawan: resolveUiEmployeeId_(data.employeeName, data.branch),
    tanggalMulai: requireUiText_(data.startDate, 'Tanggal mulai'),
    tanggalSelesai: requireUiText_(data.endDate, 'Tanggal selesai')
  };
}

function buildKasbonServicePayloadFromUi_(data) {
  assertPayload_(data, 'Data kasbon');
  return {
    cabang: requireUiText_(data.branch, 'Cabang'),
    idKaryawan: resolveUiEmployeeId_(data.employeeName, data.branch),
    nominal: Number(data.amount || data.nominal || 0),
    keterangan: data.reason || data.keterangan || ''
  };
}

function buildReportProblemServicePayloadFromUi_(data) {
  assertPayload_(data, 'Data report problem');
  return {
    cabang: requireUiText_(data.branch, 'Cabang'),
    idPelapor: resolveUiEmployeeId_(data.reportedBy, data.branch),
    judulProblem: requireUiText_(data.title, 'Judul problem'),
    deskripsiProblem: requireUiText_(data.description, 'Deskripsi problem'),
    fotoUrl: data.fotoUrl || 'PENDING_DRIVE_UPLOAD',
    namaFileFoto: data.namaFileFoto || ''
  };
}

function resolveUiEmployeeId_(employeeName, cabang) {
  var name = requireUiText_(employeeName, 'Nama karyawan');
  var branch = requireUiText_(cabang, 'Cabang');
  var employees = getActiveKaryawanByCabang(branch);
  for (var i = 0; i < employees.length; i++) {
    if (String(employees[i]['Nama Karyawan'] || '').trim().toLowerCase() === name.toLowerCase()) {
      return employees[i]['ID Karyawan'];
    }
  }
  throw new Error('Karyawan aktif tidak ditemukan untuk cabang tersebut: ' + name);
}

function normalizeAttendanceType_(value) {
  var type = requireUiText_(value, 'Tipe absensi');
  if (type === 'CHECK_IN') return 'Masuk';
  if (type === 'CHECK_OUT') return 'Pulang';
  return type;
}

function normalizeAttendanceRecapFilter_(filter) {
  var data = filter || {};
  return {
    branch: String(data.branch || 'ALL').trim() || 'ALL',
    period: String(data.period || '').trim()
  };
}

function countByCabang_(target, records) {
  records.forEach(function(record) {
    var cabang = String(record['Cabang'] || record.cabang || '').trim();
    if (target.hasOwnProperty(cabang)) {
      target[cabang] += 1;
    }
  });
}

function safeReadRecords_(readerFn) {
  try {
    return readerFn() || [];
  } catch (err) {
    return [];
  }
}

function assertPayload_(data, label) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(label + ' wajib berupa object.');
  }
}

function requireUiText_(value, label) {
  var text = String(value || '').trim();
  if (!text) {
    throw new Error(label + ' wajib diisi.');
  }
  return text;
}

function getExposModuleTitle_(route) {
  var titles = {
    home: 'Home Dashboard',
    reportProblem: 'Report Problem',
    absensi: 'Absensi',
    kasbon: 'Kasbon',
    izin: 'Pengajuan Izin',
    rekapAbsensi: 'Rekap Absensi'
  };
  return titles[route] || titles.home;
}
