import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
import { getVisiblePosts } from '../utils/blogUtils';

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
  const recentPosts = getVisiblePosts().slice(0, 3);

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
              Your Pickleball Guide to Costa Rica
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
              Play, Train & Explore in Paradise!
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
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
                Schedule a Lesson
              </Link>
              <Link 
                to="/tours" 
                className="button"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
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
                Book a Tour
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
                Pickleball Services in Paradise
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
                    Learn from a Tournament Champion in Jaco Beach or in the Jungle of Ojochal. Whether you are a beginner or a competitive player, elevate your game with personalized coaching and strategy development. Coaching available for individuals or in teams of 2 or more.
                  </p>
                  <Link to="/training" className="button" style={{
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
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Pickleball Tours to Costa Rica</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Enjoy a guided Pickleball Experience in Costa Rica with Coaching and Fine-tuning sessions as well as Competitive Sessions and Tournaments at Pickleball Clubs in Beach, Jungle and City Destinations.
                  </p>
                  <Link to="/tours" className="button" style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease'
                  }}>Explore Tour Options</Link>
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
                Player Testimonials
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: 'var(--text-color)',
                maxWidth: '600px',
                margin: '0 auto',
                opacity: 0.8,
                lineHeight: 1.6
              }}>
                Real experiences from players who've transformed their game and enjoyed the pickleball paradise of Costa Rica
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
              Pickleball in Paradise
            </h2>
            <p style={{ 
              fontSize: '1.3rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.6,
              color: 'var(--neutral-color)'
            }}>
              Experience the joy of pickleball against the stunning backdrop of Costa Rica's Pacific coast
            </p>
          </motion.div>
        </VideoBackground>

        <section style={{
          padding: '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: 'center',
                marginBottom: '40px',
                color: 'var(--primary-color)',
                fontSize: '2.8rem'
              }}
            >
              Latest from the Blog
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {recentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  whileHover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {post.featuredImage && (
                    <div style={{
                      height: '200px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      marginBottom: '10px',
                      color: 'var(--primary-color)'
                    }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-color)',
                      opacity: 0.8,
                      marginBottom: '15px'
                    }}>
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="button"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--neutral-color)',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        marginTop: '10px'
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link
                to="/blog"
                className="button"
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--text-color)',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>

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
                Meet Your Coach
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
                Laurie is a tournament champion and certified pickleball coach with a passion for the game. 
                Based in Jaco, Costa Rica, he offers personalized training and guided pickleball experiences 
                that will transform your game and create unforgettable memories.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/training" className="button" style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--text-color)',
                  display: 'inline-block',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}>Training Options</Link>
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
              Ready to Elevate Your Game?
            </h2>
            <p style={{ 
              fontSize: '1.4rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.6,
              color: 'var(--neutral-color)'
            }}>
              Join us for world-class pickleball training and tours in the beautiful setting of Costa Rica
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