import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getVisiblePosts } from '../utils/blogUtils';

function BlogSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const posts = getVisiblePosts();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sidebar-toggle"
        style={{
          position: 'fixed',
          left: isOpen ? (isMobile ? '250px' : '280px') : '20px',
          bottom: isMobile ? '30px' : '50px',
          zIndex: 1000,
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          border: 'none',
          borderRadius: '25px',
          padding: isMobile ? '8px 16px' : '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'left 0.3s ease',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          fontSize: isMobile ? '0.9rem' : '1rem'
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
              width: isMobile ? '250px' : '280px',
              backgroundColor: 'var(--neutral-color)',
              boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '80px 15px 20px' : '100px 20px 20px',
              overflowY: 'auto',
              zIndex: 999
            }}
          >
            <h2 style={{ 
              marginBottom: isMobile ? '15px' : '20px',
              color: 'var(--primary-color)',
              fontSize: isMobile ? '1.3rem' : '1.5rem',
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '10px' }}>
              {posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  style={{
                    padding: isMobile ? '12px' : '15px',
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
                  <div style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    marginBottom: '5px',
                    lineHeight: 1.3
                  }}>
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