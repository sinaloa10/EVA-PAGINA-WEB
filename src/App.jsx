import { Form, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Principal from './components/Pages/web';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Login/login';
import Register from './components/Login/register';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import Survey from './components/Pages/Survey';

function App() {
  const location = useLocation(); // Obtener la ruta actual

  // Lista de rutas que NO deben mostrar Navbar ni Footer
  const hideLayoutRoutes = ['/dashboard'];

  // Verificar si la ruta actual está en la lista
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col justify-between items-center">
      {!shouldHideLayout && <Navbar />}
      <div className='flex-grow'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Principal />
              {/*<Footer /> Se repetia*/}
            </>
          } />
          <Route path="/dashboard" element={<Dashboard className="p-96" />} />
          <Route path="/encuesta" element={<Survey />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {!shouldHideLayout && location.pathname === '/' && <Footer />}
    </div>
  );
}

export default App;
