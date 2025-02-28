import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'; // Importa Link

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoveredOlvido, setHoveredOlvido] = useState(false); // Estado para el hover del email
  const [hoveredRegistrar, setHoveredRegistrar] = useState(false); // Estado para el hover de la contraseña
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
        <h2 className="text-3xl text-center font-semibold text-[#8ac8fb] mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#8ac8fb] text-sm font-medium" htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-3 mt-1 rounded-lg border border-[#E8B9B6]  focus:ring-2 focus:ring-[#8ac8fb] text-black" 
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
              className="text-black w-full p-3 mt-1 rounded-lg border border-[#E8B9B6] focus:ring-2 focus:ring-[#8d6e63]" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          
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
            Iniciar Sesión
          </button>

          <div className="text-center m-2">
            <Link  
              style={{ color: hoveredOlvido ? '#8ac8fb' : '#E8B9B6' }}
              onMouseEnter={() => setHoveredOlvido(true)}  // Al pasar el mouse
              onMouseLeave={() => setHoveredOlvido(false)}  // Al salir del mouse
            >
              ¿No recuerdas la contraseña?
            </Link>
          </div>
          <div className="text-center m-2">
            <Link 
              to="/register"  
              style={{ color: hoveredRegistrar ? '#8ac8fb' : '#E8B9B6' }}
              onMouseEnter={() => setHoveredRegistrar(true)}  // Al pasar el mouse
              onMouseLeave={() => setHoveredRegistrar(false)}  // Al salir del mouse
            >
              ¿No tienes una cuenta bb? Crea una
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
