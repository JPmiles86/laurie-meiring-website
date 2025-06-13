import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Edit3, 
  Search, 
  TrendingUp, 
  Type,
  ChevronDown,
  ChevronUp,
  Sliders,
  Zap
} from 'lucide-react';
import { runCritiques, applySuggestion } from './services/criticService';

const CriticSystem = ({ content, onContentUpdate }) => {
  const [critiques, setCritiques] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expandedCritics, setExpandedCritics] = useState({});
  const [intensity, setIntensity] = useState('medium');
  const [selectedCritics, setSelectedCritics] = useState({
    grammar: true,
    style: true,
    seo: true,
    engagement: true
  });
  const [modifiedContent, setModifiedContent] = useState(content);

  const criticPersonas = {
    grammar: {
      name: 'Grammar Editor',
      icon: Type,
      color: '#e74c3c',
      description: 'Checks for grammar, spelling, and punctuation errors'
    },
    style: {
      name: 'Style Checker',
      icon: Edit3,
      color: '#3498db',
      description: 'Analyzes writing style, tone, and readability'
    },
    seo: {
      name: 'SEO Optimizer',
      icon: Search,
      color: '#27ae60',
      description: 'Optimizes for search engines and keyword usage'
    },
    engagement: {
      name: 'Engagement Booster',
      icon: TrendingUp,
      color: '#f39c12',
      description: 'Suggests improvements for reader engagement'
    }
  };

  useEffect(() => {
    setModifiedContent(content);
  }, [content]);

  const handleAnalyze = async () => {
    if (!content || content.trim() === '') return;

    setIsAnalyzing(true);
    try {
      const results = await runCritiques(content, selectedCritics, intensity);
      setCritiques(results);
      // Initially expand all critics with suggestions
      const expanded = {};
      results.forEach(critique => {
        if (critique.suggestions.length > 0) {
          expanded[critique.type] = true;
        }
      });
      setExpandedCritics(expanded);
    } catch (error) {
      console.error('Error running critiques:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleCritic = (type) => {
    setExpandedCritics(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleCriticSelection = (type) => {
    setSelectedCritics(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleApplySuggestion = (suggestion, critiqueType) => {
    const updatedContent = applySuggestion(modifiedContent, suggestion);
    setModifiedContent(updatedContent);
    
    // Update critiques to mark this suggestion as applied
    setCritiques(prev => prev.map(critique => {
      if (critique.type === critiqueType) {
        return {
          ...critique,
          suggestions: critique.suggestions.map(s => 
            s.id === suggestion.id ? { ...s, applied: true } : s
          )
        };
      }
      return critique;
    }));
  };

  const handleApplyAll = () => {
    let updatedContent = modifiedContent;
    
    critiques.forEach(critique => {
      critique.suggestions.forEach(suggestion => {
        if (!suggestion.applied) {
          updatedContent = applySuggestion(updatedContent, suggestion);
        }
      });
    });

    setModifiedContent(updatedContent);
    
    // Mark all suggestions as applied
    setCritiques(prev => prev.map(critique => ({
      ...critique,
      suggestions: critique.suggestions.map(s => ({ ...s, applied: true }))
    })));
  };

  const handleSaveChanges = () => {
    if (onContentUpdate) {
      onContentUpdate(modifiedContent);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      case 'suggestion': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const hasUnappliedSuggestions = critiques.some(critique => 
    critique.suggestions.some(s => !s.applied)
  );

  return (
    <div className="critic-system">
      <div className="critic-header">
        <h3>Content Critic System</h3>
        <p className="critic-description">
          Get AI-powered feedback to improve your content
        </p>
      </div>

      <div className="critic-controls">
        <div className="critic-selection">
          <h4>Select Critics:</h4>
          <div className="critic-toggles">
            {Object.entries(criticPersonas).map(([type, persona]) => {
              const Icon = persona.icon;
              return (
                <label key={type} className="critic-toggle">
                  <input
                    type="checkbox"
                    checked={selectedCritics[type]}
                    onChange={() => toggleCriticSelection(type)}
                  />
                  <div className="critic-toggle-content">
                    <Icon size={20} style={{ color: persona.color }} />
                    <span>{persona.name}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="intensity-control">
          <label>
            <Sliders size={20} />
            <span>Intensity:</span>
          </label>
          <select 
            value={intensity} 
            onChange={(e) => setIntensity(e.target.value)}
            className="intensity-select"
          >
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="thorough">Thorough</option>
          </select>
        </div>

        <button 
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !Object.values(selectedCritics).some(v => v)}
        >
          {isAnalyzing ? (
            <>Analyzing...</>
          ) : (
            <>
              <Zap size={20} />
              Analyze Content
            </>
          )}
        </button>
      </div>

      {critiques.length > 0 && (
        <div className="critiques-container">
          <div className="critiques-header">
            <h4>Critique Results</h4>
            {hasUnappliedSuggestions && (
              <button 
                className="apply-all-button"
                onClick={handleApplyAll}
              >
                Apply All Suggestions
              </button>
            )}
          </div>

          {critiques.map(critique => {
            const persona = criticPersonas[critique.type];
            const Icon = persona.icon;
            const isExpanded = expandedCritics[critique.type];

            return (
              <div key={critique.type} className="critique-section">
                <div 
                  className="critique-header"
                  onClick={() => toggleCritic(critique.type)}
                  style={{ borderLeftColor: persona.color }}
                >
                  <div className="critique-title">
                    <Icon size={24} style={{ color: persona.color }} />
                    <h5>{persona.name}</h5>
                    <span className="suggestion-count">
                      {critique.suggestions.length} suggestions
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>

                {isExpanded && (
                  <div className="critique-content">
                    <p className="critique-summary">{critique.summary}</p>
                    
                    {critique.suggestions.map(suggestion => (
                      <div 
                        key={suggestion.id} 
                        className={`suggestion ${suggestion.applied ? 'applied' : ''}`}
                      >
                        <div className="suggestion-header">
                          <span 
                            className="severity-badge"
                            style={{ backgroundColor: getSeverityColor(suggestion.severity) }}
                          >
                            {suggestion.severity}
                          </span>
                          <span className="suggestion-type">{suggestion.type}</span>
                        </div>
                        
                        <p className="suggestion-description">{suggestion.description}</p>
                        
                        {suggestion.original && (
                          <div className="suggestion-comparison">
                            <div className="original">
                              <strong>Original:</strong>
                              <span>{suggestion.original}</span>
                            </div>
                            {suggestion.replacement && (
                              <div className="replacement">
                                <strong>Suggested:</strong>
                                <span>{suggestion.replacement}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {!suggestion.applied && (
                          <button
                            className="apply-suggestion-button"
                            onClick={() => handleApplySuggestion(suggestion, critique.type)}
                          >
                            Apply Suggestion
                          </button>
                        )}
                        
                        {suggestion.applied && (
                          <div className="applied-indicator">
                            <CheckCircle size={16} />
                            Applied
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {modifiedContent !== content && (
        <div className="critic-actions">
          <button 
            className="save-changes-button"
            onClick={handleSaveChanges}
          >
            Save Changes to Content
          </button>
          <button 
            className="reset-button"
            onClick={() => {
              setModifiedContent(content);
              setCritiques([]);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CriticSystem;