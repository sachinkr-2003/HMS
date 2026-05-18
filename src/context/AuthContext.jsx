import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add global interceptor for suspended accounts
    const interceptor = API.interceptors.response.use(
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
          const res = await API.get('/auth/me');
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
    
    return () => {
        API.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await API.post('/auth/login', { email, password });
      const { token, ...userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
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
      const res = await API.post('/auth/register', { name, email, password, role });
      const { token, ...userData } = res.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
