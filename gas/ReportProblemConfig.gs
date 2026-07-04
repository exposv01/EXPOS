/**
 * ReportProblemConfig.gs
 *
 * Responsibility:
 * Stores Report Problem module configuration separately to keep Config.gs stable.
 */

var EXPOS_REPORT_PROBLEM_CONFIG = {
  SHEET_NAME: 'Report Problem',
  HEADERS: [
    'ID Problem',
    'Timestamp',
    'Cabang',
    'ID Pelapor',
    'Nama Pelapor',
    'Judul Problem',
    'Deskripsi Problem',
    'Foto URL',
    'Nama File Foto',
    'Status'
  ],
  ID_PREFIX: 'RP',
  STATUS_OPEN: 'Open',
  STATUS_DONE: 'Done'
};
