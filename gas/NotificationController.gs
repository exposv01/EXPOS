/**
 * NotificationController.gs
 *
 * Responsibility:
 * Public controller endpoints for EXPOS Gmail notifications.
 */

function notifyReportProblemCreated(data) {
  var payload = data || {};
  var branch = String(payload.branch || payload.cabang || '').trim().toUpperCase();
  var recipients = getNotificationRecipientsByEvent('REPORT_PROBLEM_CREATED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Report Problem Baru - ' + branch,
    title: 'Report Problem Baru',
    moduleKey: 'REPORT_PROBLEM',
    branchCode: branch,
    summary: 'Ada laporan masalah operasional baru yang perlu ditindaklanjuti.',
    fields: [
      { label: 'Cabang', value: branch },
      { label: 'Judul', value: payload.title || payload.judulProblem || '-' },
      { label: 'Pelapor', value: payload.reportedBy || payload.namaPelapor || '-' },
      { label: 'Prioritas', value: payload.priority || '-' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}

function notifyKasbonSubmitted(data) {
  var payload = data || {};
  var branch = String(payload.branch || payload.cabang || '').trim().toUpperCase();
  var recipients = getNotificationRecipientsByEvent('KASBON_SUBMITTED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Pengajuan Kasbon - ' + branch,
    title: 'Pengajuan Kasbon Baru',
    moduleKey: 'KASBON',
    branchCode: branch,
    summary: 'Ada pengajuan kasbon baru yang perlu direview.',
    fields: [
      { label: 'Cabang', value: branch },
      { label: 'Karyawan', value: payload.employeeName || payload.namaKaryawan || '-' },
      { label: 'Nominal', value: payload.amount || payload.nominal || '-' },
      { label: 'Alasan', value: payload.reason || payload.keterangan || '-' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}

function notifyIzinSubmitted(data) {
  var payload = data || {};
  var branch = String(payload.branch || payload.cabang || '').trim().toUpperCase();
  var recipients = getNotificationRecipientsByEvent('IZIN_SUBMITTED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Pengajuan Izin - ' + branch,
    title: 'Pengajuan Izin Baru',
    moduleKey: 'IZIN',
    branchCode: branch,
    summary: 'Ada pengajuan izin baru yang perlu direview.',
    fields: [
      { label: 'Cabang', value: branch },
      { label: 'Karyawan', value: payload.employeeName || payload.namaKaryawan || '-' },
      { label: 'Tanggal Mulai', value: payload.startDate || payload.tanggalMulai || '-' },
      { label: 'Tanggal Selesai', value: payload.endDate || payload.tanggalSelesai || '-' },
      { label: 'Alasan', value: payload.reason || '-' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}

function notifyAbsensiSubmitted(data) {
  var payload = data || {};
  var branch = String(payload.branch || payload.cabang || '').trim().toUpperCase();
  var recipients = getNotificationRecipientsByEvent('ABSENSI_SUBMITTED', branch);

  return sendExposNotification({
    to: recipients,
    subject: '[EXPOS] Absensi Baru - ' + branch,
    title: 'Absensi Baru',
    moduleKey: 'ABSENSI',
    branchCode: branch,
    summary: 'Ada data absensi baru yang masuk ke EXPOS.',
    fields: [
      { label: 'Cabang', value: branch },
      { label: 'Karyawan', value: payload.employeeName || payload.namaKaryawan || '-' },
      { label: 'Tipe', value: payload.attendanceType || payload.jenisAbsensi || '-' },
      { label: 'Shift', value: payload.shift || '-' }
    ],
    actionUrl: payload.actionUrl || ''
  });
}
