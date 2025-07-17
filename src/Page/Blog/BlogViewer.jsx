import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const BlogViewer = () => { 
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const previousLocaction =
    currentLocation.state?.previousUrl || "No previous URL";

  const returnBack = () => {
    if (previousLocaction === "/admin/blogs") {
      navigate("/admin/blogs");
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${apiPort}/api/blogs/${id}`);
        const blog = response.data.blog;
        setTitle(blog.title);
        setContent(blog.content);
        setFeaturedImage(blog.featuredImage || null);
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  return (
    <Layout>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={returnBack}
        >
          Back
        </button>
      </div>
      <div className="mt-4">
        <img
          src={`${apiPort}${featuredImage}`}
          alt={title}
          className="h-auto w-auto rounded"
        />
      </div>

      <div className="mt-2 mb-2">
        <h2 className="text-xl">{title}</h2>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </Layout>
  );
};

export default BlogViewer;
