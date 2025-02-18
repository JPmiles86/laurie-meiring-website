import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--neutral-color)',
      padding: '20px',
      textAlign: 'center',
      borderTop: '2px solid var(--secondary-color)'
    }}>
      <p style={{ margin: 0 }}>© 2025 Laurie Meiring Ventures. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;