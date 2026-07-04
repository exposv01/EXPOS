# EXPOS Preview Deployment Package

Status: Sprint 5 Part 4
Tanggal: 2026-07-04

Folder ini berisi panduan deployment preview EXPOS dari GitHub ke Google Apps Script.

## Tujuan

Membuat langkah sync/deploy yang jelas agar source code di GitHub bisa dijalankan sebagai Google Apps Script Web App.

## Source of Truth

- GitHub: source code
- Google Apps Script: runtime aplikasi
- Google Sheets: database operasional
- Google Drive: lampiran/foto/dokumen

## Preview Entry Point

Apps Script entry point:

- `doGet(e)` dari `gas/WebApp.gs`

Preview routes:

- `?page=home`
- `?page=reportProblem`
- `?page=absensi`
- `?page=kasbon`
- `?page=izin`
- `?page=rekapAbsensi`

## Required Files

Sync semua file berikut ke Google Apps Script project:

- `appsscript.json`
- `gas/*.gs`
- `gas/ui/s5/*.html`

UI Sprint 4 lama di `gas/ui/*.html` boleh tetap disimpan sebagai arsip desain, tetapi active preview routes sudah memakai `gas/ui/s5`.

## Deployment Result

Setelah deploy dari Google Apps Script, output yang diharapkan adalah Web App URL seperti:

`https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec`

Kemudian buka:

`https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec?page=home`

## Important

Connector yang tersedia di ChatGPT saat ini tidak memiliki action untuk membuat/deploy Google Apps Script Web App secara langsung. Karena itu Part 4 menyiapkan deployment package, checklist, dan source readiness di GitHub.

Live preview URL baru bisa dibuat dari Google Apps Script project/workspace.
