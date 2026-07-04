/**
 * HardeningService.gs
 *
 * Responsibility:
 * Centralizes Sprint 5 hardening helpers for UI bridge safety.
 */

function buildUiSuccessResponse(data) {
  return {
    success: true,
    message: 'OK',
    data: data || {},
    timestamp: new Date().toISOString()
  };
}

function buildUiErrorResponse(error) {
  return {
    success: false,
    message: error && error.message ? error.message : 'Terjadi kesalahan.',
    errorCode: 'EXPOS_ERROR',
    timestamp: new Date().toISOString()
  };
}

function resolveSubmitBranchFromPayload(payload) {
  if (!payload) {
    throw new Error('Payload wajib diisi.');
  }
  var branch = String(payload.branch || payload.cabang || '').trim();
  if (!branch) {
    throw new Error('Cabang wajib diisi.');
  }
  return branch;
}

function validateCurrentUserForUiPayload(payload) {
  var branch = resolveSubmitBranchFromPayload(payload);
  return assertCurrentUserCanAccessBranch(branch);
}

function enrichPayloadWithCurrentUser(payload) {
  var user = getCurrentExposUserForUi();
  var data = payload || {};
  data.sessionEmail = user.email;
  data.sessionRole = user.role;
  data.sessionCabang = user.cabang;
  data.sessionIdKaryawan = user.idKaryawan;
  data.sessionNamaUser = user.namaUser;
  return data;
}

function getUiBootstrapContext() {
  var user = getCurrentExposUserForUi();
  return {
    user: user,
    branchLock: user.cabang !== 'ALL',
    allowedBranches: user.cabang === 'ALL' ? ['CBN', 'ARH', 'SLW'] : [user.cabang],
    timestamp: new Date().toISOString()
  };
}
