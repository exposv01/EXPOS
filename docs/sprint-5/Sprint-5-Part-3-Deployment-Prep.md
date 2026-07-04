# Sprint 5 Part 3 — Apps Script Deployment Prep

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan source EXPOS agar siap disinkronkan ke Google Apps Script dan dideploy sebagai Web App Preview.

Part 3 belum membuat live URL, karena deployment harus dilakukan di Google Apps Script project/workspace. Output Part 3 adalah manifest dan checklist deployment yang siap diikuti.

## Files Added

- appsscript.json
- docs/sprint-5/Sprint-5-Part-3-Deployment-Prep.md

## Manifest Configuration

Manifest menggunakan:

- timeZone: Asia/Jakarta
- runtimeVersion: V8
- exceptionLogging: STACKDRIVER
- webapp executeAs: USER_DEPLOYING
- webapp access: DOMAIN

OAuth scopes:

- spreadsheets
- drive
- script external request
- userinfo.email

## Active WebApp Entry

Entry point:

- doGet(e) in gas/WebApp.gs

Active preview routes:

- ?page=home
- ?page=reportProblem
- ?page=absensi
- ?page=kasbon
- ?page=izin
- ?page=rekapAbsensi

## Active Preview UI Files

- gas/ui/s5/UI-007_HomeDashboard_S5.html
- gas/ui/s5/UI-008_ReportProblemForm_S5.html
- gas/ui/s5/UI-009_AbsensiForm_S5.html
- gas/ui/s5/UI-010_KasbonForm_S5.html
- gas/ui/s5/UI-011_PermissionForm_S5.html
- gas/ui/s5/UI-012_RekapAbsensi_S5.html

## Backend Files Required in Apps Script

Minimum files required for preview sync:

- appsscript.json
- gas/WebApp.gs
- gas/Controller.gs
- gas/Config.gs
- gas/Repository.gs
- gas/Helper.gs
- gas/MasterDataService.gs
- gas/MasterUserService.gs
- gas/RoleService.gs
- gas/AbsensiService.gs
- gas/IzinService.gs
- gas/KasbonService.gs
- gas/ReportProblemService.gs
- gas/ui/s5/*.html

Optional but recommended existing files:

- gas/AttendanceService.gs
- gas/NotificationService.gs
- gas/Service.gs
- gas/Setup.gs

## Deployment Checklist

1. Open target Google Apps Script project.
2. Add or sync all required `.gs` files.
3. Add or sync all active S5 `.html` files.
4. Add appsscript.json manifest.
5. Set Script Property EXPOS_SPREADSHEET_ID to target Google Sheet ID if not container-bound.
6. Run setup functions manually once:
   - initializeMasterCabang
   - initializeMasterKaryawan
   - initializeAbsensi
   - initializeIzin
   - initializeKasbon
   - initializeReportProblem
7. Deploy as Web App.
8. Execute as: Me / User deploying.
9. Access: Anyone in domain or intended workspace users.
10. Open Web App URL with `?page=home`.
11. Test all routes.

## Smoke Test Routes

After deployment, test these URLs:

- WebApp URL + ?page=home
- WebApp URL + ?page=reportProblem
- WebApp URL + ?page=absensi
- WebApp URL + ?page=kasbon
- WebApp URL + ?page=izin
- WebApp URL + ?page=rekapAbsensi

## Smoke Test Submit Flow

Use employee names that already exist in Master_Karyawan.

Test:

1. Absensi submit.
2. Kasbon submit.
3. Izin submit.
4. Report Problem submit.
5. Rekap Absensi load.
6. Home Dashboard summary refresh.

## Known Limitation

The preview still uses bridge functions and some fields remain temporary UI fields.

Next Sprint 5 part should harden:

- Google Session identity resolution.
- Master_User role and branch auto-fill.
- UI dropdowns from Master Data.
- Deployment URL documentation after Web App is live.

## Delivery Visibility Rule

### Requirement

Continue after Sprint 5 Part 2.

### Decision

Part 3 prepares manifest and deployment checklist before live deployment, because Apps Script deployment must happen inside the Google Workspace project.

### Implementation

Added appsscript.json and deployment documentation.

### Review

- Manifest added: OK
- Timezone Jakarta: OK
- V8 runtime: OK
- Web App config included: OK
- Deployment checklist added: OK
- Preview routes documented: OK
- No new product scope added: OK

## Result

Sprint 5 Part 3 is complete. EXPOS is ready for Google Apps Script sync and Web App Preview deployment.
