import { useState, useRef, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { getMediaWarning } from "./getMediaWarning";

const FileManage = ({ postList, handleFile, mediaFiles }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Handle file selection from input
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  useEffect(() => {
    if (mediaFiles.length === 0) {
      setFiles([]);
    }
  }, [mediaFiles]);

  useEffect(() => {
    if (files.length > 0) {
      handleFile(files);
    }
  }, [files, handleFile]);

  // Handle file drag-and-drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Prevent default behavior for drag events
  const handleDragOver = (event) => event.preventDefault();
  const handleDragEnter = (event) => event.preventDefault();
  const handleDragLeave = (event) => event.preventDefault();

  // Trigger file input click when the upload area is clicked
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Remove a specific file from the list
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const mediaWarnings = getMediaWarning(postList, files);

  return (
    <>
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Add Images or a Video
        </label>
        <div
          className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg py-6 cursor-pointer hover:bg-gray-100"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <FaUpload className="text-blue-500 text-3xl mb-2" />
          <span className="text-sm text-gray-500">
            Click to Upload or Drag & Drop
          </span>
          <p className="text-sm text-gray-500 mt-2">
            PNG, JPG, GIF, WEBP, MP4, MOV, or AVI
          </p>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.gif,.webp,.mp4,.mov,.avi"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Uploaded Files:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center">
                {file.type.startsWith("image") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    className="w-40 h-30 object-cover rounded-md"
                  />
                ) : (
                  <video controls className="w-40 h-30 rounded-md">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{file.name}</p>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="mt-2 text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mediaWarnings.length > 0 && (
        <div className="mt-4 p-2 text-sm text-center text-yellow-700 bg-yellow-100 rounded-lg">
          {mediaWarnings.map((warning, index) => (
            <p key={index}>{warning}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default FileManage;
