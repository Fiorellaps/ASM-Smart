import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { switchRoutes } from "./routes";
import { LoginPage, ListPage, DetailPage, UserPage } from "@/scenes";

export const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={switchRoutes.root} element={<LoginPage />} />
        <Route path={switchRoutes.list} element={<ListPage />} />
        <Route path={switchRoutes.details} element={<DetailPage />} />
        <Route path={switchRoutes.users} element={<UserPage />} />
      </Routes>
    </Router>
  );
};
