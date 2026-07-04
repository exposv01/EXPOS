/**
 * EndToEndWorkflowService.gs
 *
 * Responsibility:
 * Orchestrates EXPOS end-to-end module workflows.
 *
 * Sprint 7 Part 2:
 * - Absensi -> Dashboard
 * - Izin -> Approval -> Notification -> Dashboard
 * - Kasbon -> Approval -> Notification -> Dashboard
 * - Report Problem -> Drive metadata support -> Notification -> Dashboard
 */

function processAbsensiEndToEnd(payload) {
  enforceRateLimit('ABSENSI_SUBMIT');
  var response = submitAttendanceChecked(payload);
  if (response.success) {
    writeAuditLog({ module: 'ABSENSI', action: 'SUBMIT', status: 'SUCCESS', message: 'Absensi submitted.', metadata: response.data });
    clearDashboardLiveCache();
  }
  return response;
}

function processIzinEndToEnd(payload) {
  enforceRateLimit('IZIN_SUBMIT');
  var response = submitIzinChecked(payload);
  if (response.success) {
    var result = response.data && response.data.result ? response.data.result : {};
    var approval = createIzinApprovalRequest(result.idIzin || payload.referenceId || 'PENDING_REF', payload.branch || payload.cabang, payload.reason || '');
    notifyApprovalCreated(approval);
    writeAuditLog({ module: 'IZIN', action: 'SUBMIT_WITH_APPROVAL', referenceId: approval.approvalId, status: 'SUCCESS', message: 'Izin submitted and approval created.', metadata: { submit: response.data, approval: approval } });
    clearDashboardLiveCache();
    response.data.approval = approval;
  }
  return response;
}

function processKasbonEndToEnd(payload) {
  enforceRateLimit('KASBON_SUBMIT');
  var response = submitKasbonChecked(payload);
  if (response.success) {
    var result = response.data && response.data.result ? response.data.result : {};
    var approval = createKasbonApprovalRequest(result.idKasbon || payload.referenceId || 'PENDING_REF', payload.branch || payload.cabang, payload.reason || '');
    notifyApprovalCreated(approval);
    writeAuditLog({ module: 'KASBON', action: 'SUBMIT_WITH_APPROVAL', referenceId: approval.approvalId, status: 'SUCCESS', message: 'Kasbon submitted and approval created.', metadata: { submit: response.data, approval: approval } });
    clearDashboardLiveCache();
    response.data.approval = approval;
  }
  return response;
}

function processReportProblemEndToEnd(payload) {
  enforceRateLimit('REPORT_PROBLEM_SUBMIT');
  var response = submitReportProblemChecked(payload);
  if (response.success) {
    notifyReportProblemCreated(payload);
    writeAuditLog({ module: 'REPORT_PROBLEM', action: 'SUBMIT_NOTIFY', status: 'SUCCESS', message: 'Report problem submitted and notification sent.', metadata: response.data });
    clearDashboardLiveCache();
  }
  return response;
}

function getEndToEndWorkflowContract() {
  return {
    absensi: 'processAbsensiEndToEnd',
    izin: 'processIzinEndToEnd',
    kasbon: 'processKasbonEndToEnd',
    reportProblem: 'processReportProblemEndToEnd'
  };
}
