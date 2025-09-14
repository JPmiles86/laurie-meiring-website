// Authentication service
import api, { setAuthToken, clearAuthToken, getAuthToken } from './api';

const TENANT_ID = 'laurie-personal';

// Login with password
export const login = async (password) => {
  try {
    const response = await api.post('/auth/login', {
      password,
      tenantId: TENANT_ID
    });

    if (response.success && response.token) {
      // Store the token
      setAuthToken(response.token);
      
      // Store tenant info
      if (response.tenant) {
        localStorage.setItem('tenant', JSON.stringify(response.tenant));
      }
      
      return {
        success: true,
        token: response.token,
        tenant: response.tenant
      };
    }
    
    throw new Error(response.message || 'Login failed');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    // Call logout endpoint if token exists
    const token = getAuthToken();
    if (token) {
      await api.post('/auth/logout');
    }
  } catch (error) {
    // Continue with logout even if API call fails
    console.error('Logout API error:', error);
  } finally {
    // Clear local data
    clearAuthToken();
    localStorage.removeItem('tenant');
    sessionStorage.removeItem('blogAdminAuth');
  }
};

// Get current user/tenant info
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    
    if (response.success) {
      return {
        user: response.user,
        tenant: response.tenant
      };
    }
    
    throw new Error('Failed to get user info');
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Get stored tenant info
export const getTenant = () => {
  const tenantStr = localStorage.getItem('tenant');
  return tenantStr ? JSON.parse(tenantStr) : null;
};

// Refresh token if needed (for future implementation)
export const refreshToken = async () => {
  // This would be implemented if the API supports token refresh
  // For now, just return the current token
  return getAuthToken();
};

// Auth state manager (singleton)
class AuthManager {
  constructor() {
    this.listeners = new Set();
    this.isAuth = isAuthenticated();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const newAuthState = isAuthenticated();
    if (this.isAuth !== newAuthState) {
      this.isAuth = newAuthState;
      this.listeners.forEach(listener => listener(newAuthState));
    }
  }

  async login(password) {
    const result = await login(password);
    this.notify();
    return result;
  }

  async logout() {
    await logout();
    this.notify();
  }
}

export const authManager = new AuthManager();

export default {
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  getTenant,
  refreshToken,
  authManager
};