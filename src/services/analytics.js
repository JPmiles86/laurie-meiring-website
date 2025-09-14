// Analytics Service for AI Usage Tracking

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Local storage keys
const USAGE_CACHE_KEY = 'ai-usage-cache';
const PENDING_USAGE_KEY = 'ai-usage-pending';

// Usage tracking
export const trackUsage = async (action, provider, tokens, metadata = {}) => {
  const usage = {
    action,
    provider,
    tokens,
    metadata,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  };

  // Try to send immediately
  try {
    await sendUsageToServer(usage);
    
    // Update local cache
    updateLocalCache(usage);
  } catch (error) {
    // Queue for later if offline
    queuePendingUsage(usage);
    console.warn('Usage tracking queued for later:', error);
  }
};

// Send usage data to server
const sendUsageToServer = async (usage) => {
  const response = await fetch(`${API_BASE_URL}/ai/track-usage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(usage)
  });

  if (!response.ok) {
    throw new Error('Failed to track usage');
  }

  return response.json();
};

// Queue usage for later sending
const queuePendingUsage = (usage) => {
  const pending = JSON.parse(localStorage.getItem(PENDING_USAGE_KEY) || '[]');
  pending.push(usage);
  localStorage.setItem(PENDING_USAGE_KEY, JSON.stringify(pending));
};

// Sync all pending usage data
export const syncPendingUsage = async () => {
  const pending = JSON.parse(localStorage.getItem(PENDING_USAGE_KEY) || '[]');
  if (pending.length === 0) return;

  try {
    const response = await fetch(`${API_BASE_URL}/ai/track-usage/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ usage: pending })
    });

    if (response.ok) {
      localStorage.removeItem(PENDING_USAGE_KEY);
      console.log(`Synced ${pending.length} pending usage records`);
    }
  } catch (error) {
    console.error('Failed to sync usage:', error);
  }
};

// Update local cache for immediate display
const updateLocalCache = (usage) => {
  const cache = JSON.parse(localStorage.getItem(USAGE_CACHE_KEY) || '{}');
  const today = new Date().toISOString().split('T')[0];
  
  if (!cache[today]) {
    cache[today] = {
      requests: 0,
      tokens: 0,
      byAction: {},
      byProvider: {}
    };
  }
  
  cache[today].requests++;
  cache[today].tokens += usage.tokens;
  
  // Track by action
  if (!cache[today].byAction[usage.action]) {
    cache[today].byAction[usage.action] = 0;
  }
  cache[today].byAction[usage.action]++;
  
  // Track by provider
  if (!cache[today].byProvider[usage.provider]) {
    cache[today].byProvider[usage.provider] = 0;
  }
  cache[today].byProvider[usage.provider]++;
  
  // Keep only last 30 days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 30);
  const cutoffStr = cutoffDate.toISOString().split('T')[0];
  
  Object.keys(cache).forEach(date => {
    if (date < cutoffStr) {
      delete cache[date];
    }
  });
  
  localStorage.setItem(USAGE_CACHE_KEY, JSON.stringify(cache));
};

// Get local usage statistics
export const getLocalUsageStats = (period = 'week') => {
  const cache = JSON.parse(localStorage.getItem(USAGE_CACHE_KEY) || '{}');
  const now = new Date();
  let startDate = new Date();
  
  switch (period) {
    case 'day':
      startDate.setDate(now.getDate() - 1);
      break;
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    default:
      startDate.setDate(now.getDate() - 7);
  }
  
  const startStr = startDate.toISOString().split('T')[0];
  
  const stats = {
    totalRequests: 0,
    totalTokens: 0,
    byDate: {},
    byAction: {},
    byProvider: {}
  };
  
  Object.entries(cache).forEach(([date, data]) => {
    if (date >= startStr) {
      stats.totalRequests += data.requests;
      stats.totalTokens += data.tokens;
      stats.byDate[date] = data;
      
      // Aggregate by action
      Object.entries(data.byAction).forEach(([action, count]) => {
        if (!stats.byAction[action]) stats.byAction[action] = 0;
        stats.byAction[action] += count;
      });
      
      // Aggregate by provider
      Object.entries(data.byProvider).forEach(([provider, count]) => {
        if (!stats.byProvider[provider]) stats.byProvider[provider] = 0;
        stats.byProvider[provider] += count;
      });
    }
  });
  
  return stats;
};

// Get usage statistics from server
export const getServerUsageStats = async (period = 'month') => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/usage?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch usage stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    // Fall back to local stats
    return {
      success: false,
      usage: [],
      summary: getLocalUsageStats(period)
    };
  }
};

// Cost estimation
export const estimateCost = (tokens, provider = 'openai', model = 'gpt-4') => {
  const pricing = {
    openai: {
      'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
      'gpt-3.5-turbo': { input: 0.001, output: 0.002 }
    },
    anthropic: {
      'claude-3-opus': { input: 0.015, output: 0.075 },
      'claude-3-sonnet': { input: 0.003, output: 0.015 }
    }
  };

  const providerPricing = pricing[provider] || pricing.openai;
  const modelPricing = providerPricing[model] || providerPricing['gpt-4'];
  
  // Estimate 70% input, 30% output
  const inputTokens = tokens * 0.7;
  const outputTokens = tokens * 0.3;
  
  const cost = (inputTokens * modelPricing.input / 1000) + 
               (outputTokens * modelPricing.output / 1000);
  
  return Math.round(cost * 100) / 100; // Round to cents
};

// Session management
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('ai-session-id');
  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('ai-session-id', sessionId);
  }
  return sessionId;
};

// Analytics events
export const trackEvent = (eventName, properties = {}) => {
  try {
    // Add to local analytics
    const events = JSON.parse(localStorage.getItem('analytics-events') || '[]');
    events.push({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('analytics-events', JSON.stringify(events));
    
    // If you have external analytics (GA, Mixpanel, etc.), send here
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Performance monitoring
export const measurePerformance = async (action, fn) => {
  const start = performance.now();
  let result;
  let error;
  
  try {
    result = await fn();
  } catch (e) {
    error = e;
  }
  
  const duration = performance.now() - start;
  
  trackEvent('ai_performance', {
    action,
    duration: Math.round(duration),
    success: !error,
    error: error?.message
  });
  
  if (error) throw error;
  return result;
};

// Export usage report
export const exportUsageReport = async (format = 'csv') => {
  const stats = await getServerUsageStats('month');
  
  if (format === 'csv') {
    const csv = convertToCSV(stats.usage);
    downloadFile(csv, `ai-usage-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
  } else if (format === 'json') {
    const json = JSON.stringify(stats, null, 2);
    downloadFile(json, `ai-usage-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
  }
};

// Helper to convert data to CSV
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  return csv;
};

// Helper to download file
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Auto-sync on page visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    syncPendingUsage();
  }
});

// Sync on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(syncPendingUsage, 1000);
  });
}

export default {
  trackUsage,
  syncPendingUsage,
  getLocalUsageStats,
  getServerUsageStats,
  estimateCost,
  trackEvent,
  measurePerformance,
  exportUsageReport
};