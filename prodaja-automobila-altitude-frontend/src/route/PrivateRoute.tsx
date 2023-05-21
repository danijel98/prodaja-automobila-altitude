import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkRoles } from "./role-guard";

export const PrivateRoute = (props: { roles: string[] }) => {
  const { roles } = props;
  const token = localStorage.getItem("auth-access-token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  if (!role || !checkRoles(role, roles)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
