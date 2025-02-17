import { useState } from "react";
import { Pagination } from "flowbite-react"; // Import Flowbite Pagination component

export default function TalkingPhotoRender({ talkingPhotos, onSelect }) {
  const [selectedTalkingPhoto, setSelectedTalkingPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const photosPerPage = 12; // Number of photos to display per page
  const indexOfLastPhoto = currentPage * photosPerPage; // Last photo on the current page
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage; // First photo on the current page
  const currentPhotos = talkingPhotos.slice(
    indexOfFirstPhoto,
    indexOfLastPhoto
  ); // Get photos for the current page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Talking Photos</h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto md:grid-cols-6">
        {currentPhotos.map((photo) => (
          <div
            key={photo.talking_photo_id}
            className={`relative rounded-xl border-2 p-4 ${
              selectedTalkingPhoto?.talking_photo_id === photo.talking_photo_id
                ? "border-purple-500"
                : "border-gray-200"
            }`}
            onClick={() => {
              setSelectedTalkingPhoto(photo);
              onSelect("talking_photo", photo.talking_photo_id);
            }}
          >
            <div
              className="relative flex h-60 items-center justify-center rounded-sm bg-cover bg-center"
              style={{ backgroundImage: `url(${photo.preview_image_url})` }}
            >
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-lg text-gray-300">
                {photo.talking_photo_name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(talkingPhotos.length / photosPerPage)} // Calculate total pages
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
