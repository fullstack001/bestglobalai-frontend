import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ReactReader } from "react-reader";

import logo_icon from "../../assets/icons/logo.svg";

const apiPort = process.env.REACT_APP_API_PORT;

function EbookViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookUrl, setBookUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [audioItems, setAudioItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [youtubeItems, setYoutubeItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [bookContents, setBookContents] = useState([]);
  const [bookType, setBookType] = useState("");

  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en"); // Default language: English
  const [originalContent, setOriginalContent] = useState("");

  const renditionRef = useRef(null);

  const tabs = [
    { id: 0, label: "Audio" },
    { id: 1, label: "Video" },
    { id: 2, label: "YouTube" },
  ];

  const currentLocation = useLocation();
  const previousLocation = currentLocation.state?.previousUrl || "/";

  useEffect(() => {
    // Fetch the ebook file path from the backend
    const fetchEbookContent = async () => {
      try {
        const role = localStorage.getItem("role");
        const response = await axios.get(`${apiPort}/api/books/${id}`);
        const bookData = response.data.book;
        const ebookFileUrl = bookData.ebookFile;
        const watermarkFileUrl = bookData.watermarkFile;
        const bookContents = bookData.pages;

        setBookUrl(
          role === "user"
            ? `${apiPort}${watermarkFileUrl}`
            : `${apiPort}${ebookFileUrl}`
        );
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setAudioItems(bookData.audioItems);
        setVideoItems(bookData.videoItems);
        setYoutubeItems(bookData.youtubeItems);
        setBookContents(bookContents);
        setBookType(bookData.bookType);
      } catch (error) {
        console.error("Error fetching ebook content:", error);
      }
    };

    fetchEbookContent();
  }, [id]);

  const translateContent = async (content) => {
    try {
      const response = await axios.post(`${apiPort}/api/translate`, {
        text: content,
        targetLanguage: language,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating content:", error);
    }
  };

  const handleTranslate = () => {
    if (originalContent) {
      translateContent(originalContent);
    }
  };

  const handleLocationChanged = async (epubcfi) => {
    setLocation(epubcfi);
    if (renditionRef.current) {
      console.log(renditionRef.current);
      try {
        const range = await renditionRef.current.getRange(epubcfi);
        console.log(range);
        const firstPart = range.commonAncestorContainer.baseURI.split(".")[0];
        console.log(firstPart);
        const pageNumber = Number(firstPart.charAt(firstPart.length - 1));
        console.log(pageNumber);
        const pageContent = bookContents[pageNumber];
        console.log(pageContent);
        setOriginalContent(pageContent.content);
        setTranslatedText(""); // Clear translated text when location changes
      } catch (error) {
        console.error(
          "Error fetching content for the current location:",
          error
        );
      }
    }
  };

  const returnBack = () => {
    navigate(previousLocation);
  };

  if (!bookUrl) {
    return <p>Loading ebook...</p>;
  }

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <div className="flex justify-between">
        <div>
          <img src={logo_icon} alt="logo_icon" className="w-[200px] mr-5" />
          <h2 className="text-2xl font-bold mb-4 mt-2">Ebook Viewer</h2>
        </div>
        <div>
          <button
            onClick={returnBack}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h2 className="text-xl mb-2">Title: {title}</h2>
          <h2 className="mb-2">Author: {author}</h2>
        </div>
        <div className="custom-tablist flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                selectedTab === tab.id
                  ? "bg-dashcolor text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div
            style={{ height: "600px", border: "1px solid #ddd" }}
            className="rounded-lg"
          >
            <ReactReader
              url={bookUrl}
              location={location}
              locationChanged={handleLocationChanged}
              getRendition={(rendition) => {
                renditionRef.current = rendition;
              }}
              epubOptions={{
                allowPopups: true, 
                allowScriptedContent: true,
              }}
            />
          </div>

          {bookType == "created" ? (
            <div>
              {" "}
              <div className="mt-4">
                <select
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
                <button
                  onClick={handleTranslate}
                  className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg"
                >
                  Translate
                </button>
              </div>
              <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: translatedText || "No translation available.",
                  }}
                />
              </div>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {selectedTab === 0 && (
            <div>
              {audioItems.map((item) => (
                <div key={item._id}>
                  <audio
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                  >
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/ogg"
                    />
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              {videoItems.map((item) => (
                <div key={item._id}>
                  <video
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                  >
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video element.
                  </video>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              {youtubeItems.map((item) => (
                <div key={item._id}>
                  <iframe
                    className="w-full h-auto"
                    src={`${item.link}?autoplay=1`}
                    title="YouTube video player"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EbookViewer;
