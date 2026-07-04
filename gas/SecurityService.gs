/**
 * SecurityService.gs
 *
 * Responsibility:
 * Centralizes lightweight security helpers for EXPOS.
 *
 * Scope Sprint 6 Part 7:
 * - input normalization
 * - role assertion
 * - branch assertion
 * - simple rate limiting
 */

var EXPOS_SECURITY_CONFIG = {
  RATE_LIMIT_TTL_SECONDS: 60,
  RATE_LIMIT_MAX_ACTIONS: 30,
  ROLE_LEVELS: {
    Owner: 100,
    Admin: 80,
    Manager: 60,
    Crew: 20
  }
};

function normalizeTextInput(value, maxLength) {
  var text = String(value || '').trim();
  if (maxLength && text.length > maxLength) {
    text = text.slice(0, maxLength);
  }
  return text;
}

function normalizeCodeInput(value, maxLength) {
  return normalizeTextInput(value, maxLength || 30).toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

function normalizeNumberInput(value) {
  var numberValue = Number(String(value || '').replace(/[^0-9.-]/g, ''));
  if (!Number.isFinite(numberValue)) {
    return 0;
  }
  return numberValue;
}

function requireAllowedRole(allowedRoles) {
  var user = getCurrentExposUser();
  var role = String(user.role || '').trim();
  var allowed = allowedRoles || [];
  if (allowed.indexOf(role) < 0) {
    throw new Error('Role tidak diizinkan: ' + role);
  }
  return user;
}

function requireMinimumRole(minRole) {
  var user = getCurrentExposUser();
  var userLevel = getRoleLevel(user.role);
  var minLevel = getRoleLevel(minRole);
  if (userLevel < minLevel) {
    throw new Error('Role tidak cukup untuk aksi ini.');
  }
  return user;
}

function getRoleLevel(role) {
  return EXPOS_SECURITY_CONFIG.ROLE_LEVELS[String(role || '').trim()] || 0;
}

function requireBranchAccess(branchCode) {
  return assertCurrentUserCanAccessBranch(branchCode);
}

function enforceRateLimit(actionKey) {
  var email = getCurrentUserEmailSafeForSecurity();
  var action = normalizeCodeInput(actionKey || 'GENERAL', 50);
  var key = 'EXPOS_RATE_' + action + '_' + email;
  var cache = CacheService.getScriptCache();
  var current = Number(cache.get(key) || 0);

  if (current >= EXPOS_SECURITY_CONFIG.RATE_LIMIT_MAX_ACTIONS) {
    throw new Error('Terlalu banyak aktivitas. Coba beberapa saat lagi.');
  }

  cache.put(key, String(current + 1), EXPOS_SECURITY_CONFIG.RATE_LIMIT_TTL_SECONDS);
  return {
    key: key,
    count: current + 1,
    limit: EXPOS_SECURITY_CONFIG.RATE_LIMIT_MAX_ACTIONS
  };
}

function getCurrentUserEmailSafeForSecurity() {
  try {
    return getCurrentUserEmail() || 'anonymous';
  } catch (err) {
    return 'anonymous';
  }
}

function sanitizePayload(payload, allowedKeys) {
  var input = payload || {};
  var keys = allowedKeys || Object.keys(input);
  var output = {};
  keys.forEach(function(key) {
    if (input.hasOwnProperty(key)) {
      output[key] = input[key];
    }
  });
  return output;
}
