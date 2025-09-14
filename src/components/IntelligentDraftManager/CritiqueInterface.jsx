import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { draftIntelligenceApi } from './utils/apiHelpers';

function CritiqueInterface({ draft, critiques, onGenerateCritique, onUpdateDraft }) {
  const [selectedCriteria, setSelectedCriteria] = useState({
    grammar: true,
    style: true,
    structure: true,
    seo: true,
    engagement: true,
    factual: false,
    tone: true
  });
  const [intensity, setIntensity] = useState('balanced');
  const [generating, setGenerating] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set());
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [filteredCritiques, setFilteredCritiques] = useState(critiques);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    filterAndSortCritiques();
  }, [critiques, filterBy, sortBy, appliedSuggestions]);

  const filterAndSortCritiques = () => {
    if (!critiques || !critiques.sections) {
      setFilteredCritiques(critiques);
      return;
    }

    let filtered = { ...critiques };
    
    // Filter sections based on criteria
    filtered.sections = critiques.sections.filter(section => {
      if (filterBy === 'all') return true;
      if (filterBy === 'applied') return section.suggestions.some(s => appliedSuggestions.has(s.id));
      if (filterBy === 'pending') return section.suggestions.some(s => !appliedSuggestions.has(s.id));
      return section.type === filterBy;
    });

    // Sort suggestions within each section
    filtered.sections = filtered.sections.map(section => ({
      ...section,
      suggestions: [...section.suggestions].sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortBy === 'impact') {
          return b.impact - a.impact;
        }
        if (sortBy === 'type') {
          return a.type.localeCompare(b.type);
        }
        return 0;
      })
    }));

    setFilteredCritiques(filtered);
  };

  const handleGenerateCritique = async () => {
    setGenerating(true);
    try {
      await onGenerateCritique({
        criteria: selectedCriteria,
        intensity: intensity,
        draftId: draft.id
      });
    } catch (error) {
      console.error('Error generating critique:', error);
    } finally {
      setGenerating(false);
    }
  };

  const applySuggestion = async (suggestion) => {
    try {
      const response = await draftIntelligenceApi.critique.applySuggestion(draft.id, suggestion.id);
      if (response.success) {
        setAppliedSuggestions(prev => new Set([...prev, suggestion.id]));
        onUpdateDraft && onUpdateDraft();
      }
    } catch (error) {
      console.error('Error applying suggestion:', error);
    }
  };

  const applyAllSuggestions = async (sectionType) => {
    const section = filteredCritiques.sections.find(s => s.type === sectionType);
    if (!section) return;

    try {
      const pendingSuggestions = section.suggestions.filter(s => !appliedSuggestions.has(s.id));
      const response = await draftIntelligenceApi.critique.applyMultipleSuggestions(
        draft.id, 
        pendingSuggestions.map(s => s.id)
      );
      
      if (response.success) {
        setAppliedSuggestions(prev => {
          const newSet = new Set(prev);
          pendingSuggestions.forEach(s => newSet.add(s.id));
          return newSet;
        });
        onUpdateDraft && onUpdateDraft();
      }
    } catch (error) {
      console.error('Error applying multiple suggestions:', error);
    }
  };

  const toggleSection = (sectionType) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionType)) {
        newSet.delete(sectionType);
      } else {
        newSet.add(sectionType);
      }
      return newSet;
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: '#e74c3c',
      medium: '#f39c12',
      low: '#3498db'
    };
    return colors[severity] || '#95a5a6';
  };

  const getSectionIcon = (type) => {
    const icons = {
      grammar: '📝',
      style: '🎨',
      structure: '🏗️',
      seo: '🔍',
      engagement: '👥',
      factual: '✅',
      tone: '🎭'
    };
    return icons[type] || '📄';
  };

  const intensityOptions = [
    { value: 'gentle', label: 'Gentle', description: 'Light suggestions, focus on major issues' },
    { value: 'balanced', label: 'Balanced', description: 'Comprehensive review with balanced feedback' },
    { value: 'thorough', label: 'Thorough', description: 'Detailed analysis with all suggestions' }
  ];

  const criteriaOptions = [
    { key: 'grammar', label: 'Grammar & Spelling', icon: '📝', description: 'Check for grammatical errors and typos' },
    { key: 'style', label: 'Writing Style', icon: '🎨', description: 'Analyze tone, voice, and style consistency' },
    { key: 'structure', label: 'Structure & Flow', icon: '🏗️', description: 'Review organization and logical flow' },
    { key: 'seo', label: 'SEO Optimization', icon: '🔍', description: 'Improve search engine visibility' },
    { key: 'engagement', label: 'Reader Engagement', icon: '👥', description: 'Enhance reader interest and interaction' },
    { key: 'factual', label: 'Fact Checking', icon: '✅', description: 'Verify claims and citations (requires external sources)' },
    { key: 'tone', label: 'Tone Analysis', icon: '🎭', description: 'Ensure appropriate tone for target audience' }
  ];

  return (
    <div className="critique-interface">
      <div className="critique-header">
        <div className="header-info">
          <h2>
            <span className="header-icon">🔍</span>
            AI Content Critique
          </h2>
          <p className="header-subtitle">
            Get intelligent feedback and suggestions for "{draft?.title}"
          </p>
        </div>
      </div>

      {/* Critique Controls */}
      <div className="critique-controls">
        <div className="criteria-selection">
          <h3>Critique Criteria</h3>
          <div className="criteria-grid">
            {criteriaOptions.map(criteria => (
              <label key={criteria.key} className="criteria-option">
                <input
                  type="checkbox"
                  checked={selectedCriteria[criteria.key]}
                  onChange={(e) => setSelectedCriteria(prev => ({
                    ...prev,
                    [criteria.key]: e.target.checked
                  }))}
                />
                <div className="criteria-content">
                  <div className="criteria-header">
                    <span className="criteria-icon">{criteria.icon}</span>
                    <span className="criteria-label">{criteria.label}</span>
                  </div>
                  <p className="criteria-description">{criteria.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="intensity-selection">
          <h3>Analysis Intensity</h3>
          <div className="intensity-options">
            {intensityOptions.map(option => (
              <label key={option.value} className="intensity-option">
                <input
                  type="radio"
                  name="intensity"
                  value={option.value}
                  checked={intensity === option.value}
                  onChange={(e) => setIntensity(e.target.value)}
                />
                <div className="intensity-content">
                  <div className="intensity-label">{option.label}</div>
                  <div className="intensity-description">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="generate-section">
          <button
            onClick={handleGenerateCritique}
            disabled={generating || Object.values(selectedCriteria).every(v => !v)}
            className="generate-critique-btn"
          >
            {generating ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing Content...
              </>
            ) : (
              <>
                <span className="btn-icon">🧠</span>
                Generate AI Critique
              </>
            )}
          </button>
          
          {Object.values(selectedCriteria).every(v => !v) && (
            <p className="warning-text">
              ⚠️ Please select at least one critique criteria
            </p>
          )}
        </div>
      </div>

      {/* Critique Results */}
      {filteredCritiques && (
        <div className="critique-results">
          <div className="results-header">
            <div className="results-info">
              <h3>Critique Results</h3>
              <div className="results-stats">
                <span className="stat">
                  <span className="stat-icon">📊</span>
                  Overall Score: {filteredCritiques.overallScore}/100
                </span>
                <span className="stat">
                  <span className="stat-icon">💡</span>
                  {filteredCritiques.totalSuggestions} Suggestions
                </span>
                <span className="stat">
                  <span className="stat-icon">✅</span>
                  {appliedSuggestions.size} Applied
                </span>
              </div>
            </div>

            <div className="results-controls">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Critiques</option>
                <option value="applied">Applied</option>
                <option value="pending">Pending</option>
                <option value="grammar">Grammar</option>
                <option value="style">Style</option>
                <option value="structure">Structure</option>
                <option value="seo">SEO</option>
                <option value="engagement">Engagement</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="priority">Priority</option>
                <option value="impact">Impact</option>
                <option value="type">Type</option>
              </select>
            </div>
          </div>

          {/* Critique Sections */}
          <div className="critique-sections">
            {filteredCritiques.sections?.map(section => {
              const isExpanded = expandedSections.has(section.type);
              const pendingSuggestions = section.suggestions.filter(s => !appliedSuggestions.has(s.id));
              
              return (
                <div key={section.type} className="critique-section">
                  <div 
                    className="section-header"
                    onClick={() => toggleSection(section.type)}
                  >
                    <div className="section-title">
                      <span className="section-icon">{getSectionIcon(section.type)}</span>
                      <h4>{section.title}</h4>
                      <span className="suggestion-count">
                        {section.suggestions.length} suggestions
                      </span>
                    </div>
                    
                    <div className="section-actions">
                      {pendingSuggestions.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            applyAllSuggestions(section.type);
                          }}
                          className="apply-all-btn"
                        >
                          Apply All
                        </button>
                      )}
                      <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="section-content"
                      >
                        <div className="section-summary">
                          <p>{section.summary}</p>
                          <div className="section-score">
                            Score: {section.score}/100
                          </div>
                        </div>

                        <div className="suggestions-list">
                          {section.suggestions.map(suggestion => {
                            const isApplied = appliedSuggestions.has(suggestion.id);
                            
                            return (
                              <div 
                                key={suggestion.id}
                                className={`suggestion-item ${isApplied ? 'applied' : ''}`}
                              >
                                <div className="suggestion-header">
                                  <div className="suggestion-meta">
                                    <span 
                                      className="priority-badge"
                                      style={{ backgroundColor: getSeverityColor(suggestion.priority) }}
                                    >
                                      {suggestion.priority}
                                    </span>
                                    <span className="suggestion-type">
                                      {suggestion.type}
                                    </span>
                                    <span className="impact-score">
                                      Impact: +{suggestion.impact}
                                    </span>
                                  </div>
                                  
                                  {isApplied ? (
                                    <div className="applied-indicator">
                                      <span className="applied-icon">✅</span>
                                      Applied
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => applySuggestion(suggestion)}
                                      className="apply-suggestion-btn"
                                    >
                                      Apply
                                    </button>
                                  )}
                                </div>

                                <div className="suggestion-content">
                                  <p className="suggestion-description">
                                    {suggestion.description}
                                  </p>
                                  
                                  {suggestion.example && (
                                    <div className="suggestion-example">
                                      <h5>Example:</h5>
                                      <div className="example-comparison">
                                        <div className="before">
                                          <strong>Before:</strong>
                                          <span>{suggestion.example.before}</span>
                                        </div>
                                        <div className="after">
                                          <strong>After:</strong>
                                          <span>{suggestion.example.after}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {suggestion.reasoning && (
                                    <div className="suggestion-reasoning">
                                      <h5>Why this helps:</h5>
                                      <p>{suggestion.reasoning}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Overall Recommendations */}
          {filteredCritiques.overallRecommendations && (
            <div className="overall-recommendations">
              <h3>
                <span className="recommendations-icon">💡</span>
                Key Recommendations
              </h3>
              <div className="recommendations-list">
                {filteredCritiques.overallRecommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="recommendation-header">
                      <span className="recommendation-priority">
                        {rec.priority}
                      </span>
                      <span className="recommendation-category">
                        {rec.category}
                      </span>
                    </div>
                    <p className="recommendation-text">{rec.text}</p>
                    <div className="recommendation-impact">
                      Expected improvement: +{rec.expectedImprovement} points
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Critiques State */}
      {!filteredCritiques && (
        <div className="no-critiques">
          <div className="no-critiques-icon">🔍</div>
          <h3>No Critique Generated Yet</h3>
          <p>
            Configure your criteria above and click "Generate AI Critique" to get 
            intelligent feedback on your content.
          </p>
        </div>
      )}
    </div>
  );
}

export default CritiqueInterface;