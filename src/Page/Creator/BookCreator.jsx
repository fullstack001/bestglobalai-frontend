import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tooltip } from "react-tooltip";
import logo_icon from "../../assets/icons/logo.svg";

const apiPort = process.env.REACT_APP_API_PORT;

function BookCreator() {
  // Using useSelector to get title and author from Redux store
  const title = useSelector((state) => state.ebook.title);
  const author = useSelector((state) => state.ebook.author);
  const coverImage = useSelector((state) => state.ebook.coverImage);

  // Initialize pages state as an array with a default page
  const [pages, setPages] = useState([{ name: "", content: "" }]);

  // State for managing multiple audio files and titles
  const [audioItems, setAudioItems] = useState([]);
  const [currentAudioTitle, setCurrentAudioTitle] = useState("");
  const [currentAudioFile, setCurrentAudioFile] = useState(null);

  const [videoItems, setVideoItems] = useState([]);
  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  const [currentVideoFile, setCurrentVideoFile] = useState(null);

  const [youtubeItems, setYoutubeItems] = useState([]);
  const [currentYoutubeTitle, setCurrentYoutubeTitle] = useState("");
  const [currentYoutubeLink, setCurrentYoutubeLink] = useState("");

  const lastPageRef = useRef(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (lastPageRef.current) {
      lastPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pages.length]);

  const addPage = () => {
    setPages([...pages, { name: "", content: "" }]);
  };

  const updatePageName = (index, newName) => {
    const updatedPages = pages.map((page, pageIndex) => {
      if (pageIndex === index) {
        return { ...page, name: newName };
      }
      return page;
    });
    setPages(updatedPages);
  };

  const deletePage = () => {
    if (pages.length > 1) {
      setPages(pages.slice(0, -1));
    }
  };

  const updatePageContent = (index, newContent) => {
    const updatedPages = pages.map((page, pageIndex) => {
      if (pageIndex === index) {
        return { ...page, content: newContent };
      }
      return page;
    });
    setPages(updatedPages);
  };

  const toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean'] 
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setCurrentAudioFile(file); // Set the file in state
  };

  const addAudioItem = () => {
    if (currentAudioTitle && currentAudioFile) {
      setAudioItems([
        ...audioItems,
        { title: currentAudioTitle, file: currentAudioFile },
      ]);
      setCurrentAudioTitle("");
      setCurrentAudioFile(null);
    }
  };

  // Function to handle removing an audio item
  const removeAudioItem = (index) => {
    const updatedItems = audioItems.filter((_, i) => i !== index);
    setAudioItems(updatedItems);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setCurrentVideoFile(file); // Set the file in state
  };

  const addVideoItem = () => {
    if (currentVideoTitle && currentVideoFile) {
      setVideoItems([
        ...videoItems,
        { title: currentVideoTitle, file: currentVideoFile },
      ]);
      setCurrentVideoTitle("");
      setCurrentVideoFile(null);
    }
  };

  // Function to handle removing an audio item
  const removeVideoItem = (index) => {
    const updatedItems = videoItems.filter((_, i) => i !== index);
    setVideoItems(updatedItems);
  };

  const addYoutubeItem = () => {
    if (currentYoutubeTitle && currentYoutubeLink) {
      setYoutubeItems([
        ...youtubeItems,
        { title: currentYoutubeTitle, link: currentYoutubeLink },
      ]);
      setCurrentVideoTitle("");
      setCurrentYoutubeLink("");
    }
  };

  // Function to handle removing an audio item
  const removeYoutubeItem = (index) => {
    const updatedItems = youtubeItems.filter((_, i) => i !== index);
    setYoutubeItems(updatedItems);
  };



  const submitBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("pages", JSON.stringify(pages));
      formData.append("audioItems", JSON.stringify(audioItems));
      formData.append("videoItems", JSON.stringify(videoItems));
      formData.append("youtubeItems", JSON.stringify(youtubeItems));

      if (coverImage) {
        formData.append("coverImage", coverImage); // Append coverImage to FormData
      }

      // Append audio files
      audioItems.forEach((item) => formData.append("audioFiles", item.file));

      // Append video files
      videoItems.forEach((item) => formData.append("videoFiles", item.file));

      const response = await axios.post(`${apiPort}/api/books`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });

      if (response.status === 201) {
        navigate("/creator");
      }
    } catch (err) {
      console.error("Error submitting book:", err);
    }
  };

  
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gray-800">
        <div className="mb-8">
          <img src={logo_icon} alt="Logo" className="h-20 w-auto m-auto" />
        </div>
        <nav className="space-y-2">
          <div className="rounded text-2xl font-bold ">{title}</div>
          <div className="flex flex-col space-y-4">
            <button
              className="px-4 py-2 mb-5 bg-blue-500 shadow-lg text-white rounded-lg"
              onClick={addPage}
              data-tooltip-id="addChapter"
              data-tooltip-content="Add Chapter"
              data-tooltip-place="left"
            >
              <FontAwesomeIcon icon={faAdd} className="mr-1" />
              New Chapter
            </button>
            <Tooltip id="addChapter" />
            {pages.length > 1 && (
              <>
                <button
                  className="-mt-32 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={deletePage}
                  data-tooltip-id="delete"
                  data-tooltip-content="Delete Chapter"
                  data-tooltip-place="left"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <Tooltip id="delete" />
              </>
            )}
          </div>

          {/* Audio Playlist */}
          <div className="mt-5">
            <div className="mt-5 text-2xl">Audio Playlist</div>
            <div className="mt-2">
              <label htmlFor="audioTitle" className="text-xl">
                Song Title
              </label>
              <input
                type="text"
                className="w-full text-black p-2 rounded-lg"
                value={currentAudioTitle}
                onChange={(e) => setCurrentAudioTitle(e.target.value)}
              />
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="w-full mt-2"
              />
              <button
                className="mt-3 px-4 py-2 w-full bg-green-500 text-white rounded-lg"
                onClick={addAudioItem}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-1" />
                Add Song
              </button>
            </div>

            {/* List of audio items */}
            {audioItems.length > 0 && (
              <div className="mt-4 space-y-2">
                {audioItems.map((audio, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="text-white">
                      {audio.title} - {audio.file.name}
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeAudioItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 text-2xl">Video Playlist</div>
            <div className="mt-2">
              <label htmlFor="videoTitle" className="text-xl">
                Video Title
              </label>
              <input
                type="text"
                className="w-full text-black p-2 rounded-lg"
                value={currentVideoTitle}
                onChange={(e) => setCurrentVideoTitle(e.target.value)}
              />
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full mt-2"
              />
              <button
                className="mt-3 px-4 py-2 w-full bg-green-500 text-white rounded-lg"
                onClick={addVideoItem}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-1" />
                Add Video
              </button>
            </div>

            {videoItems.length > 0 && (
              <div className="mt-4 space-y-2">
                {videoItems.map((video, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="text-white">
                      {video.title} - {video.file.name}
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeVideoItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 text-2xl">Youtube Video Playlist</div>
            <div className="mt-2">
              <label htmlFor="youtubeVideoTitle" className="text-xl">
                Youtube Video Title
              </label>
              <input
                type="text"
                className="w-full text-black p-2 rounded-lg"
                value={currentYoutubeTitle}
                onChange={(e) => setCurrentYoutubeTitle(e.target.value)}
              />

              <label htmlFor="youtubeVideoLink" className="text-xl  mt-2">
                Youtube Video Link
              </label>
              <input
                type="text"
                className="w-full text-black p-2 rounded-lg"
                value={currentYoutubeLink}
                onChange={(e) => setCurrentYoutubeLink(e.target.value)}
              />

              <button
                className="mt-3 px-4 py-2 w-full bg-green-500 text-white rounded-lg"
                onClick={addYoutubeItem}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-1" />
                Add Youtube
              </button>
            </div>

            {youtubeItems.length > 0 && (
              <div className="mt-4 space-y-2">
                {youtubeItems.map((youtube, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                  >
                    <div className="text-white">
                      {youtube.title} - {youtube.link}
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeYoutubeItem(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      <div className="w-full shadow-lg min-w-3/4 p-5 bg-gray-700 h-screen">
        <div className="space-y-4 flex flex-col justify-center w-full h-full relative">
          <div className="text-2xl text-white ml-5">Book: {title}</div>
          <div className="overflow-auto h-full items-center w-full">
            {pages.map((page, index) => (
              <div
                key={index}
                ref={index === pages.length - 1 ? lastPageRef : null}
                className="flex justify-center py-4"
              >
                <div className="shadow-lg p-6 border-gray-200 flex flex-col overflow-hidden w-full">
                  <input
                    type="text"
                    className="px-4 py-2 border mb-5 text-black"
                    placeholder="Chapter Name"
                    value={page.name}
                    onChange={(e) => updatePageName(index, e.target.value)}
                  />
                  <ReactQuill
                    value={page.content}
                    onChange={(content) => updatePageContent(index, content)}
                    className="h-[50vh] w-full text-black bg-white"
                    modules={toolbarOptions}
                  />
                  <p className="mt-6 -mb-2 text-sm text-white text-right pr-2">
                    {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between space-x-50 sm:w-full">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg float-right disabled:bg-gray-500 disabled:cursor-not-allowed"
              onClick={submitBook}
              disabled={pages.every((page) => page.content === "")}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Generate eBook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCreator;