import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  draftIntelligenceApi, 
  apiUtils 
} from '../utils/apiHelpers';

// Custom hook for managing draft intelligence features
export const useDraftIntelligence = (options = {}) => {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    enableCaching = true,
    maxCacheAge = 300000, // 5 minutes
  } = options;

  // State management
  const [state, setState] = useState({
    predictions: {},
    critiques: {},
    insights: null,
    analytics: null,
    loading: {},
    errors: {},
    lastUpdated: {}
  });

  // Cache management
  const cache = useRef(new Map());
  const refreshTimer = useRef(null);

  // Helper function to update state
  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Helper function to set loading state
  const setLoading = useCallback((key, isLoading) => {
    updateState({
      loading: { ...state.loading, [key]: isLoading }
    });
  }, [state.loading, updateState]);

  // Helper function to set error state
  const setError = useCallback((key, error) => {
    updateState({
      errors: { ...state.errors, [key]: error }
    });
  }, [state.errors, updateState]);

  // Cache management functions
  const getCacheKey = (type, id) => `${type}_${id}`;
  
  const isCacheValid = (key) => {
    if (!enableCaching) return false;
    const cached = cache.current.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < maxCacheAge;
  };

  const getCachedData = (key) => {
    const cached = cache.current.get(key);
    return cached ? cached.data : null;
  };

  const setCachedData = (key, data) => {
    if (enableCaching) {
      cache.current.set(key, {
        data,
        timestamp: Date.now()
      });
    }
  };

  // Prediction functions
  const loadPredictions = useCallback(async (draftId) => {
    const cacheKey = getCacheKey('predictions', draftId);
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCachedData(cacheKey);
      updateState({
        predictions: { ...state.predictions, [draftId]: cachedData }
      });
      return cachedData;
    }

    setLoading(`predictions_${draftId}`, true);
    setError(`predictions_${draftId}`, null);

    try {
      const response = await draftIntelligenceApi.predictions.getPrediction(draftId);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setCachedData(cacheKey, data);
        updateState({
          predictions: { ...state.predictions, [draftId]: data },
          lastUpdated: { ...state.lastUpdated, [`predictions_${draftId}`]: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError(`predictions_${draftId}`, errorMsg);
      console.error('Failed to load predictions:', error);
      return null;
    } finally {
      setLoading(`predictions_${draftId}`, false);
    }
  }, [state.predictions, state.lastUpdated, enableCaching, maxCacheAge]);

  const predictSuccess = useCallback(async (draftId, options = {}) => {
    setLoading(`predictions_${draftId}`, true);
    setError(`predictions_${draftId}`, null);

    try {
      const response = await draftIntelligenceApi.predictions.generatePrediction(draftId, options);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        const cacheKey = getCacheKey('predictions', draftId);
        setCachedData(cacheKey, data);
        
        updateState({
          predictions: { ...state.predictions, [draftId]: data },
          lastUpdated: { ...state.lastUpdated, [`predictions_${draftId}`]: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError(`predictions_${draftId}`, errorMsg);
      console.error('Failed to generate prediction:', error);
      return null;
    } finally {
      setLoading(`predictions_${draftId}`, false);
    }
  }, [state.predictions, state.lastUpdated]);

  // Critique functions
  const loadCritiques = useCallback(async (draftId) => {
    const cacheKey = getCacheKey('critiques', draftId);
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCachedData(cacheKey);
      updateState({
        critiques: { ...state.critiques, [draftId]: cachedData }
      });
      return cachedData;
    }

    setLoading(`critiques_${draftId}`, true);
    setError(`critiques_${draftId}`, null);

    try {
      const response = await draftIntelligenceApi.critique.getCritique(draftId);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setCachedData(cacheKey, data);
        updateState({
          critiques: { ...state.critiques, [draftId]: data },
          lastUpdated: { ...state.lastUpdated, [`critiques_${draftId}`]: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError(`critiques_${draftId}`, errorMsg);
      console.error('Failed to load critiques:', error);
      return null;
    } finally {
      setLoading(`critiques_${draftId}`, false);
    }
  }, [state.critiques, state.lastUpdated, enableCaching, maxCacheAge]);

  const generateCritique = useCallback(async (draftId, options = {}) => {
    setLoading(`critiques_${draftId}`, true);
    setError(`critiques_${draftId}`, null);

    try {
      const response = await draftIntelligenceApi.critique.generateCritique(draftId, options);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        const cacheKey = getCacheKey('critiques', draftId);
        setCachedData(cacheKey, data);
        
        updateState({
          critiques: { ...state.critiques, [draftId]: data },
          lastUpdated: { ...state.lastUpdated, [`critiques_${draftId}`]: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError(`critiques_${draftId}`, errorMsg);
      console.error('Failed to generate critique:', error);
      return null;
    } finally {
      setLoading(`critiques_${draftId}`, false);
    }
  }, [state.critiques, state.lastUpdated]);

  // Insights functions
  const loadInsights = useCallback(async (options = {}) => {
    const cacheKey = getCacheKey('insights', 'global');
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCachedData(cacheKey);
      updateState({ insights: cachedData });
      return cachedData;
    }

    setLoading('insights', true);
    setError('insights', null);

    try {
      const response = await draftIntelligenceApi.insights.getLearningInsights(options);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setCachedData(cacheKey, data);
        updateState({
          insights: data,
          lastUpdated: { ...state.lastUpdated, insights: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError('insights', errorMsg);
      console.error('Failed to load insights:', error);
      return null;
    } finally {
      setLoading('insights', false);
    }
  }, [state.lastUpdated, enableCaching, maxCacheAge]);

  // Analytics functions
  const loadAnalytics = useCallback(async (timeRange = '30days') => {
    const cacheKey = getCacheKey('analytics', timeRange);
    
    if (isCacheValid(cacheKey)) {
      const cachedData = getCachedData(cacheKey);
      updateState({ analytics: cachedData });
      return cachedData;
    }

    setLoading('analytics', true);
    setError('analytics', null);

    try {
      const response = await draftIntelligenceApi.insights.getPerformanceAnalytics(timeRange);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setCachedData(cacheKey, data);
        updateState({
          analytics: data,
          lastUpdated: { ...state.lastUpdated, analytics: Date.now() }
        });
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError('analytics', errorMsg);
      console.error('Failed to load analytics:', error);
      return null;
    } finally {
      setLoading('analytics', false);
    }
  }, [state.lastUpdated, enableCaching, maxCacheAge]);

  // Batch operations
  const loadDraftIntelligence = useCallback(async (draftId) => {
    const requests = [
      loadPredictions(draftId),
      loadCritiques(draftId)
    ];

    try {
      const results = await Promise.allSettled(requests);
      return {
        predictions: results[0].status === 'fulfilled' ? results[0].value : null,
        critiques: results[1].status === 'fulfilled' ? results[1].value : null,
        errors: results
          .map((result, index) => ({ 
            type: ['predictions', 'critiques'][index], 
            error: result.status === 'rejected' ? result.reason : null 
          }))
          .filter(item => item.error)
      };
    } catch (error) {
      console.error('Failed to load draft intelligence:', error);
      return { predictions: null, critiques: null, errors: [{ type: 'batch', error }] };
    }
  }, [loadPredictions, loadCritiques]);

  // Refresh functions
  const refreshAll = useCallback(async () => {
    setLoading('refresh', true);
    
    try {
      // Clear cache
      cache.current.clear();
      
      // Reload insights and analytics
      await Promise.all([
        loadInsights(),
        loadAnalytics()
      ]);
    } catch (error) {
      console.error('Failed to refresh all data:', error);
    } finally {
      setLoading('refresh', false);
    }
  }, [loadInsights, loadAnalytics]);

  const refreshDraft = useCallback(async (draftId) => {
    // Clear draft-specific cache entries
    const keysToDelete = ['predictions', 'critiques'].map(type => 
      getCacheKey(type, draftId)
    );
    keysToDelete.forEach(key => cache.current.delete(key));
    
    // Reload draft intelligence
    return loadDraftIntelligence(draftId);
  }, [loadDraftIntelligence]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshTimer.current = setInterval(() => {
        refreshAll();
      }, refreshInterval);

      return () => {
        if (refreshTimer.current) {
          clearInterval(refreshTimer.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, refreshAll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimer.current) {
        clearInterval(refreshTimer.current);
      }
    };
  }, []);

  // Utility functions
  const clearCache = useCallback(() => {
    cache.current.clear();
  }, []);

  const getCacheInfo = useCallback(() => {
    return {
      size: cache.current.size,
      keys: Array.from(cache.current.keys())
    };
  }, []);

  const isLoading = useCallback((key) => {
    return Boolean(state.loading[key]);
  }, [state.loading]);

  const getError = useCallback((key) => {
    return state.errors[key] || null;
  }, [state.errors]);

  const hasData = useCallback((type, id = null) => {
    if (type === 'insights' || type === 'analytics') {
      return Boolean(state[type]);
    }
    if (id && (type === 'predictions' || type === 'critiques')) {
      return Boolean(state[type][id]);
    }
    return false;
  }, [state]);

  const getLastUpdated = useCallback((key) => {
    return state.lastUpdated[key] || null;
  }, [state.lastUpdated]);

  // Return hook interface
  return {
    // Data
    predictions: state.predictions,
    critiques: state.critiques,
    insights: state.insights,
    analytics: state.analytics,

    // Loading states
    loading: state.loading,
    isLoading,

    // Error states
    errors: state.errors,
    getError,

    // Load functions
    loadPredictions,
    loadCritiques,
    loadInsights,
    loadAnalytics,
    loadDraftIntelligence,

    // Generate functions
    predictSuccess,
    generateCritique,

    // Refresh functions
    refreshAll,
    refreshDraft,

    // Utility functions
    clearCache,
    getCacheInfo,
    hasData,
    getLastUpdated,

    // State info
    lastUpdated: state.lastUpdated
  };
};

// Hook for version control operations
export const useVersionControl = () => {
  const [versions, setVersions] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const loadVersionHistory = useCallback(async (draftId) => {
    setLoading(prev => ({ ...prev, [`history_${draftId}`]: true }));
    setErrors(prev => ({ ...prev, [`history_${draftId}`]: null }));

    try {
      const response = await draftIntelligenceApi.versions.getVersionHistory(draftId);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setVersions(prev => ({ ...prev, [draftId]: data }));
        return data;
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setErrors(prev => ({ ...prev, [`history_${draftId}`]: errorMsg }));
      console.error('Failed to load version history:', error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [`history_${draftId}`]: false }));
    }
  }, []);

  const compareVersions = useCallback(async (versionId1, versionId2) => {
    const key = `compare_${versionId1}_${versionId2}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const response = await draftIntelligenceApi.versions.compareVersions(versionId1, versionId2);
      
      if (apiUtils.isSuccess(response)) {
        return apiUtils.getData(response);
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setErrors(prev => ({ ...prev, [key]: errorMsg }));
      console.error('Failed to compare versions:', error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  const restoreVersion = useCallback(async (draftId, versionId) => {
    const key = `restore_${draftId}_${versionId}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));

    try {
      const response = await draftIntelligenceApi.versions.restoreVersion(draftId, versionId);
      
      if (apiUtils.isSuccess(response)) {
        // Refresh version history after restore
        await loadVersionHistory(draftId);
        return apiUtils.getData(response);
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setErrors(prev => ({ ...prev, [key]: errorMsg }));
      console.error('Failed to restore version:', error);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [loadVersionHistory]);

  return {
    versions,
    loading,
    errors,
    loadVersionHistory,
    compareVersions,
    restoreVersion
  };
};

// Hook for search functionality
export const useIntelligentSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('draftSearchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse search history:', error);
      }
    }
  }, []);

  const search = useCallback(async (query, options = {}) => {
    if (!query.trim()) {
      setSearchResults([]);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const response = await draftIntelligenceApi.search.searchDrafts(query, options);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setSearchResults(data.results || []);
        
        // Save to search history
        const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
        setSearchHistory(newHistory);
        localStorage.setItem('draftSearchHistory', JSON.stringify(newHistory));
        
        return data.results || [];
      } else {
        throw new Error(apiUtils.getError(response));
      }
    } catch (error) {
      const errorMsg = apiUtils.formatError(error);
      setError(errorMsg);
      console.error('Search failed:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [searchHistory]);

  const getSuggestions = useCallback(async (partialQuery) => {
    if (!partialQuery.trim() || partialQuery.length < 2) {
      setSuggestions([]);
      return [];
    }

    try {
      const response = await draftIntelligenceApi.search.getSearchSuggestions(partialQuery);
      
      if (apiUtils.isSuccess(response)) {
        const data = apiUtils.getData(response);
        setSuggestions(data.suggestions || []);
        return data.suggestions || [];
      } else {
        setSuggestions([]);
        return [];
      }
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      setSuggestions([]);
      return [];
    }
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('draftSearchHistory');
  }, []);

  return {
    searchResults,
    suggestions,
    searchHistory,
    loading,
    error,
    search,
    getSuggestions,
    clearHistory
  };
};

export default useDraftIntelligence;