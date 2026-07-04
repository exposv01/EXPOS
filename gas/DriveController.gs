/**
 * DriveController.gs
 *
 * Responsibility:
 * Public controller endpoints for EXPOS Drive operations.
 */

function initializeExposDriveStorage() {
  return setupExposDriveFolders();
}

function uploadReportProblemAttachment(data) {
  var payload = data || {};
  validateCurrentUserForUiPayload({ branch: payload.branch || payload.cabang });
  return uploadExposAttachment('REPORT_PROBLEM', payload.branch || payload.cabang, payload.attachment);
}

function uploadKasbonAttachment(data) {
  var payload = data || {};
  validateCurrentUserForUiPayload({ branch: payload.branch || payload.cabang });
  return uploadExposAttachment('KASBON', payload.branch || payload.cabang, payload.attachment);
}

function uploadIzinAttachment(data) {
  var payload = data || {};
  validateCurrentUserForUiPayload({ branch: payload.branch || payload.cabang });
  return uploadExposAttachment('IZIN', payload.branch || payload.cabang, payload.attachment);
}

function deleteAttachmentFromDrive(fileId) {
  return deleteExposAttachment(fileId);
}
