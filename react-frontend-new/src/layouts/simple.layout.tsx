import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "global-css/images/logo.png";
import { theme } from "./theme.layout";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Footer } from "./footer.layout";

interface Props {
  children: React.ReactNode;
}

export const SimpleLayout: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <img src={logo} alt="logo ASM" width="100" />
            </Box>{" "}
            <Typography variant="h6" component="div">
              Smart ASM
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="md">
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
};
