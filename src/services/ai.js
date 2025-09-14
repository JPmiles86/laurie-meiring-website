// AI Service Layer with Social Media Adaptation and Intelligence
import { generateWithIntelligence, learnFromInteraction, autoSaveDraft, predictContentSuccess } from './intelligentAI';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Blog generation with different tones and lengths - Enhanced with Intelligence
export const generateBlogPost = async ({
  topic,
  tone = 'professional',
  length = 'medium',
  provider = 'openai',
  styleBible = '',
  useIntelligence = true,
  variationCount = 1,
  userContext = {}
}) => {
  try {
    let result;
    
    // Use intelligent generation if enabled
    if (useIntelligence) {
      try {
        const intelligentResult = await generateWithIntelligence({
          topic,
          tone,
          length,
          provider,
          styleBible,
          variationCount,
          userContext
        });
        
        if (intelligentResult.success && intelligentResult.variations.length > 0) {
          // Return the first variation in the expected format, with intelligence metadata
          result = {
            ...intelligentResult.variations[0],
            intelligenceInsights: intelligentResult.intelligenceInsights,
            allVariations: intelligentResult.variations
          };
          
          // Learn from this generation
          await learnFromInteraction({
            interactionType: 'blog_generation',
            data: { topic, tone, length, provider, styleBible },
            outcome: { success: true, userContext },
            context: userContext
          });
          
          return result;
        }
      } catch (intelligenceError) {
        console.warn('Intelligent generation failed, falling back to standard generation:', intelligenceError);
      }
    }

    // Fallback to standard generation
    const response = await fetch(`${API_BASE_URL}/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        topic,
        tone,
        length,
        provider,
        styleBible
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate blog post');
    }

    const data = await response.json();
    
    // Track usage
    await trackUsage('blog_generation', provider, data.tokensUsed || 0);
    
    // Auto-save if enabled
    if (useIntelligence && data.success) {
      try {
        await autoSaveDraft(data, userContext);
      } catch (saveError) {
        console.warn('Auto-save failed:', saveError);
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error generating blog post:', error);
    
    // Learn from errors if intelligence is enabled
    if (useIntelligence) {
      try {
        await learnFromInteraction({
          interactionType: 'blog_generation_error',
          data: { topic, tone, length, provider, error: error.message },
          outcome: { success: false, error: error.message },
          context: userContext
        });
      } catch (learningError) {
        console.warn('Learning from error failed:', learningError);
      }
    }
    
    throw error;
  }
};

// Generate title suggestions
export const generateTitleSuggestions = async ({
  topic,
  content,
  apiKey,
  provider = 'openai',
  count = 5
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/titles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        topic,
        content,
        provider,
        count
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate titles');
    }

    const data = await response.json();
    await trackUsage('title_generation', provider, data.tokensUsed || 0);
    
    return data;
  } catch (error) {
    console.error('Error generating titles:', error);
    throw error;
  }
};

// Social media content adaptation - Enhanced with Intelligence
export const adaptToSocialMedia = async ({
  blogContent,
  blogTitle,
  platform,
  apiKey,
  provider = 'openai',
  useIntelligence = true,
  userContext = {}
}) => {
  try {
    // Predict content success for social media adaptation
    let predictionScore = null;
    if (useIntelligence) {
      try {
        const prediction = await predictContentSuccess(
          { title: blogTitle, content: blogContent },
          { ...userContext, platform }
        );
        predictionScore = prediction;
      } catch (predictionError) {
        console.warn('Content prediction failed:', predictionError);
      }
    }

    const response = await fetch(`${API_BASE_URL}/ai/social`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        blogContent,
        blogTitle,
        platform,
        provider,
        predictionScore: predictionScore?.score || null
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to adapt content');
    }

    const data = await response.json();
    await trackUsage('social_adaptation', provider, data.tokensUsed || 0);
    
    // Learn from social media adaptation
    if (useIntelligence) {
      try {
        await learnFromInteraction({
          interactionType: 'social_adaptation',
          data: { blogTitle, platform, provider, predictionScore },
          outcome: { success: true, adaptedContent: data },
          context: { ...userContext, platform }
        });
      } catch (learningError) {
        console.warn('Learning from social adaptation failed:', learningError);
      }
    }
    
    // Add intelligence metadata to response
    if (predictionScore) {
      data.intelligenceMetadata = {
        predictionScore,
        recommendations: predictionScore.recommendations || []
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error adapting to social media:', error);
    
    // Learn from errors
    if (useIntelligence) {
      try {
        await learnFromInteraction({
          interactionType: 'social_adaptation_error',
          data: { blogTitle, platform, provider, error: error.message },
          outcome: { success: false, error: error.message },
          context: { ...userContext, platform }
        });
      } catch (learningError) {
        console.warn('Learning from social adaptation error failed:', learningError);
      }
    }
    
    throw error;
  }
};

// Generate all social media variations at once
export const generateAllSocialVariations = async ({
  blogContent,
  blogTitle,
  apiKey,
  provider = 'openai'
}) => {
  try {
    const platforms = ['linkedin', 'twitter', 'facebook', 'instagram'];
    const promises = platforms.map(platform =>
      adaptToSocialMedia({
        blogContent,
        blogTitle,
        platform,
        provider
      })
    );

    const results = await Promise.allSettled(promises);
    
    const variations = {};
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        variations[platforms[index]] = result.value;
      } else {
        console.error(`Failed to generate ${platforms[index]} variation:`, result.reason);
        variations[platforms[index]] = {
          error: result.reason.message
        };
      }
    });

    return variations;
  } catch (error) {
    console.error('Error generating social variations:', error);
    throw error;
  }
};

// API Key Management
export const saveApiKey = async (provider, apiKey, name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/keys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        provider,
        apiKey,
        name
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save API key');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving API key:', error);
    throw error;
  }
};

export const getApiKeys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/keys`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch API keys');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching API keys:', error);
    throw error;
  }
};

