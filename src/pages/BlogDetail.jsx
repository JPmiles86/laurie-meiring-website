import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getVisiblePosts } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../components/PageTransition';
import BlogSidebar from '../components/BlogSidebar';

function BlogDetail() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const allPosts = getVisiblePosts();
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

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
            bottom: '100px',
            left: '20px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)',
            padding: '10px 20px',
            borderRadius: '25px',
            textDecoration: 'none',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
          }}
        >
          ← Back to Blog
        </Link>

        {/* Rest of the existing content */}
        {post.featuredImage && (
          <div style={{
            width: '100vw',
            height: '50vh',
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
          padding: '40px 20px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            color: 'var(--primary-color)'
          }}>
            {post.title}
          </h1>
          
          <div style={{
            fontSize: '1rem',
            color: 'var(--text-color)',
            opacity: 0.8,
            marginBottom: '30px'
          }}>
            Published on {new Date(post.publishDate).toLocaleDateString()} by {post.author}
          </div>

          <div className="blog-content" style={{
            fontSize: '1.1rem',
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
                    fontSize: '2rem',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                    color: 'var(--primary-color)'
                  }} {...props} />
                ),
                ul: ({node, ...props}) => (
                  <ul style={{ 
                    marginBottom: '1.5rem',
                    paddingLeft: '2rem'
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
            justifyContent: 'space-between',
            marginTop: '40px',
            padding: '20px 0',
            borderTop: '1px solid var(--secondary-color)'
          }}>
            {prevPost && (
              <Link
                to={`/blog/${prevPost.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-color)',
                  flex: '1',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
                  Previous Post
                </div>
                <div style={{ fontSize: '1.1rem' }}>{prevPost.title}</div>
              </Link>
            )}
            
            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-color)',
                  flex: '1',
                  textAlign: 'right'
                }}
              >
                <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', marginBottom: '5px' }}>
                  Next Post
                </div>
                <div style={{ fontSize: '1.1rem' }}>{nextPost.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default BlogDetail; 