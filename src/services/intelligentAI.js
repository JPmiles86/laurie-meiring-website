// Intelligent AI Service with Learning Algorithms
// Integrates learning capabilities with content generation for adaptive AI

import { generateBlogPost, adaptToSocialMedia, getApiKeys } from './ai';
import { trackEvent } from './analytics';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const LEARNING_STORAGE_KEY = 'intelligent-ai-learning-data';
const USER_PATTERNS_KEY = 'intelligent-ai-user-patterns';
const CONTENT_PERFORMANCE_KEY = 'intelligent-ai-content-performance';

// ============================================================================
// CORE INTELLIGENT AI SERVICE CLASS
// ============================================================================

class IntelligentAIService {
  constructor() {
    this.learningData = this.loadLearningData();
    this.userPatterns = this.loadUserPatterns();
    this.contentPerformance = this.loadContentPerformance();
    this.initializeDefaults();
  }

  // Initialize default learning parameters
  initializeDefaults() {
    if (!this.learningData.preferences) {
      this.learningData.preferences = {
        tonePreferences: {},
        lengthPreferences: {},
        topicPreferences: {},
        providerPreferences: {},
        styleBibleUsage: { frequency: 0, effectiveness: 0 }
      };
    }

    if (!this.learningData.interactions) {
      this.learningData.interactions = [];
    }

    if (!this.learningData.adaptivePrompts) {
      this.learningData.adaptivePrompts = {
        successful: [],
        unsuccessful: [],
        patterns: {}
      };
    }
  }

  // ============================================================================
  // CORE INTELLIGENT GENERATION METHODS
  // ============================================================================

  /**
   * Generate content with intelligence - learns from past interactions
   */
  async generateWithIntelligence({
    topic,
    tone = 'professional',
    length = 'medium',
    provider = 'openai',
    styleBible = '',
    variationCount = 1,
    userContext = {}
  }) {
    try {
      // Analyze user patterns to optimize parameters
      const optimizedParams = await this.optimizeGenerationParameters({
        topic, tone, length, provider, styleBible, userContext
      });

      // Generate enhanced prompts based on learning
      const enhancedPrompts = await this.generateAdaptivePrompts({
        topic: optimizedParams.topic,
        tone: optimizedParams.tone,
        styleBible: optimizedParams.styleBible,
        userContext
      });

      // Track generation start
      const generationId = this.createGenerationId();
      const startTime = Date.now();

      // Generate variations with intelligence
      const variations = [];
      for (let i = 0; i < variationCount; i++) {
        const result = await generateBlogPost({
          topic: enhancedPrompts.topic || optimizedParams.topic,
          tone: optimizedParams.tone,
          length: optimizedParams.length,
          provider: optimizedParams.provider,
          styleBible: enhancedPrompts.styleBible || optimizedParams.styleBible
        });

        if (result.success) {
          const enhancedResult = {
            ...result,
            generationId,
            variationNumber: i + 1,
            intelligenceMetadata: {
              optimizedParams,
              enhancedPrompts,
              predictionScore: await this.predictContentSuccess(result, userContext),
              learningInsights: await this.generateLearningInsights(result, userContext)
            }
          };

          variations.push(enhancedResult);
          
          // Auto-save draft
          await this.autoSaveDraft(enhancedResult, userContext);
        }
      }

      // Learn from generation
      await this.learnFromGeneration({
        generationId,
        parameters: optimizedParams,
        results: variations,
        duration: Date.now() - startTime,
        userContext
      });

      return {
        success: true,
        variations,
        intelligenceInsights: {
          optimizationsApplied: optimizedParams,
          predictedPerformance: variations.map(v => v.intelligenceMetadata.predictionScore),
          learningRecommendations: await this.generateRecommendations(variations, userContext)
        }
      };

    } catch (error) {
      console.error('Error in intelligent generation:', error);
      await this.learnFromError(error, { topic, tone, length, provider });
      throw error;
    }
  }

  /**
   * Process intelligent critique with learning
   */
  async processIntelligentCritique({
    content,
    userFeedback,
    context = {},
    improvementAreas = []
  }) {
    try {
      // Analyze the critique using AI
      const critiqueAnalysis = await this.analyzeCritique({
        content,
        userFeedback,
        context
      });

      // Learn from critique patterns
      await this.learnFromCritique({
        content,
        feedback: userFeedback,
        analysis: critiqueAnalysis,
        context
      });

      // Generate improvement suggestions
      const improvements = await this.generateImprovementSuggestions({
        content,
        critiqueAnalysis,
        improvementAreas,
        context
      });

      // Track critique interaction
      await this.trackCritiqueInteraction({
        content,
        feedback: userFeedback,
        improvements,
        context
      });

      return {
        success: true,
        analysis: critiqueAnalysis,
        improvements,
        learningInsights: await this.extractCritiqueLearnings(critiqueAnalysis, context)
      };

    } catch (error) {
      console.error('Error processing intelligent critique:', error);
      throw error;
    }
  }

