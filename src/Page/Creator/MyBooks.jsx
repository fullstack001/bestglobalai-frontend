import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setEbookTitle,
  setEbookAuthor,
  setCoverImage,
} from "../../store/ebookSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import default_cover from "../../assets/images/covers/cover1.jpg";
import Layout from "../../components/Layout";
import UploadEbookModal from "./EbookLoadModal";

const apiPort = process.env.REACT_APP_API_PORT;

const MyBooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const dispatch = useDispatch();
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
                  Created by: {book.userId.name} ({book.userId.email})
                </p>
                <div className="mt-2 flex justify-between">
                  {book.bookType == "uploaded" ? (
                    ""
                  ) : (
                    <button
                      className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-lg mr-1"
                      onClick={() => editEbook(book._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}

                  <button
                    className="mt-3 px-2 py-1 bg-green-500 text-white rounded-lg mr-1"
                    onClick={() => viewEbook(book._id)}
                  >
                    <FontAwesomeIcon icon={faEye} className="" />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-gray-500 text-white rounded-lg mr-1"
                    onClick={() => downloadEbook(book._id)}
                  >
                    <FontAwesomeIcon icon={faDownload} className="" />
                  </button>

                  <button
                    className="mt-3 px-2 py-1 bg-red-500 text-white rounded-lg mr-1"
                    onClick={() => deleteEbook(book._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="" />
                  </button>
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
