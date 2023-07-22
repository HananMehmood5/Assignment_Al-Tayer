import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import SpinnerIcon from '../icons/Spinner';
import SearchIcon from '../icons/SearchIcon';
import CrossIcon from '../icons/CrossIcon';
import QuickSearchResults from './Results';

import './QuickSearch.less';
import useQuickSearch from '../../hooks/useQuickSearch';

const QuickSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    searchProducts, loading, error, results, setLoading,
  } = useQuickSearch();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      searchProducts(value);
      setLoading(true);
    }
  };

  return (
    <div className="quick-search">
      <div className="search-input">
        <SearchIcon width={16} height={16} />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {loading && <SpinnerIcon width={20} height={20} />}
        {!loading && inputValue && (<CrossIcon width={10} height={10} onClick={() => setInputValue('')} />)}
      </div>
      {!loading && inputValue
        && (<QuickSearchResults query={inputValue} products={results} error={error} />)}
    </div>
  );
};

export default hot(QuickSearch);
