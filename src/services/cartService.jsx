import { post, get } from './apiService';

export const getCart = async (query) => {
  return await get(`cart?${query}`);
};

export const saveCart = async (data) => {
  return await post('cart/add', data);
};

export const removeItemFromCart = async (productId) => {
  return await post('cart/remove', productId);
};

export const updateQuantityInCart = async (productId) => {
  return await post('cart/add', productId);
};

export const getOrderDetails = async (userId) => {
  return await post('order/details', userId);
};

export const createPaymentOrder = async ({ userId, addressId }) => {
  return await post('payment/create-order', { userId, addressId });
};

export const checkPaymentStatus = async ( orderId ) => {
  return await get(`payment/status/${orderId}`);
};