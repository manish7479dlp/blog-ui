import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../store/UserContext";
import { Link, useNavigate } from "react-router-dom";
// import {FaUserCheck} from 'react-icons/Fa'
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";

const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/user";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
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
  const logout = async () => {
    try {
      const response = await fetch(url + "/logout", { credentials: "include" });
      const responseInfo = await response.json();
      if (responseInfo.status) {
        // const res = sessionStorage.removeItem("user");
        setUserInfo(null);
        navigate("/");
        toast.success(responseInfo.message);
      } else {
        toast.success(responseInfo.message);
      }
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };

  return (
    <nav className="navbar bg-info bg-gradient ">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand text-white ms-sm-2">
          <p style={{ textShadow: "2px 3px 8px #F4D160" }} className="h3">
            Bloggie
          </p>
        </Link>
        {userInfo && (
          <div className=" me-2 me-sm-3  me-md-4">
            <Link
              to="/create-post"
              className="btn btn-success me-sm-4 me-md-5 d-sm-inline d-none"
            >
              Create Post
            </Link>
            <div className="btn-group">
              <button type="button" className="btn btn-primary">
                <AiOutlineUserAdd style={{ marginRight: "4px" }} />
                {userInfo?.userName}
              </button>
              <button
                type="button"
                className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu bg-info bg-gradient text-center">
                <Link
                  to="/create-post"
                  className="btn btn-success d-sm-none d-inline"
                >
                  Create Post
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-danger mt-3 mt-sm-0 "
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
        )}

        {/* {!userInfo && (
          <div className=" me-2 me-sm-3">
            
            <span className="btn btn-outline-secondary text-white mx-2 d-inline-flex  align-items-center bg-primary bg-gradient">
              <AiOutlineUserAdd style={{marginRight: "4px"}} />
             {userInfo.userName}
            
            </span>
            <Link to="/create-post" className="btn btn-success mx-2">
              Create Post
            </Link>
            <button onClick={logout} className="btn btn-danger mx-2">
              Logout
            </button>
          </div>
        )} */}

        {!userInfo && (
          <div className="me-2 me-sm-3">
            <Link to="/login" className="btn btn-success me-3  me-sm-5">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
