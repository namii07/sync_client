import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('syncToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNotifications = async () => {
  try {
    const response = await api.get('/api/notifications');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await api.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark notification as read');
  }
};

export const clearAllNotifications = async () => {
  try {
    const response = await api.delete('/api/notifications');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to clear notifications');
  }
};