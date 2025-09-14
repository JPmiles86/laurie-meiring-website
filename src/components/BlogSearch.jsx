import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function BlogSearch({ posts, onSearchResults, isMobile }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      } else {
        onSearchResults(posts);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, posts]);

  const performSearch = (term) => {
    setIsSearching(true);
    const lowerTerm = term.toLowerCase();

    const results = posts.filter(post => {
      // Search in title
      if (post.title.toLowerCase().includes(lowerTerm)) return true;
      
      // Search in content
      if (post.content.toLowerCase().includes(lowerTerm)) return true;
      
      // Search in tags
      if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerTerm))) return true;
      
      // Search in categories
      if (post.categories && post.categories.some(cat => cat.toLowerCase().includes(lowerTerm))) return true;
      
      // Search in author
      if (post.author && post.author.toLowerCase().includes(lowerTerm)) return true;
      
      return false;
    });

    onSearchResults(results);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearchResults(posts);
    setIsSearching(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '30px',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%'
      }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts by title, content, tags..."
          style={{
            width: '100%',
            padding: isMobile ? '12px 40px 12px 20px' : '15px 50px 15px 25px',
            fontSize: isMobile ? '1rem' : '1.1rem',
            borderRadius: '30px',
            border: '2px solid var(--border-color)',
            backgroundColor: 'var(--neutral-color)',
            color: 'var(--text-color)',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary-color)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          }}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          left: isMobile ? '15px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: 'var(--text-color)',
          opacity: 0.5
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            style={{
              position: 'absolute',
              right: isMobile ? '10px' : '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              padding: '5px',
              cursor: 'pointer',
              color: 'var(--text-color)',
              opacity: 0.6,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.6';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Search status */}
      {isSearching && searchTerm && (
        <div style={{
          marginTop: '10px',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: 'var(--text-color)',
          opacity: 0.7
        }}>
          Searching for "{searchTerm}"...
        </div>
      )}
    </motion.div>
  );
}

export default BlogSearch;