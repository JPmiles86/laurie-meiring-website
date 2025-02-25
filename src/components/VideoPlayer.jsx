import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function VideoPlayer({ videoId, title, description }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const playerRef = useRef(null);

  const handlePlayClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      position: 'relative'
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
            borderRadius: '12px'
          }}>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              style={{
                width: '80px',
                height: '80px',
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
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderLeft: '25px solid white',
                marginLeft: '8px' // Offset to center the triangle
              }} />
            </motion.div>
            {title && (
              <h3 style={{ 
                color: 'white', 
                margin: '0 0 10px 0',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1.8rem'
              }}>
                {title}
              </h3>
            )}
            {description && (
              <p style={{ 
                color: 'white', 
                margin: 0,
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                fontSize: '1.1rem',
                maxWidth: '80%',
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