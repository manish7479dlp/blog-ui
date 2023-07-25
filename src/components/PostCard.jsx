import React from "react";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { FcOvertime } from "react-icons/fc";
import { toast } from "react-toastify";

const PostCard = ({ cover, summary, createdAt, _id }) => {
  const navigate = useNavigate();
  const getPost = () => {
    window.location = "/post/" + _id;
  };
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src="https://random.imagecdn.app/500/200"
        className="card-img-top"
        alt="post-img"
      />
      <div className="card-body">
        <p className="text-end">
          <FcOvertime />{" "}
          <ReactTimeAgo
            className="ms-2"
            date={createdAt ? createdAt : new Date()}
            locale="en-US"
          />
        </p>
        {/* <h5 className="card-title">Card title</h5> */}
        <p className="overflow-auto" style={{ height: "100px" }}>
          <BiSolidRightArrowCircle className="me-2 text-success " />
          <span className="">{summary}</span>
        </p>
        <div className="text-center">
          <button className="btn btn-primary" onClick={getPost}>
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
