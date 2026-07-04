/**
 * ApprovalNotificationService.gs
 *
 * Responsibility:
 * Sends Gmail notifications for approval workflow events.
 */

function notifyApprovalCreated(data) {
  var payload = data || {};
  var branch = String(payload.cabang || payload.branch || '').trim().toUpperCase();
  var module = String(payload.module || '').trim().toUpperCase();
  var recipients = getNotificationRecipientsByEvent(module === 'KASBON' ? 'KASBON_SUBMITTED' : 'IZIN_SUBMITTED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Approval Pending - ' + module + ' - ' + branch,
    title: 'Approval Pending',
    moduleKey: module,
    branchCode: branch,
    summary: 'Ada pengajuan baru yang menunggu approval.',
    fields: [
      { label: 'Approval ID', value: payload.approvalId || '-' },
      { label: 'Module', value: module },
      { label: 'Reference ID', value: payload.referenceId || '-' },
      { label: 'Cabang', value: branch },
      { label: 'Status', value: payload.status || 'Pending' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}

function notifyApprovalDecided(data) {
  var payload = data || {};
  var branch = String(payload.cabang || payload.branch || '').trim().toUpperCase();
  var module = String(payload.module || '').trim().toUpperCase();
  var status = String(payload.status || '').trim();
  var recipients = getNotificationRecipientsByEvent(module === 'KASBON' ? 'KASBON_SUBMITTED' : 'IZIN_SUBMITTED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Approval ' + status + ' - ' + module + ' - ' + branch,
    title: 'Approval ' + status,
    moduleKey: module,
    branchCode: branch,
    summary: 'Keputusan approval telah diproses.',
    fields: [
      { label: 'Approval ID', value: payload.approvalId || '-' },
      { label: 'Module', value: module },
      { label: 'Status', value: status },
      { label: 'Approved By', value: payload.approvedBy || '-' },
      { label: 'Catatan', value: payload.note || '-' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}
