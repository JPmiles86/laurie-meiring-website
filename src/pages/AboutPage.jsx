import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <PageTransition>
      <div className="about-page">
        <section className="page-hero" style={{ 
          padding: '40px 0', 
          textAlign: 'center',
          backgroundColor: 'var(--neutral-color)',
          position: 'relative',
          marginTop: '-80px',
          paddingTop: '120px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="profile-image-container" 
            style={{ marginBottom: '30px' }}
          >
            <div style={{ 
              width: '150px', 
              height: '150px', 
              margin: '0 auto',
              position: 'relative'
            }}>
              <OptimizedImage
                src={IMAGES.PROFILE.AI_GENERATED}
                alt="Laurie Meiring AI Profile"
                className="profile-image"
                width={150}
                height={150}
                style={{
                  borderRadius: '50%',
                  border: '4px solid var(--secondary-color)',
                  zIndex: 1000
                }}
              />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              color: 'var(--primary-color)',
              fontSize: '3.5rem',
              marginBottom: '20px'
            }}
          >
            About Laurie Meiring
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="subtitle" 
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              fontSize: '1.2rem',
              color: 'var(--text-color)',
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            Digital Strategist | Content Creator | Designer | Creative | Digital Nerd | Making AI Work | MBA | Former Hotel & Restaurant Lifer | AI Specialist
          </motion.p>
        </section>

        <section className="about-content" style={{ 
          padding: '60px 20px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <div className="bio-section" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px', 
            alignItems: 'center',
            marginBottom: '80px'
          }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bio-text"
            >
              <h2 style={{ 
                fontSize: '2.8rem', 
                marginBottom: '30px',
                color: 'var(--primary-color)'
              }}>My Journey</h2>
              <p style={{ 
                fontSize: '1.2rem', 
                marginBottom: '25px',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                Based in the vibrant coastal town of Jaco, Costa Rica, I bring a unique blend of expertise in digital strategy, culinary arts, and sports coaching. My journey has taken me from the hospitality industry to becoming a multi-faceted entrepreneur.
              </p>
              <p style={{ 
                fontSize: '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                With an MBA and a deep understanding of AI technology, I help businesses navigate the digital landscape while pursuing my passions for pickleball coaching and culinary excellence.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="natural-image" 
              style={{ 
                maxWidth: '400px', 
                margin: '0 auto',
                position: 'relative'
              }}
            >
              <OptimizedImage
                src={IMAGES.PROFILE.NATURAL}
                alt="Laurie Meiring"
                className="casual-profile"
                width={400}
                height={400}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'rotate(2deg)'
                }}
              />
            </motion.div>
          </div>

          <div className="services-overview" style={{ marginBottom: '80px' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '50px',
                fontSize: '2.8rem',
                color: 'var(--primary-color)'
              }}
            >
              What I Do
            </motion.h2>
            <div className="services-grid" style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              justifyContent: 'center'
            }}>
              {[
                {
                  title: 'Pickleball Coaching',
                  description: 'Tournament champion offering personalized training to help players of all levels improve their game and strategy.'
                },
                {
                  title: 'Private Chef',
                  description: 'Creating exceptional dining experiences with a focus on fresh, local ingredients and global culinary techniques.'
                },
                {
                  title: 'AI Marketing',
                  description: 'Leveraging cutting-edge AI tools and creative solutions to help businesses thrive in the digital landscape.'
                },
                {
                  title: 'Business Consulting',
                  description: 'Providing strategic guidance and MBA-level expertise to help businesses optimize their operations and growth.'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}
                  style={{
                    width: '280px',
                    padding: '30px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    marginBottom: '15px',
                    color: 'var(--primary-color)'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    color: 'var(--text-color)'
                  }}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <VideoBackground
          videoId="4sRR5OmPQ-0"
          startTime={0}
          endTime={0}
          height="100vh"
          overlayColor="rgba(0, 0, 0, 0.4)"
          type="hero"
          style={{ 
            marginBottom: '-80px',
            borderBottom: 'none'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              textAlign: 'center',
              padding: '0 20px'
            }}
          >
            <h2 style={{ 
              fontSize: '3.5rem',
              marginBottom: '20px',
              color: 'var(--neutral-color)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Life in Jaco
            </h2>
            <p style={{ 
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: 'var(--neutral-color)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              marginBottom: '30px'
            }}>
              Join me in this paradise where digital innovation meets outdoor adventure and culinary excellence.
            </p>
            <Link to="/contact" className="button" style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
              display: 'inline-block',
              padding: '12px 30px',
              fontSize: '1.1rem',
              textShadow: 'none'
            }}>
              Contact Me
            </Link>
          </motion.div>
        </VideoBackground>
      </div>
    </PageTransition>
  );
}

export default AboutPage;