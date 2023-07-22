import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';

import CheckboxTree from '../checkbox-tree/CheckboxTree';
import QuickSearch from '../quick-search/QuickSearch';
import './App.less';

export default hot(() => {
  const [categoryTree, setCategoryTree] = useState(null);
  useEffect(() => {
    axios
      .get('/category-tree')
      .then(({ data }) => {
        setCategoryTree({ ...data, parent: null });
      });
  }, []);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

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
            onClick={() => {
              // PLEASE IMPROVE ME
              axios
                .get('/flush-category-tree-cache');
            }}
          >
            REFRESH
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
      </div>

    </div>
  );
});
