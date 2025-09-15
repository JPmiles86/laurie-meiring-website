import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
import MediaUploader from '../components/MediaUploader';

function TestimonialsAdmin() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    image: ''
  });

  const handleLogout = () => {
    sessionStorage.removeItem('blogAdminAuth');
    navigate('/');
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/testimonials');
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        setError('Failed to fetch testimonials');
      }
    } catch (err) {
      setError('Error fetching testimonials: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        text: testimonial.text,
        rating: testimonial.rating,
        image: testimonial.image || ''
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: '',
        text: '',
        rating: 5,
        image: ''
      });
    }
    setShowModal(true);
    clearMessages();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      text: '',
      rating: 5,
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (image) => {
    setFormData(prev => ({
      ...prev,
      image: image.url
    }));
    setShowImageUploader(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!formData.name.trim() || !formData.text.trim()) {
      setError('Name and testimonial text are required');
      return;
    }

    setSubmitting(true);

    try {
      const url = editingTestimonial
        ? `/api/testimonials/${editingTestimonial.id}`
        : '/api/testimonials';

      const method = editingTestimonial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        closeModal();
        fetchTestimonials();
      } else {
        setError(data.error || 'Failed to save testimonial');
      }
    } catch (err) {
      setError('Error saving testimonial: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      const response = await fetch(`/api/testimonials/${testimonialToDelete.id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Testimonial deleted successfully!');
        setShowDeleteModal(false);
        setTestimonialToDelete(null);
        fetchTestimonials();
      } else {
        setError('Failed to delete testimonial');
      }
    } catch (err) {
      setError('Error deleting testimonial: ' + err.message);
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={interactive && onChange ? () => onChange(star) : undefined}
            style={{
              background: 'none',
              border: 'none',
              cursor: interactive ? 'pointer' : 'default',
              fontSize: '1.2rem',
              color: star <= rating ? '#FFD700' : '#ccc',
              padding: '2px'
            }}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background-color)',
      padding: '20px'
    }}>
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
              Testimonials Management
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-color)',
              margin: 0
            }}>
              Manage client testimonials and reviews
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
              Add New Testimonial
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

      {/* Messages */}
      {error && (
        <div style={{
          backgroundColor: '#fee',
          color: '#c33',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#efe',
          color: '#363',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #cfc'
        }}>
          {success}
        </div>
      )}

      {/* Testimonials List */}
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
          Current Testimonials ({testimonials.length})
        </h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-color)' }}>
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-color)' }}>
            No testimonials found. Add your first testimonial to get started!
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '24px'
          }}>
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e9ecef'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {testimonial.image && (
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      border: '2px solid var(--primary-color)'
                    }}>
                      <OptimizedImage
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)',
                    margin: '0 0 8px 0'
                  }}>
                    {testimonial.name}
                  </h3>
                  {renderStars(testimonial.rating)}
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--text-color)',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e9ecef',
                  paddingTop: '16px'
                }}>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#6c757d'
                  }}>
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openModal(testimonial)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(testimonial)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '600px',
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
                marginBottom: '24px'
              }}>
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Client name"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>
                    Testimonial Text *
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                    placeholder="Client testimonial text..."
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>
                    Rating
                  </label>
                  {renderStars(formData.rating, true, (rating) => {
                    setFormData(prev => ({ ...prev, rating }));
                  })}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-color)',
                    marginBottom: '8px'
                  }}>
                    Profile Image
                  </label>
                  {formData.image ? (
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--primary-color)',
                        marginBottom: '8px'
                      }}>
                        <OptimizedImage
                          src={formData.image}
                          alt="Preview"
                          width={80}
                          height={80}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowImageUploader(true)}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      Upload Image
                    </button>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
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
                      fontSize: '1rem'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: submitting ? '#ccc' : 'var(--secondary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    {submitting ? 'Saving...' : (editingTestimonial ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '100%',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#dc3545',
                marginBottom: '16px'
              }}>
                Delete Testimonial
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-color)',
                marginBottom: '24px'
              }}>
                Are you sure you want to delete the testimonial from {testimonialToDelete?.name}? This action cannot be undone.
              </p>
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Uploader Modal */}
      {showImageUploader && (
        <MediaUploader
          onImageSelect={handleImageSelect}
          onClose={() => setShowImageUploader(false)}
        />
      )}
    </div>
  );
}

export default TestimonialsAdmin;