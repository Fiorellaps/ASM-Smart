import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const LineChartSteps = ({ series, categories, title }) => {
  const options = {
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    //colors: ['#77B6EA', '#545454'],
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
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: title || 'Line Chart',
      align: 'center',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: categories || [],
      title: {
        text: 'Fecha',
      },
    },
    yaxis: {
      title: {
        text: 'Tiempo de ejecución',
      },
      //min: 0,
      //max: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -15,
      offsetX: -5,
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series || []} type="line" height={650} />
    </div>
  );
};

export default LineChartSteps;
