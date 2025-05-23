import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
import { IMAGES } from '../constants/images';
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

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contactOptions = [
    {
      title: "Pickleball Training",
      description: "Book private or group lessons to improve your game",
      image: "/ contact/LaurieCoachHero1.jpg"
    },
    {
      title: "Pickleball Tours",
      description: "Join our guided pickleball adventures in Costa Rica",
      image: "/ contact/PickleballTours2.jpg"
    },
    {
      title: "General Inquiries",
      description: "Questions about services, availability, or custom requests",
      image: "/ contact/PickleballGeneric4.jpg"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Metadata fields (prefixed with _) for Formspree configuration
      const metadata = {
        _subject: `New ${e.target.service.value} inquiry from ${e.target.name.value}`,
        _replyto: e.target.email.value,
        _template: "table",
        _autoresponse: `Dear ${e.target.name.value},

Thank you for your interest in our ${e.target.service.value} services. I have received your inquiry and will get back to you shortly.

Here's a summary of your request:
- Service: ${e.target.service.value}
- Message: ${e.target.message.value}
${e.target.newsletter.checked ? '- Newsletter: You have opted to receive our newsletter. Welcome to the community!' : ''}

Best regards,
Laurie Meiring
Jaco, Costa Rica
WhatsApp: +506 6200 2747`
      };

      // Actual form data that will appear in the email
      const formFields = {
        "Service Type": e.target.service.value,
        "Name": e.target.name.value,
        "Email": e.target.email.value,
        "Message": e.target.message.value,
        "Newsletter Subscription": e.target.newsletter.checked ? "Yes" : "No"
      };

      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/mrbergeo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formFields,
          ...metadata
        }),
      });
      
      if (response.ok) {
        // If user opted for newsletter and form submission was successful
        if (e.target.newsletter.checked) {
          // Here you would typically integrate with your newsletter service (e.g., Beehiiv)
          // For now, we'll just include it in the form submission
          console.log('User opted in for newsletter:', e.target.email.value);
        }
        
        setSubmitted(true);
        e.target.reset();
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="contact-page">
        <section className="page-hero" style={{ 
          padding: isMobile ? '80px 0 40px' : '100px 0 50px', 
          textAlign: 'center',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '0'
        }}>
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}
          >
            <motion.h1 
              variants={fadeInUp}
              style={{ 
                color: 'var(--neutral-color)',
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                marginBottom: isMobile ? '15px' : '20px',
                lineHeight: 1.2
              }}
            >
              Let's Connect!
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: isMobile ? '1rem' : '1.2rem', 
                maxWidth: '800px', 
                margin: isMobile ? '15px auto' : '20px auto',
                color: 'var(--neutral-color)',
                padding: isMobile ? '0 15px' : 0
              }}
            >
              Whether you're ready to dive into pickleball in Costa Rica or just have a question, I'd love to hear from you!
            </motion.p>
          </motion.div>
        </section>

        <section style={{ 
          padding: isMobile ? '50px 15px' : '80px 20px',
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
                marginBottom: isMobile ? '40px' : '60px',
                color: 'var(--primary-color)',
                fontSize: isMobile ? '2.2rem' : '2.8rem'
              }}
            >
              How Can We Help You?
            </motion.h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '30px' : '40px',
              textAlign: 'center',
              padding: '0 10px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              {contactOptions.map((option, index) => (
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
                    border: isMobile ? '3px solid var(--primary-color)' : '4px solid var(--primary-color)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}>
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
                  <h3 style={{ 
                    fontSize: isMobile ? '1.6rem' : '1.8rem', 
                    marginBottom: isMobile ? '10px' : '15px', 
                    color: 'var(--primary-color)' 
                  }}>
                    {option.title}
                  </h3>
                  <p style={{ 
                    fontSize: isMobile ? '1rem' : '1.1rem', 
                    lineHeight: 1.6,
                    maxWidth: '100%',
                    wordWrap: 'break-word'
                  }}>
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '30px' : '40px',
              alignItems: 'stretch',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="contact-info" 
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  backgroundColor: 'var(--secondary-color)', 
                  padding: isMobile ? '30px 20px' : '40px', 
                  color: 'white',
                  textAlign: 'center', 
                  marginTop: isMobile ? '-40px' : '-60px'
                }}>
                  <h2 style={{ 
                    color: 'white', 
                    margin: 0,
                    fontSize: isMobile ? '1.8rem' : '2rem'
                  }}>Contact Information</h2>
                </div>
                
                <div style={{ 
                  padding: isMobile ? '30px 20px' : '40px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}>
                  <div style={{ marginBottom: isMobile ? '25px' : '30px' }}>
                    <h3 style={{ 
                      color: 'var(--secondary-color)', 
                      marginBottom: isMobile ? '12px' : '15px',
                      fontSize: isMobile ? '1.4rem' : '1.5rem'
                    }}>Direct Contact</h3>
                    <p style={{ 
                      marginBottom: '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      fontSize: isMobile ? '0.95rem' : '1rem',
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>📧</span>
                      <strong>Email:</strong>{' '}
                      <a 
                        href="mailto:laurie@pbguidecr.com"
                        style={{ 
                          color: 'var(--primary-color)',
                          textDecoration: 'none',
                          wordBreak: 'break-word'
                        }}
                      >
                        laurie@pbguidecr.com
                      </a>
                    </p>
                    <p style={{ 
                      marginBottom: '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      fontSize: isMobile ? '0.95rem' : '1rem'
                    }}>
                      <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>💬</span>
                      <strong>WhatsApp:</strong>{' '}
                      <a 
                        href="https://wa.me/50662002747"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: 'var(--primary-color)',
                          textDecoration: 'none'
                        }}
                      >
                        +506 6200 2747
                      </a>
                    </p>
                  </div>

                  <div style={{ marginBottom: isMobile ? '25px' : '30px' }}>
                    <h3 style={{ 
                      color: 'var(--secondary-color)', 
                      marginBottom: isMobile ? '12px' : '15px',
                      fontSize: isMobile ? '1.4rem' : '1.5rem'
                    }}>Location</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '20px'
                    }}>
                      {/* Jaco Location */}
                      <div>
                        <p style={{ 
                          marginBottom: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          fontSize: isMobile ? '0.95rem' : '1rem'
                        }}>
                          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>📍</span>
                          <span>Jaco, Costa Rica</span>
                        </p>
                        <div style={{ 
                          marginTop: '10px', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          height: isMobile ? '160px' : '200px' 
                        }}>
                          <img 
                            src="/jaco.jpg" 
                            alt="Jaco, Costa Rica"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      </div>

                      {/* Ojochal Location */}
                      <div>
                        <p style={{ 
                          marginBottom: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          fontSize: isMobile ? '0.95rem' : '1rem'
                        }}>
                          <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>📍</span>
                          <span>Ojochal, Costa Rica</span>
                        </p>
                        <div style={{ 
                          marginTop: '10px', 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          height: isMobile ? '160px' : '200px' 
                        }}>
                          <img 
                            src="/ contact/OjochalWaterfall2.jpg" 
                            alt="Ojochal, Costa Rica"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ 
                      color: 'var(--secondary-color)', 
                      marginBottom: isMobile ? '12px' : '15px',
                      fontSize: isMobile ? '1.4rem' : '1.5rem'
                    }}>Available Services</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 0 }}>
                      <li style={{ 
                        marginBottom: '15px', 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px',
                        fontSize: isMobile ? '0.95rem' : '1rem'
                      }}>
                        <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
                        <strong>Pickleball Training:</strong> Individual & group sessions
                      </li>
                      <li style={{ 
                        marginBottom: '15px', 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px',
                        fontSize: isMobile ? '0.95rem' : '1rem'
                      }}>
                        <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
                        <strong>Pickleball Tours:</strong> Guided adventures in Costa Rica
                      </li>
                      <li style={{ 
                        marginBottom: '0', 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '10px',
                        fontSize: isMobile ? '0.95rem' : '1rem'
                      }}>
                        <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>✓</span>
                        <strong>Custom Experiences:</strong> Tailored to your needs
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="contact-form" 
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column', 
                  marginTop: isMobile ? '20px' : '40px'
                }}
              >
                <div style={{ 
                  backgroundColor: 'var(--secondary-color)', 
                  padding: isMobile ? '25px 20px' : '35px', 
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h2 style={{ 
                    color: 'white', 
                    margin: 0,
                    fontSize: isMobile ? '1.8rem' : '2rem'
                  }}>Send a Message</h2>
                </div>
                
                <div style={{ 
                  padding: isMobile ? '30px 25px' : '40px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  width: '100%'
                }}>
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        textAlign: 'center',
                        padding: isMobile ? '25px 15px' : '30px',
                        backgroundColor: '#e6f4ea',
                        borderRadius: '12px',
                        marginBottom: '20px'
                      }}
                    >
                      <h3 style={{ 
                        color: '#1e8e3e', 
                        marginBottom: isMobile ? '12px' : '15px', 
                        fontSize: isMobile ? '1.6rem' : '1.8rem' 
                      }}>Thank You!</h3>
                      <p style={{ 
                        fontSize: isMobile ? '1rem' : '1.1rem', 
                        marginBottom: isMobile ? '15px' : '20px' 
                      }}>Your message has been sent successfully. We'll get back to you soon.</p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        style={{
                          backgroundColor: 'var(--primary-color)',
                          color: 'var(--neutral-color)',
                          padding: isMobile ? '10px 20px' : '12px 25px',
                          borderRadius: '25px',
                          border: 'none',
                          marginTop: isMobile ? '10px' : '15px',
                          cursor: 'pointer',
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          fontWeight: '500'
                        }}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ width: '100%', boxSizing: 'border-box' }}>
                      <div style={{ marginBottom: isMobile ? '15px' : '20px', width: '100%', boxSizing: 'border-box' }}>
                        <label 
                          htmlFor="service" 
                          style={{ 
                            display: 'block', 
                            marginBottom: isMobile ? '6px' : '8px',
                            color: 'var(--text-color)',
                            fontWeight: '500',
                            fontSize: isMobile ? '0.95rem' : '1rem'
                          }}
                        >
                          Service Type:
                        </label>
                        <select 
                          id="service" 
                          name="service" 
                          style={{ 
                            width: '100%',
                            padding: isMobile ? '10px' : '12px',
                            borderRadius: '8px',
                            border: '2px solid var(--primary-color)',
                            fontSize: isMobile ? '0.95rem' : '1rem',
                            backgroundColor: 'white',
                            boxSizing: 'border-box'
                          }}
                          required
                        >
                          <option value="">Select a Service</option>
                          <option value="pickleball training">Pickleball Training</option>
                          <option value="pickleball tours">Pickleball Tours</option>
                          <option value="custom experience">Custom Experience</option>
                          <option value="general inquiry">General Inquiry</option>
                          <option value="feature my club">Feature My Club</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: isMobile ? '15px' : '20px', width: '100%', boxSizing: 'border-box' }}>
                        <label 
                          htmlFor="name" 
                          style={{ 
                            display: 'block', 
                            marginBottom: isMobile ? '6px' : '8px',
                            color: 'var(--text-color)',
                            fontWeight: '500',
                            fontSize: isMobile ? '0.95rem' : '1rem'
                          }}
                        >
                          Name:
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          style={{ 
                            width: '100%',
                            padding: isMobile ? '10px' : '12px',
                            borderRadius: '8px',
                            border: '2px solid var(--primary-color)',
                            fontSize: isMobile ? '0.95rem' : '1rem',
                            boxSizing: 'border-box'
                          }} 
                          required
                        />
                      </div>

                      <div style={{ marginBottom: isMobile ? '15px' : '20px', width: '100%', boxSizing: 'border-box' }}>
                        <label 
                          htmlFor="email" 
                          style={{ 
                            display: 'block', 
                            marginBottom: isMobile ? '6px' : '8px',
                            color: 'var(--text-color)',
                            fontWeight: '500',
                            fontSize: isMobile ? '0.95rem' : '1rem'
                          }}
                        >
                          Email:
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          style={{ 
                            width: '100%',
                            padding: isMobile ? '10px' : '12px',
                            borderRadius: '8px',
                            border: '2px solid var(--primary-color)',
                            fontSize: isMobile ? '0.95rem' : '1rem',
                            boxSizing: 'border-box'
                          }} 
                          required
                        />
                      </div>

                      <div style={{ marginBottom: isMobile ? '15px' : '20px', width: '100%', boxSizing: 'border-box' }}>
                        <label 
                          htmlFor="message" 
                          style={{ 
                            display: 'block', 
                            marginBottom: isMobile ? '6px' : '8px',
                            color: 'var(--text-color)',
                            fontWeight: '500',
                            fontSize: isMobile ? '0.95rem' : '1rem'
                          }}
                        >
                          Message:
                        </label>
                        <textarea 
                          id="message" 
                          name="message" 
                          rows="6" 
                          style={{ 
                            width: '100%',
                            padding: isMobile ? '10px' : '12px',
                            borderRadius: '8px',
                            border: '2px solid var(--primary-color)',
                            fontSize: isMobile ? '0.95rem' : '1rem',
                            resize: 'vertical',
                            minHeight: isMobile ? '100px' : '120px',
                            boxSizing: 'border-box'
                          }}
                          placeholder="Please provide details about your inquiry, including preferred dates/times if applicable."
                          required
                        ></textarea>
                      </div>

                      <div style={{ 
                        marginBottom: isMobile ? '20px' : '25px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        <input 
                          type="checkbox" 
                          id="newsletter" 
                          name="newsletter"
                          style={{
                            marginTop: '4px',
                            width: '16px',
                            height: '16px',
                            accentColor: 'var(--primary-color)'
                          }}
                        />
                        <label 
                          htmlFor="newsletter" 
                          style={{ 
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            lineHeight: 1.4,
                            color: 'var(--text-color)',
                            opacity: 0.9
                          }}
                        >
                          Yes, I'd like to receive the newsletter with pickleball tips, updates, and Costa Rica adventures.
                        </label>
                      </div>

                      <motion.button 
                        type="submit" 
                        disabled={submitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          backgroundColor: submitting ? '#ccc' : 'var(--primary-color)',
                          color: 'var(--neutral-color)',
                          padding: isMobile ? '12px 25px' : '15px 30px',
                          borderRadius: '30px',
                          border: 'none',
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          fontWeight: '500',
                          cursor: submitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          boxSizing: 'border-box',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--neutral-color)',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
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
                Join Our Newsletter
              </h2>
              <p style={{ 
                fontSize: isMobile ? '1.1rem' : '1.2rem', 
                lineHeight: 1.6,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px',
                color: 'var(--text-color)'
              }}>
                Get exclusive updates, training tips, and Costa Rica pickleball news delivered straight to your inbox.
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

        <section style={{
          padding: isMobile ? '60px 15px' : '80px 20px',
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginBottom: '-80px'
        }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center',
            boxSizing: 'border-box',
            padding: isMobile ? '0 20px' : '0'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <h2 style={{ 
                fontSize: isMobile ? '2.2rem' : '2.8rem', 
                marginBottom: isMobile ? '15px' : '20px',
                color: 'var(--neutral-color)'
              }}>
                Ready for Your Pickleball Adventure?
              </h2>
              <p style={{ 
                fontSize: isMobile ? '1rem' : '1.2rem', 
                lineHeight: 1.6,
                marginBottom: isMobile ? '25px' : '30px',
                maxWidth: '600px',
                margin: isMobile ? '0 auto 25px' : '0 auto 30px',
                color: 'var(--neutral-color)',
                padding: isMobile ? '0 40px' : '0 20px',
                boxSizing: 'border-box'
              }}>
                Whether you're looking for training, tours, or a custom experience, we're here to make your pickleball dreams come true in Costa Rica.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: isMobile ? '15px' : '20px', 
                justifyContent: 'center', 
                marginBottom: '75px',
                flexWrap: 'wrap',
                width: '100%',
                boxSizing: 'border-box',
                padding: '0 10px'
              }}>
                <Link to="/tours" className="button" style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: isMobile ? '12px 25px' : '15px 30px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}>
                  Explore Tours
                </Link>
                <Link to="/training" className="button" style={{
                  backgroundColor: 'var(--neutral-color)',
                  color: 'var(--primary-color)',
                  padding: isMobile ? '12px 25px' : '15px 30px',
                  borderRadius: '30px',
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  View Training Options
                </Link>
              </div>
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

export default ContactPage;