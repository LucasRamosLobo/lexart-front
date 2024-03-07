import React from 'react';

const Products = ({ products, onDelete, onEdit, stateEdit }) => {


  return (
    <div>
      <h3>Lista:</h3>
      <div style={styles.productContainer}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <h4>{product.name}</h4>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Model:</strong> {product.model}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <div style={styles.buttonContainer}>
              <button style={styles.deleteButton} onClick={() => onDelete(product.id)}>
                Delete
              </button>
              <button style={styles.editButton} onClick={() => onEdit(product.id, product)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  productCard: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '20px',
    width: '200px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px',
  },
  buttonContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Products;
