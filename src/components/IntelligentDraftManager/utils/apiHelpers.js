// API Helper utilities for Intelligent Draft Manager
// This module provides a clean interface to interact with the AI Content Version Control System APIs

import { 
  mockDrafts, 
  mockPredictions, 
  mockCritiques, 
  mockInsights, 
  mockVersionHistory,
  simulateApiDelay,
  mockApiResponses 
} from '../mockData';

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api' 
  : '/api';

// Enable mock mode for development when API is not available
const USE_MOCK_DATA = import.meta.env.DEV && 
                      import.meta.env.VITE_USE_MOCK_INTELLIGENCE === 'true';

// Generic API request handler with error handling
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: 'Network error occurred' 
      }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
};

// Draft Management APIs
export const draftApi = {
  // Get all drafts with optional filtering
  getAllDrafts: async (filters = {}) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(600);
      let filteredDrafts = [...mockDrafts];
      
      // Apply filters
      if (filters.status && filters.status !== 'all') {
        filteredDrafts = filteredDrafts.filter(draft => draft.status === filters.status);
      }
      if (filters.category && filters.category !== 'all') {
        filteredDrafts = filteredDrafts.filter(draft => draft.category === filters.category);
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredDrafts = filteredDrafts.filter(draft => 
          draft.title.toLowerCase().includes(query) ||
          draft.content.toLowerCase().includes(query)
        );
      }
      
      return mockApiResponses.success({ drafts: filteredDrafts });
    }

    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        queryParams.append(key, value);
      }
    });
    
    const endpoint = `/ai-content/drafts${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get a specific draft by ID
  getDraft: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}`);
  },

  // Create a new draft
  createDraft: async (draftData) => {
    return apiRequest('/ai-content/drafts', {
      method: 'POST',
      body: JSON.stringify(draftData)
    });
  },

  // Update an existing draft
  updateDraft: async (draftId, updates) => {
    return apiRequest(`/ai-content/drafts/${draftId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  // Delete a draft
  deleteDraft: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}`, {
      method: 'DELETE'
    });
  },

  // Get draft statistics and metrics
  getDraftStats: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/stats`);
  }
};

// Version Control APIs
export const versionApi = {
  // Get version history for a draft
  getVersionHistory: async (draftId) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(500);
      const versionData = mockVersionHistory[draftId] || { versions: [] };
      return mockApiResponses.success(versionData);
    }
    return apiRequest(`/ai-content/drafts/${draftId}/versions`);
  },

  // Get a specific version
  getVersion: async (draftId, versionId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/versions/${versionId}`);
  },

  // Compare two versions
  compareVersions: async (versionId1, versionId2) => {
    return apiRequest('/ai-content/versions/compare', {
      method: 'POST',
      body: JSON.stringify({ 
        version1: versionId1, 
        version2: versionId2 
      })
    });
  },

  // Restore a version (creates new version with restored content)
  restoreVersion: async (draftId, versionId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/versions/${versionId}/restore`, {
      method: 'POST'
    });
  },

  // Create a manual save point
  createSavePoint: async (draftId, message) => {
    return apiRequest(`/ai-content/drafts/${draftId}/savepoint`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  }
};

// Critique and Analysis APIs
export const critiqueApi = {
  // Generate critique for a draft
  generateCritique: async (draftId, options = {}) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(1200); // Longer delay for AI processing
      const critiqueData = mockCritiques[draftId] || {
        overallScore: 75,
        totalSuggestions: 3,
        sections: []
      };
      return mockApiResponses.success(critiqueData);
    }

    const defaultOptions = {
      criteria: ['grammar', 'style', 'structure', 'seo', 'engagement'],
      intensity: 'balanced',
      ...options
    };

    return apiRequest(`/ai-content/drafts/${draftId}/critique`, {
      method: 'POST',
      body: JSON.stringify(defaultOptions)
    });
  },

  // Get existing critique for a draft
  getCritique: async (draftId) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(400);
      const critiqueData = mockCritiques[draftId];
      return critiqueData 
        ? mockApiResponses.success(critiqueData)
        : mockApiResponses.error('No critique found for this draft');
    }
    return apiRequest(`/ai-content/drafts/${draftId}/critique`);
  },

  // Apply a specific suggestion
  applySuggestion: async (draftId, suggestionId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/suggestions/${suggestionId}/apply`, {
      method: 'POST'
    });
  },

  // Apply multiple suggestions at once
  applyMultipleSuggestions: async (draftId, suggestionIds) => {
    return apiRequest(`/ai-content/drafts/${draftId}/suggestions/apply-multiple`, {
      method: 'POST',
      body: JSON.stringify({ suggestionIds })
    });
  },

  // Get suggestion details
  getSuggestion: async (draftId, suggestionId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/suggestions/${suggestionId}`);
  },

  // Dismiss a suggestion
  dismissSuggestion: async (draftId, suggestionId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/suggestions/${suggestionId}/dismiss`, {
      method: 'POST'
    });
  }
};

