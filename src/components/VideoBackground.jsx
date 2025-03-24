import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function VideoBackground({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.4)', children, type = 'section' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Check specifically for iOS
    const checkIOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
    };
    
    // Fix for iOS 100vh issue
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    checkIOS();
    setVhVariable();
    
    window.addEventListener('resize', setVhVariable);
    
    return () => {
      window.removeEventListener('resize', setVhVariable);
    };
  }, []);

  // Construct Vimeo video URL with parameters
  const videoUrl = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1${startTime ? `#t=${startTime}s` : ''}`;
  
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''} ${isIOS ? 'ios' : ''} ${isLoaded ? 'loaded' : 'loading'}`;

  return (
    <div 
      ref={containerRef}
      className={containerClassName}
      style={{ 
        position: 'relative',
        height: isIOS ? `calc(var(--vh, 1vh) * 100 * ${height.replace('vh', '') / 100})` : height,
        width: '100vw',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        left: 0,
        right: 0
      }}
    >
      <div 
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
      
      <style>
        {`
          .video-background-container {
            position: relative;
            overflow: hidden;
          }
          
          .video-background-iframe {
            border: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw !important;
            height: 56.25vw !important; /* maintain 16:9 aspect ratio */
            min-height: 100vh;
            min-width: 177.77vh; /* maintain 16:9 aspect ratio */
            transform: translate(-50%, -50%);
          }
          
          @media (max-width: 1280px) {
            .video-background-iframe {
              width: 200vw !important;
              height: 112.5vw !important;
              min-width: 355.54vh;
            }
          }
          
          @media (max-width: 770px) {
            .video-background-iframe {
              width: 250vw !important;
              height: 140.625vw !important;
              min-width: 444.425vh;
            }
          }
          
          .video-background-container.loading::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            z-index: 3;
          }
          
          .video-background-hero {
            height: 100vh;
            height: calc(var(--vh, 1vh) * 100);
          }
          
          .video-background-container.ios .video-background-iframe {
            transform: translate(-50%, -50%) scale(1.2);
          }
        `}
      </style>
      
      <iframe 
        ref={iframeRef}
        className="video-background-iframe"
        src={videoUrl}
        title="Background Video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
        style={{ 
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
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
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          boxSizing: 'border-box'
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