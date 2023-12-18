import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const BoxplotChart = ({ series, categories, title }) => {
  const options = {
    chart: {
      type: 'boxPlot',
      background: '#fff',
    },
    colors: [
      '#232121',
      theme.palette.primary.main,
      '#005461',
      '#8FBC8F',
      '#ffb787',
      '#232121',
      '#7F3C8D',
      '#4E8A8B',
      '#D35400',
      '#3498DB',
      '#27AE60',
      '#F39C12',
      '#8E44AD',
      '#2C3E50',
      '#E74C3C',
      '#1ABC9C',
    ],
    xaxis: {
      type: 'category',
      categories: categories,
    },
    title: {
      text: title || 'Boxplot Chart',
      align: 'center',
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series || []} type="bar" height={550} />
    </div>
  );
};

export default BoxplotChart;
