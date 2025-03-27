import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ event, onClick }) => {
  const { name, eventType, startDate, endDate, location, images } = event;
  const featuredImage = images && images.length > 0 ? images[0] : '/public/tournaments/jaco-open-2024.jpg';
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format time
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Get event type badge class and display name
  const getEventTypeStyles = () => {
    switch(eventType) {
      case 'tournament': 
        return { 
          color: 'white', 
          background: 'var(--primary-color)',
          label: 'Tournament'
        };
      case 'league': 
        return { 
          color: 'white', 
          background: 'var(--secondary-color)',
          label: 'League'
        };
      case 'clinic': 
        return { 
          color: 'white', 
          background: '#28a745',
          label: 'Skills Clinic'
        };
      case 'social': 
        return { 
          color: 'white', 
          background: '#fd7e14',
          label: 'Social Event'
        };
      default: 
        return { 
          color: 'white', 
          background: '#6c757d',
          label: 'Other Event'
        };
    }
  };
  
  const eventTypeStyle = getEventTypeStyles();
  
  return (
    <motion.div 
      className="event-card" 
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
      }}>
        <div className="event-card-image" style={{
          width: '30%',
          minWidth: '180px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <img 
            src={featuredImage} 
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            backgroundColor: eventTypeStyle.background,
            color: eventTypeStyle.color,
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            {eventTypeStyle.label}
          </div>
        </div>
        
        <div className="event-card-content" style={{
          padding: '25px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: 'var(--text-color)',
            marginBottom: '12px'
          }}>{name}</h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '10px',
            color: 'var(--text-color)',
            gap: '8px'
          }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>📅</span>
            <div>
              <div>{formatDate(startDate)}</div>
              {startDate !== endDate && <div>to {formatDate(endDate)}</div>}
              <div style={{ fontWeight: '500', marginTop: '4px' }}>
                {formatTime(startDate)}
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '15px',
            color: 'var(--text-color)',
            gap: '8px'
          }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>📍</span>
            <div>
              <div>{location.name}</div>
              <div>{location.city}, {location.province}</div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: 'auto', 
            display: 'flex', 
            justifyContent: 'flex-end'
          }}>
            <motion.button 
              className="view-details-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--neutral-color)',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;