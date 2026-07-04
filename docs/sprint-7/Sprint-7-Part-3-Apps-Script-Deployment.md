# Sprint 7 Part 3 — Apps Script Deployment

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan rencana deployment Apps Script untuk EXPOS production readiness.

## Files Added

- deploy/Sprint-7-Deployment-Plan.md
- docs/sprint-7/Sprint-7-Part-3-Apps-Script-Deployment.md

## Implemented

1. Deployment target definition.
2. Required setup function list.
3. Web App version naming.
4. URL policy.
5. Access policy.
6. Rollback plan.
7. Known limitation note.

## Deployment Result

No live URL is created in this part because the available connector cannot deploy Google Apps Script directly. This part prepares the deployment plan for manual execution in Apps Script.

## Bible EXPOS Compliance

- GitHub remains source code source of truth.
- Apps Script remains runtime.
- Google Sheets remains database.
- Google Drive remains storage.
- Gmail remains notification channel.

## Delivery Visibility Rule

### Requirement

Execute Sprint 7 Part 3 after Part 2 report.

### Decision

Create deployment plan and rollout policy without fabricating a preview URL.

### Implementation

Added Sprint 7 deployment plan and this report.

### Review

- Deployment plan: OK
- Setup functions listed: OK
- Access policy: OK
- Rollback plan: OK
- No fake URL: OK

## Remaining Work

1. Manual Apps Script sync.
2. Manual Web App deployment.
3. Record real Preview URL.
4. Run RC test plan.

## Result

Sprint 7 Part 3 complete. EXPOS has a clear Apps Script deployment plan ready for manual deployment.
