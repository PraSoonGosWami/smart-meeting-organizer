import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const AddMeeting = lazy(() => import("../pages/AddMeeting"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-meeting" element={<AddMeeting />} />
    </Routes>
  );
};

export default AppRoutes;
