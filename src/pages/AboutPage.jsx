import React, { useState, useEffect } from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { IMAGES } from '../constants/images';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const achievements = [
    {
      title: "PCI-Certified Pickleball Coach",
      icon: <i className="fas fa-certificate"></i>
    },
    {
      title: "4.2 DUPR Rated Player",
      icon: <i className="fas fa-chart-line"></i>
    },
    {
      title: "Tournament Champion",
      icon: <i className="fas fa-medal"></i>
    },
    {
      title: "Strategy Development Specialist",
      icon: <i className="fas fa-chess"></i>
    },
    {
      title: "All-Level Skills Instructor",
      icon: <i className="fas fa-users"></i>
    },
    {
      title: "Certified Technique Expert",
      icon: <i className="fas fa-table-tennis"></i>
    }
  ];

  const coachingPhilosophy = [
    "Focus on fundamentals and proper technique",
    "Personalized approach for each player's style",
    "Emphasis on strategic gameplay and court awareness",
    "Balance of technical drills and competitive play",
    "Creating a fun, supportive learning environment"
  ];

  return (
    <PageTransition>
      <div className="about-page">
        <section className="about-header" style={{ 
          padding: isMobile ? '40px 0' : '60px 0', 
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          textAlign: 'center',
          marginBottom: isMobile ? '40px' : '60px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            width: '100%', 
            padding: '0 20px', 
            boxSizing: 'border-box' 
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="profile-image-container" 
              style={{ marginBottom: isMobile ? '20px' : '30px' }}
            >
              <div style={{ 
                width: isMobile ? '120px' : '150px', 
                height: isMobile ? '120px' : '150px', 
                margin: '0 auto',
                marginTop: '20px',
                position: 'relative'
              }}>
                <OptimizedImage
                  src={IMAGES.PROFILE.AI_GENERATED}
                  alt="Laurie Meiring"
                  className="profile-image"
                  width={isMobile ? 120 : 150}
                  height={isMobile ? 120 : 150}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    border: `${isMobile ? '3px' : '4px'} solid var(--primary-color)`,
                  }}
                />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                marginBottom: isMobile ? '15px' : '20px',
                lineHeight: 1.2,
                padding: '0 10px'
              }}
            >
              Meet Your Pickleball Guide
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="subtitle" 
              style={{ 
                maxWidth: '800px', 
                margin: '0 auto',
                fontSize: isMobile ? '1rem' : '1.2rem',
                color: 'var(--neutral-color)',
                opacity: 0.9,
                lineHeight: 1.6,
                padding: '0 10px'
              }}
            >
              Tournament Champion | PCI-Certified Coach | Pickleball Strategist | Costa Rica Expert
            </motion.p>
          </div>
        </section>

        <section className="about-content" style={{ 
          padding: isMobile ? '0 15px' : '0 20px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <div className="bio-section" style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: isMobile ? '30px' : '40px', 
            alignItems: 'center',
            marginBottom: isMobile ? '50px' : '80px',
            padding: '0 15px'
          }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bio-text"
            >
              <h2 style={{ 
                fontSize: isMobile ? '2.2rem' : '2.8rem', 
                marginBottom: isMobile ? '20px' : '30px',
                color: 'var(--primary-color)',
                textAlign: isMobile ? 'center' : 'left'
              }}>My Pickleball Journey</h2>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem', 
                marginBottom: isMobile ? '20px' : '25px',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                Based in the vibrant coastal town of Jaco, Costa Rica, I've dedicated myself to the sport of pickleball, competing in tournaments and helping players of all levels improve their game. My passion for pickleball has taken me from recreational play to competitive tournaments and professional coaching.
              </p>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                marginBottom: isMobile ? '20px' : '25px'
              }}>
                As a PCI-certified coach with a 4.2 DUPR rating, I bring technical expertise and strategic insight to every coaching session. Whether you're a beginner looking to learn the basics or an advanced player aiming to refine your strategy, my personalized approach will help you reach your goals.
              </p>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                <a 
                  href="https://www.linkedin.com/in/laurie-meiring/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--primary-color)',
                  }}
                >
                  My background in hospitality and business
                </a> gives me a unique perspective on creating exceptional pickleball experiences, from private lessons to guided tours throughout Costa Rica's most beautiful pickleball destinations.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="natural-image" 
              style={{ 
                maxWidth: isMobile ? '350px' : '400px', 
                margin: '0 auto',
                position: 'relative'
              }}
            >
              <OptimizedImage
                src="/ about/MeliLaurie1.jpg"
                alt="Laurie with Pickleball Medals"
                className="medal-image"
                width={isMobile ? 350 : 400}
                height={isMobile ? 350 : 400}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                }}
              />
            </motion.div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--secondary-color)',
            color: 'var(--neutral-color)',
            padding: isMobile ? '40px 0' : '60px 0',
            borderRadius: '0',
            marginBottom: isMobile ? '50px' : '80px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              width: '100%', 
              padding: '0 20px', 
              boxSizing: 'border-box' 
            }}>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  color: 'var(--neutral-color)',
                  textAlign: 'center',
                  marginBottom: isMobile ? '30px' : '40px',
                  fontSize: isMobile ? '2.2rem' : '2.8rem'
                }}
              >
                Pickleball Achievements
              </motion.h2>
              <div className="achievements-grid" style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, minmax(0, 1fr))',
                gap: isMobile ? '20px' : '30px',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index} 
                    className="achievement-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      padding: isMobile ? '15px 10px' : '15px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '8px',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div className="achievement-icon" style={{
                      fontSize: isMobile ? '1.5rem' : '1.8rem',
                      color: 'var(--primary-color)'
                    }}>{achievement.icon}</div>
                    <div className="achievement-content" style={{
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>{achievement.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '30px' : '40px',
            marginBottom: isMobile ? '50px' : '80px',
            alignItems: 'center',
            padding: '0 15px'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                order: isMobile ? 2 : 1
              }}
            >
              <OptimizedImage
                src="/ about/PickleballGeneric8.jpg"
                alt="Pickleball Courts in Costa Rica"
                width={500}
                height={350}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  width: '100%',
                  maxWidth: isMobile ? '350px' : '500px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                order: isMobile ? 1 : 2,
                paddingLeft: isMobile ? '15px' : '0'
              }}
            >
              <h2 style={{ 
                fontSize: isMobile ? '2.2rem' : '2.8rem', 
                marginBottom: isMobile ? '20px' : '30px',
                color: 'var(--primary-color)',
                textAlign: isMobile ? 'center' : 'left'
              }}>Coaching Philosophy</h2>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {coachingPhilosophy.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      fontSize: isMobile ? '1.1rem' : '1.2rem',
                      marginBottom: isMobile ? '12px' : '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '10px' : '15px',
                      paddingLeft: isMobile ? '10px' : '0'
                    }}
                  >
                    <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--neutral-color)',
            padding: isMobile ? '40px 15px' : '60px 20px',
            borderRadius: '12px',
            marginBottom: isMobile ? '50px' : '80px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: isMobile ? '30px' : '40px',
                fontSize: isMobile ? '2.2rem' : '2.8rem',
                color: 'var(--primary-color)'
              }}
            >
              Costa Rica Pickleball Experience
            </motion.h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '25px' : '30px',
              placeItems: 'center',
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{ height: isMobile ? '180px' : '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.JACO}
                    alt="Jaco Beach"
                    width={300}
                    height={isMobile ? 180 : 200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: isMobile ? '1.6rem' : '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: isMobile ? '8px' : '10px'
                }}>Beach Courts</h3>
                <p style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>
                  Play with ocean breezes and stunning views at our beachside courts.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{ height: isMobile ? '180px' : '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.TOUCAN_TALL}
                    alt="Jungle Courts"
                    width={300}
                    height={isMobile ? 180 : 200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: isMobile ? '1.6rem' : '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: isMobile ? '8px' : '10px'
                }}>Jungle Experience</h3>
                <p style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>
                  Immerse yourself in nature while improving your pickleball skills.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{ height: isMobile ? '180px' : '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.WATERFALL}
                    alt="Adventure Tours"
                    width={300}
                    height={isMobile ? 180 : 200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: isMobile ? '1.6rem' : '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: isMobile ? '8px' : '10px'
                }}>Adventure Tours</h3>
                <p style={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>
                  Combine pickleball training with Costa Rica's natural wonders.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="ready-section" style={{
          padding: isMobile ? '60px 0' : '80px 0',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '-80px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              textAlign: 'center',
              padding: '0 20px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ 
              fontSize: isMobile ? '2.4rem' : '3rem',
              marginBottom: isMobile ? '15px' : '20px',
              color: 'var(--neutral-color)',
              padding: '0 10px'
            }}>
              Ready to Elevate Your Game?
            </h2>
            <p style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              lineHeight: 1.6,
              color: 'var(--neutral-color)',
              marginBottom: isMobile ? '25px' : '30px',
              padding: '0 10px'
            }}>
              Whether you're looking for personalized coaching or an unforgettable pickleball tour in Costa Rica, I'm here to help you achieve your goals.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '15px' : '20px', 
              justifyContent: 'center',
              marginBottom: '80px',
              flexWrap: 'wrap'
            }}>
              <Link to="/training" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                display: 'inline-block',
                padding: isMobile ? '12px 25px' : '15px 30px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                borderRadius: '30px',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                margin: '5px'
              }}>
                Training Options
              </Link>
              <Link to="/tours" className="button" style={{
                backgroundColor: 'var(--neutral-color)',
                color: 'var(--primary-color)',
                display: 'inline-block',
                padding: isMobile ? '12px 25px' : '15px 30px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                borderRadius: '30px',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                margin: '5px'
              }}>
                Explore Tours
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}

export default AboutPage;