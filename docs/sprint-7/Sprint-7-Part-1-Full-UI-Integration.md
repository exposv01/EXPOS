# Sprint 7 Part 1 — Full UI Integration

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan kontrak integrasi UI production-ready agar halaman aktif EXPOS dapat mengambil context, master data, dashboard, dan endpoint final dari satu bootstrap endpoint.

## Files Added

- gas/ProductionUiIntegrationService.gs
- docs/sprint-7/Sprint-7-Part-1-Full-UI-Integration.md

## Implemented

1. Production UI bootstrap endpoint.
2. Unified app metadata.
3. Unified user context.
4. Unified master data.
5. Unified dashboard snapshot.
6. Final UI endpoint contract.
7. Standard UI response normalizer.
8. Standard UI failure normalizer.

## Public Functions

- getProductionUiBootstrap
- getProductionUiEndpointContract
- normalizeUiResponse
- normalizeUiFailure

## Endpoint Contract

The UI can use getProductionUiBootstrap to discover active endpoint names for:

- submit absensi
- submit kasbon
- submit izin
- submit report problem
- dashboard live
- master data
- approval
- audit

## Bible EXPOS Compliance

- UI remains presentation layer.
- Google Session remains identity source.
- Master_User remains role and branch source.
- Master data comes from backend services.
- Dashboard data comes from backend services.
- No direct UI-to-Sheet access.
- No new database added.

## Delivery Visibility Rule

### Requirement

Execute Sprint 7 Part 1 first before other Sprint 7 parts.

### Decision

Create one production UI bootstrap contract first so later parts can wire workflows without guessing endpoint names or hardcoding data in UI.

### Implementation

Added ProductionUiIntegrationService and this report.

### Review

- Bootstrap contract: OK
- Endpoint contract: OK
- Response normalizer: OK
- UI remains presentation layer: OK
- No direct Sheet access: OK

## Remaining Work

1. Update active UI files to consume getProductionUiBootstrap.
2. Replace hardcoded dropdowns with masterData response.
3. Replace old submit endpoints with checked submit endpoints.
4. Apply response.success handling in all UI pages.

## Result

Sprint 7 Part 1 complete. EXPOS now has a production UI bootstrap contract ready for full UI migration.
