import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import SubscribeModal from '../components/SubscribeModal';

function BlogPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

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
        {/* 
          HERO SECTION STYLING:
          - Mobile top spacing is controlled by padding + marginTop + the inner div's margin-top
          - To increase/decrease space above title: adjust the padding first value (240px)
          - To fix right margin issues: ensure width is 100% and padding is equal on both sides
        */}
        <section className="page-hero" style={{ 
          /* Top/bottom padding - adjust first value to change space above content */
          padding: isMobile ? '150px 0 60px' : '180px 0 80px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          /* Offset for desktop vs mobile */
          marginTop: isMobile ? '0' : '-80px',
          marginBottom: '0',
          position: 'relative',
          zIndex: 1
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
          </div>
        </section>

        {/* Subscribe Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: 'var(--neutral-color)',
            padding: isMobile ? '40px 15px' : '60px 20px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '2.4rem',
              marginBottom: '20px',
              color: 'var(--primary-color)'
            }}>
              Never Miss a Story
            </h2>
            <p style={{
              fontSize: isMobile ? '1.1rem' : '1.2rem',
              marginBottom: '30px',
              color: 'var(--text-color)',
              lineHeight: 1.6
            }}>
              Join our growing community of pickleball enthusiasts and get the latest updates, tips, and stories delivered to your inbox.
            </p>
            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                border: 'none',
                padding: isMobile ? '12px 25px' : '15px 30px',
                borderRadius: '30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              Subscribe to Newsletter
            </button>
          </div>
        </motion.section>

        <BlogList 
          isMobile={isMobile} 
          onSubscribe={() => setIsSubscribeModalOpen(true)} 
        />

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