import React from 'react';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';
import GradientDivider from './GradientDivider';

function Footer() {
  return (
    <>
      <GradientDivider />
      <footer style={{ 
        backgroundColor: 'var(--neutral-color)',
        padding: '40px 15px 20px',
        textAlign: 'center',
        marginTop: 0
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          {/* Newsletter Section */}
          <div style={{
            maxWidth: '500px',
            width: '100%',
            marginBottom: '20px',
            padding: '15px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: 'var(--primary-color)' }}>
              Subscribe to Our Newsletter
            </h3>
            <p style={{ marginBottom: '20px', fontSize: '1rem' }}>
              Get the latest pickleball news, events, and tips in Costa Rica!
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

          <div style={{ 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            height: '150px',
            overflow: 'hidden'
          }}> 
            <OptimizedImage
              src={IMAGES.LOGO.ROUND}
              alt="Your Pickleball Guide Costa Rica"
              width={150}
              height={150}
              style={{
                objectFit: 'contain',
                maxWidth: '150px',
                maxHeight: '150px',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                border: '2px solid var(--secondary-color)'
              }}
            />
          </div>
          <p style={{ margin: 0, color: 'var(--text-color)', opacity: 0.8 }}>© {new Date().getFullYear()} Your Pickleball Guide Costa Rica. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;