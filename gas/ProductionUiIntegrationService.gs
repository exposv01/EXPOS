/**
 * ProductionUiIntegrationService.gs
 *
 * Responsibility:
 * Provides a single production-ready bootstrap contract for EXPOS UI.
 *
 * Sprint 7 Part 1:
 * - unify session context
 * - unify master data
 * - unify dashboard snapshot
 * - expose final endpoint names for active UI migration
 */

function getProductionUiBootstrap() {
  var userContext = getExposUiBootstrap();
  var masterData = getMasterDataBootstrap();
  var dashboard = getTodayLiveDashboard();

  return {
    app: {
      name: 'EXPOS',
      version: '0.9-RC',
      mode: 'production-readiness',
      generatedAt: new Date().toISOString()
    },
    userContext: userContext,
    masterData: masterData,
    dashboard: dashboard,
    endpoints: getProductionUiEndpointContract()
  };
}

function getProductionUiEndpointContract() {
  return {
    bootstrap: 'getProductionUiBootstrap',
    dashboard: 'getLiveDashboard',
    masterData: 'getMasterDataBootstrap',
    submit: {
      absensi: 'submitAttendanceChecked',
      kasbon: 'submitKasbonChecked',
      izin: 'submitIzinChecked',
      reportProblem: 'submitReportProblemChecked'
    },
    approval: {
      pending: 'getPendingApprovals',
      approve: 'approveApproval',
      reject: 'rejectApproval'
    },
    audit: {
      recentActivity: 'getRecentAuditLogs',
      recentError: 'getRecentErrorLogs'
    }
  };
}

function normalizeUiResponse(response) {
  if (response && response.success === false) {
    return response;
  }
  return {
    success: true,
    message: 'OK',
    data: response || {},
    timestamp: new Date().toISOString()
  };
}

function normalizeUiFailure(error) {
  return {
    success: false,
    message: error && error.message ? error.message : 'Terjadi kesalahan.',
    errorCode: 'EXPOS_UI_ERROR',
    timestamp: new Date().toISOString()
  };
}
