# EXPOS DEVELOPMENT BIBLE v1.0

Tanggal: 2026-07-04
Status: Dokumen acuan resmi proyek EXPOS v0.1

## 1. PERAN UTAMA

- Pak Sam: Product Owner / Vision Holder.
- Brain: Digital COO / System Architect. Tugas Brain adalah menjaga konsistensi workflow, arsitektur, database, UI/UX, DoR, DoD, dan delivery.
- Codex: dibatalkan / tidak dipakai untuk sementara karena memperlambat eksekusi.
- Google Workspace: platform operasional utama EXPOS.

## 2. TUJUAN EXPOS

EXPOS adalah sistem operasional internal EXP Gaming, bukan sekadar spreadsheet, HRIS, ERP, atau dashboard. Tujuan v0.1 adalah membuat Modul 1 berjalan stabil dan bisa dipakai operasional harian.

## 3. PRINSIP INTI

- One Source of Truth: Google Sheets adalah database utama operasional.
- Google Apps Script adalah business logic dan automation layer.
- Google Drive dipakai untuk penyimpanan dokumen/foto.
- Gmail dan WhatsApp dipakai untuk notifikasi sesuai modul.
- Input Once: data diinput sekali lalu dipakai ulang oleh rekap, payroll, dashboard, dan laporan.
- Minimum Input, Maximum Information.
- Zero Training: karyawan baru harus bisa memakai EXPOS tanpa pelatihan panjang.
- Operational First: fitur dibuat hanya jika membantu operasional.
- Workflow Before Coding: workflow final dulu, baru coding.
- Jangan membuat fitur baru di luar scope sprint aktif.

## 4. ATURAN KERJA BRAIN

- Brain wajib membaca Bible sebelum memberi instruksi teknis.
- Brain tidak boleh membuat ide baru jika requirement sudah final.
- Brain tidak boleh mengubah workflow yang sudah disepakati tanpa instruksi Product Owner.
- Brain tidak boleh membuat database/struktur baru jika sudah ada struktur resmi.
- Brain tidak boleh patch tempelan jika sudah disepakati full-file replacement.
- Brain wajib menjaga delivery: implementasi, review, selesai, lanjut.
- Jika Pak Sam bilang “Coding” atau “Delivery mode”, Brain harus berhenti brainstorming dan langsung eksekusi.

## 5. PLATFORM DAN SOURCE OF TRUTH

- Google Sheets: database operasional.
- Google Drive: dokumen, foto, arsip.
- Google Apps Script: business logic, validasi, repository/helper, controller/service.
- GitHub: version control source code, bukan sumber operasional.
- Apps Script editor: tempat deploy/runtime.

## 6. STRUKTUR ARSITEKTUR APPS SCRIPT

Layer yang disepakati:

- Config: konfigurasi aplikasi.
- Helper: fungsi utilitas umum.
- Repository: akses Google Sheets / Drive.
- Service: business logic.
- Controller: entry point dari UI.
- UI: presentation layer.

Prinsip:

- UI hanya presentation layer.
- Workflow lewat service.
- Akses Sheet lewat repository/helper.
- Jangan hardcode data penting jika bisa dibaca dari Config.

## 7. MASTER DATA v0.1

### 7.1 Master Cabang

Kode cabang aktif:

- CBN = EXP Gaming Cibinong
- ARH = EXP Gaming Ar Hakim
- SLW = EXP Gaming Siliwangi

Aturan:

- Semua dropdown cabang mengambil dari Master Cabang.
- Kode cabang dipakai untuk penomoran dokumen.

### 7.2 Master Karyawan

Minimal field yang sudah disepakati:

- ID Karyawan
- Nama Karyawan
- Cabang
- Jabatan
- Status

Status:

- Aktif
- Nonaktif

Aturan:

- Dropdown nama karyawan mengambil dari Master Karyawan.
- Nama difilter berdasarkan cabang.
- Karyawan Nonaktif tidak muncul di dropdown operasional.

## 8. MODUL 1 v0.1

Scope Modul 1:

- Master Cabang
- Master Karyawan
- Absensi
- Izin / Tidak Masuk
- Kasbon
- Report Problem

Tidak termasuk Modul 1:

- Login
- Approval
- Payroll
- Dashboard kompleks
- Bell notification
- Inventory
- Asset
- Analytics
- Telegram
- Discord

## 9. WORKFLOW STANDAR MODUL

Pola semua modul:

