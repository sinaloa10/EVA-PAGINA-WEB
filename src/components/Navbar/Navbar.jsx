import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav className="bg-white bg-opacity-90 w-screen backdrop-blur-md shadow-md py-4 px-6 fixed top-0 w-full flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#E8B9B6]">EVA</div>

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
          onMouseEnter={() => setHoveredLink('chat')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <Link
            to="/chat"
            style={{
              color: hoveredLink === 'chat' ? '#8ac8fb' : '#E8B9B6',
              textDecoration: 'none',
            }}
          >
            Chat
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
      </ul>
    </nav>
  );
};

export default Navbar;
