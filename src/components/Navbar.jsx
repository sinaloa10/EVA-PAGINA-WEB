import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-90 w-screen backdrop-blur-md shadow-md py-4 px-6 fixed top-0 w-full flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#E8B9B6]">Eva</div>

      {/* Menú de Navegación */}
      <ul className="flex space-x-6 font-medium">
        <li className="text-[#E8B9B6] hover:text-[#8ac8fb] transition-all duration-300">
          <Link to="/" >
            Inicio
          </Link>
        </li>
        <li className="text-[#E8B9B6] hover:text-[#8ac8fb] transition-all duration-300">
          <Link to="/login">
            Iniciar Sesión
          </Link>
        </li>
        <li className="text-[#E8B9B6] hover:text-[#8ac8fb] transition-all duration-300">
          <Link to="/about">
            Acerca de
          </Link>
        </li>
        <li className="text-[#E8B9B6] hover:text-[#8ac8fb] transition-all duration-300">
          <Link to="/contact">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
