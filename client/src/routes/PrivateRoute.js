import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();
  console.log("location", location)
  if (!isAuthenticated) {
    return  <Navigate to="/auth" state={{from: location}}/>;
  }
  return children
};

export default PrivateRoute;
