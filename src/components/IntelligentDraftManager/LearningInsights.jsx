import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { draftIntelligenceApi } from './utils/apiHelpers';

function LearningInsights({ insights, drafts, onRefresh }) {
  const [activeTab, setActiveTab] = useState('patterns');
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(false);
  const [detailedInsights, setDetailedInsights] = useState(null);

  useEffect(() => {
    loadDetailedInsights();
  }, [timeRange]);

  const loadDetailedInsights = async () => {
    setLoading(true);
    try {
      const response = await draftIntelligenceApi.insights.getLearningInsights({ timeRange });
      if (response.success) {
        setDetailedInsights(response.data);
      }
    } catch (error) {
      console.error('Error loading detailed insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshInsights = async () => {
    setLoading(true);
    try {
      await onRefresh({ timeRange });
      await loadDetailedInsights();
    } catch (error) {
      console.error('Error refreshing insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getInsightIcon = (type) => {
    const icons = {
      improvement: '📈',
      pattern: '🔍',
      recommendation: '💡',
      achievement: '🎯',
      trend: '📊',
      learning: '🧠'
    };
    return icons[type] || '💡';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    if (score >= 40) return '#e67e22';
    return '#e74c3c';
  };

  const tabOptions = [
    { id: 'patterns', label: 'Writing Patterns', icon: '🔍' },
    { id: 'performance', label: 'Performance Analysis', icon: '📊' },
    { id: 'learning', label: 'AI Learning Progress', icon: '🧠' },
    { id: 'recommendations', label: 'Personalized Tips', icon: '💡' }
  ];

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 3 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  return (
    <div className="learning-insights">
      <div className="insights-header">
        <div className="header-info">
          <h2>
            <span className="header-icon">🧠</span>
            Learning Insights
          </h2>
          <p className="header-subtitle">
            AI-powered analysis of your writing patterns and content evolution
          </p>
        </div>

        <div className="header-controls">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            onClick={refreshInsights}
            disabled={loading}
            className="refresh-btn"
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <span className="refresh-icon">🔄</span>
            )}
            Refresh
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="insights-navigation">
        {tabOptions.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`insights-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="insights-content">
        {activeTab === 'patterns' && (
          <motion.div
            key="patterns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="patterns-view"
          >
            <div className="insights-grid">
              {/* Writing Style Analysis */}
              <div className="insight-card large">
                <h3>
                  <span className="card-icon">✍️</span>
                  Writing Style Evolution
                </h3>
                
                <div className="style-metrics">
                  <div className="metric-row">
                    <div className="metric">
                      <span className="metric-label">Average Readability:</span>
                      <span className="metric-value">
                        {detailedInsights?.writingStyle?.readabilityScore || 75}/100
                      </span>
                      <div className="metric-trend">
                        <span className="trend-arrow">↗️</span>
                        +5 this month
                      </div>
                    </div>
                    
                    <div className="metric">
                      <span className="metric-label">Tone Consistency:</span>
                      <span className="metric-value">
                        {formatPercentage(detailedInsights?.writingStyle?.toneConsistency || 0.85)}
                      </span>
                      <div className="metric-trend">
                        <span className="trend-arrow">→</span>
                        Stable
                      </div>
                    </div>
                  </div>

                  <div className="style-patterns">
                    <h4>Identified Patterns:</h4>
                    <ul>
                      {detailedInsights?.writingStyle?.patterns?.map((pattern, index) => (
                        <li key={index}>
                          <span className="pattern-icon">{getInsightIcon(pattern.type)}</span>
                          {pattern.description}
                        </li>
                      )) || [
                        { type: 'pattern', description: 'Consistent use of engaging questions in introductions' },
                        { type: 'improvement', description: 'Increased use of data and statistics for credibility' },
                        { type: 'trend', description: 'More conversational tone in recent posts' }
                      ].map((pattern, index) => (
                        <li key={index}>
                          <span className="pattern-icon">{getInsightIcon(pattern.type)}</span>
                          {pattern.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content Structure Insights */}
              <div className="insight-card">
                <h3>
                  <span className="card-icon">🏗️</span>
                  Content Structure
                </h3>
                
                <div className="structure-analysis">
                  <div className="structure-metric">
                    <span className="structure-label">Optimal Length:</span>
                    <span className="structure-value">
                      {detailedInsights?.structure?.optimalLength || '800-1200'} words
                    </span>
                  </div>
                  
                  <div className="structure-metric">
                    <span className="structure-label">Best Performing Format:</span>
                    <span className="structure-value">
                      {detailedInsights?.structure?.bestFormat || 'List-based with subheadings'}
                    </span>
                  </div>

                  <div className="structure-recommendations">
                    <h5>Structure Recommendations:</h5>
                    <ul>
                      <li>Use 3-5 main sections for optimal engagement</li>
                      <li>Include bullet points for better scannability</li>
                      <li>Add call-to-action in conclusion</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Topic Preferences */}
              <div className="insight-card">
                <h3>
                  <span className="card-icon">🏷️</span>
                  Topic Analysis
                </h3>
                
                <div className="topic-insights">
                  <div className="top-topics">
                    <h5>Most Successful Topics:</h5>
                    {detailedInsights?.topics?.successful?.map((topic, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-name">{topic.name}</span>
                        <span className="topic-score">{topic.averageScore}/100</span>
                      </div>
                    )) || [
                      { name: 'Tutorial & Guides', averageScore: 85 },
                      { name: 'Industry Analysis', averageScore: 78 },
                      { name: 'Personal Stories', averageScore: 72 }
                    ].map((topic, index) => (
                      <div key={index} className="topic-item">
                        <span className="topic-name">{topic.name}</span>
                        <span className="topic-score">{topic.averageScore}/100</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="emerging-topics">
                    <h5>Emerging Interests:</h5>
                    <div className="topic-tags">
                      {['AI Tools', 'Remote Work', 'Sustainability'].map(topic => (
                        <span key={topic} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="performance-view"
          >
            <div className="performance-overview">
              <div className="overview-stats">
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-icon">📈</span>
                    <h4>Average Quality Score</h4>
                  </div>
                  <div className="stat-value">{insights?.averageQuality || 78}/100</div>
                  <div className="stat-change positive">+12% from last period</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-icon">⏱️</span>
                    <h4>Average Writing Time</h4>
                  </div>
                  <div className="stat-value">{formatDuration(insights?.averageWritingTime || 120)}</div>
                  <div className="stat-change negative">-15% more efficient</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-icon">🔄</span>
                    <h4>Revision Cycles</h4>
                  </div>
                  <div className="stat-value">{insights?.averageRevisions || 3.2}</div>
                  <div className="stat-change neutral">Consistent</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-icon">🎯</span>
                    <h4>Success Rate</h4>
                  </div>
                  <div className="stat-value">{formatPercentage(insights?.successRate || 0.82)}</div>
                  <div className="stat-change positive">+8% improvement</div>
                </div>
              </div>
            </div>

            <div className="performance-charts">
              <div className="chart-card">
                <h4>Quality Score Trends</h4>
                <div className="chart-placeholder">
                  <div className="trend-line">
                    <div className="data-points">
                      {[65, 70, 68, 75, 78, 82, 85].map((value, index) => (
                        <div
                          key={index}
                          className="data-point"
                          style={{
                            height: `${value}%`,
                            left: `${(index + 1) * 12}%`
                          }}
                          title={`Week ${index + 1}: ${value}/100`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h4>Content Categories Performance</h4>
                <div className="category-performance">
                  {[
                    { category: 'Tutorials', score: 88, count: 12 },
                    { category: 'Reviews', score: 75, count: 8 },
                    { category: 'Opinion', score: 72, count: 15 },
                    { category: 'News', score: 69, count: 6 }
                  ].map(item => (
                    <div key={item.category} className="category-item">
                      <div className="category-info">
                        <span className="category-name">{item.category}</span>
                        <span className="category-count">({item.count} posts)</span>
                      </div>
                      <div className="category-score-bar">
                        <div
                          className="score-fill"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor: getScoreColor(item.score)
                          }}
                        ></div>
                        <span className="score-text">{item.score}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="learning-view"
          >
            <div className="ai-learning-progress">
              <div className="learning-overview">
                <h3>AI Learning Progress</h3>
                <p>Track how the AI is adapting to your writing style and preferences</p>
              </div>

              <div className="learning-metrics">
                <div className="learning-metric">
                  <div className="metric-header">
                    <span className="metric-icon">🎯</span>
                    <h4>Style Adaptation</h4>
                  </div>
                  <div className="metric-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <span className="progress-text">85% Complete</span>
                  </div>
                  <p className="metric-description">
                    AI has learned your preferred tone, structure, and vocabulary patterns
                  </p>
                </div>

                <div className="learning-metric">
                  <div className="metric-header">
                    <span className="metric-icon">📚</span>
                    <h4>Content Preferences</h4>
                  </div>
                  <div className="metric-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: '72%' }}
                      ></div>
                    </div>
                    <span className="progress-text">72% Complete</span>
                  </div>
                  <p className="metric-description">
                    Understanding of your topic preferences and expertise areas
                  </p>
                </div>

                <div className="learning-metric">
                  <div className="metric-header">
                    <span className="metric-icon">🔍</span>
                    <h4>Quality Prediction</h4>
                  </div>
                  <div className="metric-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: '91%' }}
                      ></div>
                    </div>
                    <span className="progress-text">91% Accuracy</span>
                  </div>
                  <p className="metric-description">
                    Accuracy in predicting the success of your content pieces
                  </p>
                </div>
              </div>

              <div className="learning-insights-list">
                <h4>Recent Learning Insights</h4>
                <div className="insights-timeline">
                  {[
                    {
                      date: '2 days ago',
                      insight: 'Learned that you prefer shorter paragraphs for better readability',
                      type: 'style'
                    },
                    {
                      date: '1 week ago',
                      insight: 'Identified your expertise in productivity and time management topics',
                      type: 'content'
                    },
                    {
                      date: '2 weeks ago',
                      insight: 'Noted preference for data-driven arguments in opinion pieces',
                      type: 'structure'
                    }
                  ].map((item, index) => (
                    <div key={index} className="insight-timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">{item.date}</div>
                        <div className="timeline-insight">{item.insight}</div>
                        <div className="timeline-type">{item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="recommendations-view"
          >
            <div className="personalized-recommendations">
              <h3>Personalized Recommendations</h3>
              <p>AI-generated tips based on your writing patterns and goals</p>

              <div className="recommendation-categories">
                <div className="recommendation-category">
                  <h4>
                    <span className="category-icon">🚀</span>
                    Quick Wins
                  </h4>
                  <div className="recommendations-list">
                    {[
                      'Add more subheadings to improve scannability (avg. +15% engagement)',
                      'Include numbered lists in how-to content (+22% completion rate)',
                      'Use more specific examples in explanations (+18% clarity score)'
                    ].map((rec, index) => (
                      <div key={index} className="recommendation-item">
                        <span className="rec-icon">💡</span>
                        <span className="rec-text">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommendation-category">
                  <h4>
                    <span className="category-icon">📈</span>
                    Growth Opportunities
                  </h4>
                  <div className="recommendations-list">
                    {[
                      'Experiment with video content integration for tutorial posts',
                      'Develop a series format for complex topics to increase return visits',
                      'Create interactive elements like polls or quizzes for engagement'
                    ].map((rec, index) => (
                      <div key={index} className="recommendation-item">
                        <span className="rec-icon">🎯</span>
                        <span className="rec-text">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommendation-category">
                  <h4>
                    <span className="category-icon">⚠️</span>
                    Watch Out For
                  </h4>
                  <div className="recommendations-list">
                    {[
                      'Recent posts have been longer than optimal length (aim for 800-1200 words)',
                      'Technical jargon usage has increased - consider your general audience',
                      'Conclusion sections could be stronger with clearer call-to-actions'
                    ].map((rec, index) => (
                      <div key={index} className="recommendation-item warning">
                        <span className="rec-icon">⚠️</span>
                        <span className="rec-text">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="recommendation-actions">
                <h4>Suggested Next Steps</h4>
                <div className="action-cards">
                  <div className="action-card">
                    <div className="action-header">
                      <span className="action-icon">📝</span>
                      <h5>Content Audit</h5>
                    </div>
                    <p>Review your top 5 performing posts to identify success patterns</p>
                    <button className="action-btn">Start Audit</button>
                  </div>

                  <div className="action-card">
                    <div className="action-header">
                      <span className="action-icon">🎯</span>
                      <h5>Style Guide Update</h5>
                    </div>
                    <p>Update your style guide with recent learnings and preferences</p>
                    <button className="action-btn">Update Guide</button>
                  </div>

                  <div className="action-card">
                    <div className="action-header">
                      <span className="action-icon">📊</span>
                      <h5>Performance Goal</h5>
                    </div>
                    <p>Set a goal to improve average quality score to 85+ this month</p>
                    <button className="action-btn">Set Goal</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default LearningInsights;