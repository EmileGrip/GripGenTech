import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { setLoginInformation } from "../redux/slices/auth/authSlice";

function ProtectedAdmin({ children }) {
  const { userInfo, isAuth } = useSelector((state) => state.auth);
  const role = userInfo ? userInfo.system_role : null;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectPath = "/admin/employees"; // Redirect path for "admin"
  const queryParams = new URLSearchParams(location.search);
  const tokenParam = queryParams.get("token");

  useEffect(() => {
    if (tokenParam) {
      dispatch(setLoginInformation(tokenParam));
    }

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
    return <Navigate to="/employee/profile" replace />;
  } else if (role === "staff") {
    return <Navigate to="/staff/companies/add-company" replace />;
  }

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedAdmin;
