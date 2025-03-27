import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { clubs } from '../data/clubs';

const EventModal = ({ event, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Close modal on escape key
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    window.addEventListener('resize', handleResize);
    
    // Store current scroll position
    const scrollY = window.scrollY;
    
    // Prevent scrolling when modal is open, but maintain scroll position
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`; // Compensate for scroll position
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
      
      // Restore scroll position when modal closes
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = 'auto';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);
  
  // Stop propagation to prevent modal from closing when clicking inside
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  
  const {
    name, eventType, startDate, endDate, registrationDeadline,
    location, hostedBy, description, registrationInfo,
    eventDetails, images
  } = event;
  
  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Find the hosting club if it exists
  const hostingClub = hostedBy && hostedBy.clubId ? 
    clubs.find(club => club.id === hostedBy.clubId && club.isFeatured) : null;
  
  // Get event type display name and styles
  const getEventTypeInfo = () => {
    switch(eventType) {
      case 'tournament': 
        return { 
          label: 'Tournament',
          background: 'var(--primary-color)'
        };
      case 'league': 
        return { 
          label: 'League',
          background: 'var(--secondary-color)'
        };
      case 'clinic': 
        return { 
          label: 'Skills Clinic',
          background: '#28a745'
        };
      case 'social': 
        return { 
          label: 'Social Event',
          background: '#fd7e14'
        };
      default: 
        return { 
          label: 'Other Event',
          background: '#6c757d'
        };
    }
  };
  
  const eventTypeInfo = getEventTypeInfo();
  
  return (
    <motion.div 
      className="modal-overlay" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: isMobile ? '15px' : '30px'
      }}
    >
      <motion.div 
        className="event-modal" 
        onClick={handleModalClick}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '85vh',
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <button 
          className="close-modal" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          ×
        </button>
        
        <div className="event-modal-header" style={{
          padding: isMobile ? '20px 20px 20px' : '30px 40px 25px',
          borderBottom: '1px solid #eee',
          backgroundColor: 'var(--secondary-color)',
          color: 'white'
        }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: eventTypeInfo.background,
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500',
            marginBottom: '15px'
          }}>
            {eventTypeInfo.label}
          </div>
          
          <h2 style={{ 
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            marginBottom: '15px',
            color: 'white'
          }}>{name}</h2>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '15px' : '30px',
            marginBottom: '5px',
            fontSize: isMobile ? '1rem' : '1.1rem',
            color: 'white'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--primary-color)' }}>📅</span>
              <div>
                <div>
                  <strong>Date:</strong> {formatDate(startDate)}
                  {startDate !== endDate && <span> to<br/>{formatDate(endDate)}</span>}
                </div>
                <div style={{ marginTop: '4px' }}>
                  <strong>Time:</strong> {formatTime(startDate)}
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <span style={{ color: 'var(--primary-color)' }}>📍</span>
              <div>
                <div><strong>Location:</strong> {location.name}</div>
                <div>{location.city}, {location.province}</div>
              </div>
            </div>
            
            {registrationDeadline && (
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <span style={{ color: 'var(--primary-color)' }}>⏰</span>
                <div>
                  <strong>Registration Deadline:</strong>
                  <div>{formatDate(registrationDeadline)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="event-modal-content" style={{
          padding: isMobile ? '20px' : '40px',
        }}>
          {/* Event images */}
          {images && images.length > 0 && (
            <div className="event-images" style={{
              marginBottom: '30px'
            }}>
              <div style={{
                borderRadius: '8px',
                overflow: 'hidden',
                height: isMobile ? '200px' : '300px',
                width: '100%'
              }}>
                <img 
                  src={images[0]} 
                  alt={name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Event description */}
          <div className="event-description" style={{
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '1.4rem',
              color: 'var(--primary-color)',
              marginBottom: '15px'
            }}>About This Event</h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.6
            }}>{description}</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '30px',
            marginBottom: '30px'
          }}>
            {/* Event details */}
            <div className="event-details">
              <h3 style={{
                fontSize: '1.3rem',
                color: 'var(--primary-color)',
                marginBottom: '15px'
              }}>Event Details</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-color)',
                  marginBottom: '10px'
                }}>Skill Levels</h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {eventDetails.skillLevels.map((level, index) => (
                    <span key={index} style={{
                      backgroundColor: '#f0f0f0',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}>{level}</span>
                  ))}
                </div>
              </div>
              
              {eventDetails.format && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>Format</h4>
                  <p>{eventDetails.format}</p>
                </div>
              )}
              
              {eventDetails.prizes && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>Prizes</h4>
                  <p>{eventDetails.prizes}</p>
                </div>
              )}
              
              {eventDetails.additionalInfo && (
                <div style={{ marginBottom: '10px' }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>Additional Information</h4>
                  <p>{eventDetails.additionalInfo}</p>
                </div>
              )}
            </div>
            
            {/* Registration info */}
            <div className="registration-info">
              <h3 style={{
                fontSize: '1.3rem',
                color: 'var(--primary-color)',
                marginBottom: '15px'
              }}>Registration Information</h3>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: '20px'
              }}>
                {registrationInfo.price && (
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Fee:</strong> {registrationInfo.price}
                  </li>
                )}
                
                {registrationInfo.maxParticipants && (
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Maximum Participants:</strong> {registrationInfo.maxParticipants}
                  </li>
                )}
                
                {registrationInfo.email && (
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Contact Email:</strong>{' '}
                    <a 
                      href={`mailto:${registrationInfo.email}`}
                      style={{ color: 'var(--secondary-color)' }}
                    >
                      {registrationInfo.email}
                    </a>
                  </li>
                )}
                
                {registrationInfo.phone && (
                  <li style={{ marginBottom: '10px' }}>
                    <strong>Contact Phone:</strong>{' '}
                    <a 
                      href={`tel:${registrationInfo.phone}`}
                      style={{ color: 'var(--secondary-color)' }}
                    >
                      {registrationInfo.phone}
                    </a>
                  </li>
                )}
              </ul>
              
              {registrationInfo.url && (
                <a 
                  href={registrationInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    padding: '12px 25px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1.1rem',
                    marginTop: '10px'
                  }}
                >
                  Register Now
                </a>
              )}
            </div>
          </div>
          
          {/* Event location map */}
          <div className="event-location" style={{
            marginBottom: hostingClub ? '30px' : '10px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              color: 'var(--primary-color)',
              marginBottom: '15px'
            }}>Location</h3>
            
            <p style={{ marginBottom: '15px' }}>{location.address}</p>
            
            <div style={{
              height: '300px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Solution that works in development and prod */}
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center',
                backgroundImage: location.name === "Pura Pickleball Sports Club" 
                  ? "url('/jaco.jpg')" 
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
              }}>
                {/* Map iframe wrapped in try-catch wrapper */}
                {location.name === "Pura Pickleball Sports Club" && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    zIndex: 1,
                    opacity: 0.9
                  }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.6466599930736!2d-84.62694932396019!3d9.625660679362053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa1c70060ee762b%3A0xcd4a6763518825bd!2sPura%20Pickleball!5e0!3m2!1sen!2scr!4v1743025859396!5m2!1sen!2scr" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      onError={(e) => {
                        // Iframe loading failed, hide it
                        e.target.style.display = 'none';
                      }}
                    ></iframe>
                  </div>
                )}
                
                {/* Location info overlay - always visible as fallback */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  padding: '15px',
                  borderRadius: '8px',
                  maxWidth: '90%',
                  marginBottom: '15px',
                  zIndex: 2,
                  alignSelf: 'center'
                }}>
                  <p style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {location.name}
                  </p>
                  <p>
                    {location.city}, {location.province}<br />
                    {location.address}
                  </p>
                </div>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.city} ${location.province}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    zIndex: 2,
                    alignSelf: 'center'
                  }}
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
          
          {/* Hosting club section */}
          {hostingClub && (
            <div className="hosting-club-section">
              <h3 style={{
                fontSize: '1.3rem',
                color: 'var(--primary-color)',
                marginBottom: '15px'
              }}>Hosted by Featured Club</h3>
              
              <div style={{
                border: '1px solid #eee',
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '20px',
                alignItems: 'center',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{
                  width: isMobile ? '100%' : '120px',
                  height: isMobile ? '120px' : '120px',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={hostingClub.images && hostingClub.images.length > 0 ? hostingClub.images[0] : '/public/beachfront.jpeg'} 
                    alt={hostingClub.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    marginBottom: '5px',
                    color: 'var(--text-color)'
                  }}>{hostingClub.name}</h4>
                  
                  <p style={{ marginBottom: '12px' }}>
                    {hostingClub.location.city}, {hostingClub.location.province}
                  </p>
                  
                  <p style={{ marginBottom: '12px', fontSize: '0.95rem' }}>
                    {hostingClub.description.length > 120 
                      ? `${hostingClub.description.substring(0, 120)}...` 
                      : hostingClub.description}
                  </p>
                  
                  <a 
                    href="/clubs"
                    style={{
                      display: 'inline-block',
                      padding: '8px 15px',
                      backgroundColor: 'var(--secondary-color)',
                      color: 'white',
                      borderRadius: '20px',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    View Club Details
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventModal;