import api from '../api/api';

export const messageService = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },

  getMessages: async (conversationId) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  },

  sendMessage: async (receiverId, messageData) => {
    const response = await api.post(`/messages/send/${receiverId}`, messageData);
    return response.data;
  },

  createConversation: async (userId) => {
    const response = await api.post('/messages/conversations', { userId });
    return response.data;
  },

  markAsRead: async (conversationId) => {
    const response = await api.put(`/messages/${conversationId}/read`);
    return response.data;
  }
};