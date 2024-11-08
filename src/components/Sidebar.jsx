import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-[var(--color-2)] h-screen p-5 text-white relative">
      <h2 className="text-2xl font-bold mb-10">SIGEMA</h2>
      <ul className="relative">
        {['/dashboard', '/appointments', '/staff', '/history', '/settings', '/'].map((path, index) => (
          <li className="mb-4" key={path} style={{ position: 'relative' }}>
            <Link to={path} className="hover:text-[orange;] relative z-10">
              {path === '/dashboard' && 'Dashboard'}
              {path === '/appointments' && 'Gestor de Citas'}
              {path === '/staff' && 'Personal'}
              {path === '/history' && 'Historial de Citas'}
              {path === '/settings' && 'Configuración'}
              {path === '/' && 'Cerrar Sesión'}
            </Link>
            {location.pathname === path && (
              <motion.div
                layoutId="sidebar-highlight"
                className="absolute inset-0 bg-[orange;] rounded-md -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
