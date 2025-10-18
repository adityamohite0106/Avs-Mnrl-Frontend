import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://avs-mnrl-backend.onrender.com/api',
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Sending Authorization header:', config.headers.Authorization);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const uploadBankData = (formData) =>
  api.post('/upload/bank-data', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getBankList = () => api.get('/records/bank-list');
export const getAllRecords = () => api.get('/records/all-records');
export const getFraudList = () => api.get('/records/fraud-list');
export const getSuspectedList = () => api.get('/records/suspected-list');
export const getReportedList = () => api.get('/records/reported-list');
export const getSpamList = () => api.get('/records/spam-list');
export const getStats = () => api.get('/stats');
// export const getRecentActivity = () => api.get('/recent-activity'); // Verify this path
export const getRecentActivity = () => api.get('/stats/recent-activity'); // Changed to /stats/recent-activity
export const login = (email, password) =>
  api.post('/auth/login', { email, password });
export const logout = () => api.post('/auth/logout');
export const getBankRecords = (uploadId) => api.get(`/bank-records/${uploadId}`);
export const getMe = () => api.get('/auth/me');

export default api;