// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 h-screen p-5 text-white">
      <h2 className="text-2xl font-bold mb-10">SIGEMA</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/appointments" className="hover:text-gray-300">Gestor de Citas</Link>
        </li>
        <li className="mb-4">
          <Link to="/staff" className="hover:text-gray-300">Personal</Link>
        </li>
        <li className="mb-4">
          <Link to="/history" className="hover:text-gray-300">Historial de Citas</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="hover:text-gray-300">Configuración</Link>
        </li>
        <li className="mb-4">
          <Link to="/" className="hover:text-gray-300">Cerrar Sesión</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
