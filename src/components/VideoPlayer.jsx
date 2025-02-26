import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function VideoPlayer({ videoId, title, description }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const playerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlayClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  return (
    <div className="video-player-container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      position: 'relative',
      width: isMobile ? '100%' : 'auto'
    }}>
      {!isPlaying ? (
        <div 
          style={{ 
            position: 'relative',
            cursor: 'pointer',
            borderRadius: '12px',
            overflow: 'hidden'
          }}
          onClick={handlePlayClick}
        >
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title || "Video thumbnail"}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '12px'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            padding: isMobile ? '0 15px' : '0'
          }}>
            <motion.div 
              className="play-button"
              whileHover={{ scale: 1.1 }}
              style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                backgroundColor: 'var(--primary-color)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{
                width: 0,
                height: 0,
                borderTop: isMobile ? '12px solid transparent' : '15px solid transparent',
                borderBottom: isMobile ? '12px solid transparent' : '15px solid transparent',
                borderLeft: isMobile ? '20px solid white' : '25px solid white',
                marginLeft: isMobile ? '6px' : '8px' // Offset to center the triangle
              }} />
            </motion.div>
            {title && (
              <h3 style={{ 
                color: 'white', 
                margin: '0 0 10px 0',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                textAlign: 'center'
              }}>
                {title}
              </h3>
            )}
            {description && (
              <p style={{ 
                color: 'white', 
                margin: 0,
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: isMobile ? '1rem' : '1.1rem',
                maxWidth: '90%',
                textAlign: 'center'
              }}>
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ 
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: '12px'
        }}>
          <iframe
            ref={playerRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '12px'
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer; 