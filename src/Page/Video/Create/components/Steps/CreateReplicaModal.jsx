import React, { useState, useCallback } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { useDropzone } from "react-dropzone";
import {
  FiVideo,
  FiSmartphone,
  FiUser,
  FiSun,
  FiVolume2,
} from "react-icons/fi";
import {
  FaTshirt,
  FaEyeSlash,
  FaHeadSideVirus,
  FaExpand,
  FaHandPaper,
} from "react-icons/fa";
import {
  HiOutlineInformationCircle,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { createReplica } from "../../../../../lib/api/replica";

const CreateReplicaModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [replicaName, setReplicaName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setError("");
    if (fileRejections.length > 0) {
      setError("Please upload a valid .mp4 file under 750MB.");
      return;
    }

    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
    },
    maxSize: 750 * 1024 * 1024, // 750MB in bytes
  });

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("File is required.");
      return;
    }
    if (!replicaName.trim()) {
      setError("Replica name is required.");
      return;
    }
    setIsLoading(true);
    try {
      // Call the createReplica function with the file and name
      await createReplica(selectedFile, replicaName);

      // Reset form and close modal on success
      setSelectedFile(null);
      setReplicaName("");
      setError("");
      onClose();
    } catch (error) {
      // Handle any errors from the API call
      setError("Failed to create replica. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size="5xl"
      popup
      show={isOpen}
      onClose={onClose}
      aria-labelledby="create-replica-modal"
      className="custom-overlay"
    >
      <Modal.Header className="p-3">Create Replica</Modal.Header>
      <Modal.Body>
        {/* Tips Section */}
        <div className="mb-4 rounded-lg bg-blue-50 p-4 shadow-md">
          <div
            onClick={() => setShowTips(!showTips)}
            className="flex cursor-pointer items-center"
          >
            <HiOutlineInformationCircle className="mr-2 text-lg text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-700">
              Important Tips for Creating a Digital Replica
            </h3>
            {showTips ? (
              <HiChevronUp className="ml-auto text-blue-600" />
            ) : (
              <HiChevronDown className="ml-auto text-blue-600" />
            )}
          </div>
          {showTips && (
            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <h4 className="font-semibold">Introduction</h4>
              <p>
                For the creation of any digital replicas using the Phoenix
                model, Tavus requires a clear, verbal consent statement to be
                included within the training video. This measure is crucial for
                ethical considerations and compliance with data protection
                regulations. Instances where this consent statement is missing
                can lead to processing delays or the inability to create your AI
                clone.
              </p>
              <h4 className="font-semibold">Mandatory Consent Statement</h4>
              <p>
                Every training video submitted for Phoenix model training must
                include the following consent statement, spoken by the
                individual being replicated:
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                &quot;I, [FULL NAME], am currently speaking and give consent to
                Tavus to create an AI clone of me by using the audio and video
                samples I provide. I understand that this AI clone can be used
                to create videos that look and sound like me.&quot;
              </blockquote>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Personalization:</strong> Replace “[FULL NAME]” with
                  your actual full name.
                </li>
                <li>
                  <strong>Duration:</strong> All Replica training and consent
                  video files must be at least 2 minutes long.
                </li>
                <li>
                  <strong>Clarity:</strong> The statement must be clearly
                  audible and understandable.
                </li>
                <li>
                  <strong>Placement:</strong> This consent should be at the
                  beginning of your training video to ensure correct processing.
                </li>
                <li>
                  <strong>Language:</strong> We currently accept consent
                  statements in any of our supported languages.
                </li>
              </ul>
              <h4 className="font-semibold">Troubleshooting Missing Consent</h4>
              <p>
                If you have submitted a training video without the requisite
                consent statement, it will not be processed, and your request to
                create a digital replica will be delayed. To resolve this issue:
              </p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Re-Record Your Video:</strong> Include the consent
                  statement at the beginning of your new training video.
                </li>
                <li>
                  <strong>Submit a New Request:</strong> Upload the revised
                  video and submit a new model training request.
                </li>
              </ul>
              <h4 className="font-semibold">
                Tips for Successful Consent Recording
              </h4>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Environment:</strong> Record in a quiet setting to
                  ensure the consent statement is clearly heard.
                </li>
                <li>
                  <strong>Articulation:</strong> Speak slowly and clearly to
                  prevent misunderstandings.
                </li>
                <li>
                  <strong>Verification:</strong> Review your video to ensure the
                  consent statement is included and easily audible.
                </li>
              </ul>
              <h4 className="font-semibold">Conclusion</h4>
              <p>
                Including a consent statement in your training video is a
                critical step in the Phoenix model training process with Tavus.
                It ensures compliance with ethical standards and facilitates a
                smoother processing of your request. Follow these guidelines to
                avoid unnecessary delays.
              </p>
            </div>
          )}
        </div>

        {/* Rest of the form and modal content */}
        <div className="space-y-6">
          {/* File Upload Section */}
          <div>
            <Label htmlFor="replicaFile">
              Upload Replica Video (MP4, max 750MB)
            </Label>
            <div
              {...getRootProps()}
              className="mt-2 flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-orange-100 p-4 hover:border-blue-400"
              style={{ borderColor: error ? "red" : "#D1D5DB" }}
            >
              <input {...getInputProps()} id="replicaFile" />
              <p className="text-center text-gray-500">
                {selectedFile ? (
                  `${selectedFile.name} (${(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)} MB)`
                ) : (
                  <>
                    <p>Video file up to 750mb</p>
                    <p>Supported formats: .mp4 .webm .mov</p>
                    <p>
                      Currently, the H.264 codec is required to ensure efficient
                      compression.
                    </p>
                  </>
                )}
              </p>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          {/* Replica Name Input */}
          <div>
            <Label htmlFor="replicaName">Replica Name</Label>
            <TextInput
              id="replicaName"
              placeholder="Enter replica name"
              value={replicaName}
              onChange={(e) => setReplicaName(e.target.value)}
              required
              aria-required="true"
              className="mt-2"
            />
          </div>

          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <HiOutlineInformationCircle className="text-xl text-pink-500" />
            <p className="text-sm text-gray-700">
              The Phoenix model takes about 3-4 hours to train. During this
              time, it learns your voice, appearance, and movements.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Do&apos;s Section */}
            <div className="w-full rounded-lg bg-green-100 p-6 shadow-lg md:w-1/2">
              <h2 className="mb-4 text-xl font-semibold text-green-600">
                Do&apos;s
              </h2>
              <ul className="space-y-4 text-green-600">
                <li className="flex items-center">
                  <FiVideo className="mr-2" />
                  Set up your <strong>&nbsp; HD camera &nbsp;</strong> or
                  recording software
                </li>
                <li className="flex items-center">
                  <FiSmartphone className="mr-2" />
                  If using a smartphone, film in{" "}
                  <strong>&nbsp; landscape &nbsp;</strong>
                </li>
                <li className="flex items-center">
                  <FiUser className="mr-2" />
                  Make sure your <strong>
                    &nbsp;face & upper body&nbsp;
                  </strong>{" "}
                  are in focus
                </li>
                <li className="flex items-center">
                  <FiSun className="mr-2" />
                  Ensure the <strong>&nbsp; recording space &nbsp;</strong> is
                  quiet and well-lit
                </li>
                <li className="flex items-center">
                  <FiVolume2 className="mr-2" />
                  Speak <strong>&nbsp; naturally &nbsp;</strong>, we will
                  capture tone & emotion
                </li>
              </ul>
            </div>

            {/* Don&apos;ts Section */}
            <div className="w-full rounded-lg bg-red-100 p-6 shadow-lg md:w-1/2">
              <h2 className="mb-4 text-xl font-semibold text-red-600">
                Don&apos;ts
              </h2>
              <ul className="space-y-4 text-red-600">
                <li className="flex items-center">
                  <FaTshirt className="mr-2" />
                  Avoid clothes that blend into the background
                </li>
                <li className="flex items-center">
                  <FaEyeSlash className="mr-2 text-2xl" />
                  Avoid accessories that block your head & face like hats,
                  earrings, or thick glasses
                </li>
                <li className="flex items-center">
                  <FaHeadSideVirus className="mr-2" />
                  Do not turn your head away from the camera
                </li>
                <li className="flex items-center">
                  <FaExpand className="mr-2" />
                  Avoid backgrounds that are busy or moving
                </li>
                <li className="flex items-center">
                  <FaHandPaper className="mr-2 text-2xl" />
                  Don not move around too much or exaggerate movements, like
                  waving your hands
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
        <Button color="gray" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateReplicaModal;
