import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api'),
});

// Institutional Auth Interceptor
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Institutional Suspended Account Interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403 && error.response.data?.message === 'ACCOUNT_SUSPENDED') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Array Safeguard Interceptor
API.interceptors.response.use((res) => {
    if (res.data && typeof res.data === 'object' && !Array.isArray(res.data) && Object.keys(res.data).length > 0) {
        const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
        if (arrayKey && (res.config.url.includes('/patients') || res.config.url.includes('/users') || res.config.url.includes('/records') || res.config.url.includes('/appointments'))) {
            res.data = res.data[arrayKey];
        }
    }
    return res;
});

export default API;
