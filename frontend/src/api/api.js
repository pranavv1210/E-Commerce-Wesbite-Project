import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  seed: () => api.post('/products/seed'),
};

// Cart API calls
export const cartAPI = {
  getCart: (sessionId) => api.get(`/cart/${sessionId}`),
  addItem: (sessionId, productId, quantity = 1) =>
    api.post(`/cart/${sessionId}`, { productId, quantity }),
  updateItem: (sessionId, itemId, quantity) =>
    api.put(`/cart/${sessionId}/${itemId}`, { quantity }),
  removeItem: (sessionId, itemId) => api.delete(`/cart/${sessionId}/${itemId}`),
  clearCart: (sessionId) => api.delete(`/cart/${sessionId}`),
};

// Helper function to get or create session ID
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export default api;
