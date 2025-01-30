import { useState } from "react";
import { Modal } from "flowbite-react";

const SelectVoiceModal = ({ onClose, voices, selectVoic }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredVoices = voices.filter((voice) =>
    voice.language.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);

  const handlePlay = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <Modal show={true} onClose={onClose} className=" w-full " size="4xl">
      <Modal.Header>Choose Voice</Modal.Header>
      <Modal.Body className="w-full" style={{ minHeight: "400px" }}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search voices as language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 rounded border p-2"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
            {filteredVoices.map((voice) => (
              <div
                key={voice.voice_id}
                className={`flex flex-col items-center rounded-lg border p-4 hover:shadow-lg ${
                  selectedVoice.voice_id === voice.voice_id
                    ? "border-purple-500"
                    : ""
                }`}
                onClick={() => {
                  setSelectedVoice(voice);
                  selectVoic(voice);
                }}
              >
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(voice.preview_audio);
                    }}
                    className="rounded-full bg-transparent p-2 text-white"
                  >
                    ▶️
                  </button>
                  <span className="text-lg font-semibold">{voice.name}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-lg bg-gray-100 p-1 text-sm">
                    {voice.language}
                  </span>
                  <span className="rounded-lg bg-gray-100 p-1 text-sm">
                    {voice.gender}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onClose}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectVoiceModal;
