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
  const [edit, setEdit] = useState(false)
  const [productId, setPorductId] = useState()
  const [fetchProductsBoolean, setFetchProductsBoolean] = useState(false);


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
        fetchProductsBoolean(false);
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
          fetchProductsBoolean(false);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [fetchProductsBoolean]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://lexart-back-ecru.vercel.app/api/products/search?term=${term}`, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFilteredProducts(data);
      } else {
        console.error('Failed to search products:', response.status);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
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
        fetchProductsBoolean(true);
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const handleEditButtonClick = (productId) => {
    setShowAddForm(true)
    const productToEdit = products.find((product) => product.id === productId);
    setPorductId(productToEdit);
    setEdit(true);
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

        {showAddForm && (
          <ProductForm
            onAdd={handleAddProduct}
            fetchProducts={setFetchProductsBoolean}
            Edit={edit}
            productId={productId}
            setEdit={setEdit}
            fetchProductsFunction={fetchProducts}

          />
        )}

        <Products
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={handleEditButtonClick}
          stateEdit={setPorductId}
          fetchProducts
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
