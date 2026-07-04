# Sprint 7 Part 4 — Real User Testing

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan matrix pengujian nyata untuk akun Google Workspace dan validasi role/cabang sebelum production.

## Files Added

- testing/Sprint-7-Real-User-Test-Matrix.md
- docs/sprint-7/Sprint-7-Part-4-Real-User-Testing.md

## Implemented

1. Role matrix.
2. Branch matrix.
3. Minimum test account list.
4. Session tests.
5. Negative tests.
6. Pass criteria.

## Roles Covered

- Owner
- Admin
- Manager
- Crew

## Bible EXPOS Compliance

- Identity test uses Google Session.
- Role test uses Master_User.
- Branch access test uses Master_User.
- No manual login pattern added.

## Delivery Visibility Rule

### Requirement

Execute Sprint 7 Part 4 after Part 3 report.

### Decision

Create real user testing matrix before bug fix sprint so bugs can be classified based on real role/cabang scenarios.

### Implementation

Added real user test matrix and this report.

### Review

- User role coverage: OK
- Branch coverage: OK
- Negative tests: OK
- Pass criteria: OK

## Remaining Work

1. Run the matrix after Apps Script deployment.
2. Record failures as bug list.
3. Fix critical and major issues in Part 5.

## Result

Sprint 7 Part 4 complete. EXPOS has a real user testing matrix ready for Workspace validation.
