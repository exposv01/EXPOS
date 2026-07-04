# Master_User Session Contract

Status: Sprint 5 Part 5
Tanggal: 2026-07-04

## Objective

Menetapkan kontrak identitas user EXPOS.

EXPOS tidak menggunakan login manual. Identitas user berasal dari Google Session, sedangkan role dan branch access berasal dari sheet Master_User.

## Source of Truth

- Identity: Google Session email
- Role: Master_User
- Branch access: Master_User
- Employee relation: ID Karyawan di Master_User

## Sheet Name

`Master_User`

## Required Headers

- Email
- Nama User
- Role
- Cabang
- ID Karyawan
- Status

## Status Active

`Aktif`

## Role Examples

- Owner
- Admin
- Manager
- Crew

## Branch Access

Cabang dapat berisi:

- `ALL` untuk akses semua cabang
- `CBN`
- `ARH`
- `SLW`

## Public Functions

### initializeMasterUser

Menyiapkan sheet Master_User dan default rows jika kosong.

### getCurrentUserContext

Mengembalikan context user aktif untuk UI.

Expected fields:

- email
- namaUser
- role
- cabang
- idKaryawan
- canAccessAllBranches

### getCurrentUserAccessSummary

Mengembalikan ringkasan akses user aktif.

### canCurrentUserAccessBranch

Memvalidasi apakah user aktif boleh mengakses cabang tertentu.

## Service Functions

### getCurrentUserEmail

Membaca email dari Google Session.

### getCurrentExposUser

Mencari email Google Session ke Master_User.

### findActiveMasterUserByEmail

Mencari user aktif berdasarkan email.

### assertCurrentUserCanAccessBranch

Memvalidasi akses cabang.

## Bible Compliance

- UI tidak menjadi sumber identitas.
- Google Session menjadi sumber email user.
- Master_User menjadi sumber role dan branch.
- Service membaca data melalui Repository/Helper.
- Tidak ada database baru.
- Tidak ada login manual.

## Next Hardening

- Auto-fill nama dan cabang di UI dari getCurrentUserContext.
- Lock cabang di UI untuk user non-ALL.
- Apply branch access validation pada setiap submit endpoint.
- Replace temporary employeeName input dengan session-based ID Karyawan.
