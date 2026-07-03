# EXPOS Development Bible

This document is the central guide for future EXPOS development.

## Architecture Principles

- Google Sheets is the One Source of Truth.
- Google Apps Script contains business logic and orchestration.
- Google Drive stores files and generated documents.
- Gmail and WhatsApp are reserved notification channels for future tasks.
- Business modules must be added incrementally and documented before implementation.

## Current Boundary

This version contains only the initial architecture. It must not include business implementations for Absensi, Izin, Kasbon, or Report Problem.

## Future Development Rules

- Keep module responsibilities separated.
- Add decisions to `docs/DECISION_LOG.md`.
- Update `CHANGELOG.md` for every versioned change.
- Prefer simple Google Workspace-native workflows before adding external services.

