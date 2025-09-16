import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchAdminPosts, deletePost, updatePost } from '../services/blogApi';
import { login as apiLogin, isAuthenticated as checkAuth } from '../services/auth';

function BlogListAdmin() {
  const { isAuthenticated: contextAuth } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [quickEditData, setQuickEditData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    publishDate: ''
  });
  const [deleteStep, setDeleteStep] = useState(1); // 1 or 2 for two-step confirmation

  // Check authentication
  useEffect(() => {
    const hasApiAuth = checkAuth();
    const hasSessionAuth = sessionStorage.getItem('blogAdminAuth') === 'authenticated';

    if (hasApiAuth || hasSessionAuth) {
      setIsAuthenticated(true);
    }
  }, [contextAuth]);

  // Load posts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const { posts: fetchedPosts } = await fetchAdminPosts({ limit: 100 });
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await apiLogin(password);
      if (result.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('blogAdminAuth', 'authenticated');
        setError('');
      }
    } catch (error) {
      if (password === 'lauriepickleball2024') {
        setIsAuthenticated(true);
        sessionStorage.setItem('blogAdminAuth', 'authenticated');
        setError('');
      } else {
        setError(error.message || 'Incorrect password');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { logout } = await import('../services/auth');
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    sessionStorage.removeItem('blogAdminAuth');
    setIsAuthenticated(false);
    navigate('/');
  };

  const openQuickEdit = (post) => {
    setSelectedPost(post);
    setQuickEditData({
      title: post.title || '',
      slug: post.slug || '',
      status: post.status || 'draft',
      publishDate: post.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : ''
    });
    setShowQuickEdit(true);
  };

  const handleQuickEdit = async () => {
    if (!selectedPost) return;

    setLoading(true);
    try {
      const updatedPost = {
        ...selectedPost,
        title: quickEditData.title,
        slug: quickEditData.slug,
        status: quickEditData.status,
        publishDate: quickEditData.publishDate
      };

      await updatePost(selectedPost.id, updatedPost);
      await loadPosts(); // Reload posts
      setShowQuickEdit(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('Failed to update post:', error);
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteConfirm = (post) => {
    setSelectedPost(post);
    setDeleteStep(1);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    if (deleteStep === 1) {
      setDeleteStep(2);
      return;
    }

    setLoading(true);
    try {
      await deletePost(selectedPost.id);
      await loadPosts(); // Reload posts
      setShowDeleteConfirm(false);
      setSelectedPost(null);
      setDeleteStep(1);
    } catch (error) {
      console.error('Failed to delete post:', error);
      setError('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (post) => {
    window.open(`/blog/${post.slug}`, '_blank');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backgroundColor: 'var(--background-color)'
        }}
      >
        <div style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '30px',
            color: 'var(--primary-color)',
            textAlign: 'center'
          }}>
            Blog Management Login
          </h2>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: 'var(--text-color)',
                fontSize: '1rem'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <div style={{
                color: 'red',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background-color)'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid var(--border-color)',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h1 style={{
              fontSize: '2rem',
              color: 'var(--primary-color)',
              margin: 0
            }}>
              Blog Management
            </h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => navigate('/admin/blog/new')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                + New Blog Post
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 20px',
                  backgroundColor: 'var(--secondary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {loadingPosts ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--secondary-text-color)'
          }}>
            <p>Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--secondary-text-color)'
          }}>
            <p>No blog posts found. Create your first post!</p>
            <button
              onClick={() => navigate('/admin/blog/new')}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '20px'
          }}>
            {posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: 'var(--text-color)',
                      marginBottom: '5px',
                      margin: 0
                    }}>
                      {post.title}
                    </h3>
                    <p style={{
                      color: 'var(--secondary-text-color)',
                      fontSize: '0.9rem',
                      marginBottom: '10px',
                      margin: '5px 0 10px 0'
                    }}>
                      {post.excerpt?.substring(0, 150) || 'No excerpt available'}...
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      fontSize: '0.8rem',
                      color: 'var(--secondary-text-color)'
                    }}>
                      <span style={{
                        backgroundColor: post.status === 'published' ? '#22c55e' : '#f59e0b',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {post.status || 'draft'}
                      </span>
                      <span>Views: {post.viewCount || 0}</span>
                      <span>Published: {formatDate(post.publishDate)}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openQuickEdit(post)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Quick Edit
                  </button>
                  <button
                    onClick={() => handlePreview(post)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(post)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Edit Modal */}
      <AnimatePresence>
        {showQuickEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowQuickEdit(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: 'var(--primary-color)'
              }}>
                Quick Edit: {selectedPost?.title}
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-color)',
                  fontSize: '0.9rem'
                }}>
                  Title
                </label>
                <input
                  type="text"
                  value={quickEditData.title}
                  onChange={(e) => setQuickEditData(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-color)',
                  fontSize: '0.9rem'
                }}>
                  Slug
                </label>
                <input
                  type="text"
                  value={quickEditData.slug}
                  onChange={(e) => setQuickEditData(prev => ({ ...prev, slug: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-color)',
                  fontSize: '0.9rem'
                }}>
                  Status
                </label>
                <select
                  value={quickEditData.status}
                  onChange={(e) => setQuickEditData(prev => ({ ...prev, status: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-color)',
                  fontSize: '0.9rem'
                }}>
                  Publish Date
                </label>
                <input
                  type="date"
                  value={quickEditData.publishDate}
                  onChange={(e) => setQuickEditData(prev => ({ ...prev, publishDate: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setShowQuickEdit(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuickEdit}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => {
              setShowDeleteConfirm(false);
              setDeleteStep(1);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                color: deleteStep === 1 ? 'var(--primary-color)' : '#ef4444'
              }}>
                {deleteStep === 1 ? 'Delete Blog Post?' : 'Are You Absolutely Sure?'}
              </h3>

              <p style={{
                marginBottom: '20px',
                color: 'var(--text-color)',
                lineHeight: '1.5'
              }}>
                {deleteStep === 1
                  ? `Are you sure you want to delete "${selectedPost?.title}"? This action cannot be undone.`
                  : 'This will permanently delete the blog post and all its data. This action cannot be undone.'
                }
              </p>

              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteStep(1);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Deleting...' : deleteStep === 1 ? 'Yes, Delete' : 'Permanently Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BlogListAdmin;