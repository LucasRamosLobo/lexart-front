import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

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
      }

      console.log('Login successful:', response.data);
   
    } catch (error) {
      console.error('Login failed:', error.response.data);
     
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" name="username" value={loginData.username} onChange={handleInputChange} />
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
