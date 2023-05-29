import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedManager({ children }) {
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  console.log("userInfo:", userInfo);
  if (!!!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.is_manager && !userInfo.is_staff) {
    return <Navigate to="/employee" replace />;
  }
  return children;
}
export default ProtectedManager;
