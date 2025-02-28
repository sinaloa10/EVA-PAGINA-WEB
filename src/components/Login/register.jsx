import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Importa Link

const Register = () => {
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
        <h2 className="text-3xl text-center font-semibold text-[#8ac8fb] mb-6">Crear Cuenta</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#8ac8fb] text-sm font-medium" htmlFor="email">Correo Electrónico</label>
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
          
          <div className="mb-6">
            <label className="block text-[#8ac8fb] text-sm font-medium " htmlFor="password">Contraseña</label>
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
            className="w-full bg-amber-100 text-white py-3 rounded-lg font-semibold "
          >
            Iniciar Sesión
          </button>
          <div className="text-center m-2">
            <Link className="text-blue-500">¿No recuerdas la contraseña?</Link>
          </div>
          <div className="text-center m-2">
            <Link className="text-blue-500">¿No tienes una cuenta bb? Crea una</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
