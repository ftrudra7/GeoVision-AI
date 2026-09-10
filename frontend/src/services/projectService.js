import api from './api';

export const projectService = {
  async getProjects() {
    const res = await api.get('/api/projects');
    return res.data.projects;
  },

  async createProject(name, description) {
    const res = await api.post('/api/projects', { name, description });
    return res.data.project;
  },

  async getProjectById(id) {
    const res = await api.get(`/api/projects/${id}`);
    return res.data;
  },

  async updateProject(id, name, description) {
    const res = await api.put(`/api/projects/${id}`, { name, description });
    return res.data.project;
  },

  async deleteProject(id) {
    const res = await api.delete(`/api/projects/${id}`);
    return res.data;
  }
};
