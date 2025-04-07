import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import PartnerMatchingForm from '../components/PartnerMatchingForm';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

function PartnerMatchingPage() {
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
      <div className="partner-matching-page">
        <section className="page-hero" style={{ 
          padding: isMobile ? '80px 0 40px' : '100px 0 50px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '0'
        }}>
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                marginBottom: isMobile ? '15px' : '20px',
                lineHeight: 1.2
              }}
            >
              Find Your Pickleball Partner
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1rem' : '1.2rem', 
                maxWidth: '800px', 
                margin: isMobile ? '15px auto' : '20px auto',
                color: 'var(--neutral-color)',
                padding: isMobile ? '0 15px' : 0
              }}
            >
              Connect with fellow pickleball players in Costa Rica based on your skill level, location, and availability.
            </motion.p>
          </motion.div>
        </section>

        <section style={{ 
          padding: isMobile ? '50px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              padding: isMobile ? '30px 20px' : '40px',
              marginBottom: '50px'
            }}>
              <h3 style={{
                fontSize: '1.6rem',
                color: 'var(--primary-color)',
                marginBottom: '20px'
              }}>How Partner Matching Works</h3>
              
              <ol style={{
                paddingLeft: isMobile ? '20px' : '30px',
                marginBottom: '20px'
              }}>
                <li style={{
                  marginBottom: '15px',
                  fontSize: '1.1rem',
                  lineHeight: 1.5
                }}>
                  <strong>Submit Your Information</strong> - Fill out the form with your skill level, availability, and preferences.
                </li>
                <li style={{
                  marginBottom: '15px',
                  fontSize: '1.1rem',
                  lineHeight: 1.5
                }}>
                  <strong>Review Process</strong> - Our team will review your submission and search our database for compatible players.
                </li>
                <li style={{
                  marginBottom: '15px',
                  fontSize: '1.1rem',
                  lineHeight: 1.5
                }}>
                  <strong>Get Connected</strong> - We'll email you with potential partners, including their contact information (with their permission).
                </li>
                <li style={{
                  marginBottom: '0',
                  fontSize: '1.1rem',
                  lineHeight: 1.5
                }}>
                  <strong>Start Playing</strong> - Reach out to your matches and arrange a time to play!
                </li>
              </ol>
              
              <p style={{
                fontSize: '1.1rem',
                fontStyle: 'italic',
                marginTop: '30px',
                color: 'var(--text-color)'
              }}>
                Note: For privacy and safety, we only share contact information with mutual consent. Your information will never be used for marketing purposes or shared with third parties.
              </p>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              marginBottom: '50px'
            }}>
              <div style={{
                backgroundColor: 'var(--primary-color)',
                padding: isMobile ? '25px 20px' : '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                  color: 'white',
                  margin: 0
                }}>Partner Matching Form</h2>
              </div>
              
              <div style={{
                padding: isMobile ? '30px 20px' : '40px'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  marginBottom: '30px',
                  lineHeight: 1.6
                }}>
                  Complete the form below with your information and preferences. Our team will help match you with compatible players in your area. This service is free and aims to grow the pickleball community in Costa Rica.
                </p>
                
                <PartnerMatchingForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default PartnerMatchingPage;