# Implementation Guide: Costa Rica Pickleball Website

## Overview

This implementation guide provides detailed instructions for building the three main features of the Costa Rica Pickleball website:

1. **Featured Clubs Section** - A section showcasing paid featured pickleball clubs in Costa Rica
2. **Pickleball Events Calendar** - A chronological listing of various pickleball events (tournaments, leagues, etc.)
3. **Partner Matching Form** - A form for users to find pickleball partners

The implementation follows a systematic approach, focusing on creating modular, reusable components that work with the static data files defined in the project.

## Project Structure

```
src/
├── components/          # Shared components
│   ├── FeaturedClubList/    # Featured clubs components
│   ├── ClubModal/           # Club detail modal
│   ├── EventList/           # Events list components
│   ├── EventModal/          # Event detail modal
│   ├── PartnerMatchingForm/ # Partner matching form components
│   └── ... (other components)
├── pages/               # Page components
│   ├── FeaturedClubsPage.jsx    # Featured clubs page
│   ├── EventsCalendarPage.jsx   # Events calendar page
│   ├── PartnerMatchingPage.jsx  # Partner matching page
│   └── ... (other pages)
├── data/                # Static data files
│   ├── clubs.js         # Featured clubs data
│   ├── events.js        # Events data
│   └── ... (other data)
├── styles/              # CSS files
├── utils/               # Utility functions
└── App.jsx              # Main application component
```

## Project Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Initial Setup
```bash
# Clone the repository
git clone [repository-url]
cd laurie-meiring-website

# Install dependencies
npm install

# Start development server
npm run dev
```

## Feature Implementation

### 1. Featured Clubs Section

#### Components

Create the following components for the featured clubs section:

1. **FeaturedClubsPage.jsx**
   - Main page component for displaying featured clubs
   - Contains filtering options and the featured clubs list
   - Includes a call-to-action for clubs to be featured

2. **FeaturedClubList.jsx**
   - Displays a grid of club cards
   - Filters clubs based on user selections
   - Only displays clubs with `isFeatured: true` and valid `featuredUntil` dates

3. **ClubCard.jsx**
   - Card component displaying club preview information
   - Includes club name, location, and a featured image
   - Handles click events to show the club modal

4. **ClubModal.jsx**
   - Modal component for displaying detailed club information
   - Includes all club details, photos, amenities, and map
   - Has close button and keyboard navigation support

5. **ClubFilter.jsx**
   - Filtering component for clubs by region/province
   - Includes reset and apply filter buttons
   - Updates the FeaturedClubList based on selected filters

#### Implementation Steps

1. **Create the FeaturedClubsPage Component**

```jsx
// src/pages/FeaturedClubsPage.jsx
import React, { useState } from 'react';
import FeaturedClubList from '../components/FeaturedClubList';
import ClubFilter from '../components/ClubFilter';
import '../styles/FeaturedClubsPage.css';
import { Link } from 'react-router-dom';

const FeaturedClubsPage = () => {
  const [filters, setFilters] = useState({
    province: '',
    // Other filter parameters as needed
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="featured-clubs-page">
      <div className="featured-clubs-header">
        <h1>Featured Pickleball Clubs in Costa Rica</h1>
        <p>Discover the best places to play pickleball across Costa Rica.</p>
      </div>
      
      <ClubFilter onFilterChange={handleFilterChange} />
      
      <FeaturedClubList filters={filters} />
      
      <FeatureClubCTA />
    </div>
  );
};

// CTA Component for Featured Clubs Page
const FeatureClubCTA = () => {
  return (
    <div className="feature-club-cta">
      <h2>Do you run a pickleball club?</h2>
      <p>If you'd like your club to appear on this page, reach out through our contact form.</p>
      <Link to="/contact" className="cta-button">
        Contact Us
      </Link>
    </div>
  );
};

export default FeaturedClubsPage;
```

2. **Create the FeaturedClubList Component**

