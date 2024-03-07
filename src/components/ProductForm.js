import React, { useState, useEffect } from 'react';

const ProductForm = ({ setNewProduct, newProduct, Edit, productId, handleFormSubmit }) => {

  useEffect(() => {
    if (Edit) {
      setNewProduct(Edit);
    } else {
      setNewProduct({
        name: '',
        brand: '',
        model: '',
        price: 0,
        color: '',
      });
    }
  }, [Edit]);
  console.log(Edit, productId)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(newProduct);
  };


  return (
    <form onSubmit={handleSubmit} style={styles.productForm}>
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
        {Edit ? 'Atualizar' : 'Adicionar'}
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
