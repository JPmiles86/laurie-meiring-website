import React, { useState, useEffect } from 'react';
import { clubs } from '../data/clubs';
import { motion } from 'framer-motion';

const ClubFilter = ({ onFilterChange }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Get unique provinces from the clubs data
  const provinces = [...new Set(clubs.map(club => club.location.province))].sort();
  
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    applyFilters(e.target.value);
  };
  
  const handleReset = () => {
    setSelectedProvince('');
    applyFilters('');
  };
  
  const applyFilters = (province) => {
    onFilterChange({
      province: province,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="club-filter" 
      style={{
        backgroundColor: '#fff',
        padding: isMobile ? '15px' : '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}
    >
      <div className="filter-section" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            margin: 0,
            color: 'var(--text-color)'
          }}>Filter Clubs</h3>
          
          <div className="filter-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <label htmlFor="province-filter" style={{
              fontSize: '1rem',
              color: 'var(--text-color)'
            }}>Province:</label>
            <select 
              id="province-filter" 
              value={selectedProvince} 
              onChange={handleProvinceChange}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">All Provinces</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="filter-actions">
          <button onClick={handleReset} className="reset-button" style={{
            backgroundColor: 'transparent',
            color: 'var(--secondary-color)',
            border: '1px solid var(--secondary-color)',
            padding: '8px 15px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Reset Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubFilter;