import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PartnerMatchingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skillLevel: '',
    yearsPlaying: '',
    preferredPosition: '',
    weekdayMornings: false,
    weekdayAfternoons: false,
    weekdayEvenings: false,
    weekendMornings: false,
    weekendAfternoons: false,
    weekendEvenings: false,
    preferredLocations: [],
    travelDistance: '',
    partnerSkillLevel: '',
    partnerAgeRange: '',
    partnerGender: '',
    partnerPlayStyle: '',
    message: ''
  });
  
  const [locationInput, setLocationInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleLocationKeyDown = (e) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      e.preventDefault();
      if (!formData.preferredLocations.includes(locationInput.trim())) {
        setFormData(prev => ({
          ...prev,
          preferredLocations: [...prev.preferredLocations, locationInput.trim()]
        }));
      }
      setLocationInput('');
    }
  };
  
  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
  };
  
  const addLocation = () => {
    if (locationInput.trim() && !formData.preferredLocations.includes(locationInput.trim())) {
      setFormData(prev => ({
        ...prev,
        preferredLocations: [...prev.preferredLocations, locationInput.trim()]
      }));
      setLocationInput('');
    }
  };
  
  const removeLocation = (location) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.filter(loc => loc !== location)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.skillLevel) newErrors.skillLevel = 'Skill level is required';
    if (!formData.yearsPlaying) newErrors.yearsPlaying = 'Years playing is required';
    if (formData.preferredLocations.length === 0) newErrors.preferredLocations = 'At least one location is required';
    
    // Check if at least one availability option is selected
    const hasAvailability = 
      formData.weekdayMornings || 
      formData.weekdayAfternoons || 
      formData.weekdayEvenings ||
      formData.weekendMornings ||
      formData.weekendAfternoons ||
      formData.weekendEvenings;
    
    if (!hasAvailability) newErrors.availability = 'Please select at least one availability option';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const formatAvailabilityForEmail = () => {
    const availabilityItems = [];
    
    if (formData.weekdayMornings) availabilityItems.push('Weekday Mornings');
    if (formData.weekdayAfternoons) availabilityItems.push('Weekday Afternoons');
    if (formData.weekdayEvenings) availabilityItems.push('Weekday Evenings');
    if (formData.weekendMornings) availabilityItems.push('Weekend Mornings');
    if (formData.weekendAfternoons) availabilityItems.push('Weekend Afternoons');
    if (formData.weekendEvenings) availabilityItems.push('Weekend Evenings');
    
    return availabilityItems.join(', ');
  };
  
  const formatPartnerPreferencesForEmail = () => {
    const preferences = [];
    
    if (formData.partnerSkillLevel) preferences.push(`Skill Level: ${formData.partnerSkillLevel}`);
    if (formData.partnerAgeRange) preferences.push(`Age Range: ${formData.partnerAgeRange}`);
    if (formData.partnerGender) preferences.push(`Gender: ${formData.partnerGender}`);
    if (formData.partnerPlayStyle) preferences.push(`Play Style: ${formData.partnerPlayStyle}`);
    
    return preferences.length > 0 ? preferences.join(', ') : 'No specific preferences';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Create an auto-response template using the template from our email template file
      const autoResponseTemplate = `Dear ${formData.name},

Thank you for using our Pickleball Partner Matching service. We have received your request and will work to help you find compatible playing partners in Costa Rica.

Here's a summary of your submission:
- Skill Level: ${formData.skillLevel}
- Years Playing: ${formData.yearsPlaying}
- Preferred Locations: ${formData.preferredLocations.join(', ')}
- Availability: ${formatAvailabilityForEmail()}

Our team reviews all partner requests and will be in touch with potential matches. In the meantime, we encourage you to check out our upcoming events where you can meet fellow pickleball players.

Best regards,
Laurie Meiring
Your Pickleball Guide Costa Rica
WhatsApp: +506 6200 2747`;
      
      // Metadata fields for Formspree configuration
      const metadata = {
        _subject: `New Partner Matching Request from ${formData.name}`,
        _replyto: formData.email,
        _template: "table",
        _autoresponse: autoResponseTemplate
      };
      
      // Format availability for email
      const availabilityString = formatAvailabilityForEmail();
      
      // Format partner preferences for email
      const partnerPreferencesString = formatPartnerPreferencesForEmail();
      
      // Actual form data that will appear in the email
      const formFields = {
        "Name": formData.name,
        "Email": formData.email,
        "Phone": formData.phone || "Not provided",
        "Skill Level": formData.skillLevel,
        "Years Playing": formData.yearsPlaying,
        "Preferred Position": formData.preferredPosition || "Not specified",
        "Availability": availabilityString,
        "Preferred Locations": formData.preferredLocations.join(", "),
        "Travel Distance": formData.travelDistance || "Not specified",
        "Partner Preferences": partnerPreferencesString,
        "Additional Message": formData.message || "None"
      };
      
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/mwplqdgo", {
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
        setFormData({
          name: '',
          email: '',
          phone: '',
          skillLevel: '',
          yearsPlaying: '',
          preferredPosition: '',
          weekdayMornings: false,
          weekdayAfternoons: false,
          weekdayEvenings: false,
          weekendMornings: false,
          weekendAfternoons: false,
          weekendEvenings: false,
          preferredLocations: [],
          travelDistance: '',
          partnerSkillLevel: '',
          partnerAgeRange: '',
          partnerGender: '',
          partnerPlayStyle: '',
          message: ''
        });
        setLocationInput('');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        form: 'There was an error submitting the form. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#e6f4ea',
          borderRadius: '12px'
        }}
      >
        <h3 style={{ 
          color: '#1e8e3e', 
          marginBottom: '15px', 
          fontSize: '1.8rem' 
        }}>Thank You!</h3>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '20px',
          maxWidth: '600px',
          margin: '0 auto 25px'
        }}>
          Your partner matching request has been submitted successfully. We'll review your information and get back to you with potential matches soon.
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '30px',
          maxWidth: '600px',
          margin: '0 auto 25px'
        }}>
          In the meantime, check out our <a href="/events" style={{ color: 'var(--secondary-color)' }}>events page</a> to find pickleball activities near you.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'var(--neutral-color)',
            padding: '12px 25px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '25px',
          fontSize: '1rem'
        }}>
          {errors.form}
        </div>
      )}
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--primary-color)',
          marginBottom: '15px',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px'
        }}>Personal Information</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="name" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Name *
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: errors.name ? '2px solid #c62828' : '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
            />
            {errors.name && (
              <p style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.name}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="email" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Email *
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: errors.email ? '2px solid #c62828' : '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
            />
            {errors.email && (
              <p style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="phone" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Phone (Optional)
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
              placeholder="WhatsApp preferred"
            />
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--primary-color)',
          marginBottom: '15px',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px'
        }}>Playing Information</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="skillLevel" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Skill Level *
            </label>
            <select 
              id="skillLevel" 
              name="skillLevel" 
              value={formData.skillLevel}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: errors.skillLevel ? '2px solid #c62828' : '2px solid var(--primary-color)',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select skill level</option>
              <option value="1.0-2.0">1.0-2.0 (Beginner)</option>
              <option value="2.5-3.0">2.5-3.0 (Intermediate)</option>
              <option value="3.5-4.0">3.5-4.0 (Advanced)</option>
              <option value="4.5-5.0">4.5-5.0 (Expert)</option>
              <option value="5.0+">5.0+ (Professional)</option>
            </select>
            {errors.skillLevel && (
              <p style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.skillLevel}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="yearsPlaying" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Years Playing *
            </label>
            <select 
              id="yearsPlaying" 
              name="yearsPlaying" 
              value={formData.yearsPlaying}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: errors.yearsPlaying ? '2px solid #c62828' : '2px solid var(--primary-color)',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select experience</option>
              <option value="< 1 year">Less than 1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
            {errors.yearsPlaying && (
              <p style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.yearsPlaying}
              </p>
            )}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="preferredPosition" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Preferred Position (Optional)
            </label>
            <select 
              id="preferredPosition" 
              name="preferredPosition" 
              value={formData.preferredPosition}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">No preference</option>
              <option value="right">Right side</option>
              <option value="left">Left side</option>
              <option value="either">Either side</option>
            </select>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--primary-color)',
          marginBottom: '15px',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px'
        }}>Availability</h3>
        
        {errors.availability && (
          <p style={{ color: '#c62828', fontSize: '0.95rem', marginBottom: '15px' }}>
            {errors.availability}
          </p>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            fontWeight: '500',
            marginBottom: '10px',
            fontSize: '1rem'
          }}>
            Weekdays:
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekdayMornings"
                checked={formData.weekdayMornings}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Mornings (8am-12pm)</span>
            </label>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekdayAfternoons"
                checked={formData.weekdayAfternoons}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Afternoons (12pm-4pm)</span>
            </label>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekdayEvenings"
                checked={formData.weekdayEvenings}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Evenings (4pm-8pm)</span>
            </label>
          </div>
        </div>
        
        <div>
          <p style={{ 
            fontWeight: '500',
            marginBottom: '10px',
            fontSize: '1rem'
          }}>
            Weekends:
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekendMornings"
                checked={formData.weekendMornings}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Mornings (8am-12pm)</span>
            </label>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekendAfternoons"
                checked={formData.weekendAfternoons}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Afternoons (12pm-4pm)</span>
            </label>
            
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="weekendEvenings"
                checked={formData.weekendEvenings}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--primary-color)'
                }}
              />
              <span>Evenings (4pm-8pm)</span>
            </label>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--primary-color)',
          marginBottom: '15px',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px'
        }}>Location Preferences</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="preferredLocations" 
            style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Preferred Locations *
          </label>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <input 
              type="text" 
              id="preferredLocations" 
              value={locationInput}
              onChange={handleLocationInputChange}
              onKeyDown={handleLocationKeyDown}
              placeholder="Enter city or area and press Enter"
              style={{ 
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: errors.preferredLocations ? '2px solid #c62828' : '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
            />
            <button 
              type="button" 
              onClick={addLocation}
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0 15px',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
          
          {errors.preferredLocations && (
            <p style={{ color: '#c62828', fontSize: '0.9rem', marginBottom: '10px' }}>
              {errors.preferredLocations}
            </p>
          )}
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px'
          }}>
            {formData.preferredLocations.map((location, index) => (
              <div 
                key={index}
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>{location}</span>
                <button 
                  type="button"
                  onClick={() => removeLocation(location)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: '#666', 
            marginTop: '10px' 
          }}>
            Add cities or areas where you prefer to play pickleball.
          </p>
        </div>
        
        <div>
          <label 
            htmlFor="travelDistance" 
            style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Willing to Travel (Optional)
          </label>
          <select 
            id="travelDistance" 
            name="travelDistance" 
            value={formData.travelDistance}
            onChange={handleChange}
            style={{ 
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid var(--primary-color)',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select travel distance</option>
            <option value="0-5km">0-5km</option>
            <option value="5-15km">5-15km</option>
            <option value="15-30km">15-30km</option>
            <option value="30km+">30km+</option>
          </select>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          color: 'var(--primary-color)',
          marginBottom: '15px',
          borderBottom: '2px solid var(--primary-color)',
          paddingBottom: '8px'
        }}>Partner Preferences (Optional)</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="partnerSkillLevel" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Preferred Partner Skill Level
            </label>
            <select 
              id="partnerSkillLevel" 
              name="partnerSkillLevel" 
              value={formData.partnerSkillLevel}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">No preference</option>
              <option value="same">Same as my level</option>
              <option value="higher">Higher than my level</option>
              <option value="lower">Lower than my level</option>
              <option value="any">Any skill level</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="partnerAgeRange" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Preferred Age Range
            </label>
            <input 
              type="text" 
              id="partnerAgeRange" 
              name="partnerAgeRange" 
              value={formData.partnerAgeRange}
              onChange={handleChange}
              placeholder="e.g., 20-30, 30+"
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="partnerGender" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Preferred Gender
            </label>
            <select 
              id="partnerGender" 
              name="partnerGender" 
              value={formData.partnerGender}
              onChange={handleChange}
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">No preference</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label 
              htmlFor="partnerPlayStyle" 
              style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Preferred Play Style
            </label>
            <input 
              type="text" 
              id="partnerPlayStyle" 
              name="partnerPlayStyle" 
              value={formData.partnerPlayStyle}
              onChange={handleChange}
              placeholder="e.g., Competitive, Recreational, Social"
              style={{ 
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid var(--primary-color)',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <label 
          htmlFor="message" 
          style={{ 
            display: 'block', 
            marginBottom: '8px',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Additional Information (Optional)
        </label>
        <textarea 
          id="message" 
          name="message" 
          rows="4" 
          value={formData.message}
          onChange={handleChange}
          placeholder="Provide any additional information that might help us find your ideal pickleball partner..."
          style={{ 
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid var(--primary-color)',
            fontSize: '1rem',
            resize: 'vertical'
          }}
        ></textarea>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <motion.button 
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            backgroundColor: submitting ? '#ccc' : 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            padding: '15px 30px',
            fontSize: '1.1rem',
            fontWeight: '500',
            cursor: submitting ? 'not-allowed' : 'pointer',
            width: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Partner Request'}
        </motion.button>
      </div>
      
      <p style={{ 
        fontSize: '0.9rem', 
        color: '#666', 
        marginTop: '15px',
        textAlign: 'center'
      }}>
        * Required fields
      </p>
    </form>
  );
};

export default PartnerMatchingForm;