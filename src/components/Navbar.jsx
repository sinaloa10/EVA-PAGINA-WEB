import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="bg-white bg-opacity-90 w-screen backdrop-blur-md shadow-md py-4 px-6 fixed top-0 w-full flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#E8B9B6]">Eva</div>

      {/* Menú de Navegación */}
      <ul className="flex space-x-6 font-medium">
        <li
          className="hover:text-[#8ac8fb] transition-all duration-300"
          onMouseEnter={() => setHoveredLink('inicio')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link
            to="/"
            style={{
              color: hoveredLink === 'inicio' ? '#8ac8fb' : '#E8B9B6',
              textDecoration: 'none',
            }}
          >
            Inicio
          </Link>
        </li>
        <li
          className="hover:text-[#8ac8fb] transition-all duration-300"
          onMouseEnter={() => setHoveredLink('login')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link
            to="/login"
            style={{
              color: hoveredLink === 'login' ? '#8ac8fb' : '#E8B9B6',
              textDecoration: 'none',
            }}
          >
            Iniciar Sesión
          </Link>
        </li>
        <li
          className="hover:text-[#8ac8fb] transition-all duration-300"
          onMouseEnter={() => setHoveredLink('about')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link
            to="/about"
            style={{
              color: hoveredLink === 'about' ? '#8ac8fb' : '#E8B9B6',
              textDecoration: 'none',
            }}
          >
            Acerca de
          </Link>
        </li>
        <li
          className="transition-all duration-300"
          onMouseEnter={() => setHoveredLink('contact')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link
            to="/contact"
            style={{
              color: hoveredLink === 'contact' ? '#8ac8fb' : '#E8B9B6',
              textDecoration: 'none',
            }}
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
