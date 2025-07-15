import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import slugify from "slugify";

import Nav from "./Nav";
import Footer from "./Footer";

const apiPort = process.env.REACT_APP_API_PORT;

const BlogDetail = () => {
  const { id } = useParams();
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        if (location.state?.blogId) {
          // If blogId is passed in state (from "Read More")
          const res = await axios.get(
            `${apiPort}/api/blogs/${location.state.blogId}`
          );
          const blog = res.data.blog;
          setTitle(blog.title);
          setContent(blog.content);
          setFeaturedImage(blog.featuredImage || null);
        } else {
          // Fallback: fetch all blogs and find by slug
          const res = await axios.get(`${apiPort}/api/blogs`);
          const found = res.data.blogs.find(
            (b) => slug === slugify(b.title, { lower: true, strict: true })
          );
          if (found) {
            setTitle(found.title);
            setContent(found.content);
            setFeaturedImage(found.featuredImage || null);
          } else {
            navigate("/404");
          }
        }
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchBlogDetails();
  }, [slug, location.state, navigate]);

  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-36 mb-12">
          <div className="mt-2 mb-2">
            <h2 className="text-3xl font-medium">{title}</h2>
          </div>
          {featuredImage && (
            <div className="mt-4 mb-4">
              <img
                src={`${apiPort}${featuredImage}`}
                alt={title}
                className="h-auto rounded w-1/3 mx-auto"
              />
            </div>
          )}
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
