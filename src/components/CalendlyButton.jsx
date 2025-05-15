import React from 'react';

function CalendlyButton({ children, buttonStyle }) {
  // Simple direct link to Calendly booking page
  const handleClick = () => {
    window.open('https://calendly.com/laurie-pickleball/60min', '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="button"
      style={buttonStyle}
    >
      {children}
    </button>
  );
}

export default CalendlyButton; 