import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import slugify from "slugify";
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
        `${apiPort}/api/blogs/paginated?page=${page}&limit=12`
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
          <h3 className="text-2xl sm:text-4xl md:text-4xl mt-28">
            Our latest insight & update
          </h3>
        </div>

        {/* Blog Cards */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 min-h-screen">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
              {blogs.map((blog) => {
                const slug = slugify(blog.title, { lower: true, strict: true });

                return (
                  <div
                    key={blog._id}
                    className="bg-gray-800 rounded-lg overflow-hidden flex flex-col shadow hover:shadow-lg transition duration-200 cursor-po
                  inter border-2 border-gray-700 max-h-[250px]"
                  >
                    {blog.featuredImage && (
                      <img
                        src={`${apiPort}${blog.featuredImage}`}
                        alt={blog.title}
                        className="w-full h-40 object-cover"
                      />
                    )}

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                        {blog.title}
                      </h4>
                      <div
                        className="text-sm text-gray-300 mb-3 line-clamp-2 prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />

                      <button
                        onClick={() =>
                          navigate(`/blog/${slug}`, {
                            state: {
                              blogId: blog._id,
                              previousUrl: location.pathname,
                            },
                          })
                        }
                        className="text-blue-500 hover:text-blue-400 mt-auto flex items-center w-fit"
                      >
                        Read More <FiArrowUpRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              No blogs available.
            </div>
          )}
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
