import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import imgUrl from "../loginBanner.png"

const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/user/login";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async () => {
    if (!userName || !password) {
      toast.info("All fields are required.");
    } else {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
          credentials: "include",
        });
        const responseInfo = await response.json();

        if (responseInfo.status) {
          toast.success(responseInfo.message);
          setUserInfo(responseInfo.user);
          setRedirect(true);
        } else {
          toast.warning(responseInfo.message);
        }
      } catch (error) {
        toast.warning("Something went wrong.");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div
        style={{ height: "inherit", width: "inherit" }}
        className="container-fluid row  loginContainer "
      >
        <div className="col loginImgContainer p-2 d-none d-lg-inline">
          <img src= {imgUrl} alt="logo" className="img-fluid p-5" />
        </div>
        
        <div className="col d-flex justify-content-center align-items-center  text-center">
          <div className="card w-100  mx-md-4 mx-sm-3 loginCard">
            <div className="card-body">
              <p className="h2 mb-3 text-muted">Login</p>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                type="button"
                className="btn btn-success mt-3"
                onClick={() => {
                  login();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
