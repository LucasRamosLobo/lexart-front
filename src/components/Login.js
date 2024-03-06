import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post('/api/login', loginData);
      console.log('Login successful:', response.data);
      // Handle success, redirect or show a success message
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle error, show an error message
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" name="email" value={loginData.email} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={loginData.password} onChange={handleInputChange} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;