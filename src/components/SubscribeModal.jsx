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
              height: '320px',
              position: 'relative'
            }}>
              <iframe 
                src="https://embeds.beehiiv.com/d7455a7d-5406-4269-baa1-a7ea2fcd88e1" 
                data-test-id="beehiiv-embed" 
                width="100%" 
                height="320" 
                frameBorder="0" 
                scrolling="no" 
                style={{
                  borderRadius: '4px',
                  border: '2px solid #e5e7eb',
                  margin: 0,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubscribeModal; 