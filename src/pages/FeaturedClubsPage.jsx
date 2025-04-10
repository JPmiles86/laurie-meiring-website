import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { clubs as clubsData } from '../data/clubs';
import FeaturedClubList from '../components/FeaturedClubList';
import BasicClubList from '../components/BasicClubList';
import ClubFilter from '../components/ClubFilter';
import ClubMap from '../components/ClubMap';
import ClubModal from '../components/ClubModal';

// !! IMPORTANT: Moved API Key loading to use environment variables !!
// Ensure you have VITE_GOOGLE_MAPS_API_KEY set in your .env file
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

const FeaturedClubsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [clubs, setClubs] = useState([]); // Holds all clubs from data
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [basicClubs, setBasicClubs] = useState([]); // Unfiltered basic clubs
  const [filteredMapClubs, setFilteredMapClubs] = useState([]); // Clubs filtered for the map (can include featured)
  const [currentFilters, setCurrentFilters] = useState({ province: '' });
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initialize clubs data on mount
    const allClubsData = clubsData; // Assuming clubsData is correctly imported
    setClubs(allClubsData);

    const featured = allClubsData.filter(club => club.listingType === 'featured');
    const basic = allClubsData.filter(club => club.listingType !== 'featured');

    setFeaturedClubs(featured);
    setBasicClubs(basic);
    setFilteredMapClubs(allClubsData); // Initially, map shows all clubs

  }, []); // Runs once on component mount

  // Effect to apply filters when currentFilters or base lists change
  useEffect(() => {
    let tempFilteredMap = clubs; // Start map filter with ALL clubs

    if (currentFilters.province) {
      tempFilteredMap = tempFilteredMap.filter(club => club.location?.province === currentFilters.province);
    }
    // Add city/other filter logic here later if needed

    setFilteredMapClubs(tempFilteredMap); // Update map's filtered list

  }, [currentFilters, clubs]); // Depend only on filters and all clubs

  const handleFilterChange = (filterName, value) => {
    setCurrentFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const handleClubSelect = (club) => {
    setSelectedClub(club);
  };
  
  const handleCloseModal = () => {
    setSelectedClub(null);
  };

  // Extract unique provinces for the filter dropdown from all clubs
  const uniqueProvinces = Array.from(new Set(clubsData.map(club => club.location?.province).filter(Boolean))).sort();

  return (
    <div style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0
      }}>
      <Helmet>
        <title>Pickleball Clubs Costa Rica | Map & Directory</title>
        <meta name="description" content="Find featured and local pickleball clubs across Costa Rica using our interactive map and directory. Filter clubs by province." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section text-center" style={{ padding: '3rem 0', backgroundColor: 'var(--secondary-color)' }}>
        <h1 style={{ color: 'var(--neutral-color)' }}>Discover Pickleball Clubs in Costa Rica</h1>
        <p style={{ color: 'var(--neutral-color)' }}>Explore featured clubs and find local courts using our map and directory.</p>
      </section>

      {/* Laurie's Review Section - REMOVED */}
      {/* 
      <motion.section 
        // ... section content removed ...
      </motion.section>
      */}

      {/* Featured Clubs Section */}
      {featuredClubs.length > 0 && (
        <section className="featured-clubs-highlight-section" style={{ backgroundColor: 'var(--neutral-color)', padding: '3rem 0' }}>
          <div className="content-container">
            <h2 className="text-center" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center' }}>⭐ Featured Clubs ⭐</h2>
            <FeaturedClubList clubs={featuredClubs} onClubSelect={handleClubSelect} />
          </div>
        </section>
      )}

      {/* Map Section */}
      <section className="clubs-map-section" style={{ padding: '3rem 0' }}>
          <div className="content-container">
             <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary-color)' }}>Club Locations Map</h3>
             <ClubMap
               clubs={filteredMapClubs}
               apiKey={GOOGLE_MAPS_API_KEY}
               isMobile={isMobile}
               onMarkerClick={handleClubSelect}
             />
          </div>
      </section>

      {/* Filter and Basic Clubs List Section */}
      <section className="all-clubs-section" style={{ padding: '3rem 0', backgroundColor: 'var(--background-color)' }}>
        <div className="content-container">
          <h2 className="text-center" style={{ color: 'var(--primary-color)', marginBottom: '1.5rem', textAlign: 'center' }}>Find a Club Near You</h2>

          {/* Filter Component */}
          <div style={{ marginBottom: '2rem' }}>
            <ClubFilter
              provinces={uniqueProvinces}
              currentFilters={currentFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Basic Club List */}
          {filteredMapClubs.length > 0 ? (
              <BasicClubList clubs={filteredMapClubs} onClubSelect={handleClubSelect} isMobile={isMobile} />
          ) : (
              <p className="text-center" style={{ fontStyle: 'italic', marginTop: '2rem', color: 'var(--text-secondary-color)' }}>No clubs match the current filter criteria.</p>
          )}

          {/* Call to Action to Feature a Club */}
           <div className="cta-section text-center" style={{ margin: '3rem auto', padding: '2rem', backgroundColor: 'var(--background-alt-color)', borderRadius: '8px', maxWidth: '700px', textAlign: 'center' }}>
             <h3 style={{ color: 'var(--primary-color)' }}>Want to Feature Your Club?</h3>
             <p>
               Gain premium visibility on our map and directory.
               <br />
               Click below to learn more about the benefits.
             </p>
             <Link
                to="/feature-your-club"
                className="button"
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--neutral-color)',
                  padding: '12px 25px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: 'none'
                }}
              >
                Learn How to Get Featured
              </Link>
           </div>
        </div>
      </section>

      {/* Render Modal at Page Level */}
      {selectedClub && (
        <ClubModal 
          club={selectedClub} 
          onClose={handleCloseModal} 
        />
      )}

    </div>
  );
};

export default FeaturedClubsPage;