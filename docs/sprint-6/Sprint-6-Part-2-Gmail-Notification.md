# Sprint 6 Part 2 — Gmail Notification

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat notification layer berbasis Gmail untuk EXPOS agar workflow penting dapat mengirim email otomatis melalui backend.

## Files Added

- gas/GmailNotificationService.gs
- gas/NotificationRecipientService.gs
- gas/NotificationController.gs
- docs/sprint-6/Sprint-6-Part-2-Gmail-Notification.md

## Implemented

1. Gmail notification service.
2. HTML email template.
3. Plain text fallback.
4. Recipient resolver dari Master_User.
5. Event-to-role rules.
6. Notification controller endpoints.

## Controller Endpoints

- notifyReportProblemCreated
- notifyKasbonSubmitted
- notifyIzinSubmitted
- notifyAbsensiSubmitted

## Recipient Rules

- REPORT_PROBLEM_CREATED: Owner, Admin, Manager
- KASBON_SUBMITTED: Owner, Admin
- IZIN_SUBMITTED: Owner, Admin, Manager
- ABSENSI_SUBMITTED: Admin, Manager

Recipient source:

- Master_User

Filter:

- Status Aktif
- Role sesuai event
- Cabang sama atau ALL

## Notification Contract

sendExposNotification accepts:

- to
- cc
- bcc
- subject
- title
- moduleKey
- branchCode
- summary
- fields
- actionUrl
- footer

## Bible Compliance

- UI does not send email.
- Gmail is only communication channel.
- Recipient source is Master_User.
- Controller/Service owns notification workflow.
- No new database added.
- GitHub remains source code source of truth.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 2 after Drive Integration.

### Decision

Build generic Gmail notification layer first, before wiring every module submit function, so all future workflows can reuse the same template and recipient resolver.

### Implementation

Added GmailNotificationService, NotificationRecipientService, NotificationController, and documentation.

### Review

- Gmail service: OK
- HTML template: OK
- Recipient resolver: OK
- Master_User based recipient: OK
- Controller endpoints: OK
- UI remains presentation layer: OK

## Test Notes

Manual test in Apps Script:

1. Ensure Master_User has active Owner/Admin/Manager emails.
2. Run setupMasterUser if needed.
3. Run notifyReportProblemCreated with test data.
4. Confirm email received.
5. Run notifyKasbonSubmitted with test data.
6. Confirm recipient filtering by role and cabang.

## Remaining Sprint 6 Work

1. Wire notification calls into module submit success flow.
2. Add notification log sheet if required.
3. Add user preference for notification on/off later.
4. Add approval workflow notifications in Sprint 6 Part 5.

## Result

Sprint 6 Part 2 complete. EXPOS now has reusable Gmail notification infrastructure.
