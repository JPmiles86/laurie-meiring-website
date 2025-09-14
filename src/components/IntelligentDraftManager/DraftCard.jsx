import React, { useState } from 'react';
import { motion } from 'framer-motion';

function DraftCard({ draft, isSelected, onSelect, onPredict, predictions }) {
  const [showActions, setShowActions] = useState(false);

  // Calculate quality score based on content metrics
  const calculateQualityScore = (draft) => {
    let score = 0;
    const content = draft.content || '';
    const title = draft.title || '';
    
    // Title quality (20 points max)
    if (title.length >= 10 && title.length <= 60) score += 15;
    else if (title.length > 0) score += 8;
    if (/[?!]/.test(title)) score += 3; // Engaging punctuation
    if (title.split(' ').length >= 5) score += 2; // Descriptive length
    
    // Content quality (50 points max)
    const wordCount = content.split(/\s+/).length;
    if (wordCount >= 300) score += 20;
    else if (wordCount >= 150) score += 12;
    else if (wordCount >= 50) score += 6;
    
    // Structure quality (15 points max)
    const hasHeaders = /#{1,6}\s/.test(content);
    const hasList = /[*-]\s/.test(content);
    const hasParagraphs = content.split('\n\n').length > 2;
    
    if (hasHeaders) score += 5;
    if (hasList) score += 5;
    if (hasParagraphs) score += 5;
    
    // SEO potential (15 points max)
    const metaDescription = draft.excerpt || '';
    if (metaDescription.length >= 120 && metaDescription.length <= 160) score += 8;
    else if (metaDescription.length > 0) score += 4;
    
    if (draft.tags && draft.tags.length >= 3) score += 4;
    if (draft.category) score += 3;
    
    return Math.min(score, 100);
  };

  // Get status color and label
  const getStatusInfo = (status) => {
    const statusMap = {
      draft: { color: '#6c757d', label: 'Draft', icon: '📝' },
      review: { color: '#ffc107', label: 'In Review', icon: '👀' },
      ready: { color: '#28a745', label: 'Ready', icon: '✅' },
      published: { color: '#007bff', label: 'Published', icon: '🌐' },
      archived: { color: '#dc3545', label: 'Archived', icon: '🗄️' }
    };
    return statusMap[status] || statusMap.draft;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Get prediction color based on score
  const getPredictionColor = (score) => {
    if (score >= 80) return '#28a745'; // Green
    if (score >= 60) return '#ffc107'; // Yellow
    if (score >= 40) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  };

  const qualityScore = calculateQualityScore(draft);
  const statusInfo = getStatusInfo(draft.status);
  const prediction = predictions || {};
  const hasAdvancedMetrics = prediction.engagementScore !== undefined;

  return (
    <motion.div
      className={`draft-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card Header */}
      <div className="draft-card-header">
        <div className="status-indicator">
          <span 
            className="status-badge" 
            style={{ backgroundColor: statusInfo.color }}
          >
            {statusInfo.icon} {statusInfo.label}
          </span>
          <span className="last-modified">
            {formatDate(draft.lastModified)}
          </span>
        </div>
        
        {isSelected && (
          <div className="selected-indicator">
            <span className="selected-icon">✓</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="draft-card-content">
        <h3 className="draft-title" title={draft.title}>
          {draft.title || 'Untitled Draft'}
        </h3>
        
        {draft.excerpt && (
          <p className="draft-excerpt">
            {draft.excerpt.length > 120 
              ? `${draft.excerpt.substring(0, 120)}...` 
              : draft.excerpt}
          </p>
        )}

        {/* Metrics Row */}
        <div className="draft-metrics">
          <div className="metric">
            <span className="metric-icon">🎯</span>
            <span className="metric-label">Quality</span>
            <div className="quality-score">
              <div 
                className="score-bar"
                style={{ 
                  width: `${qualityScore}%`,
                  backgroundColor: getPredictionColor(qualityScore)
                }}
              ></div>
              <span className="score-text">{qualityScore}/100</span>
            </div>
          </div>

          <div className="metric">
            <span className="metric-icon">📊</span>
            <span className="metric-label">Words</span>
            <span className="metric-value">
              {(draft.content || '').split(/\s+/).length}
            </span>
          </div>

          {hasAdvancedMetrics && (
            <div className="metric">
              <span className="metric-icon">📈</span>
              <span className="metric-label">Success</span>
              <span 
                className="metric-value prediction-score"
                style={{ color: getPredictionColor(prediction.overallScore) }}
              >
                {prediction.overallScore}%
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {draft.tags && draft.tags.length > 0 && (
          <div className="draft-tags">
            {draft.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="draft-tag">
                {tag}
              </span>
            ))}
            {draft.tags.length > 3 && (
              <span className="draft-tag more-tags">
                +{draft.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Advanced Intelligence Indicators */}
      {hasAdvancedMetrics && (
        <div className="intelligence-indicators">
          <div className="indicator-row">
            <div className="indicator">
              <span className="indicator-icon">👥</span>
              <span className="indicator-label">Engagement</span>
              <div className="indicator-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${prediction.engagementScore}%`,
                    backgroundColor: getPredictionColor(prediction.engagementScore)
                  }}
                ></div>
              </div>
              <span className="indicator-value">{prediction.engagementScore}%</span>
            </div>
            
            <div className="indicator">
              <span className="indicator-icon">🔍</span>
              <span className="indicator-label">SEO</span>
              <div className="indicator-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: `${prediction.seoScore}%`,
                    backgroundColor: getPredictionColor(prediction.seoScore)
                  }}
                ></div>
              </div>
              <span className="indicator-value">{prediction.seoScore}%</span>
            </div>
          </div>

          {prediction.recommendations && prediction.recommendations.length > 0 && (
            <div className="quick-recommendations">
              <span className="recommendations-label">💡 Quick Wins:</span>
              <span className="recommendation-preview">
                {prediction.recommendations[0].title}
                {prediction.recommendations.length > 1 && ` +${prediction.recommendations.length - 1}`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <motion.div 
        className="draft-actions"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: showActions ? 1 : 0, height: showActions ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button 
          className="action-button primary"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <span className="button-icon">👁️</span>
          View Details
        </button>
        
        <button 
          className="action-button secondary"
          onClick={(e) => {
            e.stopPropagation();
            onPredict();
          }}
          disabled={hasAdvancedMetrics}
        >
          <span className="button-icon">🔮</span>
          {hasAdvancedMetrics ? 'Analyzed' : 'Predict Success'}
        </button>

        <button 
          className="action-button tertiary"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement edit functionality
          }}
        >
          <span className="button-icon">✏️</span>
          Edit
        </button>
      </motion.div>

      {/* Workflow Progress */}
      {draft.workflowStage && (
        <div className="workflow-progress">
          <div className="progress-label">Workflow Progress</div>
          <div className="progress-steps">
            {['draft', 'review', 'ready', 'published'].map((stage, index) => (
              <div 
                key={stage}
                className={`progress-step ${
                  ['draft', 'review', 'ready', 'published'].indexOf(draft.workflowStage) >= index 
                    ? 'completed' : ''
                }`}
              >
                <div className="step-dot"></div>
                {index < 3 && <div className="step-line"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Enhancement Badge */}
      {draft.aiEnhanced && (
        <div className="ai-enhanced-badge" title="This draft has been enhanced with AI assistance">
          <span className="badge-icon">🤖</span>
          <span className="badge-text">AI Enhanced</span>
        </div>
      )}
    </motion.div>
  );
}

export default DraftCard;