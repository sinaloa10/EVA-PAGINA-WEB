import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full">
      <div className="max-w-5xl mx-auto text-center">
        {/* Logo o Nombre */}
        <h2 className="text-xl font-bold">EVA T.I</h2>
        <p className="text-sm mt-1">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>

        {/* Enlaces */}
        <ul className="flex justify-center space-x-6 mt-4">
          <li>
            <Link
              to="/about"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Acerca de
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

