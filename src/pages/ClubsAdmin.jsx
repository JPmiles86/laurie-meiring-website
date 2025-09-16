import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = '/api';

function ClubsAdmin() {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('blogAdminAuth') === 'authenticated';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    location: {
      city: '',
      province: '',
      address: '',
      directions: '',
      coordinates: { lat: '', lng: '' }
    },
    contactInfo: {
      phone: '',
      email: '',
      website: '',
      instagram: ''
    },
    courtDetails: {
      indoorCourts: '',
      outdoorCourts: '',
      lightingAvailable: false,
      surfaceType: ''
    },
    playInfo: {
      openPlay: false,
      openPlaySchedule: '',
      reservationRequired: false,
      courtFees: ''
    },
    amenities: [],
    images: [],
    description: '',
    listingType: 'basic',
    upcomingEvents: []
  });

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/clubs`, {
        headers: {
          'X-Session-Auth': sessionStorage.getItem('blogAdminAuth') || ''
        }
      });
      const data = await response.json();
      if (data.success) {
        setClubs(data.clubs);
      }
    } catch (error) {
      showMessage('Error fetching clubs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('blogAdminAuth');
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: {
        city: '',
        province: '',
        address: '',
        directions: '',
        coordinates: { lat: '', lng: '' }
      },
      contactInfo: {
        phone: '',
        email: '',
        website: '',
        instagram: ''
      },
      courtDetails: {
        indoorCourts: '',
        outdoorCourts: '',
        lightingAvailable: false,
        surfaceType: ''
      },
      playInfo: {
        openPlay: false,
        openPlaySchedule: '',
        reservationRequired: false,
        courtFees: ''
      },
      amenities: [],
      images: [],
      description: '',
      listingType: 'basic',
      upcomingEvents: []
    });
    setEditingClub(null);
  };

  const openModal = (club = null) => {
    if (club) {
      setEditingClub(club);
      setFormData({
        name: club.name || '',
        location: club.location || {
          city: '',
          province: '',
          address: '',
          directions: '',
          coordinates: { lat: '', lng: '' }
        },
        contactInfo: club.contactInfo || {
          phone: '',
          email: '',
          website: '',
          instagram: ''
        },
        courtDetails: club.courtDetails || {
          indoorCourts: '',
          outdoorCourts: '',
          lightingAvailable: false,
          surfaceType: ''
        },
        playInfo: club.playInfo || {
          openPlay: false,
          openPlaySchedule: '',
          reservationRequired: false,
          courtFees: ''
        },
        amenities: club.amenities || [],
        images: club.images || [],
        description: club.description || '',
        listingType: club.listingType || 'basic',
        upcomingEvents: club.upcomingEvents || []
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    const items = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingClub
        ? `${API_BASE_URL}/clubs/${editingClub.id}?tenant=laurie-personal`
        : `${API_BASE_URL}/clubs?tenant=laurie-personal`;

      const method = editingClub ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Auth': sessionStorage.getItem('blogAdminAuth') || ''
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        showMessage(editingClub ? 'Club updated successfully!' : 'Club created successfully!');
        closeModal();
        fetchClubs();
      } else {
        showMessage(data.error || 'An error occurred', 'error');
      }
    } catch (error) {
      showMessage('Error saving club', 'error');
    }
  };

  const handleDelete = async (clubId) => {
    if (!confirm('Are you sure you want to delete this club?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/clubs/${clubId}?tenant=laurie-personal`, {
        method: 'DELETE',
        headers: {
          'X-Session-Auth': sessionStorage.getItem('blogAdminAuth') || ''
        }
      });

      const data = await response.json();

      if (data.success) {
        showMessage('Club deleted successfully!');
        fetchClubs();
      } else {
        showMessage('Error deleting club', 'error');
      }
    } catch (error) {
      showMessage('Error deleting club', 'error');
    }
  };

  const filteredClubs = clubs.filter(club =>
    club.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.location?.province?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background-color)',
      padding: '20px'
    }}>
      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: message.type === 'error' ? '#dc3545' : '#28a745',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        marginBottom: '32px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'var(--primary-color)',
              margin: '0 0 8px 0'
            }}>
              Clubs Management
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-color)',
              margin: 0
            }}>
              Manage featured clubs and partnerships
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openModal()}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Add Club
            </button>
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <input
          type="text"
          placeholder="Search clubs by name, city, or province..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </div>

      {/* Clubs List */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          marginBottom: '24px'
        }}>
          Clubs ({filteredClubs.length})
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid var(--primary-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '16px' }}>Loading clubs...</p>
          </div>
        ) : filteredClubs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>
              No clubs found. Click "Add Club" to create your first club.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {filteredClubs.map(club => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: '#fafafa'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)',
                    margin: 0
                  }}>
                    {club.name}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: club.listingType === 'featured' ? 'var(--secondary-color)' : '#6c757d',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {club.listingType}
                  </span>
                </div>

                <p style={{
                  color: 'var(--text-color)',
                  marginBottom: '8px'
                }}>
                  {club.location?.city}, {club.location?.province}
                </p>

                {club.description && (
                  <p style={{
                    color: 'var(--text-color)',
                    fontSize: '0.9rem',
                    marginBottom: '16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {club.description}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => openModal(club)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(club.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--primary-color)',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                {editingClub ? 'Edit Club' : 'Add New Club'}
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Basic Information
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                      Club Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange(null, 'name', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange(null, 'description', e.target.value)}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                      Listing Type
                    </label>
                    <select
                      value={formData.listingType}
                      onChange={(e) => handleInputChange(null, 'listingType', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="basic">Basic</option>
                      <option value="featured">Featured</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Location
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.location.city}
                        onChange={(e) => handleInputChange('location', 'city', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Province *
                      </label>
                      <input
                        type="text"
                        value={formData.location.province}
                        onChange={(e) => handleInputChange('location', 'province', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.location.address}
                      onChange={(e) => handleInputChange('location', 'address', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.location.coordinates.lat}
                        onChange={(e) => handleInputChange('location', 'coordinates', { ...formData.location.coordinates, lat: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.location.coordinates.lng}
                        onChange={(e) => handleInputChange('location', 'coordinates', { ...formData.location.coordinates, lng: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Contact Information
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Phone
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.phone}
                        onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.contactInfo.email}
                        onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.contactInfo.website}
                        onChange={(e) => handleInputChange('contactInfo', 'website', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Instagram
                      </label>
                      <input
                        type="url"
                        value={formData.contactInfo.instagram}
                        onChange={(e) => handleInputChange('contactInfo', 'instagram', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Court Details */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Court Details
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Indoor Courts
                      </label>
                      <input
                        type="number"
                        value={formData.courtDetails.indoorCourts}
                        onChange={(e) => handleInputChange('courtDetails', 'indoorCourts', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Outdoor Courts
                      </label>
                      <input
                        type="number"
                        value={formData.courtDetails.outdoorCourts}
                        onChange={(e) => handleInputChange('courtDetails', 'outdoorCourts', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                        Surface Type
                      </label>
                      <input
                        type="text"
                        value={formData.courtDetails.surfaceType}
                        onChange={(e) => handleInputChange('courtDetails', 'surfaceType', e.target.value)}
                        placeholder="e.g., Hardcourt"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600' }}>
                      <input
                        type="checkbox"
                        checked={formData.courtDetails.lightingAvailable}
                        onChange={(e) => handleInputChange('courtDetails', 'lightingAvailable', e.target.checked)}
                        style={{ marginRight: '8px' }}
                      />
                      Lighting Available
                    </label>
                  </div>
                </div>

                {/* Amenities */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Amenities
                  </h3>

                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                    Amenities (one per line)
                  </label>
                  <textarea
                    value={formData.amenities.join('\n')}
                    onChange={(e) => handleArrayChange('amenities', e.target.value)}
                    rows={4}
                    placeholder="e.g., Pro Shop&#10;Equipment Rental&#10;Showers&#10;Restaurant/Bar"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Images */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--primary-color)' }}>
                    Images
                  </h3>

                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>
                    Image URLs (one per line)
                  </label>
                  <textarea
                    value={formData.images.join('\n')}
                    onChange={(e) => handleArrayChange('images', e.target.value)}
                    rows={3}
                    placeholder="e.g., /clubs/club1/image1.jpg&#10;/clubs/club1/image2.jpg"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Form Actions */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'flex-end',
                  marginTop: '32px'
                }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'var(--secondary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    {editingClub ? 'Update Club' : 'Create Club'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ClubsAdmin;