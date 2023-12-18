import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const MirorrPlotChart = ({ series, categories, title }) => {
  const options = {
    chart: {
      type: 'boxPlot',
      background: '#fff',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '100%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },

    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val;
        },
      },
      y: {
        formatter: function (val) {
          return Math.abs(val);
        },
      },
    },
    colors: [
      theme.palette.primary.main,
      '#005461',
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

export default MirorrPlotChart;
