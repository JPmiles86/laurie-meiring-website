import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function TestimonialsAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('blogAdminAuth');
    navigate('/');
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
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '64px 32px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <div style={{ fontSize: '6rem', marginBottom: '24px' }}>💬</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--primary-color)',
          margin: '0 0 16px 0'
        }}>
          Coming Soon
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-color)',
          margin: '0 0 32px 0',
          lineHeight: '1.6'
        }}>
          The testimonials management system is currently under development.
          Here you'll be able to add, edit, and organize client testimonials
          that will be displayed throughout the website.
        </p>

        <div style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #e9ecef',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: 'var(--primary-color)',
            margin: '0 0 16px 0'
          }}>
            Planned Features:
          </h3>
          <ul style={{
            textAlign: 'left',
            fontSize: '1.1rem',
            color: 'var(--text-color)',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>Add and edit client testimonials</li>
            <li>Photo and video testimonial support</li>
            <li>Rating and review management</li>
            <li>Testimonial categories and filtering</li>
            <li>Featured testimonials selection</li>
            <li>Moderation and approval workflow</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '16px 32px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Return to Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/blog')}
            style={{
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            Go to Blog Admin
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TestimonialsAdmin;