import React, { useState } from 'react';
import PropTypes from 'prop-types';

const VideoBackground = ({ videoId, startTime = 0, endTime = 0, height = '100vh', overlayColor = 'rgba(0, 0, 0, 0.5)', children, type = 'section' }) => {
  const [error, setError] = useState(false);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&start=${startTime}${endTime ? `&end=${endTime}` : ''}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1&fs=0&origin=${window.location.origin}&disablekb=1&cc_load_policy=0&annotation=0&title=0`;

  // Use CSS classes for better styling control
  const containerClassName = `video-background-container ${type === 'hero' ? 'video-background-hero' : ''}`;
  
  // Set inline styles for height when not a hero
  const containerStyle = {
    marginLeft: 'calc(-50vw + 50%)',
    marginRight: 'calc(-50vw + 50%)',
    height: type === 'hero' ? '100vh' : height
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