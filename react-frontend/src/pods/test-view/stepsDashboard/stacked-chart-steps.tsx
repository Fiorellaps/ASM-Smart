import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const StackedChartSteps = ({ series, categories, title }) => {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      horizontal: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.light,
      theme.palette.secondary.light,
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
      '#27AE60',
      '#F39C12',
      '#8E44AD',
      '#2C3E50',
      '#E74C3C',
      '#1ABC9C',
    ],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: title || 'Line Chart',
      align: 'center',
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series || []} type="bar" height={650} />
    </div>
  );
};

export default StackedChartSteps;