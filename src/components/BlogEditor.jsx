import React, { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';
import { getAllPosts, createSlug } from '../utils/blogUtils';
import { createPost, updatePost, fetchAdminPosts, transformPost } from '../services/blogApi';
import ReactMarkdown from 'react-markdown';
import MediaUploader from './MediaUploader';

function BlogEditor({ isMobile, initialContent, onContentUsed }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showExistingPosts, setShowExistingPosts] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalData, setImageModalData] = useState({ url: '', size: 'xlarge', align: 'center' });
  const [existingPosts, setExistingPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [showMediaUploader, setShowMediaUploader] = useState(false);
  const quillRef = useRef();

  // Load initial content from AI if available
  useEffect(() => {
    if (initialContent) {
      setTitle(initialContent.title || '');
      setContent(initialContent.content || '');
      setFeaturedImage(initialContent.featuredImage || '');
      setCategories(initialContent.categories || []);
      setTags(initialContent.tags ? initialContent.tags.join(', ') : '');
      setMessage('AI-generated content loaded. Edit as needed before publishing.');
      
      // Clear the initial content after using it
      if (onContentUsed) {
        onContentUsed();
      }
    }
  }, [initialContent, onContentUsed]);

  // Available categories
  const availableCategories = [
    'Pickleball',
    'Costa Rica',
    'Personal Journey',
    'Tournaments',
    'Training Tips',
    'Coaching',
    'Relationships',
    'Youth Players',
    'Inspiration'
  ];

  // Custom toolbar handlers
  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');

      // YouTube handler
      toolbar.addHandler('youtube', () => {
        const url = prompt('Enter YouTube URL:');
        if (url) {
          const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
          const match = url.match(youtubeRegex);
          if (match) {
            const videoId = match[1];
            const range = quillRef.current.getEditor().getSelection(true);
            quillRef.current.getEditor().insertEmbed(range.index, 'video', `https://www.youtube.com/embed/${videoId}`);
            quillRef.current.getEditor().setSelection(range.index + 1);
          } else {
            alert('Please enter a valid YouTube URL');
          }
        }
      });

      // Image handler with media uploader
      toolbar.addHandler('image', () => {
        setShowMediaUploader(true);
      });
    }
  }, []);

  // Add click-to-resize functionality for images in editor
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorContainer = editor.container;

      const handleImageClick = (e) => {
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
          e.stopPropagation();

          // Get current size from class or default to xlarge
          let currentSize = 'xlarge';
          const classList = Array.from(e.target.classList);
          for (const className of classList) {
            if (className.startsWith('ql-image-') && !className.includes('align')) {
              currentSize = className.replace('ql-image-', '');
              break;
            }
          }

          // Cycle through sizes: small (25%) -> medium (50%) -> large (75%) -> xlarge (100%) -> small
          const sizeOrder = ['small', 'medium', 'large', 'xlarge'];
          const currentIndex = sizeOrder.indexOf(currentSize);
          const nextIndex = (currentIndex + 1) % sizeOrder.length;
          const nextSize = sizeOrder[nextIndex];

          // Update the image classes
          // Remove old size class
          sizeOrder.forEach(size => {
            e.target.classList.remove(`ql-image-${size}`);
          });

          // Add new size class
          e.target.classList.add(`ql-image-${nextSize}`);

          // Update data attribute for markdown conversion
          e.target.setAttribute('data-size', nextSize);

          // Show a brief tooltip with the new size
          const percentage = {
            'small': '25%',
            'medium': '50%',
            'large': '75%',
            'xlarge': '100%'
          }[nextSize];

          // Create tooltip
          const tooltip = document.createElement('div');
          tooltip.textContent = `Image size: ${percentage}`;
          tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            top: ${e.pageY - 30}px;
            left: ${e.pageX}px;
          `;
          document.body.appendChild(tooltip);

          // Remove tooltip after 1 second
          setTimeout(() => {
            if (tooltip.parentNode) {
              tooltip.parentNode.removeChild(tooltip);
            }
          }, 1000);

          // Trigger content change to update the content state
          const currentContent = editor.getContents();
          setContent(editor.root.innerHTML);
        }
      };

      editorContainer.addEventListener('click', handleImageClick);

      return () => {
        editorContainer.removeEventListener('click', handleImageClick);
      };
    }
  }, []);

  // Handle image selection from media uploader
  const handleImageSelect = (imageData) => {
    if (quillRef.current && imageData.url) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      
      // Insert image at cursor position
      editor.insertEmbed(range.index, 'image', imageData.url);
      
      // Move cursor after the image
      editor.setSelection(range.index + 1);
      
      // Close the uploader
      setShowMediaUploader(false);
    }
  };

  // Handle image insertion with size and alignment
  const insertImage = () => {
    if (quillRef.current && imageModalData.url) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);

      // Create a custom image element with data attributes
      const delta = editor.clipboard.convert(
        `<img src="${imageModalData.url}" data-size="${imageModalData.size}" data-align="${imageModalData.align}" class="ql-image-${imageModalData.size} ql-image-align-${imageModalData.align}" alt="" />`
      );

      editor.updateContents(delta, 'user');
      editor.setSelection(range.index + 1);
    }
    setShowImageModal(false);
  };

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image', 'video', 'youtube'],
        ['clean']
      ],
      handlers: {
        'youtube': function() {}, // Handler is set in useEffect
        'image': function() {} // Handler is set in useEffect
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'youtube'
  ];

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a simple preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      // In a real implementation, you'd upload to a server
      // For now, we'll just show how it would work
      setMessage('Image upload functionality will be implemented with server-side support');
    };
    reader.readAsDataURL(file);
  };

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Convert HTML to Markdown
  const htmlToMarkdown = (html) => {
    // Convert YouTube iframes to markdown markers
    html = html.replace(/<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"[^>]*><\/iframe>/g, (match, videoId) => {
      return `[youtube:${videoId}]`;
    });
    
    // Convert images with size and alignment attributes
    html = html.replace(/<img([^>]+)>/g, (match, attrs) => {
      const srcMatch = attrs.match(/src="([^"]+)"/);
      const sizeMatch = attrs.match(/data-size="([^"]+)"/);
      const alignMatch = attrs.match(/data-align="([^"]+)"/);
      const altMatch = attrs.match(/alt="([^"]+)"/);
      
      if (srcMatch) {
        const src = srcMatch[1];
        const alt = altMatch ? altMatch[1] : '';
        const size = sizeMatch ? sizeMatch[1] : 'xlarge';
        const align = alignMatch ? alignMatch[1] : 'center';

        // Only add attributes if they're not the defaults
        if (size !== 'xlarge' || align !== 'center') {
          return `![${alt}](${src}){size=${size} align=${align}}`;
        }
        return `![${alt}](${src})`;
      }
      return match;
    });
    
    // Simple conversion - in production, use a proper library
    return html
      .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
      .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
      .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
      .replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n')
      .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<u>(.*?)<\/u>/g, '$1')
      .replace(/<strike>(.*?)<\/strike>/g, '~~$1~~')
      .replace(/<a href="(.*?)".*?>(.*?)<\/a>/g, '[$2]($1)')
      .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
        return p1.replace(/<li>(.*?)<\/li>/g, '- $1\n') + '\n';
      })
      .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
        let counter = 1;
        return p1.replace(/<li>(.*?)<\/li>/g, () => `${counter++}. $1\n`) + '\n';
      })
      .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  };

  // Load existing posts from API
  const loadExistingPosts = async () => {
    setLoadingPosts(true);
    try {
      const { posts } = await fetchAdminPosts({ limit: 100 });
      setExistingPosts(posts.map(transformPost));
    } catch (error) {
      console.error('Failed to load posts:', error);
      // Fallback to local data
      setExistingPosts(getAllPosts());
    } finally {
      setLoadingPosts(false);
    }
  };

  // Load posts when showing existing posts
  useEffect(() => {
    if (showExistingPosts && existingPosts.length === 0) {
      loadExistingPosts();
    }
  }, [showExistingPosts]);

  // Handle save/publish
  const handlePublish = async () => {
    if (!title || !content) {
      setMessage('Please provide both title and content');
      return;
    }

    setSaving(true);
    
    try {
      const markdownContent = htmlToMarkdown(content);
      const slug = editingId ? undefined : createSlug(title); // Keep existing slug on update
      
      const postData = {
        title,
        content: markdownContent,
        featuredImage: featuredImage || (editingId ? undefined : `/blog${Date.now()}/featured.jpg`),
        categories: categories.length > 0 ? categories : ['Pickleball'],
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        status: 'PUBLISHED',
        ...(slug && { slug })
      };

      let result;
      if (editingId) {
        // Update existing post
        result = await updatePost(editingId, postData);
        setMessage('Post updated successfully!');
      } else {
        // Create new post
        result = await createPost(postData);
        setMessage('Post published successfully!');
      }
      
      // Clear form
      setTitle('');
      setContent('');
      setFeaturedImage('');
      setCategories([]);
      setTags('');
      setEditingId(null);
      
      // Reload posts
      await loadExistingPosts();
      
    } catch (error) {
      console.error('Publish error:', error);
      setMessage('Error publishing post: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  // Load post for editing
  const loadPostForEdit = (post) => {
    setTitle(post.title);
    // Convert markdown back to HTML for Quill
    const htmlContent = markdownToHtml(post.content);
    setContent(htmlContent);
    setFeaturedImage(post.featuredImage);
    setCategories(post.categories || []);
    setTags(post.tags ? post.tags.join(', ') : '');
    setEditingId(post.id);
    setShowExistingPosts(false);
    setMessage('Editing post: ' + post.title);
  };

  // Simple markdown to HTML conversion for editing
  const markdownToHtml = (markdown) => {
    // Convert YouTube markers back to iframes
    markdown = markdown.replace(/\[youtube:([^\]]+)\]/g, (match, videoId) => {
      return `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/${videoId}"></iframe>`;
    });
    
    // Convert images with size and alignment attributes
    markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)(?:\{([^}]+)\})?/g, (match, alt, src, attrs) => {
      let size = 'xlarge';
      let align = 'center';

      if (attrs) {
        const sizeMatch = attrs.match(/size=([^\s]+)/);
        const alignMatch = attrs.match(/align=([^\s]+)/);
        if (sizeMatch) size = sizeMatch[1];
        if (alignMatch) align = alignMatch[1];
      }

      return `<img src="${src}" alt="${alt}" data-size="${size}" data-align="${align}" class="ql-image-${size} ql-image-align-${align}">`;
    });
    
    return markdown
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^#### (.*?)$/gm, '<h4>$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^- (.*?)$/gm, '<ul><li>$1</li></ul>')
      .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^([^<].*)$/gm, '<p>$1</p>');
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '10px' : '20px'
    }}>
      {/* Action Buttons */}
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => {
            // Clear form for new post
            setTitle('');
            setContent('');
            setFeaturedImage('');
            setCategories([]);
            setTags('');
            setEditingId(null);
            setShowExistingPosts(false);
            setMessage('');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          New Blog Post
        </button>
        <button
          onClick={() => setShowExistingPosts(!showExistingPosts)}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {showExistingPosts ? 'Hide' : 'Edit'} Existing Posts
        </button>
      </div>

      {/* Existing Posts List */}
      {showExistingPosts && (
        <div style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginBottom: '15px' }}>
            {loadingPosts ? 'Loading posts...' : 'Select a Post to Edit'}
          </h3>
          {loadingPosts ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Loading posts...
            </div>
          ) : (
            existingPosts.map(post => (
            <div
              key={post.id}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: editingId === post.id ? '#e3f2fd' : 'white'
              }}
              onClick={() => loadPostForEdit(post)}
            >
              <div style={{ fontWeight: 'bold' }}>{post.title}</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {new Date(post.publishDate).toLocaleDateString()} - {post.status}
              </div>
            </div>
          ))
          )}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 120px)'
      }}>
        {/* Editor Panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'var(--text-color)'
            }}>
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'var(--text-color)'
            }}>
              Featured Image URL
            </label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="/blog9/featured-image.jpg"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'var(--text-color)'
            }}>
              Content
            </label>
            <div style={{
              flex: 1,
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px'
            }}>
              <div
                id="quill-editor-container"
                style={{
                  flex: 1,
                  resize: 'vertical',
                  overflow: 'hidden',
                  minHeight: '600px'
                }}
              >
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={(value, delta, source, editor) => {
                    // Handle YouTube URL pasting
                    if (source === 'user' && delta && delta.ops) {
                      const insertOp = delta.ops.find(op => op.insert && typeof op.insert === 'string');
                      if (insertOp) {
                        const text = insertOp.insert;
                        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/?)([\w-]+)/;
                        const match = text.match(youtubeRegex);
                        if (match) {
                          const videoId = match[1];
                          const range = editor.getSelection();
                          if (range) {
                            // Delete the pasted URL
                            editor.deleteText(range.index - text.length, text.length);
                            // Insert the video embed
                            editor.insertEmbed(range.index - text.length, 'video', `https://www.youtube.com/embed/${videoId}`);
                            return;
                          }
                        }
                      }
                    }
                    setContent(value);
                  }}
                  modules={modules}
                  formats={formats}
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px', marginTop: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'var(--text-color)'
            }}>
              Categories
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: categories.includes(cat) ? 'var(--primary-color)' : 'white',
                    color: categories.includes(cat) ? 'white' : 'var(--text-color)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: 'var(--text-color)'
            }}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="pickleball journey, tournaments, coaching"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: '6px'
              }}
            />
          </div>

          {message && (
            <div style={{
              padding: '10px',
              marginBottom: '20px',
              backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
              color: message.includes('success') ? '#155724' : '#721c24',
              borderRadius: '6px'
            }}>
              {message}
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={() => setPreview(!preview)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {preview ? 'Close Preview' : 'Preview'}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={saving}
              style={{
                padding: '10px 30px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                opacity: saving ? 0.6 : 1
              }}
            >
              {saving ? 'Saving...' : editingId ? 'Update Blog' : 'Publish Blog'}
            </button>
          </div>
        </div>

        {/* Preview Modal */}
        {preview && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '800px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
            }}>
              {/* Modal Header */}
              <div style={{
                padding: '20px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f9fa'
              }}>
                <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Preview</h2>
                <button
                  onClick={() => setPreview(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: 'var(--text-color)',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto'
              }}>
                <h1 style={{
                  fontSize: '2.5rem',
                  marginBottom: '20px',
                  color: 'var(--primary-color)'
                }}>
                  {title || 'Blog Title'}
                </h1>

                <div style={{
                  fontSize: '1rem',
                  color: 'var(--text-color)',
                  opacity: 0.8,
                  marginBottom: '30px'
                }}>
                  {new Date().toLocaleDateString()} by Laurie Meiring
                </div>

                {featuredImage && (
                  <img
                    src={featuredImage}
                    alt="Featured"
                    style={{
                      width: '100%',
                      height: 'auto',
                      marginBottom: '30px',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}

                <div style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}>
                  <ReactMarkdown>
                    {htmlToMarkdown(content)}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Options Modal */}
      {showImageModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{ marginBottom: '20px' }}>Image Options</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                Image URL
              </label>
              <input
                type="text"
                value={imageModalData.url}
                onChange={(e) => setImageModalData({ ...imageModalData, url: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                Size
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['small', 'medium', 'large', 'xlarge'].map(size => (
                  <button
                    key={size}
                    onClick={() => setImageModalData({ ...imageModalData, size })}
                    style={{
                      padding: '8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: imageModalData.size === size ? 'var(--primary-color)' : 'white',
                      color: imageModalData.size === size ? 'white' : 'var(--text-color)',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {size === 'xlarge' ? 'X-Large' : size}
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                      {size === 'small' && '25%'}
                      {size === 'medium' && '50%'}
                      {size === 'large' && '75%'}
                      {size === 'xlarge' && '100%'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                Alignment
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => setImageModalData({ ...imageModalData, align })}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      backgroundColor: imageModalData.align === align ? 'var(--primary-color)' : 'white',
                      color: imageModalData.align === align ? 'white' : 'var(--text-color)',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
              marginTop: '30px'
            }}>
              <button
                onClick={() => setShowImageModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Uploader Modal */}
      {showMediaUploader && (
        <MediaUploader 
          onImageSelect={handleImageSelect}
          onClose={() => setShowMediaUploader(false)}
        />
      )}
    </div>
  );
}

export default BlogEditor;