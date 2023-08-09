import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const { userInfo, isAuth } = useSelector((state) => state.auth);
  const role = userInfo ? userInfo.system_role : null;
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = "/admin/employees"; // Redirect path for "admin"

  useEffect(() => {
    // Check the role and perform navigation if needed
    if (isAuth && role === "admin" && location.pathname === "/admin") {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, role, location, navigate, redirectPath]);

  if (role === "admin") {
    return children;
  } else if (role === "manager") {
    return <Navigate to="/manager/employees" replace />;
  } else if (role === "employee") {
    return <Navigate to="/employee/skills/myskills" replace />;
  } else if (role === "staff") {
    return <Navigate to="/staff/companies/add-company" replace />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedAdmin;
