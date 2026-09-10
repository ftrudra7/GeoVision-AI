import axios from 'axios';

// Resolve base URL from environment variable, falling back to production URL in production mode or localhost in development mode
const defaultBaseUrl = import.meta.env.PROD
  ? 'https://geovision-ai-gr3h.onrender.com'
  : 'http://localhost:8000';

const rawBaseUrl = import.meta.env.VITE_API_URL || defaultBaseUrl;
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
