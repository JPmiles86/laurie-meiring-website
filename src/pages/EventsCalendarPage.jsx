import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';
import EventList from '../components/EventList';
import EventFilter from '../components/EventFilter';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

function EventsCalendarPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <div className="events-calendar-page">
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
              Pickleball Events in Costa Rica
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
              Find tournaments, leagues, clinics, and social events across Costa Rica.
            </motion.p>
          </motion.div>
        </section>

        <section style={{ 
          padding: isMobile ? '50px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <EventList filters={{}} />
            
            <EventsCTA isMobile={isMobile} />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

// CTA Component for Events Calendar Page
const EventsCTA = ({ isMobile }) => {
  return (
    <div className="events-cta" style={{
      borderTop: '1px solid #eee',
      padding: isMobile ? '30px 20px' : '40px 20px',
      textAlign: 'center',
      marginTop: '60px'
    }}>
      <p style={{
        fontSize: '1rem',
        marginBottom: '15px',
        color: 'var(--text-color)'
      }}>Have an upcoming pickleball event? <Link to="/contact" style={{ color: 'var(--primary-color)' }}>Contact us</Link> to add your event to our calendar.</p>
    </div>
  );
};

export default EventsCalendarPage;