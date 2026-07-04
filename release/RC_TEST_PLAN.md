# EXPOS v0.9 RC Test Plan

## Test Environment

- Google Apps Script project EXPOS
- Google Sheet EXPOS operational database
- Google Drive EXPOS root folder
- Google Workspace user accounts
- Mobile viewport 390px

## Pre-Test Setup

Run setup functions:

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

## Route Smoke Test

Test WebApp routes:

- page=home
- page=reportProblem
- page=absensi
- page=kasbon
- page=izin
- page=rekapAbsensi

Expected:

- Page opens
- Mobile layout is readable
- Back navigation works
- No blocking error

## Session Test

- getCurrentUserContext
- getExposUiBootstrap
- getAllowedBranchesForCurrentUser

Expected:

- User email resolved from Google Session
- Role resolved from Master_User
- Cabang access resolved from Master_User

## Master Data Test

- getMasterDataBootstrap
- getCabangOptionsForUi
- getKaryawanOptionsForUi
- getShiftOptionsForUi

Expected:

- Cabang options available
- Karyawan options available
- Branch filter works
- Cache refresh works

## Submit Test

Test with valid Master_Karyawan data:

- submitAttendanceChecked
- submitKasbonChecked
- submitIzinChecked
- submitReportProblemChecked

Expected:

- Response success true or clear validation error
- Data writes through Service/Repository
- No direct UI-to-Sheet write

## Drive Test

- initializeExposDriveStorage
- uploadReportProblemAttachment with test payload

Expected:

- EXPOS folder exists
- Module folders exist
- Branch folders exist
- Attachment metadata returned

## Gmail Test

- notifyReportProblemCreated
- notifyKasbonSubmitted
- notifyIzinSubmitted

Expected:

- Recipients resolved from Master_User
- Email sent
- HTML email readable

## Approval Test

- createIzinApprovalRequest
- createKasbonApprovalRequest
- getPendingApprovals
- approveApproval
- rejectApproval

Expected:

- Approval_Log row created
- Status starts Pending
- Status changes to Approved or Rejected
- Approver role validation works

## Audit Test

- initializeAuditTrail
- logExposActivity
- logExposError
- getRecentAuditLogs
- getRecentErrorLogs

Expected:

- Audit_Log row created
- Error_Log row created
- Recent logs readable

## Dashboard Test

- getTodayLiveDashboard
- getLiveDashboard
- refreshLiveDashboard

Expected:

- Summary returned
- Branch filter works
- Cache refresh works

## Definition of Done

EXPOS v0.9 RC passes if:

- All routes open
- Session resolves
- Master data resolves
- Submit workflow can be tested
- Drive storage initializes
- Gmail notification sends
- Approval workflow works
- Audit logs work
- Dashboard live returns data
