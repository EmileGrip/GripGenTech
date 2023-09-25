import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function ProtectedManager({ children }) {
  const { userInfo, isAuth } = useSelector((state) => state.auth);
  const role = userInfo ? userInfo.system_role : null;
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = "/manager/employees"; // Redirect path for "manager"

  useEffect(() => {
    // Check the role and perform navigation if needed
    if (isAuth && role === "manager" && location.pathname === "/manager") {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuth, role, location, navigate, redirectPath]);

  if (role === "manager") {
    return children;
  } else if (role === "employee") {
    return <Navigate to="/employee/profile" replace />;
  } else if (role === "staff") {
    return <Navigate to="/staff/companies/add-company" replace />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedManager;
