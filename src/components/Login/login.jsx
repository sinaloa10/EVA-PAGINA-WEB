import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Icono SVG para el loader, se puede mover a su propio componente si se reutiliza.
const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.evasalud.com.mx/auth/api/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem('psychologist_id', response.data.psychologist_id);
        navigate('/chatbot');
      } else {
        setError('Error desconocido al iniciar sesión. Inténtalo de nuevo.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Correo electrónico o contraseña incorrectos.');
        } else if (err.response.data && err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
        }
      } else if (err.request) {
        setError('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      } else {
        setError('Error al configurar la solicitud. Por favor, contacta a soporte.');
      }
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };
  
  const isFormInvalid = !email || !password || loading;

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center bg-[#EAF7FF] p-4 font-sans"
      style={{ background: '#EAF7FF' }} // Fallback por si Tailwind JIT no procesa el color
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Bienvenido de Nuevo
          </h1>
          <p className="text-slate-500">
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8DC8FA] focus:border-transparent transition duration-300 ease-in-out"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8DC8FA] focus:border-transparent transition duration-300 ease-in-out"
              required
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#8DC8FA] focus:ring-[#8DC8FA] focus:ring-offset-0"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-slate-600"
              >
                Recordarme
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="font-medium text-[#8DC8FA] hover:underline"
            >
              ¿Olvidé mi contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isFormInvalid}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#8DC8FA] hover:bg-[#7bbef9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8DC8FA] disabled:bg-[#a0d2f9] disabled:cursor-not-allowed transition-colors duration-300 ease-in-out"
            style={{ background: loading ? '#a0d2f9' : '#8DC8FA' }}
          >
            {loading && <LoadingSpinner />}
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          ¿No tienes una cuenta?{' '}
          <Link
            to="/register"
            className="font-medium text-[#8DC8FA] hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;