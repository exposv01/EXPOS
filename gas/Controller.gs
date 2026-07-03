/**
 * Controller.gs
 *
 * Responsibility:
 * Coordinates future UI requests and routes them to the appropriate services.
 *
 * Current scope:
 * Exposes Master Cabang, Master Karyawan, Absensi, and Izin helpers for UI usage.
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
 * Submits an Absensi record from UI or manual Apps Script test.
 */
function createAbsensi(data) {
  return submitAbsensi(data);
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
 * Submits an Izin record from UI or manual Apps Script test.
 */
function createIzin(data) {
  return submitIzin(data);
}

/**
 * Returns all Izin records.
 */
function getRekapIzin() {
  return getIzinRecords();
}
