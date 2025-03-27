import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './VideoBackground.css';

function VideoBackground({ 
  videoId, 
  mobileVideoId,
  startTime = 0, 
  endTime = 0, 
  mobileStartTime,
  height = '100vh', 
  overlayColor = 'rgba(0, 0, 0, 0.4)', 
  children, 
  type = 'section' 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check specifically for iOS
    const checkIOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
    };
    
    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Fix for iOS 100vh issue
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    checkIOS();
    checkMobile();
    setVhVariable();
    
    window.addEventListener('resize', () => {
      setVhVariable();
      checkMobile();
    });
    
    return () => {
      window.removeEventListener('resize', setVhVariable);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // SOLUTION 5: Direct approach with inline styles
  // Determine which video ID to use
  const activeVideoId = isMobile && mobileVideoId ? mobileVideoId : videoId;
  
  // Determine which start time to use
  const activeStartTime = isMobile && mobileStartTime !== undefined ? mobileStartTime : startTime;
  
  // Base URL parameters
  const baseParams = "background=1&autoplay=1&loop=1&byline=0&title=0&muted=1";
  
  // More specific parameters for mobile
  const qualityParams = isMobile && mobileVideoId 
    ? "&quality=1080p&transparent=0&dnt=1&portrait=0&autopause=0&controls=0&responsive=1" 
    : "&quality=1080p";
  
  const timeParam = activeStartTime ? `#t=${activeStartTime}s` : '';
  
  // Construct Vimeo video URL with parameters
  const videoUrl = `https://player.vimeo.com/video/${activeVideoId}?${baseParams}${qualityParams}${timeParam}`;
  
  // Determine CSS classes
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''} ${isIOS ? 'ios' : ''} ${isMobile ? 'mobile' : ''}`;
  
  // Simple container height style
  const containerStyle = {
    height: isIOS ? `calc(var(--vh, 1vh) * 100 * ${height.replace('vh', '') / 100})` : height
  };

  return (
    <div 
      ref={containerRef}
      className={containerClassName}
      style={containerStyle}
    >
      {/* Video container with specific desktop/mobile classes */}
      <div className={`video-container ${isMobile && mobileVideoId ? 'mobile-container' : 'desktop-container'}`}>
        <iframe 
          className={isLoaded ? 'loaded' : ''}
          src={videoUrl}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
          style={isMobile && mobileVideoId ? {
            position: 'absolute',
            width: '110%', 
            height: '110%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          } : {}}
        />
      </div>
      
      {/* Overlay */}
      <div 
        className="video-background-overlay"
        style={{ backgroundColor: overlayColor }}
      />
      
      {/* Content */}
      <div className="video-background-content">
        {children}
      </div>
    </div>
  );
}

VideoBackground.propTypes = {
  videoId: PropTypes.string.isRequired,
  mobileVideoId: PropTypes.string,
  startTime: PropTypes.number,
  mobileStartTime: PropTypes.number,
  endTime: PropTypes.number,
  height: PropTypes.string,
  overlayColor: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['section', 'hero'])
};

export default VideoBackground; 