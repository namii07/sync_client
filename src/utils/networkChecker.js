import { API_BASE_URL } from '../config/api.js';

export const checkNetworkStatus = async () => {
  const results = {
    internet: false,
    backend: false,
    error: null
  };

  try {
    // Check internet connectivity
    await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
    results.internet = true;
  } catch (error) {
    results.error = 'No internet connection';
    return results;
  }

  try {
    // Check backend connectivity
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test', password: 'test' })
    });
    
    // Even if login fails, if we get a response, backend is up
    results.backend = true;
  } catch (error) {
    results.error = 'Backend server unavailable (likely sleeping on Render)';
  }

  return results;
};