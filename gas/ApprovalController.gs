/**
 * ApprovalController.gs
 *
 * Responsibility:
 * Public UI-safe endpoints for approval workflow.
 */

function initializeApprovalWorkflow() {
  return setupApprovalWorkflow();
}

function createIzinApprovalRequest(referenceId, cabang, note) {
  return createApprovalRequest({
    module: 'IZIN',
    referenceId: referenceId,
    cabang: cabang,
    note: note || ''
  });
}

function createKasbonApprovalRequest(referenceId, cabang, note) {
  return createApprovalRequest({
    module: 'KASBON',
    referenceId: referenceId,
    cabang: cabang,
    note: note || ''
  });
}

function approveApproval(data) {
  return approveRequest(data);
}

function rejectApproval(data) {
  return rejectRequest(data);
}

function getPendingApprovals(filter) {
  var data = filter || {};
  data.status = EXPOS_APPROVAL_CONFIG.STATUS.PENDING;
  return getApprovalRequests(data);
}

function getApprovalList(filter) {
  return getApprovalRequests(filter || {});
}

function getApprovalStatusOptions() {
  return [
    EXPOS_APPROVAL_CONFIG.STATUS.PENDING,
    EXPOS_APPROVAL_CONFIG.STATUS.APPROVED,
    EXPOS_APPROVAL_CONFIG.STATUS.REJECTED
  ];
}
