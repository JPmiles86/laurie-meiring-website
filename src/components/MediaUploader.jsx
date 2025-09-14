import React, { useState, useCallback } from 'react';
import { Upload, X, Image, Loader, FolderOpen } from 'lucide-react';
import { api } from '../services/api';
import MediaGallery from './MediaGallery';
import './MediaUploader.css';

const MediaUploader = ({ onImageSelect, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [altText, setAltText] = useState('');
  const [showGallery, setShowGallery] = useState(false);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file selection
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process selected file
  const handleFile = (file) => {
    setError('');
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Set default alt text from filename
    const defaultAlt = file.name.split('.')[0].replace(/[-_]/g, ' ');
    setAltText(defaultAlt);

    // Store file for upload
    setImagePreview({ file, preview: URL.createObjectURL(file) });
  };

  // Upload file to server
  const handleUpload = async () => {
    if (!imagePreview || !imagePreview.file) {
      setError('Please select an image first');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', imagePreview.file);
    formData.append('alt', altText);
    formData.append('folder', 'blog-images');

    try {
      const response = await api.upload('/media/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (response.success) {
        const uploadedImage = {
          url: response.url,
          alt: altText,
          filename: response.filename
        };

        // Add to recent uploads
        setRecentUploads(prev => [uploadedImage, ...prev.slice(0, 4)]);
        
        // Select the image
        onImageSelect(uploadedImage);
        
        // Reset form
        setImagePreview(null);
        setAltText('');
        setUploadProgress(0);
      } else {
        setError(response.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="media-uploader-overlay" onClick={onClose}>
      <div className="media-uploader-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload Image</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Upload area */}
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!imagePreview ? (
              <>
                <Upload size={48} />
                <p>Drag & drop an image here, or click to select</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-label">
                  Choose Image
                </label>
              </>
            ) : (
              <div className="preview-container">
                <img 
                  src={imagePreview.preview} 
                  alt="Preview" 
                  className="image-preview"
                />
                <button 
                  className="remove-preview"
                  onClick={() => {
                    setImagePreview(null);
                    setAltText('');
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Alt text input */}
          {imagePreview && (
            <div className="alt-text-section">
              <label htmlFor="alt-text">Alt Text (for accessibility)</label>
              <input
                type="text"
                id="alt-text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image..."
                className="alt-text-input"
              />
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Upload progress */}
          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="progress-text">{uploadProgress}%</span>
            </div>
          )}

          {/* Recent uploads */}
          {recentUploads.length > 0 && (
            <div className="recent-uploads">
              <h4>Recent Uploads</h4>
              <div className="recent-grid">
                {recentUploads.map((img, index) => (
                  <div 
                    key={index}
                    className="recent-item"
                    onClick={() => onImageSelect(img)}
                  >
                    <img src={img.url} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="browse-button"
            onClick={() => setShowGallery(true)}
          >
            <FolderOpen size={16} />
            Browse Library
          </button>
          <div className="footer-actions">
            <button 
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="upload-button"
              onClick={handleUpload}
              disabled={!imagePreview || uploading}
            >
              {uploading ? (
                <>
                  <Loader className="spinner" size={16} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Media Gallery Modal */}
      {showGallery && (
        <MediaGallery
          onImageSelect={(image) => {
            onImageSelect(image);
            setShowGallery(false);
          }}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default MediaUploader;