import axios from 'axios';

// Determine backend API URL safely across environments
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // If running in browser and on a remote domain (e.g. vercel.app), never use localhost
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost) {
      if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
        return envUrl;
      }
      return 'https://geovision-ai-gr3h.onrender.com';
    }
  }

  // Running in development / node / localhost
  if (envUrl) {
    return envUrl;
  }
  return import.meta.env.PROD
    ? 'https://geovision-ai-gr3h.onrender.com'
    : 'http://localhost:8000';
};

const rawBaseUrl = getApiBaseUrl();
const baseURL = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('geovision_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user on auth expiration or invalid credentials
      localStorage.removeItem('geovision_token');
      localStorage.removeItem('geovision_user');
    }
    return Promise.reject(error);
  }
);

export default api;
