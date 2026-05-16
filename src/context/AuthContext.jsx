import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://hms-backend-1-uchi.onrender.com/api')}/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add global interceptor for suspended accounts
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403 && error.response.data?.message === 'ACCOUNT_SUSPENDED') {
            Swal.fire({
                icon: 'error',
                title: 'Access Suspended',
                text: 'Your hospital account has been suspended by the HealthRekha Super Admin. Please contact support.',
                confirmButtonColor: '#dc2626',
                allowOutsideClick: false
            }).then(() => {
                logout();
                window.location.href = '/login';
            });
        }
        return Promise.reject(error);
      }
    );

    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get(`${API_URL}/me`);
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
    
    return () => {
        axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const { token, ...userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      setError(null);
      const res = await axios.post(`${API_URL}/register`, { name, email, password, role });
      const { token, ...userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return userData;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed.';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
