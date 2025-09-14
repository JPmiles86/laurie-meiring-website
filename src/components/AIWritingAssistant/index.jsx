import React, { useState, useEffect } from 'react';
import { AlertCircle, Sparkles, Settings, BookOpen, Eye, Edit3, Key, RefreshCw, Lightbulb, Share2, BarChart3, Image, Brain, TrendingUp, Archive, Target } from 'lucide-react';
import StyleBibleManager from './StyleBibleManager';
import ApiKeyManager from '../APIKeyManager';
import SocialMediaAdapter from '../SocialMediaAdapter';
import InputPanel from './InputPanel';
import VariationDisplay from './VariationDisplay';
import IdeaGenerator from './IdeaGenerator';
import ImageGenerationPanel from './ImageGenerationPanel';
import useAIGeneration from './hooks/useAIGeneration';
import { 
  generateBlogPost, 
  CONTENT_LENGTHS, 
  TONE_OPTIONS, 
  getApiKeys,
  getContentPrediction,
  getLearningInsights,
  getIntelligentDrafts,
  recordInteraction,
  getContentRecommendations
} from '../../services/ai';
import { getLocalUsageStats, trackEvent } from '../../services/analytics';
import './styles/AIAssistant.css';

const AIWritingAssistant = ({ onEditBlog }) => {
  const [hasValidApiKey, setHasValidApiKey] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [blogIdea, setBlogIdea] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedVariations, setGeneratedVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showStyleBible, setShowStyleBible] = useState(false);
  const [showSocialAdapter, setShowSocialAdapter] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [variationCount, setVariationCount] = useState(2);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedVariations, setComparedVariations] = useState([]);
  const [showIdeaGenerator, setShowIdeaGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [usageStats, setUsageStats] = useState(null);
  
  // Intelligent AI features state
  const [intelligenceEnabled, setIntelligenceEnabled] = useState(true);
  const [learningInsights, setLearningInsights] = useState(null);
  const [contentPredictions, setContentPredictions] = useState({});
  const [intelligentDrafts, setIntelligentDrafts] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [showLearningInsights, setShowLearningInsights] = useState(false);

  // Check for valid API keys on mount and when settings close
  useEffect(() => {
    checkApiKeys();
    loadUsageStats();
    loadIntelligentFeatures();
  }, []);

  // Load intelligent features and insights
  const loadIntelligentFeatures = async () => {
    if (!intelligenceEnabled) return;

    try {
      // Load learning insights
      const insights = await getLearningInsights();
      setLearningInsights(insights);

      // Load intelligent drafts
      const drafts = getIntelligentDrafts();
      setIntelligentDrafts(drafts);

      // Load content recommendations
      const recs = await getContentRecommendations();
      setRecommendations(recs);
    } catch (error) {
      console.warn('Failed to load intelligent features:', error);
    }
  };

  const checkApiKeys = async () => {
    try {
      const response = await getApiKeys();
      if (response.success && response.keys && response.keys.length > 0) {
        setHasValidApiKey(true);
        // Set the first available provider
        if (response.keys[0]) {
          setSelectedProvider(response.keys[0].provider);
        }
      } else {
        setHasValidApiKey(false);
      }
    } catch (error) {
      console.error('Error checking API keys:', error);
      setHasValidApiKey(false);
    }
  };

  const loadUsageStats = () => {
    const stats = getLocalUsageStats('week');
    setUsageStats(stats);
  };

  const handleGenerate = async () => {
    if (!hasValidApiKey) {
      setError('Please configure your API key first');
      setShowSettings(true);
      return;
    }

    if (!blogIdea.trim()) {
      setError('Please enter a blog idea');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    const styleBible = localStorage.getItem('style-bible') || '';
    
    try {
      // Track generation start
      trackEvent('blog_generation_started', {
        provider: selectedProvider,
        tone,
        length,
        variationCount,
        intelligenceEnabled
      });

      // Generate with intelligence if enabled
      const userContext = {
        sessionId: Date.now(),
        userPreferences: { tone, length, provider: selectedProvider },
        blogTopic: blogIdea
      };

      const result = await generateBlogPost({
        topic: blogIdea,
        tone,
        length,
        provider: selectedProvider,
        styleBible,
        useIntelligence: intelligenceEnabled,
        variationCount,
        userContext
      });

      if (result.success) {
        let variations = [];

        // Handle intelligent generation result
        if (result.allVariations && result.allVariations.length > 0) {
          variations = result.allVariations.map((variation, i) => ({
            id: Date.now() + i,
            ...variation,
            variationNumber: i + 1
          }));
        } else {
          // Single variation result
          variations = [{
            id: Date.now(),
            ...result,
            variationNumber: 1
          }];
        }

        setGeneratedVariations(variations);
        setSelectedVariation(variations[0]);
        setActiveTab('preview');

        // Generate content predictions for each variation
        if (intelligenceEnabled) {
          const predictions = {};
          for (const variation of variations) {
            try {
              const prediction = await getContentPrediction(variation, userContext);
              predictions[variation.id] = prediction;
            } catch (predictionError) {
              console.warn('Failed to predict content success:', predictionError);
            }
          }
          setContentPredictions(predictions);

          // Record successful interaction
          await recordInteraction({
            interactionType: 'blog_generation_success',
            data: {
              topic: blogIdea,
              tone,
              length,
              provider: selectedProvider,
              variationsGenerated: variations.length,
              intelligenceInsights: result.intelligenceInsights
            },
            outcome: {
              success: true,
              engagement: 1.0,
              userRating: 5
            },
            context: userContext
          });

          // Refresh intelligent features
          loadIntelligentFeatures();
        }
        
        // Track successful generation
        trackEvent('blog_generation_completed', {
          provider: selectedProvider,
          variationsGenerated: variations.length,
          intelligenceUsed: intelligenceEnabled
        });
      } else {
        throw new Error('No variations were generated');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate content');
      
      // Record failed interaction for learning
      if (intelligenceEnabled) {
        try {
          await recordInteraction({
            interactionType: 'blog_generation_error',
            data: {
              topic: blogIdea,
              tone,
              length,
              provider: selectedProvider,
              error: err.message
            },
            outcome: {
              success: false,
              error: err.message
            },
            context: { sessionId: Date.now() }
          });
        } catch (recordError) {
          console.warn('Failed to record error interaction:', recordError);
        }
      }
      
      trackEvent('blog_generation_failed', {
        provider: selectedProvider,
        error: err.message,
        intelligenceEnabled
      });
    } finally {
      setIsGenerating(false);
      loadUsageStats(); // Refresh usage stats
    }
  };

  const handleEditInBlogEditor = (variation) => {
    const contentToEdit = variation || selectedVariation;
    if (contentToEdit && onEditBlog) {
      onEditBlog({
        title: contentToEdit.title,
        content: contentToEdit.content,
        excerpt: contentToEdit.excerpt,
        tags: contentToEdit.tags || []
      });
      
      trackEvent('blog_sent_to_editor', {
        variationId: contentToEdit.id
      });
    }
  };

  const toggleCompareVariation = (variation) => {
    setComparedVariations(prev => {
      const isAlreadyCompared = prev.find(v => v.id === variation.id);
      if (isAlreadyCompared) {
        return prev.filter(v => v.id !== variation.id);
      }
      if (prev.length >= 2) {
        return [prev[1], variation];
      }
      return [...prev, variation];
    });
  };

  const handleApiKeysUpdated = () => {
    checkApiKeys();
    setShowSettings(false);
  };

  return (
    <div className="ai-writing-assistant">
      <div className="assistant-header">
        <h2><Sparkles className="icon" /> AI Writing Assistant</h2>
        <div className="header-actions">
          {/* Intelligence Status Indicator */}
          <div className={`intelligence-indicator ${intelligenceEnabled ? 'active' : 'inactive'}`}>
            <Brain className="small-icon" />
            <span>{intelligenceEnabled ? 'AI Learning Active' : 'Standard Mode'}</span>
          </div>
          
          {/* Usage Stats */}
          {usageStats && usageStats.totalRequests > 0 && (
            <div className="usage-indicator">
              <BarChart3 className="small-icon" />
              <span>{usageStats.totalRequests} requests this week</span>
            </div>
          )}
          
          {/* Learning Insights Button */}
          {intelligenceEnabled && learningInsights && (
            <button 
              className="icon-button"
              onClick={() => setShowLearningInsights(!showLearningInsights)}
              title="Learning Insights"
            >
              <TrendingUp />
            </button>
          )}
          
          {/* Intelligent Drafts Button */}
          {intelligentDrafts.length > 0 && (
            <button 
              className="icon-button"
              onClick={() => setActiveTab('drafts')}
              title={`${intelligentDrafts.length} Intelligent Drafts`}
            >
              <Archive />
              <span className="badge">{intelligentDrafts.length}</span>
            </button>
          )}
          
          <button 
            className="icon-button"
            onClick={() => setShowIdeaGenerator(!showIdeaGenerator)}
            title="Idea Generator"
          >
            <Lightbulb />
          </button>
          <button 
            className="icon-button"
            onClick={() => setShowStyleBible(!showStyleBible)}
            title="Style Bible"
          >
            <BookOpen />
          </button>
          <button 
            className={`icon-button ${!hasValidApiKey ? 'highlight' : ''}`}
            onClick={() => setShowSettings(!showSettings)}
            title="API Key Settings"
          >
            <Key />
          </button>
          
          {/* Intelligence Toggle */}
          <button 
            className={`icon-button ${intelligenceEnabled ? 'active' : ''}`}
            onClick={() => setIntelligenceEnabled(!intelligenceEnabled)}
            title={`${intelligenceEnabled ? 'Disable' : 'Enable'} AI Intelligence`}
          >
            <Brain />
          </button>
        </div>
      </div>

      {!hasValidApiKey && (
        <div className="api-key-warning">
          <AlertCircle className="icon" />
          <span>No API key configured. Please add one to start generating content.</span>
          <button onClick={() => setShowSettings(true)}>Add API Key</button>
        </div>
      )}

      {showSettings && (
        <ApiKeyManager
          onClose={handleApiKeysUpdated}
          onKeysUpdated={handleApiKeysUpdated}
        />
      )}

      {showStyleBible && (
        <StyleBibleManager onClose={() => setShowStyleBible(false)} />
      )}

      {showIdeaGenerator && (
        <IdeaGenerator 
          onSelectIdea={(idea) => {
            setBlogIdea(idea);
            setShowIdeaGenerator(false);
            setActiveTab('generate');
          }}
          onClose={() => setShowIdeaGenerator(false)}
        />
      )}

      {/* Learning Insights Panel */}
      {showLearningInsights && learningInsights && (
        <div className="learning-insights-panel">
          <div className="panel-header">
            <h3><TrendingUp className="icon" /> Learning Insights</h3>
            <button onClick={() => setShowLearningInsights(false)}>×</button>
          </div>
          <div className="insights-content">
            {learningInsights.contentPreferences && (
              <div className="insight-section">
                <h4>Content Preferences</h4>
                <div className="preferences-grid">
                  {learningInsights.contentPreferences.preferredTones && (
                    <div>
                      <strong>Best Tones:</strong> {learningInsights.contentPreferences.preferredTones.join(', ')}
                    </div>
                  )}
                  {learningInsights.contentPreferences.preferredTopics && (
                    <div>
                      <strong>Popular Topics:</strong> {learningInsights.contentPreferences.preferredTopics.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}
            {recommendations && recommendations.recommendations.length > 0 && (
              <div className="insight-section">
                <h4>AI Recommendations</h4>
                <ul>
                  {recommendations.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="assistant-tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Content
        </button>
        <button 
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
          disabled={generatedVariations.length === 0}
        >
          Preview ({generatedVariations.length})
        </button>
        {intelligentDrafts.length > 0 && (
          <button 
            className={`tab ${activeTab === 'drafts' ? 'active' : ''}`}
            onClick={() => setActiveTab('drafts')}
          >
            <Archive className="tab-icon" />
            Drafts ({intelligentDrafts.length})
          </button>
        )}
        <button 
          className={`tab ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
          disabled={!selectedVariation}
        >
          <Share2 className="tab-icon" />
          Social Media
        </button>
        <button 
          className={`tab ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
          disabled={!selectedVariation}
        >
          <Image className="tab-icon" />
          Images
        </button>
        {generatedVariations.length > 1 && activeTab === 'preview' && (
          <button 
            className={`tab ${compareMode ? 'active' : ''}`}
            onClick={() => setCompareMode(!compareMode)}
          >
            Compare Mode
          </button>
        )}
      </div>

      {activeTab === 'generate' && (
        <InputPanel
          blogIdea={blogIdea}
          setBlogIdea={setBlogIdea}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          tone={tone}
          setTone={setTone}
          length={length}
          setLength={setLength}
          variationCount={variationCount}
          setVariationCount={setVariationCount}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          error={error}
          onOpenIdeaGenerator={() => setShowIdeaGenerator(true)}
          hasValidApiKey={hasValidApiKey}
          toneOptions={TONE_OPTIONS}
          lengthOptions={CONTENT_LENGTHS}
        />
      )}

      {activeTab === 'preview' && generatedVariations.length > 0 && (
        <div className="preview-with-intelligence">
          {/* Content Predictions Panel */}
          {intelligenceEnabled && Object.keys(contentPredictions).length > 0 && (
            <div className="predictions-panel">
              <h3><Target className="icon" /> Content Success Predictions</h3>
              {generatedVariations.map(variation => {
                const prediction = contentPredictions[variation.id];
                if (!prediction) return null;
                
                return (
                  <div key={variation.id} className={`prediction-card ${selectedVariation?.id === variation.id ? 'selected' : ''}`}>
                    <div className="prediction-header">
                      <span>Variation {variation.variationNumber}</span>
                      <div className={`prediction-score score-${Math.floor(prediction.score * 10)}`}>
                        {Math.round(prediction.score * 100)}% Success Probability
                      </div>
                    </div>
                    {prediction.factors && (
                      <div className="prediction-factors">
                        <div>Pattern Match: {Math.round(prediction.factors.patternMatch * 100)}%</div>
                        <div>User Alignment: {Math.round(prediction.factors.userAlignment * 100)}%</div>
                        <div>Trend Relevance: {Math.round(prediction.factors.trendRelevance * 100)}%</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          
          <VariationDisplay
            variations={generatedVariations}
            selectedVariation={selectedVariation}
            setSelectedVariation={setSelectedVariation}
            compareMode={compareMode}
            comparedVariations={comparedVariations}
            onToggleCompare={toggleCompareVariation}
            onEdit={handleEditInBlogEditor}
            contentPredictions={contentPredictions}
            intelligenceEnabled={intelligenceEnabled}
          />
        </div>
      )}

      {activeTab === 'drafts' && intelligentDrafts.length > 0 && (
        <div className="intelligent-drafts">
          <div className="drafts-header">
            <h3><Archive className="icon" /> Intelligent Drafts</h3>
            <span className="drafts-count">{intelligentDrafts.length} saved drafts</span>
          </div>
          <div className="drafts-list">
            {intelligentDrafts.map(draft => (
              <div key={draft.id} className="draft-card">
                <div className="draft-header">
                  <h4>{draft.content.title}</h4>
                  <div className="draft-meta">
                    <span className="draft-date">
                      {new Date(draft.timestamp).toLocaleDateString()}
                    </span>
                    <span className="draft-version">v{draft.version}</span>
                  </div>
                </div>
                <div className="draft-excerpt">
                  {draft.content.excerpt}
                </div>
                {draft.intelligenceMetadata && (
                  <div className="draft-intelligence">
                    <div className="intelligence-tag">
                      <Brain className="small-icon" />
                      AI Enhanced
                    </div>
                    {draft.intelligenceMetadata.predictionScore && (
                      <div className="prediction-tag">
                        <Target className="small-icon" />
                        {Math.round(draft.intelligenceMetadata.predictionScore.score * 100)}% Success
                      </div>
                    )}
                  </div>
                )}
                <div className="draft-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setGeneratedVariations([{
                        ...draft.content,
                        id: Date.now(),
                        variationNumber: 1
                      }]);
                      setSelectedVariation(draft.content);
                      setActiveTab('preview');
                    }}
                  >
                    Load Draft
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleEditInBlogEditor(draft.content)}
                  >
                    Edit in Blog Editor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'social' && selectedVariation && (
        <SocialMediaAdapter
          blogContent={selectedVariation.content}
          blogTitle={selectedVariation.title}
          provider={selectedProvider}
        />
      )}

      {activeTab === 'images' && selectedVariation && (
        <ImageGenerationPanel
          blogTitle={selectedVariation.title}
          blogContent={selectedVariation.content}
          provider={selectedProvider}
          apiKey={getApiKeys()[selectedProvider]}
          hasValidApiKey={hasValidApiKey}
          onImageSaved={(imageData) => {
            console.log('Image saved:', imageData);
            // Could add notification or update UI here
          }}
        />
      )}
    </div>
  );
};

export default AIWritingAssistant;