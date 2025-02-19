import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getAllPosts, savePost, deletePost, createSlug, handleImageUpload, CATEGORIES, htmlToMarkdown } from '../utils/blogUtils';
import ReactMarkdown from 'react-markdown';

function BlogAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const imageInputRef = useRef(null);

  // Add new state for tags input
  const [tagInput, setTagInput] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    publishDate: '',
    status: 'draft',
    featuredImage: '',
    author: 'Laurie Meiring',
    categories: [],
    tags: []
  });

  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getAllPosts());
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'LaurieIsAPickleBallGod2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      publishDate: post.publishDate.split('T')[0],
      status: post.status,
      featuredImage: post.featuredImage,
      author: post.author,
      categories: post.categories || [],
      tags: post.tags || []
    });
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleCreateNew = () => {
    setSelectedPost(null);
    setFormData({
      title: '',
      content: '',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft',
      featuredImage: '',
      author: 'Laurie Meiring',
      categories: [],
      tags: []
    });
    setTagInput('');
    setIsEditing(true);
    setPreviewMode(false);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadProgress(1); // Start progress
      const result = await handleImageUpload(file);
      setUploadProgress(100); // Complete progress
      
      // If this is the featured image upload
      if (e.target.name === 'featuredImage') {
        setFormData(prev => ({ ...prev, featuredImage: result.url }));
      } else {
        // Insert image markdown at cursor position
        const textarea = document.querySelector('textarea[name="content"]');
        const cursorPosition = textarea.selectionStart;
        const textBefore = formData.content.substring(0, cursorPosition);
        const textAfter = formData.content.substring(cursorPosition);
        const imageMarkdown = `![${file.name}](${result.url})`;
        
        setFormData(prev => ({
          ...prev,
          content: textBefore + imageMarkdown + textAfter
        }));
      }

      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      alert('Failed to upload image: ' + error.message);
      setUploadProgress(0);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const postData = {
        id: selectedPost?.id || String(Date.now()),
        ...formData,
        slug: createSlug(formData.title),
        publishDate: new Date(formData.publishDate).toISOString()
      };
      
      const success = await savePost(postData);
      if (success) {
        setPosts(getAllPosts());
        setIsEditing(false);
        alert('Post saved successfully!');
      } else {
        alert('Failed to save post. Please try again.');
      }
    } catch (error) {
      alert('Error saving post: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const success = await deletePost(postId);
      if (success) {
        setPosts(getAllPosts());
        alert('Post deleted successfully!');
      } else {
        alert('Failed to delete post. Please try again.');
      }
    } catch (error) {
      alert('Error deleting post: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        backgroundColor: 'var(--neutral-color)',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Blog Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: 'var(--primary-color)' }}>Blog Posts</h2>
          <button
            onClick={handleCreateNew}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create New Post
          </button>
        </div>

        <div style={{
          display: 'grid',
          gap: '20px'
        }}>
          {posts.map(post => (
            <div
              key={post.id}
              style={{
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  {new Date(post.publishDate).toLocaleDateString()} • {post.status}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleEditPost(post)}
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    color: 'var(--text-color)',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: 'var(--primary-color)' }}>
          {selectedPost ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            style={{
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              backgroundColor: '#666',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to List
          </button>
        </div>
      </div>

      {previewMode ? (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ marginBottom: '20px' }}>{formData.title}</h1>
          <div style={{ marginBottom: '20px', color: '#666' }}>
            {new Date(formData.publishDate).toLocaleDateString()} • {formData.status}
          </div>
          {formData.featuredImage && (
            <img
              src={formData.featuredImage}
              alt={formData.title}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px'
              }}
            />
          )}
          <ReactMarkdown>{formData.content}</ReactMarkdown>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Categories</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--secondary-color)',
                    backgroundColor: formData.categories.includes(category)
                      ? 'var(--secondary-color)'
                      : 'transparent',
                    color: formData.categories.includes(category)
                      ? 'var(--text-color)'
                      : 'var(--primary-color)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      padding: '0 5px'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Featured Image</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                placeholder="Enter image URL or upload"
              />
              <input
                ref={imageInputRef}
                type="file"
                name="featuredImage"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => imageInputRef.current?.click()}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--secondary-color)',
                  color: 'var(--text-color)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Upload
              </button>
            </div>
            {uploadProgress > 0 && (
              <div style={{ 
                width: '100%', 
                height: '4px', 
                backgroundColor: '#eee',
                marginTop: '10px',
                borderRadius: '2px'
              }}>
                <div style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  backgroundColor: 'var(--secondary-color)',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            )}
          </div>

          {/* Replace textarea with TinyMCE Editor */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Content</label>
            <Editor
              apiKey='2ogthcq25sqm7dqeh2wce3xhbm03iiaisea5oxwhgv89s3rb'
              value={formData.content}
              init={{
                height: 500,
                plugins: [
                  // Core editing features
                  'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 
                  'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 
                  'wordcount',
                  // Premium features
                  'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 
                  'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 
                  'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 
                  'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 
                  'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | ' +
                  'link image media table mergetags | spellcheckdialog typography | ' +
                  'align lineheight | checklist numlist bullist indent outdent | ' +
                  'emoticons charmap | removeformat',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                file_picker_types: 'image',
                automatic_uploads: true,
                images_upload_handler: async function (blobInfo, progress) {
                  try {
                    const file = blobInfo.blob();
                    progress(1);
                    const result = await handleImageUpload(file);
                    progress(100);
                    return result.url;
                  } catch (error) {
                    console.error('Image upload failed:', error);
                    throw new Error('Image upload failed');
                  }
                },
                images_upload_base_path: '/',
                images_reuse_filename: true,
                image_uploadtab: true,
                image_advtab: true,
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Laurie Meiring',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ]
              }}
              onEditorChange={(content) => {
                setFormData(prev => ({
                  ...prev,
                  content: content
                }));
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Publish Date</label>
            <input
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: isSaving ? 'not-allowed' : 'pointer',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogAdmin; 