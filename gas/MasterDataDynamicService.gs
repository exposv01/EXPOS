/**
 * MasterDataDynamicService.gs
 *
 * Responsibility:
 * Provides dynamic master data for UI dropdowns and caches read-only master data.
 *
 * Bible EXPOS:
 * - UI must not hardcode operational master data.
 * - Google Sheets remains One Source of Truth.
 * - Service reads via existing Repository/Helper functions.
 */

var EXPOS_MASTER_DATA_CACHE = {
  TTL_SECONDS: 300,
  KEYS: {
    CABANG: 'EXPOS_MASTER_CABANG_OPTIONS',
    KARYAWAN: 'EXPOS_MASTER_KARYAWAN_OPTIONS',
    ROLE: 'EXPOS_ROLE_OPTIONS',
    SHIFT: 'EXPOS_SHIFT_OPTIONS',
    BOOTSTRAP: 'EXPOS_MASTER_BOOTSTRAP'
  }
};

function getMasterDataBootstrapForUi() {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(EXPOS_MASTER_DATA_CACHE.KEYS.BOOTSTRAP);
  if (cached) {
    return JSON.parse(cached);
  }

  var data = {
    cabangOptions: getDynamicCabangOptions(),
    karyawanOptions: getDynamicKaryawanOptions(),
    roleOptions: getDynamicRoleOptions(),
    shiftOptions: getDynamicShiftOptions(),
    generatedAt: new Date().toISOString()
  };

  cache.put(EXPOS_MASTER_DATA_CACHE.KEYS.BOOTSTRAP, JSON.stringify(data), EXPOS_MASTER_DATA_CACHE.TTL_SECONDS);
  return data;
}

function getDynamicCabangOptions() {
  return getCachedMasterData(EXPOS_MASTER_DATA_CACHE.KEYS.CABANG, function() {
    return getActiveCabangList().map(function(row) {
      return {
        value: String(row['Kode Cabang'] || '').trim(),
        label: String(row['Nama Cabang'] || '').trim(),
        status: String(row['Status'] || '').trim()
      };
    }).filter(function(option) {
      return option.value;
    });
  });
}

function getDynamicKaryawanOptions(cabang) {
  var branch = String(cabang || '').trim();
  var cacheKey = branch ? EXPOS_MASTER_DATA_CACHE.KEYS.KARYAWAN + '_' + branch : EXPOS_MASTER_DATA_CACHE.KEYS.KARYAWAN;

  return getCachedMasterData(cacheKey, function() {
    var rows = branch ? getActiveKaryawanByCabang(branch) : getActiveKaryawanList();
    return rows.map(function(row) {
      return {
        value: String(row['ID Karyawan'] || '').trim(),
        label: String(row['Nama Karyawan'] || '').trim(),
        cabang: String(row['Cabang'] || '').trim(),
        jabatan: String(row['Jabatan'] || '').trim(),
        status: String(row['Status'] || '').trim()
      };
    }).filter(function(option) {
      return option.value;
    });
  });
}

function getDynamicRoleOptions() {
  return getCachedMasterData(EXPOS_MASTER_DATA_CACHE.KEYS.ROLE, function() {
    var users = [];
    try {
      users = getMasterUserRecords();
    } catch (err) {
      users = [];
    }

    var seen = {};
    var roles = ['Owner', 'Admin', 'Manager', 'Crew'];
    users.forEach(function(row) {
      var role = String(row['Role'] || '').trim();
      if (role && !seen[role]) {
        roles.push(role);
        seen[role] = true;
      }
    });

    return uniqueValues(roles).map(function(role) {
      return {
        value: role,
        label: role
      };
    });
  });
}

function getDynamicShiftOptions() {
  return getCachedMasterData(EXPOS_MASTER_DATA_CACHE.KEYS.SHIFT, function() {
    return ['Shift 1', 'Shift 2', 'Middle', 'Full Day'].map(function(shift) {
      return {
        value: shift,
        label: shift
      };
    });
  });
}

function getCachedMasterData(cacheKey, builderFn) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  var data = builderFn();
  cache.put(cacheKey, JSON.stringify(data), EXPOS_MASTER_DATA_CACHE.TTL_SECONDS);
  return data;
}

function clearMasterDataCache() {
  var cache = CacheService.getScriptCache();
  var keys = [
    EXPOS_MASTER_DATA_CACHE.KEYS.CABANG,
    EXPOS_MASTER_DATA_CACHE.KEYS.KARYAWAN,
    EXPOS_MASTER_DATA_CACHE.KEYS.ROLE,
    EXPOS_MASTER_DATA_CACHE.KEYS.SHIFT,
    EXPOS_MASTER_DATA_CACHE.KEYS.BOOTSTRAP
  ];
  cache.removeAll(keys);
  return {
    status: 'cleared',
    keys: keys,
    clearedAt: new Date().toISOString()
  };
}

function uniqueValues(values) {
  var seen = {};
  var output = [];
  values.forEach(function(value) {
    var text = String(value || '').trim();
    if (text && !seen[text]) {
      seen[text] = true;
      output.push(text);
    }
  });
  return output;
}
