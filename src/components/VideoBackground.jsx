import React, { useState } from 'react';
import PropTypes from 'prop-types';

function VideoBackground({ 
  videoId, 
  startTime = 0,
  endTime,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  height = '100vh',
  children,
  fallbackColor = '#1a1a1a'
}) {
  const [isError, setIsError] = useState(false);
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&start=${startTime}${endTime ? `&end=${endTime}` : ''}&modestbranding=1&rel=0&enablejsapi=1`;

  return (
    <div style={{
      position: 'relative',
      height,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: fallbackColor
    }}>
      {!isError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}>
          <iframe
            src={videoUrl}
            title="Background video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onError={() => setIsError(true)}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: Math.max(100 * (16/9), 100) + 'vw',
              height: Math.max(100 * (9/16), 100) + 'vh',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          zIndex: 1
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
  overlayColor: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
  fallbackColor: PropTypes.string
};

export default VideoBackground; 