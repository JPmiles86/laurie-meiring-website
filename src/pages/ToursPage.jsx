import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import VideoBackground from '../components/VideoBackground';
import { IMAGES } from '../constants/images';

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
      price: "From $1,299",
      description: "Our signature tour combines intensive pickleball training with the best of Costa Rican adventures.",
      features: [
        "4 Professional coaching sessions",
        "2 Local tournament experiences",
        "Jungle and beach locations",
        "Waterfall excursion",
        "All transportation included",
        "Premium accommodation"
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
      name: "Jaco Beach",
      description: "Our home base with beautiful beach courts and perfect weather year-round.",
      image: "/jaco.jpg"
    },
    {
      name: "Jungle Courts of Ojochal",
      description: "Play surrounded by lush rainforest with the sounds of nature as your backdrop.",
      image: "/toucan 2x3.jpg"
    },
    {
      name: "San José City Club",
      description: "Experience Costa Rica's premier indoor pickleball facility in the capital city.",
      image: "/local courts.jpg"
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
      image: "/local courts.jpg"
    },
    {
      title: "Paradise Experience",
      description: "Enjoy premium accommodations, local cuisine, and guided adventures between pickleball sessions. Explore beaches, rainforests, and wildlife in this tropical paradise.",
      image: "/beach (portrait 4x5).jpg"
    }
  ];

  return (
    <PageTransition>
      <div className="tours-page">
        <VideoBackground
          videoId="wORVp9Pg5DY"
          startTime={5}
          endTime={35}
          height="100vh"
          overlayColor="rgba(0, 0, 0, 0.5)"
          type="hero"
        >
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: '3.5rem',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              Pickleball Tours in Paradise
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: '1.2rem', 
                maxWidth: '800px', 
                margin: '20px auto',
                color: 'var(--neutral-color)',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
              }}
            >
              Experience the ultimate pickleball adventure in Costa Rica's most beautiful locations
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" className="button" style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--neutral-color)',
                padding: '15px 30px',
                borderRadius: '30px',
                fontSize: '1.2rem',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}>
                Book Your Tour
              </Link>
            </motion.div>
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
                marginBottom: '60px',
                color: 'var(--primary-color)',
                fontSize: '2.8rem'
              }}
            >
              Tour Packages
            </motion.h2>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              marginBottom: '40px'
            }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                width: '100%',
                maxWidth: '1200px'
              }}>
                {tourPackages.map((pkg, index) => (
                  <div key={index} style={{ 
                    position: 'relative',
                    height: '100%'
                  }}>
                    <motion.div
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
                        border: pkg.featured ? '2px solid var(--secondary-color)' : 'none',
                        transform: pkg.featured ? 'scale(1.05)' : 'none',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{
                        height: '200px',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '15px'
                        }}>
                          <h3 style={{
                            fontSize: '1.8rem',
                            color: 'var(--primary-color)',
                            margin: 0
                          }}>
                            {pkg.title}
                          </h3>
                          <div style={{
                            backgroundColor: 'var(--secondary-color)',
                            color: 'var(--text-color)',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}>
                            {pkg.duration}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: 'var(--text-color)',
                          marginBottom: '15px'
                        }}>
                          {pkg.price}
                        </div>
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--text-color)',
                          marginBottom: '20px',
                          lineHeight: 1.6
                        }}>
                          {pkg.description}
                        </p>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: '0 0 25px 0'
                        }}>
                          {pkg.features.map((feature, idx) => (
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
                            backgroundColor: 'var(--primary-color)',
                            color: 'var(--neutral-color)',
                            padding: '12px',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}>
                            Book This Tour
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{
          padding: '80px 20px',
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
                marginBottom: '40px',
                fontSize: '2.8rem',
                color: 'var(--neutral-color)'
              }}
            >
              What's Included
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              textAlign: 'center',
              padding: '0 10px'
            }}>
              {includedFeatures.map((feature, index) => (
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
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    border: '4px solid var(--neutral-color)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}>
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#ffffff' }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.6,
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    color: '#ffffff'
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                marginBottom: '60px',
                color: 'var(--primary-color)',
                fontSize: '2.8rem'
              }}
            >
              Tour Locations
            </motion.h2>
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: index % 2 === 0 ? '1fr 1.5fr' : '1.5fr 1fr',
                  gap: '40px',
                  marginBottom: index === locations.length - 1 ? 0 : '60px',
                  alignItems: 'center'
                }}
              >
                <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                  <h3 style={{ 
                    fontSize: '2rem', 
                    marginBottom: '15px',
                    color: 'var(--primary-color)'
                  }}>
                    {location.name}
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}>
                    {location.description}
                  </p>
                </div>
                <motion.div 
                  style={{ 
                    order: index % 2 === 0 ? 2 : 1,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height: '300px'
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
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
                color: 'var(--neutral-color)'
              }}>
                Ready for Your Pickleball Adventure?
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: 1.6,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                color: 'var(--neutral-color)'
              }}>
                Book your tour today and experience the perfect combination of pickleball improvement and Costa Rican paradise.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
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
                  Book Now
                </Link>
                <Link to="/contact" className="button" style={{
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
                  Request Info
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

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
                marginBottom: '20px',
                color: 'var(--primary-color)',
                fontSize: '2.8rem'
              }}
            >
              Accommodations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                textAlign: 'center',
                fontSize: '1.2rem',
                maxWidth: '800px',
                margin: '0 auto 40px',
                lineHeight: 1.6
              }}
            >
              We offer a variety of accommodation options to suit your preferences and budget. From luxury beachfront properties to cozy mountain retreats, we'll find the perfect place for your stay.
            </motion.p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              margin: '0 auto'
            }}>
              {[
                {
                  title: "Beachfront Properties",
                  description: "Wake up to the sound of waves and enjoy stunning ocean views. Our beachfront options range from luxury condos to charming bungalows, all within walking distance to the shore.",
                  image: "/beach surf 3x2.jpg"
                },
                {
                  title: "Jungle Retreats",
                  description: "Immerse yourself in Costa Rica's lush rainforest with accommodations surrounded by nature. Experience the unique sounds and sights of the jungle while enjoying modern comforts.",
                  image: "/toucan 2x3.jpg"
                },
                {
                  title: "City Convenience",
                  description: "Stay in the heart of town with easy access to restaurants, shops, and nightlife. Perfect for those who want to experience both pickleball and the local culture.",
                  image: "/jaco.jpg"
                }
              ].map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={option.image}
                      alt={option.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: '25px', flexGrow: 1 }}>
                    <h3 style={{
                      fontSize: '1.6rem',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }}>
                      {option.title}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'var(--text-color)'
                    }}>
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                backgroundColor: 'rgba(0, 173, 181, 0.1)',
                borderRadius: '12px',
                padding: '30px',
                marginTop: '40px',
                maxWidth: '800px',
                margin: '40px auto 0',
                border: '1px solid rgba(0, 173, 181, 0.3)'
              }}
            >
              <h3 style={{
                fontSize: '1.6rem',
                color: 'var(--primary-color)',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                Customized to Your Needs
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                textAlign: 'center'
              }}>
                We understand that every traveler has unique preferences. That's why we offer fully customizable accommodation options. Whether you prefer a luxury hotel, a private villa, or a budget-friendly apartment, we can tailor your stay to match your needs and budget. Just let us know your preferences when booking, and we'll take care of the rest.
              </p>
            </motion.div>
          </div>
        </section>

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
              Frequently Asked Questions
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '30px',
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
      </div>
    </PageTransition>
  );
}

// New component for expandable FAQ items
function FaqItem({ faq, index }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '25px',
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
          fontSize: '1.3rem', 
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
            fontSize: '1.1rem', 
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