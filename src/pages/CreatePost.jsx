import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Editior from "../components/Editior";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  const apiURL = process.env.REACT_APP_APIURL;
  const url = apiURL + "/api/v1/post";

  const createPost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", files[0]);
    data.set("description", description);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        setRedirect(true);
      } else {
        toast.warning(responseData.message);
      }
    } catch (error) {
      toast.info("Somethng went wrong.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container pb-3">
        <form onSubmit={createPost}>
          <p className="h1 text-center text-muted">Create Post</p>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Summary
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              onChange={(event) => setFiles(event.target.files)}
            />
          </div>
          <label htmlFor="exampleInputEmail21" className="form-label">
            Description
          </label>
          <Editior value={description} onChange={setDescription} />

          <div className=" my-4 text-center">
            <button type="submit" className="btn btn-primary w-sm-25 p-2">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
