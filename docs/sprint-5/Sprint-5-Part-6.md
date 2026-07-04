# Sprint 5 Part 6 — Hardening Foundation

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Memperkuat fondasi Sprint 5 dengan helper hardening untuk session-aware UI, branch access, dan response pattern yang lebih konsisten.

## Files Added

- gas/HardeningService.gs
- gas/BootstrapController.gs
- docs/sprint-5/Sprint-5-Part-6.md

## Implemented

1. UI success response helper.
2. UI error response helper.
3. Branch resolver dari payload UI/service.
4. Current user branch validation helper.
5. Payload enrichment dengan current session user.
6. UI bootstrap context endpoint.
7. Allowed branches endpoint.
8. Branch lock endpoint.

## Public Endpoints Added

- getExposUiBootstrap
- getAllowedBranchesForCurrentUser
- isCurrentUserBranchLocked

## Helper Functions Added

- buildUiSuccessResponse
- buildUiErrorResponse
- resolveSubmitBranchFromPayload
- validateCurrentUserForUiPayload
- enrichPayloadWithCurrentUser
- getUiBootstrapContext

## Expected UI Bootstrap Response

The UI can call getExposUiBootstrap and receive:

- user
- branchLock
- allowedBranches
- timestamp

This prepares UI for:

- Auto-fill user identity.
- Auto-fill branch.
- Lock branch for non-ALL users.
- Remove manual identity dependency step by step.

## Delivery Visibility Rule

### Requirement

Execute Sprint 5 Part 6 after Part 5.

### Decision

Part 6 adds hardening as separate helper/controller files instead of modifying the large existing Controller immediately. This reduces risk and keeps existing Preview Build stable.

### Implementation

Created HardeningService and BootstrapController.

### Review

- Session-aware helper added: OK
- Branch access helper added: OK
- UI bootstrap endpoint added: OK
- No direct Sheet access from UI: OK
- No login manual added: OK
- Existing preview submit flow not broken: OK
- GitHub remains source of truth: OK

## Remaining Hardening Work

1. Wire validateCurrentUserForUiPayload into every submit bridge.
2. Update S5 UI to call getExposUiBootstrap on load.
3. Hide or lock cabang field for non-ALL users.
4. Replace employeeName manual input with current user context when role is Crew.
5. Add structured error response wrapper to submit endpoints.
6. Run deployment smoke test.

## Result

Sprint 5 Part 6 is complete as a hardening foundation. EXPOS is ready for the next step: applying the hardening helpers into active submit bridges and UI auto-fill.
