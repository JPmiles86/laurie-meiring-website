import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ClubInterestForm from '../components/ClubInterestForm';

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

const FeatureClubPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <div className="feature-club-page">
        <Helmet>
          <title>Feature Your Pickleball Club | Costa Rica</title>
          <meta name="description" content="Promote your pickleball club by featuring it on our Costa Rica directory. Increase visibility and attract more players." />
        </Helmet>

        {/* Hero Section */}
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
                fontSize: isMobile ? '2.8rem' : '3.5rem',
                marginBottom: isMobile ? '15px' : '20px',
                lineHeight: 1.2
              }}
            >
              Feature Your Pickleball Club
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem', 
                maxWidth: '700px', 
                margin: '0 auto',
                color: 'var(--neutral-color)',
                opacity: 0.9,
                padding: isMobile ? '0 15px' : 0,
                lineHeight: 1.5
              }}
            >
              Increase your club's visibility and reach passionate pickleball players across Costa Rica by featuring it on our platform.
            </motion.p>
          </motion.div>
        </section>

        {/* Main Content Section */}
        <section style={{ 
          padding: isMobile ? '50px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Benefits Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                marginBottom: '50px',
                backgroundColor: 'white',
                padding: isMobile ? '30px 20px' : '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: 'var(--secondary-color)', textAlign: 'center', marginBottom: '30px' }}>
                Why Feature Your Club?
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '20px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                {[ 
                  { icon: '🎯', text: 'Reach a targeted audience of local and visiting pickleball players.' },
                  { icon: '📈', text: 'Increase visibility and attract new members or visitors.' },
                  { icon: '📍', text: 'Showcase your location, courts, amenities, and events.' },
                  { icon: '🔗', text: 'Connect with the growing pickleball community in Costa Rica.' }
                ].map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <p style={{ fontSize: '1.1rem', margin: 0, lineHeight: 1.5 }}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* How It Works Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                marginBottom: '50px',
                backgroundColor: '#f8f8f8', 
                padding: isMobile ? '30px 20px' : '40px',
                borderRadius: '12px'
              }}
            >
              <h2 style={{ fontSize: isMobile ? '2rem' : '2.5rem', color: 'var(--secondary-color)', textAlign: 'center', marginBottom: '30px' }}>
                How It Works
              </h2>
              <ol style={{ paddingLeft: '20px', margin: 0 }}>
                <li style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  <strong>Register Your Interest:</strong> Fill out the short form below with your contact details and club name.
                </li>
                <li style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  <strong>Get In Touch:</strong> Laurie will personally reach out to discuss the feature options and answer any questions.
                </li>
                <li style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  <strong>Provide Details:</strong> You'll receive a private link to a detailed form where you can submit all your club's information (courts, amenities, schedule, etc.).
                </li>
                <li style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                  <strong>Go Live:</strong> We'll create your featured listing and showcase your club to the Costa Rica pickleball community!
                </li>
              </ol>
            </motion.div>

            {/* Interest Form Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                backgroundColor: 'var(--primary-color)', 
                padding: isMobile ? '25px 20px' : '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', color: 'white', margin: 0 }}>
                  Register Your Interest
                </h2>
              </div>
              <div style={{ padding: isMobile ? '30px 20px' : '40px' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px', lineHeight: 1.6 }}>
                  Ready to showcase your club? Fill out this quick form, and Laurie will contact you soon to discuss the next steps.
                </p>
                <ClubInterestForm />
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default FeatureClubPage; 