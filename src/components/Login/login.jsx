import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importa Link

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === 'ejmeplo@gmail.com' && password === 'pas123') {
         navigate ('/perfil');
    }else{
        alert('Correo electrónico o contraseña incorrectos');
        setEmail('');
        setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl text-center font-semibold text-[#8d6e63] mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#8d6e63] text-sm font-medium" htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8d6e63] text-black" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-[#8d6e63] text-sm font-medium " htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              className="text-black w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8d6e63]" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#8d6e63] text-white py-3 rounded-lg font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
