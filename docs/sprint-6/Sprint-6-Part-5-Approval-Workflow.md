# Sprint 6 Part 5 — Approval Workflow

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat approval workflow dasar untuk EXPOS, dimulai dari modul Izin dan Kasbon.

## Files Added

- gas/ApprovalService.gs
- gas/ApprovalController.gs
- gas/ApprovalNotificationService.gs
- docs/sprint-6/Sprint-6-Part-5-Approval-Workflow.md

## Implemented

1. Approval_Log sheet setup.
2. Approval request creation.
3. Approval decision flow.
4. Status Pending / Approved / Rejected.
5. Role-based approver validation.
6. Branch access validation.
7. Approval list and pending list endpoints.
8. Approval notification helper.

## Approval Sheet

Sheet name:

- Approval_Log

Headers:

- Approval ID
- Timestamp
- Module
- Reference ID
- Cabang
- Requested By
- Status
- Approved By
- Approved At
- Decision Note

## Status

- Pending
- Approved
- Rejected

## Approver Roles

- Owner
- Admin
- Manager

## Public Controller Endpoints

- initializeApprovalWorkflow
- createIzinApprovalRequest
- createKasbonApprovalRequest
- approveApproval
- rejectApproval
- getPendingApprovals
- getApprovalList
- getApprovalStatusOptions

## Notification Helpers

- notifyApprovalCreated
- notifyApprovalDecided

## Bible Compliance

- UI does not approve directly without Controller.
- Controller calls ApprovalService.
- ApprovalService writes through Repository/Helper pattern.
- Role source is Master_User.
- Branch access source is Master_User.
- Google Sheets remains One Source of Truth.
- GitHub remains source code source of truth.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 5.

### Decision

Build generic ApprovalService first, then expose Izin/Kasbon specific controller helpers. This keeps approval workflow reusable for future modules.

### Implementation

Added approval service, controller, notification helper, and documentation.

### Review

- Approval sheet setup: OK
- Pending status: OK
- Approve decision: OK
- Reject decision: OK
- Role validation: OK
- Branch access validation: OK
- Notification helper: OK
- UI remains presentation layer: OK

## Test Notes

Manual test in Apps Script:

1. Run initializeApprovalWorkflow.
2. Ensure Master_User has active Owner/Admin/Manager.
3. Create approval request for Izin.
4. Check Approval_Log row is created as Pending.
5. Login/deploy as approver role.
6. Run approveApproval with approvalId and cabang.
7. Confirm status changes to Approved.
8. Create another approval request.
9. Run rejectApproval.
10. Confirm status changes to Rejected.

## Remaining Sprint 6 Work

1. Wire Kasbon submit to create approval automatically.
2. Wire Izin submit to create approval automatically.
3. Add UI approval page for Admin/Manager/Owner.
4. Send notification automatically after approval create/decision.
5. Add status columns to Kasbon/Izin master sheets if required.

## Result

Sprint 6 Part 5 complete. EXPOS now has a reusable approval workflow foundation for Izin and Kasbon.
