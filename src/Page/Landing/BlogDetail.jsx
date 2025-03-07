import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const apiPort = process.env.REACT_APP_API_PORT;

const BlogDetail = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

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
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-36 mb-12">
          
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
            className="responsive-iframe"
            dangerouslySetInnerHTML={{
              __html: content,            
            }}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BlogDetail;
