import React from 'react'; 
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Estado de la Cita',
    },
    series: [
      {
        name: 'Estado de la Cita',
        colorByPoint: true,
        data: [
          { name: 'Aceptada', y: 45 },
          { name: 'Pendiente', y: 30 },
          { name: 'Cancelada', y: 25 },
        ],
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto', paddingTop: '20px' }}>
      <h2 className="text-center">Gráfico de Pastel</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
