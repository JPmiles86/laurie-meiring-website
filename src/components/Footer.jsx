import React from 'react';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--neutral-color)',
      padding: '40px 20px',
      textAlign: 'center',
      borderTop: '2px solid var(--secondary-color)'
    }}>
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '75px',
        overflow: 'hidden'
      }}>
        <OptimizedImage
          src={IMAGES.LOGO.TEXT}
          alt="Your Pickleball Guide Costa Rica"
          width={180}
          height={75}
          style={{
            objectFit: 'contain',
            maxWidth: '180px',
            maxHeight: '75px',
            backgroundColor: 'transparent'
          }}
        />
      </div>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Your Pickleball Guide Costa Rica. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;