import React from 'react';
import { hot } from 'react-hot-loader/root';

import './Results.less';
import Product from '../product/Product';

const QuickSearchResults = ({ error, query, products }) => {
  if (error || !products.length) {
    return (
      <div className="results-container non-products">
        {error
          ? <span className="error">{error}</span>
          : (
            <span>
              Your search&nbsp;
              <b>{query}</b>
              &nbsp;did not return any results
            </span>
          )}
      </div>
    );
  }

  return (
    <div className="results-container products">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default hot(QuickSearchResults);
