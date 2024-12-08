import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Staff from './pages/Staff';
import History from './pages/History';
import Settings from './pages/Settings';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword'

const App = () => {
  const handleThemeChange = (newTheme) => {
    setIsDarkTheme(newTheme);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
