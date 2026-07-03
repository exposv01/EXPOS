/**
 * Controller.gs
 *
 * Responsibility:
 * Coordinates future UI requests and routes them to the appropriate services.
 *
 * Current scope:
 * Exposes Master Cabang and Master Karyawan read helpers for future UI dropdown usage.
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
