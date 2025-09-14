import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, TrendingUp, Settings } from 'lucide-react';
import ImageGenerationPanel from '../components/AIWritingAssistant/ImageGenerationPanel';
import { getImageAnalytics, getStorageStatistics } from '../services/ImageGenerationService';
import { isFeatureEnabled } from '../config/features';

const AIImageGenerationPage = ({ onNavigateBack, isMobile }) => {
  const [analytics, setAnalytics] = useState(null);
  const [storageStats, setStorageStats] = useState(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      const [analyticsData, storageData] = await Promise.all([
        getImageAnalytics(),
        Promise.resolve(getStorageStatistics())
      ]);
      setAnalytics(analyticsData);
      setStorageStats(storageData);
    } catch (error) {
      console.warn('Failed to load page data:', error);
    }
  };

  const handleImageSaved = (imageData) => {
    console.log('Image saved from page:', imageData);
    // Refresh stats when an image is saved
    loadPageData();
  };

  if (!isFeatureEnabled('AI_IMAGE_GENERATION')) {
    return (
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1>AI Image Generation</h1>
        <p>This feature is not available in the current configuration.</p>
        <button
          onClick={onNavigateBack}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={onNavigateBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '8px 16px',
            background: 'var(--light-gray)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            color: 'var(--text-dark)'
          }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--primary-color)',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Palette size={32} />
            AI Image Generation
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-color)',
            margin: 0
          }}>
            Generate professional images with DALL-E 3 for your content and marketing needs.
          </p>
        </div>

        {/* Page Stats */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {analytics && (
            <div style={{
              background: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <TrendingUp size={16} style={{ color: 'var(--primary-color)' }} />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {analytics.totalGenerations}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                  Images Generated
                </div>
              </div>
            </div>
          )}

          {storageStats && (
            <div style={{
              background: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Settings size={16} style={{ color: 'var(--secondary-color)' }} />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                  {storageStats.totalImages}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                  Images Saved
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              padding: '12px',
              background: showStats ? 'var(--primary-color)' : 'var(--light-gray)',
              color: showStats ? 'white' : 'var(--text-dark)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Toggle detailed stats"
          >
            <TrendingUp size={16} />
          </button>
        </div>
      </div>

      {/* Detailed Stats Panel */}
      {showStats && (analytics || storageStats) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 style={{
            margin: '0 0 16px 0',
            color: 'var(--primary-color)',
            fontSize: '1.25rem'
          }}>
            Detailed Statistics
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {analytics && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    ${analytics.totalCost.toFixed(2)}
                  </div>
                  <div style={{ color: 'var(--text-gray)' }}>Total Cost</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                    ${analytics.averageCostPerImage.toFixed(3)}
                  </div>
                  <div style={{ color: 'var(--text-gray)' }}>Avg Cost/Image</div>
                </div>
              </>
            )}
            
            {storageStats && (
              <>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    {storageStats.recentActivity}
                  </div>
                  <div style={{ color: 'var(--text-gray)' }}>Recent (7 days)</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                    {storageStats.storageReadable}
                  </div>
                  <div style={{ color: 'var(--text-gray)' }}>Storage Used</div>
                </div>
              </>
            )}
          </div>

          {analytics && analytics.topIndustries && analytics.topIndustries.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-dark)' }}>
                Top Industries
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {analytics.topIndustries.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'var(--light-gray)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <strong>{item.industry}</strong>: {item.count} images
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Main Image Generation Panel */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <ImageGenerationPanel
          blogTitle=""
          blogContent=""
          provider="openai"
          hasValidApiKey={true} // This will be checked within the component
          onImageSaved={handleImageSaved}
        />
      </div>

      {/* Usage Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginTop: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 style={{
          margin: '0 0 16px 0',
          color: 'var(--primary-color)',
          fontSize: '1.25rem'
        }}>
          💡 Usage Tips
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-dark)' }}>
              Industry Templates
            </h4>
            <p style={{ margin: 0, color: 'var(--text-gray)', lineHeight: 1.5 }}>
              Use the Industry Templates tab for pre-optimized prompts that generate professional images 
              for hospitality, food service, healthcare, and athletics industries.
            </p>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-dark)' }}>
              Cost Optimization
            </h4>
            <p style={{ margin: 0, color: 'var(--text-gray)', lineHeight: 1.5 }}>
              Use "standard" quality for content images and "HD" for hero images. 
              Square images (1024x1024) are more cost-effective than wide formats.
            </p>
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-dark)' }}>
              Better Prompts
            </h4>
            <p style={{ margin: 0, color: 'var(--text-gray)', lineHeight: 1.5 }}>
              Be specific about style, lighting, and composition. The AI automatically enhances 
              your prompts with professional photography terms for better results.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIImageGenerationPage;