import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { theme } from 'core/theme';

const HorizontalBarChart = ({ categories, series, title }) => {
  const options = {
    colors: [
      theme.palette.primary.light,
      theme.palette.secondary.light,
      '#ffccc4',
      '#25b1bf',
      '#005461',
      '#8FBC8F',
      '#ffb787',
      '#232121',
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '70%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
      fixed: {
        enabled: true,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
  };
  return (
    <Card style={{ width: 300, height: 250 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={190}
        />
      </CardContent>
    </Card>
  );
};

export default HorizontalBarChart;
