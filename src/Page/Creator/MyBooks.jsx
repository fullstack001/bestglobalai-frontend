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
import { FaShareAlt } from "react-icons/fa";

import default_cover from "../../assets/images/covers/cover1.jpg";
import Layout from "../../components/Layout";
import UploadEbookModal from "./EbookLoadModal";

const apiPort = process.env.REACT_APP_API_PORT;

const MyBooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadSuccess = (newBook) => {
    setEbooks((prev) => [...prev, newBook]);
  };

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiPort}/api/books/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEbooks(response.data.books);
      } catch (error) {
        console.error("Error fetching ebooks:", error);
      }
    };

    fetchEbooks();
  }, []);

  const editEbook = (id) => {
    navigate(`/creator/editor/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const deleteEbook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ebook?"
    );
    if (!confirmDelete) return; // If the user cancels, do nothing

    try {
      await axios.delete(`${apiPort}/api/books/${id}`);
      setEbooks((prevEbooks) => prevEbooks.filter((book) => book._id !== id));
      alert("Book deleted successfully.");
    } catch (error) {
      console.error("Error deleting ebook:", error);
    }
  };

  const viewEbook = (id) => {
    navigate(`/creator/viewer/${id}`, {
      state: { previousUrl: location.pathname },
    });
  };

  const downloadEbook = async (id) => {
    try {
      const response = await axios.get(`${apiPort}/api/books/${id}/download`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ebook_${id}.epub`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading ebook:", error);
    }
  };

  const publicEbook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiPort}/api/books/${id}/make-public`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert(response.data.message);
      setEbooks((prevEbooks) =>
        prevEbooks.map((book) =>
          book._id === id ? { ...book, private: false } : book
        )
      );
    } catch (error) {
      console.error("Error public ebook");
    }
  };

  return (
    <Layout>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">My EBooks</h2>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 rounded-lg text-white p-2"
            onClick={() => setIsModalOpen(true)}
          >
            Upload Ebook
          </button>
        </div>
        <div className="grid md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 mt-4">
          {ebooks.length > 0 ? (
            ebooks.map((book) => (
              <div key={book._id} className="bg-gray-700 p-4 rounded-lg">
                {book.coverImage ? (
                  <img
                    src={`${apiPort}${book.coverImage}`}
                    alt={book.title}
                    className="h-32 w-full rounded"
                  />
                ) : (
                  <div className="h-32 w-full bg-gray-600 rounded">
                    <img
                      src={default_cover}
                      alt={book.title}
                      className="h-32 w-full rounded"
                    />
                  </div>
                )}
                <p className="mt-2 text-center">{book.title}</p>
                <p className="text-sm mt-2 text-gray-400 text-center">
                  {book.author}
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Created by: {book.userId.fullName} ({book.userId.email})
                </p>
                <div className="mt-2 flex justify-between">
                  {book.bookType === "uploaded" ? (
                    ""
                  ) : (
                    <div className="relative group mt-3 ">
                      <button
                        className="px-2 py-2 bg-blue-500 text-white rounded-lg mr-1"
                        onClick={() => editEbook(book._id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
                        Edit eBook
                      </div>
                    </div>
                  )}

                  <div className="relative group mt-3 ">
                    <button
                      className="px-2 py-2 bg-green-500 text-white rounded-lg mr-1"
                      onClick={() => viewEbook(book._id)}
                    >
                      <FontAwesomeIcon icon={faEye} className="" />
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
                      View eBook
                    </div>
                  </div>

                  <div className="relative group mt-3 ">
                    <button
                      className="p-2 bg-gray-500 text-white rounded-lg mr-1"
                      onClick={() => downloadEbook(book._id)}
                    >
                      <FontAwesomeIcon icon={faDownload} className="" />
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
                      Download eBook
                    </div>
                  </div>

                  <div className="relative group mt-3 ">
                    <button
                      className={`px-2 py-3 text-white rounded-lg mr-1 ${
                        book.private ? "bg-gray-500" : "bg-blue-500"
                      }`}
                      onClick={() => publicEbook(book._id)}
                    >
                      <FaShareAlt />
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
                      Share eBook
                    </div>
                  </div>

                  <div className="relative group mt-3 ">
                    <button
                      className="px-2 py-2 bg-red-500 text-white rounded-lg mr-1"
                      onClick={() => deleteEbook(book._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="" />
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:flex items-center justify-center bg-black text-white text-xs rounded px-2 py-1">
                      Delete eBook
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No ebooks available.</p>
          )}
        </div>
      </section>
      <UploadEbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUploadSuccess}
      />
    </Layout>
  );
};

export default MyBooks;
