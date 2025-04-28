import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SubscribeModal({ isOpen, onClose }) {
  // The iframe HTML code
  const iframeHTML = `<iframe src="https://embeds.beehiiv.com/d7455a7d-5406-4269-baa1-a7ea2fcd88e1" data-test-id="beehiiv-embed" width="100%" height="320" frameborder="0" scrolling="no" style="border-radius: 4px; border: 2px solid #e5e7eb; margin: 0; background-color: transparent;"></iframe>`;
  
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
              <div 
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: iframeHTML }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubscribeModal; 