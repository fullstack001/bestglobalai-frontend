import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { languageData } from "../lib/languageData";
import { translateContent } from "../lib/api/videoCreate";
const TranslateModal = ({ onClose, text, changeText }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [isOpen, setIsOpen] = useState(true); // C

  const hanldeApply = () => {
    if (translatedText !== "") {
      changeText(translatedText);
      setIsOpen(false);
      onClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleLanguageChange = async (language) => {
    if (language) {
      const res = await translateContent({ text, targetLanguage: language });
      setTranslatedText(res);
    }
  };

  return (
    <Modal show={isOpen} onClose={handleClose} size="3xl">
      <Modal.Header>Translate Your Text</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-4 bg-gray-100 p-4 md:grid-cols-2">
          <div className="mt-20 h-64 rounded-lg bg-white p-4 text-black">
            {text}
          </div>
          <div>
            <label className="label mt-4">
              <span className="label-text">Target Language</span>
            </label>
            <select
              className="select select-bordered w-full rounded-lg"
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="" disabled selected>
                Select a language
              </option>
              {languageData.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
              {/* Add more languages as needed */}
            </select>
            <div className="mt-4 h-64 rounded-lg bg-white p-4 text-black">
              {translatedText}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn ml-auto rounded-lg bg-purple-500 px-4 py-2 text-white"
          onClick={hanldeApply}
        >
          Apply
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TranslateModal;
