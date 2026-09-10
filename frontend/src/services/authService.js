import api from './api';

export const authService = {
  async signup(name, email, password) {
    const res = await api.post('/api/auth/signup', { name, email, password });
    if (res.data.token) {
      localStorage.setItem('geovision_token', res.data.token);
      localStorage.setItem('geovision_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async login(email, password) {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('geovision_token', res.data.token);
      localStorage.setItem('geovision_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async me() {
    const res = await api.get('/api/auth/me');
    return res.data.user;
  },

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('geovision_token');
      localStorage.removeItem('geovision_user');
    }
  }
};
