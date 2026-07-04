# Sprint 6 Part 1 — Google Drive Integration

Tanggal delivery: 2026-07-04
Status: Implemented in GitHub
Repository: exposv01/EXPOS

## Objective

Membuat Google Drive storage layer untuk EXPOS agar semua modul dapat menyimpan lampiran secara konsisten melalui service/controller, bukan langsung dari UI.

## Files Added

- gas/DriveService.gs
- gas/AttachmentHelper.gs
- gas/DriveController.gs
- docs/sprint-6/Sprint-6-Part-1-Drive-Integration.md

## Implemented

1. EXPOS root folder bootstrap.
2. Module folder bootstrap.
3. Branch folder bootstrap.
4. Central DriveService.
5. Standard attachment metadata contract.
6. Attachment file naming convention.
7. Upload endpoint per module.
8. Delete/trash attachment endpoint.

## Folder Structure

EXPOS

- Report Problem
  - CBN
  - ARH
  - SLW
- Kasbon
  - CBN
  - ARH
  - SLW
- Izin
  - CBN
  - ARH
  - SLW
- Asset

## Public Setup Function

Run once from Apps Script:

- initializeExposDriveStorage

## Controller Endpoints

- initializeExposDriveStorage
- uploadReportProblemAttachment
- uploadKasbonAttachment
- uploadIzinAttachment
- deleteAttachmentFromDrive

## Service Functions

- setupExposDriveFolders
- getOrCreateExposRootFolder
- getExposModuleFolder
- getExposBranchFolder
- uploadExposAttachment
- deleteExposAttachment

## Attachment Metadata Contract

Every upload returns:

- attachmentId
- attachmentName
- attachmentUrl
- mimeType
- size
- moduleKey
- branchCode
- uploadedBy
- uploadedAt

## Naming Convention

Examples:

- RP-CBN-20260704-153000.jpg
- KSB-ARH-20260704-153000.pdf
- IZN-SLW-20260704-153000.png

## Bible Compliance

- UI does not access Drive directly.
- Controller receives request.
- DriveService handles storage.
- Google Drive stores file binary.
- Google Sheets stores only metadata and URL.
- GitHub remains source code source of truth.
- No new database added.

## Delivery Visibility Rule

### Requirement

Execute Sprint 6 Part 1.

### Decision

Create a reusable Google Drive storage layer first before wiring individual modules, so future modules can reuse the same attachment contract.

### Implementation

Added DriveService, AttachmentHelper, DriveController, and documentation.

### Review

- Drive root bootstrap: OK
- Module folder bootstrap: OK
- Branch folder bootstrap: OK
- Attachment metadata contract: OK
- Upload endpoint: OK
- Delete endpoint: OK
- UI remains presentation layer: OK

## Test Notes

Manual test in Apps Script:

1. Run initializeExposDriveStorage.
2. Confirm EXPOS folder is created in Google Drive.
3. Confirm module folders are created.
4. Confirm branch folders are created for Report Problem, Kasbon, and Izin.
5. Test upload endpoint with base64Data or blob from Apps Script.
6. Confirm returned metadata includes URL and file ID.

## Remaining Sprint 6 Work

1. Wire Report Problem submit to optional attachment upload.
2. Add attachment metadata columns to Report Problem sheet.
3. Wire Izin attachment flow.
4. Wire Kasbon attachment flow if needed.
5. Add Gmail notification after upload/submit.

## Result

Sprint 6 Part 1 complete. EXPOS now has a reusable Google Drive storage layer for attachments.
