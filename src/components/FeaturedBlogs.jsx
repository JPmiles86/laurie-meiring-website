import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function FeaturedBlogs({ posts, isMobile }) {
  // Filter for featured posts
  const featuredPosts = posts.filter(post => post.featured === true).slice(0, 3);

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: 'var(--secondary-color)',
      padding: isMobile ? '40px 20px' : '60px 40px',
      marginBottom: '40px',
      borderRadius: '0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          marginBottom: '30px',
          color: 'var(--neutral-color)',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          Featured Articles
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : featuredPosts.length === 1 ? '1fr' : featuredPosts.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  backgroundColor: 'var(--neutral-color)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
              >
                {post.featuredImage && (
                  <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--neutral-color)',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>
                      FEATURED
                    </div>
                  </div>
                )}
                <div style={{
                  padding: '20px'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '10px',
                    color: 'var(--primary-color)',
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-color)',
                    opacity: 0.8,
                    marginBottom: '15px'
                  }}>
                    {new Date(post.publishDate).toLocaleDateString()} by {post.author}
                  </p>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: 'var(--text-color)',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {post.content.replace(/!\[.*?\]\(.*?\)/g, '').substring(0, 150)}...
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedBlogs;