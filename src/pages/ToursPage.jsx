import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';
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

function ToursPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tourPackages = [
    {
      title: "Weekend Warrior",
      duration: "3 Days",
      price: "From $599",
      description: "Perfect for a quick pickleball getaway. Includes daily coaching sessions, competitive play, and beach activities.",
      features: [
        "2 Professional coaching sessions",
        "1 Local tournament experience",
        "Beach accommodation",
        "Airport transfers",
        "Equipment provided"
      ],
      image: "/beach surf 3x2.jpg",
      featured: false
    },
    {
      title: "Pickleball Paradise",
      duration: "6 Days",
      price: "$2199",
      description: "Embark on the ultimate Pickleball getaway, where world-class play meets breathtaking destinations. Our exclusive 6-day tour takes you through Costa Rica's most stunning locations from the Jungle of Ojochal to Jaco Beach, and Tamarindo - blending expert coaching, competitive games, and unforgettable experiences.",
      features: [
        "All local transfers within Costa Rica",
        "Comfortable accommodation with daily breakfast",
        "Dinner included (excluding drinks)",
        "Expert coaching and structured play sessions",
        "Competitive games against local players & tournaments",
        "All Pickleball court fees"
      ],
      image: "/waterfall 2x3.jpg",
      featured: true
    },
    {
      title: "Ultimate Costa Rica",
      duration: "10 Days",
      price: "From $2,199",
      description: "The complete Costa Rican pickleball experience, visiting multiple destinations with coaching and tournaments.",
      features: [
        "6 Professional coaching sessions",
        "3 Local tournament experiences",
        "Beach, jungle and city locations",
        "Wildlife tour included",
        "Luxury accommodation",
        "All meals and transportation"
      ],
      image: "/toucan 2x3.jpg",
      featured: false
    }
  ];

  const locations = [
    {
      name: "Ojochal - Jungle Retreat",
      description: "Play surrounded by lush rainforest with the sounds of nature as your backdrop.",
      image: "/toucan 2x3.jpg"
    },
    {
      name: "Jaco Beach",
      description: "Our home base with beautiful beach courts and perfect weather year-round.",
      image: "/jaco.jpg"
    },
    {
      name: "Tamarindo - Coastal Town",
      description: "Experience pickleball in this vibrant coastal town known for its beautiful beaches.",
      image: "/beach surf 3x2.jpg"
    }
  ];

  const includedFeatures = [
    {
      title: "Professional Coaching",
      description: "Receive personalized instruction from tournament champion Laurie Meiring. Focus on technique, strategy, and game improvement in beautiful Costa Rican settings.",
      image: "/laurie medals 1.jpg"
    },
    {
      title: "Local Tournaments",
      description: "Test your skills in friendly competitive play with local pickleball clubs. Experience the vibrant Costa Rican pickleball community and make lasting connections.",
      image: "/coaching-game.png"
    },
    {
      title: "Paradise Experience",
      description: "Enjoy premium accommodations, local cuisine, and guided adventures between pickleball sessions. Explore beaches, rainforests, and wildlife in this tropical paradise.",
      image: "/beach (portrait 4x5).jpg"
    }
  ];

  const accommodations = [
    {
      title: "Beachfront Luxury",
      description: "Wake up to the sound of waves and enjoy stunning ocean views from your comfortable beachfront accommodation in Jaco.",
      image: "/beachfront.jpeg"
    },
    {
      title: "Jungle Retreat",
      description: "Immerse yourself in nature at our jungle accommodations in Ojochal, surrounded by lush rainforest and wildlife.",
      image: "/mountain.jpeg"
    },
    {
      title: "Coastal Town Living",
      description: "Experience the vibrant culture and beautiful beaches of Tamarindo from our centrally located accommodations.",
      image: "/city.jpeg"
    }
  ];

  return (
    <PageTransition>
      <div className="tours-page">
        <VideoBackground
          videoId="1068883249"
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
              Discover Pickleball Paradise
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '1.5rem' : '2rem',
                marginBottom: '30px',
                maxWidth: '800px',
                margin: '0 auto 30px',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              6-Day Adventure $2199* p/p
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                padding: isMobile ? '12px 25px' : '15px 30px',
                borderRadius: '30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: isMobile ? '15px' : '20px',
                boxShadow: isMobile ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}>
                Book Your Tour
              </Link>
            </motion.div>
          </div>
        </VideoBackground>

        <section style={{ padding: isMobile ? '60px 15px' : '80px 20px', backgroundColor: 'var(--neutral-color)' }}>
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
              Tour Package
            </motion.h2>
            
            <div style={{ 
              width: isMobile ? '100%' : '60%',
              margin: '0 auto 60px',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: isMobile ? '1.8rem' : '2.2rem', 
                marginBottom: '20px',
                color: 'var(--text-color)'
              }}>
                Pickleball Paradise
              </h3>
              
              <div style={{
                width: '200px',
                height: '200px',
                margin: '0 auto 30px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                border: '4px solid var(--secondary-color)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}>
                <OptimizedImage 
                  src="/beach (portrait 4x5).jpg"
                  alt="Pickleball Paradise"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.6, 
                marginBottom: '40px',
                color: 'var(--text-color)'
              }}>
                Embark on the ultimate Pickleball getaway, where world-class play meets breathtaking destinations. Our exclusive 6-day tour takes you through Costa Rica's most stunning locations from the Jungle of Ojochal to Jaco Beach, and Tamarindo - blending expert coaching, competitive games, and unforgettable experiences.
              </p>
            </div>
            
            <div style={{
              marginBottom: '60px',
              width: '100%'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '40px',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.8rem', 
                      marginBottom: '25px',
                      color: 'var(--primary-color)'
                    }}>
                      Your Pickleball Adventure at a Glance
                    </h3>
                    
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      margin: 0
                    }}>
                      {[
                        'Duration: 6 full days (excluding 2 flight days)',
                        'Destinations: Ojochal (Jungle), Jaco (Beach), Tamarindo (Coastal Town)',
                        'Experience Level: Tailored for competitive players with similar DUPR ratings',
                        'Group Size: 6-8 players',
                        'Price: $2199* per person',
                        '*: Subject to change based on seasonal pricing'
                      ].map((detail, index) => {
                        const parts = detail.split(':');
                        const beforeColon = parts[0];
                        const afterColon = parts.slice(1).join(':');
                        
                        return (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            style={{ 
                              marginBottom: '15px',
                              display: 'flex',
                              alignItems: 'flex-start',
                              fontSize: '1.1rem'
                            }}
                          >
                            <span style={{ 
                              color: 'var(--primary-color)', 
                              marginRight: '10px',
                              fontWeight: 'bold',
                              flexShrink: 0
                            }}>•</span>
                            <span>
                              <strong>{beforeColon}</strong>{afterColon}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: 0,
                    paddingBottom: '75%',
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    border: '3px solid var(--secondary-color)'
                  }}>
                    <OptimizedImage 
                      src="/tours/PickleballGeneric2.jpg"
                      alt="Pickleball Adventure"
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
                </div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '40px',
                  alignItems: 'center'
                }}>
                  <div style={{ order: isMobile ? 2 : 1 }}>
                    <div style={{
                      width: '100%',
                      height: 0,
                      paddingBottom: '75%',
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      border: '3px solid var(--secondary-color)'
                    }}>
                      <OptimizedImage 
                        src="/tours/PickleballGeneric3.jpg"
                        alt="Pickleball Courts"
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
                  </div>
                  
                  <div style={{ order: isMobile ? 1 : 2 }}>
                    <h3 style={{ 
                      fontSize: '1.8rem', 
                      marginBottom: '25px',
                      color: 'var(--primary-color)'
                    }}>
                      What's Included
                    </h3>
                    
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      margin: 0
                    }}>
                      {[
                        'All local transfers within Costa Rica',
                        'Comfortable accommodation with daily breakfast',
                        'Dinner included (excluding drinks)',
                        'Expert coaching and structured play sessions',
                        'Competitive games against local players & tournaments',
                        'All Pickleball court fees'
                      ].map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          style={{ 
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '1.1rem'
                          }}
                        >
                          <span style={{ 
                            color: 'var(--primary-color)', 
                            marginRight: '10px',
                            fontWeight: 'bold',
                            fontSize: '1.2rem'
                          }}>✓</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <GradientDivider />
        
        <section style={{ padding: isMobile ? '60px 15px' : '80px 20px', backgroundColor: 'var(--light-color)' }}>
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
              Sample Itinerary
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                color: 'var(--text-color)',
                fontSize: isMobile ? '1.8rem' : '2.2rem'
              }}
            >
              Your 6-Day Pickleball Journey
            </motion.h3>
            
            <div style={{ marginBottom: '60px' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '30px',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '30px',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '8px',
                  height: '100%',
                  backgroundColor: 'var(--secondary-color)'
                }}></div>
                
                <div style={{ paddingLeft: '12px' }}>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '20px',
                    color: 'var(--primary-color)'
                  }}>
                    Day 1 & 2: Ojochal - Pickleball & Jungle Retreat
                  </h4>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 20px 0' 
                  }}>
                    {[
                      'Day 1: Morning coaching session focused on skill refinement, followed by structured play.',
                      'Day 2: Competitive games against players of similar DUPR levels or a mini-tournament.',
                      'Evening: Enjoy a jungle dinner surrounded by Costa Rica\'s lush rainforest.',
                      'Optional Extras at additional cost: Waterfall Walking Tour, WhaleTail Uvita Beach Visit, Interpretative Nature Reserve Visit, Wildlife Sanctuary Tour, Kayak Tour, Surfing Lesson, Scuba/Snorkel, River Tours'
                    ].map((item, index) => (
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
                          fontSize: '1.1rem',
                          lineHeight: 1.6
                        }}
                      >
                        <span style={{ 
                          color: 'var(--primary-color)', 
                          marginRight: '10px',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div style={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '75%',
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '3px solid var(--secondary-color)'
                }}>
                  <OptimizedImage 
                    src="/tours/OjochalWaterfall.jpg"
                    alt="Ojochal - Jungle Retreat"
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
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '30px',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '30px',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '8px',
                  height: '100%',
                  backgroundColor: 'var(--primary-color)'
                }}></div>
                
                <div style={{ order: isMobile ? 1 : 2, paddingLeft: '12px' }}>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '20px',
                    color: 'var(--primary-color)'
                  }}>
                    Day 3 & 4: Jaco Beach - Sun, Sand & Pickleball
                  </h4>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 20px 0' 
                  }}>
                    {[
                      'Day 3: Beachside coaching session and match strategy tuning.',
                      'Day 4: Competitive games or tournament with local players.',
                      'Evening: Sunset dining at a beachfront restaurant.',
                      'Optional Extras include: Waterfall Walking Tour, Zipline Tour, ATV Jungle Tour, National Park Tour, Paragliding, Visit Tartuga Island, Crocodile Tour, Catamaran Cruise, Private Fishing Charter, Horseback Riding, Nightlife Tour, Surfing Lesson, Yoga'
                    ].map((item, index) => (
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
                          fontSize: '1.1rem',
                          lineHeight: 1.6
                        }}
                      >
                        <span style={{ 
                          color: 'var(--primary-color)', 
                          marginRight: '10px',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div style={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '75%',
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  order: isMobile ? 2 : 1,
                  border: '3px solid var(--secondary-color)'
                }}>
                  <OptimizedImage 
                    src="/tours/fun-2.jpg"
                    alt="Jaco Beach"
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
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '30px',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '8px',
                  height: '100%',
                  backgroundColor: 'var(--secondary-color)'
                }}></div>
                
                <div style={{ paddingLeft: '12px' }}>
                  <h4 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '20px',
                    color: 'var(--primary-color)'
                  }}>
                    Day 5 & 6: Tamarindo - Coastal Play & Farewell Matches
                  </h4>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 20px 0' 
                  }}>
                    {[
                      'Day 5: Advanced coaching and gameplay fine-tuning.',
                      'Day 6: Final day of high-level matches or a farewell tournament.',
                      'Evening: Celebrate with a farewell dinner and reflections on an epic Pickleball journey.',
                      'Optional Extras include: Mangrove Boat Safari, Guachipelin Adventure Tour, Sunset Catamaran Cruise, Zipline Tour, ATV Tour, White Water Rafting, Snorkeling, Sports Fishing, Nightlife Tour, Surfing Lesson, Yoga'
                    ].map((item, index) => (
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
                          fontSize: '1.1rem',
                          lineHeight: 1.6
                        }}
                      >
                        <span style={{ 
                          color: 'var(--primary-color)', 
                          marginRight: '10px',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div style={{
                  width: '100%',
                  height: 0,
                  paddingBottom: '75%',
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '3px solid var(--secondary-color)'
                }}>
                  <OptimizedImage 
                    src="/tours/PickleballGeneric5.jpg"
                    alt="Tamarindo - Coastal Town"
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundColor: 'var(--secondary-color)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                marginBottom: '30px',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '30px',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <div style={{
                width: '100%',
                height: 0,
                paddingBottom: '75%',
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                border: '4px solid white'
              }}>
                <OptimizedImage 
                  src="/tours/PickleballAdventure1.jpg"
                  alt="Why Choose Our Tour"
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
              
              <div>
                <h4 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '20px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Why Choose This Tour?
                </h4>
                
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '0 0 20px 0' 
                }}>
                  {[
                    'Play and compete in three unique destinations',
                    'Train with an experienced coach and improve your game',
                    'Connect with like-minded players in a stunning tropical setting',
                    'Enjoy a perfect balance of competition, training, and relaxation'
                  ].map((reason, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{ 
                        marginBottom: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1.1rem',
                        color: 'white'
                      }}
                    >
                      <span style={{ 
                        color: 'var(--neutral-color)', 
                        marginRight: '10px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}>✓</span>
                      <span style={{ color: 'white' }}>{reason}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <p style={{ 
                    fontSize: '1.2rem', 
                    marginBottom: '20px',
                    fontStyle: 'italic'
                  }}>
                    Got questions? Reach out and let's make your Pickleball dream in Costa Rica a reality!
                  </p>
                  
                  <Link to="/contact" className="button" style={{
                    backgroundColor: 'white',
                    color: 'var(--primary-color)',
                    display: 'inline-block',
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>Contact Me</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="features" style={{ 
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                marginBottom: isMobile ? '30px' : '40px',
                fontSize: isMobile ? '2.4rem' : '2.8rem',
                color: 'var(--neutral-color)'
              }}
            >
              Accommodations
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '30px' : '40px',
              textAlign: 'center',
              padding: '0 10px',
              marginBottom: '40px'
            }}>
              {accommodations.map((accommodation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    padding: '0 10px'
                  }}
                >
                  <div style={{ 
                    width: isMobile ? '120px' : '150px', 
                    height: isMobile ? '120px' : '150px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    border: '4px solid var(--neutral-color)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}>
                    <img 
                      src={accommodation.image} 
                      alt={accommodation.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h3 style={{ 
                    fontSize: isMobile ? '1.6rem' : '1.8rem', 
                    marginBottom: '15px', 
                    color: '#ffffff' 
                  }}>
                    {accommodation.title}
                  </h3>
                  <p style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    lineHeight: 1.6,
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    color: '#ffffff'
                  }}>
                    {accommodation.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Added CTA Buttons */}
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
                backgroundColor: 'var(--neutral-color)',
                color: 'var(--primary-color)',
                padding: isMobile ? '14px 20px' : '15px 30px',
                borderRadius: '30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: isMobile ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto'
              }}>
                Book Now
              </Link>
              <Link to="/contact" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                padding: isMobile ? '14px 20px' : '15px 30px',
                borderRadius: '30px',
                fontSize: isMobile ? '1.1rem' : '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                border: '2px solid var(--neutral-color)',
                boxShadow: isMobile ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto'
              }}>
                Request Info
              </Link>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section style={{ 
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)',
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
                fontSize: isMobile ? '2.2rem' : '2.8rem', 
                marginBottom: '20px',
                color: 'var(--primary-color)'
              }}>
                Stay Updated on Tour Dates
              </h2>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem', 
                lineHeight: 1.6,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                color: 'var(--text-color)'
              }}>
                Be the first to know about new tour dates, special offers, and pickleball adventures in Costa Rica.
              </p>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  border: 'none',
                  padding: isMobile ? '12px 25px' : '15px 30px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                Subscribe to Newsletter
              </button>
            </motion.div>
          </div>
        </section>

        <section className="faq-section" style={{ 
          padding: isMobile ? '60px 15px 30px' : '80px 20px 40px',
          backgroundColor: 'var(--neutral-color)',
          borderTop: '1px solid #eee'
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
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: isMobile ? '20px' : '30px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                {
                  question: "What skill level is required for the tours?",
                  answer: "Our tours accommodate all skill levels from beginners to advanced players. We'll group players appropriately during coaching and competitive sessions."
                },
                {
                  question: "Is equipment provided or should I bring my own?",
                  answer: "We provide high-quality paddles and balls, but you're welcome to bring your own equipment if preferred."
                },
                {
                  question: "What should I pack for the tour?",
                  answer: "Athletic clothing, court shoes, sunscreen, hat, swimwear, and casual attire for non-pickleball activities. A detailed packing list will be provided upon booking."
                },
                {
                  question: "Are the tours suitable for solo travelers?",
                  answer: "Absolutely! Many of our participants are solo travelers. Our tours create a friendly, community atmosphere where you'll quickly connect with fellow pickleball enthusiasts."
                },
                {
                  question: "What type of accommodations are provided?",
                  answer: "We offer a range of accommodations to suit your preferences and budget - from hotels to apartments to houses, beachfront to mountain views. We can tailor the experience to your needs and budget, just let us know your preferences when booking."
                },
                {
                  question: "Can I customize my tour dates?",
                  answer: "Yes! Our tours are fully customizable. We don't have preset dates - you can schedule your tour whenever works best for you. Just let us know your preferred dates when inquiring."
                },
                {
                  question: "Are meals included in the tour packages?",
                  answer: "Most tour packages include breakfast daily and select group meals. We'll also recommend and arrange reservations at the best local restaurants for you to experience authentic Costa Rican cuisine."
                },
                {
                  question: "What happens if it rains during scheduled pickleball sessions?",
                  answer: "Costa Rica's weather can be unpredictable, but we have contingency plans. Many of our courts have covered options, or we can reschedule sessions around the weather. We'll make sure you get your full pickleball experience regardless of weather conditions."
                }
              ].map((faq, index) => (
                <FaqItem key={index} faq={faq} index={index} />
              ))}
            </div>
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

// New component for expandable FAQ items
function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
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
        borderRadius: isMobile ? '16px' : '12px',
        padding: isMobile ? '20px' : '25px',
        boxShadow: isMobile ? '0 8px 15px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
          fontSize: isMobile ? '1.2rem' : '1.3rem', 
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

export default ToursPage; 