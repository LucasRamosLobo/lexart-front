import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAdd, fetchProducts, Edit, productId, setEdit, fetchProductsFunction }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    model: '',
    price: 0,
    color: '',
  });

  // Atualiza os campos do formulário quando o modo de edição é ativado
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      let response;
  
      if (Edit) {
        // Se estiver editando, faz uma requisição PUT para atualizar o produto
        response = await fetch(`https://lexart-back-ecru.vercel.app/api/products/${productId.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
        setEdit(false);
  
        if (response.ok) {
            const data = await response.json();
            onAdd(data)
            fetchProducts(true);
            fetchProductsFunction()
        } else {
          console.error('Falha ao enviar o formulário do produto:', response.status);
        }
      } else {
     
        response = await fetch('https://lexart-back-ecru.vercel.app/api/products', {
          method: 'POST',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
      }

      if (response.ok) {
        const data = await response.json();

 
          onAdd(data);
        

        setNewProduct({
          name: '',
          brand: '',
          model: '',
          price: 0,
          color: '',
        });
        fetchProducts(true);
      } else {
        console.error('Falha ao enviar o formulário do produto:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário do produto:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={styles.productForm}>
      {/* Campos de entrada para adição/edição */}
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
