const EXPOS_UI_ROUTES = Object.freeze({
  home: 'gas/ui/s5/UI-007_HomeDashboard_S5',
  reportProblem: 'gas/ui/s5/UI-008_ReportProblemForm_S5',
  absensi: 'gas/ui/s5/UI-009_AbsensiForm_S5',
  kasbon: 'gas/ui/s5/UI-010_KasbonForm_S5',
  izin: 'gas/ui/s5/UI-011_PermissionForm_S5',
  rekapAbsensi: 'gas/ui/s5/UI-012_RekapAbsensi_S5'
});

function doGet(e) {
  const route = normalizeExposRoute_(e && e.parameter && e.parameter.page);
  return renderExposPage_(route);
}

function renderExposPage_(route) {
  const fileName = EXPOS_UI_ROUTES[route] || EXPOS_UI_ROUTES.home;
  return HtmlService
    .createHtmlOutputFromFile(fileName)
    .setTitle('EXPOS')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function normalizeExposRoute_(route) {
  const value = String(route || 'home').trim();
  return EXPOS_UI_ROUTES[value] ? value : 'home';
}

function getExposWebAppRoutes() {
  return Object.keys(EXPOS_UI_ROUTES);
}
