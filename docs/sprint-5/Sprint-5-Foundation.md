# Sprint 5 Foundation — UI to Controller Integration

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menghidupkan UI Sprint 4 dengan foundation routing dan controller bridge awal.

Sprint 5 Foundation bukan menambah fitur baru, melainkan menghubungkan UI-007 sampai UI-012 ke pola arsitektur EXPOS:

UI -> Controller -> Service -> Repository -> Google Sheets

## Files Changed

- Added: gas/WebApp.gs
- Updated: gas/Controller.gs
- Added: docs/sprint-5/Sprint-5-Foundation.md

## Implemented

1. WebApp router foundation melalui doGet(e).
2. Route map untuk UI-007 sampai UI-012.
3. Controller bridge untuk Home Dashboard.
4. Controller bridge untuk Absensi UI.
5. Controller bridge untuk Kasbon UI.
6. Controller bridge untuk Izin UI.
7. Controller bridge untuk Report Problem UI.
8. Controller read-only bridge untuk Rekap Absensi.
9. Safe record reader untuk mencegah UI crash jika sheet/service belum siap.
10. Employee resolver berbasis nama dan cabang untuk bridge awal.

## Route Map

- home -> gas/ui/UI-007_HomeDashboard
- reportProblem -> gas/ui/UI-008_ReportProblemForm
- absensi -> gas/ui/UI-009_AbsensiForm
- kasbon -> gas/ui/UI-010_KasbonForm
- izin -> gas/ui/UI-011_IzinForm
- rekapAbsensi -> gas/ui/UI-012_RekapAbsensi

## Controller Functions Added

- openExposModule(moduleName)
- getHomeDashboardSummary()
- submitAttendance(data)
- submitKasbonFromUi(data)
- submitIzinFromUi(data)
- submitReportProblemFromUi(data)
- getAttendanceRecap(filter)

## Important Contract Decision

Existing backend service functions already used names such as submitKasbon, submitIzin, and submitReportProblem.

To protect existing service contracts, Sprint 5 does not overwrite those service functions.

Instead, Sprint 5 adds UI bridge functions with explicit names:

- submitKasbonFromUi
- submitIzinFromUi
- submitReportProblemFromUi

This keeps Bible EXPOS intact:

- UI payload can evolve.
- Controller adapts UI payload.
- Service contract remains stable.
- Repository remains the only persistence path.

## Bible Compliance

- Google Sheets remains One Source of Truth.
- Google Apps Script remains application/business layer.
- GitHub remains source control.
- UI remains presentation layer.
- Controller only bridges and validates request shape.
- Service remains workflow owner.
- Repository/Helper remains data access layer.
- No new database.
- No payroll, inventory, or complex dashboard added.

## Remaining Sprint 5 Work

1. Update UI-008, UI-010, and UI-011 to call the new bridge function names.
2. Improve client-side navigation so buttons move between rendered routes instead of only returning route metadata.
3. Add appsscript.json deployment manifest if missing.
4. Sync GitHub source into Google Apps Script project.
5. Deploy Web App preview.
6. Test end-to-end per module.

## Test Notes

Manual tests after Apps Script sync:

1. Run initializeMasterCabang.
2. Run initializeMasterKaryawan.
3. Run initializeAbsensi.
4. Run initializeIzin.
5. Run initializeKasbon.
6. Run initializeReportProblem.
7. Open Web App URL with page=home.
8. Test Home Dashboard summary.
9. Test Absensi submit using existing Master Karyawan name and cabang.
10. Test Rekap Absensi read-only.

## Delivery Visibility Rule

### Requirement

Execute Sprint 5 after UI-012.

### Decision

Sprint 5 starts with routing and controller bridge foundation, because UI pages already exist but need safe server-side endpoints.

### Implementation

Created WebApp router and extended Controller with UI bridge functions.

### Review

- Routing foundation: OK
- Controller bridge: OK
- Service contract protected: OK
- Repository pattern preserved: OK
- No direct UI-to-Sheet access: OK
- No new scope added: OK

## Result

Sprint 5 Foundation is implemented. EXPOS is now ready for the next Sprint 5 step: UI bridge function alignment and Apps Script preview deployment.
