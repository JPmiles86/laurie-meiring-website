import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Temporary alert until Beehiiv integration
    alert('Coming soon! Subscribe functionality will be added shortly.');
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    
    // Close modal after success message
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 1000
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            style={{
              backgroundColor: 'var(--neutral-color)',
              borderRadius: '12px',
              padding: '30px',
              width: '90%',
              maxWidth: '400px',
              position: 'relative',
              boxSizing: 'border-box',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--text-color)',
                opacity: 0.6,
                padding: '5px'
              }}
            >
              ×
            </button>

            <div style={{ 
              textAlign: 'center', 
              marginBottom: '25px',
              paddingTop: '10px'
            }}>
              <h2 style={{
                fontSize: '2rem',
                color: 'var(--primary-color)',
                marginBottom: '15px'
              }}>
                Join Our Pickleball Community
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-color)',
                lineHeight: 1.6,
                marginBottom: '10px'
              }}>
                Get exclusive updates, training tips, and Costa Rica pickleball news delivered straight to your inbox.
              </p>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  backgroundColor: '#e6f4ea',
                  borderRadius: '8px',
                  color: '#1e8e3e'
                }}
              >
                <h3 style={{ marginBottom: '10px' }}>Thank You!</h3>
                <p>You've been successfully subscribed.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ 
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  width: '100%'
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      borderRadius: '25px',
                      border: '2px solid var(--primary-color)',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      borderRadius: '25px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'var(--neutral-color)',
                      border: 'none',
                      fontSize: '1rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      boxSizing: 'border-box'
                    }}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </button>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-color)',
                  opacity: 0.8,
                  textAlign: 'center',
                  margin: 0
                }}>
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubscribeModal; 