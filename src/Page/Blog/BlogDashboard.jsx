import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
const apiPort = process.env.REACT_APP_API_PORT;

const BlogDashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchBlogs = async () => {
      setFetching(true);
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        let response;
        if (role === "superAdmin") {
          response = await axios.get(`${apiPort}/api/blogs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        if (role === "admin") {
          response = await axios.get(`${apiPort}/api/blogs/mine`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setFetching(false);
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

  const editBlog = (name) => {
    navigate(`/admin/blogs/editor/${name}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const deleteBlog = async (name) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return; // If the user cancels, do nothing

    try {
      await axios.delete(`${apiPort}/api/blogs/${name}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.name !== name));
      alert("Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const viewBlog = (name) => {
    navigate(`/admin/blogs/viewer/${name}`, {
      state: { previousUrl: location.pathname },
    });
  };

  if (fetching) {
    return (
      <Layout titleText="Fetching Blogs">
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout titleText="Blog List">
      <section className="mt-8">
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
                    onClick={() => editBlog(blog.name)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-green-500 text-white rounded-lg mr-1 h-fit"
                    onClick={() => viewBlog(blog.name)}
                  >
                    <FontAwesomeIcon icon={faEye} className="" />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-red-500 text-white rounded-lg mr-1 h-fit"
                    onClick={() => deleteBlog(blog.name)}
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
