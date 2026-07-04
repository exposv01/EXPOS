# Sprint 7 Part 3 — Apps Script Deployment Plan

Tanggal: 2026-07-04
Status: Ready for Apps Script deployment

## Objective

Menetapkan rencana deployment Apps Script untuk EXPOS production readiness.

## Deployment Target

- Platform: Google Apps Script Web App
- Runtime: V8
- Timezone: Asia/Jakarta
- Source of Truth: GitHub
- Runtime Source: Apps Script Project
- Database: Google Sheets
- Storage: Google Drive
- Notification: Gmail

## Required Deployment Steps

1. Sync latest GitHub source to Apps Script.
2. Ensure appsscript.json is active.
3. Set Script Property EXPOS_SPREADSHEET_ID.
4. Run all setup functions.
5. Deploy new Web App version.
6. Save Preview URL.
7. Run RC test plan.
8. Promote to production URL after Go decision.

## Required Setup Functions

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

## Deployment Version Naming

Recommended deployment description:

EXPOS v0.9 RC - Sprint 7 Production Readiness

## URL Policy

- Preview URL is used for testing.
- Production URL is only shared after Go decision.
- URL must be recorded in release notes after manual deployment.

## Access Policy

Recommended:

- Execute as: Me / deploying user
- Access: Workspace/domain users

## Rollback Plan

If deployment fails:

1. Revert to previous Apps Script deployment.
2. Keep current Google Sheet data unchanged.
3. Review latest GitHub commit.
4. Patch issue in GitHub.
5. Redeploy new version.

## Known Limitation

ChatGPT connector cannot directly deploy Google Apps Script Web App. Deployment must be performed inside Google Apps Script project.
