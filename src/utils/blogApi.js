// Blog API utilities for saving to GitHub or server

/**
 * Save blog post to GitHub via API
 * Requires GitHub personal access token
 */
export const saveToGitHub = async (blogPost, isUpdate = false) => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const REPO_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'jpmiles';
  const REPO_NAME = import.meta.env.VITE_GITHUB_REPO || 'laurie-meiring-website';
  const FILE_PATH = 'src/data/blogs.json';
  
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured. Please add VITE_GITHUB_TOKEN to your .env file');
  }
  
  try {
    // 1. Get current file content
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch current blogs: ${response.statusText}`);
    }
    
    const data = await response.json();
    const currentContent = JSON.parse(atob(data.content));
    
    // 2. Add or update blog post
    if (isUpdate) {
      const index = currentContent.posts.findIndex(p => p.id === blogPost.id);
      if (index >= 0) {
        currentContent.posts[index] = blogPost;
      } else {
        throw new Error('Post not found for update');
      }
    } else {
      currentContent.posts.unshift(blogPost);
    }
    
    // 3. Update file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: isUpdate ? `Update blog post: ${blogPost.title}` : `Add new blog post: ${blogPost.title}`,
          content: btoa(JSON.stringify(currentContent, null, 2)),
          sha: data.sha,
          branch: 'main'
        })
      }
    );
    
    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(`Failed to save blog: ${error.message || updateResponse.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('GitHub save error:', error);
    throw error;
  }
};

/**
 * Save blog post to server API
 */
export const saveToServer = async (blogPost) => {
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogPost)
    });
    
    return response.ok;
  } catch (error) {
    console.error('Server save error:', error);
    return false;
  }
};

/**
 * Upload image to cloud storage
 */
export const uploadImage = async (file, blogId) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', `blog${blogId}`);
  
  try {
    // Example with Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Image upload error:', error);
    return null;
  }
};

/**
 * Convert base64 image to file
 */
export const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

/**
 * Implementation notes for production:
 * 
 * 1. GitHub Integration:
 *    - Create a personal access token with repo permissions
 *    - Store token securely (environment variable)
 *    - Use GitHub API to read/write blogs.json
 * 
 * 2. Server Integration:
 *    - Set up Vercel serverless functions
 *    - Use authentication middleware
 *    - Store data in database (Supabase, MongoDB, etc.)
 * 
 * 3. Image Storage:
 *    - Use Cloudinary, AWS S3, or Vercel Blob
 *    - Implement image optimization
 *    - Generate responsive image sizes
 * 
 * 4. Security:
 *    - Never expose API keys in frontend
 *    - Use environment variables
 *    - Implement proper CORS settings
 *    - Add rate limiting
 */