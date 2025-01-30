import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Loading from "../../../../../components/Loading";
import { getAvatar } from "../../../../../lib/api/heygen";
import AvatarRender from "../../../../../components/AvatarRender";
import TalkingPhotoRender from "../../../../../components/TalkingPhotoRender";
import "./avatar.css";

const AvatarStep = ({ onNext, onPrev, videoData }) => {
  const [loading, setLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [talkingPhotos, setTalkingPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState("avatars"); // New state for active tab
  const [selectedCharacter, setSelectedCharacter] = useState();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getAvatar();
      setAvatars(res.avatars);
      setTalkingPhotos(res.talking_photos);
      setLoading(false);
    };
    getData();
  }, []);

  const handleCharacter = (type, id) => {
    if (type === "avatar") {
      setSelectedCharacter({ type, avatar_id: id });
    } else {
      setSelectedCharacter({ type, talking_photo_id: id });
    }
    console.log(type, id);
  };

  const gotoNextStep = () => {
    if (!selectedCharacter) {
      toast.error("Please select a Avatar or Talking Photo");
      return;
    }
    onNext({ character: selectedCharacter });
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="ml-auto mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={gotoNextStep}
        >
          Next
        </button>
      </div>
      {loading ? (
        <Loading
          spinnerSrc="/assets/icons/spinner.svg"
          text="Fetching Avatar"
        />
      ) : (
        <div className="my-4 flex justify-around">
          <button
            className={`tab-button ${
              activeTab === "avatars"
                ? "border-blue-700 bg-blue-500 text-white shadow-lg"
                : "border border-transparent bg-white text-blue-500"
            } rounded-md px-4 py-2 transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-100`}
            onClick={() => setActiveTab("avatars")}
          >
            Avatars ({avatars.length > 0 && `(${avatars.length})`})
          </button>
          <button
            className={`tab-button ${
              activeTab === "talkingPhotos"
                ? "border-blue-700 bg-blue-500 text-white shadow-lg"
                : "border border-transparent bg-white text-blue-500"
            } rounded-md px-4 py-2 transition-all duration-300 ease-in-out hover:border-blue-500 hover:bg-blue-100`}
            onClick={() => setActiveTab("talkingPhotos")}
          >
            Talking Photos (
            {talkingPhotos.length > 0 && `(${talkingPhotos.length})`})
          </button>
        </div>
      )}

      <div className="space-y-8">
        {activeTab === "avatars" ? (
          <AvatarRender avatars={avatars} onSelect={handleCharacter} />
        ) : (
          <TalkingPhotoRender
            talkingPhotos={talkingPhotos}
            onSelect={handleCharacter}
          />
        )}
      </div>
    </div>
  );
};

export default AvatarStep;
