import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoBackground = ({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.5)', children, type = 'section' }) => {
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // More comprehensive mobile detection
  useEffect(() => {
    const checkDevice = () => {
      // Check if mobile
      const mobile = window.innerWidth <= 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check if iOS specifically
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
      setIsMobile(mobile);
      setIsIOS(ios);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Fix for iOS viewport height issues
  useEffect(() => {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // For mobile devices, we use a different approach
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${startTime}${endTime ? `&end=${endTime}` : ''}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1&fs=0&origin=${window.location.origin}&disablekb=1&cc_load_policy=0&annotation=0&title=0`;

  // Use CSS classes for better styling control
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''} ${isMobile ? 'mobile' : ''} ${isIOS ? 'ios' : ''}`;
  
  // Set inline styles for height when not a hero
  const containerStyle = {
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    height: type === 'hero' ? (isIOS ? 'calc(var(--vh, 1vh) * 100)' : '100vh') : height
  };

  // Set overlay style with the provided color
  const overlayStyle = {
    backgroundColor: overlayColor
  };

  return (
    <div className={containerClassName} style={containerStyle}>
      {!error && (
        <iframe
          src={videoUrl}
          className="video-background-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setError(true)}
          title="background-video"
          frameBorder="0"
        />
      )}
      <div className="video-background-overlay" style={overlayStyle}>
        {children}
      </div>
    </div>
  );
};

VideoBackground.propTypes = {
  videoId: PropTypes.string.isRequired,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  overlayColor: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['hero', 'section'])
};

export default VideoBackground; 