  /**
   * Predict content success based on learned patterns
   */
  async predictContentSuccess(content, context = {}) {
    try {
      const features = await this.extractContentFeatures(content);
      const historicalData = this.getHistoricalPerformanceData();
      
      // Pattern matching with historical successful content
      const patternScore = this.calculatePatternMatchScore(features, historicalData.successful);
      
      // User preference alignment score
      const preferenceScore = this.calculatePreferenceScore(features, context);
      
      // Trend analysis score
      const trendScore = await this.calculateTrendScore(features, context);
      
      // Combine scores with weighted algorithm
      const predictionScore = this.combineScores({
        pattern: patternScore * 0.4,
        preference: preferenceScore * 0.3,
        trend: trendScore * 0.3
      });

      return {
        score: predictionScore,
        confidence: this.calculateConfidence(historicalData.sampleSize),
        factors: {
          patternMatch: patternScore,
          userAlignment: preferenceScore,
          trendRelevance: trendScore
        },
        recommendations: this.generatePredictionRecommendations(features, predictionScore)
      };

    } catch (error) {
      console.error('Error predicting content success:', error);
      return { score: 0.5, confidence: 0.1, error: error.message };
    }
  }

  /**
   * Analyze user patterns and behavior
   */
  async analyzeUserPatterns(timeframe = '30d') {
    try {
      const interactions = this.getInteractionsByTimeframe(timeframe);
      
      const patterns = {
        // Content preferences
        contentPreferences: this.analyzeContentPreferences(interactions),
        
        // Usage patterns
        usagePatterns: this.analyzeUsagePatterns(interactions),
        
        // Success patterns
        successPatterns: this.analyzeSuccessPatterns(interactions),
        
        // Behavioral insights
        behavioralInsights: this.extractBehavioralInsights(interactions),
        
        // Trend analysis
        trends: this.analyzeTrends(interactions)
      };

      // Update user patterns storage
      this.userPatterns = { ...this.userPatterns, ...patterns, lastUpdated: Date.now() };
      this.saveUserPatterns();

      return patterns;

    } catch (error) {
      console.error('Error analyzing user patterns:', error);
      throw error;
    }
  }

  /**
   * Optimize content based on learning insights
   */
  async optimizeContent({ content, context = {}, optimizationGoals = [] }) {
    try {
      const currentFeatures = await this.extractContentFeatures(content);
      const patterns = await this.analyzeUserPatterns();
      
      const optimizations = [];

      // Apply learned optimizations
      for (const goal of optimizationGoals) {
        const optimization = await this.generateOptimization({
          content,
          currentFeatures,
          patterns,
          goal,
          context
        });
        
        if (optimization.confidence > 0.6) {
          optimizations.push(optimization);
        }
      }

      // Apply optimizations
      let optimizedContent = content;
      for (const opt of optimizations) {
        optimizedContent = await this.applyOptimization(optimizedContent, opt);
      }

      return {
        success: true,
        originalContent: content,
        optimizedContent,
        optimizationsApplied: optimizations,
        expectedImprovement: this.calculateExpectedImprovement(optimizations)
      };

    } catch (error) {
      console.error('Error optimizing content:', error);
      throw error;
    }
  }

  /**
   * Learn from user interactions in real-time
   */
  async learnFromInteraction({
    interactionType,
    data,
    outcome,
    context = {},
    timestamp = Date.now()
  }) {
    try {
      const interaction = {
        id: this.generateInteractionId(),
        type: interactionType,
        data,
        outcome,
        context,
        timestamp,
        learningValue: this.calculateLearningValue(data, outcome)
      };

      // Add to interaction history
      this.learningData.interactions.push(interaction);

      // Update preferences based on interaction
      await this.updatePreferencesFromInteraction(interaction);

      // Update adaptive prompts
      await this.updateAdaptivePrompts(interaction);

      // Update success patterns
      await this.updateSuccessPatterns(interaction);

      // Prune old interactions to maintain performance
      this.pruneOldInteractions();

      // Save learning data
      this.saveLearningData();

      // Track learning event
      trackEvent('ai_learning_interaction', {
        type: interactionType,
        learningValue: interaction.learningValue
      });

      return {
        success: true,
        interactionId: interaction.id,
        learningImpact: interaction.learningValue
      };

    } catch (error) {
      console.error('Error learning from interaction:', error);
      throw error;
    }
  }

