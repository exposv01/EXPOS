/**
 * DriveService.gs
 *
 * Responsibility:
 * Central storage layer for EXPOS Google Drive operations.
 *
 * Bible EXPOS:
 * - UI never talks directly to Google Drive.
 * - Controller/Service delegates file storage to DriveService.
 * - Google Drive stores files, Google Sheets stores file metadata/URL.
 */

var EXPOS_DRIVE_CONFIG = {
  ROOT_FOLDER_NAME: 'EXPOS',
  MODULE_FOLDERS: {
    REPORT_PROBLEM: 'Report Problem',
    KASBON: 'Kasbon',
    IZIN: 'Izin',
    ASSET: 'Asset'
  },
  BRANCHES: ['CBN', 'ARH', 'SLW']
};

function setupExposDriveFolders() {
  var root = getOrCreateExposRootFolder();
  var result = {
    rootFolderId: root.getId(),
    rootFolderName: root.getName(),
    modules: {}
  };

  Object.keys(EXPOS_DRIVE_CONFIG.MODULE_FOLDERS).forEach(function(moduleKey) {
    var moduleName = EXPOS_DRIVE_CONFIG.MODULE_FOLDERS[moduleKey];
    var moduleFolder = getOrCreateChildFolder(root, moduleName);
    result.modules[moduleKey] = {
      folderId: moduleFolder.getId(),
      folderName: moduleFolder.getName(),
      branches: {}
    };

    if (moduleKey !== 'ASSET') {
      EXPOS_DRIVE_CONFIG.BRANCHES.forEach(function(branchCode) {
        var branchFolder = getOrCreateChildFolder(moduleFolder, branchCode);
        result.modules[moduleKey].branches[branchCode] = {
          folderId: branchFolder.getId(),
          folderName: branchFolder.getName()
        };
      });
    }
  });

  return result;
}

function getOrCreateExposRootFolder() {
  return getOrCreateFolderByName(DriveApp, EXPOS_DRIVE_CONFIG.ROOT_FOLDER_NAME);
}

function getExposModuleFolder(moduleKey) {
  var normalizedKey = String(moduleKey || '').trim().toUpperCase();
  var folderName = EXPOS_DRIVE_CONFIG.MODULE_FOLDERS[normalizedKey];
  if (!folderName) {
    throw new Error('Module folder tidak dikenal: ' + moduleKey);
  }
  return getOrCreateChildFolder(getOrCreateExposRootFolder(), folderName);
}

function getExposBranchFolder(moduleKey, branchCode) {
  var branch = String(branchCode || '').trim().toUpperCase();
  if (!branch) {
    throw new Error('Kode cabang wajib diisi.');
  }
  var moduleFolder = getExposModuleFolder(moduleKey);
  return getOrCreateChildFolder(moduleFolder, branch);
}

function getOrCreateFolderByName(parent, folderName) {
  var folders = parent.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parent.createFolder(folderName);
}

function getOrCreateChildFolder(parentFolder, folderName) {
  var folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(folderName);
}

function uploadExposAttachment(moduleKey, branchCode, attachment) {
  validateAttachmentPayload(attachment);
  var folder = getExposBranchFolder(moduleKey, branchCode);
  var fileName = buildAttachmentFileName(moduleKey, branchCode, attachment.originalName || attachment.fileName || 'attachment');
  var blob = buildAttachmentBlob(attachment, fileName);
  var file = folder.createFile(blob);

  if (attachment.description) {
    file.setDescription(String(attachment.description));
  }

  return buildAttachmentMetadata(file, moduleKey, branchCode);
}

function buildAttachmentBlob(attachment, fileName) {
  if (attachment.blob) {
    return attachment.blob.setName(fileName);
  }

  if (attachment.base64Data) {
    var bytes = Utilities.base64Decode(String(attachment.base64Data));
    var mimeType = attachment.mimeType || 'application/octet-stream';
    return Utilities.newBlob(bytes, mimeType, fileName);
  }

  throw new Error('Attachment harus memiliki blob atau base64Data.');
}

function validateAttachmentPayload(attachment) {
  if (!attachment) {
    throw new Error('Attachment wajib diisi.');
  }
  if (!attachment.blob && !attachment.base64Data) {
    throw new Error('Attachment wajib memiliki blob atau base64Data.');
  }
}

function buildAttachmentFileName(moduleKey, branchCode, originalName) {
  var modulePrefix = getAttachmentModulePrefix(moduleKey);
  var branch = String(branchCode || '').trim().toUpperCase();
  var dateCode = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyyyMMdd-HHmmss');
  var extension = getFileExtension(originalName);
  return modulePrefix + '-' + branch + '-' + dateCode + extension;
}

function getAttachmentModulePrefix(moduleKey) {
  var normalizedKey = String(moduleKey || '').trim().toUpperCase();
  var prefixes = {
    REPORT_PROBLEM: 'RP',
    KASBON: 'KSB',
    IZIN: 'IZN',
    ASSET: 'AST'
  };
  return prefixes[normalizedKey] || 'EXP';
}

function getFileExtension(fileName) {
  var name = String(fileName || '').trim();
  var index = name.lastIndexOf('.');
  if (index < 0 || index === name.length - 1) {
    return '';
  }
  return name.slice(index).toLowerCase();
}

function buildAttachmentMetadata(file, moduleKey, branchCode) {
  return {
    attachmentId: file.getId(),
    attachmentName: file.getName(),
    attachmentUrl: file.getUrl(),
    mimeType: file.getMimeType(),
    size: file.getSize(),
    moduleKey: String(moduleKey || '').trim().toUpperCase(),
    branchCode: String(branchCode || '').trim().toUpperCase(),
    uploadedBy: getCurrentUserEmailSafe(),
    uploadedAt: new Date().toISOString()
  };
}

function getCurrentUserEmailSafe() {
  try {
    return getCurrentUserEmail();
  } catch (err) {
    return '';
  }
}

function deleteExposAttachment(fileId) {
  var id = String(fileId || '').trim();
  if (!id) {
    throw new Error('File ID wajib diisi.');
  }
  var file = DriveApp.getFileById(id);
  file.setTrashed(true);
  return {
    attachmentId: id,
    status: 'trashed',
    deletedAt: new Date().toISOString()
  };
}
