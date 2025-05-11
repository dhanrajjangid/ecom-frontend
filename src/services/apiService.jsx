import axios from 'axios';

// const API_URL = 'http://localhost:8000/api/';
const API_URL = 'https://ecom-backend-blush.vercel.app/api/';



// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle the token if the user is authenticated
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const apiCall = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    // Handle error response
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else {
      throw new Error('Network error');
    }
  }
};

// Helper functions for different HTTP methods
export const get = (url) => apiCall('GET', url);
export const post = (url, data) => apiCall('POST', url, data);
export const put = (url, data) => apiCall('PUT', url, data);
export const deleteRequest = (url) => apiCall('DELETE', url);

export default axiosInstance;
