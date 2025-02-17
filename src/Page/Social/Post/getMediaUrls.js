import { getLargeMediaUrl } from "../../../lib/api/mediaUrl";

const smallFileUrl = async (file) => {
  const form = new FormData();
  form.append("file", file);
  form.append("fileName", file.name);
  form.append("description", "best image");

  try {
    const response = await fetch("https://api.ayrshare.com/api/media/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AYRSHARE_API_KEY}`,
        // Do not set Content-Type header; FormData will set it automatically
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.url; // Assuming the response contains a 'url' field
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const largeFileUrl = async (file) => {
  console.log(file);
  const form = new FormData();
  form.append("fileName", file.name);
  form.append("file", file);

  const accessUrl = await getLargeMediaUrl(form);

  return accessUrl.accessUrl;
};

export const getMediaUrls = async (files) => {
  const mediaUrls = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
    let url;

    if (fileSizeInMB <= 30) {
      url = await smallFileUrl(file);
    } else {
      url = await largeFileUrl(file);
    }

    mediaUrls.push(url);
  }
  return mediaUrls;
};
