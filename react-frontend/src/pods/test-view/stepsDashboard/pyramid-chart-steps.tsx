import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const PyramidChartSteps = ({ series, categories, title }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
        endingShape: 'flat',
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
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
      style: {
        colors: ['black'],
        fontSize: '14px',
      },
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: title || 'Pyramid  Chart',
      align: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series || []} type="bar" height={350} />
    </div>
  );
};

export default PyramidChartSteps;
