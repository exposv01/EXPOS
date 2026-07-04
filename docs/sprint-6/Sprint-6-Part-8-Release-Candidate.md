# Sprint 6 Part 8 — Release Candidate

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menutup Sprint 6 dengan paket Release Candidate EXPOS v0.9 untuk persiapan deployment dan uji coba internal.

## Files Added

- release/EXPOS-v0.9-RC.md
- release/RC_TEST_PLAN.md
- release/DEPLOYMENT_CUTOVER_CHECKLIST.md
- docs/sprint-6/Sprint-6-Part-8-Release-Candidate.md

## Implemented

1. EXPOS v0.9 RC release notes.
2. RC test plan.
3. Deployment cutover checklist.
4. Scope freeze.
5. Known limitation list.
6. Go / No-Go checklist.

## RC Scope Summary

EXPOS v0.9 RC includes:

- Backend foundation
- Module 1 service foundation
- Mobile UI foundation
- WebApp router
- Google Drive storage layer
- Gmail notification layer
- Dynamic master data
- Live dashboard data layer
- Approval workflow foundation
- Audit trail and error logging
- Performance and security helpers

## Freeze Scope

No new feature should be added to v0.9 RC unless it fixes a blocking issue.

Excluded from RC:

- Payroll engine
- Inventory engine
- Franchise module
- Complex BI analytics
- AI insight
- Advanced approval UI

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 8 after Performance and Security.

### Decision

Part 8 is a release candidate packaging step, not a feature expansion step. The goal is to freeze scope and prepare deployment/testing.

### Implementation

Added release documentation, test plan, and deployment checklist.

### Review

- Release notes: OK
- Test plan: OK
- Deployment checklist: OK
- Scope freeze: OK
- Go / No-Go criteria: OK
- No new feature creep: OK

## Result

Sprint 6 Part 8 is complete. EXPOS v0.9 RC package is ready for Apps Script deployment and internal testing.
