import axios from 'axios';

const API_BASE_URL = 'https://sync-server-n34n.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('syncToken');
    const response = await api.post('/api/auth/logout-all', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  logoutAllDevices: async () => {
    const token = localStorage.getItem('syncToken');
    const response = await api.post('/api/auth/logout-all', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};