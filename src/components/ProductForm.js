import React, { useState } from 'react';

const ProductForm = ({ onAdd, fetchProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    model: '',
    price: 0,
    color: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://lexart-back-ecru.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        onAdd(data);
        setNewProduct({ name: '', brand: '', model: '', price: 0, color: '' });
        fetchProducts(true)
      } else {
        console.error('Failed to add product:', response.status);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleAddProduct} style={styles.productForm}>
      <label style={styles.label}>
        Nome:
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={styles.inputField}
        />
      </label>
      <label style={styles.label}>
        Marca:
        <input
          type="text"
          name="brand"
          value={newProduct.brand}
          onChange={handleInputChange}
          style={styles.inputField}
        />
      </label>
      <label style={styles.label}>
        Modelo:
        <input
          type="text"
          name="model"
          value={newProduct.model}
          onChange={handleInputChange}
          style={styles.inputField}
        />
      </label>
      <label style={styles.label}>
        Preço:
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          style={styles.inputField}
        />
      </label>
      <label style={styles.label}>
        Cor:
        <input
          type="text"
          name="color"
          value={newProduct.color}
          onChange={handleInputChange}
          style={styles.inputField}
        />
      </label>
      <button type="submit" style={styles.addButton}>
        Adicionar
      </button>
    </form>
  );
};

const styles = {
  productForm: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '20px',
    width: '300px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  inputField: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  addButton: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductForm;
