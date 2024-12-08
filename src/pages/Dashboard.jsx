import PieChart from '../components/PieChart';  
import BarChart from '../components/BarChart';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      {/* Contenedor flex para las gráficas */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <PieChart />  {/* Llamada al componente para mostrar la gráfica */}
        <BarChart />
      </div>
    </div>
  );
};

export default Dashboard;
