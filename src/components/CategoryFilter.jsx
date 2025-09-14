import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CategoryFilter({ posts, selectedCategory, onCategoryChange, isMobile }) {
  // Extract unique categories
  const categories = [...new Set(
    posts.flatMap(post => post.categories || [])
  )].sort();

  if (categories.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        marginBottom: '30px',
        textAlign: 'center'
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          marginRight: '10px'
        }}>
          Filter by Category:
        </span>
        
        <button
          onClick={() => onCategoryChange(null)}
          style={{
            padding: '6px 16px',
            backgroundColor: !selectedCategory ? 'var(--primary-color)' : 'transparent',
            color: !selectedCategory ? 'var(--neutral-color)' : 'var(--text-color)',
            border: `2px solid ${!selectedCategory ? 'var(--primary-color)' : 'var(--border-color)'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            fontWeight: !selectedCategory ? 'bold' : 'normal'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory) {
              e.target.style.borderColor = 'var(--primary-color)';
              e.target.style.color = 'var(--primary-color)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory) {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-color)';
            }
          }}
        >
          All Categories
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              style={{
                padding: '6px 16px',
                backgroundColor: isSelected ? 'var(--primary-color)' : 'transparent',
                color: isSelected ? 'var(--neutral-color)' : 'var(--text-color)',
                border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                fontWeight: isSelected ? 'bold' : 'normal'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.target.style.borderColor = 'var(--primary-color)';
                  e.target.style.color = 'var(--primary-color)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.color = 'var(--text-color)';
                }
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div style={{
          marginTop: '15px',
          fontSize: '0.9rem',
          color: 'var(--text-color)',
          opacity: 0.8
        }}>
          Showing posts in <strong>{selectedCategory}</strong> category.{' '}
          <Link
            to={`/blog/category/${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`}
            style={{
              color: 'var(--primary-color)',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            View all {selectedCategory} posts →
          </Link>
        </div>
      )}
    </motion.div>
  );
}

export default CategoryFilter;