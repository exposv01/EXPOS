/**
 * SecurityPerformanceController.gs
 *
 * Responsibility:
 * Admin-safe diagnostics for security and performance helpers.
 */

function getSecurityPerformanceStatus() {
  requireAllowedRole(['Owner', 'Admin']);
  return {
    security: {
      rateLimitTtlSeconds: EXPOS_SECURITY_CONFIG.RATE_LIMIT_TTL_SECONDS,
      rateLimitMaxActions: EXPOS_SECURITY_CONFIG.RATE_LIMIT_MAX_ACTIONS,
      roleLevels: EXPOS_SECURITY_CONFIG.ROLE_LEVELS
    },
    performance: {
      defaultCacheTtlSeconds: EXPOS_PERFORMANCE_CONFIG.DEFAULT_CACHE_TTL_SECONDS,
      shortCacheTtlSeconds: EXPOS_PERFORMANCE_CONFIG.SHORT_CACHE_TTL_SECONDS,
      lockWaitMs: EXPOS_PERFORMANCE_CONFIG.LOCK_WAIT_MS
    },
    generatedAt: new Date().toISOString()
  };
}

function testCurrentUserAccess(cabang) {
  var user = requireBranchAccess(cabang);
  return {
    ok: true,
    email: user.email,
    role: user.role,
    cabang: user.cabang,
    requestedCabang: cabang
  };
}

function testRateLimit(actionKey) {
  return enforceRateLimit(actionKey || 'TEST');
}
