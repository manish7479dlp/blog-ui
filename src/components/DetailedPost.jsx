import React, { useEffect, useState, useContext } from "react";
import Layout from "./Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import { FcOvertime } from "react-icons/fc";
import { UserContext } from "../store/UserContext";
import ReactTimeAgo from "react-time-ago";
// import {  formatISO9075 } from 'date-fns'

const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/post";
const imgLink = apiURL;

const DetailedPost = () => {
  const [postInfo, setPostInfo] = useState({});
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchPost();
    if (!token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${url}/${id}`, {
        credentials: "include",
        headers: {
          Authorization: token,
        },
      });
      const post = await response.json();
      setPostInfo(post.post);
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };

  const deletePost = async () => {
    try {
      const confirm = window.confirm("Do you want to delete.");
      if (confirm) {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${url}/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: token,
          },
        });
        const deletedPost = await response.json();
        if (deletedPost.status) {
          navigate("/");
        }
        toast.success(deletedPost.message);
      }
    } catch (error) {
      toast.info(deletePost.message);
    }
  };

  if (!postInfo) return "";

  // const { title, summary, cover, author, createdAt, description, _id } =
  //   postInfo;

  const { title, cover, description, _id, createdAt , summary } = postInfo;

  return (
    <Layout>
      <div className="container mx-auto text-center pb-4">
        {/* title */}
        <div className="mb-3">
          <h2 className="h1 p-2 text-start text-muted">{title}</h2>
        </div>
        {/* cover img */}
        <div className="container col-md-6 mb-3">
          <img
            src={`${imgLink}/${cover}`}
            className="img-fluid"
            alt="post img"
          />
        </div>

        {/* author or created time section */}
        <div className="row  mb-3 mx-4 ">
          <span className="col  text-start d-flex align-items-center d-none d-sm-inline">
            <BiSolidUserDetail />
            <span className="ms-2">{postInfo?.author?.userName}</span>
          </span>
          <small className="col text-muted  d-flex align-items-center justify-content-end ">
            <FcOvertime className="me-2" />

            {/* {postInfo?.createdAt} */}

            <ReactTimeAgo
              className="ms-2"
              date={createdAt ? createdAt : new Date()}
              locale="en-US"
            />
          </small>
        </div>
        <div className="mb-3 text-start ">
          <p className="h4">Summary</p>
          <mark className="text-dark p-1" style={{backgroundColor: "#f2c23f"}}>{summary}</mark>
        </div>
        {/* description */}
        <div className="mb-3">
        <p className="h4 text-start">Description</p>

          <p
            className="text-muted text-start"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {userInfo?._id === postInfo?.author?._id && (
          <div className="text-center mb-2">
            <Link
              to={`/edit-post/${_id}`}
              type="button"
              className="btn btn-primary p-2 me-2 me-sm-1"
            >
              Edit Post
            </Link>
            <button
              onClick={deletePost}
              className="btn btn-danger w-sm-25 p-2 ms-2 ms-sm-1"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailedPost;
