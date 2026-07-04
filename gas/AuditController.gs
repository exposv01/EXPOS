/**
 * AuditController.gs
 *
 * Responsibility:
 * UI-safe/admin-safe endpoints for audit and error log inspection.
 */

function initializeAuditTrail() {
  return initializeAuditSheets();
}

function logExposActivity(entry) {
  return writeAuditLog(entry || {});
}

function logExposError(entry) {
  return writeErrorLog(entry || {});
}

function getRecentAuditLogs(limit) {
  return getAuditLogs(limit || 100);
}

function getRecentErrorLogs(limit) {
  return getErrorLogs(limit || 100);
}
