import React from 'react';
import BlogList from '../components/BlogList';
import PageTransition from '../components/PageTransition';

function BlogPage() {
  return (
    <PageTransition>
      <div className="blog-page">
        <section className="page-hero" style={{ 
          padding: '180px 0 80px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '-80px',
          marginBottom: '40px',
          borderBottom: '4px solid var(--primary-color)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: '3.2rem',
              marginBottom: '15px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
              Pickleball & Paradise
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              color: 'var(--neutral-color)',
              fontWeight: 'bold',
              maxWidth: '800px', 
              margin: '0 auto',
              marginBottom: '10px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              Stories, tips, and adventures from <br></br>Costa Rica's vibrant pickleball community
            </p>
          </div>
        </section>

        <BlogList />
      </div>
    </PageTransition>
  );
}

export default BlogPage; 