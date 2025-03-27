import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EventFilter = ({ onFilterChange }) => {
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const eventTypes = [
    { value: '', label: 'All Events' },
    { value: 'tournament', label: 'Tournaments' },
    { value: 'league', label: 'Leagues' },
    { value: 'clinic', label: 'Skills Clinics' },
    { value: 'social', label: 'Social Events' }
  ];
  
  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    applyFilters(e.target.value, startDate, endDate);
  };
  
  const handleStartDateChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setStartDate(date);
    applyFilters(eventType, date, endDate);
  };
  
  const handleEndDateChange = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setEndDate(date);
    applyFilters(eventType, startDate, date);
  };
  
  const handleReset = () => {
    setEventType('');
    setStartDate(null);
    setEndDate(null);
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    applyFilters('', null, null);
  };
  
  const applyFilters = (type, start, end) => {
    onFilterChange({
      eventType: type,
      dateRange: {
        start: start,
        end: end
      }
    });
  };
  
  // Format date to YYYY-MM-DD for date input
  const formatDateForInput = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="event-filter" 
      style={{
        backgroundColor: '#fff',
        padding: isMobile ? '15px' : '25px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}
    >
      <h3 style={{
        fontSize: '1.3rem',
        marginBottom: '20px',
        color: 'var(--text-color)'
      }}>Filter Events</h3>
      
      <div className="filter-section" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div className="filter-group" style={{
          minWidth: isMobile ? '100%' : '200px',
          flex: 1
        }}>
          <label 
            htmlFor="event-type-filter"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              color: 'var(--text-color)'
            }}
          >
            Event Type:
          </label>
          <select 
            id="event-type-filter" 
            value={eventType} 
            onChange={handleEventTypeChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group date-filter" style={{
          minWidth: isMobile ? '100%' : '200px',
          flex: 1
        }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              color: 'var(--text-color)'
            }}
          >
            Start Date:
          </label>
          <input
            id="start-date"
            type="date"
            onChange={handleStartDateChange}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div className="filter-group date-filter" style={{
          minWidth: isMobile ? '100%' : '200px',
          flex: 1
        }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              color: 'var(--text-color)'
            }}
          >
            End Date:
          </label>
          <input
            id="end-date"
            type="date"
            onChange={handleEndDateChange}
            min={startDate ? formatDateForInput(startDate) : ''}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>
      
      <div className="filter-actions" style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button 
          onClick={handleReset} 
          className="reset-button"
          style={{
            backgroundColor: 'transparent',
            color: 'var(--secondary-color)',
            border: '1px solid var(--secondary-color)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Reset Filters
        </button>
      </div>
    </motion.div>
  );
};

export default EventFilter;