  // ============================================================================
  // AUTO-SAVE AND VERSION CONTROL INTEGRATION
  // ============================================================================

  /**
   * Auto-save drafts with version control
   */
  async autoSaveDraft(content, context = {}) {
    try {
      const draftData = {
        id: this.generateDraftId(),
        content,
        context,
        timestamp: Date.now(),
        version: this.getNextVersionNumber(content.title),
        intelligenceMetadata: content.intelligenceMetadata || {}
      };

      // Save to local storage
      await this.saveDraftLocally(draftData);

      // Attempt to save to server if available
      try {
        await this.saveDraftToServer(draftData);
      } catch (serverError) {
        console.warn('Server save failed, draft saved locally:', serverError.message);
      }

      return draftData;

    } catch (error) {
      console.error('Error auto-saving draft:', error);
      throw error;
    }
  }

  /**
   * Save draft locally with version control
   */
  async saveDraftLocally(draftData) {
    const drafts = JSON.parse(localStorage.getItem('ai-drafts') || '[]');
    drafts.push(draftData);
    
    // Keep only last 50 drafts to prevent storage overflow
    if (drafts.length > 50) {
      drafts.splice(0, drafts.length - 50);
    }
    
    localStorage.setItem('ai-drafts', JSON.stringify(drafts));
  }

