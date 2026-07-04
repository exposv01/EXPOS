/**
 * DashboardController.gs
 *
 * Responsibility:
 * UI-safe endpoints for live dashboard data.
 */

function getLiveDashboard(filter) {
  var request = filter || {};
  if (request.branch && request.branch !== 'ALL') {
    assertCurrentUserCanAccessBranch(request.branch);
  }
  return getLiveDashboardData(request);
}

function getTodayLiveDashboard() {
  return getLiveDashboardData({ branch: 'ALL' });
}

function refreshLiveDashboard(filter) {
  clearDashboardLiveCache();
  return getLiveDashboard(filter || {});
}
