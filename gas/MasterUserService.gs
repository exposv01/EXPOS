/**
 * MasterUserService.gs
 *
 * Responsibility:
 * Resolves EXPOS user identity from Google Session and Master_User sheet.
 *
 * Bible EXPOS:
 * - Identity source: Google Session.
 * - Role source: Master_User.
 * - UI must not become identity source of truth.
 */

var EXPOS_MASTER_USER_CONFIG = {
  SHEET_NAME: 'Master_User',
  STATUS_ACTIVE: 'Aktif',
  HEADERS: [
    'Email',
    'Nama User',
    'Role',
    'Cabang',
    'ID Karyawan',
    'Status'
  ],
  DEFAULT_ROWS: [
    ['owner@example.com', 'Owner EXPOS', 'Owner', 'ALL', '', 'Aktif'],
    ['admin@example.com', 'Admin EXPOS', 'Admin', 'ALL', '', 'Aktif'],
    ['crew.cbn@example.com', 'Crew CBN', 'Crew', 'CBN', 'CBN-001', 'Aktif']
  ]
};

function initializeMasterUserSheet() {
  var sheet = getOrCreateSheet(EXPOS_MASTER_USER_CONFIG.SHEET_NAME);
  ensureSheetHeaders(sheet, EXPOS_MASTER_USER_CONFIG.HEADERS);
  return sheet;
}

function setupMasterUser() {
  var sheet = initializeMasterUserSheet();
  if (isSheetDataEmpty(sheet)) {
    appendSheetRows(sheet, EXPOS_MASTER_USER_CONFIG.DEFAULT_ROWS);
  }
  return {
    sheetName: EXPOS_MASTER_USER_CONFIG.SHEET_NAME,
    status: 'ready'
  };
}

function getMasterUserRecords() {
  var sheet = initializeMasterUserSheet();
  return readSheetObjects(sheet);
}

function getCurrentUserEmail() {
  var email = '';
  try {
    email = Session.getActiveUser().getEmail();
  } catch (err) {
    email = '';
  }

  if (!email) {
    try {
      email = Session.getEffectiveUser().getEmail();
    } catch (err2) {
      email = '';
    }
  }

  return String(email || '').trim().toLowerCase();
}

function getCurrentExposUser() {
  var email = getCurrentUserEmail();
  if (!email) {
    throw new Error('Email Google Session tidak terbaca. Pastikan Web App memakai akun Google Workspace yang valid.');
  }
  return findActiveMasterUserByEmail(email);
}

function findActiveMasterUserByEmail(email) {
  var normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail) {
    throw new Error('Email user wajib diisi.');
  }

  var users = getMasterUserRecords();
  for (var i = 0; i < users.length; i++) {
    var rowEmail = String(users[i]['Email'] || '').trim().toLowerCase();
    var status = String(users[i]['Status'] || '').trim();
    if (rowEmail === normalizedEmail && status === EXPOS_MASTER_USER_CONFIG.STATUS_ACTIVE) {
      return normalizeMasterUserRecord(users[i]);
    }
  }

  throw new Error('User aktif tidak ditemukan di Master_User: ' + normalizedEmail);
}

function normalizeMasterUserRecord(record) {
  return {
    email: String(record['Email'] || '').trim().toLowerCase(),
    namaUser: String(record['Nama User'] || '').trim(),
    role: String(record['Role'] || '').trim(),
    cabang: String(record['Cabang'] || '').trim(),
    idKaryawan: String(record['ID Karyawan'] || '').trim(),
    status: String(record['Status'] || '').trim()
  };
}

function getCurrentExposUserForUi() {
  var user = getCurrentExposUser();
  return {
    email: user.email,
    namaUser: user.namaUser,
    role: user.role,
    cabang: user.cabang,
    idKaryawan: user.idKaryawan,
    canAccessAllBranches: user.cabang === 'ALL'
  };
}

function assertCurrentUserCanAccessBranch(cabang) {
  var user = getCurrentExposUser();
  var targetCabang = String(cabang || '').trim();

  if (!targetCabang) {
    throw new Error('Cabang wajib diisi.');
  }

  if (user.cabang === 'ALL' || user.cabang === targetCabang) {
    return user;
  }

  throw new Error('User tidak memiliki akses ke cabang: ' + targetCabang);
}
