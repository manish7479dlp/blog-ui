import React, { useEffect, useState, useContext } from "react";
import Layout from "./Layout/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import { FcOvertime } from "react-icons/fc";
import { UserContext } from "../store/UserContext";
// import ReactTimeAgo from "react-time-ago";
// import {  formatISO9075 } from 'date-fns'

const url = "http://localhost:8000/api/v1/post";
const imgLink = "http://localhost:8000";

const DetailedPost = () => {
  const [postInfo, setPostInfo] = useState({});
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const respone = await fetch(`${url}/${id}`, { credentials: "include" });
      const post = await respone.json();
      setPostInfo(post.post);
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };


  if (!postInfo) return "";

  // const { title, summary, cover, author, createdAt, description, _id } =
  //   postInfo;

  const { title, cover, description, _id } =
    postInfo;

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
            
            {/* <ReactTimeAgo className="ms-2" date={new Date()} locale="en-US" /> */}
            {postInfo?.createdAt}
            {/* <ReactTimeAgo className="ms-2" date={postInfo?.createdAt} locale="en-US" /> */}
          </small>
        </div>
        {/* description */}
        <div className="mb-3">
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
              className="btn btn-primary"
            >
              Edit Post
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailedPost;
