import api from './api';

export const analysisService = {
  async getAnalyses() {
    const res = await api.get('/api/analyses');
    return res.data.analyses;
  },

  async createAnalysis(data) {
    const res = await api.post('/api/analyses', data);
    return res.data.analysis;
  },

  async getAnalysisById(id) {
    const res = await api.get(`/api/analyses/${id}`);
    return res.data.analysis;
  },

  async deleteAnalysis(id) {
    const res = await api.delete(`/api/analyses/${id}`);
    return res.data;
  },

  async getHistory() {
    const res = await api.get('/api/history');
    return res.data.history;
  }
};
