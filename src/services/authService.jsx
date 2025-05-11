import { post, get } from './apiService';

// Register a new user
export const registerUser = async (name, email, password) => {
  const sessionId = localStorage.getItem('sessionId')
  const data = { name, email, password, sessionId };
  return await post('auth/register', data);
};

// Log in a user
export const loginUser = async (email, password) => {
  const sessionId = localStorage.getItem('sessionId')
  const data = { email, password, sessionId };
  return await post('auth/login', data);
};

// Get profile of the logged-in user
export const getUserProfile = async () => {
  return await get('auth/me');
};