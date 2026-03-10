import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Attach JWT token from localStorage if present
api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const uploadProductImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/products/upload', formData);
};

// Auth endpoints
export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);

// Order endpoints
export const placeOrder = (items) => api.post('/orders', items);
export const getMyOrders = () => api.get('/orders/my-orders');
export const getAllOrders = () => api.get('/orders');

export default api;
