import React from 'react'; 
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Citas por Mes',
    },
    series: [
      {
        name: 'meses',
        colorByPoint: true,
        data: [
          { name: 'Noviembre', y: 50 },
          { name: 'Diciembre', y: 30 },
          { name: 'Octubre', y: 20 },
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

export default PieChart;