// Success Prediction APIs
export const predictionApi = {
  // Generate success prediction for a draft
  generatePrediction: async (draftId, options = {}) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(1000);
      const predictionData = mockPredictions[draftId] || {
        overallScore: 70,
        confidence: 75,
        metrics: []
      };
      return mockApiResponses.success(predictionData);
    }

    const defaultOptions = {
      metrics: ['engagement', 'seo', 'readability', 'shareability'],
      timeframe: '30days',
      targetAudience: 'general',
      ...options
    };

    return apiRequest(`/ai-content/drafts/${draftId}/predict`, {
      method: 'POST',
      body: JSON.stringify(defaultOptions)
    });
  },

  // Get existing prediction for a draft
  getPrediction: async (draftId) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(300);
      const predictionData = mockPredictions[draftId];
      return predictionData 
        ? mockApiResponses.success(predictionData)
        : mockApiResponses.error('No prediction found for this draft');
    }
    return apiRequest(`/ai-content/drafts/${draftId}/prediction`);
  },

  // Update prediction parameters
  updatePrediction: async (draftId, options) => {
    return apiRequest(`/ai-content/drafts/${draftId}/prediction`, {
      method: 'PUT',
      body: JSON.stringify(options)
    });
  },

  // Get historical performance data
  getHistoricalPerformance: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const endpoint = `/ai-content/analytics/historical${queryParams.toString() ? `?${queryParams}` : ''}`;
    return apiRequest(endpoint);
  },

  // Get prediction accuracy metrics
  getPredictionAccuracy: async () => {
    return apiRequest('/ai-content/analytics/prediction-accuracy');
  }
};

