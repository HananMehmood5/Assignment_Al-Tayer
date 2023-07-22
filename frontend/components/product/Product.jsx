import React from 'react';
import { hot } from 'react-hot-loader/root';

import './Product.less';

const Product = ({ product }) => (
  <div key={product.id} className="product">
    <img
      className="product-image"
      src={product.image}
      alt={product.title}
    />
    <span className="product-category">
      {product.designerCategoryName}
    </span>
    <span className="product-name">
      {product.name}
    </span>
    <span className="product-price">
      {product.price}
        &nbsp;AED
    </span>
  </div>
);

export default hot(Product);
