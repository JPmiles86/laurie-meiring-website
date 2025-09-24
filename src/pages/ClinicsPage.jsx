import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
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

function ClinicsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const expectations = [
    {
      title: 'Structured Skill Development',
      description: 'Clinics follow the proven PiclUp Training System, building skills across every zone of the court - from baseline consistency to dinking mastery at the kitchen.'
    },
    {
      title: 'Hands-On Coaching',
      description: 'Led by certified coach Laurie Meiring (PCI + PiclUp Certified, DUPR 4.3+ competitor), you\'ll learn from someone who not only teaches but competes.'
    },
    {
      title: 'Game-Based Learning',
      description: 'Every clinic blends drills with live gameplay, so you immediately put new skills into practice.'
    },
    {
      title: 'Community & Fun',
      description: 'Clinics are more than training sessions; they\'re about meeting fellow players, sharing laughs, and growing together.'
    }
  ];

  const targetAudience = [
    {
      level: 'Beginners',
      description: 'Learn the fundamentals and get comfortable on court.'
    },
    {
      level: 'Intermediate Players',
      description: 'Build strategy, shot variety, and confidence under pressure.'
    },
    {
      level: 'Advanced Players',
      description: 'Sharpen tournament tactics, master stacking, and level up your mental game.'
    }
  ];

  const benefits = [
    {
      title: 'Fast Track Your Progress',
      description: 'Learn in hours what might take weeks on your own.'
    },
    {
      title: 'Train Smarter, Not Harder',
      description: 'Structured drills with clear outcomes.'
    },
    {
      title: 'Play in Paradise',
      description: 'Where else can you improve your game surrounded by Costa Rica\'s jungle, beaches, and community vibe?'
    }
  ];

  return (
    <PageTransition>
      <div className="clinics-page">
        {/* Hero Section - Simple White Background */}
        <section style={{
          minHeight: isMobile ? '50vh' : '55vh',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: isMobile ? '30px 20px' : '40px 40px'
        }}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            style={{
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: isMobile ? '3.5rem' : '4.5rem',
                marginBottom: isMobile ? '20px' : '25px',
                letterSpacing: '1px',
                color: 'var(--primary-color)',
                fontWeight: 'bold'
              }}
            >
              Learn. Play. Grow.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                lineHeight: 1.8,
                color: 'var(--text-color)',
                marginBottom: isMobile ? '10px' : '15px'
              }}
            >
              Whether you're brand new to the game or chasing tournament wins, our Pickleball Clinics are designed to take your skills, and your love for the game, to the next level.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                lineHeight: 1.8,
                color: 'var(--text-color)'
              }}
            >
              Hosted in stunning settings of Costa Rica, these clinics combine world-class coaching, structured training systems, and the energy of a supportive community.
            </motion.p>
          </motion.div>
        </section>

        <GradientDivider />

        {/* What to Expect Section - Two 50/50 layouts */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                color: 'var(--primary-color)',
                marginBottom: isMobile ? '40px' : '60px',
                textAlign: 'center'
              }}
            >
              What to Expect
            </motion.h2>

            {/* First 50/50 - Image left, 2 cards right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '60px',
              alignItems: 'center',
              marginBottom: isMobile ? '60px' : '80px'
            }}>
              {/* Image on left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ order: isMobile ? 2 : 1 }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  lineHeight: 0
                }}>
                  <img
                    src="/Pickelball/CoachinginAction2.jpeg"
                    alt="Coaching in Action"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      verticalAlign: 'bottom'
                    }}
                  />
                </div>
              </motion.div>

              {/* First 2 cards on right */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                order: isMobile ? 1 : 2
              }}>
                {expectations.slice(0, 2).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      backgroundColor: 'white',
                      padding: isMobile ? '25px' : '30px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      borderLeft: '4px solid var(--primary-color)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <h3 style={{
                      fontSize: isMobile ? '1.4rem' : '1.6rem',
                      color: 'var(--secondary-color)',
                      marginBottom: '12px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-color)',
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second 50/50 - 2 cards left, Image right */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '60px',
              alignItems: 'center'
            }}>
              {/* Last 2 cards on left */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                order: isMobile ? 1 : 1
              }}>
                {expectations.slice(2, 4).map((item, index) => (
                  <motion.div
                    key={index + 2}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      backgroundColor: 'white',
                      padding: isMobile ? '25px' : '30px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      borderLeft: '4px solid var(--primary-color)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <h3 style={{
                      fontSize: isMobile ? '1.4rem' : '1.6rem',
                      color: 'var(--secondary-color)',
                      marginBottom: '12px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-color)',
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* New image on right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ order: isMobile ? 2 : 2 }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  lineHeight: 0
                }}>
                  <img
                    src="/CoachingImage31.jpg"
                    alt="Coaching in Action"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      verticalAlign: 'bottom'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* Who It's For Section - Testing with blue background */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                color: 'var(--neutral-color)',
                marginBottom: isMobile ? '40px' : '60px',
                textAlign: 'center'
              }}
            >
              Who It's For
            </motion.h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '30px' : '40px'
            }}>
              {targetAudience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : '100px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    color: 'white'
                  }}>
                    {index === 0 ? '🎾' : index === 1 ? '🏆' : '💪'}
                  </div>
                  <h3 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    color: 'var(--neutral-color)',
                    marginBottom: '15px',
                    fontWeight: '600'
                  }}>
                    {item.level}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    lineHeight: 1.6,
                    color: 'var(--neutral-color)',
                    opacity: 0.95
                  }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* Why Join a Clinic Section - 50/50 layout */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                color: 'var(--primary-color)',
                marginBottom: isMobile ? '40px' : '60px',
                textAlign: 'center'
              }}
            >
              Why Join a Clinic?
            </motion.h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '60px',
              alignItems: 'center'
            }}>
              {/* Image on left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  order: isMobile ? 2 : 1
                }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  lineHeight: 0
                }}>
                  <img
                    src="/Pickelball/CaochinginAction1.jpeg"
                    alt="Coaching in Action"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      verticalAlign: 'bottom'
                    }}
                  />
                </div>
              </motion.div>

              {/* Three cards on right */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                order: isMobile ? 1 : 2
              }}>
                {benefits.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    style={{
                      backgroundColor: 'var(--secondary-color)',
                      padding: isMobile ? '25px 20px' : '30px 25px',
                      borderRadius: '12px',
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.12)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.12)';
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '-15px',
                      right: '-15px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)'
                    }} />
                    <h3 style={{
                      fontSize: isMobile ? '1.4rem' : '1.6rem',
                      color: 'var(--neutral-color)',
                      marginBottom: '12px',
                      fontWeight: '600',
                      position: 'relative'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: isMobile ? '0.95rem' : '1.05rem',
                      lineHeight: 1.6,
                      color: 'var(--neutral-color)',
                      opacity: 0.95,
                      position: 'relative',
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* Upcoming Clinics Section */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                color: 'var(--neutral-color)',
                marginBottom: isMobile ? '30px' : '40px'
              }}
            >
              Upcoming Clinics
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: isMobile ? '30px 20px' : '40px',
                marginBottom: '40px'
              }}
            >
              <h3 style={{
                fontSize: isMobile ? '1.6rem' : '1.8rem',
                marginBottom: '20px',
                color: 'var(--neutral-color)'
              }}>
                📍 Jungle Pickleball – Ojochal, Costa Rica
              </h3>
              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                marginBottom: '10px',
                color: 'var(--neutral-color)'
              }}>
                🗓️ New dates announced monthly
              </p>
              <p style={{
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                marginBottom: '30px',
                color: 'var(--neutral-color)'
              }}>
                💥 Limited spots to ensure individual attention
              </p>
              <Link
                to="/contact"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: isMobile ? '12px 30px' : '15px 40px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
                }}
              >
                Sign Up Now
              </Link>
            </motion.div>
          </div>
        </section>

        {/* About Your Coach Section */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                color: 'var(--primary-color)',
                marginBottom: isMobile ? '40px' : '60px',
                textAlign: 'center'
              }}
            >
              About Your Coach
            </motion.h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
              gap: isMobile ? '30px' : '50px',
              alignItems: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  lineHeight: 0
                }}>
                  <img
                    src="/Pickelball/CoachingLaurie.jpeg"
                    alt="Coach Laurie Meiring"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      verticalAlign: 'bottom'
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p style={{
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  lineHeight: 1.8,
                  color: 'var(--text-color)',
                  marginBottom: '20px'
                }}>
                  <strong>Laurie Meiring</strong> is a certified PCI and PiclUp Pickleball Coach, tournament medalist, and the founder of <em>Your Pickleball Guide Costa Rica</em>. He's passionate about helping players at all levels unlock their potential through structured training, mental focus, and smart strategy.
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}>
                    <span style={{ color: 'var(--primary-color)', marginRight: '10px', fontSize: '1.2rem' }}>✓</span>
                    PCI & PiclUp Certified Coach
                  </li>
                  <li style={{
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}>
                    <span style={{ color: 'var(--primary-color)', marginRight: '10px', fontSize: '1.2rem' }}>✓</span>
                    DUPR 4.3+ Competitor
                  </li>
                  <li style={{
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}>
                    <span style={{ color: 'var(--primary-color)', marginRight: '10px', fontSize: '1.2rem' }}>✓</span>
                    Tournament Medalist
                  </li>
                  <li style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: isMobile ? '1rem' : '1.1rem'
                  }}>
                    <span style={{ color: 'var(--primary-color)', marginRight: '10px', fontSize: '1.2rem' }}>✓</span>
                    Founder of Your Pickleball Guide Costa Rica
                  </li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Link
                    to="/about"
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--neutral-color)',
                      padding: isMobile ? '12px 25px' : '14px 30px',
                      borderRadius: '30px',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    Learn More About Laurie
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <GradientDivider />

        {/* Final CTA Section - Changed to Blue Background */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{
                fontSize: isMobile ? '2.5rem' : '3rem',
                marginBottom: '20px',
                color: 'var(--neutral-color)'
              }}>
                Ready to Join?
              </h2>
              <p style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                marginBottom: '40px',
                lineHeight: 1.6,
                color: 'var(--neutral-color)'
              }}>
                Spots fill fast - sign up now and be part of Costa Rica's growing Pickleball movement.
              </p>
              <Link
                to="/contact"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: isMobile ? '15px 40px' : '18px 50px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.2rem' : '1.3rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  fontWeight: 'bold'
                }}
              >
                👉 Book Your Clinic Today
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Subscribe Modal */}
        <SubscribeModal
          isOpen={isSubscribeModalOpen}
          onClose={() => setIsSubscribeModalOpen(false)}
        />
      </div>
    </PageTransition>
  );
}

export default ClinicsPage;