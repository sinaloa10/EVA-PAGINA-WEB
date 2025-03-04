import { Route, Routes } from 'react-router-dom';
import './App.css';
import Principal from './components/Principal/web';
import Dashboard from './components/DashBoard/Dashboard';
import Login from './components/Login/login';
import Register from './components/Login/register';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from '../src/components/Footer/footer';

function App() {
  return (
    <div className="bg-[#EAE5EE] w-screen min-h-screen flex flex-col justify-between items-center"> {/* Asegurar estructura flexible */}
      <Navbar /> {/* Navbar */}
      <div className='p-16 flex-grow'>
        {/* Agregar rutas aquí */}
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Ruta para Login */}
          <Route path="/" element={<Principal />} /> {/* Ruta para Principal */}
          <Route path="/dashboard" element={<Dashboard />} className="p-20" /> {/* Ruta para Dashboard */}
          <Route path="/register" element={<Register />} /> {/* Ruta para Registro */}
        </Routes>
      </div>
      <Footer /> {/* Footer */}
    </div>
  );
}

export default App;
