import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { IMAGES } from '../constants/images';
import GradientDivider from './GradientDivider';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Temporary alert until Beehiiv integration
    alert('Coming soon! Subscribe functionality will be added shortly.');
    setEmail('');
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
            maxWidth: '400px',
            width: '100%',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '1.4rem',
              color: 'var(--primary-color)',
              marginBottom: '15px'
            }}>
              Stay Connected
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-color)',
              marginBottom: '20px',
              lineHeight: 1.5
            }}>
              Join our newsletter for pickleball tips and Costa Rica updates
            </p>
            <form onSubmit={handleSubscribe} style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '100%'
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: '2px solid var(--primary-color)',
                  fontSize: '0.95rem'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--neutral-color)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap'
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