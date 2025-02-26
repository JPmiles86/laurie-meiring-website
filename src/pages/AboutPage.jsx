import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { IMAGES } from '../constants/images';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

function AboutPage() {
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
          padding: '80px 20px 40px', 
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          textAlign: 'center',
          marginBottom: '60px',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
                  alt="Laurie Meiring"
                  className="profile-image"
                  width={150}
                  height={150}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    border: '4px solid var(--primary-color)',
                    
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
                fontSize: '3.5rem',
                marginBottom: '20px'
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
                fontSize: '1.2rem',
                color: 'var(--neutral-color)',
                opacity: 0.9,
                lineHeight: 1.6
              }}
            >
              Tournament Champion | PCI-Certified Coach | Pickleball Strategist | Costa Rica Expert
            </motion.p>
          </div>
        </section>

        <section className="about-content" style={{ 
          padding: '0 20px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          <div className="bio-section" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px', 
            alignItems: 'center',
            marginBottom: '80px',
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
                fontSize: '2.8rem', 
                marginBottom: '30px',
                color: 'var(--primary-color)'
              }}>My Pickleball Journey</h2>
              <p style={{ 
                fontSize: '1.2rem', 
                marginBottom: '25px',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                Based in the vibrant coastal town of Jaco, Costa Rica, I've dedicated myself to the sport of pickleball, competing in tournaments and helping players of all levels improve their game. My passion for pickleball has taken me from recreational play to competitive tournaments and professional coaching.
              </p>
              <p style={{ 
                fontSize: '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                marginBottom: '25px'
              }}>
                As a PCI-certified coach with a 4.2 DUPR rating, I bring technical expertise and strategic insight to every coaching session. Whether you're a beginner looking to learn the basics or an advanced player aiming to refine your strategy, my personalized approach will help you reach your goals.
              </p>
              <p style={{ 
                fontSize: '1.2rem',
                lineHeight: 1.6,
                color: 'var(--text-color)'
              }}>
                My background in hospitality and business gives me a unique perspective on creating exceptional pickleball experiences, from private lessons to guided tours throughout Costa Rica's most beautiful pickleball destinations.
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
                src={IMAGES.PICKLEBALL.MEDAL_1}
                alt="Laurie with Pickleball Medals"
                className="medal-image"
                width={400}
                height={400}
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
            padding: '60px 20px',
            borderRadius: '0',
            marginBottom: '80px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)',
            overflow: 'hidden'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  color: 'var(--neutral-color)',
                  textAlign: 'center',
                  marginBottom: '40px'
                }}
              >
                Pickleball Achievements
              </motion.h2>
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index} 
                    className="achievement-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="achievement-content">{achievement.title}</div>
                    <div className="achievement-icon">{achievement.icon}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
            alignItems: 'center',
            padding: '0 15px'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <OptimizedImage
                src={IMAGES.PICKLEBALL.COURTS}
                alt="Pickleball Courts in Costa Rica"
                width={500}
                height={350}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ 
                fontSize: '2.8rem', 
                marginBottom: '30px',
                color: 'var(--primary-color)'
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
                      fontSize: '1.2rem',
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}
                  >
                    <span style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>✓</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div style={{ 
            backgroundColor: 'var(--neutral-color)',
            padding: '60px 20px',
            borderRadius: '12px',
            marginBottom: '80px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '2.8rem',
                color: 'var(--primary-color)'
              }}
            >
              Costa Rica Pickleball Experience
            </motion.h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '30px',
              justifyContent: 'center'
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
                <div style={{ height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.JACO}
                    alt="Jaco Beach"
                    width={300}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: '10px'
                }}>Beach Courts</h3>
                <p style={{ fontSize: '1.1rem' }}>
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
                <div style={{ height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.TOUCAN_TALL}
                    alt="Jungle Courts"
                    width={300}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: '10px'
                }}>Jungle Experience</h3>
                <p style={{ fontSize: '1.1rem' }}>
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
                <div style={{ height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '15px' }}>
                  <OptimizedImage
                    src={IMAGES.LOCATIONS.WATERFALL}
                    alt="Adventure Tours"
                    width={300}
                    height={200}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <h3 style={{ 
                  fontSize: '1.8rem',
                  color: 'var(--primary-color)',
                  marginBottom: '10px'
                }}>Adventure Tours</h3>
                <p style={{ fontSize: '1.1rem' }}>
                  Combine pickleball training with Costa Rica's natural wonders.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{
          padding: '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
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
              padding: '0 20px'
            }}
          >
            <h2 style={{ 
              fontSize: '3rem',
              marginBottom: '20px',
              color: 'var(--neutral-color)'
            }}>
              Ready to Elevate Your Game?
            </h2>
            <p style={{ 
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: 'var(--neutral-color)',
              marginBottom: '30px'
            }}>
              Whether you're looking for personalized coaching or an unforgettable pickleball tour in Costa Rica, I'm here to help you achieve your goals.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/training" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                display: 'inline-block',
                padding: '15px 30px',
                fontSize: '1.1rem',
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
                padding: '15px 30px',
                fontSize: '1.1rem',
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