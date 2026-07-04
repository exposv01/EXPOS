# EXPOS Preview Test Checklist

## General

- [ ] Web App URL bisa dibuka.
- [ ] Route Home tampil.
- [ ] Layout mobile 390px aman.
- [ ] Tidak ada horizontal scroll.
- [ ] Tombol menu bisa pindah halaman.
- [ ] Tombol back kembali ke Home.

## Routes

- [ ] Home Dashboard
- [ ] Report Problem
- [ ] Absensi
- [ ] Kasbon
- [ ] Izin
- [ ] Rekap Absensi

## Home Dashboard

- [ ] Jam WIB tampil.
- [ ] Greeting tampil.
- [ ] Menu Modul 1 tampil.
- [ ] Ringkasan bisa dimuat.

## Report Problem

- [ ] Form tampil.
- [ ] Validasi field wajib berjalan.
- [ ] Submit memanggil Controller Bridge.
- [ ] Data masuk ke Sheet melalui Service.

## Absensi

- [ ] Form tampil.
- [ ] Check In bisa dipilih.
- [ ] Check Out bisa dipilih.
- [ ] Validasi cabang, shift, dan nama berjalan.
- [ ] Submit memanggil Controller Bridge.
- [ ] Data masuk ke Sheet melalui Service.

## Kasbon

- [ ] Form tampil.
- [ ] Preview nominal rupiah berjalan.
- [ ] Validasi field wajib berjalan.
- [ ] Submit memanggil Controller Bridge.
- [ ] Data masuk ke Sheet melalui Service.

## Izin

- [ ] Form tampil.
- [ ] Tanggal mulai dan selesai tampil.
- [ ] Validasi field wajib berjalan.
- [ ] Submit memanggil Controller Bridge.
- [ ] Data masuk ke Sheet melalui Service.

## Rekap Absensi

- [ ] Filter cabang tampil.
- [ ] Filter periode tampil.
- [ ] Tombol tampilkan rekap berjalan.
- [ ] Empty state aman jika data kosong.
- [ ] Data tampil jika ada record.

## Definition of Done Preview

Preview dianggap valid jika:

- Semua route bisa dibuka.
- Semua tombol navigasi berjalan.
- Tidak ada error blocking di console/user UI.
- Submit dasar berhasil untuk minimal satu data testing per modul.
- Google Sheets menerima data melalui Service/Repository.
