import { post, get } from './apiService';

export const getAddresses = async (userId) => {
  return await get(`address/user/${userId}`);
};

export const addAddress = async (data) => {
  return await post('address', data);
};