import React, { useEffect, useState } from 'react';
import Products from '../components/Products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://lexart-back-ecru.vercel.app/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
    
      <Products products={products} />
    </div>
  );
};

export default ProductsPage;