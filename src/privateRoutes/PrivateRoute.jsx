import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { useContext, useEffect } from "react";
import {toast} from "react-toastify"
const PrivateRoute = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const apiURL = process.env.REACT_APP_APIURL;
  const url = apiURL + "/api/v1/user";

  useEffect(() => {
    fetchProfile();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(url, { credentials: "include" });
      const userInfo = await response.json();

      if (userInfo.status) {
        setUserInfo(userInfo.user);
        // setRedirect(true);
      } else {
        // setRedirect(false);
        setUserInfo(null);
      }
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };
  if(!userInfo) return ""
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
