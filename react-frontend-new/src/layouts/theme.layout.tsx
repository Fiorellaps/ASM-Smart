import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#7c0404", // Adjust the color to your preference
    },
    secondary: {
      main: "#535454",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#535454",
        },
      },
    },
  },
});
