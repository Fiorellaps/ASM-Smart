import React from 'react';
import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { SouthEast, NorthEast } from '@mui/icons-material';

import { theme } from 'core/theme';

const StackCard = ({
  cardHeader,
  difference,
  value,
  previousValue,
  invertColors = false,
}) => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          {/* Header */}
          <Typography variant="h6" align="center">
            {cardHeader}
          </Typography>

          {/* Value in the center */}
          <Typography variant="h4" align="center">
            {value}

            {difference < 0 ? (
              <Chip
                label={difference * -1}
                icon={<SouthEast style={{ color: 'white' }} />}
                style={{
                  marginLeft: '10px',
                  fontSize: '1.1rem',
                  backgroundColor: invertColors
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                }}
              />
            ) : (
              <Chip
                label={difference}
                icon={<NorthEast style={{ color: 'white' }} />}
                style={{
                  marginLeft: '10px',
                  fontSize: '1.1rem',
                  backgroundColor: invertColors
                    ? theme.palette.error.dark
                    : theme.palette.success.dark,
                }}
              />
            )}
          </Typography>

          {/* Small chip with arrow indicating increase */}

          {/* Footer with difference */}
          <Typography variant="body2" color="textSecondary" align="left">
            Valor del periodo anterior: {previousValue}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StackCard;
