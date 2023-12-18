import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { theme } from 'core/theme';

const SemiCircleGauge = ({ value, text, title }) => {
  const options = {
    colors: [theme.palette.primary.light, theme.palette.secondary.light],

    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            offsetY: -10,
            show: false,
            color: theme.palette.secondary.light,
            fontSize: '17px',
          },
          value: {
            color:
              value >= 0
                ? theme.palette.secondary.light
                : theme.palette.secondary.dark,
            fontSize: '36px',
            show: true,
            formatter: (val) => val,
          },
        },
      },
    },
    labels: [],
  };

  const series = [Math.abs(value)];

  return (
    <Card style={{ width: 400, height: 400 }}>
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <div style={{ width: '100%' }}>
          {value >= 0 ? (
            <ArrowDropUpIcon style={{ color: '#3f51b5', fontSize: 50 }} />
          ) : (
            <ArrowDropDownIcon style={{ color: '#f50057', fontSize: 50 }} />
          )}
          <ReactApexChart
            options={options}
            series={series}
            type="radialBar"
            height={250}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SemiCircleGauge;
