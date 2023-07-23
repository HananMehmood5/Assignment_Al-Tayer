// useQuickSearch.js
import axios from 'axios';
import { useState, useCallback } from 'react';

const useCategoryTree = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryTree, setCategoryTree] = useState(null);

  const getCategoryTree = useCallback(
    () => {
      setLoading(true);
      setError(null);

      axios
        .get('/category-tree')
        .then(({ data }) => {
          setCategoryTree({ ...data, parent: null });
        }).catch((e) => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  const refresh = useCallback(
    () => {
      setLoading(true);
      setError(null);

      axios
        .get('/flush-category-tree-cache')
        .then(() => {
          getCategoryTree();
        }).catch((e) => {
          setError(e);
          setLoading(false);
        });
    },
    [],
  );

  return {
    loading,
    error,
    categoryTree,
    getCategoryTree,
    refresh,
  };
};

export default useCategoryTree;
