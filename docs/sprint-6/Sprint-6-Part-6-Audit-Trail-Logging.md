# Sprint 6 Part 6 — Audit Trail and Logging

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat fondasi audit trail dan logging untuk EXPOS agar aktivitas user dan kendala sistem dapat ditelusuri.

## Files Added

- gas/AuditTrailService.gs
- gas/AuditController.gs
- docs/sprint-6/Sprint-6-Part-6-Audit-Trail-Logging.md

## Implemented

1. Audit_Log sheet setup.
2. Error_Log sheet setup.
3. Activity log writer.
4. Error log writer.
5. Recent audit log reader.
6. Recent error log reader.
7. User context enrichment from Google Session and Master_User.

## Audit Sheets

### Audit_Log

Headers:

- Audit ID
- Timestamp
- User Email
- Role
- Cabang
- Module
- Action
- Reference ID
- Status
- Message
- Metadata JSON

### Error_Log

Headers:

- Error ID
- Timestamp
- User Email
- Role
- Cabang
- Module
- Function Name
- Error Message
- Stack Trace
- Payload JSON

## Public Controller Endpoints

- initializeAuditTrail
- logExposActivity
- logExposError
- getRecentAuditLogs
- getRecentErrorLogs

## Service Functions

- initializeAuditSheets
- writeAuditLog
- writeErrorLog
- getAuditLogs
- getErrorLogs

## Bible Compliance

- UI does not write logs directly as source of truth.
- Controller/Service owns logging workflow.
- Google Sheets remains One Source of Truth.
- Logs are append-only.
- User context comes from Google Session and Master_User.
- No new database added.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 6 after Approval Workflow.

### Decision

Create audit and error logging foundation first before wiring every workflow, so future sprint parts can gradually log actions without destabilizing existing services.

### Implementation

Added AuditTrailService, AuditController, and documentation.

### Review

- Activity log sheet: OK
- Error log sheet: OK
- Log writer: OK
- Log reader: OK
- User context enrichment: OK
- Append-only pattern: OK
- No UI direct persistence: OK

## Test Notes

Manual test in Apps Script:

1. Run initializeAuditTrail.
2. Run logExposActivity with sample data.
3. Confirm Audit_Log row is created.
4. Run logExposError with sample data.
5. Confirm Error_Log row is created.
6. Run getRecentAuditLogs.
7. Run getRecentErrorLogs.

## Remaining Sprint 6 Work

1. Wire submit workflows to write audit logs.
2. Wire approval decisions to write audit logs.
3. Wire notification send results to audit logs.
4. Add admin UI page for audit inspection later.
5. Add log retention policy if needed.

## Result

Sprint 6 Part 6 complete. EXPOS now has audit trail and logging foundation.
