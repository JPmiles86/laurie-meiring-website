import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getVisiblePosts } from '../utils/blogUtils';

function BlogSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const posts = getVisiblePosts();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sidebar-toggle"
        style={{
          position: 'fixed',
          left: isOpen ? '280px' : '20px',
          bottom: '50px',
          zIndex: 1000,
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          border: 'none',
          borderRadius: '25px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'left 0.3s ease',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          fontSize: '1rem'
        }}
      >
        {isOpen ? (
          <>
            <span>←</span>
            <span>Close Menu</span>
          </>
        ) : (
          <>
            <span>→</span>
            <span>View All Posts</span>
          </>
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: '280px',
              backgroundColor: 'var(--neutral-color)',
              boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
              padding: '100px 20px 20px',
              overflowY: 'auto',
              zIndex: 999
            }}
          >
            <h2 style={{ 
              marginBottom: '20px',
              color: 'var(--primary-color)',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Recent Posts
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  style={{
                    padding: '15px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    backgroundColor: location.pathname === `/blog/${post.slug}` 
                      ? 'var(--secondary-color)' 
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: location.pathname === `/blog/${post.slug}`
                      ? 'var(--secondary-color)'
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== `/blog/${post.slug}`) {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.borderColor = 'var(--secondary-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== `/blog/${post.slug}`) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                    {post.title}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BlogSidebar; 