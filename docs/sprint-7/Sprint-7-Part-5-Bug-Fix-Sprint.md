# Sprint 7 Part 5 — Bug Fix Sprint

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan bug fix register dan aturan triage agar hasil testing Sprint 7 dapat diperbaiki secara disiplin tanpa scope creep.

## Files Added

- testing/Sprint-7-Bug-Fix-Register.md
- docs/sprint-7/Sprint-7-Part-5-Bug-Fix-Sprint.md

## Implemented

1. Severity definition.
2. Bug register template.
3. Fix policy.
4. Bug workflow.
5. Go / No-Go rule.

## Severity

- Critical
- Major
- Minor

## Bible EXPOS Compliance

- Bug fix sprint does not add new product scope.
- Fixes must preserve UI to Controller to Service to Repository pattern.
- No direct UI-to-Sheet shortcut is allowed as a fix.

## Delivery Visibility Rule

### Requirement

Execute Sprint 7 Part 5 after Part 4 report.

### Decision

Create bug fix register first because real bugs can only be fixed after Apps Script deployment and real user testing.

### Implementation

Added bug register and this report.

### Review

- Bug severity defined: OK
- Bug template ready: OK
- Fix policy ready: OK
- Go / No-Go rule ready: OK

## Remaining Work

1. Run real user testing.
2. Fill bug register with actual bugs.
3. Fix critical and major bugs.
4. Record fix commits.

## Result

Sprint 7 Part 5 complete. EXPOS has a formal bug fix process ready for testing results.
