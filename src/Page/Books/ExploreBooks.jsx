import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import default_cover from "../../assets/images/covers/cover1.jpg";
import Layout from "../../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;

const ExploreBooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEbooks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiPort}/api/books/public`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEbooks(response.data.books);
      } catch (error) {
        console.error("Error fetching ebooks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

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

  if (loading) {
    return (
      <Layout titleText={"Explore EBooks"}>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout titleText={"Explore EBooks"}>
      <section className="mt-8">
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
                <div className="mt-2 flex justify-center">
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
                </div>
              </div>
            ))
          ) : (
            <p>No ebooks available.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ExploreBooks;
