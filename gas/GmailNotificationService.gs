/**
 * GmailNotificationService.gs
 *
 * Responsibility:
 * Sends EXPOS workflow notifications through Gmail.
 *
 * Bible EXPOS:
 * - UI does not send email.
 * - Controller/Service decides notification workflow.
 * - Gmail is communication channel only, not data source.
 */

var EXPOS_NOTIFICATION_CONFIG = {
  FROM_NAME: 'EXPOS Notification',
  DEFAULT_FOOTER: 'EXPOS - Employee Operational System',
  MODULE_LABELS: {
    REPORT_PROBLEM: 'Report Problem',
    KASBON: 'Kasbon',
    IZIN: 'Pengajuan Izin',
    ABSENSI: 'Absensi'
  }
};

function sendExposNotification(notification) {
  var data = validateNotificationPayload(notification);
  var htmlBody = buildExposNotificationHtml(data);
  var plainBody = buildExposNotificationPlainText(data);

  GmailApp.sendEmail(data.to.join(','), data.subject, plainBody, {
    htmlBody: htmlBody,
    name: EXPOS_NOTIFICATION_CONFIG.FROM_NAME,
    cc: data.cc.join(','),
    bcc: data.bcc.join(',')
  });

  return {
    status: 'sent',
    to: data.to,
    cc: data.cc,
    bcc: data.bcc,
    subject: data.subject,
    sentAt: new Date().toISOString()
  };
}

function validateNotificationPayload(notification) {
  var data = notification || {};
  var to = normalizeEmailList(data.to);
  if (!to.length) {
    throw new Error('Penerima email wajib diisi.');
  }

  return {
    to: to,
    cc: normalizeEmailList(data.cc),
    bcc: normalizeEmailList(data.bcc),
    subject: String(data.subject || '').trim() || 'EXPOS Notification',
    title: String(data.title || '').trim() || 'EXPOS Notification',
    moduleKey: String(data.moduleKey || '').trim().toUpperCase(),
    branchCode: String(data.branchCode || '').trim().toUpperCase(),
    summary: String(data.summary || '').trim(),
    fields: Array.isArray(data.fields) ? data.fields : [],
    actionUrl: String(data.actionUrl || '').trim(),
    footer: String(data.footer || '').trim() || EXPOS_NOTIFICATION_CONFIG.DEFAULT_FOOTER
  };
}

function normalizeEmailList(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map(function(email) {
      return String(email || '').trim().toLowerCase();
    }).filter(Boolean);
  }
  return String(value).split(',').map(function(email) {
    return String(email || '').trim().toLowerCase();
  }).filter(Boolean);
}

function buildExposNotificationHtml(data) {
  var rows = data.fields.map(function(field) {
    return '<tr><td style="padding:8px 10px;color:#667085;border-bottom:1px solid #e5eaf2;width:34%;">' + escapeHtmlNotification(field.label) + '</td><td style="padding:8px 10px;color:#172033;border-bottom:1px solid #e5eaf2;font-weight:600;">' + escapeHtmlNotification(field.value) + '</td></tr>';
  }).join('');

  var actionButton = data.actionUrl
    ? '<p style="margin:20px 0 0;"><a href="' + escapeHtmlNotification(data.actionUrl) + '" style="display:inline-block;background:#0f3d73;color:#ffffff;text-decoration:none;padding:11px 16px;border-radius:12px;font-weight:700;">Buka EXPOS</a></p>'
    : '';

  return '<div style="font-family:Arial,sans-serif;background:#f4f7fb;padding:24px;color:#172033;">'
    + '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5eaf2;border-radius:18px;overflow:hidden;">'
    + '<div style="background:#0f3d73;color:#ffffff;padding:18px 20px;">'
    + '<h2 style="margin:0;font-size:20px;">' + escapeHtmlNotification(data.title) + '</h2>'
    + '<p style="margin:6px 0 0;opacity:.85;font-size:13px;">' + escapeHtmlNotification(getNotificationModuleLabel(data.moduleKey)) + (data.branchCode ? ' • ' + escapeHtmlNotification(data.branchCode) : '') + '</p>'
    + '</div>'
    + '<div style="padding:18px 20px;">'
    + (data.summary ? '<p style="margin:0 0 16px;line-height:1.5;">' + escapeHtmlNotification(data.summary) + '</p>' : '')
    + '<table style="width:100%;border-collapse:collapse;border:1px solid #e5eaf2;border-radius:12px;overflow:hidden;font-size:14px;">' + rows + '</table>'
    + actionButton
    + '</div>'
    + '<div style="padding:12px 20px;background:#f7faff;color:#667085;font-size:12px;">' + escapeHtmlNotification(data.footer) + '</div>'
    + '</div></div>';
}

function buildExposNotificationPlainText(data) {
  var lines = [data.title, '', data.summary || '', ''];
  data.fields.forEach(function(field) {
    lines.push(String(field.label || '') + ': ' + String(field.value || ''));
  });
  if (data.actionUrl) {
    lines.push('', 'Buka EXPOS: ' + data.actionUrl);
  }
  lines.push('', data.footer);
  return lines.join('\n');
}

function getNotificationModuleLabel(moduleKey) {
  var key = String(moduleKey || '').trim().toUpperCase();
  return EXPOS_NOTIFICATION_CONFIG.MODULE_LABELS[key] || 'EXPOS';
}

function escapeHtmlNotification(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
