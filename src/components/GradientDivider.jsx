import React from 'react';

/**
 * A reusable gradient divider component that creates a horizontal line
 * with a fade effect from transparent to a color and back to transparent.
 */
function GradientDivider() {
  return (
    <div style={{
      width: '100%',
      height: '3px',
      background: 'linear-gradient(to right, transparent, var(--secondary-color), transparent)',
      margin: '0 auto 0',
      maxWidth: '800px'
    }}></div>
  );
}

export default GradientDivider; 