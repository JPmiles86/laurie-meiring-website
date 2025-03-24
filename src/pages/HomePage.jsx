import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
import { getVisiblePosts } from '../utils/blogUtils';
import GradientDivider from '../components/GradientDivider';
import SubscribeModal from '../components/SubscribeModal';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageTransition>
      <div className="home-page" style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
        <VideoBackground
          videoId="1068887257"
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
            style={{ 
              textAlign: 'center', 
              padding: isMobile ? '0 15px' : '0 20px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '3.5rem' : '4.5rem', 
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '1px',
                color: 'var(--neutral-color)'
              }}
            >
              Your Pickleball Guide Costa Rica
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1.4rem' : '1.6rem', 
                maxWidth: '800px', 
                margin: '0 auto 30px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                lineHeight: 1.4,
                color: 'var(--neutral-color)'
              }}
            >
              Play, Train & Explore in Paradise!
            </motion.p>
            <motion.div variants={fadeInUp} style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              width: '100%',
              maxWidth: isMobile ? '90%' : '100%',
              margin: '0 auto'
            }}>
              <Link 
                to="/contact" 
                className="button"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: isMobile ? '12px 24px' : '18px 36px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: '90%'
                }}
              >
                Schedule a Lesson
              </Link>
              <Link 
                to="/tours" 
                className="button"
                style={{
                  backgroundColor: 'var(--neutral-color)',
                  color: 'var(--primary-color)',
                  padding: isMobile ? '12px 24px' : '18px 36px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: '90%'
                }}
              >
                Book a Tour
              </Link>
            </motion.div>
          </motion.div>
        </VideoBackground>

        <div className="content-container" style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflow: 'hidden',
          position: 'relative',
          margin: 0,
          padding: 0
        }}>
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="services-section" 
            style={{ 
              padding: isMobile ? '60px 0' : '100px 20px',
              backgroundColor: 'var(--neutral-color)',
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto',
              position: 'relative',
              zIndex: 1,
              padding: isMobile ? '0 15px' : '0'
            }}>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  textAlign: 'center', 
                  marginBottom: '50px',
                  fontSize: isMobile ? '2.5rem' : '3rem'
                }}
              >
                Pickleball Passion Meets Paradise
              </motion.h2>
              
              {/* Add responsive styles */}
              <style>
                {`
                  @media (max-width: 768px) {
                    .service-card {
                      grid-template-columns: 1fr !important;
                      width: 100% !important;
                      max-width: 100% !important;
                      margin-left: 0 !important;
                      margin-right: 0 !important;
                      box-sizing: border-box !important;
                    }
                    .service-card .card-content {
                      order: 2 !important;
                      padding: 20px !important;
                      width: 100% !important;
                      box-sizing: border-box !important;
                    }
                    .service-card .card-image {
                      order: 1 !important;
                      height: 350px !important;
                      min-height: 350px !important;
                      max-height: 350px !important;
                      aspect-ratio: 1/1 !important;
                      width: 100% !important;
                      margin: 0 auto !important;
                      box-sizing: border-box !important;
                      border-radius: 12px !important;
                      overflow: hidden !important;
                    }
                  }
                  
                  .service-card:hover .card-image img {
                    transform: scale(1.05);
                  }
                  
                  .service-card .card-image img {
                    border-radius: 12px;
                  }
                `}
              </style>
              
              {/* First Service Card - Training */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                className="service-card" 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  marginBottom: '30px'
                }}
              >
                <div className="card-image" style={{ 
                  overflow: 'hidden',
                  height: '100%',
                  aspectRatio: '1/1',
                  minHeight: '400px',
                  maxHeight: '500px',
                  borderRadius: '12px'
                }}>
                  <img 
                    src="/IMG_home1.jpg" 
                    alt="Pickleball Training"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      borderRadius: '12px'
                    }}
                  />
                </div>
                <div className="card-content" style={{ 
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Championship Pickleball Training</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Learn from a Tournament Champion in Jaco Beach or in the Jungle of Ojochal. Whether you are a beginner or a competitive player, elevate your game with personalized coaching and strategy development. Coaching available for individuals or in teams of 2 or more.
                  </p>
                  <div style={{ textAlign: 'center' }}>
                    <Link to="/training" className="button" style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--neutral-color)',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease'
                    }}>View Pickleball Training</Link>
                  </div>
                </div>
              </motion.div>

              {/* Second Service Card - Tours */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                className="service-card" 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <div className="card-content" style={{ 
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  order: 1
                }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Pickleball Tours to Costa Rica</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '25px' }}>
                    Enjoy a guided Pickleball Experience in Costa Rica with Coaching and Fine-tuning sessions as well as Competitive Sessions and Tournaments at Pickleball Clubs in Beach, Jungle and City Destinations.
                  </p>
                  <div style={{ textAlign: 'center' }}>
                    <Link to="/tours" className="button" style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--neutral-color)',
                      borderRadius: '25px',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease'
                    }}>Explore Tour Options</Link>
                  </div>
                </div>
                <div className="card-image" style={{ 
                  overflow: 'hidden',
                  height: '100%',
                  aspectRatio: '4/3',
                  minHeight: '400px',
                  maxHeight: '500px',
                  order: 2,
                  borderRadius: '12px'
                }}>
                  <img 
                    src="/ home/PickleballTours1.jpg" 
                    alt="Pickleball Tours"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.5s ease',
                      borderRadius: '12px'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.section>

          <GradientDivider />

          <section className="testimonials-section" style={{
            padding: isMobile ? '60px 0' : '100px 20px',
            backgroundColor: 'var(--neutral-color)', 
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '100vw'
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '40px', padding: isMobile ? '0 15px' : '0' }}
            >
              <h2 style={{
                fontSize: isMobile ? '2.4rem' : '3rem',
                color: 'var(--primary-color)',
                marginBottom: '20px',
                marginTop: '80px'
              }}>
                Player Testimonials
              </h2>
              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                color: 'var(--text-color)',
                maxWidth: '600px',
                margin: '0 auto',
                opacity: 0.8,
                lineHeight: 1.6
              }}>
                Real experiences from players who've transformed their game and enjoyed the pickleball paradise of Costa Rica
              </p>
            </motion.div>
            <div style={{ 
              marginBottom: '40px',
              position: 'relative',
              padding: '0 80px',
              overflow: 'visible'
            }}>
              <TestimonialsCarousel />
            </div>
          </section>
        </div>

        <VideoBackground
          videoId="1068891210"
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
            style={{ 
              textAlign: 'center', 
              padding: isMobile ? '0 15px' : '0 20px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '2.5rem' : '3rem', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              color: 'var(--neutral-color)'
            }}>
              Pickleball in Paradise
            </h2>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              color: 'var(--neutral-color)',
              lineHeight: 1.6
            }}>
              Experience the joy of playing pickleball in one of the most beautiful settings on earth. 
              Costa Rica offers the perfect backdrop for improving your game while enjoying paradise.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              width: '100%',
              maxWidth: isMobile ? '250px' : '100%',
              margin: '0 auto'
            }}>
              <Link to="/training" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                display: 'inline-block',
                padding: isMobile ? '12px 24px' : '15px 30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                width: 'auto'
              }}>
                Start Your Journey
              </Link>
              <Link to="/contact" className="button" style={{
                backgroundColor: 'var(--neutral-color)',
                color: 'var(--primary-color)',
                display: 'inline-block',
                padding: isMobile ? '12px 24px' : '15px 30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: 'bold',
                border: '2px solid var(--neutral-color)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                width: 'auto'
              }}>
                Contact Me
              </Link>
            </div>
          </motion.div>
        </VideoBackground>

        <section style={{
          padding: isMobile ? '80px 15px' : '80px 20px',
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
              marginBottom: '40px',
              boxSizing: 'border-box',
              padding: isMobile ? '0 10px' : '0',
              alignItems: 'stretch',
              height: '100%'
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
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    margin: isMobile ? '0' : '0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                  whileHover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {post.featuredImage && (
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top'
                        }}
                      />
                    </div>
                  )}
                  <div style={{ 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
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
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ textAlign: 'left', marginTop: '15px' }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="button"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '8px 16px',
                          backgroundColor: 'var(--primary-color)',
                          color: 'var(--neutral-color)',
                          borderRadius: '20px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          width: 'auto'
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div style={{ 
              textAlign: 'center',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}>
              <Link
                to="/blog"
                className="button"
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}
              >
                View All Posts
              </Link>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="button"
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  backgroundColor: 'var(--neutral-color)',
                  color: 'var(--primary-color)',
                  borderRadius: '25px',
                  border: '2px solid var(--primary-color)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </section>

        <div style={{ 
          width: '100%', 
          backgroundColor: 'var(--secondary-color)',
          padding: '120px 0',
          color: 'var(--neutral-color)',
          marginBottom: '0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="content-container">
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              textAlign: 'center',
              padding: isMobile ? '0 15px' : '0'
            }}>
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
                    objectFit: 'cover',
                    objectPosition: 'center',
                    border: '4px solid var(--primary-color)',
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
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  color: 'var(--neutral-color)'
                }}
              >
                Meet Your Guide
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ 
                  fontSize: isMobile ? '1.1rem' : '1.3rem', 
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
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
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
          videoId="1068891210"
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
            style={{ 
              textAlign: 'center', 
              padding: isMobile ? '0 10px' : '0 20px',
              width: '100%',
              maxWidth: '100vw'
            }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '2.5rem' : '3.5rem', 
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              color: 'var(--neutral-color)'
            }}>
              Ready to Elevate Your Game?
            </h2>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.4rem', 
              maxWidth: '700px', 
              margin: '0 auto 30px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
              lineHeight: 1.6,
              color: 'var(--neutral-color)'
            }}>
              Join us for world-class pickleball training and tours in the beautiful setting of Costa Rica
            </p>
            <Link to="/training" className="button" style={{
              backgroundColor: 'var(--neutral-color)',
              color: 'var(--primary-color)',
              padding: '15px 30px',
              borderRadius: '30px',
              fontSize: '1.2rem',
              textDecoration: 'none',
              display: 'block',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              width: '175px',
              margin: '0 auto'
            }}>
              Start Your Journey
            </Link>
          </motion.div>
        </VideoBackground>

        <GradientDivider />

        {/* Subscribe Modal */}
        <SubscribeModal 
          isOpen={isSubscribeModalOpen} 
          onClose={() => setIsSubscribeModalOpen(false)} 
        />

      </div>
    </PageTransition>
  );
}

export default HomePage;