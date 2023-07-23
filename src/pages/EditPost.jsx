import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Editior from "../components/Editior";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  const apiURL = process.env.REACT_APP_APIURL;
  const url = apiURL + "api/v1/post";
  

  useEffect(() => {
    fetchPost();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPost = async () => {
    try {
      const respone = await fetch(`${url}/${id}`, {
        credentials: "include",
      });
      const post = await respone.json();
      const { title, summary, description } = post.post;
      setTitle(title);
      setSummary(summary);
      setDescription(description);
    } catch (error) {
      toast.info("Something went wrong.");
    }
  };

  const editPost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("description", description);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const newUrl = `${url}/${id}`;

      const response = await fetch(newUrl, {
        method: "PUT",
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
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <Layout>
      <div className="container p-3">
        <form onSubmit={editPost}>
          <p className="h1 text-center text-muted">Edit Post</p>
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
              Update Post
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
