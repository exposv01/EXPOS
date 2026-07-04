/**
 * ReportProblemController.gs
 *
 * Responsibility:
 * Exposes Report Problem controller helpers separately to keep Controller.gs stable.
 */

function initializeReportProblem() {
  return setupReportProblem();
}

function createReportProblem(data) {
  return submitReportProblem(data);
}

function getRekapReportProblem() {
  return getReportProblemRecords();
}
