import { Outlet , Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
const PrivateRoute = () => {
  const {userInfo} = useContext(UserContext);
  console.log(userInfo)
    return userInfo ? <Outlet/> :< Navigate to ="/login" />
}

export default PrivateRoute;