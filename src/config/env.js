// src/config/env.js

const env = {
  // ===========================
  // API CONFIGURATION
  // ===========================
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://techfusion-backend-production.up.railway.app/api",
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
    retryAttempts: Number(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
    retryDelay: Number(import.meta.env.VITE_API_RETRY_DELAY) || 2000,
  },

  // ===========================
  // FEATURE FLAGS
  // ===========================
  features: {
    particles: import.meta.env.VITE_ENABLE_PARTICLES !== "false", // Default: true
    customCursor: import.meta.env.VITE_ENABLE_CUSTOM_CURSOR !== "false", // Default: true
    animations: import.meta.env.VITE_ENABLE_ANIMATIONS !== "false", // Default: true
    debugMode: import.meta.env.VITE_DEBUG_MODE === "true", // Default: false
  },

  // ===========================
  // APP INFO
  // ===========================
  app: {
    name: "TECHFUSION'26",
    tagline: "A National Level Project Expo",
    version: "1.0.0",
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },

  // ===========================
  // EVENT INFO
  // ===========================
  event: {
    date: "8th April 2026",
    venue: "IT Auditorium",
    defaultFee: 100,
    defaultSlots: 200,
  },

  // ===========================
  // ANALYTICS (Optional)
  // ===========================
  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || null,
    enabled: !!import.meta.env.VITE_GA_TRACKING_ID,
  },

  // ===========================
  // SOCIAL LINKS (Optional)
  // ===========================
  social: {
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || "#",
    twitter: import.meta.env.VITE_SOCIAL_TWITTER || "#",
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || "#",
    github: import.meta.env.VITE_SOCIAL_GITHUB || "#",
  },

  // ===========================
  // CONTACT INFO
  // ===========================
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "techfusion@college.edu",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210",
    address: import.meta.env.VITE_CONTACT_ADDRESS || "IT Department, Main Campus",
  },
};

// ===========================
// ✅ VALIDATION
// ===========================
const validateEnv = () => {
  const errors = [];

  // Check critical environment variables
  if (!env.api.baseURL) {
    errors.push("VITE_API_BASE_URL is required");
  }

  // Validate URL format
  if (env.api.baseURL && !env.api.baseURL.startsWith("http")) {
    errors.push("VITE_API_BASE_URL must start with http:// or https://");
  }

  // Validate timeout
  if (env.api.timeout < 1000) {
    console.warn("⚠️ API timeout is very low (<1s). This might cause issues.");
  }

  // Throw error if critical issues found
  if (errors.length > 0) {
    throw new Error(`❌ Environment Configuration Errors:\n${errors.join("\n")}`);
  }
};

// Run validation
validateEnv();

// ===========================
// ✅ DEVELOPMENT LOGGING
// ===========================
if (env.app.isDev) {
  console.log("╔════════════════════════════════════════════╗");
  console.log("║        🔧 ENVIRONMENT CONFIGURATION        ║");
  console.log("╠════════════════════════════════════════════╣");
  console.log(`║ Mode:          ${env.app.mode.padEnd(26)}║`);
  console.log(`║ Version:       ${env.app.version.padEnd(26)}║`);
  console.log("╠════════════════════════════════════════════╣");
  console.log("║ API Settings:                              ║");
  console.log(`║   Base URL:    ${env.api.baseURL.substring(0, 24).padEnd(26)}║`);
  console.log(`║   Timeout:     ${(env.api.timeout + "ms").padEnd(26)}║`);
  console.log(`║   Retries:     ${String(env.api.retryAttempts).padEnd(26)}║`);
  console.log("╠════════════════════════════════════════════╣");
  console.log("║ Features:                                  ║");
  console.log(`║   Particles:   ${(env.features.particles ? "✅ Enabled" : "❌ Disabled").padEnd(26)}║`);
  console.log(`║   Cursor:      ${(env.features.customCursor ? "✅ Enabled" : "❌ Disabled").padEnd(26)}║`);
  console.log(`║   Animations:  ${(env.features.animations ? "✅ Enabled" : "❌ Disabled").padEnd(26)}║`);
  console.log(`║   Debug:       ${(env.features.debugMode ? "✅ Enabled" : "❌ Disabled").padEnd(26)}║`);
  console.log("╚══���═════════════════════════════════════════╝");
}

// ===========================
// ✅ HELPER FUNCTIONS
// ===========================

/**
 * Get full API endpoint URL
 * @param {string} endpoint - API endpoint path
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  const base = env.api.baseURL.replace(/\/$/, ""); // Remove trailing slash
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * Check if a feature is enabled
 * @param {string} featureName - Feature name
 * @returns {boolean}
 */
export const isFeatureEnabled = (featureName) => {
  return env.features[featureName] ?? false;
};

/**
 * Get environment summary for debugging
 * @returns {object}
 */
export const getEnvSummary = () => ({
  mode: env.app.mode,
  isDev: env.app.isDev,
  isProd: env.app.isProd,
  apiBaseUrl: env.api.baseURL,
  features: env.features,
});

// ===========================
// ✅ EXPORT
// ===========================
export default env;