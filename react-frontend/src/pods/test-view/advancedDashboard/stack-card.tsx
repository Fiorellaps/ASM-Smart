import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { SouthEast, NorthEast } from '@mui/icons-material';

import { theme } from 'core/theme';

const StackCard = ({ cardHeader, value }) => {
  return (
    <Grid item>
      <Card style={{ height: '120px' }}>
        <CardContent>
          {/* Header */}
          <Typography variant="h6" style={{ fontSize: '15px' }} align="center">
            {cardHeader}
          </Typography>

          {/* Value in the center */}
          <Typography style={{ fontSize: '15px' }} align="center">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StackCard;
