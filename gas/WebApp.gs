/**
 * EXPOS WebApp Router
 * Sprint 5 Foundation
 *
 * Bible EXPOS:
 * - UI is presentation layer only.
 * - WebApp routes page rendering only.
 * - Workflow must go through Controller -> Service -> Repository.
 */

const EXPOS_UI_ROUTES = Object.freeze({
  home: 'gas/ui/UI-007_HomeDashboard',
  reportProblem: 'gas/ui/UI-008_ReportProblemForm',
  absensi: 'gas/ui/UI-009_AbsensiForm',
  kasbon: 'gas/ui/UI-010_KasbonForm',
  izin: 'gas/ui/UI-011_IzinForm',
  rekapAbsensi: 'gas/ui/UI-012_RekapAbsensi'
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
