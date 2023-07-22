// useQuickSearch.js
import axios from 'axios';
import { useState, useCallback } from 'react';
import debounce from '../utils/debounce';

const useQuickSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce((searchString) => {
      setLoading(true);
      setError(null);

      axios
        .get(`/quick-search?searchString=${searchString}`)
        .then((response) => {
          if (!response.status.toString().startsWith('2')) {
            throw new Error('Network response was not ok');
          }
          return response.data;
        })
        .then((data) => {
          setResults(data.products);
        })
        .catch((e) => {
          if (e.response) {
            setError('Something wrong with the Server');
          } else if (e.request) {
            setError('Something wrong with the Network');
          } else {
            setError(e);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500),
    [],
  );

  return {
    loading,
    error,
    results,
    searchProducts: debouncedSearch,
    setLoading,
  };
};

export default useQuickSearch;
