import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clubs } from '../data/clubs'; // Import clubs data

const EventSubmissionForm = () => {
  // Filter featured clubs for the dropdown
  const featuredClubs = clubs.filter(club => club.listingType === 'featured');

  // Form state
  const [selectedClubId, setSelectedClubId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('tournament'); // Default type
  const [otherEventType, setOtherEventType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationPhone, setRegistrationPhone] = useState('');
  const [price, setPrice] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [format, setFormat] = useState('');
  const [prizes, setPrizes] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Reset form fields helper
  const resetForm = () => {
    setSelectedClubId('');
    setEventName('');
    setEventType('tournament');
    setOtherEventType('');
    setStartDate('');
    setEndDate('');
    setRegistrationDeadline('');
    setDescription('');
    setRegistrationUrl('');
    setRegistrationEmail('');
    setRegistrationPhone('');
    setPrice('');
    setMaxParticipants('');
    setFormat('');
    setPrizes('');
    setAdditionalInfo('');
  };

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblgpzoy"; // Event Submission Form
    
    const selectedClub = featuredClubs.find(club => club.id === selectedClubId);
    
    const formData = {
      hostingClubId: selectedClubId,
      hostingClubName: selectedClub ? selectedClub.name : 'Unknown Club',
      eventName,
      eventType: eventType === 'other' ? otherEventType : eventType,
      startDate,
      endDate,
      registrationDeadline,
      description,
      registrationUrl,
      registrationEmail,
      registrationPhone,
      price,
      maxParticipants,
      format,
      prizes,
      additionalInfo,
      _subject: `New Event Submission: ${eventName} at ${selectedClub ? selectedClub.name : 'Unknown'}`,
      // Optional: Set reply-to based on club contact or a dedicated event email field?
      // _replyto: registrationEmail || (selectedClub && selectedClub.contactInfo.email) || '',
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
        resetForm(); // Reset form on success
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
        <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>Event Submitted Successfully!</h3>
        <p>Thank you for submitting your event. We'll review it and add it to the calendar soon. Remember to email any event photos or flyers!</p>
        <button 
          onClick={() => setSubmitted(false)} 
          className="button"
          style={{
            marginTop: '20px', 
            backgroundColor: 'var(--secondary-color)',
            fontSize: '1rem',
            padding: '10px 20px'
          }}
        >
          Submit Another Event
        </button>
      </motion.div>
    );
  }

  // Styles (reuse or define locally)
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' };
  const textareaStyle = { ...inputStyle, minHeight: '300px', resize: 'vertical' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '1rem', color: 'var(--text-color)' };
  const formGroupStyle = { marginBottom: '20px' };
  const validationErrorStyle = { color: 'red', fontSize: '0.9rem', marginTop: '5px' };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>

      <div style={formGroupStyle}>
        <label htmlFor="clubSelect" style={labelStyle}>Select Your Club *</label>
        <select 
          id="clubSelect"
          value={selectedClubId}
          onChange={(e) => setSelectedClubId(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>-- Select Your Club --</option>
          {featuredClubs.map(club => (
            <option key={club.id} value={club.id}>{club.name} ({club.location.city})</option>
          ))}
        </select>
      </div>

      <div style={formGroupStyle}>
        <label htmlFor="eventName" style={labelStyle}>Event Name *</label>
        <input id="eventName" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={formGroupStyle}>
          <label htmlFor="eventType" style={labelStyle}>Event Type *</label>
          <select id="eventType" value={eventType} onChange={(e) => setEventType(e.target.value)} required style={inputStyle}>
            <option value="tournament">Tournament</option>
            <option value="league">League</option>
            <option value="clinic">Clinic</option>
            <option value="social">Social Play</option>
            <option value="other">Other</option>
          </select>
        </div>
        {eventType === 'other' && (
           <div style={formGroupStyle}>
            <label htmlFor="otherEventType" style={labelStyle}>Specify Event Type *</label>
            <input 
              id="otherEventType" 
              type="text" 
              value={otherEventType}
              onChange={(e) => setOtherEventType(e.target.value)}
              required 
              style={inputStyle} 
            />
          </div>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={formGroupStyle}>
            <label htmlFor="startDate" style={labelStyle}>Start Date *</label>
            <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="endDate" style={labelStyle}>End Date</label>
            <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
          </div>
      </div>
      
       <div style={formGroupStyle}>
          <label htmlFor="registrationDeadline" style={labelStyle}>Registration Deadline</label>
          <input id="registrationDeadline" type="date" value={registrationDeadline} onChange={(e) => setRegistrationDeadline(e.target.value)} style={inputStyle} />
        </div>

      <div style={formGroupStyle}>
        <label htmlFor="description" style={labelStyle}>Event Description *</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          style={textareaStyle}
          placeholder={`PICKLEBALL
TOURNAMENT

APRIL 12-13TH, 2025

2 - 2.5 Open
Mixed Intermediate
Mixed Advanced
Mens Intermediate
Mens Advanced
Womens Open

All games will be entered into DUPR`}
        ></textarea>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)', fontSize: '1.4rem' }}>Registration Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={formGroupStyle}>
          <label htmlFor="registrationUrl" style={labelStyle}>Registration URL</label>
          <input id="registrationUrl" type="text" placeholder="https://..." value={registrationUrl} onChange={(e) => setRegistrationUrl(e.target.value)} style={inputStyle} />
        </div>
         <div style={formGroupStyle}>
          <label htmlFor="registrationEmail" style={labelStyle}>Registration Email</label>
          <input id="registrationEmail" type="email" value={registrationEmail} onChange={(e) => setRegistrationEmail(e.target.value)} style={inputStyle} />
        </div>
         <div style={formGroupStyle}>
          <label htmlFor="registrationPhone" style={labelStyle}>Registration Phone</label>
          <input id="registrationPhone" type="tel" value={registrationPhone} onChange={(e) => setRegistrationPhone(e.target.value)} style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="price" style={labelStyle}>Price / Entry Fee</label>
          <input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., $30 per person, Free" style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="maxParticipants" style={labelStyle}>Max Participants (if any)</label>
          <input id="maxParticipants" type="number" min="1" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)', fontSize: '1.4rem' }}>Additional Event Details</h3>
       <div style={formGroupStyle}>
        <label htmlFor="format" style={labelStyle}>Format (e.g., Round Robin, Single Elimination)</label>
        <input id="format" type="text" value={format} onChange={(e) => setFormat(e.target.value)} style={inputStyle} />
      </div>
       <div style={formGroupStyle}>
        <label htmlFor="prizes" style={labelStyle}>Prizes (if any)</label>
        <input id="prizes" type="text" value={prizes} onChange={(e) => setPrizes(e.target.value)} style={inputStyle} />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="additionalInfo" style={labelStyle}>Other Information</label>
        <textarea id="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} style={textareaStyle}></textarea>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
         {/* Instruction for emailing photos */}
        <p style={{ marginBottom: '20px', fontSize: '1rem', color: 'var(--text-color)', fontStyle: 'italic' }}>
          After submitting, please email any event photos or flyers to Laurie at <a href="mailto:laurie@pbguidecr.com" style={{color: 'var(--primary-color)'}}>laurie@pbguidecr.com</a>.
        </p>
        <motion.button 
          type="submit" 
          disabled={submitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button"
          style={{ opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? 'Submitting Event...' : 'Submit Event'}
        </motion.button>
        {error && (
          <p style={{...validationErrorStyle, marginTop: '15px'}}>{error}</p>
        )}
      </div>
    </form>
  );
};

export default EventSubmissionForm; 