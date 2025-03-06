import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Importar Axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hoveredOlvido, setHoveredOlvido] = useState(false);
  const [hoveredRegistrar, setHoveredRegistrar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar solicitud de inicio de sesión al backend
      const response = await axios.post('http://localhost:3000/api/auth/login/psychologist', {
        email,  
        password,
      });

      // Si la respuesta es exitosa, navegar al dashboard
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Guardar token en localStorage
        localStorage.setItem('psychologist_id', response.data.psychologist_id); // Guardar psychologist_id en localStorage
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Correo electrónico o contraseña incorrectos');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen sinBarraDesplazamiento">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl text-center font-semibold text-[#023d6d] mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#023d6d] text-sm font-medium" htmlFor="email">Correo Electrónico</label>
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
            <label className="block text-[#023d6d] text-sm font-medium " htmlFor="password">Contraseña</label>
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
              backgroundColor: '#8ac8fb',
              color: 'white',
              padding: '12px 0',
              borderRadius: '8px',
              fontWeight: '600',
              width: '100%',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#E8B9B6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8ac8fb'}
          >
            Iniciar Sesión
          </button>

          <div className="text-center m-2">
            <Link  
              style={{ color: hoveredOlvido ? '#E8B9B6' : '#023d6d'  }}
              onMouseEnter={() => setHoveredOlvido(true)}  
              onMouseLeave={() => setHoveredOlvido(false)}  
            >
              ¿No recuerdas la contraseña?
            </Link>
          </div>
          <div className="text-center m-2">
            <Link 
              to="/register"  
              style={{ color: hoveredRegistrar ? '#E8B9B6' : '#023d6d'  }}
              onMouseEnter={() => setHoveredRegistrar(true)}  
              onMouseLeave={() => setHoveredRegistrar(false)}  
            >
              ¿No tienes una cuenta? Crea una
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
