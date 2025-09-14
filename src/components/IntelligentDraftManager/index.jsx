import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DraftCard from './DraftCard';
import DraftFilters from './DraftFilters';
import VersionHistory from './VersionHistory';
import CritiqueInterface from './CritiqueInterface';
import SuccessPrediction from './SuccessPrediction';
import LearningInsights from './LearningInsights';
import { useDraftIntelligence } from './hooks/useDraftIntelligence';
import { draftIntelligenceApi } from './utils/apiHelpers';
import './styles/DraftManager.css';
import './styles/CritiqueSystem.css';
import './styles/Intelligence.css';

function IntelligentDraftManager({ isMobile }) {
  const [activeView, setActiveView] = useState('drafts'); // 'drafts', 'history', 'critique', 'predictions', 'insights'
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateRange: 'all',
    sortBy: 'modified',
    sortOrder: 'desc',
    searchQuery: ''
  });

  // Custom hook for AI intelligence features
  const {
    predictions,
    insights,
    critiques,
    loadPredictions,
    loadInsights,
    loadCritiques,
    generateCritique,
    predictSuccess
  } = useDraftIntelligence();

  // Load drafts on component mount
  useEffect(() => {
    loadDrafts();
  }, []);

  // Load drafts from API
  const loadDrafts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await draftIntelligenceApi.drafts.getAllDrafts();
      if (response.success) {
        setDrafts(response.data.drafts || []);
      } else {
        setError(response.error || 'Failed to load drafts');
      }
    } catch (err) {
      console.error('Error loading drafts:', err);
      setError('Failed to load drafts');
    } finally {
      setLoading(false);
    }
  };

  // Handle draft selection
  const handleDraftSelect = (draft) => {
    setSelectedDraft(draft);
    // Load intelligence data for selected draft
    if (draft) {
      loadPredictions(draft.id);
      loadInsights(draft.id);
      loadCritiques(draft.id);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter and sort drafts
  const filteredDrafts = drafts.filter(draft => {
    if (filters.status !== 'all' && draft.status !== filters.status) return false;
    if (filters.category !== 'all' && draft.category !== filters.category) return false;
    if (filters.searchQuery && !draft.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !draft.content.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    
    // Date range filtering
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const draftDate = new Date(draft.lastModified);
      const daysDiff = Math.floor((now - draftDate) / (1000 * 60 * 60 * 24));
      
      switch (filters.dateRange) {
        case 'today':
          if (daysDiff > 0) return false;
          break;
        case 'week':
          if (daysDiff > 7) return false;
          break;
        case 'month':
          if (daysDiff > 30) return false;
          break;
      }
    }
    
    return true;
  }).sort((a, b) => {
    let aValue = a[filters.sortBy];
    let bValue = b[filters.sortBy];
    
    if (filters.sortBy === 'modified') {
      aValue = new Date(a.lastModified);
      bValue = new Date(b.lastModified);
    }
    
    if (filters.sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const navigationTabs = [
    { id: 'drafts', label: 'Smart Drafts', icon: '📝', count: filteredDrafts.length },
    { id: 'history', label: 'Version History', icon: '📚', disabled: !selectedDraft },
    { id: 'critique', label: 'AI Critique', icon: '🔍', disabled: !selectedDraft },
    { id: 'predictions', label: 'Success Forecast', icon: '📈', disabled: !selectedDraft },
    { id: 'insights', label: 'Learning Insights', icon: '🧠', count: insights?.totalInsights || 0 }
  ];

  if (loading) {
    return (
      <div className="draft-manager">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading intelligent draft management...</p>
        </div>
      </div>
    );
  }

  if (error && drafts.length === 0) {
    return (
      <div className="draft-manager">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Failed to Load Drafts</h3>
          <p>{error}</p>
          <button onClick={loadDrafts} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="draft-manager">
      {/* Header */}
      <div className="draft-manager-header">
        <div className="header-content">
          <h1>
            <span className="header-icon">🧠</span>
            Intelligent Draft Manager
          </h1>
          <p className="header-subtitle">
            AI-powered content management with version control, success predictions, and learning insights
          </p>
        </div>
        
        {selectedDraft && (
          <div className="selected-draft-indicator">
            <span className="indicator-label">Selected:</span>
            <span className="draft-title">{selectedDraft.title}</span>
            <button 
              onClick={() => setSelectedDraft(null)}
              className="clear-selection"
              title="Clear selection"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="intelligence-navigation">
        {navigationTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveView(tab.id)}
            className={`nav-tab ${activeView === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            disabled={tab.disabled}
            title={tab.disabled ? 'Select a draft first' : ''}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="tab-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="draft-manager-content">
        <AnimatePresence mode="wait">
          {activeView === 'drafts' && (
            <motion.div
              key="drafts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="drafts-view"
            >
              <DraftFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                draftsCount={filteredDrafts.length}
                totalDrafts={drafts.length}
              />
              
              <div className="drafts-grid">
                {filteredDrafts.length > 0 ? (
                  filteredDrafts.map(draft => (
                    <DraftCard
                      key={draft.id}
                      draft={draft}
                      isSelected={selectedDraft?.id === draft.id}
                      onSelect={() => handleDraftSelect(draft)}
                      onPredict={() => predictSuccess(draft.id)}
                      predictions={predictions[draft.id]}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No drafts match your filters</h3>
                    <p>Try adjusting your search criteria or create a new draft.</p>
                    <button onClick={() => setFilters({
                      status: 'all',
                      category: 'all',
                      dateRange: 'all',
                      sortBy: 'modified',
                      sortOrder: 'desc',
                      searchQuery: ''
                    })} className="clear-filters-button">
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeView === 'history' && selectedDraft && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VersionHistory
                draftId={selectedDraft.id}
                currentDraft={selectedDraft}
                onRestore={loadDrafts}
              />
            </motion.div>
          )}

          {activeView === 'critique' && selectedDraft && (
            <motion.div
              key="critique"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CritiqueInterface
                draft={selectedDraft}
                critiques={critiques[selectedDraft.id]}
                onGenerateCritique={() => generateCritique(selectedDraft.id)}
                onUpdateDraft={loadDrafts}
              />
            </motion.div>
          )}

          {activeView === 'predictions' && selectedDraft && (
            <motion.div
              key="predictions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessPrediction
                draft={selectedDraft}
                predictions={predictions[selectedDraft.id]}
                onUpdatePrediction={() => predictSuccess(selectedDraft.id)}
              />
            </motion.div>
          )}

          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LearningInsights
                insights={insights}
                drafts={drafts}
                onRefresh={loadInsights}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default IntelligentDraftManager;