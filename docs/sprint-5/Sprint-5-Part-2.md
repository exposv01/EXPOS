# Sprint 5 Part 2 — UI Bridge Alignment and Preview Navigation

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyambungkan UI Sprint 4 ke Sprint 5 Controller Bridge dengan lebih aman untuk kebutuhan Preview Build.

Fokus Part 2:

- Align submit function dari UI ke Controller Bridge.
- Aktifkan navigasi antarhalaman lewat route WebApp page parameter.
- Pisahkan file UI Sprint 5 dari file UI Sprint 4 agar Sprint 4 tetap menjadi arsip desain.

## Files Added

- gas/ui/s5/UI-007_HomeDashboard_S5.html
- gas/ui/s5/UI-008_ReportProblemForm_S5.html
- gas/ui/s5/UI-009_AbsensiForm_S5.html
- gas/ui/s5/UI-010_KasbonForm_S5.html
- gas/ui/s5/UI-011_PermissionForm_S5.html
- gas/ui/s5/UI-012_RekapAbsensi_S5.html

## Files Updated

- gas/WebApp.gs

## Active Preview Routes

- home -> gas/ui/s5/UI-007_HomeDashboard_S5
- reportProblem -> gas/ui/s5/UI-008_ReportProblemForm_S5
- absensi -> gas/ui/s5/UI-009_AbsensiForm_S5
- kasbon -> gas/ui/s5/UI-010_KasbonForm_S5
- izin -> gas/ui/s5/UI-011_PermissionForm_S5
- rekapAbsensi -> gas/ui/s5/UI-012_RekapAbsensi_S5

## Bridge Functions Used

- Report Problem UI uses submitReportProblemFromUi
- Absensi UI uses submitAttendance
- Kasbon UI uses submitKasbonFromUi
- Izin UI uses submitIzinFromUi
- Rekap Absensi UI uses getAttendanceRecap
- Home Dashboard UI uses getHomeDashboardSummary

## Navigation

Preview navigation now uses WebApp route query:

- ?page=home
- ?page=reportProblem
- ?page=absensi
- ?page=kasbon
- ?page=izin
- ?page=rekapAbsensi

This avoids relying on server-side navigation return metadata only.

## Delivery Visibility Rule

### Requirement

Continue Sprint 5 Part 2 after Sprint 5 Foundation.

### Decision

Rather than overwriting long Sprint 4 UI files, Sprint 5 creates integrated S5 UI files under gas/ui/s5. This keeps Sprint 4 design files intact and makes Preview Build easier to control.

### Implementation

Created S5 UI files and updated WebApp route map to point to S5 active files.

### Review

- UI submit bridge aligned: OK
- Route navigation enabled: OK
- Sprint 4 UI preserved: OK
- Preview source isolated under gas/ui/s5: OK
- UI remains presentation layer: OK
- Controller remains bridge: OK
- Service/Repository pattern preserved: OK

## Remaining Sprint 5 Work

1. Add appsscript.json if missing.
2. Prepare Apps Script sync/deployment checklist.
3. Sync GitHub files into Google Apps Script.
4. Deploy Web App Preview.
5. Test every route and submit flow.
6. Harden Master_User session-based auto-fill in the next part.

## Result

Sprint 5 Part 2 is implemented. EXPOS now has active Preview UI routes ready for Apps Script deployment testing.
