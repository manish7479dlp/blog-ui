import React from "react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { BiSolidRightArrowCircle, BiSolidUserDetail } from "react-icons/bi";
import { FcOvertime } from "react-icons/fc";

const Post = ({ title, summary, cover, author, createdAt, _id }) => {
  const apiURL = process.env.REACT_APP_APIURL;

  return (
    <div className="container-fluid container-lg r-md row border my-2 p-3 postShadow rounded">
      <Link
        to={`/post/${_id}`}
        className="container col-md-6 mr-3 d-flex align-items-center"
      >
        <img src={cover} className="img-fluid" alt="post img" />
      </Link>

      <div className="col-md-6 d-flex flex-column  p-3 text-start ">
        <div className="ms-md-3 ms-0">
          <p className="h2 mb-2  text-muted">{title}</p>
          <div className="row mb-2  ms-sm-2 ms-2">
            <span className="col-6 text-dark text-md-center d-flex align-items-center d-none d-sm-inline">
              <BiSolidUserDetail />
              <span className="ms-2">{author.userName}</span>
            </span>
            <small className="col text-muted d-flex align-items-center">
              <FcOvertime />
              <ReactTimeAgo className="ms-2" date={createdAt} locale="en-US" />
            </small>
          </div>
          <p>
            <BiSolidRightArrowCircle className="me-2 text-success " />
            {summary}
          </p>
          <div className="text-center">
            <Link to={`/post/${_id}`} type="button" className="btn btn-primary">
              Read..
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="card my-3">
  //       <img className="card-img-top" src= {url} alt="Card image cap"  style={{maxHeight: "80vh" , width: "auto"}}/>
  //       <div className="card-body ">
  //         <h5 className="card-title h2">{title}</h5>
  //         <p className="card-text">
  //           <small className="text-bold mx-5">{author.userName}</small>
  //           <small className="text-muted">Last updated 3 mins ago</small>
  //         </p>
  //         <p className="card-text h5 text-left">
  //           {summary}
  //         </p>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Post;
