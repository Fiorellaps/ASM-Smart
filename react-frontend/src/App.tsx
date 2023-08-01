// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import MainDashboard from "./pages/MainDashboard";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              // Add your authentication check here
              // For example, render MainDashboard if authenticated, otherwise redirect to login

              true ? (
                <MainLayout>
                  <MainDashboard />
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
