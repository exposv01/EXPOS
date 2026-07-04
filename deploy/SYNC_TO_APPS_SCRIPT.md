# Sync to Google Apps Script

## Purpose

Panduan ringkas untuk menyalin source EXPOS dari GitHub ke Google Apps Script project.

## Required Source

Sync file berikut:

1. `appsscript.json`
2. Semua file `.gs` di folder `gas`
3. Semua file HTML aktif di folder `gas/ui/s5`

## Apps Script Setup

1. Buka project Google Apps Script EXPOS.
2. Pastikan runtime V8.
3. Pastikan timezone Asia/Jakarta.
4. Masukkan manifest dari `appsscript.json`.
5. Copy semua file `.gs` dari folder `gas`.
6. Copy semua file HTML dari folder `gas/ui/s5`.

## File Naming Note

Jika editor Apps Script tidak cocok dengan nama file yang memakai slash folder, gunakan nama flat untuk HTML.

Contoh mapping:

- `gas/ui/s5/UI-007_HomeDashboard_S5` menjadi `UI_007_HomeDashboard_S5`
- `gas/ui/s5/UI-008_ReportProblemForm_S5` menjadi `UI_008_ReportProblemForm_S5`
- `gas/ui/s5/UI-009_AbsensiForm_S5` menjadi `UI_009_AbsensiForm_S5`
- `gas/ui/s5/UI-010_KasbonForm_S5` menjadi `UI_010_KasbonForm_S5`
- `gas/ui/s5/UI-011_PermissionForm_S5` menjadi `UI_011_PermissionForm_S5`
- `gas/ui/s5/UI-012_RekapAbsensi_S5` menjadi `UI_012_RekapAbsensi_S5`

Jika memakai nama flat, update route map di `WebApp.gs`.

## Script Property

Jika project tidak container-bound ke spreadsheet, set Script Property:

`EXPOS_SPREADSHEET_ID`

Isi dengan ID Google Sheet operasional EXPOS.

## Initial Setup Functions

Run manual satu kali:

- `initializeMasterCabang`
- `initializeMasterKaryawan`
- `initializeAbsensi`
- `initializeIzin`
- `initializeKasbon`
- `initializeReportProblem`

## Deploy Web App

1. Deploy > New deployment.
2. Type: Web app.
3. Execute as: Me.
4. Access: workspace/domain users sesuai kebutuhan.
5. Deploy.
6. Copy Web App URL.

## Preview Routes

Test route berikut setelah deploy:

- `page=home`
- `page=reportProblem`
- `page=absensi`
- `page=kasbon`
- `page=izin`
- `page=rekapAbsensi`

## Smoke Test

Gunakan data karyawan yang sudah ada di Master Karyawan.

Test:

- Absensi submit
- Kasbon submit
- Izin submit
- Report Problem submit
- Rekap Absensi load
- Home Dashboard summary

## Expected Result

EXPOS Preview v0.1 bisa dibuka sebagai Web App dan semua route dasar berjalan melalui Controller Bridge.
