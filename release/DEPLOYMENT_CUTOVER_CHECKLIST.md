# EXPOS v0.9 RC Deployment Cutover Checklist

## Before Deployment

- [ ] GitHub source reviewed
- [ ] Apps Script project prepared
- [ ] appsscript.json synced
- [ ] All gas files synced
- [ ] Active S5 UI files synced
- [ ] Script Property EXPOS_SPREADSHEET_ID set if required
- [ ] Google Sheet database available
- [ ] Google Drive access available
- [ ] Gmail authorization available

## Deployment

- [ ] Deploy as Web App
- [ ] Execute as: Me / User deploying
- [ ] Access: Workspace/domain users
- [ ] Copy Web App URL
- [ ] Open page=home

## Initial Setup

- [ ] initializeMasterCabang
- [ ] initializeMasterKaryawan
- [ ] initializeMasterUser
- [ ] initializeAbsensi
- [ ] initializeIzin
- [ ] initializeKasbon
- [ ] initializeReportProblem
- [ ] initializeExposDriveStorage
- [ ] initializeApprovalWorkflow
- [ ] initializeAuditTrail

## Smoke Test

- [ ] Home Dashboard opens
- [ ] Report Problem opens
- [ ] Absensi opens
- [ ] Kasbon opens
- [ ] Izin opens
- [ ] Rekap Absensi opens

## Functional Test

- [ ] Session resolves
- [ ] Master data loads
- [ ] Absensi submit works
- [ ] Kasbon submit works
- [ ] Izin submit works
- [ ] Report Problem submit works
- [ ] Rekap Absensi loads
- [ ] Drive folder setup works
- [ ] Gmail notification works
- [ ] Approval workflow works
- [ ] Audit log works
- [ ] Dashboard live works

## Go / No-Go

Go if:

- No blocking error
- Data writes to correct Sheets
- Session and role validation works
- Mobile UI is usable
- No direct UI-to-Sheet write found

No-Go if:

- WebApp cannot open
- Session cannot resolve
- Submit writes fail for all modules
- Master_User access validation blocks valid users
- Google Sheet ID is missing or invalid

## Post-Deployment

- [ ] Save Web App URL
- [ ] Record deployment version
- [ ] Record known bugs
- [ ] Prepare v1.0 backlog
