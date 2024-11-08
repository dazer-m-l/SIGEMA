import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // Nuevo estado para la animación de salida mi bro :)
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Activar animación de salida despues de que le des click en iniciar sesion bro :)
      setIsExiting(true);

      // Navegar al dashboard después de un retraso de tiempo mi bro :)
      setTimeout(() => {
        navigate('/dashboard');
      }, 500); // Ajusta el tiempo para que coincida con la duración de la animación que le puse bro, pero si assi la quieres we asi dejale  :)
    } catch (error) {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center bg-[#8ECAE6]">
      {/* Logo afuera de la tarjeta */}
      <div className="mb-4">
        <img
          src="src/assets/images/logo.png"
          alt="Logo del proyecto"
          className="w-40 h-auto"
        />
      </div>
      <div
        className={`max-w-md w-full p-6 rounded-lg shadow-lg backdrop-blur-lg bg-white/40 transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${isExiting ? 'opacity-0 scale-90' : ''}`} // Añadir clase para animación de salida
      >
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
          <p className="text-center mt-4">
            <a href="/forgot-password" className="text-blue-500">¿Olvidaste tu contraseña?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
