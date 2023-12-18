import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const MixedChart = ({ data, categories, title }) => {
  const yaxisOptions = data.map((series, index) => ({
    title: {
      text: series.name,
      style: {
        fontSize: '16px', // Set Y-axis label text size
      },
    },
    opposite: index % 2 === 0, // Make every second Y-axis opposite
  }));
  const mixedChartOptions = {
    chart: {
      id: 'mixed-chart',
      background: '#fff', // Set background color to white
      toolbar: {
        show: false, // Hide the toolbar if needed
      },
    },
    colors: [
      '#ffccc4',
      '#25b1bf',
      '#005461',
      '#8FBC8F',
      '#ffb787',
      '#232121',
      '#7F3C8D',
      '#4E8A8B',
      '#D35400',
      '#3498DB',
    ],
    title: {
      text: title || 'Mixed LineColumn Chart',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333', // Set title color
      },
    },
    xaxis: {
      categories: categories || [],
    },
    yaxis: yaxisOptions,
  };

  return (
    <Chart options={mixedChartOptions} series={data} type="line" height={500} />
  );
};

export default MixedChart;
