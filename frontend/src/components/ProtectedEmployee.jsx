import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedEmplpoyee({ children }) {
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  if (!!!userInfo) return <Navigate to="/login" replace />;

  if (!userInfo.is_staff && userInfo.is_manager) {
    return <Navigate to="/grip" replace />;
  }
  return children;
}
export default ProtectedEmplpoyee;
