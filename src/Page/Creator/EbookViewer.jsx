import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ReactReader } from "react-reader";
import { useNavigate, useLocation } from "react-router-dom";

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
  const tabs = [
    { id: 0, label: "Audio" },
    { id: 1, label: "Video" },
    { id: 2, label: "Youtube" },
  ];

  const [previousUrl, setPreviousUrl] = useState("");
  const currentLocation = useLocation();
  const previousLocaction = currentLocation.state?.previousUrl || "No previous URL";

  useEffect(() => {
    // Fetch the ebook file path from the backend
    const fetchEbookContent = async () => {
      try {
        const role = localStorage.getItem("role");
        // Fetch book details including ebook file URL
        const response = await axios.get(`${apiPort}/api/books/${id}`);
        const bookData = response.data.book;
        const ebookFileUrl = response.data.book.ebookFile;
        const waterMarkFileUrl = response.data.book.watermarkFile;

        if(role == "user"){
          setBookUrl(`${apiPort}${waterMarkFileUrl}`);
        }else{
          setBookUrl(`${apiPort}${ebookFileUrl}`);
        }
       
        // Set the complete book URL
        
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setAudioItems(bookData.audioItems);
        setVideoItems(bookData.videoItems);
        setYoutubeItems(bookData.youtubeItems);
      } catch (error) {
        console.error("Error fetching ebook content:", error);
      }
    };

    fetchEbookContent();
  }, [id]);

  // If bookUrl isn't set, show loading or an error message
  if (!bookUrl) {
    return <p>Loading ebook...</p>;
  }

  const returnBack = () => {
    if(previousLocaction == '/creator'){
      navigate("/creator");
    }

    if(previousLocaction == '/myEbooks'){
      navigate('/myEbooks');
    } 
    
    if(previousLocaction == '/explore-ebooks'){
      navigate('/explore-ebooks');
    } 
  }

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <div className="flex justify-between">
        <div>
          <img src={logo_icon} alt="logo_icon" className="w-[200px] mr-5" />
          <h2 className="text-2xl font-bold mb-4 mt-2">Ebook Viewer</h2>
        </div>
        <div>
          <button onClick={returnBack}>Back</button>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h2 className="text-xl mb-2">Title: {title}</h2>
          <h2 className="mb-2">Author: {author}</h2>
        </div>
        <div>
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
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div
            style={{ height: "600px", border: "1px solid #ddd" }}
            className="rounded-lg"
          >
            {/* Display the ebook using ReactReader */}
            <ReactReader
              url={bookUrl} // Pass the full URL of the EPUB file
              location={location} // Set the initial location
              locationChanged={(epubcfi) => setLocation(epubcfi)}
            />
          </div>
        </div>
        <div>
          {selectedTab == 0 && (
            <div>
              {audioItems.map((item) => (
                <div>
                  <audio
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                    key={item._id}
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

          {selectedTab == 1 && (
            <div>
              {videoItems.map((item) => (
                <div>
                  <video
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                    key={item._id}
                  >
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/mp4"
                    />
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/avi"
                    />
                    Your browser does not support the video element.
                  </video>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}

          {selectedTab == 2 && (
            <div>
              {youtubeItems.map((item) => (
                <div>
                  <iframe
                    className="w-full h-auto"
                    src={`${item.link}?autoplay=1`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    key={item._id}
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