  /**
   * Save draft to server
   */
  async saveDraftToServer(draftData) {
    const response = await fetch(`${API_BASE_URL}/ai/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(draftData)
    });

    if (!response.ok) {
      throw new Error('Failed to save draft to server');
    }

    return await response.json();
  }

  // ============================================================================
  // LEARNING ALGORITHM IMPLEMENTATIONS
  // ============================================================================

  /**
   * Optimize generation parameters based on learned patterns
   */
  async optimizeGenerationParameters(params) {
    const { topic, tone, length, provider, styleBible, userContext } = params;
    const patterns = this.userPatterns;
    
    const optimized = { ...params };

    // Optimize tone based on successful patterns
    if (patterns.contentPreferences?.toneSuccess) {
      const bestTone = this.findBestTone(topic, patterns.contentPreferences.toneSuccess);
      if (bestTone && bestTone !== tone) {
        optimized.tone = bestTone;
        optimized._optimizations = optimized._optimizations || [];
        optimized._optimizations.push(`Tone optimized from ${tone} to ${bestTone}`);
      }
    }

    // Optimize length based on engagement patterns
    if (patterns.usagePatterns?.lengthEngagement) {
      const bestLength = this.findBestLength(topic, patterns.usagePatterns.lengthEngagement);
      if (bestLength && bestLength !== length) {
        optimized.length = bestLength;
        optimized._optimizations = optimized._optimizations || [];
        optimized._optimizations.push(`Length optimized from ${length} to ${bestLength}`);
      }
    }

    // Optimize provider based on success rates
    if (patterns.successPatterns?.providerPerformance) {
      const bestProvider = this.findBestProvider(topic, patterns.successPatterns.providerPerformance);
      if (bestProvider && bestProvider !== provider) {
        optimized.provider = bestProvider;
        optimized._optimizations = optimized._optimizations || [];
        optimized._optimizations.push(`Provider optimized from ${provider} to ${bestProvider}`);
      }
    }

    return optimized;
  }

  /**
   * Generate adaptive prompts based on learning
   */
  async generateAdaptivePrompts({ topic, tone, styleBible, userContext }) {
    const adaptiveData = this.learningData.adaptivePrompts;
    const enhanced = {};

    // Enhance topic with successful patterns
    if (adaptiveData.patterns.topicEnhancements) {
      const enhancement = this.findTopicEnhancement(topic, adaptiveData.patterns.topicEnhancements);
      if (enhancement) {
        enhanced.topic = `${topic} ${enhancement}`;
      }
    }

    // Enhance style bible with learned improvements
    if (adaptiveData.patterns.styleBibleImprovements && styleBible) {
      const improvement = this.findStyleBibleImprovement(styleBible, adaptiveData.patterns.styleBibleImprovements);
      if (improvement) {
        enhanced.styleBible = `${styleBible}\n\nAdditional guidance: ${improvement}`;
      }
    }

    return enhanced;
  }

  /**
   * Extract content features for analysis
   */
  async extractContentFeatures(content) {
    const features = {};

    // Basic text features
    features.wordCount = content.content ? content.content.split(' ').length : 0;
    features.title = content.title || '';
    features.excerpt = content.excerpt || '';
    features.tags = content.tags || [];

    // Content structure features
    const htmlContent = content.content || '';
    features.headingCount = (htmlContent.match(/<h[1-6]/gi) || []).length;
    features.paragraphCount = (htmlContent.match(/<p>/gi) || []).length;
    features.listCount = (htmlContent.match(/<[uo]l>/gi) || []).length;

    // Topic analysis
    features.topics = this.extractTopics(content.title + ' ' + content.content);
    features.sentiment = this.analyzeSentiment(content.content);
    features.readabilityscore = this.calculateReadability(content.content);

    // Engagement indicators
    features.questionCount = (content.content.match(/\?/g) || []).length;
    features.exclamationCount = (content.content.match(/!/g) || []).length;
    features.callToActionCount = this.countCallsToAction(content.content);

    return features;
  }

  /**
   * Update preferences from user interactions
   */
  async updatePreferencesFromInteraction(interaction) {
    const { type, data, outcome } = interaction;

    // Update tone preferences
    if (data.tone && outcome.success) {
      if (!this.learningData.preferences.tonePreferences[data.tone]) {
        this.learningData.preferences.tonePreferences[data.tone] = { successes: 0, attempts: 0 };
      }
      this.learningData.preferences.tonePreferences[data.tone].successes++;
      this.learningData.preferences.tonePreferences[data.tone].attempts++;
    }

    // Update length preferences
    if (data.length && outcome.engagement) {
      if (!this.learningData.preferences.lengthPreferences[data.length]) {
        this.learningData.preferences.lengthPreferences[data.length] = { engagement: 0, count: 0 };
      }
      this.learningData.preferences.lengthPreferences[data.length].engagement += outcome.engagement;
      this.learningData.preferences.lengthPreferences[data.length].count++;
    }

    // Update topic preferences
    if (data.topic && outcome.userRating) {
      const topics = this.extractTopics(data.topic);
      topics.forEach(topic => {
        if (!this.learningData.preferences.topicPreferences[topic]) {
          this.learningData.preferences.topicPreferences[topic] = { rating: 0, count: 0 };
        }
        this.learningData.preferences.topicPreferences[topic].rating += outcome.userRating;
        this.learningData.preferences.topicPreferences[topic].count++;
      });
    }
  }

  // ============================================================================
  // UTILITY AND HELPER METHODS
  // ============================================================================

  /**
   * Load learning data from storage
   */
  loadLearningData() {
    try {
      const data = localStorage.getItem(LEARNING_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading learning data:', error);
      return {};
    }
  }

  /**
   * Save learning data to storage
   */
  saveLearningData() {
    try {
      localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(this.learningData));
    } catch (error) {
      console.error('Error saving learning data:', error);
    }
  }

  /**
   * Load user patterns from storage
   */
  loadUserPatterns() {
    try {
      const data = localStorage.getItem(USER_PATTERNS_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading user patterns:', error);
      return {};
    }
  }

  /**
   * Save user patterns to storage
   */
  saveUserPatterns() {
    try {
      localStorage.setItem(USER_PATTERNS_KEY, JSON.stringify(this.userPatterns));
    } catch (error) {
      console.error('Error saving user patterns:', error);
    }
  }

  /**
   * Load content performance data
   */
  loadContentPerformance() {
    try {
      const data = localStorage.getItem(CONTENT_PERFORMANCE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading content performance:', error);
      return {};
    }
  }

  /**
   * Generate unique IDs
   */
  createGenerationId() {
    return `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateInteractionId() {
    return `int_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateDraftId() {
    return `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Calculate learning value from interaction
   */
  calculateLearningValue(data, outcome) {
    let value = 0;
    
    // Base value for any interaction
    value += 0.1;
    
    // Bonus for successful outcomes
    if (outcome.success) value += 0.3;
    if (outcome.userRating > 4) value += 0.5;
    if (outcome.engagement > 0.7) value += 0.3;
    
    // Penalty for poor outcomes
    if (outcome.userRating < 2) value -= 0.2;
    if (outcome.engagement < 0.3) value -= 0.1;
    
    return Math.max(0, Math.min(1, value));
  }

  /**
   * Extract topics from text
   */
  extractTopics(text) {
    const commonTopics = [
      'pickleball', 'tournament', 'training', 'technique', 'strategy',
      'costa rica', 'coaching', 'fitness', 'mental game', 'equipment'
    ];
    
    const lowerText = text.toLowerCase();
    return commonTopics.filter(topic => lowerText.includes(topic));
  }

  /**
   * Simple sentiment analysis
   */
  analyzeSentiment(text) {
    const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'disappointed'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Basic readability calculation
   */
  calculateReadability(text) {
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Simple score based on average sentence length
    if (avgWordsPerSentence < 15) return 'easy';
    if (avgWordsPerSentence < 25) return 'medium';
    return 'difficult';
  }

  /**
   * Count call-to-action phrases
   */
  countCallsToAction(text) {
    const ctaPhrases = [
      'click here', 'read more', 'learn more', 'sign up', 'get started',
      'contact us', 'book now', 'try now', 'download', 'subscribe'
    ];
    
    const lowerText = text.toLowerCase();
    return ctaPhrases.filter(phrase => lowerText.includes(phrase)).length;
  }

  /**
   * Prune old interactions to maintain performance
   */
  pruneOldInteractions(maxAge = 30 * 24 * 60 * 60 * 1000) { // 30 days
    const cutoff = Date.now() - maxAge;
    this.learningData.interactions = this.learningData.interactions.filter(
      interaction => interaction.timestamp > cutoff
    );
  }

  // Placeholder methods for complex algorithms (to be implemented)
  async analyzeCritique(params) { return { score: 0.7, insights: [] }; }
  async learnFromCritique(params) { return true; }
  async generateImprovementSuggestions(params) { return []; }
  async trackCritiqueInteraction(params) { return true; }
  async extractCritiqueLearnings(params) { return {}; }
  getHistoricalPerformanceData() { return { successful: [], sampleSize: 0 }; }
  calculatePatternMatchScore(features, historical) { return 0.5; }
  calculatePreferenceScore(features, context) { return 0.5; }
  async calculateTrendScore(features, context) { return 0.5; }
  combineScores(scores) { return Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length; }
  calculateConfidence(sampleSize) { return Math.min(1, sampleSize / 100); }
  generatePredictionRecommendations(features, score) { return []; }
  getInteractionsByTimeframe(timeframe) { return this.learningData.interactions || []; }
  analyzeContentPreferences(interactions) { return {}; }
  analyzeUsagePatterns(interactions) { return {}; }
  analyzeSuccessPatterns(interactions) { return {}; }
  extractBehavioralInsights(interactions) { return {}; }
  analyzeTrends(interactions) { return {}; }
  async generateOptimization(params) { return { confidence: 0.5, changes: [] }; }
  async applyOptimization(content, optimization) { return content; }
  calculateExpectedImprovement(optimizations) { return 0.1; }
  async updateAdaptivePrompts(interaction) { return true; }
  async updateSuccessPatterns(interaction) { return true; }
  findBestTone(topic, patterns) { return null; }
  findBestLength(topic, patterns) { return null; }
  findBestProvider(topic, patterns) { return null; }
  findTopicEnhancement(topic, patterns) { return null; }
  findStyleBibleImprovement(styleBible, patterns) { return null; }
  async generateLearningInsights(result, context) { return {}; }
  async learnFromGeneration(params) { return true; }
  async learnFromError(error, params) { return true; }
  async generateRecommendations(variations, context) { return []; }
  getNextVersionNumber(title) { return 1; }
}

// ============================================================================
// EXPORTED FUNCTIONS AND SINGLETON INSTANCE
// ============================================================================

// Create singleton instance
const intelligentAI = new IntelligentAIService();

// Export main functions
export const generateWithIntelligence = (params) => intelligentAI.generateWithIntelligence(params);
export const processIntelligentCritique = (params) => intelligentAI.processIntelligentCritique(params);
export const predictContentSuccess = (content, context) => intelligentAI.predictContentSuccess(content, context);
export const analyzeUserPatterns = (timeframe) => intelligentAI.analyzeUserPatterns(timeframe);
export const optimizeContent = (params) => intelligentAI.optimizeContent(params);
export const learnFromInteraction = (params) => intelligentAI.learnFromInteraction(params);
export const autoSaveDraft = (content, context) => intelligentAI.autoSaveDraft(content, context);

// Export utility functions
export const getLearningData = () => intelligentAI.learningData;
export const getUserPatterns = () => intelligentAI.userPatterns;
export const getContentPerformance = () => intelligentAI.contentPerformance;

// Export the service instance for advanced usage
export default intelligentAI;