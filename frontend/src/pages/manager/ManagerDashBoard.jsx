import { useState } from "react";
import { Outlet } from "react-router-dom";
import DefaultLayout from "../../ui/DefaultLayout";
import { sidebarManagerData as sidebarData } from "../../data/sidebarData";

const ManagerDashBoard = () => {
  const [title, setTitle] = useState("Manager");
  return (
    <DefaultLayout sidebarData={sidebarData} title={title}>
      <Outlet context={[title, setTitle]} />
    </DefaultLayout>
  );
};

export default ManagerDashBoard;
