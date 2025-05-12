import { post, get } from './apiService';

export const getOrdersByuser = async (userId) => {
  return await get(`order/user/${userId}`);
};

export const getOrderDetails = async (orderId) => {
  return await get(`order/${orderId}`);
};
