import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { events } from '../data/events';
import { motion } from 'framer-motion';

const EventList = ({ filters }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Just display all events without filtering
  useEffect(() => {
    // Sort by start date (ascending)
    const sorted = [...events].sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    
    setFilteredEvents(sorted);
  }, []);
  
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  return (
    <div className="events-container" style={{
      marginTop: '40px'
    }}>
      {filteredEvents.length === 0 ? (
        <div className="no-events-message" style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#f8f8f8',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <p style={{ fontSize: '1.2rem' }}>No events match your current filters.</p>
        </div>
      ) : (
        <div className="event-list">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                marginBottom: '25px'
              }}
            >
              <EventCard 
                event={event} 
                onClick={() => handleEventSelect(event)} 
              />
            </motion.div>
          ))}
        </div>
      )}
      
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default EventList;