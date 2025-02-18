import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import PageTransition from '../components/PageTransition';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
import { Link } from 'react-router-dom';

function MarketingPage() {
  return (
    <PageTransition>
      <div className="marketing-page">
        <div style={{
          height: '80vh',
          backgroundColor: 'var(--primary-color)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}
          >
            <h1 style={{ 
              color: 'var(--neutral-color)', 
              fontSize: '3.5rem', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Digital Strategy & AI Innovation
            </h1>
            <p style={{ 
              fontSize: '1.3rem', 
              maxWidth: '800px', 
              margin: '20px auto', 
              lineHeight: 1.6,
              color: 'var(--neutral-color)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
            }}>
              Transform your digital presence with AI-powered strategies and creative solutions
            </p>
          </motion.div>
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="brand-story" 
          style={{ 
            padding: '80px 20px',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="story-content"
          >
            <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>Why Your Brand Story Matters</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>
              In today's AI-driven world, authentic brand storytelling is more crucial than ever. 
              I help businesses craft compelling narratives that resonate with their audience while 
              leveraging cutting-edge AI technology.
            </p>
            <div className="story-points" style={{ marginTop: '30px' }}>
              {['AI-Enhanced Content Creation', 'Strategic Digital Marketing', 'Brand Development', 'Social Media Management'].map((point, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ 
                    color: 'var(--secondary-color)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>•</span>
                  <span style={{ fontSize: '1.1rem' }}>{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="story-image" 
            style={{ position: 'relative' }}
          >
            <OptimizedImage
              src={IMAGES.MARKETING.BRAND_STORY}
              alt="Brand Story in the Age of AI"
              width={600}
              height={400}
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transform: 'rotate(2deg)'
              }}
            />
          </motion.div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="services-grid" 
          style={{ 
            padding: '80px 20px',
            backgroundColor: 'var(--neutral-color)',
            borderTop: '2px dashed var(--secondary-color)'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '2.8rem'
              }}
            >
              Marketing Services
            </motion.h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {[
                {
                  title: 'AI Strategy',
                  description: 'Implement AI tools and automation to streamline your marketing efforts and improve ROI.'
                },
                {
                  title: 'Content Creation',
                  description: 'Develop engaging content that tells your brand story and connects with your audience.'
                },
                {
                  title: 'Social Media',
                  description: 'Build and manage your social presence with strategic content and community engagement.'
                },
                {
                  title: 'Brand Development',
                  description: 'Create a compelling brand identity that stands out in the digital landscape.'
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
                  className="service-card" 
                  style={{
                    padding: '40px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="cta-section" 
          style={{ 
            padding: '80px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <h2 style={{ 
              color: 'var(--neutral-color)', 
              marginBottom: '20px',
              fontSize: '2.8rem'
            }}>
              Ready to Transform Your Digital Presence?
            </h2>
            <p style={{ 
              marginBottom: '30px', 
              fontSize: '1.2rem',
              lineHeight: 1.6
            }}>
              Let's work together to create a strategic digital marketing plan that leverages AI and creative storytelling.
            </p>
            <Link 
              to="/contact" 
              className="button"
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--text-color)',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '1.2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </PageTransition>
  );
}

export default MarketingPage;