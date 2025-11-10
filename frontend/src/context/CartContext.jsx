import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, getSessionId } from '../api/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  // Load cart from backend on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart(sessionId);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fallback to empty cart
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const response = await cartAPI.addItem(sessionId, product._id, quantity);
      setCart(response.data.cart);
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add item' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await cartAPI.removeItem(sessionId, itemId);
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await cartAPI.updateItem(sessionId, itemId, quantity);
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { success: false, message: error.response?.data?.message };
    }
  };

  const clearCart = async () => {
    try {
      const response = await cartAPI.clearCart(sessionId);
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false };
    }
  };

  const getCartTotal = () => {
    return cart.totalAmount || 0;
  };

  const getCartCount = () => {
    return cart.items?.reduce((count, item) => count + item.quantity, 0) || 0;
  };

  const value = {
    items: cart.items || [],
    totalAmount: cart.totalAmount || 0,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    refreshCart: loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
