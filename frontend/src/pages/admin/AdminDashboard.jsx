import React, { useState } from "react";
import DefaultLayout from "../../ui/DefaultLayout";
import { Outlet } from "react-router-dom";
import { sidebarAdminData as sidebarData } from "../../data/sidebarData";

const AdminDashboard = () => {
  const [title, setTitle] = useState("Admin");
  return (
    <DefaultLayout sidebarData={sidebarData} title={title}>
      <Outlet context={[title, setTitle]} />
    </DefaultLayout>
  );
};

export default AdminDashboard;
