import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

// Accept onMarkerClick prop
const ClubMap = ({ clubs, apiKey, isMobile, onMarkerClick }) => {
  // Use internal state only for the InfoWindow visibility, not the selected club itself
  const [infoWindowAnchor, setInfoWindowAnchor] = useState(null);
  const [infoWindowClub, setInfoWindowClub] = useState(null);

  // Default center (e.g., Costa Rica center)
  const defaultCenter = { lat: 9.7489, lng: -83.7534 };
  const defaultZoom = 7;

  // Ensure clubs have valid coordinates
  const validClubs = clubs?.filter(club => 
    club?.location?.coordinates?.lat != null && 
    club?.location?.coordinates?.lng != null
  ) || [];

  // Use useCallback for the marker click handler
  const handleMarkerClick = useCallback((club, marker) => {
    if (onMarkerClick) {
      onMarkerClick(club); // Call the parent handler to set the selected club for the modal
    }
    // Set anchor for InfoWindow (optional, if you want an info window on map click too)
    // setInfoWindowClub(club);
    // setInfoWindowAnchor(marker);
  }, [onMarkerClick]);

  // Close info window (if used)
  const handleInfoWindowClose = () => {
    setInfoWindowAnchor(null);
    setInfoWindowClub(null);
  };

  // Function to create marker instances
  const createMarker = (club) => {
    return (
      <AdvancedMarker
        key={club.id}
        position={club.location.coordinates}
        onClick={({ domEvent, marker }) => handleMarkerClick(club, marker)} // Attach handler here
        title={club.name}
      >
        {/* Use Pin for custom styling */}
        <Pin 
          background={club.listingType === 'featured' ? 'var(--secondary-color)' : 'var(--primary-color)'} 
          glyphColor={'white'}
          borderColor={club.listingType === 'featured' ? 'var(--accent-color)' : 'var(--primary-color)'}
        />
      </AdvancedMarker>
    );
  };

  if (!apiKey) {
    return <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '8px' }}>Google Maps API Key is missing. Map cannot be loaded.</div>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: isMobile ? '400px' : '500px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #ccc' }}>
        <Map
          mapId="pickleballClubMapCR" // Unique Map ID
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true} // Keep UI simple
        >
          {validClubs.map(createMarker)}

          {/* Optional: InfoWindow if needed for map interactions */}
          {/* {infoWindowAnchor && infoWindowClub && (
            <InfoWindow
              anchor={infoWindowAnchor}
              onCloseClick={handleInfoWindowClose}
            >
              <div style={{ maxWidth: '200px', fontSize: '0.9rem' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', color: 'var(--primary-color)' }}>{infoWindowClub.name}</h4>
                <p style={{ margin: '0 0 5px 0' }}>{infoWindowClub.location.city}</p>
                {infoWindowClub.listingType === 'featured' && 
                  <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: 'var(--primary-color)' }}>⭐ Featured</p>
                }
              </div>
            </InfoWindow>
          )} */}
        </Map>
      </div>
    </APIProvider>
  );
};

export default ClubMap; 