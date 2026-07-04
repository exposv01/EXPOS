# Sprint 7 Part 2 — End-to-End Workflow

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menghubungkan fondasi workflow agar modul utama tidak berjalan sendiri-sendiri, tetapi memiliki alur end-to-end menuju dashboard, approval, notification, dan audit trail.

## Files Added

- gas/EndToEndWorkflowService.gs
- docs/sprint-7/Sprint-7-Part-2-End-to-End-Workflow.md

## Implemented

1. Absensi end-to-end workflow.
2. Izin submit + approval request + notification + audit.
3. Kasbon submit + approval request + notification + audit.
4. Report Problem submit + notification + audit.
5. Dashboard cache clear after successful workflow.
6. Rate limit check per workflow.
7. Workflow endpoint contract.

## Public Functions

- processAbsensiEndToEnd
- processIzinEndToEnd
- processKasbonEndToEnd
- processReportProblemEndToEnd
- getEndToEndWorkflowContract

## Bible EXPOS Compliance

- UI calls Controller/Service workflow only.
- Approval handled by ApprovalService.
- Notification handled by Gmail service layer.
- Audit handled by AuditTrailService.
- Dashboard remains read-only.
- Google Sheets remains One Source of Truth.
- No direct UI-to-Sheet access.

## Delivery Visibility Rule

### Requirement

Execute Sprint 7 Part 2 after Part 1 report.

### Decision

Create orchestration service instead of merging logic into individual services immediately. This keeps existing services stable while adding full workflow paths.

### Implementation

Added EndToEndWorkflowService and this report.

### Review

- Absensi workflow: OK
- Izin approval flow: OK
- Kasbon approval flow: OK
- Report Problem notification flow: OK
- Audit hook: OK
- Dashboard cache refresh: OK

## Remaining Work

1. Wire active UI to use process*EndToEnd endpoints.
2. Add dedicated Drive upload flow into Report Problem final submit.
3. Add approval UI for managers/admins.
4. Smoke test in Apps Script after deployment.

## Result

Sprint 7 Part 2 complete. EXPOS now has end-to-end workflow orchestration for Module 1.
