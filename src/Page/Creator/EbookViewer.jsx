import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ReactReader } from "react-reader";
import { debounce, set } from "lodash";
import { languageData } from "../../lib/languageData";

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
  const [translating, setTranslating] = useState(false);

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

  // ✅ Fix resize error using debounced event listener
  useEffect(() => {
    const resizeObserverError = (event) => {
      if (
        event.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", resizeObserverError);
    return () => {
      window.removeEventListener("error", resizeObserverError);
    };
    const handleResize = debounce(() => {
      if (renditionRef.current) {
        requestAnimationFrame(() => {
          try {
            console.log("Resizing ReactReader...");
            renditionRef.current.resize(); // ✅ Ensure safe resizing
          } catch (error) {
            console.warn("Resize error caught:", error);
          }
        });
      }
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Inject CSS inside ReactReader's iFrame
  const injectCustomStyles = () => {
    if (renditionRef.current) {
      renditionRef.current.themes.default({
        iframe: {
          width: "100% !important",
          height: "auto !important",
          "min-height": "300px !important",
        },
      });
    }
  };

  const translateContent = async (content) => {
    setTranslating(true);
    try {
      const response = await axios.post(`${apiPort}/api/translate/eBook`, {
        text: content,
        targetLanguage: language,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating content:", error);
    } finally {
      setTranslating(false);
    }
  };

  const handleTranslate = () => {
    setTranslatedText(
      "Please be patient. Translations take time to convert from html text."
    ); // Show loading message
    if (renditionRef.current) {
      renditionRef.current.themes.default({
        iframe: {
          width: "100% !important",
          height: "auto !important",
          "min-height": "300px !important",
        },
      });
    }

    if (originalContent) {
      translateContent(originalContent);
    }
  };

  const handleLocationChanged = useCallback(
    debounce(async (epubcfi) => {
      setLocation(epubcfi);
      if (renditionRef.current) {
        try {
          const range = await renditionRef.current.getRange(epubcfi);
          if (!range || !range.commonAncestorContainer) return; // ✅ Ensure range is valid

          const firstPart = range.commonAncestorContainer.baseURI.split(
            ".xhtml"
          )[0];
          const pageNumber = Number(firstPart.charAt(firstPart.length - 1));
          const pageContent = bookContents[pageNumber];
          setOriginalContent(pageContent.content);
          // setTranslatedText(''); // Clear translated text when location changes
        } catch (error) {
          console.error(
            "Error fetching content for the current location:",
            error
          );
        }
      }
    }, 500), // Adjust debounce time as needed
    [bookContents]
  );

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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-3">
          <div
            style={{ height: "600px", border: "1px solid #ddd" }}
            className="rounded-lg"
          >
            <ReactReader
              url={bookUrl}
              location={location}
              locationChanged={handleLocationChanged}
              // epubInitOptions={{
              //   openAs: 'epub',
              // }}
              getRendition={(rendition) => {
                if (rendition) {
                  renditionRef.current = rendition;
                  injectCustomStyles(); // ✅ Apply custom styles on render
                }
              }}
              epubOptions={{
                allowPopups: true,
                allowScriptedContent: true,
                // flow: "scrolled",
                paginated: 'paginated',
                manager: "continuous",
              }}
            />
          </div>

          {bookType === "created" ? (
            <div>
              {" "}
              <div className="mt-4">
                <select
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg mb-2"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {languageData.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                    >{`${lang.name}`}</option>
                  ))}
                </select>
                <button
                  onClick={handleTranslate}
                  className="bg-blue-500 text-white py-2 px-4 ml-0 md:ml-2 rounded-lg"
                >
                  Translate
                </button>
              </div>
              <div className="flex mt-4 bg-gray-700 p-4 rounded-lg">
                {translating ? (
                  <p>
                    <img
                      src="/spinners/spinner.svg"
                      alt="spinner"
                      className="w-10 h-10 mr-2"
                    />
                  </p>
                ) : (
                  <p></p>
                )}
                <div
                  className="items-center"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
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
              {audioItems.length > 0
                ? audioItems.map((item) => (
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
                  ))
                : "Audio doesn't exist"}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              {videoItems.length > 0
                ? videoItems.map((item) => (
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
                  ))
                : "Video doesn't exist"}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              {youtubeItems.length > 0
                ? youtubeItems.map((item) => (
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
                  ))
                : "Youtube video doesn't exist"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EbookViewer;
