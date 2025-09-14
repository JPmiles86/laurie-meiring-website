import React, { useState, useEffect } from 'react';
import { Image, Wand2, Download, Save, Trash2, RefreshCw, Settings, Loader, Check, Target, BarChart3, Lightbulb, Zap, Eye, Archive } from 'lucide-react';
import { generateImage, generateBlogImages } from './services/aiService';
import { 
  ImageGenerationService, 
  IndustryPromptTemplates, 
  imageSizes, 
  imageOptions,
  getImageAnalytics,
  getPromptSuggestions 
} from '../../services/ImageGenerationService';
import { 
  ImageStorageService, 
  storeGeneratedImage, 
  getImageLibrary, 
  getStorageStatistics 
} from '../../services/ImageStorageService';
import { api } from '../../services/api';
import './styles/ImageGeneration.css';

const ImageGenerationPanel = ({ 
  blogTitle, 
  blogContent, 
  provider, 
  apiKey,
  onImageSaved,
  hasValidApiKey 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedImages, setGeneratedImages] = useState({
    featured: [],
    content: [],
    social: [],
    industry: []
  });
  const [selectedImages, setSelectedImages] = useState({
    featured: null,
    content: [],
    social: null,
    industry: []
  });
  const [customPrompt, setCustomPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Enhanced generation settings with industry support
  const [generationSettings, setGenerationSettings] = useState({
    featured: { enabled: true, variations: 3 },
    content: { enabled: true, variations: 2, count: 2 },
    social: { enabled: true, variations: 3 },
    industry: { enabled: false, variations: 2 }
  });

  // New industry-specific states
  const [selectedIndustry, setSelectedIndustry] = useState('hospitality');
  const [selectedCategory, setSelectedCategory] = useState('hero');
  const [activeTab, setActiveTab] = useState('blog');
  const [quickPrompts, setQuickPrompts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [imageLibrary, setImageLibrary] = useState([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Initialize component data
  useEffect(() => {
    loadQuickPrompts();
    loadAnalytics();
    loadStorageStats();
    loadImageLibrary();
  }, [selectedIndustry]);

  const loadQuickPrompts = () => {
    const prompts = getPromptSuggestions(selectedIndustry);
    setQuickPrompts(prompts);
  };

  const loadAnalytics = async () => {
    try {
      const data = await getImageAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.warn('Failed to load analytics:', error);
    }
  };

  const loadStorageStats = () => {
    try {
      const stats = getStorageStatistics();
      setStorageStats(stats);
    } catch (error) {
      console.warn('Failed to load storage stats:', error);
    }
  };

  const loadImageLibrary = async () => {
    try {
      const images = await getImageLibrary({ industry: selectedIndustry });
      setImageLibrary(images);
    } catch (error) {
      console.warn('Failed to load image library:', error);
    }
  };

  // Clear messages after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Generate images based on blog content
  const handleGenerateImages = async () => {
    if (!hasValidApiKey || !provider) {
      setError('Please configure your API key first');
      return;
    }

    if (!blogTitle && !customPrompt) {
      setError('Please provide a blog title or custom prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const imageService = new ImageGenerationService(apiKey);
      const newImages = { ...generatedImages };

      // Generate featured images
      if (generationSettings.featured.enabled) {
        const featuredImages = await imageService.generateVariations(
          blogTitle || customPrompt,
          { 
            industry: 'general', 
            category: 'hero',
            size: '1792x1024',
            quality: 'hd',
            style: 'vivid'
          },
          generationSettings.featured.variations
        );
        newImages.featured = featuredImages;
      }

      // Generate content images
      if (generationSettings.content.enabled) {
        const contentPrompt = `Illustrative image for blog content about "${blogTitle || customPrompt}"`;
        const contentImages = await imageService.generateVariations(
          contentPrompt,
          { 
            industry: 'general', 
            category: 'content',
            size: '1024x1024',
            quality: 'standard',
            style: 'natural'
          },
          generationSettings.content.variations
        );
        newImages.content = [contentImages]; // Wrap in array for compatibility
      }

      // Generate social media images
      if (generationSettings.social.enabled) {
        const socialPrompt = `Social media image for blog post "${blogTitle || customPrompt}"`;
        const socialImages = await imageService.generateVariations(
          socialPrompt,
          { 
            industry: 'general', 
            category: 'social',
            size: '1024x1024',
            quality: 'standard',
            style: 'vivid'
          },
          generationSettings.social.variations
        );
        newImages.social = socialImages;
      }

      setGeneratedImages(newImages);
      setSuccess('Images generated successfully!');
      
      // Refresh analytics and storage stats
      loadAnalytics();
      loadStorageStats();
    } catch (err) {
      console.error('Image generation error:', err);
      setError(err.message || 'Failed to generate images');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate single image with custom prompt
  const handleGenerateCustom = async () => {
    if (!customPrompt) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const imageService = new ImageGenerationService(apiKey);
      const images = await imageService.generateVariations(
        customPrompt,
        { 
          industry: 'general', 
          category: 'content',
          size: '1024x1024',
          quality: 'standard',
          style: 'vivid'
        },
        3
      );

      setGeneratedImages(prev => ({
        ...prev,
        custom: images
      }));
      setSuccess('Custom images generated successfully!');
      
      // Refresh analytics
      loadAnalytics();
      loadStorageStats();
    } catch (err) {
      console.error('Custom image generation error:', err);
      setError(err.message || 'Failed to generate custom image');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate industry-specific images
  const handleGenerateIndustryImages = async () => {
    if (!hasValidApiKey || !provider) {
      setError('Please configure your API key first');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccess('');

    try {
      const imageService = new ImageGenerationService(apiKey);
      const industryImages = await imageService.generateIndustryImage(
        selectedIndustry,
        selectedCategory,
        customPrompt || null, // Use custom prompt if provided
        { 
          size: imageSizes[selectedCategory] || '1024x1024',
          quality: 'hd',
          style: 'vivid'
        }
      );

      setGeneratedImages(prev => ({
        ...prev,
        industry: [industryImages] // Wrap in array for consistency
      }));
      setSuccess(`${selectedIndustry} ${selectedCategory} image generated successfully!`);
      
      // Refresh analytics
      loadAnalytics();
      loadStorageStats();
    } catch (err) {
      console.error('Industry image generation error:', err);
      setError(err.message || 'Failed to generate industry image');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save image to media library
  const handleSaveImage = async (imageData, type, index) => {
    try {
      const metadata = {
        industry: selectedIndustry,
        category: type,
        originalPrompt: imageData.originalPrompt,
        revisedPrompt: imageData.revisedPrompt,
        enhancedPrompt: imageData.enhancedPrompt,
        blogTitle: blogTitle,
        variationNumber: imageData.variationNumber || (index + 1),
        timestamp: new Date().toISOString()
      };

      // Use our enhanced storage service
      const storedImage = await storeGeneratedImage(imageData.url, metadata);
      
      // Mark as selected/saved
      if (type === 'featured' || type === 'social') {
        setSelectedImages(prev => ({
          ...prev,
          [type]: storedImage.localUrl
        }));
      } else {
        setSelectedImages(prev => ({
          ...prev,
          [type]: [...(prev[type] || []), storedImage.localUrl]
        }));
      }

      // Notify parent component
      if (onImageSaved) {
        onImageSaved({
          type,
          url: storedImage.localUrl,
          alt: storedImage.altText,
          metadata: storedImage.metadata
        });
      }

      setSuccess(`Image saved successfully with AI-generated alt text!`);
      
      // Refresh library and stats
      loadImageLibrary();
      loadStorageStats();
    } catch (err) {
      console.error('Error saving image:', err);
      setError('Failed to save image: ' + err.message);
    }
  };

  // Download image locally
  const handleDownload = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  // Render image variations
  const renderImageVariations = (images, type) => {
    if (!images || images.length === 0) return null;

    // Handle both old and new image data structures
    const imageArray = Array.isArray(images) ? images : [images];

    return (
      <div className="image-variations">
        <h4>{type.charAt(0).toUpperCase() + type.slice(1)} Images</h4>
        <div className="variations-grid">
          {imageArray.map((image, index) => {
            // Handle both old and new image data structures
            const imageUrl = image.url;
            const altText = image.revisedPrompt || image.revised_prompt || `AI generated ${type} image`;
            const variationNumber = image.variationNumber || image.variation || (index + 1);
            const cost = image.metadata?.cost || 0;
            
            return (
              <div key={index} className="image-variation">
                <div className="image-container">
                  <img src={imageUrl} alt={altText} />
                  <div className="image-overlay">
                    <button
                      className="action-btn save"
                      onClick={() => handleSaveImage(image, type, index)}
                      title="Save to library"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      className="action-btn download"
                      onClick={() => handleDownload(imageUrl, `${type}-v${variationNumber}.png`)}
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  {selectedImages[type] === imageUrl && (
                    <div className="selected-badge">
                      <Check size={16} />
                    </div>
                  )}
                </div>
                <div className="variation-info">
                  <p className="variation-label">Variation {variationNumber}</p>
                  {cost > 0 && (
                    <p className="cost-label">${cost.toFixed(3)}</p>
                  )}
                </div>
                {/* Enhanced prompt info for debugging/transparency */}
                {image.enhancedPrompt && showAdvanced && (
                  <div className="prompt-info">
                    <details>
                      <summary>Enhanced Prompt</summary>
                      <p className="enhanced-prompt">{image.enhancedPrompt}</p>
                    </details>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="image-generation-panel">
      <div className="panel-header">
        <h3>
          <Wand2 className="icon" />
          AI Image Generation
        </h3>
        <div className="header-actions">
          {/* Analytics Display */}
          {analytics && (
            <div className="analytics-summary">
              <BarChart3 size={16} />
              <span>{analytics.totalGenerations} images this month</span>
              <span className="cost">${analytics.totalCost.toFixed(2)}</span>
            </div>
          )}
          
          {/* Storage Stats */}
          {storageStats && (
            <div className="storage-summary">
              <Archive size={16} />
              <span>{storageStats.totalImages} saved</span>
            </div>
          )}
          
          <button
            className={`icon-button ${showLibrary ? 'active' : ''}`}
            onClick={() => setShowLibrary(!showLibrary)}
            title="Image Library"
          >
            <Eye size={16} />
          </button>
          
          <button
            className={`icon-button ${showAnalytics ? 'active' : ''}`}
            onClick={() => setShowAnalytics(!showAnalytics)}
            title="Analytics"
          >
            <BarChart3 size={16} />
          </button>
          
          <button
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings size={16} />
            {showAdvanced ? 'Hide' : 'Show'} Options
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="generation-tabs">
        <button 
          className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          <Image size={16} />
          Blog Images
        </button>
        <button 
          className={`tab ${activeTab === 'industry' ? 'active' : ''}`}
          onClick={() => setActiveTab('industry')}
        >
          <Target size={16} />
          Industry Templates
        </button>
        <button 
          className={`tab ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <Zap size={16} />
          Custom Prompt
        </button>
      </div>

      {!hasValidApiKey && (
        <div className="warning-message">
          <p>Please configure your OpenAI API key to generate images</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="success-message">
          <Check className="icon" />
          {success}
        </div>
      )}

      {/* Analytics Panel */}
      {showAnalytics && analytics && (
        <div className="analytics-panel">
          <div className="panel-section">
            <h4><BarChart3 className="icon" /> Usage Analytics</h4>
            <div className="analytics-grid">
              <div className="metric">
                <span className="label">Total Generated</span>
                <span className="value">{analytics.totalGenerations}</span>
              </div>
              <div className="metric">
                <span className="label">Total Cost</span>
                <span className="value">${analytics.totalCost.toFixed(2)}</span>
              </div>
              <div className="metric">
                <span className="label">Avg Cost/Image</span>
                <span className="value">${analytics.averageCostPerImage.toFixed(2)}</span>
              </div>
            </div>
            {analytics.topIndustries.length > 0 && (
              <div className="top-industries">
                <h5>Top Industries</h5>
                {analytics.topIndustries.map((item, index) => (
                  <div key={index} className="industry-stat">
                    <span>{item.industry}</span>
                    <span>{item.count} images</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Library Panel */}
      {showLibrary && (
        <div className="library-panel">
          <div className="panel-section">
            <h4><Archive className="icon" /> Image Library ({imageLibrary.length})</h4>
            {imageLibrary.length > 0 ? (
              <div className="library-grid">
                {imageLibrary.slice(0, 12).map((image, index) => (
                  <div key={index} className="library-item">
                    <img src={image.localUrl} alt={image.altText} />
                    <div className="library-info">
                      <span className="category">{image.metadata?.category}</span>
                      <span className="date">{new Date(image.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No images saved yet. Generate and save some images to build your library!</p>
            )}
          </div>
        </div>
      )}

      {/* Generation Settings */}
      {showAdvanced && (
        <div className="generation-settings">
          <h4>Image Types & Variations</h4>
          <div className="settings-grid">
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={generationSettings.featured.enabled}
                  onChange={(e) => setGenerationSettings(prev => ({
                    ...prev,
                    featured: { ...prev.featured, enabled: e.target.checked }
                  }))}
                />
                Featured Image
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={generationSettings.featured.variations}
                onChange={(e) => setGenerationSettings(prev => ({
                  ...prev,
                  featured: { ...prev.featured, variations: parseInt(e.target.value) }
                }))}
                disabled={!generationSettings.featured.enabled}
              />
              <span>variations</span>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={generationSettings.content.enabled}
                  onChange={(e) => setGenerationSettings(prev => ({
                    ...prev,
                    content: { ...prev.content, enabled: e.target.checked }
                  }))}
                />
                Content Images
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={generationSettings.content.variations}
                onChange={(e) => setGenerationSettings(prev => ({
                  ...prev,
                  content: { ...prev.content, variations: parseInt(e.target.value) }
                }))}
                disabled={!generationSettings.content.enabled}
              />
              <span>variations each</span>
            </div>

            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={generationSettings.social.enabled}
                  onChange={(e) => setGenerationSettings(prev => ({
                    ...prev,
                    social: { ...prev.social, enabled: e.target.checked }
                  }))}
                />
                Social Media Image
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={generationSettings.social.variations}
                onChange={(e) => setGenerationSettings(prev => ({
                  ...prev,
                  social: { ...prev.social, variations: parseInt(e.target.value) }
                }))}
                disabled={!generationSettings.social.enabled}
              />
              <span>variations</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'blog' && (
        <div className="tab-content">
          <div className="blog-images-section">
            <h4>Generate Images for Blog Post</h4>
            <p>Create featured, content, and social media images based on your blog title and content.</p>
            
            <div className="generate-actions">
              <button
                className="generate-btn primary"
                onClick={handleGenerateImages}
                disabled={!hasValidApiKey || isGenerating || (!blogTitle && !customPrompt)}
              >
                {isGenerating ? (
                  <>
                    <Loader className="spinner" size={16} />
                    Generating Images...
                  </>
                ) : (
                  <>
                    <Image size={16} />
                    Generate Blog Images
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'industry' && (
        <div className="tab-content">
          <div className="industry-images-section">
            <h4>Industry-Specific Templates</h4>
            <p>Generate professional images using pre-built industry templates.</p>
            
            <div className="industry-controls">
              <div className="control-group">
                <label>Industry</label>
                <select 
                  value={selectedIndustry} 
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  disabled={isGenerating}
                >
                  {imageOptions.industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry.charAt(0).toUpperCase() + industry.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="control-group">
                <label>Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isGenerating}
                >
                  {imageOptions.categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Prompts */}
            {quickPrompts.length > 0 && (
              <div className="quick-prompts">
                <h5><Lightbulb size={16} /> Quick Prompts for {selectedIndustry}</h5>
                <div className="prompt-buttons">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="prompt-button"
                      onClick={() => setCustomPrompt(prompt)}
                      disabled={isGenerating}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="custom-prompt-section">
              <label>Custom Prompt (Optional)</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Override the template with your own prompt..."
                rows={3}
                disabled={isGenerating}
              />
            </div>
            
            <div className="generate-actions">
              <button
                className="generate-btn primary"
                onClick={handleGenerateIndustryImages}
                disabled={!hasValidApiKey || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader className="spinner" size={16} />
                    Generating {selectedIndustry} {selectedCategory}...
                  </>
                ) : (
                  <>
                    <Target size={16} />
                    Generate {selectedIndustry} {selectedCategory}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="tab-content">
          <div className="custom-images-section">
            <h4>Custom Image Generation</h4>
            <p>Generate images with your own custom prompt and settings.</p>
            
            <div className="custom-prompt-section">
              <label>Image Prompt</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe the image you want to generate in detail..."
                rows={4}
                disabled={isGenerating}
              />
            </div>
            
            <div className="generate-actions">
              <button
                className="generate-btn primary"
                onClick={handleGenerateCustom}
                disabled={!hasValidApiKey || isGenerating || !customPrompt}
              >
                {isGenerating ? (
                  <>
                    <Loader className="spinner" size={16} />
                    Generating Custom Images...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    Generate Custom Images
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Generated Images */}
      <div className="generated-images">
        {generatedImages.featured && renderImageVariations(generatedImages.featured, 'featured')}
        {generatedImages.content && generatedImages.content.map((contentSet, idx) => (
          <div key={idx}>
            {renderImageVariations(contentSet, `content-${idx + 1}`)}
          </div>
        ))}
        {generatedImages.social && renderImageVariations(generatedImages.social, 'social')}
        {generatedImages.industry && renderImageVariations(generatedImages.industry, `${selectedIndustry}-${selectedCategory}`)}
        {generatedImages.custom && renderImageVariations(generatedImages.custom, 'custom')}
      </div>

      {/* Selected Images Summary */}
      {(selectedImages.featured || selectedImages.content.length > 0 || selectedImages.social) && (
        <div className="selected-summary">
          <h4>Selected Images</h4>
          <ul>
            {selectedImages.featured && <li>Featured image saved</li>}
            {selectedImages.content.length > 0 && <li>{selectedImages.content.length} content images saved</li>}
            {selectedImages.social && <li>Social media image saved</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageGenerationPanel;