import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const apiPort = process.env.REACT_APP_API_PORT;

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const fetchBlogs = async (page) => {
    try {
      const response = await axios.get(
        `${apiPort}/api/blogs/paginated?page=${page}&limit=10`
      );
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-950 text-white font-sans">
      <div className="">
        <Nav />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-26 text-center mb-12">
          <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6">
            Our latest insight & update
          </h3>
        </div>

        {/* Blog Cards */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 min-h-screen">
          {blogs.length > 0
            ? blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between w-full mb-2"
                >
                  <div className="flex">
                    {" "}
                    {blog.featuredImage ? (
                      <img
                        src={`${apiPort}${blog.featuredImage}`}
                        alt={blog.title}
                        className="h-32 w-32 rounded"
                      />
                    ) : (
                      ""
                    )}
                    <div>
                      <div className="mt-2 ml-2 text-xl">{blog.title}</div>
                      <div
                        className="mt-2 ml-2 "
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      ></div>
                      <button
                        className="text-blue-500 ml-2 hover:text-blue-400 flex items-center"
                        onClick={() => navigate(`/blog/${blog._id}`,{
                            state: { previousUrl: location.pathname },
                          })}
                      >
                        Read More
                        <FiArrowUpRight className="ml-1 " />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            : "No blogs available."}
        </div>

        {/* Pagination Controls */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-8 text-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
