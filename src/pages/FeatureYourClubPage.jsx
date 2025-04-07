import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ClubCard from '../components/ClubCard';
import BasicClubListItem from '../components/BasicClubList';
import { clubs } from '../data/clubs'; // Import sample club data

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

function FeatureYourClubPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Find sample clubs for display
  const sampleFeaturedClub = clubs.find(c => c.listingType === 'featured') || clubs[0];
  const sampleBasicClub = clubs.find(c => c.listingType === 'basic') || clubs[clubs.length - 1];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mgvapzpp", {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
        e.target.reset();
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <PageTransition>
      <div className="feature-your-club-page">
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
            style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}
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
              Feature Your Pickleball Club
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1.1rem' : '1.3rem', 
                maxWidth: '800px', 
                margin: isMobile ? '15px auto' : '20px auto',
                color: 'var(--neutral-color)',
                padding: isMobile ? '0 15px' : 0
              }}
            >
              Showcase your club to thousands of players visiting Costa Rica! Get premium visibility and attract more members and visitors.
            </motion.p>
          </motion.div>
        </section>

        <section style={{ 
          padding: isMobile ? '50px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center',
                fontSize: isMobile ? '2.2rem' : '2.8rem',
                color: 'var(--primary-color)',
                marginBottom: isMobile ? '40px' : '60px'
              }}
            >
              Why Feature Your Club?
            </motion.h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '30px' : '50px',
              alignItems: 'center',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary-color)', marginBottom: '20px' }}>Stand Out from the Crowd</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '15px' }}>Featured clubs get premium placement with eye-catching cards, detailed descriptions, photos, and direct links.</p>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Attract more players, promote your events, and grow your community by highlighting what makes your club special.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  border: '1px solid #eee', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)' 
                }}
              >
                <h4 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '1.2rem' }}>Featured Listing Example:</h4>
                {sampleFeaturedClub && <ClubCard club={sampleFeaturedClub} onClick={() => {}} />} 
                
                <h4 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '15px', fontSize: '1.2rem' }}>Basic Listing Example:</h4>
                {sampleBasicClub && <BasicClubListItem club={sampleBasicClub} isMobile={isMobile} />} 
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center',
                fontSize: isMobile ? '2.2rem' : '2.8rem',
                color: 'var(--primary-color)',
                marginBottom: '30px',
                marginTop: isMobile ? '50px' : '80px'
              }}
            >
              Get Featured Today!
            </motion.h2>
            <p style={{ 
              textAlign: 'center',
              fontSize: isMobile ? '1.1rem' : '1.2rem',
              maxWidth: '700px',
              margin: '0 auto 40px auto',
              lineHeight: 1.6
            }}>
              Fill out this short form to express your interest. We'll contact you with the details on how to get your club featured, including the information needed for your profile (like amenities, schedules, descriptions, photos, etc.).
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: 'white',
                padding: isMobile ? '30px 20px' : '40px',
                borderRadius: '12px',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <h3 style={{ color: 'var(--primary-color)', fontSize: '1.8rem', marginBottom: '15px' }}>Thank You!</h3>
                  <p style={{ fontSize: '1.1rem' }}>We've received your interest form and will be in touch shortly with more details about featuring your club.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="club_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Club Name:</label>
                    <input type="text" id="club_name" name="club_name" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="contact_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Your Name:</label>
                    <input type="text" id="contact_name" name="contact_name" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address:</label>
                    <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number (Optional):</label>
                    <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
                  </div>
                  <motion.button 
                    type="submit" 
                    disabled={submitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%',
                      padding: '15px',
                      backgroundColor: submitting ? '#ccc' : 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '30px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? 'Sending...' : 'Send Inquiry'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default FeatureYourClubPage; 