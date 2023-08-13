import React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ASM SMART
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      display: "flex",
      py: 3,
      px: 2,
      mt: "2em",
      backgroundColor: (theme) =>
        theme.palette.mode === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}
  >
    <Container maxWidth="sm">
      <div className="layout-center">
        <Copyright />
      </div>
    </Container>
  </Box>
);
