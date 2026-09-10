import axios from 'axios';

// Normalize base URL from environment variable, fallback to local backend
const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
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
