import React from 'react';
import { Typography } from '@mui/material';
import { CopyrightComponent } from './components';
import * as classes from './footer.styles';

export const FooterComponent: React.FC = () => (
  <footer className={classes.footer}>
    <CopyrightComponent />
  </footer>
);
