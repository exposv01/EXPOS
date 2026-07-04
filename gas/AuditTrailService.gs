/**
 * AuditTrailService.gs
 *
 * Responsibility:
 * Records EXPOS activity logs and error logs for audit and troubleshooting.
 *
 * Bible EXPOS:
 * - Audit is append-only.
 * - Google Sheets remains One Source of Truth.
 * - UI does not write audit logs directly.
 */

var EXPOS_AUDIT_CONFIG = {
  ACTIVITY_SHEET: 'Audit_Log',
  ERROR_SHEET: 'Error_Log',
  ACTIVITY_HEADERS: [
    'Audit ID',
    'Timestamp',
    'User Email',
    'Role',
    'Cabang',
    'Module',
    'Action',
    'Reference ID',
    'Status',
    'Message',
    'Metadata JSON'
  ],
  ERROR_HEADERS: [
    'Error ID',
    'Timestamp',
    'User Email',
    'Role',
    'Cabang',
    'Module',
    'Function Name',
    'Error Message',
    'Stack Trace',
    'Payload JSON'
  ]
};

function initializeAuditSheets() {
  var activitySheet = getOrCreateSheet(EXPOS_AUDIT_CONFIG.ACTIVITY_SHEET);
  var errorSheet = getOrCreateSheet(EXPOS_AUDIT_CONFIG.ERROR_SHEET);
  ensureSheetHeaders(activitySheet, EXPOS_AUDIT_CONFIG.ACTIVITY_HEADERS);
  ensureSheetHeaders(errorSheet, EXPOS_AUDIT_CONFIG.ERROR_HEADERS);
  return {
    activitySheet: EXPOS_AUDIT_CONFIG.ACTIVITY_SHEET,
    errorSheet: EXPOS_AUDIT_CONFIG.ERROR_SHEET,
    status: 'ready'
  };
}

function writeAuditLog(entry) {
  var data = normalizeAuditEntry(entry);
  var auditId = generateAuditId('AUD');
  appendSheetRows(getOrCreateSheet(EXPOS_AUDIT_CONFIG.ACTIVITY_SHEET), [[
    auditId,
    getExposTimestamp(),
    data.userEmail,
    data.role,
    data.cabang,
    data.module,
    data.action,
    data.referenceId,
    data.status,
    data.message,
    JSON.stringify(data.metadata || {})
  ]]);
  return {
    auditId: auditId,
    status: 'logged'
  };
}

function writeErrorLog(entry) {
  var data = normalizeErrorEntry(entry);
  var errorId = generateAuditId('ERR');
  appendSheetRows(getOrCreateSheet(EXPOS_AUDIT_CONFIG.ERROR_SHEET), [[
    errorId,
    getExposTimestamp(),
    data.userEmail,
    data.role,
    data.cabang,
    data.module,
    data.functionName,
    data.errorMessage,
    data.stackTrace,
    JSON.stringify(data.payload || {})
  ]]);
  return {
    errorId: errorId,
    status: 'logged'
  };
}

function normalizeAuditEntry(entry) {
  var payload = entry || {};
  var user = getAuditUserContextSafe();
  return {
    userEmail: String(payload.userEmail || user.email || '').trim().toLowerCase(),
    role: String(payload.role || user.role || '').trim(),
    cabang: String(payload.cabang || user.cabang || '').trim().toUpperCase(),
    module: String(payload.module || '').trim().toUpperCase(),
    action: String(payload.action || '').trim().toUpperCase(),
    referenceId: String(payload.referenceId || '').trim(),
    status: String(payload.status || '').trim(),
    message: String(payload.message || '').trim(),
    metadata: payload.metadata || {}
  };
}

function normalizeErrorEntry(entry) {
  var payload = entry || {};
  var user = getAuditUserContextSafe();
  return {
    userEmail: String(payload.userEmail || user.email || '').trim().toLowerCase(),
    role: String(payload.role || user.role || '').trim(),
    cabang: String(payload.cabang || user.cabang || '').trim().toUpperCase(),
    module: String(payload.module || '').trim().toUpperCase(),
    functionName: String(payload.functionName || '').trim(),
    errorMessage: String(payload.errorMessage || '').trim(),
    stackTrace: String(payload.stackTrace || '').trim(),
    payload: payload.payload || {}
  };
}

function getAuditUserContextSafe() {
  try {
    return getCurrentExposUserForUi();
  } catch (err) {
    return {
      email: getCurrentUserEmailSafeForAudit(),
      role: '',
      cabang: ''
    };
  }
}

function getCurrentUserEmailSafeForAudit() {
  try {
    return getCurrentUserEmail();
  } catch (err) {
    return '';
  }
}

function generateAuditId(prefix) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMddHHmmss');
  var random = Utilities.getUuid().slice(0, 8).toUpperCase();
  return prefix + '-' + dateCode + '-' + random;
}

function getAuditLogs(limit) {
  var records = readSheetObjects(getOrCreateSheet(EXPOS_AUDIT_CONFIG.ACTIVITY_SHEET));
  var max = Number(limit || 100);
  return records.slice(-max).reverse();
}

function getErrorLogs(limit) {
  var records = readSheetObjects(getOrCreateSheet(EXPOS_AUDIT_CONFIG.ERROR_SHEET));
  var max = Number(limit || 100);
  return records.slice(-max).reverse();
}
