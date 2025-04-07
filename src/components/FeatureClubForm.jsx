import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define common amenities for checkboxes/multi-select
const COMMON_AMENITIES = [
  "Covered Courts", "Restaurant/Bar", "Pro Shop", "Equipment Rental", 
  "Lessons Available", "Restrooms", "Locker Rooms", "Showers",
  "Water Fountain", "Parking", "WiFi", "Air Conditioning"
];

const FeatureClubForm = () => {
  // Use local state for submission status, similar to ContactPage
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Form field states
  const [clubName, setClubName] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [address, setAddress] = useState('');
  const [directions, setDirections] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [indoorCourts, setIndoorCourts] = useState(0);
  const [outdoorCourts, setOutdoorCourts] = useState(0);
  const [lighting, setLighting] = useState(false);
  const [surfaceType, setSurfaceType] = useState('');
  const [openPlay, setOpenPlay] = useState(false);
  const [schedule, setSchedule] = useState('');
  const [reservations, setReservations] = useState(false);
  const [fees, setFees] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [description, setDescription] = useState('');
  // Add state for other amenities
  const [otherAmenities, setOtherAmenities] = useState('');

  const handleAmenityChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAmenities(prev => [...prev, value]);
    } else {
      setSelectedAmenities(prev => prev.filter(amenity => amenity !== value));
    }
  };

  // Handle submission using fetch, like ContactPage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    // Updated endpoint for detailed club information
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/manelpwv"; // Club Information Form
    
    // Prepare form data for Formspree
    const formData = {
      clubName,
      city,
      province,
      address,
      directions,
      phone,
      email,
      website,
      instagram,
      indoorCourts,
      outdoorCourts,
      lighting: lighting ? 'Yes' : 'No',
      surfaceType,
      openPlay: openPlay ? 'Yes' : 'No',
      schedule,
      reservations: reservations ? 'Yes' : 'No',
      fees,
      selectedAmenities: selectedAmenities.join(', '), // Send as comma-separated string
      otherAmenities, // Include other amenities
      description,
      // Add metadata if needed (optional)
      _subject: `New Club Feature Submission: ${clubName}`,
      _replyto: email // Set reply-to to the submitter's email
    };
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Important for Formspree
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        // Optionally reset form fields here if needed
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
        style={{ padding: '40px', textAlign: 'center', backgroundColor: '#e8f5e9', borderRadius: '8px' }}
      >
        <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>Thanks for your submission!</h3>
        <p>We've received your club information and will review it shortly.</p>
      </motion.div>
    );
  }

  // Custom styles for form elements (similar to ContactPage)
  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '5px', // Reduced margin for validation message space
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '1rem',
    color: 'var(--text-color)'
  };

  const formGroupStyle = {
    marginBottom: '25px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1rem',
    fontWeight: 'normal',
    cursor: 'pointer'
  };

  const checkboxStyle = {
    marginRight: '8px',
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  };

  const amenitiesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px'
  };
  
  const validationErrorStyle = {
      color: 'red', 
      fontSize: '0.9rem', 
      marginTop: '5px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
      
      {/* Basic Info */}
      <div style={formGroupStyle}>
        <label htmlFor="clubName" style={labelStyle}>Club Name *</label>
        <input
          id="clubName"
          type="text"
          name="clubName"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      {/* Location Info */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Location</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={formGroupStyle}>
          <label htmlFor="city" style={labelStyle}>City *</label>
          <input id="city" type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} required style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="province" style={labelStyle}>Province *</label>
          <input id="province" type="text" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required style={inputStyle} />
        </div>
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="address" style={labelStyle}>Address</label>
        <input id="address" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="directions" style={labelStyle}>Directions / Finding Us</label>
        <textarea id="directions" name="directions" value={directions} onChange={(e) => setDirections(e.target.value)} style={textareaStyle}></textarea>
      </div>

      {/* Contact Info */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Contact Information</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={formGroupStyle}>
          <label htmlFor="phone" style={labelStyle}>Phone</label>
          <input id="phone" type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="website" style={labelStyle}>Website</label>
          <input id="website" type="text" name="website" placeholder="e.g., yourclub.com" value={website} onChange={(e) => setWebsite(e.target.value)} style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="instagram" style={labelStyle}>Instagram URL</label>
          <input id="instagram" type="text" name="instagram" placeholder="e.g., instagram.com/yourclub" value={instagram} onChange={(e) => setInstagram(e.target.value)} style={inputStyle} />
        </div>
      </div>

      {/* Court Details */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Court Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'center' }}>
        <div style={formGroupStyle}>
          <label htmlFor="indoorCourts" style={labelStyle}>Indoor Courts</label>
          <input id="indoorCourts" type="number" name="indoorCourts" min="0" value={indoorCourts} onChange={(e) => setIndoorCourts(parseInt(e.target.value) || 0)} style={inputStyle} />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="outdoorCourts" style={labelStyle}>Outdoor Courts</label>
          <input id="outdoorCourts" type="number" name="outdoorCourts" min="0" value={outdoorCourts} onChange={(e) => setOutdoorCourts(parseInt(e.target.value) || 0)} style={inputStyle} />
        </div>
         <div style={formGroupStyle}>
          <label style={labelStyle}>Lighting?</label>
          <label style={checkboxLabelStyle}> 
            <input type="checkbox" name="lighting" checked={lighting} onChange={(e) => setLighting(e.target.checked)} style={checkboxStyle} /> Yes
          </label>
        </div>
      </div>
       <div style={formGroupStyle}>
          <label htmlFor="surfaceType" style={labelStyle}>Surface Type</label>
          <input id="surfaceType" type="text" name="surfaceType" placeholder="e.g., Hardcourt, Concrete, Sport Court" value={surfaceType} onChange={(e) => setSurfaceType(e.target.value)} style={inputStyle} />
        </div>

      {/* Play Info */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Play Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', alignItems: 'center' }}>
         <div style={formGroupStyle}>
          <label style={labelStyle}>Open Play Offered?</label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" name="openPlay" checked={openPlay} onChange={(e) => setOpenPlay(e.target.checked)} style={checkboxStyle} /> Yes
          </label>
        </div>
         <div style={formGroupStyle}>
          <label style={labelStyle}>Reservations Required?</label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" name="reservations" checked={reservations} onChange={(e) => setReservations(e.target.checked)} style={checkboxStyle} /> Yes
          </label>
        </div>
      </div>
       <div style={formGroupStyle}>
        <label htmlFor="schedule" style={labelStyle}>Schedule / Hours</label>
        <textarea id="schedule" name="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="e.g., Daily 7am-9pm, Mon/Wed/Fri 5pm-8pm" style={textareaStyle}></textarea>
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="fees" style={labelStyle}>Court Fees / Pricing</label>
        <textarea id="fees" name="fees" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="e.g., $10 drop-in, $30/hr reservation, Membership options..." style={textareaStyle}></textarea>
      </div>

      {/* Amenities */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Amenities</h3>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Select Available Amenities:</label>
        <div style={amenitiesGridStyle}>
          {COMMON_AMENITIES.map(amenity => (
            <label key={amenity} style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={selectedAmenities.includes(amenity)}
                onChange={handleAmenityChange}
                style={checkboxStyle}
              />
              {amenity}
            </label>
          ))}
        </div>
        {/* Add Other Amenities input */}
        <div style={{marginTop: '15px'}}>
           <label htmlFor="otherAmenities" style={{...labelStyle, marginBottom: '8px'}}>Other Amenities (comma-separated):</label>
           <input
             id="otherAmenities"
             type="text"
             name="otherAmenities"
             value={otherAmenities}
             onChange={(e) => setOtherAmenities(e.target.value)}
             placeholder="e.g., Pool Access, Kids Play Area, Specific Drink Brands"
             style={inputStyle}
           />
        </div>
      </div>

      {/* Description */}
      <h3 style={{ marginTop: '30px', marginBottom: '20px', color: 'var(--primary-color)' }}>Club Description</h3>
      <div style={formGroupStyle}>
        <label htmlFor="description" style={labelStyle}>Tell us about your club *</label>
        <textarea 
          id="description" 
          name="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required 
          placeholder="Highlight what makes your club special (atmosphere, location, unique features, target audience, etc.)"
          style={textareaStyle}
        ></textarea>
      </div>

      {/* Submission Button */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <motion.button 
          type="submit" 
          disabled={submitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button"
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)',
            padding: '15px 40px',
            fontSize: '1.3rem',
            opacity: submitting ? 0.6 : 1
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Club for Feature'}
        </motion.button>
        {/* Display general form errors */}
        {error && (
          <p style={{...validationErrorStyle, marginTop: '15px'}}>{error}</p>
        )}
        {/* Instruction for emailing photos - UPDATED */}
        <p style={{ marginTop: '30px', fontSize: '1rem', color: 'var(--text-color)', fontStyle: 'italic' }}>
          After submitting this form, please email a minimum of 3 photos (more are welcome!) to Laurie at <a href="mailto:laurie@pbguidecr.com" style={{color: 'var(--primary-color)'}}>laurie@pbguidecr.com</a> to showcase your club.
        </p>
      </div>
    </form>
  );
};

export default FeatureClubForm; 