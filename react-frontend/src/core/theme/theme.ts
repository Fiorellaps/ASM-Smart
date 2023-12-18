import merge from 'lodash.merge';
import {
  createTheme,
  Theme as DefaultTheme,
  PaletteColor,
} from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#919191',
      main: '#7c0404',
      dark: '#6F1515',
    },
    secondary: {
      light: '#B93F3F',
      main: '#535454',
      dark: '#4E4C4C',
    },
    success: {
      main: '#43a047',
    },
    info: {
      main: '#1976d2',
    },
    warning: {
      main: '#ffa000',
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-selected': {
            color: '#ffffff',
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

type Theme = DefaultTheme & {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    success: PaletteColor;
    info: PaletteColor;
    warning: PaletteColor;
    table: {
      row: PaletteColor;
    };
  };
};

export const theme: Theme = merge(defaultTheme, {
  palette: {
    table: {
      row: {
        main: '#ddd',
      },
    },
  },
} as Theme);
