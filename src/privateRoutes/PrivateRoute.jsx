import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  // if (!userInfo) return "";
  return sessionStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
