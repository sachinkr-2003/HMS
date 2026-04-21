import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

/**
 * Institutional Persistence Hook (Socket.io)
 * Manages persistent terminal linkage and departmental radio channels
 */
const useSocket = (department) => {
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'https://hms-backend-1-uchi.onrender.com');

        if (department) {
            socketRef.current.emit('join_department', department);
        }

        return () => {
            socketRef.current.disconnect();
        };
    }, [department]);

    return socketRef.current;
};

export default useSocket;
