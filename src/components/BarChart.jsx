import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/citas');
        const citas = response.data.data; // Ajuste para acceder a la clave "data"

        const months = [...Array(6)].map((_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        });

        const citasPorMes = months.map((month) => {
          const count = citas.filter((cita) => cita.fecha_cita.startsWith(month)).length;
          return { name: month, y: count };
        });

        setData(citasPorMes.reverse());
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Citas por Mes (Últimos 6 Meses)',
    },
    xAxis: {
      categories: data.map((item) => item.name),
      title: {
        text: 'Meses',
      },
    },
    yAxis: {
      title: {
        text: 'Número de Citas',
      },
    },
    series: [
      {
        name: 'Citas',
        data: data.map((item) => item.y),
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <h3 className="text-center">Gráfico de Citas por Mes</h3>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
