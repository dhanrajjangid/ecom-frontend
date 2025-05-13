import { post, get } from './apiService';

export const getAddressList = async (userId) => {
  return await get(`address/user/${userId}`);
};


export const addNewAddress = async (addressData) => {
  return await post('/address', addressData)
}
