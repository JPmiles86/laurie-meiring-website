import React from 'react';
import PageTransition from '../components/PageTransition';

function ContactPage() {
  return (
    <PageTransition>
      <div className="contact-page">
        <section className="page-hero" style={{ 
          padding: '60px 0', 
          textAlign: 'center',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)'
        }}>
          <h1 style={{ color: 'var(--neutral-color)' }}>Contact Laurie</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '20px auto' }}>
            Get in touch for pickleball coaching, chef services, or marketing inquiries in Jaco, Costa Rica
          </p>
        </section>

        <section className="contact-form-section" style={{ 
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          <div className="contact-info" style={{ 
            backgroundColor: 'var(--neutral-color)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Get In Touch</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Contact Information</h3>
              <p style={{ marginBottom: '10px' }}>
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
              <p style={{ marginBottom: '10px' }}>
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
              <p>Jaco, Costa Rica</p>
            </div>

            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Best Way to Reach</h3>
              <p>WhatsApp is the preferred method of communication for quick responses and easy scheduling.</p>
            </div>
          </div>

          <div className="contact-form" style={{ 
            backgroundColor: 'var(--neutral-color)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Send a Message</h2>
            <form>
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
                ></textarea>
              </div>
              <button 
                type="submit" 
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default ContactPage;