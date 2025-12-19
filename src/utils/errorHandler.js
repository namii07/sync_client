import toast from 'react-hot-toast';

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'An error occurred';
    toast.error(message);
    
    // Handle specific status codes
    if (error.response.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('syncToken');
      localStorage.removeItem('syncUser');
      window.location.href = '/login';
    }
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection.');
  } else {
    // Other error
    toast.error('Something went wrong. Please try again.');
  }
  
  console.error('API Error:', error);
};

export const withErrorHandling = (apiFunction) => {
  return async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
};