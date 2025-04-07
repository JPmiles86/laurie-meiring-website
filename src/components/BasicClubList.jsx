import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Simple component to display a basic club listing
const BasicClubListItem = ({ club, isMobile, onClubSelect }) => {
  const { name, location, contactInfo, listingType } = club;
  const isFeatured = listingType === 'featured';

  const handleCardClick = () => {
    if (isFeatured && onClubSelect) {
      onClubSelect(club);
    }
  };

  // Helper to create contact link/text elements
  const renderContactInfo = () => {
    const contacts = [];
    if (contactInfo?.website) {
      contacts.push(
        <a 
          key="website"
          href={contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'var(--primary-color)', textDecoration: 'underline', display: 'block' }}
          onClick={(e) => e.stopPropagation()}
        >
          {contactInfo.website}
        </a>
      );
    }
    if (contactInfo?.email && typeof contactInfo.email === 'string') {
      contacts.push(
        <a 
          key="email"
          href={`mailto:${contactInfo.email}`}
          style={{ color: 'var(--primary-color)', textDecoration: 'underline', display: 'block' }}
          onClick={(e) => e.stopPropagation()}
        >
          {contactInfo.email}
        </a>
      );
    }
    // Handle potential array of emails
    if (contactInfo?.email && Array.isArray(contactInfo.email)) {
        contactInfo.email.forEach((email, index) => {
            contacts.push(
                <a 
                  key={`email-${index}`}
                  href={`mailto:${email}`}
                  style={{ color: 'var(--primary-color)', textDecoration: 'underline', display: 'block' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {email}
                </a>
            );
        });
    }
    if (contactInfo?.instagram) {
      contacts.push(
        <a 
          key="instagram"
          href={contactInfo.instagram.startsWith('http') ? contactInfo.instagram : `https://${contactInfo.instagram}`}
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: 'var(--primary-color)', textDecoration: 'underline', display: 'block' }}
          onClick={(e) => e.stopPropagation()}
        >
          {contactInfo.instagram} (Instagram)
        </a>
      );
    }
    if (contactInfo?.phone) {
      contacts.push(
        <span key="phone" style={{ display: 'block' }}>{contactInfo.phone}</span>
        // Or make it a tel: link:
        // <a key="phone" href={`tel:${contactInfo.phone}`} style={{ color: 'var(--primary-color)', textDecoration: 'underline', display: 'block' }} onClick={(e) => e.stopPropagation()}>{contactInfo.phone}</a>
      );
    }

    if (contacts.length === 0) {
      return <span style={{ fontSize: '0.9rem', color: '#999' }}>No contact info</span>;
    }

    return contacts;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      style={{
        padding: '15px',
        border: isFeatured ? '2px solid var(--primary-color)' : '1px solid #eee',
        backgroundColor: isFeatured ? 'var(--secondary-color)' : '#fff',
        color: isFeatured ? 'var(--neutral-color)' : 'var(--text-color)',
        borderRadius: '8px',
        marginBottom: '15px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: '10px',
        position: 'relative',
        overflow: 'hidden',
        cursor: isFeatured ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        boxShadow: isFeatured ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      whileHover={isFeatured ? {
        scale: 1.02, 
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
      } : {}}
    >
      {isFeatured && (
        <span style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '3px 8px',
          borderBottomLeftRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          ⭐ Featured
        </span>
      )}
      <div style={{ flexGrow: 1 }}>
        <h4 style={{
          fontSize: '1.2rem',
          color: isFeatured ? 'var(--neutral-color)' : 'var(--primary-color)',
          margin: '0 0 5px 0'
        }}>{name}</h4>
        <p style={{
          fontSize: '1rem',
          color: isFeatured ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-color)',
          margin: '0 0 8px 0'
        }}>{location.city}, {location.province}</p>
      </div>
      <div style={{
        textAlign: isMobile ? 'left' : 'right',
        marginTop: isMobile ? '10px' : 0,
        // Ensure enough width for contact info
        minWidth: isMobile ? '100%' : '200px' 
      }}>
        {isFeatured ? (
          <button 
            className="button"
            style={{
              display: 'inline-block',
              padding: '8px 15px',
              fontSize: '0.9rem',
              backgroundColor: 'var(--neutral-color)',
              color: 'var(--primary-color)',
              borderRadius: '20px',
              textDecoration: 'none',
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'none',
              cursor: 'pointer'
            }}
          >
            Learn More
          </button>
        ) : (
            <div className="basic-contact-info" style={{ 
              fontSize: '1rem', 
              color: 'var(--text-color)', 
              wordBreak: 'break-word',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px' // Add some space between contact items
            }}>
              {renderContactInfo()}
            </div>
          )
        }
      </div>
    </motion.div>
  );
};

// Main component to render the list
const BasicClubList = ({ clubs, onClubSelect }) => {
  if (!clubs || clubs.length === 0) {
    return <p>No clubs to display.</p>;
  }

  // Sort clubs alphabetically by name
  const sortedClubs = [...clubs].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="basic-club-list" style={{ marginTop: '40px' }}>
      {sortedClubs.map((club) => (
        <BasicClubListItem 
          key={club.id} 
          club={club} 
          isMobile={false} // Consider making this dynamic
          onClubSelect={onClubSelect} // Pass down the selector function
        />
      ))}
    </div>
  );
};

export default BasicClubList; 