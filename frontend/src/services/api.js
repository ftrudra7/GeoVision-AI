import axios from 'axios';

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (typeof window !== 'undefined') {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (!isLocalhost) {
      if (envUrl && !/localhost|127\.0\.0\.1/.test(envUrl)) return envUrl;
      return 'https://geovision-ai-gr3h.onrender.com';
    }
  }

  if (envUrl) return envUrl;
  return import.meta.env.PROD
    ? 'https://geovision-ai-gr3h.onrender.com'
    : 'http://localhost:8000';
};

const baseURL = getApiBaseUrl().replace(/\/+$/, '');
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('geovision_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthenticationRequest = /\/api\/auth\/(login|signup)$/.test(requestUrl);
    const requestAuthorization = error.config?.headers?.Authorization;
    const currentToken = localStorage.getItem('geovision_token');

    if (
      error.response?.status === 401 &&
      !isAuthenticationRequest &&
      currentToken &&
      requestAuthorization === `Bearer ${currentToken}`
    ) {
      localStorage.removeItem('geovision_token');
      localStorage.removeItem('geovision_user');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('geovision:session-expired'));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
