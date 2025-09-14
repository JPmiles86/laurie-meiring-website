import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { fetchAdminPosts } from '../services/blogApi';
import { login as apiLogin, isAuthenticated as checkAuth } from '../services/auth';

function BlogManagementPage() {
  const { isAuthenticated: contextAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [aiAction, setAiAction] = useState(null);
  const [aiResults, setAiResults] = useState({});

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
    try {
      const { posts: fetchedPosts } = await fetchAdminPosts({ limit: 100 });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
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

  const handleAIAction = async (post, action) => {
    setSelectedPost(post);
    setAiAction(action);
    
    // Simulate AI processing (replace with actual AI calls)
    const resultKey = `${post.id}-${action}`;
    
    try {
      let result = '';
      
      switch (action) {
        case 'analyze':
          result = `Analysis for "${post.title}":\n\n✅ Strong opening hook\n✅ Good use of personal stories\n⚠️ Could benefit from more subheadings\n⚠️ Consider adding more calls-to-action\n\nSEO Score: 82/100\nReadability: Good\nEngagement potential: High`;
          break;
        case 're-analyze':
          result = `Re-analysis for "${post.title}":\n\n📊 Updated metrics:\n- Reading time: ${Math.ceil(post.content.length / 200)} minutes\n- Word count: ${post.content.split(' ').length} words\n- Keyword density: Optimal\n\n🎯 New recommendations:\n- Add 2-3 more internal links\n- Include a FAQ section\n- Optimize meta description`;
          break;
        case 'seo-update':
          result = `SEO Suggestions for "${post.title}":\n\n📈 Title optimization:\n"${post.title}" → "${post.title} - Complete Guide 2024"\n\n🔍 Meta description:\n"${post.content.substring(0, 150)}..."\n\n🏷️ Suggested tags:\n#pickleball #costarica #tournament #strategy\n\n🔗 Internal linking opportunities:\n- Link to training page\n- Reference related posts`;
          break;
        case 'social-media':
          result = `Social Media Posts for "${post.title}":\n\n📱 Instagram Post:\n"Just dropped a new blog about my latest pickleball adventure! 🏓 The lessons learned were game-changing. Link in bio! #PickleballLife #CostaRica"\n\n🐦 Twitter Thread:\n"Thread: My biggest pickleball lesson yet 🧵\n\n1/ ${post.content.substring(0, 180)}...\n\n2/ The key insight: [continue thread]\n\n#Pickleball #Lessons"\n\n📘 Facebook Post:\n"Friends, I just published a new blog post about [topic]. If you're interested in pickleball or personal growth, you'll love this story about [key point]. What's your biggest lesson from sports? Let me know in the comments!"`;
          break;
        default:
          result = 'AI action completed successfully.';
      }
      
      setAiResults(prev => ({
        ...prev,
        [resultKey]: result
      }));
      
    } catch (error) {
      console.error('AI action failed:', error);
      setAiResults(prev => ({
        ...prev,
        [resultKey]: 'Error: AI action failed. Please try again.'
      }));
    }
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
      backgroundColor: 'var(--background-color)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: 'var(--primary-color)',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Blog Management & AI Tools
        </h1>
        
        <div style={{
          display: 'grid',
          gap: '20px'
        }}>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                border: selectedPost?.id === post.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)'
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
                    marginBottom: '5px'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    color: 'var(--secondary-text-color)',
                    fontSize: '0.9rem',
                    marginBottom: '10px'
                  }}>
                    {post.excerpt?.substring(0, 150)}...
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    fontSize: '0.8rem',
                    color: 'var(--secondary-text-color)'
                  }}>
                    <span>Status: {post.status}</span>
                    <span>•</span>
                    <span>Views: {post.viewCount || 0}</span>
                    <span>•</span>
                    <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '15px'
              }}>
                <button
                  onClick={() => handleAIAction(post, 'analyze')}
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
                  📊 Analyze
                </button>
                <button
                  onClick={() => handleAIAction(post, 're-analyze')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--secondary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🔄 Re-analyze
                </button>
                <button
                  onClick={() => handleAIAction(post, 'seo-update')}
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
                  🔍 Update for SEO
                </button>
                <button
                  onClick={() => handleAIAction(post, 'social-media')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  📱 Write Social Media Posts
                </button>
                <button
                  onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
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
                  👁️ View
                </button>
              </div>
              
              {/* Show AI Results */}
              {Object.entries(aiResults)
                .filter(([key]) => key.startsWith(post.id))
                .map(([key, result]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginTop: '15px',
                    border: '1px solid #e9ecef'
                  }}
                >
                  <h4 style={{
                    fontSize: '1rem',
                    marginBottom: '10px',
                    color: 'var(--primary-color)'
                  }}>
                    AI Results:
                  </h4>
                  <pre style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    margin: 0,
                    fontFamily: 'inherit'
                  }}>
                    {result}
                  </pre>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--secondary-text-color)'
          }}>
            <p>No blog posts found. Create your first post using the Blog Editor.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogManagementPage;