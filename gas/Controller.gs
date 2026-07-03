/**
 * Controller.gs
 *
 * Responsibility:
 * Coordinates future UI requests and routes them to the appropriate services.
 *
 * Current scope:
 * Exposes Master Cabang read helpers for future UI dropdown usage.
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
