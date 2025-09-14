import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllPosts, getVisiblePosts, CATEGORIES } from '../utils/blogUtils';
import { isFeatureEnabled } from '../config/features';

function AdminDashboard({ onCreateNew, onEditBlog, onNavigate, isMobile }) {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    featuredPosts: 0,
    totalViews: 0
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    try {
      const allPosts = getAllPosts();
      setPosts(allPosts);
      
      // Calculate stats
      const published = allPosts.filter(post => post.status === 'published').length;
      const drafts = allPosts.filter(post => post.status === 'draft').length;
      const scheduled = allPosts.filter(post => post.status === 'scheduled').length;
      const featured = allPosts.filter(post => post.featured).length;
      
      setStats({
        totalPosts: allPosts.length,
        publishedPosts: published,
        draftPosts: drafts,
        scheduledPosts: scheduled,
        featuredPosts: featured,
        totalViews: allPosts.reduce((sum, post) => sum + (post.views || 0), 0)
      });
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const getRecentPosts = () => {
    return [...posts]
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return '#28a745';
      case 'draft': return '#ffc107';
      case 'scheduled': return '#007bff';
      default: return '#6c757d';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = 'var(--primary-color)' }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: `3px solid ${color}`,
        textAlign: 'center',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ 
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: color,
        margin: '0 0 8px 0'
      }}>
        {value}
      </h3>
      <p style={{ 
        fontSize: '1rem',
        color: 'var(--text-color)',
        margin: 0,
        fontWeight: '600'
      }}>
        {title}
      </p>
      {subtitle && (
        <p style={{ 
          fontSize: '0.85rem',
          color: '#666',
          margin: '4px 0 0 0'
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );

  const QuickActionButton = ({ onClick, icon, title, description, color = 'var(--primary-color)' }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        border: `2px solid ${color}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '8px', color }}>{icon}</div>
      <h4 style={{ 
        margin: '0 0 4px 0',
        color: 'var(--text-color)',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>
        {title}
      </h4>
      <p style={{ 
        margin: 0,
        color: '#666',
        fontSize: '0.9rem'
      }}>
        {description}
      </p>
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          margin: '0 0 10px 0',
          textAlign: 'center'
        }}>
          📊 Admin Dashboard
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-color)',
          textAlign: 'center',
          margin: 0
        }}>
          Welcome back! Here's your blog overview and quick actions.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon="📝"
          color="var(--primary-color)"
        />
        <StatCard
          title="Published"
          value={stats.publishedPosts}
          icon="✅"
          color="#28a745"
        />
        <StatCard
          title="Drafts"
          value={stats.draftPosts}
          icon="📄"
          color="#ffc107"
        />
        <StatCard
          title="Featured"
          value={stats.featuredPosts}
          icon="⭐"
          color="#e74c3c"
        />
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '2rem',
          color: 'var(--primary-color)',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <QuickActionButton
            onClick={() => onCreateNew()}
            icon="✏️"
            title="Create New Blog"
            description="Start writing a new blog post"
            color="var(--primary-color)"
          />
          <QuickActionButton
            onClick={() => onNavigate('editor')}
            icon="📝"
            title="Blog Editor"
            description="Access the blog editor directly"
            color="var(--secondary-color)"
          />
          {isFeatureEnabled('AI_WRITING_ASSISTANT') && (
            <QuickActionButton
              onClick={() => onNavigate('ai')}
              icon="🤖"
              title="AI Assistant"
              description="Generate content with AI"
              color="#9b59b6"
            />
          )}
          {isFeatureEnabled('AI_IMAGE_GENERATION') && (
            <QuickActionButton
              onClick={() => onNavigate('images')}
              icon="🎨"
              title="AI Image Generator"
              description="Generate professional images"
              color="#e67e22"
            />
          )}
          {isFeatureEnabled('AI_DRAFT_INTELLIGENCE') && (
            <QuickActionButton
              onClick={() => onNavigate('drafts')}
              icon="🧠"
              title="Draft Intelligence"
              description="Manage AI-powered drafts"
              color="#f39c12"
            />
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 style={{
          fontSize: '2rem',
          color: 'var(--primary-color)',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Recent Posts
        </h2>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {getRecentPosts().length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#666'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
              <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-color)' }}>No posts yet</h3>
              <p style={{ margin: 0 }}>Get started by creating your first blog post!</p>
              <button
                onClick={() => onCreateNew()}
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Create First Post
              </button>
            </div>
          ) : (
            getRecentPosts().map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '20px',
                  borderBottom: index < getRecentPosts().length - 1 ? '1px solid var(--border-color)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                whileHover={{ backgroundColor: '#f8f9fa' }}
                onClick={() => onEditBlog(post.id)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{
                      margin: '0 0 8px 0',
                      color: 'var(--primary-color)',
                      fontSize: '1.2rem',
                      fontWeight: '600'
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      margin: '0 0 8px 0',
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      {formatDate(post.publishDate)} • By {post.author}
                    </p>
                    {post.categories && post.categories.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {post.categories.slice(0, 3).map(category => (
                          <span
                            key={category}
                            style={{
                              backgroundColor: '#e9ecef',
                              color: '#495057',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    {post.featured && (
                      <span style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        ⭐ Featured
                      </span>
                    )}
                    <span style={{
                      backgroundColor: getStatusColor(post.status),
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {post.status || 'published'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;