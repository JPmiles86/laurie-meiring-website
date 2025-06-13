import React, { useState, useEffect } from 'react';
import { X, Save, FileText, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import { analyzeExistingBlogs } from './services/aiService';

const StyleBibleManager = ({ onClose }) => {
  const [styleBible, setStyleBible] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectionMode, setSelectionMode] = useState('recent-10');
  const [showBlogList, setShowBlogList] = useState(false);
  const [apiProvider, setApiProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Load existing style bible from localStorage
    const saved = localStorage.getItem('style-bible');
    if (saved) {
      setStyleBible(saved);
    }

    // Load API settings
    const settings = JSON.parse(localStorage.getItem('ai-settings') || '{}');
    if (settings.provider) setApiProvider(settings.provider);
    if (settings.apiKey) setApiKey(settings.apiKey);

    // Load blogs
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await fetch('/src/data/blogs.json');
      const data = await response.json();
      setAllBlogs(data.posts || []);
      
      // Auto-select blogs based on default mode
      if (data.posts && data.posts.length > 0) {
        selectBlogsByMode('recent-10', data.posts);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const selectBlogsByMode = (mode, blogs = allBlogs) => {
    let selected = [];
    
    switch (mode) {
      case 'recent-5':
        selected = blogs.slice(0, 5);
        break;
      case 'recent-10':
        selected = blogs.slice(0, 10);
        break;
      case 'recent-20':
        selected = blogs.slice(0, 20);
        break;
      case 'random-10':
        selected = [...blogs].sort(() => Math.random() - 0.5).slice(0, 10);
        break;
      case 'all':
        selected = blogs;
        break;
      case 'manual':
        // Keep current selection
        return;
    }
    
    setSelectedBlogs(selected);
    setSelectionMode(mode);
  };

  const toggleBlogSelection = (blogId) => {
    setSelectedBlogs(prev => {
      const isSelected = prev.some(b => b.id === blogId);
      if (isSelected) {
        return prev.filter(b => b.id !== blogId);
      } else {
        const blog = allBlogs.find(b => b.id === blogId);
        return blog ? [...prev, blog] : prev;
      }
    });
    setSelectionMode('manual');
  };

  const getCategoryCounts = () => {
    const counts = {};
    allBlogs.forEach(blog => {
      (blog.categories || []).forEach(cat => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  };

  const selectByCategory = (category) => {
    const filtered = allBlogs.filter(blog => 
      (blog.categories || []).includes(category)
    );
    setSelectedBlogs(filtered);
    setSelectionMode('manual');
  };

  const analyzeBlogs = async () => {
    if (!apiKey) {
      alert('Please configure your API key in AI Settings first');
      return;
    }

    if (selectedBlogs.length === 0) {
      alert('Please select at least one blog to analyze');
      return;
    }

    setIsAnalyzing(true);
    setSaveStatus(null);
    
    try {
      // Analyze writing style from selected blogs
      const analysis = await analyzeExistingBlogs({
        provider: apiProvider,
        apiKey: apiKey,
        blogs: selectedBlogs
      });
      
      setStyleBible(analysis);
      setSaveStatus('success');
      
      // Auto-save after successful analysis
      setTimeout(() => {
        localStorage.setItem('style-bible', analysis);
      }, 500);
    } catch (error) {
      console.error('Error analyzing blogs:', error);
      setSaveStatus('error');
      alert(`Error: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveStyleBible = () => {
    localStorage.setItem('style-bible', styleBible);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="style-bible-overlay" style={overlayStyles}>
      <div className="style-bible-modal" style={modalStyles}>
        <div className="modal-header">
          <h3><FileText className="icon" /> Style Bible Manager</h3>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-content">
          <p className="description">
            The Style Bible defines your writing voice, tone, and patterns. 
            The AI will use these rules to generate content that matches your style.
          </p>

          {allBlogs.length > 0 && (
            <div className="blog-selection-section">
              <h4>Select Blogs to Analyze ({selectedBlogs.length} selected)</h4>
              
              <div className="selection-controls">
                <div className="quick-select-buttons">
                  <button 
                    className={`select-btn ${selectionMode === 'recent-5' ? 'active' : ''}`}
                    onClick={() => selectBlogsByMode('recent-5')}
                  >
                    Recent 5
                  </button>
                  <button 
                    className={`select-btn ${selectionMode === 'recent-10' ? 'active' : ''}`}
                    onClick={() => selectBlogsByMode('recent-10')}
                  >
                    Recent 10
                  </button>
                  {allBlogs.length > 20 && (
                    <button 
                      className={`select-btn ${selectionMode === 'recent-20' ? 'active' : ''}`}
                      onClick={() => selectBlogsByMode('recent-20')}
                    >
                      Recent 20
                    </button>
                  )}
                  <button 
                    className={`select-btn ${selectionMode === 'random-10' ? 'active' : ''}`}
                    onClick={() => selectBlogsByMode('random-10')}
                  >
                    Random 10
                  </button>
                  {allBlogs.length <= 20 && (
                    <button 
                      className={`select-btn ${selectionMode === 'all' ? 'active' : ''}`}
                      onClick={() => selectBlogsByMode('all')}
                    >
                      All ({allBlogs.length})
                    </button>
                  )}
                </div>

                {allBlogs.length > 5 && (
                  <div className="category-filter">
                    <label>By Category:</label>
                    <select 
                      onChange={(e) => e.target.value && selectByCategory(e.target.value)}
                      value=""
                    >
                      <option value="">Select category...</option>
                      {Object.entries(getCategoryCounts()).map(([cat, count]) => (
                        <option key={cat} value={cat}>
                          {cat} ({count})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button 
                  className="toggle-list-btn"
                  onClick={() => setShowBlogList(!showBlogList)}
                >
                  Manual Selection <ChevronDown className={`icon ${showBlogList ? 'rotated' : ''}`} />
                </button>
              </div>

              {showBlogList && (
                <div className="blog-list">
                  {allBlogs.map(blog => (
                    <label key={blog.id} className="blog-item">
                      <input
                        type="checkbox"
                        checked={selectedBlogs.some(b => b.id === blog.id)}
                        onChange={() => toggleBlogSelection(blog.id)}
                      />
                      <span className="blog-title">{blog.title}</span>
                      <span className="blog-date">
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {selectedBlogs.length > 0 && (
                <div className="selected-summary">
                  <strong>Selected blogs:</strong>
                  <ul>
                    {selectedBlogs.slice(0, 5).map(blog => (
                      <li key={blog.id}>{blog.title}</li>
                    ))}
                    {selectedBlogs.length > 5 && (
                      <li>...and {selectedBlogs.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="action-buttons">
            <button 
              className="analyze-button"
              onClick={analyzeBlogs}
              disabled={isAnalyzing || selectedBlogs.length === 0}
            >
              {isAnalyzing ? 'Analyzing...' : `Analyze ${selectedBlogs.length} Blog${selectedBlogs.length !== 1 ? 's' : ''}`}
            </button>
          </div>

          <div className="style-bible-editor">
            <label>Writing Style Rules</label>
            <textarea
              value={styleBible}
              onChange={(e) => setStyleBible(e.target.value)}
              placeholder="Enter your writing style rules..."
              rows={20}
            />
          </div>

          {saveStatus && (
            <div className={`status-message ${saveStatus}`}>
              {saveStatus === 'success' ? (
                <>
                  <CheckCircle className="icon" />
                  Style Bible saved successfully!
                </>
              ) : (
                <>
                  <AlertCircle className="icon" />
                  Error saving Style Bible
                </>
              )}
            </div>
          )}

          <div className="modal-actions">
            <button className="save-button" onClick={saveStyleBible}>
              <Save className="icon" />
              Save Style Bible
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyles = {
  backgroundColor: 'white',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
};

const styles = `
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e5e5;
  }
  
  .modal-header h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    font-size: 1.5rem;
    color: #1a1a1a;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s;
  }
  
  .close-button:hover {
    background-color: #f5f5f5;
    color: #333;
  }
  
  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .description {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  .blog-selection-section {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .blog-selection-section h4 {
    margin: 0 0 1rem 0;
    color: #333;
  }
  
  .selection-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .quick-select-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .select-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .select-btn:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
  
  .select-btn.active {
    background-color: var(--primary-color, #4CAF50);
    color: white;
    border-color: var(--primary-color, #4CAF50);
  }
  
  .category-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .category-filter label {
    font-weight: 500;
    color: #555;
  }
  
  .category-filter select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
  }
  
  .toggle-list-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .toggle-list-btn:hover {
    background-color: #f5f5f5;
    border-color: #999;
  }
  
  .icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s;
  }
  
  .icon.rotated {
    transform: rotate(180deg);
  }
  
  .blog-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.5rem;
    background: white;
    margin-top: 1rem;
  }
  
  .blog-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .blog-item:hover {
    background-color: #f5f5f5;
  }
  
  .blog-item input[type="checkbox"] {
    cursor: pointer;
  }
  
  .blog-title {
    flex: 1;
    color: #333;
  }
  
  .blog-date {
    font-size: 0.875rem;
    color: #999;
  }
  
  .selected-summary {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #e8f5e9;
    border-radius: 6px;
  }
  
  .selected-summary strong {
    color: #2e7d32;
  }
  
  .selected-summary ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1.5rem;
    color: #555;
  }
  
  .selected-summary li {
    margin: 0.25rem 0;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .analyze-button {
    flex: 1;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color, #4CAF50);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .analyze-button:hover:not(:disabled) {
    background-color: var(--primary-color-dark, #45a049);
  }
  
  .analyze-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .style-bible-editor {
    margin-bottom: 1.5rem;
  }
  
  .style-bible-editor label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  .style-bible-editor textarea {
    width: 100%;
    min-height: 400px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    resize: vertical;
  }
  
  .status-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  
  .status-message.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .status-message.error {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .modal-actions {
    padding: 1.5rem;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .save-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--secondary-color, #2196F3);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .save-button:hover {
    background-color: var(--secondary-color-dark, #1976D2);
  }
`;

// Add styles to document
if (typeof document !== 'undefined' && !document.getElementById('style-bible-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'style-bible-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default StyleBibleManager;