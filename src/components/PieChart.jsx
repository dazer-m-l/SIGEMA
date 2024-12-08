import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/citas');
        const citas = response.data.data; // Ajuste para acceder a la clave "data"
        const estados = citas.reduce((acc, cita) => {
          acc[cita.estado_cita] = (acc[cita.estado_cita] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.entries(estados).map(([name, y]) => ({ name, y }));
        setData(chartData);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Estado de las Citas',
    },
    series: [
      {
        name: 'Citas',
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h3 className="text-center">Gráfico de Estado de Citas</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
