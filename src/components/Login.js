import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lexart-back-ecru.vercel.app/api/login', loginData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved to localStorage:', response.data.token);
        navigate('/products'); 
      }

      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError('Credenciais inválidas');
    }
  };

  return (
    <div style={styles.cardContainer}>
      <form onSubmit={handleLogin} style={styles.loginForm}>
        <h2 style={styles.title}>Login:</h2>
        <label style={styles.inputLabel}>
          Username:
          <input type="text" name="username" value={loginData.username} onChange={handleInputChange} style={styles.inputField} />
        </label>
        <label style={styles.inputLabel}>
          Password:
          <input type="password" name="password" value={loginData.password} onChange={handleInputChange} style={styles.inputField} />
        </label>
        <button type="submit" style={styles.submitButton}>
          Login
        </button>
        {error && <p style={styles.errorText}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginForm: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '20px',
    width: '300px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputLabel: {
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
  submitButton: {
    backgroundColor:  '#333',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%', // Botão agora ocupa 100% da largura
  },
  errorText: {
    color: 'red',
    marginTop: '10px',
  },
};

export default LoginForm;
