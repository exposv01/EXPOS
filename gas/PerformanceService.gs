/**
 * PerformanceService.gs
 *
 * Responsibility:
 * Centralized lightweight performance helpers for EXPOS.
 */

var EXPOS_PERFORMANCE_CONFIG = {
  DEFAULT_CACHE_TTL_SECONDS: 300,
  SHORT_CACHE_TTL_SECONDS: 60,
  LOCK_WAIT_MS: 10000
};

function getCachedJson(cacheKey, builderFn, ttlSeconds) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  var value = builderFn();
  cache.put(cacheKey, JSON.stringify(value), ttlSeconds || EXPOS_PERFORMANCE_CONFIG.DEFAULT_CACHE_TTL_SECONDS);
  return value;
}

function clearCacheKeys(keys) {
  var cache = CacheService.getScriptCache();
  cache.removeAll(keys || []);
  return {
    status: 'cleared',
    keys: keys || [],
    clearedAt: new Date().toISOString()
  };
}

function runWithScriptLock(callback) {
  var lock = LockService.getScriptLock();
  lock.waitLock(EXPOS_PERFORMANCE_CONFIG.LOCK_WAIT_MS);
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}

function runWithUserLock(callback) {
  var lock = LockService.getUserLock();
  lock.waitLock(EXPOS_PERFORMANCE_CONFIG.LOCK_WAIT_MS);
  try {
    return callback();
  } finally {
    lock.releaseLock();
  }
}

function measureExecution(label, callback) {
  var start = new Date().getTime();
  var result = callback();
  var end = new Date().getTime();
  return {
    label: label || 'execution',
    durationMs: end - start,
    result: result
  };
}
