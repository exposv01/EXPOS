# Sprint 5 Part 4 — Sync and Preview Deployment Package

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Menyiapkan paket sync dan deployment preview EXPOS dari GitHub ke Google Apps Script.

## Important Note

Connector yang tersedia saat ini belum menyediakan action untuk membuat atau deploy Google Apps Script Web App secara langsung. Karena itu Sprint 5 Part 4 menghasilkan package deployment, sync guide, dan checklist test agar proses deployment bisa dilakukan di Google Apps Script project.

## Files Added

- deploy/README.md
- deploy/SYNC_TO_APPS_SCRIPT.md
- deploy/PREVIEW_TEST_CHECKLIST.md
- docs/sprint-5/Sprint-5-Part-4.md

## Output

Sprint 5 Part 4 menghasilkan:

1. Deployment package folder.
2. Apps Script sync guide.
3. Preview smoke test checklist.
4. Delivery notes.

## Deployment Flow

1. Sync source dari GitHub ke Google Apps Script.
2. Set Script Property jika diperlukan.
3. Run setup functions.
4. Deploy as Web App.
5. Test route preview.
6. Catat Web App URL sebagai Preview EXPOS v0.1.

## Preview Routes

- page=home
- page=reportProblem
- page=absensi
- page=kasbon
- page=izin
- page=rekapAbsensi

## Delivery Visibility Rule

### Requirement

Execute Sprint 5 Part 4 after Sprint 5 Part 3.

### Decision

Karena deployment langsung ke Apps Script tidak tersedia dari connector, Part 4 difokuskan pada deployment readiness dan sync package.

### Implementation

Menambahkan folder deploy dan checklist preview testing.

### Review

- Deployment package added: OK
- Sync guide added: OK
- Preview checklist added: OK
- Live URL not fabricated: OK
- GitHub remains source of truth: OK
- Apps Script remains target runtime: OK

## Result

Sprint 5 Part 4 selesai. EXPOS siap untuk proses manual sync/deploy di Google Apps Script dan validasi preview URL.
