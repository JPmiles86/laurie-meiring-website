import React, { useState, useEffect } from 'react';
import { Copy, Check, AlertCircle, Loader2, Share2, RefreshCw } from 'lucide-react';
import { generateAllSocialVariations, SOCIAL_PLATFORMS } from '../services/ai';
import './SocialMediaAdapter.css';

const SocialMediaAdapter = ({ blogContent, blogTitle, provider = 'openai' }) => {
  const [variations, setVariations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [regenerating, setRegenerating] = useState({});

  useEffect(() => {
    if (blogContent && blogTitle) {
      generateVariations();
    }
  }, [blogContent, blogTitle]);

  const generateVariations = async () => {
    setLoading(true);
    setError('');
    
    try {
      const results = await generateAllSocialVariations({
        blogContent,
        blogTitle,
        provider
      });
      
      setVariations(results);
    } catch (err) {
      setError(err.message || 'Failed to generate social media variations');
    } finally {
      setLoading(false);
    }
  };

  const regeneratePlatform = async (platform) => {
    setRegenerating(prev => ({ ...prev, [platform]: true }));
    
    try {
      const { adaptToSocialMedia } = await import('../services/ai');
      const result = await adaptToSocialMedia({
        blogContent,
        blogTitle,
        platform,
        provider
      });
      
      setVariations(prev => ({
        ...prev,
        [platform]: result
      }));
    } catch (err) {
      console.error(`Failed to regenerate ${platform}:`, err);
      setVariations(prev => ({
        ...prev,
        [platform]: { error: err.message }
      }));
    } finally {
      setRegenerating(prev => ({ ...prev, [platform]: false }));
    }
  };

  const copyToClipboard = async (text, platform) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTwitterThread = (content) => {
    if (!content.thread || !Array.isArray(content.thread)) {
      return [content.content];
    }
    return content.thread;
  };

  const getCharacterCount = (text) => {
    return text ? text.length : 0;
  };

  const getCharacterPercentage = (text, platform) => {
    const length = getCharacterCount(text);
    const maxLength = SOCIAL_PLATFORMS[platform].maxLength;
    return Math.min((length / maxLength) * 100, 100);
  };

  if (!blogContent || !blogTitle) {
    return (
      <div className="social-adapter-empty">
        <Share2 className="empty-icon" />
        <p>Generate a blog post first to create social media variations</p>
      </div>
    );
  }

  return (
    <div className="social-media-adapter">
      <div className="adapter-header">
        <h3><Share2 className="icon" /> Social Media Adaptation</h3>
        {!loading && !error && Object.keys(variations).length > 0 && (
          <button 
            className="regenerate-all-button"
            onClick={generateVariations}
            disabled={loading}
          >
            <RefreshCw className="icon" />
            Regenerate All
          </button>
        )}
      </div>

      {loading && (
        <div className="adapter-loading">
          <Loader2 className="spinner" />
          <p>Generating social media variations...</p>
        </div>
      )}

      {error && (
        <div className="adapter-error">
          <AlertCircle className="icon" />
          <p>{error}</p>
          <button onClick={generateVariations}>Try Again</button>
        </div>
      )}

      {!loading && !error && Object.keys(variations).length > 0 && (
        <>
          <div className="platform-tabs">
            {Object.keys(SOCIAL_PLATFORMS).map(platform => (
              <button
                key={platform}
                className={`platform-tab ${selectedPlatform === platform ? 'active' : ''}`}
                onClick={() => setSelectedPlatform(platform)}
              >
                <span className="platform-icon">{SOCIAL_PLATFORMS[platform].icon}</span>
                {SOCIAL_PLATFORMS[platform].name}
                {variations[platform]?.error && (
                  <span className="error-indicator">!</span>
                )}
              </button>
            ))}
          </div>

          <div className="variation-content">
            {selectedPlatform && variations[selectedPlatform] && (
              <div className="platform-variation">
                {variations[selectedPlatform].error ? (
                  <div className="variation-error">
                    <AlertCircle className="icon" />
                    <p>Failed to generate {SOCIAL_PLATFORMS[selectedPlatform].name} content</p>
                    <button 
                      onClick={() => regeneratePlatform(selectedPlatform)}
                      disabled={regenerating[selectedPlatform]}
                    >
                      {regenerating[selectedPlatform] ? (
                        <><Loader2 className="spinner" /> Regenerating...</>
                      ) : (
                        <>Try Again</>
                      )}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="variation-header">
                      <div className="platform-info">
                        <h4>{SOCIAL_PLATFORMS[selectedPlatform].name}</h4>
                        <p className="platform-tips">{SOCIAL_PLATFORMS[selectedPlatform].tips}</p>
                      </div>
                      <div className="variation-actions">
                        <button
                          className="icon-button"
                          onClick={() => regeneratePlatform(selectedPlatform)}
                          disabled={regenerating[selectedPlatform]}
                          title="Regenerate"
                        >
                          {regenerating[selectedPlatform] ? (
                            <Loader2 className="spinner" />
                          ) : (
                            <RefreshCw />
                          )}
                        </button>
                        <button
                          className={`copy-button ${copiedPlatform === selectedPlatform ? 'copied' : ''}`}
                          onClick={() => copyToClipboard(
                            selectedPlatform === 'twitter' 
                              ? formatTwitterThread(variations[selectedPlatform]).join('\n\n---\n\n')
                              : variations[selectedPlatform].content,
                            selectedPlatform
                          )}
                        >
                          {copiedPlatform === selectedPlatform ? (
                            <>
                              <Check className="icon" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="icon" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="variation-body">
                      {selectedPlatform === 'twitter' ? (
                        <div className="twitter-thread">
                          {formatTwitterThread(variations[selectedPlatform]).map((tweet, index) => (
                            <div key={index} className="tweet">
                              <span className="tweet-number">{index + 1}/{formatTwitterThread(variations[selectedPlatform]).length}</span>
                              <p>{tweet}</p>
                              <div className="character-count">
                                <span className={getCharacterCount(tweet) > 280 ? 'over-limit' : ''}>
                                  {getCharacterCount(tweet)}/280
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="content-preview">
                            <p>{variations[selectedPlatform].content}</p>
                          </div>
                          
                          {variations[selectedPlatform].hashtags && (
                            <div className="hashtags">
                              <h5>Suggested Hashtags:</h5>
                              <div className="hashtag-list">
                                {variations[selectedPlatform].hashtags.map((tag, index) => (
                                  <span key={index} className="hashtag">#{tag}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="character-info">
                            <div className="character-bar">
                              <div 
                                className="character-fill"
                                style={{ 
                                  width: `${getCharacterPercentage(variations[selectedPlatform].content, selectedPlatform)}%`,
                                  backgroundColor: getCharacterPercentage(variations[selectedPlatform].content, selectedPlatform) > 90 
                                    ? 'var(--error-color)' 
                                    : 'var(--primary-color)'
                                }}
                              />
                            </div>
                            <span className="character-count">
                              {getCharacterCount(variations[selectedPlatform].content)} / {SOCIAL_PLATFORMS[selectedPlatform].maxLength} characters
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialMediaAdapter;