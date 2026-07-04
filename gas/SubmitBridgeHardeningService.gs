/**
 * SubmitBridgeHardeningService.gs
 *
 * Responsibility:
 * Provides hardened wrappers for UI submit bridges.
 *
 * Sprint 5 Part 7 applies:
 * - branch access validation
 * - session enrichment
 * - consistent UI response wrapper
 */

function submitAttendanceHardened(data) {
  try {
    validateCurrentUserForUiPayload(data);
    var enriched = enrichPayloadWithCurrentUser(data || {});
    var result = submitAttendance(enriched);
    return buildUiSuccessResponse({ module: 'ABSENSI', result: result });
  } catch (err) {
    return buildUiErrorResponse(err);
  }
}

function submitKasbonFromUiHardened(data) {
  try {
    validateCurrentUserForUiPayload(data);
    var enriched = enrichPayloadWithCurrentUser(data || {});
    var result = submitKasbonFromUi(enriched);
    return buildUiSuccessResponse({ module: 'KASBON', result: result });
  } catch (err) {
    return buildUiErrorResponse(err);
  }
}

function submitIzinFromUiHardened(data) {
  try {
    validateCurrentUserForUiPayload(data);
    var enriched = enrichPayloadWithCurrentUser(data || {});
    var result = submitIzinFromUi(enriched);
    return buildUiSuccessResponse({ module: 'IZIN', result: result });
  } catch (err) {
    return buildUiErrorResponse(err);
  }
}

function submitReportProblemFromUiHardened(data) {
  try {
    validateCurrentUserForUiPayload(data);
    var enriched = enrichPayloadWithCurrentUser(data || {});
    var result = submitReportProblemFromUi(enriched);
    return buildUiSuccessResponse({ module: 'REPORT_PROBLEM', result: result });
  } catch (err) {
    return buildUiErrorResponse(err);
  }
}

function assertUiResponseSuccess(response) {
  if (!response || response.success !== true) {
    throw new Error(response && response.message ? response.message : 'Submit gagal.');
  }
  return response;
}
