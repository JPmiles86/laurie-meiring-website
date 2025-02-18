import React, { useState } from 'react';
import PageTransition from '../components/PageTransition';

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <h1 style={{ color: 'var(--neutral-color)' }}>Book Your Service</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '20px auto' }}>
              Ready to start your journey? Select your desired service and let's begin.
            </p>
          </div>
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
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Service Options</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Available Services</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '15px' }}>
                  <strong>Pickleball Training:</strong> Individual & group sessions
                </li>
                <li style={{ marginBottom: '15px' }}>
                  <strong>Private Chef:</strong> Events & personal dining
                </li>
                <li style={{ marginBottom: '15px' }}>
                  <strong>Marketing Strategy:</strong> AI-powered solutions
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Contact Methods</h3>
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

            <div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Location</h3>
              <p>Jaco, Costa Rica</p>
            </div>
          </div>

          <div className="contact-form" style={{ 
            backgroundColor: 'var(--neutral-color)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '30px' }}>Request Information</h2>
            
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#e6f4ea',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h3 style={{ color: '#1e8e3e', marginBottom: '10px' }}>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--neutral-color)',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    border: 'none',
                    marginTop: '15px',
                    cursor: 'pointer'
                  }}
                >
                  Send Another Message
                </button>
              </div>
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
                    <option value="pickleball">Pickleball Training</option>
                    <option value="chef">Private Chef Services</option>
                    <option value="marketing">Marketing Strategy</option>
                    <option value="other">Other Inquiry</option>
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

                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{
                    backgroundColor: submitting ? '#ccc' : 'var(--primary-color)',
                    color: 'var(--neutral-color)',
                    padding: '12px 24px',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="contact-cta" style={{
          backgroundColor: 'var(--primary-color)',
          color: 'var(--neutral-color)',
          textAlign: 'center',
          padding: '80px 0',
          marginTop: '40px',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginBottom: '-80px'
        }}>
          {/* Existing content remains unchanged */}
        </section>
      </div>
    </PageTransition>
  );
}

export default ContactPage;