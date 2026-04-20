import { useState, useEffect } from 'react';

/**
 * Institutional Data Hook
 * Handles automated data propagation, terminal states, and fetch logic
 */
const useFetch = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await apiFunction();
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Institutional Signal Failure');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
