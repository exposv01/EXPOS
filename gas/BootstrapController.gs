/**
 * BootstrapController.gs
 *
 * Responsibility:
 * Provides UI bootstrap context for Sprint 5 hardening.
 */

function getExposUiBootstrap() {
  return getUiBootstrapContext();
}

function getAllowedBranchesForCurrentUser() {
  return getUiBootstrapContext().allowedBranches;
}

function isCurrentUserBranchLocked() {
  return getUiBootstrapContext().branchLock;
}
