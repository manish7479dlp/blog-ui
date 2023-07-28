import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";
import { useParams, useNavigate, Link } from "react-router-dom";
const apiURL = process.env.REACT_APP_APIURL;
const userUrl = apiURL + "/api/v1/user";
const postUrl = apiURL + "/api/v1/post/user";
const userImgUrl = "../utils/userImg.png"

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${postUrl}/${id}`, {
        credentials: "include",
        headers: {
          Authorization: token,
        },
      });
      const postData = await response.json();
      if (postData.status) {
        console.log(postData);
        setPostInfo(postData.post);
      } else {
        setPostInfo([]);
      }
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };

  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(userUrl, {
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

  if (!userInfo || !postInfo) return "";
  if (!postInfo) return "";

  console.log(postInfo);

  return (
    <Layout>
      <div
        style={{ background: "#e8ffcea6", minHeight: "100vh" }}
        className="container-fluid row w-100 m-0 "
      >
        <div className="col-md-5 col-12 mb-3 mb-md-0 mt-3 mt-md-0 d-flex justify-content-center align-items-center">
          <div className="profile">
            <div className="card" style={{ width: "18rem" }}>
              <div className="profileImgContainer">
                <img
                  src={"https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"}
                  alt="profile-img"
                />
              </div>
              <div className="content ps-3">
                <p className="mb-1">
                  UserName:{" "}
                  <span className="text-muted">{userInfo.userName}</span>
                </p>
                <p className="mt-1 mb-1">
                  Email: <span className="text-muted">{userInfo.email}</span>
                </p>
                <p className="mt-1">
                  Total-Post:{" "}
                  <span className="text-muted">
                    {postInfo.length ? postInfo.length : "0"}
                  </span>
                </p>
              </div>
              <div className="text-center mb-3">
                <Link to={"../update-user"} className="btn btn-primary">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-12 d-flex justify-content-center align-items-center flex-wrap  overflow-auto">
          {postInfo &&
            postInfo.map((data, idx) => {
              return <PostCard key={idx} {...data} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
