# EXPOS Production Hardening Checklist

Tanggal: 2026-07-04
Status: Production readiness checklist

## Objective

Checklist final untuk memastikan EXPOS cukup stabil sebelum production candidate.

## Security

- [ ] Google Session resolves current user
- [ ] Master_User validates role
- [ ] Branch access validation active
- [ ] Crew cannot access other branches
- [ ] Crew cannot approve
- [ ] Admin/Owner diagnostics restricted
- [ ] Submit rate limit enabled

## Performance

- [ ] Master data cache active
- [ ] Dashboard cache active
- [ ] Heavy repeated reads minimized
- [ ] Write workflows use lock where needed
- [ ] Apps Script execution time acceptable

## Logging

- [ ] Audit_Log initialized
- [ ] Error_Log initialized
- [ ] Critical actions logged
- [ ] Error logs readable by admin/owner

## Data Integrity

- [ ] Required sheets exist
- [ ] Headers correct
- [ ] IDs generated consistently
- [ ] Writes use Service/Repository path
- [ ] No direct UI-to-Sheet write

## Workflow

- [ ] Absensi workflow works
- [ ] Izin workflow works
- [ ] Kasbon workflow works
- [ ] Report Problem workflow works
- [ ] Approval workflow works
- [ ] Notification workflow works

## UI

- [ ] Mobile 390px usable
- [ ] Loading states present
- [ ] Error states present
- [ ] Empty states present
- [ ] Toast messages clear

## Deployment

- [ ] appsscript.json synced
- [ ] Script properties set
- [ ] Web App deployed
- [ ] Preview URL recorded
- [ ] Rollback version available

## Production Go Rule

Go only if:

- No critical bug open
- Security validation passes
- Submit workflow passes
- Data writes correctly
- Owner approves release
