import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import './general.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [hoveredLogin, setHoveredLogin] = useState(false);


  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    
    navigate('/perfil');
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 sinBarraDesplazamiento">

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-full">
        <h2 className="text-3xl text-center font-semibold text-[#023d6d] mb-6">Crear Cuenta</h2>
        <form onSubmit={handleRegister} className="grid grid-cols-1 ">
          {/* Nombre y Apellido (En columnas) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-[#023d6d] text-sm font-medium" htmlFor="firstName">Nombre</label>
              <input 
                type="text" 
                id="firstName"
                className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
                placeholder="Nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-[#023d6d] text-sm font-medium" htmlFor="lastName">Apellido</label>
              <input 
                type="text" 
                id="lastName"
                className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                required
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <label className="block text-[#023d6d] text-sm font-medium" htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          {/* Número de Teléfono */}
          <div className="mb-4">
            <label className="block text-[#023d6d] text-sm font-medium" htmlFor="phoneNumber">Número de Teléfono</label>
            <input 
              type="tel" 
              id="phoneNumber"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
              placeholder="Número de Teléfono"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required
            />
          </div>

          {/* Contraseña y Confirmar Contraseña (En columnas) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-[#023d6d] text-sm font-medium" htmlFor="password">Contraseña</label>
              <input 
                type="password" 
                id="password" 
                className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-[#023d6d] text-sm font-medium" htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input 
                type="password" 
                id="confirmPassword"
                className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8ac8fb] text-black" 
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required
              />
            </div>
          </div>

          {/* Botón de Enviar */}
          <button 
            type="submit" 
            style={{
              backgroundColor: '#8ac8fb', // Color similar a amber-100
              color: 'white',
              padding: '12px 0',
              borderRadius: '8px',
              fontWeight: '600',
              width: '100%',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#E8B9B6'} // Hover
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8ac8fb'} // Vuelve al color original
          
          
          >
            Crear Cuenta
          </button>

          {/* Enlace para iniciar sesión */}
          <div className="text-center ">
            <Link to="/login" 
            style={{ color: hoveredLogin ? '#E8B9B6' : '#023d6d' }}
            onMouseEnter={() => setHoveredLogin(true)}  // Al pasar el mouse
            onMouseLeave={() => setHoveredLogin(false)}  // Al salir del mouse
            >¿Ya tienes una cuenta? Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