```jsx
// src/components/FeaturedClubList.jsx
import React, { useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import ClubModal from './ClubModal';
import { clubs } from '../data/clubs';
import '../styles/FeaturedClubList.css';

const FeaturedClubList = ({ filters }) => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [filteredClubs, setFilteredClubs] = useState([]);
  
  // Filter clubs based on:
  // 1. Featured status (isFeatured: true)
  // 2. Valid featuredUntil date (in the future)
  // 3. Applied user filters
  useEffect(() => {
    const currentDate = new Date();
    const filtered = clubs.filter(club => {
      // Check featured status and date
      if (!club.isFeatured) return false;
      if (new Date(club.featuredUntil) < currentDate) return false;
      
      // Apply province filter if selected
      if (filters.province && club.location.province !== filters.province) {
        return false;
      }
      
      // Add other filters as needed
      
      return true;
    });
    
    setFilteredClubs(filtered);
  }, [filters]);
  
  const handleClubSelect = (club) => {
    setSelectedClub(club);
  };
  
  const handleCloseModal = () => {
    setSelectedClub(null);
  };
  
  return (
    <div className="featured-clubs-container">
      {filteredClubs.length === 0 ? (
        <div className="no-clubs-message">
          <p>No featured clubs match your current filters.</p>
        </div>
      ) : (
        <div className="club-grid">
          {filteredClubs.map(club => (
            <ClubCard 
              key={club.id} 
              club={club} 
              onClick={() => handleClubSelect(club)} 
            />
          ))}
        </div>
      )}
      
      {selectedClub && (
        <ClubModal 
          club={selectedClub} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default FeaturedClubList;
```

3. **Create the ClubCard Component**

```jsx
// src/components/ClubCard.jsx
import React from 'react';
import '../styles/ClubCard.css';

const ClubCard = ({ club, onClick }) => {
  const { name, location, courtDetails, images } = club;
  const featuredImage = images && images.length > 0 ? images[0] : '/images/default-club.jpg';
  
  return (
    <div className="club-card" onClick={onClick}>
      <div className="club-card-image">
        <img src={featuredImage} alt={name} />
      </div>
      <div className="club-card-content">
        <h3>{name}</h3>
        <p className="club-location">{location.city}, {location.province}</p>
        <div className="club-details">
          <span>{courtDetails.indoorCourts + courtDetails.outdoorCourts} Courts</span>
          <span>{courtDetails.surfaceType}</span>
        </div>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default ClubCard;
```

4. **Create the ClubModal Component**

