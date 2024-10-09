import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100"><Outlet/></div>
    </div>
  );
};

export default Layout;
