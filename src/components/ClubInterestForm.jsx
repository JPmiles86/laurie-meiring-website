import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClubInterestForm = () => {
  // State for form submission (similar to ContactPage)
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Form field states
  const [yourName, setYourName] = useState('');
  const [clubName, setClubName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Handle submission using fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgvapzpp"; // Club Interested Form
    
    const formData = {
      yourName,
      clubName,
      email,
      phone,
      location,
      _subject: `Club Feature Interest: ${clubName}`,
      _replyto: email
    };
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form fields
        setYourName('');
        setClubName('');
        setEmail('');
        setPhone('');
        setLocation('');
      } else {
        const responseData = await response.json();
        setError(responseData.errors ? responseData.errors.map(err => err.message).join(', ') : 'Submission failed. Please try again.');
      }
    } catch (fetchError) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '30px', textAlign: 'center', backgroundColor: '#e8f5e9', borderRadius: '8px', marginTop: '20px' }}
      >
        <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>Thank You!</h3>
        <p>We've received your interest form. Laurie will be in touch soon with more details on how to get your club featured!</p>
      </motion.div>
    );
  }

  // Input styles (can reuse from FeatureClubForm or define locally)
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '1rem',
    color: 'var(--text-color)'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };
  
  const validationErrorStyle = {
      color: 'red', 
      fontSize: '0.9rem', 
      marginTop: '5px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <div style={formGroupStyle}>
        <label htmlFor="yourName" style={labelStyle}>Your Name *</label>
        <input
          id="yourName"
          type="text"
          name="yourName"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      
      <div style={formGroupStyle}>
        <label htmlFor="clubNameInterest" style={labelStyle}>Club Name *</label>
        <input
          id="clubNameInterest"
          type="text"
          name="clubName"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="locationInterest" style={labelStyle}>Club Location (City/Town) *</label>
        <input
          id="locationInterest"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="emailInterest" style={labelStyle}>Email *</label>
        <input
          id="emailInterest"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="phoneInterest" style={labelStyle}>Phone</label>
        <input
          id="phoneInterest"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <motion.button 
          type="submit" 
          disabled={submitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button"
          style={{ opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? 'Sending...' : 'Send Inquiry'}
        </motion.button>
        {error && (
          <p style={{...validationErrorStyle, marginTop: '15px'}}>{error}</p>
        )}
      </div>
    </form>
  );
};

export default ClubInterestForm; 