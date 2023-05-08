import React, { useEffect } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import useLocationChange from "../../../hooks/useLocationChange";
const MySkills = () => {
  const [title, setTitle] = useOutletContext();
  useLocationChange(setTitle);

  return <Outlet />;
};

export default MySkills;
