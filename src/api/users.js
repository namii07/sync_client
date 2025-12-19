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

export const getUserProfile = async (username) => {
  try {
    const response = await api.get(`/api/users/profile/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
  }
};

export const followUser = async (userId) => {
  try {
    const response = await api.post(`/api/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to follow user');
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}/follow`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to unfollow user');
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/api/users/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search users');
  }
};

export const getSuggestedUsers = async () => {
  try {
    const response = await api.get('/api/users/suggested');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch suggested users');
  }
};