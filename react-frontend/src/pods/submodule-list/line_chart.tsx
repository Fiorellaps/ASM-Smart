import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { theme } from 'core/theme';

const LineChart = ({ categories, series, title }) => {
  const options = {
    chart: {
      id: 'basic-line',
    },
    xaxis: {
      categories: categories,
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
    ],
    legend: {
      position: 'top',
    },
  };
  return (
    <Card style={{ width: 400, height: 400 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={330}
        />
      </CardContent>
    </Card>
  );
};

export default LineChart;
