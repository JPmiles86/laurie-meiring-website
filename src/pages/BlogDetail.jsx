import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getVisiblePosts } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../components/PageTransition';
import BlogSidebar from '../components/BlogSidebar';

function BlogDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const allPosts = getVisiblePosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PageTransition>
      <div className="blog-detail">
        <BlogSidebar />
        
        {/* Back to Blog List Button */}
        <Link
          to="/blog"
          style={{
            position: 'fixed',
            bottom: isMobile ? '30px' : '100px',
            left: '20px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)',
            padding: isMobile ? '8px 16px' : '10px 20px',
            borderRadius: '25px',
            textDecoration: 'none',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}
        >
          ← Back to Blog
        </Link>

        {/* Rest of the existing content */}
        {post.featuredImage && (
          <div style={{
            width: '100vw',
            height: isMobile ? '40vh' : '50vh',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            position: 'relative',
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
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: isMobile ? '30px 15px' : '40px 20px'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.2rem' : '2.5rem',
            marginBottom: isMobile ? '15px' : '20px',
            color: 'var(--primary-color)'
          }}>
            {post.title}
          </h1>
          
          <div style={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: 'var(--text-color)',
            opacity: 0.8,
            marginBottom: isMobile ? '25px' : '30px'
          }}>
            Published on {new Date(post.publishDate).toLocaleDateString()} by {post.author}
          </div>

          <div className="blog-content" style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: 1.8
          }}>
            <ReactMarkdown
              components={{
                img: ({node, ...props}) => (
                  <img
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      marginTop: '20px',
                      marginBottom: '20px'
                    }}
                    {...props}
                  />
                ),
                p: ({node, ...props}) => (
                  <p style={{ marginBottom: '1.5rem' }} {...props} />
                ),
                h2: ({node, ...props}) => (
                  <h2 style={{ 
                    fontSize: isMobile ? '1.8rem' : '2rem',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                    color: 'var(--primary-color)'
                  }} {...props} />
                ),
                ul: ({node, ...props}) => (
                  <ul style={{ 
                    marginBottom: '1.5rem',
                    paddingLeft: isMobile ? '1.5rem' : '2rem'
                  }} {...props} />
                ),
                li: ({node, ...props}) => (
                  <li style={{ 
                    marginBottom: '0.5rem'
                  }} {...props} />
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Previous/Next Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: isMobile ? '20px' : '0',
            marginTop: isMobile ? '30px' : '40px',
            padding: isMobile ? '15px 0' : '20px 0',
            borderTop: '1px solid var(--secondary-color)'
          }}>
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-color)',
                  flex: '1',
                  textAlign: isMobile ? 'center' : 'left',
                  padding: isMobile ? '10px' : '0',
                  backgroundColor: isMobile ? 'rgba(0,0,0,0.03)' : 'transparent',
                  borderRadius: isMobile ? '8px' : '0'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
                  Previous Post
                </div>
                <div style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>{prevPost.title}</div>
              </Link>
            )}
            
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-color)',
                  flex: '1',
                  textAlign: isMobile ? 'center' : 'right',
                  padding: isMobile ? '10px' : '0',
                  backgroundColor: isMobile ? 'rgba(0,0,0,0.03)' : 'transparent',
                  borderRadius: isMobile ? '8px' : '0'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
                  Next Post
                </div>
                <div style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>{nextPost.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default BlogDetail; 