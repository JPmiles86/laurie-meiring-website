import React, { useState } from 'react';
import { Edit3, Check, Copy, Eye, Columns, Sparkles } from 'lucide-react';
import CriticSystem from './CriticSystem';

const VariationDisplay = ({
  variations,
  selectedVariation,
  setSelectedVariation,
  compareMode,
  comparedVariations,
  onToggleCompare,
  onEdit
}) => {
  const [showCritic, setShowCritic] = useState(false);
  const [criticContent, setCriticContent] = useState('');
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const handleCriticUpdate = (updatedContent) => {
    // Update the selected variation with the critic-improved content
    if (selectedVariation) {
      const updatedVariation = {
        ...selectedVariation,
        content: updatedContent
      };
      setSelectedVariation(updatedVariation);
      
      // You might also want to update the variations array
      // This would depend on how the parent component handles state
    }
    setShowCritic(false);
  };

  const openCritic = () => {
    if (selectedVariation) {
      setCriticContent(selectedVariation.content);
      setShowCritic(true);
    }
  };

  if (compareMode && comparedVariations.length > 0) {
    return (
      <div className="variation-compare-view">
        <div className="compare-header">
          <h3>Compare Variations</h3>
          <p className="compare-subtitle">
            Select up to 2 variations to compare side by side
          </p>
        </div>
        
        <div className="compare-grid">
          {comparedVariations.map((variation, index) => (
            <div key={variation.id} className="compare-column">
              <div className="variation-header">
                <h4>Variation {variation.variationNumber}</h4>
                <div className="variation-actions">
                  <button
                    className="action-button"
                    onClick={() => onEdit(variation)}
                    title="Edit this variation"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="action-button"
                    onClick={() => copyToClipboard(variation.content)}
                    title="Copy content"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              
              <div className="variation-content-compare">
                <h5 className="content-title">{variation.title}</h5>
                {variation.excerpt && (
                  <p className="content-excerpt">{variation.excerpt}</p>
                )}
                <div className="content-tags">
                  {variation.tags && variation.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <div 
                  className="content-body"
                  dangerouslySetInnerHTML={{ __html: variation.content }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="variation-selector">
          <h4>Select variations to compare:</h4>
          <div className="variation-list">
            {variations.map((variation) => (
              <button
                key={variation.id}
                className={`variation-select-button ${comparedVariations.find(v => v.id === variation.id) ? 'selected' : ''}`}
                onClick={() => onToggleCompare(variation)}
              >
                <Check className={`check-icon ${comparedVariations.find(v => v.id === variation.id) ? 'visible' : ''}`} size={16} />
                Variation {variation.variationNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Single variation view with sidebar
  return (
    <div className="variation-display">
      <div className="variation-sidebar">
        <h3>Generated Variations</h3>
        <div className="variation-list">
          {variations.map((variation) => (
            <div
              key={variation.id}
              className={`variation-item ${selectedVariation?.id === variation.id ? 'active' : ''}`}
              onClick={() => setSelectedVariation(variation)}
            >
              <div className="variation-item-header">
                <span className="variation-number">Variation {variation.variationNumber}</span>
                {selectedVariation?.id === variation.id && (
                  <Eye className="active-icon" size={16} />
                )}
              </div>
              <p className="variation-preview">{variation.title}</p>
            </div>
          ))}
        </div>
        
        {variations.length > 1 && (
          <button 
            className="compare-toggle-button"
            onClick={() => onToggleCompare(selectedVariation)}
          >
            <Columns size={16} />
            Compare Variations
          </button>
        )}
      </div>

      <div className="variation-preview">
        {selectedVariation && (
          <>
            <div className="preview-header">
              <div>
                <h3>{selectedVariation.title}</h3>
                <span className="variation-label">Variation {selectedVariation.variationNumber}</span>
              </div>
              <div className="preview-actions">
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(selectedVariation.content)}
                  title="Copy content"
                >
                  <Copy className="icon" />
                  Copy
                </button>
                <button 
                  className="critic-button"
                  onClick={openCritic}
                  title="Run content critics"
                >
                  <Sparkles className="icon" />
                  Run Critics
                </button>
                <button 
                  className="edit-button"
                  onClick={() => onEdit(selectedVariation)}
                >
                  <Edit3 className="icon" />
                  Edit in Blog Editor
                </button>
              </div>
            </div>
            
            <div className="preview-meta">
              {selectedVariation.excerpt && (
                <p className="excerpt">{selectedVariation.excerpt}</p>
              )}
              {selectedVariation.tags && selectedVariation.tags.length > 0 && (
                <div className="tags">
                  {selectedVariation.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="preview-content">
              <div dangerouslySetInnerHTML={{ __html: selectedVariation.content }} />
            </div>

            {showCritic && (
              <CriticSystem 
                content={criticContent}
                onContentUpdate={handleCriticUpdate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VariationDisplay;