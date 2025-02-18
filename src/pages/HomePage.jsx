import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';

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

function HomePage() {
  return (
    <PageTransition>
      <div className="home-page">
        <VideoBackground
          videoId="CZXon6FoRY0"
          startTime={0}
          endTime={0}
          height="100vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
          type="hero"
        >
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="content-container"
            style={{ textAlign: 'center', padding: '0 20px' }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                fontSize: '4.5rem', 
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '1px',
                color: 'var(--neutral-color)'
              }}
            >
              Transform Your Experience
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: '1.6rem', 
                maxWidth: '800px', 
                margin: '0 auto 30px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                lineHeight: 1.4,
                color: 'var(--neutral-color)'
              }}
            >
              Professional Pickleball Coaching • Private Chef Services • AI-Powered Marketing
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/contact" 
                className="button"
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--text-color)',
                  padding: '18px 36px',
                  borderRadius: '30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                Book Your Service
              </Link>
            </motion.div>
          </motion.div>
        </VideoBackground>

        <div className="content-container">
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="services-section" 
            style={{ 
              padding: '100px 20px',
              backgroundColor: 'var(--neutral-color)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto',
              position: 'relative',
              zIndex: 1
            }}>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  textAlign: 'center', 
                  marginBottom: '50px',
                  fontSize: '3rem'
                }}
              >
                Expert Services in Paradise
              </motion.h2>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                <motion.div 
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  className="service-card" 
                  style={{ 
                    padding: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Championship Pickleball Training</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Learn from a tournament champion in Jaco Beach. Whether you're a beginner or 
                    competitive player, elevate your game with personalized coaching and strategy development.
                  </p>
                  <Link to="/pickleball" className="button" style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}>View Training Programs</Link>
                </motion.div>

                <motion.div 
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  className="service-card" 
                  style={{ 
                    padding: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Private Chef Experience</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Indulge in personalized culinary experiences crafted just for you. From intimate 
                    dinners to special events, enjoy restaurant-quality dining in your space.
                  </p>
                  <Link to="/chef" className="button" style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}>Explore Culinary Services</Link>
                </motion.div>

                <motion.div 
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  className="service-card" 
                  style={{ 
                    padding: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>AI Marketing Strategy</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Transform your digital presence with AI-powered solutions. Get personalized strategies 
                    that combine creative storytelling with cutting-edge technology.
                  </p>
                  <Link to="/marketing" className="button" style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}>Discover Marketing Solutions</Link>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <section className="testimonials-section" style={{
            padding: '100px 20px',
            backgroundColor: 'var(--neutral-color)',
            borderTop: '2px dashed var(--secondary-color)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              <h2 style={{
                fontSize: '3rem',
                color: 'var(--primary-color)',
                marginBottom: '20px'
              }}>
                Client Stories
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-color)',
                maxWidth: '600px',
                margin: '0 auto',
                opacity: 0.8,
                lineHeight: 1.6
              }}>
                Real experiences from people who've transformed their game, 
                elevated their events, and revolutionized their digital presence
              </p>
            </motion.div>
            <TestimonialsCarousel />
          </section>
        </div>

        <VideoBackground
          videoId="wORVp9Pg5DY"
          startTime={5}
          endTime={35}
          height="90vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
          type="section"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="content-container"
            style={{ textAlign: 'center', padding: '0 20px' }}
          >
            <h2 style={{ 
              fontSize: '3rem', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              color: 'var(--neutral-color)'
            }}>
              Life in Paradise
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.6,
              color: 'var(--neutral-color)'
            }}>
              Where world-class experiences meet the beauty of Costa Rica's Pacific coast
            </p>
          </motion.div>
        </VideoBackground>

        <div style={{ 
          width: '100vw', 
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          backgroundColor: 'var(--primary-color)',
          padding: '120px 0',
          color: 'var(--neutral-color)',
          marginBottom: '0'
        }}>
          <div className="content-container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ 
                width: '150px', 
                height: '150px', 
                margin: '0 auto 30px',
                position: 'relative'
              }}>
                <OptimizedImage
                  src={IMAGES.PROFILE.AI_GENERATED}
                  alt="Laurie Meiring"
                  width={150}
                  height={150}
                  style={{
                    borderRadius: '50%',
                    border: '4px solid var(--secondary-color)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  marginBottom: '30px',
                  fontSize: '3rem',
                  color: 'var(--neutral-color)'
                }}
              >
                Meet Your Expert
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '30px',
                  lineHeight: 1.6,
                  color: 'var(--neutral-color)'
                }}
              >
                With an MBA and years of experience, Laurie combines professional expertise in pickleball coaching, 
                culinary arts, and digital marketing. Based in Jaco, Costa Rica, offering personalized services 
                that transform experiences and deliver results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/about" className="button" style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--text-color)',
                  display: 'inline-block',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>Learn More About Laurie</Link>
              </motion.div>
            </div>
          </div>
        </div>

        <VideoBackground
          videoId="Dx60IHP5QlE"
          startTime={0}
          endTime={30}
          height="90vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
          type="section"
          style={{ marginBottom: '5%' }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="content-container"
            style={{ textAlign: 'center', padding: '0 20px' }}
          >
            <h2 style={{ 
              fontSize: '3.5rem', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              color: 'var(--neutral-color)'
            }}>
              Ready to Transform?
            </h2>
            <p style={{ 
              fontSize: '1.4rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.6,
              color: 'var(--neutral-color)'
            }}>
              Let's create extraordinary experiences together in paradise
            </p>
            <Link to="/contact" className="button" style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
              padding: '18px 36px',
              borderRadius: '30px',
              fontSize: '1.3rem',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              Start Your Journey
            </Link>
          </motion.div>
        </VideoBackground>
      </div>
    </PageTransition>
  );
}

export default HomePage;