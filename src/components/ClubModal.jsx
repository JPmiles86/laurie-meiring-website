import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { events } from '../data/events';

const ClubModal = ({ club, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState('details');
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
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
    name, location, contactInfo, courtDetails,
    playInfo, amenities, images, description, upcomingEvents,
    laurieReview
  } = club;
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get upcoming events for this club
  const clubEvents = upcomingEvents ? events.filter(event => 
    upcomingEvents.includes(event.id)
  ) : [];
  
  // Sort events by date
  clubEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  // Check if coordinates exist for the map
  const hasCoordinates = location?.coordinates?.lat != null && location?.coordinates?.lng != null;
  
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
        className="club-modal" 
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
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
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
        
        <div className="club-modal-header" style={{
          padding: isMobile ? '20px 20px' : '30px',
          backgroundColor: 'var(--secondary-color)',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '1.8rem' : '2.5rem',
            marginBottom: '10px',
            color: 'white'
          }}>{name}</h2>
          <p style={{
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            opacity: 0.9,
            color: 'white'
          }}>{location.city}, {location.province}</p>
        </div>
        
        {/* Tab navigation */}
        <div className="modal-tabs" style={{
          display: 'flex',
          borderBottom: '1px solid #eee',
          padding: '0 20px'
        }}>
          <button
            onClick={() => setActiveTab('details')}
            style={{
              padding: '15px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'details' ? '3px solid var(--primary-color)' : '3px solid transparent',
              color: activeTab === 'details' ? 'var(--primary-color)' : 'var(--text-color)',
              fontWeight: activeTab === 'details' ? '600' : '400',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Club Details
          </button>
          {clubEvents.length > 0 && (
            <button
              onClick={() => setActiveTab('events')}
              style={{
                padding: '15px 20px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'events' ? '3px solid var(--primary-color)' : '3px solid transparent',
                color: activeTab === 'events' ? 'var(--primary-color)' : 'var(--text-color)',
                fontWeight: activeTab === 'events' ? '600' : '400',
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Upcoming Events
            </button>
          )}
        </div>
        
        <div className="club-modal-content" style={{
          padding: '0',
          overflowY: 'auto',
          flex: 1
        }}>
          <AnimatePresence mode="wait">
            {activeTab === 'details' ? (
              <motion.div
                key="details-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ padding: isMobile ? '20px' : '30px' }}
              >
                {/* Images gallery */}
                {images && images.length > 0 && (
                  <div className="club-images" style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '15px',
                    marginBottom: '25px'
                  }}>
                    {images.map((image, index) => (
                      <div key={index} style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: isMobile ? '200px' : '180px'
                      }}>
                        <img 
                          src={image} 
                          alt={`${name} - ${index + 1}`} 
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="club-description" style={{
                  marginBottom: '25px'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    color: 'var(--primary-color)',
                    marginBottom: '10px'
                  }}>About</h3>
                  <p style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                  }}>{description}</p>
                </div>
                
                <div className="club-details-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '30px'
                }}>
                  <div className="club-info-section">
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }}>Court Details</h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      <li style={{ marginBottom: '10px' }}><strong>Indoor Courts:</strong> {courtDetails.indoorCourts}</li>
                      <li style={{ marginBottom: '10px' }}><strong>Outdoor Courts:</strong> {courtDetails.outdoorCourts}</li>
                      <li style={{ marginBottom: '10px' }}><strong>Surface:</strong> {courtDetails.surfaceType}</li>
                      <li><strong>Lighting:</strong> {courtDetails.lightingAvailable ? 'Available' : 'Not available'}</li>
                    </ul>
                  </div>
                  
                  <div className="club-info-section">
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }}>Play Information</h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      <li style={{ marginBottom: '10px' }}><strong>Open Play:</strong> {playInfo.openPlay ? 'Yes' : 'No'}</li>
                      {playInfo.openPlaySchedule && (
                        <li style={{ marginBottom: '10px' }}><strong>Schedule:</strong> {playInfo.openPlaySchedule}</li>
                      )}
                      <li style={{ marginBottom: '10px' }}><strong>Reservation Required:</strong> {playInfo.reservationRequired ? 'Yes' : 'No'}</li>
                      {playInfo.courtFees && (
                        <li><strong>Court Fees:</strong> {playInfo.courtFees}</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="club-info-section">
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }}>Amenities</h3>
                    <ul className="amenities-list" style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                      gap: '10px'
                    }}>
                      {amenities.map((amenity, index) => (
                        <li key={index} style={{
                          backgroundColor: '#f8f8f8',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          display: 'inline-block'
                        }}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="club-info-section">
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: 'var(--primary-color)',
                      marginBottom: '15px'
                    }}>Contact Information</h3>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0
                    }}>
                      {contactInfo.phone && (
                        <li style={{ marginBottom: '10px' }}>
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${contactInfo.phone}`} style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>
                            {contactInfo.phone}
                          </a>
                        </li>
                      )}
                      {contactInfo.email && typeof contactInfo.email === 'string' && (
                        <li style={{ marginBottom: '10px' }}>
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${contactInfo.email}`} style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>
                            {contactInfo.email}
                          </a>
                        </li>
                      )}
                      {contactInfo.email && Array.isArray(contactInfo.email) && contactInfo.email.map((email, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                          <strong>Email {index + 1}:</strong>{' '}
                          <a href={`mailto:${email}`} style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>
                            {email}
                          </a>
                        </li>
                      ))}
                      {contactInfo.website && (
                        <li style={{ marginBottom: '10px' }}>
                          <strong>Website:</strong>{' '}
                          <a href={contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>
                            {contactInfo.website}
                          </a>
                        </li>
                      )}
                      {contactInfo.instagram && (
                        <li>
                          <strong>Instagram:</strong>{' '}
                          <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary-color)', textDecoration: 'none' }}>
                            Instagram Profile
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Laurie's Review Section - NEW */}
                {laurieReview && (
                  <div className="laurie-review-section" style={{ 
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: 'var(--secondary-color)', // Use secondary color for contrast
                    borderRadius: '8px',
                    color: 'var(--neutral-color)'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.3rem', 
                      color: 'var(--neutral-color)', 
                      marginBottom: '10px', 
                      textAlign: 'center' 
                    }}>
                      ⭐ Laurie's Recommendation ⭐
                    </h3>
                    <p style={{ 
                      fontSize: isMobile ? '1rem' : '1.1rem', 
                      lineHeight: 1.6, 
                      fontStyle: 'italic',
                      margin: 0
                    }}>
                      "{laurieReview}"
                    </p>
                  </div>
                )}
                
                <div className="club-location-map" style={{ marginTop: '30px' }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    color: 'var(--primary-color)',
                    marginBottom: '15px'
                  }}>Location</h3>
                  <p style={{ marginBottom: '15px' }}>{location.address}</p>
                  
                  <div className="map-container" style={{ 
                    width: '100%', 
                    height: '300px', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    border: '1px solid #eee' 
                  }}>
                    {hasCoordinates && GOOGLE_MAPS_API_KEY ? (
                      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                        <Map
                          mapId={`modal-map-${club.id}`}
                          style={{ width: '100%', height: '100%' }}
                          defaultCenter={location.coordinates}
                          defaultZoom={14} // Zoom in a bit more for modal view
                          gestureHandling={'greedy'}
                          disableDefaultUI={true}
                        >
                          <AdvancedMarker position={location.coordinates} title={name}>
                            <Pin 
                              background={'var(--primary-color)'} 
                              glyphColor={'white'}
                              borderColor={'var(--secondary-color)'}
                            />
                          </AdvancedMarker>
                        </Map>
                      </APIProvider>
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', backgroundColor: '#f0f0f0', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#888', textAlign: 'center', padding: '20px'
                      }}>
                        {GOOGLE_MAPS_API_KEY 
                          ? 'Map coordinates not available for this club.' 
                          : 'Map requires API key configuration.'}
                      </div>
                    )}
                  </div>
                  {/* Add Google Maps link as a fallback or supplementary info */} 
                  {hasCoordinates && (
                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`}
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
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="events-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ padding: isMobile ? '20px' : '30px' }}
              >
                <h3 style={{
                  fontSize: '1.4rem',
                  color: 'var(--primary-color)',
                  marginBottom: '20px'
                }}>Upcoming Events at {name}</h3>
                
                <div className="club-events-list">
                  {clubEvents.map(event => (
                    <div key={event.id} style={{
                      backgroundColor: '#f8f8f8',
                      borderRadius: '8px',
                      padding: '20px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: isMobile ? 'wrap' : 'nowrap',
                        gap: '15px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                          }}>
                            <span style={{
                              backgroundColor: (() => {
                                switch(event.eventType) {
                                  case 'tournament': return 'var(--primary-color)';
                                  case 'league': return 'var(--secondary-color)';
                                  case 'clinic': return '#28a745';
                                  case 'social': return '#fd7e14';
                                  default: return '#6c757d';
                                }
                              })(),
                              color: 'white',
                              padding: '4px 10px',
                              borderRadius: '15px',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              textTransform: 'capitalize'
                            }}>
                              {event.eventType}
                            </span>
                          </div>
                          
                          <h4 style={{
                            fontSize: '1.3rem',
                            marginBottom: '10px',
                            color: 'var(--text-color)'
                          }}>{event.name}</h4>
                          
                          <div style={{
                            display: 'flex',
                            gap: '15px',
                            flexWrap: 'wrap',
                            marginBottom: '15px'
                          }}>
                            <div>
                              <strong>Date:</strong> {formatDate(event.startDate)}
                              {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                            </div>
                            
                            {event.registrationDeadline && (
                              <div>
                                <strong>Registration Deadline:</strong> {formatDate(event.registrationDeadline)}
                              </div>
                            )}
                          </div>
                          
                          <p style={{ 
                            fontSize: '1rem',
                            marginBottom: '15px',
                            lineHeight: 1.6
                          }}>{event.description}</p>
                          
                          {event.registrationInfo.url && (
                            <a 
                              href={event.registrationInfo.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontWeight: '500'
                              }}
                            >
                              Register Now
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClubModal;