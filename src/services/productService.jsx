import { get } from './apiService';  

export const getProducts = async () => {
  return await get('products');  
}

export const fetchProductById = async (id) => {
  return await get(`products/${id}`);  
}