import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import { motion } from 'framer-motion';

const FeaturedClubList = ({ clubs, onClubSelect }) => {
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFilteredClubs(clubs || []);
  }, [clubs]);
  
  const handleClubSelect = (club) => {
    if (onClubSelect) {
      onClubSelect(club);
    }
  };
  
  return (
    <div className="featured-clubs-container" style={{
      marginTop: '40px'
    }}>
      {filteredClubs.length === 0 ? (
        <div className="no-clubs-message" style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <p style={{ fontSize: '1.2rem' }}>No featured clubs match your current filters.</p>
        </div>
      ) : (
        <div className="club-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px',
          marginTop: '30px'
        }}>
          {filteredClubs.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ClubCard 
                club={club} 
                onClick={() => handleClubSelect(club)} 
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedClubList;