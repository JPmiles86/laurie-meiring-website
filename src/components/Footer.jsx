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
            marginBottom: '20px'
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
                backgroundColor: 'transparent'
              }}
            />
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