/**
 * NotificationRecipientService.gs
 *
 * Responsibility:
 * Resolves notification recipients from Master_User.
 */

var EXPOS_NOTIFICATION_RECIPIENT_RULES = {
  REPORT_PROBLEM_CREATED: ['Owner', 'Admin', 'Manager'],
  KASBON_SUBMITTED: ['Owner', 'Admin'],
  IZIN_SUBMITTED: ['Owner', 'Admin', 'Manager'],
  ABSENSI_SUBMITTED: ['Admin', 'Manager']
};

function getNotificationRecipientsByEvent(eventKey, branchCode) {
  var key = String(eventKey || '').trim().toUpperCase();
  var roles = EXPOS_NOTIFICATION_RECIPIENT_RULES[key] || [];
  return getNotificationRecipientsByRoles(roles, branchCode);
}

function getNotificationRecipientsByRoles(roles, branchCode) {
  var targetRoles = (roles || []).map(function(role) {
    return String(role || '').trim().toLowerCase();
  }).filter(Boolean);

  if (!targetRoles.length) {
    return [];
  }

  var branch = String(branchCode || '').trim().toUpperCase();
  var users = getMasterUserRecords();
  var recipients = [];
  var seen = {};

  users.forEach(function(user) {
    var email = String(user['Email'] || '').trim().toLowerCase();
    var role = String(user['Role'] || '').trim().toLowerCase();
    var userBranch = String(user['Cabang'] || '').trim().toUpperCase();
    var status = String(user['Status'] || '').trim();

    if (!email || seen[email]) {
      return;
    }
    if (status !== EXPOS_MASTER_USER_CONFIG.STATUS_ACTIVE) {
      return;
    }
    if (targetRoles.indexOf(role) < 0) {
      return;
    }
    if (branch && userBranch !== 'ALL' && userBranch !== branch) {
      return;
    }

    seen[email] = true;
    recipients.push(email);
  });

  return recipients;
}

function getNotificationRuleSummary() {
  return EXPOS_NOTIFICATION_RECIPIENT_RULES;
}
