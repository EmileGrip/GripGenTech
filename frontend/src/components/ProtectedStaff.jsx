import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedStaff = ({ children }) => {
  const { userInfo, isAuth } = useSelector((state) => state.auth);
  const role = userInfo ? userInfo.system_role : null;
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = "/staff/companies/add-company"; // Redirect path for "staff"

  useEffect(() => {
    // Check the role and perform navigation if needed
    if (isAuth && role === "staff" && location.pathname === "/staff") {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, role, location, navigate, redirectPath]);

  if (role === "staff") {
    return children;
  } else if (role === "admin") {
    return <Navigate to="/admin/employees" replace />;
  } else if (role === "manager") {
    return <Navigate to="/manager/employees" replace />;
  } else if (role === "employee") {
    return <Navigate to="/employee/profile" replace />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedStaff;
