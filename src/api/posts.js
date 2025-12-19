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

export const createPost = async (postData) => {
  try {
    const formData = new FormData();
    formData.append('content', postData.content);
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    const response = await api.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create post');
  }
};

export const getFeedPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/api/posts?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch posts');
  }
};

export const getUserPosts = async (userId) => {
  try {
    const response = await api.get(`/api/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user posts');
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/api/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to like post');
  }
};

export const commentOnPost = async (postId, comment) => {
  try {
    const response = await api.post(`/api/posts/${postId}/comments`, { text: comment });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add comment');
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete post');
  }
};