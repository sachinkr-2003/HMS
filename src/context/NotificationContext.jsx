import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket && user) {
            // Join specific role/department channel
            socket.emit('join_department', user.role);
            // Also join a global channel for system-wide announcements
            socket.emit('join_department', 'global');

            socket.on('new_alert', (alert) => {
                const alertWithId = { ...alert, id: Date.now(), timestamp: new Date() };
                setAlerts((prev) => [alertWithId, ...prev]);
                setUnreadCount((prev) => prev + 1);
                
                // Show browser notification if permitted
                if (Notification.permission === 'granted') {
                    new Notification(`Institutional Alert: ${alert.type}`, {
                        body: alert.message,
                        icon: '/logo.png'
                    });
                }
            });
        }
    }, [socket, user]);

    const markAsRead = () => {
        setUnreadCount(0);
    };

    const clearAlerts = () => {
        setAlerts([]);
        setUnreadCount(0);
    };

    const sendAlert = (alertData) => {
        if (socket) {
            socket.emit('send_alert', alertData);
        }
    };

    return (
        <NotificationContext.Provider value={{ alerts, unreadCount, markAsRead, clearAlerts, sendAlert }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
