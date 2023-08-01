// src/components/Login.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  AlertColor,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error"); // 'error', 'success', 'info', or 'warning'
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("OK", data.message); // Should log "Login successful" on successful login
        navigate("/dashboard");
      } else {
        console.log("Login failed");
        setSnackbarMessage("Login failed");
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", width: "300px" }}>
      <h2>Login</h2>
      <Box>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          Login
        </Button>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position the Snackbar at the top center of the screen
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Login;
