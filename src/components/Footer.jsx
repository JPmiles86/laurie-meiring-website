import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
      <p>&copy; {new Date().getFullYear()} Laurie Meiring Ventures. All Rights Reserved. {/* Placeholder Footer Text */}</p>
    </footer>
  );
}

export default Footer;