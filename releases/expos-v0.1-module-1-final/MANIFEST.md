# EXPOS v0.1 - Modul 1 Final Backup Manifest

Status: Final & Tested backup preparation
Date: 2026-07-06
Repository: exposv01/EXPOS

## Backup Policy

Only final & tested files are allowed in this release folder. Trial, sandbox, and draft files are excluded.

## Source of Truth

Google Workspace remains the operational Source of Truth. GitHub is used as official source-code backup / release baseline.

## Files identified for Modul 1 final backup

### Apps Script `.gs`

1. `01 Code.gs`
2. `02 MasterDataService.gs`
3. `03 AbsensiService.gs`
4. `04 IzinService.gs`
5. `05 KasbonService.gs`
6. `06 PusatProblemService.gs`
7. `07 RekapAbsensiService.gs`

### HTML

8. `08 Index.html`
9. `09 Absensi.html`
10. `10 Izin.html`
11. `11 Kasbon.html`
12. `12 Problem.html`
13. `13 RekapAbsensi.html`

### Required runtime dependency

14. `14 Rekap.html`

Reason: current `08 Index.html` includes `<?!= include('Rekap'); ?>`, and `13 RekapAbsensi.html` depends on `openRekapLandscapeViewer()` from `Rekap.html`.

## Excluded files

- `AbsensiTrial.html`
- `AbsensiTrialService.gs`
- `ProblemTrial.html`
- `PusatProblemServiceTrial.gs`
- Any sandbox / draft / experiment files

## Source documents staged from Google Workspace

- `01 Code.gs`
- `02 MasterDataService - EXPOS v0.1`
- `03 AbsensiService.gs`
- `04 IzinService - EXPOS v0.1`
- `05 KasbonService - EXPOS v0.1`
- `06 PusatProblemService - EXPOS v0.1`
- `07 RekapAbsensiService - EXPOS v0.1`
- `08 Index.html - EXPOS v0.1`
- `09 Absensi.html - EXPOS v0.1`
- `10 Izin.html - EXPOS v0.1`
- `11 Kasbon.html - EXPOS v0.1`
- `12 Problem.html - EXPOS v0.1`
- `13 RekapAbsensi.html - EXPOS v0.1`
- `Rekap.html - EXPOS v0.1`

## Restore note

When restoring to Google Apps Script, Apps Script file display names should be created without the extension for HTML files, according to Apps Script convention:

- `Index`
- `Absensi`
- `Izin`
- `Kasbon`
- `Problem`
- `RekapAbsensi`
- `Rekap`

`.gs` files should use their Apps Script code file names.
