import React from "react";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import {  Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { FcOvertime } from "react-icons/fc";
const apiURL = process.env.REACT_APP_APIURL;
const imgLink = apiURL;

const PostCard = ({ cover, summary, createdAt, _id }) => {
  return (
    <div className="card m-3 p-3" style={{ width: "18rem" }}>
    <div className="  " >
    <img
        src={`${imgLink}/${cover}`}
        className="card-img-top object-fit-fill rounded"
        alt="post-img"
        style={{height: "150px"}}
       
      />
    </div>
      
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
          <Link to = {"../post/" + _id} className="btn btn-primary">
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
