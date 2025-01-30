import { useState } from "react";

export default function TalkingPhotoRender({ talkingPhotos, onSelect }) {
  const [selectedTalkingPhoto, setSelectedTalkingPhoto] = useState(null);

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold"></h2>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto  md:grid-cols-6 ">
        {talkingPhotos.map((photo) => (
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
    </div>
  );
}
