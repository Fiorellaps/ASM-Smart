import React from 'react';
import Chart from 'react-apexcharts';
import { theme } from 'core/theme';

const RadialChart = ({ labels, series, title }) => {
  const options = {
    series: series || [],
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 200,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    title: {
      text: title || 'Disponibilidad media por pasos',
      align: 'center',
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
    labels: labels || [],
    legend: {
      show: true,
      floating: true,
      fontSize: '16px',
      position: 'left',
      offsetX: 150,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="radialBar" height={390} />
    </div>
  );
};

export default RadialChart;
