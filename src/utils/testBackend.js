import { API_BASE_URL } from '../config/api.js';

export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('Backend is reachable');
      return true;
    } else {
      console.log('Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};