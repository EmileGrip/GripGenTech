import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DefaultLayout from "../../ui/DefaultLayout";
import { sidebarEmployeeData as sidebarData } from "../../data/sidebarData";
const Employee = () => {
  const [title, setTitle] = useState("Employee");
  return (
    <DefaultLayout sidebarData={sidebarData} title={title}>
      <Outlet context={[title, setTitle]} />
    </DefaultLayout>
  );
};

export default Employee;
