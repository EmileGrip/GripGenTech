import { Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import DefaultLayout from "../../ui/DefaultLayout";
import { useState } from "react";
import { sidebarStaffData } from "../../data/sidebarData";

const StaffDashboard = () => {
  const [title, setTitle] = useState("Staff");
  return (
    <DefaultLayout sidebarData={sidebarStaffData} title={title}>
      <Outlet context={[title, setTitle]} />
    </DefaultLayout>
  );
};

export default StaffDashboard;
