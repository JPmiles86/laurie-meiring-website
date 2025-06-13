import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, TrendingUp, Hash, Info } from 'lucide-react';
import { generateBlogIdeas, refreshIdeas } from './services/ideaService';

const IdeaGenerator = ({ onSelectIdea, onClose }) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = () => {
    setLoading(true);
    setTimeout(() => {
      const generatedIdeas = generateBlogIdeas();
      setIdeas(generatedIdeas.slice(0, 10));
      setLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const newIdeas = refreshIdeas(ideas);
      setIdeas(newIdeas);
      setLoading(false);
      setSelectedIdea(null);
    }, 500);
  };

  const handleSelectIdea = (idea) => {
    setSelectedIdea(idea);
    if (onSelectIdea) {
      const ideaPrompt = `${idea.title}\n\n${idea.description}`;
      onSelectIdea(ideaPrompt);
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Tournament Strategy': '🏆',
      'Tournament Analysis': '📊',
      'Coaching Insights': '🎯',
      'Coaching Philosophy': '🧠',
      'Equipment Guide': '🏓',
      'Local Scene': '📍',
      'Community Profile': '👥',
      'Personal Growth': '🌱',
      'Strategy Deep Dive': '🔍',
      'Partner Dynamics': '🤝'
    };
    return iconMap[category] || '💡';
  };

  return (
    <div className="idea-generator">
      <div className="generator-header">
        <div className="header-title">
          <Lightbulb className="icon" />
          <h3>Blog Idea Generator</h3>
        </div>
        <div className="header-actions">
          <button 
            className="refresh-button"
            onClick={handleRefresh}
            disabled={loading}
            title="Generate new ideas"
          >
            <RefreshCw className={`icon ${loading ? 'spinning' : ''}`} />
            Refresh Ideas
          </button>
          {onClose && (
            <button 
              className="close-button"
              onClick={onClose}
              title="Close idea generator"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="generator-description">
        <Info className="icon" />
        <p>Based on your previous blog posts, here are some fresh content ideas that complement your existing work while exploring new angles.</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Analyzing your blog patterns and generating ideas...</p>
        </div>
      ) : (
        <div className="ideas-grid">
          {ideas.map((idea, index) => (
            <div 
              key={index}
              className={`idea-card ${selectedIdea === idea ? 'selected' : ''}`}
              onClick={() => handleSelectIdea(idea)}
            >
              <div className="idea-header">
                <span className="category-icon">{getCategoryIcon(idea.category)}</span>
                <span className="idea-category">{idea.category}</span>
              </div>
              
              <h4 className="idea-title">{idea.title}</h4>
              
              <p className="idea-description">{idea.description}</p>
              
              <div className="idea-tags">
                {idea.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="idea-tag">
                    <Hash size={12} />
                    {tag}
                  </span>
                ))}
              </div>
              
              {idea.reasoning && (
                <div className="idea-reasoning">
                  <TrendingUp size={14} />
                  <span>{idea.reasoning}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .idea-generator {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .generator-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-title h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .refresh-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          color: #666;
          transition: all 0.2s;
        }

        .refresh-button:hover:not(:disabled) {
          background: #e0e0e0;
          color: #333;
        }

        .refresh-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .close-button {
          width: 32px;
          height: 32px;
          border: none;
          background: #f0f0f0;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
          color: #666;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: #e0e0e0;
          color: #333;
        }

        .generator-description {
          display: flex;
          align-items: start;
          gap: 8px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .generator-description p {
          margin: 0;
          font-size: 0.875rem;
          color: #666;
          line-height: 1.5;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f0f0f0;
          border-top-color: var(--primary-color);
          border-radius: 50%;
          margin: 0 auto 16px;
          animation: spin 0.8s linear infinite;
        }

        .loading-state p {
          color: #666;
          font-size: 0.875rem;
        }

        .ideas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .idea-card {
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .idea-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-color);
        }

        .idea-card.selected {
          background: #e8f5e9;
          border-color: var(--primary-color);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        .idea-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .category-icon {
          font-size: 1.5rem;
        }

        .idea-category {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #666;
          letter-spacing: 0.5px;
        }

        .idea-title {
          margin: 0 0 12px 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }

        .idea-description {
          margin: 0 0 16px 0;
          font-size: 0.875rem;
          color: #666;
          line-height: 1.5;
        }

        .idea-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .idea-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: #e0e0e0;
          border-radius: 16px;
          font-size: 0.75rem;
          color: #555;
        }

        .idea-reasoning {
          display: flex;
          align-items: start;
          gap: 6px;
          padding-top: 12px;
          border-top: 1px solid #e0e0e0;
          font-size: 0.75rem;
          color: #888;
          font-style: italic;
        }

        .idea-reasoning svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .icon {
          width: 20px;
          height: 20px;
        }

        .icon.spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .ideas-grid {
            grid-template-columns: 1fr;
          }
          
          .idea-generator {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default IdeaGenerator;