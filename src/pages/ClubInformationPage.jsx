import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import FeatureClubForm from '../components/FeatureClubForm'; // Import the detailed form
import { motion } from 'framer-motion';

// Animation variants (optional, can be simplified if not needed)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function ClubInformationPage() {
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
      <div className="club-information-page">
        {/* Simple Hero/Header */}
        <section style={{ 
          padding: isMobile ? '60px 0 30px' : '80px 0 40px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)', // Use secondary color for distinction
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '0'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.5rem' : '3rem',
                marginBottom: isMobile ? '10px' : '15px',
                lineHeight: 1.2
              }}
            >
              Club Information Form
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1rem' : '1.2rem', 
                maxWidth: '700px', 
                margin: '0 auto',
                color: 'var(--neutral-color)',
                opacity: 0.9,
                padding: isMobile ? '0 15px' : 0
              }}
            >
              Please provide the details for your club's featured listing.
            </motion.p>
          </motion.div>
        </section>

        {/* Form Section */}
        <section style={{ 
          padding: isMobile ? '40px 15px' : '60px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              padding: isMobile ? '30px 20px' : '40px'
            }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '30px', lineHeight: 1.6 }}>
                Fill out the form below with as much detail as possible. This information will be used to create your club's profile on the website. Remember to email your photos separately!
              </p>
              {/* Use the detailed FeatureClubForm here */}
              <FeatureClubForm />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default ClubInformationPage; 