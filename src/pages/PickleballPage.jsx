import React from 'react';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import PageTransition from '../components/PageTransition';
import { IMAGES } from '../constants/images';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function PickleballPage() {
  const pricingPlans = [
    {
      title: 'Single Session',
      price: '$30',
      duration: 'per hour',
      description: 'One-on-one personalized coaching tailored to your skill level and goals.',
      features: [
        'Skill assessment',
        'Technique refinement',
        'Strategy development',
        'Video analysis',
        'Personalized feedback'
      ],
      featured: false
    },
    {
      title: 'Bundle Package',
      price: '$250',
      duration: '10 sessions',
      description: 'Save $50 with our bundle package. Perfect for committed players looking to significantly improve their game.',
      features: [
        'All features of single sessions',
        'Progressive skill development',
        'Customized training plan',
        'Performance tracking',
        'Priority scheduling'
      ],
      featured: true
    },
    {
      title: 'Group Training',
      price: '$20',
      duration: 'per person/hour',
      description: 'Train with friends or family (2-4 players) and enjoy the benefits of group dynamics.',
      features: [
        'Tailored group exercises',
        'Competitive drills',
        'Match play scenarios',
        'Team strategy development',
        'Fun, social atmosphere'
      ],
      featured: false
    }
  ];

  const trainingBenefits = [
    'Certified PCI Coach',
    'Tournament Champion Experience',
    'Customized Training Plans',
    'All Skill Levels Welcome',
    'Beautiful Costa Rica Locations'
  ];

  return (
    <PageTransition>
      <div className="training-page">
        <VideoBackground
          videoId="S1zJYUjbXg8"
          startTime={0}
          endTime={30}
          height="95vh"
          overlayColor="rgba(0, 0, 0, 0.4)"
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: '3.5rem',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Pickleball Training
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ 
                fontSize: '1.2rem', 
                maxWidth: '800px', 
                margin: '20px auto',
                color: 'var(--neutral-color)',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              Elevate your game with professional coaching in the beautiful setting of Jaco, Costa Rica
            </motion.p>
          </div>
        </VideoBackground>

        <section className="achievements" style={{ 
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            Championship Experience
          </motion.h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div className="medal-gallery" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              <OptimizedImage
                src={IMAGES.PICKLEBALL.MEDAL_1}
                alt="Championship Medal"
                width={280}
                height={280}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'rotate(-2deg)'
                }}
              />
              <OptimizedImage
                src={IMAGES.PICKLEBALL.MEDAL_2}
                alt="Tournament Victory"
                width={280}
                height={280}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transform: 'rotate(2deg)'
                }}
              />
            </div>
            <div className="achievement-content">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Professional Coaching
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: '1.1rem', marginBottom: '20px' }}
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
                      gap: '10px'
                    }}
                  >
                    <span style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        <section className="pricing" style={{
          padding: '80px 20px',
          backgroundColor: 'var(--neutral-color)',
          borderTop: '2px dashed var(--secondary-color)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              Training Packages
            </motion.h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
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
                      color: 'var(--text-color)',
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
                          <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 'auto' }}>
                      <Link to="/contact" className="button" style={{
                        display: 'block',
                        textAlign: 'center',
                        backgroundColor: plan.featured ? 'var(--secondary-color)' : 'var(--primary-color)',
                        color: plan.featured ? 'var(--text-color)' : 'var(--neutral-color)',
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

        <section className="training-approach" style={{
          padding: '80px 20px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '40px' }}
            >
              Training Approach
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="approach-content"
              >
                <h3>Personalized Coaching</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                  Every player is unique, with different strengths, weaknesses, and goals. My coaching approach 
                  is tailored to your specific needs, whether you're a beginner learning the basics or an 
                  advanced player refining your strategy.
                </p>
                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: '20px 0'
                }}>
                  {[
                    'Technical fundamentals',
                    'Strategic gameplay',
                    'Mental approach',
                    'Physical conditioning',
                    'Match preparation'
                  ].map((item, index) => (
                    <li key={index} style={{
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: 'var(--secondary-color)', fontSize: '1.2rem' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="button" style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease'
                }}>
                  Schedule Your Session
                </Link>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="approach-image"
              >
                <OptimizedImage
                  src={IMAGES.PICKLEBALL.COURTS}
                  alt="Pickleball Courts in Costa Rica"
                  width={600}
                  height={400}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section style={{
          padding: '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--text-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginBottom: '-80px'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ 
                fontSize: '2.8rem', 
                marginBottom: '20px',
                color: 'var(--text-color)'
              }}>
                Ready to Elevate Your Game?
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: 1.6,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px'
              }}>
                Whether you're a beginner or an experienced player, I'm here to help you reach your pickleball goals in the beautiful setting of Costa Rica.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="button" style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: '15px 30px',
                  borderRadius: '30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  Book a Session
                </Link>
                <Link to="/tours" className="button" style={{
                  backgroundColor: 'var(--neutral-color)',
                  color: 'var(--primary-color)',
                  padding: '15px 30px',
                  borderRadius: '30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  Explore Tours
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default PickleballPage;