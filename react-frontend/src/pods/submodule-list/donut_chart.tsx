import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { theme } from 'core/theme';

const DonutChart = ({ labels, series, title }) => {
  const options = {
    labels: labels,
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
          type="donut"
          height={320}
        />
      </CardContent>
    </Card>
  );
};

export default DonutChart;
