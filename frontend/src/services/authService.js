import api from './api';

function validateSession(data) {
  if (!data?.token || !data?.user) {
    throw new Error('The server returned an incomplete authentication response.');
  }
  return data;
}

function persistSession(data) {
  validateSession(data);
  localStorage.setItem('geovision_token', data.token);
  localStorage.setItem('geovision_user', JSON.stringify(data.user));
  return data;
}

export const authService = {
  async signup(name, email, password) {
    const res = await api.post('/api/auth/signup', { name, email, password });
    return persistSession(res.data);
  },

  async login(email, password) {
    const res = await api.post('/api/auth/login', { email, password });
    return persistSession(res.data);
  },

  async me() {
    const res = await api.get('/api/auth/me');
    return res.data.user;
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch {
      // Clear the local session even when the API is unavailable.
    } finally {
      localStorage.removeItem('geovision_token');
      localStorage.removeItem('geovision_user');
    }
  }
};
