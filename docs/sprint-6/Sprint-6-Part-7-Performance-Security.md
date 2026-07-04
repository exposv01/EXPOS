# Sprint 6 Part 7 — Performance and Security

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menambahkan helper performance dan security ringan untuk EXPOS agar aplikasi lebih aman, lebih stabil, dan lebih efisien sebelum release candidate.

## Files Added

- gas/SecurityService.gs
- gas/PerformanceService.gs
- gas/SecurityPerformanceController.gs
- docs/sprint-6/Sprint-6-Part-7-Performance-Security.md

## Implemented

1. Input normalization helper.
2. Role assertion helper.
3. Minimum role helper.
4. Branch access helper wrapper.
5. Simple rate limiting via Script Cache.
6. Central cache helper.
7. Cache clearing helper.
8. Script lock and user lock helpers.
9. Execution measurement helper.
10. Admin diagnostics endpoint.

## Security Helpers

- normalizeTextInput
- normalizeCodeInput
- normalizeNumberInput
- requireAllowedRole
- requireMinimumRole
- requireBranchAccess
- enforceRateLimit
- sanitizePayload

## Performance Helpers

- getCachedJson
- clearCacheKeys
- runWithScriptLock
- runWithUserLock
- measureExecution

## Controller Endpoints

- getSecurityPerformanceStatus
- testCurrentUserAccess
- testRateLimit

## Rate Limit

Default:

- 30 actions per 60 seconds per user per action key

This is intentionally simple and suitable for Apps Script preview/MVP stage.

## Role Levels

- Owner: 100
- Admin: 80
- Manager: 60
- Crew: 20

## Bible Compliance

- Google Session remains identity source.
- Master_User remains role/branch source.
- UI does not enforce security as source of truth.
- Controller/Service enforce security.
- Google Sheets remains One Source of Truth.
- No new database added.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 7 after Audit Trail and Logging.

### Decision

Add reusable security and performance helpers before release candidate so all modules can use the same lightweight controls.

### Implementation

Added SecurityService, PerformanceService, SecurityPerformanceController, and documentation.

### Review

- Input normalization: OK
- Role validation: OK
- Branch access wrapper: OK
- Rate limit helper: OK
- Cache helper: OK
- Lock helper: OK
- Admin diagnostics: OK
- No UI direct security source: OK

## Test Notes

Manual test in Apps Script:

1. Run getSecurityPerformanceStatus as Owner/Admin.
2. Run testCurrentUserAccess with allowed cabang.
3. Run testCurrentUserAccess with disallowed cabang.
4. Run testRateLimit multiple times.
5. Confirm rate limit blocks after threshold.
6. Test getCachedJson with sample builder.
7. Test runWithScriptLock around a simple callback.

## Remaining Sprint 6 Work

1. Wire rate limit into submit bridges.
2. Wire runWithScriptLock into write workflows.
3. Replace duplicate cache logic with getCachedJson gradually.
4. Prepare Sprint 6 Part 8 Release Candidate.

## Result

Sprint 6 Part 7 complete. EXPOS now has lightweight performance and security helpers ready for module integration.
