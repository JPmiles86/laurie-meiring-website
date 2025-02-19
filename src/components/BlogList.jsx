import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getVisiblePosts } from '../utils/blogUtils';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getVisiblePosts());
  }, []);

  const getPreviewContent = (content) => {
    // Remove image markdown before getting preview
    const textContent = content.replace(/!\[.*?\]\(.*?\)/g, '');
    return textContent.substring(0, 200) + '...';
  };

  return (
    <div className="blog-list" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            backgroundColor: 'var(--neutral-color)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
        >
          {post.featuredImage && (
            <div style={{
              marginBottom: '20px',
              marginLeft: '-20px',
              marginRight: '-20px',
              marginTop: '-20px',
              height: '300px',
              overflow: 'hidden'
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
            </div>
          )}
          <h2 style={{
            fontSize: '1.8rem',
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
            fontSize: '1.1rem',
            lineHeight: 1.6,
            marginBottom: '15px'
          }}>
            {getPreviewContent(post.content)}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: 'var(--primary-color)',
              color: 'var(--neutral-color)',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease'
            }}
          >
            Read More
          </Link>
        </motion.article>
      ))}
    </div>
  );
}

export default BlogList; 