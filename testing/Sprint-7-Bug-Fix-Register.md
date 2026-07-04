# Sprint 7 Part 5 — Bug Fix Register

Tanggal: 2026-07-04
Status: Ready for bug triage

## Objective

Menyiapkan register bug untuk Sprint 7 agar hasil real user testing dapat diprioritaskan dan diperbaiki secara disiplin tanpa scope creep.

## Severity

### Critical

Blocking production usage.

Examples:

- WebApp cannot open
- User session cannot resolve
- All submit workflows fail
- Data writes to wrong sheet

### Major

Important feature broken but app still partially usable.

Examples:

- Approval fails for one role
- Dashboard count wrong
- Notification recipient wrong
- Branch lock inconsistent

### Minor

Non-blocking issue.

Examples:

- Copy typo
- UI spacing issue
- Empty state wording
- Toast timing

## Bug Register Template

| ID | Severity | Module | Description | Expected | Actual | Status | Fix Commit |
|---|---|---|---|---|---|---|---|
| BUG-001 | Critical | TBD | TBD | TBD | TBD | Open | - |

## Fix Policy

- Critical bugs must be fixed before v1.0.
- Major bugs should be fixed before production candidate.
- Minor bugs can be batched into UI polish if not blocking.
- No new feature is allowed during bug fix sprint unless needed to fix a blocker.

## Bug Workflow

1. Reproduce
2. Classify severity
3. Identify module
4. Patch in GitHub
5. Re-test
6. Mark as fixed
7. Record commit SHA

## Go / No-Go Rule

Go only when:

- No Critical bugs open
- Major bugs accepted or fixed
- Deployment smoke test passes
