# Sprint 7 Part 4 — Real User Test Matrix

Tanggal: 2026-07-04
Status: Ready for real user testing

## Objective

Menyiapkan matrix pengujian nyata menggunakan akun Google Workspace untuk memastikan role, cabang, approval, dan workflow berjalan sesuai Bible EXPOS.

## Roles to Test

- Owner
- Admin
- Manager
- Crew

## Branches to Test

- CBN
- ARH
- SLW

## Test Accounts Required

Minimum:

1. Owner with cabang ALL
2. Admin with cabang ALL
3. Manager CBN
4. Crew CBN
5. Crew ARH or SLW

## Test Matrix

| Scenario | Owner | Admin | Manager | Crew |
|---|---:|---:|---:|---:|
| Open Home | Yes | Yes | Yes | Yes |
| View all branches | Yes | Yes | No | No |
| Submit Absensi | Yes | Yes | Yes | Yes |
| Submit Izin | Yes | Yes | Yes | Yes |
| Submit Kasbon | Yes | Yes | Yes | Yes |
| Report Problem | Yes | Yes | Yes | Yes |
| Approve Izin | Yes | Yes | Yes | No |
| Approve Kasbon | Yes | Yes | Yes | No |
| View Audit Log | Yes | Yes | Optional | No |
| Security Diagnostics | Yes | Yes | No | No |

## Session Tests

- getCurrentUserContext
- getExposUiBootstrap
- getProductionUiBootstrap

Expected:

- Email from Google Session
- Role from Master_User
- Cabang from Master_User
- Branch lock applied for non-ALL users

## Negative Tests

- Crew CBN attempts ARH action: must fail
- Crew tries approval: must fail
- Non-Master_User account opens app: must fail or show controlled error
- Empty payload submit: must fail with clear message

## Pass Criteria

Testing passes if:

- Role access is correct
- Branch access is correct
- Valid users can submit
- Invalid branch access is blocked
- Approval works for authorized roles only
- All errors are understandable
