import React, { useState, useEffect } from 'react';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import PageTransition from '../components/PageTransition';
import VideoPlayer from '../components/VideoPlayer';
import { IMAGES } from '../constants/images';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GradientDivider from '../components/GradientDivider';

function TrainingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pricingPlans = [
    {
      title: 'Single Session',
      price: '$30',
      duration: 'per Hour',
      description: 'Personalized one-on-one coaching designed to match your skill level and goals.',
      features: [
        'Skill Assessment',
        'Identification of Improvement Areas',
        'Technique Refinement',
        'Video Feedback',
        'Tournament Preparation & Strategy'
      ],
      featured: false
    },
    {
      title: 'Bundle Package',
      price: '$250',
      duration: 'for 10 Sessions (Save $50)',
      description: 'Perfect for committed players looking to see real progress over time.',
      features: [
        'All Single Session Features',
        'Progressive Skill Development',
        'Performance Tracking',
        'Customized Training Plan',
        'Priority Scheduling'
      ],
      featured: true
    },
    {
      title: 'Group Training',
      price: '$20',
      duration: 'per person/hour (2-4 players)',
      description: 'Train with friends or family and enjoy the benefits of group coaching.',
      features: [
        'Tailored group drills & exercises',
        'Competitive Play Scenarios',
        'Match Strategy & Teamwork',
        'Game-based Learning',
        'Fun & social atmosphere'
      ],
      featured: false
    }
  ];

  const trainingBenefits = [
    'PCI Certified Coach',
    'Tournament Experience & Gold Medallist',
    'Coaching for All Skill Levels',
    'Private & Group Lessons Available',
    'Train in Stunning Costa Rica Locations'
  ];

  return (
    <PageTransition>
      <div className="training-page">
        <VideoBackground
          videoId="XdpFc98GcPM"
          startTime={0}
          endTime={30}
          height="95vh"
          overlayColor="rgba(0, 0, 0, 0.4)"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 15px' : '0 20px', textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.8rem' : '3.5rem',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Pickleball Coaching
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '1.5rem' : '2rem',
                marginBottom: '30px',
                maxWidth: '800px',
                margin: '0 auto 30px',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              Dream, Drill, Execute!
            </motion.p>
          </div>
        </VideoBackground>

        <section className="training-intro" style={{
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
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: isMobile ? '2.4rem' : '2.8rem'
              }}
            >
              Professional Pickleball Training
            </motion.h2>
            <div className="training-intro" style={{ 
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '30px' : '40px',
              alignItems: 'center',
              marginTop: '40px'
            }}>
              <div className="training-image" style={{ 
                width: isMobile ? '100%' : '50%',
                order: isMobile ? 1 : 0
              }}>
                <OptimizedImage
                  src={IMAGES.PICKLEBALL.COURTS}
                  alt="Pickleball Courts in Costa Rica"
                  width={600}
                  height={400}
                  style={{
                    borderRadius: isMobile ? '16px' : '12px',
                    boxShadow: isMobile ? '0 8px 20px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </div>
              <div className="training-content" style={{ 
                width: isMobile ? '100%' : '50%',
                order: isMobile ? 0 : 1
              }}>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ 
                    color: 'var(--primary-color)', 
                    fontSize: isMobile ? '1.8rem' : '2rem', 
                    fontWeight: 'normal', 
                    marginBottom: '15px' 
                  }}
                >
                  Professional Coaching
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-color)', lineHeight: '1.6' }}
                >
                  With tournament experience and a passion for teaching, I bring competitive insights 
                  and proven strategies to help players of all levels improve their game.
                </motion.p>
                <motion.ul 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ 
                    listStyle: 'none',
                    padding: 0,
                    margin: '20px 0'
                  }}
                >
                  {trainingBenefits.map((item, index) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                      style={{
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--text-color)',
                        fontSize: '1.1rem',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </section>

        <GradientDivider />

        <section className="pricing" style={{
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
                textAlign: 'center', 
                marginBottom: isMobile ? '30px' : '40px',
                fontSize: isMobile ? '2.2rem' : '2.8rem'
              }}
            >
              Pickleball Training Packages
            </motion.h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '25px' : '30px',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
                  }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: plan.featured ? '2px solid var(--secondary-color)' : 'none',
                    transform: plan.featured ? 'scale(1.05)' : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  {plan.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'var(--secondary-color)',
                      color: 'var(--neutral-color)',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Best Value
                    </div>
                  )}
                  <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '1.8rem',
                      color: 'var(--primary-color)',
                      marginBottom: '10px'
                    }}>
                      {plan.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      marginBottom: '15px'
                    }}>
                      <span style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: 'var(--text-color)'
                      }}>
                        {plan.price}
                      </span>
                      <span style={{
                        fontSize: '1rem',
                        color: 'var(--text-color)',
                        marginLeft: '5px',
                        opacity: 0.8
                      }}>
                        {plan.duration}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--text-color)',
                      marginBottom: '20px',
                      lineHeight: 1.6
                    }}>
                      {plan.description}
                    </p>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 25px 0'
                    }}>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} style={{
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.95rem'
                        }}>
                          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 'auto' }}>
                      <Link to="/contact" className="button" style={{
                        display: 'block',
                        textAlign: 'center',
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--neutral-color)',
                        padding: '12px',
                        borderRadius: '25px',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: isMobile ? '60px 15px' : '80px 20px', backgroundColor: 'var(--secondary-color)', color: 'var(--neutral-color)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '50px',
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.5rem' : '3rem'
              }}
            >
              Professional Pickleball Coaching
            </motion.h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '80px'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <OptimizedImage 
                  src="/Laurie-Coaching-Hero-2.jpg"
                  alt="Professional Pickleball Coaching"
                  style={{
                    width: '100%',
                    height: isMobile ? '300px' : '400px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    aspectRatio: '1/1'
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 style={{ 
                  fontSize: isMobile ? '1.8rem' : '2.2rem', 
                  marginBottom: '20px',
                  color: 'var(--neutral-color)'
                }}>
                  Professional Pickleball Coaching
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.6, 
                  marginBottom: '25px',
                  color: 'var(--neutral-color)'
                }}>
                  As a 4.2 DUPR player, PCI Certified Coach, and multi-time tournament winner, I bring both experience and passion to helping players elevate their game. My proven coaching approach makes learning fun and effective—whether you're a beginner or an advanced player.
                </p>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 30px 0' 
                }}>
                  {trainingBenefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{ 
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        color: 'var(--neutral-color)'
                      }}
                    >
                      <span style={{ 
                        color: 'var(--neutral-color)', 
                        marginRight: '10px',
                        fontWeight: 'bold'
                      }}>✅</span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <GradientDivider />

        <section style={{ 
          padding: isMobile ? '60px 15px' : '80px 20px', 
          backgroundColor: 'var(--light-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '50px',
                color: 'var(--primary-color)',
                fontSize: isMobile ? '2.5rem' : '3rem'
              }}
            >
              My Pickleball Coaching Approach
            </motion.h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '40px'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ order: isMobile ? 2 : 1 }}
              >
                <h3 style={{ 
                  fontSize: isMobile ? '1.8rem' : '2.2rem', 
                  marginBottom: '20px',
                  color: 'var(--text-color)'
                }}>
                  My Coaching Approach
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.6, 
                  marginBottom: '25px',
                  color: 'var(--text-color)'
                }}>
                  I believe the fastest way to improve is by mastering both the slow and fast aspects of the game. That's why every session starts at the kitchen, focusing on control, technique, and strategic shot selection. By assessing footwork, paddle mechanics, and shot consistency, I tailor each lesson to individual needs—whether it's refining the drop shot, enhancing variety, or building a more complete game.
                </p>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 30px 0' 
                }}>
                  {[
                    'Kitchen-First Approach – Master soft game fundamentals before adding speed',
                    'Personalised Coaching – Identify key areas for improvement based on real-time play',
                    'Drop Shot Focus – Learn the most effective way to transition to the net',
                    'Pressure Drills – Use scoring and match scenarios to improve decision-making',
                    'Variety & Strategy – Develop a mix of shots to keep opponents off balance',
                    'Game-Based Learning – End each session with live play to apply new skills'
                  ].map((approach, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{ 
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        fontSize: '1.1rem'
                      }}
                    >
                      <span style={{ 
                        color: 'var(--primary-color)', 
                        marginRight: '10px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginTop: '3px'
                      }}>✅</span>
                      <span>{approach}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ textAlign: isMobile ? 'center' : 'left' }}
                >
                  <Link to="/contact" className="button" style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--neutral-color)',
                    display: 'inline-block',
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>Schedule your Session</Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ 
                  order: isMobile ? 1 : 2,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div style={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '133%', /* Adjust this based on the aspect ratio of your image */
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}>
                  <OptimizedImage 
                    src="/winners2-2.jpg"
                    alt="Pickleball Coaching Approach"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <GradientDivider />

        <section className="coaching-video" style={{ 
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              See Pickleball Training in Action
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VideoPlayer 
                videoId="a-FZYnE7Ip0" 
                title="Pickleball Training Session" 
                description="Watch a sample coaching session to see my teaching style and approach"
              />
              <div style={{ 
                maxWidth: '800px', 
                margin: '30px auto 0',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-color)' }}>
                  This video showcases my coaching style and the personalized approach I take with each player. 
                  Whether you're working on fundamentals or advanced strategy, I'll tailor each session to help you 
                  achieve your pickleball goals.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="cta-section" style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginBottom: '0'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ 
                fontSize: isMobile ? '2.4rem' : '2.8rem', 
                marginBottom: isMobile ? '15px' : '20px',
                color: 'var(--neutral-color)'
              }}>
                Ready to Elevate Your Pickleball Game?
              </h2>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem', 
                lineHeight: 1.6,
                marginBottom: isMobile ? '25px' : '30px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                color: 'var(--neutral-color)',
                padding: isMobile ? '0 10px' : '0'
              }}>
                Whether you're a beginner or an experienced player, I'm here to help you reach your pickleball goals in the beautiful setting of Costa Rica.
              </p>
              <div className="button-container" style={{ 
                display: 'flex', 
                gap: '20px', 
                justifyContent: 'center', 
                flexWrap: 'wrap',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                maxWidth: isMobile ? '280px' : 'none',
                margin: '0 auto'
              }}>
                <Link to="/contact" className="button" style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: isMobile ? '14px 20px' : '15px 30px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: isMobile ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  fontWeight: 'bold'
                }}>
                  Book a Session
                </Link>
                <Link to="/tours" className="button" style={{
                  backgroundColor: 'var(--neutral-color)',
                  color: 'var(--primary-color)',
                  padding: isMobile ? '14px 20px' : '15px 30px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: isMobile ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  fontWeight: 'bold'
                }}>
                  Explore Tours
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="faq-section" style={{ 
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
                textAlign: 'center',
                marginBottom: isMobile ? '30px' : '40px',
                color: 'var(--primary-color)',
                fontSize: isMobile ? '2.4rem' : '2.8rem'
              }}
            >
              Frequently Asked Questions
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '30px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                {
                  question: "What skill level is required for training sessions?",
                  answer: "Training sessions are available for all skill levels, from complete beginners to advanced players. Each session is tailored to your specific skill level and goals."
                },
                {
                  question: "How long are the training sessions?",
                  answer: "Standard sessions are one hour long, but can be extended to 90 minutes or 2 hours based on your preference and stamina. We recommend starting with one-hour sessions and adjusting as needed."
                },
                {
                  question: "Can I book multiple sessions in one day?",
                  answer: "Yes, you can book morning and afternoon sessions with a break in between. However, we recommend not scheduling more than 2-3 hours of training per day to prevent fatigue and ensure quality practice."
                },
                {
                  question: "Is equipment provided for training sessions?",
                  answer: "Yes, we provide high-quality paddles and balls for all training sessions. However, if you prefer to use your own equipment, you're welcome to bring it."
                },
                {
                  question: "What should I wear to training sessions?",
                  answer: "Comfortable athletic clothing, court shoes, a hat, and sunglasses are recommended. Don't forget sunscreen and a water bottle as Costa Rica can get quite warm."
                },
                {
                  question: "Can I cancel or reschedule my training session?",
                  answer: "Yes, we understand plans can change. We request at least 24 hours notice for cancellations or rescheduling. Last-minute cancellations may be subject to a fee."
                },
                {
                  question: "Do you offer group discounts?",
                  answer: "Yes! Our group training option is already discounted at $20 per person per hour for groups of 2-4 players. For larger groups, please contact us for special rates."
                },
                {
                  question: "How do I track my progress?",
                  answer: "For clients booking multiple sessions, we provide progress tracking and personalized feedback. We can also record video analysis of your play to help identify areas for improvement."
                }
              ].map((faq, index) => (
                <FaqItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: isMobile ? '20px' : '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ 
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: isOpen ? '#fff' : '#f9f9f9'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ 
          fontSize: isMobile ? '1.1rem' : '1.3rem', 
          marginBottom: isOpen ? '15px' : '0',
          color: 'var(--primary-color)',
          transition: 'margin-bottom 0.3s ease'
        }}>
          {faq.question}
        </h3>
        <div style={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          <span style={{
            fontSize: '1.5rem',
            color: 'var(--primary-color)',
            fontWeight: 'bold'
          }}>+</span>
        </div>
      </div>
      
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{ 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            lineHeight: 1.6,
            color: 'var(--text-color)',
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: '1px solid #eee'
          }}
        >
          {faq.answer}
        </motion.p>
      )}
    </motion.div>
  );
}

export default TrainingPage; 