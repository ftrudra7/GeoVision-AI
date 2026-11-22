import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('geovision_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem('geovision_user');
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('geovision_token'));
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('geovision_token');
    localStorage.removeItem('geovision_user');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => clearAuth();
    const handleStorageChange = (event) => {
      if (event.key === 'geovision_token' && !event.newValue) clearAuth();
    };
    window.addEventListener('geovision:session-expired', handleSessionExpired);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('geovision:session-expired', handleSessionExpired);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [clearAuth]);

  useEffect(() => {
    let active = true;

    async function initAuth() {
      const storedToken = localStorage.getItem('geovision_token');
      if (!storedToken) {
        if (active) setLoading(false);
        return;
      }

      try {
        const currentUser = await authService.me();
        if (!active) return;
        if (!currentUser) throw new Error('The authentication service returned no user.');
        if (localStorage.getItem('geovision_token') !== storedToken) return;
        setUser(currentUser);
        setToken(storedToken);
      } catch {
        if (active && localStorage.getItem('geovision_token') === storedToken) clearAuth();
      } finally {
        if (active) setLoading(false);
      }
    }

    initAuth();
    return () => { active = false; };
  }, [clearAuth]);

  const establishSession = useCallback((data) => {
    if (!data?.token || !data?.user) {
      throw new Error('The authentication service returned an incomplete session.');
    }
    localStorage.setItem('geovision_token', data.token);
    localStorage.setItem('geovision_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email.trim(), password);
    return establishSession(data);
  }, [establishSession]);

  const signup = useCallback(async (name, email, password) => {
    const data = await authService.signup(name.trim(), email.trim(), password);
    return establishSession(data);
  }, [establishSession]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: Boolean(token && user), loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
