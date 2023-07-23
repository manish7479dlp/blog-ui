import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import imgUrl  from "../loginBanner.png"

const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/user/register";


const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const register = async () => {
    if (!userName || !password || !confirmPassword || !email) {
      toast.info("All fields are required.");
    } else if (password !== confirmPassword) {
      toast.info("Password and Confirm Password are not Matched.");
    } else {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password, email }),
        });
        const responseInfo = await response.json();

        if (responseInfo.status === true) {
          toast.success(responseInfo.message);
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
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div
        style={{ height: "inherit", width: "inherit" }}
        className="container-fluid row  loginContainer  "
      >
        <div className="col loginImgContainer p-2 d-none d-lg-inline">
          <img src={imgUrl} alt="logo" className="img-fluid p-5" />
        </div>

        <div className="col d-flex justify-content-center align-items-center  text-center">
          <div className="card w-100  mx-md-4 mx-sm-3 loginCard">
            <div className="card-body">
              <p className="h2 mb-3 text-muted">Register</p>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput1"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="floatingInput1">Email address</label>
              </div>
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
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="floatingPassword1">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>
              <button
                type="button"
                className="btn btn-outline-success mt-3"
                onClick={() => {
                  register();
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
