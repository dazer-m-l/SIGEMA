// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[var(--color-2)] h-screen p-5 text-white">
      <h2 className="text-2xl font-bold mb-10">SIGEMA</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-[var(--color-4)]">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/appointments" className="hover:text-[var(--color-4)]">Gestor de Citas</Link>
        </li>
        <li className="mb-4">
          <Link to="/staff" className="hover:text-[var(--color-4)]">Personal</Link>
        </li>
        <li className="mb-4">
          <Link to="/history" className="hover:text-[var(--color-4)]">Historial de Citas</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="hover:text-[var(--color-4)]">Configuración</Link>
        </li>
        <li className="mb-4">
          <Link to="/" className="hover:text-[var(--color-4)]">Cerrar Sesión</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;