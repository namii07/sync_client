import api from '../api/api';

export const postService = {
  getPosts: async (page = 1, limit = 10) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    try {
      console.log('Sending post data:', postData);
      const response = await api.post('/posts', postData);
      console.log('Post response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Post service error:', error.response?.data || error.message);
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  likePost: async (id) => {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  },

  unlikePost: async (id) => {
    const response = await api.delete(`/posts/${id}/like`);
    return response.data;
  },

  savePost: async (id) => {
    const response = await api.post(`/posts/${id}/save`);
    return response.data;
  },

  unsavePost: async (id) => {
    const response = await api.delete(`/posts/${id}/save`);
    return response.data;
  },

  addComment: async (postId, comment) => {
    const response = await api.post(`/posts/${postId}/comments`, comment);
    return response.data;
  },

  getComments: async (postId) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  getTrendingPosts: async () => {
    const response = await api.get('/posts/trending');
    return response.data;
  },

  getUserPosts: async (userId) => {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  }
};