import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  onLoad,
  style = {}
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageLoaded(true);
      onLoad?.();
    };
    img.onerror = () => setError(true);
  }, [src, onLoad]);

  if (error) {
    return <div className="image-error">Failed to load image</div>;
  }

  return (
    <div className={`image-container ${className}`} style={{ position: 'relative', ...style }}>
      {!imageLoaded && (
        <div className="image-skeleton" style={{
          backgroundColor: '#f0f0f0',
          width: width || '100%',
          height: height || '300px',
          borderRadius: '4px'
        }} />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onLoad={() => setImageLoaded(true)}
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          ...style
        }}
      />
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onLoad: PropTypes.func,
  style: PropTypes.object
};

export default OptimizedImage; 