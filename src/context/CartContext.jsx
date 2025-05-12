import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { getCart, removeItemFromCart, saveCart, updateQuantityInCart } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user, sessionId } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      let url = '';
      if (user) {
        url = `userId=${user._id}`;
      } else if (sessionId) {
        url = `sessionId=${sessionId}`;
      }
      const response = await getCart(url);
      setCartItems(response.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToBackend = async (productId, quantity) => {
    const data = { userId: user ? user._id : null, sessionId, productId, quantity }
    try {
      await saveCart(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const addToCart = async (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      await saveToBackend(product._id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { _id: product.id, quantity: 1 }]);
      await saveToBackend(product._id, 1);
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId));
    const data = { userId: user ? user._id : null, sessionId, productId }
    await removeItemFromCart(data);
    await fetchCart()
  };

  const updateQuantity = async (productId, quantity) => {
    if(quantity === 0){
      removeFromCart(productId)
    }else if (quantity > 0){
        setCartItems(
          cartItems.map((item) =>
            item._id === productId ? { ...item, quantity: quantity } : item
        )
      );
      const data = { userId: user ? user._id : null, sessionId, productId, quantity }
      await updateQuantityInCart(data);
      await fetchCart()
    }
  };

   // Fetch cart items on mount for both guest and registered users
   useEffect(() => {
    fetchCart();
  }, [user, sessionId]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, isLoading, error }}>
      {children}
    </CartContext.Provider>
  );
};