```jsx
// src/components/ClubModal.jsx
import React, { useEffect } from 'react';
import '../styles/ClubModal.css';

const ClubModal = ({ club, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  // Stop propagation to prevent modal from closing when clicking inside
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  
  const {
    name, location, contactInfo, courtDetails,
    playInfo, amenities, images, description, upcomingEvents
  } = club;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="club-modal" onClick={handleModalClick}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="club-modal-header">
          <h2>{name}</h2>
          <p>{location.city}, {location.province}</p>
        </div>
        
        <div className="club-modal-content">
          <div className="club-images">
            {images && images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${name} - ${index + 1}`} 
              />
            ))}
          </div>
          
          <div className="club-description">
            <h3>About</h3>
            <p>{description}</p>
          </div>
          
          <div className="club-details-grid">
            <div className="club-info-section">
              <h3>Court Details</h3>
              <ul>
                <li><strong>Indoor Courts:</strong> {courtDetails.indoorCourts}</li>
                <li><strong>Outdoor Courts:</strong> {courtDetails.outdoorCourts}</li>
                <li><strong>Surface:</strong> {courtDetails.surfaceType}</li>
                <li><strong>Lighting:</strong> {courtDetails.lightingAvailable ? 'Available' : 'Not available'}</li>
              </ul>
            </div>
            
            <div className="club-info-section">
              <h3>Play Information</h3>
              <ul>
                <li><strong>Open Play:</strong> {playInfo.openPlay ? 'Yes' : 'No'}</li>
                {playInfo.openPlaySchedule && (
                  <li><strong>Schedule:</strong> {playInfo.openPlaySchedule}</li>
                )}
                <li><strong>Reservation Required:</strong> {playInfo.reservationRequired ? 'Yes' : 'No'}</li>
                {playInfo.courtFees && (
                  <li><strong>Court Fees:</strong> {playInfo.courtFees}</li>
                )}
              </ul>
            </div>
            
            <div className="club-info-section">
              <h3>Amenities</h3>
              <ul className="amenities-list">
                {amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            
            <div className="club-info-section">
              <h3>Contact Information</h3>
              <ul>
                {contactInfo.phone && <li><strong>Phone:</strong> {contactInfo.phone}</li>}
                {contactInfo.email && <li><strong>Email:</strong> {contactInfo.email}</li>}
                {contactInfo.website && (
                  <li>
                    <strong>Website:</strong> 
                    <a href={contactInfo.website} target="_blank" rel="noopener noreferrer">
                      {contactInfo.website}
                    </a>
                  </li>
                )}
                {contactInfo.facebook && (
                  <li>
                    <strong>Facebook:</strong> 
                    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook Page
                    </a>
                  </li>
                )}
                {contactInfo.instagram && (
                  <li>
                    <strong>Instagram:</strong> 
                    <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram Profile
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="club-location-map">
            <h3>Location</h3>
            <p>{location.address}</p>
            {/* Google Maps integration would go here */}
            <div className="map-placeholder">
              Map will be displayed here using Google Maps API
            </div>
          </div>
          
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className="club-upcoming-events">
              <h3>Upcoming Events at {name}</h3>
              <p>Events listing will be displayed here</p>
              {/* Would need to fetch and display events from events.js */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
```

5. **Create the ClubFilter Component**

```jsx
// src/components/ClubFilter.jsx
import React, { useState, useEffect } from 'react';
import { clubs } from '../data/clubs';
import '../styles/ClubFilter.css';

const ClubFilter = ({ onFilterChange }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  
  // Get unique provinces from the clubs data
  const provinces = [...new Set(clubs.map(club => club.location.province))].sort();
  
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };
  
  const handleReset = () => {
    setSelectedProvince('');
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      province: selectedProvince,
      // Other filters would go here
    });
  };
  
  // Apply filters automatically when they change
  useEffect(() => {
    handleApplyFilters();
  }, [selectedProvince]);
  
  return (
    <div className="club-filter">
      <div className="filter-group">
        <label htmlFor="province-filter">Filter by Province:</label>
        <select 
          id="province-filter" 
          value={selectedProvince} 
          onChange={handleProvinceChange}
        >
          <option value="">All Provinces</option>
          {provinces.map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
      </div>
      
      {/* Additional filter controls would go here */}
      
      <div className="filter-actions">
        <button onClick={handleReset} className="reset-button">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ClubFilter;
```

#### Business Model Integration

To support the business model for featured clubs, implement the following:

1. **Update the Contact Form**
   
   Modify the existing contact form to include an option for club owners to request featured status:

```jsx
// In the existing contact form component
<div className="form-group">
  <label htmlFor="service">Service Required</label>
  <select id="service" name="service" required>
    <option value="">Select a service</option>
    <option value="general">General Inquiry</option>
    <option value="feature-club">Feature My Club</option>
    <option value="event">Submit an Event</option>
    <option value="other">Other</option>
  </select>
</div>

{/* Conditional fields that appear when "Feature My Club" is selected */}
{formData.service === 'feature-club' && (
  <div className="club-feature-fields">
    <h3>Featured Club Listing Information</h3>
    <p>Please provide details about your club below, and we'll contact you with more information about featuring your club on our site.</p>
    
    <div className="form-group">
      <label htmlFor="clubName">Club Name</label>
      <input type="text" id="clubName" name="clubName" />
    </div>
    
    <div className="form-group">
      <label htmlFor="clubLocation">Club Location</label>
      <input type="text" id="clubLocation" name="clubLocation" />
    </div>
  </div>
)}
```

2. **Create "Want to be featured?" CTA Section**

   Add a prominent call-to-action section on the FeaturedClubsPage to encourage club owners to get featured:

### 2. Pickleball Events Calendar

#### Components

Create the following components for the events calendar:

1. **EventsCalendarPage.jsx**
   - Main page component for displaying pickleball events
   - Contains filtering options and the events list
   - Shows chronological list of upcoming events

2. **EventList.jsx**
   - Displays a list of event cards sorted by date
   - Filters events based on user selections (date, type, etc.)
   - Handles pagination if there are many events

3. **EventCard.jsx**
   - Card component displaying event preview information
   - Shows event name, date, location, and type
   - Handles click events to show the event modal

4. **EventModal.jsx**
   - Modal component for displaying detailed event information
   - Includes all event details, registration info, and map
   - Links to the hosting club if it's a featured club

5. **EventFilter.jsx**
   - Filtering component for events by type, date range, etc.
   - Includes reset and apply filter buttons
   - Updates the EventList based on selected filters

#### Implementation Steps

1. **Create the EventsCalendarPage Component**

```jsx
// src/pages/EventsCalendarPage.jsx
import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventFilter from '../components/EventFilter';
import '../styles/EventsCalendarPage.css';

const EventsCalendarPage = () => {
  const [filters, setFilters] = useState({
    eventType: '',
    dateRange: {
      start: null,
      end: null
    }
    // Other filter parameters as needed
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="events-calendar-page">
      <div className="events-calendar-header">
        <h1>Pickleball Events in Costa Rica</h1>
        <p>Find tournaments, leagues, clinics, and social events across Costa Rica.</p>
      </div>
      
      <EventFilter onFilterChange={handleFilterChange} />
      
      <EventList filters={filters} />
      
      <div className="events-cta">
        <h2>Have an upcoming pickleball event?</h2>
        <p>Let us know about your event through our contact form.</p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </div>
    </div>
  );
};

export default EventsCalendarPage;
```

2. **Create the EventList Component**

```jsx
// src/components/EventList.jsx
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { events } from '../data/events';
import '../styles/EventList.css';

const EventList = ({ filters }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Filter and sort events
  useEffect(() => {
    const currentDate = new Date();
    
    // Filter events based on filters and only show future events
    const filtered = events.filter(event => {
      // Only show future or current events
      if (new Date(event.endDate) < currentDate) return false;
      
      // Apply event type filter if selected
      if (filters.eventType && event.eventType !== filters.eventType) {
        return false;
      }
      
      // Apply date range filter if selected
      if (filters.dateRange.start && new Date(event.startDate) < filters.dateRange.start) {
        return false;
      }
      
      if (filters.dateRange.end && new Date(event.startDate) > filters.dateRange.end) {
        return false;
      }
      
      // Add other filters as needed
      
      return true;
    });
    
    // Sort by start date (ascending)
    const sorted = filtered.sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    });
    
    setFilteredEvents(sorted);
  }, [filters]);
  
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  return (
    <div className="events-container">
      {filteredEvents.length === 0 ? (
        <div className="no-events-message">
          <p>No events match your current filters.</p>
        </div>
      ) : (
        <div className="event-list">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onClick={() => handleEventSelect(event)} 
            />
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
```

3. **Create the EventCard Component**

```jsx
// src/components/EventCard.jsx
import React from 'react';
import '../styles/EventCard.css';

const EventCard = ({ event, onClick }) => {
  const { name, eventType, startDate, endDate, location, images } = event;
  const featuredImage = images && images.length > 0 ? images[0] : '/images/default-event.jpg';
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get event type badge class
  const getEventTypeBadgeClass = () => {
    switch(eventType) {
      case 'tournament': return 'badge-tournament';
      case 'league': return 'badge-league';
      case 'clinic': return 'badge-clinic';
      case 'social': return 'badge-social';
      default: return 'badge-other';
    }
  };
  
  // Get event type display name
  const getEventTypeDisplay = () => {
    switch(eventType) {
      case 'tournament': return 'Tournament';
      case 'league': return 'League';
      case 'clinic': return 'Skills Clinic';
      case 'social': return 'Social Event';
      default: return 'Other Event';
    }
  };
  
  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-card-image">
        <img src={featuredImage} alt={name} />
        <span className={`event-type-badge ${getEventTypeBadgeClass()}`}>
          {getEventTypeDisplay()}
        </span>
      </div>
      <div className="event-card-content">
        <h3>{name}</h3>
        <div className="event-dates">
          <i className="fas fa-calendar-alt"></i>
          {formatDate(startDate)} {startDate !== endDate ? `- ${formatDate(endDate)}` : ''}
        </div>
        <div className="event-location">
          <i className="fas fa-map-marker-alt"></i>
          {location.name}, {location.city}
        </div>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default EventCard;
```

4. **Create the EventModal Component**

```jsx
// src/components/EventModal.jsx
import React, { useEffect } from 'react';
import { clubs } from '../data/clubs';
import '../styles/EventModal.css';

const EventModal = ({ event, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
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
  
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };
  
  // Find the hosting club if it exists
  const hostingClub = hostedBy && hostedBy.clubId ? 
    clubs.find(club => club.id === hostedBy.clubId && club.isFeatured) : null;
  
  // Get event type display name
  const getEventTypeDisplay = () => {
    switch(eventType) {
      case 'tournament': return 'Tournament';
      case 'league': return 'League';
      case 'clinic': return 'Skills Clinic';
      case 'social': return 'Social Event';
      default: return 'Other Event';
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={handleModalClick}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <div className="event-modal-header">
          <div className="event-type-badge">{getEventTypeDisplay()}</div>
          <h2>{name}</h2>
          <p className="event-dates">
            {formatDate(startDate)} {startDate !== endDate ? `- ${formatDate(endDate)}` : ''}
          </p>
        </div>
        
        <div className="event-modal-content">
          <div className="event-images">
            {images && images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${name} - ${index + 1}`} 
              />
            ))}
          </div>
          
          <div className="event-description">
            <h3>About This Event</h3>
            <p>{description}</p>
          </div>
          
          <div className="event-details-grid">
            <div className="event-info-section">
              <h3>Event Details</h3>
              <ul>
                <li><strong>Event Type:</strong> {getEventTypeDisplay()}</li>
                <li><strong>Start Date:</strong> {formatDate(startDate)}</li>
                <li><strong>End Date:</strong> {formatDate(endDate)}</li>
                <li><strong>Start Time:</strong> {formatTime(startDate)}</li>
                {registrationDeadline && (
                  <li><strong>Registration Deadline:</strong> {formatDate(registrationDeadline)}</li>
                )}
                <li><strong>Hosted By:</strong> {hostedBy.name}</li>
              </ul>
            </div>
            
            <div className="event-info-section">
              <h3>Skill Levels</h3>
              <ul className="skill-levels-list">
                {eventDetails.skillLevels.map((level, index) => (
                  <li key={index}>{level}</li>
                ))}
              </ul>
            </div>
            
            {eventDetails.format && (
              <div className="event-info-section">
                <h3>Format</h3>
                <p>{eventDetails.format}</p>
              </div>
            )}
            
            {eventDetails.prizes && (
              <div className="event-info-section">
                <h3>Prizes</h3>
                <p>{eventDetails.prizes}</p>
              </div>
            )}
            
            <div className="event-info-section">
              <h3>Registration Information</h3>
              <ul>
                {registrationInfo.price && <li><strong>Price:</strong> {registrationInfo.price}</li>}
                {registrationInfo.maxParticipants && <li><strong>Max Participants:</strong> {registrationInfo.maxParticipants}</li>}
                {registrationInfo.email && <li><strong>Contact Email:</strong> {registrationInfo.email}</li>}
                {registrationInfo.phone && <li><strong>Contact Phone:</strong> {registrationInfo.phone}</li>}
              </ul>
              
              {registrationInfo.url && (
                <a 
                  href={registrationInfo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="register-button"
                >
                  Register for This Event
                </a>
              )}
            </div>
          </div>
          
          <div className="event-location-section">
            <h3>Location</h3>
            <p>{location.name}</p>
            <p>{location.address}</p>
            <p>{location.city}, {location.province}</p>
            
            {/* Google Maps integration would go here */}
            <div className="map-placeholder">
              Map will be displayed here using Google Maps API
            </div>
          </div>
          
          {hostingClub && (
            <div className="hosting-club-section">
              <h3>Hosted by Featured Club</h3>
              <div className="hosting-club-card">
                <img 
                  src={hostingClub.images && hostingClub.images.length > 0 
                    ? hostingClub.images[0] 
                    : '/images/default-club.jpg'} 
                  alt={hostingClub.name} 
                />
                <div className="hosting-club-info">
                  <h4>{hostingClub.name}</h4>
                  <p>{hostingClub.location.city}, {hostingClub.location.province}</p>
                  <button className="view-club-btn">View Club Details</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
```

5. **Create the EventFilter Component**

```jsx
// src/components/EventFilter.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // You'll need to install this package
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/EventFilter.css';

const EventFilter = ({ onFilterChange }) => {
  const [eventType, setEventType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const eventTypes = [
    { value: '', label: 'All Events' },
    { value: 'tournament', label: 'Tournaments' },
    { value: 'league', label: 'Leagues' },
    { value: 'clinic', label: 'Skills Clinics' },
    { value: 'social', label: 'Social Events' },
    { value: 'other', label: 'Other Events' }
  ];
  
  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    applyFilters(e.target.value, startDate, endDate);
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    applyFilters(eventType, date, endDate);
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    applyFilters(eventType, startDate, date);
  };
  
  const handleReset = () => {
    setEventType('');
    setStartDate(null);
    setEndDate(null);
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
  
  return (
    <div className="event-filter">
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="event-type-filter">Event Type:</label>
          <select 
            id="event-type-filter" 
            value={eventType} 
            onChange={handleEventTypeChange}
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group date-filter">
          <label>Date Range:</label>
          <div className="date-pickers">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              isClearable
            />
            <span className="date-range-separator">to</span>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              isClearable
            />
          </div>
        </div>
      </div>
      
      <div className="filter-actions">
        <button onClick={handleReset} className="reset-button">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
```

#### Integration with Featured Clubs

To integrate events with featured clubs, implement the following:

1. **Update events.js data structure**
   
   Ensure each event has a `hostedBy` field that may include a `clubId` reference:

```javascript
export const events = [
  {
    id: "event-1",
    name: "Costa Rica Open",
    eventType: "tournament",
    // ... other properties
    hostedBy: {
      name: "Costa Rica Pickleball Club",
      clubId: "club-1" // Reference to a featured club
    }
  },
  // ... more events
];
```

2. **Show hosting club in EventModal**

```jsx
// Inside EventModal.jsx, add the following code
const hostingClub = hostedBy && hostedBy.clubId ? 
  clubs.find(club => club.id === hostedBy.clubId && club.isFeatured) : null;

// ...and later in the render:
{hostingClub && (
  <div className="hosting-club-section">
    <h3>Hosted by Featured Club</h3>
    <div className="hosting-club-card">
      <img src={hostingClub.images[0]} alt={hostingClub.name} />
      <div className="hosting-club-info">
        <h4>{hostingClub.name}</h4>
        <p>{hostingClub.location.city}, {hostingClub.location.province}</p>
        <button className="view-club-btn" onClick={() => showClubModal(hostingClub)}>
          View Club Details
        </button>
      </div>
    </div>
  </div>
)}
```

3. **Show upcoming events in ClubModal**

```jsx
// Inside ClubModal.jsx, add the following imports
import { events } from '../data/events';

// ...and later add a function to get club events
const getClubEvents = (clubId) => {
  const currentDate = new Date();
  return events
    .filter(event => 
      event.hostedBy && 
      event.hostedBy.clubId === clubId && 
      new Date(event.startDate) >= currentDate
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
};

// ...and later in the render:
const clubEvents = getClubEvents(club.id);

{clubEvents.length > 0 && (
  <div className="club-upcoming-events">
    <h3>Upcoming Events at {club.name}</h3>
    <div className="club-events-list">
      {clubEvents.map(event => (
        <div key={event.id} className="club-event-item">
          <div className="event-date">
            {formatDate(event.startDate)}
          </div>
          <div className="event-details">
            <h4>{event.name}</h4>
            <span className="event-type">{event.eventType}</span>
          </div>
          <button 
            className="view-event-btn" 
            onClick={(e) => {
              e.stopPropagation();
              showEventModal(event);
            }}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  </div>
)}
```

### 3. Partner Matching Form

#### Step 1: Create Components
1. Create form page component:
```bash
touch src/pages/PartnerMatchingPage.jsx
```

2. Create supporting components:
```bash
touch src/components/PartnerMatchingForm.jsx
touch src/components/PartnerMatchingConfirmation.jsx
```

#### Step 2: Implement Components
1. PartnerMatchingPage.jsx:
   - Add hero section
   - Implement form layout
   - Add success/error handling

2. PartnerMatchingForm.jsx:
   - Create form fields based on data model
   - Add validation
   - Implement Formspree submission following pattern from ContactPage.jsx
   - Include metadata configuration for custom email templates:
     ```javascript
     // Metadata fields for Formspree configuration
     const metadata = {
       _subject: `New Partner Matching Request from ${name}`,
       _replyto: email,
       _template: "table",
       _autoresponse: `Custom auto-response message`
     };

     // Form data
     const formFields = {
       // Data fields to display in email
     };

     // Send to Formspree
     const response = await fetch("https://formspree.io/f/FORM_ID", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         ...formFields,
         ...metadata
       }),
     });
     ```

3. PartnerMatchingConfirmation.jsx:
   - Create success message
   - Add next steps info
   - Implement sharing options

#### Step 3: Formspree Integration
1. **Create Formspree Form**:
   - Client needs to create a dedicated form on Formspree.io
   - Obtain the form ID (format: `f/FORM_ID`)
   - Configure email notifications and templates in Formspree dashboard

2. **Form Testing**:
   - Test form submissions in development mode
   - Verify email delivery and formatting
   - Check auto-response functionality

### 4. Add "Club Feature Request" to Contact Form

1. Update contact form to include club feature option:
```bash
# Edit existing file
edit src/pages/ContactPage.jsx
```

2. Implementation:
   - Add "Feature My Club" to the service type dropdown
   - Include pricing information in the form or nearby
   - Modify form submission logic to handle club feature requests
   - Update auto-response for club feature inquiries

## UI/UX Guidelines

### Club Display
- Use card-based layout for featured clubs
- Each card should include:
  - Club name
  - Featured image
  - Location (city/province)
  - Number of courts
  - "View Details" button that opens modal
- Modal should include:
  - Photo gallery
  - Complete club details
  - Map
  - Contact information
  - Upcoming events (if applicable)
  - Close button

### Events Display
- Use chronological list view
- Group by month/date
- Each event card should include:
  - Event name
  - Date
  - Location
  - Event type (tournament, league, etc.)
  - "View Details" button that opens modal
- Modal should include:
  - Complete event details
  - Registration information
  - Link to featured club (if applicable)
  - Share button
  - Close button

## Testing

### Unit Tests
1. Create test files for each component
2. Test data validation
3. Test UI interactions
4. Test responsive behavior

### Integration Tests
1. Test navigation flow
2. Test form submissions
3. Test data filtering
4. Test map integration

### End-to-End Tests
1. Test complete user journeys
2. Test error scenarios
3. Test performance
4. Test accessibility

## Deployment

### Build Process
```bash
# Build production version
npm run build

# Test production build locally
npm run preview
```

### Deployment Steps
1. Merge to main branch
2. Run build process
3. Deploy to staging
4. Run tests
5. Deploy to production

## Timeline

### Week 1: Setup & Featured Clubs
- Day 1-2: Project setup and initial components
- Day 3-4: Featured clubs implementation with modal details
- Day 5: Testing and refinement

### Week 2: Events Calendar
- Day 1-2: Events components
- Day 3-4: Implementation and testing
- Day 5: Integration and refinement

### Week 3: Partner Matching & Integration
- Day 1-2: Form components
- Day 3: Implementation
- Day 4-5: Testing and final integration

## Quality Assurance

### Code Quality
- Follow ESLint configuration
- Maintain consistent code style
- Write comprehensive documentation
- Review pull requests

### Performance
- Optimize images
- Implement lazy loading for modals
- Monitor load times
- Test on various devices

### Accessibility
- Test with screen readers
- Ensure keyboard navigation
- Maintain ARIA labels
- Check color contrast

## Monitoring

### Error Tracking
- Implement error logging
- Set up monitoring alerts
- Track form submissions
- Monitor API usage

### Analytics
- Track page views
- Monitor user interactions
- Analyze form completions
- Track conversion rates 