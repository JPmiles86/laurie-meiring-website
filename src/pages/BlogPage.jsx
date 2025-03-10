import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import PageTransition from '../components/PageTransition';

function BlogPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <div className="blog-page">
        <section className="page-hero" style={{ 
          padding: isMobile ? '150px 0 60px' : '180px 0 80px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '-80px',
          marginBottom: isMobile ? '30px' : '40px'
        }}>
          <div style={{ marginTop: '100px', maxWidth: '800px', margin: '0 auto', padding: isMobile ? '0 15px' : '0 20px' }}>
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: isMobile ? '2.6rem' : '3.2rem',
              marginBottom: isMobile ? '10px' : '15px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
              Pickleball & Paradise
            </h1>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              color: 'var(--neutral-color)',
              fontWeight: 'bold',
              maxWidth: '800px', 
              margin: '0 auto',
              marginBottom: '10px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              Stories, tips, and adventures from {isMobile ? '' : <br></br>}Costa Rica's vibrant pickleball community
            </p>
          </div>
        </section>

        <BlogList isMobile={isMobile} />
      </div>
    </PageTransition>
  );
}

export default BlogPage; 