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
        if (user) {
            const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
            setSocket(newSocket);

            newSocket.on('connect', () => {
                newSocket.emit('join_department', user.role);
                newSocket.emit('join_department', 'global');
            });

            newSocket.on('new_alert', (alert) => {
                const alertWithId = { ...alert, id: Date.now(), timestamp: new Date() };
                setAlerts((prev) => [alertWithId, ...prev]);
                setUnreadCount((prev) => prev + 1);
            });

            return () => newSocket.close();
        }
    }, [user]);

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
