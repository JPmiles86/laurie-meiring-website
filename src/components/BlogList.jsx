import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVisiblePosts } from '../utils/blogUtils';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function BlogList({ isMobile, onSubscribe }) {
  const [posts, setPosts] = useState([]);
  const containerRef = React.useRef(null);

  useEffect(() => {
    setPosts(getVisiblePosts());
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const gridContainer = container.querySelector('.blog-grid');
      
      const adjustHeight = () => {
        console.log('BlogList container height:', container.offsetHeight);
        console.log('BlogList scrollHeight:', container.scrollHeight);
        console.log('Grid container height:', gridContainer?.offsetHeight);
        console.log('Grid scrollHeight:', gridContainer?.scrollHeight);
        
        // Force container to contain its content
        if (gridContainer && gridContainer.scrollHeight > 0) {
          const totalHeight = gridContainer.scrollHeight + 40; // Reduced padding
          container.style.minHeight = `${totalHeight}px`;
          console.log('Setting container minHeight to:', totalHeight);
        }
      };
      
      // Initial adjustment
      setTimeout(adjustHeight, 100);
      
      // Watch for size changes
      const resizeObserver = new ResizeObserver(adjustHeight);
      if (gridContainer) {
        resizeObserver.observe(gridContainer);
      }
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [posts]);

  const getPreviewContent = (content) => {
    // Remove image markdown before getting preview
    const textContent = content.replace(/!\[.*?\]\(.*?\)/g, '');
    return textContent.substring(0, 200) + '...';
  };

  // Custom components for ReactMarkdown
  const components = {
    img: ({node, ...props}) => (
      <div style={{ 
        width: '80%', 
        margin: '2rem auto', 
        textAlign: 'center'
      }}>
        <img 
          {...props} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }} 
        />
      </div>
    )
  };

  return (
    <div ref={containerRef} className="blog-list" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '15px' : '20px',
      paddingBottom: '20px',
      marginBottom: '60px'
    }}>
      <div className="blog-grid" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '40px',
        rowGap: '60px',
        width: '100%'
      }}>
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              backgroundColor: 'var(--neutral-color)',
              borderRadius: isMobile ? '16px' : '12px',
              padding: isMobile ? '15px' : '20px',
              boxShadow: isMobile ? '0 8px 15px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {post.featuredImage && (
              <div style={{
                marginBottom: '20px',
                marginLeft: isMobile ? '-15px' : '-20px',
                marginRight: isMobile ? '-15px' : '-20px',
                marginTop: isMobile ? '-15px' : '-20px',
                height: '250px',
                overflow: 'hidden'
              }}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
              </div>
            )}
            <h2 style={{
              fontSize: isMobile ? '1.6rem' : '1.8rem',
              marginBottom: '10px',
              color: 'var(--primary-color)'
            }}>
              <Link 
                to={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                {post.title}
              </Link>
            </h2>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--text-color)',
              opacity: 0.8,
              marginBottom: '15px'
            }}>
              {new Date(post.publishDate).toLocaleDateString()} by {post.author}
            </div>
            <div style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: 1.6,
              marginBottom: '15px',
              flexGrow: 1
            }}>
              <ReactMarkdown components={components}>
                {getPreviewContent(post.content)}
              </ReactMarkdown>
            </div>
            <Link
              to={`/blog/${post.slug}`}
              style={{
                display: 'inline-block',
                padding: isMobile ? '10px 20px' : '8px 16px',
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                borderRadius: '30px',
                textDecoration: 'none',
                fontSize: isMobile ? '1rem' : '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: isMobile ? '0 4px 8px rgba(0, 0, 0, 0.15)' : 'none',
                alignSelf: 'flex-start'
              }}
            >
              Read More
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default BlogList; 