import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedEmployee({ children }) {
  const { userInfo, isAuth } = useSelector((state) => state.auth);
  const role = userInfo ? userInfo.system_role : null;
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = "/employee/profile"; // Redirect path for "employee"

  useEffect(() => {
    // Check the role and perform navigation if needed
    if (isAuth && role === "employee" && location.pathname === "/employee") {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, role, location, navigate, redirectPath]);

  if (role === "staff") {
    return <Navigate to="/staff/companies/add-company" replace />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedEmployee;
