
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Principal from './components/Principal/web';
import Dashboard from './components/DashBoard/Dashboard';
import Login from './components/Login/login';
import Register from './components/Login/register';
import Navbar from './components/Navbar';
function App() {

  return (
    <div className="bg-[#EAE5EE] w-screen min-h-screen flex justify-center items-center" >

        <Navbar /> {/* Navbar */}

    <div className='p-16'>
     {/* Agregar rutas aquí */}
      <Routes> 
        <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
        <Route path="/" element={<Principal />} /> {/* Ruta para Principal */}
        <Route path="/perfil" element={<Dashboard />}  className= "p-20"/> {/* Ruta para Dashboard */}
        <Route path="/register" element={<Register />} /> {/* Ruta para Registro */}
      </Routes>
      </div>

    </div>
  );
}

export default App;