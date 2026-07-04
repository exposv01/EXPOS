/**
 * AttachmentHelper.gs
 *
 * Responsibility:
 * Standardizes EXPOS attachment metadata contract.
 */

var EXPOS_ATTACHMENT_FIELDS = [
  'attachmentId',
  'attachmentName',
  'attachmentUrl',
  'mimeType',
  'size',
  'moduleKey',
  'branchCode',
  'uploadedBy',
  'uploadedAt'
];

function normalizeAttachmentMetadata(metadata) {
  var data = metadata || {};
  return {
    attachmentId: String(data.attachmentId || '').trim(),
    attachmentName: String(data.attachmentName || '').trim(),
    attachmentUrl: String(data.attachmentUrl || '').trim(),
    mimeType: String(data.mimeType || '').trim(),
    size: Number(data.size || 0),
    moduleKey: String(data.moduleKey || '').trim().toUpperCase(),
    branchCode: String(data.branchCode || '').trim().toUpperCase(),
    uploadedBy: String(data.uploadedBy || '').trim().toLowerCase(),
    uploadedAt: String(data.uploadedAt || '').trim()
  };
}

function validateAttachmentMetadata(metadata) {
  var data = normalizeAttachmentMetadata(metadata);
  if (!data.attachmentId) {
    throw new Error('Attachment ID wajib diisi.');
  }
  if (!data.attachmentUrl) {
    throw new Error('Attachment URL wajib diisi.');
  }
  if (!data.moduleKey) {
    throw new Error('Module attachment wajib diisi.');
  }
  if (!data.branchCode) {
    throw new Error('Cabang attachment wajib diisi.');
  }
  return data;
}

function buildEmptyAttachmentMetadata() {
  return {
    attachmentId: '',
    attachmentName: '',
    attachmentUrl: '',
    mimeType: '',
    size: 0,
    moduleKey: '',
    branchCode: '',
    uploadedBy: '',
    uploadedAt: ''
  };
}

function mergeAttachmentIntoRecord(record, metadata) {
  var output = record || {};
  var attachment = normalizeAttachmentMetadata(metadata);
  output.attachmentId = attachment.attachmentId;
  output.attachmentName = attachment.attachmentName;
  output.attachmentUrl = attachment.attachmentUrl;
  output.attachmentMimeType = attachment.mimeType;
  output.attachmentSize = attachment.size;
  output.attachmentUploadedBy = attachment.uploadedBy;
  output.attachmentUploadedAt = attachment.uploadedAt;
  return output;
}
