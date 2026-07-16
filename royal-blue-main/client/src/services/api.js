import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service methods
export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const galleryAPI = {
  getAll: (category) => api.get('/gallery', { params: { category } }),
  upload: (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const amenityAPI = {
  getAll: () => api.get('/amenities'),
  add: (data) => api.post('/amenities', data),
  update: (id, data) => api.put(`/amenities/${id}`, data),
  delete: (id) => api.delete(`/amenities/${id}`),
};

export const enquiryAPI = {
  getAll: () => api.get('/enquiries'),
  submit: (data) => api.post('/enquiries', data),
  updateStatus: (id, status) => api.put(`/enquiries/${id}`, { status }),
  export: () => api.get('/enquiries/export', { responseType: 'blob' }),
};

export const testimonialAPI = {
  getAll: (all) => api.get('/testimonials', { params: { all } }),
  add: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const faqAPI = {
  getAll: (all) => api.get('/faqs', { params: { all } }),
  add: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

export const contentAPI = {
  getAll: () => api.get('/content'),
  update: (data) => api.put('/content', data),
};

export default api;
