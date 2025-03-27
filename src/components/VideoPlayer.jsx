import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function VideoPlayer({ videoId, mobileVideoId, title, description }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const playerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Fetch Vimeo thumbnail
    const fetchThumbnail = async () => {
      try {
        // Determine which video ID to use for thumbnail
        const activeVideoId = isMobile && mobileVideoId ? mobileVideoId : videoId;
        const response = await fetch(`https://vimeo.com/api/v2/video/${activeVideoId}.json`);
        const data = await response.json();
        setThumbnailUrl(data[0].thumbnail_large);
      } catch (error) {
        console.error('Error fetching Vimeo thumbnail:', error);
      }
    };

    fetchThumbnail();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videoId, mobileVideoId, isMobile]);

  const handlePlayClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  // Determine which video ID to use
  const activeVideoId = isMobile && mobileVideoId ? mobileVideoId : videoId;

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
            src={thumbnailUrl}
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
                marginLeft: isMobile ? '6px' : '8px'
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
          paddingBottom: isMobile && mobileVideoId ? '177.78%' : '56.25%', // 9:16 aspect ratio for mobile, 16:9 for desktop
          height: 0,
          overflow: 'hidden',
          borderRadius: '12px'
        }}>
          <iframe
            ref={playerRef}
            width="100%"
            height="100%"
            src={`https://player.vimeo.com/video/${activeVideoId}?autoplay=1&byline=0&title=0`}
            title={title || "Vimeo video player"}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
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