import { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Principal from './components/Principal/web';
import Dashboard from './components/DashBoard/Dashboard';
import Login from './components/Login/login';
function App() {

  return (
    <div className="App" >


      <Routes> {/* Define las rutas dentro de Routes */}
        <Route path="/" element={<Login />} /> {/* Ruta para Login */}
        <Route path="/inicio" element={<Principal />} /> {/* Ruta para Principal */}
        <Route path="/perfil" element={<Dashboard />} /> {/* Ruta para Dashboard */}
      </Routes>
    </div>
  );
}

export default App;