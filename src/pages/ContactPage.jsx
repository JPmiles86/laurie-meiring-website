import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import OptimizedImage from '../components/OptimizedImage';
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

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const contactOptions = [
    {
      title: "Pickleball Training",
      description: "Book private or group lessons to improve your game",
      image: "/laurie medals 1.jpg"
    },
    {
      title: "Pickleball Tours",
      description: "Join our guided pickleball adventures in Costa Rica",
      image: "/beach surf 3x2.jpg"
    },
    {
      title: "General Inquiries",
      description: "Questions about services, availability, or custom requests",
      image: "/toucan 2x3.jpg"
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
        "Message": e.target.message.value
      };

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
          padding: '90px 0', 
          textAlign: 'center',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '20px'
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
                fontSize: '3.5rem',
                marginBottom: '20px'
              }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              style={{ 
                fontSize: '1.2rem', 
                maxWidth: '800px', 
                margin: '20px auto',
                color: 'var(--neutral-color)'
              }}
            >
              Ready to start your pickleball journey in Costa Rica? We're here to help!
            </motion.p>
          </motion.div>
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
              How Can We Help You?
            </motion.h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              textAlign: 'center',
              padding: '0 10px',
              marginBottom: '60px'
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
                    width: '150px', 
                    height: '150px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    margin: '0 auto 20px',
                    border: '4px solid var(--secondary-color)',
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
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--primary-color)' }}>
                    {option.title}
                  </h3>
                  <p style={{ 
                    fontSize: '1.1rem', 
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px'
            }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="contact-info" 
                style={{ 
                  backgroundColor: '#fff',
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Contact Information</h2>
                
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Direct Contact</h3>
                  <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>✉</span>
                    <strong>Email:</strong>{' '}
                    <a 
                      href="mailto:Laurie.meiring@gmail.com"
                      style={{ 
                        color: 'var(--accent-color)',
                        textDecoration: 'none'
                      }}
                    >
                      Laurie.meiring@gmail.com
                    </a>
                  </p>
                  <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>📱</span>
                    <strong>WhatsApp:</strong>{' '}
                    <a 
                      href="https://wa.me/50662002747"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: 'var(--accent-color)',
                        textDecoration: 'none'
                      }}
                    >
                      +506 6200 2747
                    </a>
                  </p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Location</h3>
                  <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>📍</span>
                    <span>Jaco, Costa Rica</span>
                  </p>
                  <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
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

                <div>
                  <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Available Services</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>✓</span>
                      <strong>Pickleball Training:</strong> Individual & group sessions
                    </li>
                    <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>✓</span>
                      <strong>Pickleball Tours:</strong> Guided adventures in Costa Rica
                    </li>
                    <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>✓</span>
                      <strong>Custom Experiences:</strong> Tailored to your needs
                    </li>
                  </ul>
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
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  height: 'fit-content'
                }}
              >
                <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Send a Message</h2>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      textAlign: 'center',
                      padding: '30px',
                      backgroundColor: '#e6f4ea',
                      borderRadius: '12px',
                      marginBottom: '20px'
                    }}
                  >
                    <h3 style={{ color: '#1e8e3e', marginBottom: '15px', fontSize: '1.8rem' }}>Thank You!</h3>
                    <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Your message has been sent successfully. We'll get back to you soon.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'var(--neutral-color)',
                        padding: '12px 25px',
                        borderRadius: '25px',
                        border: 'none',
                        marginTop: '15px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '500'
                      }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                      <label 
                        htmlFor="service" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-color)',
                          fontWeight: '500'
                        }}
                      >
                        Service Type:
                      </label>
                      <select 
                        id="service" 
                        name="service" 
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '2px solid var(--secondary-color)',
                          fontSize: '1rem',
                          backgroundColor: 'white'
                        }}
                        required
                      >
                        <option value="">Select a Service</option>
                        <option value="pickleball training">Pickleball Training</option>
                        <option value="pickleball tours">Pickleball Tours</option>
                        <option value="custom experience">Custom Experience</option>
                        <option value="general inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label 
                        htmlFor="name" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-color)',
                          fontWeight: '500'
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
                          padding: '12px',
                          borderRadius: '8px',
                          border: '2px solid var(--secondary-color)',
                          fontSize: '1rem'
                        }} 
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label 
                        htmlFor="email" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-color)',
                          fontWeight: '500'
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
                          padding: '12px',
                          borderRadius: '8px',
                          border: '2px solid var(--secondary-color)',
                          fontSize: '1rem'
                        }} 
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label 
                        htmlFor="message" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-color)',
                          fontWeight: '500'
                        }}
                      >
                        Message:
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="5" 
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          border: '2px solid var(--secondary-color)',
                          fontSize: '1rem',
                          resize: 'vertical'
                        }}
                        placeholder="Please provide details about your inquiry, including preferred dates/times if applicable."
                        required
                      ></textarea>
                    </div>

                    <motion.button 
                      type="submit" 
                      disabled={submitting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        backgroundColor: submitting ? '#ccc' : 'var(--primary-color)',
                        color: 'var(--neutral-color)',
                        padding: '15px 30px',
                        borderRadius: '30px',
                        border: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '500',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                )}
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
                Ready for Your Pickleball Adventure?
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: 1.6,
                marginBottom: '30px',
                maxWidth: '600px',
                margin: '0 auto 30px'
              }}>
                Whether you're looking for training, tours, or a custom experience, we're here to make your pickleball dreams come true in Costa Rica.
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/tours" className="button" style={{
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
                  Explore Tours
                </Link>
                <Link to="/training" className="button" style={{
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
                  View Training Options
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default ContactPage;