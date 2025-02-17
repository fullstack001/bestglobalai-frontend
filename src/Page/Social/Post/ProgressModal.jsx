import React from "react";
import { Dialog } from "@headlessui/react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const PostProgressModal = ({ postProgress, fetchingUrl, posting, onClose }) => {
  return (
    <Dialog
      open={postProgress}
      onClose={() => {}}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="bg-black bg-opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-96">
        <Dialog.Title className="text-lg font-bold">
          Posting Progress
        </Dialog.Title>
        <div className="mt-4 flex flex-col items-center space-y-3">
          <ol class="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li class="mb-10 ms-6">
              <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                {fetchingUrl ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-blue-500"
                    size={24}
                  />
                ) : (
                  <AiOutlineCheckCircle className="text-green-500" size={24} />
                )}
              </span>
              <h3 class="font-medium leading-tight">Fetching Media URLs</h3>
              <p class="text-sm">
                Manage your image and video gallery by uploading and retrieving
                images and videos.
              </p>
            </li>
            <li class="mb-10 ms-6">
              <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                {fetchingUrl ? (
                  <svg
                    class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                ) : posting ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin text-blue-500"
                    size={24}
                  />
                ) : (
                  <AiOutlineCheckCircle className="text-green-500" size={24} />
                )}
              </span>
              <h3 class="font-medium leading-tight">Posting to Social Media</h3>
              <p class="text-sm">Post to Social Media</p>
            </li>
            <li class="ms-6">
              <span class="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <svg
                  class="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 class="font-medium leading-tight">Complete</h3>
              <p class="text-sm">Posting to Social Media Complete</p>
            </li>
          </ol>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            hidden={fetchingUrl || posting}
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default PostProgressModal;
