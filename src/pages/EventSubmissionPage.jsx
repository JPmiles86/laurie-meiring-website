import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import EventSubmissionForm from '../components/EventSubmissionForm'; // Import the new form
import { motion } from 'framer-motion';

function EventSubmissionPage() {
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
      <div className="event-submission-page">
        {/* Header */}
        <section style={{ 
          padding: isMobile ? '60px 0 30px' : '80px 0 40px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)', // Match Feature Club page
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
            <h1 style={{ 
              color: 'var(--neutral-color)',
              fontSize: isMobile ? '2.5rem' : '3rem',
              marginBottom: '15px',
              lineHeight: 1.2
            }}>
              Submit Your Event
            </h1>
            <p style={{ 
              fontSize: isMobile ? '1rem' : '1.2rem', 
              maxWidth: '700px', 
              margin: '0 auto',
              color: 'var(--neutral-color)',
              opacity: 0.9
            }}>
              Add your tournament, clinic, league, or social play to our Events Calendar.
            </p>
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
                Please fill out the details below for your event. It will be reviewed and added to the site shortly. Remember to select your club and email any relevant photos or flyers separately.
              </p>
              <EventSubmissionForm />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default EventSubmissionPage; 