// Learning and Insights APIs
export const insightsApi = {
  // Get learning insights
  getLearningInsights: async (options = {}) => {
    if (USE_MOCK_DATA) {
      await simulateApiDelay(700);
      return mockApiResponses.success(mockInsights);
    }

    const defaultOptions = {
      timeRange: '30days',
      includePatterns: true,
      includeRecommendations: true,
      ...options
    };

    const queryParams = new URLSearchParams();
    Object.entries(defaultOptions).forEach(([key, value]) => {
      queryParams.append(key, value);
    });

    return apiRequest(`/ai-content/insights?${queryParams}`);
  },

  // Get writing patterns analysis
  getWritingPatterns: async (timeRange = '30days') => {
    return apiRequest(`/ai-content/insights/patterns?timeRange=${timeRange}`);
  },

  // Get performance analytics
  getPerformanceAnalytics: async (timeRange = '30days') => {
    return apiRequest(`/ai-content/insights/performance?timeRange=${timeRange}`);
  },

  // Get AI learning progress
  getAILearningProgress: async () => {
    return apiRequest('/ai-content/insights/ai-learning');
  },

  // Get personalized recommendations
  getPersonalizedRecommendations: async () => {
    return apiRequest('/ai-content/insights/recommendations');
  },

  // Update user preferences for AI learning
  updateUserPreferences: async (preferences) => {
    return apiRequest('/ai-content/insights/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences)
    });
  },

  // Get content optimization suggestions
  getOptimizationSuggestions: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/optimize`);
  }
};

// Workflow and Collaboration APIs
export const workflowApi = {
  // Update draft workflow status
  updateWorkflowStatus: async (draftId, status, comment = '') => {
    return apiRequest(`/ai-content/drafts/${draftId}/workflow`, {
      method: 'PUT',
      body: JSON.stringify({ status, comment })
    });
  },

  // Get workflow history
  getWorkflowHistory: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/workflow/history`);
  },

  // Add reviewer to draft
  addReviewer: async (draftId, reviewerData) => {
    return apiRequest(`/ai-content/drafts/${draftId}/reviewers`, {
      method: 'POST',
      body: JSON.stringify(reviewerData)
    });
  },

  // Submit review
  submitReview: async (draftId, reviewData) => {
    return apiRequest(`/ai-content/drafts/${draftId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Get all reviews for a draft
  getReviews: async (draftId) => {
    return apiRequest(`/ai-content/drafts/${draftId}/reviews`);
  }
};

// Search and Discovery APIs
export const searchApi = {
  // Search drafts with AI-powered query understanding
  searchDrafts: async (query, options = {}) => {
    const searchOptions = {
      query,
      includeContent: true,
      includeTags: true,
      fuzzyMatch: true,
      ...options
    };

    return apiRequest('/ai-content/search/drafts', {
      method: 'POST',
      body: JSON.stringify(searchOptions)
    });
  },

  // Get search suggestions
  getSearchSuggestions: async (partialQuery) => {
    return apiRequest(`/ai-content/search/suggestions?q=${encodeURIComponent(partialQuery)}`);
  },

  // Save search query for analytics
  saveSearchQuery: async (query, results) => {
    return apiRequest('/ai-content/search/analytics', {
      method: 'POST',
      body: JSON.stringify({ query, resultCount: results.length })
    });
  },

  // Get trending topics
  getTrendingTopics: async (timeRange = '7days') => {
    return apiRequest(`/ai-content/search/trending?timeRange=${timeRange}`);
  }
};

// Content Analysis APIs
export const analysisApi = {
  // Analyze content quality
  analyzeQuality: async (content, options = {}) => {
    return apiRequest('/ai-content/analyze/quality', {
      method: 'POST',
      body: JSON.stringify({ content, ...options })
    });
  },

  // Get readability score
  getReadabilityScore: async (content) => {
    return apiRequest('/ai-content/analyze/readability', {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  },

  // Analyze SEO potential
  analyzeSEO: async (content, metadata = {}) => {
    return apiRequest('/ai-content/analyze/seo', {
      method: 'POST',
      body: JSON.stringify({ content, metadata })
    });
  },

  // Get sentiment analysis
  getSentimentAnalysis: async (content) => {
    return apiRequest('/ai-content/analyze/sentiment', {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  },

  // Extract key topics and entities
  extractTopics: async (content) => {
    return apiRequest('/ai-content/analyze/topics', {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  }
};

// Export consolidated API object
export const draftIntelligenceApi = {
  drafts: draftApi,
  versions: versionApi,
  critique: critiqueApi,
  predictions: predictionApi,
  insights: insightsApi,
  workflow: workflowApi,
  search: searchApi,
  analysis: analysisApi
};

// Utility functions for API responses
export const apiUtils = {
  // Check if response is successful
  isSuccess: (response) => response && response.success,

  // Extract data from successful response
  getData: (response) => response?.data || null,

  // Extract error message from failed response
  getError: (response) => response?.error || 'Unknown error occurred',

  // Format error for display
  formatError: (error) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    return 'An unexpected error occurred';
  },

  // Retry failed requests with exponential backoff
  retryRequest: async (requestFn, maxRetries = 3, baseDelay = 1000) => {
    let lastError;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await requestFn();
        if (result.success) return result;
        lastError = result;
      } catch (error) {
        lastError = { success: false, error: error.message };
      }
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return lastError;
  },

  // Batch multiple API requests
  batchRequests: async (requests) => {
    try {
      const results = await Promise.allSettled(requests);
      return results.map((result, index) => ({
        index,
        success: result.status === 'fulfilled' && result.value?.success,
        data: result.status === 'fulfilled' ? result.value?.data : null,
        error: result.status === 'rejected' ? result.reason?.message 
               : result.value?.error || null
      }));
    } catch (error) {
      console.error('Batch request failed:', error);
      return requests.map((_, index) => ({
        index,
        success: false,
        data: null,
        error: 'Batch request failed'
      }));
    }
  }
};

export default draftIntelligenceApi;