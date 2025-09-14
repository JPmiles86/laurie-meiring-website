// Base API configuration and utility functions

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

// Get stored auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Clear auth token
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Base fetch wrapper with auth and error handling
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Handle response
    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(
        data.message || 'API request failed',
        response.status,
        data
      );
    }
    
    return data;
  } catch (error) {
    // Re-throw API errors
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiError(
      'Network error. Please check your connection.',
      0,
      { originalError: error.message }
    );
  }
};

// Convenience methods
export const api = {
  get: (endpoint, options = {}) => 
    apiFetch(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, data, options = {}) => 
    apiFetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    }),
  
  put: (endpoint, data, options = {}) => 
    apiFetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  
  delete: (endpoint, options = {}) => 
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
  
  // For file uploads
  upload: async (endpoint, formData, options = {}) => {
    const token = getAuthToken();
    
    const config = {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
        // Don't set Content-Type for FormData
      },
      body: formData,
      ...options
    };
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new ApiError(
          data.message || 'Upload failed',
          response.status,
          data
        );
      }
      
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        'Upload failed. Please check your connection.',
        0,
        { originalError: error.message }
      );
    }
  }
};

export default api;