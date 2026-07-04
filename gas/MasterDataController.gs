/**
 * MasterDataController.gs
 *
 * Responsibility:
 * UI-safe controller endpoints for dynamic master data.
 */

function getMasterDataBootstrap() {
  return getMasterDataBootstrapForUi();
}

function getCabangOptionsForUi() {
  return getDynamicCabangOptions();
}

function getKaryawanOptionsForUi(cabang) {
  return getDynamicKaryawanOptions(cabang);
}

function getRoleOptionsForUi() {
  return getDynamicRoleOptions();
}

function getShiftOptionsForUi() {
  return getDynamicShiftOptions();
}

function refreshMasterDataCache() {
  clearMasterDataCache();
  return getMasterDataBootstrapForUi();
}
