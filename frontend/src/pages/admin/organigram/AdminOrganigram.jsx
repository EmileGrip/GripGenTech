import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";

const AdminOrganigram = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  return <Outlet />;
};

export default AdminOrganigram;