Form → Validasi → Submit → Google Sheets → Rekap EXPOS → Notifikasi jika diperlukan.

Setiap submit harus langsung masuk rekap EXPOS karena Absensi, Izin, dan Kasbon akan bermuara ke Payroll.

## 10. ABSENSI v0.1

Tujuan:

- Mencatat kehadiran karyawan.
- Menjadi dasar rekap absensi dan payroll.

Workflow:

- Pilih Cabang.
- Pilih Nama Karyawan dari Master Karyawan berdasarkan cabang.
- Pilih Jenis Absensi.
- Submit.
- Simpan ke Google Sheets.
- Muncul di Rekap Absensi.

Tidak ada approval.
Tidak ada login.
Tidak ada dashboard lanjutan di v0.1.

## 11. IZIN / TIDAK MASUK v0.1

Tujuan:

- Mencatat karyawan tidak masuk.
- Menjadi dasar rekap izin dan payroll.
- Memberi info ke owner via WhatsApp.

Workflow:

- Pilih Cabang.
- Pilih Nama Karyawan.
- Isi Tanggal Mulai.
- Isi Tanggal Selesai.
- Sistem otomatis hitung jumlah hari.
- Submit.
- Simpan ke Google Sheets.
- Muncul di Rekap Izin.
- Kirim WhatsApp ke Owner.

Keputusan final:

- Tidak perlu alasan.
- Tidak perlu approval.
- Tidak perlu lampiran.
- Cukup tanggal mulai sampai tanggal selesai.

## 12. KASBON v0.1

Tujuan:

- Mencatat kasbon karyawan.
- Menjadi dasar potongan payroll.
- Memberi info ke owner via WhatsApp.

Workflow:

- Pilih Cabang.
- Pilih Nama Karyawan.
- Isi Nominal.
- Isi Keterangan.
- Submit.
- Simpan ke Google Sheets.
- Muncul di Rekap Kasbon.
- Kirim WhatsApp ke Owner.

Keputusan final:

- Fokus v0.1 adalah submit berhasil, terekap di EXPOS, dan WA terkirim ke owner.
- Approval, cicilan, pelunasan, dan payroll dibahas nanti.

## 13. REPORT PROBLEM v0.1

Tujuan:

- Mendokumentasikan masalah operasional dengan foto yang jelas.
- Memberi informasi ke owner via email.

Form final:

- Tanggal / Timestamp otomatis.
- Cabang dari Master Cabang.
- Nama Pelapor dari Master Karyawan, difilter berdasarkan cabang.
- Judul Problem.
- Deskripsi Problem.
- Upload Foto wajib.

Keputusan final:

- Tidak ada kategori problem.
- Tidak ada priority problem.
- Tidak ada approval.
- Tidak ada assignment PIC.
- Status hanya Open dan Done.
- v0.1 hanya fokus sampai submit berhasil, foto tersimpan, rekap masuk, email terkirim ke owner.
- Workflow Done dibahas di modul berikutnya.

Kamera:

- Foto wajib menunjukkan masalah.
- Overlay kamera wajib: “Fokuskan foto masalahnya didalam kotak ini”.
- Ada preview foto.
- Ada tombol ambil ulang dan gunakan foto.

Foto:

- Disimpan ke Google Drive.
- Google Sheets hanya menyimpan link foto dan nama file.

## 14. FORMAT PENOMORAN

Report Problem:

RP [Kode Cabang]-YYMMDD-[Nomor Urut]

Contoh:

- RP CBN-260703-001
- RP ARH-260703-001
- RP SLW-260703-001

Aturan:

- Prefix sesuai modul.
- Kode cabang dari Master Cabang.
- Tanggal YYMMDD.
- Nomor urut 3 digit.
- Nomor urut reset per hari per cabang.

Format serupa dapat dipakai untuk modul lain:

- AB = Absensi
- IZ = Izin
- KB = Kasbon
- RP = Report Problem

## 15. NOTIFIKASI

Modul 1:

- Izin: WhatsApp ke owner.
- Kasbon: WhatsApp ke owner.
- Report Problem: Email ke owner.
- Absensi: tidak perlu notifikasi.

Prinsip:

- Data harus tersimpan dulu sebelum notifikasi dikirim.
- Jika WA/email gagal, data tetap tersimpan.
- Error notifikasi dicatat di Log.
- Automation never blocks operations.

Tidak menggunakan:

- Telegram
- Discord

## 16. REKAP EXPOS

