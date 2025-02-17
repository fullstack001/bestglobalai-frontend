import { useState } from "react";
import Modal from "react-modal";
import { FiUserPlus } from "react-icons/fi";
import { FaPlayCircle, FaTimes } from "react-icons/fa";
import { Pagination } from "flowbite-react"; // Import Flowbite pagination

export default function AvatarRender({ avatars, onSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // To control modal visibility
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const avatarsPerPage = 12; // Number of avatars to display per page
  const indexOfLastAvatar = currentPage * avatarsPerPage; // Last avatar on the page
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage; // First avatar on the page
  const currentAvatars = avatars.slice(indexOfFirstAvatar, indexOfLastAvatar); // Get current page avatars

  const handlePlayVideo = (mediaUrl) => {
    setVideoUrl(mediaUrl); // Set the video URL to play
    setIsOpen(true); // Open the modal
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update current page
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-6">
        {currentAvatars.map((avatar) => (
          <div
            key={avatar.avatar_id}
            className={`relative rounded-xl border-2 p-4 ${
              selectedAvatar?.avatar_id === avatar.avatar_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => {
              setSelectedAvatar(avatar);
              onSelect("avatar", avatar.avatar_id);
            }}
          >
            <div
              className="relative flex h-40 items-center justify-center rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${avatar.preview_image_url})` }}
            >
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-lg text-gray-300">
                {avatar.avatar_name}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <FaPlayCircle
                size={40}
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayVideo(avatar.preview_video_url);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(avatars.length / avatarsPerPage)} // Calculate total pages
          onPageChange={handlePageChange}
        />
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Avatar Video"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              position: "relative",
              width: "80%",
              maxWidth: "600px",
              height: "auto",
              inset: "unset",
              background: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <div>
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={26} />
            </button>
            {/* Use <video> tag to prevent download and play directly */}
            <video controls autoPlay src={videoUrl} className="w-full" />
          </div>
        </Modal>
      )}
    </div>
  );
}
