import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ParallaxSection({ 
  imageUrl, 
  height = '500px',
  children,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  speed = 0.5,
  className = ''
}) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      // Apply the transform only if the element is in or near the viewport
      const rect = parallaxRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      className={`parallax-container ${className}`}
      style={{ 
        position: 'relative',
        height,
        overflow: 'hidden'
      }}
    >
      <div
        ref={parallaxRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      />
      {overlayColor && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            zIndex: 2
          }}
        />
      )}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        {children}
      </div>
    </div>
  );
}

ParallaxSection.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  height: PropTypes.string,
  children: PropTypes.node,
  overlayColor: PropTypes.string,
  speed: PropTypes.number,
  className: PropTypes.string
};

export default ParallaxSection; 