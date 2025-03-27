import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const ClubCard = ({ club, onClick }) => {
  const { name, location, courtDetails, images } = club;
  const featuredImage = images && images.length > 0 ? images[0] : '/public/beachfront.jpeg';
  
  return (
    <motion.div 
      className="club-card" 
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="club-card-image" style={{
        height: '220px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
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
      </div>
      <div className="club-card-content" style={{
        padding: '20px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          color: 'var(--primary-color)',
          marginBottom: '10px'
        }}>{name}</h3>
        
        <p className="club-location" style={{
          fontSize: '1.1rem',
          color: 'var(--text-color)',
          marginBottom: '15px'
        }}>{location.city}, {location.province}</p>
        
        <div className="club-details" style={{
          display: 'flex',
          gap: '15px',
          fontSize: '0.95rem',
          color: 'var(--text-color)',
          opacity: 0.8,
          marginBottom: '20px'
        }}>
          <span>
            <strong>{courtDetails.indoorCourts + courtDetails.outdoorCourts}</strong> Courts
          </span>
          <span>{courtDetails.surfaceType}</span>
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <motion.button 
            className="view-details-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--neutral-color)',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px'
            }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubCard;