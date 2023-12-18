import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value, stat_color }) => {
  return (
    <Card
      style={{
        width: 300,
        height: 250,
        padding: '1px',
        backgroundColor: stat_color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardContent style={{ textAlign: 'left' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          backgroundColor: 'inherit',
          borderColor: 'red',
          width: '100%',
        }}
      >
        <Typography variant="h5" component="div" align="center">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
