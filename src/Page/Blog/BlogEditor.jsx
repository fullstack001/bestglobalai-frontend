import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faMagic } from "@fortawesome/free-solid-svg-icons";
import JoditEditor from "jodit-react";
import Layout from "../../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;
const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const BlogEditor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const returnBack = () => {
    navigate("/admin/blogs");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${apiPort}/api/blogs/${id}`);
        const blog = response.data.blog;

        setTitle(blog.title);
        setContent(blog.content);
        if (blog.featuredImage) {
          setPreviewImage(`${apiPort}${blog.featuredImage}`);
        }
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleSave = async () => {
    try {
      const updateBlog = {
        title,
        content,
      };

      const formData = new FormData();
      formData.append("title", updateBlog.title);
      formData.append("content", updateBlog.content);
      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }
      await axios.put(`${apiPort}/api/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error saving the blog:", err);
    }
  };

  const generateContentWithAI = async () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword for content generation.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `Write a detailed blog post about "${keyword}".`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openAiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiContent = response.data.choices[0].message.content.trim();
      setContent(aiContent);
    } catch (error) {
      console.error("Error generating content with AI:", error);
      alert("Failed to generate content. Please try again.");
    }
  };

  return (
    <Layout>
      <div className=" min-h-screen bg-gray-900 text-white">
        <h2 className="text-xl mt-2 font-semibold">Edit Blog</h2>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={returnBack}
          >
            Back
          </button>
        </div>
        <div className="mx-auto mt-2">
          <div className="mt-2 ">
            <label className="block text-gray-400">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
          </div>

          <div className="mt-2">
            <label className="block mb-1 text-gray-400">Featured Image</label>

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-w-md rounded-lg mt-2"
              />
            </div>
          )}

          <div className="mt-4">
            <label className="block text-gray-400">
              Generate Content with AI
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword or topic"
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
            <button
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
              onClick={generateContentWithAI}
            >
              <FontAwesomeIcon icon={faMagic} className="mr-2" />
              Generate Content
            </button>
          </div>

          <div className="mt-2">
            <RichTextEditor
              initialValue={content}
              getValue={(content) => setContent(content)}
            />
          </div>

          <div className="mt-2 flex justify-between space-x-50 sm:w-full">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={content === ""}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Update Blog
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      tabIndex={1}
      onChange={(newContent) => getValue(newContent)}
      className="text-black"
    />
  );
};

export default BlogEditor;
