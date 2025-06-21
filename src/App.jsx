import { Form, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Principal from './components/Pages/web';
import Dashboard from './components/Pages/Dashboard';
import Login from './components/Login/login';
import Register from './components/Login/register';
import Navbar from '../src/components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import Survey from './components/Pages/Survey';
import NotFound from './components/Pages/NotFound';

function App() {
  const location = useLocation();

  const hideLayoutRoutes = ['/dashboard', '/register', '/login'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col justify-between items-center">
      <Routes>
        <Route path="/login" element={
          <>
            {!shouldHideLayout && <Navbar />}
            <Login />
          </>
        } />
        <Route path="/dash" element={
          <>
          
            <Dashboard />
          </>
        } />
        <Route path="/" element={
          <>
            {!shouldHideLayout && <Navbar />}
            <Principal />
            <Footer />
          </>
        } />
        <Route path="/encuesta" element={
          <>
            {!shouldHideLayout && <Navbar />}
            <Survey />
          </>
        } />
        <Route path="/register" element={
          <>
            {!shouldHideLayout && <Navbar />}
            <Register />
          </>
        } />

        {/* Ruta 404 sin Navbar ni Footer */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