export const deleteApiKey = async (keyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/keys/${keyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete API key');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting API key:', error);
    throw error;
  }
};

// Validate API Key
export const validateApiKey = async (provider, apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/validate-key`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({
        provider,
        apiKey
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid API key');
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating API key:', error);
    throw error;
  }
};

// Usage Statistics
export const getUsageStats = async (period = 'month') => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/usage?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch usage stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    throw error;
  }
};

// Track usage locally before sending to server
const trackUsage = async (action, provider, tokens) => {
  try {
    // Store usage data temporarily in case of offline
    const usage = {
      action,
      provider,
      tokens,
      timestamp: new Date().toISOString()
    };

    // Try to send to server
    await fetch(`${API_BASE_URL}/ai/track-usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(usage)
    });
  } catch (error) {
    // Store locally if failed
    const localUsage = JSON.parse(localStorage.getItem('ai-usage-pending') || '[]');
    localUsage.push({
      action,
      provider,
      tokens,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('ai-usage-pending', JSON.stringify(localUsage));
  }
};

// Sync pending usage data
export const syncPendingUsage = async () => {
  const pending = JSON.parse(localStorage.getItem('ai-usage-pending') || '[]');
  if (pending.length === 0) return;

  try {
    await fetch(`${API_BASE_URL}/ai/track-usage/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify({ usage: pending })
    });

    // Clear pending if successful
    localStorage.removeItem('ai-usage-pending');
  } catch (error) {
    console.error('Failed to sync usage data:', error);
  }
};

// Content length configurations
export const CONTENT_LENGTHS = {
  short: { min: 500, max: 1000, label: 'Short (500-1000 words)' },
  medium: { min: 1000, max: 2000, label: 'Medium (1000-2000 words)' },
  long: { min: 2000, max: 3000, label: 'Long (2000-3000 words)' }
};

// Tone options
export const TONE_OPTIONS = {
  casual: { label: 'Casual', description: 'Friendly and conversational' },
  professional: { label: 'Professional', description: 'Formal and authoritative' },
  expert: { label: 'Expert', description: 'Technical and detailed' }
};

// Social media platform configurations
export const SOCIAL_PLATFORMS = {
  linkedin: {
    name: 'LinkedIn',
    maxLength: 1300,
    minLength: 300,
    icon: '💼',
    tips: 'Professional tone, industry insights, thought leadership'
  },
  twitter: {
    name: 'Twitter/X',
    maxLength: 280,
    threadSupport: true,
    icon: '🐦',
    tips: 'Concise, engaging, use relevant hashtags'
  },
  facebook: {
    name: 'Facebook',
    maxLength: 63206,
    optimal: 500,
    icon: '📘',
    tips: 'Engaging, shareable, community-focused'
  },
  instagram: {
    name: 'Instagram',
    maxLength: 2200,
    hashtagLimit: 30,
    icon: '📷',
    tips: 'Visual focus, storytelling, relevant hashtags'
  }
};

// ============================================================================
// NEW INTELLIGENT AI FUNCTIONS
// ============================================================================

/**
 * Generate content with AI intelligence and learning
 */
export const generateIntelligentContent = async (params) => {
  return await generateWithIntelligence(params);
};

/**
 * Get content success prediction
 */
export const getContentPrediction = async (content, context = {}) => {
  return await predictContentSuccess(content, context);
};

/**
 * Learn from user interactions
 */
export const recordInteraction = async (interactionData) => {
  return await learnFromInteraction(interactionData);
};

/**
 * Auto-save content drafts with version control
 */
export const saveDraftWithVersionControl = async (content, context = {}) => {
  return await autoSaveDraft(content, context);
};

/**
 * Get learning insights and recommendations
 */
export const getLearningInsights = async (timeframe = '7d') => {
  try {
    const { analyzeUserPatterns } = await import('./intelligentAI');
    return await analyzeUserPatterns(timeframe);
  } catch (error) {
    console.error('Error getting learning insights:', error);
    return null;
  }
};

/**
 * Get saved drafts with intelligence metadata
 */
export const getIntelligentDrafts = () => {
  try {
    const drafts = JSON.parse(localStorage.getItem('ai-drafts') || '[]');
    return drafts.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting intelligent drafts:', error);
    return [];
  }
};

/**
 * Optimize existing content using AI intelligence
 */
export const optimizeExistingContent = async ({
  content,
  context = {},
  optimizationGoals = ['engagement', 'readability', 'seo']
}) => {
  try {
    const { optimizeContent } = await import('./intelligentAI');
    return await optimizeContent({ content, context, optimizationGoals });
  } catch (error) {
    console.error('Error optimizing content:', error);
    throw error;
  }
};

/**
 * Process content critique with AI intelligence
 */
export const processContentCritique = async ({
  content,
  userFeedback,
  context = {},
  improvementAreas = []
}) => {
  try {
    const { processIntelligentCritique } = await import('./intelligentAI');
    return await processIntelligentCritique({
      content,
      userFeedback,
      context,
      improvementAreas
    });
  } catch (error) {
    console.error('Error processing content critique:', error);
    throw error;
  }
};

/**
 * Track content performance for learning
 */
export const trackContentPerformance = async ({
  contentId,
  metrics,
  context = {}
}) => {
  try {
    await learnFromInteraction({
      interactionType: 'content_performance',
      data: { contentId, metrics },
      outcome: { 
        success: metrics.engagement > 0.5,
        engagement: metrics.engagement,
        userRating: metrics.userRating
      },
      context
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error tracking content performance:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get AI-generated content recommendations
 */
export const getContentRecommendations = async (userContext = {}) => {
  try {
    const patterns = await getLearningInsights();
    
    if (!patterns) {
      return {
        topics: ['pickleball fundamentals', 'tournament preparation', 'mental game'],
        tones: ['professional', 'casual', 'expert'],
        recommendations: ['Consider writing about recent tournament experiences']
      };
    }

    const recommendations = [];
    
    // Topic recommendations based on successful patterns
    if (patterns.contentPreferences?.topicSuccess) {
      const topTopics = Object.entries(patterns.contentPreferences.topicSuccess)
        .sort(([,a], [,b]) => b.successRate - a.successRate)
        .slice(0, 3)
        .map(([topic]) => topic);
      recommendations.push(`Focus on ${topTopics.join(', ')} topics based on past success`);
    }

    // Tone recommendations
    if (patterns.contentPreferences?.toneSuccess) {
      const bestTone = Object.entries(patterns.contentPreferences.toneSuccess)
        .sort(([,a], [,b]) => b.engagement - a.engagement)[0];
      if (bestTone) {
        recommendations.push(`${bestTone[0]} tone shows highest engagement`);
      }
    }

    return {
      topics: patterns.contentPreferences?.preferredTopics || [],
      tones: patterns.contentPreferences?.preferredTones || [],
      recommendations
    };
  } catch (error) {
    console.error('Error getting content recommendations:', error);
    return { topics: [], tones: [], recommendations: [] };
  }
};