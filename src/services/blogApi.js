// Blog API service
import api from './api';

const TENANT_ID = 'laurie-personal';

// Fetch all posts for public view
export const fetchPosts = async (options = {}) => {
  try {
    const params = new URLSearchParams({
      tenant: TENANT_ID,
      status: options.status || 'PUBLISHED',
      page: options.page || 1,
      limit: options.limit || 10
    });

    const response = await api.get(`/posts?${params}`);
    
    if (response.success) {
      return {
        posts: response.posts || [],
        pagination: response.pagination
      };
    }
    
    throw new Error(response.message || 'Failed to fetch posts');
  } catch (error) {
    console.error('Fetch posts error:', error);
    throw error;
  }
};

// Fetch all posts for admin
export const fetchAdminPosts = async (options = {}) => {
  try {
    const params = new URLSearchParams({
      page: options.page || 1,
      limit: options.limit || 50
    });

    if (options.status) {
      params.append('status', options.status);
    }

    // Check if we have session auth first (for blog admin)
    const sessionAuth = sessionStorage.getItem('blogAdminAuth');

    let response;
    if (sessionAuth === 'authenticated') {
      // Use session-based auth for blog admin
      const fetchResponse = await fetch(`/api/posts/admin/all?${params}`, {
        headers: {
          'X-Session-Auth': sessionAuth
        }
      });
      response = await fetchResponse.json();
    } else {
      // Use token-based auth
      response = await api.get(`/posts/admin/all?${params}`);
    }

    if (response.success) {
      return {
        posts: response.posts || [],
        pagination: response.pagination
      };
    }

    throw new Error(response.message || 'Failed to fetch admin posts');
  } catch (error) {
    console.error('Fetch admin posts error:', error);
    throw error;
  }
};

// Fetch single post by slug
export const fetchPostBySlug = async (slug) => {
  try {
    const params = new URLSearchParams({
      tenant: TENANT_ID
    });

    const response = await api.get(`/posts/${slug}?${params}`);
    
    if (response.success && response.post) {
      return response.post;
    }
    
    throw new Error(response.message || 'Post not found');
  } catch (error) {
    console.error('Fetch post error:', error);
    throw error;
  }
};

// Create new post
export const createPost = async (postData) => {
  try {
    // Transform data to match API expectations
    const apiData = {
      title: postData.title,
      content: postData.content,
      slug: postData.slug,
      status: postData.status || 'PUBLISHED',
      featuredImage: postData.featuredImage,
      publishDate: postData.publishDate || new Date().toISOString(),
      categories: postData.categories || [],
      tags: postData.tags || [],
      metadata: {
        author: postData.author || 'Laurie Meiring'
      }
    };

    const response = await api.post('/posts', apiData);
    
    if (response.success && response.post) {
      return response.post;
    }
    
    throw new Error(response.message || 'Failed to create post');
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
};

// Update existing post
export const updatePost = async (postId, postData) => {
  try {
    // Transform data to match API expectations
    const apiData = {
      title: postData.title,
      content: postData.content,
      slug: postData.slug,
      status: postData.status || 'PUBLISHED',
      featuredImage: postData.featuredImage,
      publishDate: postData.publishDate,
      categories: postData.categories || [],
      tags: postData.tags || [],
      metadata: {
        author: postData.author || 'Laurie Meiring'
      }
    };

    // Check if we have session auth first (for blog admin)
    const sessionAuth = sessionStorage.getItem('blogAdminAuth');

    let response;
    if (sessionAuth === 'authenticated') {
      // Use session-based auth for blog admin
      const fetchResponse = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Auth': sessionAuth
        },
        body: JSON.stringify(apiData)
      });
      response = await fetchResponse.json();
    } else {
      // Use token-based auth
      response = await api.put(`/posts/${postId}`, apiData);
    }

    if (response.success && response.post) {
      return response.post;
    }

    throw new Error(response.message || 'Failed to update post');
  } catch (error) {
    console.error('Update post error:', error);
    throw error;
  }
};

// Delete post
export const deletePost = async (postId) => {
  try {
    // Check if we have session auth first (for blog admin)
    const sessionAuth = sessionStorage.getItem('blogAdminAuth');

    let response;
    if (sessionAuth === 'authenticated') {
      // Use session-based auth for blog admin
      const fetchResponse = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'X-Session-Auth': sessionAuth
        }
      });
      response = await fetchResponse.json();
    } else {
      // Use token-based auth
      response = await api.delete(`/posts/${postId}`);
    }

    if (response.success) {
      return true;
    }

    throw new Error(response.message || 'Failed to delete post');
  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
};

// Upload media/image
export const uploadMedia = async (file, folder = 'blog-media') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('tenant', TENANT_ID);

    const response = await api.upload('/media/upload', formData);
    
    if (response.success && response.url) {
      return {
        url: response.url,
        publicId: response.publicId
      };
    }
    
    throw new Error(response.message || 'Failed to upload media');
  } catch (error) {
    console.error('Upload media error:', error);
    throw error;
  }
};

// Transform API post to match frontend format
export const transformPost = (apiPost) => {
  return {
    id: apiPost.id,
    title: apiPost.title,
    content: apiPost.content,
    slug: apiPost.slug,
    status: apiPost.status?.toLowerCase() || 'published',
    featuredImage: apiPost.featuredImage,
    publishDate: apiPost.publishDate,
    author: apiPost.users?.name || apiPost.metadata?.author || apiPost.author?.name || 'Laurie Meiring',
    categories: apiPost.post_categories?.map(pc =>
      pc.categories?.name || pc.category?.name || pc.name
    ) || apiPost.categories?.map(cat =>
      typeof cat === 'string' ? cat : cat.category?.name || cat.name
    ) || [],
    tags: apiPost.post_tags?.map(pt =>
      pt.tags?.name || pt.tag?.name || pt.name
    ) || apiPost.tags?.map(tag =>
      typeof tag === 'string' ? tag : tag.tag?.name || tag.name
    ) || [],
    viewCount: apiPost.viewCount || 0
  };
};

// Helper to get all visible posts (for backward compatibility)
export const getVisiblePosts = async () => {
  try {
    const { posts } = await fetchPosts({ limit: 100 });
    return posts.map(transformPost);
  } catch (error) {
    console.error('Get visible posts error:', error);
    // Fallback to empty array
    return [];
  }
};

export default {
  fetchPosts,
  fetchAdminPosts,
  fetchPostBySlug,
  createPost,
  updatePost,
  deletePost,
  uploadMedia,
  transformPost,
  getVisiblePosts
};