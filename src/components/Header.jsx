// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="nav">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/about" className="nav-link">Acerca de</Link>
        <Link to="/contact" className="nav-link">Contacto</Link>
      </nav>
    </header>
  );
};

export default Header;