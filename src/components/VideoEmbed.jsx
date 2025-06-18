import React from 'react';

const VideoEmbed = ({ videoId, platform, isMobile }) => {
  if (platform === 'youtube') {
    return (
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        margin: '2rem auto',
        width: isMobile ? '100%' : '80%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      </div>
    );
  }
  
  if (platform === 'vimeo') {
    return (
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        margin: '2rem auto',
        width: isMobile ? '100%' : '80%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#000'
      }}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?color=ffffff&title=0&byline=0&portrait=0`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo video player"
        />
      </div>
    );
  }
  
  return null;
};

export default VideoEmbed;