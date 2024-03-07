import React from 'react';

const Products = ({ products }) => {
  return (
    <div>
      <h3>Product List:</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;