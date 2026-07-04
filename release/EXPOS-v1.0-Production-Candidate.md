# EXPOS v1.0 Production Candidate

Tanggal: 2026-07-04
Status: Production Candidate
Repository: exposv01/EXPOS

## Objective

Menetapkan EXPOS v1.0 Production Candidate sebagai paket final sebelum digunakan untuk operasional internal EXP Gaming.

## Included Scope

- Mobile WebApp foundation
- Backend Module 1 workflow
- Google Session identity
- Master_User role and branch access
- Dynamic master data
- Submit bridge hardening
- End-to-end workflow orchestration
- Google Drive storage layer
- Gmail notification layer
- Approval workflow foundation
- Audit trail and error logging
- Live dashboard data layer
- Performance and security helpers
- Deployment plan
- RC test plan
- Production hardening checklist

## Production Acceptance Criteria

EXPOS v1.0 can be accepted if:

1. WebApp deployment succeeds.
2. Owner/Admin/Manager/Crew session tests pass.
3. Branch access tests pass.
4. Module submit tests pass.
5. Approval tests pass.
6. Notification tests pass.
7. Audit tests pass.
8. Dashboard tests pass.
9. No Critical bug remains open.
10. Owner approves Go decision.

## Production Freeze

No new feature should enter v1.0 after this point unless it fixes a Critical or Major blocker.

## Version Tag Recommendation

Recommended Git tag:

v1.0.0-pc

After successful deployment and acceptance test:

v1.0.0

## Known Manual Step

Google Apps Script deployment must still be performed in Google Workspace because current connector cannot create the Web App deployment directly.

## Next Backlog After v1.0

- Dedicated approval UI
- Payroll engine
- Inventory module
- Executive dashboard
- AI insight layer
- Franchise-ready reporting
- Multi-branch advanced analytics
