// Feature Flag Configuration
// This file controls which features are available in different deployment modes

/**
 * Feature flags configuration
 * These can be controlled via environment variables for different deployment scenarios
 */

// Get environment variables with defaults
const getEnvFlag = (envVar, defaultValue = false) => {
  const value = import.meta.env[envVar];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === true;
};

export const FEATURE_FLAGS = {
  // AI-powered features
  AI_WRITING_ASSISTANT: getEnvFlag('VITE_ENABLE_AI_WRITING_ASSISTANT', true),
  AI_DRAFT_INTELLIGENCE: getEnvFlag('VITE_ENABLE_AI_DRAFT_INTELLIGENCE', true),
  AI_IMAGE_GENERATION: getEnvFlag('VITE_ENABLE_AI_IMAGE_GENERATION', true),
  AI_CRITIQUE_SYSTEM: getEnvFlag('VITE_ENABLE_AI_CRITIQUE_SYSTEM', true),
  AI_SUCCESS_PREDICTION: getEnvFlag('VITE_ENABLE_AI_SUCCESS_PREDICTION', true),
  AI_LEARNING_INSIGHTS: getEnvFlag('VITE_ENABLE_AI_LEARNING_INSIGHTS', true),
  
  // Advanced features
  VERSION_CONTROL: getEnvFlag('VITE_ENABLE_VERSION_CONTROL', true),
  PERFORMANCE_ANALYTICS: getEnvFlag('VITE_ENABLE_PERFORMANCE_ANALYTICS', true),
  SOCIAL_MEDIA_INTEGRATION: getEnvFlag('VITE_ENABLE_SOCIAL_MEDIA', true),
  
  // Core blog features (always enabled for client)
  BLOG_EDITOR: getEnvFlag('VITE_ENABLE_BLOG_EDITOR', true),
  BLOG_MANAGEMENT: getEnvFlag('VITE_ENABLE_BLOG_MANAGEMENT', true),
  MEDIA_UPLOAD: getEnvFlag('VITE_ENABLE_MEDIA_UPLOAD', true),
  
  // Developer/Debug features
  DEBUG_MODE: getEnvFlag('VITE_DEBUG_MODE', false),
  MOCK_DATA: getEnvFlag('VITE_USE_MOCK_INTELLIGENCE', false),
};

/**
 * Deployment modes for easy configuration
 */
export const DEPLOYMENT_MODES = {
  // Full development mode - all features enabled
  DEVELOPMENT: {
    AI_WRITING_ASSISTANT: true,
    AI_DRAFT_INTELLIGENCE: true,
    AI_IMAGE_GENERATION: true,
    AI_CRITIQUE_SYSTEM: true,
    AI_SUCCESS_PREDICTION: true,
    AI_LEARNING_INSIGHTS: true,
    VERSION_CONTROL: true,
    PERFORMANCE_ANALYTICS: true,
    SOCIAL_MEDIA_INTEGRATION: true,
    BLOG_EDITOR: true,
    BLOG_MANAGEMENT: true,
    MEDIA_UPLOAD: true,
    DEBUG_MODE: true,
    MOCK_DATA: false,
  },
  
  // Client delivery mode - only core blog features
  CLIENT_DELIVERY: {
    AI_WRITING_ASSISTANT: false,
    AI_DRAFT_INTELLIGENCE: false,
    AI_IMAGE_GENERATION: false,
    AI_CRITIQUE_SYSTEM: false,
    AI_SUCCESS_PREDICTION: false,
    AI_LEARNING_INSIGHTS: false,
    VERSION_CONTROL: false,
    PERFORMANCE_ANALYTICS: false,
    SOCIAL_MEDIA_INTEGRATION: false,
    BLOG_EDITOR: true,
    BLOG_MANAGEMENT: true,
    MEDIA_UPLOAD: true,
    DEBUG_MODE: false,
    MOCK_DATA: false,
  },
  
  // Staging mode - AI features enabled but no debug
  STAGING: {
    AI_WRITING_ASSISTANT: true,
    AI_DRAFT_INTELLIGENCE: true,
    AI_IMAGE_GENERATION: true,
    AI_CRITIQUE_SYSTEM: true,
    AI_SUCCESS_PREDICTION: true,
    AI_LEARNING_INSIGHTS: true,
    VERSION_CONTROL: true,
    PERFORMANCE_ANALYTICS: true,
    SOCIAL_MEDIA_INTEGRATION: true,
    BLOG_EDITOR: true,
    BLOG_MANAGEMENT: true,
    MEDIA_UPLOAD: true,
    DEBUG_MODE: false,
    MOCK_DATA: false,
  },
  
  // Production mode - all features enabled, no debug
  PRODUCTION: {
    AI_WRITING_ASSISTANT: true,
    AI_DRAFT_INTELLIGENCE: true,
    AI_IMAGE_GENERATION: true,
    AI_CRITIQUE_SYSTEM: true,
    AI_SUCCESS_PREDICTION: true,
    AI_LEARNING_INSIGHTS: true,
    VERSION_CONTROL: true,
    PERFORMANCE_ANALYTICS: true,
    SOCIAL_MEDIA_INTEGRATION: true,
    BLOG_EDITOR: true,
    BLOG_MANAGEMENT: true,
    MEDIA_UPLOAD: true,
    DEBUG_MODE: false,
    MOCK_DATA: false,
  }
};

