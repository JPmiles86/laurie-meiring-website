import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function VideoBackground({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.4)', children, type = 'section' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

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
    
    // Calculate video dimensions to cover the container completely
    const calculateDimensions = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate dimensions based on both container and window
      const maxWidth = Math.max(containerWidth, windowWidth);
      const maxHeight = Math.max(containerHeight, windowHeight);
      
      // Use moderate scaling for desktop and more aggressive for mobile
      // This prevents excessive zoom on desktop while ensuring coverage on mobile
      let baseScale = isMobile ? 2.0 : 1.1;
      
      // Additional scaling based on device
      let deviceScale = 1.0;
      if (isMobile) {
        deviceScale = isIOS ? 2.5 : 2.0;
      }
      
      // Different scaling approaches based on aspect ratio
      const containerAspectRatio = containerWidth / containerHeight;
      const videoAspectRatio = 16 / 9; // Standard YouTube aspect ratio
      
      let newWidth, newHeight;
      
      if (containerAspectRatio > videoAspectRatio) {
        // Container is wider than the video - scale based on width
        newWidth = maxWidth * baseScale * deviceScale;
        newHeight = (newWidth / videoAspectRatio);
      } else {
        // Container is taller than the video - scale based on height
        newHeight = maxHeight * baseScale * deviceScale;
        newWidth = (newHeight * videoAspectRatio);
      }
      
      // Set a maximum scale for desktop to prevent extreme zoom
      if (!isMobile) {
        newWidth = Math.min(newWidth, windowWidth * 1.3);
        newHeight = Math.min(newHeight, windowHeight * 1.3);
      }
      
      // Ensure dimensions are never smaller than the viewport
      newWidth = Math.max(newWidth, windowWidth * (isMobile ? 2.0 : 1.05));
      newHeight = Math.max(newHeight, windowHeight * (isMobile ? 2.0 : 1.05));
      
      setDimensions({
        width: `${newWidth}px`,
        height: `${newHeight}px`
      });
    };
    
    // Calculate dimensions immediately
    calculateDimensions();
    
    // Recalculate on various events
    window.addEventListener('resize', calculateDimensions);
    window.addEventListener('orientationchange', calculateDimensions);
    window.addEventListener('resize', setVhVariable);
    
    // Also set a timer to recalculate after a delay
    const recalcTimer = setTimeout(calculateDimensions, 1000);
    
    return () => {
      window.removeEventListener('resize', calculateDimensions);
      window.removeEventListener('orientationchange', calculateDimensions);
      window.removeEventListener('resize', setVhVariable);
      clearTimeout(recalcTimer);
    };
  }, [isMobile, isIOS, isLoaded]);

  // Construct video URL with parameters
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=${videoId}&start=${startTime}${endTime ? `&end=${endTime}` : ''}&version=3&vq=hd1080`;
  
  // Determine container class based on device type
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''} ${isMobile ? 'mobile' : ''} ${isIOS ? 'ios' : ''} ${isLoaded ? 'loaded' : 'loading'}`;

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
          
          /* Mobile optimizations */
          @media (max-width: 768px) {
            .video-background-container {
              height: ${type === 'hero' ? '100vh' : '70vh'} !important;
              height: ${type === 'hero' ? 'calc(var(--vh, 1vh) * 100)' : 'calc(var(--vh, 1vh) * 70)'} !important;
              width: 100vw !important;
              max-width: 100vw !important;
              margin-left: calc(-50vw + 50%) !important;
              margin-right: calc(-50vw + 50%) !important;
              left: 0 !important;
              right: 0 !important;
              padding: 0 !important;
            }
            
            .video-background-container h1 {
              font-size: 2.5rem !important;
              padding: 0 15px !important;
              margin-bottom: 10px !important;
            }
            
            .video-background-container h2 {
              font-size: 2rem !important;
              padding: 0 15px !important;
              margin-bottom: 10px !important;
            }
            
            .video-background-container p {
              font-size: 1.1rem !important;
              padding: 0 15px !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
          
          @media (max-width: 480px) {
            .video-background-iframe {
              min-width: 300vw !important;
              min-height: 300vh !important;
            }
            
            /* Stack buttons on very small screens */
            .video-background-container [style*="display: flex"] {
              flex-direction: column !important;
              gap: 10px !important;
            }
          }
        `}
      </style>
      
      <iframe 
        ref={iframeRef}
        className="video-background-iframe"
        src={videoUrl}
        title="Background Video"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => {
          setIsLoaded(true);
          
          // Recalculate dimensions after iframe is loaded
          if (containerRef.current && iframeRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calculate aspect ratio to maintain 16:9
            const videoRatio = 16 / 9;
            const containerRatio = containerWidth / containerHeight;
            
            let newWidth, newHeight;
            
            if (containerRatio > videoRatio) {
              // Container is wider than video aspect ratio
              newWidth = containerWidth;
              newHeight = containerWidth / videoRatio;
            } else {
              // Container is taller than video aspect ratio
              newHeight = containerHeight;
              newWidth = containerHeight * videoRatio;
            }
            
            // Ensure the video is always large enough to cover the container
            newWidth = Math.max(newWidth, windowWidth * (isMobile ? 2.0 : 1.05));
            newHeight = Math.max(newHeight, windowHeight * (isMobile ? 2.0 : 1.05));
            
            setDimensions({
              width: `${newWidth}px`,
              height: `${newHeight}px`
            });
          }
        }}
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: dimensions.width,
          height: dimensions.height,
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          minWidth: isMobile ? '250vw' : '100vw', // CSS fallback if JS calculations fail
          minHeight: isMobile ? '250vh' : '100vh' // CSS fallback if JS calculations fail
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
          padding: isMobile ? '0 15px' : '0 20px',
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