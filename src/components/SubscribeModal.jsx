import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SubscribeModal({ isOpen, onClose }) {
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
              maxWidth: '500px',
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
                padding: '5px',
                zIndex: 2
              }}
            >
              ×
            </button>

            <div style={{ 
              width: '100%',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                color: 'var(--primary-color)',
                marginTop: '0',
                marginBottom: '15px',
                fontSize: '1.8rem' 
              }}>
                Subscribe to Our Newsletter
              </h2>
              <p style={{ 
                marginBottom: '20px',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Stay up to date with the latest pickleball news, events, and tips in Costa Rica!
              </p>
              <form
                action="https://formspree.io/f/mjnqlnyz"
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  style={{
                    padding: '12px 15px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubscribeModal; 