Setiap modul wajib punya rekap yang bisa dilihat kembali di EXPOS.

- Rekap Absensi
- Rekap Izin
- Rekap Kasbon
- Rekap Report Problem

Absensi, Izin, dan Kasbon adalah fondasi Payroll.
Report Problem adalah data operasional, bukan payroll.

## 17. DASHBOARD OWNER

Dashboard Owner tidak dibahas sekarang.
Ditunda sampai Modul 1 release dan modul sumber data cukup matang.

Nantinya dashboard dapat menampilkan:

- Berapa izin.
- Berapa problem open.
- Berapa kasbon.
- Absensi.
- Stok opname / item hampir habis setelah modul inventory ada.

## 18. BELL NOTIFICATION

Roadmap berikutnya, bukan v0.1.
Lokasi: pojok kanan atas halaman utama.
Awal trigger:

- Izin baru.
- Report Problem baru.

## 19. DATABASE STANDARD

Google Sheets adalah database, bukan tempat logika bisnis.

Aturan:

- Jangan membuat sheet acak.
- Jangan mengubah urutan kolom tanpa analisis dampak.
- Jika perlu tambah kolom, tambah di belakang.
- Raw data adalah catatan historis.
- Jangan menghapus data transaksi sembarangan.
- Jangan mengubah primary key/timestamp historis.

Sheet utama Modul 1:

- Master Cabang
- Master Karyawan
- Absensi
- Izin
- Kasbon
- Report Problem
- Log

## 20. UI/UX STANDARD

- Bahasa Indonesia.
- Mobile-first.
- Minimum input.
- Validasi sederhana dan jelas.
- Pesan error tidak teknis.
- Success message singkat.
- Jangan membuat user berpikir terlalu lama.

Contoh pesan:

- “Foto wajib diunggah.”
- “Data berhasil disimpan.”
- “Tanggal selesai tidak boleh sebelum tanggal mulai.”

## 21. DOR / DEFINITION OF READY

Sebuah task siap dikerjakan jika:

- Workflow sudah disepakati.
- Scope jelas.
- Input dan output jelas.
- Database/sheet yang terlibat jelas.
- Notifikasi jika ada sudah jelas.
- Tidak ada dependency yang belum selesai.

## 22. DOD / DEFINITION OF DONE

Sebuah task selesai jika:

- Data berhasil tersimpan ke Google Sheets.
- Rekap EXPOS muncul / bisa dibaca.
- Validasi berjalan.
- ID otomatis sesuai format.
- Notifikasi berjalan jika modul membutuhkan.
- Error handling aman.
- Tidak keluar scope.
- Tidak melanggar Bible.

## 23. DEVELOPMENT WORKFLOW

Alur kerja resmi:

Requirement final → Specification → Coding → Review → Test → Commit/Save → Done → Lanjut.

Untuk saat ini Codex dihentikan.
Workflow praktis:

Pak Sam → Brain → Apps Script / GitHub → Test → Done.

## 24. KEPUTUSAN PENTING

- Codex dihentikan sementara karena memperlambat eksekusi.
- Fokus utama adalah menyelesaikan Modul 1, bukan membuat framework baru.
- Brain tidak boleh membuat BrainOS, Constitution, Engineering Standard tambahan sebelum Modul 1 release.
- Semua ide lanjutan masuk parking lot setelah Modul 1 selesai.

## 25. PARKING LOT / DITUNDA

- Dashboard Owner
- Bell Notification
- Inventory / Stok Opname
- Asset Management
- Payroll Engine
- Approval workflow
- Done workflow Report Problem
- Login / user authentication
- AI query dashboard
- BrainOS / Constitution / Engineering Standard formal

## 26. STATUS TERAKHIR YANG BENAR

- Development Bible: sekarang disimpan sebagai dokumen ini.
- Master Cabang: selesai secara konsep dan implementasi awal.
- Modul berikutnya: Master Karyawan, lalu Absensi, Izin, Kasbon, Report Problem.
- Fokus: Modul 1 release, bukan diskusi tambahan.

## 27. ATURAN PENUTUP

Jika ada konflik antara ide baru dan Bible ini, Bible yang menjadi acuan sampai Product Owner memutuskan revisi.
Jika Brain tidak yakin, Brain harus mengecek Bible dulu, bukan membuat asumsi.
Jika Pak Sam meminta “lanjut”, Brain harus melanjutkan task aktif, bukan membuka topik baru.
