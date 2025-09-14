import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import TagCloud from '../components/TagCloud';
import FeaturedBlogs from '../components/FeaturedBlogs';
import BlogSearch from '../components/BlogSearch';
import BlogArchive from '../components/BlogArchive';
import CategoryFilter from '../components/CategoryFilter';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import SubscribeModal from '../components/SubscribeModal';
import { fetchPosts, transformPost } from '../services/blogApi';
import { downloadRSSFeed } from '../utils/generateRSS';

function BlogPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch posts from API
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { posts: apiPosts } = await fetchPosts({ limit: 100 });
        const transformedPosts = apiPosts.map(transformPost);
        setPosts(transformedPosts);
        setFilteredPosts(transformedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        // Try to fallback to local data
        try {
          const { getVisiblePosts } = await import('../utils/blogUtils');
          const localPosts = getVisiblePosts();
          setPosts(localPosts);
          setFilteredPosts(localPosts);
          setError(null); // Clear error if fallback works
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Dynamically fix height constraints
  useEffect(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      // Find all parent containers
      const blogPage = document.querySelector('.blog-page');
      const main = document.querySelector('main');
      const allDivs = document.querySelectorAll('main > div, main > div > div');
      
      // Remove any height constraints
      if (blogPage) {
        blogPage.style.height = 'auto';
        blogPage.style.minHeight = '100vh';
        blogPage.style.overflow = 'visible';
      }
      
      if (main) {
        main.style.height = 'auto';
        main.style.overflow = 'visible';
      }
      
      allDivs.forEach(div => {
        div.style.height = 'auto';
        div.style.overflow = 'visible';
        div.style.maxHeight = 'none';
      });
      
      // Also fix root and body elements
      const root = document.getElementById('root');
      const body = document.body;
      const html = document.documentElement;
      
      if (root) {
        root.style.height = 'auto';
        root.style.overflow = 'visible';
      }
      
      body.style.height = 'auto';
      body.style.overflow = 'visible';
      html.style.height = 'auto';
      html.style.overflow = 'visible';
      
      // Log current computed styles for debugging
      console.log('Blog page computed height:', blogPage ? getComputedStyle(blogPage).height : 'not found');
      console.log('Main computed height:', main ? getComputedStyle(main).height : 'not found');
      console.log('Parent divs:', allDivs.length);
      console.log('Body overflow:', getComputedStyle(body).overflow);
      console.log('Root overflow:', root ? getComputedStyle(root).overflow : 'not found');
    }, 100);
  }, []);

  return (
    <PageTransition>
      <div className="blog-page">
        {/* 
          HERO SECTION STYLING:
          - Mobile top spacing is controlled by padding + marginTop + the inner div's margin-top
          - To increase/decrease space above title: adjust the padding first value (240px)
          - To fix right margin issues: ensure width is 100% and padding is equal on both sides
        */}
        <section className="page-hero" style={{ 
          /* Top/bottom padding - adjust first value to change space above content */
          padding: isMobile ? '80px 0 60px' : '100px 0 80px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          /* Offset for desktop vs mobile */
          marginTop: '0', /* No gap needed */
          marginBottom: '0',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0
        }}>
          <div style={{ 
            maxWidth: '800px', 
            /* Additional top margin for mobile */
            margin: isMobile ? '10px auto 0' : '0 auto', 
            /* Left/right padding - must be equal on both sides */
            padding: '0 40px',
            width: '100%',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: isMobile ? '2.6rem' : '3.2rem',
              /* Space below title */
              marginBottom: isMobile ? '20px' : '15px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              /* Additional top padding if needed */
              paddingTop: isMobile ? '10px' : '0'
            }}>
              Pickleball & Paradise
            </h1>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              color: 'var(--neutral-color)',
              fontWeight: 'bold',
              maxWidth: '800px', 
              /* Center horizontally */
              margin: '0 auto',
              /* Space below subtitle */
              marginBottom: isMobile ? '20px' : '10px',
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
              /* Left/right padding for text wrapping */
              padding: '0 10px'
            }}>
              Stories, tips, and adventures from {isMobile ? '' : <br></br>}Costa Rica's vibrant pickleball community
            </p>
            <button
              onClick={downloadRSSFeed}
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: 'var(--neutral-color)',
                border: '2px solid var(--neutral-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--neutral-color)';
                e.currentTarget.style.color = 'var(--secondary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--neutral-color)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.75 3v18h16.5V3H3.75zm1.5 1.5h13.5v15H5.25V4.5zm2.25 3v1.5h9v-1.5h-9zm0 3v1.5h9v-1.5h-9zm0 3v1.5h9v-1.5h-9z"/>
                <circle cx="6" cy="19" r="1.5"/>
                <path d="M1.5 6.75a5.25 5.25 0 015.25-5.25v1.5a3.75 3.75 0 00-3.75 3.75h-1.5zm0 3a8.25 8.25 0 018.25-8.25v1.5a6.75 6.75 0 00-6.75 6.75h-1.5z"/>
              </svg>
              RSS Feed
            </button>
          </div>
        </section>

        {/* Featured Blogs Section */}
        {!loading && !error && posts.length > 0 && (
          <FeaturedBlogs posts={posts} isMobile={isMobile} />
        )}

        {/* Search and Tag Cloud Section */}
        {!loading && !error && posts.length > 0 && (
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '30px 15px 0' : '40px 20px 0'
          }}>
            <BlogSearch 
              posts={posts} 
              onSearchResults={(results) => {
                setFilteredPosts(results);
                setIsSearching(results.length !== posts.length);
                setSelectedCategory(null); // Reset category filter when searching
              }}
              isMobile={isMobile} 
            />
            <CategoryFilter
              posts={posts}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                if (category) {
                  const categoryFiltered = posts.filter(post => 
                    post.categories && post.categories.includes(category)
                  );
                  setFilteredPosts(categoryFiltered);
                  setIsSearching(false);
                } else {
                  setFilteredPosts(posts);
                  setIsSearching(false);
                }
              }}
              isMobile={isMobile}
            />
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
              gap: '30px',
              alignItems: 'start'
            }}>
              <TagCloud posts={posts} isMobile={isMobile} />
              <BlogArchive posts={posts} isMobile={isMobile} />
            </div>
          </div>
        )}

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '1.2rem',
            color: 'var(--text-color)'
          }}>
            Loading blog posts...
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
        ) : (
          <>
            {isSearching && filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                fontSize: '1.2rem',
                color: 'var(--text-color)'
              }}>
                No posts found matching your search.
              </div>
            ) : (
              <BlogList 
                isMobile={isMobile} 
                onSubscribe={() => setIsSubscribeModalOpen(true)}
                posts={filteredPosts}
              />
            )}
          </>
        )}

        {/* Subscribe Modal */}
        <SubscribeModal 
          isOpen={isSubscribeModalOpen} 
          onClose={() => setIsSubscribeModalOpen(false)} 
        />
      </div>
    </PageTransition>
  );
}

export default BlogPage; 