import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { useEntriesContext } from './useEntriesContext';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const { dispatch } = useEntriesContext();

    useEffect(() => {
        const abortCont = new AbortController();

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(url, {
                    signal: abortCont.signal,
                    headers: { 'Authorization': `Bearer ${user?.token}` }
                });

                if (!res.ok) {
                    throw new Error('Could not fetch the data');
                }

                const jsonData = await res.json();
                setData(jsonData);
                dispatch({ type: 'SET_ENTRIES', payload: jsonData }); // Dispatch after storing data
                setIsLoading(false);
                setError(null);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            }
        };

        if (user?.token) {
            fetchData(); // Fetch data only if the user is authenticated
        }

        return () => abortCont.abort();
    }, [url, user?.token, dispatch]);

    return { data, isLoading, error };
};

export default useFetch;
