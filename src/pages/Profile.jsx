import React, { useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/user";

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: token,
        },
      });
      const userData = await response.json();

      if (userData.status) {
        setUserInfo(userData.user);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };

  const editProfile = () => {
    toast.error("This feature is not implemented yet.")
  }

  if (!userInfo) return "";
  console.log(userInfo);

  return (
    <Layout>
      <div className="container-fluid row h-100 w-100 m-0 bg-primary">
        <div className="col-md-4 col-12 d-flex justify-content-center align-items-center">
          <div className="profile">
            <div className="card" style={{ width: "18rem"}}>
               <div className="profileImgContainer">
                <img src="https://i.pinimg.com/550x/75/06/5d/75065da93d181c15f8266289313231c6.jpg" alt="profile-img" />
               </div>
               <div className="content ps-3">
                 <p className="mb-1">UserName: <span className="text-muted">{userInfo.userName}</span></p>
                 <p className="mt-1 mb-1">Email: <span className="text-muted">{userInfo.email}</span></p>
                 <p className="mt-1">Total-Post: <span className="text-muted">{"11"}</span></p>
               </div>
                 <div className="text-center mb-3">
                 <button type="button" class="btn btn-primary" onClick={editProfile}>Edit Profile</button>
                 </div>
             
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12 d-flex justify-content-center align-items-center">
          <div className="postCard h1 text-muted">Loading...</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
