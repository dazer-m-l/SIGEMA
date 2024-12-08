import React, { useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStoredTheme, setStoredTheme } from '../pages/Theme';

const Sidebar = () => {
  const location = useLocation();
  ///modificado
  const [isDarkTheme, setIsDarkTheme] = useState(false);///

  return (
    ///modificado
    <div className={`sidebar w-64 h-screen p-5 relative bg-white text-black dark:bg-gray-800 dark:text-white transition-colors duration-300`}> 
      <h2 className="text-2xl font-bold mb-10">SIGEMA</h2>
      <ul className="relative">
        {['/dashboard', '/appointments', '/staff', '/history', '/settings', '/'].map((path, index) => (
          //modiificado
          <li className="mb-4" key={path} style={{ position: 'relative'  }}>
            <Link to={path} className="hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-300 relative z-10"> 
              {path === '/dashboard' && 'Dashboard'}
              {path === '/appointments' && 'Gestor de Citas'}
              {path === '/staff' && 'Personal'}
              {path === '/history' && 'Historial de Citas'}
              {path === '/settings' && 'Configuración'}
              {path === '/' && 'Cerrar Sesión'}
            </Link>
            {location.pathname === path && (
              <motion.div
              //modificado
                layoutId="sidebar-highlight"
                className="absolute inset-0 bg-orange-500 rounded-md -z-10"
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