/**
 * Get the current deployment mode from environment
 */
export const getCurrentMode = () => {
  const mode = import.meta.env.VITE_DEPLOYMENT_MODE || 'DEVELOPMENT';
  return DEPLOYMENT_MODES[mode] || DEPLOYMENT_MODES.DEVELOPMENT;
};

/**
 * Check if a feature is enabled
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean} - Whether the feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  // First check deployment mode override
  const currentMode = getCurrentMode();
  if (currentMode[featureName] !== undefined) {
    return currentMode[featureName];
  }
  
  // Fall back to individual feature flags
  return FEATURE_FLAGS[featureName] || false;
};

/**
 * Get all enabled features
 * @returns {object} - Object with feature names and their enabled status
 */
export const getEnabledFeatures = () => {
  const currentMode = getCurrentMode();
  return { ...FEATURE_FLAGS, ...currentMode };
};

/**
 * Utility function to conditionally render components based on features
 * @param {string} featureName - Name of the feature
 * @param {React.Component} component - Component to render if feature is enabled
 * @param {React.Component} fallback - Optional fallback component
 * @returns {React.Component|null} - Component or null
 */
export const FeatureGate = ({ feature, children, fallback = null }) => {
  return isFeatureEnabled(feature) ? children : fallback;
};

/**
 * Hook to check feature flags in components
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean} - Whether the feature is enabled
 */
export const useFeatureFlag = (featureName) => {
  return isFeatureEnabled(featureName);
};

/**
 * Debug helper to log current feature configuration
 */
export const logFeatureConfig = () => {
  if (isFeatureEnabled('DEBUG_MODE')) {
    console.group('🎛️ Feature Configuration');
    console.log('Current Mode:', import.meta.env.VITE_DEPLOYMENT_MODE || 'DEVELOPMENT');
    console.log('Enabled Features:', getEnabledFeatures());
    console.groupEnd();
  }
};

// Log configuration in development
if (import.meta.env.DEV) {
  logFeatureConfig();
}

// Force logging for debugging
console.log('🔧 Feature Flags Debug:', {
  mode: import.meta.env.VITE_DEPLOYMENT_MODE,
  aiAssistant: import.meta.env.VITE_ENABLE_AI_WRITING_ASSISTANT,
  draftIntelligence: import.meta.env.VITE_ENABLE_AI_DRAFT_INTELLIGENCE,
  features: FEATURE_FLAGS
});