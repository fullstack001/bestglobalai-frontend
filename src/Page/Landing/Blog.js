import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const apiPort = process.env.REACT_APP_API_PORT;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(`${apiPort}/api/blogs/latest?limit=3`); // Replace with your backend endpoint
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-20 text-white">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mb-12">
        <button className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-700 transition duration-300 mb-8 text-gray-300">
          From Our Blog
        </button>
        <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6">
          Our latest insight & update
        </h3>
      </div>

      {/* Blog Cards */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className="overflow-hidden shadow-lg group">
            <img
              src={`${apiPort}${blog.featuredImage}`}
              alt={blog.title}
              className="w-full h-48 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-1 flex">
              <a
                href={`/blog/${blog._id}`}
                className="flex items-center text-blue-400 hover:text-blue-500 transition duration-300 text-xl font-semibold"
              >
                <h4 className="mb-4 text-gray-400">{blog.title}</h4>
                <FiArrowUpRight />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* More Updates Button */}
      <div className="text-center mt-12">
        <a
          href="/blog"
          className="bg-gray-800 text-xl px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300 text-white inline-flex items-center"
        >
          More Updates
          <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
};

export default Blog;
