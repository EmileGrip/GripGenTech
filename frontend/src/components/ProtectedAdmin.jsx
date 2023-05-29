import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedAdmin({ children }) {
  // const role = useSelector((state) => state.auth.userInfo.user);
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  if (!!!userInfo) return <Navigate to="/login" replace />;
  if (!userInfo.is_staff && !userInfo.is_manager) {
    console.log("go to employee");
    return <Navigate to="/employee" replace />;
  }
  if (!userInfo.is_staff && userInfo.is_manager) {
    return <Navigate to="/grip" replace />;
  }
  return children;
}
export default ProtectedAdmin;
