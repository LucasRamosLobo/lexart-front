// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar" style={navbarStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to="/register" style={linkStyle}>Register</Link>
        </li>
        <li style={liStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
        </li>
        <li style={liStyle}>
          <Link to="/products" style={linkStyle}>Products</Link>
        </li>
      </ul>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const ulStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'center',
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontSize: '1.2em',
};

export default Header;