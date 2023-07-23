import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import CheckboxTree from '../checkbox-tree/CheckboxTree';
import QuickSearch from '../quick-search/QuickSearch';
import useCategoryTree from '../../hooks/useCategoryTree';
import SpinnerIcon from '../icons/Spinner';
import './App.less';

export default hot(() => {
  const {
    loading, error, categoryTree, getCategoryTree, refresh: handleRefresh,
  } = useCategoryTree();
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getCategoryTree();
  }, []);

  return (
    <div className="App">
      <div className="App-componentContainer">
        <div className="App-componentHeader">
          <div className="App-componentTitleText">QUICK SEARCH</div>
        </div>
        <QuickSearch />
      </div>
      <div className="App-componentContainer">
        <div className="App-componentHeader">
          <div className="App-componentTitleText">CHECKBOX TREE</div>
          <button
            className="Button"
            type="button"
            onClick={handleRefresh}
            disabled={loading}
          >
            {!loading ? 'REFRESH' : <SpinnerIcon width={14} height={14} />}
          </button>
        </div>
        {categoryTree && (
          <CheckboxTree
            node={categoryTree}
            selected={selected}
            setSelected={setSelected}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}
        {error && <span>{error}</span>}
      </div>
    </div>
  );
});
