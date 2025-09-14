import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import PageTransition from '../components/PageTransition';
import { fetchPosts, transformPost } from '../services/blogApi';
import { getVisiblePosts } from '../utils/blogUtils';

function BlogCategoryPage() {
  const { category } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch posts filtered by category
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { posts: apiPosts } = await fetchPosts({ limit: 100 });
        const allPosts = apiPosts.map(transformPost);
        // Filter posts by category
        const categoryName = category.replace(/-/g, ' ');
        const filteredPosts = allPosts.filter(post => 
          post.categories && post.categories.some(cat => 
            cat.toLowerCase() === categoryName.toLowerCase()
          )
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        // Fallback to local data
        try {
          const allPosts = getVisiblePosts();
          const categoryName = category.replace(/-/g, ' ');
          const filteredPosts = allPosts.filter(post => 
            post.categories && post.categories.some(cat => 
              cat.toLowerCase() === categoryName.toLowerCase()
            )
          );
          setPosts(filteredPosts);
          setError(null);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          setError('Failed to load posts');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category]);

  const formattedCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <PageTransition>
      <div className="blog-category-page">
        <section className="page-hero" style={{ 
          padding: isMobile ? '80px 0 60px' : '100px 0 80px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '0',
          marginBottom: '0',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0
        }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: isMobile ? '10px auto 0' : '0 auto', 
            padding: '0 40px',
            width: '100%',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: isMobile ? '2.6rem' : '3.2rem',
              marginBottom: isMobile ? '20px' : '15px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              paddingTop: isMobile ? '10px' : '0'
            }}>
              {formattedCategory}
            </h1>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              color: 'var(--neutral-color)',
              fontWeight: 'bold',
              maxWidth: '800px', 
              margin: '0 auto',
              marginBottom: isMobile ? '20px' : '10px',
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
              padding: '0 10px'
            }}>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
            </p>
            <Link
              to="/blog"
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: 'var(--neutral-color)',
                border: '2px solid var(--neutral-color)',
                borderRadius: '30px',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--neutral-color)';
                e.target.style.color = 'var(--secondary-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--neutral-color)';
              }}
            >
              Back to All Posts
            </Link>
          </div>
        </section>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '1.2rem',
            color: 'var(--text-color)'
          }}>
            Loading posts...
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--error-color, #dc3545)'
          }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
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
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '1.2rem',
            color: 'var(--text-color)'
          }}>
            No posts found in category "{formattedCategory}"
          </div>
        ) : (
          <BlogList 
            isMobile={isMobile} 
            posts={posts}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default BlogCategoryPage;