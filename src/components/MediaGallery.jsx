import React, { useState, useEffect } from 'react';
import { Grid, List, Search, X, Image as ImageIcon, Calendar, FileText } from 'lucide-react';
import { api } from '../services/api';
import './MediaGallery.css';

const MediaGallery = ({ onImageSelect, onClose, showSelection = true }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch media from server
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.get('/media/list');
      if (response.success) {
        setMedia(response.media || []);
      } else {
        setError('Failed to load media library');
      }
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Failed to connect to media library');
    } finally {
      setLoading(false);
    }
  };

  // Filter media based on search
  const filteredMedia = media.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.filename?.toLowerCase().includes(searchLower) ||
      item.alt?.toLowerCase().includes(searchLower) ||
      item.caption?.toLowerCase().includes(searchLower)
    );
  });

  // Handle image selection
  const handleSelect = (image) => {
    if (showSelection) {
      setSelectedImage(image);
    } else if (onImageSelect) {
      onImageSelect(image);
    }
  };

  // Confirm selection
  const confirmSelection = () => {
    if (selectedImage && onImageSelect) {
      onImageSelect(selectedImage);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="media-gallery-overlay" onClick={onClose}>
      <div className="media-gallery-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-header">
          <h3>Media Library</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="gallery-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="view-toggles">
            <button
              className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className="gallery-content">
          {loading && (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading media library...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchMedia}>Try Again</button>
            </div>
          )}

          {!loading && !error && filteredMedia.length === 0 && (
            <div className="empty-state">
              <ImageIcon size={48} />
              <p>No media found</p>
              {searchTerm && <p>Try a different search term</p>}
            </div>
          )}

          {!loading && !error && filteredMedia.length > 0 && (
            <div className={`media-${viewMode}`}>
              {filteredMedia.map((item) => (
                <div
                  key={item.id || item.url}
                  className={`media-item ${selectedImage?.url === item.url ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="media-thumbnail">
                        <img src={item.url} alt={item.alt || item.filename} />
                      </div>
                      <div className="media-info">
                        <p className="media-filename">{item.filename}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="media-thumbnail-list">
                        <img src={item.url} alt={item.alt || item.filename} />
                      </div>
                      <div className="media-details">
                        <p className="media-filename">{item.filename}</p>
                        <div className="media-meta">
                          <span>
                            <FileText size={14} />
                            {formatFileSize(item.size)}
                          </span>
                          <span>
                            <Calendar size={14} />
                            {formatDate(item.uploadedAt)}
                          </span>
                        </div>
                        {item.alt && <p className="media-alt">Alt: {item.alt}</p>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {showSelection && selectedImage && (
          <div className="gallery-footer">
            <div className="selected-info">
              <img src={selectedImage.url} alt={selectedImage.alt} />
              <span>{selectedImage.filename}</span>
            </div>
            <div className="footer-actions">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button className="select-button" onClick={confirmSelection}>
                Select Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;