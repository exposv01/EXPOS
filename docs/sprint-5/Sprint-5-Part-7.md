# Sprint 5 Part 7 — Apply Hardening to Submit Bridges

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menerapkan hardening Sprint 5 Part 6 ke submit bridge secara aman dan bertahap.

Part 7 tidak menimpa submit lama. Part 7 menambahkan wrapper submit yang sudah memakai:

- branch access validation
- session enrichment
- consistent response wrapper

## Files Added

- gas/SubmitBridgeHardeningService.gs
- gas/SubmitBridgeController.gs
- docs/sprint-5/Sprint-5-Part-7.md

## Hardened Wrapper Functions

- submitAttendanceHardened
- submitKasbonFromUiHardened
- submitIzinFromUiHardened
- submitReportProblemFromUiHardened

## UI Controller Endpoints

- submitAttendanceChecked
- submitKasbonChecked
- submitIzinChecked
- submitReportProblemChecked
- getCheckedSubmitContract

## Response Shape

Success response:

- success: true
- message: OK
- data
- timestamp

Error response:

- success: false
- message
- errorCode
- timestamp

## Hardening Applied

1. validateCurrentUserForUiPayload
2. enrichPayloadWithCurrentUser
3. buildUiSuccessResponse
4. buildUiErrorResponse

## Why Wrapper Instead of Replacing Existing Submit

Existing submit functions are still used by current preview UI and legacy service tests.

To avoid breaking current Preview Build, Part 7 adds checked submit endpoints that can be adopted gradually by UI S5.

## Delivery Visibility Rule

### Requirement

Execute Sprint 5 Part 7 after hardening foundation.

### Decision

Create separate checked endpoints first to preserve compatibility while preparing the UI for stricter session/branch validation.

### Implementation

Added SubmitBridgeHardeningService and SubmitBridgeController.

### Review

- Branch access validation wrapper: OK
- Session enrichment wrapper: OK
- Consistent response wrapper: OK
- Legacy submit preserved: OK
- UI migration path available: OK
- No direct UI-to-Sheet access: OK

## Next Steps

1. Update active S5 UI files to use checked submit endpoints.
2. Update UI success handler to inspect response.success.
3. Auto-fill branch and user from getExposUiBootstrap.
4. Run Apps Script smoke test after deployment.

## Result

Sprint 5 Part 7 is complete. EXPOS now has hardened submit bridge endpoints ready for UI migration.
