import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { draftIntelligenceApi } from './utils/apiHelpers';

function SuccessPrediction({ draft, predictions, onUpdatePrediction }) {
  const [loading, setLoading] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([
    'engagement', 'seo', 'readability', 'shareability', 'conversion'
  ]);
  const [timeframe, setTimeframe] = useState('30days');
  const [targetAudience, setTargetAudience] = useState('general');
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    loadHistoricalData();
  }, []);

  const loadHistoricalData = async () => {
    try {
      const response = await draftIntelligenceApi.predictions.getHistoricalPerformance();
      if (response.success) {
        setHistoricalData(response.data);
      }
    } catch (error) {
      console.error('Error loading historical data:', error);
    }
  };

  const generatePrediction = async () => {
    setLoading(true);
    try {
      await onUpdatePrediction({
        metrics: selectedMetrics,
        timeframe,
        targetAudience,
        draftId: draft.id
      });
    } catch (error) {
      console.error('Error generating prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    if (score >= 40) return '#e67e22';
    return '#e74c3c';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const metricOptions = [
    { 
      key: 'engagement', 
      label: 'Engagement Rate', 
      icon: '👥', 
      description: 'Likes, comments, shares, time on page' 
    },
    { 
      key: 'seo', 
      label: 'SEO Performance', 
      icon: '🔍', 
      description: 'Search ranking potential and organic traffic' 
    },
    { 
      key: 'readability', 
      label: 'Readability Score', 
      icon: '📖', 
      description: 'How easy the content is to read and understand' 
    },
    { 
      key: 'shareability', 
      label: 'Social Sharing', 
      icon: '📤', 
      description: 'Likelihood of being shared on social media' 
    },
    { 
      key: 'conversion', 
      label: 'Conversion Rate', 
      icon: '💰', 
      description: 'Ability to drive desired actions from readers' 
    },
    { 
      key: 'retention', 
      label: 'Reader Retention', 
      icon: '🔄', 
      description: 'How well content keeps readers engaged' 
    }
  ];

  const audienceOptions = [
    { value: 'general', label: 'General Audience' },
    { value: 'professional', label: 'Professional/Business' },
    { value: 'technical', label: 'Technical/Expert' },
    { value: 'casual', label: 'Casual Readers' },
    { value: 'academic', label: 'Academic/Educational' }
  ];

  const timeframeOptions = [
    { value: '7days', label: '7 Days' },
    { value: '30days', label: '30 Days' },
    { value: '90days', label: '3 Months' },
    { value: '1year', label: '1 Year' }
  ];

  return (
    <div className="success-prediction">
      <div className="prediction-header">
        <div className="header-info">
          <h2>
            <span className="header-icon">📈</span>
            Success Prediction
          </h2>
          <p className="header-subtitle">
            AI-powered forecasting for "{draft?.title}"
          </p>
        </div>
      </div>

      {/* Prediction Controls */}
      <div className="prediction-controls">
        <div className="control-section">
          <h3>Prediction Metrics</h3>
          <div className="metrics-grid">
            {metricOptions.map(metric => (
              <label key={metric.key} className="metric-option">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.key)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMetrics([...selectedMetrics, metric.key]);
                    } else {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key));
                    }
                  }}
                />
                <div className="metric-content">
                  <div className="metric-header">
                    <span className="metric-icon">{metric.icon}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                  <p className="metric-description">{metric.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label>Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="control-select"
            >
              {audienceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Prediction Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="control-select"
            >
              {timeframeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generatePrediction}
          disabled={loading || selectedMetrics.length === 0}
          className="generate-prediction-btn"
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Analyzing & Predicting...
            </>
          ) : (
            <>
              <span className="btn-icon">🔮</span>
              Generate Prediction
            </>
          )}
        </button>
      </div>

      {/* Prediction Results */}
      {predictions && (
        <div className="prediction-results">
          {/* Overall Score */}
          <div className="overall-prediction">
            <div className="overall-score-card">
              <div className="score-display">
                <div 
                  className="score-circle"
                  style={{ '--score': predictions.overallScore }}
                >
                  <div className="score-text">
                    <span className="score-number">{predictions.overallScore}</span>
                    <span className="score-label">/100</span>
                  </div>
                </div>
                <div className="score-info">
                  <h3>Overall Success Score</h3>
                  <p className="score-description">
                    {getScoreLabel(predictions.overallScore)}
                  </p>
                  <div className="confidence-level">
                    Confidence: {predictions.confidence}%
                  </div>
                </div>
              </div>
              
              <div className="key-insights">
                <h4>Key Insights</h4>
                <ul>
                  {predictions.keyInsights?.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Metric Predictions */}
          <div className="metric-predictions">
            <h3>Detailed Predictions</h3>
            <div className="metrics-grid">
              {predictions.metrics?.map(metric => (
                <motion.div
                  key={metric.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="metric-prediction-card"
                >
                  <div className="metric-header">
                    <span className="metric-icon">
                      {metricOptions.find(m => m.key === metric.type)?.icon}
                    </span>
                    <h4>{metricOptions.find(m => m.key === metric.type)?.label}</h4>
                  </div>
                  
                  <div className="metric-score">
                    <div className="score-bar">
                      <div 
                        className="score-fill"
                        style={{ 
                          width: `${metric.score}%`,
                          backgroundColor: getScoreColor(metric.score)
                        }}
                      ></div>
                    </div>
                    <span className="score-value">{metric.score}/100</span>
                  </div>

                  <div className="metric-details">
                    <div className="predicted-values">
                      <div className="value-item">
                        <span className="value-label">Expected Range:</span>
                        <span className="value-range">
                          {formatNumber(metric.minValue)} - {formatNumber(metric.maxValue)}
                        </span>
                      </div>
                      <div className="value-item">
                        <span className="value-label">Most Likely:</span>
                        <span className="value-number">
                          {formatNumber(metric.predictedValue)}
                        </span>
                      </div>
                    </div>

                    {metric.factors && (
                      <div className="influencing-factors">
                        <h5>Key Factors:</h5>
                        <ul>
                          {metric.factors.map((factor, index) => (
                            <li key={index}>
                              <span className={`factor-impact ${factor.impact}`}>
                                {factor.impact === 'positive' ? '↗️' : '↘️'}
                              </span>
                              {factor.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Improvement Recommendations */}
          {predictions.recommendations && (
            <div className="improvement-recommendations">
              <h3>
                <span className="recommendations-icon">💡</span>
                Improvement Recommendations
              </h3>
              <div className="recommendations-list">
                {predictions.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-header">
                      <div className="recommendation-title">
                        <span className="rec-icon">{rec.icon}</span>
                        <h4>{rec.title}</h4>
                      </div>
                      <div className="potential-impact">
                        <span className="impact-label">Potential Impact:</span>
                        <span 
                          className="impact-value"
                          style={{ color: getScoreColor(rec.impactScore) }}
                        >
                          +{rec.impactScore} points
                        </span>
                      </div>
                    </div>
                    
                    <p className="recommendation-description">
                      {rec.description}
                    </p>
                    
                    <div className="recommendation-actions">
                      <div className="action-items">
                        <h5>Action Items:</h5>
                        <ul>
                          {rec.actionItems?.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="implementation-difficulty">
                        <span className="difficulty-label">Difficulty:</span>
                        <div className="difficulty-bars">
                          {[1, 2, 3, 4, 5].map(level => (
                            <div
                              key={level}
                              className={`difficulty-bar ${
                                level <= rec.difficulty ? 'filled' : ''
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparative Analysis */}
          {historicalData && (
            <div className="comparative-analysis">
              <h3>
                <span className="analysis-icon">📊</span>
                Comparative Analysis
              </h3>
              <div className="comparison-cards">
                <div className="comparison-card">
                  <h4>Similar Content Performance</h4>
                  <div className="comparison-stats">
                    <div className="stat-item">
                      <span className="stat-label">Average Score:</span>
                      <span className="stat-value">
                        {historicalData.averageScore}/100
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Top Performer:</span>
                      <span className="stat-value">
                        {historicalData.topScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="performance-outlook">
                    <span className={`outlook ${predictions.outlook?.toLowerCase()}`}>
                      {predictions.outlook === 'above_average' && '📈 Above Average'}
                      {predictions.outlook === 'average' && '📊 Average'}
                      {predictions.outlook === 'below_average' && '📉 Below Average'}
                    </span>
                  </div>
                </div>

                <div className="comparison-card">
                  <h4>Best Practices Alignment</h4>
                  <div className="practices-checklist">
                    {predictions.bestPractices?.map((practice, index) => (
                      <div key={index} className="practice-item">
                        <span className={`practice-status ${practice.status}`}>
                          {practice.status === 'good' ? '✅' : 
                           practice.status === 'warning' ? '⚠️' : '❌'}
                        </span>
                        <span className="practice-text">{practice.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prediction Methodology */}
          <div className="prediction-methodology">
            <h4>💡 How We Predict Success</h4>
            <div className="methodology-info">
              <p>
                Our AI analyzes your content using advanced machine learning models trained on 
                thousands of successful posts. We consider factors including:
              </p>
              <ul>
                <li>Content structure and readability metrics</li>
                <li>Historical performance of similar content</li>
                <li>SEO optimization and keyword analysis</li>
                <li>Engagement patterns and social signals</li>
                <li>Current trends and seasonal factors</li>
              </ul>
              <p className="confidence-note">
                <strong>Confidence Level:</strong> {predictions.confidence}% 
                (based on {predictions.dataPoints} similar content pieces)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Predictions State */}
      {!predictions && (
        <div className="no-predictions">
          <div className="no-predictions-icon">🔮</div>
          <h3>No Predictions Generated Yet</h3>
          <p>
            Select your desired metrics and click "Generate Prediction" to get 
            AI-powered forecasts for your content's success.
          </p>
        </div>
      )}
    </div>
  );
}

export default SuccessPrediction;