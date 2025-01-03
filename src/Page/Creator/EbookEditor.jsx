import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setEbookTitle,
  setEbookAuthor,
  setCoverImage,
} from "../../store/ebookSlice"; // Redux actions
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's CSS
import logo_icon from "../../assets/icons/logo.svg";

const apiPort = process.env.REACT_APP_API_PORT;

const EbookEditor = () => {
  const { id } = useParams(); // Get the book ID from the route params
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [chapters, setChapters] = useState([{ name: "", content: "" }]); // Default chapter structure
  const [songItems, setSongItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [youtubeItems, setYoutubeItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previousUrl, setPreviousUrl] = useState("");
  const currentLocation = useLocation();
  const previousLocaction =
    currentLocation.state?.previousUrl || "No previous URL";

  const returnBack = () => {
    if (previousLocaction == "/creator") {
      navigate("/creator");
    }

    if (previousLocaction == "/myEbooks") {
      navigate("/myEbooks");
    }
  };
  // Load the selected ebook's data
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${apiPort}/api/books/${id}`);
        const book = response.data.book;

        setBookTitle(book.title);
        setAuthor(book.author);
        setChapters(book.pages || []);
        setSongItems(book.audioItems || []);
        setVideoItems(book.videoItems || []);
        setYoutubeItems(book.youtubeItems || []);
        setCoverImage(book.coverImage || null);

        // Set in Redux store
        dispatch(setEbookTitle(book.title));
        dispatch(setEbookAuthor(book.author));
        dispatch(setCoverImage(book.coverImage));
      } catch (error) {
        console.error("Error loading book details:", error);
      }
    };

    fetchBookDetails();
  }, [id, dispatch]);

  const handleSave = async () => {
    try {
      const updatedBook = {
        title: bookTitle,
        author,
        pages: chapters,
        audioItems: songItems,
        videoItems,
        youtubeItems,
      };

      const formData = new FormData();
      formData.append("title", updatedBook.title);
      formData.append("author", updatedBook.author);
      formData.append("pages", JSON.stringify(updatedBook.pages));
      formData.append("audioItems", JSON.stringify(updatedBook.audioItems));
      formData.append("videoItems", JSON.stringify(updatedBook.videoItems));
      formData.append("youtubeItems", JSON.stringify(updatedBook.youtubeItems));

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      // Append audio and video files to formData
      songItems.forEach((item, index) => {
        if (item.file) {
          formData.append(`audioFiles`, item.file);
        }
      });
      videoItems.forEach((item, index) => {
        if (item.file) {
          formData.append(`videoFiles`, item.file);
        }
      });

      // Update book on the server
      await axios.put(`${apiPort}/api/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/creator"); // Navigate back to the creator dashboard after saving
    } catch (error) {
      console.error("Error saving the book:", error);
    }
  };

  // Handle adding chapters dynamically
  const addChapter = () => {
    setChapters([...chapters, { name: "", content: "" }]);
  };

  // Handle updating chapters
  const updateChapter = (index, field, value) => {
    const updatedChapters = chapters.map((chapter, i) =>
      i === index ? { ...chapter, [field]: value } : chapter
    );
    setChapters(updatedChapters);
  };

  // Handle adding or removing song, video, and YouTube items
  const addSongItem = () =>
    setSongItems([...songItems, { title: "", fileUrl: "", file: null }]);
  const addVideoItem = () =>
    setVideoItems([...videoItems, { title: "", fileUrl: "", file: null }]);
  const addYoutubeItem = () =>
    setYoutubeItems([...youtubeItems, { title: "", link: "" }]);

  const removeSongItem = (index) =>
    setSongItems(songItems.filter((_, i) => i !== index));
  const removeVideoItem = (index) =>
    setVideoItems(videoItems.filter((_, i) => i !== index));
  const removeYoutubeItem = (index) =>
    setYoutubeItems(youtubeItems.filter((_, i) => i !== index));

  const toolbarOptions = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 p-6 bg-gray-800">
        <div className="mb-8">
          <img src={logo_icon} alt="Logo" className="h-20 w-auto m-auto" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-400">Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-400">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-400">Cover Image</label>

          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="w-full bg-gray-700 text-white"
          />
        </div>
        <div className="mt-2">
          <button
            onClick={addChapter}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Add Chapter
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xl mb-2">Songs</h3>
          {songItems.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const updatedSongs = [...songItems];
                  updatedSongs[index].title = e.target.value;
                  setSongItems(updatedSongs);
                }}
                placeholder="Song title"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              />
              {item.fileUrl && (
                <p className="text-xs mt-1 text-gray-300 break-words">
                  Existing file: {apiPort}
                  {item.fileUrl}
                </p>
              )}
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const updatedSongs = [...songItems];
                  updatedSongs[index].file = file;
                  setSongItems(updatedSongs);
                }}
                className="w-full mt-2"
              />
              <button
                onClick={() => removeSongItem(index)}
                className="bg-red-600 text-white py-2 px-4 rounded mt-2"
              >
                Remove Song
              </button>
            </div>
          ))}
          <button
            onClick={addSongItem}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Add Song
          </button>
        </div>
        {/* Video Items */}
        <div className="mb-6">
          <h3 className="text-xl mb-2">Videos</h3>
          {videoItems.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const updatedVideos = [...videoItems];
                  updatedVideos[index].title = e.target.value;
                  setVideoItems(updatedVideos);
                }}
                placeholder="Video title"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              />
              {item.fileUrl && (
                <p className="text-xs mt-1 text-gray-300 break-words">
                  Existing file: {apiPort}
                  {item.fileUrl}
                </p>
              )}
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const updatedVideos = [...videoItems];
                  updatedVideos[index].file = file;
                  setVideoItems(updatedVideos);
                }}
                className="w-full mt-2"
              />
              <button
                onClick={() => removeVideoItem(index)}
                className="bg-red-600 text-white py-2 px-4 rounded mt-2"
              >
                Remove Video
              </button>
            </div>
          ))}
          <button
            onClick={addVideoItem}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Add Video
          </button>
        </div>

        {/* YouTube Items */}
        <div className="mb-6">
          <h3 className="text-xl mb-2">YouTube Videos</h3>
          {youtubeItems.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const updatedYoutube = [...youtubeItems];
                  updatedYoutube[index].title = e.target.value;
                  setYoutubeItems(updatedYoutube);
                }}
                placeholder="YouTube video title"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              />
              <input
                type="text"
                value={item.link}
                onChange={(e) => {
                  const updatedYoutube = [...youtubeItems];
                  updatedYoutube[index].link = e.target.value;
                  setYoutubeItems(updatedYoutube);
                }}
                placeholder="YouTube link"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mt-2"
              />
              <button
                onClick={() => removeYoutubeItem(index)}
                className="bg-red-600 text-white py-2 px-4 rounded mt-2"
              >
                Remove YouTube Video
              </button>
            </div>
          ))}
          <button
            onClick={addYoutubeItem}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Add YouTube Video
          </button>
        </div>
      </aside>
      <div className="p-8 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Edit Ebook</h2>
          <div className="cursor-pointer" onClick={returnBack}>
            Back
          </div>
        </div>

        {/* Chapter Management with ReactQuill */}
        <div className="mb-6">
          {chapters.map((chapter, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">Chapter {index + 1}</label>
              <input
                type="text"
                value={chapter.name}
                onChange={(e) => updateChapter(index, "name", e.target.value)}
                className="w-full px-3 py-2 mb-2 bg-white text-black rounded"
                placeholder="Chapter name"
              />
              <ReactQuill
                value={chapter.content}
                onChange={(content) => updateChapter(index, "content", content)}
                className="w-full px-3 py-2 bg-white text-black rounded min-h-20"
                theme="snow"
                modules={toolbarOptions}
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-green-600 text-white py-2 px-4 rounded-lg"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EbookEditor;
