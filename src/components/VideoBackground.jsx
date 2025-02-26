import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function VideoBackground({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.4)', children, type = 'section' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isDeviceMobile = mobileRegex.test(userAgent);
      setIsMobile(isDeviceMobile);
      
      // Check specifically for iOS
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
    };
    
    // Fix for iOS 100vh issue
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    checkMobile();
    setVhVariable();
    
    // Update on resize
    window.addEventListener('resize', setVhVariable);
    
    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  // Construct video URL with parameters
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=${videoId}&start=${startTime}${endTime ? `&end=${endTime}` : ''}&version=3&vq=hd1080`;
  
  // Determine container class based on device type
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''} ${isMobile ? 'mobile' : ''} ${isIOS ? 'ios' : ''} ${isLoaded ? 'loaded' : 'loading'}`;

  return (
    <div 
      className={containerClassName}
      style={{ 
        position: 'relative',
        height: type === 'hero' ? height : height,
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div 
        className="video-background-overlay"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: overlayColor,
          zIndex: 1
        }}
      />
      <iframe 
        className="video-background-iframe"
        src={videoUrl}
        title="Background Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="eager"
        importance="high"
        onLoad={() => setIsLoaded(true)}
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
      />
      <div 
        style={{ 
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
}

VideoBackground.propTypes = {
  videoId: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  height: PropTypes.string,
  overlayColor: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['section', 'hero'])
};

export default VideoBackground; 