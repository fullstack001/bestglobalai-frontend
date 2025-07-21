import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
// import "react-languages-select/css/react-languages-select.css";

import default_cover from "../../assets/images/covers/cover1.jpg";
import Layout from "../../components/Layout"; // Adjust the path as needed

const apiPort = process.env.REACT_APP_API_PORT;

const jobTitles = [
  "Social Media Manager",
  "Product Marketing Manager",
  "Sales Executive",
  "Chief Financial Officer",
  "Chief Executive Officer",
  "Campaign Manager",
  "Public Relations Manager",
  "Marketing Executive",
];

const CreatorDashboard = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [paginationDirection, setPaginationDirection] = useState("ltr");
  const [bookCoverImage, setBookCoverImage] = useState(null);
  const [ebooks, setEbooks] = useState([]); // State to hold fetched ebooks

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from global Redux state
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        let response;
        if (role === "admin" || role === "superAdmin") {
          response = await axios.get(`${apiPort}/api/books`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await axios.get(`${apiPort}/api/books/mine`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        let books = response.data.books;

        // Apply filter only if role is not superAdmin
        if (role !== "superAdmin") {
          books = books.filter((book) => {
            // If book title is one of the job titles
            if (jobTitles.includes(book.title)) {
              // Check if user's subscription plan contains this specific job title
              const userPlan = userData?.subscription?.plan || "";
              const hasSpecificJobTitleInPlan = userPlan
                .toLowerCase()
                .includes(book.title.toLowerCase());

              // Only keep the book if user has this specific job title in their plan
              return hasSpecificJobTitleInPlan;
            }
            // Keep all books that are not job title books
            return true;
          });
        }

        setEbooks(books);
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

  return (
    <Layout titleText={"Creator Dashboard"}>
      <section className="mt-8">
        <div className="grid md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-6 mt-4">
          {ebooks.length > 0 ? (
            ebooks.map((book) => (
              <div key={book._id} className="bg-gray-700 p-4 rounded-lg mb-2">
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
                  {book.bookType === "created" ? (
                    <button
                      className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-lg mr-1"
                      onClick={() => editEbook(book._id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  ) : (
                    ""
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
