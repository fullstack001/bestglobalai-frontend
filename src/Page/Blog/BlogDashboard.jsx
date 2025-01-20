import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const BlogDashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        let response;
        if ( role == "superAdmin") {
          response = await axios.get(`${apiPort}/api/blogs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } 
        
        if (role == "admin") {
          response = await axios.get(`${apiPort}/api/blogs/mine`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${apiPort}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchBlogs();

    fetchUser();
  }, []);

  const editBlog = (id) => {
    navigate(`/admin/blogs/editor/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${apiPort}/api/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const viewBlog = (id) => {
    navigate(`/admin/blogs/viewer/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  return (
    <Layout>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Blogs</h2>
        <div className="flex justify-end">
          <button
            className="mt-3 px-4 py-1 bg-blue-500 text-white rounded-lg mr-1 text-lg"
            onClick={() => navigate("/admin/blogs/creator")}
          >
            Create Blog
          </button>
        </div>

        <div className=" mt-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
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
                  <div className="mt-2 text-center ml-2">{blog.title}</div>
                </div>

                <div className="mt-2 flex justify-between">
                  <button
                    className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-lg mr-1 h-fit"
                    onClick={() => editBlog(blog._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-green-500 text-white rounded-lg mr-1 h-fit"
                    onClick={() => viewBlog(blog._id)}
                  >
                    <FontAwesomeIcon icon={faEye} className="" />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-red-500 text-white rounded-lg mr-1 h-fit"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogDashboard;
