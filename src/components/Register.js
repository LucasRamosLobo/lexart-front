import React, { useState } from 'react';

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the registration endpoint using fetch
      const response = await fetch('https://lexart-back-ad9e1my9i-lucasramoslobo.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Handle success, redirect or show a success message
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle error, show an error message
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle other errors, show an error message
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <label>
        Username:
        <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
