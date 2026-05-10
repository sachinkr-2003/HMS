import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Global interceptor to fix legacy/create pages without modifying them directly
axios.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token && !req.headers.Authorization) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    // Redirect hardcoded production URLs to local API if running locally
    if (req.url && req.url.includes('hms-backend-1-uchi.onrender.com') && window.location.hostname === 'localhost') {
        req.url = req.url.replace('https://hms-backend-1-uchi.onrender.com', 'http://localhost:5000');
    }
    
    // Fix undefined base URLs when VITE_API_BASE_URL is missing
    if (req.url && req.url.startsWith('undefined/')) {
        const smartBaseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api';
        req.url = req.url.replace('undefined', smartBaseUrl);
    }
    return req;
});

// Response interceptor to safeguard against "e.map is not a function"
axios.interceptors.response.use((res) => {
    // If the data is an object but the frontend expects an array, try to extract the array
    if (res.data && typeof res.data === 'object' && !Array.isArray(res.data) && Object.keys(res.data).length > 0) {
        const arrayKey = Object.keys(res.data).find(key => Array.isArray(res.data[key]));
        if (arrayKey && (res.config.url.includes('/patients') || res.config.url.includes('/users') || res.config.url.includes('/records'))) {
            res.data = res.data[arrayKey];
        }
    }
    return res;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
