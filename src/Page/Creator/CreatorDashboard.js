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
import ReactLanguageSelect from "react-languages-select";
import "react-languages-select/css/react-languages-select.css";

import default_cover from "../../assets/images/covers/cover1.jpg";
import Layout from "../../components/Layout"; // Adjust the path as needed

const apiPort = process.env.REACT_APP_API_PORT;

const CreatorDashboard = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [paginationDirection, setPaginationDirection] = useState("ltr");
  const [bookCoverImage, setBookCoverImage] = useState(null);
  const [template, setTemplate] = useState("");
  const [ebooks, setEbooks] = useState([]); // State to hold fetched ebooks
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        let response;
        if(role == "admin" || role == "superAdmin"){
          response = await axios.get(`${apiPort}/api/books`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }else{
          response = await axios.get(`${apiPort}/api/books/mine`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        
        setEbooks(response.data.books);
      } catch (error) {
        console.error("Error fetching ebooks:", error);
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
          setAuthor(response.data.user.fullName);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchEbooks();

    fetchUser();
  }, []);

  const createEbook = async () => {
    dispatch(setEbookTitle(bookTitle));
    dispatch(setEbookAuthor(author));
    dispatch(setCoverImage(bookCoverImage));
    navigate("/creator/create");
  };

  const editEbook = (id) => {
    navigate(`/creator/editor/${id}`, { state: { previousUrl: location.pathname } });
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
    navigate(`/creator/viewer/${id}`, { state: { previousUrl: location.pathname } });
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
                
                <div className="mt-2 flex justify-between">
                  <button
                    className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-lg mr-1"
                    onClick={() => editEbook(book._id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
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

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Create New Ebook</h2>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-gray-400">Book Title</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-400">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-400">
              Language (2 letter code)
            </label>           
            <ReactLanguageSelect
              defaultLanguage="en"
              languages={["en", "fr", "de", "it", "es"]}
              customLabels={{ en: "EN", fr: "FR", de: "DE", it: "IT", es: "ES" }}
              className="bg-gray-700 text-gray-200 w-full"
              onSelect={(languageCode)=>setLanguage(languageCode)}

            />
          </div>
          <div>
            <label className="block text-gray-400">Pagination direction</label>
            <select
              value={paginationDirection}
              onChange={(e) => setPaginationDirection(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            >
              <option value="ltr">Left to Right</option>
              <option value="rtl">Right to Left</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400">
              Cover image (optional)
            </label>
            <input
              type="file"
              onChange={(e) => setBookCoverImage(e.target.files[0])}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-400">Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded"
            >
              <option value="empty">Empty</option>
              <option value="template1">Template 1</option>
            </select>
          </div>
          <button
            onClick={createEbook}
            className="w-full bg-blue-600 py-2 rounded text-white"
          >
            Create
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default CreatorDashboard;
