import React from 'react';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--neutral-color)',
      padding: '20px 10px',
      textAlign: 'center',
      borderTop: '2px solid var(--secondary-color)'
    }}>
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
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Your Pickleball Guide Costa Rica. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;