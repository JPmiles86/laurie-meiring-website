import React, { createContext, useContext, useState, useEffect } from 'react';
import { authManager, isAuthenticated, getTenant } from '../services/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [tenant, setTenant] = useState(getTenant());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authManager.subscribe((newAuthState) => {
      setIsAuth(newAuthState);
      setTenant(getTenant());
    });

    // Initial check
    setIsAuth(isAuthenticated());
    setTenant(getTenant());
    setLoading(false);

    return unsubscribe;
  }, []);

  const value = {
    isAuthenticated: isAuth,
    tenant,
    loading,
    login: authManager.login.bind(authManager),
    logout: authManager.logout.bind(authManager)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected route wrapper component
export const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2>Access Denied</h2>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return children;
};

export default AuthContext;