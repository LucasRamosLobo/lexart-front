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
      const response = await fetch('https://lexart-back-ecru.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <form onSubmit={handleRegistration} style={styles.registrationForm}>
        <label style={styles.inputLabel}>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleInputChange} style={styles.inputField} />
        </label>
        <label style={styles.inputLabel}>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} style={styles.inputField} />
        </label>
        <label style={styles.inputLabel}>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} style={styles.inputField} />
        </label>
        <button type="submit" style={styles.submitButton}>Register</button>
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
  registrationForm: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '20px',
    width: '300px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RegistrationForm;
