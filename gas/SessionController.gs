/**
 * SessionController.gs
 *
 * Responsibility:
 * Public UI-safe endpoints for current user/session context.
 */

function initializeMasterUser() {
  return setupMasterUser();
}

function getCurrentUserContext() {
  return getCurrentExposUserForUi();
}

function getCurrentUserAccessSummary() {
  var user = getCurrentExposUserForUi();
  return {
    email: user.email,
    namaUser: user.namaUser,
    role: user.role,
    cabang: user.cabang,
    canAccessAllBranches: user.canAccessAllBranches,
    resolvedAt: new Date().toISOString()
  };
}

function canCurrentUserAccessBranch(cabang) {
  var user = assertCurrentUserCanAccessBranch(cabang);
  return {
    ok: true,
    email: user.email,
    role: user.role,
    cabang: user.cabang,
    requestedCabang: String(cabang || '').trim()
  };
}
