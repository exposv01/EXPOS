# Sprint 6 Part 4 — Dashboard Live

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat lightweight live dashboard layer untuk EXPOS agar UI dapat membaca ringkasan operasional secara read-only dan refresh cepat.

## Files Added

- gas/DashboardLiveService.gs
- gas/DashboardController.gs
- docs/sprint-6/Sprint-6-Part-4-Dashboard-Live.md

## Implemented

1. Live dashboard service.
2. Dashboard controller endpoints.
3. Summary metrics.
4. Branch-level metrics.
5. Latest activity preview.
6. Script cache for dashboard data.
7. Cache refresh endpoint.

## Public Controller Endpoints

- getLiveDashboard(filter)
- getTodayLiveDashboard()
- refreshLiveDashboard(filter)

## Dashboard Filter

- branch: ALL, CBN, ARH, SLW
- date: yyyy-MM-dd

If date is empty, service uses today's date in Asia/Jakarta.

## Summary Metrics

- hadir
- pulang
- izin
- kasbon
- problemOpen

## Branch Metrics

Each branch returns:

- hadir
- pulang
- izin
- kasbon
- problemOpen

## Latest Activity

Latest activity includes up to 5 records per module:

- absensi
- izin
- kasbon
- problem

## Cache

Cache service: Script Cache

TTL: 60 seconds

Purpose:

- Reduce repeated Google Sheets reads.
- Keep dashboard responsive.
- Avoid complex real-time infra.

## Bible Compliance

- Dashboard is read-only.
- UI does not read Sheet directly.
- Service reads through existing record functions.
- No payroll calculation.
- No complex analytics in this part.
- Google Sheets remains One Source of Truth.
- GitHub remains source code source of truth.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 4 after Master Data Dynamic.

### Decision

Build lightweight dashboard service and controller first, without adding complex analytics or UI redesign, so Home Dashboard can later consume live data safely.

### Implementation

Added DashboardLiveService, DashboardController, and documentation.

### Review

- Live summary endpoint: OK
- Branch summary: OK
- Latest activity preview: OK
- Cache layer: OK
- Read-only design: OK
- No direct UI-to-Sheet access: OK
- No payroll/analytics scope creep: OK

## Test Notes

Manual test in Apps Script:

1. Ensure setup functions have been run.
2. Submit sample absensi, izin, kasbon, and report problem data.
3. Run getTodayLiveDashboard.
4. Confirm summary metrics are returned.
5. Run getLiveDashboard with branch CBN.
6. Confirm branch filter works.
7. Run refreshLiveDashboard.
8. Confirm cache can be cleared and rebuilt.

## Remaining Sprint 6 Work

1. Wire Home Dashboard UI to getLiveDashboard.
2. Add problem status model for true open/closed count.
3. Add optional auto-refresh in UI.
4. Keep analytics/dashboard advanced features for later sprint.

## Result

Sprint 6 Part 4 complete. EXPOS now has a lightweight live dashboard data layer.
