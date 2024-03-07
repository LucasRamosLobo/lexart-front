import React, { useEffect, useState } from 'react';
import Products from '../components/Products';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [fetchProductsBoolean, setFetchProductsBoolean] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://lexart-back-ecru.vercel.app/api/products', {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data);
          fetchProductsBoolean(false)
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [fetchProductsBoolean]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setFilteredProducts([...filteredProducts, newProduct]);
    setShowAddForm(false);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://lexart-back-ecru.vercel.app/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
        setFilteredProducts(filteredProducts.filter((product) => product.id !== productId));
        fetchProductsBoolean(true)
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = async (productId, updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://lexart-back-ecru.vercel.app/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProducts(products.map((product) => (product.id === productId ? updatedProduct : product)));
        setFilteredProducts(filteredProducts.map((product) => (product.id === productId ? updatedProduct : product)));
      } else {
        console.error('Failed to edit product:', response.status);
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.heading}>Lista de Produtos</h2>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <button style={styles.addButton} onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancelar Adição' : 'Adicionar Produto'}
        </button>

        {showAddForm && <ProductForm onAdd={handleAddProduct} fetchProducts={setFetchProductsBoolean} />}

        <Products
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductsPage;
