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
          videoId="J5IRbH7ehUM"
          startTime={0}
          endTime={0}
          height="90vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
        >
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
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
              Experience Paradise
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
              Elevate Your Game • Savor the Flavors • Transform Your Brand
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
                Begin Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </VideoBackground>

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
              Discover Your Passion
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
                <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Pickleball Paradise</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                  Transform your game with professional coaching in the stunning setting of Jaco Beach. 
                  From beginners to tournament players, elevate your skills to new heights.
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
                }}>Explore Training</Link>
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
                <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Culinary Excellence</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                  Experience extraordinary dining with personalized chef services. 
                  From intimate dinners to special events, savor the finest local and international cuisine.
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
                }}>Discover Menus</Link>
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
                <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Digital Innovation</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                  Revolutionize your online presence with AI-powered strategies and creative solutions. 
                  Stand out in the digital landscape with cutting-edge marketing approaches.
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
                }}>Start Growing</Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="testimonials-section" style={{
          padding: '100px 0',
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

        <VideoBackground
          videoId="wORVp9Pg5DY"
          startTime={5}
          endTime={35}
          height="500px"
          overlayColor="rgba(0, 0, 0, 0.5)"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-preview" 
          style={{ 
            padding: '100px 20px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                marginBottom: '30px',
                fontSize: '3rem'
              }}
            >
              Meet Laurie Meiring
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                fontSize: '1.3rem', 
                marginBottom: '30px',
                lineHeight: 1.6
              }}
            >
              Digital innovator, culinary artist, and sports enthusiast bringing unique experiences 
              to the vibrant shores of Jaco. Discover how passion meets expertise in paradise.
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
              }}>Discover More</Link>
            </motion.div>
          </div>
        </motion.section>

        <VideoBackground
          videoId="Dx60IHP5QlE"
          startTime={0}
          endTime={30}
          height="600px"
          overlayColor="rgba(0, 0, 0, 0.5)"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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