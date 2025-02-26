import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VideoBackground = ({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.5)', children, type = 'section' }) => {
  const [error, setError] = useState(false);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${startTime}${endTime ? `&end=${endTime}` : ''}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1&fs=0&origin=${window.location.origin}&disablekb=1&cc_load_policy=0&annotation=0&title=0`;

  // Updated styles to ensure full coverage without white bars
  const videoStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    minWidth: '100%',
    minHeight: '100%'
  };

  // For wider screens, ensure the video is wide enough
  if (window.innerWidth / window.innerHeight > 16 / 9) {
    videoStyles.width = '100%';
    videoStyles.height = 'auto';
  } else {
    videoStyles.width = 'auto';
    videoStyles.height = '100%';
  }

  const containerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'black' // Add black background to avoid any white showing
  };

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw',
      height,
      overflow: 'hidden',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      backgroundColor: 'black' // Add black background to container as well
    }}>
      {!error && (
        <div style={containerStyles}>
          <iframe
            src={videoUrl}
            style={{
              ...videoStyles,
              pointerEvents: 'none',
              border: 'none',
              backgroundColor: 'black'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setError(true)}
            title="background-video"
          />
        </div>
      )}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: overlayColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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