import API from './axios';

/**
 * Institutional Backend Entry Points
 */

// Auth Division
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getUsers = () => API.get('/auth/users');

// Clinical Division
export const getPatients = () => API.get('/patients');
export const getAppointments = () => API.get('/appointments');
export const getLabs = () => API.get('/lab');

// Pharmacy & Inventory
export const getMedicines = () => API.get('/pharmacy');

// AI Module
export const structureNotes = (data) => API.post('/ai/structure-notes', data);
export const chatbotResponse = (data) => API.post('/ai/chat', data);

// Fiscal Division
export const getBills = () => API.get('/billing');
