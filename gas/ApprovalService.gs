/**
 * ApprovalService.gs
 *
 * Responsibility:
 * Provides generic approval workflow for EXPOS modules.
 *
 * Scope Sprint 6 Part 5:
 * - Izin approval
 * - Kasbon approval
 * - Pending / Approved / Rejected
 * - Role-based approver validation through Master_User
 */

var EXPOS_APPROVAL_CONFIG = {
  SHEET_NAME: 'Approval_Log',
  HEADERS: [
    'Approval ID',
    'Timestamp',
    'Module',
    'Reference ID',
    'Cabang',
    'Requested By',
    'Status',
    'Approved By',
    'Approved At',
    'Decision Note'
  ],
  STATUS: {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected'
  },
  APPROVER_ROLES: ['Owner', 'Admin', 'Manager']
};

function initializeApprovalSheet() {
  var sheet = getOrCreateSheet(EXPOS_APPROVAL_CONFIG.SHEET_NAME);
  ensureSheetHeaders(sheet, EXPOS_APPROVAL_CONFIG.HEADERS);
  return sheet;
}

function setupApprovalWorkflow() {
  initializeApprovalSheet();
  return {
    sheetName: EXPOS_APPROVAL_CONFIG.SHEET_NAME,
    status: 'ready'
  };
}

function createApprovalRequest(data) {
  var request = normalizeApprovalRequest(data);
  var user = getCurrentExposUserForUi();
  var approvalId = generateApprovalId(request.module, request.cabang);
  var timestamp = getExposTimestamp();

  appendSheetRows(initializeApprovalSheet(), [[
    approvalId,
    timestamp,
    request.module,
    request.referenceId,
    request.cabang,
    user.email,
    EXPOS_APPROVAL_CONFIG.STATUS.PENDING,
    '',
    '',
    request.note
  ]]);

  return {
    approvalId: approvalId,
    status: EXPOS_APPROVAL_CONFIG.STATUS.PENDING,
    module: request.module,
    referenceId: request.referenceId,
    cabang: request.cabang,
    requestedBy: user.email,
    createdAt: timestamp
  };
}

function approveRequest(data) {
  return decideApprovalRequest(data, EXPOS_APPROVAL_CONFIG.STATUS.APPROVED);
}

function rejectRequest(data) {
  return decideApprovalRequest(data, EXPOS_APPROVAL_CONFIG.STATUS.REJECTED);
}

function decideApprovalRequest(data, decisionStatus) {
  var request = normalizeApprovalDecision(data);
  assertCurrentUserCanApprove(request.cabang);

  var sheet = initializeApprovalSheet();
  var records = readSheetObjects(sheet);
  var rowIndex = findApprovalRowIndex(records, request.approvalId);
  if (rowIndex < 0) {
    throw new Error('Approval ID tidak ditemukan: ' + request.approvalId);
  }

  var record = records[rowIndex];
  if (String(record['Status'] || '') !== EXPOS_APPROVAL_CONFIG.STATUS.PENDING) {
    throw new Error('Approval sudah diproses sebelumnya.');
  }

  var user = getCurrentExposUserForUi();
  var approvedAt = getExposTimestamp();
  var sheetRowNumber = rowIndex + 2;

  sheet.getRange(sheetRowNumber, 7).setValue(decisionStatus);
  sheet.getRange(sheetRowNumber, 8).setValue(user.email);
  sheet.getRange(sheetRowNumber, 9).setValue(approvedAt);
  sheet.getRange(sheetRowNumber, 10).setValue(request.note);

  return {
    approvalId: request.approvalId,
    status: decisionStatus,
    approvedBy: user.email,
    approvedAt: approvedAt,
    note: request.note
  };
}

function getApprovalRequests(filter) {
  var request = normalizeApprovalFilter(filter);
  var records = readSheetObjects(initializeApprovalSheet());
  return records.filter(function(record) {
    var matchModule = !request.module || String(record['Module'] || '') === request.module;
    var matchCabang = request.cabang === 'ALL' || String(record['Cabang'] || '') === request.cabang;
    var matchStatus = !request.status || String(record['Status'] || '') === request.status;
    return matchModule && matchCabang && matchStatus;
  });
}

function assertCurrentUserCanApprove(cabang) {
  var user = assertCurrentUserCanAccessBranch(cabang);
  var role = String(user.role || '').trim();
  if (EXPOS_APPROVAL_CONFIG.APPROVER_ROLES.indexOf(role) < 0) {
    throw new Error('Role tidak memiliki akses approval: ' + role);
  }
  return user;
}

function normalizeApprovalRequest(data) {
  var payload = data || {};
  return {
    module: requireApprovalText(payload.module, 'Module'),
    referenceId: requireApprovalText(payload.referenceId, 'Reference ID'),
    cabang: requireApprovalText(payload.cabang || payload.branch, 'Cabang'),
    note: String(payload.note || '').trim()
  };
}

function normalizeApprovalDecision(data) {
  var payload = data || {};
  return {
    approvalId: requireApprovalText(payload.approvalId, 'Approval ID'),
    cabang: requireApprovalText(payload.cabang || payload.branch, 'Cabang'),
    note: String(payload.note || '').trim()
  };
}

function normalizeApprovalFilter(filter) {
  var data = filter || {};
  return {
    module: String(data.module || '').trim(),
    cabang: String(data.cabang || data.branch || 'ALL').trim().toUpperCase() || 'ALL',
    status: String(data.status || '').trim()
  };
}

function findApprovalRowIndex(records, approvalId) {
  for (var i = 0; i < records.length; i++) {
    if (String(records[i]['Approval ID'] || '') === approvalId) {
      return i;
    }
  }
  return -1;
}

function generateApprovalId(module, cabang) {
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyMMdd');
  var prefix = 'APR-' + String(module || 'GEN').toUpperCase() + '-' + String(cabang || 'ALL').toUpperCase() + '-' + dateCode + '-';
  var records = readSheetObjects(initializeApprovalSheet());
  var sequence = records.filter(function(record) {
    return String(record['Approval ID'] || '').indexOf(prefix) === 0;
  }).length + 1;
  return prefix + String(sequence).padStart(3, '0');
}

function requireApprovalText(value, label) {
  var text = String(value || '').trim();
  if (!text) {
    throw new Error(label + ' wajib diisi.');
  }
  return text;
}
