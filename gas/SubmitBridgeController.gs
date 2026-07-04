/**
 * SubmitBridgeController.gs
 *
 * Responsibility:
 * UI-safe submit endpoints using Sprint 5 hardening wrappers.
 */

function submitAttendanceChecked(data) {
  return submitAttendanceHardened(data);
}

function submitKasbonChecked(data) {
  return submitKasbonFromUiHardened(data);
}

function submitIzinChecked(data) {
  return submitIzinFromUiHardened(data);
}

function submitReportProblemChecked(data) {
  return submitReportProblemFromUiHardened(data);
}

function getCheckedSubmitContract() {
  return {
    absensi: 'submitAttendanceChecked',
    kasbon: 'submitKasbonChecked',
    izin: 'submitIzinChecked',
    reportProblem: 'submitReportProblemChecked',
    responseShape: {
      success: true,
      message: 'OK',
      data: {},
      timestamp: new Date().toISOString()
    }
  };
}
