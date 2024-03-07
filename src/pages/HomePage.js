// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="content" style={contentStyle}>
        <h1 style={titleStyle}>PROJETO LEXART</h1>
        <h2 style={subtitleStyle}>Faça o Registro e o Login para ter acesso aos produtos</h2>
      </div>
    </div>
  );
};

const contentStyle = {
  textAlign: 'center',
  padding: '20px',
};

const titleStyle = {
  fontSize: '2.5em',
  color: '#333',
};
const subtitleStyle = {
    fontSize: '1.5em',
    color: '#333',
  };

export default HomePage;