# Apps Script Deployment Session 1 — Sync Runbook

Tanggal: 2026-07-04
Status: Ready for manual execution in Google Apps Script

## Objective

Menyiapkan langkah sinkronisasi final dari GitHub ke Google Apps Script agar EXPOS dapat menghasilkan Preview URL.

## Important Limitation

Current ChatGPT connector can write to GitHub but cannot directly deploy Google Apps Script Web App. Preview URL must be generated inside Google Apps Script after source is synced.

## Source of Truth

- GitHub: exposv01/EXPOS
- Runtime: Google Apps Script
- Database: Google Sheets
- Storage: Google Drive
- Notification: Gmail

## Sync Order

1. appsscript.json
2. gas/*.gs
3. gas/ui/s5/*.html
4. deployment docs for reference only

## Apps Script Flat Filename Mapping

Apps Script editor may not preserve folder paths for HTML files. If slash paths fail, use flat filenames and update WebApp route map.

Recommended flat HTML names:

- UI_007_HomeDashboard_S5
- UI_008_ReportProblemForm_S5
- UI_009_AbsensiForm_S5
- UI_010_KasbonForm_S5
- UI_011_PermissionForm_S5
- UI_012_RekapAbsensi_S5

Recommended WebApp route map for flat files:

- home: UI_007_HomeDashboard_S5
- reportProblem: UI_008_ReportProblemForm_S5
- absensi: UI_009_AbsensiForm_S5
- kasbon: UI_010_KasbonForm_S5
- izin: UI_011_PermissionForm_S5
- rekapAbsensi: UI_012_RekapAbsensi_S5

## Required Script Property

Set this property if the project is not container-bound:

- EXPOS_SPREADSHEET_ID

Value:

- Google Sheet ID for EXPOS operational database

## Initial Setup Functions

Run once after sync:

- initializeMasterCabang
- initializeMasterKaryawan
- initializeMasterUser
- initializeAbsensi
- initializeIzin
- initializeKasbon
- initializeReportProblem
- initializeExposDriveStorage
- initializeApprovalWorkflow
- initializeAuditTrail

## Deploy Web App

1. Click Deploy.
2. Select New deployment.
3. Select Web app.
4. Description: EXPOS v1.0 Preview - Deployment Session 1.
5. Execute as: Me.
6. Access: Workspace/domain users.
7. Deploy.
8. Copy Web App URL.

## Preview URL Test

Open:

- WEB_APP_URL?page=home
- WEB_APP_URL?page=absensi
- WEB_APP_URL?page=izin
- WEB_APP_URL?page=kasbon
- WEB_APP_URL?page=reportProblem
- WEB_APP_URL?page=rekapAbsensi

## Success Criteria

Deployment Session 1 is successful if:

- Web App URL opens.
- Home page renders.
- All routes open.
- Session endpoint responds.
- Master data endpoint responds.
- No blocking Apps Script compile error.

## If Compile Error Happens

1. Capture error message.
2. Identify file/function name.
3. Patch in GitHub.
4. Re-sync affected file.
5. Redeploy.
