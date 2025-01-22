import React, { useState } from "react";
import axios from "axios";

const UploadEbookModal = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    if (coverImage) formData.append("coverImage", coverImage);
    if (bookFile) formData.append("bookFile", bookFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PORT}/api/books/ebookUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpload(response.data.book);
      onClose();
    } catch (error) {
      console.error("Error uploading ebook:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">Upload Ebook</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">
            Title
          </label>
          <input
            type="text"
            className="border rounded w-full p-2 bg-gray-700 text-gray-200 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">
            Author
          </label>
          <input
            type="text"
            className="border rounded w-full p-2 bg-gray-700 text-gray-200"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="border rounded w-full p-2"
            onChange={(e) => handleFileChange(e, setCoverImage)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200">
            Ebook File
          </label>
          <input
            type="file"
            accept=".epub,.pdf"
            className="border rounded w-full p-2"
            onChange={(e) => handleFileChange(e, setBookFile)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadEbookModal;
