import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function DraftFilters({ filters, onFilterChange, draftsCount, totalDrafts }) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('draftSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search to history
  const saveSearchToHistory = (query) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('draftSearchHistory', JSON.stringify(newHistory));
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    onFilterChange({ searchQuery: query });
    
    // Generate AI suggestions based on search
    if (query.length > 2) {
      generateAISuggestions(query);
    } else {
      setAiSuggestions([]);
    }
  };

  // Generate AI-powered search suggestions
  const generateAISuggestions = (query) => {
    const suggestions = [];
    const lowerQuery = query.toLowerCase();
    
    // Content-based suggestions
    if (lowerQuery.includes('tip') || lowerQuery.includes('guide')) {
      suggestions.push({
        type: 'content',
        suggestion: 'Tips and guides content',
        filter: { category: 'tutorial' },
        icon: '📚'
      });
    }
    
    if (lowerQuery.includes('review') || lowerQuery.includes('analysis')) {
      suggestions.push({
        type: 'content',
        suggestion: 'Review and analysis posts',
        filter: { category: 'review' },
        icon: '🔍'
      });
    }
    
    // Status-based suggestions
    if (lowerQuery.includes('draft') || lowerQuery.includes('unfinished')) {
      suggestions.push({
        type: 'status',
        suggestion: 'Draft status posts',
        filter: { status: 'draft' },
        icon: '📝'
      });
    }
    
    if (lowerQuery.includes('ready') || lowerQuery.includes('publish')) {
      suggestions.push({
        type: 'status',
        suggestion: 'Ready to publish',
        filter: { status: 'ready' },
        icon: '✅'
      });
    }
    
    // Time-based suggestions
    if (lowerQuery.includes('recent') || lowerQuery.includes('new')) {
      suggestions.push({
        type: 'time',
        suggestion: 'Recent drafts (last week)',
        filter: { dateRange: 'week' },
        icon: '⏰'
      });
    }
    
    if (lowerQuery.includes('old') || lowerQuery.includes('archive')) {
      suggestions.push({
        type: 'time',
        suggestion: 'Older drafts (over 30 days)',
        filter: { dateRange: 'month' },
        icon: '🗄️'
      });
    }
    
    setAiSuggestions(suggestions.slice(0, 3));
  };

  // Apply AI suggestion
  const applySuggestion = (suggestion) => {
    onFilterChange(suggestion.filter);
    setAiSuggestions([]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      status: 'all',
      category: 'all',
      dateRange: 'all',
      sortBy: 'modified',
      sortOrder: 'desc',
      searchQuery: ''
    });
    setAiSuggestions([]);
  };

  // Quick filter presets
  const quickFilters = [
    {
      label: 'Recent Drafts',
      icon: '🆕',
      filters: { status: 'draft', dateRange: 'week' }
    },
    {
      label: 'Ready to Publish',
      icon: '🚀',
      filters: { status: 'ready' }
    },
    {
      label: 'In Review',
      icon: '👀',
      filters: { status: 'review' }
    },
    {
      label: 'High Quality',
      icon: '⭐',
      filters: { sortBy: 'quality', sortOrder: 'desc' }
    },
    {
      label: 'Need Attention',
      icon: '⚠️',
      filters: { status: 'draft', sortBy: 'modified', sortOrder: 'asc' }
    }
  ];

  const hasActiveFilters = filters.status !== 'all' || 
                          filters.category !== 'all' || 
                          filters.dateRange !== 'all' || 
                          filters.searchQuery !== '';

  return (
    <div className="draft-filters">
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search drafts... (AI-powered suggestions)"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  saveSearchToHistory(filters.searchQuery);
                }
              }}
              className="search-input"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="clear-search"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* AI Suggestions */}
          <AnimatePresence>
            {aiSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="ai-suggestions"
              >
                <div className="suggestions-header">
                  <span className="ai-icon">🤖</span>
                  <span>AI Suggestions</span>
                </div>
                {aiSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => applySuggestion(suggestion)}
                    className="suggestion-item"
                  >
                    <span className="suggestion-icon">{suggestion.icon}</span>
                    <span className="suggestion-text">{suggestion.suggestion}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Search History */}
          {searchHistory.length > 0 && filters.searchQuery === '' && (
            <div className="search-history">
              <div className="history-header">Recent Searches</div>
              {searchHistory.map((query, index) => (
                <button
                  key={index}
                  onClick={() => onFilterChange({ searchQuery: query })}
                  className="history-item"
                >
                  <span className="history-icon">🕒</span>
                  <span className="history-text">{query}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="quick-filters">
        <div className="quick-filters-header">
          <span className="quick-filters-label">Quick Filters:</span>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="advanced-toggle"
          >
            <span className="toggle-icon">⚙️</span>
            Advanced
            <span className={`toggle-arrow ${showAdvancedFilters ? 'up' : 'down'}`}>
              {showAdvancedFilters ? '▲' : '▼'}
            </span>
          </button>
        </div>
        
        <div className="quick-filter-buttons">
          {quickFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => onFilterChange(filter.filters)}
              className="quick-filter-btn"
            >
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="advanced-filters"
          >
            <div className="filter-grid">
              {/* Status Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <span className="label-icon">📊</span>
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => onFilterChange({ status: e.target.value })}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="review">In Review</option>
                  <option value="ready">Ready</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <span className="label-icon">🏷️</span>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="review">Review</option>
                  <option value="news">News</option>
                  <option value="opinion">Opinion</option>
                  <option value="guide">Guide</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <span className="label-icon">📅</span>
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => onFilterChange({ dateRange: e.target.value })}
                  className="filter-select"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="filter-group">
                <label className="filter-label">
                  <span className="label-icon">🔢</span>
                  Sort By
                </label>
                <div className="sort-controls">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange({ sortBy: e.target.value })}
                    className="filter-select"
                  >
                    <option value="modified">Last Modified</option>
                    <option value="created">Created Date</option>
                    <option value="title">Title</option>
                    <option value="quality">Quality Score</option>
                    <option value="wordCount">Word Count</option>
                  </select>
                  <button
                    onClick={() => onFilterChange({ 
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
                    })}
                    className="sort-order-btn"
                    title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                  >
                    {filters.sortOrder === 'asc' ? '📈' : '📉'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Status Bar */}
      <div className="filter-status">
        <div className="status-info">
          <span className="results-count">
            {draftsCount === totalDrafts 
              ? `${totalDrafts} drafts` 
              : `${draftsCount} of ${totalDrafts} drafts`}
          </span>
          
          {hasActiveFilters && (
            <div className="active-filters">
              <span className="active-filters-label">Active filters:</span>
              {filters.status !== 'all' && (
                <span className="active-filter">
                  Status: {filters.status}
                  <button onClick={() => onFilterChange({ status: 'all' })}>✕</button>
                </span>
              )}
              {filters.category !== 'all' && (
                <span className="active-filter">
                  Category: {filters.category}
                  <button onClick={() => onFilterChange({ category: 'all' })}>✕</button>
                </span>
              )}
              {filters.dateRange !== 'all' && (
                <span className="active-filter">
                  Date: {filters.dateRange}
                  <button onClick={() => onFilterChange({ dateRange: 'all' })}>✕</button>
                </span>
              )}
              {filters.searchQuery && (
                <span className="active-filter">
                  Search: "{filters.searchQuery}"
                  <button onClick={() => onFilterChange({ searchQuery: '' })}>✕</button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="clear-all-btn">
            <span className="clear-icon">🗑️</span>
            Clear All
          </button>
        )}
      </div>

      {/* Smart Recommendations */}
      {draftsCount === 0 && hasActiveFilters && (
        <div className="no-results-help">
          <div className="help-icon">💡</div>
          <div className="help-content">
            <h4>No drafts match your criteria</h4>
            <p>Try these suggestions:</p>
            <ul>
              <li>Remove some filters to see more results</li>
              <li>Check your search spelling</li>
              <li>Try broader search terms</li>
              <li>Use the AI suggestions above</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DraftFilters;