# EXPOS v0.9 Release Candidate

Tanggal RC: 2026-07-04
Status: Release Candidate
Repository: exposv01/EXPOS

## Objective

Menetapkan EXPOS v0.9 sebagai Release Candidate untuk uji coba internal sebelum menuju production v1.0.

## Scope Included

### Backend Foundation

- Config
- Repository
- Helper
- Controller bridge
- Service layer Module 1
- Master Cabang
- Master Karyawan
- Master_User
- Role/session context

### UI Foundation

- Mobile-first 390px standard
- Home Dashboard
- Report Problem
- Absensi
- Kasbon
- Pengajuan Izin
- Rekap Absensi

### Google Workspace Integration

- Google Sheets as One Source of Truth
- Google Drive attachment storage layer
- Gmail notification layer
- Apps Script WebApp router
- Apps Script manifest

### Workflow Foundation

- Submit bridge
- Checked submit endpoints
- Approval workflow foundation
- Audit trail
- Error logging
- Dashboard live data layer
- Dynamic master data
- Performance helpers
- Security helpers

## Freeze Scope

EXPOS v0.9 RC freezes the following scope:

- Module 1 operational workflow only
- Mobile-first WebApp preview
- Google Workspace based architecture
- No payroll engine
- No inventory engine
- No franchise module
- No complex BI dashboard
- No AI analytics yet

## Known Limitations

1. Live preview URL must be created from Google Apps Script deployment.
2. Some UI files still need full visual polish after backend sync.
3. Approval workflow is foundation-level and still needs dedicated approval UI.
4. Drive upload endpoints are ready but module submit wiring is still staged.
5. Gmail notification layer is ready but automatic trigger wiring is staged.
6. Audit trail foundation is ready but not all workflows are wired yet.

## Release Candidate Goal

EXPOS v0.9 RC is considered successful if:

- WebApp deploys successfully.
- Home Dashboard opens.
- Module routes open.
- Submit workflows are testable.
- Google Sheets receives data.
- Session and Master_User can resolve active user.
- No direct UI-to-Sheet persistence exists.

## Bible EXPOS Compliance

- Google Sheets remains One Source of Truth.
- Google Apps Script remains application and automation layer.
- Google Drive stores attachments and documents.
- Gmail sends workflow notifications.
- GitHub remains source code source of truth.
- UI remains presentation layer.
- Workflow flows through Controller, Service, Repository, Helper.

## Next Release Target

After v0.9 RC testing, next target is EXPOS v1.0 Production Candidate.
