import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { draftIntelligenceApi } from './utils/apiHelpers';

function VersionHistory({ draftId, currentDraft, onRestore }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [diffResult, setDiffResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVersionHistory();
  }, [draftId]);

  const loadVersionHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await draftIntelligenceApi.versions.getVersionHistory(draftId);
      if (response.success) {
        setVersions(response.data.versions || []);
      } else {
        setError(response.error || 'Failed to load version history');
      }
    } catch (err) {
      console.error('Error loading version history:', err);
      setError('Failed to load version history');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getChangeType = (version) => {
    if (!version.changes) return 'edit';
    
    const changes = version.changes;
    if (changes.titleChanged && changes.contentChanged) return 'major';
    if (changes.titleChanged) return 'title';
    if (changes.contentChanged) return 'content';
    if (changes.statusChanged) return 'status';
    if (changes.metadataChanged) return 'metadata';
    return 'edit';
  };

  const getChangeIcon = (type) => {
    const icons = {
      major: '🔄',
      title: '📝',
      content: '📄',
      status: '🏷️',
      metadata: '⚙️',
      edit: '✏️'
    };
    return icons[type] || '✏️';
  };

  const getChangeColor = (type) => {
    const colors = {
      major: '#e74c3c',
      title: '#3498db',
      content: '#2ecc71',
      status: '#f39c12',
      metadata: '#9b59b6',
      edit: '#95a5a6'
    };
    return colors[type] || '#95a5a6';
  };

  const toggleVersionSelection = (versionId) => {
    if (compareMode) {
      if (selectedVersions.includes(versionId)) {
        setSelectedVersions(selectedVersions.filter(id => id !== versionId));
      } else if (selectedVersions.length < 2) {
        setSelectedVersions([...selectedVersions, versionId]);
      }
    }
  };

  const compareVersions = async () => {
    if (selectedVersions.length !== 2) return;
    
    try {
      setLoading(true);
      const response = await draftIntelligenceApi.versions.compareVersions(selectedVersions[0], selectedVersions[1]);
      if (response.success) {
        setDiffResult(response.data);
        setShowDiff(true);
      } else {
        setError('Failed to compare versions');
      }
    } catch (err) {
      console.error('Error comparing versions:', err);
      setError('Failed to compare versions');
    } finally {
      setLoading(false);
    }
  };

  const restoreVersion = async (versionId) => {
    if (!window.confirm('Are you sure you want to restore this version? This will create a new version with the restored content.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await draftIntelligenceApi.versions.restoreVersion(draftId, versionId);
      if (response.success) {
        await loadVersionHistory();
        onRestore && onRestore();
      } else {
        setError('Failed to restore version');
      }
    } catch (err) {
      console.error('Error restoring version:', err);
      setError('Failed to restore version');
    } finally {
      setLoading(false);
    }
  };

  const renderDiffView = () => {
    if (!diffResult) return null;

    const renderDiffText = (diff) => {
      return diff.map((part, index) => {
        let className = 'diff-part';
        if (part.added) className += ' added';
        if (part.removed) className += ' removed';
        
        return (
          <span key={index} className={className}>
            {part.value}
          </span>
        );
      });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="diff-view"
      >
        <div className="diff-header">
          <h3>Version Comparison</h3>
          <button
            onClick={() => setShowDiff(false)}
            className="close-diff-btn"
          >
            ✕
          </button>
        </div>

        <div className="diff-content">
          {diffResult.titleDiff && (
            <div className="diff-section">
              <h4>Title Changes</h4>
              <div className="diff-text">
                {renderDiffText(diffResult.titleDiff)}
              </div>
            </div>
          )}

          {diffResult.contentDiff && (
            <div className="diff-section">
              <h4>Content Changes</h4>
              <div className="diff-text">
                {renderDiffText(diffResult.contentDiff)}
              </div>
            </div>
          )}

          {diffResult.metadataDiff && (
            <div className="diff-section">
              <h4>Metadata Changes</h4>
              <div className="metadata-diff">
                {Object.entries(diffResult.metadataDiff).map(([key, value]) => (
                  <div key={key} className="metadata-change">
                    <strong>{key}:</strong> {value.old} → {value.new}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="diff-stats">
          <div className="stat">
            <span className="stat-label">Added:</span>
            <span className="stat-value added">+{diffResult.stats.added}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Removed:</span>
            <span className="stat-value removed">-{diffResult.stats.removed}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Changed:</span>
            <span className="stat-value">~{diffResult.stats.changed}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading && versions.length === 0) {
    return (
      <div className="version-history-loading">
        <div className="loading-spinner"></div>
        <p>Loading version history...</p>
      </div>
    );
  }

  if (error && versions.length === 0) {
    return (
      <div className="version-history-error">
        <div className="error-icon">⚠️</div>
        <h3>Failed to Load Version History</h3>
        <p>{error}</p>
        <button onClick={loadVersionHistory} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="version-history">
      <div className="version-history-header">
        <div className="header-info">
          <h2>
            <span className="header-icon">📚</span>
            Version History
          </h2>
          <p className="header-subtitle">
            Track changes and restore previous versions of "{currentDraft?.title}"
          </p>
        </div>

        <div className="header-actions">
          <button
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedVersions([]);
              setShowDiff(false);
            }}
            className={`compare-mode-btn ${compareMode ? 'active' : ''}`}
          >
            <span className="btn-icon">🔍</span>
            {compareMode ? 'Exit Compare' : 'Compare Mode'}
          </button>

          {compareMode && selectedVersions.length === 2 && (
            <button
              onClick={compareVersions}
              className="compare-btn"
            >
              <span className="btn-icon">⚖️</span>
              Compare Selected
            </button>
          )}
        </div>
      </div>

      {compareMode && (
        <div className="compare-mode-info">
          <div className="info-icon">ℹ️</div>
          <span>
            Select 2 versions to compare ({selectedVersions.length}/2 selected)
          </span>
        </div>
      )}

      <div className="version-history-content">
        <AnimatePresence>
          {showDiff && renderDiffView()}
        </AnimatePresence>

        <div className="version-timeline">
          {versions.map((version, index) => {
            const changeType = getChangeType(version);
            const isSelected = selectedVersions.includes(version.id);
            const isCurrent = index === 0;

            return (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`version-item ${isCurrent ? 'current' : ''} ${
                  isSelected ? 'selected' : ''
                } ${compareMode ? 'compare-mode' : ''}`}
                onClick={() => compareMode && toggleVersionSelection(version.id)}
              >
                <div className="version-marker">
                  <div 
                    className="marker-dot"
                    style={{ backgroundColor: getChangeColor(changeType) }}
                  >
                    {getChangeIcon(changeType)}
                  </div>
                  {index < versions.length - 1 && <div className="marker-line"></div>}
                </div>

                <div className="version-content">
                  <div className="version-header">
                    <div className="version-info">
                      <h4 className="version-title">
                        {version.title || 'Untitled'}
                        {isCurrent && <span className="current-badge">Current</span>}
                      </h4>
                      <div className="version-meta">
                        <span className="version-timestamp">
                          {formatTimestamp(version.timestamp)}
                        </span>
                        <span className="version-author">
                          by {version.author || 'Unknown'}
                        </span>
                        {version.aiAssisted && (
                          <span className="ai-badge" title="AI-assisted changes">
                            🤖 AI
                          </span>
                        )}
                      </div>
                    </div>

                    {compareMode && (
                      <div className="selection-indicator">
                        <div className={`selection-checkbox ${isSelected ? 'selected' : ''}`}>
                          {isSelected && '✓'}
                        </div>
                      </div>
                    )}
                  </div>

                  {version.changesSummary && (
                    <div className="changes-summary">
                      <h5>Changes:</h5>
                      <ul>
                        {version.changesSummary.map((change, idx) => (
                          <li key={idx}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="version-stats">
                    <div className="stat">
                      <span className="stat-icon">📊</span>
                      <span className="stat-label">Words:</span>
                      <span className="stat-value">{version.wordCount || 0}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🎯</span>
                      <span className="stat-label">Quality:</span>
                      <span className="stat-value">{version.qualityScore || 0}/100</span>
                    </div>
                    {version.readabilityScore && (
                      <div className="stat">
                        <span className="stat-icon">📖</span>
                        <span className="stat-label">Readability:</span>
                        <span className="stat-value">{version.readabilityScore}</span>
                      </div>
                    )}
                  </div>

                  {!compareMode && !isCurrent && (
                    <div className="version-actions">
                      <button
                        onClick={() => restoreVersion(version.id)}
                        className="restore-btn"
                        title="Restore this version"
                      >
                        <span className="btn-icon">🔄</span>
                        Restore
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVersions([versions[0].id, version.id]);
                          compareVersions();
                        }}
                        className="quick-compare-btn"
                        title="Compare with current version"
                      >
                        <span className="btn-icon">⚖️</span>
                        Compare
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {versions.length === 0 && (
          <div className="no-versions">
            <div className="no-versions-icon">📝</div>
            <h3>No Version History</h3>
            <p>This draft doesn't have any saved versions yet.</p>
          </div>
        )}
      </div>

      {/* Version Control Tips */}
      <div className="version-tips">
        <h4>💡 Version Control Tips</h4>
        <ul>
          <li>Versions are automatically saved when you make significant changes</li>
          <li>Use compare mode to see differences between any two versions</li>
          <li>Restoring a version creates a new version, so you never lose work</li>
          <li>AI-assisted changes are marked with the 🤖 icon</li>
        </ul>
      </div>
    </div>
  );
}

export default VersionHistory;