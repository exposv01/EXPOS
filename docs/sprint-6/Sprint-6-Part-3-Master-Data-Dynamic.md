# Sprint 6 Part 3 — Master Data Dynamic

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat dynamic master data layer untuk UI dropdown agar data operasional tidak lagi hardcoded di UI.

## Files Added

- gas/MasterDataDynamicService.gs
- gas/MasterDataController.gs
- docs/sprint-6/Sprint-6-Part-3-Master-Data-Dynamic.md

## Implemented

1. Dynamic cabang options from Master Cabang.
2. Dynamic karyawan options from Master Karyawan.
3. Dynamic role options from Master_User plus defaults.
4. Dynamic shift options.
5. UI bootstrap endpoint for master data.
6. Script cache for master data reads.
7. Cache refresh endpoint.

## Public Controller Endpoints

- getMasterDataBootstrap
- getCabangOptionsForUi
- getKaryawanOptionsForUi
- getRoleOptionsForUi
- getShiftOptionsForUi
- refreshMasterDataCache

## Cache

Cache service: Script Cache

TTL: 300 seconds

Cache keys:

- EXPOS_MASTER_CABANG_OPTIONS
- EXPOS_MASTER_KARYAWAN_OPTIONS
- EXPOS_ROLE_OPTIONS
- EXPOS_SHIFT_OPTIONS
- EXPOS_MASTER_BOOTSTRAP

## Expected UI Usage

On page load, UI can call:

- getMasterDataBootstrap

Then use response to populate:

- cabang dropdown
- karyawan dropdown
- role dropdown
- shift dropdown

For branch-specific karyawan dropdown, UI can call:

- getKaryawanOptionsForUi(cabang)

## Bible Compliance

- UI does not hardcode operational master data.
- Google Sheets remains One Source of Truth.
- Apps Script Service reads data.
- UI only renders dropdown options.
- No new database added.
- GitHub remains source code source of truth.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 3 after Gmail Notification.

### Decision

Build dynamic master data and cache layer before wiring UI forms, so all forms can consume the same source of truth.

### Implementation

Added MasterDataDynamicService, MasterDataController, and documentation.

### Review

- Cabang dynamic options: OK
- Karyawan dynamic options: OK
- Role dynamic options: OK
- Shift options endpoint: OK
- Cache layer: OK
- UI remains presentation layer: OK
- No direct UI-to-Sheet access: OK

## Test Notes

Manual test in Apps Script:

1. Run initializeMasterCabang.
2. Run initializeMasterKaryawan.
3. Run initializeMasterUser.
4. Run getMasterDataBootstrap.
5. Confirm cabangOptions populated.
6. Confirm karyawanOptions populated.
7. Run getKaryawanOptionsForUi('CBN').
8. Confirm only CBN employees returned.
9. Run refreshMasterDataCache.

## Remaining Sprint 6 Work

1. Wire S5 UI forms to call getMasterDataBootstrap.
2. Replace hardcoded cabang options in UI.
3. Replace hardcoded karyawan input with dropdown/autofill.
4. Lock dropdown based on current user branch.
5. Add Master Shift sheet later if shift rules grow more complex.

## Result

Sprint 6 Part 3 complete. EXPOS now has dynamic master data endpoints and cache for UI dropdowns.
