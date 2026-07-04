/**
 * DashboardLiveService.gs
 *
 * Responsibility:
 * Provides lightweight live operational dashboard metrics for EXPOS.
 *
 * Bible EXPOS:
 * - Dashboard reads from Google Sheets through Service/Repository helpers.
 * - Dashboard is read-only.
 * - No payroll or complex analytics in this part.
 */

var EXPOS_DASHBOARD_CONFIG = {
  CACHE_KEY_PREFIX: 'EXPOS_DASHBOARD_LIVE_',
  TTL_SECONDS: 60,
  BRANCHES: ['CBN', 'ARH', 'SLW']
};

function getLiveDashboardData(filter) {
  var request = normalizeDashboardFilter(filter);
  var cacheKey = buildDashboardCacheKey(request);
  var cache = CacheService.getScriptCache();
  var cached = cache.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  var data = buildLiveDashboardData(request);
  cache.put(cacheKey, JSON.stringify(data), EXPOS_DASHBOARD_CONFIG.TTL_SECONDS);
  return data;
}

function buildLiveDashboardData(filter) {
  var absensi = safeDashboardRead(getAbsensiRecords);
  var izin = safeDashboardRead(getIzinRecords);
  var kasbon = safeDashboardRead(getKasbonRecords);
  var problems = safeDashboardRead(getReportProblemRecords);

  var filteredAbsensi = filterDashboardRecords(absensi, filter);
  var filteredIzin = filterDashboardRecords(izin, filter);
  var filteredKasbon = filterDashboardRecords(kasbon, filter);
  var filteredProblems = filterDashboardRecords(problems, filter);

  return {
    filter: filter,
    summary: {
      hadir: countAbsensiByType(filteredAbsensi, 'Masuk'),
      pulang: countAbsensiByType(filteredAbsensi, 'Pulang'),
      izin: filteredIzin.length,
      kasbon: filteredKasbon.length,
      problemOpen: filteredProblems.length
    },
    byBranch: buildBranchDashboardSummary(filteredAbsensi, filteredIzin, filteredKasbon, filteredProblems),
    latest: {
      absensi: takeLatestRecords(filteredAbsensi, 5),
      izin: takeLatestRecords(filteredIzin, 5),
      kasbon: takeLatestRecords(filteredKasbon, 5),
      problem: takeLatestRecords(filteredProblems, 5)
    },
    generatedAt: new Date().toISOString(),
    cacheTtlSeconds: EXPOS_DASHBOARD_CONFIG.TTL_SECONDS
  };
}

function normalizeDashboardFilter(filter) {
  var data = filter || {};
  var today = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyyy-MM-dd');
  return {
    branch: String(data.branch || 'ALL').trim().toUpperCase() || 'ALL',
    date: String(data.date || today).trim()
  };
}

function buildDashboardCacheKey(filter) {
  return EXPOS_DASHBOARD_CONFIG.CACHE_KEY_PREFIX + filter.branch + '_' + filter.date;
}

function filterDashboardRecords(records, filter) {
  return (records || []).filter(function(record) {
    var branch = String(record['Cabang'] || record.cabang || '').trim().toUpperCase();
    var timestamp = String(record['Timestamp'] || record.timestamp || '').trim();
    var dateText = timestamp.slice(0, 10);
    var matchBranch = filter.branch === 'ALL' || branch === filter.branch;
    var matchDate = !filter.date || dateText === filter.date;
    return matchBranch && matchDate;
  });
}

function countAbsensiByType(records, type) {
  return (records || []).filter(function(record) {
    var jenis = String(record['Jenis Absensi'] || record.jenisAbsensi || '').trim();
    return jenis === type;
  }).length;
}

function buildBranchDashboardSummary(absensi, izin, kasbon, problems) {
  var summary = {};
  EXPOS_DASHBOARD_CONFIG.BRANCHES.forEach(function(branch) {
    summary[branch] = {
      hadir: 0,
      pulang: 0,
      izin: 0,
      kasbon: 0,
      problemOpen: 0
    };
  });

  (absensi || []).forEach(function(record) {
    var branch = String(record['Cabang'] || '').trim().toUpperCase();
    var jenis = String(record['Jenis Absensi'] || '').trim();
    if (!summary[branch]) return;
    if (jenis === 'Masuk') summary[branch].hadir += 1;
    if (jenis === 'Pulang') summary[branch].pulang += 1;
  });

  incrementBranchMetric(summary, izin, 'izin');
  incrementBranchMetric(summary, kasbon, 'kasbon');
  incrementBranchMetric(summary, problems, 'problemOpen');

  return summary;
}

function incrementBranchMetric(summary, records, metricName) {
  (records || []).forEach(function(record) {
    var branch = String(record['Cabang'] || '').trim().toUpperCase();
    if (summary[branch]) {
      summary[branch][metricName] += 1;
    }
  });
}

function takeLatestRecords(records, limit) {
  return (records || []).slice().reverse().slice(0, limit).map(function(record) {
    return {
      timestamp: record['Timestamp'] || record.timestamp || '',
      cabang: record['Cabang'] || record.cabang || '',
      id: record['ID Absensi'] || record['ID Izin'] || record['ID Kasbon'] || record['ID Problem'] || '',
      nama: record['Nama Karyawan'] || record['Nama Pelapor'] || '',
      status: record['Jenis Absensi'] || record['Status'] || ''
    };
  });
}

function safeDashboardRead(readerFn) {
  try {
    return readerFn() || [];
  } catch (err) {
    return [];
  }
}

function clearDashboardLiveCache() {
  var cache = CacheService.getScriptCache();
  var keys = [];
  EXPOS_DASHBOARD_CONFIG.BRANCHES.concat(['ALL']).forEach(function(branch) {
    var today = Utilities.formatDate(new Date(), EXPOS_CONFIG.TIMEZONE, 'yyyy-MM-dd');
    keys.push(EXPOS_DASHBOARD_CONFIG.CACHE_KEY_PREFIX + branch + '_' + today);
  });
  cache.removeAll(keys);
  return {
    status: 'cleared',
    keys: keys,
    clearedAt: new Date().toISOString()
  };
}
