import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TagCloud({ posts, isMobile }) {
  // Extract all unique tags from posts
  const tagCounts = {};
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        const normalizedTag = tag.toLowerCase();
        tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1;
      });
    }
  });

  // Convert to array and sort by count
  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  if (sortedTags.length === 0) {
    return null;
  }

  // Calculate font size based on count
  const maxCount = Math.max(...sortedTags.map(t => t.count));
  const minCount = Math.min(...sortedTags.map(t => t.count));
  const getFontSize = (count) => {
    if (maxCount === minCount) return isMobile ? '1rem' : '1.1rem';
    const scale = (count - minCount) / (maxCount - minCount);
    const minSize = isMobile ? 0.9 : 1;
    const maxSize = isMobile ? 1.4 : 1.6;
    return `${minSize + scale * (maxSize - minSize)}rem`;
  };

  return (
    <div style={{
      backgroundColor: 'var(--neutral-color)',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '1.4rem' : '1.6rem',
        marginBottom: '20px',
        color: 'var(--primary-color)'
      }}>
        Popular Tags
      </h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center'
      }}>
        {sortedTags.map(({ tag, count }, index) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/blog/tag/${tag.replace(/\s+/g, '-')}`}
              style={{
                display: 'inline-block',
                padding: `${isMobile ? '6px 12px' : '8px 16px'}`,
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--neutral-color)',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: getFontSize(count),
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              <span style={{
                marginLeft: '6px',
                fontSize: '0.8em',
                opacity: 0.8
              }}>
                ({count})
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default TagCloud;