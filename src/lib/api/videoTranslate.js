import axiosInstance from "./axios";

export const translateVideo = (formData, onProgress) => {
  return axiosInstance
    .post("/api/video/translate-video", formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress(progressEvent);
        }
      },

      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      handleApiError(error);
    });
};

const handleApiError = (error) => {
  if (error.response?.status === 401) {
    console.error("Unauthorized access, signing out...");
    logout();
  } else {
    console.error("API error:", error.message || "Unknown error occurred");
  }
  throw error;
};

export const logout = () => {
  localStorage.removeItem("token"); // Adjust based on your token storage
  window.location.href = "/"; // Redirect to login or home page
};
