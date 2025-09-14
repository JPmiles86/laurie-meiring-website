import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function BlogArchive({ posts, isMobile }) {
  // Group posts by year and month
  const archiveData = useMemo(() => {
    const grouped = {};
    
    posts.forEach(post => {
      const date = new Date(post.publishDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const monthNum = date.getMonth() + 1;
      
      if (!grouped[year]) {
        grouped[year] = {};
      }
      
      const monthKey = `${monthNum.toString().padStart(2, '0')}-${month}`;
      if (!grouped[year][monthKey]) {
        grouped[year][monthKey] = {
          name: month,
          count: 0,
          posts: []
        };
      }
      
      grouped[year][monthKey].count++;
      grouped[year][monthKey].posts.push(post);
    });
    
    // Convert to sorted array
    const years = Object.keys(grouped).sort((a, b) => b - a);
    return years.map(year => ({
      year,
      months: Object.entries(grouped[year])
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, data]) => ({
          key,
          name: data.name,
          count: data.count,
          posts: data.posts
        }))
    }));
  }, [posts]);

  if (archiveData.length === 0) {
    return null;
  }

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
        Archive
      </h3>
      <div>
        {archiveData.map((yearData, yearIndex) => (
          <motion.div
            key={yearData.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: yearIndex * 0.1 }}
            style={{
              marginBottom: '20px'
            }}
          >
            <h4 style={{
              fontSize: '1.2rem',
              marginBottom: '10px',
              color: 'var(--secondary-color)'
            }}>
              {yearData.year}
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {yearData.months.map((monthData, monthIndex) => (
                <motion.li
                  key={monthData.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (yearIndex * 0.1) + (monthIndex * 0.05) }}
                  style={{
                    marginBottom: '8px'
                  }}
                >
                  <Link
                    to={`/blog/archive/${yearData.year}/${monthData.key.split('-')[0]}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: 'var(--text-color)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--background-color)';
                      e.currentTarget.style.paddingLeft = '16px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.paddingLeft = '12px';
                    }}
                  >
                    <span>{monthData.name}</span>
                    <span style={{
                      backgroundColor: 'var(--secondary-color)',
                      color: 'var(--neutral-color)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      {monthData.count}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BlogArchive;