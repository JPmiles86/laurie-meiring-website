import React from 'react';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';
import GradientDivider from './GradientDivider';

function Footer() {
  // Function to open Beehiiv in a new tab
  const openBeehiivSubscribe = () => {
    window.open('https://embeds.beehiiv.com/d7455a7d-5406-4269-baa1-a7ea2fcd88e1', '_blank');
  };
  
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
            <button
              onClick={openBeehiivSubscribe}
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                padding: '12px 20px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: 'auto'
              }}
            >
              Subscribe Now
            </button>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginTop: '15px' 
            }}>
              <span style={{ 
                fontSize: '0.8rem',
                color: '#777'
              }}>
                Powered by 
              </span>
              <img 
                src="/beehiiv-logo.png" 
                alt="Powered by Beehiiv" 
                style={{ 
                  height: '18px',
                  marginRight: '5px', marginLeft: '5px'
                }} 
              />
            </div>
          </div>

          {/* Instagram Link Section */}
          <div style={{
            marginBottom: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
          }}>
            <a 
              href="https://www.instagram.com/pickleballguide_cr" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                color: 'var(--text-color)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src="/Instagram_Glyph_Gradient.png" 
                alt="Instagram" 
                width="40" 
                height="40" 
                style={{ marginBottom: '8px' }}
              />
              <span style={{ fontSize: '1rem', fontWeight: '500' }}>Follow me on Instagram</span>
            </a>
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