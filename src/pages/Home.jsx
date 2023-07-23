import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Post from "../components/Post";
import { toast } from "react-toastify";

const apiURL = process.env.REACT_APP_APIURL;
const url = apiURL + "/api/v1/post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(url)

  const fetchPost = async () => {
    try {
      const response = await fetch(url, { credentials: "include" });
      const responseData = await response.json();
      if (responseData.status) {
        setPosts(responseData.posts);
      }
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };
  return (
    <Layout>
      <div className="allPostContainer">
        <div className="container-fluid d-flex flex-column text-center align-items-center background">
          {posts.map((post, idx) => {
            return <Post key={idx} {...post} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
